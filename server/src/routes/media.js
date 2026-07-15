import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { Router } from 'express'
import multer from 'multer'
import { pool, query } from '../db.js'
import { authRequired } from '../auth.js'
import { bumpMeta } from '../contentStore.js'
import { deleteFromSpaces, spacesConfigured, uploadBufferToSpaces } from '../spaces.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '../../..')
const uploadsDir = path.join(root, 'public', 'uploads')
fs.mkdirSync(uploadsDir, { recursive: true })

function safeFilename(originalName, mime = 'image/jpeg') {
  const extFromName = path.extname(originalName || '').toLowerCase()
  const safeBase = path
    .basename(originalName || 'upload', extFromName)
    .replace(/[^a-zA-Z0-9_-]/g, '-')
    .slice(0, 60)
  const mimeExt = String(mime.split('/')[1] || 'jpg').replace('jpeg', 'jpg')
  const ext = extFromName || `.${mimeExt}`
  return `${Date.now()}-${safeBase || 'upload'}${ext}`
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 12 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype?.startsWith('image/')) {
      return cb(new Error('Only image uploads allowed'))
    }
    cb(null, true)
  },
})

const router = Router()

async function addMediaPath(client, publicPath, filename, mime, size) {
  await client.query(
    `INSERT INTO media (path, filename, mime_type, size_bytes)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (path) DO NOTHING`,
    [publicPath, filename, mime || null, size || null],
  )

  const blob = await client.query(`SELECT data FROM collection_blobs WHERE key = 'mediaLibrary'`)
  let lib = Array.isArray(blob.rows[0]?.data) ? blob.rows[0].data : []
  if (!lib.includes(publicPath)) lib = [publicPath, ...lib]
  await client.query(
    `INSERT INTO collection_blobs (key, data, updated_at)
     VALUES ('mediaLibrary', $1::jsonb, NOW())
     ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`,
    [JSON.stringify(lib)],
  )
  await bumpMeta(client)
}

async function persistImage({ finalName, buffer, mime }) {
  if (spacesConfigured()) {
    const url = await uploadBufferToSpaces({
      key: finalName,
      body: buffer,
      contentType: mime,
    })
    return { publicPath: url, storage: 'spaces' }
  }

  const filePath = path.join(uploadsDir, finalName)
  fs.writeFileSync(filePath, buffer)
  return { publicPath: `/uploads/${finalName}`, storage: 'local' }
}

router.get('/config', (_req, res) => {
  res.json({
    spaces: spacesConfigured(),
    storage: spacesConfigured() ? 'spaces' : 'local',
  })
})

router.get('/', async (_req, res) => {
  try {
    const r = await query(
      `SELECT id, path, filename, mime_type, size_bytes, created_at FROM media ORDER BY created_at DESC`,
    )
    res.json({ media: r.rows })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.post('/upload', authRequired, upload.single('file'), async (req, res) => {
  const client = await pool.connect()
  try {
    if (!req.file) return res.status(400).json({ error: 'file required' })
    const finalName = safeFilename(req.file.originalname, req.file.mimetype)
    const { publicPath, storage } = await persistImage({
      finalName,
      buffer: req.file.buffer,
      mime: req.file.mimetype,
    })
    await addMediaPath(client, publicPath, finalName, req.file.mimetype, req.file.size)
    res.status(201).json({ path: publicPath, url: publicPath, storage })
  } catch (e) {
    console.error('upload', e)
    res.status(500).json({ error: e.message })
  } finally {
    client.release()
  }
})

/** Base64 JSON upload — matches existing admin UI */
export async function handleJsonUpload(req, res) {
  const client = await pool.connect()
  try {
    const { filename, dataUrl } = req.body || {}
    if (!filename || !dataUrl || typeof dataUrl !== 'string') {
      return res.status(400).json({ error: 'filename and dataUrl required' })
    }
    const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/)
    if (!match) return res.status(400).json({ error: 'Invalid data URL' })

    const mime = match[1]
    const buffer = Buffer.from(match[2], 'base64')
    const finalName = safeFilename(filename, mime)
    const { publicPath, storage } = await persistImage({ finalName, buffer, mime })

    await addMediaPath(client, publicPath, finalName, mime, buffer.length)
    res.status(201).json({ path: publicPath, url: publicPath, storage })
  } catch (e) {
    console.error('json upload', e)
    res.status(500).json({ error: e.message })
  } finally {
    client.release()
  }
}

router.post('/upload-json', authRequired, handleJsonUpload)

router.delete('/', authRequired, async (req, res) => {
  const mediaPath = req.body?.path || req.query?.path
  if (!mediaPath) return res.status(400).json({ error: 'path required' })
  const client = await pool.connect()
  try {
    await client.query(`DELETE FROM media WHERE path = $1`, [mediaPath])
    const blob = await client.query(`SELECT data FROM collection_blobs WHERE key = 'mediaLibrary'`)
    let lib = Array.isArray(blob.rows[0]?.data) ? blob.rows[0].data : []
    lib = lib.filter((p) => p !== mediaPath)
    await client.query(
      `INSERT INTO collection_blobs (key, data, updated_at)
       VALUES ('mediaLibrary', $1::jsonb, NOW())
       ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`,
      [JSON.stringify(lib)],
    )
    await bumpMeta(client)
    if (spacesConfigured() && String(mediaPath).startsWith('http')) {
      try {
        await deleteFromSpaces(mediaPath)
      } catch (err) {
        console.warn('spaces delete', err.message)
      }
    }
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  } finally {
    client.release()
  }
})

export default router

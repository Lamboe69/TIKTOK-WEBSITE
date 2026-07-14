import fs from 'fs'
import path from 'path'
import { requireAuth, sendJson, readBody, readContent, writeContent } from '../_lib/cms.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    return res.end()
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed' })
  }

  if (!requireAuth(req, res)) return

  try {
    const body = await readBody(req)
    const { filename, dataUrl } = body
    if (!filename || !dataUrl || typeof dataUrl !== 'string') {
      return sendJson(res, 400, { error: 'filename and dataUrl required' })
    }

    const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/)
    if (!match) {
      return sendJson(res, 400, { error: 'Invalid data URL' })
    }

    const extFromName = path.extname(filename).toLowerCase()
    const safeBase = path
      .basename(filename, extFromName)
      .replace(/[^a-zA-Z0-9_-]/g, '-')
      .slice(0, 60)
    const mimeExt = match[1].split('/')[1].replace('jpeg', 'jpg')
    const ext = extFromName || `.${mimeExt}`
    const finalName = `${Date.now()}-${safeBase || 'upload'}${ext}`
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    fs.mkdirSync(uploadsDir, { recursive: true })
    const filePath = path.join(uploadsDir, finalName)
    fs.writeFileSync(filePath, Buffer.from(match[2], 'base64'))

    const publicPath = `/uploads/${finalName}`
    const content = readContent()
    const lib = Array.isArray(content.collections.mediaLibrary)
      ? content.collections.mediaLibrary
      : []
    if (!lib.includes(publicPath)) {
      content.collections.mediaLibrary = [publicPath, ...lib]
      writeContent(content)
    }

    return sendJson(res, 200, { path: publicPath })
  } catch (e) {
    return sendJson(res, 500, { error: e.message || 'Upload failed' })
  }
}

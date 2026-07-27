import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { Router } from 'express'
import multer from 'multer'
import { query } from '../db.js'
import { spacesConfigured, uploadBufferToSpaces } from '../spaces.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const uploadsDir = path.join(__dirname, '../../../public/uploads/battle-apps')
fs.mkdirSync(uploadsDir, { recursive: true })

const router = Router()

function safeFilename(originalName, mime = 'image/jpeg') {
  const extFromName = path.extname(originalName || '').toLowerCase()
  const safeBase = path
    .basename(originalName || 'upload', extFromName)
    .replace(/[^a-zA-Z0-9_-]/g, '-')
    .slice(0, 48)
  const mimeExt = String(mime.split('/')[1] || 'jpg').replace('jpeg', 'jpg')
  const ext = extFromName || `.${mimeExt}`
  return `${Date.now()}-${safeBase || 'upload'}${ext}`
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype?.startsWith('image/')) {
      return cb(new Error('Only image uploads allowed'))
    }
    cb(null, true)
  },
})

const applicationUpload = upload.fields([
  { name: 'followersScreenshot', maxCount: 1 },
  { name: 'giftingLevelScreenshot', maxCount: 1 },
])

function normalizeHandle(raw) {
  return String(raw || '')
    .trim()
    .replace(/^@+/, '')
    .toLowerCase()
}

function parseFollowers(raw) {
  if (raw == null || raw === '') return null
  const n = Number(String(raw).replace(/,/g, '').trim())
  if (!Number.isFinite(n) || n < 0) return null
  return Math.floor(n)
}

function parseCoins(raw) {
  if (raw == null || raw === '') return null
  const n = Number(String(raw).replace(/,/g, '').trim())
  if (!Number.isFinite(n) || n < 0) return null
  return Math.floor(n)
}

function parseEmail(raw) {
  const email = String(raw || '')
    .trim()
    .toLowerCase()
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null
  if (email.length > 254) return null
  return email
}

async function persistApplicationImage(file, prefix) {
  const finalName = safeFilename(file.originalname, file.mimetype)
  const key = `battle-apps/${prefix}-${finalName}`

  if (spacesConfigured()) {
    return uploadBufferToSpaces({
      key,
      body: file.buffer,
      contentType: file.mimetype,
    })
  }

  const filePath = path.join(uploadsDir, `${prefix}-${finalName}`)
  fs.writeFileSync(filePath, file.buffer)
  return `/uploads/battle-apps/${prefix}-${finalName}`
}

function serializeApplication(row) {
  if (!row) return null
  let availableDate = row.available_date
  if (availableDate instanceof Date) {
    const y = availableDate.getFullYear()
    const m = String(availableDate.getMonth() + 1).padStart(2, '0')
    const d = String(availableDate.getDate()).padStart(2, '0')
    availableDate = `${y}-${m}-${d}`
  } else if (availableDate != null) {
    availableDate = String(availableDate).slice(0, 10)
  }
  return {
    id: row.id,
    entryType: row.entry_type,
    battleLabel: row.battle_label,
    fullName: row.full_name,
    tiktokHandle: row.tiktok_handle,
    email: row.email,
    country: row.country,
    whatsapp: row.whatsapp,
    followers: row.followers,
    followersScreenshotUrl: row.followers_screenshot_url,
    leagueLevel: row.league_level,
    badgeNumber: row.badge_number,
    hasCommunity: row.has_community,
    highestCoins: row.highest_coins != null ? Number(row.highest_coins) : null,
    canRallySupporters: row.can_rally_supporters,
    giftingLevelScreenshotUrl: row.gifting_level_screenshot_url,
    availableDate,
    status: row.status,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function validateApplicationBody(body, files) {
  const entryType = String(body?.entryType || body?.type || 'official')
    .trim()
    .toLowerCase()
  const allowedTypes = new Set(['official', 'special'])
  if (!allowedTypes.has(entryType)) {
    return { error: 'Invalid entry type' }
  }

  const fullName = String(body?.fullName || body?.name || '').trim()
  if (!fullName || fullName.length < 2) {
    return { error: 'Please enter your full name' }
  }
  if (fullName.length > 120) {
    return { error: 'Full name is too long' }
  }

  const tiktokHandle = normalizeHandle(body?.tiktok || body?.tiktokHandle)
  if (!tiktokHandle || tiktokHandle.length < 2) {
    return { error: 'Please enter your TikTok username' }
  }
  if (tiktokHandle.length > 64) {
    return { error: 'TikTok username is too long' }
  }

  const email = parseEmail(body?.email)
  if (!email) {
    return { error: 'Please enter a valid email address' }
  }

  const country = String(body?.country || '').trim()
  if (!country || country.length < 2) {
    return { error: 'Please enter your country' }
  }
  if (country.length > 120) {
    return { error: 'Country name is too long' }
  }

  const whatsapp = String(body?.whatsapp || '').trim()
  if (!whatsapp || whatsapp.length < 6) {
    return { error: 'Please enter your WhatsApp number' }
  }
  if (whatsapp.length > 32) {
    return { error: 'WhatsApp number is too long' }
  }

  const followers = parseFollowers(body?.followers)
  if (followers == null) {
    return { error: 'Please enter your TikTok follower count' }
  }

  const followersScreenshot = files?.followersScreenshot?.[0]
  if (!followersScreenshot) {
    return { error: 'Please attach a screenshot of your TikTok follower count' }
  }

  let battleLabel = String(body?.battleLabel || body?.game || body?.battleType || '').trim()
  if (!battleLabel) {
    return { error: 'Please choose which box battle you are applying for' }
  }

  const leagueLevel = String(body?.leagueLevel || '').trim()
  if (!leagueLevel || leagueLevel.length > 64) {
    return { error: 'Please select your league level' }
  }

  const badgeNumber = String(body?.badgeNumber || '').trim()
  if (!badgeNumber || badgeNumber.length > 64) {
    return { error: 'Please enter your badge number' }
  }

  const hasCommunity = String(body?.hasCommunity || '').trim().toLowerCase()
  if (!['yes', 'no'].includes(hasCommunity)) {
    return { error: 'Please tell us if you have a community or team' }
  }

  const highestCoins = parseCoins(body?.highestCoins)
  if (highestCoins == null) {
    return { error: 'Please enter your highest TikTok coins gained in a single battle' }
  }

  const canRallySupporters = String(body?.canRallySupporters || '').trim().toLowerCase()
  if (!['yes', 'no', 'maybe'].includes(canRallySupporters)) {
    return { error: 'Please tell us if you can rally your supporters for the event' }
  }

  const giftingLevelScreenshot = files?.giftingLevelScreenshot?.[0]
  if (!giftingLevelScreenshot) {
    return { error: 'Please attach a screenshot of your gifting level' }
  }

  return {
    entryType,
    fullName,
    tiktokHandle,
    email,
    country,
    whatsapp,
    followers,
    battleLabel,
    leagueLevel,
    badgeNumber,
    hasCommunity,
    highestCoins,
    canRallySupporters,
    followersScreenshot,
    giftingLevelScreenshot,
  }
}

/** Public: submit a box battle application */
router.post('/', applicationUpload, async (req, res) => {
  try {
    const validated = validateApplicationBody(req.body, req.files)
    if (validated.error) {
      return res.status(400).json({ error: validated.error })
    }

    const followersScreenshotUrl = await persistApplicationImage(
      validated.followersScreenshot,
      'followers',
    )
    const giftingLevelScreenshotUrl = await persistApplicationImage(
      validated.giftingLevelScreenshot,
      'gifting',
    )

    const inserted = await query(
      `INSERT INTO battle_applications
         (entry_type, battle_label, full_name, tiktok_handle, email, country, whatsapp,
          followers, followers_screenshot_url, league_level, badge_number, has_community,
          highest_coins, can_rally_supporters, gifting_level_screenshot_url, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, 'new')
       RETURNING *`,
      [
        validated.entryType,
        validated.battleLabel,
        validated.fullName,
        validated.tiktokHandle,
        validated.email,
        validated.country,
        validated.whatsapp,
        validated.followers,
        followersScreenshotUrl,
        validated.leagueLevel,
        validated.badgeNumber,
        validated.hasCommunity,
        validated.highestCoins,
        validated.canRallySupporters,
        giftingLevelScreenshotUrl,
      ],
    )

    res.status(201).json({
      ok: true,
      application: serializeApplication(inserted.rows[0]),
    })
  } catch (err) {
    console.error('battle application create', err)
    res.status(500).json({ error: err.message || 'Failed to submit application' })
  }
})

/** Admin list — mounted with authRequired */
export const adminBattleApplicationsRouter = Router()

adminBattleApplicationsRouter.get('/', async (req, res) => {
  try {
    const status = String(req.query.status || '').trim().toLowerCase()
    const entryType = String(req.query.type || '').trim().toLowerCase()
    const clauses = []
    const params = []

    if (status && status !== 'all') {
      params.push(status)
      clauses.push(`status = $${params.length}`)
    }
    if (entryType && entryType !== 'all') {
      params.push(entryType)
      clauses.push(`entry_type = $${params.length}`)
    }

    const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : ''
    const r = await query(
      `SELECT *
       FROM battle_applications
       ${where}
       ORDER BY created_at DESC
       LIMIT 500`,
      params,
    )

    const counts = await query(
      `SELECT status, COUNT(*)::int AS count
       FROM battle_applications
       GROUP BY status`,
    )
    const typeCounts = await query(
      `SELECT entry_type, COUNT(*)::int AS count
       FROM battle_applications
       GROUP BY entry_type`,
    )

    res.json({
      applications: r.rows.map(serializeApplication),
      counts: Object.fromEntries(counts.rows.map((row) => [row.status, row.count])),
      typeCounts: Object.fromEntries(typeCounts.rows.map((row) => [row.entry_type, row.count])),
    })
  } catch (err) {
    console.error('list battle applications', err)
    res.status(500).json({ error: err.message || 'Failed to load applications' })
  }
})

adminBattleApplicationsRouter.patch('/:id', async (req, res) => {
  try {
    const notes = req.body?.notes != null ? String(req.body.notes) : undefined
    const status = req.body?.status != null ? String(req.body.status).toLowerCase() : undefined
    const allowed = new Set(['new', 'contacted', 'approved', 'declined'])
    if (status != null && !allowed.has(status)) {
      return res.status(400).json({ error: 'Invalid status' })
    }

    const current = await query(`SELECT * FROM battle_applications WHERE id = $1 LIMIT 1`, [
      req.params.id,
    ])
    if (!current.rows[0]) return res.status(404).json({ error: 'Not found' })

    const nextNotes = notes !== undefined ? notes : current.rows[0].notes
    const nextStatus = status !== undefined ? status : current.rows[0].status

    const updated = await query(
      `UPDATE battle_applications
       SET notes = $1, status = $2, updated_at = NOW()
       WHERE id = $3
       RETURNING *`,
      [nextNotes, nextStatus, req.params.id],
    )

    res.json({ application: serializeApplication(updated.rows[0]) })
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to update application' })
  }
})

export default router

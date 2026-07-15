import { Router } from 'express'
import { query } from '../db.js'

const router = Router()

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
    followers: row.followers,
    availableDate,
    status: row.status,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

/** Public: submit a box battle application */
router.post('/', async (req, res) => {
  try {
    const entryType = String(req.body?.entryType || req.body?.type || 'official')
      .trim()
      .toLowerCase()
    const allowedTypes = new Set(['official', 'special'])
    if (!allowedTypes.has(entryType)) {
      return res.status(400).json({ error: 'Invalid entry type' })
    }

    const fullName = String(req.body?.fullName || req.body?.name || '').trim()
    if (!fullName || fullName.length < 2) {
      return res.status(400).json({ error: 'Please enter your full name' })
    }
    if (fullName.length > 120) {
      return res.status(400).json({ error: 'Full name is too long' })
    }

    const tiktokHandle = normalizeHandle(req.body?.tiktok || req.body?.tiktokHandle)
    if (!tiktokHandle || tiktokHandle.length < 2) {
      return res.status(400).json({ error: 'Please enter your TikTok username' })
    }
    if (tiktokHandle.length > 64) {
      return res.status(400).json({ error: 'TikTok username is too long' })
    }

    const followers = parseFollowers(req.body?.followers)
    if (followers == null) {
      return res.status(400).json({ error: 'Please enter your TikTok follower count' })
    }

    const availableDate = String(req.body?.date || req.body?.availableDate || '').trim()
    if (!availableDate || !/^\d{4}-\d{2}-\d{2}$/.test(availableDate)) {
      return res.status(400).json({ error: 'Please pick a valid available date' })
    }

    let battleLabel = String(req.body?.battleLabel || req.body?.game || req.body?.battleType || '')
      .trim()
    if (!battleLabel) {
      return res.status(400).json({ error: 'Please choose which box battle you are applying for' })
    }

    const inserted = await query(
      `INSERT INTO battle_applications
         (entry_type, battle_label, full_name, tiktok_handle, followers, available_date, status)
       VALUES ($1, $2, $3, $4, $5, $6::date, 'new')
       RETURNING *`,
      [entryType, battleLabel, fullName, tiktokHandle, followers, availableDate],
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

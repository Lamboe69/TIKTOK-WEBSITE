import { Router } from 'express'
import { query } from '../db.js'

const router = Router()

const ALLOWED_SUPPORT = new Set(['Financial', 'Education', 'Medical', 'Emergency', 'Others'])
const ALLOWED_STATUS = new Set(['new', 'contacted', 'approved', 'declined'])

function serializeApplication(row) {
  if (!row) return null
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    country: row.country,
    supportType: row.support_type,
    story: row.story,
    status: row.status,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

/** Public: submit a charity support application */
router.post('/', async (req, res) => {
  try {
    const fullName = String(req.body?.fullName || req.body?.name || '').trim()
    if (!fullName || fullName.length < 2) {
      return res.status(400).json({ error: 'Please enter your full name' })
    }
    if (fullName.length > 120) {
      return res.status(400).json({ error: 'Full name is too long' })
    }

    const email = String(req.body?.email || '').trim().toLowerCase()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email' })
    }

    const phone = String(req.body?.phone || '').trim()
    if (!phone || phone.length < 5) {
      return res.status(400).json({ error: 'Please enter a phone or WhatsApp number' })
    }

    const country = String(req.body?.country || '').trim()
    if (!country || country.length < 2) {
      return res.status(400).json({ error: 'Please enter your country' })
    }

    let supportType = String(req.body?.supportType || '').trim()
    if (!ALLOWED_SUPPORT.has(supportType)) {
      return res.status(400).json({ error: 'Please select a type of support' })
    }

    const story = String(req.body?.story || '').trim()
    if (!story || story.length < 10) {
      return res.status(400).json({ error: 'Please tell us your story' })
    }
    if (story.length > 8000) {
      return res.status(400).json({ error: 'Story is too long' })
    }

    const inserted = await query(
      `INSERT INTO charity_applications
         (full_name, email, phone, country, support_type, story, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'new')
       RETURNING *`,
      [fullName, email, phone, country, supportType, story],
    )

    res.status(201).json({
      ok: true,
      application: serializeApplication(inserted.rows[0]),
    })
  } catch (err) {
    console.error('charity application create', err)
    res.status(500).json({ error: err.message || 'Failed to submit application' })
  }
})

export const adminCharityApplicationsRouter = Router()

adminCharityApplicationsRouter.get('/', async (req, res) => {
  try {
    const status = String(req.query.status || '').trim().toLowerCase()
    const supportType = String(req.query.supportType || '').trim()
    const clauses = []
    const params = []

    if (status && status !== 'all' && ALLOWED_STATUS.has(status)) {
      params.push(status)
      clauses.push(`status = $${params.length}`)
    }
    if (supportType && supportType !== 'all' && ALLOWED_SUPPORT.has(supportType)) {
      params.push(supportType)
      clauses.push(`support_type = $${params.length}`)
    }

    const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : ''
    const r = await query(
      `SELECT * FROM charity_applications ${where} ORDER BY created_at DESC LIMIT 500`,
      params,
    )

    const counts = await query(
      `SELECT status, COUNT(*)::int AS count FROM charity_applications GROUP BY status`,
    )
    const supportCounts = await query(
      `SELECT support_type, COUNT(*)::int AS count FROM charity_applications GROUP BY support_type`,
    )

    res.json({
      applications: r.rows.map(serializeApplication),
      counts: Object.fromEntries(counts.rows.map((row) => [row.status, row.count])),
      supportCounts: Object.fromEntries(
        supportCounts.rows.map((row) => [row.support_type, row.count]),
      ),
    })
  } catch (err) {
    console.error('list charity applications', err)
    res.status(500).json({ error: err.message || 'Failed to load applications' })
  }
})

adminCharityApplicationsRouter.patch('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    if (!Number.isFinite(id)) {
      return res.status(400).json({ error: 'Invalid id' })
    }

    const existing = await query(`SELECT * FROM charity_applications WHERE id = $1`, [id])
    if (!existing.rows[0]) {
      return res.status(404).json({ error: 'Application not found' })
    }

    const updates = []
    const params = []

    if (req.body?.status != null) {
      const status = String(req.body.status).trim().toLowerCase()
      if (!ALLOWED_STATUS.has(status)) {
        return res.status(400).json({ error: 'Invalid status' })
      }
      params.push(status)
      updates.push(`status = $${params.length}`)
    }

    if (req.body?.notes != null) {
      params.push(String(req.body.notes))
      updates.push(`notes = $${params.length}`)
    }

    if (!updates.length) {
      return res.status(400).json({ error: 'Nothing to update' })
    }

    updates.push(`updated_at = NOW()`)
    params.push(id)

    const updated = await query(
      `UPDATE charity_applications SET ${updates.join(', ')} WHERE id = $${params.length} RETURNING *`,
      params,
    )

    res.json({ ok: true, application: serializeApplication(updated.rows[0]) })
  } catch (err) {
    console.error('patch charity application', err)
    res.status(500).json({ error: err.message || 'Failed to update application' })
  }
})

export default router

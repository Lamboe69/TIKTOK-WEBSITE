import { Router } from 'express'
import { query } from '../db.js'

const router = Router()

const ALLOWED_TOPICS = new Set([
  'General Question',
  "Creator Management Inquiry (La'Gwat Agency)",
  'Press / Media',
  'Other',
])

const ALLOWED_STATUS = new Set(['new', 'in_progress', 'resolved', 'archived'])

function serializeMessage(row) {
  if (!row) return null
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    topic: row.topic,
    message: row.message,
    status: row.status,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    resolvedAt: row.resolved_at,
  }
}

/** Public: submit a contact form message */
router.post('/', async (req, res) => {
  try {
    const name = String(req.body?.name || '').trim()
    if (!name || name.length < 2) {
      return res.status(400).json({ error: 'Please enter your full name' })
    }
    if (name.length > 120) {
      return res.status(400).json({ error: 'Name is too long' })
    }

    const email = String(req.body?.email || '').trim().toLowerCase()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email' })
    }
    if (email.length > 200) {
      return res.status(400).json({ error: 'Email is too long' })
    }

    let topic = String(req.body?.topic || req.body?.reason || '').trim()
    if (!topic) topic = 'General Question'
    if (!ALLOWED_TOPICS.has(topic)) {
      topic = 'Other'
    }

    const message = String(req.body?.message || '').trim()
    if (!message || message.length < 5) {
      return res.status(400).json({ error: 'Please write a short message' })
    }
    if (message.length > 5000) {
      return res.status(400).json({ error: 'Message is too long' })
    }

    const inserted = await query(
      `INSERT INTO contact_messages (name, email, topic, message, status)
       VALUES ($1, $2, $3, $4, 'new')
       RETURNING *`,
      [name, email, topic, message],
    )

    res.status(201).json({
      ok: true,
      message: serializeMessage(inserted.rows[0]),
    })
  } catch (e) {
    console.error('contact submit', e)
    res.status(500).json({ error: e.message || 'Failed to send message' })
  }
})

export const adminContactMessagesRouter = Router()

adminContactMessagesRouter.get('/', async (req, res) => {
  try {
    const status = String(req.query.status || '').trim()
    const topic = String(req.query.topic || '').trim()
    const params = []
    const where = []

    if (status && status !== 'all' && ALLOWED_STATUS.has(status)) {
      params.push(status)
      where.push(`status = $${params.length}`)
    }
    if (topic && topic !== 'all') {
      params.push(topic)
      where.push(`topic = $${params.length}`)
    }

    const clause = where.length ? `WHERE ${where.join(' AND ')}` : ''
    const result = await query(
      `SELECT * FROM contact_messages ${clause} ORDER BY created_at DESC LIMIT 500`,
      params,
    )

    const countsRes = await query(
      `SELECT status, COUNT(*)::int AS n FROM contact_messages GROUP BY status`,
    )
    const counts = { new: 0, in_progress: 0, resolved: 0, archived: 0 }
    for (const row of countsRes.rows) {
      counts[row.status] = row.n
    }

    const topicCountsRes = await query(
      `SELECT topic, COUNT(*)::int AS n FROM contact_messages GROUP BY topic`,
    )
    const topicCounts = {}
    for (const row of topicCountsRes.rows) {
      topicCounts[row.topic] = row.n
    }

    res.json({
      messages: result.rows.map(serializeMessage),
      counts,
      topicCounts,
    })
  } catch (e) {
    console.error('admin contact list', e)
    res.status(500).json({ error: e.message })
  }
})

adminContactMessagesRouter.patch('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    if (!Number.isFinite(id)) {
      return res.status(400).json({ error: 'Invalid id' })
    }

    const existing = await query(`SELECT * FROM contact_messages WHERE id = $1`, [id])
    if (!existing.rows[0]) {
      return res.status(404).json({ error: 'Message not found' })
    }

    const updates = []
    const params = []

    if (req.body?.status != null) {
      const status = String(req.body.status).trim()
      if (!ALLOWED_STATUS.has(status)) {
        return res.status(400).json({ error: 'Invalid status' })
      }
      params.push(status)
      updates.push(`status = $${params.length}`)
      if (status === 'resolved') {
        updates.push(`resolved_at = COALESCE(resolved_at, NOW())`)
      } else if (existing.rows[0].status === 'resolved' && status !== 'resolved') {
        updates.push(`resolved_at = NULL`)
      }
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
      `UPDATE contact_messages SET ${updates.join(', ')} WHERE id = $${params.length} RETURNING *`,
      params,
    )

    res.json({ ok: true, message: serializeMessage(updated.rows[0]) })
  } catch (e) {
    console.error('admin contact patch', e)
    res.status(500).json({ error: e.message })
  }
})

export default router

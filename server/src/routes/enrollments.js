import { Router } from 'express'
import { query } from '../db.js'
import { serializeEnrollment } from './paypal.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const status = String(req.query.status || '').trim().toLowerCase()
    const params = []
    let where = ''
    if (status && status !== 'all') {
      params.push(status)
      where = `WHERE status = $1`
    }

    const r = await query(
      `SELECT *
       FROM masterclass_enrollments
       ${where}
       ORDER BY created_at DESC
       LIMIT 500`,
      params,
    )

    const counts = await query(
      `SELECT status, COUNT(*)::int AS count
       FROM masterclass_enrollments
       GROUP BY status`,
    )

    res.json({
      enrollments: r.rows.map(serializeEnrollment),
      counts: Object.fromEntries(counts.rows.map((row) => [row.status, row.count])),
    })
  } catch (err) {
    console.error('list enrollments', err)
    res.status(500).json({ error: err.message || 'Failed to load enrollments' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const r = await query(`SELECT * FROM masterclass_enrollments WHERE id = $1 LIMIT 1`, [
      req.params.id,
    ])
    if (!r.rows[0]) return res.status(404).json({ error: 'Not found' })
    res.json({ enrollment: serializeEnrollment(r.rows[0]) })
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to load enrollment' })
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const notes = req.body?.notes != null ? String(req.body.notes) : undefined
    const status = req.body?.status != null ? String(req.body.status).toLowerCase() : undefined

    const allowed = new Set(['pending', 'paid', 'failed', 'refunded', 'contacted'])
    if (status != null && !allowed.has(status)) {
      return res.status(400).json({ error: 'Invalid status' })
    }

    const current = await query(`SELECT * FROM masterclass_enrollments WHERE id = $1 LIMIT 1`, [
      req.params.id,
    ])
    if (!current.rows[0]) return res.status(404).json({ error: 'Not found' })

    const nextNotes = notes !== undefined ? notes : current.rows[0].notes
    const nextStatus = status !== undefined ? status : current.rows[0].status

    const updated = await query(
      `UPDATE masterclass_enrollments
       SET notes = $1, status = $2, updated_at = NOW()
       WHERE id = $3
       RETURNING *`,
      [nextNotes, nextStatus, req.params.id],
    )

    res.json({ enrollment: serializeEnrollment(updated.rows[0]) })
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to update enrollment' })
  }
})

export default router

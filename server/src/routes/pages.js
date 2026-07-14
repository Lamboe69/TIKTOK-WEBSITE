import { Router } from 'express'
import { query } from '../db.js'
import { authRequired } from '../auth.js'
import { bumpMeta } from '../contentStore.js'
import { pool } from '../db.js'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const r = await query(`SELECT key, data, updated_at FROM pages ORDER BY key`)
    const pages = {}
    for (const row of r.rows) pages[row.key] = row.data
    res.json({ pages })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.get('/:key', async (req, res) => {
  try {
    const r = await query(`SELECT key, data, updated_at FROM pages WHERE key = $1`, [req.params.key])
    if (!r.rowCount) return res.status(404).json({ error: 'Page not found' })
    res.json({ key: r.rows[0].key, data: r.rows[0].data, updatedAt: r.rows[0].updated_at })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.put('/:key', authRequired, async (req, res) => {
  const client = await pool.connect()
  try {
    const data = req.body?.data ?? req.body ?? {}
    const r = await client.query(
      `INSERT INTO pages (key, data, updated_at)
       VALUES ($1, $2::jsonb, NOW())
       ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()
       RETURNING key, data, updated_at`,
      [req.params.key, JSON.stringify(data)],
    )
    await bumpMeta(client)
    res.json({ key: r.rows[0].key, data: r.rows[0].data, updatedAt: r.rows[0].updated_at })
  } catch (e) {
    res.status(500).json({ error: e.message })
  } finally {
    client.release()
  }
})

router.delete('/:key', authRequired, async (req, res) => {
  const client = await pool.connect()
  try {
    const r = await client.query(`DELETE FROM pages WHERE key = $1`, [req.params.key])
    if (!r.rowCount) return res.status(404).json({ error: 'Page not found' })
    await bumpMeta(client)
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  } finally {
    client.release()
  }
})

export default router

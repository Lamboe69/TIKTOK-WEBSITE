import { Router } from 'express'
import { pool, query } from '../db.js'
import { authRequired } from '../auth.js'
import { bumpMeta } from '../contentStore.js'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const r = await query(`SELECT data, updated_at FROM site_settings WHERE id = 1`)
    res.json({ settings: r.rows[0]?.data || {}, updatedAt: r.rows[0]?.updated_at })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.put('/', authRequired, async (req, res) => {
  const client = await pool.connect()
  try {
    const incoming = req.body?.settings ?? req.body ?? {}
    const current = await client.query(`SELECT data FROM site_settings WHERE id = 1`)
    const data = { ...(current.rows[0]?.data || {}), ...incoming }
    const r = await client.query(
      `INSERT INTO site_settings (id, data, updated_at)
       VALUES (1, $1::jsonb, NOW())
       ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()
       RETURNING data, updated_at`,
      [JSON.stringify(data)],
    )
    await bumpMeta(client)
    res.json({ settings: r.rows[0].data, updatedAt: r.rows[0].updated_at })
  } catch (e) {
    res.status(500).json({ error: e.message })
  } finally {
    client.release()
  }
})

export default router

import { Router } from 'express'
import { pool } from '../db.js'
import { authRequired } from '../auth.js'
import { assembleContent, replaceAllContent } from '../contentStore.js'

const router = Router()

router.get('/', async (_req, res) => {
  const client = await pool.connect()
  try {
    const content = await assembleContent(client)
    res.json(content)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e.message || 'Failed to load content' })
  } finally {
    client.release()
  }
})

router.put('/', authRequired, async (req, res) => {
  const body = req.body
  if (!body || typeof body !== 'object' || !body.collections || !body.settings) {
    return res.status(400).json({ error: 'Invalid content payload' })
  }
  const client = await pool.connect()
  try {
    const saved = await replaceAllContent(client, body)
    res.json(saved)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e.message || 'Failed to save content' })
  } finally {
    client.release()
  }
})

export default router

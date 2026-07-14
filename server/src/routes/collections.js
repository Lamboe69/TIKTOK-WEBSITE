import { Router } from 'express'
import { pool, query } from '../db.js'
import { authRequired } from '../auth.js'
import {
  BLOB_COLLECTIONS,
  ITEM_COLLECTIONS,
  assembleContent,
  bumpMeta,
  ensureItemId,
} from '../contentStore.js'

const router = Router()

router.get('/', authRequired, async (_req, res) => {
  const client = await pool.connect()
  try {
    const content = await assembleContent(client)
    res.json({
      itemCollections: ITEM_COLLECTIONS,
      blobCollections: BLOB_COLLECTIONS,
      collections: content.collections,
    })
  } catch (e) {
    res.status(500).json({ error: e.message })
  } finally {
    client.release()
  }
})

router.get('/:key', async (req, res) => {
  const { key } = req.params
  try {
    if (BLOB_COLLECTIONS.includes(key)) {
      const r = await query(`SELECT data FROM collection_blobs WHERE key = $1`, [key])
      return res.json({
        key,
        data: r.rows[0]?.data ?? (key === 'masterclassMeta' ? {} : []),
      })
    }
    if (ITEM_COLLECTIONS.includes(key)) {
      const r = await query(
        `SELECT item_id, sort_order, data FROM collection_items
         WHERE collection_key = $1 ORDER BY sort_order, id`,
        [key],
      )
      const items = r.rows.map((row) => {
        const numeric = Number(row.item_id)
        const id =
          Number.isFinite(numeric) && String(numeric) === String(row.item_id)
            ? numeric
            : row.item_id
        return { ...(row.data || {}), id }
      })
      return res.json({ key, items })
    }
    return res.status(404).json({ error: 'Unknown collection' })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
})

router.put('/:key', authRequired, async (req, res) => {
  const { key } = req.params
  const client = await pool.connect()
  try {
    if (BLOB_COLLECTIONS.includes(key)) {
      await client.query(
        `INSERT INTO collection_blobs (key, data, updated_at)
         VALUES ($1, $2::jsonb, NOW())
         ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`,
        [key, JSON.stringify(req.body?.data ?? req.body ?? [])],
      )
      await bumpMeta(client)
      const r = await client.query(`SELECT data FROM collection_blobs WHERE key = $1`, [key])
      return res.json({ key, data: r.rows[0].data })
    }

    if (ITEM_COLLECTIONS.includes(key)) {
      const items = Array.isArray(req.body?.items)
        ? req.body.items
        : Array.isArray(req.body)
          ? req.body
          : null
      if (!items) return res.status(400).json({ error: 'Expected items array' })
      await client.query('BEGIN')
      await client.query(`DELETE FROM collection_items WHERE collection_key = $1`, [key])
      for (let i = 0; i < items.length; i++) {
        const item = items[i] || {}
        const itemId = ensureItemId(item, i)
        const numeric = Number(itemId)
        const idValue =
          Number.isFinite(numeric) && String(numeric) === String(itemId) ? numeric : itemId
        await client.query(
          `INSERT INTO collection_items (collection_key, item_id, sort_order, data, updated_at)
           VALUES ($1, $2, $3, $4::jsonb, NOW())`,
          [key, itemId, i, JSON.stringify({ ...item, id: idValue })],
        )
      }
      await bumpMeta(client)
      await client.query('COMMIT')
      return res.json({ key, items })
    }

    return res.status(404).json({ error: 'Unknown collection' })
  } catch (e) {
    await client.query('ROLLBACK').catch(() => {})
    return res.status(500).json({ error: e.message })
  } finally {
    client.release()
  }
})

router.post('/:key/items', authRequired, async (req, res) => {
  const { key } = req.params
  if (!ITEM_COLLECTIONS.includes(key)) {
    return res.status(400).json({ error: 'Not an item collection' })
  }
  const item = req.body || {}
  const itemId = ensureItemId(item)
  const client = await pool.connect()
  try {
    const max = await client.query(
      `SELECT COALESCE(MAX(sort_order), -1) + 1 AS next
       FROM collection_items WHERE collection_key = $1`,
      [key],
    )
    const sort = max.rows[0].next
    const numeric = Number(itemId)
    const idValue =
      Number.isFinite(numeric) && String(numeric) === String(itemId) ? numeric : itemId
    const data = { ...item, id: idValue }
    await client.query(
      `INSERT INTO collection_items (collection_key, item_id, sort_order, data, updated_at)
       VALUES ($1, $2, $3, $4::jsonb, NOW())
       ON CONFLICT (collection_key, item_id)
       DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`,
      [key, itemId, sort, JSON.stringify(data)],
    )
    await bumpMeta(client)
    res.status(201).json(data)
  } catch (e) {
    res.status(500).json({ error: e.message })
  } finally {
    client.release()
  }
})

router.put('/:key/items/:id', authRequired, async (req, res) => {
  const { key, id } = req.params
  if (!ITEM_COLLECTIONS.includes(key)) {
    return res.status(400).json({ error: 'Not an item collection' })
  }
  const client = await pool.connect()
  try {
    const numeric = Number(id)
    const idValue =
      Number.isFinite(numeric) && String(numeric) === String(id) ? numeric : id
    const data = { ...(req.body || {}), id: idValue }
    const r = await client.query(
      `UPDATE collection_items
       SET data = $3::jsonb, updated_at = NOW()
       WHERE collection_key = $1 AND item_id = $2
       RETURNING data`,
      [key, String(id), JSON.stringify(data)],
    )
    if (!r.rowCount) return res.status(404).json({ error: 'Item not found' })
    await bumpMeta(client)
    res.json(r.rows[0].data)
  } catch (e) {
    res.status(500).json({ error: e.message })
  } finally {
    client.release()
  }
})

router.delete('/:key/items/:id', authRequired, async (req, res) => {
  const { key, id } = req.params
  if (!ITEM_COLLECTIONS.includes(key)) {
    return res.status(400).json({ error: 'Not an item collection' })
  }
  const client = await pool.connect()
  try {
    const r = await client.query(
      `DELETE FROM collection_items WHERE collection_key = $1 AND item_id = $2`,
      [key, String(id)],
    )
    if (!r.rowCount) return res.status(404).json({ error: 'Item not found' })
    await bumpMeta(client)
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  } finally {
    client.release()
  }
})

export default router

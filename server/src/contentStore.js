import path from 'path'

/** Collections stored as row items vs JSON blobs */
export const ITEM_COLLECTIONS = [
  'heroSlides',
  'quotes',
  'schedule',
  'blogPosts',
  'gallery',
  'testimonials',
  'topGifters',
  'topFans',
  'agencyRegions',
  'masterclassTiers',
  'masterclassTerms',
  'faq',
  'adPackages',
  'joinSteps',
  'howItWorks',
  'battleCatalog',
  'contactLines',
  'contactTeam',
  'aboutCast',
  'contactTopics',
  'navLinks',
  'navMoreLinks',
  'footerExploreLinks',
  'footerCommunityLinks',
  'footerSupportLinks',
]

export const BLOB_COLLECTIONS = [
  'battleTypes',
  'blogCategories',
  'galleryCategories',
  'faqCategories',
  'masterclassMeta',
  'mediaLibrary',
]

export function ensureItemId(item, index = 0) {
  if (item && item.id != null && item.id !== '') return String(item.id)
  return String(Date.now() + index)
}

export async function bumpMeta(client) {
  await client.query(
    `UPDATE content_meta
     SET version = version + 1, updated_at = NOW()
     WHERE id = 1`,
  )
}

export async function assembleContent(client) {
  const settingsRes = await client.query(`SELECT data FROM site_settings WHERE id = 1`)
  const pagesRes = await client.query(`SELECT key, data FROM pages ORDER BY key`)
  const blobsRes = await client.query(`SELECT key, data FROM collection_blobs`)
  const itemsRes = await client.query(
    `SELECT collection_key, item_id, sort_order, data
     FROM collection_items
     ORDER BY collection_key, sort_order, id`,
  )
  const metaRes = await client.query(`SELECT version, updated_at FROM content_meta WHERE id = 1`)

  const settings = settingsRes.rows[0]?.data || {}
  const pages = {}
  for (const row of pagesRes.rows) pages[row.key] = row.data

  const collections = {}
  for (const row of blobsRes.rows) collections[row.key] = row.data

  for (const key of ITEM_COLLECTIONS) {
    if (!collections[key]) collections[key] = []
  }

  for (const row of itemsRes.rows) {
    const raw = row.data || {}
    const numeric = Number(row.item_id)
    const id = Number.isFinite(numeric) && String(numeric) === String(row.item_id) ? numeric : row.item_id
    const item = { ...raw, id }
    if (!Array.isArray(collections[row.collection_key])) {
      collections[row.collection_key] = []
    }
    collections[row.collection_key].push(item)
  }

  if (!collections.mediaLibrary?.length) {
    const media = await client.query(`SELECT path FROM media ORDER BY created_at DESC`)
    collections.mediaLibrary = media.rows.map((r) => r.path)
  }

  const meta = metaRes.rows[0] || { version: 1, updated_at: new Date() }

  return {
    version: meta.version,
    updatedAt: meta.updated_at,
    settings,
    pages,
    collections,
  }
}

export async function replaceAllContent(client, body) {
  const settings = body.settings || {}
  const pages = body.pages || {}
  const collections = body.collections || {}

  await client.query('BEGIN')
  try {
    await client.query(
      `INSERT INTO site_settings (id, data, updated_at)
       VALUES (1, $1::jsonb, NOW())
       ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`,
      [JSON.stringify(settings)],
    )

    for (const key of Object.keys(pages)) {
      await client.query(
        `INSERT INTO pages (key, data, updated_at)
         VALUES ($1, $2::jsonb, NOW())
         ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`,
        [key, JSON.stringify(pages[key] || {})],
      )
    }

    for (const key of BLOB_COLLECTIONS) {
      if (!(key in collections)) continue
      await client.query(
        `INSERT INTO collection_blobs (key, data, updated_at)
         VALUES ($1, $2::jsonb, NOW())
         ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`,
        [key, JSON.stringify(collections[key] ?? [])],
      )
    }

    for (const key of ITEM_COLLECTIONS) {
      if (!(key in collections)) continue
      const items = Array.isArray(collections[key]) ? collections[key] : []
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
    }

    if (Array.isArray(collections.mediaLibrary)) {
      for (const p of collections.mediaLibrary) {
        if (!p) continue
        await client.query(
          `INSERT INTO media (path, filename)
           VALUES ($1, $2)
           ON CONFLICT (path) DO NOTHING`,
          [p, path.basename(String(p))],
        )
      }
    }

    await bumpMeta(client)
    await client.query('COMMIT')
  } catch (e) {
    await client.query('ROLLBACK')
    throw e
  }

  return assembleContent(client)
}

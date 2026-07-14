import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { pool } from './db.js'
import { ensureDefaultAdmin } from './auth.js'
import { replaceAllContent } from './contentStore.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const seedPath = path.join(__dirname, '../../data/site-content.json')

async function seed() {
  await ensureDefaultAdmin()

  if (!fs.existsSync(seedPath)) {
    console.warn('No data/site-content.json found — skipping content seed')
    return
  }

  const raw = JSON.parse(fs.readFileSync(seedPath, 'utf-8'))
  const client = await pool.connect()
  try {
    const existing = await client.query(`SELECT COUNT(*)::int AS n FROM collection_items`)
    const pages = await client.query(`SELECT COUNT(*)::int AS n FROM pages`)
    if (existing.rows[0].n > 0 || pages.rows[0].n > 0) {
      console.log('✓ Content already present — skip seed (pass --force to override)')
      if (!process.argv.includes('--force')) return
      console.log('… --force: replacing all content')
    }
    await replaceAllContent(client, raw)
    console.log('✓ Seeded dynasty content from data/site-content.json')
  } finally {
    client.release()
  }
}

seed()
  .catch((err) => {
    console.error('Seed failed:', err)
    process.exitCode = 1
  })
  .finally(() => pool.end())

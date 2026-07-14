import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { pool, query } from './db.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function migrate() {
  const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8')
  await query(sql)
  console.log('✓ Migrated dynasty schema')
}

migrate()
  .catch((err) => {
    console.error('Migration failed:', err.message)
    process.exitCode = 1
  })
  .finally(() => pool.end())

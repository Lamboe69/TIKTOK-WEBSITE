import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

import { pool } from './db.js'
import { ensureDefaultAdmin, authRequired } from './auth.js'
import authRoutes from './routes/auth.js'
import contentRoutes from './routes/content.js'
import collectionsRoutes from './routes/collections.js'
import pagesRoutes from './routes/pages.js'
import settingsRoutes from './routes/settings.js'
import mediaRoutes, { handleJsonUpload } from './routes/media.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../.env') })

const app = express()
const PORT = Number(process.env.PORT || 4000)

app.use(cors({ origin: true, credentials: true }))
app.use(morgan('dev'))
app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ extended: true }))

app.use('/uploads', express.static(path.join(__dirname, '../../public/uploads')))

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1')
    res.json({ ok: true, db: 'dynasty', time: new Date().toISOString() })
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message })
  }
})

app.use('/api/admin', authRoutes)
app.post('/api/admin/upload', authRequired, handleJsonUpload)

app.use('/api/content', contentRoutes)
app.use('/api/collections', collectionsRoutes)
app.use('/api/pages', pagesRoutes)
app.use('/api/settings', settingsRoutes)
app.use('/api/media', mediaRoutes)

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: err.message || 'Server error' })
})

async function start() {
  await pool.query('SELECT 1')
  await ensureDefaultAdmin()
  app.listen(PORT, () => {
    console.log(`Dynasty API listening on http://localhost:${PORT}`)
    console.log(`Health: http://localhost:${PORT}/api/health`)
  })
}

start().catch((err) => {
  console.error('Failed to start server:', err.message)
  process.exit(1)
})

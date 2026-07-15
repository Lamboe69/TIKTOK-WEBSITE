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
import paypalRoutes from './routes/paypal.js'
import enrollmentsRoutes from './routes/enrollments.js'
import battleApplicationsRoutes, {
  adminBattleApplicationsRouter,
} from './routes/battleApplications.js'
import contactMessagesRoutes, {
  adminContactMessagesRouter,
} from './routes/contactMessages.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../.env') })

const app = express()
const PORT = Number(process.env.PORT || 4000)

async function ensureExtraTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS masterclass_enrollments (
      id                BIGSERIAL PRIMARY KEY,
      tier_id           TEXT NOT NULL,
      tier_name         TEXT NOT NULL,
      amount_cents      INT NOT NULL,
      currency          TEXT NOT NULL DEFAULT 'USD',
      buyer_name        TEXT NOT NULL,
      buyer_email       TEXT NOT NULL,
      buyer_phone       TEXT,
      status            TEXT NOT NULL DEFAULT 'pending',
      paypal_order_id   TEXT,
      paypal_capture_id TEXT,
      notes             TEXT,
      created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      paid_at           TIMESTAMPTZ
    );
    CREATE UNIQUE INDEX IF NOT EXISTS idx_enrollments_paypal_order
      ON masterclass_enrollments (paypal_order_id)
      WHERE paypal_order_id IS NOT NULL;
    CREATE INDEX IF NOT EXISTS idx_enrollments_status_created
      ON masterclass_enrollments (status, created_at DESC);

    CREATE TABLE IF NOT EXISTS battle_applications (
      id              BIGSERIAL PRIMARY KEY,
      entry_type      TEXT NOT NULL DEFAULT 'official',
      battle_label    TEXT NOT NULL,
      full_name       TEXT NOT NULL DEFAULT '',
      tiktok_handle   TEXT NOT NULL,
      followers       INT,
      available_date  DATE,
      status          TEXT NOT NULL DEFAULT 'new',
      notes           TEXT,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS idx_battle_apps_status_created
      ON battle_applications (status, created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_battle_apps_entry_type
      ON battle_applications (entry_type, created_at DESC);

    ALTER TABLE battle_applications ADD COLUMN IF NOT EXISTS full_name TEXT NOT NULL DEFAULT '';
    ALTER TABLE battle_applications ADD COLUMN IF NOT EXISTS followers INT;

    CREATE TABLE IF NOT EXISTS contact_messages (
      id           BIGSERIAL PRIMARY KEY,
      name         TEXT NOT NULL,
      email        TEXT NOT NULL,
      topic        TEXT NOT NULL DEFAULT 'General Question',
      message      TEXT NOT NULL,
      status       TEXT NOT NULL DEFAULT 'new',
      notes        TEXT,
      created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      resolved_at  TIMESTAMPTZ
    );
    CREATE INDEX IF NOT EXISTS idx_contact_messages_status_created
      ON contact_messages (status, created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_contact_messages_topic_created
      ON contact_messages (topic, created_at DESC);
  `)
}

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
app.use('/api/paypal', paypalRoutes)
app.use('/api/battle-applications', battleApplicationsRoutes)
app.use('/api/contact', contactMessagesRoutes)
app.use('/api/admin/enrollments', authRequired, enrollmentsRoutes)
app.use('/api/admin/battle-applications', authRequired, adminBattleApplicationsRouter)
app.use('/api/admin/contact-messages', authRequired, adminContactMessagesRouter)

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: err.message || 'Server error' })
})

async function start() {
  await pool.query('SELECT 1')
  await ensureExtraTables()
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

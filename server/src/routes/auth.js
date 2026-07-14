import { Router } from 'express'
import {
  ensureDefaultAdmin,
  findAdminByEmail,
  signToken,
  verifyPassword,
  verifyToken,
} from '../auth.js'

const router = Router()

router.post('/login', async (req, res) => {
  try {
    await ensureDefaultAdmin()
    const password = String(req.body?.password || '')
    const email = String(req.body?.email || process.env.ADMIN_EMAIL || 'admin@kmdynasty.com').toLowerCase()

    // Support password-only login (current admin UI) — look up default admin
    const admin = await findAdminByEmail(email)
    if (!admin || !(await verifyPassword(admin, password))) {
      return res.status(401).json({ error: 'Invalid password' })
    }

    const token = signToken(admin)
    return res.json({
      ok: true,
      token,
      admin: { id: admin.id, email: admin.email, name: admin.name },
    })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: e.message || 'Login failed' })
  }
})

router.get('/me', (req, res) => {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  const payload = token ? verifyToken(token) : null
  if (!payload) return res.status(401).json({ ok: false })
  return res.json({ ok: true, admin: payload })
})

router.post('/logout', (_req, res) => res.json({ ok: true }))

export default router

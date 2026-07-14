import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { query } from './db.js'

const JWT_SECRET = () => process.env.JWT_SECRET || process.env.ADMIN_SECRET || 'km-dynasty-dev-secret'
const TOKEN_TTL = process.env.JWT_TTL || '7d'

export async function findAdminByEmail(email) {
  const res = await query(`SELECT * FROM admins WHERE email = $1 LIMIT 1`, [email.toLowerCase()])
  return res.rows[0] || null
}

export async function verifyPassword(admin, password) {
  return bcrypt.compare(String(password || ''), admin.password_hash)
}

export function signToken(admin) {
  return jwt.sign(
    { sub: admin.id, email: admin.email, name: admin.name },
    JWT_SECRET(),
    { expiresIn: TOKEN_TTL },
  )
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET())
  } catch {
    return null
  }
}

export function authRequired(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  const payload = token ? verifyToken(token) : null
  if (!payload) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  req.admin = payload
  return next()
}

export async function ensureDefaultAdmin() {
  const email = (process.env.ADMIN_EMAIL || 'admin@kmdynasty.com').toLowerCase()
  const password = process.env.ADMIN_PASSWORD || 'km-dynasty-admin'
  const existing = await findAdminByEmail(email)
  if (existing) return existing
  const hash = await bcrypt.hash(password, 10)
  const res = await query(
    `INSERT INTO admins (email, password_hash, name)
     VALUES ($1, $2, $3)
     RETURNING id, email, name`,
    [email, hash, 'KM Admin'],
  )
  console.log(`✓ Seeded admin ${email} (change ADMIN_PASSWORD in production)`)
  return res.rows[0]
}

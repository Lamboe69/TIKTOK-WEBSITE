import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

export function readContent() {
  const paths = [
    path.join(process.cwd(), 'data', 'site-content.json'),
    path.join('/tmp', 'km-site-content.json'),
  ]
  for (const p of paths) {
    try {
      const raw = fs.readFileSync(p, 'utf-8')
      return JSON.parse(raw)
    } catch {
      /* try next */
    }
  }
  throw new Error('Content store not found')
}

export function writeContent(data) {
  const next = {
    ...data,
    version: (data.version || 1) + 1,
    updatedAt: new Date().toISOString(),
  }
  const primary = path.join(process.cwd(), 'data', 'site-content.json')
  const fallback = path.join('/tmp', 'km-site-content.json')
  const payload = JSON.stringify(next, null, 2)
  try {
    fs.mkdirSync(path.dirname(primary), { recursive: true })
    fs.writeFileSync(primary, payload)
  } catch {
    fs.writeFileSync(fallback, payload)
    next._persistWarning =
      'Saved to temporary storage. Export JSON from the dashboard and commit data/site-content.json for permanent deploys.'
  }
  return next
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || 'km-dynasty-admin'
}

export function getAuthSecret() {
  return process.env.ADMIN_SECRET || process.env.JWT_SECRET || `km-secret-${getAdminPassword()}`
}

export function createToken(ttlMs = 1000 * 60 * 60 * 24 * 7) {
  const exp = Date.now() + ttlMs
  const payload = `exp:${exp}`
  const sig = crypto.createHmac('sha256', getAuthSecret()).update(payload).digest('hex')
  return Buffer.from(JSON.stringify({ exp, sig })).toString('base64url')
}

export function verifyToken(token) {
  if (!token) return false
  try {
    const { exp, sig } = JSON.parse(Buffer.from(token, 'base64url').toString('utf-8'))
    if (!exp || !sig || Date.now() > exp) return false
    const expected = crypto
      .createHmac('sha256', getAuthSecret())
      .update(`exp:${exp}`)
      .digest('hex')
    if (sig.length !== expected.length) return false
    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
  } catch {
    return false
  }
}

export function getBearer(req) {
  const h = req.headers?.authorization || req.headers?.Authorization || ''
  if (typeof h === 'string' && h.startsWith('Bearer ')) return h.slice(7)
  return null
}

export function sendJson(res, status, body) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(body))
}

export function readBody(req) {
  if (req.body != null) {
    if (typeof req.body === 'object') return Promise.resolve(req.body)
    if (typeof req.body === 'string') {
      try {
        return Promise.resolve(req.body ? JSON.parse(req.body) : {})
      } catch (e) {
        return Promise.reject(e)
      }
    }
  }

  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (c) => chunks.push(c))
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf-8')
      if (!raw) return resolve({})
      try {
        resolve(JSON.parse(raw))
      } catch (e) {
        reject(e)
      }
    })
    req.on('error', reject)
  })
}

export function requireAuth(req, res) {
  const token = getBearer(req)
  if (!verifyToken(token)) {
    sendJson(res, 401, { error: 'Unauthorized' })
    return null
  }
  return token
}

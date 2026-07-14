import {
  getAdminPassword,
  createToken,
  verifyToken,
  getBearer,
  sendJson,
  readBody,
} from '../_lib/cms.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    return res.end()
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed' })
  }

  try {
    const body = await readBody(req)
    const password = String(body.password || '')
    if (password !== getAdminPassword()) {
      return sendJson(res, 401, { error: 'Invalid password' })
    }
    const token = createToken()
    return sendJson(res, 200, { token, ok: true })
  } catch (e) {
    return sendJson(res, 500, { error: e.message || 'Login failed' })
  }
}

export function meHandler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    return res.end()
  }
  const ok = verifyToken(getBearer(req))
  return sendJson(res, ok ? 200 : 401, { ok })
}

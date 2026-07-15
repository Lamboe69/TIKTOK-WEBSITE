import { getAdminPassword, createToken, sendJson, readBody } from '../_lib/cms.js'

export const config = {
  api: {
    bodyParser: true,
  },
}

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
    if (!password || password !== getAdminPassword()) {
      return sendJson(res, 401, { error: 'Invalid password' })
    }
    const token = createToken()
    return sendJson(res, 200, { token, ok: true })
  } catch (e) {
    return sendJson(res, 500, { error: e.message || 'Login failed' })
  }
}

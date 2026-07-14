import {
  readContent,
  writeContent,
  requireAuth,
  sendJson,
  readBody,
} from './_lib/cms.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    return res.end()
  }

  if (req.method === 'GET') {
    try {
      return sendJson(res, 200, readContent())
    } catch (e) {
      return sendJson(res, 500, { error: e.message || 'Failed to read content' })
    }
  }

  if (req.method === 'PUT') {
    if (!requireAuth(req, res)) return
    try {
      const body = await readBody(req)
      if (!body || typeof body !== 'object' || !body.collections || !body.settings) {
        return sendJson(res, 400, { error: 'Invalid content payload' })
      }
      const saved = writeContent(body)
      return sendJson(res, 200, saved)
    } catch (e) {
      return sendJson(res, 500, { error: e.message || 'Failed to save content' })
    }
  }

  return sendJson(res, 405, { error: 'Method not allowed' })
}

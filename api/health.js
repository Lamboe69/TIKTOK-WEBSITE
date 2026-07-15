import { readContent, sendJson } from './_lib/cms.js'

export default function handler(_req, res) {
  try {
    readContent()
    return sendJson(res, 200, {
      ok: true,
      mode: 'vercel-cms',
      admin: Boolean(process.env.ADMIN_PASSWORD),
      time: new Date().toISOString(),
    })
  } catch (e) {
    return sendJson(res, 500, { ok: false, error: e.message || 'Content store not found' })
  }
}

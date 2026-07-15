import { sendJson } from '../_lib/cms.js'
import { spacesConfigured } from '../_lib/spaces.js'

export default function handler(_req, res) {
  return sendJson(res, 200, { storage: spacesConfigured() ? 'spaces' : 'local' })
}

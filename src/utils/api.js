/** Runtime override from public/km-config.js (no rebuild needed on server). */
function runtimeApiBase() {
  try {
    const v = globalThis.__KM_CONFIG__?.apiUrl
    if (v != null && String(v).trim() !== '') return String(v).trim().replace(/\/+$/, '')
  } catch {
    /* ignore */
  }
  return ''
}

/** Production API host when build/env omit VITE_API_URL (split-domain deploy). */
const PRODUCTION_API_BASE = 'https://api.kmdynasty.org'

/** API base URL. Empty = same-origin `/api/...` (Vite proxy in dev). */
export function getApiBase() {
  // Local dev: ignore km-config.js so Vite can proxy /api to :4000
  if (import.meta.env.DEV) {
    const raw = import.meta.env.VITE_API_URL || ''
    return String(raw).trim().replace(/\/+$/, '')
  }
  const runtime = runtimeApiBase()
  if (runtime) return runtime
  const raw = import.meta.env.VITE_API_URL || ''
  const built = String(raw).trim().replace(/\/+$/, '')
  if (built) return built
  if (import.meta.env.PROD) return PRODUCTION_API_BASE
  return ''
}

/** Build a full API URL from a path like `/api/content`. */
export function apiUrl(path) {
  const p = path.startsWith('/') ? path : `/${path}`
  const base = getApiBase()
  return base ? `${base}${p}` : p
}

/** Fetch with clearer errors when the server returns HTML instead of JSON. */
export async function apiFetch(path, options) {
  const url = apiUrl(path)
  const res = await fetch(url, options)
  return res
}

export async function readJsonResponse(res) {
  const text = await res.text()
  if (!text) return {}
  try {
    return JSON.parse(text)
  } catch {
    const snippet = text.replace(/\s+/g, ' ').slice(0, 120)
    const looksLikeNginxHtml = /nginx|<!doctype html/i.test(text)
    throw new Error(
      res.ok
        ? 'Invalid JSON response from server'
        : looksLikeNginxHtml && res.status === 405
          ? 'nginx returned 405 — add location /api/ { proxy_pass http://127.0.0.1:4000; } before location /'
          : `Server error (${res.status}). ${snippet}`,
    )
  }
}

/** Quick connectivity check for admin / diagnostics. */
export async function pingApiHealth() {
  try {
    const res = await apiFetch('/api/health')
    const data = await readJsonResponse(res)
    return { ok: res.ok && data.ok !== false, status: res.status, data, url: apiUrl('/api/health') }
  } catch (e) {
    return { ok: false, status: 0, error: e.message, url: apiUrl('/api/health') }
  }
}

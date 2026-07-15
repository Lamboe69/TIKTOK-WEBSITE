/** API base URL for production (Express backend). Empty = same-origin /api (Vercel serverless). */
export function getApiBase() {
  const raw = import.meta.env.VITE_API_URL || ''
  return String(raw).trim().replace(/\/+$/, '')
}

/** Build a full API URL from a path like `/api/content`. */
export function apiUrl(path) {
  const p = path.startsWith('/') ? path : `/${path}`
  const base = getApiBase()
  return base ? `${base}${p}` : p
}

/** Fetch with clearer errors when the server returns HTML instead of JSON. */
export async function apiFetch(path, options) {
  const res = await fetch(apiUrl(path), options)
  return res
}

export async function readJsonResponse(res) {
  const text = await res.text()
  if (!text) return {}
  try {
    return JSON.parse(text)
  } catch {
    const snippet = text.replace(/\s+/g, ' ').slice(0, 120)
    throw new Error(
      res.ok
        ? 'Invalid JSON response from server'
        : `Server error (${res.status}). Check API URL and env vars. ${snippet}`,
    )
  }
}

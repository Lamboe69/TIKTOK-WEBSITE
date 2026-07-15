import { getApiBase } from './api'

/**
 * Resolve a CMS media value for display.
 * Accepts:
 * - Full DigitalOcean Spaces / CDN URLs
 * - Absolute site paths (/photos/..., /uploads/...)
 * - Protocol-relative URLs
 * - Bare object keys (uploads/foo.jpg) when VITE_DO_SPACES_CDN_URL is set
 *
 * /uploads/... files are stored on the API server — in split deploy they must
 * load from api.kmdynasty.org, not the static frontend host.
 */
export function mediaUrl(src, fallback = '') {
  if (src == null || src === false) return fallback
  const s = String(src).trim()
  if (!s) return fallback

  if (s.startsWith('data:') || s.startsWith('blob:')) return s

  if (/^https?:\/\//i.test(s)) return s
  if (s.startsWith('//')) return `https:${s}`

  if (s.startsWith('/uploads/') || s.startsWith('uploads/')) {
    const path = s.startsWith('/') ? s : `/${s}`
    const base = getApiBase()
    return base ? `${base}${path}` : path
  }

  if (s.startsWith('/')) return s

  const cdn = String(import.meta.env?.VITE_DO_SPACES_CDN_URL || '').replace(/\/$/, '')
  if (cdn) return `${cdn}/${s.replace(/^\//, '')}`

  return `/${s.replace(/^\//, '')}`
}

export function isRemoteMedia(src) {
  const s = String(src || '').trim()
  return /^https?:\/\//i.test(s) || s.startsWith('//')
}

export function mediaLabel(src) {
  const s = String(src || '').trim()
  if (!s) return ''
  if (isRemoteMedia(s)) {
    try {
      const u = new URL(s.startsWith('//') ? `https:${s}` : s)
      const parts = u.pathname.split('/').filter(Boolean)
      return parts[parts.length - 1] || u.hostname
    } catch {
      return s
    }
  }
  return s
}

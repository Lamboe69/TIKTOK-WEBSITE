import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { apiFetch, apiUrl, readJsonResponse } from '../utils/api'
import { DEFAULT_COLLECTIONS, DEFAULT_PAGES, DEFAULT_SETTINGS, mergeSettings } from './defaults'
import { resolveContentMedia } from './resolveMedia'

const ContentContext = createContext(null)
const TOKEN_KEY = 'km-admin-token'

export function getAdminToken() {
  try {
    return localStorage.getItem(TOKEN_KEY) || ''
  } catch {
    return ''
  }
}

export function setAdminToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    else localStorage.removeItem(TOKEN_KEY)
  } catch {
    /* ignore */
  }
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAdminToken()}`,
  }
}

function cloneContent(content) {
  return structuredClone(content)
}

function nextCollectionItemId(items) {
  const nums = (items || []).map((i) => Number(i.id)).filter((n) => Number.isFinite(n))
  return nums.length ? Math.max(...nums) + 1 : Date.now()
}

async function mutateContent(mutator) {
  const content = await fetchContent()
  const next = mutator(cloneContent(content))
  return saveContent(next)
}

export async function fetchContent() {
  const res = await apiFetch('/api/content')
  if (!res.ok) {
    const err = await readJsonResponse(res).catch(() => ({}))
    throw new Error(err.error || 'Failed to load content')
  }
  return readJsonResponse(res)
}

export async function saveContent(content) {
  const res = await apiFetch('/api/content', {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(content),
  })
  if (!res.ok) {
    const err = await readJsonResponse(res).catch(() => ({}))
    throw new Error(err.error || 'Failed to save')
  }
  return readJsonResponse(res)
}

export async function uploadImage(file) {
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
  const res = await apiFetch('/api/admin/upload', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ filename: file.name, dataUrl }),
  })
  if (!res.ok) {
    const err = await readJsonResponse(res).catch(() => ({}))
    throw new Error(err.error || 'Upload failed')
  }
  const data = await readJsonResponse(res)
  return {
    path: data.path || data.url,
    url: data.url || data.path,
    storage: data.storage || 'local',
  }
}

export async function createCollectionItem(key, item) {
  let created = null
  await mutateContent((content) => {
    const items = Array.isArray(content.collections?.[key]) ? [...content.collections[key]] : []
    const id = item.id != null ? item.id : nextCollectionItemId(items)
    created = { ...item, id }
    items.push(created)
    content.collections = { ...content.collections, [key]: items }
    return content
  })
  return created
}

export async function updateCollectionItem(key, id, item) {
  return mutateContent((content) => {
    const items = Array.isArray(content.collections?.[key]) ? [...content.collections[key]] : []
    const idx = items.findIndex((row) => String(row.id) === String(id))
    if (idx < 0) throw new Error('Item not found')
    items[idx] = { ...items[idx], ...item, id: items[idx].id }
    content.collections = { ...content.collections, [key]: items }
    return content
  })
}

export async function deleteCollectionItem(key, id) {
  return mutateContent((content) => {
    const items = Array.isArray(content.collections?.[key]) ? content.collections[key] : []
    content.collections = {
      ...content.collections,
      [key]: items.filter((row) => String(row.id) !== String(id)),
    }
    return content
  })
}

export async function savePage(key, data) {
  return mutateContent((content) => {
    content.pages = { ...content.pages, [key]: { ...data } }
    return content
  })
}

export async function saveSettings(settings) {
  return mutateContent((content) => {
    content.settings = { ...settings }
    return content
  })
}

export function ContentProvider({ children }) {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [contentSource, setContentSource] = useState('loading')

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    setContentSource('loading')
    try {
      const data = await fetchContent()
      setContent(resolveContentMedia(data))
      setContentSource('live')
    } catch (e) {
      setError(e.message)
      setContentSource('fallback')
      setContent({
        version: 0,
        updatedAt: null,
        settings: { ...DEFAULT_SETTINGS },
        pages: { ...DEFAULT_PAGES },
        collections: { ...DEFAULT_COLLECTIONS },
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const value = useMemo(
    () => ({
      content,
      loading,
      error,
      contentSource,
      refresh,
      setContent,
      settings: mergeSettings(content?.settings),
      pages: content?.pages || DEFAULT_PAGES,
      collections: content?.collections || DEFAULT_COLLECTIONS,
      getPage: (key) => content?.pages?.[key] || DEFAULT_PAGES[key] || {},
      getCollection: (key) => content?.collections?.[key] || DEFAULT_COLLECTIONS[key] || [],
      apiBase: apiUrl(''),
    }),
    [content, loading, error, contentSource, refresh],
  )

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used within ContentProvider')
  return ctx
}

/**
 * Site-wide brand & contact from CMS settings (Admin → Site settings).
 * Prefer this over page.heroBrand or hardcoded "KM DYNASTY".
 */
export function useSiteSettings() {
  const { settings, loading } = useContent()
  return useMemo(() => {
    const merged = mergeSettings(settings)
    const siteName = String(merged.siteName || '').trim()
    const tagline = String(merged.tagline || '').trim()
    const ctaLabel = String(merged.ctaLabel || '').trim()
    const email = String(merged.email || '').trim()
    const phoneUS = String(merged.phoneUS || '').trim()
    const phoneUG = String(merged.phoneUG || '').trim()
    const location = String(merged.location || '').trim()
    const tiktokHandle = String(merged.tiktokHandle || '').trim()
    const tiktokUrl = String(merged.tiktokUrl || '').trim()
    const paypalEmail = String(merged.paypalEmail || '').trim()

    return {
      loading,
      siteName,
      tagline,
      ctaLabel: ctaLabel || 'Join My Box Battle',
      email,
      phoneUS,
      phoneUG,
      location,
      tiktokHandle: tiktokHandle || '@kingmakernevergivesup',
      tiktokUrl: tiktokUrl || 'https://www.tiktok.com/@kingmakernevergivesup',
      paypalEmail,
      copyright: String(merged.copyright || '').trim(),
      disclaimer: String(merged.disclaimer || '').trim(),
      instagramUrl: String(merged.instagramUrl || '').trim(),
      youtubeUrl: String(merged.youtubeUrl || '').trim(),
      whatsappUrl: String(merged.whatsappUrl || '').trim(),
      facebookUrl: String(merged.facebookUrl || '').trim(),
      twitchUrl: String(merged.twitchUrl || '').trim(),
      raw: merged,
    }
  }, [settings, loading])
}

/** Safe hook — returns empty when outside provider (shouldn't happen) */
export function useSiteContent() {
  return useContext(ContentContext)
}

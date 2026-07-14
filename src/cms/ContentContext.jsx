import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

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

export async function fetchContent() {
  const res = await fetch('/api/content')
  if (!res.ok) throw new Error('Failed to load content')
  return res.json()
}

export async function saveContent(content) {
  const token = getAdminToken()
  const res = await fetch('/api/content', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(content),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to save')
  }
  return res.json()
}

export async function uploadImage(file) {
  const token = getAdminToken()
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
  const res = await fetch('/api/admin/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ filename: file.name, dataUrl }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Upload failed')
  }
  return res.json()
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAdminToken()}`,
  }
}

export async function createCollectionItem(key, item) {
  const res = await fetch(`/api/collections/${key}/items`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(item),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to create item')
  }
  return res.json()
}

export async function updateCollectionItem(key, id, item) {
  const res = await fetch(`/api/collections/${key}/items/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(item),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to update item')
  }
  return res.json()
}

export async function deleteCollectionItem(key, id) {
  const res = await fetch(`/api/collections/${key}/items/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to delete item')
  }
  return res.json()
}

export async function savePage(key, data) {
  const res = await fetch(`/api/pages/${key}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({ data }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to save page')
  }
  return res.json()
}

export async function saveSettings(settings) {
  const res = await fetch('/api/settings', {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({ settings }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to save settings')
  }
  return res.json()
}

export function ContentProvider({ children }) {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchContent()
      setContent(data)
    } catch (e) {
      // Public site can keep fallbacks; admin UI shows the error.
      setError(e.message)
      setContent({
        version: 0,
        updatedAt: null,
        settings: {},
        pages: {},
        collections: {},
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
      refresh,
      setContent,
      settings: content?.settings || {},
      pages: content?.pages || {},
      collections: content?.collections || {},
      getPage: (key) => content?.pages?.[key] || {},
      getCollection: (key) => content?.collections?.[key] || [],
    }),
    [content, loading, error, refresh],
  )

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used within ContentProvider')
  return ctx
}

/** Safe hook — returns empty when outside provider (shouldn't happen) */
export function useSiteContent() {
  return useContext(ContentContext)
}

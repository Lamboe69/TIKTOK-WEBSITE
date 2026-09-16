import { useState, useEffect, createContext, useContext, useCallback } from 'react'
import { apiUrl } from '../utils/api'
import { formatCount, normalizeCountAbbrev } from '../utils/formatCount'

// How stats are labeled site-wide
const STAT_LABELS = {
  followers: { label: 'Family', note: 'TikTok followers' },
  likes: { label: 'TikTok Likes', note: 'and counting' },
  battlesHosted: { label: 'Box Battles Hosted', note: 'and growing' },
  winnersCrowned: { label: 'Winners Crowned', note: 'official champions' },
  avgViewers: { label: 'Avg. Live Viewers', note: 'per livestream' },
}

// Static counts that don't come from TikTok API (manually maintained)
const STATIC_COUNTS = {
  battlesHosted: { value: 100, formatted: '100+' },
  winnersCrowned: { value: 50, formatted: '50+' },
  avgViewers: { value: 5000, formatted: '5K+' },
}

// Fallback when API is unreachable (development / no deploy yet)
const FALLBACK = {
  followers: 50000,
  followersFormatted: '50K+',
  likes: 1000000,
  likesFormatted: '1M+',
  displayName: 'King Maker',
  username: 'kingmakernevergivesup',
  source: 'fallback',
  updatedAt: null,
}

const CACHE_KEY = 'km-dynasty-tiktok-stats'
const CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours
const POLL_INTERVAL = 60 * 60 * 1000 // Check every hour for fresh data

const StatsContext = createContext(null)

function readLocalCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const cached = JSON.parse(raw)
    if (new Date(cached.expiresAt) > new Date()) return cached
    localStorage.removeItem(CACHE_KEY)
    return null
  } catch {
    return null
  }
}

function writeLocalCache(data) {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        ...data,
        expiresAt: new Date(Date.now() + CACHE_TTL).toISOString(),
      })
    )
  } catch {
    // localStorage full or unavailable — non-critical
  }
}

function mergeStats(apiData) {
  if (!apiData) {
    return {
      ...FALLBACK,
      ...STATIC_COUNTS,
      followersFormatted: normalizeCountAbbrev(FALLBACK.followersFormatted),
      likesFormatted: normalizeCountAbbrev(FALLBACK.likesFormatted),
      battlesHostedFormatted: normalizeCountAbbrev(STATIC_COUNTS.battlesHosted.formatted),
      winnersCrownedFormatted: normalizeCountAbbrev(STATIC_COUNTS.winnersCrowned.formatted),
      avgViewersFormatted: normalizeCountAbbrev(STATIC_COUNTS.avgViewers.formatted),
    }
  }

  return {
    followers: apiData.followers,
    followersFormatted: normalizeCountAbbrev(apiData.followersFormatted || formatCount(apiData.followers)),
    likes: apiData.likes,
    likesFormatted: normalizeCountAbbrev(apiData.likesFormatted || formatCount(apiData.likes)),
    battlesHosted: STATIC_COUNTS.battlesHosted.value,
    battlesHostedFormatted: normalizeCountAbbrev(
      STATIC_COUNTS.battlesHosted.formatted || formatCount(STATIC_COUNTS.battlesHosted.value),
    ),
    winnersCrowned: STATIC_COUNTS.winnersCrowned.value,
    winnersCrownedFormatted: normalizeCountAbbrev(
      STATIC_COUNTS.winnersCrowned.formatted || formatCount(STATIC_COUNTS.winnersCrowned.value),
    ),
    avgViewers: STATIC_COUNTS.avgViewers.value,
    avgViewersFormatted: normalizeCountAbbrev(
      STATIC_COUNTS.avgViewers.formatted || formatCount(STATIC_COUNTS.avgViewers.value),
    ),
    displayName: apiData.displayName || 'King Maker',
    username: apiData.username || 'kingmakernevergivesup',
    source: apiData.source || 'api',
    updatedAt: apiData.updatedAt,
  }
}

export function StatsProvider({ children }) {
  const [stats, setStats] = useState(() => mergeStats(readLocalCache()))
  const [loading, setLoading] = useState(false)
  const [lastError, setLastError] = useState(null)

  const fetchStats = useCallback(async (force = false) => {
    // Check local cache first (skip fetch if fresh)
    if (!force) {
      const cached = readLocalCache()
      if (cached) {
        setStats(mergeStats(cached))
        return
      }
    }

    setLoading(true)
    try {
      const res = await fetch(apiUrl('/api/stats'))
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()

      if (data.followers !== null || data.likes !== null) {
        writeLocalCache(data)
        setStats(mergeStats(data))
        setLastError(null)
      }
    } catch (err) {
      setLastError(err.message)
      // Keep existing stats (from cache or fallback)
    } finally {
      setLoading(false)
    }
  }, [])

  // Initial fetch + hourly polling
  useEffect(() => {
    fetchStats()

    const interval = setInterval(() => fetchStats(), POLL_INTERVAL)
    return () => clearInterval(interval)
  }, [fetchStats])

  // Fetch fresh data when user returns to tab (visibility change)
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        fetchStats()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [fetchStats])

  return (
    <StatsContext.Provider value={{ stats, loading, lastError, refresh: () => fetchStats(true) }}>
      {children}
    </StatsContext.Provider>
  )
}

export function useTikTokStats() {
  const ctx = useContext(StatsContext)
  if (!ctx) {
    // Outside provider — return merged fallback (for non-StatsProvider usage)
    return { stats: mergeStats(null), loading: false, lastError: null, refresh: () => {} }
  }
  return ctx
}

export { STAT_LABELS }

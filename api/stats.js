// api/stats.js — Vercel Serverless Function
// Fetches real TikTok stats for @kingmakernevergivesup
// Cached for 24h, refreshed by Vercel cron + client-side polling

import fs from 'fs'
import path from 'path'

const USERNAME = 'kingmakernevergivesup'
const PROFILE_URL = `https://www.tiktok.com/@${USERNAME}`
const OEMBED_URL = `https://www.tiktok.com/oembed?url=https://www.tiktok.com/@${USERNAME}`
const CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours

const CACHE_PATH = path.join(process.cwd(), 'api', 'stats-cache.json')

function readCache() {
  try {
    const raw = fs.readFileSync(CACHE_PATH, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function writeCache(data) {
  try {
    fs.writeFileSync(CACHE_PATH, JSON.stringify(data, null, 2))
  } catch {
    // Non-critical — cron will retry
  }
}

// Parse follower/like counts from TikTok profile page HTML
// TikTok embeds <script id="__UNIVERSAL_DATA_FOR_REHYDRATION__"> with full profile data
function parseProfileHtml(html) {
  const stats = { followers: null, likes: null, following: null }

  // Method 1: JSON-LD / universal data rehydration script
  const rehydrationMatch = html.match(
    /<script\s+id="__UNIVERSAL_DATA_FOR_REHYDRATION__"[^>]*>([\s\S]*?)<\/script>/
  )
  if (rehydrationMatch) {
    try {
      const data = JSON.parse(rehydrationMatch[1])
      const userInfo =
        data?.__DEFAULT_SCOPE__?.['webapp.user-detail']?.userInfo?.stats
      if (userInfo) {
        stats.followers = userInfo.followerCount ?? null
        stats.likes = userInfo.heartCount ?? null
        stats.following = userInfo.followingCount ?? null
      }
    } catch {
      // Parse error — continue to next method
    }
  }

  // Method 2: meta tags fallback
  if (stats.followers === null) {
    const followerMatch = html.match(
      /<meta\s+[^>]*property="og:description"[^>]*content="([^"]*)"[^>]*>/
    )
    if (followerMatch) {
      const desc = followerMatch[1]
      const fMatch = desc.match(/([\d.]+[KMB]?)\s*Followers/i)
      const lMatch = desc.match(/([\d.]+[KMB]?)\s*Likes/i)
      if (fMatch) stats.followers = parseCount(fMatch[1])
      if (lMatch) stats.likes = parseCount(lMatch[1])
    }
  }

  return stats
}

// Convert "1.2M", "50K", "3.5B" to numbers
function parseCount(str) {
  if (!str) return null
  const clean = str.replace(/,/g, '')
  const match = clean.match(/([\d.]+)\s*([KMB])?/i)
  if (!match) return null
  const num = parseFloat(match[1])
  const suffix = (match[2] || '').toUpperCase()
  if (suffix === 'K') return Math.round(num * 1000)
  if (suffix === 'M') return Math.round(num * 1_000_000)
  if (suffix === 'B') return Math.round(num * 1_000_000_000)
  return Math.round(num)
}

function formatCount(n) {
  if (n === null || n === undefined) return null
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B'
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'
  return String(n)
}

async function fetchTikTokStats() {
  const stats = { followers: null, likes: null, following: null }

  // Try oEmbed first (reliable, lightweight, gets display name + avatar)
  try {
    const oembedRes = await fetch(OEMBED_URL, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; KMDynastyBot/1.0)' },
      signal: AbortSignal.timeout(10000),
    })
    if (oembedRes.ok) {
      const oembed = await oembedRes.json()
      // oEmbed doesn't include follower counts, but confirms the account exists
      stats.displayName = oembed.author_name || null
      stats.avatar = oembed.author_url ? `https://tiktok.com/@${USERNAME}` : null
    }
  } catch {
    // Continue — oEmbed is optional
  }

  // Try profile page scrape for follower/like counts
  try {
    const profileRes = await fetch(PROFILE_URL, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      signal: AbortSignal.timeout(15000),
      redirect: 'follow',
    })
    if (profileRes.ok) {
      const html = await profileRes.text()
      const parsed = parseProfileHtml(html)
      if (parsed.followers !== null) stats.followers = parsed.followers
      if (parsed.likes !== null) stats.likes = parsed.likes
      if (parsed.following !== null) stats.following = parsed.following
    }
  } catch {
    // Profile scrape failed — use cache or fallback
  }

  return stats
}

// GET /api/stats — returns cached or fresh TikTok stats
// POST /api/stats — manual admin update (set ENV vars as override)
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Manual override via POST (for admin updates)
  if (req.method === 'POST') {
    const { followers, likes } = req.body || {}
    const override = {
      followers: typeof followers === 'number' ? followers : null,
      likes: typeof likes === 'number' ? likes : null,
      source: 'manual-override',
      updatedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + CACHE_TTL).toISOString(),
    }
    writeCache(override)
    return res.status(200).json(override)
  }

  // GET — check cache first
  const cached = readCache()
  if (cached && new Date(cached.expiresAt) > new Date()) {
    return res.status(200).json({ ...cached, fromCache: true })
  }

  // Fetch fresh data
  const fresh = await fetchTikTokStats()

  const result = {
    followers: fresh.followers,
    followersFormatted: formatCount(fresh.followers),
    likes: fresh.likes,
    likesFormatted: formatCount(fresh.likes),
    following: fresh.following,
    displayName: fresh.displayName || 'King Maker',
    username: USERNAME,
    source: 'live-fetch',
    updatedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + CACHE_TTL).toISOString(),
  }

  // Only cache if we got real data (don't overwrite good cache with bad fetch)
  if (result.followers !== null || result.likes !== null) {
    writeCache(result)
  }

  return res.status(200).json(result)
}

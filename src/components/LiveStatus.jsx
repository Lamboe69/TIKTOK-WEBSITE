import { useState, useEffect } from 'react'
import { schedule } from '../data/schedule'

function getNextBattle() {
  const now = new Date()
  const upcoming = schedule
    .map(b => ({ ...b, dateObj: new Date(b.date + 'T00:00:00') }))
    .filter(b => b.dateObj >= now)
    .sort((a, b) => a.dateObj - b.dateObj)
  return upcoming[0] || null
}

function getCountdown(target) {
  const diff = target - new Date()
  if (diff <= 0) return null
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  if (days > 0) return `${days}d ${hours}h`
  if (hours > 0) return `${hours}h ${mins}m`
  return `${mins}m`
}

export default function LiveStatus() {
  const [isLive, setIsLive] = useState(false)
  const [countdown, setCountdown] = useState(null)
  const [nextBattle, setNextBattle] = useState(null)

  useEffect(() => {
    const checkLive = async () => {
      try {
        const res = await fetch('/api/live-status')
        const data = await res.json()
        setIsLive(data.isLive || false)
      } catch {
        setIsLive(false)
      }
    }

    const updateCountdown = () => {
      const next = getNextBattle()
      setNextBattle(next)
      if (next) {
        setCountdown(getCountdown(next.dateObj))
      }
    }

    checkLive()
    updateCountdown()
    const interval = setInterval(updateCountdown, 60000)
    return () => clearInterval(interval)
  }, [])

  if (isLive) {
    return (
      <a
        href="https://www.tiktok.com/@kingmakernevergivesup"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 rounded-full text-red-600 text-xs font-semibold hover:bg-red-100 transition-colors"
      >
        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
        LIVE
      </a>
    )
  }

  if (nextBattle && countdown) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-900/80 backdrop-blur-sm rounded-full">
        <span className="text-white/60 text-xs font-medium">
          Next: {countdown}
        </span>
      </div>
    )
  }

  return null
}

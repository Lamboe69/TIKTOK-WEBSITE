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
      if (next) setCountdown(getCountdown(next.dateObj))
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
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-white text-xs font-bold transition-all hover:scale-105"
        style={{ background: 'rgba(239,68,68,0.25)', border: '1px solid rgba(239,68,68,0.5)', backdropFilter: 'blur(8px)' }}
      >
        <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
        LIVE NOW
      </a>
    )
  }

  if (nextBattle && countdown) {
    return (
      <div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-white text-xs font-medium"
        style={{ background: 'rgba(59,16,99,0.6)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-ember" />
        Next: <span className="font-bold text-ember">{countdown}</span>
      </div>
    )
  }

  return null
}

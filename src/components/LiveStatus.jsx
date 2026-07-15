import { useState, useEffect, useMemo } from 'react'
import { schedule as fallbackSchedule } from '../data/schedule'
import { useContent } from '../cms/ContentContext'

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
  const { collections, settings } = useContent()
  const schedule = collections.schedule?.length ? collections.schedule : fallbackSchedule
  const tiktokUrl = settings.tiktokUrl || 'https://www.tiktok.com/@kingmakernevergivesup'

  const [isLive, setIsLive] = useState(false)
  const [countdown, setCountdown] = useState(null)
  const [nextBattle, setNextBattle] = useState(null)

  const scheduleKey = useMemo(
    () => schedule.map((b) => `${b.id}:${b.date}:${b.time}`).join('|'),
    [schedule],
  )

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
      const now = new Date()
      const upcoming = schedule
        .map((b) => ({ ...b, dateObj: new Date(`${b.date}T00:00:00`) }))
        .filter((b) => b.dateObj >= now)
        .sort((a, b) => a.dateObj - b.dateObj)
      const next = upcoming[0] || null
      setNextBattle(next)
      if (next) setCountdown(getCountdown(next.dateObj))
      else setCountdown(null)
    }

    checkLive()
    updateCountdown()
    const interval = setInterval(updateCountdown, 60000)
    return () => clearInterval(interval)
  }, [schedule, scheduleKey])

  if (isLive) {
    return (
      <a
        href={tiktokUrl}
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

  // CountdownTicker in the hero is the source of truth for next battle — don't duplicate
  void countdown
  void nextBattle
  return null
}

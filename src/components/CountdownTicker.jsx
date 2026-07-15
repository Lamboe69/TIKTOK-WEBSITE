import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { schedule as fallbackSchedule } from '../data/schedule'
import { getBattleDate, getCountdown } from '../utils/battle'
import { Icons } from './Icons'
import { useContent } from '../cms/ContentContext'

const typeEmoji = {
  'Daily Godsent': '⚔️',
  'Most Beautiful': '✨',
  Country: '🌍',
  Scavengers: '🎯',
  'Champion of Champions': '👑',
}

export default function CountdownTicker() {
  const { collections } = useContent()
  const schedule = collections.schedule?.length ? collections.schedule : fallbackSchedule
  const [next, setNext] = useState(null)
  const [countdown, setCountdown] = useState('')

  const scheduleKey = useMemo(
    () => schedule.map((b) => `${b.id}:${b.date}:${b.time}`).join('|'),
    [schedule],
  )

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const upcoming = schedule
        .map((b) => ({ ...b, dateObj: getBattleDate(b.date, b.time) }))
        .filter((b) => b.dateObj > now)
        .sort((a, b) => a.dateObj - b.dateObj)
      const n = upcoming[0]
      setNext(n)
      setCountdown(n ? getCountdown(n.dateObj) : '')
    }
    update()
    const id = setInterval(update, 30000)
    return () => clearInterval(id)
  }, [schedule, scheduleKey])

  if (!next) return null

  const emoji = typeEmoji[next.type] || '⚔️'
  const d = new Date(`${next.date}T00:00:00`)
  const dateStr = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

  return (
    <div
      className="rounded-2xl p-5 border border-white/10 max-w-xs w-full"
      style={{ background: 'rgba(59,16,99,0.45)', backdropFilter: 'blur(20px)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-ember opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-ember" />
          </span>
          <span className="text-white/50 text-[10px] uppercase tracking-widest font-semibold">Next Battle</span>
        </div>
        <span className="text-base">{emoji}</span>
      </div>

      <p className="font-display font-bold text-ivory text-lg leading-snug mb-1">{next.title}</p>
      <p className="text-white/40 text-xs mb-5">
        {next.type} · {dateStr}
      </p>

      <div
        className="rounded-xl p-3 mb-4"
        style={{ background: 'rgba(255,107,26,0.08)', border: '1px solid rgba(255,107,26,0.15)' }}
      >
        <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Starts in</p>
        <p className="font-display font-bold text-2xl text-ember leading-none tabular-nums animate-glow-breathe">
          {countdown}
        </p>
      </div>

      <Link
        to="/battle-schedule"
        className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:scale-[1.02]"
        style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        View Full Schedule
        <span className="w-3.5 h-3.5 block">{Icons.arrowRight}</span>
      </Link>
    </div>
  )
}

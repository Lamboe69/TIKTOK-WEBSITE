import { useState, useEffect } from 'react'
import { schedule } from '../data/schedule'
import { getBattleDate, getCountdown } from '../utils/battle'

export default function CountdownTicker() {
  const [next, setNext] = useState(null)
  const [countdown, setCountdown] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const upcoming = schedule
        .map(b => ({ ...b, dateObj: getBattleDate(b.date, b.time) }))
        .filter(b => b.dateObj > now)
        .sort((a, b) => a.dateObj - b.dateObj)
      const n = upcoming[0]
      setNext(n)
      setCountdown(n ? getCountdown(n.dateObj) : '')
    }
    update()
    const id = setInterval(update, 30000)
    return () => clearInterval(id)
  }, [])

  if (!next) return null

  return (
    <div
      className="glass rounded-2xl p-5 border border-white/10 max-w-xs"
      style={{ background: 'rgba(59,16,99,0.35)', backdropFilter: 'blur(16px)' }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-ember animate-pulse" />
        <span className="text-white/50 text-[10px] uppercase tracking-widest">Next Battle</span>
      </div>
      <p className="text-ivory font-display font-bold text-base mb-1 leading-snug">{next.title}</p>
      <p className="text-white/40 text-xs mb-4">{next.date}</p>
      <div className="flex items-center gap-2">
        <span className="text-white/40 text-xs">Starts in</span>
        <span
          className="px-3 py-1 rounded-lg text-sm font-bold text-white"
          style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)' }}
        >
          {countdown}
        </span>
      </div>
    </div>
  )
}

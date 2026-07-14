import { useState, useEffect, useRef, useCallback } from 'react'

const TIMEZONES = [
  { iana: 'America/New_York', label: 'US Eastern', abbr: 'ET' },
  { iana: 'America/Chicago', label: 'US Central', abbr: 'CT' },
  { iana: 'America/Toronto', label: 'Canada', abbr: 'ET' },
  { iana: 'Europe/London', label: 'UK', abbr: 'GMT' },
  { iana: 'Africa/Lagos', label: 'Nigeria', abbr: 'WAT' },
  { iana: 'Africa/Kampala', label: 'Uganda', abbr: 'EAT' },
]

function getSourceDate(timeStr) {
  const now = new Date()
  const [time, period] = timeStr.replace(/\s/g, '').match(/(\d+:\d+)(AM|PM)/i)?.slice(1) || []
  if (!time || !period) return now
  let [h, m] = time.split(':').map(Number)
  if (period.toUpperCase() === 'PM' && h !== 12) h += 12
  if (period.toUpperCase() === 'AM' && h === 12) h = 0
  now.setHours(h, m, 0, 0)
  return now
}

function formatTime(date, iana, abbr) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: iana,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date) + ' ' + abbr
  } catch {
    return '—'
  }
}

export default function TimezoneRotator({ sourceTime = '8:00 PM' }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const advance = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % TIMEZONES.length)
  }, [])

  useEffect(() => {
    if (paused || reducedMotion) {
      clearInterval(intervalRef.current)
      return
    }
    intervalRef.current = setInterval(advance, 4500)
    return () => clearInterval(intervalRef.current)
  }, [paused, reducedMotion, advance])

  const srcDate = getSourceDate(sourceTime)
  const current = TIMEZONES[activeIdx]
  const currentTime = formatTime(srcDate, current.iana, current.abbr)

  return (
    <div
      className="flex items-center justify-center gap-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <button
        type="button"
        onClick={() => setActiveIdx((prev) => (prev - 1 + TIMEZONES.length) % TIMEZONES.length)}
        className="w-8 h-8 flex items-center justify-center text-white/35 hover:text-ivory transition-colors flex-shrink-0"
        aria-label="Previous timezone"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="15 18 9 12 15 6" /></svg>
      </button>

      <div className="relative min-w-[200px] text-center">
        <div key={activeIdx} className="tz-fade-in">
          <p className="font-display font-bold text-ivory text-2xl sm:text-3xl tracking-tight mb-1">
            {currentTime}
          </p>
          <p className="text-white/40 text-xs tracking-[0.2em] uppercase">{current.label}</p>
        </div>

        <div className="flex items-center justify-center gap-1.5 mt-4">
          {TIMEZONES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={`h-0.5 transition-all ${
                i === activeIdx ? 'w-6 bg-ember' : 'w-3 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to ${TIMEZONES[i].label}`}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setActiveIdx((prev) => (prev + 1) % TIMEZONES.length)}
        className="w-8 h-8 flex items-center justify-center text-white/35 hover:text-ivory transition-colors flex-shrink-0"
        aria-label="Next timezone"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="9 18 15 12 9 6" /></svg>
      </button>
    </div>
  )
}

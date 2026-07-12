import { useState, useEffect, useRef, useCallback } from 'react'

const TIMEZONE_SOURCE = {
  iana: 'America/Chicago',
  label: 'CT',
  flag: '🇺🇸',
}

const TIMEZONES = [
  { iana: 'America/New_York', label: 'US Eastern', flag: '🇺🇸', abbr: 'ET' },
  { iana: 'America/Chicago', label: 'US Central', flag: '🇺🇸', abbr: 'CT' },
  { iana: 'America/Toronto', label: 'Canada', flag: '🇨🇦', abbr: 'ET' },
  { iana: 'Europe/London', label: 'UK', flag: '🇬🇧', abbr: 'GMT' },
  { iana: 'Africa/Lagos', label: 'Nigeria', flag: '🇳🇬', abbr: 'WAT' },
  { iana: 'Africa/Kampala', label: 'Uganda', flag: '🇺🇬', abbr: 'EAT' },
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
        onClick={() => setActiveIdx((prev) => (prev - 1 + TIMEZONES.length) % TIMEZONES.length)}
        className="w-8 h-8 rounded-full bg-dynasty-purple/10 hover:bg-dynasty-purple/20 flex items-center justify-center transition-colors flex-shrink-0"
        aria-label="Previous timezone"
      >
        <svg className="w-4 h-4 text-dynasty-purple" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
      </button>

      <div className="relative min-w-[220px] text-center">
        <div key={activeIdx} className="tz-fade-in flex flex-col items-center gap-1">
          <span className="text-2xl">{current.flag}</span>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-dynasty-purple rounded-full">
            <span className="text-white font-bold text-sm">{current.label}</span>
            <span className="w-px h-4 bg-white/20" />
            <span className="text-dynasty-orange font-bold text-sm">{currentTime}</span>
          </span>
        </div>

        <div className="flex items-center justify-center gap-1.5 mt-3">
          {TIMEZONES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === activeIdx ? 'w-5 bg-dynasty-orange' : 'w-1.5 bg-dynasty-purple/20'
              }`}
              aria-label={`Go to ${TIMEZONES[i].label}`}
            />
          ))}
        </div>
      </div>

      <button
        onClick={() => setActiveIdx((prev) => (prev + 1) % TIMEZONES.length)}
        className="w-8 h-8 rounded-full bg-dynasty-purple/10 hover:bg-dynasty-purple/20 flex items-center justify-center transition-colors flex-shrink-0"
        aria-label="Next timezone"
      >
        <svg className="w-4 h-4 text-dynasty-purple" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
      </button>
    </div>
  )
}

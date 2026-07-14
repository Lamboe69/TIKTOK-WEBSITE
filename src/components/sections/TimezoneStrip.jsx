import { useEffect, useState } from 'react'
import Motion from '../Motion'

const TIMEZONES = [
  { iana: 'America/Chicago', label: 'Dallas', abbr: 'CT', anchor: true },
  { iana: 'America/New_York', label: 'US Eastern', abbr: 'ET' },
  { iana: 'America/Toronto', label: 'Canada', abbr: 'ET' },
  { iana: 'Europe/London', label: 'United Kingdom', abbr: 'GMT' },
  { iana: 'Africa/Lagos', label: 'Nigeria', abbr: 'WAT' },
  { iana: 'Africa/Kampala', label: 'Uganda', abbr: 'EAT' },
]

const SOURCE = '8:00 PM'
const ROTATE_MS = 3500

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

function formatParts(date, iana) {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: iana,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).formatToParts(date)
    const hour = parts.find((p) => p.type === 'hour')?.value || ''
    const minute = parts.find((p) => p.type === 'minute')?.value || ''
    const dayPeriod = parts.find((p) => p.type === 'dayPeriod')?.value || ''
    return { hour, minute, dayPeriod }
  } catch {
    return { hour: '—', minute: '—', dayPeriod: '' }
  }
}

export default function TimezoneStrip() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [tick, setTick] = useState(0)

  // Always cycle timezones automatically
  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % TIMEZONES.length)
      setTick((t) => t + 1)
    }, ROTATE_MS)
    return () => clearInterval(id)
  }, [])

  const srcDate = getSourceDate(SOURCE)
  const current = TIMEZONES[activeIdx]
  const { hour, minute, dayPeriod } = formatParts(srcDate, current.iana)
  const dallas = formatParts(srcDate, 'America/Chicago')

  return (
    <section className="relative overflow-hidden home-band-violet home-band-sep">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 80% at 0% 50%, rgba(255,107,26,0.22), transparent 55%), radial-gradient(ellipse 40% 60% at 100% 50%, rgba(107,63,160,0.45), transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* Anchor column */}
          <Motion delay={40} className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-4">
              <span className="timezone-live-dot" />
              <p className="sec-kicker" style={{ letterSpacing: '0.28em' }}>Live clock</p>
            </div>
            <p className="font-display font-bold text-ivory text-xl leading-tight mb-2">
              Dallas<br />anchor
            </p>
            <p className="font-display text-ember text-3xl sm:text-4xl font-extrabold tracking-tight tabular-nums leading-none mb-2">
              {dallas.hour}:{dallas.minute}
              <span className="text-base text-ember/70 ml-1.5 font-body font-semibold tracking-wider">
                {dallas.dayPeriod}
              </span>
            </p>
            <p className="text-white/55 text-[10px] uppercase tracking-[0.25em]">CT · 8:00 PM source</p>
          </Motion>

          {/* Giant regional time */}
          <Motion delay={90} className="lg:col-span-5 text-center lg:text-left">
            <p className="text-white/55 text-[10px] uppercase tracking-[0.3em] mb-3">
              In your region
            </p>
            <div key={`${current.iana}-${activeIdx}`} className="tz-fade-in">
              <p
                className="font-display font-extrabold text-ivory tracking-[-0.04em] leading-none tabular-nums"
                style={{ fontSize: 'clamp(3.5rem, 10vw, 6.5rem)' }}
              >
                {hour}
                <span className="text-ember">:</span>
                {minute}
              </p>
              <div className="flex flex-wrap items-baseline justify-center lg:justify-start gap-3 mt-3">
                <span className="font-body text-sm font-bold uppercase tracking-[0.35em] text-ember">
                  {dayPeriod}
                </span>
                <span className="text-white/25">·</span>
                <span className="font-display text-ivory/80 text-lg sm:text-xl">{current.label}</span>
                <span className="text-white/50 text-xs tracking-widest uppercase">{current.abbr}</span>
              </div>
            </div>
            <p className="text-white/60 text-xs sm:text-sm mt-5 max-w-sm mx-auto lg:mx-0 leading-relaxed">
              King Maker goes live when this clock hits — same moment, every region.
            </p>
          </Motion>

          {/* City dial */}
          <Motion delay={140} className="lg:col-span-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4">
              Regions · auto-rotating
            </p>
            <div className="flex flex-col border-l border-white/10">
              {TIMEZONES.map((tz, i) => {
                const on = i === activeIdx
                const t = formatParts(srcDate, tz.iana)
                return (
                  <button
                    key={tz.iana + tz.label}
                    type="button"
                    onClick={() => setActiveIdx(i)}
                    className={`relative flex items-center justify-between gap-4 pl-4 py-2.5 text-left transition-colors ${
                      on ? 'text-ivory' : 'text-white/55 hover:text-white/60'
                    }`}
                  >
                    {on && (
                      <span className="absolute left-0 top-1 bottom-1 w-0.5 bg-ember" />
                    )}
                    <span className="min-w-0">
                      <span className="block text-sm font-medium truncate">{tz.label}</span>
                      {tz.anchor && (
                        <span className="block text-[9px] uppercase tracking-[0.2em] text-ember/80 mt-0.5">
                          Anchor
                        </span>
                      )}
                    </span>
                    <span className={`font-display tabular-nums text-sm flex-shrink-0 ${on ? 'text-ember' : ''}`}>
                      {t.hour}:{t.minute} {t.dayPeriod}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="mt-4 h-px bg-white/10 overflow-hidden">
              <div
                key={tick}
                className="h-full w-full bg-ember origin-left"
                style={{ animation: `voice-progress ${ROTATE_MS}ms linear forwards` }}
              />
            </div>
          </Motion>
        </div>
      </div>
    </section>
  )
}

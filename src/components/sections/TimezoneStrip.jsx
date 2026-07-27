import { useEffect, useMemo, useState } from 'react'
import Motion from '../Motion'
import { useContent } from '../../cms/ContentContext'
import { livestreamRegions as fallbackRegions } from '../../data/livestreamRegions'
import { parseDisplayTime } from '../../utils/scheduleDisplay'

const ROTATE_MS = 3500

export default function TimezoneStrip() {
  const { collections, getPage } = useContent()
  const homePage = getPage('home')
  const regions = useMemo(
    () => (collections.livestreamRegions?.length ? collections.livestreamRegions : fallbackRegions),
    [collections.livestreamRegions],
  )
  const [activeIdx, setActiveIdx] = useState(0)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    setActiveIdx((prev) => (prev >= regions.length ? 0 : prev))
  }, [regions.length])

  useEffect(() => {
    if (regions.length < 2) return undefined
    const id = window.setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % regions.length)
      setTick((t) => t + 1)
    }, ROTATE_MS)
    return () => clearInterval(id)
  }, [regions.length])

  if (!regions.length) return null

  const anchorIdx = Math.max(
    0,
    regions.findIndex((r) => r.isAnchor === true || r.isAnchor === 'true'),
  )
  const anchor = regions[anchorIdx] || regions[0]
  const current = regions[activeIdx] || regions[0]
  const anchorParts = parseDisplayTime(anchor.time)
  const currentParts = parseDisplayTime(current.time)
  const kicker = homePage.livestreamClockKicker || 'Live clock'
  const anchorLabel = homePage.livestreamAnchorLabel || 'Dallas anchor'
  const tagline =
    homePage.livestreamClockTagline ||
    'King Maker goes live when this clock hits — same moment, every region.'

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
          <Motion delay={40} className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-4">
              <span className="timezone-live-dot" />
              <p className="sec-kicker" style={{ letterSpacing: '0.28em' }}>
                {kicker}
              </p>
            </div>
            <p className="font-display font-bold text-ivory text-xl leading-tight mb-2">
              {anchorLabel.includes(' ') ? (
                <>
                  {anchorLabel.split(' ')[0]}
                  <br />
                  {anchorLabel.split(' ').slice(1).join(' ')}
                </>
              ) : (
                anchorLabel
              )}
            </p>
            <p className="font-display text-ember text-3xl sm:text-4xl font-extrabold tracking-tight tabular-nums leading-none mb-2">
              {anchorParts.hour}:{anchorParts.minute}
              {anchorParts.dayPeriod && (
                <span className="text-base text-ember/70 ml-1.5 font-body font-semibold tracking-wider">
                  {anchorParts.dayPeriod}
                </span>
              )}
            </p>
            <p className="text-white/55 text-[10px] uppercase tracking-[0.25em]">
              {anchor.abbr || 'CT'} · {anchor.region} source
            </p>
          </Motion>

          <Motion delay={90} className="lg:col-span-5 text-center lg:text-left">
            <p className="text-white/55 text-[10px] uppercase tracking-[0.3em] mb-3">In your region</p>
            <div key={`${current.id}-${activeIdx}`} className="tz-fade-in">
              <p
                className="font-display font-extrabold text-ivory tracking-[-0.04em] leading-none tabular-nums"
                style={{ fontSize: 'clamp(3.5rem, 10vw, 6.5rem)' }}
              >
                {currentParts.hour}
                {currentParts.minute ? (
                  <>
                    <span className="text-ember">:</span>
                    {currentParts.minute}
                  </>
                ) : null}
              </p>
              <div className="flex flex-wrap items-baseline justify-center lg:justify-start gap-3 mt-3">
                {currentParts.dayPeriod && (
                  <span className="font-body text-sm font-bold uppercase tracking-[0.35em] text-ember">
                    {currentParts.dayPeriod}
                  </span>
                )}
                <span className="text-white/25">·</span>
                <span className="font-display text-ivory/80 text-lg sm:text-xl">{current.region}</span>
                {current.abbr && (
                  <span className="text-white/50 text-xs tracking-widest uppercase">{current.abbr}</span>
                )}
              </div>
            </div>
            <p className="text-white/60 text-xs sm:text-sm mt-5 max-w-sm mx-auto lg:mx-0 leading-relaxed">{tagline}</p>
          </Motion>

          <Motion delay={140} className="lg:col-span-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4">Regions · auto-rotating</p>
            <div className="flex flex-col border-l border-white/10">
              {regions.map((tz, i) => {
                const on = i === activeIdx
                const t = parseDisplayTime(tz.time)
                return (
                  <button
                    key={String(tz.id) + tz.region}
                    type="button"
                    onClick={() => setActiveIdx(i)}
                    className={`relative flex items-center justify-between gap-4 pl-4 py-2.5 text-left transition-colors ${
                      on ? 'text-ivory' : 'text-white/55 hover:text-white/60'
                    }`}
                  >
                    {on && <span className="absolute left-0 top-1 bottom-1 w-0.5 bg-ember" />}
                    <span className="min-w-0">
                      <span className="block text-sm font-medium truncate">{tz.region}</span>
                      {(tz.isAnchor === true || tz.isAnchor === 'true') && (
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

import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { battleTypes as fallbackTypes, schedule as fallbackSchedule } from '../data/schedule'
import { Icons } from '../components/Icons'
import { useSignUp } from '../components/SignUpContext'
import { convertTimezones, getBattleStatus, getCountdown, getBattleDate, downloadICS } from '../utils/battle'
import Motion from '../components/Motion'
import { useContent } from '../cms/ContentContext'
import './BattleSchedule.css'

const typeImages = {
  'Daily Godsent': '/battles-photos/daily-godsent.jpg',
  'Most Beautiful': '/battles-photos/most-beautiful.jpg',
  Country: '/battles-photos/country.jpg',
  Scavengers: '/battles-photos/scavengers.jpg',
  'Champion of Champions': '/battles-photos/champion-of-champions.jpg',
}

const typeAccent = {
  'Daily Godsent': '#FF6B1A',
  'Most Beautiful': '#E8B94A',
  Country: '#C4A0FF',
  Scavengers: '#FF8A3D',
  'Champion of Champions': '#E8B94A',
}

function formatDay(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return {
    weekday: d.toLocaleDateString('en-US', { weekday: 'short' }),
    month: d.toLocaleDateString('en-US', { month: 'short' }),
    day: d.getDate(),
  }
}

function parseCountdownParts(str) {
  if (!str) return []
  // e.g. "2d 5h 12m" or similar from getCountdown
  return String(str)
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => {
      const m = part.match(/^(\d+)([a-zA-Z]+)$/)
      if (m) return { value: m[1], unit: m[2] }
      return { value: part, unit: '' }
    })
}

export default function BattleSchedule() {
  const [activeType, setActiveType] = useState('All')
  const [activeId, setActiveId] = useState(null)
  const [paused, setPaused] = useState(false)
  const { openOfficial, openSpecial } = useSignUp()
  const { collections } = useContent()
  const schedule = collections.schedule?.length ? collections.schedule : fallbackSchedule
  const filters = collections.battleTypes?.length ? collections.battleTypes : fallbackTypes
  const [next, setNext] = useState(null)
  const [countdown, setCountdown] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const upcoming = schedule
        .map((b) => ({ ...b, dateObj: getBattleDate(b.date, b.time) }))
        .filter((b) => b.dateObj > now)
        .sort((a, b) => a.dateObj - b.dateObj)
      const n = upcoming[0] || null
      setNext(n)
      setCountdown(n ? getCountdown(n.dateObj) : '')
      setActiveId((prev) => {
        if (prev && schedule.some((b) => b.id === prev)) return prev
        return n?.id ?? schedule[0]?.id ?? null
      })
    }
    update()
    const id = setInterval(update, 30000)
    return () => clearInterval(id)
  }, [schedule])

  const filtered = useMemo(
    () => (activeType === 'All' ? schedule : schedule.filter((b) => b.type === activeType)),
    [activeType, schedule],
  )

  useEffect(() => {
    if (!filtered.length) return
    if (!filtered.some((b) => b.id === activeId)) {
      setActiveId(filtered[0].id)
    }
  }, [filtered, activeId])

  useEffect(() => {
    if (paused || filtered.length < 2) return undefined
    const id = window.setInterval(() => {
      setActiveId((cur) => {
        const idx = filtered.findIndex((b) => b.id === cur)
        const nextIdx = idx < 0 ? 0 : (idx + 1) % filtered.length
        return filtered[nextIdx].id
      })
    }, 6000)
    return () => clearInterval(id)
  }, [paused, filtered])

  const battle = filtered.find((b) => b.id === activeId) || filtered[0] || null
  const accent = battle ? typeAccent[battle.type] || '#FF6B1A' : '#FF6B1A'
  const img = battle ? typeImages[battle.type] || typeImages['Daily Godsent'] : typeImages['Daily Godsent']
  const status = battle ? getBattleStatus(battle.date, battle.time) : null
  const zones = battle ? convertTimezones(battle.date, battle.time) : []
  const isOfficial = battle
    ? battle.type === 'Daily Godsent' || battle.type === 'Champion of Champions'
    : true
  const day = battle ? formatDay(battle.date) : null
  const countdownParts = parseCountdownParts(countdown)
  const nextDay = next ? formatDay(next.date) : null

  const handleEnter = () => (isOfficial ? openOfficial() : openSpecial())

  const nextZones = next ? convertTimezones(next.date, next.time) : []
  const ctZone = nextZones.find((z) => z.label === 'CT') || nextZones[0]

  return (
    <main className="sched-page">
      {/* ═══ Hero — Fight Gate ═══ */}
      <section className="sched-hero" aria-label="Battle Schedule">
        <div className="sched-hero__photo-plane">
          <img
            src={next ? (typeImages[next.type] || img) : img}
            alt={next ? next.title : 'Battle schedule'}
            className="sched-hero__photo"
          />
        </div>

        <div className="sched-hero__gate" aria-hidden />

        <div className="sched-hero__frame">
          <div className="sched-hero__column">
            <Motion delay={70}>
              <p className="sched-hero__brand">KM DYNASTY</p>
              <h1 className="sched-hero__title">
                <span className="sched-hero__title-soft">The</span>
                <span className="sched-hero__title-hard">Schedule</span>
              </h1>
              <p className="sched-hero__lede">
                Tonight’s arena. Live clocks. One board for the Dynasty.
              </p>
            </Motion>

            {next && countdownParts.length > 0 && (
              <Motion delay={160} className="sched-hero__clock" aria-label={`Starts in ${countdown}`}>
                {countdownParts.map((p, i) => (
                  <div key={`${p.value}-${p.unit}-${i}`} className="sched-hero__clock-cell">
                    <span className="sched-hero__clock-val font-display">{p.value}</span>
                    <span className="sched-hero__clock-unit">{p.unit}</span>
                  </div>
                ))}
              </Motion>
            )}

            <Motion delay={240} className="sched-hero__next">
              {next ? (
                <>
                  <p
                    className="sched-hero__next-type"
                    style={{ color: typeAccent[next.type] || '#FF8A3D' }}
                  >
                    Next · {next.type}
                  </p>
                  <p className="sched-hero__next-title font-display">{next.title}</p>
                  <p className="sched-hero__next-meta">
                    {nextDay?.weekday} {nextDay?.month} {nextDay?.day}
                    {ctZone ? ` · ${ctZone.time} ${ctZone.label}` : ` · ${next.time}`}
                  </p>
                </>
              ) : (
                <p className="sched-hero__next-title font-display">No fight on deck</p>
              )}
            </Motion>

            <Motion delay={320} className="sched-hero__actions">
              <a href="#sched-board" className="sched-hero__cta">
                Open the board
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <Link to="/how-to-join" className="sched-hero__link">
                How to qualify
              </Link>
            </Motion>
          </div>

          {nextZones.length > 0 && (
            <div className="sched-hero__spine" aria-label="Global kickoff">
              {nextZones.map(({ label, time }) => (
                <div key={label} className={`sched-hero__spine-item ${label === 'CT' ? 'is-home' : ''}`}>
                  <span className="sched-hero__spine-label">{label}</span>
                  <span className="sched-hero__spine-time font-display">{time}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══ Arena board ═══ */}
      <section id="sched-board" className="sched-board">
        <div className="sched-pad sched-board__intro">
          <Motion delay={40}>
            <p className="sec-kicker mb-2">The Arena Board</p>
            <div className="sched-board__intro-row">
              <h2 className="sched-board__heading font-display font-bold text-ivory tracking-tight">
                Choose your <span className="text-gradient">fire</span>
              </h2>
              <p className="sched-board__count">
                {filtered.length} {filtered.length === 1 ? 'battle' : 'battles'}
              </p>
            </div>
          </Motion>
        </div>

        {/* Type ribbon — full width, not pills */}
        <div className="sched-ribbon" role="tablist" aria-label="Battle types">
          {filters.map((type) => {
            const on = activeType === type
            const a = type === 'All' ? '#FF8A3D' : typeAccent[type] || '#FF8A3D'
            return (
              <button
                key={type}
                type="button"
                role="tab"
                aria-selected={on}
                className={`sched-ribbon__btn ${on ? 'is-active' : ''}`}
                style={{ ['--sched-accent']: a }}
                onClick={() => setActiveType(type)}
              >
                {type === 'All' ? 'All Arenas' : type}
              </button>
            )
          })}
        </div>

        {battle ? (
          <div
            className="sched-stage"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="sched-stage__visual">
              {filtered.map((b) => (
                <img
                  key={b.id}
                  src={typeImages[b.type] || typeImages['Daily Godsent']}
                  alt={b.id === battle.id ? b.title : ''}
                  aria-hidden={b.id !== battle.id}
                  className={`sched-stage__img ${b.id === battle.id ? 'is-on' : ''}`}
                />
              ))}
              <div className="sched-stage__veil" />

              <div className="sched-stage__copy sched-pad">
                <div className="sched-stage__copy-inner">
                  <div className="sched-stage__badges">
                    <span className="sched-status" data-status={status} style={{ ['--sched-accent']: accent }}>
                      {status === 'live' ? 'Live now' : status === 'today' ? 'Tonight' : 'Upcoming'}
                    </span>
                    <span className="sched-type" style={{ color: accent }}>
                      {battle.type}
                    </span>
                  </div>

                  <p className="sched-stage__date font-display">
                    <span>{day?.weekday}</span>
                    <span className="sched-stage__date-em">{day?.month} {day?.day}</span>
                  </p>

                  <h3 className="sched-stage__title font-display font-bold text-ivory">
                    {battle.title}
                  </h3>
                  <p className="sched-stage__desc">{battle.description}</p>

                  <div className="sched-zones" aria-label="Kickoff times">
                    {zones.map(({ label, time }) => (
                      <div key={label} className="sched-zones__cell">
                        <span className="sched-zones__time font-display">{time}</span>
                        <span className="sched-zones__label">{label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="sched-stage__actions">
                    <button type="button" onClick={handleEnter} className="sched-hero__cta">
                      {isOfficial ? 'Join this battle' : 'Apply for this battle'}
                      <span className="w-4 h-4 block">{Icons.arrowRight}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => downloadICS(battle)}
                      className="sched-hero__link"
                    >
                      Add to calendar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Chronologue rail */}
            <div className="sched-chrono" role="listbox" aria-label="Scheduled battles">
              {filtered.map((b, i) => {
                const on = b.id === battle.id
                const d = formatDay(b.date)
                const a = typeAccent[b.type] || '#FF6B1A'
                return (
                  <button
                    key={b.id}
                    type="button"
                    role="option"
                    aria-selected={on}
                    className={`sched-chrono__row ${on ? 'is-active' : ''}`}
                    style={{ ['--sched-accent']: a }}
                    onClick={() => setActiveId(b.id)}
                    onMouseEnter={() => setActiveId(b.id)}
                  >
                    <span className="sched-chrono__idx font-display">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="sched-chrono__date">
                      <span className="sched-chrono__day">{d.day}</span>
                      <span className="sched-chrono__mon">{d.month}</span>
                    </span>
                    <span className="sched-chrono__meta">
                      <span className="sched-chrono__type">{b.type}</span>
                      <span className="sched-chrono__title">{b.title}</span>
                    </span>
                    <span className="sched-chrono__time">{b.time.replace(' CT', '')}</span>
                  </button>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="sched-pad sched-empty">
            <p>No {activeType} battles on the board yet.</p>
            <button type="button" onClick={() => setActiveType('All')} className="sched-hero__link">
              Show all arenas
            </button>
          </div>
        )}
      </section>

      {/* ═══ Finale ═══ */}
      <section className="sched-finale">
        <div className="sched-finale__grid">
          <div className="sched-finale__media">
            <img
              src="/battles-photos/champion-of-champions.jpg"
              alt="Champion of Champions"
              className="sched-finale__img"
            />
            <span className="sched-finale__echo font-display" aria-hidden>
              FINAL
            </span>
          </div>

          <div className="sched-finale__copy sched-pad">
            <Motion delay={60}>
              <p className="sec-kicker mb-4" style={{ color: '#E8B94A' }}>
                Path to the crown
              </p>
              <h2 className="sched-finale__title font-display font-bold text-ivory tracking-tight">
                Champion of
                <span className="block text-gradient">Champions</span>
              </h2>
              <p className="sched-finale__lede">
                Official winners collide in one finale. Win your night — then claim your seat.
              </p>
              <div className="sched-finale__rules">
                {[
                  { n: '01', t: 'Win Official Godsent' },
                  { n: '02', t: 'Earn your finale seat' },
                  { n: '03', t: 'Rise for the crown' },
                ].map((r) => (
                  <div key={r.n} className="sched-finale__rule">
                    <span className="sched-finale__rule-n font-display">{r.n}</span>
                    <span className="sched-finale__rule-t">{r.t}</span>
                  </div>
                ))}
              </div>
              <Link to="/how-to-join" className="sched-hero__cta">
                How to qualify
                <span className="w-4 h-4 block">{Icons.arrowRight}</span>
              </Link>
            </Motion>
          </div>
        </div>
      </section>
    </main>
  )
}

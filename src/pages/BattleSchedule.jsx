import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { schedule as fallbackSchedule } from '../data/schedule'
import { Icons } from '../components/Icons'
import { convertTimezones, getCountdown, getBattleDate } from '../utils/battle'
import Motion from '../components/Motion'
import WeekHorizon from '../components/sections/WeekHorizon'
import AdBanner from '../components/AdBanner'
import { useContent } from '../cms/ContentContext'
import {
  TYPE_ACCENT,
  formatScheduleDay,
  getBattleImage,
} from '../utils/scheduleDisplay'
import './BattleSchedule.css'

function parseCountdownParts(str) {
  if (!str) return []
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
  const { collections, getPage, settings } = useContent()
  const page = getPage('schedule')
  const siteName = settings.siteName || ''
  const schedule = collections.schedule?.length ? collections.schedule : fallbackSchedule

  const weekHorizonKicker = page.weekHorizonKicker || '30-day horizon'
  const weekHorizonTitle = page.weekHorizonTitle || 'Your month in the arena'
  const finaleKicker = page.finaleKicker || 'Path to the crown'
  const finaleTitle = page.finaleTitle || 'Champion of Champions'
  const finaleBody = page.finaleBody || 'Official winners collide in one finale. Win your night — then claim your seat.'
  const finaleImage = page.finaleImage || '/photos/victory-celebration.jpg'

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
    }
    update()
    const id = setInterval(update, 30000)
    return () => clearInterval(id)
  }, [schedule])

  const countdownParts = parseCountdownParts(countdown)
  const nextDay = next ? formatScheduleDay(next.date) : null
  const nextZones = next ? convertTimezones(next.date, next.time) : []
  const ctZone = nextZones.find((z) => z.label === 'CT') || nextZones[0]
  const heroImg = next ? getBattleImage(next) : '/battles-photos/daily-godsent.jpg'

  return (
    <main className="sched-page">
      <section className="sched-hero" aria-label="Battle Schedule">
        <div className="sched-hero__photo-plane">
          <img
            src={heroImg}
            alt={next ? next.title : 'Battle schedule'}
            className="sched-hero__photo"
          />
        </div>

        <div className="sched-hero__gate" aria-hidden />

        <div className="sched-hero__frame">
          <div className="sched-hero__column">
            <Motion delay={70}>
              <p className="sched-hero__brand">{siteName}</p>
              <h1 className="sched-hero__title">
                <span className="sched-hero__title-soft">The</span>
                <span className="sched-hero__title-hard">Schedule</span>
              </h1>
              <p className="sched-hero__lede">Tonight’s arena. Live clocks. One board for the Dynasty.</p>
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
                  <p className="sched-hero__next-type" style={{ color: TYPE_ACCENT[next.type] || '#FF8A3D' }}>
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
              <a href="#week-horizon" className="sched-hero__cta">
                30-day horizon
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

      <div id="week-horizon">
        <WeekHorizon
          schedule={schedule}
          kicker={weekHorizonKicker}
          title={weekHorizonTitle}
        />
      </div>

      <AdBanner slot="schedule-after-horizon" />

      <section className="sched-finale">
        <div className="sched-finale__grid">
          <div className="sched-finale__media">
            <img src={finaleImage} alt="Champion of Champions" className="sched-finale__img" />
            <span className="sched-finale__echo font-display" aria-hidden>
              FINAL
            </span>
          </div>

          <div className="sched-finale__copy sched-pad">
            <Motion delay={60}>
              <p className="sec-kicker mb-4" style={{ color: '#E8B94A' }}>
                {finaleKicker}
              </p>
              <h2 className="sched-finale__title font-display font-bold text-ivory tracking-tight">{finaleTitle}</h2>
              <p className="sched-finale__lede">{finaleBody}</p>
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

import { Link } from 'react-router-dom'
import Motion from '../Motion'
import { useContent } from '../../cms/ContentContext'
import { getDefaultSchedule } from '../../data/schedule'
import { getBattleStatus } from '../../utils/battle'
import {
  formatScheduleDay,
  getBattleAccent,
  getBattleImage,
  getUpcomingBattles,
  resolveScheduleList,
} from '../../utils/scheduleDisplay'

export default function UpcomingBattles() {
  const { collections, getPage } = useContent()
  const homePage = getPage('home')
  const schedule = resolveScheduleList(collections.schedule, getDefaultSchedule())
  const upcoming = getUpcomingBattles(schedule, 3)

  const kicker = homePage.upcomingBattlesKicker || 'Coming up'
  const title = homePage.upcomingBattlesTitle || 'Next in the arena'

  if (!upcoming.length) return null

  return (
    <section className="relative overflow-hidden home-band-violet home-band-sep" aria-label="Upcoming battles">
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 20% 0%, rgba(255,107,26,0.2), transparent 55%), radial-gradient(ellipse 50% 40% at 90% 100%, rgba(107,63,160,0.35), transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <Motion delay={30} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="sec-kicker mb-2">{kicker}</p>
            <h2
              className="font-display font-bold text-ivory tracking-tight"
              style={{ fontSize: 'clamp(1.85rem, 4vw, 2.75rem)' }}
            >
              {title}
            </h2>
          </div>
          <Link to="/battle-schedule" className="sec-cta-ghost self-start sm:self-auto">
            Full schedule
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </Motion>

        <div className="upcoming-grid">
          {upcoming.map((battle, idx) => {
            const day = formatScheduleDay(battle.date)
            const accent = getBattleAccent(battle)
            const img = getBattleImage(battle)
            const status = getBattleStatus(battle.date, battle.time)

            return (
              <Motion key={battle.id} delay={60 + idx * 50}>
                <Link
                  to={`/battle-schedule?battle=${battle.id}#sched-board`}
                  className="upcoming-card group"
                  style={{ '--up-accent': accent }}
                >
                  <div className="upcoming-card__visual">
                    <img src={img} alt="" className="upcoming-card__img" loading="lazy" />
                    <div className="upcoming-card__veil" />
                    <span className="upcoming-card__rank font-display">{String(idx + 1).padStart(2, '0')}</span>
                    {status === 'live' ? (
                      <span className="upcoming-card__badge upcoming-card__badge--live">Live now</span>
                    ) : status === 'today' ? (
                      <span className="upcoming-card__badge">Tonight</span>
                    ) : null}
                  </div>
                  <div className="upcoming-card__body">
                    <p className="upcoming-card__meta">
                      {day.weekday} {day.month} {day.day} · {battle.time}
                    </p>
                    <p className="upcoming-card__type">{battle.type}</p>
                    <h3 className="upcoming-card__title font-display">{battle.title}</h3>
                    <span className="upcoming-card__link">
                      View details
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </Motion>
            )
          })}
        </div>
      </div>
    </section>
  )
}

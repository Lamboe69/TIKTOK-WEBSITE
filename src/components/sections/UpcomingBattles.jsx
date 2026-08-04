import Motion from '../Motion'
import { useContent } from '../../cms/ContentContext'
import { getDefaultSchedule } from '../../data/schedule'
import { getBattleStatus } from '../../utils/battle'
import { mediaUrl } from '../../utils/mediaUrl'
import {
  formatScheduleDay,
  getBattleAccent,
  getBattleImage,
  getUpcomingBattles,
  resolveScheduleList,
} from '../../utils/scheduleDisplay'

function posterFilename(battle) {
  const title = String(battle?.title || 'battle-poster')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  const date = String(battle?.date || '').slice(0, 10)
  return `${title || 'battle-poster'}${date ? `-${date}` : ''}.jpg`
}

async function downloadPoster(src, battle) {
  const url = mediaUrl(src)
  if (!url) return
  const filename = posterFilename(battle)

  try {
    const res = await fetch(url, { mode: 'cors' })
    if (!res.ok) throw new Error('fetch failed')
    const blob = await res.blob()
    const blobUrl = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = blobUrl
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(blobUrl)
  } catch {
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    document.body.appendChild(a)
    a.click()
    a.remove()
  }
}

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
        <Motion delay={30} className="mb-10">
          <div>
            <p className="sec-kicker mb-2">{kicker}</p>
            <h2
              className="font-display font-bold text-ivory tracking-tight"
              style={{ fontSize: 'clamp(1.85rem, 4vw, 2.75rem)' }}
            >
              {title}
            </h2>
          </div>
        </Motion>

        <div className="upcoming-grid">
          {upcoming.map((battle, idx) => {
            const day = formatScheduleDay(battle.date)
            const accent = getBattleAccent(battle)
            const img = mediaUrl(getBattleImage(battle))
            const status = getBattleStatus(battle.date, battle.time)

            return (
              <Motion key={battle.id} delay={60 + idx * 50}>
                <article
                  className="upcoming-card"
                  style={{ '--up-accent': accent }}
                >
                  <div className="upcoming-card__visual">
                    <img
                      src={img}
                      alt={`${battle.title} poster`}
                      className="upcoming-card__img"
                      loading="lazy"
                    />
                    <span className="upcoming-card__rank font-display" aria-hidden>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    {status === 'live' ? (
                      <span className="upcoming-card__badge upcoming-card__badge--live">Live now</span>
                    ) : status === 'today' ? (
                      <span className="upcoming-card__badge">Tonight</span>
                    ) : null}
                  </div>

                  <div className="upcoming-card__body">
                    <p className="upcoming-card__meta">
                      <span>
                        {day.weekday} {day.month} {day.day}
                      </span>
                      <span className="upcoming-card__dot" aria-hidden />
                      <span>{battle.time}</span>
                    </p>
                    <p className="upcoming-card__type">{battle.type}</p>
                    <h3 className="upcoming-card__title font-display">{battle.title}</h3>
                    <button
                      type="button"
                      className="upcoming-card__download"
                      onClick={() => downloadPoster(img, battle)}
                    >
                      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path
                          d="M8 2v8m0 0L5 7.5M8 10l3-2.5M3 13h10"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Download Poster
                    </button>
                  </div>
                </article>
              </Motion>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { useRef, useState } from 'react'
import { A11y, Keyboard } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Motion from '../Motion'
import { useContent } from '../../cms/ContentContext'
import { getDefaultSchedule } from '../../data/schedule'
import { getBattleStatus } from '../../utils/battle'
import { mediaUrl } from '../../utils/mediaUrl'
import {
  formatScheduleDay,
  getBattleAccent,
  getBattleImage,
  getHorizonBattles,
  getUpcomingBattles,
  resolveScheduleList,
} from '../../utils/scheduleDisplay'

import 'swiper/css'

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
  const horizon = getHorizonBattles(schedule, 30)
  const upcoming = horizon.length ? horizon : getUpcomingBattles(schedule, 30)

  const kicker = homePage.upcomingBattlesKicker || 'Coming up'
  const title = homePage.upcomingBattlesTitle || 'Next in the arena'

  const swiperRef = useRef(null)
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const last = Math.max(0, upcoming.length - 1)

  if (!upcoming.length) return null

  const canPrev = active > 0
  const canNext = active < last
  const progressPct = upcoming.length <= 1 ? 100 : Math.max(progress * 100, ((active + 1) / upcoming.length) * 100)

  return (
    <section className="upcoming-section home-band-violet home-band-sep" aria-label="Upcoming battles">
      <div className="upcoming-section__glow" aria-hidden />

      <div className="upcoming-section__inner">
        <Motion delay={30} className="upcoming-head-wrap">
          <div className="upcoming-head">
            <div>
              <p className="sec-kicker mb-2">{kicker}</p>
              <h2 className="upcoming-head__title font-display">{title}</h2>
              <p className="upcoming-head__hint">Drag or swipe — next 30 days of battle flyers</p>
            </div>
            {upcoming.length > 1 ? (
              <div className="upcoming-nav" role="group" aria-label="Flyer carousel controls">
                <button
                  type="button"
                  className="upcoming-nav__btn"
                  onClick={() => swiperRef.current?.slidePrev()}
                  disabled={!canPrev}
                  aria-label="Previous flyer"
                >
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path
                      d="M10.5 3.5 6 8l4.5 4.5"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <span className="upcoming-nav__count" aria-live="polite">
                  {String(active + 1).padStart(2, '0')}
                  <span>/</span>
                  {String(upcoming.length).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  className="upcoming-nav__btn"
                  onClick={() => swiperRef.current?.slideNext()}
                  disabled={!canNext}
                  aria-label="Next flyer"
                >
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path
                      d="M5.5 3.5 10 8l-4.5 4.5"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ) : null}
          </div>
        </Motion>
      </div>

      <div className="upcoming-rail">
        <button
          type="button"
          className="upcoming-rail__arrow upcoming-rail__arrow--prev"
          onClick={() => swiperRef.current?.slidePrev()}
          disabled={!canPrev}
          aria-label="Previous flyer"
        >
          <svg width="22" height="22" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M10.5 3.5 6 8l4.5 4.5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          className="upcoming-rail__arrow upcoming-rail__arrow--next"
          onClick={() => swiperRef.current?.slideNext()}
          disabled={!canNext}
          aria-label="Next flyer"
        >
          <svg width="22" height="22" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M5.5 3.5 10 8l-4.5 4.5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <Swiper
          className="upcoming-swiper"
          modules={[Keyboard, A11y]}
          grabCursor
          speed={480}
          spaceBetween={18}
          slidesPerView={1.15}
          slidesOffsetBefore={16}
          slidesOffsetAfter={16}
          watchOverflow
          keyboard={{ enabled: true }}
          a11y={{
            enabled: true,
            prevSlideMessage: 'Previous flyer',
            nextSlideMessage: 'Next flyer',
          }}
          breakpoints={{
            640: {
              slidesPerView: 2.1,
              spaceBetween: 18,
              slidesOffsetBefore: 20,
              slidesOffsetAfter: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
              slidesOffsetBefore: 28,
              slidesOffsetAfter: 28,
            },
            1400: {
              slidesPerView: 3,
              spaceBetween: 24,
              slidesOffsetBefore: 40,
              slidesOffsetAfter: 40,
            },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
            setProgress(swiper.progress || 0)
          }}
          onSlideChange={(swiper) => setActive(swiper.activeIndex)}
          onProgress={(swiper) => setProgress(swiper.progress || 0)}
        >
          {upcoming.map((battle, idx) => {
            const day = formatScheduleDay(battle.date)
            const accent = getBattleAccent(battle)
            const img = mediaUrl(getBattleImage(battle))
            const status = getBattleStatus(battle.date, battle.time)
            const isActive = idx === active

            return (
              <SwiperSlide
                key={`${battle.id}-${battle.date}-${idx}`}
                className={`upcoming-slide${isActive ? ' is-active' : ''}`}
              >
                <article className="upcoming-card" style={{ '--up-accent': accent }}>
                  <div className="upcoming-card__visual">
                    <img
                      src={img}
                      alt={`${battle.title} poster`}
                      className="upcoming-card__img"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      draggable="false"
                    />
                    <div className="upcoming-card__scrim" aria-hidden />
                    <span className="upcoming-card__rank font-display" aria-hidden>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    {status === 'live' ? (
                      <span className="upcoming-card__badge upcoming-card__badge--live">Live now</span>
                    ) : status === 'today' ? (
                      <span className="upcoming-card__badge">Tonight</span>
                    ) : null}

                    <div className="upcoming-card__overlay">
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
                        className="upcoming-card__download swiper-no-swiping"
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
                  </div>
                </article>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>

      {upcoming.length > 1 ? (
        <div className="upcoming-section__inner upcoming-foot">
          <div className="upcoming-progress" aria-hidden>
            <span style={{ width: `${Math.min(100, Math.max(8, progressPct))}%` }} />
          </div>
          <div className="upcoming-dots" role="tablist" aria-label="Flyer position">
            {upcoming.map((battle, idx) => (
              <button
                key={`${battle.id}-dot-${idx}`}
                type="button"
                role="tab"
                aria-selected={idx === active}
                aria-label={`Show flyer ${idx + 1}: ${battle.title}`}
                className={`upcoming-dots__dot${idx === active ? ' is-active' : ''}`}
                onClick={() => swiperRef.current?.slideTo(idx)}
              />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  )
}

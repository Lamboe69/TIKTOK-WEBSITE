import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { A11y, Keyboard } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Motion from '../Motion'
import { getBattleStatus } from '../../utils/battle'
import {
  chunkItems,
  getBattleAccent,
  getBattleImage,
  getNextNDays,
} from '../../utils/scheduleDisplay'
import { useSignUp } from '../SignUpContext'

import 'swiper/css'

const HORIZON_DAYS = 30
const PAGE_SIZE = 15

function DayCard({ day, absoluteIndex, onSelectBattle, openBattle }) {
  const battle = day.primary
  const accent = getBattleAccent(battle)
  const img = getBattleImage(battle)
  const status = battle ? getBattleStatus(battle.date, battle.time) : null
  const dayLabel = day.isToday ? 'Today' : day.isTomorrow ? 'Tomorrow' : day.label.weekdayLong

  const handleClick = () => {
    if (!battle) return
    if (onSelectBattle) {
      onSelectBattle(battle.id)
      return
    }
    openBattle(battle)
  }

  return (
    <article
      className={`week-horizon__card ${battle ? 'has-battle' : 'is-open'} ${day.isToday ? 'is-today' : ''}`}
      style={{ '--wh-accent': accent }}
    >
      <div className="week-horizon__poster">
        {battle ? (
          <img src={img} alt={battle.title} className="week-horizon__img" loading="lazy" />
        ) : (
          <div className="week-horizon__placeholder" aria-hidden />
        )}
        <div className="week-horizon__veil" />
        <div className="week-horizon__date-badge font-display">
          <span className="week-horizon__day-num">{String(day.label.day).padStart(2, '0')}</span>
          <span className="week-horizon__month">{day.label.month}</span>
        </div>
        {status === 'live' ? (
          <span className="week-horizon__live">
            <span className="week-horizon__live-dot" />
            Live
          </span>
        ) : null}
      </div>

      <div className="week-horizon__body">
        <p className="week-horizon__when">{dayLabel}</p>
        {battle ? (
          <>
            <p className="week-horizon__type">{battle.type}</p>
            <h3 className="week-horizon__name font-display">{battle.title}</h3>
            <p className="week-horizon__time">{battle.time}</p>
            {day.battles.length > 1 ? (
              <p className="week-horizon__more">+{day.battles.length - 1} more</p>
            ) : null}
            <button type="button" className="week-horizon__cta" onClick={handleClick}>
              View details
            </button>
          </>
        ) : (
          <>
            <p className="week-horizon__open-label">Open night</p>
            <p className="week-horizon__open-copy">No battle locked — check back soon.</p>
            <Link to="/how-to-join" className="week-horizon__cta week-horizon__cta--ghost">
              How to join
            </Link>
          </>
        )}
      </div>

      <span className="week-horizon__index font-display" aria-hidden>
        {String(absoluteIndex + 1).padStart(2, '0')}
      </span>
    </article>
  )
}

export default function WeekHorizon({ schedule, kicker, title, onSelectBattle }) {
  const days = getNextNDays(schedule, HORIZON_DAYS)
  const pages = chunkItems(days, PAGE_SIZE)
  const { openBattle } = useSignUp()
  const swiperRef = useRef(null)
  const [page, setPage] = useState(0)
  const last = Math.max(0, pages.length - 1)

  return (
    <section className="week-horizon" aria-label="Next 30 days">
      <div className="week-horizon__head sched-pad">
        <Motion delay={30}>
          <div className="week-horizon__head-row">
            <div>
              <p className="sec-kicker mb-2">{kicker}</p>
              <h2 className="week-horizon__title font-display font-bold text-ivory tracking-tight">
                {title}
              </h2>
              <p className="week-horizon__hint">
                Next {HORIZON_DAYS} days · {PAGE_SIZE} per page · swipe for more
              </p>
            </div>
            {pages.length > 1 ? (
              <div className="week-horizon__nav" role="group" aria-label="Schedule page controls">
                <button
                  type="button"
                  className="week-horizon__nav-btn"
                  onClick={() => swiperRef.current?.slidePrev()}
                  disabled={page <= 0}
                  aria-label="Previous 15 days"
                >
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path
                      d="M10.5 3.5 6 8l4.5 4.5"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <span className="week-horizon__page-count" aria-live="polite">
                  {page + 1}
                  <span>/</span>
                  {pages.length}
                </span>
                <button
                  type="button"
                  className="week-horizon__nav-btn"
                  onClick={() => swiperRef.current?.slideNext()}
                  disabled={page >= last}
                  aria-label="Next 15 days"
                >
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
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

      <Swiper
        className="week-horizon__swiper"
        modules={[Keyboard, A11y]}
        speed={520}
        spaceBetween={0}
        slidesPerView={1}
        watchOverflow
        grabCursor
        keyboard={{ enabled: true }}
        a11y={{
          enabled: true,
          prevSlideMessage: 'Previous 15 days',
          nextSlideMessage: 'Next 15 days',
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        onSlideChange={(swiper) => setPage(swiper.activeIndex)}
      >
        {pages.map((pageDays, pageIdx) => (
          <SwiperSlide key={`horizon-page-${pageIdx}`} className="week-horizon__page">
            <div className="week-horizon__deck">
              {pageDays.map((day, idx) => (
                <div key={day.date} className="week-horizon__slot">
                  <DayCard
                    day={day}
                    absoluteIndex={pageIdx * PAGE_SIZE + idx}
                    onSelectBattle={onSelectBattle}
                    openBattle={openBattle}
                  />
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {pages.length > 1 ? (
        <div className="week-horizon__pager sched-pad">
          <div className="week-horizon__progress" aria-hidden>
            <span style={{ width: `${((page + 1) / pages.length) * 100}%` }} />
          </div>
          <div className="week-horizon__dots" role="tablist" aria-label="Schedule pages">
            {pages.map((_, idx) => (
              <button
                key={`dot-${idx}`}
                type="button"
                role="tab"
                aria-selected={idx === page}
                aria-label={`Show days ${idx * PAGE_SIZE + 1}–${Math.min((idx + 1) * PAGE_SIZE, HORIZON_DAYS)}`}
                className={`week-horizon__dot${idx === page ? ' is-active' : ''}`}
                onClick={() => swiperRef.current?.slideTo(idx)}
              />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  )
}

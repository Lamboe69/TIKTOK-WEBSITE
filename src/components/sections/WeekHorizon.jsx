import { Link } from 'react-router-dom'
import Motion from '../Motion'
import { getBattleStatus } from '../../utils/battle'
import { getBattleAccent, getBattleImage, getNextSevenDays } from '../../utils/scheduleDisplay'
import { useSignUp } from '../SignUpContext'

export default function WeekHorizon({ schedule, kicker, title, onSelectBattle }) {
  const days = getNextSevenDays(schedule)
  const { openBattle } = useSignUp()

  const handleClick = (battle) => {
    if (onSelectBattle) {
      onSelectBattle(battle.id)
      return
    }
    if (battle) openBattle(battle)
  }

  return (
    <section className="week-horizon" aria-label="Next seven days">
      <div className="week-horizon__head sched-pad">
        <Motion delay={30}>
          <p className="sec-kicker mb-2">{kicker}</p>
          <h2 className="week-horizon__title font-display font-bold text-ivory tracking-tight">{title}</h2>
        </Motion>
      </div>

      <div className="week-horizon__deck">
        {days.map((day, idx) => {
          const battle = day.primary
          const accent = getBattleAccent(battle)
          const img = getBattleImage(battle)
          const status = battle ? getBattleStatus(battle.date, battle.time) : null
          const dayLabel = day.isToday ? 'Today' : day.isTomorrow ? 'Tomorrow' : day.label.weekdayLong

          return (
            <Motion key={day.date} delay={50 + idx * 40} className="week-horizon__slot">
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
                  {status === 'live' && (
                    <span className="week-horizon__live">
                      <span className="week-horizon__live-dot" />
                      Live
                    </span>
                  )}
                </div>

                <div className="week-horizon__body">
                  <p className="week-horizon__when">{dayLabel}</p>
                  {battle ? (
                    <>
                      <p className="week-horizon__type">{battle.type}</p>
                      <h3 className="week-horizon__name font-display">{battle.title}</h3>
                      <p className="week-horizon__time">{battle.time}</p>
                      {day.battles.length > 1 && (
                        <p className="week-horizon__more">+{day.battles.length - 1} more</p>
                      )}
                      <button type="button" className="week-horizon__cta" onClick={() => handleClick(battle)}>
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
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </article>
            </Motion>
          )
        })}
      </div>
    </section>
  )
}

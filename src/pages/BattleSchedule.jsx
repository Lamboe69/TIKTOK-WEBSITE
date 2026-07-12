import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { battleTypes, schedule } from '../data/schedule'
import { Icons } from '../components/Icons'
import { useSignUp } from '../components/SignUpContext'
import { convertTimezones, getBattleStatus, getCountdown, getBattleDate, downloadICS } from '../utils/battle'
import Motion from '../components/Motion'

const typeThumbnails = {
  'Daily Godsent': '/battles-photos/daily-godsent.jpg',
  'Most Beautiful': '/battles-photos/most-beautiful.jpg',
  'Country': '/battles-photos/country.jpg',
  'Scavengers': '/battles-photos/scavengers.jpg',
  'Champion of Champions': '/battles-photos/champion-of-champions.jpg',
}

const typeColors = {
  'Daily Godsent': 'bg-accent',
  'Most Beautiful': 'bg-gold',
  'Country': 'bg-accent',
  'Scavengers': 'bg-brand-900',
  'Champion of Champions': 'bg-gradient-to-r from-accent to-gold',
}

function NextBattleCountdown() {
  const [countdown, setCountdown] = useState(null)
  const [nextBattle, setNextBattle] = useState(null)

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const upcoming = schedule
        .map(b => ({ ...b, dateObj: getBattleDate(b.date, b.time) }))
        .filter(b => b.dateObj > now)
        .sort((a, b) => a.dateObj - b.dateObj)
      const next = upcoming[0]
      setNextBattle(next)
      setCountdown(next ? getCountdown(next.dateObj) : null)
    }
    update()
    const interval = setInterval(update, 30000)
    return () => clearInterval(interval)
  }, [])

  if (!nextBattle || !countdown) return null

  return (
    <Motion variant="fade-up">
      <div className="bg-accent/5 border border-accent/10 rounded-xl p-4 sm:p-5 mb-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-gold rounded-full animate-pulse" />
          <span className="text-xs font-semibold text-accent uppercase tracking-wider">Next Battle</span>
        </div>
        <div className="flex-1 text-center sm:text-left">
          <span className="font-display font-bold text-sm text-brand-900">{nextBattle.title}</span>
          <span className="text-xs text-brand-500 ml-2">{nextBattle.date}</span>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full">
          <span className="text-white font-bold text-sm">{countdown}</span>
        </div>
      </div>
    </Motion>
  )
}

function DateRail({ dates, activeDate, onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
      {dates.map(d => {
        const isToday = d.isToday
        const isActive = activeDate === d.dateStr
        return (
          <button
            key={d.dateStr}
            onClick={() => onSelect(d.dateStr)}
            className={`flex-shrink-0 px-4 py-2.5 rounded-lg text-center transition-all border ${
              isActive
                ? 'bg-accent text-white border-accent'
                : isToday
                  ? 'bg-gold/10 text-gold border-gold/20 font-bold'
                  : 'bg-white text-brand-900 border-brand-100 hover:border-accent/30'
            }`}
          >
            <span className="text-[10px] uppercase tracking-wider block">{d.dayShort}</span>
            <span className="text-lg font-display font-bold">{d.dayNum}</span>
            <span className="text-[10px] uppercase tracking-wider block">{d.monthShort}</span>
          </button>
        )
      })}
    </div>
  )
}

function BattleCard({ battle, onSignUp }) {
  const d = new Date(battle.date + 'T00:00:00')
  const status = getBattleStatus(battle.date, battle.time)
  const zones = convertTimezones(battle.date, battle.time)
  const thumbnail = typeThumbnails[battle.type]
  const isOfficial = battle.type === 'Daily Godsent' || battle.type === 'Champion of Champions'
  const colorClass = typeColors[battle.type] || 'bg-accent'

  return (
    <Motion variant="fade-up">
      <div id={`battle-${battle.date}`} className="bg-white rounded-xl border border-brand-100 hover:border-brand-200 transition-colors overflow-hidden scroll-mt-40">
        {/* Thumbnail */}
        <div className={`relative h-32 sm:h-40 ${colorClass}`}>
          <img
            src={thumbnail}
            alt={battle.type}
            className="w-full h-full object-cover opacity-80"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Status badge */}
          <div className="absolute top-3 left-3">
            {status === 'live' ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                LIVE NOW
              </span>
            ) : status === 'today' ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold text-white text-xs font-bold rounded-full">
                <span className="w-2 h-2 bg-white rounded-full" />
                TODAY
              </span>
            ) : (
              <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-brand-900 text-xs font-bold rounded-full">
                {d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </span>
            )}
          </div>

          {/* Type badge */}
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold rounded-lg uppercase tracking-wider">
              {battle.type}
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold text-lg text-brand-900 mb-2">{battle.title}</h3>

              {/* Multi-timezone */}
              <div className="flex flex-wrap gap-2 mb-3">
                {zones.map(({ label, flag, time }) => (
                  <span key={label} className="inline-flex items-center gap-1 px-2 py-0.5 bg-muted rounded-md text-[11px] text-brand-900">
                    <span>{flag}</span>
                    <span className="font-semibold">{time}</span>
                    <span className="text-brand-500">{label}</span>
                  </span>
                ))}
              </div>

              <p className="text-sm text-brand-500 leading-relaxed">{battle.description}</p>
            </div>

            <div className="flex flex-col gap-2 flex-shrink-0">
              <button
                onClick={() => onSignUp(isOfficial)}
                className={`px-5 py-2.5 text-xs font-semibold rounded-md text-center transition-colors ${
                  isOfficial
                    ? 'bg-accent text-white hover:bg-accent-dark'
                    : 'bg-gold text-white hover:bg-gold-dark'
                }`}
              >
                {isOfficial ? 'Sign Up — Box Battle' : 'Apply for Box Battle'}
              </button>
              <button
                onClick={() => downloadICS(battle)}
                className="px-5 py-2 text-xs font-semibold rounded-md text-center border border-brand-100 text-brand-500 hover:border-accent/30 hover:text-accent transition-colors"
              >
                <span className="flex items-center justify-center gap-1.5">
                  Remind Me
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Motion>
  )
}

export default function BattleSchedule() {
  const [activeType, setActiveType] = useState('All')
  const [activeDate, setActiveDate] = useState(null)
  const { openOfficial, openSpecial } = useSignUp()

  const filtered = useMemo(() => {
    let result = schedule
    if (activeType !== 'All') {
      result = result.filter(b => b.type === activeType)
    }
    if (activeDate) {
      result = result.filter(b => b.date === activeDate)
    }
    return result
  }, [activeType, activeDate])

  const dates = useMemo(() => {
    const seen = new Date()
    return schedule.map(b => {
      const d = new Date(b.date + 'T00:00:00')
      return {
        dateStr: b.date,
        dayShort: d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
        dayNum: d.getDate(),
        monthShort: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
        isToday: d.toDateString() === seen.toDateString(),
      }
    }).filter((d, i, arr) => arr.findIndex(x => x.dateStr === d.dateStr) === i)
  }, [])

  const handleSignUp = (isOfficial) => {
    if (isOfficial) openOfficial()
    else openSpecial()
  }

  return (
    <main>
      {/* Header */}
      <section className="py-12 sm:py-16 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Motion variant="fade-up" className="text-center mb-10">
            <span className="w-12 h-12 mx-auto mb-4 block text-gold">{Icons.clock}</span>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-brand-900 mb-3">
              Battle Schedule
            </h1>
            <p className="text-brand-500 text-sm max-w-lg mx-auto">
              Upcoming battles sorted by date. Filter by type to find your arena.
            </p>
          </Motion>

          <NextBattleCountdown />

          {/* Filter Tabs */}
          <Motion variant="fade-up" delay={100}>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {battleTypes.map(type => (
                <button
                  key={type}
                  onClick={() => { setActiveType(type); setActiveDate(null) }}
                  className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all ${
                    activeType === type
                      ? 'bg-accent text-white border-accent'
                      : 'bg-white text-brand-900 border-brand-100 hover:border-accent/30'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </Motion>

          {/* Date Rail */}
          <DateRail dates={dates} activeDate={activeDate} onSelect={(d) => setActiveDate(d === activeDate ? null : d)} />

          {/* Battle Cards */}
          <div className="space-y-5">
            {filtered.map(battle => (
              <BattleCard key={battle.id} battle={battle} onSignUp={handleSignUp} />
            ))}
          </div>

          {/* Empty State */}
          {filtered.length === 0 && (
            <Motion variant="scale-in">
              <div className="bg-white rounded-xl p-10 border border-brand-100 text-center">
                <span className="w-14 h-14 mx-auto mb-4 block text-brand-100">{Icons.clock}</span>
                <h3 className="font-display font-bold text-lg text-brand-900 mb-2">
                  No battles scheduled
                </h3>
                <p className="text-sm text-brand-500 max-w-sm mx-auto">
                  {activeType !== 'All'
                    ? `No ${activeType} battles are scheduled yet — check back soon.`
                    : 'No upcoming battles at the moment — check back soon.'}
                </p>
                {(activeType !== 'All' || activeDate) && (
                  <button
                    onClick={() => { setActiveType('All'); setActiveDate(null) }}
                    className="mt-4 px-5 py-2 text-xs font-semibold text-accent border border-accent/20 rounded-md hover:bg-accent/5 transition-colors"
                  >
                    View All Battles
                  </button>
                )}
              </div>
            </Motion>
          )}

          {/* Champion of Champions Banner */}
          <Motion variant="fade-up">
            <div className="mt-8 bg-brand-900 rounded-xl p-8 text-center text-white">
              <span className="w-12 h-12 mx-auto mb-4 block text-gold relative">{Icons.trophy}</span>
              <h2 className="font-display font-bold text-xl mb-3 relative">
                <span className="text-gold">Champion</span> of the Champions
              </h2>
              <p className="text-brand-500 text-sm max-w-lg mx-auto mb-6 leading-relaxed">
                Winners from ALL Official Godsent Box Battles compete in the grand KM DYNASTY finale. Only the best earn their spot.
              </p>
              <Link
                to="/how-to-join#step-8"
                className="relative inline-flex items-center gap-2 px-6 py-3 bg-gold text-white font-bold text-sm rounded-md hover:bg-gold-dark transition-colors"
              >
                How to Qualify
                <span className="w-4 h-4 block">{Icons.arrowRight}</span>
              </Link>
            </div>
          </Motion>
        </div>
      </section>
    </main>
  )
}

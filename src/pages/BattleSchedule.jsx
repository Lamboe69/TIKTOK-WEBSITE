import { useState, useMemo, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { battleTypes, schedule } from '../data/schedule'
import { Icons } from '../components/Icons'
import { useSignUp } from '../components/SignUpContext'
import { convertTimezones, getBattleStatus, getCountdown, getBattleDate, downloadICS } from '../utils/battle'
import Motion from '../components/Motion'

const typeImages = {
  'Daily Godsent': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80',
  'Most Beautiful': 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80',
  'Country': 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80',
  'Scavengers': 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&q=80',
  'Champion of Champions': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80',
}
const typeEmoji = { 'Daily Godsent': '⚔️', 'Most Beautiful': '✨', 'Country': '🌍', 'Scavengers': '🎯', 'Champion of Champions': '👑' }
const typeAccent = { 'Daily Godsent': '#FF6B1A', 'Most Beautiful': '#ffffff', 'Country': '#FF6B1A', 'Scavengers': '#3B1063', 'Champion of Champions': '#ffffff' }

function BattleCard({ battle, onSignUp }) {
  const status = getBattleStatus(battle.date, battle.time)
  const zones = convertTimezones(battle.date, battle.time)
  const isOfficial = battle.type === 'Daily Godsent' || battle.type === 'Champion of Champions'
  const accent = typeAccent[battle.type] || '#FF6B1A'
  const img = typeImages[battle.type] || typeImages['Daily Godsent']
  const d = new Date(battle.date + 'T00:00:00')

  return (
    <Motion variant="fade-up">
      <div className="rounded-2xl overflow-hidden border border-white/04 hover:border-white/08 transition-all" style={{ background: 'rgba(59,16,99,0.2)' }}>
        {/* Image header */}
        <div className="relative h-40 overflow-hidden">
          <img loading="lazy" src={img} alt={battle.type} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(18,6,32,0.9) 30%, rgba(18,6,32,0.3) 100%)' }} />
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: accent }} />
          <div className="absolute top-3 left-3">
            {status === 'live' ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-500 text-white text-[10px] font-bold rounded-full">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />LIVE
              </span>
            ) : status === 'today' ? (
              <span className="px-2.5 py-1 text-[10px] font-bold rounded-full text-white" style={{ background: '#FF6B1A' }}>TODAY</span>
            ) : (
              <span className="px-2.5 py-1 bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold rounded-full">
                {d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </span>
            )}
          </div>
          <div className="absolute top-3 right-3">
            <span className="text-lg">{typeEmoji[battle.type]}</span>
          </div>
          <div className="absolute bottom-3 left-3">
            <p className="font-display font-bold text-ivory text-sm">{battle.title}</p>
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          {/* Timezone strip */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-4">
            {zones.map(({ label, flag, time }) => (
              <span key={label} className="flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded-lg text-[11px]" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <span>{flag}</span>
                <span className="text-ivory font-semibold">{time}</span>
                <span className="text-white/40">{label}</span>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onSignUp(isOfficial)}
              className="flex-1 py-2 text-xs font-bold text-white rounded-lg transition-all hover:scale-105"
              style={{ background: isOfficial ? 'linear-gradient(135deg, #FF6B1A, #CC5200)' : 'rgba(232,185,74,0.8)', borderRadius: 6 }}
            >
              {isOfficial ? 'Sign Up' : 'Apply'}
            </button>
            <button
              onClick={() => downloadICS(battle)}
              className="px-3 py-2 text-xs text-white/50 rounded-lg border border-white/10 hover:border-white/08 transition-all"
              title="Add to calendar"
            >
              📅
            </button>
          </div>
        </div>
      </div>
    </Motion>
  )
}

// ─── Arena Date Rail ───────────────────────────────────────────────────────
function ArenaRail({ onSignUp }) {
  const railRef = useRef(null)
  const sorted = [...schedule].sort((a, b) => new Date(a.date) - new Date(b.date))

  return (
    <section className="py-10 overflow-hidden" style={{ background: '#120620' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-ember" style={{ background: 'rgba(255,107,26,0.1)' }}>
          Upcoming Arena
        </span>
      </div>
      {/* Rail with scroll-progress indicator */}
      <div className="relative">
        <div
          ref={railRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 sm:px-6 pb-3"
          onScroll={(e) => {
            const el = e.currentTarget
            const pct = el.scrollLeft / (el.scrollWidth - el.clientWidth)
            el.parentElement.querySelector('.arena-progress-fill').style.width = `${pct * 100}%`
          }}
        >
          {sorted.map((b) => {
            const d = new Date(b.date + 'T00:00:00')
            const status = getBattleStatus(b.date, b.time)
            const isOfficial = b.type === 'Daily Godsent' || b.type === 'Champion of Champions'
            return (
              <div
                key={b.id}
                className="flex-shrink-0 w-44 snap-start rounded-2xl p-4 flex flex-col gap-2 cursor-pointer transition-all hover:scale-[1.03]"
                style={{
                  background: status === 'live' ? 'rgba(255,107,26,0.12)' : 'rgba(59,16,99,0.22)',
                  border: `1px solid ${status === 'live' ? 'rgba(255,107,26,0.4)' : 'rgba(255,255,255,0.07)'}`,
                  borderTop: `2px solid ${typeAccent[b.type] || '#FF6B1A'}`,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                }}
                onClick={() => onSignUp(b)}
              >
                {/* Day + Date */}
                <div>
                  <p className="font-display font-bold text-3xl text-ivory leading-none tabular-nums">
                    {d.getDate().toString().padStart(2, '0')}
                  </p>
                  <p className="text-white/40 text-[11px] uppercase tracking-wider">
                    {d.toLocaleDateString('en-US', { weekday: 'short', month: 'short' })}
                  </p>
                </div>
                {/* Status badge */}
                {status === 'live' ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-500 text-white text-[9px] font-bold rounded-full w-fit">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />LIVE
                  </span>
                ) : status === 'today' ? (
                  <span className="px-2 py-0.5 text-[9px] font-bold rounded-full text-white w-fit" style={{ background: '#FF6B1A' }}>TODAY</span>
                ) : null}
                {/* Battle type */}
                <div className="mt-auto">
                  <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: typeAccent[b.type] || '#FF6B1A' }}>
                    {typeEmoji[b.type]} {b.type}
                  </p>
                  <p className="text-white/40 text-[10px] mt-0.5">{b.time}</p>
                </div>
              </div>
            )
          })}
          <div className="flex-shrink-0 w-4" />
        </div>
        {/* Scroll progress bar */}
        <div className="mx-4 sm:mx-6 mt-2 h-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div className="arena-progress-fill h-full rounded-full transition-all" style={{ width: '0%', background: 'linear-gradient(90deg, #FF6B1A, #E8B94A)' }} />
        </div>
      </div>
    </section>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function BattleSchedule() {
  const [activeType, setActiveType] = useState('All')
  const { openOfficial, openSpecial } = useSignUp()
  const [next, setNext] = useState(null)
  const [countdown, setCountdown] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const upcoming = schedule
        .map(b => ({ ...b, dateObj: getBattleDate(b.date, b.time) }))
        .filter(b => b.dateObj > now)
        .sort((a, b) => a.dateObj - b.dateObj)
      const n = upcoming[0]
      setNext(n)
      setCountdown(n ? getCountdown(n.dateObj) : '')
    }
    update()
    const id = setInterval(update, 30000)
    return () => clearInterval(id)
  }, [])

  const filtered = useMemo(() => (
    activeType === 'All' ? schedule : schedule.filter(b => b.type === activeType)
  ), [activeType])

  const handleSignUp = (isOfficial) => isOfficial ? openOfficial() : openSpecial()

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[520px] flex items-end pb-16 overflow-hidden" style={{ background: '#120620' }}>
        <img loading="lazy"
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=80"
          alt="Battle Schedule"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(18,6,32,0.95) 40%, rgba(59,16,99,0.6) 100%)' }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <Motion delay={0.1}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-5 text-ember" style={{ background: 'rgba(255,107,26,0.1)' }}>
                Upcoming Battles
              </span>
              <h1 className="font-display font-bold text-ivory mb-4 leading-tight" style={{ fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.02em' }}>
                Battle Schedule
              </h1>
              <p className="text-white/60 text-sm max-w-sm">
                Filter by type · Add to calendar · Sign up in seconds
              </p>
            </Motion>

            {/* Countdown card */}
            {next && (
              <Motion delay={0.2}>
                <div className="glass rounded-2xl p-5 border border-white/10 max-w-xs">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-ember animate-pulse" />
                    <span className="text-white/50 text-[10px] uppercase tracking-widest">Next Battle</span>
                  </div>
                  <p className="text-ivory font-display font-bold text-base mb-1">{next.title}</p>
                  <p className="text-white/40 text-xs mb-4">{next.date}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-white/40 text-xs">Starts in</span>
                    <span className="px-3 py-1 rounded-lg text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)' }}>
                      {countdown}
                    </span>
                  </div>
                </div>
              </Motion>
            )}
          </div>
        </div>
      </section>

      {/* ── Arena Date Rail ── */}
      <ArenaRail onSignUp={(b) => (b.type === 'Daily Godsent' || b.type === 'Champion of Champions' ? openOfficial() : openSpecial())} />

      {/* Filter tabs */}
      <section className="py-8" style={{ background: '#1B1024' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            <button
              onClick={() => setActiveType('All')}
              className={`flex-shrink-0 px-4 py-2 text-xs font-bold rounded-full border transition-all ${activeType === 'All' ? 'text-white border-ember' : 'text-white/50 border-white/10 hover:border-white/30 hover:text-white/80'}`}
              style={activeType === 'All' ? { background: 'rgba(255,107,26,0.15)' } : { background: 'rgba(255,255,255,0.04)' }}
            >
              All
            </button>
            {battleTypes.filter(t => t !== 'All').map(type => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-full border transition-all ${activeType === type ? 'text-white border-ember' : 'text-white/50 border-white/10 hover:border-white/30 hover:text-white/80'}`}
                style={activeType === type ? { background: 'rgba(255,107,26,0.15)' } : { background: 'rgba(255,255,255,0.04)' }}
              >
                <span>{typeEmoji[type]}</span>
                <span>{type}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Battle cards */}
      <section className="pb-16" style={{ background: '#1B1024' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(battle => (
                <BattleCard key={battle.id} battle={battle} onSignUp={handleSignUp} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-white/40 text-sm">No {activeType} battles scheduled yet.</p>
              <button onClick={() => setActiveType('All')} className="mt-4 text-ember text-sm hover:underline">View all battles</button>
            </div>
          )}
        </div>
      </section>

      {/* Champion of Champions */}
      <section className="relative min-h-[320px] flex items-center overflow-hidden">
        <img loading="lazy"
          src="https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=1400&q=80"
          alt="Champion of Champions"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(18,6,32,0.85)' }} />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
          <Motion delay={0.1}>
            <span className="text-3xl mb-4 block">👑</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ivory mb-3" style={{ letterSpacing: '-0.02em' }}>
              Champion of Champions
            </h2>
            <p className="text-white/60 text-sm max-w-md mx-auto mb-6">
              Win your battle. Earn your spot. Rise to the finale.
            </p>
            <Link
              to="/how-to-join"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white rounded-lg border border-white/30 hover:border-white transition-all"
              style={{ color: '#ffffff' }}
            >
              How to Qualify
              <span className="w-4 h-4 block">{Icons.arrowRight}</span>
            </Link>
          </Motion>
        </div>
      </section>
    </main>
  )
}

import { Link } from 'react-router-dom'
import { Icons } from '../Icons'
import Motion from '../Motion'

export default function Champions() {
  return (
    <section className="relative min-h-[520px] flex items-center overflow-hidden">
      {/* Full-bleed background */}
      <img loading="lazy"
        src="/battles-photos/champion-of-champions.jpg"
        alt="Champions stage"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(18,6,32,0.92) 50%, rgba(59,16,99,0.7) 100%)' }} />
      {/* Ember glow bottom-left */}
      <div className="absolute bottom-0 left-0 w-96 h-96 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,107,26,0.07) 0%, transparent 70%)' }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <Motion delay={0.1}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 text-ivory" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <span className="w-3.5 h-3.5 block text-ember">{Icons.trophy}</span>
              Champion of Champions
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-ivory mb-4 leading-tight">
              Only the Best<br />
              <span className="text-gradient">Survive the Finale</span>
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-md">
              Winners from all Official Godsent Box Battles compete in a final KM DYNASTY finale — fierce, fast, respectful, community-first.
            </p>
            <Link
              to="/how-to-join"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white rounded-xl border border-white/20 hover:border-ember hover:text-ember transition-all"
            >
              See the Finale Path
              <span className="w-4 h-4 block">{Icons.arrowRight}</span>
            </Link>
          </Motion>

          {/* Right: leaderboard card */}
          <Motion delay={0.2}>
            <div className="glass-premium rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-5">
                <p className="text-white/40 text-xs uppercase tracking-widest">Current Champions</p>
                <span className="w-2 h-2 rounded-full bg-ember animate-pulse" />
              </div>
              {[
                { rank: '🥇', name: 'Dynasty King', handle: '@dynastyking', score: '12,400', gold: true },
                { rank: '🥈', name: 'Crown Bearer', handle: '@crownbearer', score: '9,800', gold: false },
                { rank: '🥉', name: 'Battle Boss', handle: '@battleboss', score: '7,200', gold: false },
              ].map(({ rank, name, handle, score, gold }) => (
                <div
                  key={handle}
                  className="flex items-center gap-3 py-3 border-b border-white/04 last:border-0"
                  style={gold ? { background: 'rgba(232,185,74,0.04)', borderRadius: 8, padding: '10px 8px', marginBottom: 2 } : {}}
                >
                  <span className="text-xl w-8 text-center">{rank}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold ${gold ? 'text-crown-gold' : 'text-ivory'}`}>{name}</p>
                    <p className="text-white/40 text-xs">{handle}</p>
                  </div>
                  <p className={`text-sm font-bold tabular-nums ${gold ? 'text-crown-gold' : 'text-ember'}`}>{score}</p>
                </div>
              ))}
            </div>
          </Motion>
        </div>
      </div>
    </section>
  )
}

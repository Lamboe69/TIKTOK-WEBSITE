import { useTikTokStats, STAT_LABELS } from '../hooks/useTikTokStats'
import useAnimatedCounter from '../hooks/useAnimatedCounter'
import Motion from './Motion'
import { Icons } from './Icons'

const statIcons = [Icons.users, Icons.heart, Icons.swords, Icons.trophy]

function Counter({ value, numericEnd }) {
  const [ref, count] = useAnimatedCounter(numericEnd || 0, 2000)

  if (value === null || value === undefined) {
    return (
      <span ref={ref} className="font-display font-bold text-3xl sm:text-4xl text-dynasty-orange opacity-30">
        —
      </span>
    )
  }
  return (
    <span ref={ref} className="font-display font-bold text-3xl sm:text-4xl text-gradient-animated">
      {count > 0 ? value : '0'}
    </span>
  )
}

function LiveDot({ source }) {
  if (source !== 'live-fetch' && source !== 'manual-override') return null
  return (
    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium mt-1">
      <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-400">
        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-pulse-ring" />
      </span>
      Live
    </span>
  )
}

export default function StatBar() {
  const { stats } = useTikTokStats()

  const items = [
    { value: stats.followersFormatted, numericEnd: 50, label: STAT_LABELS.followers.label, note: STAT_LABELS.followers.note },
    { value: stats.likesFormatted, numericEnd: 100, label: STAT_LABELS.likes.label, note: STAT_LABELS.likes.note },
    { value: stats.battlesHostedFormatted, numericEnd: 100, label: STAT_LABELS.battlesHosted.label, note: STAT_LABELS.battlesHosted.note },
    { value: stats.winnersCrownedFormatted, numericEnd: 50, label: STAT_LABELS.winnersCrowned.label, note: STAT_LABELS.winnersCrowned.note },
  ]

  return (
    <section className="py-10 sm:py-12 bg-dynasty-charcoal border-b border-dynasty-purple/20 relative overflow-hidden">
      {/* Subtle animated gradient accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[300px] h-[200px] bg-dynasty-purple/10 rounded-full blur-[100px] animate-drift" style={{ animationDuration: '25s' }} />
        <div className="absolute bottom-0 right-1/4 w-[250px] h-[150px] bg-dynasty-orange/8 rounded-full blur-[80px] animate-drift" style={{ animationDuration: '18s', animationDelay: '8s' }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {items.map(({ value, numericEnd, label, note }, i) => (
            <Motion key={i} variant="fade-up" delay={i * 100}>
              <div className="flex items-center gap-3 sm:gap-4 bg-white/[0.04] backdrop-blur-sm rounded-xl px-5 py-5 border border-white/[0.08] hover:border-dynasty-orange/20 hover:bg-white/[0.08] transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-dynasty-orange/20 to-dynasty-orange/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-dynasty-orange/10 transition-all duration-300">
                  <span className="w-6 h-6 block text-dynasty-orange">{statIcons[i]}</span>
                </div>
                <div className="min-w-0">
                  <Counter value={value} numericEnd={numericEnd} />
                  <p className="text-white/80 font-medium text-xs sm:text-sm leading-tight">{label}</p>
                  <p className="text-white/30 text-[11px] leading-tight">{note}</p>
                  {i === 0 && <LiveDot source={stats.source} />}
                </div>
              </div>
            </Motion>
          ))}
        </div>
      </div>
    </section>
  )
}

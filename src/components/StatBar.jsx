import { useTikTokStats, STAT_LABELS } from '../hooks/useTikTokStats'
import Motion from './Motion'

function Counter({ value }) {
  if (value === null || value === undefined) {
    return (
      <span className="font-display font-bold text-2xl sm:text-3xl text-dynasty-orange opacity-30">
        —
      </span>
    )
  }
  return (
    <span className="font-display font-bold text-2xl sm:text-3xl text-dynasty-orange">
      {value}
    </span>
  )
}

function LiveDot({ source }) {
  if (source !== 'live-fetch' && source !== 'manual-override') return null
  return (
    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium mt-1">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
      Live
    </span>
  )
}

export default function StatBar() {
  const { stats } = useTikTokStats()

  const items = [
    { value: stats.followersFormatted, label: STAT_LABELS.followers.label, note: STAT_LABELS.followers.note },
    { value: stats.likesFormatted, label: STAT_LABELS.likes.label, note: STAT_LABELS.likes.note },
    { value: stats.battlesHostedFormatted, label: STAT_LABELS.battlesHosted.label, note: STAT_LABELS.battlesHosted.note },
    { value: stats.winnersCrownedFormatted, label: STAT_LABELS.winnersCrowned.label, note: STAT_LABELS.winnersCrowned.note },
  ]

  return (
    <section className="py-12 bg-dynasty-charcoal border-y border-dynasty-purple/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {items.map(({ value, label, note }, i) => (
            <Motion key={i} variant="fade-up" delay={i * 100}>
              <div className="text-center">
                <Counter value={value} />
                <p className="text-white font-semibold text-sm mt-1">{label}</p>
                <p className="text-white/40 text-xs mt-0.5">{note}</p>
                {i === 0 && <LiveDot source={stats.source} />}
              </div>
            </Motion>
          ))}
        </div>
      </div>
    </section>
  )
}

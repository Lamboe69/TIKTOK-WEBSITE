import { useTikTokStats, STAT_LABELS } from '../hooks/useTikTokStats'
import Motion from './Motion'
import { Icons } from './Icons'

const statIcons = [Icons.users, Icons.heart, Icons.swords, Icons.trophy]

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
    <section className="py-10 sm:py-12 bg-dynasty-charcoal border-b border-dynasty-purple/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {items.map(({ value, label, note }, i) => (
            <Motion key={i} variant="fade-up" delay={i * 100}>
              <div className="flex items-center gap-3 sm:gap-4 bg-white/[0.03] rounded-xl px-4 py-4 border border-white/5">
                <div className="w-10 h-10 rounded-lg bg-dynasty-orange/10 flex items-center justify-center flex-shrink-0">
                  <span className="w-5 h-5 block text-dynasty-orange">{statIcons[i]}</span>
                </div>
                <div className="min-w-0">
                  <Counter value={value} />
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

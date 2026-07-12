import { useTikTokStats, STAT_LABELS } from '../hooks/useTikTokStats'
import useAnimatedCounter from '../hooks/useAnimatedCounter'
import Motion from './Motion'
import { Icons } from './Icons'

const statIcons = [Icons.users, Icons.heart, Icons.swords, Icons.trophy]

function Counter({ value, numericEnd }) {
  const [ref, count] = useAnimatedCounter(numericEnd || 0, 2000)

  if (value === null || value === undefined) {
    return (
      <span ref={ref} className="font-display font-bold text-2xl sm:text-3xl text-brand-400">
        —
      </span>
    )
  }
  return (
    <span ref={ref} className="font-display font-bold text-2xl sm:text-3xl text-brand-900">
      {count > 0 ? value : '0'}
    </span>
  )
}

function LiveDot({ source }) {
  if (source !== 'live-fetch' && source !== 'manual-override') return null
  return (
    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-medium mt-1">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
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
    <section className="py-8 sm:py-10 bg-white border-b border-brand-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {items.map(({ value, numericEnd, label, note }, i) => (
            <Motion key={i} variant="fade-up" delay={i * 100}>
              <div className="flex items-center gap-3 px-4 py-4 rounded-xl border border-brand-100 hover:border-brand-200 hover:bg-brand-50 transition-all">
                <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                  <span className="w-5 h-5 block text-accent">{statIcons[i]}</span>
                </div>
                <div className="min-w-0">
                  <Counter value={value} numericEnd={numericEnd} />
                  <p className="text-brand-600 text-xs font-medium leading-tight">{label}</p>
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

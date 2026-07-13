import { useTikTokStats, STAT_LABELS } from '../hooks/useTikTokStats'
import useAnimatedCounter from '../hooks/useAnimatedCounter'
import Motion from './Motion'
import { Icons } from './Icons'

const statIcons = [Icons.users, Icons.heart, Icons.swords, Icons.trophy]

function Counter({ value, numericEnd }) {
  const [ref, count] = useAnimatedCounter(numericEnd || 0, 2000)
  const suffix = value ? value.replace(/[\d]/g, '') : ''
  return (
    <span ref={ref} className="font-display font-bold text-2xl sm:text-3xl text-ivory tabular-nums">
      {count > 0 ? `${count}${suffix}` : '0'}
    </span>
  )
}

export default function StatBar() {
  const { stats } = useTikTokStats()

  const items = [
    { value: stats.followersFormatted, numericEnd: 50, label: STAT_LABELS.followers.label },
    { value: stats.likesFormatted, numericEnd: 100, label: STAT_LABELS.likes.label },
    { value: stats.battlesHostedFormatted, numericEnd: 100, label: STAT_LABELS.battlesHosted.label },
    { value: stats.winnersCrownedFormatted, numericEnd: 50, label: STAT_LABELS.winnersCrowned.label },
  ]

  return (
    <section className="py-6 sm:py-8" style={{ background: '#1B1024' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Motion variant="fade-up">
          <div
            className="glass-premium rounded-2xl px-6 py-5"
            style={{ borderTop: '1px solid rgba(255,107,26,0.2)' }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/05">
              {items.map(({ value, numericEnd, label }, i) => (
                <div key={i} className="flex flex-col items-center gap-1 px-4 py-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-3.5 h-3.5 block text-ember opacity-70">{statIcons[i]}</span>
                    <Counter value={value} numericEnd={numericEnd} />
                  </div>
                  <p className="text-white/40 text-[11px] font-medium uppercase tracking-wider text-center">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </Motion>
      </div>
    </section>
  )
}

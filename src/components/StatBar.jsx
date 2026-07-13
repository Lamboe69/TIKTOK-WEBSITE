import { useTikTokStats, STAT_LABELS } from '../hooks/useTikTokStats'
import useAnimatedCounter from '../hooks/useAnimatedCounter'
import Motion from './Motion'
import { Icons } from './Icons'

const statIcons = [Icons.users, Icons.heart, Icons.swords, Icons.trophy]
const accents = ['#FF6B1A', '#3B1063', '#FF6B1A', '#3B1063']

function Counter({ value, numericEnd }) {
  const [ref, count] = useAnimatedCounter(numericEnd || 0, 2000)
  const suffix = value ? value.replace(/[\d]/g, '') : ''
  const display = count > 0 ? `${count}${suffix}` : '0'
  return (
    <span ref={ref} className="font-display font-bold text-2xl sm:text-3xl text-ivory">
      {display}
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
    <section className="py-8 sm:py-10" style={{ background: '#1B1024' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {items.map(({ value, numericEnd, label, note }, i) => (
            <Motion key={i} variant="fade-up" delay={i * 80}>
              <div
                className="relative rounded-xl p-5 overflow-hidden border border-white/04 hover:border-white/08 transition-all"
                style={{ background: 'rgba(59,16,99,0.2)' }}
              >
                {/* Accent top line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl" style={{ background: accents[i] }} />
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${accents[i]}20` }}
                  >
                    <span className="w-4 h-4 block" style={{ color: accents[i] }}>{statIcons[i]}</span>
                  </div>
                  <div className="min-w-0">
                    <Counter value={value} numericEnd={numericEnd} />
                    <p className="text-white/50 text-xs font-medium leading-tight mt-0.5">{label}</p>
                    {note && <p className="text-white/30 text-[10px] mt-0.5">{note}</p>}
                  </div>
                </div>
              </div>
            </Motion>
          ))}
        </div>
      </div>
    </section>
  )
}

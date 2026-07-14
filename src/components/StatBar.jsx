import { useTikTokStats, STAT_LABELS } from '../hooks/useTikTokStats'
import useAnimatedCounter from '../hooks/useAnimatedCounter'
import Motion from './Motion'

function Counter({ value, numericEnd }) {
  const [ref, count] = useAnimatedCounter(numericEnd || 0, 2200)
  const suffix = value ? value.replace(/[\d]/g, '') : ''
  const display = count > 0 ? `${count}${suffix}` : (value || '0')
  return (
    <span ref={ref} className="font-display font-extrabold text-ivory block leading-none tracking-tight"
      style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)' }}
    >
      {display}
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
    <section className="relative overflow-hidden home-band-violet home-band-sep">
      <div
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,107,26,0.18), transparent)' }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Motion variant="fade-up">
          <div className="stat-ticker">
            {items.map(({ value, numericEnd, label, note }, i) => (
              <div key={label} className="stat-cell">
                <p className="sec-kicker mb-3 opacity-80" style={{ letterSpacing: '0.2em', fontSize: 10 }}>
                  {String(i + 1).padStart(2, '0')}
                </p>
                <Counter value={value} numericEnd={numericEnd} />
                <p className="text-white/75 text-xs font-medium mt-3 tracking-wide uppercase">{label}</p>
                {note && <p className="text-white/45 text-[11px] mt-1">{note}</p>}
              </div>
            ))}
          </div>
        </Motion>
      </div>
    </section>
  )
}

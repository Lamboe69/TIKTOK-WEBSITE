import { Link } from 'react-router-dom'
import { Icons } from '../Icons'
import Motion from '../Motion'

const weeks = [
  { n: '01', label: 'Monetisation' },
  { n: '02', label: 'Community' },
  { n: '03', label: 'Live Systems' },
  { n: '04', label: 'Mindset' },
  { n: '05', label: 'Inner Circle' },
]

export default function MasterclassTeaser() {
  return (
    <section className="relative overflow-hidden home-band-midnight home-band-sep">
      {/* Atmospheric mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 100% 50%, rgba(255,107,26,0.28), transparent 55%), radial-gradient(ellipse 40% 50% at 0% 100%, rgba(90,40,160,0.55), transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* Giant wordmark composition */}
          <Motion delay={60} className="lg:col-span-5 relative">
            <p className="sec-kicker mb-5">Masterclass · With King Maker</p>
            <h2 className="font-display font-extrabold leading-[0.82] tracking-[-0.04em]">
              <span
                className="block text-ivory"
                style={{ fontSize: 'clamp(3.5rem, 10vw, 6.5rem)' }}
              >
                Master
              </span>
              <span
                className="block relative"
                style={{ fontSize: 'clamp(3.5rem, 10vw, 6.5rem)' }}
              >
                <span className="text-gradient">your</span>
                <span
                  className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 translate-x-full hidden xl:block font-body text-[10px] tracking-[0.35em] uppercase text-white/50 whitespace-nowrap ml-4"
                >
                  5 weeks
                </span>
              </span>
              <span
                className="block italic"
                style={{
                  fontSize: 'clamp(3.5rem, 10vw, 6.5rem)',
                  WebkitTextStroke: '1.5px rgba(255,107,26,0.7)',
                  color: 'transparent',
                }}
              >
                craft
              </span>
            </h2>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm mt-6 mb-8">
              The exact systems, livestream strategy, and dynasty mindset — taught live by the source.
            </p>
            <Link to="/masterclass" className="sec-cta">
              Enter the Masterclass
              <span className="w-4 h-4 block">{Icons.arrowRight}</span>
            </Link>
          </Motion>

          {/* Angled portrait + price stamp */}
          <Motion delay={120} className="lg:col-span-4 relative">
            <div className="relative mx-auto max-w-xs lg:max-w-none">
              <div
                className="relative aspect-[3/4] overflow-hidden"
                style={{
                  clipPath: 'polygon(8% 0, 100% 0, 92% 100%, 0 100%)',
                }}
              >
                <img
                  src="/team/maker.jpg"
                  alt="King Maker"
                  className="absolute inset-0 w-full h-full object-cover object-top scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(10,4,20,0.75) 0%, transparent 40%)',
                  }}
                />
                <div className="absolute bottom-5 left-6 right-4">
                  <p className="font-display font-bold text-ivory text-lg leading-none">King Maker</p>
                  <p className="text-white/65 text-[10px] tracking-[0.2em] uppercase mt-1.5">
                    Live instructor · Dallas
                  </p>
                </div>
              </div>

              {/* Price stamp — not a card, just stamped type */}
              <div
                className="absolute -bottom-3 -right-2 sm:-right-4 px-4 py-3"
                style={{
                  background: '#FF6B1A',
                  clipPath: 'polygon(0 0, 100% 0, 100% 78%, 88% 100%, 0 100%)',
                }}
              >
                <p className="font-body text-[9px] uppercase tracking-[0.25em] text-white/80 leading-none mb-1">
                  From
                </p>
                <p className="font-display font-extrabold text-white text-3xl leading-none">$500</p>
              </div>
            </div>
          </Motion>

          {/* Curriculum spine */}
          <Motion delay={180} className="lg:col-span-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-5 lg:mb-6">
              Curriculum
            </p>
            <ol className="space-y-0 border-l border-ember/40 ml-2">
              {weeks.map(({ n, label }, i) => (
                <li
                  key={n}
                  className="relative pl-5 py-3 group"
                >
                  <span
                    className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2"
                    style={{ background: i === 0 ? '#FF6B1A' : 'rgba(255,107,26,0.35)' }}
                  />
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-ember/50 text-xs tabular-nums">{n}</span>
                    <span className="text-ivory/80 text-sm font-medium group-hover:text-ivory transition-colors">
                      {label}
                    </span>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 pt-5 border-t border-white/[0.07]">
              <p className="text-white/55 text-[10px] uppercase tracking-[0.25em] mb-1">Live sessions</p>
              <p className="font-display text-ivory text-sm">Saturdays · 2:00 PM CT</p>
            </div>
          </Motion>
        </div>
      </div>

      {/* Bottom rule with tick marks */}
      <div className="relative h-px max-w-7xl mx-auto" style={{ background: 'rgba(255,138,61,0.35)' }}>
        {[0, 25, 50, 75, 100].map((p) => (
          <span
            key={p}
            className="absolute top-0 w-px h-2 -translate-y-0 bg-ember/70"
            style={{ left: `${p}%` }}
            aria-hidden
          />
        ))}
      </div>
    </section>
  )
}

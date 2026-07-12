import { Link } from 'react-router-dom'
import { Icons } from '../Icons'
import Motion from '../Motion'

const plans = [
  {
    title: '1-on-1 Consultation',
    price: '$300',
    duration: '1 Hour · Private',
    icon: Icons.zap,
    highlight: false,
  },
  {
    title: 'Dynasty Masterclass',
    price: '$500',
    duration: '5 Weeks Program',
    icon: Icons.star,
    highlight: true,
    badge: 'Popular',
  },
  {
    title: 'Mentorship',
    price: '$1,200',
    duration: '5 Weeks + Ongoing',
    icon: Icons.crown,
    highlight: false,
    badge: 'Premium',
  },
]

export default function MasterclassTeaser() {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: 560 }}>
      <img
        src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1400&q=80"
        alt="Masterclass"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(18,6,32,0.97) 40%, rgba(59,16,99,0.85) 100%)' }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left */}
          <Motion delay={0.1}>
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-5"
              style={{ background: 'rgba(232,185,74,0.12)', color: '#E8B94A', border: '1px solid rgba(232,185,74,0.2)' }}
            >
              <span className="w-3.5 h-3.5 block" style={{ color: '#E8B94A' }}>{Icons.star}</span>
              Masterclass
            </span>
            <h2
              className="font-display font-bold text-ivory mb-5 leading-tight"
              style={{ fontSize: 'clamp(32px, 4vw, 56px)', letterSpacing: '-0.02em' }}
            >
              Master Your<br />
              <span className="text-gradient">Craft</span>
            </h2>
            <p className="text-white/55 text-sm leading-relaxed mb-8 max-w-md">
              Learn directly from King Maker — the strategies, the systems, the mindset that built KM DYNASTY.
            </p>
            <Link
              to="/masterclass"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white transition-all hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, backdropFilter: 'blur(8px)' }}
            >
              Explore Full Masterclass
              <span className="w-4 h-4 block">{Icons.arrowRight}</span>
            </Link>
          </Motion>

          {/* Right: pricing cards */}
          <div className="grid grid-cols-3 gap-3">
            {plans.map(({ title, price, duration, icon, highlight, badge }, i) => (
              <Motion key={title} delay={0.2 + i * 0.1}>
                <div
                  className="relative rounded-2xl p-4 flex flex-col items-center text-center transition-all hover:scale-[1.03]"
                  style={{
                    background: highlight ? 'rgba(255,107,26,0.12)' : 'rgba(59,16,99,0.35)',
                    border: `1px solid ${highlight ? 'rgba(255,107,26,0.35)' : badge === 'Premium' ? 'rgba(232,185,74,0.25)' : 'rgba(255,255,255,0.07)'}`,
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  {badge && (
                    <span
                      className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[9px] font-bold text-white whitespace-nowrap"
                      style={{ background: highlight ? '#FF6B1A' : '#E8B94A' }}
                    >
                      {badge}
                    </span>
                  )}
                  <span className="w-5 h-5 block text-ember mb-3 mt-1">{icon}</span>
                  <h3 className="font-display font-bold text-ivory text-xs mb-2 leading-snug">{title}</h3>
                  <p
                    className="font-display font-bold text-2xl mb-1"
                    style={{ color: highlight ? '#FF6B1A' : badge === 'Premium' ? '#E8B94A' : '#FFF7F0' }}
                  >
                    {price}
                  </p>
                  <p className="text-white/40 text-[10px] mb-4 leading-relaxed">{duration}</p>
                  <Link
                    to="/masterclass"
                    className="mt-auto px-3 py-1.5 text-[10px] font-bold text-white rounded-lg w-full text-center transition-all hover:opacity-90"
                    style={{ background: highlight ? 'linear-gradient(135deg, #FF6B1A, #CC5200)' : 'rgba(255,255,255,0.08)' }}
                  >
                    Start
                  </Link>
                </div>
              </Motion>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

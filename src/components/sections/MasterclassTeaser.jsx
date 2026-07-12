import { Link } from 'react-router-dom'
import { Icons } from '../Icons'
import Motion from '../Motion'

const plans = [
  { title: 'Starter', price: 'Free', desc: 'Get the basics. Start your journey.', icon: Icons.zap },
  { title: 'Pro', price: '$29', desc: 'Advanced strategies. Weekly coaching.', icon: Icons.star, highlight: true },
  { title: 'Elite', price: '$99', desc: '1-on-1 mentorship. Full access.', icon: Icons.crown },
]

export default function MasterclassTeaser() {
  return (
    <section className="relative min-h-[560px] flex items-center overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1400&q=80"
        alt="Masterclass"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(18,6,32,0.95) 40%, rgba(59,16,99,0.8) 100%)' }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <Motion delay={0.1}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 text-crown-gold" style={{ background: 'rgba(232,185,74,0.1)' }}>
              <span className="w-3.5 h-3.5 block text-crown-gold">{Icons.star}</span>
              Masterclass
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-ivory mb-4 leading-tight">
              Master Your<br />
              <span className="text-gradient">Craft</span>
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-md">
              Learn directly from King Maker — the strategies, the systems, the mindset that built a dynasty.
            </p>
            <Link
              to="/masterclass"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white rounded-xl border border-white/20 hover:border-ember hover:text-ember transition-all"
            >
              Explore Masterclass
              <span className="w-4 h-4 block">{Icons.arrowRight}</span>
            </Link>
          </Motion>

          {/* Right: pricing cards */}
          <div className="grid grid-cols-3 gap-3">
            {plans.map(({ title, price, desc, icon, highlight }, i) => (
              <Motion key={title} delay={0.2 + i * 0.1}>
                <div
                  className="rounded-2xl p-4 flex flex-col items-center text-center border transition-all hover:scale-105"
                  style={{
                    background: highlight ? 'rgba(255,107,26,0.15)' : 'rgba(59,16,99,0.3)',
                    borderColor: highlight ? 'rgba(255,107,26,0.4)' : 'rgba(255,255,255,0.08)',
                  }}
                >
                  {highlight && (
                    <span className="text-[10px] font-bold text-ember uppercase tracking-wider mb-2">Popular</span>
                  )}
                  <span className="w-6 h-6 block text-ember mb-2">{icon}</span>
                  <h3 className="font-display font-bold text-ivory text-sm mb-1">{title}</h3>
                  <p className="font-display font-bold text-2xl text-ivory mb-1">{price}</p>
                  <p className="text-white/50 text-xs mb-4 leading-relaxed">{desc}</p>
                  <Link
                    to="/masterclass"
                    className="mt-auto px-3 py-1.5 text-xs font-bold text-white rounded-lg w-full text-center"
                    style={{ background: highlight ? 'linear-gradient(135deg, #FF6B1A, #CC5200)' : 'rgba(255,255,255,0.1)' }}
                  >
                    Get Started
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

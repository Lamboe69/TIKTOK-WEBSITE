import { Link } from 'react-router-dom'
import Motion from '../components/Motion'
import { tiers, schedule, terms } from '../data/masterclass'
import { Icons } from '../components/Icons'

const tierImages = [
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
]
const tierAccents = ['#3B1063', '#FF6B1A', '#ffffff']

export default function Masterclass() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[520px] flex items-end pb-16 overflow-hidden" style={{ background: '#120620' }}>
        <img
          src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1400&q=80"
          alt="Masterclass"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(18,6,32,0.95) 40%, rgba(59,16,99,0.6) 100%)' }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <Motion delay={0.1}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-5 text-ivory" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <span className="w-3.5 h-3.5 block text-ember">{Icons.star}</span>
                Elite Education
              </span>
              <h1 className="font-display font-bold text-ivory mb-4 leading-tight" style={{ fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.02em' }}>
                KM Dynasty<br />
                <span className="text-gradient">Masterclass</span>
              </h1>
              <p className="text-white/60 text-sm max-w-sm leading-relaxed">
                Learn directly from King Maker. Choose the programme that fits your ambition.
              </p>
            </Motion>

            {/* Schedule card */}
            <Motion delay={0.2}>
              <div className="glass rounded-2xl p-5 border border-white/10 max-w-xs">
                <p className="text-white/40 text-[10px] uppercase tracking-widest mb-4">Programme Details</p>
                {[
                  { icon: Icons.clock, label: 'Schedule', value: schedule.day },
                  { icon: Icons.clock, label: 'Time', value: schedule.time },
                  { icon: Icons.film, label: 'Format', value: 'Live Zoom · 1hr sessions' },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3 py-2.5 border-b border-white/06 last:border-0">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,107,26,0.15)' }}>
                      <span className="w-3.5 h-3.5 block text-ember">{icon}</span>
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px] uppercase tracking-wider">{label}</p>
                      <p className="text-ivory text-xs font-semibold">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Motion>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 sm:py-24" style={{ background: '#1B1024' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier, i) => (
              <Motion key={tier.name} delay={0.1 + i * 0.1}>
                <div
                  className="rounded-2xl overflow-hidden border transition-all hover:scale-[1.02]"
                  style={{
                    borderColor: tier.badge === 'Popular' ? 'rgba(255,107,26,0.5)' : tier.badge === 'Premium' ? 'rgba(232,185,74,0.5)' : 'rgba(255,255,255,0.08)',
                    background: '#120620',
                  }}
                >
                  {/* Image header */}
                  <div className="relative h-44 overflow-hidden">
                    <img src={tierImages[i]} alt={tier.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(18,6,32,0.95) 30%, rgba(18,6,32,0.3) 100%)' }} />
                    <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: tierAccents[i] }} />
                    {tier.badge && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold text-white" style={{ background: tierAccents[i] }}>
                        {tier.badge}
                      </div>
                    )}
                    <div className="absolute bottom-3 left-4">
                      <p className="font-display font-bold text-ivory text-base">{tier.name}</p>
                      <p className="text-white/50 text-xs">{tier.duration}</p>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="font-display font-bold text-3xl text-ivory">{tier.price}</span>
                      {tier.originalPrice && <span className="text-white/30 text-sm line-through">{tier.originalPrice}</span>}
                    </div>
                    <ul className="space-y-2 mb-6">
                      {tier.features.map(f => (
                        <li key={f} className="flex items-start gap-2 text-xs text-white/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-ember mt-1 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/contact"
                      className="block text-center py-2.5 text-sm font-bold text-white rounded-lg transition-all hover:scale-105"
                      style={{ background: tier.badge === 'Popular' ? 'linear-gradient(135deg, #FF6B1A, #CC5200)' : tier.badge === 'Premium' ? 'rgba(232,185,74,0.8)' : 'rgba(59,16,99,0.6)', borderRadius: 6 }}
                    >
                      {tier.cta}
                    </Link>
                  </div>
                </div>
              </Motion>
            ))}
          </div>
        </div>
      </section>

      {/* Terms */}
      <section className="relative min-h-[360px] flex items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1400&q=80"
          alt="Terms"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(18,6,32,0.9)' }} />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Motion delay={0.1}>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-ivory mb-3" style={{ letterSpacing: '-0.02em' }}>
                Terms & Conditions
              </h2>
              <p className="text-white/50 text-sm">Please read before enrolling.</p>
            </Motion>
            <Motion delay={0.2}>
              <ul className="space-y-3">
                {terms.map((t, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-ember mt-1.5 flex-shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </Motion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative min-h-[280px] flex items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1400&q=80"
          alt="Start your transformation"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(59,16,99,0.85)' }} />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
          <Motion delay={0.1}>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ivory mb-4" style={{ letterSpacing: '-0.02em' }}>
              Start Your Transformation
            </h2>
            <p className="text-white/60 text-sm mb-6">Have questions? Contact us and we'll help you choose the right programme.</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white rounded-lg transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)', borderRadius: 6 }}
            >
              <span className="w-4 h-4 block">{Icons.mail}</span>
              Contact Us
            </Link>
          </Motion>
        </div>
      </section>
    </main>
  )
}

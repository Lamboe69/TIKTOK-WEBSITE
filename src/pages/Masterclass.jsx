import { Link } from 'react-router-dom'
import Motion from '../components/Motion'
import { tiers, schedule, terms } from '../data/masterclass'
import { Icons } from '../components/Icons'

export default function Masterclass() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-dynasty-charcoal py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <Motion delay={0.1}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 text-dynasty-orange text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-4 h-4 block">{Icons.star}</span>
              Elite Education
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              KM Dynasty<br />
              <span className="text-dynasty-orange">Masterclass</span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto text-lg">
              Learn directly from King Maker. Choose the programme that fits your ambition and start your TikTok transformation today.
            </p>
          </Motion>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier, idx) => (
              <Motion key={tier.name} delay={0.1 + idx * 0.1}>
                <div className={`rounded-2xl border p-6 h-full flex flex-col transition-all duration-300 hover:shadow-lg ${
                  tier.badge === 'Popular'
                    ? 'border-dynasty-orange bg-dynasty-orange/[0.03] relative'
                    : tier.badge === 'Premium'
                    ? 'border-dynasty-purple bg-dynasty-purple/[0.03]'
                    : 'border-gray-100 bg-gray-50/50'
                }`}>
                  {tier.badge && (
                    <div className={`absolute -top-3 left-6 px-3 py-1 rounded-full text-xs font-bold text-white ${
                      tier.badge === 'Popular' ? 'bg-dynasty-orange' : 'bg-dynasty-purple'
                    }`}>
                      {tier.badge}
                    </div>
                  )}

                  <div className="mb-5">
                    <h3 className="font-display text-xl font-bold text-dynasty-charcoal mb-1">
                      {tier.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{tier.duration}</p>
                  </div>

                  <div className="mb-6">
                    <span className="text-3xl font-bold text-dynasty-charcoal">{tier.price}</span>
                    {tier.originalPrice && (
                      <span className="text-gray-400 text-sm line-through ml-2">{tier.originalPrice}</span>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-dynasty-orange mt-1.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className={`block text-center px-5 py-3 text-sm font-semibold rounded-xl transition-colors ${
                      tier.badge === 'Popular'
                        ? 'bg-dynasty-orange text-white hover:bg-dynasty-orange/90'
                        : tier.badge === 'Premium'
                        ? 'bg-dynasty-purple text-white hover:bg-dynasty-purple/90'
                        : 'bg-dynasty-charcoal text-white hover:bg-dynasty-charcoal/90'
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </Motion>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule & Terms */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Schedule */}
            <Motion delay={0.1}>
              <div className="rounded-2xl border border-gray-100 bg-white p-6">
                <h3 className="font-display text-lg font-bold text-dynasty-charcoal mb-4">
                  Programme Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-8 h-8 rounded-lg bg-dynasty-purple/10 flex items-center justify-center flex-shrink-0">
                      <span className="w-4 h-4 block text-dynasty-purple">{Icons.clock}</span>
                    </span>
                    <div>
                      <p className="text-gray-400 text-xs">Schedule</p>
                      <p className="text-dynasty-charcoal font-medium">{schedule.day}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-8 h-8 rounded-lg bg-dynasty-purple/10 flex items-center justify-center flex-shrink-0">
                      <span className="w-4 h-4 block text-dynasty-purple">{Icons.clock}</span>
                    </span>
                    <div>
                      <p className="text-gray-400 text-xs">Time</p>
                      <p className="text-dynasty-charcoal font-medium">{schedule.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="w-8 h-8 rounded-lg bg-dynasty-purple/10 flex items-center justify-center flex-shrink-0">
                      <span className="w-4 h-4 block text-dynasty-purple">{Icons.film}</span>
                    </span>
                    <div>
                      <p className="text-gray-400 text-xs">Format</p>
                      <p className="text-dynasty-charcoal font-medium">{schedule.format}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Motion>

            {/* Terms */}
            <Motion delay={0.2}>
              <div className="rounded-2xl border border-gray-100 bg-white p-6">
                <h3 className="font-display text-lg font-bold text-dynasty-charcoal mb-4">
                  Terms & Conditions
                </h3>
                <ul className="space-y-3">
                  {terms.map((t, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-dynasty-orange mt-1.5 flex-shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Motion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Motion delay={0.1}>
            <h2 className="font-display text-3xl font-bold text-dynasty-charcoal mb-4">
              Start Your Transformation
            </h2>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto">
              Have questions? Contact us and we'll help you choose the right programme.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-dynasty-orange text-white font-semibold rounded-xl hover:bg-dynasty-orange/90 transition-colors"
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

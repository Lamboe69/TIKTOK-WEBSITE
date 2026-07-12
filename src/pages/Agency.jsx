import { Link } from 'react-router-dom'
import Motion from '../components/Motion'
import regions from '../data/agencyRegions'
import { Icons } from '../components/Icons'

export default function Agency() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-dynasty-charcoal py-10 sm:py-14 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-dynasty-purple/15 rounded-full blur-[120px] animate-drift" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-dynasty-orange/10 rounded-full blur-[80px] animate-drift" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <Motion delay={0.1}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 text-dynasty-orange text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-4 h-4 block animate-float">{Icons.users}</span>
              Official Partnerships
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              Join the KM Dynasty<br />
              <span className="text-dynasty-orange text-gradient-animated">Agency</span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto text-lg">
              Select your region and apply to be part of King Maker's official TikTok agency. Grow your live presence as part of the KM Dynasty family.
            </p>
          </Motion>
        </div>
      </section>

      {/* Regions */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {regions.map((region, idx) => (
              <Motion key={region.name} delay={0.1 + idx * 0.1}>
                <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-6 h-full flex flex-col hover:shadow-lg hover:border-dynasty-purple/20 transition-all duration-300">
                  <div className="text-4xl mb-4">{region.flag}</div>
                  <h2 className="font-display text-xl font-bold text-dynasty-charcoal mb-1">
                    {region.name}
                  </h2>
                  <p className="text-dynasty-purple text-sm font-medium mb-3">
                    {region.tagline}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">
                    {region.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {region.benefits.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-dynasty-orange flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="block text-center px-5 py-3 bg-dynasty-purple text-white text-sm font-semibold rounded-xl hover:bg-dynasty-purple/90 transition-colors animate-glow-breathe"
                  >
                    Apply Now
                  </Link>
                </div>
              </Motion>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Motion delay={0.1}>
            <div className="text-center mb-8">
              <h2 className="font-display text-3xl font-bold text-dynasty-charcoal mb-3">
                Why Join the Agency?
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Being part of the KM Dynasty agency gives you access to exclusive opportunities and direct support from King Maker.
              </p>
            </div>
          </Motion>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Icons.trophy, title: 'Box Battle Access', description: 'Priority placement in official and special box battles.' },
              { icon: Icons.users, title: 'Community', description: 'Direct access to the KM Dynasty inner circle and group.' },
              { icon: Icons.star, title: 'Masterclass', description: 'Exclusive access to training and mentorship programs.' },
              { icon: Icons.trendingUp, title: 'Growth Support', description: 'Personalised strategy and performance analysis from King Maker.' },
            ].map((item, idx) => (
              <Motion key={item.title} delay={0.15 + idx * 0.08}>
                <div className="rounded-2xl border border-gray-100 bg-white p-5 text-center">
                  <div className="w-12 h-12 rounded-xl bg-dynasty-purple/10 flex items-center justify-center mx-auto mb-3">
                    <span className="w-6 h-6 block text-dynasty-purple">{item.icon}</span>
                  </div>
                  <h3 className="font-display font-bold text-dynasty-charcoal text-sm mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </div>
              </Motion>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Motion delay={0.1}>
            <h2 className="font-display text-3xl font-bold text-dynasty-charcoal mb-4">
              Ready to Represent?
            </h2>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto">
              Apply through our contact page and tell us about yourself, your content, and your region.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-dynasty-orange text-white font-semibold rounded-xl hover:bg-dynasty-orange/90 transition-colors animate-glow-breathe"
            >
              Apply for Agency
            </Link>
          </Motion>
        </div>
      </section>
    </main>
  )
}

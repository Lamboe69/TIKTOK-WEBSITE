import { Link } from 'react-router-dom'
import Motion from '../components/Motion'
import regions from '../data/agencyRegions'
import { Icons } from '../components/Icons'

const regionImages = [
  'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=600&q=80',
  'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80',
  'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80',
]

const benefits = [
  { icon: Icons.trophy, title: 'Box Battle Access', desc: 'Priority placement in official and special box battles.' },
  { icon: Icons.users, title: 'Community', desc: 'Direct access to the KM Dynasty inner circle.' },
  { icon: Icons.star, title: 'Masterclass', desc: 'Exclusive training and mentorship programs.' },
  { icon: Icons.trendingUp, title: 'Growth Support', desc: 'Personalised strategy from King Maker.' },
]

export default function Agency() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[520px] flex items-end pb-16 overflow-hidden" style={{ background: '#120620' }}>
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&q=80"
          alt="Agency"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(18,6,32,0.95) 40%, rgba(59,16,99,0.6) 100%)' }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <Motion delay={0.1}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-5 text-ember" style={{ background: 'rgba(255,107,26,0.1)' }}>
                <span className="w-3.5 h-3.5 block">{Icons.users}</span>
                Official Partnerships
              </span>
              <h1 className="font-display font-bold text-ivory mb-4 leading-tight" style={{ fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.02em' }}>
                Join the KM Dynasty<br />
                <span className="text-gradient">Agency</span>
              </h1>
              <p className="text-white/60 text-sm max-w-sm leading-relaxed">
                Select your region and apply to be part of King Maker's official TikTok agency.
              </p>
            </Motion>

            {/* Benefits card */}
            <Motion delay={0.2}>
              <div className="glass rounded-2xl p-5 border border-white/10 max-w-xs">
                <p className="text-white/40 text-[10px] uppercase tracking-widest mb-4">What you get</p>
                <div className="grid grid-cols-2 gap-3">
                  {benefits.map(({ icon, title }) => (
                    <div key={title} className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,107,26,0.15)' }}>
                        <span className="w-3.5 h-3.5 block text-ember">{icon}</span>
                      </div>
                      <span className="text-ivory text-xs font-medium">{title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Motion>
          </div>
        </div>
      </section>

      {/* Regions */}
      <section className="py-16 sm:py-24" style={{ background: '#1B1024' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Motion delay={0.1} className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ivory mb-3" style={{ letterSpacing: '-0.02em' }}>
              Select Your <span className="text-gradient">Region</span>
            </h2>
          </Motion>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {regions.map((region, i) => (
              <Motion key={region.name} delay={0.1 + i * 0.1}>
                <div className="group rounded-2xl overflow-hidden border border-white/04 hover:border-ember/30 transition-all" style={{ background: '#120620' }}>
                  {/* Image header */}
                  <div className="relative h-52 overflow-hidden">
                    <img src={regionImages[i]} alt={region.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(18,6,32,0.95) 40%, rgba(18,6,32,0.3) 100%)' }} />
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-ember scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    <div className="absolute bottom-4 left-4">
                      <span className="text-3xl mb-2 block">{region.flag}</span>
                      <p className="font-display font-bold text-ivory text-lg">{region.name}</p>
                      <p className="text-ember text-xs font-medium">{region.tagline}</p>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <ul className="space-y-2 mb-5">
                      {region.benefits.map(b => (
                        <li key={b} className="flex items-center gap-2 text-xs text-white/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-ember flex-shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/contact"
                      className="block text-center py-2.5 text-sm font-bold text-white rounded-lg transition-all hover:scale-105"
                      style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)', borderRadius: 6 }}
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              </Motion>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="relative min-h-[400px] flex items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1400&q=80"
          alt="Why join"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(18,6,32,0.88)' }} />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <Motion delay={0.1} className="text-center mb-10">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ivory mb-3" style={{ letterSpacing: '-0.02em' }}>
              Why Join the Agency?
            </h2>
          </Motion>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map(({ icon, title, desc }, i) => (
              <Motion key={title} delay={0.1 + i * 0.08}>
                <div className="glass rounded-xl p-5 border border-white/04 text-center hover:border-ember/20 transition-all">
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ background: 'rgba(255,107,26,0.15)' }}>
                    <span className="w-5 h-5 block text-ember">{icon}</span>
                  </div>
                  <h3 className="font-display font-bold text-ivory text-sm mb-1">{title}</h3>
                  <p className="text-white/50 text-xs leading-relaxed">{desc}</p>
                </div>
              </Motion>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative min-h-[280px] flex items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&q=80"
          alt="Apply"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(59,16,99,0.85)' }} />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
          <Motion delay={0.1}>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ivory mb-4" style={{ letterSpacing: '-0.02em' }}>
              Ready to Represent?
            </h2>
            <p className="text-white/60 text-sm mb-6 max-w-md mx-auto">
              Apply through our contact page and tell us about yourself, your content, and your region.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white rounded-lg transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)', borderRadius: 6 }}
            >
              Apply for Agency
              <span className="w-4 h-4 block">{Icons.arrowRight}</span>
            </Link>
          </Motion>
        </div>
      </section>
    </main>
  )
}

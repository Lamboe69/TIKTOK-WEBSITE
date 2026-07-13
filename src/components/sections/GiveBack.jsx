import { useState } from 'react'
import { Icons } from '../Icons'
import Motion from '../Motion'

const charityWork = [
  { icon: Icons.gift, title: 'Community Giveaways', description: 'Regular prize drops and surprise rewards for loyal community members.' },
  { icon: Icons.heart, title: 'Creator Support', description: 'Direct support for new creators who need a hand getting started.' },
  { icon: Icons.users, title: 'Charity Drives', description: 'Community-powered fundraising for causes that matter to our family.' },
]

export default function GiveBack() {
  const [form, setForm] = useState({ name: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent('KM DYNASTY — Request Support')
    const body = encodeURIComponent(`Name: ${form.name}\n\n${form.message}`)
    window.location.href = `mailto:lagwatinc@gmail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
    setForm({ name: '', message: '' })
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden" style={{ background: '#120620' }}>
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(59,16,99,0.4) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <Motion delay={0.05} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 text-ember" style={{ background: 'rgba(255,107,26,0.1)' }}>
            <span className="w-3.5 h-3.5 block">{Icons.heart}</span>
            Giving Back
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ivory mb-3" style={{ letterSpacing: '-0.02em' }}>
            We Give Back to the <span className="text-gradient">Community</span>
          </h2>
          <p className="text-white/50 text-sm leading-relaxed max-w-lg mx-auto">
            KM DYNASTY isn't just about battles — it's about lifting people up.
          </p>
        </Motion>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {charityWork.map(({ icon, title, description }, i) => (
            <Motion key={i} delay={0.1 + i * 0.08}>
              <div
                className="rounded-2xl p-6 text-center border border-white/04 hover:border-white/08 transition-all"
                style={{ background: 'rgba(59,16,99,0.2)' }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(255,107,26,0.12)' }}>
                  <span className="w-5 h-5 block text-ember">{icon}</span>
                </div>
                <h3 className="font-display font-bold text-ivory text-sm mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{description}</p>
              </div>
            </Motion>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* GoFundMe */}
          <Motion delay={0.25}>
            <div className="rounded-2xl p-6 border border-white/04 flex flex-col justify-between" style={{ background: 'rgba(59,16,99,0.35)', backdropFilter: 'blur(16px)' }}>
              <div>
                <h3 className="font-display font-bold text-xl text-ivory mb-2">Support Our Mission</h3>
                <p className="text-white/50 text-sm mb-6">Help us expand the Dynasty and support more creators around the world.</p>
              </div>
              <a
                href="https://gofundme.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white rounded-xl transition-all hover:scale-105 self-start"
                style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)' }}
              >
                <span className="w-4 h-4 block">{Icons.heart}</span>
                Donate on GoFundMe
              </a>
            </div>
          </Motion>

          {/* Request Support Form */}
          <Motion delay={0.3}>
            <div className="rounded-2xl p-6 border border-white/04" style={{ background: 'rgba(59,16,99,0.2)' }}>
              <h3 className="font-display font-bold text-lg text-ivory mb-4">Request Support</h3>
              {submitted ? (
                <div className="flex items-center gap-3 py-4">
                  <span className="w-5 h-5 block text-ember">{Icons.check}</span>
                  <p className="text-ember text-sm font-medium">Email opened — thank you!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 text-sm text-ivory placeholder-white/25 rounded-lg focus:outline-none focus:ring-2 focus:ring-ember/40"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                  <textarea
                    placeholder="Tell us how we can help..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-4 py-2.5 text-sm text-ivory placeholder-white/25 rounded-lg focus:outline-none focus:ring-2 focus:ring-ember/40 resize-none"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                  <button
                    type="submit"
                    className="w-full py-3 text-white text-sm font-bold rounded-xl transition-all hover:scale-[1.02]"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    Send Request
                  </button>
                </form>
              )}
            </div>
          </Motion>
        </div>
      </div>
    </section>
  )
}

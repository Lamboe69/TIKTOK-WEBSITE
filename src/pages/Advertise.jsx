import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Icons } from '../components/Icons'
import Motion from '../components/Motion'
import { useTikTokStats } from '../hooks/useTikTokStats'

const packages = [
  {
    name: 'Livestream Shout-Out',
    availability: 'available',
    features: ['On-screen brand mention during live battle', 'Tagged in stream description', 'Shared to King Maker\'s TikTok story'],
    accent: '#6B3FA0',
  },
  {
    name: 'Homepage Banner',
    availability: 'limited',
    availabilityNote: '1 slot at a time',
    features: ['Rotating banner on kmDynasty.com homepage', 'Visible to every site visitor', 'Link to your site or campaign page'],
    accent: '#ffffff',
  },
  {
    name: 'Sponsored Content',
    availability: 'available',
    features: ['Dedicated TikTok post or shout-out', 'Mentioned in box battle description', 'Brand tag in video overlay'],
    accent: '#FF6B1A',
  },
  {
    name: 'Custom / Bundle',
    availability: 'available',
    features: ['Mix & match any placement above', 'Tailored to your campaign goals', 'Contact for a custom quote'],
    accent: '#ffffff',
  },
]

const availabilityConfig = {
  available: { label: 'Available', dot: '#34d399', text: '#34d399', bg: 'rgba(52,211,153,0.1)' },
  limited: { label: '1 Slot Left', dot: '#fbbf24', text: '#fbbf24', bg: 'rgba(251,191,36,0.1)' },
  booked: { label: 'Currently Booked', dot: '#f87171', text: '#f87171', bg: 'rgba(248,113,113,0.1)' },
}

const budgetRanges = ['Under $100', '$100 – $500', '$500 – $1,000', '$1,000 – $5,000', '$5,000+', 'Not sure yet']

const initialForm = { businessName: '', contactName: '', email: '', phone: '', website: '', placement: '', budget: '', message: '' }

export default function Advertise() {
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const { stats } = useTikTokStats()

  const reachStats = useMemo(() => [
    { icon: Icons.users, value: stats.followersFormatted || '—', label: 'Followers' },
    { icon: Icons.play, value: stats.avgViewersFormatted || '—', label: 'Avg. Live Viewers' },
    { icon: Icons.globe, value: 'US & Canada', label: 'Primary Regions' },
    { icon: Icons.trophy, value: stats.battlesHostedFormatted || '—', label: 'Battles Hosted' },
  ], [stats])

  const update = field => e => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const subject = encodeURIComponent(`Advertising Inquiry — ${form.businessName}`)
    const body = encodeURIComponent(
      `Business/Brand: ${form.businessName}\nContact: ${form.contactName}\nEmail: ${form.email}\nPhone: ${form.phone || 'N/A'}\nWebsite: ${form.website || 'N/A'}\nPlacement: ${form.placement}\nBudget: ${form.budget || 'N/A'}\n\nMessage:\n${form.message}`
    )
    window.location.href = `mailto:lagwatinc@gmail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
    setSubmitting(false)
  }

  const scrollToForm = (name) => {
    document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' })
    setForm(f => ({ ...f, placement: name }))
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[520px] flex items-end pb-16 overflow-hidden" style={{ background: '#120620' }}>
        <img
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1400&q=80"
          alt="Advertise"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(18,6,32,0.95) 40%, rgba(59,16,99,0.6) 100%)' }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <Motion delay={0.1}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-5 text-ember" style={{ background: 'rgba(255,107,26,0.1)' }}>
                For Brands & Sponsors
              </span>
              <h1 className="font-display font-bold text-ivory mb-4 leading-tight" style={{ fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.02em' }}>
                Advertise With<br />
                <span className="text-gradient">KM DYNASTY</span>
              </h1>
              <p className="text-white/60 text-sm leading-relaxed max-w-md">
                Partner with King Maker to reach a fast-growing, highly engaged livestream audience.
              </p>
            </Motion>

            <Motion delay={0.2}>
              <div className="glass rounded-2xl p-6 border border-white/10 grid grid-cols-2 gap-4">
                {reachStats.map(s => (
                  <div key={s.label} className="text-center">
                    <span className="w-5 h-5 block mx-auto mb-2 text-ember">{s.icon}</span>
                    <p className="font-display font-bold text-xl text-ivory">{s.value}</p>
                    <p className="text-white/40 text-[10px] uppercase tracking-wider mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </Motion>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 sm:py-24" style={{ background: '#1B1024' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Motion delay={0.1} className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ivory mb-3" style={{ letterSpacing: '-0.02em' }}>
              Placement <span className="text-gradient">Options</span>
            </h2>
            <p className="text-white/50 text-sm max-w-xl mx-auto">
              Pick a package or mix & match. Pricing confirmed after we review your inquiry.
            </p>
          </Motion>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {packages.map(({ name, availability, availabilityNote, features, accent }, i) => {
              const avail = availabilityConfig[availability]
              return (
                <Motion key={i} delay={0.1 + i * 0.08}>
                  <div
                    className="rounded-2xl p-6 flex flex-col border border-white/06 hover:border-white/12 transition-all"
                    style={{ background: 'rgba(59,16,99,0.2)', borderTop: `2px solid ${accent}` }}
                  >
                    <h3 className="font-display font-bold text-base text-ivory mb-3">{name}</h3>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold mb-4 self-start" style={{ background: avail.bg, color: avail.text }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: avail.dot }} />
                      {avail.label}
                      {availabilityNote && <span className="font-normal opacity-70">({availabilityNote})</span>}
                    </div>

                    <p className="text-xs font-bold mb-4" style={{ color: accent }}>Contact for pricing</p>

                    <ul className="space-y-2 mb-6 flex-1">
                      {features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-white/50">
                          <span className="w-3.5 h-3.5 block mt-0.5 flex-shrink-0 text-ember">{Icons.check}</span>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => scrollToForm(name)}
                      className="w-full py-2.5 text-xs font-bold text-white rounded-lg transition-all hover:scale-105"
                      style={{ background: availability === 'booked' ? 'rgba(255,255,255,0.06)' : `linear-gradient(135deg, ${accent}, ${accent}cc)`, borderRadius: 6 }}
                    >
                      {availability === 'booked' ? 'Join Waitlist' : 'Reserve This Slot'}
                    </button>
                  </div>
                </Motion>
              )
            })}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry-form" className="py-16 sm:py-24 scroll-mt-20" style={{ background: '#120620' }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <Motion delay={0.1} className="text-center mb-10">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ivory mb-3" style={{ letterSpacing: '-0.02em' }}>
              Advertiser <span className="text-gradient">Inquiry</span>
            </h2>
            <p className="text-white/50 text-sm">We'll get back to you within 1–2 business days.</p>
          </Motion>

          {submitted ? (
            <Motion delay={0.1}>
              <div className="rounded-2xl p-10 text-center border border-white/08" style={{ background: 'rgba(59,16,99,0.35)', backdropFilter: 'blur(16px)' }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(255,107,26,0.15)' }}>
                  <span className="w-7 h-7 block text-ember">{Icons.check}</span>
                </div>
                <h3 className="font-display font-bold text-xl text-ivory mb-2">Inquiry Sent</h3>
                <p className="text-white/50 text-sm mb-6">The KM DYNASTY team will get back to you within 1–2 business days.</p>
                <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white rounded-lg transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)', borderRadius: 8 }}>
                  Back to Home
                </Link>
              </div>
            </Motion>
          ) : (
            <Motion delay={0.15}>
              <form onSubmit={handleSubmit} className="rounded-2xl p-8 border border-white/08 space-y-5" style={{ background: 'rgba(59,16,99,0.35)', backdropFilter: 'blur(16px)' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { label: 'Business / Brand Name *', field: 'businessName', required: true },
                    { label: 'Contact Name *', field: 'contactName', required: true },
                    { label: 'Email *', field: 'email', required: true, type: 'email' },
                    { label: 'Phone (optional)', field: 'phone', type: 'tel' },
                  ].map(({ label, field, required, type = 'text' }) => (
                    <div key={field}>
                      <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">{label}</label>
                      <input
                        type={type}
                        required={required}
                        value={form[field]}
                        onChange={update(field)}
                        className="w-full px-4 py-3 rounded-lg text-sm text-ivory placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-ember/40"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Website / Social Link (optional)</label>
                  <input
                    type="url"
                    value={form.website}
                    onChange={update('website')}
                    placeholder="https://..."
                    className="w-full px-4 py-3 rounded-lg text-sm text-ivory placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-ember/40"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Placement Interest</label>
                    <select
                      value={form.placement}
                      onChange={update('placement')}
                      className="w-full px-4 py-3 rounded-lg text-sm text-ivory focus:outline-none focus:ring-2 focus:ring-ember/40"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      <option value="" className="bg-[#120620]">Select a package...</option>
                      {packages.map(({ name }) => <option key={name} value={name} className="bg-[#120620]">{name}</option>)}
                      <option value="Not sure / Custom quote" className="bg-[#120620]">Not sure / Custom quote</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Budget Range (optional)</label>
                    <select
                      value={form.budget}
                      onChange={update('budget')}
                      className="w-full px-4 py-3 rounded-lg text-sm text-ivory focus:outline-none focus:ring-2 focus:ring-ember/40"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      <option value="" className="bg-[#120620]">Select range...</option>
                      {budgetRanges.map(r => <option key={r} value={r} className="bg-[#120620]">{r}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Message / Campaign Details *</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={update('message')}
                    placeholder="Tell us about your campaign, goals, and any specific requirements..."
                    className="w-full px-4 py-3 rounded-lg text-sm text-ivory placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-ember/40 resize-none"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-6 py-3.5 text-sm font-bold text-white rounded-lg transition-all hover:scale-105 disabled:opacity-50"
                  style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)', borderRadius: 8 }}
                >
                  {submitting ? 'Sending...' : 'Send Inquiry'}
                </button>

                <p className="text-xs text-white/30 text-center">
                  Payment for confirmed packages is handled via PayPal after we review your inquiry.
                </p>
              </form>
            </Motion>
          )}
        </div>
      </section>
    </main>
  )
}

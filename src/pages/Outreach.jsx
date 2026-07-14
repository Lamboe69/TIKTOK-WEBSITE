import { useState } from 'react'
import Motion from '../components/Motion'
import { Icons } from '../components/Icons'
import { useContent } from '../cms/ContentContext'
import './morePages.css'

const supportReasons = [
  'Medical emergency',
  'School fees / Education',
  'Food / Basic needs',
  'Housing / Shelter',
  'Business start-up',
  'Other',
]

export default function Outreach() {
  const { getPage, settings } = useContent()
  const page = getPage('outreach')
  const contactEmail = settings.email || 'lagwatinc@gmail.com'
  const [form, setForm] = useState({ name: '', email: '', country: '', reason: '', story: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent('KM DYNASTY - Support Request')
    const body = encodeURIComponent(
      'Name: ' + form.name + '\nEmail: ' + form.email + '\nCountry: ' + form.country + '\nReason: ' + form.reason + '\n\nStory:\n' + form.story
    )
    window.location.href = 'mailto:' + contactEmail + '?subject=' + subject + '&body=' + body
    setSubmitted(true)
  }

  return (
    <main>
      {/* Hero — Giving Horizon */}
      <section className="outreach-hero" aria-label="KM Dynasty Outreach">
        <div className="outreach-hero__media" aria-hidden>
          <img src={page.heroImage || '/photos/community-meetup.jpg'} alt="" />
          <div className="outreach-hero__veil" />
          <div className="outreach-hero__warm" />
        </div>
        <div className="outreach-hero__lockup">
          <Motion delay={60}>
            <p className="outreach-hero__brand">{page.heroBrand || 'KM DYNASTY'}</p>
            <h1 className="outreach-hero__title">{page.heroTitle || 'Outreach'}</h1>
            <p className="outreach-hero__lede">
              {page.heroLede ||
                '“I want to take our dynasty family to the streets and be a destiny helper to those in need.”'}
            </p>
            <div className="outreach-hero__actions">
              <a href="#outreach-mission" className="mp-cta">
                See the mission
                <span className="w-4 h-4 block">{Icons.arrowRight}</span>
              </a>
              <a href="#outreach-donate" className="mp-link">
                Donate on GoFundMe
              </a>
            </div>
          </Motion>
        </div>
      </section>

      {/* Main Content */}
      <section id="outreach-mission" className="py-16 sm:py-24" style={{ background: '#1B1024' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left — Mission */}
            <div className="space-y-6">
              <Motion delay={0.1}>
                <div className="relative rounded-2xl overflow-hidden aspect-[16/9]">
                  <img
                    src="/photos/community-meetup.jpg"
                    alt="Outreach mission"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(59,16,99,0.5), rgba(255,107,26,0.2))' }} />
                </div>
              </Motion>

              <Motion delay={0.15}>
                <h2 className="font-display font-bold text-3xl text-ivory" style={{ letterSpacing: '-0.02em' }}>
                  Our <span className="text-gradient">Mission</span>
                </h2>
                <p className="text-white/60 text-sm leading-relaxed mt-3">
                  King Maker believes in giving back. Through the KM Dynasty Outreach program, we support
                  individuals and families in need across the globe — from medical emergencies to education fees.
                </p>
              </Motion>

              <Motion delay={0.2}>
                <div className="rounded-2xl p-6 border border-white/04" style={{ background: 'rgba(232,185,74,0.06)' }}>
                  <h3 className="font-display font-bold text-lg text-ivory mb-4">How Your Donations Help</h3>
                  <ul className="space-y-3">
                    {[
                      { icon: Icons.heart, text: 'Medical support for families in crisis' },
                      { icon: Icons.star, text: 'School fees and educational supplies' },
                      { icon: Icons.gift, text: 'Food packages for struggling households' },
                      { icon: Icons.shield, text: 'Emergency shelter and housing support' },
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-white/60">
                        <span className="w-5 h-5 block mt-0.5 flex-shrink-0 text-ember">{item.icon}</span>
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </Motion>

              <Motion delay={0.25}>
                <div id="outreach-donate" className="rounded-2xl p-6 border border-white/04" style={{ background: 'rgba(59,16,99,0.35)', backdropFilter: 'blur(16px)' }}>
                  <h3 className="font-display font-bold text-lg text-ivory mb-2">Donate via GoFundMe</h3>
                  <p className="text-white/50 text-sm mb-4">Support the KM Dynasty Outreach fund. Every dollar helps a family in need.</p>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white rounded-lg transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)', borderRadius: 8 }}
                  >
                    Donate on GoFundMe
                    <span className="w-4 h-4 block">{Icons.arrowRight}</span>
                  </a>
                </div>
              </Motion>
            </div>

            {/* Right — Form */}
            <Motion delay={0.15}>
              <div className="rounded-2xl p-8 border border-white/04 sticky top-24" style={{ background: 'rgba(59,16,99,0.35)', backdropFilter: 'blur(16px)' }}>
                <h2 className="font-display font-bold text-2xl text-ivory mb-2">Request Support</h2>
                <p className="text-white/50 text-sm mb-6">Going through a difficult time? Submit your application and our team will review it personally.</p>

                {submitted ? (
                  <div className="rounded-xl p-6 text-center" style={{ background: 'rgba(255,107,26,0.08)', border: '1px solid rgba(255,107,26,0.2)' }}>
                    <span className="w-10 h-10 block text-ember mx-auto mb-3">{Icons.check}</span>
                    <p className="text-ivory font-semibold">Application submitted!</p>
                    <p className="text-white/50 text-sm mt-1">We'll review your request and get back to you.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                      { label: 'Full Name', field: 'name', type: 'text' },
                      { label: 'Email', field: 'email', type: 'email' },
                      { label: 'Country', field: 'country', type: 'text' },
                    ].map(({ label, field, type }) => (
                      <div key={field}>
                        <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">{label}</label>
                        <input
                          type={type}
                          required
                          value={form[field]}
                          onChange={e => setForm({ ...form, [field]: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg text-sm text-ivory placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-ember/40"
                          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Reason for Support</label>
                      <select
                        required
                        value={form.reason}
                        onChange={e => setForm({ ...form, reason: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg text-sm text-ivory focus:outline-none focus:ring-2 focus:ring-ember/40"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                      >
                        <option value="" className="bg-[#1B1024]">Select a reason</option>
                        {supportReasons.map(r => <option key={r} value={r} className="bg-[#1B1024]">{r}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">Your Story</label>
                      <textarea
                        required
                        rows={4}
                        value={form.story}
                        onChange={e => setForm({ ...form, story: e.target.value })}
                        placeholder="Tell us about your situation..."
                        className="w-full px-4 py-3 rounded-lg text-sm text-ivory placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-ember/40 resize-none"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full px-6 py-3.5 text-sm font-bold text-white rounded-lg transition-all hover:scale-105"
                      style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)', borderRadius: 8 }}
                    >
                      Submit Application
                    </button>
                  </form>
                )}
              </div>
            </Motion>
          </div>
        </div>
      </section>
    </main>
  )
}

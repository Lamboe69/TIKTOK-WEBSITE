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
  const siteName = settings.siteName || 'KM DYNASTY'
  const page = getPage('outreach')
  const missionHeading = page.missionHeading || 'Our Mission'
  const missionBody = page.missionBody || `King Maker believes in giving back. Through the ${siteName} Outreach program, we support individuals and families in need across the globe — from medical emergencies to education fees.`
  const missionImage = page.missionImage || '/photos/community-meetup.jpg'
  const donationsHeading = page.donationsHeading || 'How Your Donations Help'
  const donationsItems = page.donationsItems ? page.donationsItems.split('\n').filter(Boolean) : ['Medical support for families in crisis', 'School fees and educational supplies', 'Food packages for struggling households', 'Emergency shelter and housing support']
  const outreachFormHeading = page.formHeading || 'Request Support'
  const outreachFormSubtitle = page.formSubtitle || 'Going through a difficult time? Submit your application and our team will review it personally.'
  const contactEmail = settings.email || 'lagwatinc@gmail.com'
  const paypalEmail = settings.paypalEmail || ''
  const [form, setForm] = useState({ name: '', email: '', country: '', reason: '', story: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`${siteName} - Support Request`)
    const body = encodeURIComponent(
      'Name: ' + form.name + '\nEmail: ' + form.email + '\nCountry: ' + form.country + '\nReason: ' + form.reason + '\n\nStory:\n' + form.story
    )
    window.location.href = 'mailto:' + contactEmail + '?subject=' + subject + '&body=' + body
    setSubmitted(true)
  }

  return (
    <main>
      {/* Hero — Giving Horizon */}
      <section className="outreach-hero" aria-label={`${siteName} Outreach`}>
        <div className="outreach-hero__media" aria-hidden>
          <img src={page.heroImage || '/photos/outreach-mission.jpg'} alt="" />
          <div className="outreach-hero__veil" />
          <div className="outreach-hero__warm" />
        </div>
        <div className="outreach-hero__lockup">
          <Motion delay={60}>
            <p className="outreach-hero__brand">{page.heroBrand || siteName}</p>
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
                Donate with PayPal
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
                    src={missionImage}
                    alt="Outreach mission"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(59,16,99,0.5), rgba(255,107,26,0.2))' }} />
                </div>
              </Motion>

              <Motion delay={0.15}>
                <h2 className="font-display font-bold text-3xl text-ivory" style={{ letterSpacing: '-0.02em' }}>
                  {missionHeading}
                </h2>
                <p className="text-white/60 text-sm leading-relaxed mt-3">
                  {missionBody}
                </p>
              </Motion>

              <Motion delay={0.2}>
                <div className="rounded-2xl p-6 border border-white/04" style={{ background: 'rgba(232,185,74,0.06)' }}>
                  <h3 className="font-display font-bold text-lg text-ivory mb-4">{donationsHeading}</h3>
                  <ul className="space-y-3">
                    {donationsItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-white/60">
                        <span className="w-5 h-5 block mt-0.5 flex-shrink-0 text-ember">{[Icons.heart, Icons.star, Icons.gift, Icons.shield][idx]}</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Motion>

              <Motion delay={0.25}>
                <div id="outreach-donate" className="rounded-2xl p-6 border border-white/04" style={{ background: 'rgba(59,16,99,0.35)', backdropFilter: 'blur(16px)' }}>
                  <h3 className="font-display font-bold text-lg text-ivory mb-2">Donate with PayPal</h3>
                  <p className="text-white/50 text-sm mb-4">Support the {siteName} Outreach fund. Every dollar helps a family in need.</p>
                   <form action="https://www.paypal.com/donate" method="post" target="_blank" onSubmit={(e) => { if (!paypalEmail) { e.preventDefault(); alert('Donations coming soon — the admin will configure PayPal in Settings.'); } }}>
                      <input type="hidden" name="business" value={paypalEmail} />
                      <input type="hidden" name="no_recurring" value="0" />
                      <input type="hidden" name="item_name" value={`${siteName} Outreach Donation`} />
                      <input type="hidden" name="currency_code" value="USD" />
                      <input type="hidden" name="amount" value="" />
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white rounded-lg transition-all hover:scale-105"
                        style={{ background: 'linear-gradient(135deg, #0070BA, #005ea6)', borderRadius: 8 }}
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z" /></svg>
                        Donate with PayPal
                      </button>
                    </form>
                </div>
              </Motion>
            </div>

            {/* Right — Form */}
            <Motion delay={0.15}>
              <div className="rounded-2xl p-8 border border-white/04 sticky top-24" style={{ background: 'rgba(59,16,99,0.35)', backdropFilter: 'blur(16px)' }}>
                <h2 className="font-display font-bold text-2xl text-ivory mb-2">{outreachFormHeading}</h2>
                <p className="text-white/50 text-sm mb-6">{outreachFormSubtitle}</p>

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

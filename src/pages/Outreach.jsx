import { useState } from 'react'
import Motion from '../components/Motion'
import { Icons } from '../components/Icons'
import { useContent } from '../cms/ContentContext'
import { apiFetch, readJsonResponse } from '../utils/api'
import './morePages.css'

const supportTypes = [
  'Financial',
  'Education',
  'Medical',
  'Emergency',
  'Others',
]

const howItWorksDefaults = [
  {
    title: 'Apply',
    body: 'Submit your application through our programme below. Tell us your story and what you need most.',
    icon: 'clipboard',
  },
  {
    title: 'Verification',
    body: 'Every application is carefully reviewed and verified to ensure help reaches those who need it most. Our team conducts a thorough assessment to confirm genuine need and determine the best form of assistance.',
    icon: 'shield',
  },
  {
    title: 'Support Delivered',
    body: 'Once verified, we take action. Depending on your situation, help may come in the form of financial grants to ease urgent burdens, essential supplies and resources, or tailored support to help you get back on your feet.',
    icon: 'heart',
  },
]

export default function Outreach() {
  const { getPage, settings } = useContent()
  const siteName = settings.siteName || ''
  const page = getPage('outreach')
  const commitmentHeading = page.commitmentHeading || 'Our Commitment'
  const commitmentBody =
    page.commitmentBody ||
    "King Maker's charity operates across multiple regions, with dedicated support pathways for applicants in the USA, and around the world. Backed by a growing global community, we are transforming digital influence into meaningful, lasting change."
  const howHeading = page.howHeading || 'How It Works'
  const missionImage = page.missionImage || '/photos/community-meetup.jpg'
  const outreachFormHeading = page.formHeading || 'Apply for Charity'
  const outreachFormSubtitle =
    page.formSubtitle ||
    'Your need is valid. We are ready to listen, review, and reach out with the support you deserve. Fill in the form and our team will be in touch.'
  const contactEmail = settings.email || 'lagwatinc@gmail.com'
  const paypalEmail = settings.paypalEmail || ''
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    supportType: '',
    story: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError('')
    try {
      const res = await apiFetch('/api/charity-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.name,
          email: form.email,
          phone: form.phone,
          country: form.country,
          supportType: form.supportType,
          story: form.story,
        }),
      })
      const data = await readJsonResponse(res)
      if (!res.ok) throw new Error(data.error || 'Failed to submit application')
      setSubmitted(true)
    } catch (err) {
      setSubmitError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main>
      {/* Hero */}
      <section className="outreach-hero" aria-label="Apply for Charity">
        <div className="outreach-hero__media" aria-hidden>
          <img src={page.heroImage || '/photos/outreach-mission.jpg'} alt="" />
          <div className="outreach-hero__veil" />
          <div className="outreach-hero__warm" />
        </div>
        <div className="outreach-hero__lockup">
          <Motion delay={60}>
            <p className="outreach-hero__brand">{siteName || 'King Maker'}</p>
            <h1 className="outreach-hero__title">{page.heroTitle || 'Apply for Charity'}</h1>
            <p className="outreach-hero__lede">
              {page.heroLede || 'Your Story Matters'}
            </p>
            <p className="outreach-hero__support">
              {page.heroSupport ||
                'Your need is valid. We are ready to listen, review, and reach out with the support you deserve. Fill in the form and our team will be in touch.'}
            </p>
            <div className="outreach-hero__actions">
              <a href="#charity-apply" className="mp-cta">
                Apply now
                <span className="w-4 h-4 block">{Icons.arrowRight}</span>
              </a>
              <a href="#charity-commitment" className="mp-link">
                Our commitment
              </a>
            </div>
          </Motion>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-24" style={{ background: '#1B1024' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left — Commitment & How It Works */}
            <div className="space-y-6">
              <Motion delay={0.1}>
                <div className="relative rounded-2xl overflow-hidden aspect-[16/9]">
                  <img
                    src={missionImage}
                    alt="Charity mission"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(59,16,99,0.5), rgba(255,107,26,0.2))',
                    }}
                  />
                </div>
              </Motion>

              <Motion delay={0.15}>
                <div id="charity-commitment">
                  <h2
                    className="font-display font-bold text-3xl text-ivory"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {commitmentHeading}
                  </h2>
                  <p className="text-white/60 text-sm leading-relaxed mt-3">
                    {commitmentBody}
                  </p>
                </div>
              </Motion>

              <Motion delay={0.2}>
                <div
                  className="rounded-2xl p-6 border border-white/04"
                  style={{ background: 'rgba(232,185,74,0.06)' }}
                >
                  <h3 className="font-display font-bold text-lg text-ivory mb-5">{howHeading}</h3>
                  <ol className="space-y-5">
                    {howItWorksDefaults.map((step, idx) => (
                      <li key={step.title} className="flex items-start gap-3">
                        <span className="w-5 h-5 block mt-0.5 flex-shrink-0 text-ember">
                          {Icons[step.icon]}
                        </span>
                        <div>
                          <p className="text-ivory text-sm font-semibold">
                            <span className="text-ember/80 mr-1.5">{idx + 1}.</span>
                            {step.title}
                          </p>
                          <p className="text-white/55 text-sm leading-relaxed mt-1">
                            {step.body}
                          </p>
                          {step.title === 'Support Delivered' && (
                            <ul className="mt-3 space-y-2">
                              {[
                                'Financial grants to ease urgent burdens',
                                'Essential supplies and resources',
                                'Tailored support to help you get back on your feet',
                              ].map((item) => (
                                <li
                                  key={item}
                                  className="flex items-start gap-2 text-sm text-white/50"
                                >
                                  <span className="w-3.5 h-3.5 block mt-0.5 flex-shrink-0 text-ember">
                                    {Icons.check}
                                  </span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </Motion>

              <Motion delay={0.25}>
                <div
                  id="charity-donate"
                  className="rounded-2xl p-6 border border-white/04"
                  style={{
                    background: 'rgba(59,16,99,0.35)',
                    backdropFilter: 'blur(16px)',
                  }}
                >
                  <h3 className="font-display font-bold text-lg text-ivory mb-2">
                    Donate with PayPal
                  </h3>
                  <p className="text-white/50 text-sm mb-4">
                    Support the {siteName || 'King Maker'} charity fund. Every dollar helps someone in need.
                  </p>
                  <form
                    action="https://www.paypal.com/donate"
                    method="post"
                    target="_blank"
                    onSubmit={(e) => {
                      if (!paypalEmail) {
                        e.preventDefault()
                        alert(
                          'Donations coming soon — the admin will configure PayPal in Settings.'
                        )
                      }
                    }}
                  >
                    <input type="hidden" name="business" value={paypalEmail} />
                    <input type="hidden" name="no_recurring" value="0" />
                    <input
                      type="hidden"
                      name="item_name"
                      value={`${siteName || 'King Maker'} Charity Donation`}
                    />
                    <input type="hidden" name="currency_code" value="USD" />
                    <input type="hidden" name="amount" value="" />
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white rounded-lg transition-all hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, #0070BA, #005ea6)',
                        borderRadius: 8,
                      }}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z" />
                      </svg>
                      Donate with PayPal
                    </button>
                  </form>
                </div>
              </Motion>
            </div>

            {/* Right — Form */}
            <Motion delay={0.15}>
              <div
                id="charity-apply"
                className="rounded-2xl p-8 border border-white/04 sticky top-24"
                style={{
                  background: 'rgba(59,16,99,0.35)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <h2 className="font-display font-bold text-2xl text-ivory mb-2">
                  {outreachFormHeading}
                </h2>
                <p className="text-white/50 text-sm mb-6">{outreachFormSubtitle}</p>

                {submitted ? (
                  <div
                    className="rounded-xl p-6 text-center"
                    style={{
                      background: 'rgba(255,107,26,0.08)',
                      border: '1px solid rgba(255,107,26,0.2)',
                    }}
                  >
                    <span className="w-10 h-10 block text-ember mx-auto mb-3">
                      {Icons.check}
                    </span>
                    <p className="text-ivory font-semibold">Application submitted!</p>
                    <p className="text-white/50 text-sm mt-1">
                      We&apos;ll review your request and get back to you.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                      { label: 'Full Name', field: 'name', type: 'text' },
                      { label: 'Email', field: 'email', type: 'email' },
                      { label: 'Phone/WhatsApp', field: 'phone', type: 'tel' },
                      { label: 'Country', field: 'country', type: 'text' },
                    ].map(({ label, field, type }) => (
                      <div key={field}>
                        <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                          {label}
                        </label>
                        <input
                          type={type}
                          required
                          value={form[field]}
                          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg text-sm text-ivory placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-ember/40"
                          style={{
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.1)',
                          }}
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                        Type of Support Needed
                      </label>
                      <select
                        required
                        value={form.supportType}
                        onChange={(e) => setForm({ ...form, supportType: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg text-sm text-ivory focus:outline-none focus:ring-2 focus:ring-ember/40"
                        style={{
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.1)',
                        }}
                      >
                        <option value="" className="bg-[#1B1024]">
                          Select type of support
                        </option>
                        {supportTypes.map((type) => (
                          <option key={type} value={type} className="bg-[#1B1024]">
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                        Your Story — Tell Us What You Need
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={form.story}
                        onChange={(e) => setForm({ ...form, story: e.target.value })}
                        placeholder="Share your story and what kind of help you need most..."
                        className="w-full px-4 py-3 rounded-lg text-sm text-ivory placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-ember/40 resize-none"
                        style={{
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.1)',
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full px-6 py-3.5 text-sm font-bold text-white rounded-lg transition-all hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
                      style={{
                        background: 'linear-gradient(135deg, #FF6B1A, #CC5200)',
                        borderRadius: 8,
                      }}
                      disabled={submitting}
                    >
                      {submitting ? 'Submitting…' : 'Submit Application'}
                    </button>
                    {submitError ? (
                      <p className="text-red-300 text-sm text-center">{submitError}</p>
                    ) : null}
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

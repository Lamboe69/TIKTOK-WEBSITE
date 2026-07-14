import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icons } from '../components/Icons'
import Motion from '../components/Motion'
import { useTikTokStats } from '../hooks/useTikTokStats'
import { useContent } from '../cms/ContentContext'
import { normalizeAdPackages } from '../cms/normalize'
import './Advertise.css'

const fallbackPackages = [
  {
    code: 'PT-01',
    name: 'Livestream Shout-Out',
    tag: 'During battle',
    availability: 'available',
    features: [
      'On-screen brand mention during live battle',
      'Tagged in stream description',
      "Shared to King Maker's TikTok story",
    ],
  },
  {
    code: 'PT-02',
    name: 'Homepage Banner',
    tag: 'Site wide',
    availability: 'limited',
    availabilityNote: '1 slot at a time',
    features: [
      'Rotating banner on this site',
      'Seen by every site visitor',
      'Link out to your campaign',
    ],
  },
  {
    code: 'PT-03',
    name: 'Sponsored Content',
    tag: 'Owned post',
    availability: 'available',
    features: [
      'Dedicated TikTok post or shout-out',
      'Mentioned in battle description',
      'Brand tag in video overlay',
    ],
  },
  {
    code: 'PT-04',
    name: 'Custom / Bundle',
    tag: 'Bespoke',
    availability: 'available',
    features: [
      'Mix any placements above',
      'Built around your campaign goals',
      'Custom quote after brief',
    ],
  },
]

const budgetRanges = [
  'Under $100',
  '$100 – $500',
  '$500 – $1,000',
  '$1,000 – $5,000',
  '$5,000+',
  'Not sure yet',
]

const initialForm = {
  businessName: '',
  contactName: '',
  email: '',
  phone: '',
  website: '',
  placement: '',
  budget: '',
  message: '',
}

export default function Advertise() {
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [active, setActive] = useState(0)
  const { stats } = useTikTokStats()
  const { collections, getPage, settings } = useContent()
  const siteName = settings.siteName || 'KM DYNASTY'
  const page = getPage('advertise')
  const packages = collections.adPackages?.length
    ? normalizeAdPackages(collections.adPackages)
    : fallbackPackages
  const pack = packages[active] || packages[0]
  const boardKicker = page.boardKicker || 'Airtime board'
  const boardTitle = page.boardTitle || 'Choose your slot'
  const boardSubtitle = page.boardSubtitle || 'Four placements. One brief. Pricing confirmed after we review.'
  const briefKicker = page.briefKicker || 'Production brief'
  const briefTitle = page.briefTitle || 'Tell us what you want on air'
  const briefSubtitle = page.briefSubtitle || 'Share your brand, placement, and campaign goals. We reply within 1–2 business days — then lock pricing and PayPal payment.'
  const formSubmitLabel = page.formSubmitLabel || 'Send brief'
  const formHint = page.formHint || 'Confirmed packages settle via PayPal after approval.'

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const subject = encodeURIComponent(`Advertising Inquiry — ${form.businessName}`)
    const body = encodeURIComponent(
      `Business/Brand: ${form.businessName}\nContact: ${form.contactName}\nEmail: ${form.email}\nPhone: ${form.phone || 'N/A'}\nWebsite: ${form.website || 'N/A'}\nPlacement: ${form.placement}\nBudget: ${form.budget || 'N/A'}\n\nMessage:\n${form.message}`,
    )
    window.location.href = `mailto:lagwatinc@gmail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
    setSubmitting(false)
  }

  const reserve = (name, index) => {
    setActive(index)
    setForm((f) => ({ ...f, placement: name }))
    document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="prime-page">
      {/* Hero — Prime Time Marquee */}
      <section className="prime-hero" aria-label={`Advertise with ${siteName}`}>
        <div className="prime-hero__media" aria-hidden>
          <img src={page.heroImage || '/photos/business-ads.jpg'} alt="" className="prime-hero__photo" />
          <div className="prime-hero__grain" />
          <div className="prime-hero__veil" />
        </div>

        <p className="prime-hero__spine" aria-hidden>
          PRIME TIME
        </p>

        <div className="prime-hero__ticker" aria-hidden>
          <div className="prime-hero__ticker-track">
            <span>LIVE REACH</span>
            <span>BRAND STAGE</span>
            <span>PARTNERSHIPS</span>
            <span>ON AIR</span>
            <span>LIVE REACH</span>
            <span>BRAND STAGE</span>
            <span>PARTNERSHIPS</span>
            <span>ON AIR</span>
          </div>
        </div>

        <div className="prime-hero__marquee">
          <Motion delay={50} className="prime-hero__lockup">
            <p className="prime-hero__brand">{page.heroBrand || siteName}</p>
            <h1 className="prime-hero__title">{page.heroTitle || 'Advertise'}</h1>
            <p className="prime-hero__lede">
              {page.heroLede ||
                `Put your brand in the livestream — King Maker's arena, your message,${
                  stats.followersFormatted
                    ? ` ${stats.followersFormatted} followers watching.`
                    : ' a dynasty audience watching.'
                }`}
            </p>
            <div className="prime-hero__actions">
              <a href="#inquiry-form" className="prime-cta">
                Book airtime
                <span className="w-4 h-4 block">{Icons.arrowRight}</span>
              </a>
              <a href="#airtime-board" className="prime-text-link">
                See placements
              </a>
            </div>
          </Motion>
        </div>
      </section>

      {/* Interactive airtime board */}
      <section id="airtime-board" className="prime-board">
        <div className="prime-pad">
          <Motion delay={40} className="prime-board__head">
            <p className="prime-kicker">{boardKicker}</p>
              <h2>{boardTitle}</h2>
              <p>{boardSubtitle}</p>
          </Motion>

          <div className="prime-board__stage">
            <div className="prime-board__rail" role="tablist" aria-label="Placement packages">
              {packages.map((p, i) => (
                <button
                  key={p.code}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  className={`prime-rail-btn${i === active ? ' is-on' : ''}`}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                >
                  <span className="prime-rail-btn__code">{p.code}</span>
                  <span className="prime-rail-btn__name">{p.name}</span>
                  <span
                    className={`prime-rail-btn__dot${
                      p.availability === 'limited' ? ' is-limited' : ''
                    }`}
                  />
                </button>
              ))}
            </div>

            <Motion key={pack.code} delay={30} className="prime-feature">
              <div className="prime-feature__glow" aria-hidden />
              <p className="prime-feature__code">
                {pack.code}
                <span
                  className={`prime-feature__avail${
                    pack.availability === 'limited' ? ' is-limited' : ''
                  }`}
                >
                  {pack.availability === 'limited'
                    ? `Limited · ${pack.availabilityNote}`
                    : 'Open for booking'}
                </span>
              </p>
              <h3 className="prime-feature__title">{pack.name}</h3>
              <p className="prime-feature__tag">{pack.tag}</p>
              <ul className="prime-feature__list">
                {pack.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <p className="prime-feature__price">Contact for pricing</p>
              <button
                type="button"
                className="prime-cta"
                onClick={() => reserve(pack.name, active)}
              >
                Reserve this slot
                <span className="w-4 h-4 block">{Icons.arrowRight}</span>
              </button>
            </Motion>
          </div>
        </div>
      </section>

      {/* Production brief */}
      <section id="inquiry-form" className="prime-brief scroll-mt-24">
        <div className="prime-brief__grid prime-pad">
          <Motion delay={40} className="prime-brief__aside">
            <p className="prime-kicker">{briefKicker}</p>
            <h2>{briefTitle}</h2>
            <p>{briefSubtitle}</p>
            <div className="prime-brief__meta" aria-hidden>
              <span>01 · Brand</span>
              <span>02 · Placement</span>
              <span>03 · Campaign</span>
            </div>
          </Motion>

          <div className="prime-brief__sheet">
            {submitted ? (
              <Motion delay={50} className="prime-success">
                <div className="prime-success__icon">
                  <span className="w-6 h-6 block">{Icons.check}</span>
                </div>
                <h3>Brief received</h3>
                <p>The {siteName} team will get back to you within 1–2 business days.</p>
                <Link to="/" className="prime-cta">
                  Back to home
                </Link>
              </Motion>
            ) : (
              <Motion delay={70}>
                <form onSubmit={handleSubmit} className="prime-form">
                  <div className="prime-form__row">
                    {[
                      { label: 'Business / Brand *', field: 'businessName', required: true },
                      { label: 'Contact name *', field: 'contactName', required: true },
                      { label: 'Email *', field: 'email', required: true, type: 'email' },
                      { label: 'Phone (optional)', field: 'phone', type: 'tel' },
                    ].map(({ label, field, required, type = 'text' }) => (
                      <div key={field} className="prime-field">
                        <label htmlFor={`prime-${field}`}>{label}</label>
                        <input
                          id={`prime-${field}`}
                          type={type}
                          required={required}
                          value={form[field]}
                          onChange={update(field)}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="prime-field">
                    <label htmlFor="prime-website">Website / social (optional)</label>
                    <input
                      id="prime-website"
                      type="url"
                      value={form.website}
                      onChange={update('website')}
                      placeholder="https://"
                    />
                  </div>

                  <div className="prime-form__row">
                    <div className="prime-field">
                      <label htmlFor="prime-placement">Placement interest</label>
                      <select
                        id="prime-placement"
                        value={form.placement}
                        onChange={update('placement')}
                      >
                        <option value="">Select a package…</option>
                        {packages.map(({ name }) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                        <option value="Not sure / Custom quote">Not sure / Custom quote</option>
                      </select>
                    </div>
                    <div className="prime-field">
                      <label htmlFor="prime-budget">Budget range (optional)</label>
                      <select id="prime-budget" value={form.budget} onChange={update('budget')}>
                        <option value="">Select range…</option>
                        {budgetRanges.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="prime-field">
                    <label htmlFor="prime-message">Campaign details *</label>
                    <textarea
                      id="prime-message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={update('message')}
                      placeholder="Goals, timing, and what success looks like for your brand…"
                    />
                  </div>

                  <button type="submit" disabled={submitting} className="prime-cta prime-cta--wide">
                    {submitting ? 'Sending…' : formSubmitLabel}
                    <span className="w-4 h-4 block">{Icons.arrowRight}</span>
                  </button>
                  <p className="prime-form__hint">
                    {formHint}
                  </p>
                </form>
              </Motion>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

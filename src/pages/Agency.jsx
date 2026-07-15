import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Motion from '../components/Motion'
import { Icons } from '../components/Icons'
import { useContent } from '../cms/ContentContext'
import './Agency.css'

const AGENCY_TOPIC = "Creator Management Inquiry (La'Gwat Agency)"

const services = [
  {
    n: '01',
    icon: 'shield',
    title: 'Account Restriction, Ban & Protection',
    body: 'We proactively audit every piece of content and CTA to keep your agency compliant and ban-free. If an unjust flag hits, we deploy rapid legal appeals and direct escalation to restore full access within hours. Backed by backup accounts, IP rotation, and real-time monitoring, we ensure your revenue and reputation stay fortress-strong.',
  },
  {
    n: '02',
    icon: 'crown',
    title: 'Strategic Brand Architecture',
    body: 'We don’t just manage your current brand; we build a legacy. We analyze your data, your audience psychographics, and your unique voice to map out a 3–5 year trajectory. We transform you from a “social media personality” into a Multi-Platform Media Mogul.',
  },
  {
    n: '03',
    icon: 'target',
    title: 'The "Money Team" (Revenue Multiplication)',
    body: 'The A-Team prevents revenue loss by acting as a high-powered financial and strategic partner. They don’t just wait for deals — they proactively build premium, value-aligned partnerships with major brands. Beyond sponsorships, they optimize product logistics to boost profit margins and diversify your income through courses, digital products, licensing, and equity, ensuring you aren’t reliant on ad revenue alone.',
  },
  {
    n: '04',
    icon: 'users',
    title: 'Hyper-Growth Audience Acceleration',
    body: 'The A-Team prioritizes your unique voice over algorithm trends, expertly optimizing your content for every major platform without diluting your identity. They boost discoverability to connect you with the right audience and apply psychological insights to engineer viral growth, turning your narrative into shareable, high-impact content that cuts through the noise.',
  },
  {
    n: '05',
    icon: 'shield',
    title: 'The Crisis & Legal Shield',
    body: 'Peace of mind is priceless. We provide 24/7 Crisis Management, legal review, and contract negotiation. We take the stress off your plate so you sleep soundly while we handle the noise.',
  },
  {
    n: '06',
    icon: 'star',
    title: 'World-Class Production Support',
    body: 'Need a studio? A cinematographer? A ghostwriter? Our network of vetted professionals is at your disposal. We ensure you have the resources to execute on a cinematic scale.',
  },
]

const defaultCriteria = [
  'Ready to stop being a player and start being the owner',
  'Committed to long-term brand building over short-term virality',
  'Open to strategic guidance and operational systems',
  'Driven to build a community, not just an audience',
]

const emptyForm = {
  name: '',
  email: '',
  handle: '',
  platform: 'TikTok',
  followers: '',
  country: '',
  about: '',
}

function buildQrSrc(url) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=520x520&data=${encodeURIComponent(url)}&bgcolor=0C1628&color=FFF7F0&margin=18&ecc=M`
}

function isExternalUrl(url) {
  return /^https?:\/\//i.test(url || '')
}

export default function Agency() {
  const { getPage, settings } = useContent()
  const siteName = settings.siteName || ''
  const page = getPage('agency')

  const heroTitle = page.heroTitle || 'The A-Team Creator Network'
  const heroLede =
    page.heroLede ||
    'Strategic architects behind the scenes — the pit crew for your rocket ship.'
  const introTitle = page.introTitle || 'A-TEAM AGENCY'
  const introBody =
    page.introBody ||
    'To the visionaries, the disruptors, and the culture shifters — the gap between being a creator and building an empire is operational excellence. That is where The A-Team comes in. We are the strategic architects behind the scenes, the pit crew for your rocket ship.\n\nYou didn’t build your audience by playing it safe. You grind, you create, and you connect. We aren’t just another management agency. We take the friction out of your business so you can focus entirely on your craft.'

  const scanHeading = page.scanHeading || 'Apply to The A-Team'
  const scanBody =
    page.scanBody ||
    'The A-Team takes on a limited number of creators each quarter — because we invest our full resources into every talent we accept. We are looking for creators who are ready to play the long game.'
  const formHeading = page.formHeading || 'Agency application'
  const formSubtitle =
    page.formSubtitle ||
    'Tell us who you are, where you create, and why you’re ready for The A-Team.'
  const formSubmitLabel = page.formSubmitLabel || 'Submit application'
  const servicesHeading = page.servicesHeading || 'What We Do'
  const oathHeading = page.oathHeading || 'Ready to build the empire?'
  const oathBody =
    page.oathBody ||
    'Limited seats each quarter. Tap apply or scan the code — tell us who you are and what you create.'
  const oathImage = page.oathImage || '/photos/oath-commitment.jpg'

  const criteria = (page.criteriaText || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
  const criteriaList = criteria.length ? criteria : defaultCriteria

  const introParagraphs = introBody
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)

  const [applyTarget, setApplyTarget] = useState('#agency-apply')
  const [qrSrc, setQrSrc] = useState(page.qrImage || '')
  const [form, setForm] = useState(emptyForm)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const hashPath = `${window.location.origin}/agency#agency-apply`
    const custom = (page.applyUrl || '').trim()
    const target = custom || hashPath
    setApplyTarget(custom || '#agency-apply')
    setQrSrc(page.qrImage || buildQrSrc(target))
  }, [page.applyUrl, page.qrImage])

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const message = [
        'Agency application',
        `TikTok / handle: ${form.handle}`,
        `Primary platform: ${form.platform}`,
        form.followers ? `Followers: ${form.followers}` : null,
        form.country ? `Country / region: ${form.country}` : null,
        '',
        form.about,
      ]
        .filter((line) => line !== null)
        .join('\n')

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          topic: AGENCY_TOPIC,
          reason: AGENCY_TOPIC,
          message,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Failed to submit application')

      setSubmitted(true)
      setForm(emptyForm)
      setTimeout(() => setSubmitted(false), 8000)
    } catch (err) {
      setError(err.message || 'Failed to submit application')
    } finally {
      setSubmitting(false)
    }
  }

  const applyCta =
    isExternalUrl(applyTarget) ? (
      <a href={applyTarget} className="embassy-cta" target="_blank" rel="noopener noreferrer">
        Apply now
        <span className="w-4 h-4 block">{Icons.arrowRight}</span>
      </a>
    ) : (
      <a href={applyTarget.startsWith('#') ? applyTarget : '#agency-apply'} className="embassy-cta">
        Apply now
        <span className="w-4 h-4 block">{Icons.arrowRight}</span>
      </a>
    )

  return (
    <main className="embassy-page">
      {/* Hero */}
      <section className="embassy-hero" aria-label={`${siteName} Agency`}>
        <div className="embassy-hero__media" aria-hidden>
          <img
            src={page.heroImage || '/photos/agency-partners.jpg'}
            alt=""
            className="embassy-hero__photo"
          />
          <div className="embassy-hero__veil" />
          <div className="embassy-hero__beams">
            <span />
            <span />
            <span />
          </div>
        </div>

        <svg className="embassy-hero__orbs" viewBox="0 0 1000 1000" aria-hidden>
          <ellipse className="embassy-hero__orb embassy-hero__orb--a" cx="500" cy="500" rx="220" ry="320" />
          <ellipse className="embassy-hero__orb embassy-hero__orb--b" cx="500" cy="500" rx="340" ry="200" />
          <ellipse className="embassy-hero__orb embassy-hero__orb--c" cx="500" cy="500" rx="420" ry="420" />
          <circle className="embassy-hero__orb-core" cx="500" cy="500" r="6" />
        </svg>

        <div className="embassy-hero__core">
          <Motion delay={60} className="embassy-hero__lockup">
            <p className="embassy-hero__brand">{siteName}</p>
            <h1 className="embassy-hero__title">{heroTitle}</h1>
            <p className="embassy-hero__lede">{heroLede}</p>
            <div className="embassy-hero__actions">
              {applyCta}
              <a href="#what-we-do" className="embassy-link">
                What we do
              </a>
            </div>
          </Motion>
        </div>
      </section>

      {/* Intro */}
      <section className="embassy-intro" aria-label="About The A-Team">
        <Motion delay={40} className="embassy-intro__inner">
          <p className="embassy-intro__kicker">{introTitle}</p>
          {introParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="embassy-intro__body">
              {paragraph}
            </p>
          ))}
        </Motion>
      </section>

      {/* Apply — form + QR */}
      <section id="agency-apply" className="embassy-scan" aria-label="Agency application">
        <div className="embassy-pad embassy-scan__grid">
          <Motion delay={40} className="embassy-scan__copy">
            <p className="embassy-scan__kicker">Limited roster</p>
            <h2>{scanHeading}</h2>
            <p className="embassy-scan__lede">{scanBody}</p>
            <ul className="embassy-scan__criteria">
              {criteriaList.map((item) => (
                <li key={item}>
                  <span className="embassy-scan__check" aria-hidden>
                    {Icons.check}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="embassy-apply-form-wrap">
              <h3 className="embassy-apply-form__heading">{formHeading}</h3>
              <p className="embassy-apply-form__sub">{formSubtitle}</p>

              {submitted ? (
                <div className="embassy-apply-success">
                  <span className="w-8 h-8 block text-[var(--e-ember)]" aria-hidden>
                    {Icons.check}
                  </span>
                  <p className="embassy-apply-success__title">Application submitted</p>
                  <p className="embassy-apply-success__copy">
                    Thanks — The A-Team will review and get back to you.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="embassy-apply-form">
                  <div className="embassy-apply-form__row">
                    <label className="embassy-field">
                      <span>
                        Full name <abbr title="required">*</abbr>
                      </span>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                        placeholder="Jane Doe"
                      />
                    </label>
                    <label className="embassy-field">
                      <span>
                        Email <abbr title="required">*</abbr>
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                        placeholder="you@example.com"
                      />
                    </label>
                  </div>

                  <div className="embassy-apply-form__row">
                    <label className="embassy-field">
                      <span>
                        TikTok / handle <abbr title="required">*</abbr>
                      </span>
                      <input
                        type="text"
                        name="handle"
                        value={form.handle}
                        onChange={handleChange}
                        required
                        placeholder="@yourhandle"
                      />
                    </label>
                    <label className="embassy-field">
                      <span>Primary platform</span>
                      <select name="platform" value={form.platform} onChange={handleChange}>
                        <option value="TikTok">TikTok</option>
                        <option value="Instagram">Instagram</option>
                        <option value="YouTube">YouTube</option>
                        <option value="Multiple">Multiple</option>
                      </select>
                    </label>
                  </div>

                  <div className="embassy-apply-form__row">
                    <label className="embassy-field">
                      <span>Approx. followers</span>
                      <input
                        type="text"
                        name="followers"
                        value={form.followers}
                        onChange={handleChange}
                        placeholder="e.g. 25K"
                      />
                    </label>
                    <label className="embassy-field">
                      <span>Country / region</span>
                      <input
                        type="text"
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        placeholder="e.g. Nigeria, USA"
                        autoComplete="country-name"
                      />
                    </label>
                  </div>

                  <label className="embassy-field">
                    <span>
                      Why The A-Team? <abbr title="required">*</abbr>
                    </span>
                    <textarea
                      name="about"
                      value={form.about}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us about your content, goals, and why you’re ready for agency partnership…"
                    />
                  </label>

                  {error ? <p className="embassy-apply-form__error">{error}</p> : null}

                  <button type="submit" disabled={submitting} className="embassy-cta embassy-scan__cta">
                    {submitting ? 'Sending…' : formSubmitLabel}
                    <span className="w-4 h-4 block">{Icons.arrowRight}</span>
                  </button>
                </form>
              )}
            </div>
          </Motion>

          <Motion delay={100} className="embassy-scan__frame-wrap">
            {isExternalUrl(applyTarget) ? (
              <a
                href={applyTarget}
                className="embassy-scanner embassy-scanner--link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open agency application link"
              >
                <div className="embassy-scanner__corners" aria-hidden>
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="embassy-scanner__beam" aria-hidden />
                {qrSrc ? (
                  <img
                    src={qrSrc}
                    alt=""
                    className="embassy-scanner__qr"
                    width={520}
                    height={520}
                  />
                ) : (
                  <div className="embassy-scanner__placeholder" aria-hidden />
                )}
              </a>
            ) : (
              <a
                href="#agency-apply"
                className="embassy-scanner embassy-scanner--link"
                aria-label="Jump to agency application form"
              >
                <div className="embassy-scanner__corners" aria-hidden>
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="embassy-scanner__beam" aria-hidden />
                {qrSrc ? (
                  <img
                    src={qrSrc}
                    alt=""
                    className="embassy-scanner__qr"
                    width={520}
                    height={520}
                  />
                ) : (
                  <div className="embassy-scanner__placeholder" aria-hidden />
                )}
              </a>
            )}
            <p className="embassy-scanner__caption">
              Tap the code or scan · Opens this application
            </p>
            <a href="#agency-apply" className="embassy-scanner__tap">
              Tap here to fill the form
              <span className="w-3.5 h-3.5 block">{Icons.arrowRight}</span>
            </a>
          </Motion>
        </div>
      </section>

      {/* What We Do */}
      <section id="what-we-do" className="embassy-services" aria-label="What we do">
        <Motion delay={40} className="embassy-pad embassy-services__head">
          <p className="embassy-services__kicker">{introTitle}</p>
          <h2>{servicesHeading}</h2>
        </Motion>

        <div className="embassy-services__list">
          {services.map(({ n, icon, title, body }, i) => (
            <Motion key={title} delay={50 + i * 45} className="embassy-service">
              <div className="embassy-service__meta">
                <span className="embassy-service__n">{n}</span>
                <span className="embassy-service__icon" aria-hidden>
                  {Icons[icon] || Icons.star}
                </span>
              </div>
              <div className="embassy-service__copy">
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </Motion>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="embassy-oath">
        <div className="embassy-oath__bg" aria-hidden>
          <img src={oathImage} alt="" />
          <div className="embassy-oath__veil" />
        </div>
        <Motion delay={60} className="embassy-oath__inner">
          <p className="embassy-oath__brand">A-TEAM AGENCY</p>
          <h2>{oathHeading}</h2>
          <p>{oathBody}</p>
          <div className="embassy-oath__actions">
            {applyCta}
            <Link to="/contact" className="embassy-link">
              Contact the team
            </Link>
          </div>
        </Motion>
      </section>
    </main>
  )
}

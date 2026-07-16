import { useMemo, useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Motion from '../components/Motion'
import { Icons } from '../components/Icons'
import { useContent } from '../cms/ContentContext'
import { apiFetch, readJsonResponse } from '../utils/api'
import { CONTACT_SUBMIT_LABEL, CONTACT_EMAIL, CONTACT_PHONE_WHATSAPP } from '../constants/brand'
import './Contact.css'

const FORMSPREE_CONTACT = ''

const topics = [
  {
    title: 'General Question',
    desc: 'Ask anything about the Dynasty',
    value: 'General Question',
  },
  {
    title: 'Creator Inquiry',
    desc: 'Join The A-Team Agency',
    value: "Creator Management Inquiry (La'Gwat Agency)",
  },
  {
    title: 'Press / Media',
    desc: 'Interviews & partnerships',
    value: 'Press / Media',
  },
  {
    title: 'Other',
    desc: 'Something else',
    value: 'Other',
  },
]

const fallbackLines = [
  { label: 'Call Us', value: `${CONTACT_PHONE_WHATSAPP} · WhatsApp only`, href: 'tel:+12542164240' },
  { label: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { label: 'Hours', value: '9am–6pm CT · Mon–Fri' },
]

export default function Contact() {
  const { collections, getPage, settings } = useContent()
  const [searchParams] = useSearchParams()
  const siteName = settings.siteName || ''
  const page = getPage('contact')
  const formHeading = page.formHeading || 'Write to us'
  const formSubtitle = page.formSubtitle || 'Two steps — pick a topic, then fill in your details. We reply within 1–2 business days.'
  const formSubmitLabel = page.formSubmitLabel || CONTACT_SUBMIT_LABEL
  const hqTitle = page.hqTitle || 'Headquarters'
  const hqCity = page.hqCity || 'Dallas, Texas'
  const hqDescription = page.hqDescription || "Dual lines across the US and Uganda — La'Gwat Agency."
  const lines = useMemo(() => {
    if (collections.contactLines?.length) {
      return collections.contactLines.map((l) => ({
        label: l.label,
        value: l.value,
        href: l.href || undefined,
      }))
    }
    return [
      ...(settings.phoneUS
        ? [{ label: 'US', value: settings.phoneUS, href: `tel:${settings.phoneUS.replace(/[^\d+]/g, '')}` }]
        : []),
      ...(settings.phoneUG
        ? [{ label: 'Uganda', value: settings.phoneUG, href: `tel:${settings.phoneUG.replace(/[^\d+]/g, '')}` }]
        : []),
      ...(settings.email
        ? [{ label: 'Email', value: settings.email, href: `mailto:${settings.email}` }]
        : []),
      ...fallbackLines.filter((l) => {
        if (l.label === 'US' && settings.phoneUS) return false
        if (l.label === 'Uganda' && settings.phoneUG) return false
        if (l.label === 'Email' && settings.email) return false
        return true
      }),
    ].slice(0, 4)
  }, [collections.contactLines, settings])
  const contactEmail = settings.email || CONTACT_EMAIL

  const initialTopic = searchParams.get('topic') === 'creator' ? 1 : 0
  const [topic, setTopic] = useState(initialTopic)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (searchParams.get('topic') === 'creator') setTopic(1)
  }, [searchParams])

  const selected = topics[topic]

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await apiFetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          topic: selected.value,
          reason: selected.value,
          message: form.message,
        }),
      })
      const data = await readJsonResponse(res)
      if (!res.ok) throw new Error(data.error || 'Failed to send message')

      if (FORMSPREE_CONTACT) {
        try {
          await fetch(FORMSPREE_CONTACT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: form.name,
              email: form.email,
              reason: selected.value,
              message: form.message,
            }),
          })
        } catch {
          /* optional mirror */
        }
      }

      setSubmitted(true)
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      setError(err.message || 'Failed to send message')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="contact-page">
      {/* Hero — Call Cut: full-bleed photo punched through the word */}
      <section className="contact-hero" aria-label={`Contact ${siteName}`}>
        <div className="contact-hero__media" aria-hidden>
          <img
            src={page.heroImage || '/photos/contact-message.jpg'}
            alt=""
            className="contact-hero__photo"
          />
          <div className="contact-hero__ember" />
          <div className="contact-hero__scan" />
          <div className="contact-hero__rings" aria-hidden>
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="contact-hero__punch" aria-hidden>
          <div className="contact-hero__punch-ink">
            <p className="contact-hero__punch-word">CONNECT</p>
          </div>
        </div>

        <div className="contact-hero__stage">
          <Motion delay={50} className="contact-hero__top">
            <p className="contact-hero__brand">{siteName}</p>
          </Motion>

          <div className="contact-hero__cut-spacer" aria-hidden />

          <Motion delay={140} className="contact-hero__foot">
            <h1 className="contact-hero__title">{page.heroTitle || 'Contact'}</h1>
            <p className="contact-hero__lede">
              {page.heroLede ||
                "Reach La'Gwat Agency — questions, creator applications, and press."}
            </p>
            <div className="contact-hero__actions">
              <a href="#contact-write" className="contact-btn">
                Write a message
                <span className="w-4 h-4 block">{Icons.arrowRight}</span>
              </a>
              <Link to="/agency#agency-apply" className="contact-text-link">
                Agency applications
              </Link>
            </div>
          </Motion>
        </div>

      </section>

      {/* Quick lines */}
      <section className="contact-lines" aria-label="Contact details">
        {lines.map(({ label, value, href }, i) => (
          <Motion key={label} delay={30 + i * 35} className="contact-lines__cell">
            <p className="contact-lines__label">{label}</p>
            <p className="contact-lines__value">
              {href ? <a href={href}>{value}</a> : value}
            </p>
          </Motion>
        ))}
      </section>

      {/* Clear two-step form */}
      <section id="contact-write" className="contact-write">
        <Motion delay={40} className="contact-pad contact-write__head">
          <h2 className="contact-write__heading">
            {formHeading}
          </h2>
          <p className="contact-write__sub">
            {formSubtitle}
          </p>
        </Motion>

        <div className="contact-pad">
          <Motion delay={70} className="contact-form-shell">
            {submitted ? (
              <div className="contact-success">
                <div className="contact-success__icon">
                  <span className="w-7 h-7 block">{Icons.check}</span>
                </div>
                <p className="contact-success__title">Message sent</p>
                <p className="contact-success__copy">Thanks — we&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form" noValidate={false}>
                {/* Step 1 */}
                <fieldset className="contact-form__step">
                  <legend className="contact-form__legend">
                    <span className="contact-form__step-n">1</span>
                    What is this about?
                  </legend>
                  <div className="contact-topics" role="radiogroup" aria-label="Message topic">
                    {topics.map((t, i) => (
                      <button
                        key={t.value}
                        type="button"
                        role="radio"
                        aria-checked={i === topic}
                        className={`contact-topic ${i === topic ? 'is-selected' : ''}`}
                        onClick={() => setTopic(i)}
                      >
                        <span className="contact-topic__check" aria-hidden>
                          {i === topic ? <span className="w-3 h-3 block">{Icons.check}</span> : null}
                        </span>
                        <span className="contact-topic__text">
                          <strong>{t.title}</strong>
                          <span>{t.desc}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Step 2 */}
                <fieldset className="contact-form__step">
                  <legend className="contact-form__legend">
                    <span className="contact-form__step-n">2</span>
                    Your message
                    <em className="contact-form__topic-tag">{selected.title}</em>
                  </legend>

                  <div className="contact-fields">
                    <div className="contact-fields__row">
                      <div className="contact-field">
                        <label htmlFor="contact-name">
                          Full name <abbr title="required">*</abbr>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Jane Doe"
                          autoComplete="name"
                        />
                      </div>
                      <div className="contact-field">
                        <label htmlFor="contact-email">
                          Email <abbr title="required">*</abbr>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="you@example.com"
                          autoComplete="email"
                        />
                      </div>
                    </div>

                    <div className="contact-field">
                      <label htmlFor="contact-message">
                        Message <abbr title="required">*</abbr>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="Tell us what you need help with…"
                      />
                    </div>
                  </div>
                </fieldset>

                <div className="contact-form__footer">
                  {error ? <p className="contact-form__error">{error}</p> : null}
                  <p className="contact-form__hint">
                    Your message goes to the {siteName || 'Dynasty'} team inbox.
                  </p>
                  <button type="submit" disabled={submitting} className="contact-btn contact-btn--wide">
                    {submitting ? 'Sending…' : formSubmitLabel}
                    <span className="w-4 h-4 block">{Icons.arrowRight}</span>
                  </button>
                </div>
              </form>
            )}
          </Motion>
        </div>
      </section>

      {/* Map / HQ */}
      <section className="contact-hq" aria-label="Location">
        <iframe
          title={`${siteName} — Dallas, Texas`}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107440.60493614768!2d-96.844958!3d32.78761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c197d8735a3a9%3A0x7e7a2b70e7a6a2a7!2sDallas%2C%20TX!5e0!3m2!1sen!2sus!4v1"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="contact-hq__veil" aria-hidden />
        <Motion delay={50} className="contact-hq__panel">
          <p className="contact-hq__label">{hqTitle}</p>
          <h2>{hqCity}</h2>
          <p>{hqDescription}</p>
          <div className="contact-hq__links">
            <a href="tel:+14696641195">+1 (469) 664-1195</a>
            <a href="tel:+256200947070">+256-200-947-070</a>
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </div>
        </Motion>
      </section>
    </main>
  )
}

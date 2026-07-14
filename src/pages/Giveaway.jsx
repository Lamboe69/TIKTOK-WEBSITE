import { useState } from 'react'
import Motion from '../components/Motion'
import { Icons } from '../components/Icons'
import { useContent } from '../cms/ContentContext'
import './morePages.css'

const steps = [
  {
    n: '01',
    title: 'Watch live',
    desc: 'King Maker announces the giveaway code during the livestream.',
  },
  {
    n: '02',
    title: 'Enter details',
    desc: 'Drop the code and your phone number in the claim vault below.',
  },
  {
    n: '03',
    title: 'Receive reward',
    desc: 'We process claims and deliver airtime or prizes directly.',
  },
]

export default function Giveaway() {
  const { getPage, settings } = useContent()
  const siteName = settings.siteName || 'KM DYNASTY'
  const page = getPage('giveaway')
  const contactEmail = settings.email || 'lagwatinc@gmail.com'

  const vaultTitle = page.vaultTitle || 'Claim vault'
  const vaultSubtitle = page.vaultSubtitle || "Code is announced during King Maker's livestream."
  const [code, setCode] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`${siteName} - Giveaway Claim`)
    const body = encodeURIComponent(`Code: ${code}\nPhone: ${phone}`)
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <main className="give-page">
      <section className="give-hero" aria-label="Claim your reward">
        <div className="give-hero__media" aria-hidden>
          <img src={page.heroImage || '/photos/giveaway-gift.jpg'} alt="" />
          <div className="give-hero__veil" />
          <div className="give-hero__burst" />
        </div>
        <div className="give-hero__core">
          <Motion delay={60}>
            <p className="give-hero__brand">{page.heroBrand || siteName}</p>
            <h1 className="give-hero__title">{page.heroTitle || 'Claim Your Reward'}</h1>
            <p className="give-hero__lede">
              {page.heroLede ||
                'Enter the livestream code and your phone number to claim free airtime or your prize.'}
            </p>
            <div className="give-hero__actions">
              <a href="#giveaway-claim" className="mp-cta">
                Enter code
                <span className="w-4 h-4 block">{Icons.arrowRight}</span>
              </a>
            </div>
          </Motion>
        </div>
      </section>

      <section className="give-steps" aria-label="How claiming works">
        <div className="give-steps__rail afg-pad">
          {steps.map(({ n, title, desc }, i) => (
            <Motion key={n} delay={40 + i * 50} className="give-step">
              <span className="give-step__n">{n}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </Motion>
          ))}
        </div>
      </section>

      <section id="giveaway-claim" className="give-vault afg-pad">
        <div className="give-vault__shell">
          <Motion delay={50} className="give-vault__head">
            <h2>{vaultTitle}</h2>
            <p>{vaultSubtitle}</p>
          </Motion>

          <Motion delay={90}>
            {submitted ? (
              <div className="give-done">
                <div className="give-done__icon">
                  <span className="w-7 h-7 block">{Icons.check}</span>
                </div>
                <h3>Claim submitted</h3>
                <p>We&apos;ll process your reward and get back to you shortly.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false)
                    setCode('')
                    setPhone('')
                  }}
                >
                  Submit another claim
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="give-form">
                <div className="give-field give-field--code">
                  <label htmlFor="give-code">Giveaway code</label>
                  <input
                    id="give-code"
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="DYNASTY2026"
                    autoComplete="off"
                  />
                </div>
                <div className="give-field">
                  <label htmlFor="give-phone">Phone number</label>
                  <input
                    id="give-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+256 700 000 000"
                    autoComplete="tel"
                  />
                </div>
                <button type="submit" className="mp-cta" style={{ width: '100%', justifyContent: 'center' }}>
                  Claim reward
                  <span className="w-4 h-4 block">{Icons.gift}</span>
                </button>
              </form>
            )}
          </Motion>
        </div>
      </section>
    </main>
  )
}

import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Motion from '../components/Motion'
import {
  tiers as fallbackTiers,
  schedule as fallbackSchedule,
  terms as fallbackTerms,
} from '../data/masterclass'
import { Icons } from '../components/Icons'
import { useContent } from '../cms/ContentContext'
import { normalizeMasterclassTiers } from '../cms/normalize'
import MasterclassCheckout from '../components/MasterclassCheckout'
import './Masterclass.css'

const defaultTierMeta = [
  { img: '/photos/team-dallas.jpg', accent: '#C4A0FF', short: 'Consult' },
  { img: '/team/maker.jpg', accent: '#FF6B1A', short: 'Master' },
  { img: '/team/mufasa.jpg', accent: '#E8B94A', short: 'Mentor' },
]

const weeks = [
  { n: '01', title: 'Monetisation', copy: 'Turn attention into revenue systems that last.' },
  { n: '02', title: 'Community', copy: 'Build a room that fights with you — not against you.' },
  { n: '03', title: 'Live Systems', copy: 'Ops, pacing, and battle choreography under fire.' },
  { n: '04', title: 'Mindset', copy: 'Pressure, prayer, and the discipline of consistency.' },
  { n: '05', title: 'Inner Circle', copy: 'Enter the Dynasty network with a badge that means something.' },
]

export default function Masterclass() {
  const { collections, getPage, settings } = useContent()
  const siteName = settings.siteName || ''
  const page = getPage('masterclass')
  const tiers = useMemo(() => {
    const fromCms = normalizeMasterclassTiers(collections.masterclassTiers || [])
    return fromCms.length ? fromCms : normalizeMasterclassTiers(fallbackTiers)
  }, [collections.masterclassTiers])
  const schedule = collections.masterclassMeta?.day
    ? collections.masterclassMeta
    : fallbackSchedule
  const terms = useMemo(() => {
    const fromCms = (collections.masterclassTerms || [])
      .map((t) => (typeof t === 'string' ? t : t.text))
      .filter(Boolean)
    return fromCms.length ? fromCms : fallbackTerms
  }, [collections.masterclassTerms])

  const curriculumKicker = page.curriculumKicker || 'The Five Weeks'
  const curriculumSubtitle = page.curriculumSubtitle || 'A curriculum built for the arena'
  const tiersKicker = page.tiersKicker || 'Choose your fire'
  const tiersTitle = page.tiersTitle || 'Three doors into the studio'
  const tiersHint = page.tiersHint || 'Hover a path · claim your seat'
  const termsKicker = page.termsKicker || 'Before you enrol'
  const termsTitle = page.termsTitle || 'House rules'
  const termsImage = page.termsImage || '/photos/king-maker-live.jpg'
  const mcClosingKicker = page.closingKicker || 'The Invitation'
  const mcClosingTitle = page.closingTitle || 'Start the transformation'
  const mcClosingBody = page.closingBody || "Questions about which path fits? Reach out — we'll help you choose."
  const mcClosingImage = page.closingImage || '/photos/champion-crowning.jpg'

  const [active, setActive] = useState(Math.min(1, Math.max(0, tiers.length - 1)))
  const [week, setWeek] = useState(0)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const safeActive = Math.min(active, Math.max(0, tiers.length - 1))
  const tier = tiers[safeActive] || tiers[0]
  const meta = {
    ...defaultTierMeta[safeActive % defaultTierMeta.length],
    ...(tier?.img ? { img: tier.img } : {}),
    ...(tier?.accent ? { accent: tier.accent } : {}),
    ...(tier?.short ? { short: tier.short } : {}),
  }

  if (!tier) return null

  return (
    <main className="mc-page">
      {checkoutOpen ? (
        <MasterclassCheckout
          tier={tier}
          accent={meta.accent}
          onClose={() => setCheckoutOpen(false)}
        />
      ) : null}
      {/* ═══ Hero — Five Flames ═══ */}
      <section className="mc-hero" aria-label={`${siteName} Masterclass`}>
        <div className="mc-hero__media" aria-hidden>
          <img
            src={page.heroImage || '/photos/learning-class.jpg'}
            alt=""
            className="mc-hero__photo"
          />
          <div className="mc-hero__veil" />
        </div>

        <div className="mc-hero__flames" aria-hidden>
          {weeks.map((w, i) => (
            <div
              key={w.n}
              className="mc-hero__flame"
              style={{ animationDelay: `${i * 0.35}s` }}
            >
              <span className="mc-hero__flame-beam" />
              <span className="mc-hero__flame-label">
                <em>{w.n}</em>
                {w.title}
              </span>
            </div>
          ))}
        </div>

        <div className="mc-hero__core">
          <Motion delay={50} className="mc-hero__copy">
            <p className="mc-hero__brand">{siteName}</p>
            <h1 className="mc-hero__title">{page.heroTitle || 'Masterclass'}</h1>
            <p className="mc-hero__lede">
              {page.heroLede ||
                'Five live Saturdays with King Maker — monetisation, community, mindset, and the inner circle.'}
            </p>
            <div className="mc-hero__actions">
              <a href="#mc-tiers" className="mc-cta">
                Choose your path
                <span className="w-4 h-4 block">{Icons.arrowRight}</span>
              </a>
              <a href="#mc-curriculum" className="mc-link">
                Walk the five weeks
              </a>
            </div>
            <p className="mc-hero__session">
              {schedule.day}
              <span aria-hidden> · </span>
              {schedule.time}
              <span aria-hidden> · </span>
              From {tiers[1]?.price || tiers[0]?.price || '$500'}
            </p>
          </Motion>
        </div>
      </section>

      {/* ═══ Curriculum ═══ */}
      <section id="mc-curriculum" className="mc-curriculum">
        <div className="mc-pad mc-curriculum__intro">
          <Motion delay={40}>
            <p className="sec-kicker mb-2">{curriculumKicker}</p>
            <h2 className="mc-heading font-display font-bold text-ivory tracking-tight">
              {curriculumSubtitle}
            </h2>
          </Motion>
        </div>

        <div className="mc-weeks">
          <div className="mc-weeks__rail" role="tablist" aria-label="Masterclass weeks">
            {weeks.map((w, i) => (
              <button
                key={w.n}
                type="button"
                role="tab"
                aria-selected={week === i}
                className={`mc-weeks__btn ${week === i ? 'is-active' : ''}`}
                onClick={() => setWeek(i)}
                onMouseEnter={() => setWeek(i)}
              >
                <span className="mc-weeks__n font-display">{w.n}</span>
                <span className="mc-weeks__t">{w.title}</span>
              </button>
            ))}
          </div>

          <div className="mc-weeks__stage mc-pad">
            <Motion key={weeks[week].n} delay={40}>
              <p className="mc-weeks__kicker">Week {weeks[week].n}</p>
              <h3 className="mc-weeks__title font-display font-bold text-ivory">
                {weeks[week].title}
              </h3>
              <p className="mc-weeks__copy">{weeks[week].copy}</p>
              <p className="mc-weeks__session">
                {schedule.day} · {schedule.time}
              </p>
            </Motion>
          </div>
        </div>
      </section>

      {/* ═══ Tiers — interactive studio ═══ */}
      <section id="mc-tiers" className="mc-tiers">
        <div className="mc-pad mc-tiers__intro">
          <Motion delay={40}>
            <p className="sec-kicker mb-2">{tiersKicker}</p>
            <div className="mc-tiers__intro-row">
              <h2 className="mc-heading font-display font-bold text-ivory tracking-tight">
                {tiersTitle}
              </h2>
              <p className="mc-tiers__hint">{tiersHint}</p>
            </div>
          </Motion>
        </div>

        <div className="mc-ribbon" role="tablist" aria-label="Programmes">
          {tiers.map((t, i) => {
            const m = {
              ...defaultTierMeta[i % defaultTierMeta.length],
              ...(t.img ? { img: t.img } : {}),
              ...(t.accent ? { accent: t.accent } : {}),
              ...(t.short ? { short: t.short } : {}),
            }
            return (
            <button
              key={t.name}
              type="button"
              role="tab"
              aria-selected={safeActive === i}
              className={`mc-ribbon__btn ${safeActive === i ? 'is-active' : ''}`}
              style={{ ['--mc-accent']: m.accent }}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
            >
              <span className="mc-ribbon__short">{m.short}</span>
              <span className="mc-ribbon__price font-display">{t.price}</span>
              {t.badge && <span className="mc-ribbon__badge">{t.badge}</span>}
            </button>
            )
          })}
        </div>

        <div className="mc-studio">
          <div className="mc-studio__visual">
            {tiers.map((t, i) => {
              const m = {
                ...defaultTierMeta[i % defaultTierMeta.length],
                ...(t.img ? { img: t.img } : {}),
              }
              return (
              <img
                key={`${t.name}-${m.img}`}
                src={m.img}
                alt={i === safeActive ? t.name : ''}
                aria-hidden={i !== safeActive}
                className={`mc-studio__img ${i === safeActive ? 'is-on' : ''}`}
              />
              )
            })}
            <div className="mc-studio__veil" />
            <span
              className="mc-studio__echo font-display"
              style={{ WebkitTextStrokeColor: `${meta.accent}55` }}
              aria-hidden
            >
              {meta.short.toUpperCase()}
            </span>

            <div className="mc-studio__copy mc-pad">
              <div key={tier.name} className="mc-studio__copy-inner">
                {tier.badge && (
                  <p className="mc-studio__badge" style={{ color: meta.accent }}>
                    {tier.badge}
                  </p>
                )}
                <h3 className="mc-studio__name font-display font-bold text-ivory">
                  {tier.name}
                </h3>
                <p className="mc-studio__duration">{tier.duration}</p>

                <div className="mc-studio__price-row">
                  <span className="mc-studio__price font-display">{tier.price}</span>
                  {tier.originalPrice && (
                    <span className="mc-studio__was">{tier.originalPrice}</span>
                  )}
                </div>

                <ul className="mc-studio__features">
                  {(tier.features || []).map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>

                <button
                  type="button"
                  className="mc-cta"
                  style={{ background: `linear-gradient(135deg, ${meta.accent}, #CC5200)` }}
                  onClick={() => setCheckoutOpen(true)}
                >
                  {tier.cta}
                  <span className="w-4 h-4 block">{Icons.arrowRight}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Terms ═══ */}
      <section className="mc-terms">
        <div className="mc-terms__grid">
          <div className="mc-terms__media">
            <img src={termsImage} alt="" aria-hidden />
          </div>
          <div className="mc-terms__copy mc-pad">
            <Motion delay={50}>
              <p className="sec-kicker mb-3">{termsKicker}</p>
              <h2 className="mc-heading font-display font-bold text-ivory tracking-tight mb-6">
                {termsTitle}
              </h2>
              <div className="mc-terms__list">
                {terms.map((t, i) => (
                  <div key={typeof t === 'string' ? t : t.id || i} className="mc-terms__row">
                    <span className="mc-terms__n font-display">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p>{typeof t === 'string' ? t : t.text}</p>
                  </div>
                ))}
              </div>
            </Motion>
          </div>
        </div>
      </section>

      {/* ═══ Close ═══ */}
      <section className="mc-close">
        <img src={mcClosingImage} alt="" className="mc-close__img" aria-hidden />
        <div className="mc-close__veil" />
        <div className="mc-close__content mc-pad">
          <Motion delay={60}>
            <p className="sec-kicker mb-4">{mcClosingKicker}</p>
            <h2 className="mc-close__title font-display font-bold text-ivory tracking-tight">
              {mcClosingTitle}
            </h2>
            <p className="mc-close__lede">
              {mcClosingBody}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}>
              <button type="button" className="mc-cta" onClick={() => setCheckoutOpen(true)}>
                Enrol with PayPal
                <span className="w-4 h-4 block">{Icons.arrowRight}</span>
              </button>
              <Link to="/contact" className="mc-link">
                Questions? Contact us
              </Link>
            </div>
          </Motion>
        </div>
      </section>
    </main>
  )
}

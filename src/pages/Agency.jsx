import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Motion from '../components/Motion'
import fallbackRegions from '../data/agencyRegions'
import { Icons } from '../components/Icons'
import { useContent } from '../cms/ContentContext'
import { normalizeAgencyRegions } from '../cms/normalize'
import './Agency.css'

const fallbackImages = [
  '/photos/community-meetup.jpg',
  '/photos/king-maker-live.jpg',
  '/battles-photos/country.jpg',
]

const fallbackCodes = ['NA-01', 'UK-02', 'EA-03']

const meridians = [
  { n: 'I', title: 'Box Battle Access', desc: 'Priority placement in official and special box battles.' },
  { n: 'II', title: 'Inner Circle', desc: 'Direct access to the Dynasty community network.' },
  { n: 'III', title: 'Masterclass', desc: 'Exclusive training and mentorship under King Maker.' },
  { n: 'IV', title: 'Growth Support', desc: 'Personalised strategy for your live presence.' },
]

export default function Agency() {
  const { collections, getPage, settings } = useContent()
  const siteName = settings.siteName || 'KM DYNASTY'
  const page = getPage('agency')
  const atlasHeading = page.atlasHeading || 'The Atlas'
  const atlasDescription = page.atlasDescription || 'Select your embassy. Walk the corridor. Apply for citizenship under the Dynasty banner.'
  const oathHeading = page.oathHeading || 'Ready to represent?'
  const oathBody = page.oathBody || 'Tell us who you are, what you create, and which embassy you claim. Applications move through Contact.'
  const oathImage = page.oathImage || '/battles-photos/daily-godsent.jpg'
  const regions = useMemo(() => {
    const fromCms = normalizeAgencyRegions(collections.agencyRegions || [])
    return fromCms.length ? fromCms : fallbackRegions
  }, [collections.agencyRegions])
  const [active, setActive] = useState(0)
  const safeActive = Math.min(active, Math.max(0, regions.length - 1))
  const region = regions[safeActive]
  if (!region) return null

  return (
    <main className="embassy-page">
      {/* Hero — Meridian Throne: full-bleed + orbital atlas + brand core */}
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

        <svg
          className="embassy-hero__orbs"
          viewBox="0 0 1000 1000"
          aria-hidden
        >
          <ellipse className="embassy-hero__orb embassy-hero__orb--a" cx="500" cy="500" rx="220" ry="320" />
          <ellipse className="embassy-hero__orb embassy-hero__orb--b" cx="500" cy="500" rx="340" ry="200" />
          <ellipse className="embassy-hero__orb embassy-hero__orb--c" cx="500" cy="500" rx="420" ry="420" />
          <circle className="embassy-hero__orb-core" cx="500" cy="500" r="6" />
        </svg>

        <div className="embassy-hero__core">
          <Motion delay={60} className="embassy-hero__lockup">
            <p className="embassy-hero__brand">{page.heroBrand || siteName}</p>
            <h1 className="embassy-hero__title">{page.heroTitle || 'Agency'}</h1>
            <p className="embassy-hero__lede">
              {page.heroLede ||
                'Three embassies. One crown. Claim your territory and represent the Dynasty where you live.'}
            </p>
            <div className="embassy-hero__actions">
              <a href="#embassy-atlas" className="embassy-cta">
                Choose embassy
                <span className="w-4 h-4 block">{Icons.mapPin}</span>
              </a>
              <Link to="/contact" className="embassy-link">
                Apply directly
              </Link>
            </div>
            <p className="embassy-hero__territories">
              {regions.map((r, i) => (
                <span key={r.id || r.name}>
                  {i > 0 ? <span aria-hidden> · </span> : null}
                  {r.name}
                </span>
              ))}
            </p>
          </Motion>
        </div>
      </section>

      {/* Meridians — privileges */}
      <section className="embassy-meridians" aria-label="Agency privileges">
        {meridians.map(({ n, title, desc }, i) => (
          <Motion key={title} delay={40 + i * 50} className="embassy-meridian">
            <span className="embassy-meridian__n">{n}</span>
            <h3>{title}</h3>
            <p>{desc}</p>
          </Motion>
        ))}
      </section>

      {/* Atlas — interactive corridor */}
      <section id="embassy-atlas" className="embassy-atlas">
        <Motion delay={40} className="embassy-pad embassy-atlas__head">
          <h2>{atlasHeading}</h2>
          <p>{atlasDescription}</p>
        </Motion>

        <Motion delay={80} className="embassy-pad embassy-atlas__body">
          <div className="embassy-corridor">
            <div className="embassy-tabs" role="tablist" aria-label="Agency regions">
              {regions.map((r, i) => (
                <button
                  key={r.id || r.name}
                  type="button"
                  role="tab"
                  aria-selected={i === safeActive}
                  className={`embassy-tab ${i === safeActive ? 'is-active' : ''}`}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                >
                  <span className="embassy-tab__flag" aria-hidden>{r.flag}</span>
                  <span className="embassy-tab__name">{r.name}</span>
                </button>
              ))}
            </div>

            <div className="embassy-stage">
              {regions.map((r, i) => (
                <img
                  key={r.id || r.name}
                  src={r.img || fallbackImages[i % fallbackImages.length]}
                  alt={i === safeActive ? r.name : ''}
                  aria-hidden={i !== safeActive}
                  className={`embassy-stage__img ${i === safeActive ? 'is-on' : ''}`}
                />
              ))}
              <div className="embassy-stage__veil" aria-hidden />

              <div key={region.name} className="embassy-stage__panel">
                <p className="embassy-stage__code">
                  {region.code || fallbackCodes[safeActive % fallbackCodes.length]} · Embassy
                </p>
                <h3 className="embassy-stage__title">{region.name}</h3>
                <p className="embassy-stage__tag">{region.tagline}</p>
                <ul className="embassy-stage__benefits">
                  {(region.benefits || []).map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <p className="embassy-stage__desc">{region.description}</p>
                <Link to="/contact" className="embassy-cta">
                  Apply for {region.name}
                  <span className="w-4 h-4 block">{Icons.arrowRight}</span>
                </Link>
              </div>
            </div>
          </div>
        </Motion>
      </section>

      {/* Oath */}
      <section className="embassy-oath">
        <div className="embassy-oath__bg" aria-hidden>
          <img src={oathImage} alt="" />
          <div className="embassy-oath__veil" />
        </div>
        <Motion delay={60} className="embassy-oath__inner">
          <p className="embassy-oath__brand">{siteName}</p>
          <h2>{oathHeading}</h2>
          <p>{oathBody}</p>
          <Link to="/contact" className="embassy-cta">
            Submit application
            <span className="w-4 h-4 block">{Icons.arrowRight}</span>
          </Link>
        </Motion>
      </section>
    </main>
  )
}

import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Icons } from '../Icons'
import Motion from '../Motion'
import fallbackGifters from '../../data/topGifters'
import fallbackFans from '../../data/topFans'
import { useContent } from '../../cms/ContentContext'
import { handleDonateSubmit, useToast } from '../ToastContext'
import { normalizePeoplePhotos } from '../../cms/normalize'
import { normalizeSectionLayout } from '../../cms/sectionLayouts'

const MAX_HONOR_PEOPLE = 5
const GIFTERS_ACCENT = '#FF6B1A'
const FANS_ACCENT = '#E8B94A'

function HonorCard({ person, rank, accent }) {
  return (
    <a
      href={person.url}
      target="_blank"
      rel="noopener noreferrer"
      className="honor-card group"
      style={{ '--honor-accent': accent }}
    >
      <div className="honor-card__rank">
        <span className="honor-card__rank-num">{String(rank).padStart(2, '0')}</span>
      </div>
      <div className="honor-card__media">
        <img src={person.photo} alt={person.name} className="honor-card__photo" loading="lazy" />
        <div className="honor-card__shade" />
      </div>
      <div className="honor-card__body">
        <p className="honor-card__role">{person.role}</p>
        <p className="honor-card__name">{person.name}</p>
        <p className="honor-card__handle">{person.handle}</p>
      </div>
    </a>
  )
}

function HonorMarquee({ people, direction, accent, label, kicker }) {
  const items = people.slice(0, MAX_HONOR_PEOPLE)
  if (!items.length) return null

  const track = [...items, ...items, ...items]

  return (
    <div className={`honor-marquee honor-marquee--${direction}`} style={{ '--honor-accent': accent }}>
      <div className="honor-marquee__head">
        <div>
          <p className="honor-marquee__kicker">{kicker}</p>
          <h3 className="honor-marquee__title">{label}</h3>
        </div>
        <span className="honor-marquee__flow" aria-hidden>
          {direction === 'left' ? '←' : '→'}
        </span>
      </div>
      <div className="honor-marquee__viewport">
        <div className="honor-marquee__track">
          {track.map((person, i) => (
            <HonorCard
              key={`${direction}-${person.handle}-${i}`}
              person={person}
              rank={(i % items.length) + 1}
              accent={accent}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function HonorDonatePanel({ title, body, siteName, paypalEmail, onDonateUnavailable }) {
  return (
    <aside className="honor-side honor-side--donate">
      <p className="honor-side__kicker">Support</p>
      <h3 className="honor-side__title">{title}</h3>
      <p className="honor-side__body">{body}</p>
      <form
        action="https://www.paypal.com/donate"
        method="post"
        target="_blank"
        className="honor-side__form"
        onSubmit={(e) => handleDonateSubmit(e, paypalEmail, siteName, onDonateUnavailable)}
      >
        <input type="hidden" name="business" value={paypalEmail} />
        <input type="hidden" name="no_recurring" value="0" />
        <input type="hidden" name="item_name" value={`${siteName} Donation`} />
        <input type="hidden" name="currency_code" value="USD" />
        <input type="hidden" name="amount" value="" />
        <button type="submit" className="honor-side__btn honor-side__btn--donate">
          <span className="honor-side__btn-icon">{Icons.heart}</span>
          Donate via PayPal
        </button>
      </form>
    </aside>
  )
}

function HonorCharityPanel() {
  return (
    <aside className="honor-side honor-side--charity">
      <p className="honor-side__kicker">Giving Back</p>
      <h3 className="honor-side__title">Charity Support</h3>
      <p className="honor-side__body">
        Need help? Share your story and apply for charity support from the Dynasty.
      </p>
      <Link to="/charity#charity-apply" className="honor-side__btn honor-side__btn--charity">
        <span className="honor-side__btn-icon">{Icons.arrowRight}</span>
        Apply for Charity
      </Link>
    </aside>
  )
}

function RecognitionHead({ kicker, title }) {
  return (
    <div className="max-w-7xl mx-auto text-center">
      <Motion delay={40}>
        <p className="sec-kicker mb-2">{kicker}</p>
        <h2
          className="font-display font-bold text-ivory leading-none tracking-tight"
          style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.5rem)' }}
        >
          {title}{' '}
          <span className="text-gradient">gifters & fans</span>
        </h2>
      </Motion>
    </div>
  )
}

export default function CommunityRecognition() {
  const { collections, settings, getPage } = useContent()
  const { showDonateComingSoon } = useToast()
  const homePage = getPage('home')
  const layout = normalizeSectionLayout('recognitionLayout', homePage.recognitionLayout)
  const siteName = settings.siteName || ''
  const paypalEmail = settings.paypalEmail || ''

  const topGifters = useMemo(() => {
    const fromCms = normalizePeoplePhotos(collections.topGifters || [])
    return fromCms.length ? fromCms : normalizePeoplePhotos(fallbackGifters)
  }, [collections.topGifters])

  const topFans = useMemo(() => {
    const fromCms = normalizePeoplePhotos(collections.topFans || [])
    return fromCms.length ? fromCms : normalizePeoplePhotos(fallbackFans)
  }, [collections.topFans])

  const recognitionTitle = homePage.recognitionTitle || 'Honor the'
  const recognitionKicker = homePage.recognitionKicker || 'Kingdom Family'
  const recognitionMissionTitle = homePage.recognitionMissionTitle || 'Support the mission'
  const recognitionMissionBody =
    homePage.recognitionMissionBody || 'Expand the Dynasty. Lift creators. Fund what matters.'

  const sectionClass = `relative overflow-hidden home-band-glow home-band-sep honor-section${layout !== 'marquee' ? ` recognition--${layout}` : ''}`

  if (layout === 'throne') {
    return (
      <section className={sectionClass}>
        <div className="relative z-10 px-5 sm:px-8 pt-10 sm:pt-12 pb-4">
          <RecognitionHead kicker={recognitionKicker} title={recognitionTitle} />
        </div>
        <div className="throne-room">
          <div className="throne-side">
            <p className="honor-marquee__kicker" style={{ color: GIFTERS_ACCENT }}>Royal supporters</p>
            <h3 className="honor-marquee__title mb-4">Top Gifters</h3>
            <div className="throne-side__seat">
              {topGifters.slice(0, MAX_HONOR_PEOPLE).map((person, i) => (
                <a key={person.handle} href={person.url} target="_blank" rel="noopener noreferrer" className="throne-card" style={{ '--honor-accent': GIFTERS_ACCENT }}>
                  <img src={person.photo} alt={person.name} />
                  <p className="text-xs font-bold text-ivory mt-2">{person.name}</p>
                  <p className="text-[10px] text-white/50">{String(i + 1).padStart(2, '0')}</p>
                </a>
              ))}
            </div>
          </div>
          <div className="throne-side throne-side--fans">
            <p className="honor-marquee__kicker" style={{ color: FANS_ACCENT }}>Loyal voices</p>
            <h3 className="honor-marquee__title mb-4">Top Fans</h3>
            <div className="throne-side__seat">
              {topFans.slice(0, MAX_HONOR_PEOPLE).map((person, i) => (
                <a key={person.handle} href={person.url} target="_blank" rel="noopener noreferrer" className="throne-card" style={{ '--honor-accent': FANS_ACCENT }}>
                  <img src={person.photo} alt={person.name} />
                  <p className="text-xs font-bold text-ivory mt-2">{person.name}</p>
                  <p className="text-[10px] text-white/50">{String(i + 1).padStart(2, '0')}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="honor-panels">
          <HonorDonatePanel
            title={recognitionMissionTitle}
            body={recognitionMissionBody}
            siteName={siteName}
            paypalEmail={paypalEmail}
            onDonateUnavailable={showDonateComingSoon}
          />
          <HonorCharityPanel />
        </div>
      </section>
    )
  }

  if (layout === 'tapestry') {
    const allPeople = [
      ...topGifters.slice(0, MAX_HONOR_PEOPLE).map((p) => ({ ...p, accent: GIFTERS_ACCENT })),
      ...topFans.slice(0, MAX_HONOR_PEOPLE).map((p) => ({ ...p, accent: FANS_ACCENT })),
    ]
    return (
      <section className={sectionClass}>
        <div className="relative z-10 px-5 sm:px-8 pt-10 sm:pt-12 pb-4">
          <RecognitionHead kicker={recognitionKicker} title={recognitionTitle} />
        </div>
        <div className="tapestry-grid">
          {allPeople.map((person, i) => (
            <a key={`${person.handle}-${i}`} href={person.url} target="_blank" rel="noopener noreferrer" className="tapestry-tile">
              <img src={person.photo} alt={person.name} loading="lazy" />
              <div className="tapestry-tile__overlay">
                <p style={{ color: person.accent, fontSize: '8px', fontWeight: 700, letterSpacing: '0.15em' }}>{person.role}</p>
                <p className="font-display font-bold">{person.name}</p>
              </div>
            </a>
          ))}
        </div>
        <div className="honor-panels">
          <HonorDonatePanel
            title={recognitionMissionTitle}
            body={recognitionMissionBody}
            siteName={siteName}
            paypalEmail={paypalEmail}
            onDonateUnavailable={showDonateComingSoon}
          />
          <HonorCharityPanel />
        </div>
      </section>
    )
  }

  if (layout === 'corridor') {
    const gifterRows = [topGifters.slice(0, 3), topGifters.slice(0, 3), topGifters.slice(0, 3)]
    const fanRows = [topFans.slice(0, 3), topFans.slice(0, 3), topFans.slice(0, 3)]
    return (
      <section className={sectionClass}>
        <div className="relative z-10 px-5 sm:px-8 pt-10 sm:pt-12 pb-4">
          <RecognitionHead kicker={recognitionKicker} title={recognitionTitle} />
        </div>
        <div className="corridor-hall">
          <p className="text-center sec-kicker mb-4" style={{ color: GIFTERS_ACCENT }}>Top Gifters</p>
          {gifterRows.map((row, depth) => (
            <div key={`g-${depth}`} className="corridor-row" style={{ '--corridor-depth': depth }}>
              {row.map((person, i) => (
                <div key={`${person.handle}-${depth}-${i}`} className="corridor-card">
                  <HonorCard person={person} rank={i + 1} accent={GIFTERS_ACCENT} />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="honor-band honor-band--gifters">
          <HonorDonatePanel
            title={recognitionMissionTitle}
            body={recognitionMissionBody}
            siteName={siteName}
            paypalEmail={paypalEmail}
            onDonateUnavailable={showDonateComingSoon}
          />
        </div>
        <div className="corridor-hall">
          <p className="text-center sec-kicker mb-4" style={{ color: FANS_ACCENT }}>Top Fans</p>
          {fanRows.map((row, depth) => (
            <div key={`f-${depth}`} className="corridor-row" style={{ '--corridor-depth': depth }}>
              {row.map((person, i) => (
                <div key={`${person.handle}-${depth}-${i}`} className="corridor-card">
                  <HonorCard person={person} rank={i + 1} accent={FANS_ACCENT} />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="honor-band honor-band--fans">
          <HonorCharityPanel />
        </div>
      </section>
    )
  }

  return (
    <section className={sectionClass}>
      <div className="relative z-10 px-5 sm:px-8 pt-10 sm:pt-12 pb-4">
        <RecognitionHead kicker={recognitionKicker} title={recognitionTitle} />
      </div>

      <div className="honor-band honor-band--gifters">
        <div className="honor-band__scroll">
          <HonorMarquee
            people={topGifters}
            direction="left"
            accent={GIFTERS_ACCENT}
            label="Top Gifters"
            kicker="Royal supporters"
          />
        </div>
        <HonorDonatePanel
          title={recognitionMissionTitle}
          body={recognitionMissionBody}
          siteName={siteName}
          paypalEmail={paypalEmail}
          onDonateUnavailable={showDonateComingSoon}
        />
      </div>

      <div className="honor-band honor-band--fans">
        <HonorCharityPanel />
        <div className="honor-band__scroll">
          <HonorMarquee
            people={topFans}
            direction="right"
            accent={FANS_ACCENT}
            label="Top Fans"
            kicker="Loyal voices"
          />
        </div>
      </div>
    </section>
  )
}

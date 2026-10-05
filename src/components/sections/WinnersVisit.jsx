import Motion from '../Motion'
import { useContent } from '../../cms/ContentContext'
import { normalizeSectionLayout } from '../../cms/sectionLayouts'
import './WinnersVisit.css'

const defaultSteps = [
  'Win an Official Godsent Box Battle',
  'Get scheduled for a livestream visit',
  'Champion of Champions earns priority placement',
  'Claim your spotlight before the whole family',
]

function splitSpotlightTitle(title) {
  const dot = title.indexOf('.')
  if (dot > 0 && dot < title.length - 1) {
    return {
      lead: title.slice(0, dot + 1).trim(),
      rest: title.slice(dot + 1).trim(),
    }
  }
  const words = title.split(' ').filter(Boolean)
  const cut = Math.max(1, Math.ceil(words.length / 3))
  return {
    lead: words.slice(0, cut).join(' '),
    rest: words.slice(cut).join(' '),
  }
}

function WinnersHead({ kicker, title, subtitle }) {
  const { lead, rest } = splitSpotlightTitle(title)
  return (
    <>
      <p className="sec-kicker mb-4" style={{ color: 'rgba(232,185,74,0.95)' }}>{kicker}</p>
      <h2 className="win-head font-display">
        <span className="win-head__lead">{lead}</span>
        {rest ? <span className="win-head__rest">{rest}</span> : null}
      </h2>
      <p className="text-white/70 text-sm leading-relaxed max-w-md mb-10">{subtitle}</p>
    </>
  )
}

export default function WinnersVisit() {
  const { getPage, settings } = useContent()
  const siteName = settings.siteName || ''
  const homePage = getPage('home')
  const layout = normalizeSectionLayout('winnersLayout', homePage.winnersLayout)
  const sectionTitle = homePage.winnersTitle || 'Win. Claim your spotlight'
  const sectionSubtitle = homePage.winnersSubtitle || `Official Godsent winners earn a scheduled livestream visit with ${siteName}. Champions go first.`
  const steps = homePage.winnersSteps ? homePage.winnersSteps.split('\n').filter(Boolean) : defaultSteps
  const winnersKicker = homePage.winnersKicker || "Winners' Livestream Visit"
  const winnersImage = homePage.winnersImage || '/photos/community-meetup.jpg'

  const sectionClass = `relative overflow-hidden home-band-ember home-band-sep${layout !== 'split' ? ` winners--${layout}` : ''}`

  if (layout === 'trophy') {
    return (
      <section className={sectionClass}>
        <div className="trophy-case">
          <Motion delay={60}>
            <WinnersHead kicker={winnersKicker} title={sectionTitle} subtitle={sectionSubtitle} />
          </Motion>
          <div className="trophy-case__glass">
            <img src={winnersImage} alt="Winners" className="w-full max-h-48 object-cover mb-6 opacity-90" loading="lazy" />
            <div className="trophy-case__shelf">
              {steps.map((text, i) => (
                <Motion key={text} delay={120 + i * 70}>
                  <article className="trophy-plaque">
                    <span className="trophy-plaque__medal">{String(i + 1).padStart(2, '0')}</span>
                    <p className="text-ivory text-sm sm:text-base leading-snug">{text}</p>
                  </article>
                </Motion>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (layout === 'runway') {
    return (
      <section className={sectionClass}>
        <div className="runway-stage">
          <div className="runway-carpet" aria-hidden />
          <div className="runway-spotlights" aria-hidden />
          <div className="runway-steps">
            <Motion delay={60}>
              <WinnersHead kicker={winnersKicker} title={sectionTitle} subtitle={sectionSubtitle} />
            </Motion>
            {steps.map((text, i) => (
              <Motion key={text} delay={120 + i * 70}>
                <div className="runway-step" style={{ '--runway-i': i }}>
                  <span className="runway-step__marker" aria-hidden />
                  <p className="text-ivory text-sm sm:text-base leading-snug">{text}</p>
                </div>
              </Motion>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (layout === 'coronation') {
    const { lead, rest } = splitSpotlightTitle(sectionTitle)
    return (
      <section className="win-crown" aria-label={sectionTitle}>
        <div className="win-crown__stage">
          <div className="win-crown__poster">
            <div className="win-crown__iris" aria-hidden>
              <span />
            </div>
            <p className="win-crown__kicker">{winnersKicker}</p>
            <h2 className="win-crown__title font-display">
              <span>{lead}</span>
              {rest ? <em>{rest}</em> : null}
            </h2>
          </div>
          <p className="win-crown__lede">{sectionSubtitle}</p>
          <ol className="win-crown__steps">
            {steps.map((text, i) => (
              <li key={text} style={{ '--i': i }}>
                <span className="font-display">{String(i + 1).padStart(2, '0')}</span>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    )
  }

  const { lead, rest } = splitSpotlightTitle(sectionTitle)

  return (
    <section className="win-spot" aria-label={sectionTitle}>
      <div className="win-spot__beam" aria-hidden />
      <p className="win-spot__ghost font-display" aria-hidden>CROWN</p>

      <div className="win-spot__stage">
        <Motion delay={40} className="win-spot__copy">
          <p className="win-spot__kicker">{winnersKicker}</p>
          <h2 className="win-spot__title font-display">
            <span className="win-spot__lead">{lead}</span>
            {rest ? <span className="win-spot__rest">{rest}</span> : null}
          </h2>
          <p className="win-spot__lede">{sectionSubtitle}</p>
        </Motion>

        <figure className="win-spot__portrait">
          <img src={winnersImage} alt="" />
          <span className="win-spot__halo" aria-hidden />
          <figcaption>Livestream visit</figcaption>
        </figure>

        <ol className="win-spot__path">
          {steps.map((text, i) => (
            <li key={text} style={{ '--i': i }}>
              <span className="win-spot__n font-display">{String(i + 1).padStart(2, '0')}</span>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

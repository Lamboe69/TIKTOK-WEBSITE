import Motion from '../Motion'
import { useContent } from '../../cms/ContentContext'
import { normalizeSectionLayout } from '../../cms/sectionLayouts'

const defaultSteps = [
  'Win an Official Godsent Box Battle',
  'Get scheduled for a livestream visit',
  'Champion of Champions earns priority placement',
  'Claim your spotlight before the whole family',
]

function WinnersHead({ kicker, title, subtitle }) {
  return (
    <>
      <p className="sec-kicker mb-4" style={{ color: 'rgba(232,185,74,0.95)' }}>{kicker}</p>
      <h2
        className="font-display font-bold text-ivory leading-[0.95] tracking-tight mb-4"
        style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)' }}
      >
        {title.includes(' ') ? (
          <>
            {title.split(' ').slice(0, Math.ceil(title.split(' ').length / 2)).join(' ')}<br />
            <span className="text-gradient">{title.split(' ').slice(Math.ceil(title.split(' ').length / 2)).join(' ')}</span>
          </>
        ) : title}
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
    return (
      <section className={sectionClass}>
        <div className="coronation-arc">
          <Motion delay={60}>
            <WinnersHead kicker={winnersKicker} title={sectionTitle} subtitle={sectionSubtitle} />
          </Motion>
          <div className="coronation-arc__crown" aria-hidden />
          <img src={winnersImage} alt="Winners" className="w-full max-w-md mx-auto rounded-lg mb-6 object-cover aspect-video" loading="lazy" />
          <div className="coronation-steps">
            {steps.map((text, i) => (
              <Motion key={text} delay={120 + i * 70}>
                <article className="coronation-step" style={{ '--coronation-i': i }}>
                  <span className="font-display font-bold text-ember text-lg block mb-2">{String(i + 1).padStart(2, '0')}</span>
                  <p className="text-ivory text-sm leading-snug">{text}</p>
                </article>
              </Motion>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={sectionClass}>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">
        <div className="relative min-h-[300px] order-2 lg:order-1">
          <img src={winnersImage} alt="Winners livestream visit" className="absolute inset-0 w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to left, #2A1028 0%, transparent 40%), linear-gradient(to top, rgba(42,16,40,0.55), transparent 40%)',
            }}
          />
        </div>

        <div className="order-1 lg:order-2 px-5 sm:px-10 lg:px-14 py-16 sm:py-20 flex flex-col justify-center">
          <Motion delay={60}>
            <WinnersHead kicker={winnersKicker} title={sectionTitle} subtitle={sectionSubtitle} />
          </Motion>

          <ol className="space-y-0">
            {steps.map((text, i) => (
              <Motion key={text} delay={120 + i * 70}>
                <li className="flex gap-5 py-4 border-t border-white/[0.06] last:border-b">
                  <span className="font-display font-bold text-ember text-xl w-8 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-ivory text-sm sm:text-base leading-snug pt-1">{text}</p>
                </li>
              </Motion>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

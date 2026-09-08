import Motion from '../Motion'
import { useSignUp } from '../SignUpContext'
import useInView from '../../hooks/useInView'
import { useContent } from '../../cms/ContentContext'
import { normalizeSectionLayout } from '../../cms/sectionLayouts'
import { BATTLE_SUBMIT_LABEL } from '../../constants/brand'

const fallbackSteps = [
  {
    num: '01',
    title: 'Gift the host',
    description:
      'Send gifts to King Maker or guests during the livestream. Any gift — big or small — is an act of support and puts you in the arena. Every contribution counts as a KM Dynasty Charity donation.',
  },
  {
    num: '02',
    title: 'Tap to 5K likes',
    description:
      'Double-tap the screen and keep going. When the community hits 5,000+ likes, the energy surges. Your taps fuel the battle — every single one moves the arena closer to ignition.',
  },
  {
    num: '03',
    title: 'DM top gifters',
    description:
      'Watch the top gifters list and slide into their DMs. If a spot opens, you may get the call. A replacement slot in the arena could be one message away.',
  },
]

function HowItWorksHead({ kicker, title, subtitle, centered }) {
  const titleWords = title.split(' ')
  const titleBreak = Math.ceil(titleWords.length / 2)
  const titleLead = titleWords.slice(0, titleBreak).join(' ')
  const titleAccent = titleWords.slice(titleBreak).join(' ')

  return (
    <div className={`how-steps__head${centered ? ' how-compass__head' : ''}`}>
      <p className="sec-kicker">{kicker}</p>
      <h2 className="how-steps__title">
        {titleAccent ? (
          <>
            {titleLead}{' '}
            <span className="text-gradient">{titleAccent}</span>
          </>
        ) : (
          title
        )}
      </h2>
      {subtitle ? <p className="how-steps__subtitle">{subtitle}</p> : null}
    </div>
  )
}

function DualCopy({ side, title, body, onApply }) {
  return (
    <div className={`how-dual__copy how-dual__copy--${side}`}>
      <span className="how-dual__mark">{side === 'left' ? '01 · Apply' : '02 · Support'}</span>
      <h3 className="how-dual__headline">{title}</h3>
      {body ? <p className="how-dual__lede">{body}</p> : null}
      {side === 'left' && onApply ? (
        <button type="button" className="how-dual__cta" onClick={onApply}>
          {BATTLE_SUBMIT_LABEL}
        </button>
      ) : null}
    </div>
  )
}

/** Full-bleed gatefold — sheets open from a center spine across the viewport. */
function GatefoldLayout({ kicker, leftTitle, leftBody, rightTitle, rightBody, image }) {
  const [ref, inView] = useInView({ threshold: 0.18 })
  const { openOfficial } = useSignUp()

  return (
    <section
      ref={ref}
      className={`how-steps how-dual how-dual--gatefold home-band-ink home-band-sep${inView ? ' is-on' : ''}`}
    >
      <div className="how-dual__bleed">
        <header className="how-dual__mast">
          <p className="how-dual__edition">Dynasty Press</p>
          <h2>{kicker}</h2>
        </header>

        <div className="how-gatefold">
          <article className="how-gatefold__sheet how-gatefold__sheet--left">
            <div className="how-gatefold__face">
              <DualCopy side="left" title={leftTitle} body={leftBody} onApply={openOfficial} />
            </div>
          </article>
          <div className="how-gatefold__spine" aria-hidden />
          <article className="how-gatefold__sheet how-gatefold__sheet--right">
            <div className="how-gatefold__face">
              <DualCopy side="right" title={rightTitle} body={rightBody} />
              {image ? (
                <div className="how-gatefold__media">
                  <img src={image} alt="" loading="lazy" />
                </div>
              ) : null}
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

/** Eclipse — panels part like a solar eclipse revealing a molten center seam. */
function EclipseLayout({ kicker, leftTitle, leftBody, rightTitle, rightBody, image }) {
  const [ref, inView] = useInView({ threshold: 0.18 })
  const { openOfficial } = useSignUp()

  return (
    <section
      ref={ref}
      className={`how-steps how-dual how-dual--eclipse home-band-ink home-band-sep${inView ? ' is-on' : ''}`}
    >
      <div className="how-eclipse">
        <div className="how-eclipse__sky" aria-hidden>
          <span className="how-eclipse__corona" />
        </div>
        <p className="how-eclipse__kicker">{kicker}</p>
        <div className="how-eclipse__halves">
          <article className="how-eclipse__half how-eclipse__half--left">
            <DualCopy side="left" title={leftTitle} body={leftBody} onApply={openOfficial} />
          </article>
          <div className="how-eclipse__seam" aria-hidden>
            <span />
          </div>
          <article className="how-eclipse__half how-eclipse__half--right">
            <DualCopy side="right" title={rightTitle} body={rightBody} />
            {image ? <img className="how-eclipse__ghost" src={image} alt="" loading="lazy" /> : null}
          </article>
        </div>
      </div>
    </section>
  )
}

/** Twin Portals — arched dimensional frames with orbiting rings. */
function PortalsLayout({ kicker, leftTitle, leftBody, rightTitle, rightBody, image }) {
  const [ref, inView] = useInView({ threshold: 0.15 })
  const { openOfficial } = useSignUp()

  return (
    <section
      ref={ref}
      className={`how-steps how-dual how-dual--portals home-band-ink home-band-sep${inView ? ' is-on' : ''}`}
    >
      <div className="how-portals">
        <header className="how-portals__head">
          <p className="sec-kicker">{kicker}</p>
          <h2 className="how-portals__title">
            Two doors. <span className="text-gradient">One Dynasty.</span>
          </h2>
        </header>
        <div className="how-portals__row">
          <article className="how-portals__gate how-portals__gate--apply">
            <div className="how-portals__ring how-portals__ring--a" aria-hidden />
            <div className="how-portals__ring how-portals__ring--b" aria-hidden />
            <div className="how-portals__chamber">
              <DualCopy side="left" title={leftTitle} body={leftBody} onApply={openOfficial} />
            </div>
          </article>
          <article className="how-portals__gate how-portals__gate--support">
            <div className="how-portals__ring how-portals__ring--a" aria-hidden />
            <div className="how-portals__ring how-portals__ring--b" aria-hidden />
            <div className="how-portals__chamber">
              {image ? <img className="how-portals__bg" src={image} alt="" loading="lazy" /> : null}
              <DualCopy side="right" title={rightTitle} body={rightBody} />
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

/** Arena Runway — perspective floor lines with a center live strip. */
function RunwayLayout({ kicker, leftTitle, leftBody, rightTitle, rightBody, image }) {
  const [ref, inView] = useInView({ threshold: 0.15 })
  const { openOfficial } = useSignUp()

  return (
    <section
      ref={ref}
      className={`how-steps how-dual how-dual--runway home-band-ink home-band-sep${inView ? ' is-on' : ''}`}
    >
      <div className="how-runway">
        <div className="how-runway__floor" aria-hidden />
        <header className="how-runway__head">
          <p className="sec-kicker">{kicker}</p>
        </header>
        <div className="how-runway__stage">
          <article className="how-runway__side how-runway__side--left">
            <DualCopy side="left" title={leftTitle} body={leftBody} onApply={openOfficial} />
          </article>
          <div className="how-runway__lane" aria-hidden>
            <span className="how-runway__pulse" />
            <span className="how-runway__tag">LIVE</span>
          </div>
          <article className="how-runway__side how-runway__side--right">
            <DualCopy side="right" title={rightTitle} body={rightBody} />
            {image ? <img className="how-runway__still" src={image} alt="" loading="lazy" /> : null}
          </article>
        </div>
      </div>
    </section>
  )
}

/** Prism Slash — diagonal full-bleed cut with asymmetric panels. */
function PrismLayout({ kicker, leftTitle, leftBody, rightTitle, rightBody, image }) {
  const [ref, inView] = useInView({ threshold: 0.15 })
  const { openOfficial } = useSignUp()

  return (
    <section
      ref={ref}
      className={`how-steps how-dual how-dual--prism home-band-ink home-band-sep${inView ? ' is-on' : ''}`}
    >
      <div className="how-prism">
        {image ? <img className="how-prism__backdrop" src={image} alt="" loading="lazy" /> : null}
        <div className="how-prism__veil" aria-hidden />
        <p className="how-prism__kicker">{kicker}</p>
        <div className="how-prism__slash" aria-hidden />
        <article className="how-prism__pane how-prism__pane--left">
          <DualCopy side="left" title={leftTitle} body={leftBody} onApply={openOfficial} />
        </article>
        <article className="how-prism__pane how-prism__pane--right">
          <DualCopy side="right" title={rightTitle} body={rightBody} />
        </article>
      </div>
    </section>
  )
}

export default function HowItWorks() {
  const { collections, getPage } = useContent()
  const homePage = getPage('home')
  const layout = normalizeSectionLayout('howItWorksLayout', homePage.howItWorksLayout)
  const steps = collections.howItWorks?.length
    ? collections.howItWorks.map((s) => ({
        num: s.num,
        title: s.title,
        description: s.body || s.description,
      }))
    : fallbackSteps
  const sectionTitle = homePage.howItWorksTitle || 'How to Join Godsent Box Battle'
  const sectionSubtitle =
    homePage.howItWorksSubtitle ||
    'Gift the host, tap to 5K, and stay close to the top gifters — three moves every challenger makes.'
  const sectionKicker = homePage.howItWorksKicker || 'How It Works'
  const sectionImage = homePage.howItWorksImage || '/photos/tiktok.png'
  const leftTitle = homePage.howItWorksLeftTitle || 'To Join Our Battle You Must Apply'
  const leftBody =
    homePage.howItWorksLeftBody ||
    'Fill out the application, confirm your details, and take your place in the Dynasty arena.'
  const rightTitle =
    homePage.howItWorksRightTitle ||
    'Support the Livestream to be picked for the Daily Godsend'
  const rightBody =
    homePage.howItWorksRightBody ||
    'Gift, tap, and stay live. Active supporters rise first when Daily Godsend spots open.'

  const dualProps = {
    kicker: sectionKicker,
    leftTitle,
    leftBody,
    rightTitle,
    rightBody,
    image: sectionImage,
  }

  if (layout === 'gatefold' || layout === 'newspaper') {
    return <GatefoldLayout {...dualProps} />
  }
  if (layout === 'eclipse') {
    return <EclipseLayout {...dualProps} />
  }
  if (layout === 'portals') {
    return <PortalsLayout {...dualProps} />
  }
  if (layout === 'runway') {
    return <RunwayLayout {...dualProps} />
  }
  if (layout === 'prism') {
    return <PrismLayout {...dualProps} />
  }

  if (layout === 'compass') {
    return (
      <section className="how-steps how-steps--compass home-band-ink home-band-sep">
        <div className="how-compass">
          <Motion delay={60}>
            <HowItWorksHead
              kicker={sectionKicker}
              title={sectionTitle}
              subtitle={sectionSubtitle}
              centered
            />
          </Motion>
          <div className="how-compass__dial" aria-hidden>
            <div className="how-compass__core">
              <img src={sectionImage} alt="" />
            </div>
          </div>
          <div className="how-compass__nodes">
            {steps.map(({ num, title, description }, i) => (
              <Motion key={num} delay={100 + i * 70}>
                <article className="how-compass__node">
                  <span className="how-steps__num" style={{ fontSize: '1.5rem' }}>
                    {num}
                  </span>
                  <h3 className="how-steps__card-title" style={{ marginTop: '0.35rem' }}>
                    {title}
                  </h3>
                  <p className="how-steps__card-body">{description}</p>
                </article>
              </Motion>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (layout === 'spiral') {
    return (
      <section className="how-steps how-steps--spiral home-band-ink home-band-sep">
        <div className="how-spiral">
          <Motion delay={60}>
            <div className="how-spiral__path">
              <div className="how-spiral__thread" aria-hidden />
              {steps.map(({ num, title, description }, i) => (
                <article key={num} className="how-spiral__step" style={{ '--spiral-i': i }}>
                  <span className="how-steps__num">{num}</span>
                  <h3 className="how-steps__card-title">{title}</h3>
                  <p className="how-steps__card-body">{description}</p>
                </article>
              ))}
            </div>
          </Motion>
          <div>
            <Motion delay={80}>
              <HowItWorksHead
                kicker={sectionKicker}
                title={sectionTitle}
                subtitle={sectionSubtitle}
              />
            </Motion>
            <Motion delay={140}>
              <div className="how-spiral__media">
                <img src={sectionImage} alt="King Maker live on TikTok" loading="lazy" />
              </div>
            </Motion>
          </div>
        </div>
      </section>
    )
  }

  if (layout === 'tickets') {
    return (
      <section className="how-steps how-steps--tickets home-band-ink home-band-sep">
        <div className="how-tickets">
          <Motion delay={60}>
            <HowItWorksHead
              kicker={sectionKicker}
              title={sectionTitle}
              subtitle={sectionSubtitle}
              centered
            />
          </Motion>
          <div className="how-tickets__fan">
            {steps.map(({ num, title, description }, i) => (
              <Motion key={num} delay={100 + i * 80}>
                <article className="how-tickets__stub" style={{ '--ticket-i': i }}>
                  <span className="how-steps__num">{num}</span>
                  <div className="how-tickets__perforation" aria-hidden />
                  <h3 className="how-steps__card-title" style={{ marginTop: '1.25rem' }}>
                    {title}
                  </h3>
                  <p className="how-steps__card-body">{description}</p>
                </article>
              </Motion>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="how-steps home-band-ink home-band-sep">
      <div className="how-steps__layout">
        <div className="how-steps__media">
          <img src={sectionImage} alt="King Maker live on TikTok" loading="lazy" />
          <div className="how-steps__media-fade" aria-hidden />
        </div>

        <div className="how-steps__body">
          <Motion delay={60}>
            <HowItWorksHead
              kicker={sectionKicker}
              title={sectionTitle}
              subtitle={sectionSubtitle}
            />
          </Motion>

          <div className="how-steps__grid">
            {steps.map(({ num, title, description }, i) => (
              <Motion key={num} delay={100 + i * 70}>
                <article className="how-steps__card">
                  <div className="how-steps__card-top">
                    <span className="how-steps__num">{num}</span>
                  </div>
                  <h3 className="how-steps__card-title">{title}</h3>
                  <p className="how-steps__card-body">{description}</p>
                </article>
              </Motion>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

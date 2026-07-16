import Motion from '../Motion'
import { useContent } from '../../cms/ContentContext'
import { normalizeSectionLayout } from '../../cms/sectionLayouts'

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
      <p className="how-steps__subtitle">{subtitle}</p>
    </div>
  )
}

export default function HowItWorks() {
  const { collections, getPage } = useContent()
  const homePage = getPage('home')
  const layout = normalizeSectionLayout('howItWorksLayout', homePage.howItWorksLayout)
  const steps = (collections.howItWorks?.length
    ? collections.howItWorks.map((s) => ({
        num: s.num,
        title: s.title,
        description: s.body || s.description,
      }))
    : fallbackSteps)
  const sectionTitle = homePage.howItWorksTitle || 'How to Join Godsent Box Battle'
  const sectionSubtitle = homePage.howItWorksSubtitle || 'Gift the host, tap to 5K, and stay close to the top gifters — three moves every challenger makes.'
  const sectionKicker = homePage.howItWorksKicker || 'How It Works'
  const sectionImage = homePage.howItWorksImage || '/photos/tiktok.png'

  if (layout === 'compass') {
    return (
      <section className="how-steps how-steps--compass home-band-ink home-band-sep">
        <div className="how-compass">
          <Motion delay={60}>
            <HowItWorksHead kicker={sectionKicker} title={sectionTitle} subtitle={sectionSubtitle} centered />
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
                  <span className="how-steps__num" style={{ fontSize: '1.5rem' }}>{num}</span>
                  <h3 className="how-steps__card-title" style={{ marginTop: '0.35rem' }}>{title}</h3>
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
              <HowItWorksHead kicker={sectionKicker} title={sectionTitle} subtitle={sectionSubtitle} />
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
            <HowItWorksHead kicker={sectionKicker} title={sectionTitle} subtitle={sectionSubtitle} centered />
          </Motion>
          <div className="how-tickets__fan">
            {steps.map(({ num, title, description }, i) => (
              <Motion key={num} delay={100 + i * 80}>
                <article className="how-tickets__stub" style={{ '--ticket-i': i }}>
                  <span className="how-steps__num">{num}</span>
                  <div className="how-tickets__perforation" aria-hidden />
                  <h3 className="how-steps__card-title" style={{ marginTop: '1.25rem' }}>{title}</h3>
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
            <HowItWorksHead kicker={sectionKicker} title={sectionTitle} subtitle={sectionSubtitle} />
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

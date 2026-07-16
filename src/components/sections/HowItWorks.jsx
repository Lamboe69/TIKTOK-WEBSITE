import Motion from '../Motion'
import { useContent } from '../../cms/ContentContext'

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

export default function HowItWorks() {
  const { collections, getPage } = useContent()
  const homePage = getPage('home')
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

  const titleWords = sectionTitle.split(' ')
  const titleBreak = Math.ceil(titleWords.length / 2)
  const titleLead = titleWords.slice(0, titleBreak).join(' ')
  const titleAccent = titleWords.slice(titleBreak).join(' ')

  return (
    <section className="how-steps home-band-ink home-band-sep">
      <div className="how-steps__layout">
        <div className="how-steps__media">
          <img src={sectionImage} alt="King Maker live on TikTok" loading="lazy" />
          <div className="how-steps__media-fade" aria-hidden />
        </div>

        <div className="how-steps__body">
          <Motion delay={60}>
            <div className="how-steps__head">
              <p className="sec-kicker">{sectionKicker}</p>
              <h2 className="how-steps__title">
                {titleAccent ? (
                  <>
                    {titleLead}{' '}
                    <span className="text-gradient">{titleAccent}</span>
                  </>
                ) : (
                  sectionTitle
                )}
              </h2>
              <p className="how-steps__subtitle">{sectionSubtitle}</p>
            </div>
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

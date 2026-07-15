import { useSignUp } from '../SignUpContext'
import { Icons } from '../Icons'
import Motion from '../Motion'
import { useContent } from '../../cms/ContentContext'

const defaultPillars = [
  'Like, share, follow, report — protect the livestream.',
  'Keep esteem high — big box or small, every member matters.',
  'Push forward positively — family energy, even in the hottest battles.',
]

const defaultPerks = [
  'Priority shout-outs during livestreams',
  'Exclusive community giveaways',
  "Winners' Livestream Visit recognition",
]

const faces = [
  '/gifters/brittany.jpg',
  '/gifters/gregory.jpg',
  '/gifters/ailinda.jpg',
  '/gifters/charles.jpg',
  '/photos/community-meetup.jpg',
]

export default function KmLovers() {
  const { openOfficial } = useSignUp()
  const { getPage, settings } = useContent()
  const siteName = settings.siteName || ''
  const ctaLabel = settings.ctaLabel || 'Join My Box Battle'
  const homePage = getPage('home')

  const sectionTitle = homePage.kmLoversTitle || "They don't just watch — they protect"
  const sectionDesc = homePage.kmLoversDescription || `${siteName} LOVERS are the heartbeat of the Dynasty — shielding livestreams, lifting each other, and carrying the culture forward.`
  const pillars = homePage.kmLoversPillars ? homePage.kmLoversPillars.split('\n').filter(Boolean) : defaultPillars
  const perks = homePage.kmLoversPerks ? homePage.kmLoversPerks.split('\n').filter(Boolean) : defaultPerks
  const kmLoversKicker = homePage.kmLoversKicker || 'KM Lovers'
  const kmLoversPerksLabel = homePage.kmLoversPerksLabel || 'KM Lovers get'
  const kmLoversImage = homePage.kmLoversImage || '/photos/community-meetup.jpg'
  const kmLoversFaces = homePage.kmLoversFaces
    ? homePage.kmLoversFaces.split(',').map(s => s.trim()).filter(Boolean)
    : faces

  return (
    <section className="relative min-h-[640px] overflow-hidden flex items-end home-band-sep">
      <img
        src={kmLoversImage}
        alt="KM Lovers community"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, rgba(42,20,80,0.94) 0%, rgba(58,26,106,0.78) 38%, rgba(255,107,26,0.22) 70%, rgba(28,14,56,0.55) 100%), linear-gradient(to top, rgba(22,11,44,0.92) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <Motion delay={60}>
              <p className="sec-kicker mb-5">{kmLoversKicker}</p>
              <h2
                className="font-display font-bold text-ivory leading-[0.95] tracking-tight mb-5"
                style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)' }}
              >
                {sectionTitle.includes('—') ? (
                  <>
                    {sectionTitle.split('—')[0].trim()} —<br />
                    <span className="text-gradient">{sectionTitle.split('—')[1]?.trim() || ''}</span>
                  </>
                ) : sectionTitle}
              </h2>
              <p className="text-white/75 text-sm sm:text-base leading-relaxed max-w-lg mb-8">
                {sectionDesc}
              </p>
            </Motion>

            <div className="space-y-4 mb-10 max-w-lg">
              {pillars.map((text, i) => (
                <Motion key={text} delay={120 + i * 70}>
                  <div className="flex gap-4 items-start">
                    <span className="font-display text-ember/50 text-sm tabular-nums mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-white/70 text-sm leading-relaxed">{text}</p>
                  </div>
                </Motion>
              ))}
            </div>

            <Motion delay={360}>
              <button type="button" onClick={openOfficial} className="sec-cta">
                {ctaLabel}
                <span className="w-4 h-4 block">{Icons.arrowRight}</span>
              </button>
            </Motion>
          </div>

          <Motion delay={200} className="lg:col-span-5">
            <div className="lg:pl-8">
              {/* Face strip */}
              <div className="flex -space-x-3 mb-6">
                {kmLoversFaces.map((src, i) => (
                  <div
                    key={src}
                    className="w-14 h-14 sm:w-16 sm:h-16 overflow-hidden border-2 border-[#2A1450] relative"
                    style={{ zIndex: faces.length - i }}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p className="sec-kicker mb-3" style={{ color: 'rgba(232,185,74,0.9)' }}>{kmLoversPerksLabel}</p>
              <ul className="space-y-2.5">
                {perks.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/65">
                    <span className="w-1.5 h-1.5 bg-ember flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Motion>
        </div>
      </div>
    </section>
  )
}

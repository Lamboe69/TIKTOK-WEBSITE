import { useSignUp } from '../SignUpContext'
import { Icons } from '../Icons'
import Motion from '../Motion'
import { useContent } from '../../cms/ContentContext'

const fallbackSteps = [
  {
    num: '01',
    title: 'Join the Queue',
    description: 'Drop your TikTok handle and available dates. Thirty seconds. You’re in the queue.',
  },
  {
    num: '02',
    title: 'Get Matched',
    description: 'We pair you with a worthy opponent. Curated matchups — never randoms.',
  },
  {
    num: '03',
    title: 'Battle & Win',
    description: 'Go live. Every tap counts. Rise to the crown, the visit, and the finale.',
  },
]

export default function HowItWorks() {
  const { openOfficial } = useSignUp()
  const { collections, settings } = useContent()
  const steps = (collections.howItWorks?.length
    ? collections.howItWorks.map((s) => ({
        num: s.num,
        title: s.title,
        description: s.body || s.description,
      }))
    : fallbackSteps)

  return (
    <section className="relative overflow-hidden home-band-ink home-band-sep">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
        {/* Full-height local photo plane */}
        <div className="relative lg:col-span-5 min-h-[280px] lg:min-h-full">
          <img
            src="/photos/tiktok.png"
            alt="King Maker live on TikTok"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, transparent 40%, #160B2C), linear-gradient(to top, #160B2C 0%, transparent 45%)',
            }}
          />
          <div className="absolute bottom-8 left-6 right-6 lg:hidden">
            <p className="sec-kicker mb-2">How It Works</p>
            <p className="font-display font-bold text-ivory text-2xl">Three steps to the crown</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="lg:col-span-7 px-5 sm:px-10 lg:px-14 py-16 sm:py-20 flex flex-col justify-center">
          <Motion delay={80}>
            <p className="sec-kicker mb-4 hidden lg:block">How It Works</p>
            <h2
              className="font-display font-bold text-ivory mb-3 leading-[0.95] tracking-tight hidden lg:block"
              style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)' }}
            >
              Three steps to<br />
              <span className="text-gradient">the crown</span>
            </h2>
            <p className="text-white/70 text-sm mb-10 max-w-md leading-relaxed hidden lg:block">
              From first tap to spotlight — the path every Dynasty challenger walks.
            </p>
          </Motion>

          <div className="space-y-0">
            {steps.map(({ num, title, description }, i) => (
              <Motion key={num} delay={120 + i * 90}>
                <div className="relative flex gap-5 sm:gap-7 py-6">
                  <div className="flex flex-col items-center w-14 sm:w-16 flex-shrink-0">
                    <span className="sec-num text-4xl sm:text-5xl leading-none">{num}</span>
                    {i < steps.length - 1 && (
                      <span
                        className="mt-4 w-px flex-1 min-h-[2.5rem]"
                        style={{ background: 'linear-gradient(to bottom, rgba(255,138,61,0.85), rgba(255,138,61,0.2))' }}
                        aria-hidden
                      />
                    )}
                  </div>
                  <div className="pt-1 pb-2">
                    <h3 className="font-display font-bold text-ivory text-lg mb-1.5">{title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed max-w-md">{description}</p>
                  </div>
                </div>
              </Motion>
            ))}
          </div>

          <Motion delay={420}>
            <button type="button" onClick={openOfficial} className="sec-cta mt-8 self-start">
              {settings.ctaLabel || 'Join My Box Battle'}
              <span className="w-4 h-4 block">{Icons.arrowRight}</span>
            </button>
          </Motion>
        </div>
      </div>
    </section>
  )
}

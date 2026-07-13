import { useSignUp } from '../SignUpContext'
import { Icons } from '../Icons'
import Motion from '../Motion'

const steps = [
  {
    num: '01',
    title: 'Sign Up',
    description: 'Fill the form with your TikTok handle and pick your available date. Takes 30 seconds.',
  },
  {
    num: '02',
    title: 'Get Matched',
    description: 'We pair you with a worthy opponent. Coins vs coins. No randoms — every matchup is curated.',
  },
  {
    num: '03',
    title: 'Battle & Win',
    description: 'Go live. Battle. Win. Prizes, glory, and a spot on the leaderboard. Champions rise.',
  },
]

export default function HowItWorks() {
  const { openOfficial } = useSignUp()

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden" style={{ background: '#1B1024' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 100% 50%, rgba(59,16,99,0.3) 0%, transparent 70%)' }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <Motion delay={0.1}>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800&q=80"
                alt="TikTok live battle"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(59,16,99,0.5), rgba(255,107,26,0.2))' }} />
              <div className="absolute bottom-6 left-6 glass rounded-xl px-4 py-3">
                <p className="text-ivory font-display font-bold text-lg">3 Steps</p>
                <p className="text-white/60 text-xs">From sign-up to champion</p>
              </div>
            </div>
          </Motion>

          {/* Steps */}
          <div>
            <Motion delay={0.15}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 text-ember" style={{ background: 'rgba(255,107,26,0.1)' }}>
                <span className="w-3.5 h-3.5 block">{Icons.zap}</span>
                How It Works
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-ivory mb-3">
                Three Steps to<br />
                <span className="text-gradient">the Crown</span>
              </h2>
              <p className="text-white/50 text-sm mb-8 max-w-md">
                From sign-up to spotlight — here's how you go from viewer to champion.
              </p>
            </Motion>

            <div className="space-y-0">
              {steps.map(({ num, title, description }, i) => (
                <Motion key={num} delay={0.2 + i * 0.1}>
                  <div className={`flex gap-5 py-5 ${i < steps.length - 1 ? 'border-b border-white/04' : ''}`}>
                    <span className="font-display font-bold text-3xl text-ember/30 w-10 flex-shrink-0 leading-none mt-1">{num}</span>
                    <div>
                      <h3 className="font-display font-bold text-ivory text-base mb-1">{title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{description}</p>
                    </div>
                  </div>
                </Motion>
              ))}
            </div>

            <Motion delay={0.5}>
              <button
                onClick={openOfficial}
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white rounded-xl transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)' }}
              >
                Sign Up — Box Battle
                <span className="w-4 h-4 block">{Icons.arrowRight}</span>
              </button>
            </Motion>
          </div>
        </div>
      </div>
    </section>
  )
}

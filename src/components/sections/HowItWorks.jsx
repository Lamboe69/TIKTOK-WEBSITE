import { useSignUp } from '../SignUpContext'
import { Icons } from '../Icons'
import Motion from '../Motion'

const steps = [
  {
    num: '01',
    icon: Icons.userPlus,
    title: 'Sign Up',
    description: 'Fill the form with your TikTok handle and pick your available date. Takes 30 seconds.',
    color: 'text-accent',
    bg: 'bg-accent/5',
  },
  {
    num: '02',
    icon: Icons.swords,
    title: 'Get Matched',
    description: 'We pair you with a worthy opponent. Coins vs coins. No randoms — every matchup is curated.',
    color: 'text-gold',
    bg: 'bg-gold/5',
  },
  {
    num: '03',
    icon: Icons.trophy,
    title: 'Battle & Win',
    description: 'Go live. Battle. Win. Prizes, glory, and a spot on the leaderboard. Champions rise.',
    color: 'text-accent',
    bg: 'bg-accent/5',
  },
]

export default function HowItWorks() {
  const { openOfficial } = useSignUp()

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Motion variant="fade-up" className="text-center mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-accent text-xs font-semibold uppercase tracking-wider mb-3">
            <span className="w-3.5 h-3.5 block">{Icons.zap}</span>
            How It Works
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-900 mb-2">
            Three Steps to the Crown
          </h2>
          <p className="text-brand-500 text-sm max-w-md mx-auto">
            From sign-up to spotlight — here's how you go from viewer to champion.
          </p>
        </Motion>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {steps.map(({ num, icon, title, description, color, bg }, i) => (
            <Motion key={i} variant="fade-up" delay={i * 100}>
              <div className="relative rounded-xl bg-brand-50 border border-brand-100 p-6 hover:border-brand-200 hover:bg-white transition-all h-full">
                <div className="absolute top-4 right-4 font-display font-bold text-3xl text-brand-100 select-none">
                  {num}
                </div>
                <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center mb-4`}>
                  <span className={`w-5 h-5 block ${color}`}>{icon}</span>
                </div>
                <h3 className="font-display font-bold text-base text-brand-900 mb-1.5">
                  {title}
                </h3>
                <p className="text-brand-500 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            </Motion>
          ))}
        </div>

        <Motion variant="fade-up" delay={300} className="text-center">
          <button
            onClick={openOfficial}
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-900 text-white font-semibold text-sm rounded-lg btn-primary"
          >
            Sign Up — Box Battle
            <span className="w-4 h-4 block">{Icons.arrowRight}</span>
          </button>
          <p className="text-brand-400 text-xs mt-2">
            Free to enter · No experience needed · Open to all creators
          </p>
        </Motion>
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'
import { Icons } from '../Icons'
import Motion from '../Motion'
import { useSignUp } from '../SignUpContext'
import Particles from '../Particles'

const steps = [
  {
    num: '01',
    icon: Icons.userPlus,
    title: 'Sign Up',
    description: 'Fill the form and join the next Godsent Box Battle. It takes 30 seconds.',
    gradient: 'from-dynasty-purple to-violet-600',
  },
  {
    num: '02',
    icon: Icons.swords,
    title: 'Enter the Box',
    description: 'Join King Maker\'s livestream, compete in real-time, and fight for the crown.',
    gradient: 'from-dynasty-orange to-amber-500',
  },
  {
    num: '03',
    icon: Icons.trophy,
    title: 'Win & Rise',
    description: 'Winners get featured, receive prizes, and advance to the Champion of Champions finale.',
    gradient: 'from-emerald-500 to-teal-500',
  },
]

export default function HowItWorks() {
  const { openOfficial } = useSignUp()

  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Animated background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-dynasty-purple/5 rounded-full blur-[120px] animate-drift" style={{ animationDuration: '20s' }} />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-dynasty-orange/5 rounded-full blur-[100px] animate-drift" style={{ animationDuration: '16s', animationDelay: '4s' }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <Motion variant="fade-up" className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dynasty-purple/10 text-dynasty-purple text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-4 h-4 block">{Icons.zap}</span>
            How It Works
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-dynasty-charcoal mb-3">
            Three Steps to the <span className="text-gradient-animated">Crown</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            From sign-up to spotlight — here's how you go from viewer to champion.
          </p>
        </Motion>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {steps.map(({ num, icon, title, description, gradient }, i) => (
            <Motion key={i} variant="fade-up" delay={i * 120}>
              <div className="relative group rounded-2xl bg-dynasty-cream/50 border border-gray-100 p-7 sm:p-8 hover:border-dynasty-purple/20 hover:shadow-xl transition-all duration-300 card-tilt h-full overflow-hidden">
                {/* Shimmer sweep on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 animate-shimmer-line" />
                </div>

                {/* Step number — large watermark */}
                <div className="absolute top-4 right-4 font-display font-bold text-5xl text-gray-100/60 group-hover:text-dynasty-purple/10 transition-colors duration-300 select-none">
                  {num}
                </div>

                {/* Icon */}
                <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} text-white flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <span className="w-7 h-7 block">{icon}</span>
                </div>

                <h3 className="relative font-display font-bold text-lg text-dynasty-charcoal mb-2 group-hover:text-dynasty-purple transition-colors">
                  {title}
                </h3>
                <p className="relative text-sm text-gray-500 leading-relaxed">
                  {description}
                </p>
              </div>
            </Motion>
          ))}
        </div>

        {/* Animated connector line */}
        <div className="hidden md:flex items-center justify-center gap-4 mb-12">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-dynasty-purple/20 to-transparent" />
          <span className="w-2.5 h-2.5 rounded-full bg-dynasty-purple/40 animate-dot-pulse" />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-dynasty-orange/20 to-transparent" />
          <span className="w-2.5 h-2.5 rounded-full bg-dynasty-orange/40 animate-dot-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-300/30 to-transparent" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/40 animate-dot-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* CTA */}
        <Motion variant="fade-up" delay={400} className="text-center">
          <button
            onClick={openOfficial}
            className="inline-flex items-center gap-2 px-8 py-4 bg-dynasty-orange text-white font-bold text-sm rounded-xl btn-glow shadow-lg shadow-dynasty-orange/30 hover:bg-dynasty-orange/90 transition-colors animate-glow-breathe"
          >
            Sign Up — Box Battle
            <span className="w-4 h-4 block">{Icons.arrowRight}</span>
          </button>
          <p className="text-gray-400 text-xs mt-3">
            Free to enter &middot; No experience needed &middot; Open to all creators
          </p>
        </Motion>
      </div>
    </section>
  )
}

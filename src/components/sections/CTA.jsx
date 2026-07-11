import { Icons } from '../Icons'
import { useSignUp } from '../SignUpContext'
import Motion from '../Motion'
import Particles from '../Particles'

export default function CTA() {
  const { openOfficial } = useSignUp()

  return (
    <section className="py-20 sm:py-28 bg-dynasty-purple relative overflow-hidden">
      <Particles count={25} color="rgba(255,255,255,0.3)" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-20 w-64 h-64 bg-dynasty-orange/10 rounded-full blur-3xl animate-drift" style={{ animationDuration: '16s' }} />
        <div className="absolute bottom-10 left-20 w-48 h-48 bg-white/5 rounded-full blur-3xl animate-drift" style={{ animationDuration: '22s', animationDelay: '6s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-dynasty-orange/5 rounded-full blur-3xl animate-spin-slow" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <Motion variant="scale-in">
          <div className="relative inline-block mb-6">
            <span className="w-14 h-14 mx-auto block text-dynasty-orange animate-float">{Icons.rocket}</span>
            <span className="absolute -inset-4 rounded-full border border-dynasty-orange/15 animate-pulse-ring pointer-events-none" />
          </div>
        </Motion>

        <Motion variant="fade-up" delay={100}>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
            Ready to Join the <span className="text-gradient-animated">Dynasty</span>?
          </h2>
        </Motion>

        <Motion variant="fade-up" delay={200}>
          <p className="text-white/70 text-sm sm:text-base mb-8 max-w-xl mx-auto">
            Sign up for the next Godsent Box Battle and take your first step toward the crown.
          </p>
        </Motion>

        <Motion variant="fade-up" delay={300}>
          <button
            onClick={openOfficial}
            className="inline-block px-10 py-4 bg-dynasty-orange text-white font-bold rounded-xl text-sm btn-glow shadow-lg animate-glow-breathe"
          >
            Sign Up — Box Battle
          </button>
        </Motion>
      </div>
    </section>
  )
}

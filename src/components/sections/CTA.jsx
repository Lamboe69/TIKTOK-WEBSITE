import { Icons } from '../Icons'
import { useSignUp } from '../SignUpContext'
import Motion from '../Motion'

export default function CTA() {
  const { openOfficial } = useSignUp()

  return (
    <section className="py-20 sm:py-28 bg-dynasty-purple relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-20 w-64 h-64 bg-dynasty-orange/10 rounded-full blur-3xl animate-orb" />
        <div className="absolute bottom-10 left-20 w-48 h-48 bg-white/5 rounded-full blur-3xl animate-orb" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-dynasty-orange/5 rounded-full blur-3xl animate-spin-slow" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <Motion variant="scale-in">
          <span className="w-14 h-14 mx-auto mb-6 block text-dynasty-orange animate-float">{Icons.rocket}</span>
        </Motion>

        <Motion variant="fade-up" delay={100}>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
            Ready to Join the Dynasty?
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
            className="inline-block px-10 py-4 bg-dynasty-orange text-white font-bold rounded-xl text-sm btn-glow shadow-lg"
          >
            Sign Up &mdash; Box Battle
          </button>
        </Motion>
      </div>
    </section>
  )
}

import { Icons } from '../Icons'
import { useSignUp } from '../SignUpContext'
import Motion from '../Motion'
import Particles from '../Particles'

export default function CTA() {
  const { openOfficial } = useSignUp()

  return (
    <section className="py-24 sm:py-32 bg-dynasty-purple relative overflow-hidden">
      <Particles count={30} color="rgba(255,255,255,0.3)" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-20 w-64 h-64 bg-dynasty-orange/15 rounded-full blur-3xl animate-drift" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-10 left-20 w-48 h-48 bg-white/5 rounded-full blur-3xl animate-drift" style={{ animationDuration: '10s', animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-dynasty-orange/8 rounded-full blur-3xl animate-spin-slow" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <Motion variant="scale-in">
          <div className="relative inline-block mb-8">
            <span className="absolute -inset-6 rounded-full border-2 border-dynasty-orange/20 animate-pulse-ring pointer-events-none" />
            <span className="absolute -inset-10 rounded-full border border-dynasty-orange/10 animate-pulse-ring pointer-events-none" style={{ animationDelay: '1s' }} />
            <span className="w-16 h-16 mx-auto block text-dynasty-orange animate-float">{Icons.rocket}</span>
          </div>
        </Motion>

        <Motion variant="fade-up" delay={100}>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white mb-5 leading-tight">
            Ready to Join the<br />
            <span className="text-gradient-animated">Dynasty</span>?
          </h2>
        </Motion>

        <Motion variant="fade-up" delay={200}>
          <p className="text-white/70 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Sign up for the next Godsent Box Battle and take your first step toward the crown.
          </p>
        </Motion>

        <Motion variant="fade-up" delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={openOfficial}
              className="group relative px-10 py-4 bg-dynasty-orange text-white font-bold rounded-xl text-sm shadow-lg animate-glow-breathe overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Sign Up — Box Battle
                <span className="w-4 h-4 block group-hover:translate-x-1 transition-transform">{Icons.arrowRight}</span>
              </span>
            </button>
            <a
              href="https://www.tiktok.com/@kingmakernevergivesup"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-transparent border-2 border-white/30 text-white font-bold text-sm rounded-xl hover:border-white/60 hover:bg-white/5 transition-all"
            >
              Follow King Maker
            </a>
          </div>
        </Motion>
      </div>
    </section>
  )
}

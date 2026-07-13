import { useSignUp } from '../SignUpContext'
import { Icons } from '../Icons'
import Motion from '../Motion'
import useParallax from '../../hooks/useParallax'

export default function CTA() {
  const { openOfficial } = useSignUp()
  const [parallaxRef, parallaxStyle] = useParallax({ factor: 0.12 })

  return (
    <section className="relative overflow-hidden" style={{ minHeight: 360 }}>
      {/* Background image */}
      <img loading="lazy"
        src="/battles-photos/daily-godsent.jpg"
        alt="Join the Dynasty"
        className="absolute inset-0 w-full h-full object-cover"
        ref={parallaxRef}
        style={parallaxStyle}
      />
      {/* Deep overlay — stage gradient */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, rgba(59,16,99,0.92) 0%, rgba(18,6,32,0.96) 60%, rgba(18,6,32,0.98) 100%)' }}
      />
      {/* Subtle ember orb */}
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,107,26,0.15) 0%, transparent 70%)', transform: 'translate(30%, 30%)' }}
      />
      {/* Purple orb top-left */}
      <div
        className="absolute top-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(107,63,160,0.2) 0%, transparent 70%)', transform: 'translate(-30%, -30%)' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
        <Motion delay={0.1}>
          {/* Crown icon */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: 'rgba(255,107,26,0.15)', border: '1px solid rgba(255,107,26,0.25)' }}
          >
            <span className="w-7 h-7 block text-ember animate-spin-slow">{Icons.crown}</span>
          </div>

          <h2
            className="font-display font-bold text-ivory mb-4 leading-tight"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.02em' }}
          >
            Ready to Join the Dynasty?
          </h2>

          <p className="text-white/55 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
            Whether you're a creator, a supporter, or just curious —<br className="hidden sm:block" />
            there's a place for you in KM DYNASTY.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={openOfficial}
              className="btn-shimmer btn-glow w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-ember hover:shadow-ember-lg"
              style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)', borderRadius: 8, boxShadow: '0 8px 32px rgba(255,107,26,0.35)' }}
            >
              <span className="w-4 h-4 block">{Icons.swords}</span>
              Sign Up — Box Battle
            </button>
            <a
              href="https://www.tiktok.com/@kingmakernevergivesup"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-medium text-white/80 hover:text-white transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)' }}
            >
              <span className="w-4 h-4 block">{Icons.tiktok}</span>
              Follow King Maker
            </a>
          </div>
        </Motion>
      </div>
    </section>
  )
}

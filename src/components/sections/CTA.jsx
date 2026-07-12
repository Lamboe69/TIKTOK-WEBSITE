import { useSignUp } from '../SignUpContext'
import { Icons } from '../Icons'
import Motion from '../Motion'

export default function CTA() {
  const { openOfficial } = useSignUp()

  return (
    <section className="py-16 sm:py-20 bg-brand-900">
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <Motion variant="fade-up">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3">
            Ready to Join the Dynasty?
          </h2>
        </Motion>

        <Motion variant="fade-up" delay={100}>
          <p className="text-brand-400 text-sm sm:text-base max-w-lg mx-auto mb-6 leading-relaxed">
            Whether you're a creator, a supporter, or just curious — there's a place for you in KM DYNASTY.
          </p>
        </Motion>

        <Motion variant="fade-up" delay={200}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={openOfficial}
              className="px-6 py-3 bg-white text-brand-900 font-semibold text-sm rounded-lg hover:bg-brand-50 transition-colors"
            >
              <span className="flex items-center gap-2">
                {Icons.arrowRight}
                Sign Up — Box Battle
              </span>
            </button>
            <a
              href="https://www.tiktok.com/@kingmakernevergivesup"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white/10 text-white font-medium text-sm rounded-lg border border-white/10 hover:bg-white/15 transition-colors"
            >
              Follow King Maker
            </a>
          </div>
        </Motion>
      </div>
    </section>
  )
}

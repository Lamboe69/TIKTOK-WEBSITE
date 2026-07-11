import { Icons } from '../Icons'
import Motion from '../Motion'

export default function WinnersVisit() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Motion variant="fade-up">
          <div className="bg-dynasty-cream rounded-3xl p-8 sm:p-12 border border-gray-100 card-hover group">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <Motion variant="scale-in" delay={100}>
                <div className="w-20 h-20 rounded-2xl bg-dynasty-purple text-white flex items-center justify-center flex-shrink-0 group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
                  <span className="w-10 h-10 block">{Icons.film}</span>
                </div>
              </Motion>
              <div className="text-center sm:text-left">
                <Motion variant="fade-left" delay={200}>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-dynasty-charcoal mb-3">
                    Winners' Livestream Visit
                  </h2>
                </Motion>
                <Motion variant="fade-left" delay={300}>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5 max-w-xl">
                    Winners from official Godsent Box Battles get a scheduled livestream visit with KM DYNASTY.
                    The Champion gets priority. Your moment in the spotlight.
                  </p>
                </Motion>
                <Motion variant="fade-left" delay={400}>
                  <a
                    href="https://www.tiktok.com/@kingmakernevergivesup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-dynasty-orange text-white font-semibold text-sm rounded-xl btn-glow"
                  >
                    Follow King Maker
                    <span className="w-4 h-4 block">{Icons.arrowRight}</span>
                  </a>
                </Motion>
              </div>
            </div>
          </div>
        </Motion>
      </div>
    </section>
  )
}

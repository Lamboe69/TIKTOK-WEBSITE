import { Icons } from '../Icons'
import Motion from '../Motion'

export default function WinnersVisit() {
  return (
    <section className="py-20 sm:py-28 bg-dynasty-charcoal text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-dynasty-purple/15 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-dynasty-orange/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-dynasty-purple/10 rounded-full blur-[80px]" />
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-3xl p-8 sm:p-12 hover:bg-white/[0.06] transition-all duration-500">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            {/* Icon */}
            <Motion variant="scale-in" delay={100}>
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-dynasty-orange to-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-dynasty-orange/20 group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
                <span className="w-10 h-10 block">{Icons.film}</span>
              </div>
            </Motion>

            {/* Content */}
            <div className="text-center sm:text-left flex-1">
              <Motion variant="fade-left" delay={200}>
                <h2 className="font-display font-bold text-2xl sm:text-3xl mb-3">
                  Winners' Livestream <span className="text-dynasty-orange">Visit</span>
                </h2>
              </Motion>
              <Motion variant="fade-left" delay={300}>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                  Winners from official Godsent Box Battles get a scheduled livestream visit with KM DYNASTY.
                  The Champion gets priority. <span className="text-white font-medium">Your moment in the spotlight.</span>
                </p>
              </Motion>
              <Motion variant="fade-left" delay={400}>
                <a
                  href="https://www.tiktok.com/@kingmakernevergivesup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-dynasty-orange text-white font-bold text-sm rounded-xl btn-glow shadow-lg shadow-dynasty-orange/30 hover:bg-dynasty-orange/90 transition-colors"
                >
                  Follow King Maker
                  <span className="w-4 h-4 block">{Icons.arrowRight}</span>
                </a>
              </Motion>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

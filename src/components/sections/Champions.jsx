import { Link } from 'react-router-dom'
import { Icons } from '../Icons'
import Motion from '../Motion'
import Particles from '../Particles'

export default function Champions() {
  return (
    <section className="py-20 sm:py-28 bg-dynasty-charcoal text-white relative overflow-hidden">
      <Particles count={20} color="rgba(255,122,0,0.4)" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-dynasty-orange/5 rounded-full blur-3xl animate-spin-slow" />
        <div className="absolute top-10 left-[20%] w-24 h-24 bg-dynasty-purple/15 rounded-full blur-[60px] animate-drift" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-10 right-[20%] w-32 h-32 bg-dynasty-orange/10 rounded-full blur-[60px] animate-drift" style={{ animationDuration: '10s', animationDelay: '3s' }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Champion headline */}
        <div className="text-center mb-12">
          <Motion variant="scale-in">
            <div className="relative inline-block mb-6">
              <span className="w-16 h-16 mx-auto block text-dynasty-orange animate-float">{Icons.trophy}</span>
              <span className="absolute -inset-3 rounded-full border border-dynasty-orange/20 animate-pulse-ring pointer-events-none" />
            </div>
          </Motion>

          <Motion variant="fade-up" delay={100}>
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4">
              Champion of the <span className="text-gradient-animated">Champions</span>
            </h2>
          </Motion>

          <Motion variant="fade-up" delay={200}>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-6">
              Winners from <strong className="text-white">ALL Official Godsent Box Battles</strong> compete in a final
              KM DYNASTY finale &mdash; fierce, fast, respectful, community-first. One ultimate champion rises.
            </p>
          </Motion>

          <Motion variant="fade-up" delay={300} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-dynasty-orange/10 border border-dynasty-orange/20 rounded-full animate-glow-breathe">
              <span className="w-4 h-4 block text-dynasty-orange">{Icons.crown}</span>
              <span className="text-dynasty-orange text-sm font-semibold">One Crown. One Dynasty.</span>
            </div>
            <Link
              to="/how-to-join#steps-8-9"
              className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 text-white text-sm font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 btn-glow"
            >
              See the Finale Path
              <span className="w-4 h-4 block">{Icons.arrowRight}</span>
            </Link>
          </Motion>
        </div>

        {/* Winners' Livestream Visit — merged from WinnersVisit */}
        <Motion variant="fade-up" delay={400}>
          <div className="relative bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-8 sm:p-10 overflow-hidden group hover:border-white/[0.15] transition-all duration-300 shimmer-line">
            {/* Background accents */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-dynasty-orange/10 rounded-full blur-[80px] animate-drift" style={{ animationDuration: '8s' }} />
              <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-dynasty-purple/10 rounded-full blur-[80px] animate-drift" style={{ animationDuration: '10s', animationDelay: '3s' }} />
            </div>

            <div className="relative flex flex-col sm:flex-row items-center gap-8">
              {/* Icon */}
              <div className="w-18 h-18 rounded-2xl bg-gradient-to-br from-dynasty-orange to-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-dynasty-orange/20 group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
                <span className="w-9 h-9 block">{Icons.film}</span>
              </div>

              {/* Content */}
              <div className="text-center sm:text-left flex-1">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-2">
                  Winners' Livestream <span className="text-dynasty-orange">Visit</span>
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-lg">
                  Winners from official Godsent Box Battles get a scheduled livestream visit with KM DYNASTY.
                  The Champion gets priority. <span className="text-white font-medium">Your moment in the spotlight.</span>
                </p>
                <a
                  href="https://www.tiktok.com/@kingmakernevergivesup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-dynasty-orange text-white font-bold text-sm rounded-xl btn-glow shadow-lg shadow-dynasty-orange/30 hover:bg-dynasty-orange/90 transition-colors"
                >
                  Follow King Maker
                  <span className="w-4 h-4 block">{Icons.arrowRight}</span>
                </a>
              </div>
            </div>
          </div>
        </Motion>
      </div>
    </section>
  )
}

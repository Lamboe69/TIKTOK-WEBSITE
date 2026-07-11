import { Link } from 'react-router-dom'
import { Icons } from '../Icons'
import Motion from '../Motion'

export default function Champions() {
  return (
    <section className="py-20 sm:py-28 bg-dynasty-charcoal text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-dynasty-orange/5 rounded-full blur-3xl animate-spin-slow" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <Motion variant="scale-in">
          <span className="w-16 h-16 mx-auto mb-6 block text-dynasty-orange animate-float">{Icons.trophy}</span>
        </Motion>

        <Motion variant="fade-up" delay={100}>
          <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4">
            Champion of the Champions
          </h2>
        </Motion>

        <Motion variant="fade-up" delay={200}>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
            Winners from <strong className="text-white">ALL Official Godsent Box Battles</strong> compete in a final
            KM DYNASTY finale &mdash; fierce, fast, respectful, community-first. One ultimate champion rises.
          </p>
        </Motion>

        <Motion variant="fade-up" delay={300} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-dynasty-orange/10 border border-dynasty-orange/20 rounded-full animate-glow">
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
    </section>
  )
}

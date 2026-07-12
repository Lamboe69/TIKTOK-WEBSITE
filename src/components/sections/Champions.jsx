import { Link } from 'react-router-dom'
import { Icons } from '../Icons'
import Motion from '../Motion'

export default function Champions() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6">
          <Motion variant="scale-in">
            <div className="inline-block mb-3">
              <span className="w-10 h-10 mx-auto block text-gold">{Icons.trophy}</span>
            </div>
          </Motion>

          <Motion variant="fade-up" delay={100}>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-900 mb-2">
              Champion of the Champions
            </h2>
          </Motion>

          <Motion variant="fade-up" delay={200}>
            <p className="text-brand-500 text-sm max-w-xl mx-auto leading-relaxed mb-4">
              Winners from all Official Godsent Box Battles compete in a final
              KM DYNASTY finale — fierce, fast, respectful, community-first.
            </p>
          </Motion>

          <Motion variant="fade-up" delay={300}>
            <Link
              to="/how-to-join"
              className="inline-flex items-center gap-2 px-5 py-2 bg-brand-50 text-brand-900 text-sm font-semibold rounded-lg border border-brand-100 hover:bg-brand-100 transition-colors"
            >
              See the Finale Path
              <span className="w-4 h-4 block">{Icons.arrowRight}</span>
            </Link>
          </Motion>
        </div>
      </div>
    </section>
  )
}

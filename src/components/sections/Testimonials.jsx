import { useRef } from 'react'
import Motion from '../Motion'
import testimonials from '../../data/testimonials'
import { Icons } from '../Icons'

export default function Testimonials() {
  const scrollRef = useRef(null)

  const doubled = [...testimonials, ...testimonials]

  return (
    <section className="py-16 sm:py-20 bg-dynasty-charcoal overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Motion delay={0.1}>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 text-dynasty-orange text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-4 h-4 block">{Icons.star}</span>
              Testimony & Feedback
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
              What Our Family Says
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Real words from real members of the KM Dynasty community.
            </p>
          </div>
        </Motion>

        {/* Scrolling row */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {doubled.map((t, idx) => (
            <div
              key={`${t.handle}-${idx}`}
              className="flex-shrink-0 w-[320px] snap-start rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-dynasty-orange" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed flex-1 mb-5">
                "{t.text}"
              </p>

              <div className="border-t border-white/10 pt-4">
                <p className="font-display font-bold text-white text-sm">{t.name}</p>
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-dynasty-orange text-xs hover:underline mt-1"
                >
                  <span className="w-3 h-3 block">{Icons.tiktok}</span>
                  {t.handle}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { useState, useRef } from 'react'
import Motion from '../Motion'
import testimonials from '../../data/testimonials'

function Card({ name, handle, text, photo }) {
  const [expanded, setExpanded] = useState(false)
  const isLong = text.length > 160

  return (
    <div
      className="flex-shrink-0 w-80 sm:w-96 rounded-2xl p-6 flex flex-col snap-start"
      style={{
        background: 'rgba(59,16,99,0.22)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderTop: '2px solid rgba(255,107,26,0.25)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
    >
      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-ember text-sm">★</span>
        ))}
      </div>
      {/* Quote */}
      <p className="text-white/70 text-sm leading-relaxed flex-1 mb-5">
        &ldquo;{expanded || !isLong ? text : text.slice(0, 160) + '…'}&rdquo;
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded(v => !v)}
          className="text-ember text-xs font-semibold mb-4 text-left hover:underline self-start"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
      {/* Author */}
      <div className="flex items-center gap-3 mt-auto">
        <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <img
            loading="lazy"
            src={photo}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          {/* Photo gradient overlay for legibility */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(18,6,32,0.4) 0%, transparent 60%)' }} />
        </div>
        <div>
          <p className="text-ivory text-sm font-semibold leading-none mb-0.5">{name}</p>
          <p className="text-white/40 text-xs">{handle}</p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const railRef = useRef(null)
  const all = testimonials && testimonials.length ? testimonials : []

  const scroll = (dir) => {
    if (!railRef.current) return
    railRef.current.scrollBy({ left: dir * 360, behavior: 'smooth' })
  }

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden" style={{ background: '#1B1024' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(59,16,99,0.3) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mb-10">
        <Motion delay={0.05} className="flex items-end justify-between">
          <div>
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 text-ember"
              style={{ background: 'rgba(255,107,26,0.1)' }}
            >
              ★ Community
            </span>
            <h2
              className="font-display font-bold text-ivory"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.02em' }}
            >
              What Our Family <span className="text-gradient">Says</span>
            </h2>
          </div>
          {/* Nav arrows */}
          <div className="hidden sm:flex items-center gap-2 mb-1">
            <button
              onClick={() => scroll(-1)}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-white/10 text-white/50 hover:border-ember hover:text-ember transition-all"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              onClick={() => scroll(1)}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-white/10 text-white/50 hover:border-ember hover:text-ember transition-all"
              aria-label="Next"
            >
              ›
            </button>
          </div>
        </Motion>
      </div>

      {/* Scroll-snap rail */}
      <div
        ref={railRef}
        className="relative z-10 flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 sm:px-6 pb-4"
        style={{ maxWidth: '100vw' }}
      >
        {all.map((t, i) => (
          <Card key={i} {...t} />
        ))}
        {/* Fade-out edge */}
        <div className="flex-shrink-0 w-8" />
      </div>

      {/* Right fade mask */}
      <div
        className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none z-20"
        style={{ background: 'linear-gradient(to left, #1B1024 0%, transparent 100%)' }}
      />
    </section>
  )
}

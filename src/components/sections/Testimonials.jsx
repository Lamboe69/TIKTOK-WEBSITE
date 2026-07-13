import { useState } from 'react'
import Motion from '../Motion'
import TestimonialModal from '../TestimonialModal'
import testimonials from '../../data/testimonials'

function Card({ name, handle, text, photo, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group flex-shrink-0 w-80 rounded-2xl p-5 mx-2 transition-all duration-300 hover:scale-[1.02] text-left cursor-pointer"
      style={{
        background: 'rgba(59,16,99,0.28)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderLeft: '3px solid rgba(255,107,26,0.15)',
      }}
    >
      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-ember text-sm">★</span>
        ))}
      </div>
      {/* Quote */}
      <p className="text-white/70 text-sm leading-relaxed mb-5 line-clamp-4">"{text}"</p>
      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border border-white/10" style={{ background: 'rgba(59,16,99,0.6)' }}>
          <img loading="lazy"
            src={photo}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none' }}
          />
        </div>
        <div>
          <p className="text-ivory text-sm font-semibold leading-none mb-0.5">{name}</p>
          <p className="text-white/40 text-xs">{handle}</p>
        </div>
      </div>
    </button>
  )
}

export default function Testimonials() {
  const [selected, setSelected] = useState(null)
  const all = testimonials && testimonials.length ? testimonials : []
  const doubled = [...all, ...all]
  const row2 = [...all.slice(Math.floor(all.length / 2)), ...all.slice(0, Math.floor(all.length / 2)), ...all.slice(Math.floor(all.length / 2)), ...all.slice(0, Math.floor(all.length / 2))]

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden" style={{ background: '#1B1024' }}>
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(59,16,99,0.35) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <Motion delay={0.05} className="text-center">
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 text-ember"
            style={{ background: 'rgba(255,107,26,0.1)' }}
          >
            ★ Testimony & Feedback
          </span>
          <h2
            className="font-display font-bold text-ivory mb-3"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.02em' }}
          >
            What Our Family <span className="text-gradient">Says</span>
          </h2>
          <p className="text-white/50 text-sm max-w-md mx-auto">
            Real words from real members of the KM Dynasty community.
          </p>
        </Motion>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="flex animate-marquee-left mb-4">
        {doubled.map((t, i) => <Card key={i} {...t} onClick={() => setSelected(t)} />)}
      </div>

      {/* Row 2 — scrolls right */}
      <div className="flex animate-marquee-right">
        {row2.map((t, i) => <Card key={i} {...t} onClick={() => setSelected(t)} />)}
      </div>

      {/* Testimonial modal */}
      <TestimonialModal testimonial={selected} onClose={() => setSelected(null)} />
    </section>
  )
}

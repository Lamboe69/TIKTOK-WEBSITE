import Motion from '../Motion'
import testimonials from '../../data/testimonials'

function Card({ name, handle, text, photo }) {
  return (
    <div
      className="flex-shrink-0 w-80 rounded-2xl p-5 mx-2"
      style={{ background: 'rgba(59,16,99,0.28)', border: '1px solid rgba(255,255,255,0.07)' }}
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
        <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-dynasty-purple/40">
          <img
            src={photo}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.parentNode.style.background = 'rgba(59,16,99,0.6)'
            }}
          />
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
  const all = testimonials && testimonials.length ? testimonials : []
  const doubled = [...all, ...all]
  const row2 = [...all.slice(Math.floor(all.length / 2)), ...all.slice(0, Math.floor(all.length / 2)), ...all.slice(Math.floor(all.length / 2)), ...all.slice(0, Math.floor(all.length / 2))]

  return (
    <section className="py-16 sm:py-24 overflow-hidden" style={{ background: '#1B1024' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <Motion delay={0.1} className="text-center">
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
            What Our Family Says
          </h2>
          <p className="text-white/50 text-sm max-w-md mx-auto">
            Real words from real members of the KM Dynasty community.
          </p>
        </Motion>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="flex animate-marquee-left mb-4">
        {doubled.map((t, i) => <Card key={i} {...t} />)}
      </div>

      {/* Row 2 — scrolls right */}
      <div className="flex animate-marquee-right">
        {row2.map((t, i) => <Card key={i} {...t} />)}
      </div>
    </section>
  )
}

import Motion from '../Motion'
import testimonials from '../../data/testimonials'
import { Icons } from '../Icons'

export default function Testimonials() {
  const row1 = [...testimonials, ...testimonials]
  const row2 = [...testimonials].reverse().concat([...testimonials].reverse())

  return (
    <section className="py-14 sm:py-20 relative overflow-hidden" style={{
      background: 'linear-gradient(160deg, #1F0A38 0%, #2D1050 50%, #1F0A38 100%)',
    }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[300px] h-[200px] bg-ember/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[250px] h-[180px] bg-dynasty-purple/10 rounded-full blur-[80px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 mb-10">
        <Motion variant="fade-up" className="text-center">
          <span className="badge badge-member-dark mb-5 inline-flex">
            <span className="w-3.5 h-3.5 block">{Icons.star}</span>
            Testimony & Feedback
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white" style={{ letterSpacing: '-0.02em' }}>
            What Our Family <em className="not-italic text-gradient">Says</em>
          </h2>
        </Motion>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="relative mb-4 overflow-hidden">
        <div className="flex gap-4 animate-marquee-left" style={{ width: 'max-content' }}>
          {row1.map((t, idx) => <TestimonialCard key={`r1-${idx}`} t={t} />)}
        </div>
        <div className="absolute inset-y-0 left-0 w-20 pointer-events-none" style={{ background: 'linear-gradient(90deg, #1F0A38, transparent)' }} />
        <div className="absolute inset-y-0 right-0 w-20 pointer-events-none" style={{ background: 'linear-gradient(-90deg, #1F0A38, transparent)' }} />
      </div>

      {/* Row 2 — scrolls right */}
      <div className="relative overflow-hidden">
        <div className="flex gap-4 animate-marquee-right" style={{ width: 'max-content' }}>
          {row2.map((t, idx) => <TestimonialCard key={`r2-${idx}`} t={t} />)}
        </div>
        <div className="absolute inset-y-0 left-0 w-20 pointer-events-none" style={{ background: 'linear-gradient(90deg, #2D1050, transparent)' }} />
        <div className="absolute inset-y-0 right-0 w-20 pointer-events-none" style={{ background: 'linear-gradient(-90deg, #2D1050, transparent)' }} />
      </div>
    </section>
  )
}

function TestimonialCard({ t }) {
  return (
    <div className="flex-shrink-0 w-[280px] sm:w-[300px] rounded-xl p-5 flex flex-col"
      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-3">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-3.5 h-3.5 text-ember" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      <p className="text-white/70 text-xs leading-relaxed flex-1 mb-4 line-clamp-4">"{t.text}"</p>

      <div className="flex items-center gap-2.5 border-t pt-3" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        {t.photo && (
          <img src={t.photo} alt={t.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0 ring-1 ring-white/15" />
        )}
        <div>
          <p className="font-display font-bold text-white text-xs">{t.name}</p>
          <p className="font-mono text-white/50 text-xs mt-0.5">{t.handle}</p>
        </div>
      </div>
    </div>
  )
}

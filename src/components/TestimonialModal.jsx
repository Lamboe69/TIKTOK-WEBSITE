import { useEffect, useRef } from 'react'

export default function TestimonialModal({ testimonial, onClose }) {
  const overlayRef = useRef(null)

  useEffect(() => {
    if (!testimonial) return

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [testimonial, onClose])

  if (!testimonial) return null

  const { text, name, handle, photo } = testimonial

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      style={{ background: 'rgba(18,6,32,0.92)', backdropFilter: 'blur(16px)' }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      <div
        className="relative max-w-lg w-full rounded-2xl p-8 border border-white/10"
        style={{ background: 'rgba(27,16,36,0.95)' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-all"
          style={{ background: 'rgba(255,255,255,0.06)' }}
          aria-label="Close modal"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Stars */}
        <div className="flex gap-1 mb-5">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-ember text-base">★</span>
          ))}
        </div>

        {/* Full quote */}
        <p className="text-ivory/85 text-base leading-relaxed mb-7 italic">
          &ldquo;{text}&rdquo;
        </p>

        {/* Author */}
        <div className="flex items-center gap-4 pt-4 border-t border-white/06">
          <div
            className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-white/10"
            style={{ background: 'rgba(59,16,99,0.6)' }}
          >
            {photo && (
              <img
                src={photo}
                alt={name}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none' }}
              />
            )}
          </div>
          <div>
            <p className="text-ivory font-semibold text-base">{name}</p>
            {handle && <p className="text-white/40 text-sm">{handle}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

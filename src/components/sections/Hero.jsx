import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSignUp } from '../SignUpContext'
import { photos as fallbackPhotos } from '../../data/photos'
import { useContent } from '../../cms/ContentContext'
import { normalizeHeroSlides } from '../../cms/normalize'

const SLIDE_MS = 3000
const SWIPE_THRESHOLD = 40

export default function Hero() {
  const { openOfficial, openSpecial } = useSignUp()
  const { collections, settings, getPage } = useContent()
  const siteName = settings.siteName || 'KM DYNASTY'
  const homePage = getPage('home')
  const photos = useMemo(() => {
    const fromCms = normalizeHeroSlides(collections.heroSlides)
    return fromCms.length ? fromCms : fallbackPhotos
  }, [collections.heroSlides])
  // Extended track: all photos + clone of first for seamless left wrap
  const track = useMemo(() => (photos.length ? [...photos, photos[0]] : []), [photos])
  const [index, setIndex] = useState(0)
  const [animate, setAnimate] = useState(true)
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const animRef = useRef(null)
  const startRef = useRef(0)
  const elapsedRef = useRef(0)
  const touchX = useRef(null)
  const wrapping = useRef(false)

  const realIndex = index % photos.length
  const slide = photos[realIndex]
  const total = photos.length

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = (e) => setReducedMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const jumpTo = useCallback((nextReal) => {
    const target = ((nextReal % total) + total) % total
    wrapping.current = false
    setAnimate(true)
    setIndex(target)
    setProgress(0)
    elapsedRef.current = 0
    startRef.current = performance.now()
  }, [total])

  const advance = useCallback(() => {
    if (wrapping.current) return
    setIndex((i) => i + 1)
    setProgress(0)
    elapsedRef.current = 0
    startRef.current = performance.now()
  }, [])

  const next = useCallback(() => {
    if (wrapping.current) return
    setAnimate(true)
    advance()
  }, [advance])

  const prev = useCallback(() => {
    if (wrapping.current) return
    if (index === 0) {
      // Jump to clone silently, then animate back one
      wrapping.current = true
      setAnimate(false)
      setIndex(total)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true)
          setIndex(total - 1)
          wrapping.current = false
          setProgress(0)
          elapsedRef.current = 0
          startRef.current = performance.now()
        })
      })
      return
    }
    setAnimate(true)
    setIndex((i) => i - 1)
    setProgress(0)
    elapsedRef.current = 0
    startRef.current = performance.now()
  }, [index, total])

  const onTrackTransitionEnd = () => {
    if (index >= total) {
      wrapping.current = true
      setAnimate(false)
      setIndex(0)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true)
          wrapping.current = false
        })
      })
    }
  }

  // Autoplay every 3 seconds
  useEffect(() => {
    if (paused) {
      if (animRef.current) cancelAnimationFrame(animRef.current)
      return
    }

    startRef.current = performance.now() - elapsedRef.current

    const tick = (now) => {
      if (wrapping.current) {
        animRef.current = requestAnimationFrame(tick)
        return
      }
      const elapsed = now - startRef.current
      elapsedRef.current = elapsed
      const p = Math.min(elapsed / SLIDE_MS, 1)
      setProgress(p)
      if (p >= 1) {
        elapsedRef.current = 0
        startRef.current = now
        setProgress(0)
        setIndex((i) => i + 1)
      }
      animRef.current = requestAnimationFrame(tick)
    }

    animRef.current = requestAnimationFrame(tick)
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [paused])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (Math.abs(dx) < SWIPE_THRESHOLD) return
    if (dx < 0) next()
    else prev()
  }

  const handleCta = () => {
    if (slide.cta?.action === 'openSpecial') openSpecial()
    else openOfficial()
  }

  const shouldAnimate = animate && !reducedMotion
  const trackCount = track.length

  return (
    <section
      className="hero-arena relative h-[calc(100svh-4rem)] min-h-[540px] overflow-hidden"
      style={{ background: '#160B2C' }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
      aria-label={`${siteName} battle showcase`}
    >
      {/* ═══ Full-bleed track — slides LEFT every 3s ═══ */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`hero-track flex h-full ${shouldAnimate ? '' : 'hero-track--instant'}`}
          style={{
            width: `${trackCount * 100}%`,
            transform: `translate3d(-${(index / trackCount) * 100}%, 0, 0)`,
          }}
          onTransitionEnd={(e) => {
            if (e.target !== e.currentTarget) return
            onTrackTransitionEnd()
          }}
        >
          {track.map((photo, i) => (
            <div
              key={`${photo.src}-${i}`}
              className="hero-panel relative h-full flex-shrink-0 overflow-hidden"
              style={{ width: `${100 / trackCount}%` }}
              aria-hidden={i !== index}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading={i < 2 ? 'eager' : 'lazy'}
                className={`hero-panel-img absolute inset-0 w-full h-full object-cover ${
                  i === index ? 'is-active' : ''
                }`}
                onError={(e) => { e.target.style.opacity = '0.3' }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: i % 2 === 0
                    ? 'linear-gradient(135deg, rgba(90,40,160,0.38), transparent 60%)'
                    : 'linear-gradient(225deg, rgba(255,107,26,0.28), transparent 55%)',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Peeking next frames on desktop */}
      <div className="hero-peek absolute top-0 right-0 bottom-0 z-[1] pointer-events-none hidden lg:block" aria-hidden>
        <div className="absolute inset-0 flex gap-3 items-stretch py-[18%] pr-4 pl-10">
          {[1, 2].map((offset) => {
            const p = photos[(realIndex + offset) % total]
            return (
              <div
                key={`${p.src}-peek-${offset}`}
                className={`hero-peek-card ${offset === 1 ? 'hero-peek-card--near' : 'hero-peek-card--far'}`}
              >
                <img src={p.src} alt="" />
              </div>
            )
          })}
        </div>
      </div>

      <div className="hero-veil absolute inset-0 z-[2] pointer-events-none" />

      {/* Top progress */}
      <div className="absolute top-0 left-0 right-0 z-[4] h-[2px] bg-white/10">
        <div
          className="h-full bg-ember origin-left"
          style={{
            transform: `scaleX(${progress})`,
            boxShadow: '0 0 12px rgba(255,107,26,0.55)',
          }}
        />
      </div>

      {/* Brand + CTA */}
      <div className="absolute inset-0 z-[3] flex flex-col justify-end pointer-events-none">
        <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 pb-28 sm:pb-32 pt-24">
          <div className="max-w-xl pointer-events-auto">
            <p className="font-body text-[11px] tracking-[0.35em] uppercase text-white/45 mb-4">
              {homePage.heroTagline || (settings.tagline ? settings.tagline.split('.')[0] : 'Godsent Box Battles')}
            </p>

            <h1 className="font-display font-extrabold leading-[0.88] tracking-[-0.03em]">
              <span className="block text-ivory" style={{ fontSize: 'clamp(3.25rem, 11vw, 7rem)' }}>
                {siteName.split(' ').length > 1 ? siteName.split(' ')[0] : siteName}
              </span>
              <span
                className="block hero-brand-outline"
                style={{ fontSize: 'clamp(3.25rem, 11vw, 7rem)' }}
              >
                {siteName.split(' ').length > 1 ? siteName.split(' ').slice(1).join(' ') : ''}
              </span>
            </h1>

            <div className="mt-6 mb-8 min-h-[4.75rem]" key={realIndex}>
              <p
                className="hero-caption font-display font-semibold text-ember italic leading-tight mb-2"
                style={{ fontSize: 'clamp(1.25rem, 2.8vw, 1.85rem)' }}
              >
                {slide.caption}
              </p>
              <p className="hero-line text-white/60 text-sm sm:text-base max-w-sm leading-relaxed">
                {slide.line}
              </p>
            </div>

            <div
              className="flex flex-wrap items-center gap-4"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <button
                type="button"
                onClick={handleCta}
                className="hero-cta group relative inline-flex items-center gap-3 px-8 py-4 text-sm sm:text-base font-bold text-white overflow-hidden"
              >
                <span className="relative z-[1]">{slide.cta?.label || 'Join My Box Battle'}</span>
                <svg className="relative z-[1] w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="hero-cta-sweep" aria-hidden />
              </button>

              <Link
                to="/battle-schedule"
                className="text-sm font-medium text-white/55 hover:text-ivory transition-colors underline-offset-4 hover:underline"
              >
                See Schedule
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Filmstrip — all 6 images visible */}
      <div
        className="hero-filmstrip absolute bottom-0 inset-x-0 z-[4]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-5 pt-3">
          <div className="flex items-end gap-2 sm:gap-3 overflow-x-auto scrollbar-hide">
            {photos.map((photo, i) => {
              const active = i === realIndex
              return (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() => jumpTo(i)}
                  className={`hero-thumb group relative flex-shrink-0 overflow-hidden transition-all duration-500 ${
                    active ? 'is-active' : ''
                  }`}
                  aria-label={`Slide ${i + 1}: ${photo.caption}`}
                  aria-current={active ? 'true' : undefined}
                >
                  <img
                    src={photo.src}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className={`absolute bottom-1.5 left-1.5 font-display text-[10px] tracking-wider tabular-nums ${
                    active ? 'text-ember' : 'text-white/70'
                  }`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {active && (
                    <span
                      className="absolute bottom-0 left-0 h-0.5 bg-ember"
                      style={{ width: `${progress * 100}%` }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={prev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-[4] w-10 h-10 flex items-center justify-center text-white/40 hover:text-ivory transition-colors"
        aria-label="Previous slide"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-[4] w-10 h-10 flex items-center justify-center text-white/40 hover:text-ivory transition-colors"
        aria-label="Next slide"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </section>
  )
}

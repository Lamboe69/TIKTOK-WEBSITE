import { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { useSignUp } from '../SignUpContext'
import { photos } from '../../data/photos'
import LiveStatus from '../LiveStatus'
import { Icons } from '../Icons'

export default function Hero() {
  const { openOfficial, openSpecial } = useSignUp()
  const swiperRef = useRef(null)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (!swiperRef.current) return
    if (paused || reducedMotion) {
      swiperRef.current.autoplay.stop()
    } else {
      swiperRef.current.autoplay.start()
    }
  }, [paused, reducedMotion])

  return (
    <section
      className="relative bg-dynasty-charcoal h-[520px] sm:h-[600px] md:h-[680px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setTimeout(() => setPaused(false), 2000)}
    >
      {/* Photo carousel — background layer */}
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={700}
        autoplay={{ delay: 5000, disableOnInteraction: false, waitForTransition: true }}
        loop
        pagination={{ clickable: true }}
        onSwiper={(api) => { swiperRef.current = api }}
        className="w-full h-full hero-swiper"
      >
        {photos.map(({ src, alt }, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-full">
              <img
                src={src}
                alt={alt}
                loading={i < 2 ? 'eager' : 'lazy'}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none' }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Dark overlay — consistent across all slides */}
      <div className="absolute inset-0 bg-gradient-to-t from-dynasty-charcoal via-dynasty-charcoal/70 to-dynasty-charcoal/40 z-[1]" />

      {/* Brand content — on top of everything */}
      <div className="absolute inset-0 z-[2] flex flex-col justify-end pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto w-full">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-dynasty-orange animate-pulse" />
            <span className="text-dynasty-orange text-xs font-semibold uppercase tracking-wider">
              The Official Hub
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-3 leading-[1.1]">
            KM DYNASTY
          </h1>

          {/* Tagline */}
          <p className="text-white/70 text-base sm:text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
            Join the family. Compete in Godsent Box Battles. Rise with King Maker.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={openOfficial}
              className="px-7 py-3.5 bg-dynasty-orange text-white font-bold text-sm rounded-xl btn-glow shadow-lg shadow-dynasty-orange/30 hover:bg-dynasty-orange/90 transition-colors"
            >
              Join the Box Battle
            </button>
            <a
              href="#schedule"
              className="px-7 py-3.5 bg-white/10 backdrop-blur-sm text-white font-semibold text-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all"
            >
              See Schedule
            </a>
          </div>
        </div>
      </div>

      {/* Live Status Badge — top right */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
        <LiveStatus />
      </div>
    </section>
  )
}

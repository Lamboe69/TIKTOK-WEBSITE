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

      {/* Animated gradient overlay — shifts colors slowly */}
      <div className="absolute inset-0 z-[1]" style={{
        background: 'linear-gradient(135deg, rgba(34,25,52,0.85) 0%, rgba(91,42,134,0.5) 30%, rgba(255,122,0,0.15) 60%, rgba(34,25,52,0.9) 100%)',
        backgroundSize: '300% 300%',
        animation: 'gradient-shift 8s ease infinite',
      }} />

      {/* Floating accent orbs */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-[10%] w-32 h-32 bg-dynasty-orange/15 rounded-full blur-[60px] animate-drift" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-32 right-[15%] w-40 h-40 bg-dynasty-purple/20 rounded-full blur-[80px] animate-drift" style={{ animationDuration: '10s', animationDelay: '3s' }} />
      </div>

      {/* Brand content — on top of everything */}
      <div className="absolute inset-0 z-[2] flex flex-col justify-end pb-10 sm:pb-14 md:pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto w-full">
          {/* Frosted glass panel behind text */}
          <div className="relative inline-block">
            {/* Badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="relative w-3 h-3 rounded-full bg-dynasty-orange shadow-lg shadow-dynasty-orange/50">
                <span className="absolute inset-0 rounded-full bg-dynasty-orange animate-pulse-ring" />
              </span>
              <span className="text-dynasty-orange text-xs font-bold uppercase tracking-widest">
                The Official Hub
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-4 leading-[1.05]">
              KM <span className="text-gradient-animated">DYNASTY</span>
            </h1>

            {/* Tagline */}
            <p className="text-white/80 text-base sm:text-lg md:text-xl max-w-xl mb-8 leading-relaxed font-light">
              Join the family. Compete in Godsent Box Battles. Rise with King Maker.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={openOfficial}
                className="group relative px-8 py-4 bg-dynasty-orange text-white font-bold text-sm rounded-xl shadow-lg shadow-dynasty-orange/30 hover:bg-dynasty-orange/90 transition-all animate-glow-breathe overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Join the Box Battle
                  <span className="w-4 h-4 block group-hover:translate-x-1 transition-transform">{Icons.arrowRight}</span>
                </span>
              </button>
              <a
                href="#schedule"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold text-sm rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all"
              >
                See Schedule
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2">
        <span className="text-white/40 text-[10px] uppercase tracking-widest font-medium">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-white/60 animate-bounce" />
        </div>
      </div>

      {/* Live Status Badge — top right */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
        <LiveStatus />
      </div>
    </section>
  )
}

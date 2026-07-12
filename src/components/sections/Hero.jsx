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
      className="relative bg-brand-900 h-[480px] sm:h-[540px] md:h-[600px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setTimeout(() => setPaused(false), 2000)}
    >
      {/* Photo carousel */}
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={800}
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

      {/* Clean dark overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-brand-900/95 via-brand-900/60 to-brand-900/30" />

      {/* Content */}
      <div className="absolute inset-0 z-[2] flex flex-col justify-end pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto w-full">
          <div className="max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full mb-4">
              <span className="w-2 h-2 rounded-full bg-gold" />
              <span className="text-white/80 text-xs font-medium tracking-wide">
                The Official Hub
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white mb-3 leading-[1.1]">
              KM DYNASTY
            </h1>

            {/* Tagline */}
            <p className="text-white/70 text-sm sm:text-base md:text-lg max-w-md mb-6 leading-relaxed">
              Join the family. Compete in Godsent Box Battles. Rise with King Maker.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={openOfficial}
                className="group px-6 py-3 bg-white text-brand-900 font-semibold text-sm rounded-lg hover:bg-brand-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  Join the Box Battle
                  <span className="w-4 h-4 block group-hover:translate-x-0.5 transition-transform">{Icons.arrowRight}</span>
                </span>
              </button>
              <a
                href="#schedule"
                className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-medium text-sm rounded-lg border border-white/15 hover:bg-white/15 transition-colors"
              >
                See Schedule
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Live Status Badge */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
        <LiveStatus />
      </div>
    </section>
  )
}

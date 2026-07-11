import { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { useSignUp } from '../SignUpContext'
import { photos } from '../../data/photos'
import LiveStatus from '../LiveStatus'

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

  const handleAction = (action) => {
    if (action === 'openOfficial') openOfficial()
    else if (action === 'openSpecial') openSpecial()
  }

  return (
    <section
      className="relative bg-dynasty-purple h-[400px] sm:h-[500px] md:h-[600px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setTimeout(() => setPaused(false), 2000)}
    >
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={700}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        navigation
        lazy={{ loadPrevNext: true }}
        onSwiper={(api) => { swiperRef.current = api }}
        className="w-full h-full hero-swiper"
      >
        {photos.map(({ src, alt, caption, cta }, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-full">
              <img
                src={src}
                alt={alt}
                loading={i < 2 ? 'eager' : 'lazy'}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dynasty-charcoal/90 via-dynasty-purple/60 to-dynasty-purple/30" />
              <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-10">
                {caption && (
                  <span className="inline-block px-3 py-1 bg-dynasty-orange/90 text-white text-xs font-bold rounded-lg mb-2">
                    {caption}
                  </span>
                )}
                {cta && (
                  <div>
                    <button
                      onClick={() => handleAction(cta.action)}
                      className="px-5 py-2 bg-dynasty-orange text-white font-bold text-sm rounded-xl btn-glow shadow-lg shadow-dynasty-orange/30"
                    >
                      {cta.label}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Live Status Badge — top right */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
        <LiveStatus />
      </div>
    </section>
  )
}

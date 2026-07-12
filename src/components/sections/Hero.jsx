import { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { useSignUp } from '../SignUpContext'
import { photos } from '../../data/photos'
import LiveStatus from '../LiveStatus'
import { Icons } from '../Icons'
import CountdownTicker from '../CountdownTicker'

export default function Hero() {
  const { openOfficial } = useSignUp()
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
    if (paused || reducedMotion) swiperRef.current.autoplay.stop()
    else swiperRef.current.autoplay.start()
  }, [paused, reducedMotion])

  return (
    <section
      className="relative h-[520px] sm:h-[600px] md:h-[680px] overflow-hidden"
      style={{ background: '#120620' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Photo carousel */}
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={900}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        onSwiper={(api) => { swiperRef.current = api }}
        className="w-full h-full hero-swiper"
      >
        {photos.map(({ src, alt }, i) => (
          <SwiperSlide key={i}>
            <img
              src={src}
              alt={alt}
              loading={i < 2 ? 'eager' : 'lazy'}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none' }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Multi-layer overlay */}
      <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(135deg, rgba(18,6,32,0.92) 40%, rgba(59,16,99,0.6) 100%)' }} />
      <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(to top, rgba(18,6,32,1) 0%, transparent 50%)' }} />

      {/* Content */}
      <div className="absolute inset-0 z-[2] flex items-end pb-14 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
          {/* Left: headline */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 text-xs font-semibold uppercase tracking-wider text-ivory" style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)' }}>
              <span className="w-2 h-2 rounded-full bg-ember animate-pulse" />
              The Official Hub
            </div>
            <h1 className="font-display font-extrabold text-ivory mb-4 leading-[0.95]" style={{ fontSize: 'clamp(48px, 8vw, 96px)', letterSpacing: '-0.02em' }}>
              KM<br />DYNASTY
            </h1>
            <p className="text-white/60 text-sm sm:text-base max-w-sm mb-7 leading-relaxed">
              Join the family. Compete in Godsent Box Battles.<br />Rise with King Maker.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={openOfficial}
                className="px-6 py-3 text-sm font-bold text-white rounded-lg transition-all hover:scale-105 active:scale-95"
                style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)', borderRadius: 6 }}
              >
                Join the Box Battle
              </button>
              <a
                href="/battle-schedule"
                className="px-6 py-3 text-sm font-medium text-white rounded-lg border border-white/20 hover:border-white/40 transition-all"
                style={{ backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.06)' }}
              >
                See Schedule
              </a>
            </div>
            {/* Social proof */}
            <div className="flex items-center gap-3 mt-6">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-dynasty-purple-deep bg-dynasty-purple/60 flex items-center justify-center text-[10px] text-white/60 font-bold">
                    {['K','M','D','F'][i]}
                  </div>
                ))}
              </div>
              <p className="text-white/40 text-xs">Thousands of creators competing</p>
            </div>
          </div>

          {/* Right: countdown */}
          <div className="hidden lg:block">
            <CountdownTicker />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-1 opacity-40">
        <span className="text-white text-[10px] uppercase tracking-widest">scroll</span>
        <div className="w-px h-8 bg-white/40" />
      </div>

      {/* Live badge */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
        <LiveStatus />
      </div>
    </section>
  )
}

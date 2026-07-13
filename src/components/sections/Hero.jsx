import { useRef, useState, useEffect, lazy, Suspense } from 'react'
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

const HeroCanvas = lazy(() => import('../HeroCanvas'))

// Real face photos for social proof avatars
const avatarPhotos = [
  '/gifters/brittany.jpg',
  '/gifters/gregory.jpg',
  '/gifters/ailinda.jpg',
  '/team/maker.jpg',
]

export default function Hero() {
  const { openOfficial } = useSignUp()
  const swiperRef = useRef(null)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [reducedMotion])

  useEffect(() => {
    if (!swiperRef.current) return
    if (paused || reducedMotion) swiperRef.current.autoplay.stop()
    else swiperRef.current.autoplay.start()
  }, [paused, reducedMotion])

  return (
    <section
      className="relative h-[560px] sm:h-[640px] md:h-[720px] overflow-hidden"
      style={{ background: '#120620' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Starfield canvas background */}
      <Suspense fallback={null}>
        <HeroCanvas />
      </Suspense>

      {/* Floating ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full z-[1] pointer-events-none animate-float-slow" style={{ background: 'radial-gradient(circle, rgba(107,63,160,0.15) 0%, transparent 65%)' }} />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full z-[1] pointer-events-none animate-float" style={{ background: 'radial-gradient(circle, rgba(255,107,26,0.08) 0%, transparent 65%)' }} />

      {/* Photo carousel — parallax wrapper */}
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.15}px)`, willChange: 'transform' }}
      >
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
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchpriority={i === 0 ? 'high' : 'low'}
              decoding={i === 0 ? 'sync' : 'async'}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none' }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
      {/* Multi-layer overlay */}
      <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(135deg, rgba(18,6,32,0.94) 40%, rgba(59,16,99,0.55) 100%)' }} />
      <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(to top, rgba(18,6,32,1) 0%, transparent 55%)' }} />
      {/* Ambient ember glow bottom-right */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] z-[1] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,107,26,0.08) 0%, transparent 65%)', transform: 'translate(20%, 20%)' }} />

      {/* Content */}
      <div className="absolute inset-0 z-[2] flex items-end pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
          {/* Left: headline */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 text-xs font-semibold uppercase tracking-wider text-ivory" style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span className="w-2 h-2 rounded-full bg-ember animate-pulse" />
              The Official Hub
            </div>

            <h1 className="font-display font-extrabold text-ivory mb-2 leading-none" style={{ fontSize: 'clamp(64px, 10vw, 110px)', letterSpacing: '-0.03em' }}>
              KM
            </h1>
            <h1 className="font-display font-extrabold mb-5 leading-none" style={{ fontSize: 'clamp(64px, 10vw, 110px)', letterSpacing: '-0.03em', WebkitTextStroke: '1px rgba(255,107,26,0.5)', color: 'transparent', backgroundImage: 'linear-gradient(135deg, #FF6B1A 0%, #E8B94A 45%, #ffffff 100%)', backgroundSize: '200% 200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'gradient-shift 9s ease-in-out infinite' }}>
              DYNASTY
            </h1>

            <p className="text-white/60 text-sm sm:text-base max-w-sm mb-8 leading-relaxed">
              🔥 Daily Box Battles &nbsp;|&nbsp; 💎 Pro Strategies &amp; Tips &nbsp;|&nbsp; Creator Livestream Visit
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <button
                onClick={openOfficial}
                className="btn-shimmer btn-glow px-7 py-3.5 text-sm font-bold text-white rounded-xl transition-all hover:scale-105 active:scale-95"
                style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)', boxShadow: '0 8px 32px rgba(255,107,26,0.35)' }}
              >
                Join the Box Battle
              </button>
              <a
                href="/battle-schedule"
                className="px-7 py-3.5 text-sm font-medium text-white rounded-xl border border-white/20 hover:border-white/40 transition-all"
                style={{ backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.06)' }}
              >
                See Schedule
              </a>
            </div>

            {/* Social proof — real photos */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {avatarPhotos.map((src, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full overflow-hidden border-2 flex-shrink-0"
                    style={{ borderColor: '#120620' }}
                  >
                    <img
                      src={src}
                      alt="Community member"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentNode.style.background = 'rgba(59,16,99,0.6)'
                      }}
                    />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-white/70 text-xs font-semibold">Thousands of creators competing</p>
                <div className="flex items-center gap-1 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-ember text-[10px]">★</span>
                  ))}
                  <span className="text-white/30 text-[10px] ml-1">Community rated</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: countdown */}
          <div className="hidden lg:flex justify-end">
            <CountdownTicker />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-1.5 opacity-30">
        <span className="text-white text-[9px] uppercase tracking-[0.2em]">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent" />
      </div>

      {/* Live badge */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
        <LiveStatus />
      </div>
    </section>
  )
}

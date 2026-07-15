import { useEffect, useMemo, useState } from 'react'
import Motion from '../Motion'
import fallbackTestimonials from '../../data/testimonials'
import { useContent } from '../../cms/ContentContext'
import { normalizePeoplePhotos } from '../../cms/normalize'

const ROTATE_MS = 8000

export default function Testimonials() {
  const { collections, getPage } = useContent()
  const homePage = getPage('home')
  const testimonialsTitle = homePage.testimonialsTitle || 'Voices from the family'
  const testimonialsKicker = homePage.testimonialsKicker || 'Testimony'
  const voices = useMemo(() => {
    const fromCms = normalizePeoplePhotos(collections.testimonials || [])
    if (fromCms.length) return fromCms
    return normalizePeoplePhotos(fallbackTestimonials || [])
  }, [collections.testimonials])
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || voices.length < 2) return
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % voices.length)
    }, ROTATE_MS)
    return () => clearInterval(id)
  }, [paused, voices.length])

  if (!voices.length) return null

  const voice = voices[active]

  return (
    <section
      className="relative overflow-hidden home-band-ink home-band-sep"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <Motion delay={40}>
            <p className="sec-kicker mb-2">{testimonialsKicker}</p>
            <h2
              className="font-display font-bold text-ivory leading-[0.95] tracking-tight"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
            >
              {testimonialsTitle.split(' ').length > 1 ? (
                <>
                  {testimonialsTitle.split(' ').slice(0, -1).join(' ')}{' '}
                  <span className="text-gradient">{testimonialsTitle.split(' ').slice(-1)}</span>
                </>
              ) : testimonialsTitle}
            </h2>
          </Motion>

          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {voices.map((v, i) => {
              const on = i === active
              return (
                <button
                  key={v.handle}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show testimony from ${v.name}`}
                  aria-pressed={on}
                  className={`relative w-10 h-10 flex-shrink-0 overflow-hidden transition-all duration-300 ${
                    on ? 'ring-2 ring-ember opacity-100' : 'opacity-40 hover:opacity-75'
                  }`}
                >
                  <img src={v.photo} alt="" className="w-full h-full object-cover" />
                </button>
              )
            })}
          </div>
        </div>

        <Motion delay={80}>
          <div
            className="relative grid grid-cols-1 md:grid-cols-[140px_1fr] lg:grid-cols-[160px_1fr] gap-5 md:gap-8 items-start border-y border-white/[0.07] py-6 sm:py-7"
          >
            {/* Compact portrait */}
            <div className="relative w-28 h-28 md:w-full md:aspect-square overflow-hidden mx-auto md:mx-0">
              {voices.map((v, i) => (
                <img
                  key={v.handle}
                  src={v.photo}
                  alt={v.name}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    i === active ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/10">
                <div
                  key={`${active}-${paused}`}
                  className="h-full w-full bg-ember origin-left"
                  style={{
                    animation: paused ? 'none' : `voice-progress ${ROTATE_MS}ms linear forwards`,
                    transform: paused ? 'scaleX(0)' : undefined,
                  }}
                />
              </div>
            </div>

            {/* Quote */}
            <div key={voice.handle} className="voice-quote min-w-0">
              <p className="font-display text-ivory text-base sm:text-lg leading-snug line-clamp-4 sm:line-clamp-5 mb-4">
                “{voice.text}”
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <p className="font-display font-bold text-ember text-sm">{voice.name}</p>
                <span className="text-white/20 hidden sm:inline">·</span>
                <p className="text-white/60 text-xs">
                  {voice.handle}
                  {voice.location ? ` · ${voice.location}` : ''}
                </p>
                <a
                  href={voice.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white/70 hover:text-ivory underline-offset-2 hover:underline ml-auto"
                >
                  TikTok ↗
                </a>
              </div>
            </div>
          </div>
        </Motion>
      </div>
    </section>
  )
}

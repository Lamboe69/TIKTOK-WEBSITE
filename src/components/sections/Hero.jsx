import './hero/Hero.css'
import { useEffect } from 'react'
import { useSignUp } from '../SignUpContext'
import { useContent } from '../../cms/ContentContext'
import HeroCopy from './hero/HeroCopy'
import { normalizeHeroLayout } from './hero/heroLayouts'
import { useHeroSlides } from './hero/useHeroSlides'

function HeroCarouselMedia({
  track,
  index,
  trackCount,
  shouldAnimate,
  onTrackTransitionEnd,
}) {
  return (
    <div className="hero-carousel absolute inset-0 overflow-hidden">
      <div className="hero-carousel__scan" aria-hidden />
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
            className={`hero-panel relative h-full flex-shrink-0 overflow-hidden ${i === index ? 'is-active' : ''}`}
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
              className="hero-panel-tint absolute inset-0 pointer-events-none"
              style={{
                background: i % 2 === 0
                  ? 'linear-gradient(135deg, rgba(120,60,200,0.16), transparent 58%)'
                  : 'linear-gradient(225deg, rgba(255,107,26,0.12), transparent 52%)',
              }}
            />
            <div className="hero-panel-slash absolute inset-y-0 right-0 w-16 pointer-events-none" aria-hidden />
          </div>
        ))}
      </div>
    </div>
  )
}

function HeroFadeMedia({ photos, realIndex }) {
  return (
    <div className="hero-fade absolute inset-0">
      <div className="hero-fade__letterbox hero-fade__letterbox--top" aria-hidden />
      <div className="hero-fade__letterbox hero-fade__letterbox--bottom" aria-hidden />
      {photos.map((photo, i) => (
        <div
          key={photo.src}
          className={`hero-fade-slide absolute inset-0 ${i === realIndex ? 'is-active' : ''}`}
          aria-hidden={i !== realIndex}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            loading={i < 2 ? 'eager' : 'lazy'}
            className="hero-fade-img absolute inset-0 w-full h-full object-cover"
            onError={(e) => { e.target.style.opacity = '0.3' }}
          />
        </div>
      ))}
      <div className="hero-fade__perf" aria-hidden>
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>
    </div>
  )
}

function HeroSplitMedia({ photos, realIndex }) {
  return (
    <div className="hero-split-visual__track">
      {photos.map((photo, i) => (
        <div
          key={photo.src}
          className={`hero-split-slide ${i === realIndex ? 'is-active' : ''}`}
          aria-hidden={i !== realIndex}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            loading={i < 2 ? 'eager' : 'lazy'}
            onError={(e) => { e.target.style.opacity = '0.3' }}
          />
        </div>
      ))}
      <div className="hero-split-visual__glow" aria-hidden />
    </div>
  )
}

function HeroSpotlightMedia({ photos, realIndex }) {
  return (
    <div className="hero-spotlight absolute inset-0">
      {photos.map((photo, i) => (
        <div
          key={photo.src}
          className={`hero-spotlight-slide absolute inset-0 ${i === realIndex ? 'is-active' : ''}`}
          aria-hidden={i !== realIndex}
        >
          <div className="hero-spotlight-frame">
            <img
              src={photo.src}
              alt={photo.alt}
              loading={i < 2 ? 'eager' : 'lazy'}
              onError={(e) => { e.target.style.opacity = '0.3' }}
            />
          </div>
        </div>
      ))}
      <div className="hero-spotlight-ring" aria-hidden />
      <div className="hero-spotlight-rays" aria-hidden />
    </div>
  )
}

function HeroStackMedia({ photos, realIndex }) {
  const layers = [-3, -2, -1, 0, 1].map((offset) => {
    const photoIndex = (realIndex + offset + photos.length) % photos.length
    return {
      photo: photos[photoIndex],
      offset,
      isActive: offset === 0,
      depth: offset + 3,
    }
  })

  return (
    <div className="hero-stack-stage absolute inset-0">
      {layers.map(({ photo, offset, isActive, depth }) => (
        <div
          key={`${photo.src}-stack-${offset}`}
          className={`hero-stack-card ${isActive ? 'is-active' : ''}`}
          style={{
            '--stack-depth': depth,
            '--stack-offset': offset,
            '--stack-abs': Math.abs(offset),
          }}
          aria-hidden={!isActive}
        >
          <img src={photo.src} alt={isActive ? photo.alt : ''} />
          <span className="hero-stack-card__corner" aria-hidden>
            {String(((realIndex + offset + photos.length) % photos.length) + 1).padStart(2, '0')}
          </span>
          {isActive && <span className="hero-stack-card__suit" aria-hidden>♦</span>}
        </div>
      ))}
    </div>
  )
}

const MOSAIC_COLS = 5
const MOSAIC_ROWS = 4

function HeroAuroraMedia({ photos, realIndex }) {
  return (
    <div className="hero-aurora absolute inset-0">
      {photos.map((photo, i) => (
        <div
          key={photo.src}
          className={`hero-aurora-slide absolute inset-0 ${i === realIndex ? 'is-active' : ''}`}
          aria-hidden={i !== realIndex}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            loading={i < 2 ? 'eager' : 'lazy'}
            onError={(e) => { e.target.style.opacity = '0.3' }}
          />
        </div>
      ))}
      <div className="hero-aurora__ribbons" aria-hidden>
        <span className="hero-aurora__ribbon hero-aurora__ribbon--a" />
        <span className="hero-aurora__ribbon hero-aurora__ribbon--b" />
        <span className="hero-aurora__ribbon hero-aurora__ribbon--c" />
      </div>
      <div className="hero-aurora__stars" aria-hidden />
    </div>
  )
}

const PRISM_SHARDS = [
  { className: 'hero-prism__shard--tl', rotate: -12 },
  { className: 'hero-prism__shard--tr', rotate: 18 },
  { className: 'hero-prism__shard--bl', rotate: 8 },
  { className: 'hero-prism__shard--br', rotate: -20 },
]

function HeroPrismMedia({ photos, realIndex }) {
  const slide = photos[realIndex]

  return (
    <div className="hero-prism absolute inset-0">
      <div className="hero-prism__void" aria-hidden />
      <div className="hero-prism__lattice" aria-hidden />

      {PRISM_SHARDS.map((shard) => (
        <div
          key={shard.className}
          className={`hero-prism__shard ${shard.className}`}
          style={{ '--shard-rotate': `${shard.rotate}deg` }}
          aria-hidden
        />
      ))}

      <div className="hero-prism__jewel-wrap" key={realIndex}>
        <div className="hero-prism__jewel-aura" aria-hidden />
        <div className="hero-prism__jewel-frame" aria-hidden />
        <div className="hero-prism__jewel">
          {slide && (
            <>
              <div
                className="hero-prism__ghost hero-prism__ghost--r"
                style={{ backgroundImage: `url(${slide.src})` }}
              />
              <div
                className="hero-prism__ghost hero-prism__ghost--b"
                style={{ backgroundImage: `url(${slide.src})` }}
              />
            </>
          )}
          {photos.map((photo, i) => (
            <div
              key={photo.src}
              className={`hero-prism-slide ${i === realIndex ? 'is-active' : ''}`}
              aria-hidden={i !== realIndex}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading={i < 2 ? 'eager' : 'lazy'}
                onError={(e) => { e.target.style.opacity = '0.3' }}
              />
            </div>
          ))}
          <div className="hero-prism__facets" aria-hidden />
          <div className="hero-prism__sheen" aria-hidden />
        </div>
        <div className="hero-prism__prism-base" aria-hidden />
      </div>

      <div className="hero-prism__flare" key={`flare-${realIndex}`} aria-hidden />
    </div>
  )
}

function HeroOrbitMedia({ photos, realIndex, total }) {
  const angle = total ? (360 / total) * realIndex : 0

  return (
    <div className="hero-orbit absolute inset-0">
      <div className="hero-orbit__floor" aria-hidden />
      <div
        className="hero-orbit__ring"
        style={{ transform: `rotateY(${-angle}deg)` }}
      >
        {photos.map((photo, i) => {
          const itemAngle = total ? (360 / total) * i : 0
          return (
            <div
              key={photo.src}
              className={`hero-orbit__item ${i === realIndex ? 'is-active' : ''}`}
              style={{ '--item-angle': `${itemAngle}deg` }}
              aria-hidden={i !== realIndex}
            >
              <img src={photo.src} alt={photo.alt} loading={i < 2 ? 'eager' : 'lazy'} />
              <span className="hero-orbit__item-glow" aria-hidden />
            </div>
          )
        })}
      </div>
      <div className="hero-orbit__halo" aria-hidden />
    </div>
  )
}

function HeroVelvetMedia({ photos, realIndex }) {
  return (
    <div className="hero-velvet absolute inset-0" key={realIndex}>
      <div className="hero-velvet__stage">
        {photos.map((photo, i) => (
          <div
            key={photo.src}
            className={`hero-velvet-slide ${i === realIndex ? 'is-active' : ''}`}
            aria-hidden={i !== realIndex}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading={i < 2 ? 'eager' : 'lazy'}
              onError={(e) => { e.target.style.opacity = '0.3' }}
            />
          </div>
        ))}
      </div>
      <div className="hero-velvet__curtain hero-velvet__curtain--left" aria-hidden>
        <span className="hero-velvet__fold" />
        <span className="hero-velvet__fringe" />
      </div>
      <div className="hero-velvet__curtain hero-velvet__curtain--right" aria-hidden>
        <span className="hero-velvet__fold" />
        <span className="hero-velvet__fringe" />
      </div>
      <div className="hero-velvet__proscenium" aria-hidden />
    </div>
  )
}

function HeroMosaicMedia({ slide, realIndex }) {
  const tiles = []
  for (let row = 0; row < MOSAIC_ROWS; row += 1) {
    for (let col = 0; col < MOSAIC_COLS; col += 1) {
      tiles.push({ row, col, index: row * MOSAIC_COLS + col })
    }
  }

  return (
    <div className="hero-mosaic absolute inset-0" key={realIndex}>
      <div
        className="hero-mosaic__grid"
        style={{ '--mosaic-cols': MOSAIC_COLS, '--mosaic-rows': MOSAIC_ROWS }}
      >
        {tiles.map(({ row, col, index }) => (
          <div
            key={`${slide.src}-tile-${row}-${col}`}
            className="hero-mosaic__tile"
            style={{
              '--tile-col': col,
              '--tile-row': row,
              '--tile-delay': `${index * 22}ms`,
              backgroundImage: `url(${slide.src})`,
              backgroundSize: `${MOSAIC_COLS * 100}% ${MOSAIC_ROWS * 100}%`,
              backgroundPosition: `${(col / (MOSAIC_COLS - 1)) * 100}% ${(row / (MOSAIC_ROWS - 1)) * 100}%`,
            }}
            aria-hidden
          />
        ))}
      </div>
      <img
        className="hero-mosaic__ghost"
        src={slide.src}
        alt={slide.alt}
      />
    </div>
  )
}

function HeroPeekCards({ photos, realIndex, total }) {
  return (
    <div className="hero-peek absolute top-0 right-0 bottom-0 z-[1] pointer-events-none hidden lg:block" aria-hidden>
      <div className="absolute inset-0 flex gap-3 items-stretch py-[16%] pr-5 pl-8">
        {[1, 2].map((offset) => {
          const p = photos[(realIndex + offset) % total]
          return (
            <div
              key={`${p.src}-peek-${offset}`}
              className={`hero-peek-card ${offset === 1 ? 'hero-peek-card--near' : 'hero-peek-card--far'}`}
            >
              <img src={p.src} alt="" />
              <span className="hero-peek-card__shine" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

function HeroControls({ prev, next, onPause }) {
  const pauseProps = {
    onMouseEnter: () => onPause(true),
    onMouseLeave: () => onPause(false),
  }

  return (
    <>
      <button type="button" onClick={prev} className="hero-nav hero-nav--prev" aria-label="Previous slide" {...pauseProps}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button type="button" onClick={next} className="hero-nav hero-nav--next" aria-label="Next slide" {...pauseProps}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </>
  )
}

function HeroProgress({ progress }) {
  return (
    <div className="hero-progress">
      <div className="hero-progress__bar" style={{ transform: `scaleX(${progress})` }} />
    </div>
  )
}

export default function Hero() {
  const { openOfficial, openSpecial } = useSignUp()
  const { collections, settings, getPage } = useContent()
  const siteName = settings.siteName || ''
  const homePage = getPage('home')
  const layout = normalizeHeroLayout(homePage.heroLayout)
  const tagline = homePage.heroTagline || (settings.tagline ? settings.tagline.split('.')[0] : 'Godsent Box Battles')

  const {
    photos,
    track,
    index,
    realIndex,
    slide,
    total,
    progress,
    setPaused,
    shouldAnimate,
    next,
    prev,
    onTrackTransitionEnd,
    onTouchStart,
    onTouchEnd,
    trackCount,
  } = useHeroSlides(collections.heroSlides)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  const handleCta = () => {
    if (slide?.cta?.action === 'openSpecial') openSpecial()
    else openOfficial()
  }

  if (!slide) return null

  const copyProps = {
    layout,
    siteName,
    tagline,
    slide,
    realIndex,
    total,
    onCta: handleCta,
    onPause: setPaused,
  }

  if (layout === 'split') {
    return (
      <section
        className={`hero-arena hero-arena--split relative h-[calc(100svh-4rem)] min-h-[540px] overflow-hidden`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-roledescription="carousel"
        aria-label={`${siteName} battle showcase`}
      >
        <HeroProgress progress={progress} />

        <div className="hero-split-shell">
          <div className="hero-split-visual">
            <HeroSplitMedia photos={photos} realIndex={realIndex} />
            <svg className="hero-split-bevel" viewBox="0 0 40 1000" preserveAspectRatio="none" aria-hidden>
              <polygon points="0,0 40,0 0,1000" fill="currentColor" />
            </svg>
          </div>

          <div className="hero-split-panel">
            <div className="hero-split-panel__stripe" aria-hidden />
            <div className="hero-split-panel__inner">
              <HeroCopy {...copyProps} />
            </div>
          </div>
        </div>

        <HeroControls prev={prev} next={next} onPause={setPaused} />
      </section>
    )
  }

  return (
    <section
      className={`hero-arena hero-arena--${layout} relative h-[calc(100svh-4rem)] min-h-[540px] overflow-hidden`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
      aria-label={`${siteName} battle showcase`}
    >
      {layout === 'carousel' && (
        <HeroCarouselMedia
          track={track}
          index={index}
          trackCount={trackCount}
          shouldAnimate={shouldAnimate}
          onTrackTransitionEnd={onTrackTransitionEnd}
        />
      )}
      {layout === 'fade' && <HeroFadeMedia photos={photos} realIndex={realIndex} />}
      {layout === 'spotlight' && <HeroSpotlightMedia photos={photos} realIndex={realIndex} />}
      {layout === 'stack' && <HeroStackMedia photos={photos} realIndex={realIndex} />}
      {layout === 'aurora' && <HeroAuroraMedia photos={photos} realIndex={realIndex} />}
      {layout === 'prism' && <HeroPrismMedia photos={photos} realIndex={realIndex} />}
      {layout === 'orbit' && <HeroOrbitMedia photos={photos} realIndex={realIndex} total={total} />}
      {layout === 'velvet' && <HeroVelvetMedia photos={photos} realIndex={realIndex} />}
      {layout === 'mosaic' && <HeroMosaicMedia slide={slide} realIndex={realIndex} />}

      {layout === 'carousel' && total > 1 && (
        <HeroPeekCards photos={photos} realIndex={realIndex} total={total} />
      )}

      <div className={`hero-veil hero-veil--${layout}`} />

      {layout === 'fade' && (
        <p className="hero-fade-counter" aria-hidden>
          <span>{String(realIndex + 1).padStart(2, '0')}</span>
          <em> / {String(total).padStart(2, '0')}</em>
        </p>
      )}

      <HeroProgress progress={progress} />

      <div className={`hero-overlay hero-overlay--${layout}`}>
        <div className="hero-overlay__inner">
          <HeroCopy {...copyProps} />
        </div>
      </div>

      <HeroControls prev={prev} next={next} onPause={setPaused} />
    </section>
  )
}

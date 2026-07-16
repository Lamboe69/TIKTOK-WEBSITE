import { Link } from 'react-router-dom'

export default function HeroCopy({
  layout,
  siteName,
  tagline,
  slide,
  realIndex,
  total,
  onCta,
  onPause,
}) {
  const words = siteName.trim().split(/\s+/)
  const firstWord = words.length > 1 ? words[0] : siteName
  const restWords = words.length > 1 ? words.slice(1).join(' ') : ''

  if (layout === 'prism') {
    return (
      <div className="hero-copy hero-copy--prism">
        <div className="hero-copy__prism-plaque">
          <div
            className="hero-copy__prism-body"
            onMouseEnter={() => onPause(true)}
            onMouseLeave={() => onPause(false)}
          >
            <div className="hero-copy__prism-text">
              <div className="hero-copy__prism-mark" aria-hidden>
                <span /><span /><span />
              </div>
              <p className="hero-copy__tagline">{tagline}</p>
              <h1 className="hero-copy__title">
                <span className="hero-copy__title-main">{firstWord}</span>
                {restWords ? <span className="hero-copy__title-accent">{restWords}</span> : null}
              </h1>
              <div className="hero-copy__slide" key={realIndex}>
                <p className="hero-copy__caption">{slide.caption}</p>
                <p className="hero-copy__line">{slide.line}</p>
              </div>
            </div>
            <div className="hero-copy__prism-actions">
              <button type="button" onClick={onCta} className="hero-cta hero-cta--prism group">
                <span className="relative z-[1]">{slide.cta?.label || 'Join My Box Battle'}</span>
                <svg className="relative z-[1] w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="hero-cta-sweep" aria-hidden />
              </button>
              <Link to="/battle-schedule" className="hero-copy__schedule">
                See Schedule
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (layout === 'velvet') {
    return (
      <div className="hero-copy hero-copy--velvet">
        <div className="hero-copy__velvet-plaque">
          <div
            className="hero-copy__velvet-body"
            onMouseEnter={() => onPause(true)}
            onMouseLeave={() => onPause(false)}
          >
            <div className="hero-copy__velvet-text">
              <p className="hero-copy__tagline">{tagline}</p>
              <h1 className="hero-copy__title">
                <span className="hero-copy__title-main">{firstWord}</span>
                {restWords ? <span className="hero-copy__title-accent">{restWords}</span> : null}
              </h1>
              <div className="hero-copy__slide" key={realIndex}>
                <p className="hero-copy__caption">{slide.caption}</p>
                <p className="hero-copy__line">{slide.line}</p>
              </div>
            </div>
            <div className="hero-copy__velvet-actions">
              <button type="button" onClick={onCta} className="hero-cta hero-cta--velvet group">
                <span className="relative z-[1]">{slide.cta?.label || 'Join My Box Battle'}</span>
                <svg className="relative z-[1] w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="hero-cta-sweep" aria-hidden />
              </button>
              <Link to="/battle-schedule" className="hero-copy__schedule">
                See Schedule
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`hero-copy hero-copy--${layout}`}>
      {layout === 'carousel' && (
        <div className="hero-copy__badge" aria-hidden>
          <span>{String(realIndex + 1).padStart(2, '0')}</span>
          <em>/</em>
          <span>{String(total).padStart(2, '0')}</span>
        </div>
      )}

      {layout === 'fade' && (
        <div className="hero-copy__reel" aria-hidden>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="hero-copy__reel-hole" />
          ))}
        </div>
      )}

      {layout === 'spotlight' && (
        <p className="hero-copy__watermark" aria-hidden>
          {siteName}
        </p>
      )}

      {layout === 'aurora' && (
        <div className="hero-copy__aurora-gem" aria-hidden>✦</div>
      )}

      {layout === 'orbit' && (
        <div className="hero-copy__orbit-ring" aria-hidden />
      )}

      {layout === 'mosaic' && (
        <div className="hero-copy__mosaic-frame" aria-hidden />
      )}

      <p className="hero-copy__tagline">
        {tagline}
      </p>

      <h1 className="hero-copy__title">
        <span className="hero-copy__title-main">{firstWord}</span>
        {restWords ? <span className="hero-copy__title-accent">{restWords}</span> : null}
      </h1>

      <div className="hero-copy__slide" key={realIndex}>
        <p className="hero-copy__caption">{slide.caption}</p>
        <p className="hero-copy__line">{slide.line}</p>
      </div>

      <div
        className="hero-copy__actions"
        onMouseEnter={() => onPause(true)}
        onMouseLeave={() => onPause(false)}
      >
        <button type="button" onClick={onCta} className="hero-cta group">
          <span className="relative z-[1]">{slide.cta?.label || 'Join My Box Battle'}</span>
          <svg className="relative z-[1] w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="hero-cta-sweep" aria-hidden />
        </button>

        <Link to="/battle-schedule" className="hero-copy__schedule">
          See Schedule
        </Link>
      </div>
    </div>
  )
}

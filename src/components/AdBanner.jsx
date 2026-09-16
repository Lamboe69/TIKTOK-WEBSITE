import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { A11y, Autoplay, Keyboard } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useContent } from '../cms/ContentContext'
import { mediaUrl } from '../utils/mediaUrl'
import './AdBanner.css'

import 'swiper/css'

export const BANNER_SLOT_LABELS = {
  'home-after-upcoming': 'Home · after upcoming battles',
  'home-before-testimonials': 'Home · before testimonials',
  'schedule-after-horizon': 'Schedule · after 30-day horizon',
  'site-pre-footer': 'Site-wide · above footer',
}

export const DEFAULT_BANNER_ADS = [
  {
    id: 1,
    slot: 'home-after-upcoming',
    enabled: 'true',
    sponsorLabel: 'KM Partners',
    headline: 'Own the night between battles',
    subline:
      'Fullscreen partner beacon on the homepage — swap creative, colors, and CTA anytime from Banner ads.',
    ctaLabel: 'Advertise with us',
    ctaHref: '/advertise',
    image: '/photos/king-maker-live.jpg',
    imageAlt: 'Livestream partner spotlight',
    theme: 'ember',
  },
  {
    id: 2,
    slot: 'home-before-testimonials',
    enabled: 'true',
    sponsorLabel: 'Featured',
    headline: 'Put your brand in the dynasty feed',
    subline: 'A second homepage slot for seasonal campaigns, giveaways, or agency offers.',
    ctaLabel: 'See packages',
    ctaHref: '/advertise',
    image: '/photos/community-meetup.jpg',
    imageAlt: 'Community gathering',
    theme: 'violet',
  },
  {
    id: 3,
    slot: 'schedule-after-horizon',
    enabled: 'true',
    sponsorLabel: 'Arena Partner',
    headline: 'Sponsor a month of nights',
    subline: 'Shows under the 30-day schedule horizon — perfect for battle-week campaigns.',
    ctaLabel: 'Book this slot',
    ctaHref: '/advertise',
    image: '/battles-photos/daily-godsent.jpg',
    imageAlt: 'Battle schedule partner',
    theme: 'gold',
  },
  {
    id: 4,
    slot: 'site-pre-footer',
    enabled: 'false',
    sponsorLabel: 'Sitewide',
    headline: 'Always-on brand ribbon',
    subline: 'Enable this slot for a site-wide strip above the footer on every public page.',
    ctaLabel: 'Partner with KM',
    ctaHref: '/advertise',
    image: '/photos/victory-celebration.jpg',
    imageAlt: 'Victory celebration',
    theme: 'ink',
  },
]

function isEnabled(ad) {
  const flag = ad?.enabled
  if (flag === false || flag === 'false' || flag === 0 || flag === '0') return false
  return true
}

function resolveHref(href) {
  const raw = String(href || '').trim()
  if (!raw) return { kind: 'none' }
  if (/^https?:\/\//i.test(raw) || raw.startsWith('mailto:') || raw.startsWith('tel:')) {
    return { kind: 'external', href: raw }
  }
  return { kind: 'internal', href: raw.startsWith('/') ? raw : `/${raw}` }
}

function BannerSlide({ ad }) {
  const theme = ad.theme || 'ember'
  const image = mediaUrl(ad.image)
  const href = resolveHref(ad.ctaHref || ad.href)
  const ctaLabel = ad.ctaLabel || 'Learn more'
  const sponsor = ad.sponsorLabel || ad.sponsor || 'Partner'
  const headline = ad.headline || ad.title || 'Featured with KM Dynasty'
  const subline = ad.subline || ad.body || ''
  const style = {
    '--ad-accent': ad.accentColor || undefined,
    '--ad-ink': ad.bgColor || undefined,
  }

  const cta =
    href.kind === 'external' ? (
      <a className="ad-banner__cta" href={href.href} target="_blank" rel="noopener noreferrer">
        {ctaLabel}
      </a>
    ) : href.kind === 'internal' ? (
      <Link className="ad-banner__cta" to={href.href}>
        {ctaLabel}
      </Link>
    ) : null

  return (
    <div className={`ad-banner__slide ad-banner--${theme}`} style={style}>
      <div className="ad-banner__rail" aria-hidden />
      <div className="ad-banner__frame">
        <div className="ad-banner__copy">
          <p className="ad-banner__sponsor">
            <span>Sponsored</span>
            <em>{sponsor}</em>
          </p>
          <h2 className="ad-banner__headline font-display">{headline}</h2>
          {subline ? <p className="ad-banner__subline">{subline}</p> : null}
          <div className="ad-banner__actions">
            {cta}
            <Link to="/advertise" className="ad-banner__meta">
              Advertise here
            </Link>
          </div>
        </div>

        {image ? (
          <div className="ad-banner__media">
            <img src={image} alt={ad.imageAlt || headline} loading="lazy" />
            <span className="ad-banner__slash" aria-hidden />
          </div>
        ) : (
          <div className="ad-banner__glyph" aria-hidden>
            <span />
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Swipeable banner carousel — shows every enabled creative.
 * `slot` marks where this carousel sits on the site (Admin placement label).
 */
export default function AdBanner({ slot, className = '' }) {
  const { collections } = useContent()
  const source = collections.bannerAds?.length ? collections.bannerAds : DEFAULT_BANNER_ADS
  const ads = source.filter(isEnabled)
  const swiperRef = useRef(null)
  const [active, setActive] = useState(0)

  if (!ads.length) return null

  const last = Math.max(0, ads.length - 1)
  const multi = ads.length > 1
  const looping = ads.length > 2
  const canPrev = looping || active > 0
  const canNext = looping || active < last

  return (
    <aside
      className={`ad-banner${className ? ` ${className}` : ''}`}
      aria-label="Sponsored banners"
      data-ad-slot={slot}
      data-ad-slot-label={BANNER_SLOT_LABELS[slot] || slot}
    >
      {multi ? (
        <div className="ad-banner__toolbar">
          <p className="ad-banner__toolbar-label">
            Partner beacons
            <span>
              {String(active + 1).padStart(2, '0')} / {String(ads.length).padStart(2, '0')}
            </span>
          </p>
          <div className="ad-banner__nav" role="group" aria-label="Banner controls">
            <button
              type="button"
              className="ad-banner__nav-btn"
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={!canPrev}
              aria-label="Previous banner"
            >
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M10.5 3.5 6 8l4.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              className="ad-banner__nav-btn"
              onClick={() => swiperRef.current?.slideNext()}
              disabled={!canNext}
              aria-label="Next banner"
            >
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M5.5 3.5 10 8l-4.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : null}

      <Swiper
        className="ad-banner__swiper"
        modules={[Keyboard, A11y, Autoplay]}
        speed={520}
        spaceBetween={0}
        slidesPerView={1}
        watchOverflow
        grabCursor
        loop={looping}
        autoplay={
          multi
            ? {
                delay: 6500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        keyboard={{ enabled: true }}
        a11y={{
          enabled: true,
          prevSlideMessage: 'Previous banner',
          nextSlideMessage: 'Next banner',
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        onSlideChange={(swiper) => setActive(swiper.realIndex ?? swiper.activeIndex)}
      >
        {ads.map((ad) => (
          <SwiperSlide key={ad.id ?? `${ad.slot}-${ad.headline}`}>
            <BannerSlide ad={ad} />
          </SwiperSlide>
        ))}
      </Swiper>

      {multi ? (
        <div className="ad-banner__pager">
          <div className="ad-banner__progress" aria-hidden>
            <span style={{ width: `${((active + 1) / ads.length) * 100}%` }} />
          </div>
          <div className="ad-banner__dots" role="tablist" aria-label="Banner slides">
            {ads.map((ad, idx) => (
              <button
                key={ad.id ?? `dot-${idx}`}
                type="button"
                role="tab"
                aria-selected={idx === active}
                aria-label={`Show banner ${idx + 1}`}
                className={`ad-banner__dot${idx === active ? ' is-active' : ''}`}
                onClick={() => {
                  const swiper = swiperRef.current
                  if (!swiper) return
                  if (typeof swiper.slideToLoop === 'function' && swiper.params?.loop) {
                    swiper.slideToLoop(idx)
                  } else {
                    swiper.slideTo(idx)
                  }
                }}
              />
            ))}
          </div>
        </div>
      ) : null}
    </aside>
  )
}

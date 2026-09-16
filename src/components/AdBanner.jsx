import { Link } from 'react-router-dom'
import { useContent } from '../cms/ContentContext'
import { mediaUrl } from '../utils/mediaUrl'
import './AdBanner.css'

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

/**
 * Renders the first enabled banner for a named slot.
 * Edit creatives in Admin → Collections → Banner ads.
 */
export default function AdBanner({ slot, className = '' }) {
  const { collections } = useContent()
  const ads = collections.bannerAds?.length ? collections.bannerAds : DEFAULT_BANNER_ADS
  const ad = ads.find((item) => item?.slot === slot && isEnabled(item))

  if (!ad) return null

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
    <aside
      className={`ad-banner ad-banner--${theme}${className ? ` ${className}` : ''}`}
      style={style}
      aria-label={`Sponsored: ${sponsor}`}
      data-ad-slot={slot}
      data-ad-slot-label={BANNER_SLOT_LABELS[slot] || slot}
    >
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
    </aside>
  )
}

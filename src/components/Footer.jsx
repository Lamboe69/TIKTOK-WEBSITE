import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icons } from './Icons'
import { useContent } from '../cms/ContentContext'
import { handleDonateSubmit, useToast } from './ToastContext'
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_WHATSAPP,
  INSTAGRAM_URL,
  THREADS_URL,
  TIKTOK_URL,
  WHATSAPP_CHANNEL_URL,
  WHATSAPP_PHONE_URL,
  YOUTUBE_URL,
} from '../constants/brand'
import './Footer.css'

const defaultColumns = {
  explore: [
    { to: '/', label: 'Home' },
    { to: '/how-to-join', label: 'How to Join' },
    { to: '/battle-schedule', label: 'Battle Schedule' },
    { to: '/daily-quotes', label: 'Daily Quotes' },
    { to: '/blog', label: 'Blog' },
    { to: '/gallery', label: 'Gallery' },
  ],
  community: [
    { to: '/charity', label: 'Charity' },
    { to: '/giveaway', label: 'Giveaway' },
    { to: '/about', label: 'About' },
    { to: '/agency', label: 'Agency' },
    { to: '/masterclass', label: 'Masterclass' },
    { to: '/advertise', label: 'Advertise' },
  ],
  support: [
    { to: '/faq', label: 'FAQ' },
    { to: '/contact', label: 'Contact' },
    { to: '/privacy', label: 'Privacy Policy' },
    { to: '/terms', label: 'Terms of Use' },
  ],
}

function LinkColumn({ title, links }) {
  const { pathname } = useLocation()
  return (
    <div>
      <h4 className="site-footer__col-title">{title}</h4>
      <ul className="site-footer__links">
        {links.map(({ to, label }) => (
          <li key={to}>
            <Link
              to={to}
              className={`site-footer__link${pathname === to ? ' is-active' : ''}`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  const { settings, collections } = useContent()
  const { showDonateComingSoon } = useToast()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const contactEmail = settings.email || CONTACT_EMAIL
  const whatsappPhone = settings.whatsappPhone || CONTACT_PHONE_WHATSAPP
  const location = settings.location || 'Dallas, Texas, USA'
  const siteName = settings.siteName || 'KING MAKER'
  const tagline =
    settings.tagline ||
    "The official hub for King Maker's Godsent Box Battles. Join the family, compete, and rise."
  const copyright = settings.copyright || `${siteName}. All rights reserved.`
  const disclaimer =
    settings.disclaimer ||
    'Independent fan/community platform. Not affiliated with TikTok or ByteDance.'
  const tiktokUrl = settings.tiktokUrl || TIKTOK_URL
  const paypalEmail = settings.paypalEmail || ''

  const columns = {
    explore: collections.footerExploreLinks?.length
      ? collections.footerExploreLinks
      : defaultColumns.explore,
    community: collections.footerCommunityLinks?.length
      ? collections.footerCommunityLinks
      : defaultColumns.community,
    support: collections.footerSupportLinks?.length
      ? collections.footerSupportLinks
      : defaultColumns.support,
  }

  const socials = [
    { href: tiktokUrl, icon: 'tiktokBrand', label: 'TikTok', brand: 'tiktok' },
    { href: settings.instagramUrl || INSTAGRAM_URL, icon: 'instagram', label: 'Instagram', brand: 'instagram' },
    { href: settings.youtubeUrl || YOUTUBE_URL, icon: 'youtube', label: 'YouTube', brand: 'youtube' },
    { href: settings.threadsUrl || THREADS_URL, icon: 'threads', label: 'Threads', brand: 'threads' },
    {
      href: settings.whatsappUrl || WHATSAPP_CHANNEL_URL,
      icon: 'whatsapp',
      label: 'WhatsApp Channel',
      brand: 'whatsapp',
    },
  ]

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    const subject = encodeURIComponent(`${siteName} — Newsletter`)
    const body = encodeURIComponent(`New subscriber: ${email}`)
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="site-footer">
      <div className="site-footer__accent" aria-hidden />
      <div className="site-footer__glow" aria-hidden />

      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link to="/" className="site-footer__logo">
              <img src="/photos/logo.jpg" alt="" />
              <span>
                <span className="site-footer__logo-name">{siteName}</span>
                <span className="site-footer__logo-kicker">Godsent Box Battles</span>
              </span>
            </Link>
            <p className="site-footer__tagline">{tagline}</p>
            <div className="site-footer__actions">
              <a
                href={tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="site-footer__btn site-footer__btn--tiktok"
              >
                <span className="site-footer__btn-icon site-footer__btn-icon--tiktok">
                  {Icons.tiktok}
                </span>
                Follow on TikTok
              </a>
              <form
                action="https://www.paypal.com/donate"
                method="post"
                target="_blank"
                onSubmit={(e) =>
                  handleDonateSubmit(e, paypalEmail, siteName, showDonateComingSoon)
                }
              >
                <input type="hidden" name="business" value={paypalEmail} />
                <input type="hidden" name="no_recurring" value="0" />
                <input type="hidden" name="item_name" value={`${siteName} Donation`} />
                <input type="hidden" name="currency_code" value="USD" />
                <input type="hidden" name="amount" value="" />
                <button type="submit" className="site-footer__btn site-footer__btn--paypal">
                  <span className="site-footer__btn-icon">{Icons.heart}</span>
                  Donate
                </button>
              </form>
            </div>
          </div>

          <LinkColumn title="Explore" links={columns.explore} />
          <LinkColumn title="Community" links={columns.community} />
          <LinkColumn title="Support" links={columns.support} />

          <div>
            <h4 className="site-footer__col-title">Contact</h4>
            <ul className="site-footer__contact-list">
              <li className="site-footer__contact-item">
                <a href={`mailto:${contactEmail}`}>
                  <span className="site-footer__contact-icon">{Icons.mail}</span>
                  {contactEmail}
                </a>
              </li>
              <li className="site-footer__contact-item">
                <a href={WHATSAPP_PHONE_URL} target="_blank" rel="noopener noreferrer">
                  <span className="site-footer__contact-icon">{Icons.whatsapp}</span>
                  WhatsApp · {whatsappPhone}
                </a>
              </li>
              <li className="site-footer__contact-item">
                <span>
                  <span className="site-footer__contact-icon">{Icons.mapPin}</span>
                  {location}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="site-footer__strip">
          <div>
            <p className="site-footer__newsletter-title">Stay in the Dynasty</p>
            {subscribed ? (
              <p className="site-footer__newsletter-done">
                <span className="site-footer__btn-icon">{Icons.check}</span>
                You&apos;re on the list!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="site-footer__newsletter-form">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="site-footer__newsletter-input"
                />
                <button type="submit" className="site-footer__newsletter-btn">
                  Subscribe
                </button>
              </form>
            )}
          </div>

          <div>
            <p className="site-footer__social-head">Follow us</p>
            <div className="site-footer__socials">
              {socials.map(({ href, icon, label, brand }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  aria-label={label}
                  className={`site-footer__social site-footer__social--${brand}`}
                >
                  <span className="site-footer__social-icon">{Icons[icon]}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="site-footer__legal">
          <div className="site-footer__legal-row">
            <p className="site-footer__copy">
              &copy; {new Date().getFullYear()} {copyright}
            </p>
            <p className="site-footer__advertise">
              Want to reach our audience?{' '}
              <Link to="/advertise">Advertise with us</Link>
            </p>
          </div>
          <p className="site-footer__disclaimer">{disclaimer}</p>
        </div>
      </div>
    </footer>
  )
}

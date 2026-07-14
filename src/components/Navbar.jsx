import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icons } from './Icons'
import './Navbar.css'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/how-to-join', label: 'How to Join' },
  { to: '/battle-schedule', label: 'Schedule' },
  { to: '/masterclass', label: 'Masterclass' },
  { to: '/agency', label: 'Agency' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const moreLinks = [
  { to: '/daily-quotes', label: 'Daily Quotes', blurb: 'Week of inspiration', icon: 'lightbulb' },
  { to: '/blog', label: 'Blog', blurb: 'Reports & stories', icon: 'film' },
  { to: '/gallery', label: 'Gallery', blurb: 'Captured moments', icon: 'star' },
  { to: '/outreach', label: 'Outreach', blurb: 'Giving back', icon: 'heart' },
  { to: '/giveaway', label: 'Giveaway', blurb: 'Claim your reward', icon: 'gift' },
  { to: '/faq', label: 'FAQ', blurb: 'Answers & guidance', icon: 'clipboard' },
  { to: '/advertise', label: 'Advertise', blurb: 'Partner with us', icon: 'target' },
]

function isActive(pathname, to) {
  if (to === '/') return pathname === '/'
  return pathname === to || pathname.startsWith(`${to}/`)
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const moreRef = useRef(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setMoreOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!mobileOpen) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileOpen])

  useEffect(() => {
    if (!moreOpen && !mobileOpen) return undefined
    const onPointer = (e) => {
      if (moreOpen && moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false)
      }
    }
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMoreOpen(false)
        setMobileOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [moreOpen, mobileOpen])

  const moreActive = moreLinks.some(({ to }) => isActive(pathname, to))

  return (
    <header
      className={[
        'site-nav',
        scrolled ? 'is-scrolled' : '',
        mobileOpen ? 'is-open' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <nav className="site-nav__bar" aria-label="Primary">
        <Link to="/" className="site-nav__brand" onClick={() => setMobileOpen(false)}>
          <span className="site-nav__mark" aria-hidden>
            <span>{Icons.crown}</span>
          </span>
          <span className="site-nav__wordmark">
            <span className="site-nav__name">KM DYNASTY</span>
            <span className="site-nav__tag">Godsent Box Battles</span>
          </span>
        </Link>

        <div className="site-nav__links">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`site-nav__link${isActive(pathname, to) ? ' is-active' : ''}`}
            >
              {label}
            </Link>
          ))}

          <div
            className={`site-nav__more${moreOpen ? ' is-open' : ''}`}
            ref={moreRef}
          >
            <button
              type="button"
              className={`site-nav__more-btn${moreActive ? ' is-active' : ''}`}
              aria-expanded={moreOpen}
              aria-haspopup="menu"
              onClick={() => setMoreOpen((v) => !v)}
            >
              More
              <span className="site-nav__more-chevron" aria-hidden>
                {Icons.chevronDown}
              </span>
            </button>
            <div className="site-nav__dropdown" role="menu">
              <p className="site-nav__drop-head">Explore</p>
              <div className="site-nav__drop-grid">
                {moreLinks.map(({ to, label, blurb, icon }) => (
                  <Link
                    key={to}
                    to={to}
                    role="menuitem"
                    className={`site-nav__drop-link${isActive(pathname, to) ? ' is-active' : ''}`}
                    onClick={() => setMoreOpen(false)}
                  >
                    <span className="site-nav__drop-icon" aria-hidden>
                      {Icons[icon]}
                    </span>
                    <span className="site-nav__drop-copy">
                      <strong>{label}</strong>
                      <em>{blurb}</em>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="site-nav__toggle"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span>{mobileOpen ? Icons.close : Icons.menu}</span>
        </button>

        <div className="site-nav__signal" aria-hidden />
      </nav>

      <div className="site-nav__panel" id="site-nav-panel">
        <div className="site-nav__panel-inner">
          <div className="site-nav__panel-grid">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`site-nav__panel-link${isActive(pathname, to) ? ' is-active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
          <p className="site-nav__panel-label">Explore</p>
          <div className="site-nav__panel-more">
            {moreLinks.map(({ to, label, blurb }) => (
              <Link
                key={to}
                to={to}
                className={isActive(pathname, to) ? 'is-active' : undefined}
                onClick={() => setMobileOpen(false)}
              >
                <strong>{label}</strong>
                <em>{blurb}</em>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

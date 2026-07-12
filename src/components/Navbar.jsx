import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icons } from './Icons'
import { useSignUp } from './SignUpContext'

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
  { to: '/daily-quotes', label: 'Daily Quotes' },
  { to: '/blog', label: 'Blog' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/outreach', label: 'Outreach' },
  { to: '/giveaway', label: 'Giveaway' },
  { to: '/faq', label: 'FAQ' },
  { to: '/advertise', label: 'Advertise' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const { openOfficial, openSpecial } = useSignUp()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const isSpecialPage = pathname === '/daily-quotes'
  const ctaLabel = isSpecialPage ? 'Fill Form Here' : 'Sign Up — Box Battle'
  const ctaAction = isSpecialPage ? openSpecial : openOfficial

  return (
    <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-brand-200 transition-shadow duration-300 ${scrolled ? 'nav-scrolled' : ''}`}>
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="w-7 h-7 rounded-md bg-brand-900 flex items-center justify-center text-white">
            <span className="w-4 h-4 block">{Icons.crown}</span>
          </span>
          <span className="font-display font-bold text-base text-brand-900 tracking-tight">
            KM DYNASTY
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                pathname === to
                  ? 'bg-brand-900 text-white'
                  : 'text-brand-600 hover:bg-brand-50 hover:text-brand-900'
              }`}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={ctaAction}
            className="ml-2 px-4 py-1.5 text-sm font-semibold bg-brand-900 text-white rounded-md hover:bg-brand-800 transition-colors"
          >
            {ctaLabel}
          </button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-brand-700 hover:text-brand-900 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className="w-5 h-5 block">{mobileOpen ? Icons.close : Icons.menu}</span>
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-brand-200 shadow-lg animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 text-sm font-medium rounded-md transition-all ${
                  pathname === to
                    ? 'bg-brand-900 text-white'
                    : 'text-brand-700 hover:bg-brand-50'
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="border-t border-brand-100 my-2 pt-2">
              {moreLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2 text-sm font-medium rounded-md transition-all ${
                    pathname === to
                      ? 'bg-brand-900 text-white'
                      : 'text-brand-600 hover:bg-brand-50'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
            <button
              onClick={() => { ctaAction(); setMobileOpen(false) }}
              className="block w-full px-3 py-2.5 text-sm font-semibold bg-brand-900 text-white rounded-md text-center hover:bg-brand-800 transition-colors"
            >
              {ctaLabel}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icons } from './Icons'
import { useSignUp } from './SignUpContext'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/how-to-join', label: 'How to Join' },
  { to: '/battle-schedule', label: 'Battle Schedule' },
  { to: '/daily-quotes', label: 'Daily Quotes' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/advertise', label: 'Advertise' },
  { to: '/contact', label: 'Contact' },
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
    <header className={`sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-dynasty-cream transition-shadow duration-300 ${scrolled ? 'nav-scrolled' : ''}`}>
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-lg bg-dynasty-purple flex items-center justify-center text-white">
            {Icons.crown}
          </span>
          <span className="font-display font-bold text-lg text-dynasty-charcoal tracking-tight group-hover:text-dynasty-purple transition-colors">
            KM DYNASTY
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                pathname === to
                  ? 'bg-dynasty-purple text-white'
                  : 'text-dynasty-charcoal hover:bg-dynasty-cream hover:text-dynasty-purple'
              }`}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={ctaAction}
            className="ml-3 px-4 py-2 text-sm font-semibold bg-dynasty-orange text-white rounded-lg hover:bg-dynasty-orange-dark transition-colors"
          >
            {ctaLabel}
          </button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-dynasty-charcoal hover:text-dynasty-purple transition-colors"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className="w-6 h-6 block">{mobileOpen ? Icons.close : Icons.menu}</span>
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-dynasty-cream shadow-lg animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  pathname === to
                    ? 'bg-dynasty-purple text-white'
                    : 'text-dynasty-charcoal hover:bg-dynasty-cream'
                }`}
              >
                {label}
              </Link>
            ))}
            <button
              onClick={() => { ctaAction(); setMobileOpen(false) }}
              className="block w-full px-3 py-2.5 text-sm font-semibold bg-dynasty-orange text-white rounded-lg text-center hover:bg-dynasty-orange-dark transition-colors"
            >
              {ctaLabel}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

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
  const ctaAction = isSpecialPage ? openSpecial : openOfficial

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(18, 6, 32, 0.92)'
          : 'rgba(18, 6, 32, 0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(59,16,99,0.5)',
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
          <span className="w-8 h-8 rounded-lg bg-ember flex items-center justify-center text-white">
            <span className="w-4 h-4 block">{Icons.crown}</span>
          </span>
          <div className="leading-none">
            <span className="block font-display font-bold text-sm text-ivory tracking-widest">KM DYNASTY</span>
            <span className="block font-body text-[9px] text-white/40 tracking-[0.2em] uppercase">Godsent Box Battles</span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`relative px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                pathname === to
                  ? 'text-ember'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {label}
              {pathname === to && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-ember" />
              )}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={ctaAction}
          className="btn-shimmer hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg text-white flex-shrink-0 transition-all hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)', boxShadow: '0 4px 16px rgba(255,107,26,0.3)' }}
        >
          <span className="w-3.5 h-3.5 block">{Icons.swords}</span>
          Sign Up
        </button>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          <span className="w-5 h-5 block">{mobileOpen ? Icons.close : Icons.menu}</span>
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/04 animate-fade-in" style={{ background: 'rgba(18,6,32,0.97)' }}>
          <div className="px-4 py-4">
            <div className="grid grid-cols-2 gap-1 mb-3">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${
                    pathname === to ? 'bg-ember/20 text-ember' : 'text-white/70 hover:bg-white/05 hover:text-white'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
            <p className="text-white/30 text-[10px] uppercase tracking-widest mb-2 px-1">More Pages</p>
            <div className="grid grid-cols-2 gap-1 mb-4">
              {moreLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 text-xs text-white/50 hover:text-white rounded-md hover:bg-white/05 transition-all"
                >
                  {label}
                </Link>
              ))}
            </div>
            <button
              onClick={() => { ctaAction(); setMobileOpen(false) }}
              className="w-full py-3 text-sm font-bold text-white rounded-lg"
              style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)' }}
            >
              Sign Up — Box Battle
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

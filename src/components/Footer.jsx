import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icons } from './Icons'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/how-to-join', label: 'How to Join' },
  { to: '/battle-schedule', label: 'Battle Schedule' },
  { to: '/daily-quotes', label: 'Daily Quotes' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/advertise', label: 'Advertise' },
  { to: '/contact', label: 'Contact' },
]

const socials = [
  { href: 'https://www.tiktok.com/@kingmakernevergivesup', icon: Icons.tiktok, label: 'TikTok' },
  { href: '#', icon: Icons.instagram, label: 'Instagram', comingSoon: true },
  { href: '#', icon: Icons.youtube, label: 'YouTube', comingSoon: true },
]

export default function Footer() {
  const { pathname } = useLocation()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    const subject = encodeURIComponent('KM DYNASTY — Newsletter Signup')
    const body = encodeURIComponent(`New subscriber: ${email}`)
    window.location.href = `mailto:lagwatinc@gmail.com?subject=${subject}&body=${body}`
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="bg-dynasty-charcoal text-white">
      {/* Main footer — 2-col on mobile, 3-col on md+ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-12">

          {/* Column 1: Brand + social */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-lg bg-dynasty-purple flex items-center justify-center text-white">
                {Icons.crown}
              </span>
              <span className="font-display font-bold text-lg">KM DYNASTY</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              The official hub for King Maker's Godsent Box Battles. Join the family, compete, and rise.
            </p>
            <a
              href="https://www.tiktok.com/@kingmakernevergivesup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-dynasty-orange text-white text-sm font-semibold rounded-lg hover:bg-dynasty-orange-dark transition-colors mb-5"
            >
              <span className="w-4 h-4 block">{Icons.play}</span>
              Follow King Maker
            </a>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socials.map(({ href, icon, label, comingSoon }) => (
                <a
                  key={label}
                  href={href}
                  target={comingSoon ? undefined : '_blank'}
                  rel={comingSoon ? undefined : 'noopener noreferrer'}
                  title={comingSoon ? `${label} — coming soon` : label}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                    comingSoon
                      ? 'bg-white/5 text-gray-600 cursor-default'
                      : 'bg-white/10 text-white hover:bg-dynasty-purple hover:text-white hover:scale-110'
                  }`}
                >
                  <span className="w-4 h-4 block">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links — active page highlighted */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(({ to, label }) => {
                const isActive = pathname === to
                return (
                  <li key={to}>
                    <Link
                      to={to}
                      className={`text-sm transition-colors ${
                        isActive
                          ? 'text-dynasty-orange font-semibold'
                          : 'text-gray-400 hover:text-dynasty-orange'
                      }`}
                    >
                      {label}
                      {isActive && <span className="ml-1.5 text-[10px]">&#9679;</span>}
                    </Link>
                  </li>
                )
              })}
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-700 flex gap-4">
              <Link to="/privacy" className="text-gray-500 text-xs hover:text-dynasty-orange transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-500 text-xs hover:text-dynasty-orange transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Column 3: Get in Touch */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-display font-bold text-lg mb-4">Get in Touch</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 block text-dynasty-orange">{Icons.mail}</span>
                <a href="mailto:lagwatinc@gmail.com" className="hover:text-dynasty-orange transition-colors">
                  lagwatinc@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 block text-dynasty-orange">{Icons.phone}</span>
                <a href="tel:+14696641195" className="hover:text-dynasty-orange transition-colors">
                  +1 (469) 664-1195 (US)
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 block text-dynasty-orange">{Icons.phone}</span>
                <a href="tel:+256200947070" className="hover:text-dynasty-orange transition-colors">
                  +256-200-947-070 (Uganda)
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 block text-dynasty-orange">{Icons.mapPin}</span>
                Dallas, Texas, USA
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter + Advertise bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Newsletter */}
            <div className="flex-1 max-w-md">
              <p className="text-gray-300 text-sm font-semibold mb-2">Get battle updates</p>
              {subscribed ? (
                <p className="text-dynasty-orange text-xs font-medium">Thanks — you're on the list!</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="flex-1 px-3 py-2 bg-white/5 border border-gray-600 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-dynasty-purple focus:border-dynasty-purple transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-dynasty-purple text-white text-sm font-semibold rounded-lg hover:bg-dynasty-purple-dark transition-colors whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            {/* Advertise */}
            <p className="text-gray-400 text-xs">
              Want to reach the KM DYNASTY audience?{' '}
              <Link to="/advertise" className="text-dynasty-orange hover:text-dynasty-orange-dark font-semibold transition-colors">
                Advertise With Us
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Copyright — separated from disclaimer */}
      <div className="border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <p className="text-gray-500 text-xs text-center">
            &copy; {new Date().getFullYear()} KM DYNASTY. All rights reserved.
          </p>
        </div>
      </div>

      {/* Disclaimer — its own distinct row */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <p className="text-gray-600 text-[10px] text-center leading-relaxed">
            This is an independent fan/community platform and is not officially affiliated with, endorsed by, or sponsored by TikTok or ByteDance Ltd.
          </p>
        </div>
      </div>
    </footer>
  )
}

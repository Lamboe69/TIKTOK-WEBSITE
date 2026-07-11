import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icons } from './Icons'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/how-to-join', label: 'How to Join' },
  { to: '/battle-schedule', label: 'Battle Schedule' },
  { to: '/daily-quotes', label: 'Daily Quotes' },
  { to: '/about', label: 'About' },
  { to: '/agency', label: 'Agency' },
  { to: '/masterclass', label: 'Masterclass' },
  { to: '/advertise', label: 'Advertise' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

const socials = [
  { href: 'https://www.tiktok.com/@kingmakernevergivesup', icon: 'tiktok', label: 'TikTok', color: 'hover:bg-[#ff0050]' },
  { href: '#', icon: 'instagram', label: 'Instagram', comingSoon: true, color: 'hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888]' },
  { href: '#', icon: 'youtube', label: 'YouTube', comingSoon: true, color: 'hover:bg-[#ff0000]' },
  { href: '#', icon: 'whatsapp', label: 'WhatsApp', comingSoon: true, color: 'hover:bg-[#25d366]' },
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
      {/* Main grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Brand column — 4 cols on lg */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <span className="w-9 h-9 rounded-lg bg-dynasty-purple flex items-center justify-center text-white">
                {Icons.crown}
              </span>
              <span className="font-display font-bold text-xl tracking-tight">KM DYNASTY</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              The official hub for King Maker's Godsent Box Battles. Join the family, compete, and rise.
            </p>

            {/* Social row */}
            <div className="flex items-center gap-2.5 mb-6">
              {socials.map(({ href, icon, label, comingSoon, color }) => (
                <a
                  key={label}
                  href={comingSoon ? undefined : href}
                  target={comingSoon ? undefined : '_blank'}
                  rel={comingSoon ? undefined : 'noopener noreferrer'}
                  title={comingSoon ? `${label} — coming soon` : label}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    comingSoon
                      ? 'bg-white/5 text-gray-600 cursor-default'
                      : `bg-white/10 text-white ${color} hover:scale-110`
                  }`}
                  aria-label={label}
                >
                  {Icons[icon]}
                </a>
              ))}
            </div>

            <a
              href="https://www.tiktok.com/@kingmakernevergivesup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-dynasty-orange text-white text-sm font-semibold rounded-xl hover:bg-dynasty-orange/90 transition-colors"
            >
              <span className="w-4 h-4 block">{Icons.play}</span>
              Follow King Maker
            </a>
          </div>

          {/* Quick Links — 3 cols on lg */}
          <div className="lg:col-span-3">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-gray-300 mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ to, label }) => {
                const isActive = pathname === to
                return (
                  <li key={to}>
                    <Link
                      to={to}
                      className={`text-sm transition-colors duration-150 ${
                        isActive
                          ? 'text-dynasty-orange font-semibold'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                )
              })}
            </ul>
            <div className="mt-5 pt-4 border-t border-white/10 flex gap-4">
              <Link to="/privacy" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">
                Terms
              </Link>
            </div>
          </div>

          {/* Get in Touch — 3 cols on lg */}
          <div className="lg:col-span-3">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-gray-300 mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:lagwatinc@gmail.com" className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors group">
                  <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-dynasty-purple/20 transition-colors">
                    <span className="w-4 h-4 block text-dynasty-orange">{Icons.mail}</span>
                  </span>
                  lagwatinc@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+14696641195" className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors group">
                  <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-dynasty-purple/20 transition-colors">
                    <span className="w-4 h-4 block text-dynasty-orange">{Icons.phone}</span>
                  </span>
                  +1 (469) 664-1195 <span className="text-gray-600 text-xs">(US)</span>
                </a>
              </li>
              <li>
                <a href="tel:+256200947070" className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors group">
                  <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-dynasty-purple/20 transition-colors">
                    <span className="w-4 h-4 block text-dynasty-orange">{Icons.phone}</span>
                  </span>
                  +256-200-947-070 <span className="text-gray-600 text-xs">(Uganda)</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-2.5 text-sm text-gray-400">
                  <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <span className="w-4 h-4 block text-dynasty-orange">{Icons.mapPin}</span>
                  </span>
                  Dallas, Texas, USA
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter — 2 cols on lg */}
          <div className="lg:col-span-2">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-gray-300 mb-4">Stay Updated</h3>
            {subscribed ? (
              <div className="flex items-center gap-2 text-dynasty-orange text-sm font-medium">
                <span className="w-5 h-5 block">{Icons.check}</span>
                You're on the list!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-dynasty-purple focus:border-dynasty-purple transition-colors"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2.5 bg-dynasty-purple text-white text-sm font-semibold rounded-xl hover:bg-dynasty-purple/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar — single strip */}
      <div className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-gray-500 text-xs">
              &copy; {new Date().getFullYear()} KM DYNASTY. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs">
              Want to reach our audience?{' '}
              <Link to="/advertise" className="text-dynasty-orange hover:text-dynasty-orange/80 font-semibold transition-colors">
                Advertise With Us
              </Link>
            </p>
          </div>
          <p className="text-gray-700 text-[10px] text-center mt-3 leading-relaxed">
            This is an independent fan/community platform and is not officially affiliated with, endorsed by, or sponsored by TikTok or ByteDance Ltd.
          </p>
        </div>
      </div>
    </footer>
  )
}

import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icons } from './Icons'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/how-to-join', label: 'How to Join' },
  { to: '/battle-schedule', label: 'Battle Schedule' },
  { to: '/blog', label: 'Blog' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/daily-quotes', label: 'Daily Quotes' },
  { to: '/outreach', label: 'Outreach' },
  { to: '/giveaway', label: 'Giveaway' },
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
  { href: '#', icon: 'facebook', label: 'Facebook', comingSoon: true, color: 'hover:bg-[#1877f2]' },
  { href: '#', icon: 'twitch', label: 'Twitch', comingSoon: true, color: 'hover:bg-[#9146ff]' },
  { href: '#', icon: 'snapchat', label: 'Snapchat', comingSoon: true, color: 'hover:bg-[#fffc00]' },
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-6">
        {/* Top row: Brand + Socials + Newsletter — tight horizontal */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6 mb-8">
          {/* Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2 mb-2">
              <span className="w-7 h-7 rounded-md bg-dynasty-purple flex items-center justify-center text-white">
                <span className="w-4 h-4 block">{Icons.crown}</span>
              </span>
              <span className="font-display font-bold text-base tracking-tight">KM DYNASTY</span>
            </Link>
            <p className="text-gray-400 text-xs leading-relaxed max-w-xs mb-3">
              The official hub for King Maker's Godsent Box Battles.
            </p>
            {/* Social icons — compact row */}
            <div className="flex items-center gap-1.5">
              {socials.map(({ href, icon, label, comingSoon, color }) => (
                <a
                  key={label}
                  href={comingSoon ? undefined : href}
                  target={comingSoon ? undefined : '_blank'}
                  rel={comingSoon ? undefined : 'noopener noreferrer'}
                  title={comingSoon ? `${label} — coming soon` : label}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                    comingSoon
                      ? 'bg-white/5 text-gray-600 cursor-default'
                      : `bg-white/10 text-white ${color} hover:scale-110`
                  }`}
                  aria-label={label}
                >
                  <span className="w-3.5 h-3.5 block">{Icons[icon]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links — 2 columns inline */}
          <div className="flex gap-x-10 gap-y-1 flex-wrap">
            <div>
              <h3 className="font-display font-bold text-[10px] uppercase tracking-wider text-gray-500 mb-2">Links</h3>
              <ul className="space-y-1">
                {quickLinks.slice(0, 7).map(({ to, label }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className={`text-xs transition-colors ${pathname === to ? 'text-dynasty-orange font-semibold' : 'text-gray-400 hover:text-white'}`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display font-bold text-[10px] uppercase tracking-wider text-gray-500 mb-2">&nbsp;</h3>
              <ul className="space-y-1">
                {quickLinks.slice(7).map(({ to, label }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className={`text-xs transition-colors ${pathname === to ? 'text-dynasty-orange font-semibold' : 'text-gray-400 hover:text-white'}`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
                <li className="pt-1 border-t border-white/5 flex gap-3">
                  <Link to="/privacy" className="text-gray-500 text-[10px] hover:text-gray-300">Privacy</Link>
                  <Link to="/terms" className="text-gray-500 text-[10px] hover:text-gray-300">Terms</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Get in Touch — compact */}
          <div className="flex-shrink-0">
            <h3 className="font-display font-bold text-[10px] uppercase tracking-wider text-gray-500 mb-2">Contact</h3>
            <ul className="space-y-1.5">
              <li>
                <a href="mailto:lagwatinc@gmail.com" className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors">
                  <span className="w-3.5 h-3.5 block text-dynasty-orange flex-shrink-0">{Icons.mail}</span>
                  lagwatinc@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+14696641195" className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors">
                  <span className="w-3.5 h-3.5 block text-dynasty-orange flex-shrink-0">{Icons.phone}</span>
                  +1 (469) 664-1195 <span className="text-gray-600">(US)</span>
                </a>
              </li>
              <li>
                <a href="tel:+256200947070" className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors">
                  <span className="w-3.5 h-3.5 block text-dynasty-orange flex-shrink-0">{Icons.phone}</span>
                  +256-200-947-070 <span className="text-gray-600">(Uganda)</span>
                </a>
              </li>
              <li className="flex items-center gap-2 text-xs text-gray-400">
                <span className="w-3.5 h-3.5 block text-dynasty-orange flex-shrink-0">{Icons.mapPin}</span>
                Dallas, Texas, USA
              </li>
            </ul>
          </div>

          {/* Newsletter — compact */}
          <div className="flex-shrink-0">
            <h3 className="font-display font-bold text-[10px] uppercase tracking-wider text-gray-500 mb-2">Stay Updated</h3>
            {subscribed ? (
              <div className="flex items-center gap-1.5 text-dynasty-orange text-xs font-medium">
                <span className="w-4 h-4 block">{Icons.check}</span>
                You're on the list!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-1.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="w-28 px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-dynasty-purple transition-colors"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-dynasty-purple text-white text-xs font-semibold rounded-lg hover:bg-dynasty-purple/90 transition-colors"
                >
                  Go
                </button>
              </form>
            )}
            <a
              href="https://www.tiktok.com/@kingmakernevergivesup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 bg-dynasty-orange text-white text-xs font-semibold rounded-lg hover:bg-dynasty-orange/90 transition-colors"
            >
              <span className="w-3 h-3 block">{Icons.play}</span>
              Follow King Maker
            </a>
          </div>
        </div>

        {/* Bottom bar — tight single line */}
        <div className="border-t border-white/5 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-500 text-[10px]">
            &copy; {new Date().getFullYear()} KM DYNASTY. All rights reserved. Want to reach our audience?{' '}
            <Link to="/advertise" className="text-dynasty-orange hover:text-dynasty-orange/80 font-semibold transition-colors">
              Advertise With Us
            </Link>
          </p>
          <p className="text-gray-600 text-[9px]">
            Independent fan/community platform. Not affiliated with TikTok or ByteDance.
          </p>
        </div>
      </div>
    </footer>
  )
}

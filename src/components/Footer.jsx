import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icons } from './Icons'

const columns = {
  explore: [
    { to: '/', label: 'Home' },
    { to: '/how-to-join', label: 'How to Join' },
    { to: '/battle-schedule', label: 'Battle Schedule' },
    { to: '/daily-quotes', label: 'Daily Quotes' },
    { to: '/blog', label: 'Blog' },
    { to: '/gallery', label: 'Gallery' },
  ],
  community: [
    { to: '/outreach', label: 'Outreach' },
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

const socials = [
  { href: 'https://www.tiktok.com/@kingmakernevergivesup', icon: 'tiktok', label: 'TikTok', color: 'hover:bg-[#ff0050]' },
  { href: '#', icon: 'instagram', label: 'Instagram', comingSoon: true, color: 'hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888]' },
  { href: '#', icon: 'youtube', label: 'YouTube', comingSoon: true, color: 'hover:bg-[#ff0000]' },
  { href: '#', icon: 'whatsapp', label: 'WhatsApp', comingSoon: true, color: 'hover:bg-[#25d366]' },
  { href: '#', icon: 'facebook', label: 'Facebook', comingSoon: true, color: 'hover:bg-[#1877f2]' },
  { href: '#', icon: 'twitch', label: 'Twitch', comingSoon: true, color: 'hover:bg-[#9146ff]' },
  { href: '#', icon: 'snapchat', label: 'Snapchat', comingSoon: true, color: 'hover:bg-[#fffc00]' },
]

function LinkColumn({ title, links }) {
  const { pathname } = useLocation()
  return (
    <div>
      <h4 className="font-display font-bold text-xs uppercase tracking-wider text-gray-300 mb-3">{title}</h4>
      <ul className="space-y-1.5">
        {links.map(({ to, label }) => (
          <li key={to}>
            <Link
              to={to}
              className={`text-sm transition-colors ${pathname === to ? 'text-dynasty-orange font-semibold' : 'text-gray-400 hover:text-white'}`}
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-8">

        {/* === ROW 1: Brand + 3 link columns + Contact === */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-6 mb-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 lg:pr-4">
            <Link to="/" className="flex items-center gap-2.5 mb-3">
              <span className="w-8 h-8 rounded-lg bg-dynasty-purple flex items-center justify-center text-white">
                <span className="w-4 h-4 block">{Icons.crown}</span>
              </span>
              <span className="font-display font-bold text-lg tracking-tight">KM DYNASTY</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 max-w-xs">
              The official hub for King Maker's Godsent Box Battles. Join the family, compete, and rise.
            </p>
            <a
              href="https://www.tiktok.com/@kingmakernevergivesup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-dynasty-orange text-white text-sm font-semibold rounded-lg hover:bg-dynasty-orange/90 transition-colors"
            >
              <span className="w-4 h-4 block">{Icons.play}</span>
              Follow King Maker
            </a>
          </div>

          {/* Explore */}
          <LinkColumn title="Explore" links={columns.explore} />

          {/* Community */}
          <LinkColumn title="Community" links={columns.community} />

          {/* Support */}
          <LinkColumn title="Support" links={columns.support} />

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-gray-300 mb-3">Contact</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="mailto:lagwatinc@gmail.com" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                  <span className="w-4 h-4 block text-dynasty-orange flex-shrink-0">{Icons.mail}</span>
                  lagwatinc@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+14696641195" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                  <span className="w-4 h-4 block text-dynasty-orange flex-shrink-0">{Icons.phone}</span>
                  +1 (469) 664-1195 <span className="text-gray-600 text-xs">(US)</span>
                </a>
              </li>
              <li>
                <a href="tel:+256200947070" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                  <span className="w-4 h-4 block text-dynasty-orange flex-shrink-0">{Icons.phone}</span>
                  +256-200-947-070 <span className="text-gray-600 text-xs">(Uganda)</span>
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <span className="w-4 h-4 block text-dynasty-orange flex-shrink-0">{Icons.mapPin}</span>
                Dallas, Texas, USA
              </li>
            </ul>
          </div>
        </div>

        {/* === ROW 2: Newsletter + Socials === */}
        <div className="border-t border-white/10 pt-6 pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            {/* Newsletter */}
            <div>
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-gray-300 mb-2">Stay Updated</h4>
              {subscribed ? (
                <div className="flex items-center gap-2 text-dynasty-orange text-sm font-medium">
                  <span className="w-5 h-5 block">{Icons.check}</span>
                  You're on the list!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-56 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-dynasty-purple transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-dynasty-purple text-white text-sm font-semibold rounded-lg hover:bg-dynasty-purple/90 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            {/* Social icons */}
            <div>
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-gray-300 mb-2">Follow Us</h4>
              <div className="flex items-center gap-2">
                {socials.map(({ href, icon, label, comingSoon, color }) => (
                  <a
                    key={label}
                    href={comingSoon ? undefined : href}
                    target={comingSoon ? undefined : '_blank'}
                    rel={comingSoon ? undefined : 'noopener noreferrer'}
                    title={comingSoon ? `${label} — coming soon` : label}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 ${
                      comingSoon
                        ? 'bg-white/5 text-gray-600 cursor-default'
                        : `bg-white/10 text-white ${color} hover:scale-110`
                    }`}
                    aria-label={label}
                  >
                    <span className="w-4 h-4 block">{Icons[icon]}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* === ROW 3: Bottom bar === */}
        <div className="border-t border-white/10 pt-5">
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
          <p className="text-gray-600 text-[10px] text-center mt-3">
            This is an independent fan/community platform and is not officially affiliated with, endorsed by, or sponsored by TikTok or ByteDance Ltd.
          </p>
        </div>
      </div>
    </footer>
  )
}

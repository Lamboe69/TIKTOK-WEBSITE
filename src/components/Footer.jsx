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
  { href: 'https://www.tiktok.com/@kingmakernevergivesup', icon: 'tiktok', label: 'TikTok' },
  { href: '#', icon: 'instagram', label: 'Instagram', comingSoon: true },
  { href: '#', icon: 'youtube', label: 'YouTube', comingSoon: true },
  { href: '#', icon: 'whatsapp', label: 'WhatsApp', comingSoon: true },
  { href: '#', icon: 'facebook', label: 'Facebook', comingSoon: true },
  { href: '#', icon: 'twitch', label: 'Twitch', comingSoon: true },
  { href: '#', icon: 'snapchat', label: 'Snapchat', comingSoon: true },
]

function LinkColumn({ title, links }) {
  const { pathname } = useLocation()
  return (
    <div>
      <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-brand-400 mb-3">{title}</h4>
      <ul className="space-y-1.5">
        {links.map(({ to, label }) => (
          <li key={to}>
            <Link
              to={to}
              className={`text-sm transition-colors ${pathname === to ? 'text-white font-medium' : 'text-brand-400 hover:text-white'}`}
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
    <footer className="bg-brand-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-6">
        {/* Row 1: Brand + link columns + contact */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-6 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 lg:pr-4">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-md bg-white flex items-center justify-center">
                <span className="w-4 h-4 block text-brand-900">{Icons.crown}</span>
              </span>
              <span className="font-display font-bold text-base tracking-tight">KM DYNASTY</span>
            </Link>
            <p className="text-brand-400 text-sm leading-relaxed mb-4 max-w-xs">
              The official hub for King Maker's Godsent Box Battles. Join the family, compete, and rise.
            </p>
            <a
              href="https://www.tiktok.com/@kingmakernevergivesup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-brand-900 text-sm font-semibold rounded-md hover:bg-brand-100 transition-colors"
            >
              <span className="w-4 h-4 block">{Icons.play}</span>
              Follow King Maker
            </a>
          </div>

          <LinkColumn title="Explore" links={columns.explore} />
          <LinkColumn title="Community" links={columns.community} />
          <LinkColumn title="Support" links={columns.support} />

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-brand-400 mb-3">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:lagwatinc@gmail.com" className="flex items-center gap-2 text-sm text-brand-400 hover:text-white transition-colors">
                  <span className="w-3.5 h-3.5 block flex-shrink-0">{Icons.mail}</span>
                  lagwatinc@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+14696641195" className="flex items-center gap-2 text-sm text-brand-400 hover:text-white transition-colors">
                  <span className="w-3.5 h-3.5 block flex-shrink-0">{Icons.phone}</span>
                  +1 (469) 664-1195
                </a>
              </li>
              <li>
                <a href="tel:+256200947070" className="flex items-center gap-2 text-sm text-brand-400 hover:text-white transition-colors">
                  <span className="w-3.5 h-3.5 block flex-shrink-0">{Icons.phone}</span>
                  +256-200-947-070
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-brand-400">
                <span className="w-3.5 h-3.5 block flex-shrink-0">{Icons.mapPin}</span>
                Dallas, Texas, USA
              </li>
            </ul>
          </div>
        </div>

        {/* Row 2: Newsletter + socials */}
        <div className="border-t border-white/10 pt-6 pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-brand-400 mb-2">Stay Updated</h4>
              {subscribed ? (
                <div className="flex items-center gap-2 text-white text-sm font-medium">
                  <span className="w-4 h-4 block">{Icons.check}</span>
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
                    className="w-56 px-3 py-2 bg-white/10 border border-white/10 rounded-md text-sm text-white placeholder-brand-500 focus:outline-none focus:border-white/30 transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white text-brand-900 text-sm font-semibold rounded-md hover:bg-brand-100 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            <div>
              <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-brand-400 mb-2">Follow Us</h4>
              <div className="flex items-center gap-2">
                {socials.map(({ href, icon, label, comingSoon }) => (
                  <a
                    key={label}
                    href={comingSoon ? undefined : href}
                    target={comingSoon ? undefined : '_blank'}
                    rel={comingSoon ? undefined : 'noopener noreferrer'}
                    title={comingSoon ? `${label} — coming soon` : label}
                    className={`w-8 h-8 rounded-md flex items-center justify-center transition-all ${
                      comingSoon
                        ? 'bg-white/5 text-brand-600 cursor-default'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                    aria-label={label}
                  >
                    <span className="w-3.5 h-3.5 block">{Icons[icon]}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Bottom bar */}
        <div className="border-t border-white/10 pt-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-brand-500 text-xs">
              &copy; {new Date().getFullYear()} KM DYNASTY. All rights reserved.
            </p>
            <p className="text-brand-500 text-xs">
              Want to reach our audience?{' '}
              <Link to="/advertise" className="text-white hover:text-brand-200 font-medium transition-colors">
                Advertise With Us
              </Link>
            </p>
          </div>
          <p className="text-brand-600 text-[10px] text-center mt-2">
            Independent fan/community platform. Not affiliated with TikTok or ByteDance.
          </p>
        </div>
      </div>
    </footer>
  )
}

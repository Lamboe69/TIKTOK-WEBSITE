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
  { href: 'https://www.tiktok.com/@kingmakernevergivesup', icon: 'tiktok', label: 'TikTok', highlight: true },
  { href: '#', icon: 'instagram', label: 'Instagram', comingSoon: true },
  { href: '#', icon: 'youtube', label: 'YouTube', comingSoon: true },
  { href: '#', icon: 'whatsapp', label: 'WhatsApp', comingSoon: true },
  { href: '#', icon: 'facebook', label: 'Facebook', comingSoon: true },
  { href: '#', icon: 'twitch', label: 'Twitch', comingSoon: true },
]

function LinkColumn({ title, links }) {
  const { pathname } = useLocation()
  return (
    <div>
      <h4 className="font-body font-semibold text-[10px] uppercase tracking-widest text-white/30 mb-3">{title}</h4>
      <ul className="space-y-1.5">
        {links.map(({ to, label }) => (
          <li key={to}>
            <Link
              to={to}
              className={`text-sm transition-colors ${pathname === to ? 'text-ember font-medium' : 'text-white/50 hover:text-white'}`}
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
    <footer style={{ background: '#120620' }}>
      {/* Ember accent line */}
      <div style={{ height: 3, background: 'linear-gradient(90deg, #3B1063, #FF6B1A, #3B1063)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-6">
        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 lg:pr-4">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <span className="w-8 h-8 rounded-lg bg-ember flex items-center justify-center text-white">
                <span className="w-4 h-4 block">{Icons.crown}</span>
              </span>
              <div className="leading-none">
                <span className="block font-display font-bold text-sm text-ivory tracking-widest">KM DYNASTY</span>
                <span className="block font-body text-[9px] text-white/30 tracking-[0.2em] uppercase">Godsent Box Battles</span>
              </div>
            </Link>
            {/* Ember accent bar */}
            <div className="w-8 h-0.5 bg-ember mb-3 rounded-full" />
            <p className="text-white/40 text-sm leading-relaxed mb-5 max-w-xs">
              The official hub for King Maker's Godsent Box Battles. Join the family, compete, and rise.
            </p>
            <a
              href="https://www.tiktok.com/@kingmakernevergivesup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-white rounded-lg transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)' }}
            >
              <span className="w-4 h-4 block">{Icons.tiktok}</span>
              Follow King Maker
            </a>
          </div>

          <LinkColumn title="Explore" links={columns.explore} />
          <LinkColumn title="Community" links={columns.community} />
          <LinkColumn title="Support" links={columns.support} />

          {/* Contact */}
          <div>
            <h4 className="font-body font-semibold text-[10px] uppercase tracking-widest text-white/30 mb-3">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:lagwatinc@gmail.com" className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                  <span className="w-3.5 h-3.5 block flex-shrink-0">{Icons.mail}</span>
                  lagwatinc@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+14696641195" className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                  <span className="w-3.5 h-3.5 block flex-shrink-0">{Icons.phone}</span>
                  +1 (469) 664-1195
                </a>
              </li>
              <li>
                <a href="tel:+256200947070" className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                  <span className="w-3.5 h-3.5 block flex-shrink-0">{Icons.phone}</span>
                  +256-200-947-070
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/40">
                <span className="w-3.5 h-3.5 block flex-shrink-0">{Icons.mapPin}</span>
                Dallas, Texas, USA
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter + socials */}
        <div className="border-t border-white/04 pt-6 pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <h4 className="font-body font-semibold text-[10px] uppercase tracking-widest text-white/30 mb-2">Stay Updated</h4>
              {subscribed ? (
                <div className="flex items-center gap-2 text-ember text-sm font-medium">
                  <span className="w-4 h-4 block">{Icons.check}</span>
                  You're on the list!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex rounded-full overflow-hidden border border-white/10" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="flex-1 px-4 py-2 bg-transparent text-sm text-white placeholder-white/30 focus:outline-none min-w-0 w-52"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2 text-sm font-bold text-white rounded-full flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)' }}
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            <div>
              <h4 className="font-body font-semibold text-[10px] uppercase tracking-widest text-white/30 mb-2">Follow Us</h4>
              <div className="flex items-center gap-2">
                {socials.map(({ href, icon, label, comingSoon, highlight }) => (
                  <a
                    key={label}
                    href={comingSoon ? undefined : href}
                    target={comingSoon ? undefined : '_blank'}
                    rel={comingSoon ? undefined : 'noopener noreferrer'}
                    title={comingSoon ? `${label} — coming soon` : label}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                      highlight
                        ? 'text-white hover:scale-110'
                        : comingSoon
                        ? 'text-white/20 cursor-default'
                        : 'text-white/50 hover:text-white hover:bg-white/10'
                    }`}
                    style={highlight ? { background: 'linear-gradient(135deg, #FF6B1A, #CC5200)' } : { background: 'rgba(255,255,255,0.05)' }}
                    aria-label={label}
                  >
                    <span className="w-3.5 h-3.5 block">{Icons[icon]}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/04 pt-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-white/25 text-xs">
              &copy; {new Date().getFullYear()} KM DYNASTY. All rights reserved.
            </p>
            <p className="text-white/25 text-xs">
              Want to reach our audience?{' '}
              <Link to="/advertise" className="text-ember hover:text-ember/80 font-medium transition-colors">
                Advertise With Us
              </Link>
            </p>
          </div>
          <p className="text-white/15 text-[10px] text-center mt-2">
            Independent fan/community platform. Not affiliated with TikTok or ByteDance.
          </p>
        </div>
      </div>
    </footer>
  )
}

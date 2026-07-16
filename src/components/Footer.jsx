import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icons } from './Icons'
import { useContent } from '../cms/ContentContext'
import { WHATSAPP_CHANNEL_URL, CONTACT_EMAIL } from '../constants/brand'

const defaultColumns = {
  explore: [
    { to: '/', label: 'Home' },
    { to: '/how-to-join', label: 'How to Join' },
    { to: '/battle-schedule', label: 'Battle Schedule' },
    { to: '/daily-quotes', label: 'Daily Quotes' },
    { to: '/blog', label: 'Blog' },
    { to: '/gallery', label: 'Gallery' },
  ],
  community: [
    { to: '/charity', label: 'Charity' },
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
  const { settings, collections } = useContent()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const contactEmail = settings.email || CONTACT_EMAIL
  const phoneUS = settings.phoneUS || '+1 (469) 664-1195'
  const phoneUG = settings.phoneUG || '+256-200-947-070'
  const siteName = settings.siteName || ''
  const tagline = settings.tagline || "The official hub for King Maker's Godsent Box Battles. Join the family, compete, and rise."
  const location = settings.location || 'Dallas, Texas, USA'
  const copyright = settings.copyright || `${siteName}. All rights reserved.`
  const disclaimer = settings.disclaimer || 'Independent fan/community platform. Not affiliated with TikTok or ByteDance.'

  const columns = {
    explore: collections.footerExploreLinks?.length ? collections.footerExploreLinks : defaultColumns.explore,
    community: collections.footerCommunityLinks?.length ? collections.footerCommunityLinks : defaultColumns.community,
    support: collections.footerSupportLinks?.length ? collections.footerSupportLinks : defaultColumns.support,
  }

  const tiktokUrl = settings.tiktokUrl || 'https://www.tiktok.com/@kingmakernevergivesup'
  const paypalEmail = settings.paypalEmail || ''
  const socials = [
    { href: tiktokUrl, icon: 'tiktok', label: 'TikTok', highlight: true },
    { href: settings.instagramUrl || '#', icon: 'instagram', label: 'Instagram', comingSoon: !settings.instagramUrl },
    { href: settings.youtubeUrl || '#', icon: 'youtube', label: 'YouTube', comingSoon: !settings.youtubeUrl },
    { href: settings.whatsappUrl || WHATSAPP_CHANNEL_URL, icon: 'whatsapp', label: 'KM WhatsApp Channel', comingSoon: false },
    { href: settings.facebookUrl || '#', icon: 'facebook', label: 'Facebook', comingSoon: !settings.facebookUrl },
    { href: settings.twitchUrl || '#', icon: 'twitch', label: 'Twitch', comingSoon: !settings.twitchUrl },
  ]

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    const subject = encodeURIComponent(`${siteName} — Newsletter`)
    const body = encodeURIComponent(`New subscriber: ${email}`)
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer style={{ background: '#1A0E34' }}>
      {/* Ember accent line */}
      <div style={{ height: 3, background: 'linear-gradient(90deg, #6B3FA0, #FF8A3D, #6B3FA0)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-6">
        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 lg:pr-4">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img
                src="/photos/logo.jpg"
                alt=""
                className="w-8 h-8 rounded-lg object-cover border border-ember/35"
              />
              <div className="leading-none">
                <span className="block font-display font-bold text-sm text-ivory tracking-widest">{siteName}</span>
                <span className="block font-body text-[9px] text-white/30 tracking-[0.2em] uppercase">{tagline.split('.')[0]}</span>
              </div>
            </Link>
            {/* Ember accent bar */}
            <div className="w-8 h-0.5 bg-ember mb-3 rounded-full" />
            <p className="text-white/40 text-sm leading-relaxed mb-5 max-w-xs">
              {tagline}
            </p>
            <a
              href={tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-white rounded-lg transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)' }}
            >
              <span className="w-5 h-5 block rounded-sm overflow-hidden shrink-0">{Icons.tiktok}</span>
              Follow King Maker
            </a>
            <form action="https://www.paypal.com/donate" method="post" target="_blank" className="mt-3" onSubmit={(e) => { if (!paypalEmail) { e.preventDefault(); alert('Donations coming soon — the admin will configure PayPal in Settings.'); } }}>
                <input type="hidden" name="business" value={paypalEmail} />
                <input type="hidden" name="no_recurring" value="0" />
                <input type="hidden" name="item_name" value={`${siteName} Donation`} />
                <input type="hidden" name="currency_code" value="USD" />
                <input type="hidden" name="amount" value="" />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-white rounded-lg transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #0070BA, #005ea6)' }}
                >
                  <span className="w-4 h-4 block">{Icons.heart}</span>
                  Donate with PayPal
                </button>
              </form>
          </div>

          <LinkColumn title="Explore" links={columns.explore} />
          <LinkColumn title="Community" links={columns.community} />
          <LinkColumn title="Support" links={columns.support} />

          {/* Contact */}
          <div>
            <h4 className="font-body font-semibold text-[10px] uppercase tracking-widest text-white/30 mb-3">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a href={`mailto:${contactEmail}`} className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                  <span className="w-3.5 h-3.5 block flex-shrink-0">{Icons.mail}</span>
                  {contactEmail}
                </a>
              </li>
              <li>
                <a href={`tel:${phoneUS.replace(/[^\d+]/g, '')}`} className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                  <span className="w-3.5 h-3.5 block flex-shrink-0">{Icons.phone}</span>
                  {phoneUS}
                </a>
              </li>
              <li>
                <a href={`tel:${phoneUG.replace(/[^\d+]/g, '')}`} className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                  <span className="w-3.5 h-3.5 block flex-shrink-0">{Icons.phone}</span>
                  {phoneUG}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/40">
                <span className="w-3.5 h-3.5 block flex-shrink-0">{Icons.mapPin}</span>
                {location}
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
                    <span className={`block overflow-hidden rounded-sm ${highlight ? 'w-5 h-5' : 'w-3.5 h-3.5'}`}>
                      {Icons[icon]}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Follow King Maker CTA */}
        <div className="border-t border-white/04 py-8 text-center">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Follow King Maker</p>
          <a
            href={tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold text-white rounded-xl transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)', boxShadow: '0 8px 32px rgba(255,107,26,0.25)' }}
          >
            <span className="w-5 h-5 block rounded-sm overflow-hidden shrink-0">{Icons.tiktok}</span>
            Follow King Maker on TikTok
          </a>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/04 pt-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-white/25 text-xs">
              &copy; {new Date().getFullYear()} {copyright}
            </p>
            <p className="text-white/25 text-xs">
              Want to reach our audience?{' '}
              <Link to="/advertise" className="text-ember hover:text-ember/80 font-medium transition-colors">
                Advertise With Us
              </Link>
            </p>
          </div>
          <p className="text-white/15 text-[10px] text-center mt-2">
            {disclaimer}
          </p>
        </div>
      </div>
    </footer>
  )
}

import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Icons } from '../components/Icons'
import Motion from '../components/Motion'
import { useTikTokStats } from '../hooks/useTikTokStats'

const packages = [
  {
    name: 'Livestream Shout-Out',
    price: null,
    availability: 'available',
    features: [
      'On-screen brand mention during live battle',
      'Tagged in stream description',
      'Shared to King Maker\'s TikTok story',
    ],
    color: 'border-accent',
  },
  {
    name: 'Homepage Banner',
    price: null,
    availability: 'limited',
    availabilityNote: '1 slot at a time',
    features: [
      'Rotating banner on kmDynasty.com homepage',
      'Visible to every site visitor',
      'Link to your site or campaign page',
    ],
    color: 'border-gold',
  },
  {
    name: 'Sponsored Content',
    price: null,
    availability: 'available',
    features: [
      'Dedicated TikTok post or shout-out',
      'Mentioned in box battle description',
      'Brand tag in video overlay',
    ],
    color: 'border-accent',
  },
  {
    name: 'Custom / Bundle',
    price: null,
    availability: 'available',
    features: [
      'Mix & match any placement above',
      'Tailored to your campaign goals',
      'Contact for a custom quote',
    ],
    color: 'border-gold',
  },
]

const availabilityConfig = {
  available: { label: 'Available', dot: 'bg-emerald-400', text: 'text-emerald-600', bg: 'bg-emerald-50' },
  limited: { label: '1 Slot Left', dot: 'bg-amber-400', text: 'text-amber-600', bg: 'bg-amber-50' },
  booked: { label: 'Currently Booked', dot: 'bg-red-400', text: 'text-red-600', bg: 'bg-red-50' },
}

const budgetRanges = [
  'Under $100',
  '$100 – $500',
  '$500 – $1,000',
  '$1,000 – $5,000',
  '$5,000+',
  'Not sure yet',
]

const initialForm = {
  businessName: '',
  contactName: '',
  email: '',
  phone: '',
  website: '',
  placement: '',
  budget: '',
  message: '',
}

export default function Advertise() {
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const { stats } = useTikTokStats()

  const reachStats = useMemo(() => [
    { icon: Icons.users, value: stats.followersFormatted || '—', label: 'Followers', color: 'text-gold' },
    { icon: Icons.play, value: stats.avgViewersFormatted || '—', label: 'Avg. Live Viewers', color: 'text-accent' },
    { icon: Icons.globe, value: 'US & Canada', label: 'Primary Regions', color: 'text-gold' },
    { icon: Icons.trophy, value: stats.battlesHostedFormatted || '—', label: 'Battles Hosted', color: 'text-accent' },
  ], [stats])

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const subject = encodeURIComponent(`Advertising Inquiry — ${form.businessName}`)
    const body = encodeURIComponent(
      `Business/Brand: ${form.businessName}\n` +
      `Contact: ${form.contactName}\n` +
      `Email: ${form.email}\n` +
      `Phone: ${form.phone || 'N/A'}\n` +
      `Website: ${form.website || 'N/A'}\n` +
      `Placement Interest: ${form.placement}\n` +
      `Budget: ${form.budget || 'N/A'}\n\n` +
      `Message:\n${form.message}`
    )
    window.location.href = `mailto:lagwatinc@gmail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
    setSubmitting(false)
  }

  return (
    <main>
      {/* Intro */}
      <section className="bg-brand-900 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/5 text-accent text-xs font-semibold mb-6">
            <span className="w-3 h-3 block text-gold">{Icons.globe}</span>
            For Brands & Sponsors
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
            <span className="text-gradient">Advertise With KM DYNASTY</span>
          </h1>
          <p className="text-brand-500 text-base sm:text-lg max-w-2xl mx-auto mb-10">
            Partner with King Maker to reach a fast-growing, highly engaged livestream audience.
            Choose a placement that fits your brand, and let's make it happen.
          </p>

          {/* Reach stats strip */}
          <Motion>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {reachStats.map((stat) => (
                <div key={stat.label} className="bg-white/[0.06] backdrop-blur-sm rounded-xl p-4 border border-white/[0.08]">
                  <span className={`w-6 h-6 mx-auto mb-2 block ${stat.color}`}>{stat.icon}</span>
                  <p className="font-display font-bold text-xl sm:text-2xl text-white">{stat.value}</p>
                  <p className="text-brand-500 text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
            <p className="text-brand-500/50 text-[10px] mt-3 italic">
              Replace placeholder numbers with verified stats before launch.
            </p>
          </Motion>
        </div>
      </section>

      {/* Placement Packages */}
      <section className="py-12 sm:py-16 bg-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-900 mb-3">
              Placement Options
            </h2>
            <p className="text-brand-500 text-sm max-w-xl mx-auto">
              Pick a package or mix & match. Pricing is confirmed after we review your inquiry.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map(({ name, price, availability, availabilityNote, features, color }, i) => {
              const avail = availabilityConfig[availability]
              const isBooked = availability === 'booked'

              return (
                <div
                  key={i}
                  className={`bg-white rounded-xl p-6 border-2 ${color} flex flex-col`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-bold text-lg text-brand-900">{name}</h3>
                  </div>

                  {/* Availability status tag */}
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${avail.bg} ${avail.text} mb-3 self-start`}>
                    <span className={`w-2 h-2 rounded-full ${avail.dot}`}></span>
                    {avail.label}
                    {availabilityNote && <span className="font-normal opacity-70">({availabilityNote})</span>}
                  </div>

                  <p className="text-gold font-bold text-sm mb-4">
                    {price || 'Contact for pricing'}
                  </p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-brand-500">
                        <span className="w-4 h-4 block text-accent mt-0.5 flex-shrink-0">{Icons.check}</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  {isBooked ? (
                    <a
                      href="#inquiry-form"
                      onClick={(e) => {
                        e.preventDefault()
                        document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' })
                        setForm({ ...form, placement: name })
                      }}
                      className="block w-full text-center px-4 py-2.5 bg-brand-50 text-brand-500 font-bold text-sm rounded-md hover:bg-brand-100 transition-colors"
                    >
                      Join Waitlist
                    </a>
                  ) : (
                    <a
                      href="#inquiry-form"
                      onClick={(e) => {
                        e.preventDefault()
                        document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' })
                        setForm({ ...form, placement: name })
                      }}
                      className="block w-full text-center px-4 py-2.5 bg-brand-900 text-white font-bold text-sm rounded-md hover:bg-brand-800 transition-colors"
                    >
                      Reserve This Slot
                    </a>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* As Seen On (placeholder) */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Motion>
            <div className="bg-accent/5 rounded-xl border border-accent/10 p-8 text-center">
              <span className="w-10 h-10 mx-auto mb-3 block text-accent">{Icons.star}</span>
              <h2 className="font-display font-bold text-xl text-brand-900 mb-2">As Seen On KM DYNASTY</h2>
              <p className="text-xs text-brand-500 mb-4 max-w-md mx-auto">
                Past sponsor placements and campaign examples will appear here once live.
                Real results from real partners &mdash; the best proof for the next one.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                <div className="bg-white rounded-lg p-5 border border-dashed border-brand-200">
                  <div className="w-12 h-12 rounded-lg bg-brand-50 flex items-center justify-center mx-auto mb-3">
                    <span className="w-6 h-6 text-brand-500">{Icons.globe}</span>
                  </div>
                  <p className="text-xs text-brand-500 italic">Example: Livestream Shout-Out for [Brand]</p>
                </div>
                <div className="bg-white rounded-lg p-5 border border-dashed border-brand-200">
                  <div className="w-12 h-12 rounded-lg bg-brand-50 flex items-center justify-center mx-auto mb-3">
                    <span className="w-6 h-6 text-brand-500">{Icons.star}</span>
                  </div>
                  <p className="text-xs text-brand-500 italic">Example: Homepage Banner for [Brand]</p>
                </div>
              </div>
              <p className="text-[10px] text-brand-500 mt-4 italic">Phase 2 — replace with real sponsor examples (with permission).</p>
            </div>
          </Motion>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry-form" className="py-12 sm:py-16 bg-muted scroll-mt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-900 mb-3">
              Advertiser Inquiry
            </h2>
            <p className="text-brand-500 text-sm max-w-lg mx-auto">
              Tell us about your brand and what you're looking for. We'll get back to you within 1–2 business days.
            </p>
          </div>

          {submitted ? (
            <div className="bg-white rounded-xl p-10 text-center border border-brand-100">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <span className="w-7 h-7 block text-accent">{Icons.check}</span>
              </div>
              <h3 className="font-display font-bold text-xl text-brand-900 mb-2">Inquiry Sent</h3>
              <p className="text-sm text-brand-500 mb-6">
                Thanks — the KM DYNASTY team will get back to you within 1–2 business days.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-900 text-white font-bold text-sm rounded-md hover:bg-brand-800 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 bg-white rounded-xl p-8 border border-brand-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-brand-900 mb-1.5">
                    Business / Brand Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.businessName}
                    onChange={update('businessName')}
                    className="w-full px-4 py-2.5 bg-muted border border-brand-100 rounded-md text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-900 mb-1.5">
                    Contact Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.contactName}
                    onChange={update('contactName')}
                    className="w-full px-4 py-2.5 bg-muted border border-brand-100 rounded-md text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-brand-900 mb-1.5">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={update('email')}
                    className="w-full px-4 py-2.5 bg-muted border border-brand-100 rounded-md text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-900 mb-1.5">
                    Phone <span className="text-brand-500 font-normal">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={update('phone')}
                    className="w-full px-4 py-2.5 bg-muted border border-brand-100 rounded-md text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-900 mb-1.5">
                  Website / Social Link <span className="text-brand-500 font-normal">(optional)</span>
                </label>
                <input
                  type="url"
                  value={form.website}
                  onChange={update('website')}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 bg-muted border border-brand-100 rounded-md text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-brand-900 mb-1.5">
                    Placement Interest
                  </label>
                  <select
                    value={form.placement}
                    onChange={update('placement')}
                    className="w-full px-4 py-2.5 bg-muted border border-brand-100 rounded-md text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                  >
                    <option value="">Select a package...</option>
                    {packages.map(({ name }) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                    <option value="Not sure / Custom quote">Not sure / Want a custom quote</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-900 mb-1.5">
                    Budget Range <span className="text-brand-500 font-normal">(optional)</span>
                  </label>
                  <select
                    value={form.budget}
                    onChange={update('budget')}
                    className="w-full px-4 py-2.5 bg-muted border border-brand-100 rounded-md text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                  >
                    <option value="">Select range...</option>
                    {budgetRanges.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-900 mb-1.5">
                  Message / Campaign Details <span className="text-red-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={update('message')}
                  placeholder="Tell us about your campaign, goals, and any specific requirements..."
                  className="w-full px-4 py-2.5 bg-muted border border-brand-100 rounded-md text-sm text-brand-900 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full px-6 py-3 bg-brand-900 text-white font-bold text-sm rounded-md hover:bg-brand-800 transition-colors disabled:opacity-50"
              >
                {submitting ? 'Sending...' : 'Send Inquiry'}
              </button>

              <p className="text-xs text-brand-500 text-center">
                Payment for confirmed packages is handled via PayPal after we review your inquiry.
              </p>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}

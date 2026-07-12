import { useState } from 'react'
import Motion from '../components/Motion'
import { Icons } from '../components/Icons'

const impactStats = [
  { value: '500+', label: 'Families Helped' },
  { value: '$10K+', label: 'Donated' },
  { value: '12', label: 'Countries Reached' },
  { value: '100%', label: 'Transparent' },
]

const supportReasons = [
  'Medical emergency',
  'School fees / Education',
  'Food / Basic needs',
  'Housing / Shelter',
  'Business start-up',
  'Other',
]

export default function Outreach() {
  const [form, setForm] = useState({ name: '', email: '', country: '', reason: '', story: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent('KM DYNASTY - Support Request')
    const body = encodeURIComponent(
      'Name: ' + form.name + '\nEmail: ' + form.email + '\nCountry: ' + form.country + '\nReason: ' + form.reason + '\n\nStory:\n' + form.story
    )
    window.location.href = 'mailto:lagwatinc@gmail.com?subject=' + subject + '&body=' + body
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-brand-900 py-10 sm:py-14">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <Motion delay={0.1}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/5 text-accent text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-4 h-4 block">{Icons.heart}</span>
              Giving Back
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              KM Dynasty <span className="text-gold text-gradient">Outreach</span>
            </h1>
            <p className="text-brand-500 max-w-xl mx-auto">
              "I want to take our dynasty family to the streets and be a destiny helper to those in need."
            </p>
          </Motion>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 bg-muted border-b border-brand-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {impactStats.map((stat, idx) => (
              <Motion key={stat.label} delay={0.1 + idx * 0.08}>
                <div className="text-center">
                  <p className="font-display font-bold text-2xl sm:text-3xl text-gold">{stat.value}</p>
                  <p className="text-brand-500 text-sm mt-1">{stat.label}</p>
                </div>
              </Motion>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left — Mission + GoFundMe */}
            <div>
              <Motion delay={0.1}>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-900 mb-4">
                  Our Mission
                </h2>
                <p className="text-brand-500 leading-relaxed mb-6">
                  King Maker believes in giving back. Through the KM Dynasty Outreach program, we support
                  individuals and families in need across the globe. From medical emergencies to education
                  fees, we want to be a helping hand to those who need it most.
                </p>
                <p className="text-brand-500 leading-relaxed mb-8">
                  If you wish to be a part of this mission, donate below or apply for support.
                  Every contribution goes directly to those in need.
                </p>
              </Motion>

              <Motion delay={0.2}>
                <div className="bg-gold/5 border border-gold/20 rounded-xl p-6 mb-8">
                  <h3 className="font-display font-bold text-lg text-brand-900 mb-2">
                    Donate via GoFundMe
                  </h3>
                  <p className="text-brand-500 text-sm mb-4">
                    Support the KM Dynasty Outreach fund. Every dollar helps a family in need.
                  </p>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-white font-bold text-sm rounded-md hover:bg-gold-dark transition-colors"
                  >
                    Donate on GoFundMe
                    <span className="w-4 h-4 block">{Icons.arrowRight}</span>
                  </a>
                </div>
              </Motion>

              <Motion delay={0.3}>
                <div className="bg-muted border border-brand-100 rounded-xl p-6">
                  <h3 className="font-display font-bold text-lg text-brand-900 mb-3">
                    How Your Donations Help
                  </h3>
                  <ul className="space-y-3">
                    {[
                      { icon: Icons.heart, text: 'Medical support for families in crisis' },
                      { icon: Icons.star, text: 'School fees and educational supplies' },
                      { icon: Icons.gift, text: 'Food packages for struggling households' },
                      { icon: Icons.shield, text: 'Emergency shelter and housing support' },
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-brand-500">
                        <span className="w-5 h-5 block text-gold mt-0.5 flex-shrink-0">{item.icon}</span>
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </Motion>
            </div>

            {/* Right — Support Request Form */}
            <div>
              <Motion delay={0.15}>
                <div className="bg-muted border border-brand-100 rounded-xl p-6 sm:p-8">
                  <h2 className="font-display text-2xl font-bold text-brand-900 mb-2">
                    Request Support
                  </h2>
                  <p className="text-brand-500 text-sm mb-6">
                    Going through a difficult time? Submit your application and our team will review it personally.
                  </p>

                  {submitted ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                      <span className="w-10 h-10 block text-green-500 mx-auto mb-3">{Icons.check}</span>
                      <p className="text-green-700 font-semibold">Application submitted!</p>
                      <p className="text-green-600 text-sm mt-1">We'll review your request and get back to you.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-brand-900 mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={e => setForm({...form, name: e.target.value})}
                          className="w-full px-4 py-2.5 bg-white border border-brand-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-brand-900 mb-1">Email</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={e => setForm({...form, email: e.target.value})}
                          className="w-full px-4 py-2.5 bg-white border border-brand-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-brand-900 mb-1">Country</label>
                        <input
                          type="text"
                          required
                          value={form.country}
                          onChange={e => setForm({...form, country: e.target.value})}
                          className="w-full px-4 py-2.5 bg-white border border-brand-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-brand-900 mb-1">Reason for Support</label>
                        <select
                          required
                          value={form.reason}
                          onChange={e => setForm({...form, reason: e.target.value})}
                          className="w-full px-4 py-2.5 bg-white border border-brand-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                        >
                          <option value="">Select a reason</option>
                          {supportReasons.map(r => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-brand-900 mb-1">Your Story</label>
                        <textarea
                          required
                          rows={4}
                          value={form.story}
                          onChange={e => setForm({...form, story: e.target.value})}
                          placeholder="Tell us about your situation..."
                          className="w-full px-4 py-2.5 bg-white border border-brand-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full px-6 py-3 bg-gold text-white font-bold text-sm rounded-md hover:bg-gold-dark transition-colors"
                      >
                        Submit Application
                      </button>
                    </form>
                  )}
                </div>
              </Motion>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

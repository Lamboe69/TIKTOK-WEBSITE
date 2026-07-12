import { useState } from 'react'
import { Icons } from '../Icons'
import Motion from '../Motion'

const charityWork = [
  { icon: Icons.gift, title: 'Community Giveaways', description: 'Regular prize drops and surprise rewards for loyal community members.' },
  { icon: Icons.heart, title: 'Creator Support', description: 'Direct support for new creators who need a hand getting started.' },
  { icon: Icons.users, title: 'Charity Drives', description: 'Community-powered fundraising for causes that matter to our family.' },
]

export default function GiveBack() {
  const [form, setForm] = useState({ name: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent('KM DYNASTY — Request Support')
    const body = encodeURIComponent(`Name: ${form.name}\n\n${form.message}`)
    window.location.href = `mailto:lagwatinc@gmail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
    setForm({ name: '', message: '' })
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="py-12 sm:py-16 bg-brand-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <Motion variant="fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/5 rounded-full text-gold text-xs font-semibold mb-3">
              <span className="w-3.5 h-3.5 block">{Icons.heart}</span>
              Giving Back
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-900 mb-2">
              We Give Back to the Community
            </h2>
            <p className="text-sm text-brand-500 leading-relaxed max-w-lg mx-auto">
              KM DYNASTY isn't just about battles — it's about lifting people up.
            </p>
          </Motion>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {charityWork.map(({ icon, title, description }, i) => (
            <Motion key={i} variant="fade-up" delay={i * 100}>
              <div className="bg-white rounded-xl p-5 border border-brand-100 text-center hover:border-brand-200 transition-colors h-full">
                <div className="w-10 h-10 rounded-lg bg-accent/5 flex items-center justify-center mx-auto mb-3">
                  <span className="w-5 h-5 block text-accent">{icon}</span>
                </div>
                <h3 className="font-display font-bold text-sm text-brand-900 mb-1">{title}</h3>
                <p className="text-brand-500 text-sm leading-relaxed">{description}</p>
              </div>
            </Motion>
          ))}
        </div>

        {/* GoFundMe */}
        <Motion variant="fade-up" className="mb-8">
          <div className="bg-white rounded-xl border border-brand-100 p-6 text-center">
            <h3 className="font-display font-bold text-lg text-brand-900 mb-2">Support Our Mission</h3>
            <p className="text-brand-500 text-sm mb-4">Help us expand the Dynasty and support more creators.</p>
            <a
              href="https://gofundme.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold text-white text-sm font-semibold rounded-lg hover:bg-gold-dark transition-colors"
            >
              Donate on GoFundMe
            </a>
          </div>
        </Motion>

        {/* Request Support Form */}
        <Motion variant="fade-up">
          <div className="bg-white rounded-xl border border-brand-100 p-6 max-w-lg mx-auto">
            <h3 className="font-display font-bold text-base text-brand-900 mb-3">Request Support</h3>
            {submitted ? (
              <p className="text-accent text-sm font-medium text-center py-4">Email opened — thank you!</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full px-3 py-2.5 text-sm border border-brand-200 rounded-md focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-colors"
                />
                <textarea
                  placeholder="Tell us how we can help..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-3 py-2.5 text-sm border border-brand-200 rounded-md focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-brand-900 text-white text-sm font-semibold rounded-md hover:bg-brand-800 transition-colors"
                >
                  Send Request
                </button>
              </form>
            )}
          </div>
        </Motion>
      </div>
    </section>
  )
}

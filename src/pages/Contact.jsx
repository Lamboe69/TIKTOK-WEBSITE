import { useState } from 'react'
import { Icons } from '../components/Icons'

const FORMSPREE_CONTACT = ''

const contactReasons = [
  'General Question',
  'Creator Management Inquiry (La\'Gwat Agency)',
  'Press / Media',
  'Other',
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', reason: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    if (FORMSPREE_CONTACT) {
      try {
        await fetch(FORMSPREE_CONTACT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
      } catch {
        // Continue to success state
      }
    } else {
      const subject = encodeURIComponent(`KM DYNASTY Contact — ${form.reason || 'General'} — ${form.name}`)
      const body = encodeURIComponent(
        `Name: ${form.name}\n` +
        `Email: ${form.email}\n` +
        `Reason for Contact: ${form.reason}\n\n` +
        `${form.message}`
      )
      window.location.href = `mailto:lagwatinc@gmail.com?subject=${subject}&body=${body}`
    }

    setSubmitting(false)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
    setForm({ name: '', email: '', reason: '', message: '' })
  }

  return (
    <main>
      <section className="py-20 sm:py-28 bg-dynasty-cream relative overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-dynasty-orange/8 rounded-full blur-[100px] animate-drift pointer-events-none" style={{ animationDuration: '14s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[250px] bg-dynasty-purple/6 rounded-full blur-[90px] animate-drift pointer-events-none" style={{ animationDuration: '12s', animationDelay: '5s' }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            {/* Mail icon with pulse ring */}
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 w-16 h-16 mx-auto my-auto rounded-full border-2 border-dynasty-orange/25 animate-pulse-ring" />
              <div className="relative w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-dynasty-orange to-dynasty-orange-dark flex items-center justify-center shadow-lg shadow-dynasty-orange/25">
                <span className="w-8 h-8 block text-white animate-float">{Icons.mail}</span>
              </div>
            </div>
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-dynasty-charcoal mb-3 leading-tight">
              <span className="text-gradient-animated">Get in Touch</span>
            </h1>
            <p className="text-gray-500 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
              Reach out to La'Gwat Agency for Creator Support and Expert Advice.
            </p>
          </div>

          {/* Quick-contact category cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
            {[
              { icon: Icons.mail, title: 'General Question', desc: 'Ask anything about KM DYNASTY', href: '#contact-form', onClick: (e) => { e.preventDefault(); document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' }) }, gradient: 'from-dynasty-purple to-violet-600' },
              { icon: Icons.users, title: 'Creator Inquiry', desc: 'Join La\'Gwat Agency', href: '/agency', gradient: 'from-dynasty-orange to-amber-500' },
              { icon: Icons.film, title: 'Press / Media', desc: 'Interviews & partnerships', href: '#contact-form', onClick: (e) => { e.preventDefault(); document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' }) }, gradient: 'from-dynasty-purple to-indigo-600' },
            ].map(({ icon, title, desc, href, onClick, gradient }) => (
              <a
                key={title}
                href={href}
                onClick={onClick}
                className="group relative bg-white rounded-2xl border border-gray-100 p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Shimmer on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 animate-shimmer-line" />
                </div>
                <div className={`relative w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${gradient} text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  {icon}
                </div>
                <p className="relative text-sm font-bold text-dynasty-charcoal mb-1">{title}</p>
                <p className="relative text-xs text-gray-400">{desc}</p>
              </a>
            ))}
          </div>

          <div id="contact-form" className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left column: Form */}
            <div>
              <div className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-100 shadow-sm relative overflow-hidden">
                {/* Subtle accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-dynasty-purple via-dynasty-orange to-dynasty-purple" />
                <h2 className="font-display font-bold text-2xl text-dynasty-charcoal mb-6">Send a Message</h2>
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="relative inline-block mb-4">
                      <div className="absolute inset-0 w-16 h-16 mx-auto my-auto rounded-full border-2 border-dynasty-orange/25 animate-pulse-ring" />
                      <div className="relative w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-dynasty-orange to-dynasty-orange-dark flex items-center justify-center shadow-lg">
                        <span className="w-8 h-8 block text-white">{Icons.check}</span>
                      </div>
                    </div>
                    <p className="text-base text-dynasty-charcoal font-semibold mb-2">Message sent!</p>
                    <p className="text-sm text-gray-500">We'll get back to you within 1–2 business days.</p>
                    <p className="text-xs text-gray-400 mt-3">If it didn't send, email us directly at <span className="text-dynasty-purple font-medium">lagwatinc@gmail.com</span></p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-dynasty-charcoal mb-2 uppercase tracking-wider">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-dynasty-purple focus:ring-2 focus:ring-dynasty-purple/10 transition-all placeholder:text-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-dynasty-charcoal mb-2 uppercase tracking-wider">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-dynasty-purple focus:ring-2 focus:ring-dynasty-purple/10 transition-all placeholder:text-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-dynasty-charcoal mb-2 uppercase tracking-wider">Reason for Contact *</label>
                      <select
                        name="reason"
                        value={form.reason}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-dynasty-purple focus:ring-2 focus:ring-dynasty-purple/10 transition-all bg-white"
                      >
                        <option value="">Select a reason...</option>
                        {contactReasons.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-dynasty-charcoal mb-2 uppercase tracking-wider">Message *</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us what you need help with..."
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-dynasty-purple focus:ring-2 focus:ring-dynasty-purple/10 transition-all resize-none placeholder:text-gray-300"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className={`w-full py-3.5 text-white font-bold text-sm rounded-xl transition-all ${
                        submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-dynasty-purple to-dynasty-purple-dark hover:from-dynasty-purple-dark hover:to-dynasty-purple shadow-lg shadow-dynasty-purple/25 animate-glow-breathe'
                      }`}
                    >
                      {submitting ? 'Sending...' : 'Send Message'}
                    </button>
                    <p className="text-xs text-gray-400 text-center">
                      We typically respond within 1–2 business days.
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* Right column: Contact info + map */}
            <div className="space-y-5">
              {[
                { icon: Icons.phone, label: 'Phone', accent: 'dynasty-orange', lines: [
                  { text: '+1 (469) 664-1195 (US)', href: 'tel:+14696641195', note: 'Business hours — 9am–6pm CT' },
                  { text: '+256-200-947-070 (Uganda)', href: 'tel:+256200947070', note: 'Regional inquiries' },
                ]},
                { icon: Icons.mail, label: 'Email', accent: 'dynasty-purple', lines: [
                  { text: 'lagwatinc@gmail.com', href: 'mailto:lagwatinc@gmail.com' },
                ]},
                { icon: Icons.mapPin, label: 'Location', accent: 'dynasty-orange', lines: [
                  { text: 'Dallas, Texas, USA' },
                  { text: "KM DYNASTY is based in the heart of Dallas, Texas, serving creators across the US and Canada." },
                ]},
                { icon: Icons.clock, label: 'Hours', accent: 'dynasty-purple', lines: [
                  { text: '9am – 6pm CT, Monday–Friday' },
                ]},
              ].map(({ icon, label, accent, lines }) => (
                <div key={label} className="bg-white rounded-2xl p-6 border border-gray-100 flex items-start gap-4 card-tilt hover:shadow-md transition-shadow relative overflow-hidden group">
                  {/* Accent left border */}
                  <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-${accent} to-${accent}-dark rounded-r`} />
                  <div className={`w-12 h-12 rounded-xl bg-${accent}/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <span className={`w-6 h-6 block text-${accent}`}>{icon}</span>
                  </div>
                  <div className="pl-1">
                    <p className="text-xs font-bold text-dynasty-charcoal uppercase tracking-wider mb-1.5">{label}</p>
                    {lines.map((line, i) => (
                      <div key={i}>
                        {line.href ? (
                          <a href={line.href} className="block text-sm text-dynasty-purple hover:text-dynasty-orange transition-colors leading-relaxed font-medium">
                            {line.text}
                          </a>
                        ) : (
                          <p className="text-sm text-gray-500 leading-relaxed">{line.text}</p>
                        )}
                        {line.note && (
                          <p className="text-[11px] text-gray-400 mt-0.5">{line.note}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Map embed */}
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <iframe
                  title="KM DYNASTY — Dallas, Texas"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107440.60493614768!2d-96.844958!3d32.78761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c197d8735a3a9%3A0x7e7a2b70e7a6a2a7!2sDallas%2C%20TX!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}

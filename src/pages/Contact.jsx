import { useState } from 'react'
import { Icons } from '../components/Icons'
import PayPalDonate from '../components/PayPalDonate'

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
      <section className="py-20 sm:py-28 bg-dynasty-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="w-12 h-12 mx-auto mb-4 block text-dynasty-orange">{Icons.mail}</span>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-dynasty-charcoal mb-3">
              Get in Touch
            </h1>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">
              Reach out to La'Gwat Agency for Creator Support and Expert Advice.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left column: Form */}
            <div>
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <h2 className="font-display font-bold text-xl text-dynasty-charcoal mb-6">Send a Message</h2>
                {submitted ? (
                  <div className="text-center py-12">
                    <span className="w-12 h-12 mx-auto mb-4 block text-dynasty-orange">{Icons.check}</span>
                    <p className="text-sm text-dynasty-charcoal font-medium">Message sent! We'll get back to you within 1–2 business days.</p>
                    <p className="text-xs text-gray-400 mt-2">If it didn't send, email us directly at lagwatinc@gmail.com</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-dynasty-charcoal mb-1">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-dynasty-purple focus:ring-1 focus:ring-dynasty-purple/20 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-dynasty-charcoal mb-1">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-dynasty-purple focus:ring-1 focus:ring-dynasty-purple/20 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-dynasty-charcoal mb-1">Reason for Contact *</label>
                      <select
                        name="reason"
                        value={form.reason}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-dynasty-purple focus:ring-1 focus:ring-dynasty-purple/20 transition-colors bg-white"
                      >
                        <option value="">Select a reason...</option>
                        {contactReasons.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-dynasty-charcoal mb-1">Message *</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-dynasty-purple focus:ring-1 focus:ring-dynasty-purple/20 transition-colors resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className={`w-full py-3 text-white font-bold text-sm rounded-xl transition-colors ${
                        submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-dynasty-purple hover:bg-dynasty-purple-dark'
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
                { icon: Icons.phone, label: 'Phone', lines: [
                  { text: '+1 (469) 664-1195 (US)', href: 'tel:+14696641195', note: 'Business hours — 9am–6pm CT' },
                  { text: '+256-200-947-070 (Uganda)', href: 'tel:+256200947070', note: 'Regional inquiries' },
                ]},
                { icon: Icons.mail, label: 'Email', lines: [
                  { text: 'lagwatinc@gmail.com', href: 'mailto:lagwatinc@gmail.com' },
                ]},
                { icon: Icons.mapPin, label: 'Location', lines: [
                  { text: 'Dallas, Texas, USA' },
                  { text: "KM DYNASTY is based in the heart of Dallas, Texas, serving creators across the US and Canada." },
                ]},
                { icon: Icons.clock, label: 'Hours', lines: [
                  { text: '9am – 6pm CT, Monday–Friday' },
                ]},
              ].map(({ icon, label, lines }) => (
                <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-dynasty-orange/10 flex items-center justify-center flex-shrink-0">
                    <span className="w-5 h-5 block text-dynasty-orange">{icon}</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-dynasty-charcoal uppercase tracking-wider mb-1">{label}</p>
                    {lines.map((line, i) => (
                      <div key={i}>
                        {line.href ? (
                          <a href={line.href} className="block text-sm text-dynasty-purple hover:text-dynasty-orange transition-colors leading-relaxed">
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
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
                <iframe
                  title="KM DYNASTY — Dallas, Texas"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107440.60493614768!2d-96.844958!3d32.78761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c197d8735a3a9%3A0x7e7a2b70e7a6a2a7!2sDallas%2C%20TX!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="200"
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

      {/* Section 1 — Donation moved to bottom, clearly separated */}
      <section className="py-14 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-dynasty-purple/5 rounded-2xl border border-dynasty-purple/10 p-8">
            <span className="w-10 h-10 mx-auto mb-3 block text-dynasty-orange">{Icons.heart}</span>
            <h2 className="font-display font-bold text-xl text-dynasty-charcoal mb-2">
              Support KM DYNASTY
            </h2>
            <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
              Love what we're building? Your support keeps the battles going, the community growing, and the platform free for everyone.
            </p>
            <PayPalDonate />
          </div>
        </div>
      </section>
    </main>
  )
}

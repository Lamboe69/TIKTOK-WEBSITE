import { useState } from 'react'
import { Icons } from '../components/Icons'
import Motion from '../components/Motion'

const FORMSPREE_CONTACT = ''

const contactReasons = [
  'General Question',
  "Creator Management Inquiry (La'Gwat Agency)",
  'Press / Media',
  'Other',
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', reason: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    if (FORMSPREE_CONTACT) {
      try { await fetch(FORMSPREE_CONTACT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) }) } catch {}
    } else {
      const subject = encodeURIComponent(`KM DYNASTY Contact — ${form.reason || 'General'} — ${form.name}`)
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nReason: ${form.reason}\n\n${form.message}`)
      window.location.href = `mailto:lagwatinc@gmail.com?subject=${subject}&body=${body}`
    }
    setSubmitting(false)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
    setForm({ name: '', email: '', reason: '', message: '' })
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[520px] flex items-end pb-16 overflow-hidden" style={{ background: '#120620' }}>
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1400&q=80"
          alt="Contact"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(18,6,32,0.95) 40%, rgba(59,16,99,0.6) 100%)' }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <Motion delay={0.1}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-5 text-ember" style={{ background: 'rgba(255,107,26,0.1)' }}>
                Contact
              </span>
              <h1 className="font-display font-bold text-ivory mb-4 leading-tight" style={{ fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.02em' }}>
                Get in Touch
              </h1>
              <p className="text-white/60 text-sm max-w-sm leading-relaxed">
                Reach out to La'Gwat Agency for creator support and expert advice.
              </p>
            </Motion>

            {/* Contact info card */}
            <Motion delay={0.2}>
              <div className="glass rounded-2xl p-5 border border-white/10 max-w-xs">
                <p className="text-white/40 text-[10px] uppercase tracking-widest mb-4">Contact Info</p>
                {[
                  { icon: Icons.phone, text: '+1 (469) 664-1195', href: 'tel:+14696641195' },
                  { icon: Icons.phone, text: '+256-200-947-070', href: 'tel:+256200947070' },
                  { icon: Icons.mail, text: 'lagwatinc@gmail.com', href: 'mailto:lagwatinc@gmail.com' },
                  { icon: Icons.mapPin, text: 'Dallas, Texas, USA' },
                  { icon: Icons.clock, text: '9am–6pm CT, Mon–Fri' },
                ].map(({ icon, text, href }) => (
                  <div key={text} className="flex items-center gap-3 py-2 border-b border-white/06 last:border-0">
                    <span className="w-3.5 h-3.5 block text-ember flex-shrink-0">{icon}</span>
                    {href ? (
                      <a href={href} className="text-ivory text-xs hover:text-ember transition-colors">{text}</a>
                    ) : (
                      <span className="text-white/60 text-xs">{text}</span>
                    )}
                  </div>
                ))}
              </div>
            </Motion>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="py-10" style={{ background: '#1B1024' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Icons.mail, title: 'General Question', desc: 'Ask anything about KM DYNASTY', img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80' },
              { icon: Icons.users, title: 'Creator Inquiry', desc: "Join La'Gwat Agency", img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80', href: '/agency' },
              { icon: Icons.film, title: 'Press / Media', desc: 'Interviews & partnerships', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80' },
            ].map(({ icon, title, desc, img, href }) => (
              <Motion key={title} delay={0.1}>
                <a
                  href={href || '#contact-form'}
                  onClick={!href ? (e) => { e.preventDefault(); document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' }) } : undefined}
                  className="group relative rounded-2xl overflow-hidden h-32 flex items-end block"
                >
                  <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(18,6,32,0.9) 50%, rgba(18,6,32,0.3) 100%)' }} />
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-ember scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <div className="relative z-10 p-4">
                    <p className="font-display font-bold text-ivory text-sm">{title}</p>
                    <p className="text-white/50 text-xs">{desc}</p>
                  </div>
                </a>
              </Motion>
            ))}
          </div>
        </div>
      </section>

      {/* Form + info */}
      <section id="contact-form" className="py-16" style={{ background: '#120620' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <Motion delay={0.1}>
              <div className="rounded-2xl p-6 sm:p-8 border border-white/08" style={{ background: 'rgba(59,16,99,0.2)' }}>
                <div className="h-0.5 rounded-full mb-6" style={{ background: 'linear-gradient(90deg, #FF6B1A, #ffffff)' }} />
                <h2 className="font-display font-bold text-2xl text-ivory mb-6">Send a Message</h2>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(255,107,26,0.2)' }}>
                      <span className="w-7 h-7 block text-ember">{Icons.check}</span>
                    </div>
                    <p className="text-ivory font-semibold mb-2">Message sent!</p>
                    <p className="text-white/50 text-sm">We'll get back to you within 1–2 business days.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1.5">Name *</label>
                        <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your full name"
                          className="w-full px-3 py-2.5 text-sm text-ivory placeholder-white/30 rounded-lg border border-white/10 focus:outline-none focus:border-ember transition-colors"
                          style={{ background: 'rgba(255,255,255,0.05)' }} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1.5">Email *</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com"
                          className="w-full px-3 py-2.5 text-sm text-ivory placeholder-white/30 rounded-lg border border-white/10 focus:outline-none focus:border-ember transition-colors"
                          style={{ background: 'rgba(255,255,255,0.05)' }} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1.5">Reason *</label>
                      <select name="reason" value={form.reason} onChange={handleChange} required
                        className="w-full px-3 py-2.5 text-sm text-ivory rounded-lg border border-white/10 focus:outline-none focus:border-ember transition-colors"
                        style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <option value="" style={{ background: '#1B1024' }}>Select a reason...</option>
                        {contactReasons.map(r => <option key={r} value={r} style={{ background: '#1B1024' }}>{r}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1.5">Message *</label>
                      <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell us what you need..."
                        className="w-full px-3 py-2.5 text-sm text-ivory placeholder-white/30 rounded-lg border border-white/10 focus:outline-none focus:border-ember transition-colors resize-none"
                        style={{ background: 'rgba(255,255,255,0.05)' }} />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 text-sm font-bold text-white rounded-lg transition-all hover:scale-[1.02] disabled:opacity-50"
                      style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)', borderRadius: 6 }}
                    >
                      {submitting ? 'Sending...' : 'Send Message →'}
                    </button>
                  </form>
                )}
              </div>
            </Motion>

            {/* Map + info */}
            <div className="space-y-4">
              <Motion delay={0.2}>
                <div className="rounded-2xl overflow-hidden border border-white/08" style={{ height: 220 }}>
                  <iframe
                    title="KM DYNASTY — Dallas, Texas"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107440.60493614768!2d-96.844958!3d32.78761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c197d8735a3a9%3A0x7e7a2b70e7a6a2a7!2sDallas%2C%20TX!5e0!3m2!1sen!2sus!4v1"
                    width="100%" height="220" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                    allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </Motion>

              {[
                { icon: Icons.phone, label: 'Phone', lines: ['+1 (469) 664-1195 (US)', '+256-200-947-070 (Uganda)'] },
                { icon: Icons.mail, label: 'Email', lines: ['lagwatinc@gmail.com'] },
                { icon: Icons.mapPin, label: 'Location', lines: ['Dallas, Texas, USA'] },
                { icon: Icons.clock, label: 'Hours', lines: ['9am–6pm CT, Mon–Fri'] },
              ].map(({ icon, label, lines }, i) => (
                <Motion key={label} delay={0.25 + i * 0.05}>
                  <div className="flex items-start gap-4 p-4 rounded-xl border border-white/06 hover:border-white/12 transition-all" style={{ background: 'rgba(59,16,99,0.15)' }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,107,26,0.15)' }}>
                      <span className="w-4 h-4 block text-ember">{icon}</span>
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">{label}</p>
                      {lines.map(l => <p key={l} className="text-ivory text-sm">{l}</p>)}
                    </div>
                  </div>
                </Motion>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

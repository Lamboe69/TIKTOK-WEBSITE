import { useState } from 'react'
import { Icons } from '../Icons'
import Motion from '../Motion'

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
    <section className="relative overflow-hidden" style={{ background: '#120620' }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px]">
        {/* Story plane */}
        <div className="relative min-h-[320px]">
          <img
            src="/testimonials/grace.jpg"
            alt="Community impact"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, transparent 30%, #120620), linear-gradient(to top, rgba(18,6,32,0.85) 0%, transparent 50%)',
            }}
          />
          <div className="absolute bottom-8 left-6 right-6 sm:left-10 sm:right-16 max-w-md">
            <p className="sec-kicker mb-3">Giving Back</p>
            <p className="font-display font-bold text-ivory text-2xl sm:text-3xl leading-tight mb-3">
              Battles build crowns.<br />Charity builds kinship.
            </p>
            <p className="text-white/55 text-sm leading-relaxed">
              Giveaways, creator support, and charity drives — the Dynasty lifts as it rises.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="px-5 sm:px-10 lg:px-14 py-14 sm:py-16 flex flex-col justify-center gap-10">
          <Motion delay={80}>
            <div>
              <h3 className="font-display font-bold text-ivory text-xl mb-2">Support the mission</h3>
              <p className="text-white/45 text-sm mb-5 max-w-sm leading-relaxed">
                Help expand the Dynasty and support creators worldwide.
              </p>
              <a
                href="https://gofundme.com"
                target="_blank"
                rel="noopener noreferrer"
                className="sec-cta"
              >
                <span className="w-4 h-4 block">{Icons.heart}</span>
                Donate on GoFundMe
              </a>
            </div>
          </Motion>

          <Motion delay={160}>
            <div className="border-t border-white/[0.07] pt-10">
              <h3 className="font-display font-bold text-ivory text-xl mb-4">Request support</h3>
              {submitted ? (
                <div className="flex items-center gap-3 py-4">
                  <span className="w-5 h-5 block text-ember">{Icons.check}</span>
                  <p className="text-ember text-sm font-medium">Email opened — thank you!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 text-sm text-ivory placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-ember/50"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                  <textarea
                    placeholder="Tell us how we can help..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-4 py-3 text-sm text-ivory placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-ember/50 resize-none"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                  <button
                    type="submit"
                    className="sec-cta-ghost border border-white/15 px-5 py-3 hover:border-white/30"
                  >
                    Send Request
                    <span className="w-4 h-4 block">{Icons.arrowRight}</span>
                  </button>
                </form>
              )}
            </div>
          </Motion>
        </div>
      </div>
    </section>
  )
}

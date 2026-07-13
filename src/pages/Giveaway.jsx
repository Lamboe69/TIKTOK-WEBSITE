import { useState } from 'react'
import Motion from '../components/Motion'
import { Icons } from '../components/Icons'

export default function Giveaway() {
  const [code, setCode] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent('KM DYNASTY - Giveaway Claim')
    const body = encodeURIComponent('Code: ' + code + '\nPhone: ' + phone)
    window.location.href = 'mailto:lagwatinc@gmail.com?subject=' + subject + '&body=' + body
    setSubmitted(true)
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[520px] flex items-end pb-16 overflow-hidden" style={{ background: '#120620' }}>
        <img
          src="https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1400&q=80"
          alt="Giveaway"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(18,6,32,0.95) 40%, rgba(59,16,99,0.6) 100%)' }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <Motion delay={0.1}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-5 text-ember" style={{ background: 'rgba(255,107,26,0.1)' }}>
                Reward Claim
              </span>
              <h1 className="font-display font-bold text-ivory mb-4 leading-tight" style={{ fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.02em' }}>
                Claim Your<br />
                <span className="text-gradient">Reward</span>
              </h1>
              <p className="text-white/60 text-sm leading-relaxed max-w-md">
                Enter the code from the livestream and your phone number to claim your free airtime or reward.
              </p>
            </Motion>

            <Motion delay={0.2}>
              <div className="glass rounded-2xl p-6 border border-white/10">
                <p className="text-white/40 text-[10px] uppercase tracking-widest mb-4">How It Works</p>
                <div className="space-y-3">
                  {[
                    { num: '01', text: 'Watch King Maker announce the code live' },
                    { num: '02', text: 'Enter the code + your phone number below' },
                    { num: '03', text: 'Receive your reward directly' },
                  ].map(step => (
                    <div key={step.num} className="flex items-center gap-3">
                      <span className="font-display font-bold text-sm flex-shrink-0 text-ember">{step.num}</span>
                      <p className="text-white/60 text-sm">{step.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Motion>
          </div>
        </div>
      </section>

      {/* Claim Form */}
      <section className="py-16 sm:py-24" style={{ background: '#1B1024' }}>
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <Motion delay={0.1}>
            <div className="rounded-2xl p-8 border border-white/04" style={{ background: 'rgba(59,16,99,0.35)', backdropFilter: 'blur(16px)' }}>
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(255,107,26,0.15)' }}>
                    <span className="w-8 h-8 block text-ember">{Icons.check}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-ivory mb-2">Claim Submitted!</h3>
                  <p className="text-white/50 text-sm">We'll process your reward and get back to you shortly.</p>
                  <button
                    onClick={() => { setSubmitted(false); setCode(''); setPhone('') }}
                    className="mt-6 text-ember text-sm font-semibold hover:underline"
                  >
                    Submit another claim
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="text-center mb-2">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(232,185,74,0.12)', border: '1px solid rgba(232,185,74,0.2)' }}>
                      <span className="w-7 h-7 block text-ember">{Icons.gift}</span>
                    </div>
                    <h2 className="font-display font-bold text-2xl text-ivory">Enter Giveaway Code</h2>
                    <p className="text-white/40 text-xs mt-1">Code is announced during King Maker's livestream</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Giveaway Code</label>
                    <input
                      type="text"
                      required
                      value={code}
                      onChange={e => setCode(e.target.value)}
                      placeholder="e.g. DYNASTY2026"
                      className="w-full px-4 py-3 rounded-lg text-sm text-center font-mono tracking-wider text-ivory placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-ember/40"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+256 700 000 000"
                      className="w-full px-4 py-3 rounded-lg text-sm text-ivory placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-ember/40"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3.5 text-sm font-bold text-white rounded-lg transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)', borderRadius: 8 }}
                  >
                    Claim Reward
                  </button>
                </form>
              )}
            </div>
          </Motion>
        </div>
      </section>
    </main>
  )
}

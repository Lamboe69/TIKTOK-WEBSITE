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
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-brand-900 py-10 sm:py-14">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Motion delay={0.1}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/5 text-accent text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-4 h-4 block">{Icons.gift}</span>
              Reward Claim
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              Claim Your <span className="text-gold text-gradient">Reward</span>
            </h1>
            <p className="text-brand-500 max-w-lg mx-auto">
              Enter the code from the livestream and your phone number to claim your free airtime or reward.
            </p>
          </Motion>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-muted border-b border-brand-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { num: '1', title: 'Watch the Livestream', desc: 'King Maker announces the giveaway code during the live session.' },
              { num: '2', title: 'Enter the Code', desc: 'Come here and enter the code along with your phone number.' },
              { num: '3', title: 'Get Your Reward', desc: 'Receive free airtime or a special reward directly.' },
            ].map((step, idx) => (
              <Motion key={step.num} delay={0.1 + idx * 0.1}>
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-gold text-white text-sm font-bold flex items-center justify-center mx-auto mb-3">
                    {step.num}
                  </div>
                  <h3 className="font-display font-bold text-sm text-brand-900 mb-1">{step.title}</h3>
                  <p className="text-brand-500 text-xs">{step.desc}</p>
                </div>
              </Motion>
            ))}
          </div>
        </div>
      </section>

      {/* Claim Form */}
      <section className="py-10 sm:py-14">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <Motion delay={0.1}>
            <div className="bg-muted border border-brand-100 rounded-xl p-6 sm:p-8">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <span className="w-8 h-8 block text-green-500">{Icons.check}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-brand-900 mb-2">Claim Submitted!</h3>
                  <p className="text-brand-500 text-sm">We'll process your reward and get back to you shortly.</p>
                  <button
                    onClick={() => { setSubmitted(false); setCode(''); setPhone('') }}
                    className="mt-4 text-accent text-sm font-semibold hover:underline"
                  >
                    Submit another claim
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="text-center mb-2">
                    <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-3">
                      <span className="w-7 h-7 block text-gold">{Icons.gift}</span>
                    </div>
                    <h2 className="font-display font-bold text-xl text-brand-900">Enter Giveaway Code</h2>
                    <p className="text-brand-500 text-xs mt-1">Code is announced during King Maker's livestream</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-brand-900 mb-1">Giveaway Code</label>
                    <input
                      type="text"
                      required
                      value={code}
                      onChange={e => setCode(e.target.value)}
                      placeholder="e.g. DYNASTY2026"
                      className="w-full px-4 py-3 bg-white border border-brand-100 rounded-md text-sm text-center font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-brand-900 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+256 700 000 000"
                      className="w-full px-4 py-3 bg-white border border-brand-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-gold text-white font-bold text-sm rounded-md hover:bg-gold-dark transition-colors"
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

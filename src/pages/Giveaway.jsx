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
      <section className="bg-dynasty-charcoal py-10 sm:py-14 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-dynasty-orange/15 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Motion delay={0.1}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dynasty-orange/10 border border-dynasty-orange/20 text-dynasty-orange text-xs font-bold uppercase tracking-wider mb-4">
              <span className="w-4 h-4 block animate-float">{Icons.gift}</span>
              Reward Claim
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              Claim Your <span className="text-dynasty-orange text-gradient-animated">Reward</span>
            </h1>
            <p className="text-gray-400 max-w-lg mx-auto">
              Enter the code from the livestream and your phone number to claim your free airtime or reward.
            </p>
          </Motion>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { num: '1', title: 'Watch the Livestream', desc: 'King Maker announces the giveaway code during the live session.' },
              { num: '2', title: 'Enter the Code', desc: 'Come here and enter the code along with your phone number.' },
              { num: '3', title: 'Get Your Reward', desc: 'Receive free airtime or a special reward directly.' },
            ].map((step, idx) => (
              <Motion key={step.num} delay={0.1 + idx * 0.1}>
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-dynasty-orange text-white text-sm font-bold flex items-center justify-center mx-auto mb-3">
                    {step.num}
                  </div>
                  <h3 className="font-display font-bold text-sm text-dynasty-charcoal mb-1">{step.title}</h3>
                  <p className="text-gray-500 text-xs">{step.desc}</p>
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
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 sm:p-8">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <span className="w-8 h-8 block text-green-500">{Icons.check}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-dynasty-charcoal mb-2">Claim Submitted!</h3>
                  <p className="text-gray-500 text-sm">We'll process your reward and get back to you shortly.</p>
                  <button
                    onClick={() => { setSubmitted(false); setCode(''); setPhone('') }}
                    className="mt-4 text-dynasty-purple text-sm font-semibold hover:underline"
                  >
                    Submit another claim
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="text-center mb-2">
                    <div className="w-14 h-14 rounded-2xl bg-dynasty-orange/10 flex items-center justify-center mx-auto mb-3">
                      <span className="w-7 h-7 block text-dynasty-orange">{Icons.gift}</span>
                    </div>
                    <h2 className="font-display font-bold text-xl text-dynasty-charcoal">Enter Giveaway Code</h2>
                    <p className="text-gray-400 text-xs mt-1">Code is announced during King Maker's livestream</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-dynasty-charcoal mb-1">Giveaway Code</label>
                    <input
                      type="text"
                      required
                      value={code}
                      onChange={e => setCode(e.target.value)}
                      placeholder="e.g. DYNASTY2026"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-center font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-dynasty-purple focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-dynasty-charcoal mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+256 700 000 000"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-dynasty-purple focus:border-transparent"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-dynasty-orange text-white font-bold text-sm rounded-xl btn-glow shadow-lg shadow-dynasty-orange/30 hover:bg-dynasty-orange/90 transition-colors animate-glow-breathe"
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

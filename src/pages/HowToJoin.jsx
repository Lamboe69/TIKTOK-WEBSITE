import { useState } from 'react'
import { Icons } from '../components/Icons'
import { useSignUp } from '../components/SignUpContext'
import Motion from '../components/Motion'

const stepImages = [
  'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
  'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=600&q=80',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80',
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
  'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&q=80',
  'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80',
]

const steps = [
  { title: 'Tap the Page', desc: 'Tap/like the live screen repeatedly. Every tap counts.' },
  { title: 'Pray Before Your Box', desc: 'Say a short prayer before sending. Faith fuels the fight.' },
  { title: 'Always 5,000+ Taps', desc: 'Minimum 5,000 taps on KM DYNASTY content required.' },
  { title: 'Support the Livestreams', desc: 'Send gifts, cheer, defend the dynasty.' },
  { title: 'Elevate Creators', desc: 'Support guest creators with comments and shares.' },
  { title: 'Be in the Top Seven', desc: 'Rank among the top 7 active supporters.' },
  { title: 'Be Regular & Supportive', desc: 'Consistency, positivity, loyalty, no drama.' },
  { title: 'Win Daily Godsent Battles', desc: 'Winning daily battles advances you to the weekly finale.' },
  { title: 'Win the Weekly Battle', desc: 'Winning the weekly battle advances you to the Champion finale.' },
]

function EligibilityChecker() {
  const [answers, setAnswers] = useState({ taps: null, following: null })
  const allAnswered = answers.taps !== null && answers.following !== null
  const ready = answers.taps === true && answers.following === true

  return (
    <div className="glass rounded-2xl p-5 border border-white/10 max-w-xs">
      <p className="text-white/40 text-[10px] uppercase tracking-widest mb-4">Quick Eligibility Check</p>

      <div className="space-y-4">
        <div>
          <p className="text-ivory text-xs font-semibold mb-2">Do you have 5,000+ taps?</p>
          <div className="flex gap-2">
            {[true, false].map(val => (
              <button
                key={String(val)}
                onClick={() => setAnswers({ ...answers, taps: val })}
                className="flex-1 py-2 text-xs font-bold rounded-lg border transition-all"
                style={{
                  background: answers.taps === val ? (val ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)') : 'rgba(255,255,255,0.05)',
                  borderColor: answers.taps === val ? (val ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)') : 'rgba(255,255,255,0.1)',
                  color: answers.taps === val ? (val ? '#10b981' : '#ef4444') : 'rgba(255,255,255,0.6)',
                }}
              >
                {val ? 'Yes' : 'Not yet'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-ivory text-xs font-semibold mb-2">Following King Maker on TikTok?</p>
          <div className="flex gap-2">
            {[true, false].map(val => (
              <button
                key={String(val)}
                onClick={() => setAnswers({ ...answers, following: val })}
                className="flex-1 py-2 text-xs font-bold rounded-lg border transition-all"
                style={{
                  background: answers.following === val ? (val ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)') : 'rgba(255,255,255,0.05)',
                  borderColor: answers.following === val ? (val ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)') : 'rgba(255,255,255,0.1)',
                  color: answers.following === val ? (val ? '#10b981' : '#ef4444') : 'rgba(255,255,255,0.6)',
                }}
              >
                {val ? 'Yes' : 'Not yet'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {allAnswered && (
        <div className="mt-4 p-3 rounded-xl text-xs font-semibold" style={{ background: ready ? 'rgba(16,185,129,0.1)' : 'rgba(255,107,26,0.1)', color: ready ? '#10b981' : '#FF6B1A' }}>
          {ready ? '✓ You\'re ready — sign up below!' : 'Keep working toward the requirements.'}
        </div>
      )}
    </div>
  )
}

export default function HowToJoin() {
  const { openOfficial, openSpecial } = useSignUp()
  const [done, setDone] = useState({})

  const toggle = (i) => setDone(prev => ({ ...prev, [i]: !prev[i] }))
  const doneCount = Object.values(done).filter(Boolean).length

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[520px] flex items-end pb-16 overflow-hidden" style={{ background: '#120620' }}>
        <img loading="lazy"
          src="https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=1400&q=80"
          alt="How to Join"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(18,6,32,0.95) 40%, rgba(59,16,99,0.6) 100%)' }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <Motion delay={0.1}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-5 text-ember" style={{ background: 'rgba(255,107,26,0.1)' }}>
                <span className="w-3.5 h-3.5 block">{Icons.swords}</span>
                Official Steps
              </span>
              <h1 className="font-display font-bold text-ivory mb-4 leading-tight" style={{ fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.02em' }}>
                How to Join My<br />
                <span className="text-gradient">Box Battle</span>
              </h1>
              <p className="text-white/60 text-sm max-w-sm leading-relaxed">
                TikTok Live — follow the path from first tap to Champion of Champions.
              </p>
            </Motion>

            <Motion delay={0.2}>
              <EligibilityChecker />
            </Motion>
          </div>
        </div>
      </section>

      {/* Track A: Steps grid */}
      <section className="py-16 sm:py-24" style={{ background: '#1B1024' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Motion delay={0.1} className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white" style={{ background: '#FF6B1A' }}>A</span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-ivory">Official Godsent Progression</h2>
            </div>
            <p className="text-white/50 text-sm ml-11">
              Steps 1–9. Complete this path to reach the Champion of Champions finale.
              {doneCount > 0 && <span className="ml-2 text-ember font-semibold">{doneCount}/9 done</span>}
            </p>
          </Motion>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {steps.map(({ title, desc }, i) => (
              <Motion key={i} delay={0.1 + i * 0.06}>
                <button
                  onClick={() => toggle(i)}
                  className="group relative rounded-2xl overflow-hidden aspect-[4/3] text-left w-full transition-all hover:scale-[1.02]"
                >
                  <img loading="lazy"
                    src={stepImages[i]}
                    alt={title}
                    className={`w-full h-full object-cover transition-all duration-500 ${done[i] ? 'grayscale opacity-50' : 'group-hover:scale-105'}`}
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(18,6,32,0.95) 40%, rgba(18,6,32,0.3) 100%)' }} />

                  {/* Step number */}
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white" style={{ background: done[i] ? '#10b981' : '#FF6B1A' }}>
                    {done[i] ? '✓' : i + 1}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className={`font-display font-bold text-sm mb-1 ${done[i] ? 'line-through text-white/40' : 'text-ivory'}`}>{title}</h3>
                    <p className="text-white/50 text-xs leading-relaxed">{desc}</p>
                  </div>
                </button>
              </Motion>
            ))}
          </div>

          {/* Prayer callout */}
          <Motion delay={0.5}>
            <div className="mt-8 rounded-xl p-5 border border-white/04" style={{ background: 'rgba(59,16,99,0.2)' }}>
              <p className="text-ember text-xs font-bold uppercase tracking-wider mb-2">Sample Prayer (Step 2)</p>
              <p className="text-white/60 text-sm italic leading-relaxed">
                "Dear God, guide my box to the right battle. Let my effort be seen and my support counted. Amen."
              </p>
            </div>
          </Motion>

          <Motion delay={0.6}>
            <div className="mt-8 text-center">
              <a
                href="https://www.tiktok.com/@kingmakernevergivesup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white rounded-lg transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)', borderRadius: 6 }}
              >
                Follow King Maker
                <span className="w-4 h-4 block">{Icons.arrowRight}</span>
              </a>
            </div>
          </Motion>
        </div>
      </section>

      {/* Track B */}
      <section className="relative min-h-[400px] flex items-center overflow-hidden">
        <img loading="lazy"
          src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1400&q=80"
          alt="Special Battles"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(18,6,32,0.9) 50%, rgba(59,16,99,0.7) 100%)' }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <Motion delay={0.1}>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white" style={{ background: '#3B1063' }}>B</span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-ivory">Scavengers, Country & Most Beautiful</h2>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                These special battles are filled independently via the website form. They follow their own path, separate from the Official Godsent progression.
              </p>
              <button
                onClick={openSpecial}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white rounded-lg transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #3B1063, #6B3FA0)', borderRadius: 6 }}
              >
                Apply for Box Battle
                <span className="w-4 h-4 block">{Icons.arrowRight}</span>
              </button>
            </Motion>

            <Motion delay={0.2}>
              <div className="glass rounded-2xl p-5 border border-white/10">
                <p className="text-ember text-xs font-bold uppercase tracking-wider mb-3">What's different</p>
                <ul className="space-y-3">
                  {['Separate sign-up form (not the Official form)', 'No 5,000 tap minimum — open to all', 'Own rules, own schedule, own winner'].map(item => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/70">
                      <span className="w-4 h-4 block text-ember flex-shrink-0 mt-0.5">{Icons.check}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Motion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative min-h-[280px] flex items-center overflow-hidden">
        <img loading="lazy"
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=80"
          alt="Sign up"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(59,16,99,0.85)' }} />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
          <Motion delay={0.1}>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ivory mb-4" style={{ letterSpacing: '-0.02em' }}>
              Join the KM DYNASTY Godsent Box Battle
            </h2>
            <p className="text-white/60 text-sm mb-6">Ready to compete? Sign up now and bring your best energy.</p>
            <button
              onClick={openOfficial}
              className="px-8 py-3.5 text-sm font-bold text-white rounded-lg transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)', borderRadius: 6 }}
            >
              Sign Up — Box Battle
            </button>
          </Motion>
        </div>
      </section>
    </main>
  )
}

import { useState, useEffect, useRef, useCallback } from 'react'
import Stepper from '../components/Stepper'
import { Icons } from '../components/Icons'
import { useSignUp } from '../components/SignUpContext'
import Motion from '../components/Motion'

const steps = [
  {
    title: 'Tap the Page',
    description: 'Tap/like the live screen repeatedly during battles. Every tap counts toward your engagement.',
  },
  {
    title: 'Prayers That Connect You to Your Godsent',
    description: 'Say a short prayer before sending your box. Faith fuels the fight.',
    prayer: 'Dear God, guide my box to the right battle. Let my effort be seen and my support counted. Amen.',
  },
  {
    title: 'Always 5,000+ Taps',
    description: 'Minimum 5,000 total taps on KM DYNASTY content/livestreams required to enter any official battle.',
  },
  {
    title: 'Support the Livestreams',
    description: 'Help the host win co-host battles. Send gifts, cheer, defend the dynasty. Every interaction matters.',
  },
  {
    title: 'Elevate Creators in the Box',
    description: 'Support guest creators with positive comments and shares. Lift others as you rise.',
  },
  {
    title: 'Be in the Top Seven',
    description: 'Rank among the top seven active supporters for priority entry into official battles.',
  },
  {
    title: 'Be a Regular & Supportive Member',
    description: 'Consistency, positivity, loyalty, no drama. The dynasty values commitment above all.',
  },
  {
    title: 'Win Daily Godsent Battles',
    description: 'Winning daily battles advances you to the Weekly Sunday Official Battle.',
  },
  {
    title: 'Win the Weekly Official Battle',
    description: 'Winning the weekly battle advances you to the Champion of the Champions finale.',
  },
]

function EligibilityChecker() {
  const [answers, setAnswers] = useState({ taps: null, following: null })
  const allAnswered = answers.taps !== null && answers.following !== null
  const ready = answers.taps === true && answers.following === true
  const missing = []
  if (answers.taps === false) missing.push('Reach 5,000+ taps')
  if (answers.following === false) missing.push('Follow King Maker on TikTok')

  return (
    <Motion variant="scale-in">
      <div className="bg-white rounded-xl border border-brand-100 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-lg bg-gold flex items-center justify-center">
            <span className="w-5 h-5 block text-white">{Icons.clipboard}</span>
          </div>
          <div>
            <h3 className="font-display font-bold text-brand-900 text-base">
              Quick Eligibility Check
            </h3>
            <p className="text-brand-500 text-xs">Answer 2 quick questions</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-brand-900 mb-2.5">Do you have 5,000+ taps?</p>
            <div className="flex gap-3">
              {[true, false].map(val => (
                <button
                  key={String(val)}
                  onClick={() => setAnswers({ ...answers, taps: val })}
                  className={`flex-1 px-4 py-2.5 text-sm font-semibold rounded-lg border transition-all ${
                    answers.taps === val
                      ? val
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : 'bg-red-500/10 border-red-500/30 text-red-400'
                      : 'bg-brand-50 border-brand-100 text-brand-500 hover:border-brand-200 hover:text-brand-900'
                  }`}
                >
                  {val ? 'Yes' : 'Not yet'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-brand-900 mb-2.5">Are you following King Maker on TikTok?</p>
            <div className="flex gap-3">
              {[true, false].map(val => (
                <button
                  key={String(val)}
                  onClick={() => setAnswers({ ...answers, following: val })}
                  className={`flex-1 px-4 py-2.5 text-sm font-semibold rounded-lg border transition-all ${
                    answers.following === val
                      ? val
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : 'bg-red-500/10 border-red-500/30 text-red-400'
                      : 'bg-brand-50 border-brand-100 text-brand-500 hover:border-brand-200 hover:text-brand-900'
                  }`}
                >
                  {val ? 'Yes' : 'Not yet'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {allAnswered && (
          <div className={`mt-5 p-4 rounded-lg transition-all ${
            ready
              ? 'bg-emerald-500/10 border border-emerald-500/20'
              : 'bg-gold/10 border border-gold/20'
          }`}>
            {ready ? (
              <p className="text-sm text-emerald-400 font-semibold flex items-center gap-2">
                <span className="w-5 h-5 block">{Icons.check}</span>
                You're ready — sign up for the Official Godsent Box Battle below!
              </p>
            ) : (
              <div>
                <p className="text-sm text-gold font-semibold mb-2">Not quite yet — here's what to work on:</p>
                <ul className="space-y-1.5">
                  {missing.map((label, i) => (
                    <li key={i} className="text-sm text-gold/80 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </Motion>
  )
}

function VideoButton() {
  return (
    <Motion variant="fade-up" delay={100}>
      <a
        href="https://www.tiktok.com/@kingmakernevergivesup"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 bg-white border border-brand-100 rounded-xl p-5 hover:border-brand-200 transition-colors group"
      >
        <div className="w-14 h-14 rounded-lg bg-gold flex items-center justify-center flex-shrink-0">
          <span className="w-6 h-6 text-white block">{Icons.play}</span>
        </div>
        <div className="flex-1">
          <p className="font-display font-bold text-sm text-brand-900 group-hover:text-gold transition-colors">
            Watch: How to Join in 90 Seconds
          </p>
          <p className="text-xs text-brand-500">Quick video explainer on TikTok</p>
        </div>
        <span className="w-4 h-4 block text-brand-500 group-hover:text-gold group-hover:translate-x-1 transition-all">{Icons.arrowRight}</span>
      </a>
    </Motion>
  )
}

function ProgressBar({ progress }) {
  return (
    <div className="sticky top-16 z-40 bg-brand-900/95 backdrop-blur-md border-b border-white/5 py-3">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-gold whitespace-nowrap">
            {Math.round(progress)}%
          </span>
          <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gold rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-brand-500 whitespace-nowrap">
            Step {Math.max(1, Math.min(9, Math.ceil(progress / 100 * 9)))} of 9
          </span>
        </div>
      </div>
    </div>
  )
}

export default function HowToJoin() {
  const { openOfficial, openSpecial } = useSignUp()
  const [checked, setChecked] = useState(() => {
    try {
      const saved = sessionStorage.getItem('km-join-checklist')
      return saved ? JSON.parse(saved) : {}
    } catch { return {} }
  })
  const [progress, setProgress] = useState(0)
  const stepsRef = useRef(null)

  const toggleCheck = useCallback((i) => {
    setChecked(prev => {
      const next = { ...prev, [i]: !prev[i] }
      sessionStorage.setItem('km-join-checklist', JSON.stringify(next))
      return next
    })
  }, [])

  useEffect(() => {
    const el = stepsRef.current
    if (!el) return
    const handler = () => {
      const rect = el.getBoundingClientRect()
      const total = el.scrollHeight - window.innerHeight
      const scrolled = -rect.top
      setProgress(Math.max(0, Math.min(100, (scrolled / total) * 100)))
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const checkedCount = Object.values(checked).filter(Boolean).length

  return (
    <main>
      {/* Intro — dark hero */}
      <section className="py-12 sm:py-16 bg-brand-900 text-white">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
          <Motion variant="fade-up" className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/5 text-accent text-xs font-semibold uppercase tracking-wider mb-5">
              <span className="w-4 h-4 block">{Icons.swords}</span>
              Official Steps
            </div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
              How to Join My<br />
              <span className="text-gradient">Box Battle</span>
            </h1>
            <p className="text-brand-500 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              TikTok Live — follow the path from first tap to Champion of Champions.
            </p>
          </Motion>

          <EligibilityChecker />
          <div className="mt-6">
            <VideoButton />
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <ProgressBar progress={progress} />

      {/* Track A: Official Godsent Progression */}
      <section ref={stepsRef} className="py-12 sm:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Motion variant="fade-up">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center text-sm font-bold">A</span>
              <h2 className="font-display font-bold text-xl text-brand-900">
                Official Godsent Progression
              </h2>
            </div>
            <p className="text-sm text-brand-500 ml-11 mb-8">
              Steps 1–9. Complete this path to reach the Champion of Champions finale.
              {checkedCount > 0 && (
                <span className="ml-2 text-accent font-semibold">
                  {checkedCount}/9 done
                </span>
              )}
            </p>
          </Motion>

          <Stepper steps={steps} checked={checked} onToggle={toggleCheck} />

          <Motion variant="fade-up" delay={200}>
            <div className="mt-8 text-center">
              <a
                href="https://www.tiktok.com/@kingmakernevergivesup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-bold text-sm rounded-md hover:bg-accent-dark transition-colors"
              >
                Follow King Maker
                <span className="w-4 h-4 block">{Icons.arrowRight}</span>
              </a>
            </div>
          </Motion>
        </div>
      </section>

      {/* Track B: Special Battles */}
      <section className="py-12 sm:py-16 bg-brand-900 text-white">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
          <Motion variant="fade-up">
            <div id="step-10" className="bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-xl p-6 sm:p-8 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-lg bg-gold text-white flex items-center justify-center text-sm font-bold">B</span>
                <h2 className="font-display font-bold text-xl">
                  Scavengers, Country &amp; Most Beautiful
                </h2>
              </div>

              <p className="text-sm text-brand-500 leading-relaxed mb-5 ml-11">
                These special battles are filled independently via the website form.
                They follow their own path, separate from the Official Godsent progression.
              </p>

              <div className="ml-11 bg-gold/10 border border-gold/20 rounded-lg p-4 mb-5">
                <p className="text-xs font-bold text-gold uppercase tracking-wider mb-2">What's different</p>
                <ul className="space-y-2 text-sm text-brand-50">
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 block text-gold mt-0.5 flex-shrink-0">{Icons.check}</span>
                    Separate sign-up form (not the Official form)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 block text-gold mt-0.5 flex-shrink-0">{Icons.check}</span>
                    No 5,000 tap minimum — open to all
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 block text-gold mt-0.5 flex-shrink-0">{Icons.check}</span>
                    Own rules, own schedule, own winner
                  </li>
                </ul>
              </div>

              <button
                onClick={openSpecial}
                className="ml-11 inline-flex items-center gap-2 px-6 py-3 bg-gold text-white font-bold text-sm rounded-md hover:bg-gold-dark transition-colors"
              >
                Apply for Box Battle
                <span className="w-4 h-4 block">{Icons.arrowRight}</span>
              </button>
            </div>
          </Motion>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-accent">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Motion variant="fade-up">
            <h2 className="font-display font-bold text-2xl text-white mb-3">
              Join the KM DYNASTY Godsent Box Battle
            </h2>
            <p className="text-white/70 text-sm mb-6 max-w-md mx-auto">
              Ready to compete? Sign up now and bring your best energy.
            </p>
            <button
              onClick={openOfficial}
              className="inline-block px-8 py-3.5 bg-gold text-white font-bold text-sm rounded-md hover:bg-gold-dark transition-colors"
            >
              Sign Up — Box Battle
            </button>
          </Motion>
        </div>
      </section>
    </main>
  )
}

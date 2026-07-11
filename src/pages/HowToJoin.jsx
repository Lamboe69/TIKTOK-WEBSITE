import { useState, useEffect, useRef, useCallback } from 'react'
import Stepper from '../components/Stepper'
import { Icons } from '../components/Icons'
import { useSignUp } from '../components/SignUpContext'
import Motion from '../components/Motion'
import Particles from '../components/Particles'

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
      <div className="relative bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-6 sm:p-8 overflow-hidden">
        {/* Decorative accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-dynasty-orange/10 rounded-full blur-[60px]" />

        <div className="relative">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-dynasty-orange to-amber-500 flex items-center justify-center shadow-lg shadow-dynasty-orange/20">
              <span className="w-5 h-5 block text-white">{Icons.clipboard}</span>
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-base">
                Quick Eligibility Check
              </h3>
              <p className="text-gray-500 text-xs">Answer 2 quick questions</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-white/90 mb-2.5">Do you have 5,000+ taps?</p>
              <div className="flex gap-3">
                {[true, false].map(val => (
                  <button
                    key={String(val)}
                    onClick={() => setAnswers({ ...answers, taps: val })}
                    className={`flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl border transition-all ${
                      answers.taps === val
                        ? val
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                          : 'bg-red-500/10 border-red-500/30 text-red-400'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-white/70'
                    }`}
                  >
                    {val ? 'Yes' : 'Not yet'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-white/90 mb-2.5">Are you following King Maker on TikTok?</p>
              <div className="flex gap-3">
                {[true, false].map(val => (
                  <button
                    key={String(val)}
                    onClick={() => setAnswers({ ...answers, following: val })}
                    className={`flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl border transition-all ${
                      answers.following === val
                        ? val
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                          : 'bg-red-500/10 border-red-500/30 text-red-400'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-white/70'
                    }`}
                  >
                    {val ? 'Yes' : 'Not yet'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {allAnswered && (
            <div className={`mt-5 p-4 rounded-xl transition-all ${
              ready
                ? 'bg-emerald-500/10 border border-emerald-500/20'
                : 'bg-dynasty-orange/10 border border-dynasty-orange/20'
            }`}>
              {ready ? (
                <p className="text-sm text-emerald-400 font-semibold flex items-center gap-2">
                  <span className="w-5 h-5 block">{Icons.check}</span>
                  You're ready — sign up for the Official Godsent Box Battle below!
                </p>
              ) : (
                <div>
                  <p className="text-sm text-dynasty-orange font-semibold mb-2">Not quite yet — here's what to work on:</p>
                  <ul className="space-y-1.5">
                    {missing.map((label, i) => (
                      <li key={i} className="text-sm text-dynasty-orange/80 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-dynasty-orange rounded-full" />
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
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
        className="flex items-center gap-4 bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-5 hover:bg-white/[0.1] transition-all group"
      >
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-dynasty-orange to-amber-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-dynasty-orange/20 group-hover:scale-110 transition-transform">
          <span className="w-6 h-6 text-white block">{Icons.play}</span>
        </div>
        <div className="flex-1">
          <p className="font-display font-bold text-sm text-white group-hover:text-dynasty-orange transition-colors">
            Watch: How to Join in 90 Seconds
          </p>
          <p className="text-xs text-gray-500">Quick video explainer on TikTok</p>
        </div>
        <span className="w-4 h-4 block text-gray-500 group-hover:text-dynasty-orange group-hover:translate-x-1 transition-all">{Icons.arrowRight}</span>
      </a>
    </Motion>
  )
}

function ProgressBar({ progress }) {
  return (
    <div className="sticky top-16 z-40 bg-dynasty-charcoal/95 backdrop-blur-md border-b border-white/5 py-3">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-dynasty-orange whitespace-nowrap">
            {Math.round(progress)}%
          </span>
          <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-dynasty-orange to-amber-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-gray-500 whitespace-nowrap">
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
      <section className="py-12 sm:py-16 bg-dynasty-charcoal text-white relative overflow-hidden">
        <Particles count={25} color="rgba(255,122,0,0.35)" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-dynasty-purple/15 rounded-full blur-[120px] animate-drift" style={{ animationDuration: '10s' }} />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-dynasty-orange/10 rounded-full blur-[80px] animate-drift" style={{ animationDuration: '8s', animationDelay: '3s' }} />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
          <Motion variant="fade-up" className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dynasty-orange/10 border border-dynasty-orange/20 text-dynasty-orange text-xs font-bold uppercase tracking-wider mb-5">
              <span className="w-4 h-4 block">{Icons.swords}</span>
              Official Steps
            </div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
              How to Join My<br />
              <span className="text-gradient-animated">Box Battle</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
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
              <span className="w-8 h-8 rounded-lg bg-dynasty-purple text-white flex items-center justify-center text-sm font-bold">A</span>
              <h2 className="font-display font-bold text-xl text-dynasty-charcoal">
                Official Godsent Progression
              </h2>
            </div>
            <p className="text-sm text-gray-500 ml-11 mb-8">
              Steps 1–9. Complete this path to reach the Champion of Champions finale.
              {checkedCount > 0 && (
                <span className="ml-2 text-dynasty-purple font-semibold">
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
                className="inline-flex items-center gap-2 px-6 py-3 bg-dynasty-purple text-white font-bold text-sm rounded-xl btn-glow btn-glow-purple"
              >
                Follow King Maker
                <span className="w-4 h-4 block">{Icons.arrowRight}</span>
              </a>
            </div>
          </Motion>
        </div>
      </section>

      {/* Track B: Special Battles */}
      <section className="py-12 sm:py-16 bg-dynasty-charcoal text-white relative overflow-hidden">
        <Particles count={20} color="rgba(255,255,255,0.25)" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-dynasty-orange/10 rounded-full blur-[80px]" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
          <Motion variant="fade-up">
            <div id="step-10" className="bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-6 sm:p-8 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-lg bg-dynasty-orange text-white flex items-center justify-center text-sm font-bold">B</span>
                <h2 className="font-display font-bold text-xl">
                  Scavengers, Country &amp; Most Beautiful
                </h2>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed mb-5 ml-11">
                These special battles are filled independently via the website form.
                They follow their own path, separate from the Official Godsent progression.
              </p>

              <div className="ml-11 bg-dynasty-orange/10 border border-dynasty-orange/20 rounded-xl p-4 mb-5">
                <p className="text-xs font-bold text-dynasty-orange uppercase tracking-wider mb-2">What's different</p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 block text-dynasty-orange mt-0.5 flex-shrink-0">{Icons.check}</span>
                    Separate sign-up form (not the Official form)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 block text-dynasty-orange mt-0.5 flex-shrink-0">{Icons.check}</span>
                    No 5,000 tap minimum — open to all
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 block text-dynasty-orange mt-0.5 flex-shrink-0">{Icons.check}</span>
                    Own rules, own schedule, own winner
                  </li>
                </ul>
              </div>

              <button
                onClick={openSpecial}
                className="ml-11 inline-flex items-center gap-2 px-6 py-3 bg-dynasty-orange text-white font-bold text-sm rounded-xl btn-glow shadow-lg shadow-dynasty-orange/30"
              >
                Apply for Box Battle
                <span className="w-4 h-4 block">{Icons.arrowRight}</span>
              </button>
            </div>
          </Motion>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-dynasty-purple relative overflow-hidden">
        <Particles count={15} color="rgba(255,255,255,0.3)" />
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
              className="inline-block px-8 py-3.5 bg-dynasty-orange text-white font-bold text-sm rounded-xl btn-glow shadow-lg animate-glow-breathe"
            >
              Sign Up — Box Battle
            </button>
          </Motion>
        </div>
      </section>
    </main>
  )
}

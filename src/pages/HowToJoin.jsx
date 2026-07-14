import { useEffect, useState } from 'react'
import { Icons } from '../components/Icons'
import { useSignUp } from '../components/SignUpContext'
import Motion from '../components/Motion'
import { useContent } from '../cms/ContentContext'
import './HowToJoin.css'

const fallbackSteps = [
  {
    title: 'Tap the Page',
    desc: 'Tap and like the live screen — every tap counts toward your dynasty standing.',
    img: '/team/maker.jpg',
  },
  {
    title: 'Pray Before Your Box',
    desc: 'Say a short prayer before sending. Faith fuels the fight.',
    img: '/photos/battle-highlights.jpg',
    prayer: '"Dear God, guide my box to the right battle. Let my effort be seen and my support counted. Amen."',
  },
  {
    title: 'Always 5,000+ Taps',
    desc: 'Hold a minimum of 5,000 taps on KM DYNASTY content before you claim a slot.',
    img: '/photos/king-maker-live.jpg',
  },
  {
    title: 'Support the Livestreams',
    desc: 'Send gifts, cheer loud, and defend the Dynasty when the night gets fierce.',
    img: '/battles-photos/most-beautiful.jpg',
  },
  {
    title: 'Elevate Creators',
    desc: 'Lift guest creators with comments, shares, and relentless positivity.',
    img: '/photos/community-meetup.jpg',
  },
  {
    title: 'Be in the Top Seven',
    desc: 'Climb into the top 7 active supporters — visibility is earned.',
    img: '/battles-photos/daily-godsent.jpg',
  },
  {
    title: 'Be Regular & Supportive',
    desc: 'Consistency. Loyalty. No drama. Family energy, always.',
    img: '/battles-photos/champion-of-champions.jpg',
  },
  {
    title: 'Win Daily Godsent Battles',
    desc: 'Daily wins unlock the weekly finale — defend your crown night after night.',
    img: '/battles-photos/scavengers.jpg',
  },
  {
    title: 'Win the Weekly Battle',
    desc: 'Win the weekly — then walk into Champion of Champions.',
    img: '/photos/champion-crowning.jpg',
  },
]

const specialDiffs = [
  { n: '01', label: 'Own form', copy: 'Separate entry path — not the Official Godsent route.' },
  { n: '02', label: 'Open gate', copy: 'No 5,000 tap minimum. Hunger is enough.' },
  { n: '03', label: 'Own crown', copy: 'Own rules, own schedule, own winner.' },
]

function Gate({ ready, answers, setAnswers }) {
  const allAnswered = answers.taps !== null && answers.following !== null

  return (
    <div className="join-gate">
      <div className="join-gate__head">
        <p className="sec-kicker">The Gate</p>
        <h2 className="join-gate__title font-display font-bold text-ivory tracking-tight">
          Prove the floor
        </h2>
        <p className="join-gate__hint">
          Two checks. Then the path opens.
        </p>
      </div>

      <div className="join-gate__board">
        {[
          { key: 'taps', q: 'Do you hold 5,000+ taps?', n: 'I' },
          { key: 'following', q: 'Following King Maker on TikTok?', n: 'II' },
        ].map(({ key, q, n }) => (
          <div key={key} className="join-gate__row">
            <span className="join-gate__roman font-display" aria-hidden>{n}</span>
            <p className="join-gate__q">{q}</p>
            <div className="join-gate__opts" role="group" aria-label={q}>
              {[true, false].map((val) => {
                const on = answers[key] === val
                return (
                  <button
                    key={String(val)}
                    type="button"
                    className={`join-gate__opt ${on ? (val ? 'is-yes' : 'is-no') : ''}`}
                    onClick={() => setAnswers((a) => ({ ...a, [key]: val }))}
                  >
                    {val ? 'Yes' : 'Not yet'}
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        <div className={`join-gate__verdict ${allAnswered ? 'is-visible' : ''} ${ready ? 'is-ready' : ''}`}>
          {allAnswered && (
            ready
              ? 'The gate opens — walk the path below.'
              : 'Build the floor. Then return for the crown.'
          )}
        </div>
      </div>
    </div>
  )
}

export default function HowToJoin() {
  const { openOfficial, openSpecial } = useSignUp()
  const { collections, getPage, settings } = useContent()
  const page = getPage('howToJoin')
  const steps =
    collections.joinSteps?.length > 0
      ? collections.joinSteps.map((s) => ({
          title: s.title,
          desc: s.body || s.desc,
          img: s.img,
          prayer: s.prayer,
        }))
      : fallbackSteps
  const [active, setActive] = useState(0)
  const [done, setDone] = useState({})
  const [paused, setPaused] = useState(false)
  const [answers, setAnswers] = useState({ taps: null, following: null })
  const ready = answers.taps === true && answers.following === true
  const step = steps[active]
  const doneCount = Object.values(done).filter(Boolean).length

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || paused || !steps.length) return undefined
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % steps.length)
    }, 5500)
    return () => clearInterval(id)
  }, [paused, steps.length])

  const toggleDone = (i) => {
    setDone((prev) => ({ ...prev, [i]: !prev[i] }))
    setActive(i)
  }

  return (
    <main className="join-page">
      {/* ═══ Hero — Cathedral Threshold ═══ */}
      <section className="join-hero" aria-label="How to Join">
        <div className="join-hero__media" aria-hidden>
          <img
            src={page.heroImage || '/photos/champion-crowning.jpg'}
            alt=""
            className="join-hero__photo"
          />
          <div className="join-hero__veil" />
        </div>

        <svg
          className="join-hero__arches"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMax meet"
          aria-hidden
        >
          <path className="join-hero__arch join-hero__arch--a" d="M60 800 Q600 120 1140 800" fill="none" />
          <path className="join-hero__arch join-hero__arch--b" d="M180 800 Q600 220 1020 800" fill="none" />
          <path className="join-hero__arch join-hero__arch--c" d="M300 800 Q600 320 900 800" fill="none" />
          <path className="join-hero__arch join-hero__arch--d" d="M420 800 Q600 420 780 800" fill="none" />
        </svg>

        <div className="join-hero__portal">
          <Motion delay={50} className="join-hero__copy">
            <p className="join-hero__brand">{page.heroBrand || 'KM DYNASTY'}</p>
            <h1 className="join-hero__title">
              <span className="join-hero__how">How to</span>
              <span className="join-hero__join">{page.heroTitle?.replace(/^How to\s*/i, '') || 'Join'}</span>
            </h1>
            <p className="join-hero__lede">
              {page.heroLede ||
                'Cross the threshold. Nine steps to the crown — from first tap to Champion of Champions.'}
            </p>
            <div className="join-hero__actions">
              <button type="button" onClick={openOfficial} className="join-hero__cta">
                {settings.ctaLabel || 'Join My Box Battle'}
                <span className="w-4 h-4 block">{Icons.arrowRight}</span>
              </button>
              <a href="#join-ascent" className="join-hero__link">
                Walk the nine steps
              </a>
            </div>
          </Motion>
        </div>

        <div className="join-hero__procession" aria-hidden>
          <div className="join-hero__procession-track">
            {[...steps, ...steps].map((s, i) => (
              <span key={`${s.title}-${i}`}>
                <em>{String((i % steps.length) + 1).padStart(2, '0')}</em>
                {s.title}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Gate ═══ */}
      <section id="join-gate" className="join-band join-band--gate">
        <Motion delay={40} className="join-pad">
          <Gate ready={ready} answers={answers} setAnswers={setAnswers} />
        </Motion>
      </section>

      {/* ═══ The Ascent — full-bleed ═══ */}
      <section id="join-ascent" className="join-band join-band--ascent">
        <div className="join-pad join-ascent__intro">
          <Motion delay={40}>
            <p className="sec-kicker mb-2">Path A · Official Godsent</p>
            <div className="join-ascent__intro-row">
              <h2 className="join-ascent__heading font-display font-bold text-ivory tracking-tight">
                Nine steps to the <span className="text-gradient">crown</span>
              </h2>
              <p className="join-ascent__count">
                {doneCount > 0 ? (
                  <><span className="text-ember font-semibold">{doneCount}</span> / 9 marked</>
                ) : (
                  'Mark what you’ve lived'
                )}
              </p>
            </div>
          </Motion>
        </div>

        <Motion delay={90}>
          <div
            className="join-ascent"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Full-width step ribbon */}
            <div className="join-ribbon" role="tablist" aria-label="Official progression steps">
              {steps.map((s, i) => {
                const on = i === active
                return (
                  <button
                    key={s.title}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    className={`join-ribbon__btn ${on ? 'is-active' : ''} ${done[i] ? 'is-done' : ''}`}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                  >
                    <span className="join-ribbon__n font-display">{String(i + 1).padStart(2, '0')}</span>
                    <span className="join-ribbon__t">{s.title}</span>
                  </button>
                )
              })}
            </div>

            {/* Cinematic stage */}
            <div className="join-ascent__stage">
              {steps.map((s, i) => (
                <img
                  key={s.title}
                  src={s.img}
                  alt={i === active ? s.title : ''}
                  aria-hidden={i !== active}
                  className={`join-ascent__img ${i === active ? 'is-on' : ''}`}
                />
              ))}
              <div className="join-ascent__veil" />

              <span className="join-ascent__idx font-display font-extrabold" aria-hidden>
                {String(active + 1).padStart(2, '0')}
              </span>

              <div key={step.title} className="join-ascent__copy join-pad">
                <div className="join-ascent__copy-inner">
                  <div className="flex items-center gap-3 mb-4">
                    <button
                      type="button"
                      className={`join-mark ${done[active] ? 'is-done' : ''}`}
                      onClick={() => toggleDone(active)}
                      aria-pressed={!!done[active]}
                    >
                      {done[active] ? 'Lived' : 'Mark lived'}
                    </button>
                    <span className="text-[10px] uppercase tracking-[0.28em] text-white/50">
                      Step {active + 1} of 9
                    </span>
                  </div>
                  <h3 className={`join-ascent__step-title font-display font-bold text-ivory ${done[active] ? 'opacity-60' : ''}`}>
                    {step.title}
                  </h3>
                  <p className="join-ascent__step-desc">
                    {step.desc}
                  </p>
                  {step.prayer && (
                    <blockquote className="join-prayer">{step.prayer}</blockquote>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Motion>

        <div className="join-pad join-ascent__cta">
          <Motion delay={120} className="flex flex-wrap items-center gap-4">
            <a
              href="https://www.tiktok.com/@kingmakernevergivesup"
              target="_blank"
              rel="noopener noreferrer"
              className="sec-cta"
            >
              Follow King Maker
              <span className="w-4 h-4 block">{Icons.arrowRight}</span>
            </a>
            <button type="button" onClick={openOfficial} className="sec-cta-ghost">
              Ready — join a battle
            </button>
          </Motion>
        </div>
      </section>

      {/* ═══ Path B — Special battles ═══ */}
      <section className="join-special">
        <div className="join-special__grid">
          <div className="join-special__media">
            <img
              src="/battles-photos/most-beautiful.jpg"
              alt=""
              aria-hidden
            />
            <div className="join-special__media-veil" />
          </div>

          <div className="join-special__copy join-pad">
            <Motion delay={60}>
              <p className="sec-kicker mb-4" style={{ color: '#C4A0FF' }}>Path B · Special Arenas</p>
              <h2 className="join-special__title font-display font-bold text-ivory tracking-tight">
                Scavengers.<br />
                Country.<br />
                <span className="text-gradient">Most Beautiful.</span>
              </h2>
              <p className="join-special__lede">
                Parallel doors into the Dynasty — filled on their own form, with their own fire.
              </p>
              <button
                type="button"
                onClick={openSpecial}
                className="sec-cta"
                style={{ background: 'linear-gradient(135deg, #6B3FA0, #FF6B1A)' }}
              >
                Apply for special battle
                <span className="w-4 h-4 block">{Icons.arrowRight}</span>
              </button>

              <div className="join-diff">
                {specialDiffs.map((d) => (
                  <div key={d.n} className="join-diff__row">
                    <span className="join-diff__n font-display">{d.n}</span>
                    <div>
                      <p className="join-diff__label">{d.label}</p>
                      <p className="join-diff__copy">{d.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Motion>
          </div>
        </div>
      </section>

      {/* ═══ Closing invitation ═══ */}
      <section className="join-close">
        <img
          src="/battles-photos/champion-of-champions.jpg"
          alt=""
          className="join-close__img"
          aria-hidden
        />
        <div className="join-close__veil" />
        <div className="join-close__content join-pad">
          <Motion delay={60}>
            <p className="sec-kicker mb-5">The Invitation</p>
            <h2 className="join-close__title font-display font-bold text-ivory tracking-tight">
              Enter the <span className="text-gradient">Dynasty</span>
            </h2>
            <p className="join-close__lede">
              Bring your taps, your faith, and your fire. The arena is waiting.
            </p>
            <button type="button" onClick={openOfficial} className="sec-cta">
              {settings.ctaLabel || 'Join My Box Battle'}
              <span className="w-4 h-4 block">{Icons.arrowRight}</span>
            </button>
          </Motion>
        </div>
      </section>
    </main>
  )
}

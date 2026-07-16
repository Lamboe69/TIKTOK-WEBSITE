import { useRef, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Icons } from '../Icons'
import Motion from '../Motion'
import { useContent } from '../../cms/ContentContext'
import { tiers as fallbackTiers } from '../../data/masterclass'
import { getMasterclassMinPriceLabel, normalizeMasterclassTiers } from '../../cms/normalize'
import { normalizeSectionLayout } from '../../cms/sectionLayouts'

const weeks = [
  { n: '01', label: 'Monetisation' },
  { n: '02', label: 'Community' },
  { n: '03', label: 'Live Systems' },
  { n: '04', label: 'Mindset' },
  { n: '05', label: 'Inner Circle' },
]

const ORBIT_POSITIONS = [
  { left: '50%', top: '8%' },
  { left: '88%', top: '35%' },
  { left: '75%', top: '78%' },
  { left: '25%', top: '78%' },
  { left: '12%', top: '35%' },
]

export default function MasterclassTeaser() {
  const tiltRefs = useRef([])
  const { collections, getPage } = useContent()
  const homePage = getPage('home')
  const layout = normalizeSectionLayout('masterclassLayout', homePage.masterclassLayout)
  const tiers = useMemo(() => {
    const fromCms = normalizeMasterclassTiers(collections.masterclassTiers || [])
    return fromCms.length ? fromCms : normalizeMasterclassTiers(fallbackTiers)
  }, [collections.masterclassTiers])
  const masterclassPrice = useMemo(() => getMasterclassMinPriceLabel(tiers), [tiers])
  const sectionSubtitle = homePage.masterclassSubtitle || 'The exact systems, livestream strategy, and dynasty mindset — taught live by the source.'
  const sectionQuote = homePage.masterclassQuote || "I started with $30 and a dream. Everything I know about building a community on TikTok — I'm putting it in this masterclass."
  const sectionTitle = homePage.masterclassTitle || ''
  const masterclassKicker = homePage.masterclassKicker || 'Masterclass \u00b7 With King Maker'
  const masterclassFeatures = homePage.masterclassFeatures
    ? homePage.masterclassFeatures.split('\n').filter(Boolean)
    : ['Live battle strategy & gifting psychology', 'How to grow from 0 to 50K+ on TikTok LIVE', 'Community building & dynasty culture']
  const masterclassDuration = homePage.masterclassDuration || '5 weeks'
  const masterclassSchedule = homePage.masterclassSchedule || 'Saturdays \u00b7 2:00 PM CT'
  const masterclassInstructor = homePage.masterclassInstructor || 'King Maker'
  const masterclassInstructorRole = homePage.masterclassInstructorRole || 'Live instructor \u00b7 Dallas'
  const masterclassCtaLabel = homePage.masterclassCtaLabel || 'Enter the Masterclass'
  const masterclassImage = homePage.masterclassImage || '/team/maker.jpg'

  const handleTilt = useCallback((i, e) => {
    const card = tiltRefs.current[i]
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateY = ((x - centerX) / centerX) * 5
    const rotateX = -((y - centerY) / centerY) * 5
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }, [])

  const resetTilt = useCallback((i) => {
    const card = tiltRefs.current[i]
    if (!card) return
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)'
  }, [])

  const sectionClass = `relative overflow-hidden home-band-midnight home-band-sep${layout !== 'atelier' ? ` masterclass--${layout}` : ''}`

  if (layout === 'ledger') {
    return (
      <section className={sectionClass}>
        <div className="mc-ledger">
          <Motion delay={60}>
            <div className="mc-ledger__book">
              <div className="mc-ledger__seal">{masterclassPrice}</div>
              <p className="sec-kicker mb-3" style={{ color: '#8b4513' }}>{masterclassKicker}</p>
              <h2 className="mc-ledger__title">{sectionTitle || 'Master your craft'}</h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#4a3020' }}>{sectionSubtitle}</p>
              <div className="mc-ledger__quote">
                <p>&ldquo;{sectionQuote}&rdquo;</p>
                <p className="text-sm font-bold mt-2 not-italic">— {masterclassInstructor}</p>
              </div>
              <ul className="space-y-2 mb-4">
                {masterclassFeatures.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm" style={{ color: '#4a3020' }}>
                    <span className="text-[#8b2020]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs" style={{ color: '#6a5040' }}>{masterclassDuration} · {masterclassSchedule}</p>
              <Link to="/masterclass" className="sec-cta">
                {masterclassCtaLabel}
                <span className="w-4 h-4 block">{Icons.arrowRight}</span>
              </Link>
            </div>
          </Motion>
        </div>
      </section>
    )
  }

  if (layout === 'broadcast') {
    const tickerText = `${masterclassFeatures.join(' · ')} · ${masterclassSchedule}`
    return (
      <section className={sectionClass}>
        <div className="mc-broadcast">
          <Motion delay={60}>
            <p className="sec-kicker mb-4">{masterclassKicker}</p>
            <h2 className="font-display font-bold text-ivory mb-4" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
              {sectionTitle || 'Master your craft'}
            </h2>
            <div className="mc-broadcast__crt">
              <div className="mc-broadcast__screen">
                <div className="mc-broadcast__bars" aria-hidden>
                  {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="mc-broadcast__bar" />
                  ))}
                </div>
                <div className="mc-broadcast__portrait">
                  <img src={masterclassImage} alt={masterclassInstructor} />
                </div>
              </div>
              <div className="mc-broadcast__ticker">
                <span>{tickerText}</span>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mt-6 mb-4">{sectionSubtitle}</p>
            <p className="text-white/60 text-sm italic mb-6">&ldquo;{sectionQuote}&rdquo;</p>
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-display font-extrabold text-ember text-2xl">{masterclassPrice}</span>
              <Link to="/masterclass" className="sec-cta">
                {masterclassCtaLabel}
                <span className="w-4 h-4 block">{Icons.arrowRight}</span>
              </Link>
            </div>
          </Motion>
        </div>
      </section>
    )
  }

  if (layout === 'observatory') {
    return (
      <section className={sectionClass}>
        <div className="mc-observatory">
          <Motion delay={60}>
            <p className="sec-kicker mb-4">{masterclassKicker}</p>
            <h2 className="font-display font-bold text-ivory mb-4" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
              {sectionTitle || 'Master your craft'}
            </h2>
            <p className="text-white/70 text-sm leading-relaxed max-w-lg mx-auto mb-6">{sectionSubtitle}</p>
            <div className="mc-observatory__dome">
              <div className="mc-observatory__orbit" aria-hidden />
              {weeks.map((w, i) => (
                <span key={w.n} className="mc-observatory__node" style={ORBIT_POSITIONS[i]}>
                  {w.n}
                </span>
              ))}
              <div className="mc-observatory__center">
                <img src={masterclassImage} alt={masterclassInstructor} />
              </div>
            </div>
            <p className="text-white/55 text-xs uppercase tracking-widest mt-6 mb-2">{masterclassDuration}</p>
            <p className="font-display text-ivory text-sm mb-6">{masterclassSchedule}</p>
            <p className="font-display font-extrabold text-ember text-3xl mb-6">{masterclassPrice}</p>
            <Link to="/masterclass" className="sec-cta">
              {masterclassCtaLabel}
              <span className="w-4 h-4 block">{Icons.arrowRight}</span>
            </Link>
          </Motion>
        </div>
      </section>
    )
  }

  return (
    <section className={sectionClass}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 100% 50%, rgba(255,107,26,0.28), transparent 55%), radial-gradient(ellipse 40% 50% at 0% 100%, rgba(90,40,160,0.55), transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <Motion delay={60} className="lg:col-span-5 relative">
            <p className="sec-kicker mb-5">{masterclassKicker}</p>
            {sectionTitle ? (
              <h2
                className="font-display font-extrabold leading-[0.88] tracking-[-0.03em] text-ivory"
                style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)' }}
              >
                {sectionTitle}
              </h2>
            ) : (
              <h2 className="font-display font-extrabold leading-[0.82] tracking-[-0.04em]">
                <span className="block text-ivory" style={{ fontSize: 'clamp(3.5rem, 10vw, 6.5rem)' }}>Master</span>
                <span className="block relative" style={{ fontSize: 'clamp(3.5rem, 10vw, 6.5rem)' }}>
                  <span className="text-gradient">your</span>
                  <span className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 translate-x-full hidden xl:block font-body text-[10px] tracking-[0.35em] uppercase text-white/50 whitespace-nowrap ml-4">
                    {masterclassDuration}
                  </span>
                </span>
                <span className="block italic" style={{ fontSize: 'clamp(3.5rem, 10vw, 6.5rem)', WebkitTextStroke: '1.5px rgba(255,107,26,0.7)', color: 'transparent' }}>
                  craft
                </span>
              </h2>
            )}
            <p className="text-white/70 text-sm leading-relaxed max-w-sm mt-6 mb-8">{sectionSubtitle}</p>
            <Link to="/masterclass" className="sec-cta">
              {masterclassCtaLabel}
              <span className="w-4 h-4 block">{Icons.arrowRight}</span>
            </Link>
            <div className="mt-8 rounded-xl p-4 border-l-2 border-ember" style={{ background: 'rgba(255,107,26,0.06)' }}>
              <p className="text-white/60 text-sm leading-relaxed italic mb-2">&ldquo;{sectionQuote}&rdquo;</p>
              <p className="text-ember text-xs font-bold uppercase tracking-wider">— {masterclassInstructor}</p>
            </div>
            <ul className="mt-5 space-y-2">
              {masterclassFeatures.map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-white/55">
                  <span className="w-3.5 h-3.5 block text-ember flex-shrink-0">{Icons.check}</span>
                  {item}
                </li>
              ))}
            </ul>
          </Motion>

          <Motion delay={120} className="lg:col-span-4 relative">
            <div className="relative mx-auto max-w-xs lg:max-w-none">
              <div className="relative aspect-[3/4] overflow-hidden" style={{ clipPath: 'polygon(8% 0, 100% 0, 92% 100%, 0 100%)' }}>
                <img src={masterclassImage} alt="King Maker" className="absolute inset-0 w-full h-full object-cover object-top scale-105" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,4,20,0.75) 0%, transparent 40%)' }} />
                <div className="absolute bottom-5 left-6 right-4">
                  <p className="font-display font-bold text-ivory text-lg leading-none">{masterclassInstructor}</p>
                  <p className="text-white/65 text-[10px] tracking-[0.2em] uppercase mt-1.5">{masterclassInstructorRole}</p>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-2 sm:-right-4 px-4 py-3" style={{ background: '#FF6B1A', clipPath: 'polygon(0 0, 100% 0, 100% 78%, 88% 100%, 0 100%)' }}>
                <p className="font-body text-[9px] uppercase tracking-[0.25em] text-white/80 leading-none mb-1">From</p>
                <p className="font-display font-extrabold text-white text-3xl leading-none">{masterclassPrice}</p>
              </div>
            </div>
          </Motion>

          <Motion delay={180} className="lg:col-span-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-5 lg:mb-6">Curriculum</p>
            <ol className="space-y-0 border-l border-ember/40 ml-2">
              {weeks.map(({ n, label }, i) => (
                <li
                  key={n}
                  className="relative pl-5 py-3 group"
                  ref={(el) => { tiltRefs.current[i] = el }}
                  onMouseMove={(e) => handleTilt(i, e)}
                  onMouseLeave={() => resetTilt(i)}
                >
                  <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2" style={{ background: i === 0 ? '#FF6B1A' : 'rgba(255,107,26,0.35)' }} />
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-ember/50 text-xs tabular-nums">{n}</span>
                    <span className="text-ivory/80 text-sm font-medium group-hover:text-ivory transition-colors">{label}</span>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8 pt-5 border-t border-white/[0.07]">
              <p className="text-white/55 text-[10px] uppercase tracking-[0.25em] mb-1">Live sessions</p>
              <p className="font-display text-ivory text-sm">{masterclassSchedule}</p>
            </div>
          </Motion>
        </div>
      </div>

      <div className="relative h-px max-w-7xl mx-auto" style={{ background: 'rgba(255,138,61,0.35)' }}>
        {[0, 25, 50, 75, 100].map((p) => (
          <span key={p} className="absolute top-0 w-px h-2 -translate-y-0 bg-ember/70" style={{ left: `${p}%` }} aria-hidden />
        ))}
      </div>
    </section>
  )
}

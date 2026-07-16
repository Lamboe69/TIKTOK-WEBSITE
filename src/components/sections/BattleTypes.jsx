import { Link } from 'react-router-dom'
import { useMemo, useState, useCallback } from 'react'
import Motion from '../Motion'
import { useSignUp } from '../SignUpContext'
import { useContent } from '../../cms/ContentContext'
import { normalizeBattleCatalog } from '../../cms/battleCatalog'
import { normalizeSectionLayout } from '../../cms/sectionLayouts'

function BattleHeader({ kicker, title, linkText }) {
  return (
    <Motion delay={40} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
      <div>
        <p className="sec-kicker mb-2">{kicker}</p>
        <h2
          className="font-display font-bold text-ivory leading-[0.95] tracking-tight"
          style={{ fontSize: 'clamp(1.85rem, 4vw, 2.75rem)' }}
        >
          Battle <span className="text-gradient">{title.replace(/^Battle\s*/i, '') || 'formats'}</span>
        </h2>
      </div>
      <Link to="/battle-schedule" className="sec-cta-ghost self-start sm:self-auto">
        {linkText}
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </Motion>
  )
}

function BattleCopy({ battle, onClaim }) {
  return (
    <>
      <p className="text-[10px] font-bold uppercase tracking-[0.32em] mb-3" style={{ color: battle.accent }}>
        {battle.tag}
      </p>
      <h3
        className="font-display font-bold text-ivory leading-[1.05] tracking-tight mb-3 max-w-lg"
        style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.35rem)' }}
      >
        {battle.title}
      </h3>
      <p className="text-white/75 text-sm leading-relaxed max-w-md mb-6">{battle.blurb}</p>
      <button
        type="button"
        onClick={onClaim}
        className="sec-cta self-start"
        style={{
          background: `linear-gradient(135deg, ${battle.accent}, ${battle.accent === '#E8B94A' || battle.accent === '#C4A0FF' ? '#FF6B1A' : '#CC5200'})`,
        }}
      >
        Claim a slot
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </>
  )
}

export default function BattleTypes() {
  const { openBattle } = useSignUp()
  const { collections, getPage } = useContent()
  const homePage = getPage('home')
  const layout = normalizeSectionLayout('battleTypesLayout', homePage.battleTypesLayout)
  const battleTypesTitle = homePage.battleTypesTitle || 'Battle formats'
  const battleTypesKicker = homePage.battleTypesKicker || 'The Arena · 6 Formats'
  const battleTypesLink = homePage.battleTypesLink || 'Full schedule'
  const types = useMemo(
    () => normalizeBattleCatalog(collections.battleCatalog),
    [collections.battleCatalog],
  )
  const [active, setActive] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [wheelRotation, setWheelRotation] = useState(0)
  const battle = types[active] || types[0]

  const handleClaimSlot = useCallback(() => {
    if (!battle) return
    openBattle({
      type: battle.title,
      title: battle.title,
      battleLabel: battle.title,
      entryType: battle.entryType,
    })
  }, [battle, openBattle])

  const spinRoulette = useCallback(() => {
    if (spinning || types.length < 2) return
    setSpinning(true)
    const next = Math.floor(Math.random() * types.length)
    const sliceAngle = 360 / types.length
    setWheelRotation((prev) => prev + 360 * 5 - next * sliceAngle - sliceAngle / 2)
    window.setTimeout(() => {
      setActive(next)
      setSpinning(false)
    }, 2800)
  }, [spinning, types.length])

  const rouletteGradient = useMemo(() => {
    if (!types.length) return ''
    const slice = 360 / types.length
    return types
      .map((t, i) => `${t.accent} ${i * slice}deg ${(i + 1) * slice}deg`)
      .join(', ')
  }, [types])

  const sliceAngle = types.length ? 360 / types.length : 90

  if (!battle) return null

  const sectionClass = `relative overflow-hidden home-band-purple home-band-sep${layout !== 'arena' ? ` battle--${layout}` : ''}`

  if (layout === 'hexpit') {
    return (
      <section className={sectionClass}>
        <div className="absolute inset-0 pointer-events-none opacity-50" style={{ background: 'radial-gradient(ellipse 55% 70% at 85% 40%, rgba(255,107,26,0.16), transparent 60%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
          <BattleHeader kicker={battleTypesKicker} title={battleTypesTitle} linkText={battleTypesLink} />
          <Motion delay={90}>
            <div className="hexpit-grid">
              {types.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  className={`hexpit-cell${i === active ? ' is-active' : ''}`}
                  style={{ '--hex-accent': t.accent }}
                  onClick={() => setActive(i)}
                  aria-pressed={i === active}
                >
                  <img src={t.img} alt="" />
                  <span className="hexpit-cell__label">{t.short}</span>
                </button>
              ))}
            </div>
            <div key={battle.id} className="hexpit-detail">
              <BattleCopy battle={battle} onClaim={handleClaimSlot} />
            </div>
          </Motion>
        </div>
      </section>
    )
  }

  if (layout === 'roulette') {
    return (
      <section className={sectionClass}>
        <div className="absolute inset-0 pointer-events-none opacity-50" style={{ background: 'radial-gradient(ellipse 55% 70% at 50% 50%, rgba(255,107,26,0.2), transparent 60%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
          <BattleHeader kicker={battleTypesKicker} title={battleTypesTitle} linkText={battleTypesLink} />
          <Motion delay={90}>
            <div className="roulette-stage">
              <div className="roulette-controls">
                <div className="roulette-wheel-wrap">
                  <div className="roulette-pointer" aria-hidden />
                  <div className="roulette-wheel" style={{ transform: `rotate(${wheelRotation}deg)` }}>
                    <div
                      className="roulette-wheel__disc"
                      style={{ background: `conic-gradient(from -90deg, ${rouletteGradient})` }}
                    />
                    <div className="roulette-wheel__ticks" aria-hidden />
                    {types.map((t, i) => (
                      <span
                        key={t.id}
                        className="roulette-slice__label"
                        style={{ transform: `rotate(${(i + 0.5) * sliceAngle}deg)` }}
                      >
                        {t.short}
                      </span>
                    ))}
                    <div className="roulette-hub" style={{ '--hub-accent': battle.accent }}>
                      <img src={battle.img} alt="" className="roulette-hub__img" aria-hidden />
                      <div className="roulette-hub__text">
                        <p className="roulette-hub__num">{String(active + 1).padStart(2, '0')}</p>
                        <p className="roulette-hub__name">{battle.short}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button type="button" className="roulette-spin-btn" onClick={spinRoulette} disabled={spinning}>
                  {spinning ? 'Spinning…' : 'Spin for your format'}
                </button>
              </div>
              <div key={battle.id} className="roulette-detail">
                <BattleCopy battle={battle} onClaim={handleClaimSlot} />
              </div>
            </div>
          </Motion>
        </div>
      </section>
    )
  }

  if (layout === 'vhs') {
    return (
      <section className={sectionClass}>
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
          <BattleHeader kicker={battleTypesKicker} title={battleTypesTitle} linkText={battleTypesLink} />
          <Motion delay={90}>
            <div className="vhs-layout">
              <div className="vhs-deck">
                <div className="vhs-screen">
                  <img src={battle.img} alt={battle.title} />
                </div>
                <div className="vhs-tapes" role="tablist" aria-label="Battle tapes">
                  {types.map((t, i) => (
                    <button
                      key={t.id}
                      type="button"
                      role="tab"
                      aria-selected={i === active}
                      className={`vhs-tape${i === active ? ' is-active' : ''}`}
                      onClick={() => setActive(i)}
                    >
                      <div className="vhs-tape__thumb">
                        <img src={t.img} alt="" />
                      </div>
                      <p className="vhs-tape__label">{t.short}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div key={battle.id} className="vhs-copy">
                <BattleCopy battle={battle} onClaim={handleClaimSlot} />
              </div>
            </div>
          </Motion>
        </div>
      </section>
    )
  }

  return (
    <section className={sectionClass}>
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            'radial-gradient(ellipse 55% 70% at 85% 40%, rgba(255,107,26,0.16), transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <BattleHeader kicker={battleTypesKicker} title={battleTypesTitle} linkText={battleTypesLink} />

        <Motion delay={90}>
          <div className="arena-stage">
            <div className="arena-stage__visual relative overflow-hidden" id="arena-stage-panel" role="tabpanel" aria-labelledby={`arena-tab-${battle.id}`}>
              {types.map((t, i) => (
                <img
                  key={t.id}
                  src={t.img}
                  alt={i === active ? t.title : ''}
                  aria-hidden={i !== active}
                  className={`arena-stage__img absolute inset-0 w-full h-full object-cover ${
                    i === active ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(105deg, rgba(42,20,80,0.92) 0%, rgba(42,20,80,0.55) 42%, rgba(42,20,80,0.15) 100%), linear-gradient(to top, rgba(42,20,80,0.85) 0%, transparent 40%)',
                }}
              />

              <span
                className="arena-stage__idx font-display font-extrabold absolute -bottom-4 -right-2 sm:right-4 leading-none select-none pointer-events-none"
                style={{ color: `${battle.accent}33` }}
                aria-hidden
              >
                {String(active + 1).padStart(2, '0')}
              </span>

              <div key={battle.id} className="arena-stage__copy relative z-10 flex flex-col justify-end h-full p-5 sm:p-8 lg:p-10">
                <BattleCopy battle={battle} onClaim={handleClaimSlot} />
              </div>
            </div>

            <div className="arena-stage__rail" role="tablist" aria-label="Battle types">
              {types.map((t, i) => {
                const on = i === active
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls="arena-stage-panel"
                    id={`arena-tab-${t.id}`}
                    className={`arena-rail-btn group ${on ? 'is-active' : ''}`}
                    style={{ ['--rail-accent']: t.accent }}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                  >
                    <span className="arena-rail-btn__num font-display font-bold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="arena-rail-btn__meta">
                      <span className="arena-rail-btn__tag">{t.tag}</span>
                      <span className="arena-rail-btn__name">{t.short}</span>
                    </span>
                    <span className="arena-rail-btn__thumb" aria-hidden>
                      <img src={t.img} alt="" />
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </Motion>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { Link } from 'react-router-dom'
import Motion from '../Motion'
import { useContent } from '../../cms/ContentContext'

const fallbackTypes = [
  {
    id: 'daily',
    short: 'Daily',
    title: 'Daily Godsent Box Battle',
    tag: 'Main Event',
    description: 'The nightly arena. Fair matchups, curated opponents, real crowns.',
    img: '/battles-photos/daily-godsent.jpg',
    accent: '#FF6B1A',
  },
  {
    id: 'beautiful',
    short: 'Beautiful',
    title: 'Most Beautiful Box Battle',
    tag: 'Showcase',
    description: 'Grace, presence, and style — where beauty meets the battle.',
    img: '/battles-photos/most-beautiful.jpg',
    accent: '#E8B94A',
  },
  {
    id: 'country',
    short: 'Country',
    title: 'Country Box Battle',
    tag: 'Nations',
    description: 'Rep your flag. National pride in the TikTok arena.',
    img: '/battles-photos/country.jpg',
    accent: '#C4A0FF',
  },
  {
    id: 'scavengers',
    short: 'Scavengers',
    title: 'Scavengers Box Battle',
    tag: 'Open Gate',
    description: 'No tap minimum. Pure hunger. Underdogs rewrite the night.',
    img: '/battles-photos/scavengers.jpg',
    accent: '#FF8A3D',
  },
  {
    id: 'finale',
    short: 'Finale',
    title: 'Champion of Champions',
    tag: 'Finale',
    description: 'Official winners collide. Only the strongest leave crowned.',
    img: '/battles-photos/champion-of-champions.jpg',
    accent: '#E8B94A',
  },
]

const accents = ['#FF6B1A', '#E8B94A', '#C4A0FF', '#FF8A3D', '#E8B94A']

export default function BattleTypes() {
  const { collections } = useContent()
  const types =
    collections.battleCatalog?.length > 0
      ? collections.battleCatalog.map((t, i) => ({
          id: String(t.id || i),
          short: t.title?.split(' ')[0] || 'Battle',
          title: t.title,
          tag: 'Battle',
          description: t.blurb || t.description,
          img: t.img,
          accent: accents[i % accents.length],
        }))
      : fallbackTypes
  const [active, setActive] = useState(0)
  const battle = types[active]

  return (
    <section className="relative overflow-hidden home-band-purple home-band-sep">
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            'radial-gradient(ellipse 55% 70% at 85% 40%, rgba(255,107,26,0.16), transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <Motion delay={40} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p className="sec-kicker mb-2">The Arena</p>
            <h2
              className="font-display font-bold text-ivory leading-[0.95] tracking-tight"
              style={{ fontSize: 'clamp(1.85rem, 4vw, 2.75rem)' }}
            >
              Battle <span className="text-gradient">types</span>
            </h2>
          </div>
          <Link to="/battle-schedule" className="sec-cta-ghost self-start sm:self-auto">
            Full schedule
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </Motion>

        {/* Interactive arena stage */}
        <Motion delay={90}>
          <div className="arena-stage">
            {/* Featured visual */}
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

              {/* Giant index watermark */}
              <span
                className="arena-stage__idx font-display font-extrabold absolute -bottom-4 -right-2 sm:right-4 leading-none select-none pointer-events-none"
                style={{ color: `${battle.accent}33` }}
                aria-hidden
              >
                {String(active + 1).padStart(2, '0')}
              </span>

              {/* Active copy over visual */}
              <div key={battle.id} className="arena-stage__copy relative z-10 flex flex-col justify-end h-full p-5 sm:p-8 lg:p-10">
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.32em] mb-3"
                  style={{ color: battle.accent }}
                >
                  {battle.tag}
                </p>
                <h3 className="font-display font-bold text-ivory leading-[1.05] tracking-tight mb-3 max-w-lg"
                  style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.35rem)' }}
                >
                  {battle.title}
                </h3>
                <p className="text-white/75 text-sm leading-relaxed max-w-md mb-6">
                  {battle.description}
                </p>
                <Link
                  to="/battle-schedule"
                  className="sec-cta self-start"
                  style={{
                    background: `linear-gradient(135deg, ${battle.accent}, ${battle.accent === '#E8B94A' || battle.accent === '#C4A0FF' ? '#FF6B1A' : '#CC5200'})`,
                  }}
                >
                  Claim a slot
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Compact roster rail */}
            <div
              className="arena-stage__rail"
              role="tablist"
              aria-label="Battle types"
            >
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

import Motion from '../Motion'
import { Icons } from '../Icons'
import { normalizePeoplePhotos } from '../../cms/normalize'
import { normalizeSectionLayout } from '../../cms/sectionLayouts'
import './ContactTeam.css'

const fallbackTeam = [
  {
    name: 'King Maker',
    role: 'Founder · Host',
    tag: '@kingmakernevergivesup',
    url: 'https://www.tiktok.com/@kingmakernevergivesup',
    photo: '/team/maker.jpg',
  },
  {
    name: 'King Mufasa',
    role: 'General Manager',
    tag: 'Dynasty Management',
    url: 'https://www.tiktok.com/@kingmufasa781',
    photo: '/team/mufasa.jpg',
  },
]

const POLAROID_TILTS = [-7, 4, -3, 6, -5, 2, -4, 5]
const TAROT_SUITS = ['♦', '♠', '♥', '♣']
const RUNE_GLYPHS = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ']

function TeamHead({ kicker, title, subtitle }) {
  const titleWords = title.split(' ')
  const accent = titleWords.length > 1 ? titleWords.slice(-1)[0] : ''
  const lead = titleWords.length > 1 ? titleWords.slice(0, -1).join(' ') : title

  return (
    <div className="contact-team__head">
      {kicker ? <p className="contact-team__kicker">{kicker}</p> : null}
      <h2 className="contact-team__title">
        {accent ? (
          <>
            {lead} <span className="text-gradient">{accent}</span>
          </>
        ) : title}
      </h2>
      {subtitle ? <p className="contact-team__sub">{subtitle}</p> : null}
    </div>
  )
}

function MemberLink({ member, className, children, style }) {
  if (member.url) {
    return (
      <a
        href={member.url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={style}
      >
        {children}
      </a>
    )
  }
  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}

function MemberGo({ label = 'View profile' }) {
  return (
    <span className="contact-team__go">
      {label} <span className="w-3 h-3 block">{Icons.arrowRight}</span>
    </span>
  )
}

function TeamShell({ layout, kicker, title, subtitle, children, decor }) {
  return (
    <section className={`contact-team contact-team--${layout}`} aria-label="Contact team">
      <div className="contact-team__ambient" aria-hidden />
      {decor}
      <div className="contact-pad">
        <Motion delay={40}>
          <TeamHead kicker={kicker} title={title} subtitle={subtitle} />
        </Motion>
        {children}
      </div>
    </section>
  )
}

/* ─── Cinema Crawl — giant watermark names, film grain, timecode ─── */
function LayoutCredits({ team }) {
  return (
    <>
      <div className="contact-team__film-grain" aria-hidden />
      <div className="contact-team__credits">
        {team.map((member, i) => (
          <Motion key={member.id || member.name} delay={80 + i * 60}>
            <MemberLink member={member} className="contact-team__credit">
              <span className="contact-team__credit-watermark" aria-hidden>{member.name}</span>
              <span className="contact-team__credit-timecode">00:{String(i + 1).padStart(2, '0')}:00</span>
              <div className="contact-team__credit-photo">
                <img src={member.photo} alt={member.name} loading="lazy" />
                <span className="contact-team__credit-index">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="contact-team__credit-copy">
                <p className="contact-team__role">{member.role}</p>
                <p className="contact-team__name">{member.name}</p>
                {member.tag ? <p className="contact-team__tag">{member.tag}</p> : null}
                {member.bio ? <p className="contact-team__bio">{member.bio}</p> : null}
                {member.url ? <MemberGo label="View TikTok" /> : null}
              </div>
            </MemberLink>
          </Motion>
        ))}
      </div>
    </>
  )
}

/* ─── Holo Deck — holographic trading cards with 3D tilt ─── */
function LayoutCards({ team }) {
  return (
    <div className="contact-team__cards">
      {team.map((member, i) => (
        <Motion key={member.id || member.name} delay={70 + i * 50}>
          <MemberLink
            member={member}
            className="contact-team__card"
            style={{ '--card-i': i }}
          >
            <span className="contact-team__card-holo" aria-hidden />
            <span className="contact-team__card-foil" aria-hidden />
            <div className="contact-team__card-media">
              <img src={member.photo} alt={member.name} loading="lazy" />
              <span className="contact-team__card-role">{member.role}</span>
              <span className="contact-team__card-rarity">★ LEGEND</span>
            </div>
            <div className="contact-team__card-body">
              <p className="contact-team__name">{member.name}</p>
              {member.tag ? <p className="contact-team__tag">{member.tag}</p> : null}
              {member.bio ? <p className="contact-team__bio">{member.bio}</p> : null}
            </div>
          </MemberLink>
        </Motion>
      ))}
    </div>
  )
}

/* ─── Arena Face-Off — battle poster VS energy ─── */
function SplitSpot({ member, i }) {
  return (
    <MemberLink member={member} className="contact-team__spot">
      <span className="contact-team__spot-corner contact-team__spot-corner--tl" aria-hidden />
      <span className="contact-team__spot-corner contact-team__spot-corner--br" aria-hidden />
      <div className="contact-team__spot-media">
        <img src={member.photo} alt={member.name} loading="lazy" />
        <span className="contact-team__spot-sheen" aria-hidden />
        <span className="contact-team__spot-flash" aria-hidden />
      </div>
      <div className="contact-team__spot-copy">
        <span className="contact-team__spot-badge">Corner {i + 1}</span>
        <p className="contact-team__role">{member.role}</p>
        <p className="contact-team__name">{member.name}</p>
        {member.tag ? <p className="contact-team__tag">{member.tag}</p> : null}
        {member.bio ? <p className="contact-team__bio">{member.bio}</p> : null}
        {member.url ? <MemberGo /> : null}
      </div>
    </MemberLink>
  )
}

function LayoutSplit({ team }) {
  return (
    <div className={`contact-team__split${team.length === 2 ? ' contact-team__split--duel' : ''}`}>
      <span className="contact-team__split-arena" aria-hidden>ARENA</span>
      {team.length === 2 ? (
        <>
          <Motion delay={80}><SplitSpot member={team[0]} i={0} /></Motion>
          <span className="contact-team__split-vs" aria-hidden>VS</span>
          <Motion delay={140}><SplitSpot member={team[1]} i={1} /></Motion>
        </>
      ) : (
        team.map((member, i) => (
          <Motion key={member.id || member.name} delay={80 + i * 60}>
            <SplitSpot member={member} i={i} />
          </Motion>
        ))
      )}
    </div>
  )
}

/* ─── Ticket Wallet — torn arena stubs ─── */
function LayoutLineup({ team }) {
  return (
    <div className="contact-team__lineup">
      <span className="contact-team__lineup-rail" aria-hidden />
      {team.map((member, i) => (
        <Motion key={member.id || member.name} delay={70 + i * 45}>
          <MemberLink member={member} className="contact-team__line">
            <span className="contact-team__line-perf" aria-hidden />
            <span className="contact-team__line-node" aria-hidden />
            <span className="contact-team__line-num">{String(i + 1).padStart(2, '0')}</span>
            <img src={member.photo} alt="" className="contact-team__line-photo" loading="lazy" />
            <span className="contact-team__line-meta">
              <strong>{member.name}</strong>
              <em>{member.role}</em>
            </span>
            {member.tag ? <span className="contact-team__line-tag">{member.tag}</span> : null}
            <span className="contact-team__line-admit">ADMIT ONE</span>
          </MemberLink>
        </Motion>
      ))}
    </div>
  )
}

/* ─── Throne Lights — pulsing spotlights on marble ─── */
function LayoutPedestal({ team }) {
  return (
    <div className="contact-team__pedestals">
      <div className="contact-team__pedestal-stage" aria-hidden />
      {team.map((member, i) => (
        <Motion key={member.id || member.name} delay={90 + i * 70}>
          <MemberLink member={member} className="contact-team__pedestal">
            <span className="contact-team__pedestal-beam" aria-hidden />
            <span className="contact-team__pedestal-halo" aria-hidden />
            <div className="contact-team__pedestal-portrait">
              <img src={member.photo} alt={member.name} loading="lazy" />
            </div>
            <div className="contact-team__pedestal-plinth">
              <span className="contact-team__role">{member.role}</span>
              <p className="contact-team__name">{member.name}</p>
              {member.tag ? <span className="contact-team__tag">{member.tag}</span> : null}
              {member.bio ? <p className="contact-team__bio">{member.bio}</p> : null}
              {member.url ? <MemberGo label="Connect" /> : null}
            </div>
          </MemberLink>
        </Motion>
      ))}
    </div>
  )
}

/* ─── Conspiracy Board — string-linked polaroids ─── */
function LayoutPolaroid({ team }) {
  return (
    <div className="contact-team__polaroids">
      <svg className="contact-team__polaroid-strings" aria-hidden viewBox="0 0 400 300" preserveAspectRatio="none">
        <path d="M50,20 L200,80 L350,30 M80,250 L200,120 L320,260" />
      </svg>
      {team.map((member, i) => (
        <Motion key={member.id || member.name} delay={75 + i * 55}>
          <MemberLink
            member={member}
            className="contact-team__polaroid"
            style={{
              '--polaroid-tilt': `${POLAROID_TILTS[i % POLAROID_TILTS.length]}deg`,
              '--polaroid-y': `${(i % 3) * 4}px`,
            }}
          >
            <div className="contact-team__polaroid-pin" aria-hidden />
            <div className="contact-team__polaroid-frame">
              <img src={member.photo} alt={member.name} loading="lazy" />
              <div className="contact-team__polaroid-caption">
                <strong>{member.name}</strong>
                <em>{member.role}</em>
                {member.tag ? <span>{member.tag}</span> : null}
              </div>
            </div>
            <span className="contact-team__polaroid-stamp">CONFIDENTIAL</span>
          </MemberLink>
        </Motion>
      ))}
    </div>
  )
}

/* ─── Rune Crown — triple ring sigils with glyphs ─── */
function LayoutSigil({ team }) {
  return (
    <div className="contact-team__sigils">
      {team.map((member, i) => (
        <Motion key={member.id || member.name} delay={85 + i * 65}>
          <MemberLink member={member} className="contact-team__sigil">
            <span className="contact-team__sigil-ring contact-team__sigil-ring--outer" aria-hidden />
            <span className="contact-team__sigil-ring contact-team__sigil-ring--mid" aria-hidden />
            <span className="contact-team__sigil-ring contact-team__sigil-ring--inner" aria-hidden />
            <span className="contact-team__sigil-glyph" aria-hidden>{RUNE_GLYPHS[i % RUNE_GLYPHS.length]}</span>
            <div className="contact-team__sigil-hex">
              <img src={member.photo} alt={member.name} loading="lazy" />
            </div>
            <span className="contact-team__sigil-ribbon">{member.role}</span>
            <p className="contact-team__name">{member.name}</p>
            {member.tag ? <span className="contact-team__tag">{member.tag}</span> : null}
            {member.bio ? <p className="contact-team__bio">{member.bio}</p> : null}
          </MemberLink>
        </Motion>
      ))}
    </div>
  )
}

/* ─── Infinite Premiere — auto-scrolling film strip ─── */
function LayoutReel({ team }) {
  const doubled = [...team, ...team]
  return (
    <div className="contact-team__reel-wrap">
      <div className="contact-team__reel-perfs contact-team__reel-perfs--top" aria-hidden />
      <div className="contact-team__reel-viewport">
        <div className="contact-team__reel-track">
          {doubled.map((member, i) => (
            <MemberLink
              key={`${member.id || member.name}-${i}`}
              member={member}
              className="contact-team__reel-frame"
            >
              <div className="contact-team__reel-cell">
                <img src={member.photo} alt={member.name} loading="lazy" />
                <span className="contact-team__reel-flicker" aria-hidden />
              </div>
              <div className="contact-team__reel-cap">
                <span className="contact-team__role">{member.role}</span>
                <strong>{member.name}</strong>
                {member.tag ? <em>{member.tag}</em> : null}
              </div>
            </MemberLink>
          ))}
        </div>
      </div>
      <div className="contact-team__reel-perfs contact-team__reel-perfs--bottom" aria-hidden />
    </div>
  )
}

/* ─── Tarot Court — fanned oracle cards ─── */
function LayoutOracle({ team }) {
  return (
    <div className="contact-team__oracle">
      <span className="contact-team__oracle-cloth" aria-hidden />
      {team.map((member, i) => (
        <Motion key={member.id || member.name} delay={80 + i * 55}>
          <MemberLink
            member={member}
            className="contact-team__tarot"
            style={{
              '--tarot-i': i,
              '--tarot-n': team.length,
              '--tarot-suit': `"${TAROT_SUITS[i % TAROT_SUITS.length]}"`,
            }}
          >
            <div className="contact-team__tarot-back" aria-hidden />
            <div className="contact-team__tarot-face">
              <span className="contact-team__tarot-suit">{TAROT_SUITS[i % TAROT_SUITS.length]}</span>
              <div className="contact-team__tarot-art">
                <img src={member.photo} alt={member.name} loading="lazy" />
              </div>
              <div className="contact-team__tarot-foot">
                <span className="contact-team__role">{member.role}</span>
                <strong>{member.name}</strong>
                {member.tag ? <em>{member.tag}</em> : null}
              </div>
            </div>
          </MemberLink>
        </Motion>
      ))}
    </div>
  )
}

/* ─── Late Night Broadcast — CRT wall ─── */
function LayoutBroadcast({ team }) {
  return (
    <div className="contact-team__broadcast-wall">
      {team.map((member, i) => (
        <Motion key={member.id || member.name} delay={70 + i * 50}>
          <MemberLink member={member} className="contact-team__crt">
            <div className="contact-team__crt-bezel">
              <span className="contact-team__crt-channel">CH {String(i + 1).padStart(2, '0')}</span>
              <div className="contact-team__crt-screen">
                <img src={member.photo} alt={member.name} loading="lazy" />
                <span className="contact-team__crt-scan" aria-hidden />
                <span className="contact-team__crt-static" aria-hidden />
                <span className="contact-team__crt-on-air">ON AIR</span>
              </div>
              <div className="contact-team__crt-label">
                <span className="contact-team__role">{member.role}</span>
                <strong>{member.name}</strong>
              </div>
            </div>
          </MemberLink>
        </Motion>
      ))}
    </div>
  )
}

/* ─── Star Map — constellation orbit ─── */
function LayoutConstellation({ team }) {
  return (
    <div className="contact-team__constellation">
      <svg className="contact-team__constellation-lines" aria-hidden viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {team.map((_, i) => {
          if (i === 0) return null
          const a = ((i - 1) / team.length) * 360
          const b = (i / team.length) * 360
          const r = 38
          const x1 = 50 + r * Math.cos((a * Math.PI) / 180)
          const y1 = 50 + r * Math.sin((a * Math.PI) / 180)
          const x2 = 50 + r * Math.cos((b * Math.PI) / 180)
          const y2 = 50 + r * Math.sin((b * Math.PI) / 180)
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
        })}
        {team.length > 2 ? (
          (() => {
            const a = ((team.length - 1) / team.length) * 360
            const b = 0
            const r = 38
            const x1 = 50 + r * Math.cos((a * Math.PI) / 180)
            const y1 = 50 + r * Math.sin((a * Math.PI) / 180)
            const x2 = 50 + r * Math.cos((b * Math.PI) / 180)
            const y2 = 50 + r * Math.sin((b * Math.PI) / 180)
            return <line key="close" x1={x1} y1={y1} x2={x2} y2={y2} />
          })()
        ) : null}
      </svg>
      <div className="contact-team__constellation-core" aria-hidden>
        <span>DYNASTY</span>
      </div>
      {team.map((member, i) => (
        <Motion key={member.id || member.name} delay={90 + i * 60}>
          <MemberLink
            member={member}
            className="contact-team__star-node"
            style={{ '--star-i': i, '--star-n': team.length }}
          >
            <span className="contact-team__star-pulse" aria-hidden />
            <img src={member.photo} alt={member.name} loading="lazy" />
            <span className="contact-team__star-info">
              <strong>{member.name}</strong>
              <em>{member.role}</em>
            </span>
          </MemberLink>
        </Motion>
      ))}
    </div>
  )
}

/* ─── Ritual Circle — summoning ring ─── */
function LayoutSummoning({ team }) {
  return (
    <div className="contact-team__summoning">
      <div className="contact-team__summoning-ring contact-team__summoning-ring--outer" aria-hidden />
      <div className="contact-team__summoning-ring contact-team__summoning-ring--mid" aria-hidden />
      <div className="contact-team__summoning-ring contact-team__summoning-ring--inner" aria-hidden />
      <div className="contact-team__summoning-sigil" aria-hidden>✦</div>
      {team.map((member, i) => (
        <Motion key={member.id || member.name} delay={100 + i * 70}>
          <MemberLink
            member={member}
            className="contact-team__summon-node"
            style={{ '--summon-i': i, '--summon-n': team.length }}
          >
            <div className="contact-team__summon-portal">
              <img src={member.photo} alt={member.name} loading="lazy" />
            </div>
            <div className="contact-team__summon-plate">
              <span className="contact-team__role">{member.role}</span>
              <strong>{member.name}</strong>
              {member.tag ? <em>{member.tag}</em> : null}
            </div>
          </MemberLink>
        </Motion>
      ))}
    </div>
  )
}

const LAYOUTS = {
  credits: LayoutCredits,
  cards: LayoutCards,
  split: LayoutSplit,
  lineup: LayoutLineup,
  pedestal: LayoutPedestal,
  polaroid: LayoutPolaroid,
  sigil: LayoutSigil,
  reel: LayoutReel,
  oracle: LayoutOracle,
  broadcast: LayoutBroadcast,
  constellation: LayoutConstellation,
  summoning: LayoutSummoning,
}

export default function ContactTeam({ page, members }) {
  const layout = normalizeSectionLayout('contactTeamLayout', page.contactTeamLayout)
  const team = members.length ? members : normalizePeoplePhotos(fallbackTeam)
  if (!team.length) return null

  const kicker = page.teamKicker || 'The Team'
  const title = page.teamTitle || 'Meet the dynasty'
  const subtitle = page.teamSubtitle || 'The people behind the arena — reach out and we will route you to the right voice.'

  const LayoutBody = LAYOUTS[layout] || LayoutCredits

  return (
    <TeamShell layout={layout} kicker={kicker} title={title} subtitle={subtitle}>
      <LayoutBody team={team} />
    </TeamShell>
  )
}

import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Icons } from '../components/Icons'
import Motion from '../components/Motion'

const stats = [
  { value: '50K+', label: 'Followers' },
  { value: '100+', label: 'Battles Hosted' },
  { value: '50+', label: 'Winners Crowned' },
  { value: '6', label: 'Global Regions' },
]

const values = [
  { emoji: '👑', title: 'Royalty', img: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80' },
  { emoji: '🙏', title: 'Faith', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80' },
  { emoji: '🤝', title: 'Community', img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80' },
  { emoji: '🔥', title: 'Intensity', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80' },
]

const team = [
  { name: 'King Maker', role: 'Pro Livestreamer / Godsent Box Battle Host', tag: 'Founder · @kingmakernevergivesup', url: 'https://www.tiktok.com/@kingmakernevergivesup', photo: '/team/maker.jpg', accent: '#FF6B1A' },
  { name: 'King Mufasa', role: 'General Manager', tag: 'KM DYNASTY Management', url: 'https://www.tiktok.com/@kingmufasa781', photo: '/team/mufasa.jpg', accent: '#3B1063' },
]

function AnimatedStat({ value, label }) {
  const [displayed, setDisplayed] = useState('0')
  const ref = useRef(null)
  const observed = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !observed.current) {
        observed.current = true
        const num = parseInt(value.replace(/\D/g, ''))
        const suffix = value.replace(/[\d]/g, '')
        let start = 0
        const step = Math.ceil(num / 40)
        const id = setInterval(() => {
          start = Math.min(start + step, num)
          setDisplayed(start + suffix)
          if (start >= num) clearInterval(id)
        }, 40)
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="text-center">
      <p className="font-display font-bold text-3xl text-ivory mb-1">{displayed}</p>
      <p className="text-white/50 text-xs uppercase tracking-wider">{label}</p>
    </div>
  )
}

export default function About() {
  return (
    <main>
      {/* Hero */}
      <section
        className="relative min-h-[560px] flex items-end pb-16 overflow-hidden"
        style={{ background: '#120620' }}
      >
        <img loading="lazy"
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=80"
          alt="KM Dynasty"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(18,6,32,0.95) 40%, rgba(59,16,99,0.6) 100%)' }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            {/* Left */}
            <Motion delay={0.1}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-5 text-ember" style={{ background: 'rgba(255,107,26,0.1)' }}>
                KM Dynasty
              </span>
              <h1 className="font-display font-bold text-ivory mb-4 leading-tight" style={{ fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.02em' }}>
                About KM DYNASTY
              </h1>
              <p className="text-white/60 text-sm leading-relaxed max-w-md mb-6">
                A TikTok battle arena built on faith, community, and the relentless pursuit of the crown.
              </p>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: 'rgba(255,107,26,0.2)', border: '1px solid rgba(255,107,26,0.3)' }}>
                  🔴 TikTok Live Battle
                </span>
                <span className="text-white/30 text-xs">🔱 Est. Dallas, TX</span>
              </div>
            </Motion>

            {/* Right: stats card */}
            <Motion delay={0.2}>
              <div className="glass rounded-2xl p-6 border border-white/10 grid grid-cols-2 gap-6">
                {stats.map(s => <AnimatedStat key={s.label} {...s} />)}
              </div>
            </Motion>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 sm:py-24" style={{ background: '#1B1024' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Motion delay={0.1}>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <img loading="lazy"
                  src="https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800&q=80"
                  alt="King Maker story"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(59,16,99,0.5), rgba(255,107,26,0.2))' }} />
              </div>
            </Motion>
            <Motion delay={0.2}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 text-ember" style={{ background: 'rgba(255,107,26,0.1)' }}>
                The Story
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-ivory mb-4" style={{ letterSpacing: '-0.02em' }}>
                From a $30 Dream to a<br />
                <span className="text-gradient">Global Dynasty</span>
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                King Maker saw what TikTok box battles could be — not just a game of coins, but an interactive arena where engagement, community, and heart determine who rises. The rooted $30 dream that gazed towards a TikTok Universe surprise became a whole solid driver of progress.
              </p>
              <ul className="space-y-3">
                {['Gamified battle format that keeps audiences locked in', 'Community spanning 6 global regions', 'Champion of Champions — the ultimate finale'].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-ember mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Motion>
          </div>
        </div>
      </section>

      {/* King Maker at a Glance */}
      <section className="py-16 sm:py-24" style={{ background: '#120620' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Motion delay={0.1}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 text-ember" style={{ background: 'rgba(255,107,26,0.1)' }}>
                King Maker at a Glance
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-ivory mb-4 leading-tight">
                Rewriting the Rules of<br />
                <span className="text-gradient">Live Streaming</span>
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                The rooted $30 dream gazed towards a TikTok Universe surprise — then came a whole solid driver of progress.
              </p>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                King Maker isn't just a host; he's an architect of engagement. He has pioneered a new wave of interactive entertainment by reimagining the traditional "battle" format — complete with custom sound effects, rapid-fire commentary, and narrative arcs that keep tens of thousands of viewers glued to their screens.
              </p>
              <p className="text-white/60 text-sm leading-relaxed">
                He leverages TikTok's latest tools like TikTok Market Scope to read real-time audience sentiment, and uses Symphony to repurpose epic battle moments into short highlight reels that draw new followers into the lore of his arena.
              </p>
            </Motion>
            <Motion delay={0.2}>
              <div className="space-y-3">
                {[
                  { icon: '🎮', title: 'The Innovator', desc: 'One of the first to integrate interactive polls and AR effects directly into battles — letting the audience vote on dares and influence point multipliers.' },
                  { icon: '🎥', title: 'The Pro Livestreamer', desc: 'With the stamina of a marathon runner and the wit of a stand-up comedian, King Maker commands a room for hours with unpredictable twists.' },
                  { icon: '👑', title: 'He Builds Kings & Queens', desc: 'In his arena, everyone has a chance to claim the throne. He doesn\'t just host battles — he builds champions.' },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4 p-4 rounded-xl border border-white/06" style={{ background: 'rgba(59,16,99,0.2)' }}>
                    <span className="text-2xl flex-shrink-0">{icon}</span>
                    <div>
                      <p className="font-display font-bold text-ivory text-sm mb-1">{title}</p>
                      <p className="text-white/55 text-xs leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Motion>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-24" style={{ background: '#1B1024' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Motion delay={0.1} className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ivory mb-3" style={{ letterSpacing: '-0.02em' }}>
              What We <span className="text-gradient">Stand For</span>
            </h2>
          </Motion>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map(({ emoji, title, img }, i) => (
              <Motion key={title} delay={0.1 + i * 0.08}>
                <div className="group relative rounded-2xl overflow-hidden aspect-square">
                  <img loading="lazy" src={img} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(18,6,32,0.9) 40%, rgba(18,6,32,0.3) 100%)' }} />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-2xl mb-1">{emoji}</p>
                    <p className="font-display font-bold text-ivory text-sm">{title}</p>
                  </div>
                </div>
              </Motion>
            ))}
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-16 sm:py-24" style={{ background: '#120620' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: 'Mission', title: 'Find, Honor & Empower', body: 'Connecting rising creators with platform, mentorship, and community.', img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80' },
              { label: 'Vision', title: 'A Global Celebration', body: 'Where shining is not solitary — it\'s a collective triumph.', img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80' },
            ].map(({ label, title, body, img }, i) => (
              <Motion key={label} delay={0.1 + i * 0.1}>
                <div className="relative rounded-2xl overflow-hidden min-h-[240px] flex items-end">
                  <img loading="lazy" src={img} alt={label} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(18,6,32,0.95) 50%, rgba(18,6,32,0.4) 100%)' }} />
                  <div className="relative z-10 p-6">
                    <span className="text-xs font-bold text-ember uppercase tracking-widest mb-2 block">{label}</span>
                    <h3 className="font-display font-bold text-ivory text-xl mb-2">{title}</h3>
                    <p className="text-white/60 text-sm">{body}</p>
                  </div>
                </div>
              </Motion>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-24" style={{ background: '#120620' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Motion delay={0.1} className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ivory mb-3" style={{ letterSpacing: '-0.02em' }}>
              The <span className="text-gradient">Team</span>
            </h2>
          </Motion>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {team.map(({ name, role, tag, url, photo, accent }, i) => (
              <Motion key={name} delay={0.15 + i * 0.1}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="group block relative rounded-2xl overflow-hidden aspect-[3/4]">
                  <img loading="lazy"
                    src={photo}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.target.src = `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80` }}
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(18,6,32,0.95) 40%, transparent 100%)' }} />
                  <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: accent }} />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest mb-1 block" style={{ color: accent }}>{role}</span>
                    <p className="font-display font-bold text-ivory text-lg">{name}</p>
                    <p className="text-white/50 text-xs mt-1">{tag}</p>
                    <span className="inline-flex items-center gap-1 mt-3 text-xs text-white/40 group-hover:text-white/70 transition-colors">
                      View TikTok <span className="w-3 h-3 block">{Icons.arrowRight}</span>
                    </span>
                  </div>
                </a>
              </Motion>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative min-h-[280px] flex items-center overflow-hidden">
        <img loading="lazy"
          src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1400&q=80"
          alt="Join the dynasty"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(59,16,99,0.85)' }} />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
          <Motion delay={0.1}>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ivory mb-4" style={{ letterSpacing: '-0.02em' }}>
              Ready to Join the Dynasty?
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://www.tiktok.com/@kingmakernevergivesup"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 text-sm font-bold text-white rounded-lg transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)', borderRadius: 6 }}
              >
                Follow King Maker
              </a>
              <Link
                to="/how-to-join"
                className="px-6 py-3 text-sm font-medium text-white rounded-lg border border-white/20 hover:border-white/40 transition-all"
              >
                How to Join
              </Link>
            </div>
          </Motion>
        </div>
      </section>
    </main>
  )
}

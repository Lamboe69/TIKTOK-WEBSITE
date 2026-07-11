import { Link } from 'react-router-dom'
import { Icons } from '../components/Icons'
import Particles from '../components/Particles'
import useAnimatedCounter from '../hooks/useAnimatedCounter'

function AnimatedStat({ end, duration, label, iconWrapClass, icon }) {
  const [ref, count] = useAnimatedCounter(end, duration)
  return (
    <div className="text-center">
      <span className={`w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full ${iconWrapClass}`}>
        <span className="w-5 h-5 block text-white">{icon}</span>
      </span>
      <p className="font-display font-bold text-3xl sm:text-4xl text-dynasty-charcoal">{count.toLocaleString()}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  )
}

export default function About() {
  const chapters = [
    {
      num: 1,
      title: 'The Beginning',
      color: 'dynasty-orange',
      icon: Icons.lightbulb,
      text: 'A $30 dream and a phone screen. King Maker saw what TikTok box battles could be — not just a game of coins, but an interactive arena where engagement, community, and heart determine who rises.',
    },
    {
      num: 2,
      title: 'The Arena',
      color: 'dynasty-purple',
      icon: Icons.swords,
      text: 'Interactive polls, narrative-driven battles, and a gamified format that turns every session into an event people plan their evenings around.',
    },
    {
      num: 3,
      title: 'The Community',
      color: 'dynasty-orange',
      icon: Icons.users,
      text: 'From the first livestream to a community spanning continents — a movement built on loyalty, creativity, and shared purpose.',
    },
  ]

  const glanceItems = [
    { icon: Icons.target, title: 'Theatrical Battles', desc: 'Each battle is a performance, not just a game.', iconClass: 'text-dynasty-orange', bgClass: 'bg-dynasty-orange/10' },
    { icon: Icons.users, title: 'Community First', desc: 'Every viewer is a participant in the dynasty.', iconClass: 'text-dynasty-purple', bgClass: 'bg-dynasty-purple/10' },
    { icon: Icons.trophy, title: 'Gamified Format', desc: 'Polls, rewards, and ranks keep the stakes real.', iconClass: 'text-dynasty-orange', bgClass: 'bg-dynasty-orange/10' },
    { icon: Icons.globe, title: 'Global Reach', desc: 'Connecting creators and fans across continents.', iconClass: 'text-dynasty-purple', bgClass: 'bg-dynasty-purple/10' },
  ]

  const team = [
    {
      name: 'King Mufasa',
      role: 'General Manager',
      url: 'https://www.tiktok.com/@kingmufasa781',
      icon: Icons.shield,
      photo: '/team/mufasa.jpg',
    },
    {
      name: 'King Maker',
      role: 'Pro Livestreamer / Godsent Box Battle Host',
      url: 'https://www.tiktok.com/@kingmakernevergivesup',
      icon: Icons.crown,
      photo: '/team/maker.jpg',
    },
  ]

  return (
    <main>

      {/* ═══════════ SECTION 1 — HERO ═══════════ */}
      <section className="relative bg-dynasty-charcoal pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden">
        <Particles count={30} color="#FF7A00" />
        <Particles count={20} color="#5B2A86" />

        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-dynasty-purple/15 rounded-full blur-[100px] animate-drift pointer-events-none" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-dynasty-orange/12 rounded-full blur-[90px] animate-drift pointer-events-none" style={{ animationDuration: '12s' }} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="relative inline-block mb-8">
            <span className="absolute inset-0 w-28 h-28 mx-auto my-auto rounded-full border-2 border-dynasty-orange/40 animate-pulse-ring" />
            <span className="relative flex items-center justify-center w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-dynasty-orange to-dynasty-orange-dark shadow-lg shadow-dynasty-orange/25">
              <span className="w-10 h-10 block text-white animate-float">{Icons.crown}</span>
            </span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
            <span className="text-gradient-animated">KING MAKER</span>
          </h1>
          <p className="font-display font-semibold text-lg sm:text-xl text-dynasty-orange mb-4">
            Pro-Godsent Box Battle Host
          </p>
          <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed mb-10">
            The architect of engagement. Reinventing the TikTok box-battle format — one livestream at a time.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 block text-dynasty-orange">{Icons.trophy}</span>
              <span className="font-display font-bold text-white text-lg">100+</span>
              <span className="text-gray-400 text-sm">Battles</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 block text-dynasty-orange">{Icons.star}</span>
              <span className="font-display font-bold text-white text-lg">50+</span>
              <span className="text-gray-400 text-sm">Winners</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 block text-dynasty-orange">{Icons.users}</span>
              <span className="font-display font-bold text-white text-lg">50K+</span>
              <span className="text-gray-400 text-sm">Followers</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dynasty-cream to-transparent pointer-events-none" />
      </section>

      {/* ═══════════ SECTION 2 — BY THE NUMBERS ═══════════ */}
      <section className="relative bg-dynasty-cream py-20 sm:py-28 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-dynasty-orange/8 rounded-full blur-[100px] animate-drift pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dynasty-orange/10 text-dynasty-orange text-xs font-bold uppercase tracking-wider mb-5">
              <span className="w-4 h-4 block animate-float">{Icons.trendingUp}</span>
              Our Impact
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-dynasty-charcoal">
              By the <span className="text-gradient-animated">Numbers</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { end: 100, duration: 2000, label: 'Box Battles Hosted', icon: Icons.trophy, iconWrap: 'bg-dynasty-orange/15 shadow-sm shadow-dynasty-orange/10' },
              { end: 50, duration: 2000, label: 'Winners Crowned', icon: Icons.star, iconWrap: 'bg-dynasty-purple/15 shadow-sm shadow-dynasty-purple/10' },
              { end: 5000, duration: 2500, label: 'Avg. Live Viewers', icon: Icons.clock, iconWrap: 'bg-dynasty-orange/15 shadow-sm shadow-dynasty-orange/10' },
              { end: 50000, duration: 3000, label: 'Community Members', icon: Icons.users, iconWrap: 'bg-dynasty-purple/15 shadow-sm shadow-dynasty-purple/10' },
            ].map((s) => (
              <div key={s.label} className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 overflow-hidden">
                <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-dynasty-orange/5 to-dynasty-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <AnimatedStat
                  end={s.end}
                  duration={s.duration}
                  label={s.label}
                  icon={s.icon}
                  iconWrapClass={s.iconWrap}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SECTION 3 — THE STORY ═══════════ */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dynasty-purple/10 text-dynasty-purple text-xs font-bold uppercase tracking-wider mb-5">
              <span className="w-4 h-4 block">{Icons.film}</span>
              Our Journey
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-dynasty-charcoal">
              The <span className="text-gradient-animated">Story</span>
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-dynasty-orange via-dynasty-purple to-dynasty-orange" />

            <div className="space-y-12">
              {chapters.map((ch) => (
                <div key={ch.num} className="relative pl-20 sm:pl-24">
                  <span className={`absolute left-1 sm:left-3 top-1 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br ${ch.color === 'dynasty-orange' ? 'from-dynasty-orange to-dynasty-orange-dark' : 'from-dynasty-purple to-dynasty-purple-dark'} text-white shadow-lg z-10`}>
                    <span className="w-5 h-5 block">{ch.icon}</span>
                  </span>

                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <span className={`inline-block px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider mb-3 ${ch.color === 'dynasty-orange' ? 'bg-dynasty-orange/10 text-dynasty-orange' : 'bg-dynasty-purple/10 text-dynasty-purple'}`}>
                      Chapter {ch.num}
                    </span>
                    <h3 className="font-display font-bold text-lg text-dynasty-charcoal mb-2">{ch.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{ch.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SECTION 4 — MEET KING MAKER ═══════════ */}
      <section className="bg-dynasty-cream py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dynasty-purple/10 text-dynasty-purple text-xs font-bold uppercase tracking-wider mb-5">
            <span className="w-4 h-4 block animate-float">{Icons.play}</span>
            Coming Soon
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-dynasty-charcoal mb-8">
            Meet <span className="text-gradient-animated">King Maker</span>
          </h2>

          <div className="w-full max-w-2xl mx-auto aspect-video bg-dynasty-charcoal rounded-2xl flex items-center justify-center relative overflow-hidden mb-6">
            <span className="absolute inset-0 bg-gradient-to-br from-dynasty-purple/10 to-dynasty-orange/10 pointer-events-none" />
            <span className="relative flex items-center justify-center w-20 h-20 rounded-full bg-dynasty-orange/90 shadow-lg shadow-dynasty-orange/30 animate-glow-breathe">
              <span className="w-8 h-8 block text-white ml-1">{Icons.play}</span>
            </span>
          </div>

          <p className="text-sm text-gray-500 max-w-md mx-auto mb-3 leading-relaxed">
            A short video intro from King Maker himself — coming soon. Personal, unscripted, straight from the throne room.
          </p>
          <p className="text-[11px] text-gray-400 italic">Phase 2 — add a 30–60s "Meet King Maker" clip here.</p>
        </div>
      </section>

      {/* ═══════════ SECTION 5 — AT A GLANCE + MISSION/VISION ═══════════ */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
          {/* At a Glance */}
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-dynasty-charcoal mb-8 text-center">
              Kingmaker at a <span className="text-gradient-animated">Glance</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {glanceItems.map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center">
                  <span className={`w-10 h-10 mx-auto mb-3 flex items-center justify-center rounded-full ${item.bgClass}`}>
                    <span className={`w-5 h-5 block ${item.iconClass}`}>{item.icon}</span>
                  </span>
                  <h3 className="font-display font-bold text-sm text-dynasty-charcoal mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mission + Vision */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-8 border border-dynasty-purple/15 shadow-sm relative overflow-hidden">
              <span className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-dynasty-purple to-dynasty-purple-dark rounded-r" />
              <h3 className="font-display font-bold text-lg text-dynasty-charcoal mb-3">Mission</h3>
              <p className="text-sm text-gray-600 leading-relaxed italic mb-5">
                "King Maker exists to find, honor, and empower those who shine among their peers — connecting them with the platform, mentorship, and community to grow from a rising talent into a recognized creator."
              </p>
              <Link
                to="/how-to-join"
                className="inline-flex items-center gap-2 text-xs font-bold text-dynasty-purple hover:text-dynasty-purple-dark transition-colors"
              >
                See How It Works
                <span className="w-3 h-3 block">{Icons.arrowRight}</span>
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-dynasty-orange/15 shadow-sm relative overflow-hidden">
              <span className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-dynasty-orange to-dynasty-orange-dark rounded-r" />
              <h3 className="font-display font-bold text-lg text-dynasty-charcoal mb-3">Vision</h3>
              <p className="text-sm text-gray-600 leading-relaxed italic mb-5">
                "To build a global community where shining is not a solitary pursuit, but a collective celebration."
              </p>
              <a
                href="/#km-lovers"
                className="inline-flex items-center gap-2 text-xs font-bold text-dynasty-orange hover:text-dynasty-orange-dark transition-colors"
              >
                Meet the Community
                <span className="w-3 h-3 block">{Icons.arrowRight}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SECTION 6 — THE INNOVATOR & PRO ═══════════ */}
      <section className="bg-dynasty-cream py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-dynasty-charcoal mb-10 text-center">
            The <span className="text-gradient-animated">Innovator</span> &amp; The <span className="text-gradient-animated">Pro</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="card-tilt bg-white rounded-2xl p-8 border border-dynasty-orange/15 shadow-sm">
              <span className="w-14 h-14 flex items-center justify-center rounded-full bg-dynasty-orange/10 mb-5">
                <span className="w-7 h-7 block text-dynasty-orange">{Icons.lightbulb}</span>
              </span>
              <h3 className="font-display font-bold text-lg text-dynasty-charcoal mb-2">The Innovator</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Interactive polls, gamified battles, AR-style features, and a narrative-driven format that keeps audiences locked in.
                Every battle is designed as an experience, not just a broadcast.
              </p>
            </div>

            <div className="card-tilt bg-white rounded-2xl p-8 border border-dynasty-purple/15 shadow-sm">
              <span className="w-14 h-14 flex items-center justify-center rounded-full bg-dynasty-purple/10 mb-5">
                <span className="w-7 h-7 block text-dynasty-purple">{Icons.play}</span>
              </span>
              <h3 className="font-display font-bold text-lg text-dynasty-charcoal mb-2">The Pro Livestreamer</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Retention, banter, and the "KM DYNASTY" community identity. Every livestream feels like a family gathering —
                not a performance, but a place people come back to because they belong.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SECTION 7 — THE TEAM ═══════════ */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-dynasty-charcoal mb-10 text-center">
            The <span className="text-gradient-animated">Team</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {team.map(({ name, role, url, icon, photo }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-tilt block bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:border-dynasty-purple/20 transition-all duration-300 text-center group"
              >
                <div className="w-24 h-24 mx-auto mb-5 rounded-full overflow-hidden bg-dynasty-purple/10 border-2 border-transparent group-hover:border-gradient-animated shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={photo}
                    alt={name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div
                    className="w-full h-full items-center justify-center text-dynasty-purple hidden"
                    style={{ display: 'none' }}
                  >
                    <span className="w-10 h-10 block">{icon}</span>
                  </div>
                </div>
                <h3 className="font-display font-bold text-lg text-dynasty-charcoal mb-1">{name}</h3>
                <p className="text-xs text-dynasty-purple font-medium mb-3">{role}</p>
                <p className="text-xs text-gray-400 group-hover:text-dynasty-orange transition-colors">
                  View TikTok Profile →
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SECTION 8 — BOTTOM CTA ═══════════ */}
      <section className="relative bg-dynasty-charcoal py-20 sm:py-28 overflow-hidden">
        <Particles count={35} color="#FF7A00" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
            Ready to Join the <span className="text-gradient-animated">Dynasty</span>?
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed mb-10">
            Whether you're a creator, competitor, or fan — there's a place for you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.tiktok.com/@kingmakernevergivesup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-dynasty-orange text-white font-bold text-sm rounded-xl hover:bg-dynasty-orange-dark transition-colors animate-glow-breathe"
            >
              Follow King Maker
              <span className="w-4 h-4 block">{Icons.arrowRight}</span>
            </a>
            <Link
              to="/how-to-join"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border-2 border-white/30 text-white font-bold text-sm rounded-xl hover:border-white/60 hover:bg-white/5 transition-all"
            >
              How to Join
              <span className="w-4 h-4 block">{Icons.arrowRight}</span>
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}

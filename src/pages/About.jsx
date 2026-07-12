import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Icons } from '../components/Icons'
import Motion from '../components/Motion'
import { useTikTokStats, STAT_LABELS } from '../hooks/useTikTokStats'

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

function StatCard({ icon, value, label, color }) {
  return (
    <div className="group rounded-xl border border-brand-100 bg-white p-6 text-center hover:border-brand-200 transition-colors">
      <span className={`w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full ${color === 'text-gold' ? 'bg-gold/10' : 'bg-accent/10'}`}>
        <span className={`w-6 h-6 block ${color}`}>{icon}</span>
      </span>
      <p className={`font-display font-bold text-3xl sm:text-4xl mb-1 ${color === 'text-gold' ? 'text-gold' : 'text-accent'}`}>{value}</p>
      <p className="text-xs text-brand-500 font-medium">{label}</p>
    </div>
  )
}

export default function About() {
  const [moreOpen, setMoreOpen] = useState(false)
  const { stats } = useTikTokStats()

  const numbers = useMemo(() => [
    { icon: Icons.trophy, value: stats.battlesHostedFormatted || '—', label: 'Box Battles Hosted', color: 'text-gold' },
    { icon: Icons.star, value: stats.winnersCrownedFormatted || '—', label: 'Winners Crowned', color: 'text-accent' },
    { icon: Icons.clock, value: stats.avgViewersFormatted || '—', label: 'Avg. Live Viewers', color: 'text-gold' },
    { icon: Icons.users, value: stats.followersFormatted || '—', label: 'Community Members', color: 'text-accent' },
  ], [stats])

  return (
    <main>
      {/* Hero */}
      <section className="py-12 sm:py-16 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="relative w-20 h-20 mx-auto rounded-full bg-gold flex items-center justify-center mb-6">
              <span className="w-10 h-10 block text-white">{Icons.crown}</span>
            </div>
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-brand-900 mb-3 leading-tight">
              KING MAKER
            </h1>
            <p className="font-display font-semibold text-gold text-lg sm:text-xl mb-4">
              Pro-Godsent Box Battle Host
            </p>
            <p className="text-brand-500 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              The architect of engagement. Reinventing the TikTok box-battle format &mdash; one livestream at a time.
            </p>
          </div>

          {/* By the Numbers */}
          <div className="mb-10">
            <Motion>
              <h2 className="font-display font-bold text-xl text-brand-900 mb-6 text-center">
                By the Numbers
              </h2>
              <p className="text-xs text-brand-500 text-center mb-6 italic">
                Real figures. Real impact. (Replace placeholders with verified stats before launch.)
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {numbers.map((n) => (
                  <StatCard key={n.label} {...n} />
                ))}
              </div>
            </Motion>
          </div>

          <div className="space-y-6">
            {/* The Story */}
            <Motion>
              <div className="bg-white rounded-xl border border-brand-100 p-8">
                <h2 className="font-display font-bold text-2xl text-brand-900 mb-8 text-center">
                  <span className="text-gradient">The Story</span>
                </h2>
                <div className="border-l-2 border-accent/20 pl-8 sm:pl-10 space-y-6">
                  {/* Chapter 1 */}
                  <div className="relative">
                    <div className="absolute -left-[2.55rem] sm:-left-[2.8rem] top-0 w-10 h-10 rounded-full bg-gold flex items-center justify-center text-white text-sm font-bold z-10">{Icons.lightbulb}</div>
                    <h3 className="font-display font-bold text-base text-brand-900 mb-2">The Beginning</h3>
                    <p className="text-sm text-brand-500 leading-relaxed">
                      A $30 dream and a phone screen. King Maker saw what TikTok box battles could be &mdash;
                      not just a game of coins, but an interactive arena where engagement, community, and heart determine who rises.
                    </p>
                  </div>
                  {/* Chapter 2 */}
                  <div className="relative">
                    <div className="absolute -left-[2.55rem] sm:-left-[2.8rem] top-0 w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white text-sm font-bold z-10">{Icons.swords}</div>
                    <h3 className="font-display font-bold text-base text-brand-900 mb-2">The Arena</h3>
                    <p className="text-sm text-brand-500 leading-relaxed">
                      Interactive polls, narrative-driven battles, and a gamified format that turns every session into an event
                      people plan their evenings around.
                    </p>
                  </div>
                  {/* Chapter 3 */}
                  <div className="relative">
                    <div className="absolute -left-[2.55rem] sm:-left-[2.8rem] top-0 w-10 h-10 rounded-full bg-gold flex items-center justify-center text-white text-sm font-bold z-10">{Icons.users}</div>
                    <h3 className="font-display font-bold text-base text-brand-900 mb-2">The Community</h3>
                    <p className="text-sm text-brand-500 leading-relaxed">
                      From the first livestream to a community that now spans continents &mdash;
                      a movement built on loyalty, creativity, and shared purpose.
                    </p>
                  </div>
                </div>
                <p className="text-xs text-brand-500 mt-6 italic">
                  * Confirm a real starting date and any verifiable milestones with King Maker before publishing.
                </p>
              </div>
            </Motion>

            {/* Video intro */}
            <Motion>
              <div className="bg-brand-900 rounded-xl p-8 sm:p-10 text-center">
                <span className="w-10 h-10 mx-auto mb-4 block text-gold">{Icons.film}</span>
                <h2 className="font-display font-bold text-xl text-white mb-2">Meet King Maker</h2>
                <p className="text-xs text-brand-500 mb-5 max-w-md mx-auto">
                  A short video intro from King Maker himself &mdash; coming soon. Personal, unscripted, straight from the throne room.
                </p>
                <div className="w-full max-w-lg mx-auto aspect-video bg-brand-800 rounded-xl border border-dashed border-white/10 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center cursor-pointer">
                    <span className="w-6 h-6 text-white ml-1">{Icons.play}</span>
                  </div>
                </div>
                <p className="text-[10px] text-brand-500 mt-3 italic">Phase 2 &mdash; add a 30&ndash;60s &ldquo;Meet King Maker&rdquo; clip here.</p>
              </div>
            </Motion>

            {/* Kingmaker at a Glance */}
            <Motion>
              <div className="bg-white rounded-xl border border-brand-100 p-8">
                <h2 className="font-display font-bold text-xl text-brand-900 mb-3">Kingmaker at a Glance</h2>
                <p className="text-sm text-brand-500 leading-relaxed">
                  A blend of showmanship and strategy. Leveraging TikTok's market scope and Symphony tools,
                  King Maker crafts each battle as a theatre of engagement &mdash; where every participant has a role, every tap matters,
                  and every battle tells a story.
                </p>
              </div>
            </Motion>

            {/* Mission */}
            <Motion>
              <div id="mission" className="bg-white rounded-xl border border-brand-100 p-8 sm:p-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent rounded-r" />
                <span className="text-6xl sm:text-7xl font-display font-bold text-accent/10 absolute top-4 right-6 leading-none">&ldquo;</span>
                <h2 className="font-display font-bold text-xl text-brand-900 mb-4">Mission</h2>
                <p className="text-sm sm:text-base text-brand-500 leading-relaxed italic mb-5 pl-4 border-l-2 border-accent/20">
                  King Maker exists to find, honor, and empower those who shine among their peers &mdash;
                  connecting them with the platform, mentorship, and community to grow from a rising talent into a recognized creator.
                </p>
                <Link
                  to="/how-to-join"
                  className="inline-flex items-center gap-2 text-xs font-bold text-accent hover:text-gold transition-colors"
                >
                  See How It Works
                  <span className="w-3 h-3 block">{Icons.arrowRight}</span>
                </Link>
              </div>
            </Motion>

            {/* Vision */}
            <Motion>
              <div id="vision" className="bg-white rounded-xl border border-brand-100 p-8 sm:p-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gold rounded-r" />
                <span className="text-6xl sm:text-7xl font-display font-bold text-gold/10 absolute top-4 right-6 leading-none">&ldquo;</span>
                <h2 className="font-display font-bold text-xl text-brand-900 mb-4">Vision</h2>
                <p className="text-sm sm:text-base text-brand-500 leading-relaxed italic mb-5 pl-4 border-l-2 border-gold/20">
                  To build a global community where shining is not a solitary pursuit, but a collective celebration.
                </p>
                <a
                  href="/#km-lovers"
                  className="inline-flex items-center gap-2 text-xs font-bold text-gold hover:text-accent transition-colors"
                >
                  Meet the Community
                  <span className="w-3 h-3 block">{Icons.arrowRight}</span>
                </a>
              </div>
            </Motion>

            {/* The Innovator & The Pro */}
            <Motion>
              <div className="rounded-xl border border-brand-100 p-8 sm:p-10">
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-900 mb-8 text-center">
                  The <span className="text-gradient">Innovator</span> &amp; <span className="text-gradient">Pro</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="bg-white rounded-xl p-6 border border-brand-100 hover:border-brand-200 transition-colors">
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gold/10 mb-4">
                      <span className="w-7 h-7 block text-gold">{Icons.lightbulb}</span>
                    </div>
                    <h3 className="font-display font-bold text-base text-brand-900 mb-2">The Innovator</h3>
                    <p className="text-xs sm:text-sm text-brand-500 leading-relaxed">
                      Interactive polls, gamified battles, AR-style features, and a narrative-driven format that keeps audiences locked in.
                      Every battle is designed as an experience, not just a broadcast.
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-brand-100 hover:border-brand-200 transition-colors">
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-accent/10 mb-4">
                      <span className="w-7 h-7 block text-accent">{Icons.play}</span>
                    </div>
                    <h3 className="font-display font-bold text-base text-brand-900 mb-2">The Pro Livestreamer</h3>
                    <p className="text-xs sm:text-sm text-brand-500 leading-relaxed">
                      Retention, banter, and the &ldquo;KM DYNASTY&rdquo; community identity. Every livestream feels like a family gathering &mdash;
                      not a performance, but a place people come back to because they belong.
                    </p>
                  </div>
                </div>
              </div>
            </Motion>

            {/* Team */}
            <div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-900 mb-8 text-center">
                The <span className="text-gradient">Team</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {team.map(({ name, role, url, icon, photo }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white rounded-xl p-8 border border-brand-100 hover:border-brand-200 transition-colors text-center group"
                  >
                    <div className="w-28 h-28 mx-auto mb-5 rounded-full overflow-hidden bg-accent/10 p-1 bg-gradient-to-br from-gold to-accent">
                      <div className="w-full h-full rounded-full overflow-hidden bg-white p-0.5">
                        <img
                          src={photo}
                          alt={name}
                          className="w-full h-full object-cover rounded-full"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextSibling.style.display = 'flex'
                          }}
                        />
                        <div
                          className="w-full h-full items-center justify-center text-accent hidden"
                          style={{ display: 'none' }}
                        >
                          <span className="w-12 h-12 block">{icon}</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="font-display font-bold text-lg text-brand-900 mb-1">{name}</h3>
                    <p className="text-xs text-accent font-semibold mb-2">{role}</p>
                    <p className="text-xs text-brand-500 group-hover:text-gold transition-colors">View TikTok Profile &rarr;</p>
                  </a>
                ))}
              </div>
              <p className="text-[10px] text-brand-500 text-center mt-4 italic">
                Add real headshots for King Mufasa and King Maker before launch.
              </p>
            </div>

            {/* Bottom CTA */}
            <div className="text-center">
              <a
                href="https://www.tiktok.com/@kingmakernevergivesup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-white font-bold text-sm rounded-md hover:bg-accent-dark transition-colors"
              >
                Follow King Maker
                <span className="w-4 h-4 block">{Icons.arrowRight}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

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
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm text-center">
      <span className={`w-8 h-8 mx-auto mb-2 block ${color}`}>{icon}</span>
      <p className="font-display font-bold text-2xl text-dynasty-charcoal">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
    </div>
  )
}

export default function About() {
  const [moreOpen, setMoreOpen] = useState(false)
  const { stats } = useTikTokStats()

  const numbers = useMemo(() => [
    { icon: Icons.trophy, value: stats.battlesHostedFormatted || '—', label: 'Box Battles Hosted', color: 'text-dynasty-orange' },
    { icon: Icons.star, value: stats.winnersCrownedFormatted || '—', label: 'Winners Crowned', color: 'text-dynasty-purple' },
    { icon: Icons.clock, value: stats.avgViewersFormatted || '—', label: 'Avg. Live Viewers', color: 'text-dynasty-orange' },
    { icon: Icons.users, value: stats.followersFormatted || '—', label: 'Community Members', color: 'text-dynasty-purple' },
  ], [stats])

  return (
    <main>
      {/* Hero */}
      <section className="py-20 sm:py-28 bg-dynasty-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="w-12 h-12 mx-auto mb-4 block text-dynasty-orange animate-float">{Icons.crown}</span>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-dynasty-charcoal mb-3">
              <span className="text-gradient-animated">KING MAKER</span> &mdash; Pro-Godsent Box Battle Host
            </h1>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">
              The architect of engagement. Reinventing the TikTok box-battle format.
            </p>
          </div>

          {/* By the Numbers — Section 3.1 */}
          <div className="mb-16 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] bg-dynasty-orange/10 rounded-full blur-[80px] animate-drift" style={{ animationDuration: '12s' }} />
            </div>
            <Motion>
              <h2 className="font-display font-bold text-xl text-dynasty-charcoal mb-6 text-center">
                By the Numbers
              </h2>
              <p className="text-xs text-gray-400 text-center mb-6 italic">
                Real figures. Real impact. (Replace placeholders with verified stats before launch.)
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {numbers.map((n) => (
                  <StatCard key={n.label} {...n} />
                ))}
              </div>
            </Motion>
          </div>

          <div className="space-y-10">
            {/* The Story — Section 3.3 tightened */}
            <Motion>
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <h2 className="font-display font-bold text-xl text-dynasty-charcoal mb-3">The Story</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  It started with a $30 dream and a phone screen. King Maker saw what TikTok box battles could be &mdash;
                  not just a game of coins, but an interactive arena where engagement, community, and heart determine who rises.
                  From the first livestream to a community that now spans continents, he introduced interactive polls,
                  narrative-driven battles, and a gamified format that turns every session into an event people plan their evenings around.
                </p>
                <p className="text-xs text-gray-400 mt-4 italic">
                  * Confirm a real starting date and any verifiable milestones with King Maker before publishing.
                </p>
              </div>
            </Motion>

            {/* Video intro — Section 3.4 */}
            <Motion>
              <div className="bg-dynasty-purple/5 rounded-2xl border border-dynasty-purple/10 p-8 text-center">
                <span className="w-10 h-10 mx-auto mb-3 block text-dynasty-purple">{Icons.film}</span>
                <h2 className="font-display font-bold text-xl text-dynasty-charcoal mb-2">Meet King Maker</h2>
                <p className="text-xs text-gray-500 mb-4 max-w-md mx-auto">
                  A short video intro from King Maker himself &mdash; coming soon. Personal, unscripted, straight from the throne room.
                </p>
                <div className="w-full max-w-md mx-auto aspect-video bg-dynasty-charcoal/5 rounded-xl border border-dashed border-dynasty-purple/20 flex items-center justify-center">
                  <span className="w-12 h-12 text-dynasty-purple/40">{Icons.play}</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-3 italic">Phase 2 — add a 30–60s "Meet King Maker" clip here.</p>
              </div>
            </Motion>

            {/* Kingmaker at a Glance */}
            <Motion>
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <h2 className="font-display font-bold text-xl text-dynasty-charcoal mb-3">Kingmaker at a Glance</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  A blend of showmanship and strategy. Leveraging TikTok's market scope and Symphony tools,
                  King Maker crafts each battle as a theatre of engagement &mdash; where every participant has a role, every tap matters,
                  and every battle tells a story.
                </p>
              </div>
            </Motion>

            {/* Mission — Section 3.5 with CTA */}
            <Motion>
              <div id="mission" className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <h2 className="font-display font-bold text-xl text-dynasty-charcoal mb-3">Mission</h2>
                <p className="text-sm text-gray-600 leading-relaxed italic mb-4">
                  "King Maker exists to find, honor, and empower those who shine among their peers &mdash;
                  connecting them with the platform, mentorship, and community to grow from a rising talent into a recognized creator."
                </p>
                <Link
                  to="/how-to-join"
                  className="inline-flex items-center gap-2 text-xs font-bold text-dynasty-purple hover:text-dynasty-purple-dark transition-colors"
                >
                  See How It Works
                  <span className="w-3 h-3 block">{Icons.arrowRight}</span>
                </Link>
              </div>
            </Motion>

            {/* Vision — Section 3.5 with CTA */}
            <Motion>
              <div id="vision" className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <h2 className="font-display font-bold text-xl text-dynasty-charcoal mb-3">Vision</h2>
                <p className="text-sm text-gray-600 leading-relaxed italic mb-4">
                  "To build a global community where shining is not a solitary pursuit, but a collective celebration."
                </p>
                <a
                  href="/#km-lovers"
                  className="inline-flex items-center gap-2 text-xs font-bold text-dynasty-purple hover:text-dynasty-purple-dark transition-colors"
                >
                  Meet the Community
                  <span className="w-3 h-3 block">{Icons.arrowRight}</span>
                </a>
              </div>
            </Motion>

            {/* The Innovator & The Pro — Section 1 FIX: always visible */}
            <Motion>
              <div className="bg-dynasty-purple/5 rounded-2xl border border-dynasty-purple/10 p-8">
                <h2 className="font-display font-bold text-xl text-dynasty-charcoal mb-6 text-center">
                  The Innovator &amp; The Pro
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-5 border border-gray-100">
                    <span className="w-8 h-8 mb-3 block text-dynasty-orange">{Icons.lightbulb}</span>
                    <h3 className="font-display font-bold text-sm text-dynasty-charcoal mb-1">The Innovator</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Interactive polls, gamified battles, AR-style features, and a narrative-driven format that keeps audiences locked in.
                      Every battle is designed as an experience, not just a broadcast.
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-5 border border-gray-100">
                    <span className="w-8 h-8 mb-3 block text-dynasty-purple">{Icons.play}</span>
                    <h3 className="font-display font-bold text-sm text-dynasty-charcoal mb-1">The Pro Livestreamer</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Retention, banter, and the "KM DYNASTY" community identity. Every livestream feels like a family gathering &mdash;
                      not a performance, but a place people come back to because they belong.
                    </p>
                  </div>
                </div>
              </div>
            </Motion>

            {/* Team — Section 3.2 with photos */}
            <div>
              <h2 className="font-display font-bold text-2xl text-dynasty-charcoal mb-6 text-center">The Team</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {team.map(({ name, role, url, icon, photo }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md hover:border-dynasty-purple/20 transition-all text-center group"
                  >
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-dynasty-purple border-2 border-white shadow-sm group-hover:scale-110 transition-transform">
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
                        className="w-full h-full items-center justify-center text-white hidden"
                        style={{ display: 'none' }}
                      >
                        <span className="w-10 h-10 block">{icon}</span>
                      </div>
                    </div>
                    <h3 className="font-display font-bold text-lg text-dynasty-charcoal">{name}</h3>
                    <p className="text-xs text-dynasty-purple font-medium mb-2">{role}</p>
                    <p className="text-xs text-gray-400">View TikTok Profile</p>
                  </a>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 text-center mt-4 italic">
                Add real headshots for King Mufasa and King Maker before launch.
              </p>
            </div>

            {/* Bottom CTA */}
            <div className="text-center">
              <a
                href="https://www.tiktok.com/@kingmakernevergivesup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-dynasty-orange text-white font-bold text-sm rounded-xl hover:bg-dynasty-orange-dark transition-colors animate-glow-breathe"
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

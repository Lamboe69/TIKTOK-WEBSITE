import { Link } from 'react-router-dom'
import { Icons } from '../Icons'
import Motion from '../Motion'

const perks = [
  {
    icon: Icons.star,
    title: 'Priority Shout-Outs',
    description: 'Get recognized by name during King Maker\'s livestreams. Your loyalty doesn\'t go unnoticed.',
    color: 'from-dynasty-orange to-amber-500',
  },
  {
    icon: Icons.gift,
    title: 'Exclusive Giveaways',
    description: 'Access community-only gifts and prizes that only KM LOVERS receive. This is the inner circle.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Icons.award,
    title: 'Winner Recognition',
    description: 'Special features and recognition during Winners\' Livestream Visit. Your moment to shine.',
    color: 'from-emerald-500 to-teal-500',
  },
]

export default function KMLovers() {
  return (
    <section className="py-20 sm:py-28 bg-dynasty-charcoal text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-dynasty-purple/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-dynasty-orange/10 rounded-full blur-[100px]" />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <Motion variant="fade-up" className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dynasty-orange/10 border border-dynasty-orange/20 text-dynasty-orange text-xs font-bold uppercase tracking-wider mb-5">
            <span className="w-4 h-4 block">{Icons.heart}</span>
            Protect the Dynasty
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
            KM <span className="text-dynasty-orange">LOVERS</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Like, share, follow, report &mdash; KM LOVERS don't just watch, they keep the dynasty alive.
            Your engagement keeps the livestream safe and the community strong.
          </p>
        </Motion>

        {/* Perk cards — bigger, bolder */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-5xl mx-auto mb-12">
          {perks.map(({ icon, title, description, color }, i) => (
            <Motion key={i} variant="fade-up" delay={i * 120}>
              <div className="relative group rounded-2xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] p-6 sm:p-7 hover:bg-white/[0.07] hover:border-white/[0.12] transition-all duration-300 hover:-translate-y-1 h-full">
                {/* Icon with gradient bg */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <span className="w-6 h-6 block text-white">{icon}</span>
                </div>
                <h3 className="font-display font-bold text-white text-base mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
              </div>
            </Motion>
          ))}
        </div>

        {/* CTA row */}
        <Motion variant="fade-up" delay={400} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/how-to-join"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-dynasty-orange text-white font-bold text-sm rounded-xl btn-glow shadow-lg shadow-dynasty-orange/30 hover:bg-dynasty-orange/90 transition-colors"
          >
            Learn the Steps
            <span className="w-4 h-4 block">{Icons.arrowRight}</span>
          </Link>
          <Link
            to="/battle-schedule"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur-sm text-white font-semibold text-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all"
          >
            See Schedule
          </Link>
        </Motion>
      </div>
    </section>
  )
}

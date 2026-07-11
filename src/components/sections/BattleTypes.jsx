import { Link } from 'react-router-dom'
import { Icons } from '../Icons'
import Motion from '../Motion'

const types = [
  {
    icon: Icons.target,
    title: 'Daily Godsent Box Battle',
    description: 'The daily battleground. Show up, tap, pray, and compete to advance to the weekly finale.',
    gradient: 'from-dynasty-purple to-violet-600',
    glow: 'group-hover:shadow-dynasty-purple/20',
    to: '/battle-schedule#daily-godsent',
  },
  {
    icon: Icons.star,
    title: 'Most Beautiful Box Battle',
    description: 'Beauty meets battle. A special edition where sparkle and strategy collide in the box.',
    gradient: 'from-dynasty-orange to-amber-500',
    glow: 'group-hover:shadow-dynasty-orange/20',
    to: '/battle-schedule#most-beautiful',
  },
  {
    icon: Icons.globe,
    title: 'Country Box Battle',
    description: 'Rep your nation. Country pride on the line in the box battle arena.',
    gradient: 'from-dynasty-purple to-indigo-600',
    glow: 'group-hover:shadow-dynasty-purple/20',
    to: '/battle-schedule#country',
  },
  {
    icon: Icons.handshake,
    title: 'Community First',
    description: "It's not about who has the most coins. It's about who lifts others. A pro battle where the winner is chosen by the community \u2013 not just box value.",
    gradient: 'from-dynasty-orange to-rose-500',
    glow: 'group-hover:shadow-dynasty-orange/20',
    to: '/about#mission',
  },
]

export default function BattleTypes() {
  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Animated accent orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-[10%] w-[300px] h-[300px] bg-dynasty-purple/5 rounded-full blur-[100px] animate-drift" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-10 right-[10%] w-[250px] h-[250px] bg-dynasty-orange/5 rounded-full blur-[80px] animate-drift" style={{ animationDuration: '8s', animationDelay: '3s' }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <Motion variant="fade-up" className="text-center mb-14">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-dynasty-charcoal mb-3">
            Battle <span className="text-gradient-animated">Types</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Four ways to compete. Each with its own rules, its own energy, and its own path to the crown.
          </p>
        </Motion>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {types.map(({ icon, title, description, gradient, glow, to }, i) => (
            <Motion key={i} variant="fade-up" delay={i * 100}>
              <Link
                to={to}
                className={`group relative bg-dynasty-cream/50 rounded-2xl p-7 border border-gray-100 hover:border-dynasty-purple/20 block card-tilt overflow-hidden ${glow} hover:shadow-xl transition-all duration-300`}
              >
                {/* Shimmer sweep on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 animate-shimmer-line" />
                </div>

                <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} text-white flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                  {icon}
                </div>
                <h3 className="relative font-display font-bold text-lg text-dynasty-charcoal mb-2 group-hover:text-dynasty-purple transition-colors">{title}</h3>
                <p className="relative text-sm text-gray-500 leading-relaxed">{description}</p>
              </Link>
            </Motion>
          ))}
        </div>
      </div>
    </section>
  )
}

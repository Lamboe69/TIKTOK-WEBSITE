import { Link } from 'react-router-dom'
import { Icons } from '../Icons'
import Motion from '../Motion'

const types = [
  {
    icon: Icons.target,
    title: 'Daily Godsent Box Battle',
    description: 'The daily battleground. Show up, tap, pray, and compete to advance to the weekly finale.',
    color: 'bg-dynasty-purple',
    to: '/battle-schedule#daily-godsent',
  },
  {
    icon: Icons.star,
    title: 'Most Beautiful Box Battle',
    description: 'Beauty meets battle. A special edition where sparkle and strategy collide in the box.',
    color: 'bg-dynasty-orange',
    to: '/battle-schedule#most-beautiful',
  },
  {
    icon: Icons.globe,
    title: 'Country Box Battle',
    description: 'Rep your nation. Country pride on the line in the box battle arena.',
    color: 'bg-dynasty-purple',
    to: '/battle-schedule#country',
  },
  {
    icon: Icons.handshake,
    title: 'Community First',
    description: "It's not about who has the most coins. It's about who lifts others. A pro battle where the winner is chosen by the community \u2013 not just box value.",
    color: 'bg-dynasty-orange',
    to: '/about#mission',
  },
]

export default function BattleTypes() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Motion variant="fade-up" className="text-center mb-14">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-dynasty-charcoal mb-3">
            Battle Types
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Four ways to compete. Each with its own rules, its own energy, and its own path to the crown.
          </p>
        </Motion>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {types.map(({ icon, title, description, color, to }, i) => (
            <Motion key={i} variant="fade-up" delay={i * 100}>
              <Link
                to={to}
                className="group bg-dynasty-cream/50 rounded-2xl p-7 border border-gray-100 hover:border-dynasty-purple/20 block card-hover"
              >
                <div className={`w-12 h-12 rounded-xl ${color} text-white flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  {icon}
                </div>
                <h3 className="font-display font-bold text-lg text-dynasty-charcoal mb-2 group-hover:text-dynasty-purple transition-colors">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
              </Link>
            </Motion>
          ))}
        </div>
      </div>
    </section>
  )
}

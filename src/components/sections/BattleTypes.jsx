import { Link } from 'react-router-dom'
import { Icons } from '../Icons'
import Motion from '../Motion'

const types = [
  {
    icon: Icons.swords,
    title: 'Official Godsent Box Battle',
    description: 'The main event. Every creator gets a fair shot at the crown.',
    to: '/battle-schedule',
    color: 'text-accent',
    bg: 'bg-accent/5',
  },
  {
    icon: Icons.star,
    title: 'Most Beautiful Box Battle',
    description: 'Where creativity meets competition. Beauty in every battle.',
    to: '/battle-schedule',
    color: 'text-gold',
    bg: 'bg-gold/5',
  },
  {
    icon: Icons.globe,
    title: 'Country Box Battle',
    description: 'Rep your nation. Battle for national pride.',
    to: '/battle-schedule',
    color: 'text-accent',
    bg: 'bg-accent/5',
  },
  {
    icon: Icons.trophy,
    title: 'Champion of Champions',
    description: 'Winners only. The elite compete for the ultimate crown.',
    to: '/battle-schedule',
    color: 'text-gold',
    bg: 'bg-gold/5',
  },
]

export default function BattleTypes() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Motion variant="fade-up" className="text-center mb-8">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-900 mb-2">
            Battle <span className="text-gradient">Types</span>
          </h2>
          <p className="text-brand-500 text-sm max-w-md mx-auto">
            Four ways to compete. Each with its own rules and energy.
          </p>
        </Motion>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {types.map(({ icon, title, description, to, color, bg }, i) => (
            <Motion key={i} variant="fade-up" delay={i * 80}>
              <Link
                to={to}
                className="group flex items-start gap-4 p-5 rounded-xl border border-brand-100 hover:border-brand-200 hover:bg-brand-50 transition-all"
              >
                <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
                  <span className={`w-5 h-5 block ${color}`}>{icon}</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-brand-900 mb-1 group-hover:text-accent transition-colors">{title}</h3>
                  <p className="text-brand-500 text-sm leading-relaxed">{description}</p>
                </div>
              </Link>
            </Motion>
          ))}
        </div>
      </div>
    </section>
  )
}

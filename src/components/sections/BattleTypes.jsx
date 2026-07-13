import { Link } from 'react-router-dom'
import Motion from '../Motion'

const types = [
  {
    title: 'Official Godsent Box Battle',
    description: 'The main event. Every creator gets a fair shot at the crown.',
    img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80',
    to: '/battle-schedule',
  },
  {
    title: 'Most Beautiful Box Battle',
    description: 'Where creativity meets competition. Beauty in every battle.',
    img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80',
    to: '/battle-schedule',
  },
  {
    title: 'Country Box Battle',
    description: 'Rep your nation. Battle for national pride.',
    img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80',
    to: '/battle-schedule',
  },
  {
    title: 'Champion of Champions',
    description: 'Winners only. The elite compete for the ultimate crown.',
    img: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&q=80',
    to: '/battle-schedule',
  },
]

export default function BattleTypes() {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden" style={{ background: '#120620' }}>
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(59,16,99,0.45) 0%, transparent 70%)' }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <Motion delay={0.1} className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ivory mb-3">
            Battle <span className="text-gradient">Types</span>
          </h2>
          <p className="text-white/50 text-sm max-w-md mx-auto">
            Four ways to compete. Each with its own rules and energy.
          </p>
        </Motion>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {types.map(({ title, description, img, to }, i) => (
            <Motion key={i} delay={0.1 + i * 0.08}>
              <Link to={to} className="group block relative rounded-2xl overflow-hidden aspect-[3/4]">
                <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(18,6,32,0.95) 40%, rgba(18,6,32,0.2) 100%)' }} />
                {/* Ember top line on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-ember scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-display font-bold text-ivory text-sm mb-1 leading-snug">{title}</h3>
                  <p className="text-white/50 text-xs leading-relaxed">{description}</p>
                </div>
              </Link>
            </Motion>
          ))}
        </div>
      </div>
    </section>
  )
}

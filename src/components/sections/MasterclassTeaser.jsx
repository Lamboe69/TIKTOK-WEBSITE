import { Icons } from '../Icons'
import Motion from '../Motion'
import { Link } from 'react-router-dom'

const plans = [
  {
    title: '1-on-1 Consultation',
    price: '$300',
    desc: 'Private Session · 1 Hour',
    icon: Icons.lightbulb,
    badge: null,
  },
  {
    title: 'Dynasty Masterclass',
    price: '$500',
    desc: '5 Weeks Program',
    icon: Icons.star,
    badge: 'Popular',
  },
  {
    title: 'Mentorship',
    price: '$1,200',
    desc: '5 Weeks + Ongoing',
    icon: Icons.crown,
    badge: 'Premium',
  },
]

export default function MasterclassTeaser() {
  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Background orb */}
      <div
        className="absolute top-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-dynasty-orange/10 blur-[120px] animate-drift"
        style={{ animationDuration: '12s' }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <Motion delay={0.1}>
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-dynasty-charcoal mb-3">
              Master Your <span className="text-gradient-animated">Craft</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Learn directly from King Maker — the strategies, the systems, the mindset that built KM DYNASTY.
            </p>
          </div>
        </Motion>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <Motion key={plan.title} delay={0.15 * i} variant="fade-up">
              <div className="relative bg-white rounded-2xl border border-gray-200 shadow-sm p-8 flex flex-col items-center text-center hover:shadow-md transition-all duration-300 group">
                {plan.badge && (
                  <span className="absolute top-4 right-4 bg-dynasty-orange/10 text-dynasty-orange text-xs font-bold px-2 py-0.5 rounded-full">
                    {plan.badge}
                  </span>
                )}
                <div className="w-14 h-14 rounded-full bg-dynasty-orange/10 flex items-center justify-center mb-5 text-dynasty-orange group-hover:scale-110 transition-transform duration-300">
                  <span className="w-7 h-7 block">{plan.icon}</span>
                </div>
                <h3 className="font-display font-bold text-lg text-dynasty-charcoal mb-2">{plan.title}</h3>
                <p className="text-3xl font-display font-bold text-dynasty-charcoal mb-1">{plan.price}</p>
                <p className="text-gray-500 text-sm mb-6">{plan.desc}</p>
                <Link
                  to="/masterclass"
                  className="mt-auto inline-flex items-center gap-2 px-6 py-2.5 bg-dynasty-orange text-white text-sm font-semibold rounded-xl hover:bg-dynasty-orange/90 transition-colors animate-glow-breathe"
                >
                  Get Started
                </Link>
              </div>
            </Motion>
          ))}
        </div>

        <Motion delay={0.5}>
          <div className="text-center mt-12">
            <Link
              to="/masterclass"
              className="inline-flex items-center gap-2 px-8 py-3 bg-dynasty-charcoal text-white font-semibold rounded-xl hover:bg-dynasty-charcoal/90 transition-colors animate-glow-breathe"
            >
              Explore Masterclass →
            </Link>
          </div>
        </Motion>
      </div>
    </section>
  )
}

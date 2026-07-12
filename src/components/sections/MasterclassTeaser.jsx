import { Link } from 'react-router-dom'
import { Icons } from '../Icons'
import Motion from '../Motion'

const plans = [
  {
    title: 'Starter',
    price: 'Free',
    desc: 'Get the basics. Start your journey.',
    icon: Icons.zap,
  },
  {
    title: 'Pro',
    price: '$29',
    desc: 'Advanced strategies. Weekly coaching.',
    icon: Icons.star,
    badge: 'Popular',
  },
  {
    title: 'Elite',
    price: '$99',
    desc: '1-on-1 mentorship. Full access.',
    icon: Icons.crown,
  },
]

export default function MasterclassTeaser() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Motion delay={0.1}>
          <div className="text-center mb-8">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-900 mb-2">
              Master Your Craft
            </h2>
            <p className="text-brand-500 text-sm max-w-md mx-auto">
              Learn directly from King Maker — the strategies, the systems, the mindset.
            </p>
          </div>
        </Motion>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <Motion key={plan.title} delay={0.15 * i} variant="fade-up">
              <div className="relative bg-brand-50 rounded-xl border border-brand-100 p-5 flex flex-col items-center text-center hover:border-brand-200 transition-colors">
                {plan.badge && (
                  <span className="absolute top-3 right-3 bg-accent/10 text-accent text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {plan.badge}
                  </span>
                )}
                <div className="w-10 h-10 rounded-lg bg-accent/5 flex items-center justify-center mb-3">
                  <span className="w-5 h-5 block text-accent">{plan.icon}</span>
                </div>
                <h3 className="font-display font-bold text-sm text-brand-900 mb-1">{plan.title}</h3>
                <p className="text-2xl font-display font-bold text-brand-900 mb-1">{plan.price}</p>
                <p className="text-brand-500 text-xs mb-4">{plan.desc}</p>
                <Link
                  to="/masterclass"
                  className="mt-auto px-4 py-2 bg-brand-900 text-white text-xs font-semibold rounded-md hover:bg-brand-800 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </Motion>
          ))}
        </div>

        <Motion delay={0.5}>
          <div className="text-center mt-6">
            <Link
              to="/masterclass"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-50 text-brand-900 text-sm font-semibold rounded-lg border border-brand-100 hover:bg-brand-100 transition-colors"
            >
              Explore Masterclass →
            </Link>
          </div>
        </Motion>
      </div>
    </section>
  )
}

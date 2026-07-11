import { Icons } from '../Icons'
import Motion from '../Motion'

const values = [
  {
    icon: Icons.check,
    text: "Keep the community's esteem high \u2013 every member matters, big box or small.",
  },
  {
    icon: Icons.check,
    text: 'Push forward positively \u2013 no hate, no toxicity, family energy even in the hottest battles.',
  },
]

export default function DailyQuoteValues() {
  return (
    <section className="py-16 bg-dynasty-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Motion variant="scale-in">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 card-hover">
            <h3 className="font-display font-bold text-xl text-dynasty-charcoal mb-6 text-center">
              Our Guiding Values
            </h3>
            <div className="space-y-4">
              {values.map(({ icon, text }, i) => (
                <Motion key={i} variant="fade-left" delay={i * 150}>
                  <div className="flex items-start gap-3 group">
                    <span className="w-6 h-6 flex-shrink-0 mt-0.5 text-dynasty-orange group-hover:scale-125 transition-transform duration-300">{icon}</span>
                    <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
                  </div>
                </Motion>
              ))}
            </div>
          </div>
        </Motion>
      </div>
    </section>
  )
}

import PayPalDonate from '../PayPalDonate'
import { Icons } from '../Icons'
import Motion from '../Motion'

const impactAreas = [
  { icon: Icons.gift, label: 'Community giveaways & prizes' },
  { icon: Icons.handshake, label: 'Charity drives & outreach events' },
  { icon: Icons.users, label: 'Creator support & development' },
]

export default function GiveBack() {
  return (
    <section className="py-20 sm:py-28 bg-dynasty-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <Motion variant="fade-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-dynasty-orange/10 rounded-full text-dynasty-orange text-xs font-semibold mb-5">
              <span className="w-3.5 h-3.5 block animate-breathe">{Icons.heart}</span>
              Give Back
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-dynasty-charcoal mb-4">
              Support the Dynasty
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Every donation fuels the family. Your support powers community giveaways, charity drives,
              creator development, and bigger prizes for the fighters who show up every day.
              KM DYNASTY isn't just a battle — it's a movement. Help us keep it growing.
            </p>

            <div className="space-y-3 mb-8">
              {impactAreas.map(({ icon, label }, i) => (
                <Motion key={i} variant="fade-left" delay={i * 120}>
                  <div className="flex items-center gap-3 group">
                    <span className="w-8 h-8 rounded-lg bg-dynasty-purple/10 flex items-center justify-center flex-shrink-0 group-hover:bg-dynasty-purple/20 group-hover:scale-110 transition-all duration-300">
                      <span className="w-4 h-4 block text-dynasty-purple">{icon}</span>
                    </span>
                    <span className="text-sm text-dynasty-charcoal font-medium">{label}</span>
                  </div>
                </Motion>
              ))}
            </div>
          </Motion>

          <Motion variant="fade-left" delay={200}>
            <PayPalDonate variant="full" />
          </Motion>
        </div>
      </div>
    </section>
  )
}

import { Icons } from '../Icons'
import Motion from '../Motion'

const testimonials = [
  { name: 'Sarah M.', role: 'Creator', text: 'KM DYNASTY gave me a platform I never had. The battles are electric and the community is family.' },
  { name: 'James K.', role: 'Viewer', text: 'I watch every single battle. King Maker makes it feel like a real event. Never boring.' },
  { name: 'Grace N.', role: 'Champion', text: 'Winning my first battle changed everything. More followers, more confidence, more opportunities.' },
  { name: 'David O.', role: 'Creator', text: 'The公平 format is what sets this apart. No rigs, no favors — just pure talent and engagement.' },
  { name: 'Maria L.', role: 'Supporter', text: 'The energy in these battles is unmatched. King Maker truly cares about every creator involved.' },
]

export default function Testimonials() {
  return (
    <section className="py-10 sm:py-14 bg-brand-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Motion delay={0.1}>
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/5 text-accent text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-3.5 h-3.5 block">{Icons.star}</span>
              Testimony & Feedback
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-900 mb-2">
              What Our Family Says
            </h2>
            <p className="text-brand-500 text-sm max-w-md mx-auto">
              Real words from real members of the KM Dynasty community.
            </p>
          </div>
        </Motion>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <Motion key={i} variant="fade-up" delay={i * 80}>
              <div className="bg-white rounded-xl p-5 border border-brand-100 hover:border-brand-200 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center">
                    <span className="text-brand-600 text-xs font-bold">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-brand-900 text-sm font-semibold">{t.name}</p>
                    <p className="text-brand-400 text-xs">{t.role}</p>
                  </div>
                </div>
                <p className="text-brand-600 text-sm leading-relaxed">"{t.text}"</p>
              </div>
            </Motion>
          ))}
        </div>
      </div>
    </section>
  )
}

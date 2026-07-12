import { Icons } from '../Icons'
import Motion from '../Motion'

const steps = [
  { num: '1', title: 'Copy the Crown Symbol', description: 'Grab the official KM Dynasty crown emoji from our guide.' },
  { num: '2', title: 'Add to Your TikTok Name', description: 'Place it at the start or end of your display name.' },
  { num: '3', title: 'Join the Community', description: 'You\'re now part of the family. Compete, connect, rise.' },
]

export default function BrandIdentity() {
  return (
    <section className="py-10 sm:py-14 bg-brand-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <Motion delay={0.1}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/5 text-accent text-xs font-semibold uppercase tracking-wider mb-3">
              Join the Family
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-900 mb-2">
              How to Join the<br />
              <span className="text-gradient">KM Dynasty Family</span>
            </h2>
            <p className="text-brand-500 text-sm mb-5 max-w-md">
              Add the official KM Dynasty symbols to your TikTok name and become part of the family.
            </p>

            <div className="space-y-3">
              {steps.map((step, idx) => (
                <Motion key={step.num} delay={0.15 + idx * 0.1}>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-md bg-brand-900 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {step.num}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-brand-900 text-sm mb-0.5">
                        {step.title}
                      </h3>
                      <p className="text-brand-500 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Motion>
              ))}
            </div>
          </Motion>

          <Motion delay={0.2}>
            <div className="bg-white rounded-xl border border-brand-100 p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👑</span>
              </div>
              <h3 className="font-display font-bold text-lg text-brand-900 mb-2">
                The Dynasty Crown
              </h3>
              <p className="text-brand-500 text-sm mb-4">
                This symbol represents your membership in the KM Dynasty family.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 rounded-lg">
                <span className="text-2xl">👑</span>
                <span className="text-brand-600 text-sm font-mono">👑 KM Dynasty</span>
              </div>
            </div>
          </Motion>
        </div>
      </div>
    </section>
  )
}

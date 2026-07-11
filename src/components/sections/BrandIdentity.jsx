import Motion from '../Motion'
import { Icons } from '../Icons'

const steps = [
  {
    num: '01',
    title: 'Open Your TikTok Profile',
    description: 'Go to your TikTok profile and tap "Edit Profile" to update your display name.',
  },
  {
    num: '02',
    title: 'Add the Dynasty Symbols',
    description: 'Place the symbols 🔱👑 beside your TikTok display name. These two symbols identify you as a member of the KM Dynasty Family.',
  },
  {
    num: '03',
    title: 'Save & Join the Family',
    description: 'Save your profile. You are now officially part of the KM Dynasty Family — and growing.',
  },
]

export default function BrandIdentity() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50 relative overflow-hidden">
      {/* Animated background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-[20%] w-[300px] h-[300px] bg-dynasty-purple/5 rounded-full blur-[100px] animate-drift" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-0 right-[20%] w-[250px] h-[250px] bg-dynasty-orange/5 rounded-full blur-[80px] animate-drift" style={{ animationDuration: '8s', animationDelay: '4s' }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — content */}
          <Motion delay={0.1}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dynasty-purple/10 text-dynasty-purple text-xs font-semibold uppercase tracking-wider mb-4">
              🔱👑
              Join the Family
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-dynasty-charcoal mb-4">
              How to Join the<br />
              <span className="text-gradient-animated">KM Dynasty Family</span>
            </h2>
            <p className="text-gray-500 mb-8 max-w-md">
              Add the official KM Dynasty symbols to your TikTok name and become part of the family.
            </p>

            <div className="space-y-6">
              {steps.map((step, idx) => (
                <Motion key={step.num} delay={0.15 + idx * 0.1}>
                  <div className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-dynasty-purple text-white text-sm font-bold flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-dynasty-purple/20">
                      {step.num}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-dynasty-charcoal text-sm mb-1">
                        {step.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Motion>
              ))}
            </div>

            <Motion delay={0.5}>
              <a
                href="https://vt.tiktok.com/ZS98E513CAjTU-qVVZf/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-dynasty-orange text-white text-sm font-semibold rounded-xl hover:bg-dynasty-orange/90 transition-colors btn-glow shadow-lg shadow-dynasty-orange/20"
              >
                <span className="w-4 h-4 block">{Icons.play}</span>
                Join the TikTok Group
              </a>
            </Motion>
          </Motion>

          {/* Right — preview card */}
          <Motion delay={0.2}>
            <div className="relative">
              <div className="absolute inset-0 bg-dynasty-purple/10 rounded-3xl rotate-3 scale-105 animate-drift" style={{ animationDuration: '10s' }} />
              <div className="relative bg-white rounded-2xl border border-gray-100 shadow-xl p-8 text-center card-tilt overflow-hidden">
                {/* Shimmer sweep */}
                <div className="absolute inset-0 animate-shimmer-line pointer-events-none" />

                <div className="relative w-20 h-20 rounded-2xl bg-dynasty-purple/10 flex items-center justify-center mx-auto mb-5">
                  <span className="text-4xl">🔱👑</span>
                </div>
                <h3 className="relative font-display text-xl font-bold text-dynasty-charcoal mb-2">
                  Your TikTok Name
                </h3>
                <div className="relative bg-gray-50 rounded-xl px-5 py-3 mb-4 border-gradient-animated">
                  <p className="text-dynasty-charcoal font-semibold text-lg">
                    🔱👑 Your Name
                  </p>
                </div>
                <p className="relative text-gray-400 text-xs">
                  This is how the Dynasty family identifies you across TikTok.
                </p>
              </div>
            </div>
          </Motion>
        </div>
      </div>
    </section>
  )
}

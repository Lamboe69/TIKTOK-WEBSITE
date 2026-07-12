import Motion from '../Motion'

const steps = [
  { num: '1', title: 'Copy the Crown Symbol', description: 'Grab the official KM Dynasty crown emoji from our guide.' },
  { num: '2', title: 'Add to Your TikTok Name', description: 'Place it at the start or end of your display name.' },
  { num: '3', title: 'Join the Community', description: "You're now part of the family. Compete, connect, rise." },
]

export default function BrandIdentity() {
  return (
    <section className="py-16 sm:py-24" style={{ background: '#1B1024' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image with floating card */}
          <Motion delay={0.1}>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80"
                alt="TikTok creator"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'rgba(27,16,36,0.4)' }} />
              {/* Floating name card */}
              <div className="absolute bottom-6 left-6 right-6 glass rounded-xl px-4 py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-ember/20 border border-ember/40 flex items-center justify-center text-lg">👑</div>
                <div>
                  <p className="text-ivory font-display font-bold text-sm">🔱👑 Your Name</p>
                  <p className="text-white/50 text-xs">KM Dynasty Member</p>
                </div>
              </div>
            </div>
          </Motion>

          {/* Steps */}
          <div>
            <Motion delay={0.15}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 text-ember" style={{ background: 'rgba(255,107,26,0.1)' }}>
                Join the Family
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-ivory mb-3">
                How to Join the<br />
                <span className="text-gradient">KM Dynasty Family</span>
              </h2>
              <p className="text-white/50 text-sm mb-8 max-w-md">
                Add the official KM Dynasty symbols to your TikTok name and become part of the family.
              </p>
            </Motion>

            <div className="space-y-0">
              {steps.map(({ num, title, description }, i) => (
                <Motion key={num} delay={0.2 + i * 0.1}>
                  <div className={`flex gap-5 py-5 ${i < steps.length - 1 ? 'border-b border-white/08' : ''}`}>
                    <div className="w-8 h-8 rounded-lg bg-ember flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{num}</div>
                    <div>
                      <h3 className="font-display font-bold text-ivory text-sm mb-1">{title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{description}</p>
                    </div>
                  </div>
                </Motion>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

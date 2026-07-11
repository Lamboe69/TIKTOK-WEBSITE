import Motion from '../Motion'
import topGifters from '../../data/topGifters'
import { Icons } from '../Icons'

const roleStyles = {
  'Royal Supporter': {
    ring: 'ring-dynasty-orange',
    badge: 'bg-dynasty-orange text-white',
    border: 'border-dynasty-orange/20 hover:border-dynasty-orange/40',
    gradient: 'from-dynasty-orange/5 to-transparent',
  },
  'Dynasty Pillar': {
    ring: 'ring-dynasty-purple',
    badge: 'bg-dynasty-purple text-white',
    border: 'border-dynasty-purple/20 hover:border-dynasty-purple/40',
    gradient: 'from-dynasty-purple/5 to-transparent',
  },
  'Loyal Supporter': {
    ring: 'ring-gray-300',
    badge: 'bg-gray-200 text-gray-600',
    border: 'border-gray-200 hover:border-gray-300',
    gradient: 'from-gray-50 to-transparent',
  },
}

export default function CommunityRecognition() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Motion delay={0.1}>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dynasty-purple/10 text-dynasty-purple text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-4 h-4 block">{Icons.award}</span>
              Kingdom Family
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-dynasty-charcoal mb-3">
              Monthly Top Gifters
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              These are the most dedicated members of the KM Dynasty family. Their loyalty and generosity keep the battles alive.
            </p>
          </div>
        </Motion>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topGifters.map((gifter, idx) => {
            const style = roleStyles[gifter.role] || roleStyles['Loyal Supporter']
            return (
              <Motion key={gifter.handle} delay={idx * 0.08}>
                <div className={`relative group rounded-2xl border bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${style.border}`}>
                  {/* Top gradient strip */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${style.gradient}`} />

                  {/* Rank badge */}
                  {idx < 3 && (
                    <div className={`absolute top-4 right-4 w-9 h-9 rounded-full ${style.badge} text-sm font-bold flex items-center justify-center shadow-lg z-10`}>
                      #{idx + 1}
                    </div>
                  )}

                  <div className="p-6 pt-5">
                    {/* Photo — large, centered, with ring */}
                    <div className="flex justify-center mb-4">
                      <div className={`relative`}>
                        <div className={`w-28 h-28 rounded-full overflow-hidden ring-4 ${style.ring} shadow-lg`}>
                          {gifter.photo ? (
                            <img src={gifter.photo} alt={gifter.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-dynasty-purple/10 flex items-center justify-center text-4xl">{gifter.badge}</div>
                          )}
                        </div>
                        {/* Badge emoji overlay */}
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-lg">
                          {gifter.badge}
                        </div>
                      </div>
                    </div>

                    {/* Name + role */}
                    <div className="text-center mb-3">
                      <h3 className="font-display font-bold text-dynasty-charcoal text-base mb-1">
                        {gifter.name}
                      </h3>
                      <span className={`inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full ${style.badge}`}>
                        {gifter.role}
                      </span>
                    </div>

                    {/* Bio */}
                    <p className="text-gray-500 text-sm leading-relaxed text-center mb-4">
                      {gifter.bio}
                    </p>

                    {/* TikTok link */}
                    <div className="flex justify-center">
                      <a
                        href={gifter.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-dynasty-purple/5 border border-gray-100 hover:border-dynasty-purple/20 rounded-xl text-dynasty-purple text-xs font-semibold transition-all"
                      >
                        <span className="w-3.5 h-3.5 block">{Icons.tiktok}</span>
                        {gifter.handle}
                      </a>
                    </div>
                  </div>
                </div>
              </Motion>
            )
          })}
        </div>
      </div>
    </section>
  )
}

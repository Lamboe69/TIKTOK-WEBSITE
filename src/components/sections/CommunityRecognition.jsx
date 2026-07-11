import { useState } from 'react'
import Motion from '../Motion'
import topGifters from '../../data/topGifters'
import { Icons } from '../Icons'

const roleColors = {
  'Royal Supporter': 'bg-dynasty-orange/10 text-dynasty-orange border-dynasty-orange/20',
  'Dynasty Pillar': 'bg-dynasty-purple/10 text-dynasty-purple border-dynasty-purple/20',
  'Loyal Supporter': 'bg-white/5 text-gray-400 border-white/10',
}

export default function CommunityRecognition() {
  const [hoveredIdx, setHoveredIdx] = useState(null)

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {topGifters.map((gifter, idx) => (
            <Motion key={gifter.handle} delay={idx * 0.08}>
              <div
                className="relative group rounded-2xl border border-gray-100 bg-gray-50/50 p-5 transition-all duration-300 hover:shadow-lg hover:border-dynasty-purple/20 hover:-translate-y-1"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {idx < 3 && (
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-dynasty-orange text-white text-xs font-bold flex items-center justify-center shadow-md">
                    #{idx + 1}
                  </div>
                )}

                <div className="flex flex-col items-center text-center mb-3">
                  <div className="w-28 h-28 rounded-2xl overflow-hidden bg-dynasty-purple/10 mb-3">
                    {gifter.photo ? (
                      <img src={gifter.photo} alt={gifter.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">{gifter.badge}</div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-dynasty-charcoal text-sm">
                      {gifter.name}
                    </h3>
                    <span className={`inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full mt-1 border ${roleColors[gifter.role] || roleColors['Loyal Supporter']}`}>
                      {gifter.role}
                    </span>
                  </div>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                  {gifter.bio}
                </p>

                <a
                  href={gifter.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-dynasty-purple text-xs font-semibold hover:underline"
                >
                  <span className="w-3.5 h-3.5 block">{Icons.tiktok}</span>
                  {gifter.handle}
                </a>
              </div>
            </Motion>
          ))}
        </div>
      </div>
    </section>
  )
}

import { Icons } from '../Icons'
import Motion from '../Motion'

const topGifters = [
  { name: 'Gift Queen', role: 'Top Gifter', badges: 12 },
  { name: 'Diamond Hands', role: 'Loyal Supporter', badges: 8 },
  { name: 'Battle Boss', role: 'Champion', badges: 15 },
  { name: 'Crown Bearer', role: 'Rising Star', badges: 5 },
  { name: 'Dynasty Legend', role: 'Hall of Fame', badges: 20 },
  { name: 'Heart of Gold', role: 'Community Pillar', badges: 10 },
]

export default function CommunityRecognition() {
  return (
    <section className="py-10 sm:py-14 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Motion delay={0.1}>
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/5 text-accent text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-3.5 h-3.5 block">{Icons.award}</span>
              Kingdom Family
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-900 mb-2">
              Monthly Top <span className="text-gradient">Gifters</span>
            </h2>
            <p className="text-brand-500 text-sm max-w-md mx-auto">
              The most dedicated members of the KM Dynasty family.
            </p>
          </div>
        </Motion>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topGifters.map((gifter, idx) => (
            <Motion key={gifter.name} variant="fade-up" delay={idx * 80}>
              <div className="flex items-center gap-3 p-4 rounded-xl border border-brand-100 hover:border-brand-200 hover:bg-brand-50 transition-all">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-brand-600 text-sm font-bold">{gifter.name[0]}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-brand-900 text-sm font-semibold truncate">{gifter.name}</p>
                  <p className="text-brand-400 text-xs">{gifter.role}</p>
                </div>
                <div className="ml-auto text-right flex-shrink-0">
                  <p className="text-brand-900 text-sm font-bold">{gifter.badges}</p>
                  <p className="text-brand-400 text-[10px]">badges</p>
                </div>
              </div>
            </Motion>
          ))}
        </div>
      </div>
    </section>
  )
}

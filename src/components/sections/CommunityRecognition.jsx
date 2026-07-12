import { Icons } from '../Icons'
import Motion from '../Motion'
import topGifters from '../../data/topGifters'

const fallback = [
  { name: 'Gift Queen', tiktokHandle: '@giftqueen', photo: null },
  { name: 'Diamond Hands', tiktokHandle: '@diamondhands', photo: null },
  { name: 'Battle Boss', tiktokHandle: '@battleboss', photo: null },
  { name: 'Crown Bearer', tiktokHandle: '@crownbearer', photo: null },
  { name: 'Dynasty Legend', tiktokHandle: '@dynastylegend', photo: null },
  { name: 'Heart of Gold', tiktokHandle: '@heartofgold', photo: null },
]

const gifters = (topGifters && topGifters.length ? topGifters : fallback).slice(0, 6)

const rankEmoji = ['🥇', '🥈', '🥉']

export default function CommunityRecognition() {
  const top3 = gifters.slice(0, 3)
  const rest = gifters.slice(3)

  return (
    <section className="py-16 sm:py-24" style={{ background: '#120620' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Motion delay={0.1} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 text-ember" style={{ background: 'rgba(255,107,26,0.1)' }}>
            <span className="w-3.5 h-3.5 block">{Icons.award}</span>
            Kingdom Family
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ivory mb-3">
            Monthly Top <span className="text-gradient">Gifters</span>
          </h2>
          <p className="text-white/50 text-sm max-w-md mx-auto">
            The most dedicated members of the KM Dynasty family.
          </p>
        </Motion>

        {/* Top 3 square cards */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {top3.map((g, i) => (
            <Motion key={g.name} delay={0.15 + i * 0.08}>
              <div className="relative rounded-2xl overflow-hidden aspect-square group">
                {g.photo ? (
                  <img src={g.photo} alt={g.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: 'rgba(59,16,99,0.4)' }}>
                    <span className="text-5xl font-display font-bold text-white/10">{g.name[0]}</span>
                  </div>
                )}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(18,6,32,0.9) 40%, transparent 100%)' }} />
                <div className="absolute top-3 left-3 text-2xl">{rankEmoji[i]}</div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-ivory font-display font-bold text-sm">{g.name}</p>
                  <p className="text-white/50 text-xs">{g.tiktokHandle}</p>
                </div>
              </div>
            </Motion>
          ))}
        </div>

        {/* Bottom 3 rows */}
        <div className="space-y-2">
          {rest.map((g, i) => (
            <Motion key={g.name} delay={0.35 + i * 0.06}>
              <div className="flex items-center gap-4 px-5 py-3 rounded-xl border border-white/06 hover:border-white/12 transition-colors" style={{ background: 'rgba(59,16,99,0.15)' }}>
                <span className="text-white/30 font-display font-bold text-sm w-6">{i + 4}</span>
                <div className="w-8 h-8 rounded-full bg-dynasty-purple/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-white/60 text-xs font-bold">{g.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-ivory text-sm font-semibold">{g.name}</p>
                  <p className="text-white/40 text-xs">{g.tiktokHandle}</p>
                </div>
              </div>
            </Motion>
          ))}
        </div>
      </div>
    </section>
  )
}

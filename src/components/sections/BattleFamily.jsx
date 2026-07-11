import { Icons } from '../Icons'
import Motion from '../Motion'

const platforms = [
  {
    name: 'King Kaly',
    description: 'TikTok box battle host and creator. The OG of the format.',
    url: 'https://kingkaly.org',
    icon: Icons.crown,
    color: 'text-dynasty-orange',
    bg: 'bg-dynasty-orange/10',
  },
  {
    name: 'Your Platform',
    description: 'Got a battle community or creator platform? Let\'s connect.',
    url: '/contact',
    icon: Icons.globe,
    color: 'text-dynasty-purple',
    bg: 'bg-dynasty-purple/10',
    internal: true,
  },
]

export default function BattleFamily() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Motion variant="fade-up">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-dynasty-purple/10 rounded-full text-dynasty-purple text-xs font-semibold mb-4">
              <span className="w-3.5 h-3.5 block">{Icons.users}</span>
              Battle Family
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-dynasty-charcoal mb-3">
              Related Platforms &amp; Creators
            </h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">
              The box battle community is bigger than one page. Here are the platforms and creators
              we respect and connect with.
            </p>
          </div>
        </Motion>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {platforms.map(({ name, description, url, icon, color, bg, internal }, i) => (
            <Motion key={name} variant="fade-up" delay={i * 100}>
              {internal ? (
                <a
                  href={url}
                  className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:border-dynasty-purple/20 hover:shadow-md transition-all group"
                >
                  <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <span className={`w-5 h-5 block ${color}`}>{icon}</span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-dynasty-charcoal mb-1 group-hover:text-dynasty-purple transition-colors">{name}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
                  </div>
                </a>
              ) : (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:border-dynasty-purple/20 hover:shadow-md transition-all group"
                >
                  <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <span className={`w-5 h-5 block ${color}`}>{icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-sm text-dynasty-charcoal group-hover:text-dynasty-purple transition-colors">{name}</h3>
                      <span className="w-3 h-3 block text-gray-300">{Icons.arrowRight}</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
                  </div>
                </a>
              )}
            </Motion>
          ))}
        </div>
      </div>
    </section>
  )
}

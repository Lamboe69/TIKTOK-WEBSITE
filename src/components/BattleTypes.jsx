import { Icons } from './Icons'

function BattleTypes() {
  const battles = [
    { icon: Icons.swords, title: '1v1 Duels', description: 'Face off head-to-head in intense one-on-one box battles. Prove your skills and claim victory.' },
    { icon: Icons.users, title: 'Team Wars', description: 'Rally your squad and compete in epic team-based battles. Strategy and coordination are key.' },
    { icon: Icons.trophy, title: 'Tournament Play', description: 'Compete in bracket-style tournaments with massive prize pools. Only the strongest survive.' },
    { icon: Icons.dice, title: 'Mystery Box', description: 'Unpredictable box battles where anything can happen. Embrace the chaos and roll the dice.' },
  ]

  return (
    <section className="relative py-24 bg-dynasty-cream overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-royal-orange rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-royal-purple rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-royal-purple font-semibold text-sm uppercase tracking-widest">
            Choose Your Fight
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mt-4">
            Battle{' '}
            <span className="bg-gradient-to-r from-royal-orange to-royal-purple bg-clip-text text-transparent">
              Formats
            </span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            Whether you're a solo warrior or a team player, we've got the perfect battle mode for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {battles.map((battle) => (
            <div
              key={battle.title}
              className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-royal-orange to-royal-purple flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                {battle.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{battle.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{battle.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BattleTypes

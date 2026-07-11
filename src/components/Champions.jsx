function Champions() {
  const champions = [
    { name: 'KingSlayer', wins: 142, streak: 18, rank: 1, avatar: 'bg-gradient-to-br from-dynasty-gold to-royal-orange' },
    { name: 'BoxQueen', wins: 128, streak: 14, rank: 2, avatar: 'bg-gradient-to-br from-gray-300 to-gray-400' },
    { name: 'NightFury', wins: 119, streak: 12, rank: 3, avatar: 'bg-gradient-to-br from-amber-600 to-amber-700' },
    { name: 'DiamondHand', wins: 107, streak: 9, rank: 4, avatar: 'bg-gradient-to-br from-gray-200 to-gray-300' },
    { name: 'PhoenixRise', wins: 98, streak: 7, rank: 5, avatar: 'bg-gradient-to-br from-gray-200 to-gray-300' },
  ]

  return (
    <section className="relative py-24 bg-gray-950 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-royal-orange/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-royal-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-dynasty-gold font-semibold text-sm uppercase tracking-widest">
            Hall of Fame
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mt-4">
            Current{' '}
            <span className="bg-gradient-to-r from-dynasty-gold to-royal-orange bg-clip-text text-transparent">
              Champions
            </span>
          </h2>
        </div>

        <div className="space-y-4">
          {champions.map((c) => (
            <div
              key={c.name}
              className="flex items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-royal-orange/30 transition-all duration-300 group hover:bg-white/[0.07]"
            >
              <div className={`w-12 h-12 rounded-xl ${c.avatar} flex items-center justify-center font-black text-lg shrink-0`}>
                #{c.rank}
              </div>

              <div className={`w-12 h-12 rounded-full ${c.avatar} flex items-center justify-center text-white font-bold text-lg shrink-0`}>
                {c.name[0]}
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-white font-bold text-lg truncate group-hover:text-dynasty-gold transition-colors">
                  {c.name}
                </div>
                <div className="text-gray-400 text-sm">
                  {c.wins} wins
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-dynasty-gold font-bold text-lg">{c.streak}</div>
                <div className="text-gray-500 text-xs uppercase tracking-wider">Win Streak</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Champions

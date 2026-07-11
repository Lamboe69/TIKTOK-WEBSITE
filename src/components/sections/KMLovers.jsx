import { Link } from 'react-router-dom'
import { Icons } from '../Icons'
import Motion from '../Motion'

const perks = [
  { icon: Icons.star, label: 'Priority shout-outs during livestreams' },
  { icon: Icons.gift, label: 'Exclusive community giveaways' },
  { icon: Icons.award, label: 'Special recognition during Winners\' Livestream Visit' },
]

export default function KMLovers() {
  return (
    <section className="py-20 sm:py-28 bg-dynasty-purple text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-dynasty-orange/10 rounded-full blur-3xl animate-orb" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl animate-orb" style={{ animationDelay: '6s' }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <Motion variant="fade-up" className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4">
            KM LOVERS
          </h2>
          <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Like, share, follow, report &mdash; KM LOVERS don't just watch, they <strong className="text-dynasty-orange">PROTECT the dynasty</strong>.
            Your engagement keeps the livestream safe and the community strong.
          </p>
        </Motion>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
          {perks.map(({ icon, label }, i) => (
            <Motion key={i} variant="fade-up" delay={i * 120}>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center card-hover group cursor-default h-full">
                <span className="w-10 h-10 mx-auto mb-4 block text-dynasty-orange group-hover:scale-110 group-hover:animate-breathe transition-transform duration-300">{icon}</span>
                <p className="text-white/90 text-sm font-medium">{label}</p>
              </div>
            </Motion>
          ))}
        </div>

        <Motion variant="fade-up" delay={400} className="text-center">
          <Link
            to="/how-to-join"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold text-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 btn-glow"
          >
            Learn the Steps
            <span className="w-4 h-4 block group-hover:translate-x-1 transition-transform">{Icons.arrowRight}</span>
          </Link>
        </Motion>
      </div>
    </section>
  )
}

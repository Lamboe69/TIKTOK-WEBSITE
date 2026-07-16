import { Icons } from './Icons'
import { useSignUp } from './SignUpContext'
import { useContent } from '../cms/ContentContext'

function WinnersVisit() {
  const { openOfficial } = useSignUp()
  const { settings } = useContent()
  const siteName = settings.siteName || ''
  const steps = [
    { step: '01', title: 'Win the Battle', description: 'Compete in daily box battles and come out on top.', icon: Icons.trophy },
    { step: '02', title: 'Get Featured', description: 'Top winners get highlighted on our TikTok and social channels.', icon: Icons.smartphone },
    { step: '03', title: 'Creator Visit', description: 'Champions earn a special livestream visit with top creators.', icon: Icons.film },
    { step: '04', title: 'Claim Rewards', description: 'Collect exclusive prizes, badges, and bragging rights.', icon: Icons.gift },
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
            Your Journey
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mt-4">
            Winners Get the{' '}
            <span className="bg-gradient-to-r from-royal-orange to-royal-purple bg-clip-text text-transparent">
              Royal Treatment
            </span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            From battle champion to spotlight — here's how winners rise through {siteName}.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={s.step} className="relative text-center group">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-royal-orange/30 to-royal-purple/30" />
              )}
              <div className="relative w-20 h-20 mx-auto mb-6 rounded-2xl bg-white shadow-lg group-hover:shadow-xl transition-shadow flex items-center justify-center border border-gray-100">
                <div className="w-10 h-10 text-royal-orange group-hover:scale-110 transition-transform">{s.icon}</div>
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-lg bg-gradient-to-br from-royal-orange to-royal-purple flex items-center justify-center text-white text-xs font-black">
                  {s.step}
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button
            type="button"
            onClick={openOfficial}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-royal-purple to-royal-purple-deep text-white font-bold rounded-xl hover:shadow-lg hover:shadow-royal-purple/30 transition-all duration-300 hover:-translate-y-0.5"
          >
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  )
}

export default WinnersVisit

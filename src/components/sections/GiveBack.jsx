import { Icons } from '../Icons'
import Motion from '../Motion'

const charityWork = [
  {
    icon: Icons.gift,
    title: 'Community Giveaways',
    description: 'KM DYNASTY runs regular giveaways for the community — prize boxes, creator support packages, and surprise rewards for loyal members who show up and engage.',
  },
  {
    icon: Icons.handshake,
    title: 'Charity Drives & Outreach',
    description: 'King Maker and the KM DYNASTY team organize charity events and outreach efforts, using the platform to give back to those in need beyond the battle arena.',
  },
  {
    icon: Icons.users,
    title: 'Creator Development',
    description: 'We invest in rising creators — coaching, visibility, and direct support to help talent grow from unknown to unforgettable.',
  },
]

export default function GiveBack() {
  return (
    <section className="py-20 sm:py-28 bg-dynasty-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <Motion variant="fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-dynasty-orange/10 rounded-full text-dynasty-orange text-xs font-semibold mb-5">
              <span className="w-3.5 h-3.5 block animate-breathe">{Icons.heart}</span>
              Giving Back
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-dynasty-charcoal mb-4">
              We Give Back to the Community
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed max-w-2xl mx-auto">
              KM DYNASTY isn't just about battles — it's about lifting people up. King Maker and the team
              are committed to giving back through community giveaways, charity drives, and direct support
              for creators who need a hand getting started.
            </p>
          </Motion>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {charityWork.map(({ icon, title, description }, i) => (
            <Motion key={i} variant="fade-up" delay={i * 120}>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md hover:border-dynasty-purple/20 transition-all text-center h-full">
                <div className="w-12 h-12 rounded-xl bg-dynasty-purple/10 flex items-center justify-center mx-auto mb-4">
                  <span className="w-6 h-6 block text-dynasty-purple">{icon}</span>
                </div>
                <h3 className="font-display font-bold text-lg text-dynasty-charcoal mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
              </div>
            </Motion>
          ))}
        </div>

        <Motion variant="fade-up" delay={400}>
          <div className="mt-10 text-center">
            <p className="text-xs text-gray-400 italic max-w-lg mx-auto">
              Want to support a charity drive or partner with KM DYNASTY on an outreach event?
              {' '}<a href="/contact" className="text-dynasty-purple hover:text-dynasty-orange font-semibold transition-colors">Get in touch</a>.
            </p>
          </div>
        </Motion>
      </div>
    </section>
  )
}

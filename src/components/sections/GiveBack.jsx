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
  const handleSupportSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const tiktok = form.tiktok.value
    const reason = form.reason.value
    const subject = encodeURIComponent('KM DYNASTY Support Request')
    const body = encodeURIComponent(
      `Name: ${name}\nTikTok Username: ${tiktok}\nReason for Support:\n${reason}`
    )
    window.location.href = `mailto:lagwatinc@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 bg-dynasty-cream">
      <div className="absolute top-10 right-[-120px] w-[300px] h-[300px] rounded-full bg-dynasty-purple/10 blur-[100px] animate-drift" style={{ animationDuration: '12s' }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12">
          <Motion variant="fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-dynasty-orange/10 rounded-full text-dynasty-orange text-xs font-semibold mb-5">
              <span className="w-3.5 h-3.5 block animate-float">{Icons.heart}</span>
              Giving Back
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-dynasty-charcoal mb-4">
              We <span className="text-gradient-animated">Give Back</span> to the Community
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed max-w-2xl mx-auto">
              KM DYNASTY isn't just about battles — it's about lifting people up. King Maker and the team
              are committed to giving back through community giveaways, charity drives, and direct support
              for creators who need a hand getting started.
            </p>
          </Motion>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {charityWork.map(({ icon, title, description }, i) => (
            <Motion key={i} variant="fade-up" delay={i * 120}>
              <div className="card-tilt bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md hover:border-dynasty-purple/20 transition-all text-center h-full relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
                  <div className="animate-shimmer-line" />
                </div>
                <div className="w-12 h-12 rounded-xl bg-dynasty-purple/10 flex items-center justify-center mx-auto mb-4">
                  <span className="w-6 h-6 block text-dynasty-purple">{icon}</span>
                </div>
                <h3 className="font-display font-bold text-lg text-dynasty-charcoal mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
              </div>
            </Motion>
          ))}
        </div>

        <Motion variant="fade-up" delay={300}>
          <div className="text-center mb-10">
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-dynasty-charcoal mb-3">
              Support Our Next Outreach
            </h3>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mb-8">
              Every dollar goes directly toward community giveaways, charity events, and helping rising creators get their start. Your support makes a real difference.
            </p>
            <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-lg p-4 mb-6">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src="https://www.gofundme.com/f/km-dynasty-outreach"
                  className="absolute inset-0 w-full h-full rounded-xl border-0"
                  title="KM DYNASTY GoFundMe"
                  loading="lazy"
                />
              </div>
            </div>
            <a
              href="https://www.gofundme.com/f/km-dynasty-outreach"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-dynasty-purple text-white font-bold text-sm hover:bg-dynasty-purple/90 transition-colors animate-glow-breathe"
            >
              {Icons.heart}
              Donate on GoFundMe
            </a>
          </div>
        </Motion>

        <Motion variant="fade-up" delay={500}>
          <div className="max-w-xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
            <h4 className="font-display font-bold text-lg text-dynasty-charcoal mb-1 text-center">
              Request Support
            </h4>
            <p className="text-xs text-gray-400 text-center mb-6">
              Need a hand? Let us know and we'll see how KM DYNASTY can help.
            </p>
            <form onSubmit={handleSupportSubmit} className="space-y-4">
              <div>
                <label htmlFor="support-name" className="block text-xs font-semibold text-gray-600 mb-1">Name</label>
                <input
                  id="support-name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-dynasty-charcoal focus:outline-none focus:border-dynasty-purple focus:ring-1 focus:ring-dynasty-purple/30 transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="support-tiktok" className="block text-xs font-semibold text-gray-600 mb-1">TikTok Username</label>
                <input
                  id="support-tiktok"
                  name="tiktok"
                  type="text"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-dynasty-charcoal focus:outline-none focus:border-dynasty-purple focus:ring-1 focus:ring-dynasty-purple/30 transition-all"
                  placeholder="@yourusername"
                />
              </div>
              <div>
                <label htmlFor="support-reason" className="block text-xs font-semibold text-gray-600 mb-1">Reason for Support Request</label>
                <textarea
                  id="support-reason"
                  name="reason"
                  required
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-dynasty-charcoal focus:outline-none focus:border-dynasty-purple focus:ring-1 focus:ring-dynasty-purple/30 transition-all resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-dynasty-purple text-white font-bold text-sm hover:bg-dynasty-purple/90 transition-colors"
              >
                Send Request
              </button>
            </form>
          </div>
        </Motion>

        <Motion variant="fade-up" delay={600}>
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

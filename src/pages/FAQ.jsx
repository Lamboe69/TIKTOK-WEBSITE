import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import FAQAccordion from '../components/FAQAccordion'
import { Icons } from '../components/Icons'
import Motion from '../components/Motion'

const categories = ['All', 'Getting Started', 'Creator Support', 'Account Safety', 'Advertising']

const faqItems = [
  { question: 'What services do you offer?', answer: "KM DYNASTY and La'Gwat Agency provide creator management, brand development, TikTok livestream coaching, and community-building support for content creators. We specialize in the box battle format and help creators grow their audience and engagement.", category: 'Getting Started' },
  { question: 'Who is eligible to join?', answer: "Anyone with a TikTok account who wants to be part of the KM DYNASTY community. For creator management services through La'Gwat Agency, eligibility extends to creators in the US and Canada who meet our partnership criteria.", category: 'Getting Started' },
  { question: 'How do I get started?', answer: "Start by following King Maker on TikTok, joining the KM DYNASTY livestreams, and engaging with the community. For creator management, reach out through the contact page or email lagwatinc@gmail.com.", category: 'Getting Started' },
  { question: "How do you protect creators' accounts?", answer: "We never request account passwords or sensitive credentials. All management is done through secure, official TikTok collaboration tools. La'Gwat Agency follows industry-standard data protection practices.", category: 'Account Safety' },
  { question: 'What does your creative support include?', answer: "Creative support includes content strategy, livestream preparation and coaching, audience engagement techniques, brand identity development, and access to the KM DYNASTY community network for cross-promotion.", category: 'Creator Support' },
  { question: 'What kind of technical advice do you provide?', answer: "We provide technical guidance on TikTok features, livestream optimization, video quality setup, engagement analytics interpretation, and platform best practices to maximize your reach and retention.", category: 'Creator Support' },
  { question: 'How do I book an ad placement?', answer: "Visit the Advertise page and fill out the inquiry form with your business details, preferred placement, and budget range. Our team reviews every submission and responds within 48 hours with available options and pricing.", category: 'Advertising' },
  { question: 'What kind of reach can my ad expect?', answer: "KM DYNASTY livestreams regularly reach thousands of live viewers, with additional replay and clip engagement. Exact numbers vary by battle type and time slot — share your goals in the inquiry form and we'll recommend the best placement for your budget.", category: 'Advertising' },
  { question: 'Can I sponsor a specific battle or creator?', answer: "Yes — the Custom/Bundle package on the Advertise page lets you request a specific battle type, creator shout-out, or bundled placement. Mention your preference in the message field of the inquiry form.", category: 'Advertising' },
]

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredItems = useMemo(
    () => activeCategory === 'All' ? faqItems : faqItems.filter(f => f.category === activeCategory),
    [activeCategory]
  )

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[520px] flex items-end pb-16 overflow-hidden" style={{ background: '#120620' }}>
        <img
          src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1400&q=80"
          alt="FAQ"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(18,6,32,0.95) 40%, rgba(59,16,99,0.6) 100%)' }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <Motion delay={0.1}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-5 text-ember" style={{ background: 'rgba(255,107,26,0.1)' }}>
                Got Questions?
              </span>
              <h1 className="font-display font-bold text-ivory mb-4 leading-tight" style={{ fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.02em' }}>
                KM DYNASTY &amp; La'Gwat<br />
                <span className="text-gradient">Creator Network — FAQs</span>
              </h1>
              <p className="text-white/60 text-sm leading-relaxed max-w-md">
                Answers to your questions about KM DYNASTY &amp; La'Gwat Creator Network.
              </p>
            </Motion>

            <Motion delay={0.2}>
              <div className="glass rounded-2xl p-6 border border-white/10">
                <p className="text-white/40 text-[10px] uppercase tracking-widest mb-4">Quick Stats</p>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: `${faqItems.length}`, label: 'Questions' },
                    { value: `${categories.length - 1}`, label: 'Categories' },
                    { value: '48h', label: 'Response Time' },
                  ].map(s => (
                    <div key={s.label} className="text-center">
                      <p className="font-display font-bold text-2xl text-ivory">{s.value}</p>
                      <p className="text-white/40 text-[10px] uppercase tracking-wider mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Motion>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 sm:py-24" style={{ background: '#1B1024' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Category filters */}
          <Motion delay={0.1}>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-4 py-1.5 text-xs font-semibold rounded-full border transition-all"
                  style={activeCategory === cat
                    ? { background: 'rgba(255,107,26,0.15)', borderColor: 'rgba(255,107,26,0.4)', color: '#FF6B1A' }
                    : { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }
                  }
                >
                  {cat}
                </button>
              ))}
            </div>
          </Motion>

          <Motion delay={0.15}>
            <FAQAccordion items={filteredItems} dark />
          </Motion>

          {/* Still have a question */}
          <Motion delay={0.3}>
            <div className="mt-12 rounded-2xl p-8 text-center border border-white/04" style={{ background: 'rgba(59,16,99,0.35)', backdropFilter: 'blur(16px)' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(255,107,26,0.15)' }}>
                <span className="w-6 h-6 block text-ember">{Icons.users}</span>
              </div>
              <h2 className="font-display font-bold text-xl text-ivory mb-2">Still have a question?</h2>
              <p className="text-white/50 text-sm mb-6">Reach out directly — we're happy to help.</p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white rounded-lg transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)', borderRadius: 8 }}
              >
                Contact Us
                <span className="w-4 h-4 block">{Icons.arrowRight}</span>
              </Link>
            </div>
          </Motion>
        </div>
      </section>
    </main>
  )
}

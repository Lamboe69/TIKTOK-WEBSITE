import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import FAQAccordion from '../components/FAQAccordion'
import { Icons } from '../components/Icons'
import Stepper from '../components/Stepper'

const categories = ['All', 'Getting Started', 'Creator Support', 'Account Safety', 'Advertising']

const faqItems = [
  {
    question: 'What services do you offer?',
    answer: "KM DYNASTY and La'Gwat Agency provide creator management, brand development, TikTok livestream coaching, and community-building support for content creators. We specialize in the box battle format and help creators grow their audience and engagement.",
    category: 'Getting Started',
  },
  {
    question: 'Who is eligible to join?',
    answer: 'Anyone with a TikTok account who wants to be part of the KM DYNASTY community. For creator management services through La\'Gwat Agency, eligibility extends to creators in the US and Canada who meet our partnership criteria.',
    category: 'Getting Started',
  },
  {
    question: 'How do I get started?',
    answer: "Start by following King Maker on TikTok, joining the KM DYNASTY livestreams, and engaging with the community. For creator management, reach out through the contact page or email lagwatinc@gmail.com.",
    category: 'Getting Started',
  },
  {
    question: "How do you protect creators' accounts?",
    answer: "We never request account passwords or sensitive credentials. All management is done through secure, official TikTok collaboration tools. La'Gwat Agency follows industry-standard data protection practices.",
    category: 'Account Safety',
  },
  {
    question: 'What does your creative support include?',
    answer: "Creative support includes content strategy, livestream preparation and coaching, audience engagement techniques, brand identity development, and access to the KM DYNASTY community network for cross-promotion.",
    category: 'Creator Support',
  },
  {
    question: 'What kind of technical advice do you provide?',
    answer: "We provide technical guidance on TikTok features, livestream optimization, video quality setup, engagement analytics interpretation, and platform best practices to maximize your reach and retention.",
    category: 'Creator Support',
  },
  {
    question: 'How do I book an ad placement?',
    answer: "Visit the Advertise page and fill out the inquiry form with your business details, preferred placement, and budget range. Our team reviews every submission and responds within 48 hours with available options and pricing.",
    category: 'Advertising',
  },
  {
    question: 'What kind of reach can my ad expect?',
    answer: "KM DYNASTY livestreams regularly reach thousands of live viewers, with additional replay and clip engagement. Exact numbers vary by battle type and time slot — share your goals in the inquiry form and we'll recommend the best placement for your budget.",
    category: 'Advertising',
  },
  {
    question: 'Can I sponsor a specific battle or creator?',
    answer: "Yes — the Custom/Bundle package on the Advertise page lets you request a specific battle type, creator shout-out, or bundled placement. Mention your preference in the message field of the inquiry form.",
    category: 'Advertising',
  },
]

const quickSteps = [
  { title: 'Tap the Page', description: 'Tap/like the live screen repeatedly during battles.' },
  { title: 'Pray Before Battle', description: 'Say a short prayer before sending your box.' },
  { title: '5,000+ Taps', description: 'Minimum 5,000 taps required for official battles.' },
]

function CategoryFilter({ active, onChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all ${
            active === cat
              ? 'bg-dynasty-purple text-white border-dynasty-purple'
              : 'bg-white text-gray-500 border-gray-200 hover:border-dynasty-purple/30 hover:text-dynasty-purple'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredItems = useMemo(
    () => activeCategory === 'All' ? faqItems : faqItems.filter((f) => f.category === activeCategory),
    [activeCategory]
  )

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="py-20 sm:py-28 bg-dynasty-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="w-12 h-12 mx-auto mb-4 block text-dynasty-orange animate-float">{Icons.users}</span>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-dynasty-charcoal mb-3">
              <span className="text-gradient-animated">KM DYNASTY &amp; La'Gwat Creator Network &mdash; FAQs</span>
            </h1>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">
              Answers to the most common questions.
            </p>
          </div>

          <CategoryFilter active={activeCategory} onChange={setActiveCategory} />

          <FAQAccordion items={filteredItems} />

          <div className="mt-14 bg-white rounded-2xl p-8 border border-gray-100">
            <h2 className="font-display font-bold text-xl text-dynasty-charcoal mb-4 text-center">
              How to Join &mdash; Quick Preview
            </h2>
            <Stepper steps={quickSteps} />
            <div className="mt-6 text-center">
              <Link
                to="/how-to-join"
                className="inline-flex items-center gap-2 text-sm text-dynasty-purple font-semibold hover:text-dynasty-orange transition-colors"
              >
                View all 10 steps
                <span className="w-4 h-4 block">{Icons.arrowRight}</span>
              </Link>
            </div>
          </div>

          {/* Section 3.1 — Still have a question? */}
          <div className="mt-10 text-center">
            <div className="bg-dynasty-purple/5 rounded-2xl border border-dynasty-purple/10 p-8">
              <h2 className="font-display font-bold text-xl text-dynasty-charcoal mb-2">
                Still have a question?
              </h2>
              <p className="text-sm text-gray-500 mb-5">
                Reach out directly &mdash; we're happy to help.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-dynasty-purple text-white font-bold text-sm rounded-xl hover:bg-dynasty-purple-dark transition-colors animate-glow-breathe"
              >
                Contact Us
                <span className="w-4 h-4 block">{Icons.arrowRight}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

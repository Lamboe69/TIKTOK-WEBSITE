import { Link } from 'react-router-dom'
import { Icons } from '../Icons'
import Motion from '../Motion'
import { useContent } from '../../cms/ContentContext'
import { normalizeAdPackages } from '../../cms/normalize'

const fallbackCards = [
  {
    name: 'Livestream Shout-Out',
    features: ["Brand mention + on-screen tag during the live box battle."],
  },
  {
    name: 'Homepage Banner',
    features: ['Your brand featured on this site — seen by every visitor.'],
  },
]

export default function AdvertiseSection() {
  const { settings, collections } = useContent()
  const siteName = settings.siteName || ''
  const packages = (() => {
    const fromCms = normalizeAdPackages(collections.adPackages || [])
    return fromCms.length ? fromCms.slice(0, 2) : fallbackCards
  })()

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Motion variant="fade-up" className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-dynasty-orange/10 rounded-full text-dynasty-orange text-xs font-semibold mb-5">
            <span className="w-3.5 h-3.5 block">{Icons.globe}</span>
            For Brands & Sponsors
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-dynasty-charcoal mb-4">
            Advertise With {siteName}
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Reach a fast-growing, highly engaged livestream audience across the US, Canada, and beyond.
            Put your brand in front of thousands of creators and fans.
          </p>
        </Motion>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 max-w-2xl mx-auto">
          {packages.map((pkg, i) => (
            <Motion key={pkg.name || i} variant="fade-up" delay={i * 120}>
              <div className="bg-dynasty-cream/50 rounded-2xl p-6 border border-gray-100 card-hover">
                <div
                  className={`w-10 h-10 rounded-lg ${i % 2 === 0 ? 'bg-dynasty-purple' : 'bg-dynasty-orange'} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  {Icons.star}
                </div>
                <p className="text-xs font-bold text-dynasty-orange uppercase tracking-wider mb-1">
                  Sponsored Placement
                </p>
                <h3 className="font-display font-bold text-base text-dynasty-charcoal mb-1">
                  {pkg.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {(pkg.features && pkg.features[0]) || pkg.description || ''}
                </p>
              </div>
            </Motion>
          ))}
        </div>

        <Motion variant="fade-up" delay={300} className="text-center">
          <Link
            to="/advertise"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-dynasty-purple text-white font-bold rounded-xl text-sm btn-glow btn-glow-purple shadow-lg shadow-dynasty-purple/20"
          >
            Advertise With Us
            <span className="w-4 h-4 block">{Icons.arrowRight}</span>
          </Link>
        </Motion>
      </div>
    </section>
  )
}

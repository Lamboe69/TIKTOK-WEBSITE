import { Link } from 'react-router-dom'
import { Icons } from '../Icons'
import Motion from '../Motion'
import fallbackRegions from '../../data/agencyRegions'
import { useContent } from '../../cms/ContentContext'
import { normalizeAgencyRegions } from '../../cms/normalize'

export default function AgencyTeaser() {
  const { settings, collections, getPage } = useContent()
  const siteName = settings.siteName || ''
  const home = getPage('home')
  const regions = (() => {
    const fromCms = normalizeAgencyRegions(collections.agencyRegions || [])
    return fromCms.length ? fromCms : normalizeAgencyRegions(fallbackRegions)
  })()

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden" style={{ background: '#120620' }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(79,243,224,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(79,243,224,0.03) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255,107,26,0.08) 0%, transparent 70%)',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <Motion delay={0.1} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 text-tech-cyan font-mono" style={{ background: 'rgba(79,243,224,0.06)', border: '1px solid rgba(79,243,224,0.15)' }}>
            <span className="w-3.5 h-3.5 block">{Icons.users}</span>
            Official Partnerships
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ivory mb-3">
            Join the <span className="text-gradient">Agency</span>
          </h2>
          <p className="text-white/50 text-sm max-w-md mx-auto">
            {home.agencyTeaserBody ||
              `Represent ${siteName || 'the Dynasty'} in your region. Get priority battle access, mentorship, and direct support.`}
          </p>
        </Motion>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {regions.map((region, i) => (
            <Motion key={region.name} delay={0.15 + i * 0.08}>
              <div className="relative rounded-xl p-5 border border-white/06 hover:border-ember/25 transition-all group" style={{ background: 'rgba(59,16,99,0.12)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{region.flag}</span>
                  <div>
                    <p className="font-display font-bold text-ivory text-sm">{region.name}</p>
                    <p className="text-ember text-[11px] font-mono">{(region.tagline || '').split('—')[0].trim()}</p>
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {(region.benefits || []).slice(0, 4).map((b) => (
                    <li key={b} className="flex items-center gap-2 text-xs text-white/50">
                      <span className="w-1 h-1 rounded-full bg-tech-cyan/40 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="absolute top-3 right-3">
                  <span className="w-3 h-3 block text-tech-cyan/30">{Icons.shield}</span>
                </div>
              </div>
            </Motion>
          ))}
        </div>

        <Motion delay={0.4} className="text-center">
          <Link
            to="/agency"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)', boxShadow: '0 0 24px rgba(255,107,26,0.2)' }}
          >
            <span className="w-4 h-4 block">{Icons.users}</span>
            View All Regions & Apply
            <span className="w-4 h-4 block">{Icons.arrowRight}</span>
          </Link>
        </Motion>
      </div>
    </section>
  )
}

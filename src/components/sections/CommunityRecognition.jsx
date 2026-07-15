import { useMemo, useState } from 'react'
import { Icons } from '../Icons'
import Motion from '../Motion'
import fallbackGifters from '../../data/topGifters'
import fallbackFans from '../../data/topFans'
import { useContent } from '../../cms/ContentContext'
import { normalizePeoplePhotos } from '../../cms/normalize'
import { mediaUrl } from '../../utils/mediaUrl'

const tabs = [
  { id: 'gifters', label: 'Top Gifters', accent: '#FF6B1A' },
  { id: 'fans', label: 'Top Fans', accent: '#E8B94A' },
]

export default function CommunityRecognition() {
  const { collections, settings, getPage } = useContent()
  const homePage = getPage('home')
  const siteName = settings.siteName || ''
  const paypalEmail = settings.paypalEmail || ''
  const contactEmail = settings.email || 'lagwatinc@gmail.com'
  const topGifters = useMemo(() => {
    const fromCms = normalizePeoplePhotos(collections.topGifters || [])
    return fromCms.length ? fromCms : normalizePeoplePhotos(fallbackGifters)
  }, [collections.topGifters])
  const topFans = useMemo(() => {
    const fromCms = normalizePeoplePhotos(collections.topFans || [])
    return fromCms.length ? fromCms : normalizePeoplePhotos(fallbackFans)
  }, [collections.topFans])
  const [tab, setTab] = useState('gifters')
  const list = (tab === 'gifters' ? topGifters : topFans).slice(0, 3)
  const recognitionTitle = homePage.recognitionTitle || 'Honor the'
  const recognitionKicker = homePage.recognitionKicker || 'Kingdom Family'
  const recognitionMissionTitle = homePage.recognitionMissionTitle || 'Support the mission'
  const recognitionMissionBody = homePage.recognitionMissionBody || 'Expand the Dynasty. Lift creators. Fund what matters.'
  const recognitionMissionImage = mediaUrl(
    homePage.recognitionMissionImage,
    '/testimonials/grace.jpg',
  )
  const accent = tabs.find((t) => t.id === tab)?.accent || '#FF6B1A'

  return (
    <section className="relative overflow-hidden home-band-glow home-band-sep">
      <div className="relative z-10 px-5 sm:px-8 pt-10 sm:pt-12 pb-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <Motion delay={40}>
            <p className="sec-kicker mb-2">{recognitionKicker}</p>
            <h2
              className="font-display font-bold text-ivory leading-none tracking-tight"
              style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.5rem)' }}
            >
              {recognitionTitle}{' '}
              <span className="text-gradient">{tab === 'gifters' ? 'gifters' : 'fans'}</span>
            </h2>
          </Motion>

          <div className="flex self-start sm:self-auto" role="tablist">
            {tabs.map(({ id, label, accent: a }) => {
              const on = tab === id
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setTab(id)}
                  className={`relative px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] transition-colors ${
                    on ? 'text-ivory' : 'text-white/50 hover:text-white/55'
                  }`}
                >
                  {label}
                  {on && (
                    <span className="absolute left-4 right-4 bottom-0 h-0.5" style={{ background: a }} />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Full-bleed: top 3 + support mission — same height band */}
      <div key={tab} className="honor-roll honor-roll--mission">
        {list.map((person, i) => (
          <Motion key={person.handle} delay={50 + i * 35} className="honor-panel">
            <a
              href={person.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block h-full w-full overflow-hidden"
            >
              <img
                src={person.photo}
                alt={person.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(10,4,20,0.95) 0%, rgba(10,4,20,0.25) 55%, transparent 100%)',
                }}
              />
              <span
                className="absolute top-3 left-3 sm:top-4 sm:left-4 font-display font-extrabold leading-none"
                style={{
                  fontSize: i === 0 ? 'clamp(1.6rem, 2.8vw, 2.35rem)' : 'clamp(1rem, 1.8vw, 1.4rem)',
                  color: i === 0 ? accent : 'rgba(255,255,255,0.35)',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className={`absolute top-0 left-0 right-0 h-[2px] transition-transform duration-300 origin-left ${
                  i === 0 ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
                style={{ background: accent }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                <p
                  className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] mb-1 truncate"
                  style={{ color: accent }}
                >
                  {person.role}
                </p>
                <p className="font-display font-bold text-ivory text-xs sm:text-sm leading-tight truncate">
                  {person.name}
                </p>
                <p className="text-white/60 text-[10px] truncate opacity-0 group-hover:opacity-100 transition-opacity">
                  {person.handle}
                </p>
              </div>
            </a>
          </Motion>
        ))}

        {/* Support the mission — same band */}
        <Motion delay={160} className="honor-panel honor-mission">
          <div className="relative h-full w-full flex flex-col justify-between p-4 sm:p-5 lg:p-6 overflow-hidden"
            style={{ background: 'linear-gradient(160deg, rgba(255,107,26,0.35) 0%, rgba(90,40,160,0.55) 45%, #32185C 100%)' }}
          >
            <img
              src={recognitionMissionImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(50,24,92,0.35), rgba(50,24,92,0.88))' }} />

            <div className="relative z-10">
              <p className="text-[9px] uppercase tracking-[0.28em] text-ember mb-2">Giving Back</p>
              <h3 className="font-display font-bold text-ivory text-base sm:text-lg lg:text-xl leading-tight mb-2">
                {recognitionMissionTitle}
              </h3>
              <p className="text-white/65 text-[11px] sm:text-xs leading-relaxed line-clamp-3">
                {recognitionMissionBody}
              </p>
            </div>

            <div className="relative z-10 flex flex-col gap-2.5 mt-4">
              <form action="https://www.paypal.com/donate" method="post" target="_blank" className="flex flex-col gap-2.5" onSubmit={(e) => { if (!paypalEmail) { e.preventDefault(); alert('Donations coming soon — the admin will configure PayPal in Settings.'); } }}>
                  <input type="hidden" name="business" value={paypalEmail} />
                  <input type="hidden" name="no_recurring" value="0" />
                  <input type="hidden" name="item_name" value={`${siteName} Donation`} />
                  <input type="hidden" name="currency_code" value="USD" />
                  <input type="hidden" name="amount" value="" />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #0070BA, #005ea6)' }}
                  >
                    <span className="w-3.5 h-3.5 block">{Icons.heart}</span>
                    Donate
                  </button>
                </form>
              <a
                href={`mailto:${contactEmail}?subject=${encodeURIComponent(siteName + ' — Request Support')}`}
                className="sec-cta-ghost justify-center text-[11px] py-1"
              >
                Request support
                <span className="w-3.5 h-3.5 block">{Icons.arrowRight}</span>
              </a>
            </div>
          </div>
        </Motion>
      </div>
    </section>
  )
}

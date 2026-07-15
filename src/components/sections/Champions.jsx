import { Link } from 'react-router-dom'
import { Icons } from '../Icons'
import Motion from '../Motion'
import { useContent } from '../../cms/ContentContext'

export default function Champions() {
  const { settings } = useContent()
  const siteName = settings.siteName || ''
  return (
    <section className="relative min-h-[70vh] flex items-end overflow-hidden home-band-sep">
      <img
        src="/photos/competition-energy.jpg"
        alt="Champion of Champions"
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(42,16,40,0.96) 0%, rgba(58,26,106,0.45) 45%, rgba(255,107,26,0.18) 100%), linear-gradient(100deg, rgba(22,11,44,0.65) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <Motion delay={80} className="max-w-2xl">
          <p className="sec-kicker mb-5">Champion of Champions</p>
          <h2
            className="font-display font-bold text-ivory leading-[0.92] tracking-tight mb-5"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)' }}
          >
            Only the best<br />
            <span className="text-gradient">survive the finale</span>
          </h2>
          <p className="text-white/75 text-sm sm:text-base leading-relaxed max-w-md mb-10">
            Winners from Official Godsent Box Battles collide in one {siteName} finale — fierce, fast, respectful, community-first.
          </p>
          <Link to="/how-to-join" className="sec-cta-ghost">
            See the Finale Path
            <span className="w-4 h-4 block">{Icons.arrowRight}</span>
          </Link>
        </Motion>
      </div>
    </section>
  )
}

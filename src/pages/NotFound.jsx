import { Link } from 'react-router-dom'
import { Icons } from '../components/Icons'

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: '#120620' }}>
      <img loading="lazy"
        src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=80"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(59,16,99,0.4) 0%, rgba(18,6,32,0.95) 70%)' }} />

      <div className="relative z-10 max-w-md mx-auto px-4 text-center">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(255,107,26,0.12)', border: '1px solid rgba(255,107,26,0.2)' }}>
          <span className="w-10 h-10 block text-ember">{Icons.crown}</span>
        </div>

        <h1 className="font-display font-bold text-ivory mb-2" style={{ fontSize: 'clamp(72px, 15vw, 120px)', letterSpacing: '-0.04em', lineHeight: 1 }}>
          404
        </h1>

        <p className="text-white/50 text-sm mb-2">This page doesn't exist in the dynasty.</p>
        <p className="text-white/30 text-xs mb-10">The crown you're looking for has moved on.</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="px-6 py-3 text-sm font-bold text-white rounded-lg transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)', borderRadius: 8 }}
          >
            Back to Home
          </Link>
          <Link
            to="/battle-schedule"
            className="px-6 py-3 text-sm font-medium text-white/70 rounded-lg border border-white/10 hover:border-white/08 transition-all"
          >
            View Battles
          </Link>
        </div>
      </div>
    </main>
  )
}

import { useState, useEffect } from 'react'
import { Icons } from './Icons'

const FORMSPREE_OFFICIAL = ''
const FORMSPREE_SPECIAL = ''

const specialBattleOptions = [
  'Most Beautiful Box Battle',
  'Country Box Battle',
  'Lowest Coins Box Battle',
  'Scavengers Box Games',
  'Champion of Champions',
]

const battleMeta = {
  official: {
    emoji: '⚔️',
    label: 'Official Godsent Box Battle',
    subtitle: 'Enter your TikTok handle and availability to compete in the next Official Godsent Box Battle.',
    accent: '#FF6B1A',
    accentBg: 'rgba(255,107,26,0.12)',
    accentBorder: 'rgba(255,107,26,0.25)',
  },
  special: {
    emoji: '👑',
    label: 'Special Battle Sign-Up',
    subtitle: 'Choose your battle type, drop your handle, and pick your available date.',
    accent: '#6B3FA0',
    accentBg: 'rgba(107,63,160,0.15)',
    accentBorder: 'rgba(107,63,160,0.3)',
  },
}

export default function SignUpModal({ type = 'official', isOpen, onClose }) {
  const isOfficial = type === 'official'
  const endpoint = isOfficial ? FORMSPREE_OFFICIAL : FORMSPREE_SPECIAL
  const meta = battleMeta[type]

  const [form, setForm] = useState({ tiktok: '', game: '', date: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen])

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const payload = { ...form, battleType: isOfficial ? 'Official Box Battle' : form.game, submittedAt: new Date().toISOString() }
    if (endpoint) {
      try { await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }) } catch {}
    }
    setSubmitting(false)
    setSubmitted(true)
  }

  const handleClose = () => {
    setSubmitted(false)
    setForm({ tiktok: '', game: '', date: '' })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(18,6,32,0.85)', backdropFilter: 'blur(12px)' }}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl animate-fade-in"
        style={{
          background: 'linear-gradient(160deg, rgba(45,16,80,0.98) 0%, rgba(18,6,32,0.99) 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,107,26,0.08)',
        }}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${meta.accent}, transparent)` }} />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white transition-all hover:scale-110 z-10"
          style={{ background: 'rgba(255,255,255,0.06)' }}
          aria-label="Close"
        >
          <span className="w-4 h-4 block">{Icons.close}</span>
        </button>

        <div className="p-7">
          {submitted ? (
            /* ── Success state ── */
            <div className="text-center py-8">
              <div
                className="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(255,107,26,0.15)', border: '1px solid rgba(255,107,26,0.25)' }}
              >
                <span className="w-8 h-8 block text-ember">{Icons.check}</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-ivory mb-2">You're In!</h3>
              <p className="text-white/50 text-sm mb-8 leading-relaxed">
                Your entry has been submitted.<br />See you in the battle!
              </p>
              <button
                onClick={handleClose}
                className="px-8 py-3 text-sm font-bold text-white rounded-xl transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)' }}
              >
                Let's Go 🔥
              </button>
            </div>
          ) : (
            <>
              {/* ── Header ── */}
              <div className="flex items-start gap-4 mb-7">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: meta.accentBg, border: `1px solid ${meta.accentBorder}` }}
                >
                  {meta.emoji}
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-ivory leading-tight mb-1">
                    {meta.label}
                  </h3>
                  <p className="text-white/45 text-xs leading-relaxed">{meta.subtitle}</p>
                </div>
              </div>

              {/* ── Form ── */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* TikTok username */}
                <div>
                  <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">
                    TikTok Username *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-sm font-bold">@</span>
                    <input
                      type="text"
                      name="tiktok"
                      value={form.tiktok}
                      onChange={handleChange}
                      required
                      placeholder="yourusername"
                      className="w-full pl-8 pr-4 py-3 text-sm text-ivory placeholder-white/20 rounded-xl focus:outline-none transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                      onFocus={e => { e.target.style.border = `1px solid ${meta.accent}60`; e.target.style.boxShadow = `0 0 0 3px ${meta.accent}15` }}
                      onBlur={e => { e.target.style.border = '1px solid rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none' }}
                    />
                  </div>
                </div>

                {/* Battle type (special only) */}
                {!isOfficial && (
                  <div>
                    <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">
                      Choose Battle *
                    </label>
                    <select
                      name="game"
                      value={form.game}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 text-sm text-ivory rounded-xl focus:outline-none transition-all appearance-none"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                      onFocus={e => { e.target.style.border = `1px solid ${meta.accent}60` }}
                      onBlur={e => { e.target.style.border = '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <option value="" className="bg-[#1F0A38]">Select a battle...</option>
                      {specialBattleOptions.map(opt => (
                        <option key={opt} value={opt} className="bg-[#1F0A38]">{opt}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Date */}
                <div>
                  <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">
                    Date Available *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-sm text-ivory rounded-xl focus:outline-none transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      colorScheme: 'dark',
                    }}
                    onFocus={e => { e.target.style.border = `1px solid ${meta.accent}60`; e.target.style.boxShadow = `0 0 0 3px ${meta.accent}15` }}
                    onBlur={e => { e.target.style.border = '1px solid rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none' }}
                  />
                </div>

                {/* Requirements note */}
                {isOfficial && (
                  <div
                    className="rounded-xl px-4 py-3 text-xs text-white/50 leading-relaxed"
                    style={{ background: 'rgba(255,107,26,0.06)', border: '1px solid rgba(255,107,26,0.12)' }}
                  >
                    ⚡ Minimum <span className="text-ember font-semibold">5,000 taps</span> required · Say a prayer before your battle
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 text-sm font-bold text-white rounded-xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                  style={{ background: `linear-gradient(135deg, ${meta.accent}, ${isOfficial ? '#CC5200' : '#3B1063'})` }}
                >
                  {submitting ? 'Submitting...' : isOfficial ? 'Submit Entry ⚔️' : 'Sign Me Up 👑'}
                </button>

                <p className="text-white/20 text-[10px] text-center">
                  By submitting you agree to our{' '}
                  <a href="/terms" className="text-white/35 hover:text-white/60 underline transition-colors">Terms of Use</a>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { Icons } from './Icons'
import { apiFetch, readJsonResponse } from '../utils/api'

const FORMSPREE_OFFICIAL = ''
const FORMSPREE_SPECIAL = ''

const OFFICIAL_LABEL = 'Official Godsent Box Battle'

const battleOptions = [
  { value: OFFICIAL_LABEL, entryType: 'official', group: 'Official' },
  { value: 'Most Beautiful Box Battle', entryType: 'special', group: 'Special' },
  { value: 'Country Box Battle', entryType: 'special', group: 'Special' },
  { value: 'Lowest Coins Box Battle', entryType: 'special', group: 'Special' },
  { value: 'Scavengers Box Games', entryType: 'special', group: 'Special' },
  { value: 'Champion of Champions', entryType: 'special', group: 'Special' },
]

const battleMeta = {
  official: {
    emoji: '⚔️',
    label: 'Official Godsent Box Battle',
    subtitle: 'Apply for the next Official Godsent Box Battle.',
    accent: '#FF6B1A',
    accentBg: 'rgba(255,107,26,0.12)',
    accentBorder: 'rgba(255,107,26,0.25)',
  },
  special: {
    emoji: '👑',
    label: 'Special Battle Entry',
    subtitle: 'Choose your special battle and share your details.',
    accent: '#6B3FA0',
    accentBg: 'rgba(107,63,160,0.15)',
    accentBorder: 'rgba(107,63,160,0.3)',
  },
}

function emptyForm(type, preset) {
  const defaultBattle =
    preset?.battleLabel ||
    (type === 'official' ? OFFICIAL_LABEL : '')
  return {
    fullName: '',
    tiktok: '',
    followers: '',
    battle: defaultBattle,
    date: preset?.date || '',
  }
}

export default function SignUpModal({ type = 'official', preset = null, isOpen, onClose }) {
  const [form, setForm] = useState(() => emptyForm(type, preset))
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const selectedOption =
    battleOptions.find((o) => o.value === form.battle) ||
    (form.battle
      ? { value: form.battle, entryType: type === 'official' ? 'official' : 'special' }
      : null)
  const entryType = selectedOption?.entryType || (type === 'official' ? 'official' : 'special')
  const isOfficial = entryType === 'official'
  const meta = battleMeta[isOfficial ? 'official' : 'special']
  const endpoint = isOfficial ? FORMSPREE_OFFICIAL : FORMSPREE_SPECIAL
  const applyingFor = form.battle || (isOfficial ? OFFICIAL_LABEL : 'Select a battle type')
  const battleLocked = Boolean(preset?.battleLabel)

  useEffect(() => {
    if (!isOpen) return
    setForm(emptyForm(type, preset))
    setSubmitted(false)
    setError('')
  }, [isOpen, type, preset])

  useEffect(() => {
    if (!isOpen) return undefined
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      if (!form.battle) throw new Error('Please choose which box battle you are applying for')
      const followers = Number(String(form.followers).replace(/,/g, ''))
      if (!Number.isFinite(followers) || followers < 0) {
        throw new Error('Please enter your TikTok follower count')
      }

      const res = await apiFetch('/api/battle-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entryType,
          battleLabel: form.battle,
          fullName: form.fullName,
          tiktok: form.tiktok,
          followers,
          date: form.date,
        }),
      })
      const data = await readJsonResponse(res)
      if (!res.ok) throw new Error(data.error || 'Could not submit your entry')

      if (endpoint) {
        try {
          await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...form,
              battleType: form.battle,
              submittedAt: new Date().toISOString(),
            }),
          })
        } catch {
          /* ignore */
        }
      }

      setSubmitted(true)
    } catch (err) {
      setError(err.message || 'Submission failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    setSubmitted(false)
    setError('')
    setForm(emptyForm(type, null))
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(18,6,32,0.85)', backdropFilter: 'blur(12px)' }}
        onClick={handleClose}
      />

      <div
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl animate-fade-in"
        style={{
          background: 'linear-gradient(160deg, rgba(45,16,80,0.98) 0%, rgba(18,6,32,0.99) 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,107,26,0.08)',
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
          style={{ background: `linear-gradient(90deg, ${meta.accent}, transparent)` }}
        />

        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white transition-all hover:scale-110 z-10"
          style={{ background: 'rgba(255,255,255,0.06)' }}
          aria-label="Close"
        >
          <span className="w-4 h-4 block">{Icons.close}</span>
        </button>

        <div className="p-7">
          {submitted ? (
            <div className="text-center py-8">
              <div
                className="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(255,107,26,0.15)', border: '1px solid rgba(255,107,26,0.25)' }}
              >
                <span className="w-8 h-8 block text-ember">{Icons.check}</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-ivory mb-2">You&apos;re In!</h3>
              <p className="text-white/50 text-sm mb-2 leading-relaxed">
                Applied for <span className="text-ivory font-semibold">{applyingFor}</span>
              </p>
              <p className="text-white/50 text-sm mb-8 leading-relaxed">
                Your entry has been submitted.<br />See you in the battle!
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="px-8 py-3 text-sm font-bold text-white rounded-xl transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)' }}
              >
                Let&apos;s Go 🔥
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-start gap-4 mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: meta.accentBg, border: `1px solid ${meta.accentBorder}` }}
                >
                  {meta.emoji}
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-ivory leading-tight mb-1">
                    Join a Box Battle
                  </h3>
                  <p className="text-white/45 text-xs leading-relaxed">{meta.subtitle}</p>
                </div>
              </div>

              {/* Clear applying-for banner */}
              <div
                className="rounded-xl px-4 py-3 mb-5"
                style={{
                  background: meta.accentBg,
                  border: `1px solid ${meta.accentBorder}`,
                }}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: meta.accent }}>
                  Applying for
                </p>
                <p className="font-display font-bold text-ivory text-base leading-snug">
                  {applyingFor}
                </p>
                {preset?.title && preset.title !== applyingFor ? (
                  <p className="text-white/45 text-xs mt-1">{preset.title}</p>
                ) : null}
                {form.date ? (
                  <p className="text-white/45 text-xs mt-1">Available date: {form.date}</p>
                ) : null}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">
                    Box battle type *
                  </label>
                  {battleLocked ? (
                    <div
                      className="w-full px-4 py-3 text-sm text-ivory rounded-xl"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      {form.battle}
                    </div>
                  ) : (
                    <select
                      name="battle"
                      value={form.battle}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 text-sm text-ivory rounded-xl focus:outline-none transition-all appearance-none"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                      onFocus={(e) => {
                        e.target.style.border = `1px solid ${meta.accent}60`
                      }}
                      onBlur={(e) => {
                        e.target.style.border = '1px solid rgba(255,255,255,0.08)'
                      }}
                    >
                      <option value="" className="bg-[#1F0A38]">
                        Select the battle you&apos;re applying for…
                      </option>
                      <optgroup label="Official" className="bg-[#1F0A38]">
                        {battleOptions
                          .filter((o) => o.group === 'Official')
                          .map((opt) => (
                            <option key={opt.value} value={opt.value} className="bg-[#1F0A38]">
                              {opt.value}
                            </option>
                          ))}
                      </optgroup>
                      <optgroup label="Special" className="bg-[#1F0A38]">
                        {battleOptions
                          .filter((o) => o.group === 'Special')
                          .map((opt) => (
                            <option key={opt.value} value={opt.value} className="bg-[#1F0A38]">
                              {opt.value}
                            </option>
                          ))}
                      </optgroup>
                    </select>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">
                    Full name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    placeholder="Your full name"
                    className="w-full px-4 py-3 text-sm text-ivory placeholder-white/20 rounded-xl focus:outline-none transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                    onFocus={(e) => {
                      e.target.style.border = `1px solid ${meta.accent}60`
                      e.target.style.boxShadow = `0 0 0 3px ${meta.accent}15`
                    }}
                    onBlur={(e) => {
                      e.target.style.border = '1px solid rgba(255,255,255,0.08)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">
                    TikTok username *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-sm font-bold">
                      @
                    </span>
                    <input
                      type="text"
                      name="tiktok"
                      value={form.tiktok}
                      onChange={handleChange}
                      required
                      autoComplete="username"
                      placeholder="yourusername"
                      className="w-full pl-8 pr-4 py-3 text-sm text-ivory placeholder-white/20 rounded-xl focus:outline-none transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                      onFocus={(e) => {
                        e.target.style.border = `1px solid ${meta.accent}60`
                        e.target.style.boxShadow = `0 0 0 3px ${meta.accent}15`
                      }}
                      onBlur={(e) => {
                        e.target.style.border = '1px solid rgba(255,255,255,0.08)'
                        e.target.style.boxShadow = 'none'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">
                    TikTok followers *
                  </label>
                  <input
                    type="number"
                    name="followers"
                    value={form.followers}
                    onChange={handleChange}
                    required
                    min={0}
                    step={1}
                    inputMode="numeric"
                    placeholder="e.g. 12500"
                    className="w-full px-4 py-3 text-sm text-ivory placeholder-white/20 rounded-xl focus:outline-none transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                    onFocus={(e) => {
                      e.target.style.border = `1px solid ${meta.accent}60`
                      e.target.style.boxShadow = `0 0 0 3px ${meta.accent}15`
                    }}
                    onBlur={(e) => {
                      e.target.style.border = '1px solid rgba(255,255,255,0.08)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">
                    Date available *
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
                    onFocus={(e) => {
                      e.target.style.border = `1px solid ${meta.accent}60`
                      e.target.style.boxShadow = `0 0 0 3px ${meta.accent}15`
                    }}
                    onBlur={(e) => {
                      e.target.style.border = '1px solid rgba(255,255,255,0.08)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>

                {isOfficial ? (
                  <div
                    className="rounded-xl px-4 py-3 text-xs text-white/50 leading-relaxed"
                    style={{
                      background: 'rgba(255,107,26,0.06)',
                      border: '1px solid rgba(255,107,26,0.12)',
                    }}
                  >
                    ⚡ Minimum <span className="text-ember font-semibold">5,000 taps</span> required ·
                    Say a prayer before your battle
                  </div>
                ) : null}

                {error ? (
                  <p
                    className="rounded-xl px-4 py-3 text-xs leading-relaxed"
                    style={{
                      background: 'rgba(255,90,90,0.12)',
                      border: '1px solid rgba(255,120,120,0.35)',
                      color: '#ffb4b4',
                    }}
                  >
                    {error}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 text-sm font-bold text-white rounded-xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                  style={{
                    background: `linear-gradient(135deg, ${meta.accent}, ${isOfficial ? '#CC5200' : '#3B1063'})`,
                  }}
                >
                  {submitting ? 'Sending…' : `Apply for ${applyingFor}`}
                </button>

                <p className="text-white/20 text-[10px] text-center">
                  By submitting you agree to our{' '}
                  <a
                    href="/terms"
                    className="text-white/35 hover:text-white/60 underline transition-colors"
                  >
                    Terms of Use
                  </a>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

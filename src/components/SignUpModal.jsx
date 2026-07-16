import { useState, useEffect, useRef } from 'react'
import { Icons } from './Icons'
import { apiFetch, readJsonResponse } from '../utils/api'
import { BATTLE_SUBMIT_LABEL } from '../constants/brand'
import './SignUpModal.css'

const FORMSPREE_OFFICIAL = ''
const FORMSPREE_SPECIAL = ''

const OFFICIAL_LABEL = 'Official Godsent Box Battle'

const battleOptions = [
  { value: OFFICIAL_LABEL, entryType: 'official', group: 'Official' },
  { value: 'Most Beautiful/Handsome Box Battle', entryType: 'special', group: 'Special' },
  { value: 'Country Box Battle', entryType: 'special', group: 'Special' },
  { value: 'Soccer/Football Box Battle', entryType: 'special', group: 'Special' },
  { value: 'NFL/National Football League Box Battle', entryType: 'special', group: 'Special' },
  { value: 'NBA Box Battle', entryType: 'special', group: 'Special' },
]

const battleMeta = {
  official: {
    label: 'Official Godsent Box Battle',
    badge: 'Official entry',
    accent: '#FF6B1A',
    accentDark: '#CC5200',
  },
  special: {
    label: 'Special Battle Entry',
    badge: 'Special entry',
    accent: '#6B3FA0',
    accentDark: '#3B1063',
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
    leagueLevel: '',
    badgeNumber: '',
    hasCommunity: '',
    highestCoins: '',
  }
}

export default function SignUpModal({ type = 'official', preset = null, isOpen, onClose }) {
  const [form, setForm] = useState(() => emptyForm(type, preset))
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const firstFieldRef = useRef(null)

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

  useEffect(() => {
    if (!isOpen || submitted) return undefined
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 50)
    return () => window.clearTimeout(t)
  }, [isOpen, submitted, battleLocked])

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

      if (isOfficial) {
        if (!String(form.leagueLevel).trim()) {
          throw new Error('Please enter your league level')
        }
        if (!String(form.badgeNumber).trim()) {
          throw new Error('Please enter your badge number')
        }
        if (!form.hasCommunity) {
          throw new Error('Please tell us if you have a community or team')
        }
        const highestCoins = Number(String(form.highestCoins).replace(/,/g, ''))
        if (!Number.isFinite(highestCoins) || highestCoins < 0) {
          throw new Error('Please enter your highest coins ever on TikTok')
        }
      }

      const payload = {
        entryType,
        battleLabel: form.battle,
        fullName: form.fullName,
        tiktok: form.tiktok,
        followers,
        date: form.date,
      }

      if (isOfficial) {
        payload.leagueLevel = String(form.leagueLevel).trim()
        payload.badgeNumber = String(form.badgeNumber).trim()
        payload.hasCommunity = form.hasCommunity
        payload.highestCoins = Number(String(form.highestCoins).replace(/,/g, ''))
      }

      const res = await apiFetch('/api/battle-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-5">
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(18,6,32,0.85)', backdropFilter: 'blur(12px)' }}
        onClick={handleClose}
      />

      <div className="signup-modal" style={{ '--signup-accent': meta.accent }}>
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-3.5 right-3.5 w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white transition-all hover:scale-110 z-10"
          style={{ background: 'rgba(255,255,255,0.06)' }}
          aria-label="Close"
        >
          <span className="w-4 h-4 block">{Icons.close}</span>
        </button>

        <div className="signup-modal__inner">
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
              <header className={`signup-modal__header${isOfficial ? ' signup-modal__header--compact' : ''}`}>
                <div className="signup-modal__badge">
                  <span className="signup-modal__badge-dot" aria-hidden />
                  {meta.badge}
                </div>
                <h2 className="signup-modal__title">Join Box Battle</h2>
                {!isOfficial ? (
                  <p className="signup-modal__subtitle">
                    {battleLocked
                      ? `Apply for ${form.battle}`
                      : 'Tell us about yourself — we review every application.'}
                  </p>
                ) : null}
              </header>

              <form
                onSubmit={handleSubmit}
                className={`signup-modal__form${isOfficial ? ' signup-modal__form--official' : ''}`}
                style={{ '--signup-accent': meta.accent }}
              >
                {!battleLocked ? (
                  <div className="signup-field signup-field--full signup-field--battle">
                    <label className="signup-field__label" htmlFor="signup-battle">
                      Box battle type *
                    </label>
                    <select
                      id="signup-battle"
                      ref={firstFieldRef}
                      name="battle"
                      value={form.battle}
                      onChange={handleChange}
                      required
                      className="signup-field__control signup-field__control--select"
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
                  </div>
                ) : (
                  <div className="signup-field signup-field--full signup-field--battle">
                    <label className="signup-field__label">Box battle type *</label>
                    <div ref={firstFieldRef} tabIndex={-1} className="signup-field__static">
                      {form.battle}
                    </div>
                  </div>
                )}

                <div className="signup-field">
                    <label className="signup-field__label" htmlFor="signup-name">
                      Full name *
                    </label>
                    <input
                      id="signup-name"
                      ref={battleLocked ? firstFieldRef : undefined}
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      placeholder="Your full name"
                      className="signup-field__control"
                    />
                  </div>

                  <div className="signup-field">
                    <label className="signup-field__label" htmlFor="signup-tiktok">
                      TikTok username *
                    </label>
                    <div className="signup-field__wrap">
                      <span className="signup-field__at" aria-hidden>
                        @
                      </span>
                      <input
                        id="signup-tiktok"
                        type="text"
                        name="tiktok"
                        value={form.tiktok}
                        onChange={handleChange}
                        required
                        autoComplete="username"
                        placeholder="yourusername"
                        className="signup-field__control signup-field__tiktok"
                      />
                    </div>
                  </div>

                  <div className="signup-field">
                    <label className="signup-field__label" htmlFor="signup-followers">
                      TikTok followers *
                    </label>
                    <input
                      id="signup-followers"
                      type="number"
                      name="followers"
                      value={form.followers}
                      onChange={handleChange}
                      required
                      min={0}
                      step={1}
                      inputMode="numeric"
                      placeholder="e.g. 12500"
                      className="signup-field__control"
                    />
                  </div>

                  <div className="signup-field">
                    <label className="signup-field__label" htmlFor="signup-date">
                      Date available *
                    </label>
                    <input
                      id="signup-date"
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      required
                      className="signup-field__control signup-field__control--date"
                    />
                  </div>

                {isOfficial ? (
                  <>
                    <div className="signup-field">
                      <label className="signup-field__label" htmlFor="signup-league">
                        League level *
                      </label>
                      <input
                        id="signup-league"
                        type="text"
                        name="leagueLevel"
                        value={form.leagueLevel}
                        onChange={handleChange}
                        required
                        placeholder="e.g. A1, B2"
                        className="signup-field__control"
                      />
                    </div>

                    <div className="signup-field">
                      <label className="signup-field__label" htmlFor="signup-badge">
                        Badge number *
                      </label>
                      <input
                        id="signup-badge"
                        type="text"
                        name="badgeNumber"
                        value={form.badgeNumber}
                        onChange={handleChange}
                        required
                        placeholder="Your badge number"
                        className="signup-field__control"
                      />
                    </div>

                    <div className="signup-field">
                      <label className="signup-field__label" htmlFor="signup-coins">
                        Highest coins *
                      </label>
                      <input
                        id="signup-coins"
                        type="number"
                        name="highestCoins"
                        value={form.highestCoins}
                        onChange={handleChange}
                        required
                        min={0}
                        step={1}
                        inputMode="numeric"
                        placeholder="e.g. 500000"
                        className="signup-field__control"
                      />
                    </div>

                    <div className="signup-field signup-field--community">
                      <span className="signup-field__label">Community / team? *</span>
                      <div className="signup-pills" role="radiogroup" aria-label="Community or team">
                        <label className="signup-pill">
                          <input
                            type="radio"
                            name="hasCommunity"
                            value="yes"
                            checked={form.hasCommunity === 'yes'}
                            onChange={handleChange}
                            required
                          />
                          <span>Yes</span>
                        </label>
                        <label className="signup-pill">
                          <input
                            type="radio"
                            name="hasCommunity"
                            value="no"
                            checked={form.hasCommunity === 'no'}
                            onChange={handleChange}
                          />
                          <span>No</span>
                        </label>
                      </div>
                    </div>

                    <p className="signup-field--full signup-modal__note signup-modal__note--inline">
                      Min. <span className="text-ember font-semibold">5,000 taps</span> required · Say a prayer before your battle
                    </p>
                  </>
                ) : null}

                {error ? (
                  <p className="signup-field--full signup-modal__error" role="alert">
                    {error}
                  </p>
                ) : null}

                <div className={`signup-modal__footer${isOfficial ? ' signup-modal__footer--compact' : ''}`}>
                  <button type="submit" disabled={submitting} className="signup-modal__submit">
                    {submitting ? 'Sending…' : BATTLE_SUBMIT_LABEL}
                  </button>
                  <p className="signup-modal__terms">
                    By submitting you agree to our <a href="/terms">Terms of Use</a>
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

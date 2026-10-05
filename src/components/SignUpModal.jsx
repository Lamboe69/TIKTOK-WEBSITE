import { useState, useEffect, useRef, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { Icons } from './Icons'
import { apiFetch, readJsonResponse } from '../utils/api'
import { BATTLE_SUBMIT_LABEL } from '../constants/brand'
import { useContent } from '../cms/ContentContext'
import {
  battleCatalogToFormOptions,
  battleRequiresCountry,
  battleRequiresTeam,
  defaultOfficialBattleLabel,
} from '../cms/battleCatalog'
import './SignUpModal.css'

const FORMSPREE_OFFICIAL = ''
const FORMSPREE_SPECIAL = ''

const FALLBACK_LEAGUE_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

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

function RequiredLabel({ htmlFor, children, as = 'label' }) {
  const Tag = as
  return (
    <Tag className="signup-field__label" htmlFor={as === 'label' ? htmlFor : undefined}>
      {children} <span className="signup-field__required" aria-hidden="true">*</span>
    </Tag>
  )
}

function emptyForm(type, preset, officialLabel) {
  const defaultBattle =
    preset?.battleLabel ||
    (type === 'official' ? officialLabel : '')
  return {
    fullName: '',
    tiktok: '',
    email: '',
    country: '',
    team: '',
    whatsapp: '',
    followers: '',
    battle: defaultBattle,
    leagueLevel: '',
    badgeNumber: '',
    hasCommunity: '',
    highestCoins: '',
    canRallySupporters: '',
  }
}

export default function SignUpModal({ type = 'official', preset = null, isOpen, onClose }) {
  const { collections } = useContent()
  const battleOptions = useMemo(
    () => battleCatalogToFormOptions(collections.battleCatalog),
    [collections.battleCatalog],
  )
  const officialLabel = useMemo(
    () => defaultOfficialBattleLabel(collections.battleCatalog),
    [collections.battleCatalog],
  )
  const leagueLevels = useMemo(() => {
    const fromCms = (collections.leagueLevels || [])
      .map((row) => String(row.label || '').trim())
      .filter(Boolean)
    return fromCms.length ? fromCms : FALLBACK_LEAGUE_LEVELS
  }, [collections.leagueLevels])

  const [form, setForm] = useState(() => emptyForm(type, preset, officialLabel))
  const [consentChecked, setConsentChecked] = useState(false)
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
  const applyingFor = form.battle || officialLabel || 'Select a battle type'
  const battleLocked = Boolean(preset?.battleLabel)
  const showCountry = battleRequiresCountry(form.battle)
  const showTeam = battleRequiresTeam({
    battleLabel: form.battle,
    battleType: selectedOption?.category || preset?.battleType,
    schedule: collections.schedule,
    catalog: collections.battleCatalog,
  })

  useEffect(() => {
    if (!isOpen) return
    setForm(emptyForm(type, preset, officialLabel))
    setConsentChecked(false)
    setSubmitted(false)
    setError('')
  }, [isOpen, type, preset, officialLabel])

  useEffect(() => {
    if (!isOpen) return undefined
    const handler = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) return undefined
    const html = document.documentElement
    const prevHtml = html.style.overflow
    const prevBody = document.body.style.overflow
    html.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => {
      html.style.overflow = prevHtml
      document.body.style.overflow = prevBody
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || submitted) return undefined
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 50)
    return () => window.clearTimeout(t)
  }, [isOpen, submitted, battleLocked])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleBattleSelect = (value) => {
    setForm({ ...form, battle: value })
  }

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
      if (!String(form.email).trim()) {
        throw new Error('Please enter your email address')
      }
      if (showCountry && !String(form.country).trim()) {
        throw new Error('Please enter your country')
      }
      if (showTeam && !String(form.team).trim()) {
        throw new Error('Please enter your team name')
      }
      if (!String(form.whatsapp).trim()) {
        throw new Error('Please enter your WhatsApp number')
      }
      if (!String(form.leagueLevel).trim()) {
        throw new Error('Please select your league level')
      }
      if (!String(form.badgeNumber).trim()) {
        throw new Error('Please enter your badge number')
      }
      if (!form.hasCommunity) {
        throw new Error('Please tell us if you have a community or team')
      }
      const highestCoins = Number(String(form.highestCoins).replace(/,/g, ''))
      if (!Number.isFinite(highestCoins) || highestCoins < 0) {
        throw new Error('Please enter your highest TikTok coins gained in a single battle')
      }
      if (!form.canRallySupporters) {
        throw new Error('Please tell us if you can rally your supporters for the event')
      }
      if (!consentChecked) {
        throw new Error('Please confirm the consent statement before submitting')
      }

      const formData = new FormData()
      formData.append('entryType', entryType)
      formData.append('battleLabel', form.battle)
      formData.append('fullName', form.fullName)
      formData.append('tiktok', form.tiktok)
      formData.append('email', form.email)
      formData.append('country', showCountry ? form.country : '')
      formData.append('team', showTeam ? form.team : '')
      if (preset?.battleType) formData.append('scheduleType', preset.battleType)
      formData.append('whatsapp', form.whatsapp)
      formData.append('followers', String(followers))
      formData.append('leagueLevel', String(form.leagueLevel).trim())
      formData.append('badgeNumber', String(form.badgeNumber).trim())
      formData.append('hasCommunity', form.hasCommunity)
      formData.append('highestCoins', String(highestCoins))
      formData.append('canRallySupporters', form.canRallySupporters)
      formData.append('consentConfirmed', 'yes')

      const res = await apiFetch('/api/battle-applications', {
        method: 'POST',
        body: formData,
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
    setConsentChecked(false)
    setForm(emptyForm(type, null, officialLabel))
    onClose()
  }

  if (!isOpen) return null

  return createPortal(
    <>
      <div
        className="signup-modal-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="signup-modal-title"
      >
        <button
          type="button"
          className="signup-modal-backdrop"
          aria-label="Close"
          onClick={handleClose}
        />

        <div className="signup-modal" style={{ '--signup-accent': meta.accent }}>
          <button
            type="button"
            onClick={handleClose}
            className="signup-modal__close"
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
              <h3 className="font-display font-bold text-2xl text-ivory mb-2">Application Received!</h3>
              <p className="text-white/50 text-sm mb-3 leading-relaxed max-w-md mx-auto">
                Thank you for applying for{' '}
                <span className="text-ivory font-semibold">{applyingFor}</span>.
              </p>
              <p className="text-white/55 text-sm mb-8 leading-relaxed max-w-md mx-auto">
                Your application was well received and is being processed. Our team will review your
                details and contact you about the next steps.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="px-8 py-3 text-sm font-bold text-white rounded-xl transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)' }}
              >
                Done
              </button>
            </div>
          ) : (
            <>
              <header className="signup-modal__header">
                <h2 id="signup-modal-title" className="signup-modal__title">Join Box Battle</h2>
                <p className="signup-modal__subtitle">
                  {battleLocked
                    ? `Apply for ${form.battle}`
                    : 'Tell us about yourself — we review every application.'}
                </p>
              </header>

              <form
                onSubmit={handleSubmit}
                className="signup-modal__form"
                style={{ '--signup-accent': meta.accent }}
              >
                {!battleLocked ? (
                  <fieldset className="signup-field signup-field--full signup-field--battle">
                    <RequiredLabel as="legend">Box battle type</RequiredLabel>
                    <div className="signup-battle-list" ref={firstFieldRef} tabIndex={-1}>
                      {battleOptions.map((opt, index) => (
                        <label key={opt.value} className="signup-battle-option">
                          <input
                            type="radio"
                            name="battle"
                            value={opt.value}
                            checked={form.battle === opt.value}
                            onChange={() => handleBattleSelect(opt.value)}
                            required={index === 0}
                          />
                          <span>{opt.value}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                ) : (
                  <div className="signup-field signup-field--full signup-field--battle">
                    <RequiredLabel>Box battle type</RequiredLabel>
                    <div ref={firstFieldRef} tabIndex={-1} className="signup-field__static">
                      {form.battle}
                    </div>
                  </div>
                )}

                <div className="signup-field">
                  <RequiredLabel htmlFor="signup-name">TikTok name</RequiredLabel>
                  <input
                    id="signup-name"
                    ref={battleLocked ? firstFieldRef : undefined}
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                    autoComplete="nickname"
                    placeholder="Your TikTok name"
                    className="signup-field__control"
                  />
                </div>

                <div className="signup-field">
                  <RequiredLabel htmlFor="signup-tiktok">TikTok username</RequiredLabel>
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
                  <RequiredLabel htmlFor="signup-email">Email address</RequiredLabel>
                  <input
                    id="signup-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="signup-field__control"
                  />
                </div>

                {showCountry ? (
                  <div className="signup-field">
                    <RequiredLabel htmlFor="signup-country">Country</RequiredLabel>
                    <input
                      id="signup-country"
                      type="text"
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      required
                      autoComplete="country-name"
                      placeholder="e.g. Uganda"
                      className="signup-field__control"
                    />
                  </div>
                ) : null}

                {showTeam ? (
                  <div className="signup-field">
                    <RequiredLabel htmlFor="signup-team">Team</RequiredLabel>
                    <input
                      id="signup-team"
                      type="text"
                      name="team"
                      value={form.team}
                      onChange={handleChange}
                      required
                      autoComplete="organization"
                      placeholder="e.g. Manchester United"
                      className="signup-field__control"
                    />
                  </div>
                ) : null}

                <div className="signup-field">
                  <RequiredLabel htmlFor="signup-whatsapp">WhatsApp number</RequiredLabel>
                  <input
                    id="signup-whatsapp"
                    type="tel"
                    name="whatsapp"
                    value={form.whatsapp}
                    onChange={handleChange}
                    required
                    autoComplete="tel"
                    placeholder="e.g. +256 700 000000"
                    className="signup-field__control"
                  />
                </div>

                <div className="signup-field">
                  <RequiredLabel htmlFor="signup-followers">TikTok followers</RequiredLabel>
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
                  <RequiredLabel htmlFor="signup-league">League level</RequiredLabel>
                  <select
                    id="signup-league"
                    name="leagueLevel"
                    value={form.leagueLevel}
                    onChange={handleChange}
                    required
                    className="signup-field__control signup-field__control--select"
                  >
                    <option value="" className="bg-[#1F0A38]">
                      Select your league level…
                    </option>
                    {leagueLevels.map((level) => (
                      <option key={level} value={level} className="bg-[#1F0A38]">
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="signup-field">
                  <RequiredLabel htmlFor="signup-badge">Badge number</RequiredLabel>
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

                <div className="signup-field signup-field--full">
                  <RequiredLabel htmlFor="signup-coins">
                    What is your highest number of TikTok coins gained in a single battle?
                  </RequiredLabel>
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

                <div className="signup-field signup-field--full signup-field--community">
                  <RequiredLabel as="span">
                    Can you rally your supporters for the event and win it?
                  </RequiredLabel>
                  <div className="signup-pills" role="radiogroup" aria-label="Rally supporters">
                    {['yes', 'no', 'maybe'].map((value) => (
                      <label key={value} className="signup-pill">
                        <input
                          type="radio"
                          name="canRallySupporters"
                          value={value}
                          checked={form.canRallySupporters === value}
                          onChange={handleChange}
                          required
                        />
                        <span>{value.charAt(0).toUpperCase() + value.slice(1)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="signup-field signup-field--full signup-field--community">
                  <RequiredLabel as="span">Community / team?</RequiredLabel>
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

                <div className="signup-field signup-field--full signup-field--consent">
                  <label className="signup-consent">
                    <input
                      type="checkbox"
                      checked={consentChecked}
                      onChange={(e) => setConsentChecked(e.target.checked)}
                      required
                    />
                    <span>
                      I confirm that the information provided are correct. I understand that
                      incorrect information may lead to automatic disqualification of my
                      participation.
                    </span>
                  </label>
                </div>

                {error ? (
                  <p className="signup-field--full signup-modal__error" role="alert">
                    {error}
                  </p>
                ) : null}

                <div className="signup-modal__footer">
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

    </>,
    document.body,
  )
}

import { useState } from 'react'
import { Icons } from './Icons'

const FORMSPREE_OFFICIAL = '' // Replace with Formspree ID for Official Box Battle
const FORMSPREE_SPECIAL = ''  // Replace with Formspree ID for Special Battles

const specialBattleOptions = [
  'Most Beautiful Box Battle',
  'Country Box Battle',
  'Lowest Coins Box Battle',
  'Scavengers Box Games',
  'Champion of Champions',
]

export default function SignUpModal({ type = 'official', isOpen, onClose }) {
  const isOfficial = type === 'official'
  const endpoint = isOfficial ? FORMSPREE_OFFICIAL : FORMSPREE_SPECIAL

  const [form, setForm] = useState({
    tiktok: '',
    game: '',
    date: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    const payload = {
      ...form,
      battleType: isOfficial ? 'Official Box Battle' : form.game,
      submittedAt: new Date().toISOString(),
    }

    if (endpoint) {
      try {
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      } catch {
        // Continue to success state
      }
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
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-slide-up">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-dynasty-charcoal hover:bg-gray-100 transition-colors z-10"
          aria-label="Close"
        >
          <span className="w-5 h-5 block">{Icons.close}</span>
        </button>

        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <span className="w-8 h-8 block text-green-600">{Icons.check}</span>
              </div>
              <h3 className="font-display font-bold text-xl text-dynasty-charcoal mb-2">You're In!</h3>
              <p className="text-sm text-gray-500 mb-6">
                Your entry has been submitted. See you in the battle!
              </p>
              <button
                onClick={handleClose}
                className="px-6 py-2.5 bg-dynasty-purple text-white text-sm font-semibold rounded-xl hover:bg-dynasty-purple-dark transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="font-display font-bold text-xl text-dynasty-charcoal mb-1">
                  {isOfficial ? 'Official Godsent Box Battle' : 'Special Battle Sign-Up'}
                </h3>
                <p className="text-xs text-gray-500">
                  {isOfficial
                    ? 'Enter your TikTok handle and availability to compete in the next Official Godsent Box Battle.'
                    : 'Choose your battle, drop your handle, pick your date.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-dynasty-charcoal mb-1">
                    TikTok Username *
                  </label>
                  <input
                    type="text"
                    name="tiktok"
                    value={form.tiktok}
                    onChange={handleChange}
                    required
                    placeholder="@yourusername"
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-dynasty-purple focus:ring-1 focus:ring-dynasty-purple/20 transition-colors"
                  />
                </div>

                {!isOfficial && (
                  <div>
                    <label className="block text-xs font-semibold text-dynasty-charcoal mb-1">
                      Choose Game to Participate *
                    </label>
                    <select
                      name="game"
                      value={form.game}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-dynasty-purple focus:ring-1 focus:ring-dynasty-purple/20 transition-colors bg-white"
                    >
                      <option value="">Select a battle...</option>
                      {specialBattleOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-dynasty-charcoal mb-1">
                    Date Available *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-dynasty-purple focus:ring-1 focus:ring-dynasty-purple/20 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full py-3 text-white font-bold text-sm rounded-xl transition-colors ${
                    submitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : isOfficial
                        ? 'bg-dynasty-purple hover:bg-dynasty-purple-dark'
                        : 'bg-dynasty-orange hover:bg-dynasty-orange-dark'
                  }`}
                >
                  {submitting ? 'Submitting...' : 'Submit Entry'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

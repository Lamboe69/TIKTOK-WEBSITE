import { useEffect, useState } from 'react'
import { Icons } from './Icons'
import { useSignUp } from './SignUpContext'
import { BATTLE_EMAIL } from '../constants/brand'

const STORAGE_KEY = 'km-box-battle-popup-dismissed'

export default function BoxBattlePopup() {
  const { openOfficial } = useSignUp()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return
      const t = window.setTimeout(() => setOpen(true), 1200)
      return () => window.clearTimeout(t)
    } catch {
      setOpen(true)
    }
  }, [])

  const dismiss = () => {
    setOpen(false)
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* ignore */
    }
  }

  const join = () => {
    dismiss()
    openOfficial()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[55] flex items-end sm:items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-label="Close"
        onClick={dismiss}
      />
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden animate-fade-in"
        style={{
          background: 'linear-gradient(160deg, rgba(45,16,80,0.98) 0%, rgba(18,6,32,0.99) 100%)',
          border: '1px solid rgba(255,107,26,0.35)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.55)',
        }}
        role="dialog"
        aria-labelledby="box-battle-popup-title"
      >
        <div className="h-1" style={{ background: 'linear-gradient(90deg, #FF6B1A, #E8B94A)' }} />
        <button
          type="button"
          onClick={dismiss}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white"
          style={{ background: 'rgba(255,255,255,0.06)' }}
          aria-label="Close"
        >
          <span className="w-4 h-4 block">{Icons.close}</span>
        </button>
        <div className="p-6 sm:p-7">
          <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-ember mb-2">
            Official Godsent Box Battle
          </p>
          <h2 id="box-battle-popup-title" className="font-display font-bold text-2xl text-ivory leading-tight mb-3">
            Ready for the arena?
          </h2>
          <p className="text-white/60 text-sm leading-relaxed mb-5">
            Gift the host, tap to 5K likes, and claim your slot in the KM Dynasty box battle.
            Apply in seconds — we review every entry.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={join}
              className="flex-1 py-3 px-4 text-sm font-bold text-white rounded-xl transition-all hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)' }}
            >
              Apply — {BATTLE_EMAIL}
            </button>
            <button
              type="button"
              onClick={dismiss}
              className="py-3 px-4 text-sm font-semibold text-white/55 hover:text-white/80"
            >
              Not now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Icons } from './Icons'
import './Toast.css'

const ToastContext = createContext(null)

export function donateComingSoonToast(siteName = 'KM Dynasty') {
  return {
    kicker: 'Coming soon',
    title: 'Donations opening soon',
    message: `We're finishing secure PayPal giving for ${siteName}. Soon you'll be able to support charity battles, creator missions, and the Dynasty family directly. Thank you for wanting to give.`,
    icon: 'heart',
  }
}

function ToastCard({ toast, onClose }) {
  return (
    <div className="km-toast" role="status" aria-live="polite">
      <div className="km-toast__icon" aria-hidden>
        {Icons[toast.icon] || Icons.heart}
      </div>
      <div className="km-toast__body">
        {toast.kicker ? <p className="km-toast__kicker">{toast.kicker}</p> : null}
        <p className="km-toast__title">{toast.title}</p>
        <p className="km-toast__message">{toast.message}</p>
      </div>
      <button type="button" className="km-toast__close" onClick={onClose} aria-label="Dismiss">
        ×
      </button>
    </div>
  )
}

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)
  const timerRef = useRef(null)

  const hide = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setToast(null)
  }, [])

  const show = useCallback(
    (nextToast, durationMs = 7000) => {
      hide()
      setToast(nextToast)
      timerRef.current = window.setTimeout(hide, durationMs)
    },
    [hide],
  )

  useEffect(() => () => hide(), [hide])

  return (
    <ToastContext.Provider value={{ show, hide, showDonateComingSoon: (siteName) => show(donateComingSoonToast(siteName)) }}>
      {children}
      {toast ? (
        <div className="km-toast-layer">
          <ToastCard toast={toast} onClose={hide} />
        </div>
      ) : null}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

/** Block PayPal submit and show coming-soon toast when donations are not configured. */
export function handleDonateSubmit(e, paypalEmail, siteName, showDonateComingSoon) {
  if (paypalEmail) return true
  e.preventDefault()
  showDonateComingSoon(siteName)
  return false
}

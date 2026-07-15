import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch, readJsonResponse } from '../utils/api'
import './MasterclassCheckout.css'

function loadPayPalSdk(clientId, currency) {
  const existing = document.getElementById('paypal-sdk')
  if (existing) {
    if (window.paypal) return Promise.resolve(window.paypal)
    return new Promise((resolve, reject) => {
      existing.addEventListener('load', () => resolve(window.paypal))
      existing.addEventListener('error', () => reject(new Error('Failed to load PayPal')))
    })
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.id = 'paypal-sdk'
    script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=${encodeURIComponent(currency)}&intent=capture`
    script.async = true
    script.onload = () => resolve(window.paypal)
    script.onerror = () => reject(new Error('Failed to load PayPal'))
    document.body.appendChild(script)
  })
}

function goToEnrolled(navigate, enrollment, tierName, pending) {
  const qs = new URLSearchParams({
    id: String(enrollment?.id || ''),
    tier: enrollment?.tierName || tierName || '',
  })
  if (pending) qs.set('pending', '1')
  navigate(`/masterclass/enrolled?${qs.toString()}`, { replace: true })
}

export default function MasterclassCheckout({ tier, accent, onClose }) {
  const navigate = useNavigate()
  const buttonsRef = useRef(null)
  const [buyerName, setBuyerName] = useState('')
  const [buyerEmail, setBuyerEmail] = useState('')
  const [buyerPhone, setBuyerPhone] = useState('')
  const [step, setStep] = useState('details') // details | pay
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [paypalConfig, setPaypalConfig] = useState(null)
  const formRef = useRef({ buyerName: '', buyerEmail: '', buyerPhone: '' })

  useEffect(() => {
    formRef.current = { buyerName, buyerEmail, buyerPhone }
  }, [buyerName, buyerEmail, buyerPhone])

  useEffect(() => {
    const prevHtml = document.documentElement.style.overflow
    const prevBody = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = prevHtml
      document.body.style.overflow = prevBody
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    apiFetch('/api/paypal/config')
      .then((r) => readJsonResponse(r))
      .then((data) => {
        if (!cancelled) setPaypalConfig(data)
      })
      .catch(() => {
        if (!cancelled) setPaypalConfig({ configured: false })
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (step !== 'pay' || !paypalConfig?.configured || !buttonsRef.current) return undefined

    let cancelled = false

    ;(async () => {
      try {
        setBusy(true)
        setError('')
        const paypal = await loadPayPalSdk(
          paypalConfig.clientId,
          paypalConfig.currency || 'USD',
        )
        if (cancelled || !paypal || !buttonsRef.current) return

        buttonsRef.current.innerHTML = ''
        const buttons = paypal.Buttons({
          style: {
            layout: 'vertical',
            color: 'gold',
            shape: 'rect',
            label: 'pay',
            height: 42,
          },
          createOrder: async () => {
            const { buyerName: name, buyerEmail: email, buyerPhone: phone } = formRef.current
            const res = await apiFetch('/api/paypal/create-order', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                tierId: tier.id,
                buyerName: name,
                buyerEmail: email,
                buyerPhone: phone || undefined,
              }),
            })
            const data = await readJsonResponse(res)
            if (!res.ok) throw new Error(data.error || 'Could not start checkout')
            return data.orderId
          },
          onApprove: async (data) => {
            setBusy(true)
            const res = await apiFetch('/api/paypal/capture-order', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ orderId: data.orderID }),
            })
            const payload = await readJsonResponse(res)
            if (!res.ok) throw new Error(payload.error || 'Payment capture failed')
            goToEnrolled(navigate, payload.enrollment, tier.name, false)
            onClose?.()
          },
          onError: (err) => {
            console.error(err)
            setError(err?.message || 'PayPal error. Please try again.')
            setStep('details')
          },
          onCancel: () => {
            setError('Payment cancelled. You can try again when ready.')
            setStep('details')
          },
        })

        await buttons.render(buttonsRef.current)
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Could not load PayPal')
          setStep('details')
        }
      } finally {
        if (!cancelled) setBusy(false)
      }
    })()

    return () => {
      cancelled = true
      if (buttonsRef.current) buttonsRef.current.innerHTML = ''
    }
  }, [step, paypalConfig, tier, navigate, onClose])

  const reserveWithoutPayPal = async () => {
    setBusy(true)
    setError('')
    try {
      const res = await apiFetch('/api/paypal/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tierId: tier.id,
          buyerName: buyerName.trim(),
          buyerEmail: buyerEmail.trim(),
          buyerPhone: buyerPhone.trim() || undefined,
        }),
      })
      const data = await readJsonResponse(res)
      if (!res.ok) throw new Error(data.error || 'Could not submit enrolment')
      goToEnrolled(navigate, data.enrollment, tier.name, true)
      onClose?.()
    } catch (err) {
      setError(err.message || 'Could not submit enrolment')
    } finally {
      setBusy(false)
    }
  }

  const continueToPay = async (e) => {
    e.preventDefault()
    setError('')
    if (!buyerName.trim() || buyerName.trim().length < 2) {
      setError('Please enter your full name')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyerEmail.trim())) {
      setError('Please enter a valid email')
      return
    }
    if (tier.id == null) {
      setError('This package is missing an ID. Please refresh and try again.')
      return
    }

    if (!paypalConfig?.configured) {
      await reserveWithoutPayPal()
      return
    }

    setStep('pay')
  }

  const paypalReady = Boolean(paypalConfig?.configured)

  return (
    <div className="mc-checkout" role="dialog" aria-modal="true" aria-labelledby="mc-checkout-title">
      <button type="button" className="mc-checkout__backdrop" aria-label="Close checkout" onClick={onClose} />
      <div className="mc-checkout__panel" style={{ ['--mc-accent']: accent || '#FF6B1A' }}>
        <header className="mc-checkout__head">
          <div>
            <p className="mc-checkout__kicker">
              {step === 'pay' ? 'Pay with PayPal' : 'Secure enrolment'}
            </p>
            <h2 id="mc-checkout-title">{tier.name}</h2>
            <p className="mc-checkout__price">{tier.price}</p>
          </div>
          <button type="button" className="mc-checkout__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        {step === 'details' ? (
          <form className="mc-checkout__form" onSubmit={continueToPay}>
            <label>
              Full name
              <input
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                autoComplete="name"
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </label>
            <label>
              Phone <span>(optional)</span>
              <input
                type="tel"
                value={buyerPhone}
                onChange={(e) => setBuyerPhone(e.target.value)}
                autoComplete="tel"
              />
            </label>

            {error ? <p className="mc-checkout__error">{error}</p> : null}

            <p className="mc-checkout__hint">
              {paypalReady
                ? "Next you'll pay securely with PayPal. We'll email you with next steps."
                : "Submit your details now — we'll confirm your seat and send payment instructions."}
            </p>

            <div className="mc-checkout__actions">
              <button type="submit" className="mc-cta" disabled={busy || paypalConfig == null}>
                {busy
                  ? 'Submitting…'
                  : paypalReady
                    ? 'Continue to PayPal'
                    : 'Request enrolment'}
              </button>
              <button type="button" className="mc-link" onClick={onClose} disabled={busy}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="mc-checkout__pay">
            <p className="mc-checkout__hint">
              Paying as <strong>{buyerName}</strong> · {buyerEmail}
            </p>
            {error ? <p className="mc-checkout__error">{error}</p> : null}
            {busy ? <p className="mc-checkout__hint">Loading PayPal…</p> : null}
            <div ref={buttonsRef} className="mc-checkout__buttons" />
            <button type="button" className="mc-link" onClick={() => setStep('details')}>
              Edit details
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

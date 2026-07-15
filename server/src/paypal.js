const API_BASE = {
  sandbox: 'https://api-m.sandbox.paypal.com',
  live: 'https://api-m.paypal.com',
}

export function paypalConfigured() {
  return Boolean(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET)
}

export function paypalMode() {
  const mode = String(process.env.PAYPAL_MODE || 'sandbox').toLowerCase()
  return mode === 'live' ? 'live' : 'sandbox'
}

export function paypalClientId() {
  return process.env.PAYPAL_CLIENT_ID || ''
}

function apiBase() {
  return API_BASE[paypalMode()]
}

let cachedToken = null
let cachedTokenExpiresAt = 0

export async function getPayPalAccessToken() {
  if (!paypalConfigured()) {
    throw new Error('PayPal is not configured. Set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET.')
  }

  if (cachedToken && Date.now() < cachedTokenExpiresAt - 60_000) {
    return cachedToken
  }

  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`,
  ).toString('base64')

  const res = await fetch(`${apiBase()}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error_description || data.message || 'PayPal auth failed')
  }

  cachedToken = data.access_token
  cachedTokenExpiresAt = Date.now() + Number(data.expires_in || 3600) * 1000
  return cachedToken
}

export async function createPayPalOrder({
  amount,
  currency = 'USD',
  description,
  customId,
  softDescriptor,
}) {
  const token = await getPayPalAccessToken()
  const value = Number(amount).toFixed(2)

  const res = await fetch(`${apiBase()}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          custom_id: String(customId),
          description: String(description || 'Masterclass enrollment').slice(0, 127),
          soft_descriptor: softDescriptor ? String(softDescriptor).slice(0, 22) : undefined,
          amount: {
            currency_code: currency,
            value,
          },
        },
      ],
      application_context: {
        shipping_preference: 'NO_SHIPPING',
        user_action: 'PAY_NOW',
        brand_name: 'KM Dynasty',
      },
    }),
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const detail = data?.details?.[0]?.description || data?.message || 'Failed to create PayPal order'
    throw new Error(detail)
  }
  return data
}

export async function capturePayPalOrder(orderId) {
  const token = await getPayPalAccessToken()
  const res = await fetch(`${apiBase()}/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const detail = data?.details?.[0]?.description || data?.message || 'Failed to capture PayPal order'
    throw new Error(detail)
  }
  return data
}

/** Parse display price ("$1,200") or numeric amount field into dollars. */
export function resolveTierAmountDollars(tier) {
  if (!tier) return null
  if (tier.amount != null && tier.amount !== '') {
    const n = Number(tier.amount)
    if (Number.isFinite(n) && n > 0) return n
  }
  const match = String(tier.price || '')
    .replace(/,/g, '')
    .match(/(\d+(?:\.\d+)?)/)
  if (!match) return null
  const n = Number(match[1])
  return Number.isFinite(n) && n > 0 ? n : null
}

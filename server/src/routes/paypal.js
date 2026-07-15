import { Router } from 'express'
import { query, withClient } from '../db.js'
import {
  capturePayPalOrder,
  createPayPalOrder,
  paypalClientId,
  paypalConfigured,
  paypalMode,
  resolveTierAmountDollars,
} from '../paypal.js'

const router = Router()

const FALLBACK_TIERS = [
  { id: '1', name: '1-on-1 Consultation', price: '$300', amount: 300 },
  { id: '2', name: 'Dynasty Masterclass', price: '$500', amount: 500 },
  { id: '3', name: 'Masterclass + Mentorship', price: '$1,200', amount: 1200 },
]

async function findTier(tierId) {
  const id = String(tierId)
  const r = await query(
    `SELECT item_id, data
     FROM collection_items
     WHERE collection_key = 'masterclassTiers'
       AND item_id = $1
     LIMIT 1`,
    [id],
  )
  if (r.rows[0]) {
    return { id: r.rows[0].item_id, ...r.rows[0].data }
  }

  const all = await query(
    `SELECT item_id, data
     FROM collection_items
     WHERE collection_key = 'masterclassTiers'
     ORDER BY sort_order, id`,
  )
  for (const row of all.rows) {
    const data = row.data || {}
    if (String(data.id) === id || String(row.item_id) === id) {
      return { id: row.item_id, ...data }
    }
  }

  const fallback = FALLBACK_TIERS.find((t) => t.id === id)
  return fallback || null
}

router.get('/config', (_req, res) => {
  res.json({
    configured: paypalConfigured(),
    clientId: paypalConfigured() ? paypalClientId() : '',
    mode: paypalMode(),
    currency: process.env.PAYPAL_CURRENCY || 'USD',
  })
})

async function createEnrollmentRecord({ tierId, buyerName, buyerEmail, buyerPhone }) {
  if (!tierId) {
    const err = new Error('tierId is required')
    err.status = 400
    throw err
  }
  if (!buyerName || buyerName.length < 2) {
    const err = new Error('Please enter your full name')
    err.status = 400
    throw err
  }
  if (!buyerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyerEmail)) {
    const err = new Error('Please enter a valid email')
    err.status = 400
    throw err
  }

  const tier = await findTier(tierId)
  if (!tier) {
    const err = new Error('Masterclass tier not found')
    err.status = 404
    throw err
  }

  const amountDollars = resolveTierAmountDollars(tier)
  if (!amountDollars) {
    const err = new Error('This tier has no valid price configured')
    err.status = 400
    throw err
  }

  const currency = process.env.PAYPAL_CURRENCY || 'USD'
  const amountCents = Math.round(amountDollars * 100)
  const tierName = tier.name || 'Masterclass'

  const enrollment = await withClient(async (client) => {
    const inserted = await client.query(
      `INSERT INTO masterclass_enrollments
         (tier_id, tier_name, amount_cents, currency, buyer_name, buyer_email, buyer_phone, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending')
       RETURNING *`,
      [String(tier.id || tierId), tierName, amountCents, currency, buyerName, buyerEmail, buyerPhone],
    )
    return inserted.rows[0]
  })

  return {
    enrollment,
    tier,
    tierName,
    amountDollars,
    currency,
  }
}

/** Reserve a seat without PayPal (credentials missing or user will pay later). */
router.post('/reserve', async (req, res) => {
  try {
    const tierId = req.body?.tierId
    const buyerName = String(req.body?.buyerName || '').trim()
    const buyerEmail = String(req.body?.buyerEmail || '').trim().toLowerCase()
    const buyerPhone = String(req.body?.buyerPhone || '').trim() || null

    const { enrollment, tierName, amountDollars, currency } = await createEnrollmentRecord({
      tierId,
      buyerName,
      buyerEmail,
      buyerPhone,
    })

    await query(
      `UPDATE masterclass_enrollments
       SET notes = COALESCE(notes, '') || $1, updated_at = NOW()
       WHERE id = $2`,
      [
        paypalConfigured()
          ? '\n[Reserved via site — payment pending]'
          : '\n[Reserved via site — PayPal not configured yet]',
        enrollment.id,
      ],
    )

    const refreshed = await query(`SELECT * FROM masterclass_enrollments WHERE id = $1`, [
      enrollment.id,
    ])

    res.json({
      ok: true,
      paymentRequired: false,
      enrollment: serializeEnrollment(refreshed.rows[0]),
      amount: amountDollars,
      currency,
      tierName,
    })
  } catch (err) {
    console.error('reserve', err)
    res.status(err.status || 500).json({ error: err.message || 'Failed to reserve seat' })
  }
})

router.post('/create-order', async (req, res) => {
  try {
    if (!paypalConfigured()) {
      return res.status(503).json({
        error: 'PayPal checkout is not configured yet. Add API credentials on the server.',
      })
    }

    const tierId = req.body?.tierId
    const buyerName = String(req.body?.buyerName || '').trim()
    const buyerEmail = String(req.body?.buyerEmail || '').trim().toLowerCase()
    const buyerPhone = String(req.body?.buyerPhone || '').trim() || null

    const { enrollment, tierName, amountDollars, currency } = await createEnrollmentRecord({
      tierId,
      buyerName,
      buyerEmail,
      buyerPhone,
    })

    const order = await createPayPalOrder({
      amount: amountDollars,
      currency,
      description: `${tierName} — KM Dynasty`,
      customId: enrollment.id,
      softDescriptor: 'KM DYNASTY',
    })

    await query(
      `UPDATE masterclass_enrollments
       SET paypal_order_id = $1, updated_at = NOW()
       WHERE id = $2`,
      [order.id, enrollment.id],
    )

    res.json({
      orderId: order.id,
      enrollmentId: enrollment.id,
      amount: amountDollars,
      currency,
      tierName,
    })
  } catch (err) {
    console.error('create-order', err)
    res.status(err.status || 500).json({ error: err.message || 'Failed to create order' })
  }
})

router.post('/capture-order', async (req, res) => {
  try {
    if (!paypalConfigured()) {
      return res.status(503).json({ error: 'PayPal checkout is not configured' })
    }

    const orderId = String(req.body?.orderId || '').trim()
    if (!orderId) return res.status(400).json({ error: 'orderId is required' })

    const existing = await query(
      `SELECT * FROM masterclass_enrollments WHERE paypal_order_id = $1 LIMIT 1`,
      [orderId],
    )
    const enrollment = existing.rows[0]
    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found for this PayPal order' })
    }

    if (enrollment.status === 'paid') {
      return res.json({
        ok: true,
        alreadyPaid: true,
        enrollment: serializeEnrollment(enrollment),
      })
    }

    const capture = await capturePayPalOrder(orderId)
    const captureId =
      capture?.purchase_units?.[0]?.payments?.captures?.[0]?.id ||
      capture?.id ||
      null
    const captureStatus =
      capture?.purchase_units?.[0]?.payments?.captures?.[0]?.status || capture?.status

    if (captureStatus && captureStatus !== 'COMPLETED' && capture.status !== 'COMPLETED') {
      await query(
        `UPDATE masterclass_enrollments
         SET status = 'failed', updated_at = NOW()
         WHERE id = $1`,
        [enrollment.id],
      )
      return res.status(402).json({ error: `Payment not completed (${captureStatus})` })
    }

    const updated = await query(
      `UPDATE masterclass_enrollments
       SET status = 'paid',
           paypal_capture_id = $1,
           paid_at = NOW(),
           updated_at = NOW()
       WHERE id = $2
       RETURNING *`,
      [captureId, enrollment.id],
    )

    res.json({
      ok: true,
      enrollment: serializeEnrollment(updated.rows[0]),
    })
  } catch (err) {
    console.error('capture-order', err)
    res.status(500).json({ error: err.message || 'Failed to capture order' })
  }
})

export function serializeEnrollment(row) {
  if (!row) return null
  return {
    id: row.id,
    tierId: row.tier_id,
    tierName: row.tier_name,
    amountCents: row.amount_cents,
    amount: row.amount_cents / 100,
    currency: row.currency,
    buyerName: row.buyer_name,
    buyerEmail: row.buyer_email,
    buyerPhone: row.buyer_phone,
    status: row.status,
    paypalOrderId: row.paypal_order_id,
    paypalCaptureId: row.paypal_capture_id,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    paidAt: row.paid_at,
  }
}

export default router

import { useState } from 'react'
import Motion from '../Motion'
import { useSignUp } from '../SignUpContext'
import { useContent } from '../../cms/ContentContext'
import { normalizeSectionLayout } from '../../cms/sectionLayouts'
import { apiFetch, readJsonResponse } from '../../utils/api'
import './HostLivestream.css'

const HOST_TOPIC = 'Host livestream token'

function withPrice(template, price) {
  return String(template || '').replaceAll('{price}', price)
}

function useHostCopy() {
  const { getPage } = useContent()
  const home = getPage('home')
  const currency = home.hostCurrency || '$'
  const amount = home.hostPrice || '600'
  const price = `${currency}${amount}`
  const crawlRaw = home.hostCrawl || "King Maker's livestream | Win the official | Your livestream | {price} token | Apply only if you are paying | Host the night"
  const crawl = withPrice(crawlRaw, price)
    .split('|')
    .map((part) => part.trim())
    .filter(Boolean)

  return {
    layout: normalizeSectionLayout('hostLivestreamLayout', home.hostLivestreamLayout),
    kicker: home.hostKicker || 'Creator platform',
    titleA: home.hostTitleA || 'Host',
    titleB: home.hostTitleB || 'livestream',
    ghost: home.hostGhost || 'LIVE',
    image: home.hostImage || '/photos/kingmaker.jpg',
    crawl,
    path1Chip: home.hostPath1Chip || "01 · King Maker's livestream",
    path1Title: home.hostPath1Title || 'Win a box battle of our big official',
    path1Body: home.hostPath1Body || "Step into the official box battle live on King Maker's livestream and fight for the night.",
    path1Cta: home.hostPath1Cta || 'Enter the official battle',
    serial: home.hostPath2Serial || 'HOST — 02',
    path2Chip: home.hostPath2Chip || 'Your livestream',
    path2Title: home.hostPath2Title || 'A token to host in your livestream',
    path2Body: home.hostPath2Body || 'Pay the token and host the battle inside your own livestream. The apply slot opens only if you are paying.',
    price,
    path2Cta: home.hostPath2Cta || 'Apply if you are paying',
    stubHint: home.hostStubHint || 'Tear to open',
    nameLabel: home.hostNameLabel || 'TikTok name',
    handleLabel: home.hostHandleLabel || 'TikTok username',
    emailLabel: home.hostEmailLabel || 'Email',
    whatsappLabel: home.hostWhatsappLabel || 'WhatsApp',
    payLabel: withPrice(home.hostPayLabel || 'I am paying the {price} token to host in my livestream.', price),
    submitLabel: home.hostSubmitLabel || 'Submit application',
    closeLabel: home.hostCloseLabel || 'Close ticket',
    success: withPrice(home.hostSuccess || 'Seat requested. We will follow up about the {price} token and your livestream slot.', price),
    payError: withPrice(home.hostPayError || 'This slot is only for creators paying the {price} token.', price),
  }
}

const emptyApply = {
  tiktokName: '',
  tiktok: '',
  email: '',
  whatsapp: '',
  paying: false,
}

export default function HostLivestream() {
  const { openOfficial } = useSignUp()
  const copy = useHostCopy()
  const [applyOpen, setApplyOpen] = useState(false)
  const [form, setForm] = useState(emptyApply)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const setField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    if (!form.paying) {
      setError(copy.payError)
      return
    }
    const tiktokName = form.tiktokName.trim()
    const handle = form.tiktok.trim().replace(/^@/, '')
    if (tiktokName.length < 2) {
      setError('Please enter your TikTok name.')
      return
    }
    if (handle.length < 2) {
      setError('Please enter your TikTok username.')
      return
    }

    setBusy(true)
    try {
      const message = [
        `Paying the ${copy.price} token to host in my own livestream.`,
        `TikTok name: ${tiktokName}`,
        `TikTok username: @${handle}`,
        form.whatsapp.trim() ? `WhatsApp: ${form.whatsapp.trim()}` : '',
      ]
        .filter(Boolean)
        .join('\n')

      const res = await apiFetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: tiktokName,
          email: form.email.trim(),
          topic: HOST_TOPIC,
          message,
        }),
      })
      const data = await readJsonResponse(res).catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Could not send your application')
      setDone(true)
      setForm(emptyApply)
    } catch (err) {
      setError(err.message || 'Could not send your application')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section
      className={`host-stage host-stage--${copy.layout}`}
      aria-label={`${copy.titleA} ${copy.titleB}`}
    >
      <div className="host-stage__grain" aria-hidden />
      <p className="host-stage__ghost font-display" aria-hidden>
        {copy.ghost}
      </p>

      <div className="host-stage__mast">
        <Motion delay={20}>
          <p className="host-stage__kicker">{copy.kicker}</p>
          <h2 className="host-stage__title font-display">
            <span className="host-stage__stroke">{copy.titleA}</span>
            <span className="host-stage__fill">{copy.titleB}</span>
          </h2>
        </Motion>
        {copy.crawl.length ? (
          <div className="host-stage__crawl" aria-hidden>
            <div className="host-stage__crawl-track">
              {Array.from({ length: 2 }).map((_, loop) => (
                <p key={loop}>
                  {copy.crawl.map((phrase, index) => (
                    <span key={`${loop}-${phrase}`} className={index % 2 ? 'is-gold' : undefined}>
                      {phrase}
                    </span>
                  ))}
                </p>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className={`host-stage__arena${applyOpen ? ' is-open' : ''}`}>
        <article className="host-gate host-gate--king">
          <img
            className="host-gate__photo"
            src={copy.image}
            alt=""
          />
          <div className="host-gate__veil" aria-hidden />
          <div className="host-gate__lower">
            <p className="host-gate__chip">{copy.path1Chip}</p>
            <h3 className="host-gate__title font-display">{copy.path1Title}</h3>
            <p className="host-gate__copy">{copy.path1Body}</p>
            <button type="button" className="host-gate__cta" onClick={openOfficial}>
              {copy.path1Cta}
            </button>
          </div>
        </article>

        <div className="host-coin" aria-hidden>
          <span className="host-coin__orbit" />
          <span className="host-coin__face font-display">
            <small>Token</small>
            <strong>{copy.price}</strong>
          </span>
        </div>

        <article className="host-gate host-gate--yours" id="host-token-apply">
          <p className="host-gate__serial">{copy.serial}</p>
          <p className="host-gate__chip host-gate__chip--gold">{copy.path2Chip}</p>
          <h3 className="host-gate__title font-display">{copy.path2Title}</h3>
          <p className="host-gate__copy">{copy.path2Body}</p>

          {done ? (
            <p className="host-ticket__done" role="status">
              {copy.success}
            </p>
          ) : null}

          {!applyOpen && !done ? (
            <button type="button" className="host-stub" onClick={() => setApplyOpen(true)}>
              <span>{copy.path2Cta}</span>
              <em>{copy.stubHint}</em>
            </button>
          ) : null}

          {applyOpen && !done ? (
            <form className="host-ticket" onSubmit={submit}>
              <div className="host-ticket__perfs" aria-hidden />
              <div className="host-ticket__grid">
                <label>
                  <span>{copy.nameLabel}</span>
                  <input
                    type="text"
                    name="tiktokName"
                    required
                    autoComplete="nickname"
                    placeholder="Your TikTok name"
                    value={form.tiktokName}
                    onChange={(e) => setField('tiktokName', e.target.value)}
                  />
                </label>
                <label>
                  <span>{copy.handleLabel}</span>
                  <input
                    type="text"
                    name="tiktok"
                    required
                    autoComplete="username"
                    placeholder="@yourusername"
                    value={form.tiktok}
                    onChange={(e) => setField('tiktok', e.target.value)}
                  />
                </label>
                <label>
                  <span>{copy.emailLabel}</span>
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setField('email', e.target.value)}
                  />
                </label>
                <label>
                  <span>{copy.whatsappLabel}</span>
                  <input
                    type="tel"
                    name="whatsapp"
                    autoComplete="tel"
                    placeholder="Reachable number"
                    value={form.whatsapp}
                    onChange={(e) => setField('whatsapp', e.target.value)}
                  />
                </label>
              </div>
              <label className="host-ticket__seal">
                <input
                  type="checkbox"
                  checked={form.paying}
                  onChange={(e) => setField('paying', e.target.checked)}
                  required
                />
                <span>{copy.payLabel}</span>
              </label>
              {error ? (
                <p className="host-ticket__error" role="alert">
                  {error}
                </p>
              ) : null}
              <div className="host-ticket__actions">
                <button type="submit" className="host-gate__cta host-gate__cta--gold" disabled={busy}>
                  {busy ? 'Sending…' : copy.submitLabel}
                </button>
                <button
                  type="button"
                  className="host-ticket__close"
                  onClick={() => {
                    setApplyOpen(false)
                    setError('')
                  }}
                >
                  {copy.closeLabel}
                </button>
              </div>
            </form>
          ) : null}
        </article>
      </div>
    </section>
  )
}

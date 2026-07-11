import { useState, useCallback } from 'react'
import { quotes, getTodayQuote } from '../data/quotes'
import { Icons } from '../components/Icons'
import { useSignUp } from '../components/SignUpContext'
import Motion from '../components/Motion'

const dayAccents = {
  Monday:    { bg: 'bg-dynasty-purple/5',  border: 'border-dynasty-purple/10',  text: 'text-dynasty-purple' },
  Tuesday:   { bg: 'bg-dynasty-orange/5',  border: 'border-dynasty-orange/10',  text: 'text-dynasty-orange' },
  Wednesday: { bg: 'bg-dynasty-purple/5',  border: 'border-dynasty-purple/10',  text: 'text-dynasty-purple' },
  Thursday:  { bg: 'bg-orange-50',         border: 'border-orange-100',         text: 'text-orange-500' },
  Friday:    { bg: 'bg-purple-50',         border: 'border-purple-100',         text: 'text-purple-500' },
  Saturday:  { bg: 'bg-dynasty-orange/5',  border: 'border-dynasty-orange/10',  text: 'text-dynasty-orange' },
  Sunday:    { bg: 'bg-amber-50',          border: 'border-amber-100',          text: 'text-amber-600' },
}

function generateQuoteImage(quote, day) {
  const canvas = document.createElement('canvas')
  canvas.width = 1080
  canvas.height = 1920
  const ctx = canvas.getContext('2d')

  const grad = ctx.createLinearGradient(0, 0, 1080, 1920)
  grad.addColorStop(0, '#5B2A86')
  grad.addColorStop(1, '#3D1A5C')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 1080, 1920)

  ctx.fillStyle = 'rgba(255,122,0,0.08)'
  ctx.beginPath()
  ctx.arc(900, 300, 400, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = 'rgba(255,255,255,0.05)'
  ctx.beginPath()
  ctx.arc(200, 1600, 300, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = '#FF7A00'
  ctx.font = 'bold 36px sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText(day.toUpperCase(), 540, 500)

  ctx.fillStyle = 'rgba(255,255,255,0.9)'
  ctx.font = 'italic 48px Georgia, serif'
  const words = `"${quote}"`.split(' ')
  let line = ''
  let y = 650
  for (const word of words) {
    const test = line + word + ' '
    if (ctx.measureText(test).width > 900) {
      ctx.fillText(line.trim(), 540, y)
      line = word + ' '
      y += 70
    } else {
      line = test
    }
  }
  ctx.fillText(line.trim(), 540, y)

  ctx.fillStyle = 'rgba(255,255,255,0.4)'
  ctx.font = 'bold 28px sans-serif'
  ctx.fillText('KM DYNASTY', 540, 1700)
  ctx.font = '22px sans-serif'
  ctx.fillText('King Maker · Daily Godsent Box Battle', 540, 1750)

  return canvas
}

function shareQuote(quote, day) {
  const canvas = generateQuoteImage(quote, day)
  canvas.toBlob(async (blob) => {
    const file = new File([blob], `km-quote-${day.toLowerCase()}.png`, { type: 'image/png' })
    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: `KM DYNASTY — ${day}'s Quote` })
      } catch {}
    } else {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `km-quote-${day.toLowerCase()}.png`
      a.click()
      URL.revokeObjectURL(url)
    }
  })
}

function copyQuote(text) {
  navigator.clipboard.writeText(text).catch(() => {})
}

function DailyReminder() {
  const [enabled, setEnabled] = useState(() => {
    return Notification.permission === 'granted'
  })
  const [asked, setAsked] = useState(false)

  const toggle = async () => {
    if (enabled) {
      setEnabled(false)
      return
    }
    if (!('Notification' in window)) return
    if (Notification.permission === 'default') {
      const result = await Notification.requestPermission()
      if (result === 'granted') {
        setEnabled(true)
        new Notification('KM DYNASTY', { body: 'Daily quote reminders are now on!', icon: '/favicon.ico' })
      } else {
        setAsked(true)
      }
    } else if (Notification.permission === 'granted') {
      setEnabled(true)
    } else {
      setAsked(true)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={toggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-dynasty-orange' : 'bg-gray-200'
        }`}
      >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`} />
      </button>
      <span className="text-sm text-dynasty-charcoal font-medium flex items-center gap-1.5">
        <span className="w-4 h-4 block text-dynasty-orange">{Icons.star}</span>
        Remind me daily
      </span>
      {asked && (
        <span className="text-xs text-gray-400">(Allow notifications in your browser)</span>
      )}
    </div>
  )
}

function QuoteCard({ quote, isToday, index }) {
  const accent = dayAccents[quote.day]

  return (
    <Motion variant="fade-up" delay={index * 80}>
      <div className={`rounded-2xl p-6 border transition-all ${
        isToday
          ? 'bg-dynasty-purple text-white border-dynasty-purple shadow-lg shadow-dynasty-purple/20 scale-[1.02]'
          : `bg-white ${accent.border} hover:shadow-md`
      }`}>
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-bold uppercase tracking-wider ${
            isToday ? 'text-dynasty-orange' : accent.text
          }`}>
            {quote.day}
          </span>
          <span className="text-lg">{quote.emoji}</span>
        </div>

        <p className={`text-sm leading-relaxed italic mb-4 ${
          isToday ? 'text-white/90' : 'text-gray-600'
        }`}>
          "{quote.quote}"
        </p>

        {isToday && (
          <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-dynasty-orange/20 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-dynasty-orange animate-pulse" />
            <span className="text-xs font-semibold text-dynasty-orange">Today</span>
          </div>
        )}

        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => shareQuote(quote.quote, quote.day)}
            className={`p-2 rounded-lg transition-all ${
              isToday
                ? 'bg-white/10 hover:bg-white/20 text-white'
                : 'bg-dynasty-cream hover:bg-dynasty-purple/10 text-dynasty-purple'
            }`}
            title="Share as image"
          >
            <span className="w-4 h-4 block">{Icons.globe}</span>
          </button>
          <button
            onClick={() => copyQuote(quote.quote)}
            className={`p-2 rounded-lg transition-all ${
              isToday
                ? 'bg-white/10 hover:bg-white/20 text-white'
                : 'bg-dynasty-cream hover:bg-dynasty-purple/10 text-dynasty-purple'
            }`}
            title="Copy to clipboard"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </button>
        </div>
      </div>
    </Motion>
  )
}

export default function DailyQuotes() {
  const today = getTodayQuote()
  const { openSpecial } = useSignUp()

  return (
    <main>
      <section className="py-20 sm:py-28 bg-dynasty-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Motion variant="fade-up" className="text-center mb-10">
            <span className="w-12 h-12 mx-auto mb-4 block text-dynasty-orange">{Icons.star}</span>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-dynasty-charcoal mb-3">
              Daily KM Quotes
            </h1>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">
              A quote for every day of the week. Fuel your battles with purpose.
            </p>
          </Motion>

          {/* Quick Reminder */}
          <Motion variant="fade-up" delay={100}>
            <div className="bg-dynasty-orange/10 border border-dynasty-orange/20 rounded-2xl p-5 mb-8 text-center">
              <p className="text-xs font-semibold text-dynasty-orange uppercase tracking-wider mb-2">Quick Reminder</p>
              <p className="text-sm text-dynasty-charcoal leading-relaxed mb-3">
                Scavengers, Country, Most Beautiful &mdash; fill the form. Official Godsent &mdash; bring your taps and prayers. Family first, always.
              </p>
              <button
                onClick={openSpecial}
                className="inline-block px-5 py-2 bg-dynasty-orange text-white text-xs font-semibold rounded-lg btn-glow"
              >
                Fill Form Here
              </button>
            </div>
          </Motion>

          {/* Reminder Toggle */}
          <Motion variant="fade-up" delay={150}>
            <div className="flex justify-center mb-8">
              <DailyReminder />
            </div>
          </Motion>

          {/* Quote Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {quotes.map((q, i) => (
              <QuoteCard
                key={q.day}
                quote={q}
                isToday={q.day === today.day}
                index={i}
              />
            ))}
          </div>

          {/* Trust Blurbs */}
          <Motion variant="fade-up" delay={400}>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="bg-white rounded-xl p-5 border border-gray-100 text-center card-hover">
                <p className="text-xs text-gray-400 mb-1">Brand Protection</p>
                <p className="text-xs text-dynasty-charcoal font-medium">KM DYNASTY brand identity is protected. Respect the name, respect the family.</p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-gray-100 text-center card-hover">
                <p className="text-xs text-gray-400 mb-1">Creator Support</p>
                <p className="text-xs text-dynasty-charcoal font-medium">Technical and professional support for creators in the US and Canada via La'Gwat Agency.</p>
              </div>
            </div>
          </Motion>
        </div>
      </section>
    </main>
  )
}

import { useState, useCallback } from 'react'
import { quotes, getTodayQuote } from '../data/quotes'
import { Icons } from '../components/Icons'
import { useSignUp } from '../components/SignUpContext'
import Motion from '../components/Motion'

const dayAccents = {
  Monday:    { bg: 'bg-accent/5',  border: 'border-accent/10',  text: 'text-accent' },
  Tuesday:   { bg: 'bg-gold/5',  border: 'border-gold/10',  text: 'text-gold' },
  Wednesday: { bg: 'bg-accent/5',  border: 'border-accent/10',  text: 'text-accent' },
  Thursday:  { bg: 'bg-gold/5',         border: 'border-gold/10',         text: 'text-gold' },
  Friday:    { bg: 'bg-accent/5',         border: 'border-accent/10',         text: 'text-accent' },
  Saturday:  { bg: 'bg-gold/5',  border: 'border-gold/10',  text: 'text-gold' },
  Sunday:    { bg: 'bg-gold/5',          border: 'border-gold/10',          text: 'text-gold' },
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
          enabled ? 'bg-gold' : 'bg-gray-200'
        }`}
      >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`} />
      </button>
      <span className="text-sm text-brand-900 font-medium flex items-center gap-1.5">
        <span className="w-4 h-4 block text-gold">{Icons.star}</span>
        Remind me daily
      </span>
      {asked && (
        <span className="text-xs text-brand-500">(Allow notifications in your browser)</span>
      )}
    </div>
  )
}

function QuoteCard({ quote, isToday, index }) {
  const accent = dayAccents[quote.day]

  return (
    <Motion variant="fade-up" delay={index * 80}>
      <div className={`rounded-xl p-6 border transition-all ${
        isToday
          ? 'bg-brand-900 text-white border-brand-900 shadow-lg scale-[1.02]'
          : `bg-white ${accent.border} hover:border-brand-200`
      }`}>
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-bold uppercase tracking-wider ${
            isToday ? 'text-gold' : accent.text
          }`}>
            {quote.day}
          </span>
          <span className="text-lg">{quote.emoji}</span>
        </div>

        <p className={`text-sm leading-relaxed italic mb-4 ${
          isToday ? 'text-white/90' : 'text-brand-500'
        }`}>
          "{quote.quote}"
        </p>

        {isToday && (
          <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-gold/20 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-xs font-semibold text-gold">Today</span>
          </div>
        )}

        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => shareQuote(quote.quote, quote.day)}
            className={`p-2 rounded-lg transition-all ${
              isToday
                ? 'bg-white/10 hover:bg-white/20 text-white'
                : 'bg-muted hover:bg-accent/10 text-accent'
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
                : 'bg-muted hover:bg-accent/10 text-accent'
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
      <section className="py-12 sm:py-16 bg-muted">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Motion variant="fade-up" className="text-center mb-10">
            <span className="w-12 h-12 mx-auto mb-4 block text-gold">{Icons.star}</span>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-brand-900 mb-3">
              <span className="text-gradient">Daily KM Quotes</span>
            </h1>
            <p className="text-brand-500 text-sm max-w-lg mx-auto">
              A quote for every day of the week. Fuel your battles with purpose.
            </p>
          </Motion>

          {/* Quick Reminder */}
          <Motion variant="fade-up" delay={100}>
            <div className="bg-gold/10 border border-gold/20 rounded-xl p-5 mb-8 text-center">
              <p className="text-xs font-semibold text-gold uppercase tracking-wider mb-2">Quick Reminder</p>
              <p className="text-sm text-brand-900 leading-relaxed mb-3">
                Scavengers, Country, Most Beautiful &mdash; fill the form. Official Godsent &mdash; bring your taps and prayers. Family first, always.
              </p>
              <button
                onClick={openSpecial}
                className="inline-block px-5 py-2 bg-gold text-white text-xs font-semibold rounded-md hover:bg-gold-dark transition-colors"
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
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="bg-white rounded-lg p-5 border border-brand-100 text-center hover:border-brand-200 transition-colors">
                <p className="text-xs text-brand-500 mb-1">Brand Protection</p>
                <p className="text-xs text-brand-900 font-medium">KM DYNASTY brand identity is protected. Respect the name, respect the family.</p>
              </div>
              <div className="bg-white rounded-lg p-5 border border-brand-100 text-center hover:border-brand-200 transition-colors">
                <p className="text-xs text-brand-500 mb-1">Creator Support</p>
                <p className="text-xs text-brand-900 font-medium">Technical and professional support for creators in the US and Canada via La'Gwat Agency.</p>
              </div>
            </div>
          </Motion>
        </div>
      </section>
    </main>
  )
}

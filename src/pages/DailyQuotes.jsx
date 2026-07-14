import { useState } from 'react'
import { quotes as fallbackQuotes, getTodayQuote as fallbackToday } from '../data/quotes'
import { Icons } from '../components/Icons'
import { useSignUp } from '../components/SignUpContext'
import Motion from '../components/Motion'
import { useContent } from '../cms/ContentContext'
import { getTodayQuoteFromList } from '../cms/normalize'
import './morePages.css'

function generateQuoteImage(quote, day) {
  const canvas = document.createElement('canvas')
  canvas.width = 1080
  canvas.height = 1920
  const ctx = canvas.getContext('2d')
  const grad = ctx.createLinearGradient(0, 0, 1080, 1920)
  grad.addColorStop(0, '#120620')
  grad.addColorStop(1, '#3B1063')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 1080, 1920)
  ctx.fillStyle = 'rgba(255,107,26,0.08)'
  ctx.beginPath()
  ctx.arc(900, 300, 400, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = '#FF6B1A'
  ctx.font = 'bold 36px sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText(day.toUpperCase(), 540, 500)
  ctx.fillStyle = 'rgba(255,247,240,0.9)'
  ctx.font = 'italic 48px Georgia, serif'
  const words = `"${quote}"`.split(' ')
  let line = '', y = 650
  for (const word of words) {
    const test = line + word + ' '
    if (ctx.measureText(test).width > 900) { ctx.fillText(line.trim(), 540, y); line = word + ' '; y += 70 }
    else line = test
  }
  ctx.fillText(line.trim(), 540, y)
  ctx.fillStyle = 'rgba(255,255,255,0.4)'
  ctx.font = 'bold 28px sans-serif'
  ctx.fillText('KM DYNASTY', 540, 1700)
  return canvas
}

function shareQuote(quote, day) {
  const canvas = generateQuoteImage(quote, day)
  canvas.toBlob(async (blob) => {
    const file = new File([blob], `km-quote-${day.toLowerCase()}.png`, { type: 'image/png' })
    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      try { await navigator.share({ files: [file], title: `KM DYNASTY — ${day}'s Quote` }) } catch {}
    } else {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = `km-quote-${day.toLowerCase()}.png`; a.click()
      URL.revokeObjectURL(url)
    }
  })
}

function QuoteCard({ quote, isToday, index }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(quote.quote).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Motion delay={0.05 + index * 0.06}>
      <div
        className="rounded-2xl p-6 border transition-all relative overflow-hidden"
        style={isToday
          ? { background: 'linear-gradient(135deg, rgba(255,107,26,0.15), rgba(59,16,99,0.5))', border: '1px solid rgba(255,107,26,0.3)' }
          : { background: 'rgba(59,16,99,0.2)', border: '1px solid rgba(255,255,255,0.06)' }
        }
      >
        {isToday && (
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, rgba(255,107,26,0.6), transparent)' }} />
        )}

        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: isToday ? '#FF6B1A' : 'rgba(255,255,255,0.4)' }}>
            {quote.day}
          </span>
          <div className="flex items-center gap-2">
            {isToday && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: 'rgba(255,107,26,0.2)', color: '#FF6B1A' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse" />Today
              </span>
            )}
            <span className="text-lg">{quote.emoji}</span>
          </div>
        </div>

        <p className="text-sm leading-relaxed italic mb-5" style={{ color: isToday ? 'rgba(255,247,240,0.9)' : 'rgba(255,255,255,0.6)' }}>
          "{quote.quote}"
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => shareQuote(quote.quote, quote.day)}
            className="p-2 rounded-lg transition-all hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
            title="Share as image"
          >
            <span className="w-4 h-4 block text-white/50">{Icons.globe}</span>
          </button>
          <button
            onClick={copy}
            className="p-2 rounded-lg transition-all hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
            title="Copy"
          >
            {copied
              ? <span className="w-4 h-4 block text-ember">{Icons.check}</span>
              : <svg className="w-4 h-4 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            }
          </button>
        </div>
      </div>
    </Motion>
  )
}

export default function DailyQuotes() {
  const { collections, getPage } = useContent()
  const page = getPage('quotes')
  const quotes = collections.quotes?.length ? collections.quotes : fallbackQuotes
  const today = getTodayQuoteFromList(quotes) || fallbackToday()
  const { openSpecial } = useSignUp()

  return (
    <main>
      {/* Hero — Quote Reliquary */}
      <section className="quotes-hero" aria-label="Daily KM Quotes">
        <div className="quotes-hero__media" aria-hidden>
          <img src={page.heroImage || '/photos/battle-highlights.jpg'} alt="" />
          <div className="quotes-hero__veil" />
        </div>
        <div className="quotes-hero__marks" aria-hidden>
          <span>“</span>
          <span>”</span>
        </div>
        <div className="quotes-hero__core">
          <Motion delay={60}>
            <p className="quotes-hero__brand">{page.heroBrand || 'KM DYNASTY'}</p>
            <p className="quotes-hero__day">{today.day}</p>
            <blockquote className="quotes-hero__quote">“{today.quote}”</blockquote>
            <h1 className="quotes-hero__title">{page.heroTitle || 'Daily Quotes'}</h1>
            <div className="quotes-hero__actions">
              <a href="#quotes-grid" className="mp-cta">
                Browse the week
                <span className="w-4 h-4 block">{Icons.arrowRight}</span>
              </a>
            </div>
          </Motion>
        </div>
      </section>

      {/* Reminder callout */}
      <section className="py-8" style={{ background: '#120620', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Motion delay={0.1}>
            <div className="rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ background: 'rgba(232,185,74,0.08)', border: '1px solid rgba(232,185,74,0.15)' }}>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-1 text-ember">Quick Reminder</p>
                <p className="text-white/70 text-sm">
                  Scavengers, Country, Most Beautiful — fill the form. Official Godsent — bring your taps and prayers.
                </p>
              </div>
              <button
                onClick={openSpecial}
                className="flex-shrink-0 px-5 py-2.5 text-sm font-bold text-white rounded-lg transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)', borderRadius: 8 }}
              >
                Fill Form Here
              </button>
            </div>
          </Motion>
        </div>
      </section>

      {/* Quote Grid */}
      <section id="quotes-grid" className="py-16 sm:py-24" style={{ background: '#1B1024' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {quotes.map((q, i) => (
              <QuoteCard key={q.day} quote={q} isToday={q.day === today.day} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Quotes Meaning — La'Gwat teaser */}
      <section className="py-16 sm:py-24" style={{ background: '#120620' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Motion delay={0.1}>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src="/team/maker.jpg"
                  alt="Brand strategy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(59,16,99,0.5), rgba(255,107,26,0.2))' }} />
              </div>
            </Motion>
            <div>
              <Motion delay={0.15}>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 text-ember" style={{ background: 'rgba(255,107,26,0.1)' }}>
                  Quotes Meaning
                </span>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-ivory mb-4 leading-tight">
                  Daily KM <span className="text-gradient">Quotes</span>
                </h2>
              </Motion>
              <Motion delay={0.2}>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-white/06" style={{ background: 'rgba(59,16,99,0.2)' }}>
                    <p className="text-white/70 text-sm leading-relaxed">
                      We safeguard your brand identity and ensure your creative vision stays protected.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/06" style={{ background: 'rgba(59,16,99,0.2)' }}>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Technical and professional support tailored to creators in the US and Canada.
                    </p>
                  </div>
                </div>
              </Motion>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

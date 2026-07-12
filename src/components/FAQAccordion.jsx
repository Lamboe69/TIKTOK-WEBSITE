import { useState } from 'react'
import { Icons } from './Icons'

export default function FAQAccordion({ items, dark = false }) {
  const [openIndex, setOpenIndex] = useState(null)
  const toggle = i => setOpenIndex(openIndex === i ? null : i)

  if (dark) {
    return (
      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden transition-all"
            style={openIndex === i
              ? { background: 'rgba(59,16,99,0.4)', border: '1px solid rgba(255,107,26,0.25)' }
              : { background: 'rgba(59,16,99,0.2)', border: '1px solid rgba(255,255,255,0.06)' }
            }
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between px-6 py-4 text-left"
              aria-expanded={openIndex === i}
            >
              <span className="font-semibold text-sm pr-4" style={{ color: openIndex === i ? '#FF6B1A' : 'rgba(255,247,240,0.85)' }}>
                {item.question}
              </span>
              <span className={`w-5 h-5 flex-shrink-0 text-ember transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}>
                {Icons.chevronDown}
              </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="px-6 pb-5 text-sm text-white/60 leading-relaxed">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className={`border rounded-xl overflow-hidden transition-all ${
            openIndex === i ? 'border-dynasty-purple bg-dynasty-cream/50' : 'border-gray-200 bg-white hover:border-dynasty-purple/30'
          }`}
        >
          <button
            onClick={() => toggle(i)}
            className="w-full flex items-center justify-between px-6 py-4 text-left"
            aria-expanded={openIndex === i}
          >
            <span className={`font-semibold text-sm sm:text-base pr-4 ${openIndex === i ? 'text-dynasty-purple' : 'text-dynasty-charcoal'}`}>
              {item.question}
            </span>
            <span className={`w-5 h-5 flex-shrink-0 text-dynasty-purple transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}>
              {Icons.chevronDown}
            </span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

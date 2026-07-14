import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Icons } from '../components/Icons'
import Motion from '../components/Motion'
import { useContent } from '../cms/ContentContext'
import './FAQ.css'

const fallbackCategories = [
  { id: 'All', label: 'All chapters' },
  { id: 'Getting Started', label: 'Getting Started' },
  { id: 'Creator Support', label: 'Creator Support' },
  { id: 'Account Safety', label: 'Account Safety' },
  { id: 'Advertising', label: 'Advertising' },
]

const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']

export default function FAQ() {
  const { collections, getPage, settings } = useContent()
  const siteName = settings.siteName || 'KM DYNASTY'
  const page = getPage('faq')
  const closingKicker = page.closingKicker || 'Still looking'
  const closingTitle = page.closingTitle || "Your question isn't in the codex?"
  const closingBody = page.closingBody || 'Write to the Dynasty — we reply personally.'
  const closingImage = page.closingImage || '/photos/community-meetup.jpg'
  const faqItems = collections.faq?.length ? collections.faq : []
  const categories = (collections.faqCategories?.length
    ? collections.faqCategories.map((c) =>
        typeof c === 'string' ? { id: c, label: c === 'All' ? 'All chapters' : c } : c,
      )
    : fallbackCategories)

  const [activeCategory, setActiveCategory] = useState('All')
  const [openIndex, setOpenIndex] = useState(0)

  const filteredItems = useMemo(
    () =>
      activeCategory === 'All'
        ? faqItems
        : faqItems.filter((f) => f.category === activeCategory),
    [activeCategory, faqItems],
  )

  const setCategory = (id) => {
    setActiveCategory(id)
    setOpenIndex(0)
  }

  return (
    <main className="codex-page">
      {/* Hero — Answer Quire */}
      <section className="codex-hero" aria-label="Frequently asked questions">
        <div className="codex-hero__media" aria-hidden>
          <img src={page.heroImage || '/photos/faq-support.jpg'} alt="" />
          <div className="codex-hero__veil" />
          <div className="codex-hero__sheet" />
        </div>

        <div className="codex-hero__index" aria-hidden>
          {romans.slice(0, 6).map((r) => (
            <span key={r}>{r}</span>
          ))}
        </div>

        <div className="codex-hero__core">
          <Motion delay={50}>
            <p className="codex-hero__brand">{page.heroBrand || siteName}</p>
            <h1 className="codex-hero__title">{page.heroTitle || 'Answers'}</h1>
            <p className="codex-hero__lede">
              {page.heroLede ||
                'The Dynasty codex — clear guidance on joining, creating, safety, and partnerships with La\u2019Gwat.'}
            </p>
            <div className="codex-hero__actions">
              <a href="#codex-chamber" className="codex-cta">
                Open the codex
                <span className="w-4 h-4 block">{Icons.arrowRight}</span>
              </a>
              <Link to="/contact" className="codex-link">
                Ask a new question
              </Link>
            </div>
          </Motion>
        </div>
      </section>

      {/* Codex chamber */}
      <section id="codex-chamber" className="codex-chamber">
        <div className="codex-pad codex-chamber__layout">
          <aside className="codex-chapters" aria-label="FAQ categories">
            <p className="codex-kicker">Chapters</p>
            <nav className="codex-chapters__list" role="tablist">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  className={`codex-chapter${activeCategory === cat.id ? ' is-on' : ''}`}
                  onClick={() => setCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </nav>
            <p className="codex-chapters__count">
              {filteredItems.length} entr{filteredItems.length === 1 ? 'y' : 'ies'}
            </p>
          </aside>

          <div className="codex-ledger" role="region" aria-label="FAQ answers">
            <Motion delay={40} className="codex-ledger__head">
              <h2>
                {activeCategory === 'All' ? 'Full codex' : activeCategory}
              </h2>
              <p>Select a question to reveal the answer.</p>
            </Motion>

            <div className="codex-entries">
              {filteredItems.map((item, i) => {
                const open = openIndex === i
                return (
                  <article
                    key={item.question}
                    className={`codex-entry${open ? ' is-open' : ''}`}
                  >
                    <button
                      type="button"
                      className="codex-entry__btn"
                      aria-expanded={open}
                      onClick={() => setOpenIndex(open ? null : i)}
                    >
                      <span className="codex-entry__roman" aria-hidden>
                        {romans[i] || i + 1}
                      </span>
                      <span className="codex-entry__q">{item.question}</span>
                      <span className="codex-entry__mark" aria-hidden>
                        {open ? '−' : '+'}
                      </span>
                    </button>
                    <div className="codex-entry__body">
                      <div>
                        <p>{item.answer}</p>
                        <p className="codex-entry__cat">{item.category}</p>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Closing invite */}
      <section className="codex-invite">
        <div className="codex-invite__media" aria-hidden>
          <img src={closingImage} alt="" />
          <div className="codex-invite__veil" />
        </div>
        <Motion delay={50} className="codex-invite__copy">
          <p className="codex-kicker">{closingKicker}</p>
          <h2>{closingTitle}</h2>
          <p>{closingBody}</p>
          <Link to="/contact" className="codex-cta">
            Contact us
            <span className="w-4 h-4 block">{Icons.arrowRight}</span>
          </Link>
        </Motion>
      </section>
    </main>
  )
}

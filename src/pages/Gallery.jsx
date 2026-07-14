import { useState, useEffect, useCallback } from 'react'
import Motion from '../components/Motion'
import fallbackPhotos, { galleryCategories as fallbackCategories } from '../data/gallery'
import { Icons } from '../components/Icons'
import { useContent } from '../cms/ContentContext'
import './morePages.css'

export default function Gallery() {
  const { collections, getPage } = useContent()
  const page = getPage('gallery')
  const photos = collections.gallery?.length ? collections.gallery : fallbackPhotos
  const galleryCategories = collections.galleryCategories?.length
    ? collections.galleryCategories
    : fallbackCategories
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  const filtered = activeCategory === 'All' ? photos : photos.filter(p => p.category === activeCategory)

  const selectedIndex = selectedPhoto ? filtered.findIndex(p => p.id === selectedPhoto.id) : -1

  const goPrev = useCallback(() => {
    if (selectedIndex > 0) setSelectedPhoto(filtered[selectedIndex - 1])
  }, [selectedIndex, filtered])

  const goNext = useCallback(() => {
    if (selectedIndex < filtered.length - 1) setSelectedPhoto(filtered[selectedIndex + 1])
  }, [selectedIndex, filtered])

  useEffect(() => {
    if (!selectedPhoto) return
    const handler = (e) => {
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'Escape') setSelectedPhoto(null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [selectedPhoto, goPrev, goNext])

  return (
    <main>
      {/* Hero — Film Gate */}
      <section className="gallery-hero" aria-label="Photo Gallery">
        <div className="gallery-hero__media" aria-hidden>
          <img src={page.heroImage || '/photos/scavengers-battle.jpg'} alt="" />
          <div className="gallery-hero__veil" />
        </div>
        <div className="gallery-hero__sprockets gallery-hero__sprockets--l" aria-hidden />
        <div className="gallery-hero__sprockets gallery-hero__sprockets--r" aria-hidden />
        <div className="gallery-hero__core">
          <Motion delay={60}>
            <p className="gallery-hero__brand">{page.heroBrand || 'KM DYNASTY'}</p>
            <h1 className="gallery-hero__title">{page.heroTitle || 'Gallery'}</h1>
            <p className="gallery-hero__lede">
              {page.heroLede ||
                `${photos.length} moments captured across battles, meetups, and community events.`}
            </p>
            <div className="gallery-hero__actions">
              <a href="#gallery-grid" className="mp-cta">
                Enter the reel
                <span className="w-4 h-4 block">{Icons.arrowRight}</span>
              </a>
            </div>
          </Motion>
        </div>
      </section>

      {/* Grid */}
      <section id="gallery-grid" className="py-16 sm:py-24" style={{ background: '#1B1024' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Filters */}
          <Motion delay={0.1}>
            <div className="flex flex-wrap gap-2 mb-10 justify-center">
              {galleryCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-4 py-1.5 text-xs font-semibold rounded-full border transition-all"
                  style={activeCategory === cat
                    ? { background: 'rgba(255,107,26,0.15)', borderColor: 'rgba(255,107,26,0.4)', color: '#FF6B1A' }
                    : { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }
                  }
                >
                  {cat}
                </button>
              ))}
            </div>
          </Motion>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map((photo, idx) => (
              <Motion key={photo.id} delay={0.04 + idx * 0.03}>
                <button
                  onClick={() => setSelectedPhoto(photo)}
                  className="group relative aspect-square rounded-2xl overflow-hidden border border-white/04 hover:border-white/08 transition-all"
                >
                  <img loading="lazy"
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={e => { e.target.src = '/battles-photos/daily-godsent.jpg' }}
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(to top, rgba(18,6,32,0.85) 40%, rgba(18,6,32,0.2) 100%)' }} />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-ivory text-xs font-bold leading-tight">{photo.title}</p>
                    <p className="text-white/50 text-[10px] mt-0.5">{photo.category} · {photo.year}</p>
                  </div>
                </button>
              </Motion>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-white/40 text-sm">No photos in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(18,6,32,0.96)', backdropFilter: 'blur(20px)' }}
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
            onClick={() => setSelectedPhoto(null)}
          >
            <span className="w-5 h-5 block">{Icons.close}</span>
          </button>

          {selectedIndex > 0 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 z-10"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
              onClick={e => { e.stopPropagation(); goPrev() }}
              aria-label="Previous photo"
            >
              <span className="w-5 h-5 block rotate-180">{Icons.arrowRight}</span>
            </button>
          )}

          {selectedIndex < filtered.length - 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 z-10"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
              onClick={e => { e.stopPropagation(); goNext() }}
              aria-label="Next photo"
            >
              <span className="w-5 h-5 block">{Icons.arrowRight}</span>
            </button>
          )}

          <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <img loading="lazy"
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
              onError={e => { e.target.src = '/battles-photos/daily-godsent.jpg' }}
            />
            <div className="mt-4 text-center">
              <h3 className="font-display font-bold text-ivory text-lg">{selectedPhoto.title}</h3>
              <p className="text-white/40 text-sm mt-1">{selectedPhoto.category} · {selectedPhoto.year}</p>
              <p className="text-white/25 text-xs mt-2">{selectedIndex + 1} / {filtered.length} &nbsp;·&nbsp; ← → to navigate</p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

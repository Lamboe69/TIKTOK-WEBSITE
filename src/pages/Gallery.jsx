import { useState } from 'react'
import Motion from '../components/Motion'
import photos, { galleryCategories } from '../data/gallery'
import { Icons } from '../components/Icons'

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  const filtered = activeCategory === 'All' ? photos : photos.filter(p => p.category === activeCategory)

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-brand-900 py-10 sm:py-14">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <Motion delay={0.1}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/5 text-accent text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-4 h-4 block">{Icons.film}</span>
              From the Dynasty
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              Photo <span className="text-gold text-gradient">Gallery</span>
            </h1>
            <p className="text-brand-500 max-w-xl mx-auto">
              {photos.length} moments captured across battles, meetups, and community events.
            </p>
          </Motion>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Category filters */}
          <Motion delay={0.15}>
            <div className="flex flex-wrap gap-2 mb-10 justify-center">
              {galleryCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
                    activeCategory === cat
                      ? 'bg-accent text-white'
                      : 'bg-brand-50 text-brand-500 hover:bg-brand-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Motion>

          {/* Photo grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((photo, idx) => (
              <Motion key={photo.id} delay={0.05 + idx * 0.04}>
                <button
                  onClick={() => setSelectedPhoto(photo)}
                  className="group relative aspect-square rounded-xl overflow-hidden border border-brand-100 hover:border-brand-200 transition-colors"
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-xs font-bold">{photo.title}</p>
                    <p className="text-white/60 text-[11px]">{photo.category} · {photo.year}</p>
                  </div>
                </button>
              </Motion>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-brand-500">
              <p className="text-sm">No photos in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={() => setSelectedPhoto(null)}
          >
            <span className="w-5 h-5 block">{Icons.close}</span>
          </button>
          <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
            />
            <div className="mt-4 text-center">
              <h3 className="text-white font-display font-bold text-lg">{selectedPhoto.title}</h3>
              <p className="text-white/50 text-sm">{selectedPhoto.category} · {selectedPhoto.year}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

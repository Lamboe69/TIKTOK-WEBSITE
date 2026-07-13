import { useState } from 'react'
import Motion from '../components/Motion'
import photos, { galleryCategories } from '../data/gallery'
import { Icons } from '../components/Icons'

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  const filtered = activeCategory === 'All' ? photos : photos.filter(p => p.category === activeCategory)

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[520px] flex items-end pb-16 overflow-hidden" style={{ background: '#120620' }}>
        <img
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1400&q=80"
          alt="Gallery"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(18,6,32,0.95) 40%, rgba(59,16,99,0.6) 100%)' }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <Motion delay={0.1}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-5 text-ember" style={{ background: 'rgba(255,107,26,0.1)' }}>
                From the Dynasty
              </span>
              <h1 className="font-display font-bold text-ivory mb-4 leading-tight" style={{ fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.02em' }}>
                Photo<br />
                <span className="text-gradient">Gallery</span>
              </h1>
              <p className="text-white/60 text-sm leading-relaxed max-w-md">
                {photos.length} moments captured across battles, meetups, and community events.
              </p>
            </Motion>

            <Motion delay={0.2}>
              <div className="glass rounded-2xl p-6 border border-white/10">
                <p className="text-white/40 text-[10px] uppercase tracking-widest mb-4">Gallery Stats</p>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: `${photos.length}`, label: 'Photos' },
                    { value: `${galleryCategories.length - 1}`, label: 'Categories' },
                    { value: '2026', label: 'Season' },
                  ].map(s => (
                    <div key={s.label} className="text-center">
                      <p className="font-display font-bold text-2xl text-ivory">{s.value}</p>
                      <p className="text-white/40 text-[10px] uppercase tracking-wider mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Motion>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 sm:py-24" style={{ background: '#1B1024' }}>
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
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80' }}
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
          <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80' }}
            />
            <div className="mt-4 text-center">
              <h3 className="font-display font-bold text-ivory text-lg">{selectedPhoto.title}</h3>
              <p className="text-white/40 text-sm mt-1">{selectedPhoto.category} · {selectedPhoto.year}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

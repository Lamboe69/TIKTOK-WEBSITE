import { useState } from 'react'
import Motion from '../components/Motion'
import posts, { categories } from '../data/blog'
import { Icons } from '../components/Icons'

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [expandedId, setExpandedId] = useState(null)

  const filtered = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory)

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[520px] flex items-end pb-16 overflow-hidden" style={{ background: '#120620' }}>
        <img
          src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1400&q=80"
          alt="Dynasty Blog"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(18,6,32,0.95) 40%, rgba(59,16,99,0.6) 100%)' }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <Motion delay={0.1}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-5 text-ember" style={{ background: 'rgba(255,107,26,0.1)' }}>
                Battle Reports & Stories
              </span>
              <h1 className="font-display font-bold text-ivory mb-4 leading-tight" style={{ fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.02em' }}>
                The Dynasty<br />
                <span className="text-gradient">Blog</span>
              </h1>
              <p className="text-white/60 text-sm leading-relaxed max-w-md">
                Battle results, community stories, and updates from the KM Dynasty family.
              </p>
            </Motion>

            <Motion delay={0.2}>
              <div className="glass rounded-2xl p-6 border border-white/10">
                <p className="text-white/40 text-[10px] uppercase tracking-widest mb-4">Latest Post</p>
                {posts[0] && (
                  <>
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mb-2" style={{ background: 'rgba(232,185,74,0.15)', color: '#E8B94A' }}>
                      {posts[0].category}
                    </span>
                    <p className="font-display font-bold text-ivory text-base leading-snug mb-2">{posts[0].title}</p>
                    <p className="text-white/40 text-xs">{new Date(posts[0].date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · {posts[0].readTime}</p>
                  </>
                )}
              </div>
            </Motion>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 sm:py-24" style={{ background: '#1B1024' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Filters */}
          <Motion delay={0.1}>
            <div className="flex flex-wrap gap-2 mb-10 justify-center">
              {categories.map(cat => (
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((post, idx) => (
              <Motion key={post.id} delay={0.1 + idx * 0.08}>
                <article
                  className="group rounded-2xl overflow-hidden border border-white/06 hover:border-white/12 transition-all"
                  style={{ background: 'rgba(59,16,99,0.2)' }}
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={post.cover}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80' }}
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(18,6,32,0.9) 30%, rgba(18,6,32,0.2) 100%)' }} />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold" style={{ background: 'rgba(232,185,74,0.9)', color: '#120620' }}>
                        {post.category}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-4 right-4">
                      <p className="font-display font-bold text-ivory text-base leading-snug">{post.title}</p>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-white/40 mb-3">
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed mb-4">{post.excerpt}</p>

                    {expandedId === post.id ? (
                      <div>
                        <div className="text-white/70 text-sm leading-relaxed whitespace-pre-line mb-4 border-t border-white/08 pt-4">
                          {post.content}
                        </div>
                        <button onClick={() => setExpandedId(null)} className="text-ember text-sm font-semibold hover:underline">
                          Show less
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => setExpandedId(post.id)} className="inline-flex items-center gap-1.5 text-ember text-sm font-semibold hover:underline">
                        Read more <span className="w-3.5 h-3.5 block">{Icons.arrowRight}</span>
                      </button>
                    )}
                  </div>
                </article>
              </Motion>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-white/40 text-sm">No posts in this category yet.</p>
              <button onClick={() => setActiveCategory('All')} className="mt-4 text-ember text-sm hover:underline">View all posts</button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

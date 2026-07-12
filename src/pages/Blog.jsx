import { useState } from 'react'
import Motion from '../components/Motion'
import posts, { categories } from '../data/blog'
import { Icons } from '../components/Icons'

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [expandedId, setExpandedId] = useState(null)

  const filtered = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory)

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-dynasty-charcoal py-10 sm:py-14 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-dynasty-purple/15 rounded-full blur-[120px] animate-drift" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <Motion delay={0.1}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dynasty-orange/10 border border-dynasty-orange/20 text-dynasty-orange text-xs font-bold uppercase tracking-wider mb-4">
              <span className="w-4 h-4 block animate-float">{Icons.clipboard}</span>
              Battle Reports & Stories
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              The Dynasty <span className="text-dynasty-orange text-gradient-animated">Blog</span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Battle results, community stories, and updates from the KM Dynasty family.
            </p>
          </Motion>
        </div>
      </section>

      {/* Filters + Posts */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Category filters */}
          <Motion delay={0.15}>
            <div className="flex flex-wrap gap-2 mb-10 justify-center">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
                    activeCategory === cat
                      ? 'bg-dynasty-purple text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Motion>

          {/* Post grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((post, idx) => (
              <Motion key={post.id} delay={0.1 + idx * 0.08}>
                <article className="group rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                  {/* Cover */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.cover}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="px-3 py-1 bg-dynasty-orange/90 text-white text-xs font-bold rounded-lg">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="font-display font-bold text-lg text-dynasty-charcoal mb-2 group-hover:text-dynasty-purple transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                      {post.excerpt}
                    </p>

                    {expandedId === post.id ? (
                      <div>
                        <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line mb-4">
                          {post.content}
                        </div>
                        <button
                          onClick={() => setExpandedId(null)}
                          className="text-dynasty-purple text-sm font-semibold hover:underline"
                        >
                          Show less
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setExpandedId(post.id)}
                        className="text-dynasty-purple text-sm font-semibold hover:underline"
                      >
                        Read more
                      </button>
                    )}
                  </div>
                </article>
              </Motion>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p className="text-sm">No posts in this category yet.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

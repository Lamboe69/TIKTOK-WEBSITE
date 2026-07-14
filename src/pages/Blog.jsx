import { useState } from 'react'
import Motion from '../components/Motion'
import fallbackPosts, { categories as fallbackCategories } from '../data/blog'
import { Icons } from '../components/Icons'
import { useContent } from '../cms/ContentContext'
import './morePages.css'

export default function Blog() {
  const { collections, getPage } = useContent()
  const page = getPage('blog')
  const posts = collections.blogPosts?.length ? collections.blogPosts : fallbackPosts
  const categories = collections.blogCategories?.length
    ? collections.blogCategories
    : fallbackCategories
  const [activeCategory, setActiveCategory] = useState('All')
  const [expandedId, setExpandedId] = useState(null)

  const filtered = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory)

  return (
    <main>
      {/* Hero — Press Folio */}
      <section className="blog-hero" aria-label="Dynasty Blog">
        <div className="blog-hero__media" aria-hidden>
          <img src={page.heroImage || '/photos/battle-highlights.jpg'} alt="" />
          <div className="blog-hero__veil" />
        </div>
        <div className="blog-hero__folio">
          <Motion delay={60}>
            <div className="blog-hero__rule">
              <p className="blog-hero__brand">{page.heroBrand || 'KM DYNASTY'}</p>
            </div>
            <h1 className="blog-hero__title">{page.heroTitle || 'Blog'}</h1>
            <p className="blog-hero__lede">
              {page.heroLede ||
                'Battle results, community stories, and updates from the Dynasty family.'}
            </p>
            {posts[0] && (
              <p className="blog-hero__latest">
                <strong>{posts[0].title}</strong>
                Latest · {new Date(posts[0].date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · {posts[0].readTime}
              </p>
            )}
            <div className="blog-hero__actions">
              <a href="#blog-posts" className="mp-cta">
                Read posts
                <span className="w-4 h-4 block">{Icons.arrowRight}</span>
              </a>
            </div>
          </Motion>
        </div>
      </section>

      {/* Posts */}
      <section id="blog-posts" className="py-16 sm:py-24" style={{ background: '#1B1024' }}>
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
                  className="group rounded-2xl overflow-hidden border border-white/04 hover:border-white/08 transition-all"
                  style={{ background: 'rgba(59,16,99,0.2)' }}
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={post.cover}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={e => { e.target.src = '/battles-photos/daily-godsent.jpg' }}
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
                      <div
                        style={{ maxHeight: 600, overflowY: 'auto', transition: 'max-height 0.4s ease' }}
                      >
                        <div className="text-white/70 text-sm leading-relaxed whitespace-pre-line mb-4 border-t border-white/04 pt-4">
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

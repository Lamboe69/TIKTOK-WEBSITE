import Motion from '../Motion'

const testimonials = [
  { name: 'Sarah M.', handle: '@sarahm', role: 'Creator', text: 'KM DYNASTY gave me a platform I never had. The battles are electric and the community is family.' },
  { name: 'James K.', handle: '@jamesk', role: 'Viewer', text: 'I watch every single battle. King Maker makes it feel like a real event. Never boring.' },
  { name: 'Grace N.', handle: '@gracen', role: 'Champion', text: 'Winning my first battle changed everything. More followers, more confidence, more opportunities.' },
  { name: 'David O.', handle: '@davido', role: 'Creator', text: 'The fair format is what sets this apart. No rigs, no favors — just pure talent and engagement.' },
  { name: 'Maria L.', handle: '@marial', role: 'Supporter', text: 'The energy in these battles is unmatched. King Maker truly cares about every creator involved.' },
  { name: 'Tony R.', handle: '@tonyr', role: 'Champion', text: 'From zero to 10K followers after one battle. This community changes lives.' },
  { name: 'Aisha B.', handle: '@aishaB', role: 'Creator', text: 'The most professional TikTok battle organizer I have ever seen. Pure class.' },
  { name: 'Marcus W.', handle: '@marcusw', role: 'Viewer', text: 'Every battle feels like a championship event. The production quality is insane.' },
]

function Card({ name, handle, role, text }) {
  return (
    <div className="flex-shrink-0 w-72 rounded-2xl p-5 mx-2 border border-white/08" style={{ background: 'rgba(59,16,99,0.25)' }}>
      <div className="flex gap-0.5 mb-3">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-ember text-sm">★</span>
        ))}
      </div>
      <p className="text-white/70 text-sm leading-relaxed mb-4">"{text}"</p>
      <div>
        <p className="text-ivory text-sm font-semibold">{name}</p>
        <p className="text-white/40 text-xs">{handle} · {role}</p>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const row1 = [...testimonials, ...testimonials]
  const row2 = [...testimonials.slice(4), ...testimonials.slice(0, 4), ...testimonials.slice(4), ...testimonials.slice(0, 4)]

  return (
    <section className="py-16 sm:py-24 overflow-hidden" style={{ background: '#1B1024' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <Motion delay={0.1} className="text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 text-ember" style={{ background: 'rgba(255,107,26,0.1)' }}>
            ★ Testimony & Feedback
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ivory mb-3">
            What Our Family Says
          </h2>
          <p className="text-white/50 text-sm max-w-md mx-auto">
            Real words from real members of the KM Dynasty community.
          </p>
        </Motion>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="flex animate-marquee-left mb-4">
        {row1.map((t, i) => <Card key={i} {...t} />)}
      </div>

      {/* Row 2 — scrolls right */}
      <div className="flex animate-marquee-right">
        {row2.map((t, i) => <Card key={i} {...t} />)}
      </div>
    </section>
  )
}

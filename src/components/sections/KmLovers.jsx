import { useSignUp } from '../SignUpContext'
import Motion from '../Motion'
import { Icons } from '../Icons'

export default function KmLovers() {
  const { openOfficial } = useSignUp()

  return (
    <section className="py-16 sm:py-24" style={{ background: '#120620' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <Motion delay={0.1}>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img loading="lazy"
                src="/photos/community-meetup.jpg"
                alt="KM Lovers community"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(59,16,99,0.5), rgba(255,107,26,0.2))' }} />
              <div className="absolute bottom-6 left-6 glass rounded-xl px-4 py-3">
                <p className="text-ivory font-display font-bold text-lg">💖 KM LOVERS</p>
                <p className="text-white/60 text-xs">The heart of the dynasty</p>
              </div>
            </div>
          </Motion>

          {/* Content */}
          <div>
            <Motion delay={0.15}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 text-ember" style={{ background: 'rgba(255,107,26,0.1)' }}>
                💖 Join KM Dynasty Box Battle
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-ivory mb-4 leading-tight">
                KM LOVERS Don't Just<br />
                <span className="text-gradient">Watch — They Protect</span>
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                "Like, share, follow, report – KM LOVERS don't just watch, they PROTECT the dynasty." By liking the page, sharing, following the King Maker host, and reporting the livestream (to keep us safe).
              </p>
            </Motion>

            <Motion delay={0.2}>
              <div className="space-y-3 mb-8">
                {[
                  { text: 'Keep the community\'s esteem high – reminding every member they matter, whether they send big boxes or small.' },
                  { text: 'Push forward positively – no hate, no toxicity, just family energy, even in the hottest battles.' },
                ].map(({ text }, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-white/06" style={{ background: 'rgba(59,16,99,0.2)' }}>
                    <span className="w-4 h-4 block text-ember flex-shrink-0 mt-0.5">{Icons.check}</span>
                    <p className="text-white/70 text-sm leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </Motion>

            <Motion delay={0.3}>
              <div className="rounded-xl p-4 mb-6 border border-white/06" style={{ background: 'rgba(255,107,26,0.08)' }}>
                <p className="text-ember text-xs font-bold uppercase tracking-wider mb-2">KM LOVERS Get</p>
                <ul className="space-y-1.5">
                  {[
                    'Priority shout-outs during livestreams',
                    'Entry into exclusive community giveaways',
                    'Special recognition during the Winners\' Livestream Visit',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-white/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-ember flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Motion>

            <Motion delay={0.35}>
              <button
                onClick={openOfficial}
                className="btn-shimmer btn-glow inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white rounded-xl transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)', boxShadow: '0 8px 32px rgba(255,107,26,0.3)' }}
              >
                Sign Up — Box Battle
              </button>
            </Motion>
          </div>
        </div>
      </div>
    </section>
  )
}

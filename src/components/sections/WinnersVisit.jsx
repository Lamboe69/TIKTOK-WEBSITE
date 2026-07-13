import Motion from '../Motion'

export default function WinnersVisit() {
  return (
    <section className="relative min-h-[360px] flex items-center overflow-hidden" style={{ background: '#1B1024' }}>
      <img loading="lazy"
        src="/battles-photos/most-beautiful.jpg"
        alt="Winners Livestream Visit"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(18,6,32,0.92) 50%, rgba(59,16,99,0.75) 100%)' }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Motion delay={0.1}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 text-crown-gold" style={{ background: 'rgba(232,185,74,0.1)' }}>
              🎥 Winners' Livestream Visit
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ivory mb-4 leading-tight">
              Win. Claim Your<br />
              <span className="text-gradient">Spotlight</span>
            </h2>
            <p className="text-white/60 text-sm leading-relaxed">
              Winners from OFFICIAL GODSENT BOX BATTLE get a scheduled livestream visit with KM DYNASTY. Champion gets priority. Be the winner, claim your spotlight!
            </p>
          </Motion>

          <Motion delay={0.2}>
            <div className="glass-premium rounded-2xl p-6">
              <p className="text-white/40 text-[10px] uppercase tracking-widest mb-4">How It Works</p>
              {[
                { step: '1', text: 'Win an Official Godsent Box Battle' },
                { step: '2', text: 'Get scheduled for a KM DYNASTY livestream visit' },
                { step: '3', text: 'Champion of Champions gets priority placement' },
                { step: '4', text: 'Claim your spotlight in front of the entire dynasty' },
              ].map(({ step, text }) => (
                <div key={step} className="flex items-center gap-3 py-3 border-b border-white/06 last:border-0">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #FF6B1A, #CC5200)' }}>
                    {step}
                  </div>
                  <p className="text-ivory text-sm">{text}</p>
                </div>
              ))}
            </div>
          </Motion>
        </div>
      </div>
    </section>
  )
}

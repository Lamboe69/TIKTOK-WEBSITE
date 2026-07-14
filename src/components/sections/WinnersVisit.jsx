import Motion from '../Motion'

const steps = [
  'Win an Official Godsent Box Battle',
  'Get scheduled for a KM DYNASTY livestream visit',
  'Champion of Champions earns priority placement',
  'Claim your spotlight before the whole family',
]

export default function WinnersVisit() {
  return (
    <section className="relative overflow-hidden home-band-ember home-band-sep">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">
        <div className="relative min-h-[300px] order-2 lg:order-1">
          <img
            src="/photos/community-meetup.jpg"
            alt="Winners livestream visit"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to left, #2A1028 0%, transparent 40%), linear-gradient(to top, rgba(42,16,40,0.55), transparent 40%)',
            }}
          />
        </div>

        <div className="order-1 lg:order-2 px-5 sm:px-10 lg:px-14 py-16 sm:py-20 flex flex-col justify-center">
          <Motion delay={60}>
            <p className="sec-kicker mb-4" style={{ color: 'rgba(232,185,74,0.95)' }}>
              Winners’ Livestream Visit
            </p>
            <h2
              className="font-display font-bold text-ivory leading-[0.95] tracking-tight mb-4"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)' }}
            >
              Win. Claim your<br />
              <span className="text-gradient">spotlight</span>
            </h2>
            <p className="text-white/70 text-sm leading-relaxed max-w-md mb-10">
              Official Godsent winners earn a scheduled livestream visit with KM DYNASTY. Champions go first.
            </p>
          </Motion>

          <ol className="space-y-0">
            {steps.map((text, i) => (
              <Motion key={text} delay={120 + i * 70}>
                <li
                  className="flex gap-5 py-4 border-t border-white/[0.06] last:border-b"
                >
                  <span className="font-display font-bold text-ember text-xl w-8 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-ivory text-sm sm:text-base leading-snug pt-1">{text}</p>
                </li>
              </Motion>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

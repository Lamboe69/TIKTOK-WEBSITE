import { useSignUp } from '../SignUpContext'
import { Icons } from '../Icons'
import Motion from '../Motion'
import useParallax from '../../hooks/useParallax'
import { useContent } from '../../cms/ContentContext'

export default function CTA() {
  const { openOfficial } = useSignUp()
  const [parallaxRef, parallaxStyle] = useParallax({ factor: 0.12 })
  const { getPage, settings } = useContent()
  const homePage = getPage('home')
  const siteName = settings.siteName || ''
  const ctaTitle = homePage.ctaTitle || 'Ready to join the Dynasty?'
  const ctaSubtitle = homePage.ctaSubtitle || "Creator, supporter, or curious newcomer — there's a place for you here."
  const ctaFollowLabel = homePage.ctaFollowLabel || 'Follow King Maker'
  const tiktokUrl = settings.tiktokUrl || 'https://www.tiktok.com/@kingmakernevergivesup'

  return (
    <section className="relative min-h-[480px] overflow-hidden flex items-center">
      <img
        src="/photos/about-team.jpg"
        alt={`Join ${siteName}`}
        className="absolute inset-0 w-full h-full object-cover"
        ref={parallaxRef}
        style={parallaxStyle}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(10,4,20,0.97) 0%, rgba(10,4,20,0.75) 50%, rgba(10,4,20,0.55) 100%)',
        }}
      />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-5 sm:px-8 py-24 text-center">
        <Motion delay={80}>
          <p className="sec-kicker mb-5 justify-center">{siteName}</p>
          <h2
            className="font-display font-bold text-ivory leading-[0.95] tracking-tight mb-5"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)' }}
          >
            {ctaTitle.includes('the Dynasty') ? (
              <>
                {ctaTitle.split('the Dynasty')[0]}<br />
                <span className="text-gradient">the Dynasty?</span>
              </>
            ) : ctaTitle.includes('Dynasty') ? (
              <>
                {ctaTitle.split('Dynasty')[0]}<br />
                <span className="text-gradient">Dynasty?</span>
              </>
            ) : ctaTitle}
          </h2>
          <p className="text-white/55 text-sm sm:text-base max-w-md mx-auto mb-10 leading-relaxed">
            {ctaSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <button type="button" onClick={openOfficial} className="sec-cta">
              {settings.ctaLabel || 'Join My Box Battle'}
              <span className="w-4 h-4 block">{Icons.arrowRight}</span>
            </button>
            <a
              href={tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sec-cta-ghost"
            >
              <span className="w-5 h-5 block rounded-sm overflow-hidden shrink-0">{Icons.tiktok}</span>
              {ctaFollowLabel}
            </a>
          </div>
        </Motion>
      </div>
    </section>
  )
}

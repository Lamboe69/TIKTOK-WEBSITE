import { Link, useSearchParams } from 'react-router-dom'
import Motion from '../components/Motion'
import { Icons } from '../components/Icons'
import { useContent } from '../cms/ContentContext'
import './Masterclass.css'

export default function MasterclassEnrolled() {
  const [params] = useSearchParams()
  const { settings } = useContent()
  const siteName = settings.siteName || ''
  const tierName = params.get('tier') || 'your programme'
  const enrollmentId = params.get('id')
  const pending = params.get('pending') === '1'
  const contactEmail = settings.email || 'hello@kmdynasty.com'

  return (
    <main className="mc-page">
      <section className="mc-hero" style={{ minHeight: 'min(72svh, 560px)' }}>
        <div className="mc-hero__media" aria-hidden>
          <img src="/photos/champion-crowning.jpg" alt="" className="mc-hero__photo" />
          <div className="mc-hero__veil" />
        </div>
        <div className="mc-hero__core">
          <Motion delay={50} className="mc-hero__copy">
            <p className="mc-hero__brand">{siteName}</p>
            <h1 className="mc-hero__title">{pending ? 'Request received' : "You're in"}</h1>
            <p className="mc-hero__lede">
              {pending ? (
                <>
                  We have your details for <strong>{tierName}</strong>. Our team will follow up at
                  your email with confirmation and payment next steps.
                </>
              ) : (
                <>
                  Payment received for <strong>{tierName}</strong>. We&apos;ll follow up at your
                  email with Zoom details and next steps.
                </>
              )}
            </p>
            {enrollmentId ? (
              <p className="mc-hero__session">Reference #{enrollmentId}</p>
            ) : null}
            <div className="mc-hero__actions">
              <Link to="/masterclass" className="mc-cta">
                Back to Masterclass
                <span className="w-4 h-4 block">{Icons.arrowRight}</span>
              </Link>
              <a href={`mailto:${contactEmail}`} className="mc-link">
                Email us
              </a>
            </div>
          </Motion>
        </div>
      </section>
    </main>
  )
}

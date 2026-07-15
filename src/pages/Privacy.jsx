import { Link } from 'react-router-dom'
import { Icons } from '../components/Icons'
import Motion from '../components/Motion'
import { useContent } from '../cms/ContentContext'

function getSections(siteName) {
  return [
    {
      title: 'Information We Collect',
      body: 'We collect information you provide directly to us, such as when you fill out a contact form, join a box battle, or communicate with us. This may include your name, email address, and any other information you choose to provide.',
    },
    {
      title: 'How We Use Your Information',
      body: `We use the information we collect to respond to your inquiries, provide you with information about ${siteName} events and battles, and improve our services.`,
    },
    {
      title: 'Third-Party Services',
      body: 'Our site may contain links to third-party services (TikTok, Google Forms). We are not responsible for the privacy practices of these external services. We encourage you to review their privacy policies.',
    },
    {
      title: 'Contact Us',
      body: null,
      email: 'lagwatinc@gmail.com',
    },
  ]
}

export default function Privacy() {
  const { settings } = useContent()
  const siteName = settings.siteName || ''
  const sections = getSections(siteName)
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[360px] flex items-end pb-14 overflow-hidden" style={{ background: '#120620' }}>
        <img
          src="/photos/about-team.jpg"
          alt="Privacy Policy"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(18,6,32,0.97) 50%, rgba(59,16,99,0.7) 100%)' }} />
        <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6">
          <Motion delay={0.1}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-5 text-ember" style={{ background: 'rgba(255,107,26,0.1)' }}>
              Legal
            </span>
            <h1 className="font-display font-bold text-ivory leading-tight" style={{ fontSize: 'clamp(32px, 4vw, 56px)', letterSpacing: '-0.02em' }}>
              Privacy Policy
            </h1>
            <p className="text-white/40 text-sm mt-3">Last updated: July 2026</p>
          </Motion>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-24" style={{ background: '#1B1024' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Motion delay={0.1}>
            <div className="rounded-2xl p-8 border border-white/08 space-y-8" style={{ background: 'rgba(59,16,99,0.25)' }}>
              <p className="text-white/60 text-sm leading-relaxed">
                {siteName} ("we," "our," or "us") operates the {siteName} website. This page informs you of our policies
                regarding the collection, use, and disclosure of personal information when you use our service.
              </p>

              {sections.map(({ title, body, email }) => (
                <div key={title}>
                  <div className="h-px mb-6" style={{ background: 'rgba(59,16,99,0.5)' }} />
                  <h2 className="font-display font-bold text-lg text-ivory mb-3">{title}</h2>
                  {body && <p className="text-white/60 text-sm leading-relaxed">{body}</p>}
                  {email && (
                    <p className="text-white/60 text-sm">
                      If you have questions about this Privacy Policy, please contact us at{' '}
                      <a href={`mailto:${email}`} className="text-ember hover:underline">{email}</a>.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Motion>

          <Motion delay={0.2}>
            <div className="mt-8 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-ember transition-colors"
              >
                <span className="w-4 h-4 block rotate-180">{Icons.arrowRight}</span>
                Back to Home
              </Link>
            </div>
          </Motion>
        </div>
      </section>
    </main>
  )
}

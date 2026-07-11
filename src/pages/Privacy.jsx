import { Link } from 'react-router-dom'
import { Icons } from '../components/Icons'

export default function Privacy() {
  return (
    <main>
      <section className="py-20 sm:py-28 bg-dynasty-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-dynasty-charcoal mb-6">
            Privacy Policy
          </h1>
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-6 text-sm text-gray-600 leading-relaxed">
            <p><strong>Last updated:</strong> July 2026</p>
            <p>
              KM DYNASTY ("we," "our," or "us") operates the KM DYNASTY website. This page informs you of our policies
              regarding the collection, use, and disclosure of personal information when you use our service.
            </p>
            <h2 className="font-display font-bold text-lg text-dynasty-charcoal">Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you fill out a contact form, sign up for
              box battles, or communicate with us. This may include your name, email address, and any other information
              you choose to provide.
            </p>
            <h2 className="font-display font-bold text-lg text-dynasty-charcoal">How We Use Your Information</h2>
            <p>
              We use the information we collect to respond to your inquiries, provide you with information about
              KM DYNASTY events and battles, and improve our services.
            </p>
            <h2 className="font-display font-bold text-lg text-dynasty-charcoal">Third-Party Services</h2>
            <p>
              Our site may contain links to third-party services (TikTok, Google Forms). We are not responsible for
              the privacy practices of these external services. We encourage you to review their privacy policies.
            </p>
            <h2 className="font-display font-bold text-lg text-dynasty-charcoal">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:lagwatinc@gmail.com" className="text-dynasty-purple hover:text-dynasty-orange transition-colors">
                lagwatinc@gmail.com
              </a>.
            </p>
          </div>
          <div className="mt-8 text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-dynasty-purple font-semibold hover:text-dynasty-orange transition-colors">
              <span className="w-4 h-4 block">{Icons.arrowRight}</span>
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

import { Link } from 'react-router-dom'
import { Icons } from '../components/Icons'

export default function Terms() {
  return (
    <main>
      <section className="py-20 sm:py-28 bg-dynasty-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-dynasty-charcoal mb-6">
            Terms of Service
          </h1>
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-6 text-sm text-gray-600 leading-relaxed">
            <p><strong>Last updated:</strong> July 2026</p>
            <p>
              Welcome to KM DYNASTY. By accessing or using our website, you agree to comply with and be bound
              by these Terms of Service.
            </p>
            <h2 className="font-display font-bold text-lg text-dynasty-charcoal">Use of the Website</h2>
            <p>
              You agree to use this website only for lawful purposes and in accordance with these Terms.
              You are responsible for maintaining the confidentiality of any account information.
            </p>
            <h2 className="font-display font-bold text-lg text-dynasty-charcoal">Content</h2>
            <p>
              All content on this website, including text, graphics, logos, and trademarks, is the property
              of KM DYNASTY or its content suppliers and is protected by applicable intellectual property laws.
            </p>
            <h2 className="font-display font-bold text-lg text-dynasty-charcoal">External Links</h2>
            <p>
              This website contains links to external sites (TikTok, Google Forms). KM DYNASTY is not responsible
              for the content, accuracy, or practices of these third-party sites.
            </p>
            <h2 className="font-display font-bold text-lg text-dynasty-charcoal">Disclaimer</h2>
            <p>
              This is an independent fan/community platform and is not officially affiliated with, endorsed by,
              or sponsored by TikTok or ByteDance Ltd.
            </p>
            <h2 className="font-display font-bold text-lg text-dynasty-charcoal">Contact Us</h2>
            <p>
              For questions about these Terms, please contact us at{' '}
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

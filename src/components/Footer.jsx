import { Link } from 'react-router-dom'
import { Icons } from './Icons'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/how-to-join', label: 'How to Join' },
  { to: '/battle-schedule', label: 'Battle Schedule' },
  { to: '/daily-quotes', label: 'Daily Quotes' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/advertise', label: 'Advertise' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="bg-dynasty-charcoal text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-lg bg-dynasty-purple flex items-center justify-center text-white">
                {Icons.crown}
              </span>
              <span className="font-display font-bold text-lg">KM DYNASTY</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              The official hub for King Maker's Godsent Box Battles. Join the family, compete, and rise.
            </p>
            <a
              href="https://www.tiktok.com/@kingmakernevergivesup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-dynasty-orange text-white text-sm font-semibold rounded-lg hover:bg-dynasty-orange-dark transition-colors"
            >
              <span className="w-4 h-4 block">{Icons.play}</span>
              Follow King Maker
            </a>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-gray-400 text-sm hover:text-dynasty-orange transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-700 flex gap-4">
              <Link to="/privacy" className="text-gray-500 text-xs hover:text-dynasty-orange transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-500 text-xs hover:text-dynasty-orange transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-4">Get in Touch</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 block text-dynasty-orange">{Icons.mail}</span>
                <a href="mailto:lagwatinc@gmail.com" className="hover:text-dynasty-orange transition-colors">
                  lagwatinc@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 block text-dynasty-orange">{Icons.phone}</span>
                <a href="tel:+14696641195" className="hover:text-dynasty-orange transition-colors">
                  +1 (469) 664-1195 (US)
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 block text-dynasty-orange">{Icons.phone}</span>
                <a href="tel:+256200947070" className="hover:text-dynasty-orange transition-colors">
                  +256-200-947-070 (Uganda)
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 block text-dynasty-orange">{Icons.mapPin}</span>
                Dallas, Texas, USA
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 text-center">
          <p className="text-gray-400 text-xs">
            Want to reach the KM DYNASTY audience?{' '}
            <Link to="/advertise" className="text-dynasty-orange hover:text-dynasty-orange-dark font-semibold transition-colors">
              Advertise With Us
            </Link>
          </p>
        </div>
      </div>

      <div className="border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} KM DYNASTY. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs text-center sm:text-right max-w-md">
            This is an independent fan/community platform and is not officially affiliated with, endorsed by, or sponsored by TikTok or ByteDance Ltd.
          </p>
        </div>
      </div>
    </footer>
  )
}

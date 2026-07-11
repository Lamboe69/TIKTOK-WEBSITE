import { Link } from 'react-router-dom'
import { Icons } from '../components/Icons'

export default function NotFound() {
  return (
    <main className="py-20 sm:py-32 bg-dynasty-cream">
      <div className="max-w-md mx-auto px-4 text-center">
        <span className="w-16 h-16 mx-auto mb-6 block text-dynasty-purple">{Icons.crown}</span>
        <h1 className="font-display font-bold text-5xl text-dynasty-charcoal mb-3">404</h1>
        <p className="text-gray-500 text-sm mb-8">This page doesn't exist in the dynasty.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-dynasty-purple text-white font-bold text-sm rounded-xl hover:bg-dynasty-purple-dark transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </main>
  )
}

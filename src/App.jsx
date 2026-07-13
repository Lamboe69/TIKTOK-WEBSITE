import { lazy, useEffect, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { SignUpProvider } from './components/SignUpContext'
import { StatsProvider } from './hooks/useTikTokStats'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import StickyCTA from './components/StickyCTA'
import ScrollProgress from './components/ScrollProgress'
import { Icons } from './components/Icons'

const Home = lazy(() => import('./pages/Home'))
const HowToJoin = lazy(() => import('./pages/HowToJoin'))
const BattleSchedule = lazy(() => import('./pages/BattleSchedule'))
const DailyQuotes = lazy(() => import('./pages/DailyQuotes'))
const About = lazy(() => import('./pages/About'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Contact = lazy(() => import('./pages/Contact'))
const Advertise = lazy(() => import('./pages/Advertise'))
const Agency = lazy(() => import('./pages/Agency'))
const Masterclass = lazy(() => import('./pages/Masterclass'))
const Blog = lazy(() => import('./pages/Blog'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Outreach = lazy(() => import('./pages/Outreach'))
const Giveaway = lazy(() => import('./pages/Giveaway'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const NotFound = lazy(() => import('./pages/NotFound'))

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]" style={{ background: '#120620' }}>
      <div className="flex flex-col items-center gap-4">
        <span className="w-8 h-8 block text-ember animate-pulse">{Icons.crown}</span>
        <p className="text-white/40 text-sm font-medium tracking-wider">Loading...</p>
      </div>
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function PageTransition({ children }) {
  const { pathname } = useLocation()
  return (
    <div key={pathname} className="animate-fade-in" style={{ animationDuration: '0.3s' }}>
      {children}
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <SignUpProvider>
        <StatsProvider>
          <ScrollToTop />
          <ScrollProgress />
          <div className="min-h-screen bg-white font-body">
            <Navbar />
            <div className="pb-20 md:pb-0">
              <Suspense fallback={<LoadingScreen />}>
                <PageTransition>
                  <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/how-to-join" element={<HowToJoin />} />
                  <Route path="/battle-schedule" element={<BattleSchedule />} />
                  <Route path="/daily-quotes" element={<DailyQuotes />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/advertise" element={<Advertise />} />
                  <Route path="/agency" element={<Agency />} />
                  <Route path="/masterclass" element={<Masterclass />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/outreach" element={<Outreach />} />
                  <Route path="/giveaway" element={<Giveaway />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="*" element={<NotFound />} />
                  </Routes>
                </PageTransition>
              </Suspense>
            </div>
            <StickyCTA />
            <Footer />
          </div>
        </StatsProvider>
      </SignUpProvider>
    </Router>
  )
}

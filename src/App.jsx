import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { SignUpProvider } from './components/SignUpContext'
import { StatsProvider } from './hooks/useTikTokStats'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import StickyCTA from './components/StickyCTA'
import Home from './pages/Home'
import HowToJoin from './pages/HowToJoin'
import BattleSchedule from './pages/BattleSchedule'
import DailyQuotes from './pages/DailyQuotes'
import About from './pages/About'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import Advertise from './pages/Advertise'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'

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
          <div className="min-h-screen bg-white font-body">
            <Navbar />
            <div className="pb-20 md:pb-0">
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
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="*" element={<NotFound />} />
                </Routes>
              </PageTransition>
            </div>
            <StickyCTA />
            <Footer />
          </div>
        </StatsProvider>
      </SignUpProvider>
    </Router>
  )
}

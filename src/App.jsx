import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { SignUpProvider } from './components/SignUpContext'
import { StatsProvider } from './hooks/useTikTokStats'
import { ContentProvider } from './cms/ContentContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import StickyCTA from './components/StickyCTA'
import ScrollProgress from './components/ScrollProgress'
import SEO from './components/SEO'
import Home from './pages/Home'
import HowToJoin from './pages/HowToJoin'
import BattleSchedule from './pages/BattleSchedule'
import DailyQuotes from './pages/DailyQuotes'
import About from './pages/About'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import Advertise from './pages/Advertise'
import Agency from './pages/Agency'
import Masterclass from './pages/Masterclass'
import MasterclassEnrolled from './pages/MasterclassEnrolled'
import Blog from './pages/Blog'
import Gallery from './pages/Gallery'
import Outreach from './pages/Outreach'
import Giveaway from './pages/Giveaway'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'
import { AdminLayout, AdminLogin } from './admin/AdminLayout'
import AdminDashboard from './admin/pages/Dashboard'
import PageEditor from './admin/pages/PageEditor'
import CollectionList, { CollectionEdit } from './admin/pages/CollectionEditor'
import SettingsEditor, { MediaLibrary } from './admin/pages/SettingsEditor'
import EnrollmentsAdmin from './admin/pages/EnrollmentsAdmin'
import BattleApplicationsAdmin from './admin/pages/BattleApplicationsAdmin'
import CharityApplicationsAdmin from './admin/pages/CharityApplicationsAdmin'
import ContactMessagesAdmin from './admin/pages/ContactMessagesAdmin'

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

function PublicChrome({ children }) {
  return (
    <div className="min-h-screen bg-white font-body">
      <ScrollProgress />
      <Navbar />
      <div className="pb-20 md:pb-0">
        <PageTransition>{children}</PageTransition>
      </div>
      <StickyCTA />
      <Footer />
    </div>
  )
}

function AppRoutes() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="settings" element={<SettingsEditor />} />
          <Route path="media" element={<MediaLibrary />} />
          <Route path="enrollments" element={<EnrollmentsAdmin />} />
          <Route path="applications" element={<BattleApplicationsAdmin />} />
          <Route path="charity-applications" element={<CharityApplicationsAdmin />} />
          <Route path="contact-messages" element={<ContactMessagesAdmin />} />
          <Route path="pages/:key" element={<PageEditor />} />
          <Route path="collections/:key" element={<CollectionList />} />
          <Route path="collections/:key/:id" element={<CollectionEdit />} />
        </Route>
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    )
  }

  return (
    <PublicChrome>
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
        <Route path="/masterclass/enrolled" element={<MasterclassEnrolled />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/charity" element={<Outreach />} />
        <Route path="/outreach" element={<Navigate to="/charity" replace />} />
        <Route path="/outreach/*" element={<Navigate to="/charity" replace />} />
        <Route path="/giveaway" element={<Giveaway />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PublicChrome>
  )
}

export default function App() {
  return (
    <Router>
      <ContentProvider>
        <SignUpProvider>
          <StatsProvider>
            <SEO />
            <ScrollToTop />
            <AppRoutes />
          </StatsProvider>
        </SignUpProvider>
      </ContentProvider>
    </Router>
  )
}

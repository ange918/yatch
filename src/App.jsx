import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react' // Importé pour le scroll
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import TickerBar from './components/TickerBar'
import CookieBanner from './components/CookieBanner'
import ChatWidget from './components/ChatWidget'
import Home from './pages/Home'
import About from './pages/About'
import Simulation from './pages/Simulation'
import Offers from './pages/Offers'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Legal from './pages/Legal'
import FAQ from './pages/FAQ'
import LoanDetail from './pages/LoanDetail'

// Petit composant interne pour gérer le retour en haut automatique
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force le scroll en haut de page à chaque changement d'URL
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/kredite/:slug" element={<LoanDetail />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      {/* ScrollToTop doit être à l'intérieur de BrowserRouter */}
      <ScrollToTop /> 
      
      <TickerBar />
      <Navbar />
      <main>
        <AnimatedRoutes />
      </main>
      <Footer />
      <CookieBanner />
      <ChatWidget />
    </BrowserRouter>
  )
}
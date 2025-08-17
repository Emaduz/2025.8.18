/**
 * Main application component with routing and theme provider
 * Manages global layout and navigation between pages
 */
import { HashRouter, Route, Routes } from 'react-router';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import HomePage from './pages/Home';
import PortfolioPage from './pages/Portfolio';
import AboutPage from './pages/About';
import ServicesPage from './pages/Services';
import ContactPage from './pages/Contact';
import ProjectDetailsPage from './pages/ProjectDetails';
import BackToTop from './components/BackToTop';

/** 
 * Import global font stylesheet so IBM Plex Sans Arabic applies to all pages 
 */
import './styles/fonts.css';

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <div className="min-h-screen bg-[#d9cab1] dark:bg-[#1a1a1a] text-[#2d2d2d] dark:text-[#d9cab1] transition-colors duration-300">
          <Header />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/portfolio/:id" element={<ProjectDetailsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppFloat />
          <BackToTop />
        </div>
      </HashRouter>
    </ThemeProvider>
  );
}

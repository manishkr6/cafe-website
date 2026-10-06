/**
 * Café Zéro — Application Entry & Routing
 * Gangtok, Sikkim, India
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import EnquiryModal from './components/EnquiryModal.jsx';
import GeminiChatbot from './components/GeminiChatbot.jsx';
import InteractivePreloader from './components/InteractivePreloader.jsx';

import Home from './pages/Home.jsx';
import Story from './pages/Story.jsx';
import Menu from './pages/Menu.jsx';
import Gallery from './pages/Gallery.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Dynamic SEO Titles per route
    const titleMap = {
      '/': 'CAFÉ ZÉRO · Specialty Coffee & Mountain Moments | Gangtok, Sikkim',
      '/story': 'Our Story · Mountain Philosophy & Craft | Café Zéro Gangtok',
      '/menu': 'Curated Menu · High-Altitude Extractions & Harvest | Café Zéro',
      '/gallery': 'Photography Archive · Life at Café Zéro | Gangtok, Sikkim',
      '/contact': 'Reservations & Enquiries · Ridge View Arcade | Café Zéro'
    };

    document.title = titleMap[pathname] || 'CAFÉ ZÉRO · Gangtok, Sikkim';
  }, [pathname]);

  return null;
}

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cafe_zero_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('cafe_zero_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('cafe_zero_theme', 'light');
    }
  }, [isDark]);

  const toggleDark = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <CustomCursor />

      {/* Cinematic Interactive Preloader on initial arrival */}
      {loading && (
        <InteractivePreloader onComplete={() => setLoading(false)} />
      )}

      <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-[#12100E] text-[#1C1917] dark:text-[#FAF8F5] transition-colors duration-300">
        <Navbar
          onOpenEnquiry={() => setEnquiryModalOpen(true)}
          isDark={isDark}
          toggleDark={toggleDark}
        />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home onOpenEnquiry={() => setEnquiryModalOpen(true)} />} />
            <Route path="/story" element={<Story onOpenEnquiry={() => setEnquiryModalOpen(true)} />} />
            <Route path="/menu" element={<Menu onOpenEnquiry={() => setEnquiryModalOpen(true)} />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer
          onOpenEnquiry={() => setEnquiryModalOpen(true)}
          onReplayLoader={() => setLoading(true)}
        />

        {/* Global Modals */}
        <EnquiryModal
          isOpen={enquiryModalOpen}
          onClose={() => setEnquiryModalOpen(false)}
        />

        {/* Global Gemini AI Concierge */}
        <GeminiChatbot />
      </div>
    </BrowserRouter>
  );
}

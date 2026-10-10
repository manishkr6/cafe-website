import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, WifiOff, MessageCircle, MapPin, ArrowUpRight } from 'lucide-react';
import AmbientSoundToggle from './AmbientSoundToggle.jsx';
import Button from './Button.jsx';
import { syncOfflineEnquiries } from '../lib/api.js';
import { siteConfig } from '../data/site.js';

export default function Navbar({ onOpenEnquiry, isDark, toggleDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncOfflineEnquiries();
    };
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const navLinks = [
    { label: 'HOME', to: '/', num: '01' },
    { label: 'STORY', to: '/story', num: '02' },
    { label: 'MENU', to: '/menu', num: '03' },
    { label: 'GALLERY', to: '/gallery', num: '04' },
    { label: 'CONTACT', to: '/contact', num: '05' },
  ];

  const isHome = location.pathname === '/';
  
  // Header background styling based on scroll and theme
  const headerBgClass = scrolled
    ? 'bg-[#faf8f5]/95 dark:bg-[#12100e]/95 backdrop-blur-md border-b border-[#1c1917]/10 dark:border-[#faf8f5]/10 text-[#1c1917] dark:text-[#faf8f5] py-4'
    : isHome
    ? 'bg-transparent text-[#faf8f5] py-5 sm:py-6'
    : 'bg-[#faf8f5] dark:bg-[#12100e] border-b border-[#1c1917]/10 dark:border-[#faf8f5]/10 text-[#1c1917] dark:text-[#faf8f5] py-4';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${headerBgClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <Link
            to="/"
            onClick={scrollToTop}
            className="font-serif text-xl xs:text-2xl sm:text-3xl tracking-[0.06em] sm:tracking-[0.08em] font-light hover:opacity-85 transition-opacity whitespace-nowrap shrink-0"
          >
            CAFÉ ZÉRO
          </Link>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-9 text-xs sm:text-[13px] font-medium tracking-[0.22em] uppercase">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={scrollToTop}
                  className={`relative py-1 transition-colors duration-200 ${
                    isActive
                      ? 'text-[#c29b38] font-semibold'
                      : 'hover:text-[#c29b38]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c29b38] -mb-1" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-3.5">
            {/* Offline indicator */}
            {!isOnline && (
              <div
                title="You are browsing offline."
                className="flex items-center gap-1 text-[10px] sm:text-[11px] uppercase text-amber-500 bg-amber-500/10 px-1.5 sm:px-2 py-1 border border-amber-500/20"
              >
                <WifiOff className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                <span className="hidden sm:inline">Offline</span>
              </div>
            )}

            {/* Ambient Sound Toggle (Accessible on all screens) */}
            <AmbientSoundToggle />

            {/* Day / Night Toggle Button */}
            <button
              onClick={toggleDark}
              type="button"
              aria-label={isDark ? "Switch to day/light mode" : "Switch to night/dark mode"}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="p-1.5 sm:p-2.5 rounded-sm text-current hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
              ) : (
                <Moon className="w-4 h-4 text-stone-700 dark:text-stone-300" />
              )}
            </button>

            {/* Primary CTA (Desktop) */}
            <button
              onClick={onOpenEnquiry}
              className="hidden sm:inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-[12.5px] font-semibold uppercase tracking-[0.2em] bg-[#2c241e] text-[#faf8f5] dark:bg-[#faf8f5] dark:text-[#1c1917] hover:bg-[#433830] dark:hover:bg-[#e7dfd5] transition-all whitespace-nowrap cursor-pointer shadow-sm"
            >
              BOOK / ENQUIRE
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              type="button"
              aria-label="Open navigation menu"
              className="lg:hidden p-1.5 sm:p-2.5 text-current hover:bg-black/5 dark:hover:bg-white/10 rounded-sm cursor-pointer"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          FULL-SCREEN MOBILE NAVIGATION DRAWER
         ========================================================================= */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          style={{ backgroundColor: isDark ? '#12100E' : '#FAF8F5' }}
          className="fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto min-h-[100dvh] p-5 sm:p-8 text-[#1c1917] dark:text-[#faf8f5] transition-colors"
        >
          {/* Top Bar inside Drawer */}
          <div className="flex items-center justify-between pb-5 sm:pb-6 border-b border-[#1c1917]/10 dark:border-[#faf8f5]/15">
            <Link
              to="/"
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToTop();
              }}
              className="font-serif text-xl sm:text-2xl tracking-[0.08em] font-light text-[#1c1917] dark:text-[#faf8f5]"
            >
              CAFÉ ZÉRO
            </Link>

            <div className="flex items-center gap-3">
              {/* Day / Night Toggle inside Drawer */}
              <button
                onClick={toggleDark}
                type="button"
                className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-[#1c1917]/20 dark:border-[#faf8f5]/20 text-xs tracking-wider uppercase cursor-pointer"
              >
                {isDark ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Day</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-stone-700" />
                    <span>Night</span>
                  </>
                )}
              </button>

              {/* Close Button */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                type="button"
                aria-label="Close navigation menu"
                className="p-2 text-[#1c1917] dark:text-[#faf8f5] hover:opacity-70 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Nav Links in Center */}
          <div className="py-8 space-y-6">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#78716c] dark:text-[#a8a29e] block">
              Navigation
            </span>

            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      scrollToTop();
                    }}
                    className="flex items-baseline justify-between py-2 border-b border-[#1c1917]/5 dark:border-[#faf8f5]/10 group"
                  >
                    <span
                      className={`font-serif text-2xl sm:text-3xl font-light tracking-wide transition-colors ${
                        isActive
                          ? 'text-[#c29b38] font-normal'
                          : 'text-[#1c1917] dark:text-[#faf8f5] group-hover:text-[#c29b38]'
                      }`}
                    >
                      {link.label}
                    </span>
                    <span className="font-mono text-xs text-[#78716c] dark:text-[#a8a29e]">
                      {link.num}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Actions & Details */}
          <div className="pt-6 border-t border-[#1c1917]/10 dark:border-[#faf8f5]/15 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-widest text-[#78716c] dark:text-[#a8a29e]">
                Café Sound
              </span>
              <AmbientSoundToggle />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="w-full py-3.5 text-center text-xs tracking-[0.2em] uppercase font-medium bg-[#2c241e] text-[#faf8f5] dark:bg-[#faf8f5] dark:text-[#1c1917] cursor-pointer shadow-sm hover:opacity-90"
              >
                BOOK / ENQUIRE
              </button>

              <a
                href={siteConfig.location.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 text-center text-xs tracking-[0.2em] uppercase font-medium border border-[#1c1917]/30 dark:border-[#faf8f5]/30 text-[#1c1917] dark:text-[#faf8f5] inline-flex items-center justify-center gap-2 hover:border-current"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                WhatsApp
              </a>
            </div>

            <div className="text-[11px] text-[#78716c] dark:text-[#a8a29e] text-center pt-2 font-light">
              Ridge View Arcade · Gangtok, Sikkim · 8:00 AM – 9:00 PM
            </div>
          </div>
        </div>
      )}
    </>
  );
}

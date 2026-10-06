import React, { useState, useEffect } from 'react';
import { Compass } from 'lucide-react';

export default function InteractivePreloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const statusMessages = [
    { text: 'Calibrating micro-lot roasts for 5,800 ft altitude', tag: '01 / EXTRACTION' },
    { text: 'Gathering mountain mist across the Kanchenjunga ridge', tag: '02 / ATMOSPHERE' },
    { text: 'Warming reclaimed Sikkim cedar communal tables', tag: '03 / SANCTUARY' },
    { text: 'Ready. Welcome to Café Zéro', tag: '04 / WELCOME' },
  ];

  // Trigger smooth automatic entry animation
  const triggerAutoExit = () => {
    setIsExiting(true);
    // Allow curtain-split and fade animation to reveal website underneath
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 850);
  };

  useEffect(() => {
    // Smooth progress counter reaching 100% in ~1.8 seconds
    const startTime = Date.now();
    const duration = 1800; // ms

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawPct = Math.min(100, Math.floor((elapsed / duration) * 100));

      setProgress(rawPct);

      if (rawPct < 30) {
        setStatusIndex(0);
      } else if (rawPct < 65) {
        setStatusIndex(1);
      } else if (rawPct < 92) {
        setStatusIndex(2);
      } else {
        setStatusIndex(3);
      }

      // When it reaches 100%, automatically open the website directly with interactive curtain animation
      if (rawPct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          triggerAutoExit();
        }, 180); // Brief hold so user sees 100%
      }
    }, 24);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      role="dialog"
      aria-label="Loading Café Zéro"
      onClick={triggerAutoExit}
      className={`fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden bg-[#12100E] text-[#FAF8F5] select-none cursor-pointer transition-opacity duration-700 ${
        isExiting ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
    >
      {/* =====================================================================
          CINEMATIC CURTAINS: Part vertically when entering (Interactive Reveal)
         ===================================================================== */}
      {/* Top Half Curtain */}
      <div
        className={`absolute top-0 left-0 right-0 h-1/2 bg-[#12100E] z-10 border-b border-[#FAF8F5]/10 transition-transform duration-800 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isExiting ? '-translate-y-full' : 'translate-y-0'
        }`}
      />
      {/* Bottom Half Curtain */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1/2 bg-[#12100E] z-10 border-t border-[#FAF8F5]/10 transition-transform duration-800 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isExiting ? 'translate-y-full' : 'translate-y-0'
        }`}
      />

      {/* Atmospheric Ambient Glow Layer */}
      <div
        className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-500 ${
          isExiting ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C29B38]/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(18,16,14,0.7)_100%)] pointer-events-none" />
      </div>

      {/* =====================================================================
          PRELOADER CONTENT (Z-20)
         ===================================================================== */}
      <div
        className={`relative z-20 w-full h-full max-w-7xl mx-auto px-6 sm:px-10 py-6 sm:py-8 flex flex-col justify-between transition-all duration-500 ${
          isExiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        {/* TOP BAR: Elevation */}
        <div className="flex items-center justify-between text-xs tracking-[0.25em] uppercase text-[#FAF8F5]/70">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#C29B38] animate-ping" />
            <span className="font-mono text-[11px] sm:text-xs text-[#C29B38]">
              5,800 FT ELEVATION · GANGTOK
            </span>
          </div>

          <span className="font-mono text-[11px] text-[#FAF8F5]/40 tracking-[0.2em]">
            SIKKIM, INDIA
          </span>
        </div>

        {/* CENTER STAGE: Brand Wordmark, Geometric Ornament & Progress */}
        <div className="flex flex-col items-center justify-center text-center my-auto space-y-6 sm:space-y-8 max-w-2xl mx-auto">
          {/* Minimalist Rotating Compass / Ring */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
            {/* Outer ring with animated dash */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="44"
                stroke="rgba(250,248,245,0.1)"
                strokeWidth="2"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="44"
                stroke="#C29B38"
                strokeWidth="2.5"
                strokeDasharray="276"
                strokeDashoffset={276 - (276 * progress) / 100}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-100 ease-out"
              />
            </svg>
            <Compass className="w-7 h-7 sm:w-8 sm:h-8 text-[#C29B38] animate-spin-slow absolute inset-0 m-auto" />
          </div>

          {/* Majestic Typography Header */}
          <div className="space-y-2 sm:space-y-3">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[0.18em] sm:tracking-[0.25em] uppercase text-[#FAF8F5] drop-shadow-md">
              CAFÉ ZÉRO
            </h1>
            <p className="text-xs sm:text-sm md:text-base font-light tracking-[0.3em] uppercase text-[#C29B38] font-mono">
              High-Altitude Specialty Coffee &amp; Sanctuary
            </p>
          </div>

          {/* Dynamic Status Ticker */}
          <div className="h-10 flex flex-col items-center justify-center">
            <span className="text-[10px] sm:text-xs tracking-[0.28em] uppercase text-[#FAF8F5]/50 font-mono mb-1">
              {statusMessages[statusIndex].tag}
            </span>
            <p className="text-xs sm:text-sm md:text-base font-light text-[#FAF8F5]/85 transition-opacity duration-300 italic font-serif">
              “{statusMessages[statusIndex].text}”
            </p>
          </div>
        </div>

        {/* BOTTOM BAR: Golden Progress Line & Numeric Percent Counter */}
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-[#FAF8F5]/70">
            <span className="tracking-[0.2em]">INITIALIZING EXPERIENCE</span>
            <span className="text-[#C29B38] font-bold text-sm sm:text-base tabular-nums">
              {progress.toString().padStart(2, '0')}%
            </span>
          </div>

          {/* Golden Progress Bar */}
          <div className="w-full h-[2px] sm:h-[3px] bg-[#FAF8F5]/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#8C6D23] via-[#C29B38] to-[#E7DFD5] transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#FAF8F5]/40 tracking-widest uppercase">
            <span>RIDGE VIEW ARCADE · 5,800 FT</span>
            <span>OPENING SANCTUARY...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

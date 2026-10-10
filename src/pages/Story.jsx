import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../data/site.js';
import ImageReveal from '../components/ImageReveal.jsx';
import Button from '../components/Button.jsx';
import AmbientSoundToggle from '../components/AmbientSoundToggle.jsx';
import { prefersReducedMotion } from '../lib/animations.js';
import {
  Compass,
  ArrowDown,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  BookOpen,
  Volume2,
  Wind,
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Story({ onOpenEnquiry }) {
  const scrollSectionRef = useRef(null);
  const pinContainerRef = useRef(null);
  const textSlidesRef = useRef([]);
  const imgSlidesRef = useRef([]);
  const heroImageRef = useRef(null);

  const [activeChapter, setActiveChapter] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const chapterImages = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1400&q=85',
  ];

  const chapterQuotes = [
    '“The Kanchenjunga range flushed amber pink while the valley remained submerged in silent fog.”',
    '“‘Zéro’ is the zero point: stillness, reset, and the unhurried craft of hospitality.”',
    '“At 5,800 feet, water boils lower—every single roast and extraction is calibrated for altitude.”',
    '“Where young local baristas, architects, poets, and travelers share one communal table.”',
    '“Handcrafted from reclaimed Sikkim cedar, raw concrete, and floor-to-ceiling panoramic glass.”',
  ];

  const chapterHighlights = [
    { location: 'Ridge View Arcade', time: 'Dawn at 5,800 ft', theme: 'Genesis' },
    { location: 'Reclaimed Timber Bar', time: 'All Day Ritual', theme: 'Philosophy' },
    { location: 'Extraction Lab', time: 'Calibrated roasts', theme: 'Craft' },
    { location: 'Communal Space', time: 'Lazy Sundays', theme: 'Community' },
    { location: 'Glass Pavilion', time: 'Changing Clouds', theme: 'Space' },
  ];

  const chapters = siteConfig.storyChapters;
  const totalChapters = chapters.length;

  // =========================================================================
  // GSAP SCROLLTRIGGER PINNED STICKY SCROLL ENGINE
  // Pins the viewport while scrolling; text and imagery crossfade in place
  // =========================================================================
  useEffect(() => {
    if (prefersReducedMotion() || !scrollSectionRef.current || !pinContainerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Hero Parallax
      if (heroImageRef.current) {
        gsap.fromTo(
          heroImageRef.current,
          { scale: 1.15 },
          {
            scale: 1.0,
            ease: 'none',
            scrollTrigger: {
              trigger: heroImageRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      }

      // 2. Initial state for text and image slides
      textSlidesRef.current.forEach((el, idx) => {
        if (!el) return;
        if (idx === 0) {
          gsap.set(el, { autoAlpha: 1, y: 0, pointerEvents: 'auto' });
        } else {
          gsap.set(el, { autoAlpha: 0, y: 25, pointerEvents: 'none' });
        }
      });

      imgSlidesRef.current.forEach((el, idx) => {
        if (!el) return;
        if (idx === 0) {
          gsap.set(el, { autoAlpha: 1, scale: 1.0 });
        } else {
          gsap.set(el, { autoAlpha: 0, scale: 0.95 });
        }
      });

      // 3. ScrollTrigger Timeline pinned for the entire duration of the scroll container
      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'storyStickyScroll',
          trigger: scrollSectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: pinContainerRef.current,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            setScrollProgress(p);
            // Calculate active chapter index with balanced distribution
            const idx = Math.min(
              totalChapters - 1,
              Math.max(0, Math.floor(p * totalChapters * 0.999))
            );
            setActiveChapter(idx);
          },
        },
      });

      // 4. Orchestrated crossfades between text information and imagery
      for (let i = 0; i < totalChapters - 1; i++) {
        const curText = textSlidesRef.current[i];
        const nextText = textSlidesRef.current[i + 1];
        const curImg = imgSlidesRef.current[i];
        const nextImg = imgSlidesRef.current[i + 1];

        // Transition starts at 60% of each chapter unit, lasting 40%
        const transitionTime = i + 0.6;
        const transitionDuration = 0.4;

        // Animate current chapter OUT (both text & image)
        tl.to(
          curText,
          { autoAlpha: 0, y: -20, duration: transitionDuration, ease: 'power2.inOut', pointerEvents: 'none' },
          transitionTime
        );
        tl.to(
          curImg,
          { autoAlpha: 0, scale: 1.04, duration: transitionDuration, ease: 'power2.inOut' },
          transitionTime
        );

        // Animate next chapter IN simultaneously (both text & image)
        tl.fromTo(
          nextText,
          { autoAlpha: 0, y: 25, pointerEvents: 'none' },
          { autoAlpha: 1, y: 0, duration: transitionDuration, ease: 'power2.out', pointerEvents: 'auto' },
          transitionTime
        );
        tl.fromTo(
          nextImg,
          { autoAlpha: 0, scale: 0.96 },
          { autoAlpha: 1, scale: 1.0, duration: transitionDuration, ease: 'power2.out' },
          transitionTime
        );
      }
    }, scrollSectionRef.current);

    return () => ctx.revert();
  }, [totalChapters]);

  // Jump smoothly to a specific chapter by adjusting scroll offset
  const goToChapter = (index) => {
    if (!scrollSectionRef.current) return;
    const st = ScrollTrigger.getById('storyStickyScroll');
    if (st) {
      const scrollRange = st.end - st.start;
      const targetY = st.start + (index / (totalChapters - 1)) * Math.max(1, scrollRange - 6);
      window.scrollTo({ top: targetY + 2, behavior: 'smooth' });
    } else {
      setActiveChapter(index);
    }
  };

  return (
    <div className="relative w-full overflow-x-hidden pt-24 sm:pt-28 bg-[#FAF8F5] dark:bg-[#12100E] text-[#1C1917] dark:text-[#FAF8F5] transition-colors">
      {/* =========================================================================
          1. HERO HEADER: THE STORY ARCHIVE
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mb-12 sm:mb-24">
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="flex items-center gap-2 mb-3 sm:mb-4 text-[#C29B38]">
            <span className="w-5 sm:w-6 h-[1px] bg-current"></span>
            <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.25em] uppercase">Chronicle &amp; Craft</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.08] mb-4 sm:mb-6">
            OUR STORY
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#57534E] dark:text-[#D6D3D1] font-light leading-relaxed mb-6 max-w-2xl">
            A quiet sanctuary conceived above the mountain clouds in Gangtok. Scroll through our sticky story
            canvas where each chapter's narrative and photography crossfade together in the same viewport.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 pt-1">
            <button
              onClick={() => goToChapter(0)}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-[#2C241E] text-[#FAF8F5] dark:bg-[#FAF8F5] dark:text-[#1C1917] text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] font-medium transition-all hover:bg-[#433830] cursor-pointer shadow-sm"
            >
              Scroll The Story <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </button>

            <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 border border-[#1C1917]/15 dark:border-[#FAF8F5]/15 text-xs text-[#78716C] dark:text-[#A8A29E]">
              <AmbientSoundToggle variant="nav" />
              <span className="text-[10px] sm:text-[11px] tracking-wider uppercase hidden sm:inline">
                Mountain Ambience
              </span>
            </div>
          </div>
        </div>

        {/* Cinematic Story Hero Image */}
        <div className="relative shadow-2xl overflow-hidden border border-[#1C1917]/10 dark:border-[#FAF8F5]/10 bg-[#1C1815]">
          <div ref={heroImageRef} className="w-full">
            <ImageReveal
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1800&q=85"
              alt="Café Zéro Glass Pavilion looking across Sikkim Valley"
              aspectRatio="16:9"
              priority={true}
              className="w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          <div className="absolute bottom-2.5 left-2.5 sm:bottom-6 sm:left-6 z-20 text-[#FAF8F5] space-y-1 max-w-[90%]">
            <span className="text-[9px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase text-[#C29B38] font-mono block">
              Gangtok, Sikkim · 5,800 FT
            </span>
            <p className="font-serif text-sm sm:text-base md:text-xl font-light italic truncate">
              "Where time slows down to match the mountain breath."
            </p>
          </div>
        </div>
      </section>

      {/* Altitude Stats Banner */}
      <section className="bg-[#1C1815] text-[#FAF8F5] py-6 sm:py-12 border-y border-[#FAF8F5]/10 mb-8 sm:mb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-8 text-center">
            {siteConfig.stats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="font-serif text-xl xs:text-2xl sm:text-3xl md:text-4xl text-[#C29B38] font-light">
                  {stat.value}
                </div>
                <div className="text-[8px] xs:text-[9px] sm:text-[11px] tracking-widest uppercase text-[#FAF8F5]/60 font-light truncate">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. STICKY SCROLL CONTAINER PINNED WITH GSAP SCROLLTRIGGER
          Container pinned in same viewport; responsive layout for small & medium
         ========================================================================= */}
      <section
        ref={scrollSectionRef}
        className="relative w-full overflow-hidden"
        style={{ height: `${totalChapters * 80}vh` }}
      >
        {/* The Pinned Viewport Container (Locks in place while scrolling) */}
        <div
          ref={pinContainerRef}
          className="w-full h-screen h-[100dvh] min-h-0 sm:min-h-[520px] max-h-[960px] flex flex-col justify-between overflow-hidden bg-[#FAF8F5] dark:bg-[#12100E] border-y border-[#1C1917]/10 dark:border-[#FAF8F5]/10 px-3.5 sm:px-6 md:px-8 lg:px-12 py-2.5 sm:py-5 md:py-6 shadow-inner"
        >
          {/* Top Bar: Dynamic Chapter Tracking & Quick Chapter Jump Tabs */}
          <div className="w-full max-w-7xl mx-auto flex items-center justify-between pb-2 sm:pb-3 border-b border-[#1C1917]/10 dark:border-[#FAF8F5]/10 shrink-0 gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase font-mono text-[#C29B38] font-semibold shrink-0">
                0{activeChapter + 1} / 0{totalChapters}
              </span>
              <span className="hidden xs:inline w-3 sm:w-6 h-[1px] bg-[#1C1917]/20 dark:bg-[#FAF8F5]/20 shrink-0"></span>
              <span className="text-[10px] sm:text-[11px] tracking-wider uppercase text-[#78716C] dark:text-[#A8A29E] font-medium truncate max-w-[120px] xs:max-w-[180px] sm:max-w-[260px] md:max-w-none">
                {chapters[activeChapter].title}
              </span>
            </div>

            {/* Clickable Chapter Navigation Tabs (compact for small devices) */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              {chapters.map((ch, idx) => (
                <button
                  key={ch.num}
                  type="button"
                  onClick={() => goToChapter(idx)}
                  title={`Jump to ${ch.title}`}
                  className={`w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-[10px] sm:text-[11px] font-mono rounded-xs transition-all cursor-pointer ${
                    activeChapter === idx
                      ? 'bg-[#C29B38] text-[#1C1815] font-bold shadow-sm'
                      : 'text-[#78716C] dark:text-[#A8A29E] hover:text-[#1C1917] dark:hover:text-[#FAF8F5] hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {ch.num}
                </button>
              ))}
            </div>
          </div>

          {/* Golden Dynamic Progress Line */}
          <div className="w-full max-w-7xl mx-auto h-[2px] bg-[#1C1917]/10 dark:bg-[#FAF8F5]/10 mt-1 mb-2 sm:mb-3.5 overflow-hidden shrink-0">
            <div
              className="h-full bg-[#C29B38] transition-all duration-200 ease-out"
              style={{ width: `${Math.max(4, scrollProgress * 100)}%` }}
            />
          </div>

          {/* =====================================================================
              CENTER STAGE:
              - Mobile (< md): Flex column (Image on top with medium scale, Text card below - NO clashing overlap!)
              - Tablet / Desktop (>= md): Side-by-side 12-col grid
             ===================================================================== */}
          <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col md:grid md:grid-cols-12 gap-3 sm:gap-5 md:gap-8 lg:gap-12 items-center relative min-h-0 overflow-hidden">
            
            {/* TEXT COLUMN / CARD */}
            <div className="order-2 md:order-1 w-full md:col-span-6 relative flex-1 md:h-full flex items-center overflow-hidden min-h-[170px] sm:min-h-[200px] md:min-h-0">
              {chapters.map((chapter, index) => {
                const meta = chapterHighlights[index];
                return (
                  <div
                    key={chapter.num}
                    ref={(el) => (textSlidesRef.current[index] = el)}
                    className="absolute inset-0 flex flex-col justify-center space-y-1.5 sm:space-y-3 md:space-y-4 max-w-full overflow-hidden pr-1"
                  >
                    {/* Chapter Kicker */}
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs sm:text-sm text-[#C29B38] font-bold tracking-wider">
                        {chapter.num}
                      </span>
                      <span className="w-3.5 sm:w-5 h-[1px] bg-[#C29B38]/60"></span>
                      <span className="text-[9px] sm:text-xs tracking-[0.2em] uppercase text-[#78716C] dark:text-[#A8A29E] font-medium truncate">
                        {chapter.subtitle}
                      </span>
                    </div>

                    {/* Chapter Title */}
                    <h2 className="font-serif text-lg sm:text-2xl md:text-3xl lg:text-4xl font-light text-[#1C1917] dark:text-[#FAF8F5] leading-tight tracking-tight truncate">
                      {chapter.title}
                    </h2>

                    {/* Chapter Narrative Body (Line clamped on small devices to prevent overflow) */}
                    <p className="text-[11px] sm:text-xs md:text-sm text-[#57534E] dark:text-[#D6D3D1] font-light leading-relaxed max-w-xl line-clamp-2 sm:line-clamp-3 md:line-clamp-none">
                      {chapter.body}
                    </p>

                    {/* Editorial Pull-Quote Card */}
                    <div className="p-2 sm:p-2.5 md:p-3.5 border-l-2 border-[#C29B38] bg-white/80 dark:bg-[#1A1715]/80 backdrop-blur-sm shadow-xs border border-[#1C1917]/5 dark:border-[#FAF8F5]/5">
                      <p className="font-serif italic text-[11px] sm:text-xs md:text-sm text-[#1C1917] dark:text-[#FAF8F5] font-light leading-snug line-clamp-2 md:line-clamp-none">
                        {chapterQuotes[index]}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-[8px] sm:text-[9px] tracking-wider uppercase text-[#78716C] dark:text-[#A8A29E]">
                        <span>{meta.location}</span>
                        <span>·</span>
                        <span>{meta.time}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* IMAGERY COLUMN: Corresponding Imagery Crossfading In Place (True medium height) */}
            <div className="order-1 md:order-2 w-full md:col-span-6 relative h-[210px] xs:h-[240px] sm:h-[290px] md:h-[360px] lg:h-[440px] shrink-0 overflow-hidden shadow-xl border border-[#1C1917]/10 dark:border-[#FAF8F5]/10 bg-[#241F1B]">
              {chapterImages.map((imgUrl, index) => {
                const meta = chapterHighlights[index];
                return (
                  <div
                    key={index}
                    ref={(el) => (imgSlidesRef.current[index] = el)}
                    className="absolute inset-0 w-full h-full will-change-transform"
                  >
                    <img
                      src={imgUrl}
                      alt={chapters[index].title}
                      className="w-full h-full object-cover object-center"
                      loading="eager"
                    />

                    {/* Cinematic Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20 pointer-events-none" />

                    {/* Elevation & Theme Badges */}
                    <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 z-20 bg-black/75 backdrop-blur-md px-2 sm:px-2.5 py-0.5 sm:py-1 text-[#FAF8F5] border border-white/10 text-[8px] sm:text-[9px] tracking-[0.2em] uppercase font-mono">
                      0{index + 1} / 05 · {meta.theme}
                    </div>

                    <div className="absolute bottom-2.5 right-2.5 sm:bottom-3.5 sm:right-3.5 z-20 bg-black/75 backdrop-blur-md px-2 sm:px-2.5 py-0.5 sm:py-1 text-[#C29B38] border border-white/10 text-[8px] sm:text-[9px] tracking-[0.2em] uppercase font-mono">
                      5,800 FT ELEVATION
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Bottom Bar: Guidance Hint & Direct Navigation Buttons */}
          <div className="w-full max-w-7xl mx-auto flex items-center justify-between pt-2 sm:pt-3 border-t border-[#1C1917]/10 dark:border-[#FAF8F5]/10 shrink-0 text-xs gap-2">
            {/* Scroll Hint */}
            <div className="flex items-center gap-1.5 sm:gap-2 text-[#78716C] dark:text-[#A8A29E] text-[9px] sm:text-[10px] uppercase tracking-widest font-mono truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C29B38] animate-ping shrink-0" />
              <span className="truncate">Scroll or use buttons to progress</span>
            </div>

            {/* Quick Next / Prev Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                type="button"
                onClick={() => goToChapter(Math.max(0, activeChapter - 1))}
                disabled={activeChapter === 0}
                className="flex items-center gap-1 px-2.5 py-1 border border-[#1C1917]/15 dark:border-[#FAF8F5]/15 text-[10px] tracking-wider uppercase disabled:opacity-25 disabled:cursor-not-allowed hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-3 h-3" />
                <span>Prev</span>
              </button>

              <button
                type="button"
                onClick={() => goToChapter(Math.min(totalChapters - 1, activeChapter + 1))}
                disabled={activeChapter === totalChapters - 1}
                className="flex items-center gap-1 px-2.5 py-1 bg-[#2C241E] text-white dark:bg-[#FAF8F5] dark:text-[#1C1917] text-[10px] tracking-wider uppercase disabled:opacity-25 disabled:cursor-not-allowed hover:opacity-90 cursor-pointer shadow-sm font-medium transition-all"
              >
                <span>Next</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. NARRATIVE CLOSING CTA
         ========================================================================= */}
      <section className="max-w-4xl mx-auto px-5 sm:px-6 text-center py-24 sm:py-32 space-y-5 sm:space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C29B38]/10 text-[#C29B38] text-[10px] tracking-[0.25em] uppercase font-semibold">
          <Sparkles className="w-3 h-3" />
          <span>The Mountain Awaits</span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl md:text-5xl font-light text-[#1C1917] dark:text-[#FAF8F5] leading-tight">
          Step into our mountain sanctuary.
        </h3>

        <p className="text-xs sm:text-sm md:text-base text-[#57534E] dark:text-[#D6D3D1] font-light max-w-xl mx-auto leading-relaxed">
          Whether you are stopping by for a morning pour-over or seeking an afternoon of solitary reading, we have
          saved a seat for you above the Gangtok clouds.
        </p>

        <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Button onClick={onOpenEnquiry} variant="primary" className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5">
            RESERVE A SEAT
          </Button>
          <Button to="/menu" variant="secondary" className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5">
            EXPLORE THE MENU
          </Button>
        </div>
      </section>
    </div>
  );
}

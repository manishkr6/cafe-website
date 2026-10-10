import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../data/site.js';
import { menuItems } from '../data/menu.js';
import { galleryItems } from '../data/gallery.js';
import SectionTitle from '../components/SectionTitle.jsx';
import Button from '../components/Button.jsx';
import ImageReveal from '../components/ImageReveal.jsx';
import AmbientSoundToggle from '../components/AmbientSoundToggle.jsx';
import { initHeroAnimation, prefersReducedMotion } from '../lib/animations.js';
import {
  ArrowDown,
  ArrowUpRight,
  ArrowRight,
  Coffee,
  Compass,
  MessageCircle,
  MessageSquare,
  MapPin,
  Clock,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function Home({ onOpenEnquiry }) {
  const navigate = useNavigate();

  const handleOrderAndMessage = (item) => {
    navigate(
      `/contact?item=${encodeURIComponent(item.name)}&price=${encodeURIComponent(item.price)}&category=${encodeURIComponent(item.category || '')}`,
      {
        state: {
          selectedItem: item
        }
      }
    );
  };
  const heroRef = useRef(null);
  const heroBgRef = useRef(null);
  const heroBadgeRef = useRef(null);
  const heroHeadingRef = useRef(null);
  const heroSubtextRef = useRef(null);
  const heroCtaRef = useRef(null);
  const heroScrollIndicatorRef = useRef(null);

  const introSectionRef = useRef(null);
  const introImgRef = useRef(null);

  const horizontalScrollSectionRef = useRef(null);
  const horizontalTrackRef = useRef(null);

  const atmosphereRef = useRef(null);

  // Hero GSAP entrance
  useEffect(() => {
    const cleanup = initHeroAnimation(heroRef, {
      bgImage: heroBgRef.current,
      badge: heroBadgeRef.current,
      heading: heroHeadingRef.current,
      subtext: heroSubtextRef.current,
      cta: heroCtaRef.current,
      scrollIndicator: heroScrollIndicatorRef.current,
    });
    return cleanup;
  }, []);

  // Intro section scroll trigger with storytelling text reveal
  useEffect(() => {
    if (prefersReducedMotion() || !introSectionRef.current) return;
    const ctx = gsap.context(() => {
      const textCol = introSectionRef.current.querySelector('.intro-text');
      if (textCol) {
        gsap.fromTo(
          textCol.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: introSectionRef.current,
              start: 'top 75%',
            },
          }
        );
      }

      if (introImgRef.current) {
        gsap.fromTo(
          introImgRef.current,
          { y: 60, scale: 0.96 },
          {
            y: -20,
            scale: 1,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: introSectionRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 1.2,
            },
          }
        );
      }
    }, introSectionRef.current);
    return () => ctx.revert();
  }, []);

  // Horizontal scroll for "The Zéro Experience"
  useEffect(() => {
    if (prefersReducedMotion() || !horizontalTrackRef.current) return;

    // Only apply horizontal pin on desktop screens (>1024px)
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const track = horizontalTrackRef.current;
      const totalScroll = track.scrollWidth - window.innerWidth + 120;

      gsap.to(track, {
        x: () => -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: horizontalScrollSectionRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${totalScroll}`,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
  }, []);

  // Featured menu items
  const featuredCoffee = menuItems.filter((i) => i.category === 'coffee' && i.isFeatured).slice(0, 3);
  const featuredFood = menuItems.filter((i) => (i.category === 'breakfast' || i.category === 'small-plates') && i.isFeatured).slice(0, 3);

  // Curated gallery preview
  const previewGallery = galleryItems.slice(0, 6);

  // Experience panels
  const experiencePanels = [
    {
      index: '01',
      title: 'Specialty Coffee',
      tagline: 'High-Altitude Extractions',
      description: 'Carefully sourced beans from organic Himalayan micro-lots, roasted locally and calibrated for 5,800 ft mountain extraction.',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
    },
    {
      index: '02',
      title: 'Fresh Slow Food',
      tagline: 'Orchard & Forest Sourced',
      description: 'Handcrafted sourdough toasties, warm buckwheat hotcakes, and wild mountain berry compotes prepared fresh every single morning.',
      image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80',
    },
    {
      index: '03',
      title: 'Mountain Views',
      tagline: 'Above The Valley Clouds',
      description: 'Floor-to-ceiling panoramic glass facing the Kanchenjunga ridge where sunlight dances across drifting morning mist.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80',
    },
    {
      index: '04',
      title: 'Good Conversations',
      tagline: 'Unhurried Gathering',
      description: 'Reclaimed cedar communal tables, analog vinyl records, independent books, and an unspoken invitation to pause.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  return (
    <div className="w-full overflow-hidden">
      {/* =========================================================================
          1. HERO SECTION (Cinematic Full Screen)
         ========================================================================= */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1C1815] text-[#FAF8F5] pt-28 pb-20 sm:pt-32 sm:pb-24"
      >
        {/* Cinematic Background Image with dark luxury scrim */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            ref={heroBgRef}
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1920&q=85')`,
            }}
          />
          {/* Measured Scrim for WCAG AA 4.5:1 legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1815] via-[#1C1815]/65 to-[#1C1815]/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 text-center flex flex-col items-center">
          {/* Small label */}
          <div ref={heroBadgeRef} className="flex items-center gap-2 mb-4 sm:mb-6 opacity-0">
            <span className="w-4 sm:w-6 h-[1px] bg-[#C29B38]"></span>
            <span className="text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase font-medium text-[#FAF8F5]/80">
              CAFÉ ZÉRO · GANGTOK
            </span>
            <span className="w-4 sm:w-6 h-[1px] bg-[#C29B38]"></span>
          </div>

          {/* Large Heading - Medium-Large Scale for balanced presence */}
          <h1
            ref={heroHeadingRef}
            className="font-serif text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[76px] font-light tracking-tight leading-[1.08] text-[#FAF8F5] mb-5 sm:mb-6 max-w-4xl opacity-0 text-balance break-words"
          >
            Coffee, Food &amp;<br className="hidden sm:inline" /> Mountain Moments.
          </h1>

          {/* Supporting Text */}
          <p
            ref={heroSubtextRef}
            className="text-sm sm:text-base md:text-lg font-light text-[#FAF8F5]/85 max-w-xl leading-relaxed mb-8 sm:mb-10 opacity-0"
          >
            A contemporary café tucked into the rhythm of Gangtok.
            Perched above the clouds at 5,800 feet.
          </p>

          {/* CTAs */}
          <div
            ref={heroCtaRef}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 opacity-0 w-full sm:w-auto"
          >
            <Button to="/menu" variant="gold" className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 text-xs">
              EXPLORE THE CAFÉ
            </Button>
            <Button
              onClick={onOpenEnquiry}
              variant="outlineWhite"
              className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 text-xs"
            >
              MAKE AN ENQUIRY
            </Button>
          </div>
        </div>

        {/* Continuous Scroll Indicator - Anchored cleanly at the absolute bottom of the entire hero section */}
        <button
          ref={heroScrollIndicatorRef}
          type="button"
          onClick={() => {
            const target = document.getElementById('intro');
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.scrollTo({ top: window.innerHeight * 0.85, behavior: 'smooth' });
            }
          }}
          aria-label="Scroll down to explore Café Zéro"
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 opacity-0 text-[#FAF8F5]/70 hover:text-white transition-colors cursor-pointer group"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase group-hover:tracking-[0.35em] transition-all">Scroll</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#C29B38]" />
        </button>
      </section>

      {/* =========================================================================
          2. INTRODUCTION SECTION (Editorial Split Layout)
         ========================================================================= */}
      <section
        id="intro"
        ref={introSectionRef}
        className="pt-16 pb-24 sm:pt-28 sm:pb-36 bg-[#FAF8F5] dark:bg-[#12100E] text-[#1C1917] dark:text-[#FAF8F5] transition-colors overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left Col: Large Typography */}
            <div className="intro-text lg:col-span-5 space-y-5 sm:space-y-8">
              <div className="flex items-center gap-2.5 text-[#C29B38]">
                <span className="w-5 sm:w-8 h-[1.5px] bg-current"></span>
                <span className="text-xs sm:text-sm font-medium tracking-[0.25em] uppercase">
                  Sanctuary Above The Valley
                </span>
              </div>
              <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.08] tracking-tight text-balance break-words">
                More than<br />
                <span className="italic font-normal">just coffee.</span>
              </h2>
              <p className="text-sm sm:text-base lg:text-xl text-[#57534E] dark:text-[#D6D3D1] leading-relaxed font-light max-w-xl">
                Café Zéro is a small gathering place for good coffee, thoughtful food, and slow moments in the mountains.
              </p>
              <div className="pt-2 sm:pt-4">
                <Link
                  to="/story"
                  onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
                  }}
                  className="inline-flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.22em] uppercase text-[#1C1917] dark:text-[#FAF8F5] border-b-2 border-[#1C1917]/40 dark:border-[#FAF8F5]/40 pb-1.5 hover:border-current transition-colors"
                >
                  Read Our Story <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Col: Editorial Coffee Craft Imagery */}
            <div className="lg:col-span-7 relative w-full">
              {/* Main Showcase Image: Chemex Manual Pour with 4:3 / 16:10 balanced framing */}
              <div ref={introImgRef} className="relative z-10 shadow-2xl overflow-hidden border border-[#1C1917]/10 dark:border-[#FAF8F5]/10 bg-[#241F1B] w-full">
                <ImageReveal
                  src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1400&q=85"
                  alt="Café Zéro Handcrafted Chemex Extraction"
                  aspectRatio="4:3"
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Elevation Badge */}
                <div className="absolute top-2.5 left-2.5 sm:top-5 sm:left-5 z-20 bg-black/80 backdrop-blur-md text-[#FAF8F5] px-2.5 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase font-mono border border-white/15">
                  5,800 FT ELEVATION
                </div>
              </div>

              {/* Secondary Floating Artisan Detail Card */}
              <div className="absolute bottom-2.5 right-2.5 sm:-bottom-8 sm:right-6 md:-bottom-10 md:right-8 z-20 flex items-center gap-3 sm:gap-4 p-2.5 sm:p-4 bg-[#FAF8F5]/95 dark:bg-[#1A1715]/95 backdrop-blur-md border border-[#1C1917]/15 dark:border-[#FAF8F5]/15 shadow-2xl max-w-[calc(100%-1.25rem)] sm:max-w-[340px] md:max-w-[380px] transition-transform hover:scale-[1.02]">
                <div className="w-14 h-14 sm:w-22 sm:h-22 md:w-26 md:h-26 shrink-0 overflow-hidden border border-[#1C1917]/10 dark:border-[#FAF8F5]/10 bg-[#241F1B]">
                  <img
                    src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80"
                    alt="Artisan Roast Crema Detail"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="pr-1 min-w-0">
                  <span className="text-[11px] sm:text-sm tracking-[0.18em] sm:tracking-[0.2em] uppercase font-semibold text-[#C29B38] block truncate">
                    Micro-Lot
                  </span>
                  <p className="font-serif text-sm sm:text-lg md:text-xl font-normal text-[#1C1917] dark:text-[#FAF8F5] leading-snug truncate mt-0.5">
                    Mountain Roast
                  </p>
                  <span className="text-[9px] sm:text-xs text-[#78716C] dark:text-[#A8A29E] tracking-wider uppercase block mt-0.5 sm:mt-1 truncate font-medium">
                    Slow Pour-Over
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. SIGNATURE EXPERIENCE (Horizontal Scrolling / Multi-Panel)
         ========================================================================= */}
      <section
        ref={horizontalScrollSectionRef}
        className="py-16 sm:py-24 bg-[#1C1815] text-[#FAF8F5] relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-10 sm:mb-12">
          <SectionTitle
            kicker="Curated Rituals"
            title="THE ZÉRO EXPERIENCE"
            subtitle="Four distinctive pillars shaped by high altitude, artisanal craftsmanship, and the quiet dignity of the mountains."
            theme="light-text"
          />
        </div>

        {/* Horizontal scroll track on desktop, responsive flex on mobile */}
        <div className="px-4 sm:px-8 lg:px-12">
          <div
            ref={horizontalTrackRef}
            className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10 pb-4 sm:pb-8 will-change-transform"
          >
            {experiencePanels.map((panel) => (
              <div
                key={panel.index}
                className="w-full lg:w-[480px] shrink-0 bg-[#26201C] border border-[#FAF8F5]/10 p-5 sm:p-8 flex flex-col justify-between group hover:border-[#C29B38]/60 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[#FAF8F5]/10 mb-4 sm:mb-6">
                    <span className="font-mono text-xs text-[#C29B38] tracking-widest">{panel.index}</span>
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#FAF8F5]/50">{panel.tagline}</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#FAF8F5] mb-3 sm:mb-4">
                    {panel.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#FAF8F5]/70 leading-relaxed font-light mb-5 sm:mb-6">
                    {panel.description}
                  </p>
                </div>
                <div className="overflow-hidden">
                  <ImageReveal
                    src={panel.image}
                    alt={panel.title}
                    aspectRatio="16:9"
                    className="group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. SIGNATURE MENU PREVIEW
         ========================================================================= */}
      <section className="py-16 sm:py-32 bg-[#FAF8F5] dark:bg-[#12100E] text-[#1C1917] dark:text-[#FAF8F5] transition-colors border-t border-[#1C1917]/10 dark:border-[#FAF8F5]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-5 sm:gap-6">
            <SectionTitle
              kicker="Seasonal Harvest"
              title="Signature Offerings"
              subtitle="Calibrated for altitude and made with Himalayan organic ingredients."
            />
            <Button to="/menu" variant="secondary" className="self-start sm:self-auto">
              VIEW FULL MENU
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Coffee Column */}
            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-center gap-2 pb-3 border-b border-[#1C1917]/15 dark:border-[#FAF8F5]/15">
                <Coffee className="w-4 h-4 text-[#C29B38]" />
                <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1C1917] dark:text-[#FAF8F5]">
                  COFFEE &amp; MANUAL EXTRACTIONS
                </h3>
              </div>
              <div className="space-y-6">
                {featuredCoffee.map((item) => (
                  <div
                    key={item.id}
                    className="group pb-6 border-b border-[#1C1917]/10 dark:border-[#FAF8F5]/10 last:border-0 hover:border-[#C29B38] transition-colors flex flex-col xs:flex-row gap-3.5 sm:gap-4 items-start"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 overflow-hidden border border-[#1C1917]/10 dark:border-[#FAF8F5]/10 bg-[#241F1B]">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 w-full min-w-0">
                      <div className="flex items-baseline justify-between mb-1 gap-2">
                        <h4 className="font-serif text-lg sm:text-2xl font-light text-[#1C1917] dark:text-[#FAF8F5] group-hover:text-[#C29B38] transition-colors truncate">
                          {item.name}
                        </h4>
                        <span className="font-mono text-sm sm:text-base font-medium text-[#1C1917] dark:text-[#FAF8F5] tabular-nums shrink-0">
                          ₹{item.price}
                        </span>
                      </div>
                      <p className="text-xs text-[#57534E] dark:text-[#D6D3D1] font-light leading-relaxed mb-2 line-clamp-2 sm:line-clamp-none">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        <div className="flex items-center gap-2 text-[10px] tracking-wider uppercase text-[#78716C] dark:text-[#A8A29E]">
                          <span>{item.altitude}</span>
                          <span>·</span>
                          <span>{item.tags[0]}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleOrderAndMessage(item)}
                          className="py-1 px-2.5 bg-[#1C1917]/5 hover:bg-[#C29B38] hover:text-white dark:bg-[#FAF8F5]/10 dark:hover:bg-[#C29B38] dark:hover:text-white text-[#1C1917] dark:text-[#FAF8F5] border border-[#1C1917]/15 dark:border-[#FAF8F5]/15 hover:border-transparent text-[11px] uppercase tracking-wider font-medium transition-all flex items-center gap-1.5 rounded-xs cursor-pointer group/btn"
                        >
                          <MessageSquare className="w-3 h-3 text-[#C29B38] group-hover/btn:text-white transition-colors" />
                          <span>Order &amp; Message</span>
                          <ArrowRight className="w-3 h-3 opacity-60 group-hover/btn:translate-x-0.5 group-hover/btn:opacity-100 transition-all" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Food & Savouries Column */}
            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-center gap-2 pb-3 border-b border-[#1C1917]/15 dark:border-[#FAF8F5]/15">
                <Sparkles className="w-4 h-4 text-[#C29B38]" />
                <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1C1917] dark:text-[#FAF8F5]">
                  BREAKFAST &amp; SMALL PLATES
                </h3>
              </div>
              <div className="space-y-6">
                {featuredFood.map((item) => (
                  <div
                    key={item.id}
                    className="group pb-6 border-b border-[#1C1917]/10 dark:border-[#FAF8F5]/10 last:border-0 hover:border-[#C29B38] transition-colors flex flex-col xs:flex-row gap-3.5 sm:gap-4 items-start"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 overflow-hidden border border-[#1C1917]/10 dark:border-[#FAF8F5]/10 bg-[#241F1B]">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 w-full min-w-0">
                      <div className="flex items-baseline justify-between mb-1 gap-2">
                        <h4 className="font-serif text-lg sm:text-2xl font-light text-[#1C1917] dark:text-[#FAF8F5] group-hover:text-[#C29B38] transition-colors truncate">
                          {item.name}
                        </h4>
                        <span className="font-mono text-sm sm:text-base font-medium text-[#1C1917] dark:text-[#FAF8F5] tabular-nums shrink-0">
                          ₹{item.price}
                        </span>
                      </div>
                      <p className="text-xs text-[#57534E] dark:text-[#D6D3D1] font-light leading-relaxed mb-2 line-clamp-2 sm:line-clamp-none">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        <div className="flex items-center gap-2 text-[10px] tracking-wider uppercase text-[#78716C] dark:text-[#A8A29E]">
                          <span>{item.altitude}</span>
                          <span>·</span>
                          <span>{item.tags[0]}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleOrderAndMessage(item)}
                          className="py-1 px-2.5 bg-[#1C1917]/5 hover:bg-[#C29B38] hover:text-white dark:bg-[#FAF8F5]/10 dark:hover:bg-[#C29B38] dark:hover:text-white text-[#1C1917] dark:text-[#FAF8F5] border border-[#1C1917]/15 dark:border-[#FAF8F5]/15 hover:border-transparent text-[11px] uppercase tracking-wider font-medium transition-all flex items-center gap-1.5 rounded-xs cursor-pointer group/btn"
                        >
                          <MessageSquare className="w-3 h-3 text-[#C29B38] group-hover/btn:text-white transition-colors" />
                          <span>Order &amp; Message</span>
                          <ArrowRight className="w-3 h-3 opacity-60 group-hover/btn:translate-x-0.5 group-hover/btn:opacity-100 transition-all" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. ATMOSPHERE (Full-Width Cinematic Section)
         ========================================================================= */}
      <section
        ref={atmosphereRef}
        className="relative h-[70vh] sm:h-[80vh] min-h-[420px] flex items-center justify-center overflow-hidden bg-[#1C1815] text-[#FAF8F5]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85')`,
          }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-brightness-75" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 sm:space-y-6">
          <span className="text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#FAF8F5]/70 font-medium">
            A Little Place Above The Clouds
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-[#FAF8F5] leading-tight text-balance">
            COME FOR THE COFFEE.<br />
            STAY FOR THE MOMENT.
          </h2>
          <p className="text-xs sm:text-base text-[#FAF8F5]/80 font-light max-w-xl mx-auto leading-relaxed">
            Where Gangtok's mountain mist brushes against panoramic windowpanes and the clock turns slow.
          </p>

          <div className="pt-3 sm:pt-4 flex justify-center">
            <AmbientSoundToggle variant="atmosphere" />
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. GALLERY PREVIEW (Asymmetrical Grid)
         ========================================================================= */}
      <section className="py-16 sm:py-32 bg-[#FAF8F5] dark:bg-[#12100E] text-[#1C1917] dark:text-[#FAF8F5] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-5 sm:gap-6">
            <SectionTitle
              kicker="Visual Archive"
              title="Life at Café Zéro"
              subtitle="Moments captured from our coffee bar, terrace, and the surrounding Gangtok ridge."
            />
            <Button to="/gallery" variant="secondary" className="self-start sm:self-auto">
              VIEW ALL PHOTOS
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {previewGallery.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden flex flex-col justify-between h-full border border-[#1C1917]/10 dark:border-[#FAF8F5]/10 p-2 sm:p-2.5 bg-white/40 dark:bg-[#1A1715]/40"
              >
                <div className="overflow-hidden w-full">
                  <ImageReveal
                    src={item.src}
                    alt={item.title}
                    aspectRatio="4:3"
                    caption={item.caption}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="pt-3 pb-1 flex items-baseline justify-between text-xs">
                  <span className="font-serif font-light text-base text-[#1C1917] dark:text-[#FAF8F5] group-hover:text-[#C29B38] transition-colors truncate pr-2">
                    {item.title}
                  </span>
                  <span className="text-[10px] tracking-widest uppercase text-[#78716C] dark:text-[#A8A29E] shrink-0">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. LOCATION & DETAILS
         ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#F3EFEA] dark:bg-[#1A1715] text-[#1C1917] dark:text-[#FAF8F5] transition-colors border-t border-[#1C1917]/10 dark:border-[#FAF8F5]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Info details */}
            <div className="lg:col-span-5 space-y-5 sm:space-y-6">
              <SectionTitle
                kicker="Find Us in Sikkim"
                title="CAFÉ ZÉRO"
                subtitle="Gangtok, Sikkim, India"
              />
              <div className="space-y-3 sm:space-y-4 pt-1 sm:pt-2 text-xs sm:text-sm text-[#57534E] dark:text-[#D6D3D1]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C29B38] mt-0.5 shrink-0" />
                  <div>
                    <strong className="block text-[#1C1917] dark:text-[#FAF8F5] font-medium">Address:</strong>
                    <span>{siteConfig.location.address}, {siteConfig.location.city}, {siteConfig.location.state}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C29B38] mt-0.5 shrink-0" />
                  <div>
                    <strong className="block text-[#1C1917] dark:text-[#FAF8F5] font-medium">Opening Hours:</strong>
                    <span>Monday – Sunday · 8:00 AM – 9:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
                <a
                  href={siteConfig.location.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 text-xs font-medium uppercase tracking-[0.18em] sm:tracking-[0.2em] bg-[#2C241E] text-white dark:bg-[#FAF8F5] dark:text-[#1C1917] hover:opacity-90"
                >
                  <Compass className="w-3.5 h-3.5" />
                  GET DIRECTIONS
                </a>
                <a
                  href={siteConfig.location.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 text-xs font-medium uppercase tracking-[0.18em] sm:tracking-[0.2em] border border-[#1C1917]/30 dark:border-[#FAF8F5]/30 hover:border-current text-[#1C1917] dark:text-[#FAF8F5]"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  WHATSAPP
                </a>
              </div>
            </div>

            {/* Map Frame */}
            <div className="lg:col-span-7 h-[280px] xs:h-[340px] sm:h-[440px] bg-[#2C241E] border border-[#1C1917]/10 dark:border-[#FAF8F5]/10 shadow-lg overflow-hidden relative">
              <iframe
                title="Café Zéro Location Map"
                src={siteConfig.location.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'contrast(1.05) opacity(0.95)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. FINAL DRAMATIC FULL-SCREEN CTA
         ========================================================================= */}
      <section className="relative min-h-[65vh] sm:min-h-[75vh] flex items-center justify-center overflow-hidden bg-[#1C1815] text-[#FAF8F5]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1920&q=85')`,
          }}
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 sm:space-y-8">
          <span className="text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#C29B38] font-medium">
            Above MG Marg · Gangtok
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-[#FAF8F5] leading-snug text-balance">
            YOUR NEXT<br />
            COFFEE BREAK<br />
            STARTS HERE.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
            <Button to="/contact" variant="gold" className="w-full sm:w-auto px-6 sm:px-8 py-3 text-xs">
              VISIT CAFÉ
            </Button>
            <Button
              onClick={onOpenEnquiry}
              variant="outlineWhite"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 text-xs"
            >
              MAKE AN ENQUIRY
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

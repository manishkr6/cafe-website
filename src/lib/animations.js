/**
 * Café Zéro — GSAP Animation Library & Motion Controls
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Hero Entrance Animation
 */
export function initHeroAnimation(containerRef, elements) {
  if (prefersReducedMotion() || !containerRef.current) return;

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Background scale down from 1.15 to 1.0
    if (elements.bgImage) {
      tl.fromTo(
        elements.bgImage,
        { scale: 1.15, filter: 'brightness(0.7)' },
        { scale: 1.0, filter: 'brightness(0.85)', duration: 2.2, ease: 'power2.out' },
        0
      );
    }

    // Small label fade upward
    if (elements.badge) {
      tl.fromTo(
        elements.badge,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1 },
        0.4
      );
    }

    // Main headline reveal
    if (elements.heading) {
      tl.fromTo(
        elements.heading,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
        0.6
      );
    }

    // Subtitle & CTAs
    if (elements.subtext) {
      tl.fromTo(
        elements.subtext,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 1 },
        0.8
      );
    }

    if (elements.cta) {
      tl.fromTo(
        elements.cta,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15 },
        1.0
      );
    }

    if (elements.scrollIndicator) {
      tl.fromTo(
        elements.scrollIndicator,
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        1.4
      );
    }
  }, containerRef);

  return () => ctx.revert();
}

/**
 * Scroll Reveal for Section Elements
 */
export function initScrollReveal(elementRef, options = {}) {
  if (prefersReducedMotion() || !elementRef.current) return;

  const ctx = gsap.context(() => {
    gsap.fromTo(
      elementRef.current,
      {
        opacity: 0,
        y: options.y || 40,
        scale: options.scale || 1
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: options.duration || 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elementRef.current,
          start: options.start || 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  return () => ctx.revert();
}

/**
 * Parallax Scroll effect for photography
 */
export function initParallax(elementRef, speed = 0.2) {
  if (prefersReducedMotion() || !elementRef.current) return;

  const ctx = gsap.context(() => {
    gsap.fromTo(
      elementRef.current,
      { yPercent: -speed * 50 },
      {
        yPercent: speed * 50,
        ease: 'none',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );
  });

  return () => ctx.revert();
}

/**
 * Magnetic button interaction on desktop
 */
export function setupMagneticEffect(btnRef) {
  if (typeof window === 'undefined' || prefersReducedMotion() || !btnRef.current) return;

  const btn = btnRef.current;
  const onMouseMove = (e) => {
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    gsap.to(btn, { x, y, duration: 0.3, ease: 'power2.out' });
  };

  const onMouseLeave = () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
  };

  btn.addEventListener('mousemove', onMouseMove);
  btn.addEventListener('mouseleave', onMouseLeave);

  return () => {
    btn.removeEventListener('mousemove', onMouseMove);
    btn.removeEventListener('mouseleave', onMouseLeave);
  };
}

export { gsap, ScrollTrigger };

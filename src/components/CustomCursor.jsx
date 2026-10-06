import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from '../lib/animations.js';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion()) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const onMouseMove = (e) => {
      setIsVisible(true);
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.35,
        ease: 'power2.out',
      });
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
    const handleOver = () => setIsHovered(true);
    const handleOut = () => setIsHovered(false);

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleOver);
      el.addEventListener('mouseleave', handleOut);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleOver);
        el.removeEventListener('mouseleave', handleOut);
      });
    };
  }, []);

  return (
    <div className={`hidden md:block pointer-events-none transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Inner pinpoint dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#C29B38] rounded-full -translate-x-1/2 -translate-y-1/2 z-[9999] pointer-events-none"
      />
      {/* Outer subtle ring */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 rounded-full border border-[#2C241E]/40 dark:border-[#FAF8F5]/50 -translate-x-1/2 -translate-y-1/2 z-[9998] pointer-events-none transition-[width,height,background-color] duration-200 ease-out ${
          isHovered
            ? 'w-10 h-10 bg-[#C29B38]/10 border-[#C29B38]'
            : 'w-7 h-7 bg-transparent'
        }`}
      />
    </div>
  );
}

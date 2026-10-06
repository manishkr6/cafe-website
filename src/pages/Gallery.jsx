import React, { useState, useEffect } from 'react';
import { galleryCategories, galleryItems } from '../data/gallery.js';
import ImageReveal from '../components/ImageReveal.jsx';
import { X, ChevronLeft, ChevronRight, Camera, MapPin } from 'lucide-react';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems = activeCategory === 'ALL'
    ? galleryItems
    : galleryItems.filter((i) => i.category === activeCategory);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, filteredItems.length]);

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="w-full pt-28 pb-24 bg-[#FAF8F5] dark:bg-[#12100E] text-[#1C1917] dark:text-[#FAF8F5] transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-4 text-[#C29B38]">
            <span className="w-6 h-[1px] bg-current"></span>
            <span className="text-[11px] font-medium tracking-[0.25em] uppercase">Documentary Archive</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.12] mb-4 sm:mb-6">
            GALLERY
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] dark:text-[#D6D3D1] font-light leading-relaxed">
            A visual documentation of mountain mornings, artisanal extractions, and the quiet rhythm of Café Zéro.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar py-2 border-b border-[#1C1917]/10 dark:border-[#FAF8F5]/10 mb-12">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setLightboxIndex(null);
              }}
              className={`px-4 py-2 text-xs font-medium tracking-[0.2em] uppercase transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#2C241E] text-white dark:bg-[#FAF8F5] dark:text-[#1C1917]'
                  : 'text-[#78716C] dark:text-[#A8A29E] hover:text-[#1C1917] dark:hover:text-[#FAF8F5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group cursor-pointer flex flex-col justify-between h-full border border-[#1C1917]/10 dark:border-[#FAF8F5]/10 p-2 sm:p-2.5 bg-white/40 dark:bg-[#1A1715]/40 transition-colors hover:border-[#C29B38]/60"
            >
              <div className="overflow-hidden w-full relative">
                <ImageReveal
                  src={item.src}
                  alt={item.title}
                  aspectRatio="4:3"
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="px-4 py-2 bg-black/80 text-white text-[11px] tracking-widest uppercase border border-white/20">
                    View Photo
                  </span>
                </div>
              </div>

              <div className="pt-3 pb-1 flex items-baseline justify-between text-xs">
                <div className="pr-2 truncate">
                  <h4 className="font-serif text-lg font-light text-[#1C1917] dark:text-[#FAF8F5] group-hover:text-[#C29B38] transition-colors truncate">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#78716C] dark:text-[#A8A29E] font-light truncate">
                    {item.caption}
                  </p>
                </div>
                <span className="text-[10px] tracking-widest uppercase text-[#C29B38] font-medium shrink-0">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {currentItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8"
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            aria-label="Close Lightbox"
            className="absolute top-6 right-6 p-2 text-white/70 hover:text-white transition-colors z-20"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            onClick={() => setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)}
            aria-label="Previous image"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white transition-colors z-20"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Next button */}
          <button
            onClick={() => setLightboxIndex((prev) => (prev + 1) % filteredItems.length)}
            aria-label="Next image"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white transition-colors z-20"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Image & Metadata */}
          <div className="max-w-5xl w-full flex flex-col items-center">
            <div className="max-h-[75vh] overflow-hidden flex items-center justify-center">
              <img
                src={currentItem.src}
                alt={currentItem.title}
                className="max-h-[72vh] max-w-full object-contain shadow-2xl"
              />
            </div>

            {/* Bottom Caption & EXIF data */}
            <div className="w-full max-w-3xl pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between text-white gap-4 border-t border-white/15 mt-4">
              <div>
                <h3 className="font-serif text-2xl font-light text-white">
                  {currentItem.title}
                </h3>
                <p className="text-xs text-white/70 font-light mt-1">
                  {currentItem.caption}
                </p>
              </div>

              <div className="text-right text-[11px] text-white/50 space-y-1">
                <div className="flex items-center gap-1 sm:justify-end">
                  <MapPin className="w-3 h-3 text-[#C29B38]" />
                  <span>{currentItem.location}</span>
                </div>
                <div className="flex items-center gap-1 sm:justify-end font-mono">
                  <Camera className="w-3 h-3 text-[#C29B38]" />
                  <span>{currentItem.exif}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

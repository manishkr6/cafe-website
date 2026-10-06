import React, { useState } from 'react';

export default function ImageReveal({
  src,
  alt = 'Café Zéro',
  aspectRatio = '16:9',
  className = '',
  imgClassName = '',
  caption = null,
  priority = false
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // If className already specifies an aspect- ratio or aspectRatio is none, don't override
  const hasCustomAspect = className.includes('aspect-');
  const aspectClass = (aspectRatio === 'none' || hasCustomAspect)
    ? ''
    : ({
        '16:9': 'aspect-[16/9]',
        '4:3': 'aspect-[4/3]',
        '1:1': 'aspect-square',
        '3:4': 'aspect-[3/4]',
        '9:16': 'aspect-[9/16]'
      }[aspectRatio] || 'aspect-[16/9]');

  return (
    <div className={`relative overflow-hidden bg-[#241F1B] ${aspectClass} ${className} group`}>
      {/* Fallback container with editorial atmosphere */}
      {(!loaded || error) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#2C241E] to-[#1C1815] text-[#FAF8F5]/40 p-4 transition-opacity duration-700">
          <svg className="w-8 h-8 mb-2 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="text-[10px] tracking-[0.25em] uppercase font-serif text-[#FAF8F5]/60 text-center">
            {alt || 'Café Zéro · Gangtok'}
          </span>
        </div>
      )}

      {/* Actual image */}
      {!error && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
      )}

      {/* Optional Caption Overlay */}
      {caption && (
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-xs text-[#FAF8F5] font-light tracking-wide">{caption}</p>
        </div>
      )}
    </div>
  );
}

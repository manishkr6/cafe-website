import React from 'react';

export default function SectionTitle({
  kicker,
  title,
  subtitle,
  align = 'left',
  theme = 'dark-text',
  className = ''
}) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center mx-auto items-center',
    right: 'text-right ml-auto items-end'
  }[align] || 'text-left';

  const isLight = theme === 'light-text';

  return (
    <div className={`flex flex-col ${alignClass} ${className} max-w-3xl`}>
      {kicker && (
        <div className="flex items-center gap-2.5 mb-3.5">
          <span className="w-6 sm:w-8 h-[1.5px] bg-current opacity-60"></span>
          <span
            className={`text-xs sm:text-sm font-medium tracking-[0.25em] uppercase ${
              isLight ? 'text-[#FAF8F5]/80' : 'text-[#78716C] dark:text-[#A8A29E]'
            }`}
          >
            {kicker}
          </span>
        </div>
      )}
      <h2
        className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1.12] tracking-tight mb-4 text-balance ${
          isLight ? 'text-[#FAF8F5]' : 'text-[#1C1917] dark:text-[#FAF8F5]'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-light ${
            isLight ? 'text-[#FAF8F5]/85' : 'text-[#57534E] dark:text-[#D6D3D1]'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

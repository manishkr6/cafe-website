import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setupMagneticEffect } from '../lib/animations.js';

export default function Button({
  children,
  to,
  onClick,
  variant = 'primary',
  className = '',
  magnetic = false,
  type = 'button',
  disabled = false,
  icon = null
}) {
  const btnRef = useRef(null);

  useEffect(() => {
    if (magnetic && btnRef.current) {
      return setupMagneticEffect(btnRef);
    }
  }, [magnetic]);

  const baseStyles = 'inline-flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300 select-none whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#2C241E] text-[#FAF8F5] dark:bg-[#FAF8F5] dark:text-[#1C1917] hover:bg-[#433830] dark:hover:bg-[#E7DFD5] px-6 py-3.5 border border-transparent shadow-sm',
    secondary: 'bg-transparent text-[#1C1917] dark:text-[#FAF8F5] border border-[#1C1917]/25 dark:border-[#FAF8F5]/30 hover:border-[#1C1917] dark:hover:border-[#FAF8F5] hover:bg-[#1C1917]/5 dark:hover:bg-[#FAF8F5]/10 px-6 py-3.5',
    outlineWhite: 'bg-transparent text-[#FAF8F5] border border-[#FAF8F5]/40 hover:border-[#FAF8F5] hover:bg-[#FAF8F5]/10 px-6 py-3.5',
    gold: 'bg-[#C29B38] text-white hover:bg-[#A8842E] px-6 py-3.5 border border-transparent',
    text: 'bg-transparent text-[#1C1917] dark:text-[#FAF8F5] p-0 hover:opacity-70 border-b border-current pb-0.5'
  };

  const combinedStyles = `${baseStyles} ${variants[variant] || variants.primary} ${className}`;

  if (to) {
    return (
      <Link ref={btnRef} to={to} className={combinedStyles} onClick={onClick}>
        <span>{children}</span>
        {icon}
      </Link>
    );
  }

  return (
    <button
      ref={btnRef}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={combinedStyles}
    >
      <span>{children}</span>
      {icon}
    </button>
  );
}

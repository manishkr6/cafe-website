import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] dark:bg-[#12100E] text-[#1C1917] dark:text-[#FAF8F5] px-6 py-24 text-center">
      <div className="max-w-lg space-y-6">
        <span className="font-mono text-xs tracking-widest uppercase text-[#C29B38]">
          404 · Ridge Cloud Not Found
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-balance">
          Lost in the Mountain Mist.
        </h1>
        <p className="text-sm text-[#57534E] dark:text-[#D6D3D1] font-light leading-relaxed">
          The page you are looking for has drifted past the mountain ridge. Let us guide you back to warm coffee and familiar ground.
        </p>
        <div className="pt-4 flex justify-center gap-4">
          <Button to="/" variant="primary">
            RETURN TO CAFÉ
          </Button>
          <Button to="/menu" variant="secondary">
            VIEW MENU
          </Button>
        </div>
      </div>
    </div>
  );
}

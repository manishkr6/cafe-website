import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { menuCategories, menuItems } from '../data/menu.js';
import SectionTitle from '../components/SectionTitle.jsx';
import Button from '../components/Button.jsx';
import ImageReveal from '../components/ImageReveal.jsx';
import { Coffee, Utensils, Sparkles, LayoutGrid, List, MessageSquare, ArrowRight } from 'lucide-react';

export default function Menu({ onOpenEnquiry }) {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'compact'

  const filteredItems = activeCategory === 'all'
    ? menuItems
    : menuItems.filter((item) => item.category === activeCategory);

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

  return (
    <div className="w-full pt-28 pb-24 bg-[#faf8f5] dark:bg-[#12100e] text-[#1c1917] dark:text-[#faf8f5] transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-4 text-[#c29b38]">
            <span className="w-6 h-[1px] bg-current"></span>
            <span className="text-[11px] font-medium tracking-[0.25em] uppercase">Autumn / Winter Edition</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.12] mb-4 sm:mb-6">
            CURATED MENU
          </h1>
          <p className="text-sm sm:text-base text-[#57534e] dark:text-[#d6d3d1] font-light leading-relaxed">
            Every cup is pulled with mountain discipline and every dish is composed with local Sikkim organic produce.
          </p>
        </div>

        {/* Category Navigation Tabs & View Mode Toggle */}
        <div className="sticky top-20 z-30 bg-[#faf8f5]/95 dark:bg-[#12100e]/95 backdrop-blur-md py-4 border-b border-[#1c1917]/10 dark:border-[#faf8f5]/10 mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 text-xs font-medium tracking-[0.2em] uppercase transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[#2c241e] text-white dark:bg-[#faf8f5] dark:text-[#1c1917]'
                  : 'text-[#78716c] dark:text-[#a8a29e] hover:text-[#1c1917] dark:hover:text-[#faf8f5]'
              }`}
            >
              ALL ITEMS ({menuItems.length})
            </button>
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-medium tracking-[0.2em] uppercase transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#2c241e] text-white dark:bg-[#faf8f5] dark:text-[#1c1917]'
                    : 'text-[#78716c] dark:text-[#a8a29e] hover:text-[#1c1917] dark:hover:text-[#faf8f5]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Toggle View Mode: Grid (with photos) vs Compact */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <span className="text-[10px] tracking-widest uppercase text-[#78716c] dark:text-[#a8a29e] mr-1">View:</span>
            <button
              onClick={() => setViewMode('grid')}
              title="Photo Gallery View"
              className={`p-2 border transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#2c241e] text-white dark:bg-[#faf8f5] dark:text-[#1c1917] border-transparent'
                  : 'border-[#1c1917]/20 dark:border-[#faf8f5]/20 text-[#78716c] dark:text-[#a8a29e]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('compact')}
              title="Compact Text View"
              className={`p-2 border transition-colors ${
                viewMode === 'compact'
                  ? 'bg-[#2c241e] text-white dark:bg-[#faf8f5] dark:text-[#1c1917] border-transparent'
                  : 'border-[#1c1917]/20 dark:border-[#faf8f5]/20 text-[#78716c] dark:text-[#a8a29e]'
              }`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Menu Items Render (Grid with Photos or Compact List) */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col justify-between border border-[#1c1917]/10 dark:border-[#faf8f5]/10 bg-white/50 dark:bg-[#1a1715]/50 overflow-hidden hover:border-[#c29b38]/60 transition-all duration-300"
              >
                {/* Photo Header */}
                <div className="overflow-hidden relative bg-[#241f1b]">
                  <ImageReveal
                    src={item.image}
                    alt={item.name}
                    aspectRatio="4:3"
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {item.isFeatured && (
                    <span className="absolute top-3 left-3 bg-[#c29b38] text-white text-[9px] tracking-[0.2em] uppercase font-semibold px-2 py-0.5 shadow-sm">
                      Signature
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 bg-black/80 text-white font-mono text-sm px-2.5 py-1 tracking-wider tabular-nums backdrop-blur-xs">
                    ₹{item.price}
                  </span>
                </div>

                {/* Content details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl font-light text-[#1c1917] dark:text-[#faf8f5] group-hover:text-[#c29b38] transition-colors mb-2">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#57534e] dark:text-[#d6d3d1] font-light leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Metadata tags */}
                  <div className="pt-3 border-t border-[#1c1917]/10 dark:border-[#faf8f5]/10 flex items-center justify-between text-[11px] tracking-wider uppercase text-[#78716c] dark:text-[#a8a29e]">
                    <span>{item.altitude}</span>
                    <span className="text-[#c29b38] font-medium">{item.tags[0]}</span>
                  </div>

                  {/* Order & Message Action Button */}
                  <button
                    type="button"
                    onClick={() => handleOrderAndMessage(item)}
                    className="w-full mt-4 py-2.5 px-4 bg-[#1C1917] hover:bg-[#C29B38] text-[#FAF8F5] dark:bg-[#FAF8F5] dark:text-[#1C1917] dark:hover:bg-[#C29B38] dark:hover:text-[#FAF8F5] text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer shadow-xs hover:shadow-md"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#C29B38] dark:text-[#C29B38] group-hover/btn:text-white transition-colors" />
                    <span>Order &amp; Message</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover/btn:translate-x-1 group-hover/btn:opacity-100 transition-all" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Compact View */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group pb-8 border-b border-[#1c1917]/10 dark:border-[#faf8f5]/10 flex gap-5 items-start justify-between"
              >
                {/* Small thumbnail on the side */}
                <div className="w-20 h-20 shrink-0 overflow-hidden rounded-xs border border-[#1c1917]/10 dark:border-[#faf8f5]/10">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-baseline justify-between mb-1 gap-2">
                    <h3 className="font-serif text-2xl font-light text-[#1c1917] dark:text-[#faf8f5] group-hover:text-[#c29b38] transition-colors">
                      {item.name}
                    </h3>
                    <span className="font-mono text-base font-medium text-[#1c1917] dark:text-[#faf8f5] tabular-nums">
                      ₹{item.price}
                    </span>
                  </div>
                  <p className="text-xs text-[#57534e] dark:text-[#d6d3d1] font-light leading-relaxed mb-2">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] tracking-wider uppercase text-[#78716c] dark:text-[#a8a29e]">
                    <span>{item.altitude}</span>
                    <span>·</span>
                    <span>{item.brewTime}</span>
                    <span>·</span>
                    <span className="text-[#c29b38]">{item.tags[0]}</span>
                  </div>

                  {/* Order & Message Button */}
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={() => handleOrderAndMessage(item)}
                      className="py-1.5 px-3 bg-[#1C1917]/5 hover:bg-[#C29B38] hover:text-white dark:bg-[#FAF8F5]/10 dark:hover:bg-[#C29B38] dark:hover:text-white text-[#1C1917] dark:text-[#FAF8F5] border border-[#1C1917]/15 dark:border-[#FAF8F5]/15 hover:border-transparent text-[11px] uppercase tracking-wider font-medium transition-all flex items-center gap-1.5 rounded-xs cursor-pointer group/btn"
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
        )}

        {/* Custom Dietary / Altitude Note */}
        <div className="mt-20 p-8 sm:p-10 bg-[#f3efea] dark:bg-[#1a1715] border border-[#1c1917]/10 dark:border-[#faf8f5]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <h4 className="font-serif text-xl sm:text-2xl font-light text-[#1c1917] dark:text-[#faf8f5]">
              Dietary Preferences &amp; Custom Extractions
            </h4>
            <p className="text-xs text-[#57534e] dark:text-[#d6d3d1] font-light leading-relaxed">
              We gladly accommodate oat milk, decaf Himalayan roast, and gluten-sensitive requests. Please inform our baristas upon ordering.
            </p>
          </div>
          <Button onClick={onOpenEnquiry} variant="primary">
            RESERVE A TABLE
          </Button>
        </div>
      </div>
    </div>
  );
}

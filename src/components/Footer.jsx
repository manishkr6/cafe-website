import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/site.js';
import { ArrowUpRight, MapPin, Phone, Mail, Clock, Sparkles } from 'lucide-react';
import AmbientSoundToggle from './AmbientSoundToggle.jsx';

export default function Footer({ onOpenEnquiry, onReplayLoader }) {
  return (
    <footer className="bg-[#1C1815] text-[#FAF8F5] pt-20 pb-12 border-t border-[#FAF8F5]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Editorial Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#FAF8F5]/10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-6">
            <h3 className="font-serif text-3xl sm:text-4xl font-light tracking-[0.05em] text-[#FAF8F5]">
              CAFÉ ZÉRO
            </h3>
            <p className="font-serif italic text-lg text-[#FAF8F5]/70 max-w-sm">
              "Coffee, food & mountain moments."
            </p>
            <p className="text-xs text-[#FAF8F5]/60 leading-relaxed max-w-md font-light">
              A contemporary hospitality sanctuary above the clouds in Gangtok, Sikkim.
              Crafting high-altitude pour-overs, artisanal slow breakfasts, and unhurried Himalayan afternoons.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenEnquiry}
                className="text-xs tracking-[0.2em] uppercase text-[#C29B38] hover:text-[#FAF8F5] transition-colors border-b border-[#C29B38] pb-1 inline-flex items-center gap-1"
              >
                Reserve a Table <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-[11px] font-medium tracking-[0.25em] uppercase text-[#FAF8F5]/40 block">
              Navigation
            </span>
            <ul className="space-y-3 text-xs tracking-wider uppercase font-light">
              <li>
                <Link to="/" className="text-[#FAF8F5]/80 hover:text-[#C29B38] transition-colors">
                  01 · Home
                </Link>
              </li>
              <li>
                <Link to="/story" className="text-[#FAF8F5]/80 hover:text-[#C29B38] transition-colors">
                  02 · Our Story
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-[#FAF8F5]/80 hover:text-[#C29B38] transition-colors">
                  03 · Curated Menu
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-[#FAF8F5]/80 hover:text-[#C29B38] transition-colors">
                  04 · Photography Archive
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#FAF8F5]/80 hover:text-[#C29B38] transition-colors">
                  05 · Contact & Enquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Location & Hours */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-[11px] font-medium tracking-[0.25em] uppercase text-[#FAF8F5]/40 block">
              Location & Hours
            </span>
            <div className="space-y-2 text-xs text-[#FAF8F5]/75 font-light">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 text-[#C29B38] shrink-0" />
                <span>
                  {siteConfig.location.address}, {siteConfig.location.city}, {siteConfig.location.state} {siteConfig.location.pincode}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C29B38] shrink-0" />
                <a href={`tel:${siteConfig.location.phone}`} className="hover:text-white transition-colors">
                  {siteConfig.location.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C29B38] shrink-0" />
                <a href={`mailto:${siteConfig.location.email}`} className="hover:text-white transition-colors">
                  {siteConfig.location.email}
                </a>
              </div>
              <div className="flex items-start gap-2 pt-2 border-t border-[#FAF8F5]/10 mt-2">
                <Clock className="w-3.5 h-3.5 mt-0.5 text-[#C29B38] shrink-0" />
                <div>
                  <p>Mon – Fri: 8:00 AM – 9:00 PM</p>
                  <p>Sat – Sun: 7:30 AM – 10:00 PM</p>
                </div>
              </div>
            </div>

            {/* Social channels */}
            <div className="flex items-center gap-4 pt-3">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-xs uppercase tracking-wider text-[#FAF8F5]/60 hover:text-[#C29B38] transition-colors inline-flex items-center gap-1"
              >
                Instagram <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href={siteConfig.location.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs uppercase tracking-wider text-[#FAF8F5]/60 hover:text-[#C29B38] transition-colors inline-flex items-center gap-1"
              >
                WhatsApp <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href={siteConfig.location.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs uppercase tracking-wider text-[#FAF8F5]/60 hover:text-[#C29B38] transition-colors inline-flex items-center gap-1"
              >
                Google Maps <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FAF8F5]/40 font-light gap-4">
          <p>© 2026 Café Zéro. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <AmbientSoundToggle />
            <span>Gangtok · Sikkim · 5,800 ft</span>
            {onReplayLoader && (
              <button
                onClick={onReplayLoader}
                className="hover:text-[#FAF8F5] transition-colors inline-flex items-center gap-1 cursor-pointer text-[#FAF8F5]/60 hover:text-[#C29B38]"
                title="Replay Experience Intro"
              >
                <Sparkles className="w-3 h-3 text-[#C29B38]" /> Replay Intro
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

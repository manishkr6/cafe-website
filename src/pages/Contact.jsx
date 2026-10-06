import React, { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { siteConfig } from '../data/site.js';
import EnquiryForm from '../components/EnquiryForm.jsx';
import { MapPin, Phone, Mail, Instagram, MessageCircle, Clock, Compass, ShoppingBag } from 'lucide-react';

export default function Contact() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const hasSelectedItem = Boolean(location.state?.selectedItem || searchParams.get('item'));

  useEffect(() => {
    if (hasSelectedItem) {
      const el = document.getElementById('enquiry-form-section');
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    }
  }, [hasSelectedItem, location.state, searchParams]);

  return (
    <div className="w-full pt-28 pb-24 bg-[#FAF8F5] dark:bg-[#12100E] text-[#1C1917] dark:text-[#FAF8F5] transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-4 text-[#C29B38]">
            <span className="w-6 h-[1px] bg-current"></span>
            <span className="text-[11px] font-medium tracking-[0.25em] uppercase">Reservations &amp; Enquiries</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.12] mb-4 sm:mb-6">
            LET'S MEET OVER COFFEE.
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] dark:text-[#D6D3D1] font-light leading-relaxed">
            Whether booking an unhurried morning window table, planning a mountain workshop, or inquiring about our seasonal micro-lots, we would love to hear from you.
          </p>
        </div>

        {/* 2-Column Split: Contact Details & Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Details Column */}
          <div className="lg:col-span-5 space-y-10">
            {/* Address & Hours */}
            <div className="space-y-6 p-8 bg-[#F3EFEA] dark:bg-[#1A1715] border border-[#1C1917]/10 dark:border-[#FAF8F5]/10">
              <h3 className="font-serif text-2xl font-light text-[#1C1917] dark:text-[#FAF8F5]">
                Café Zéro · Gangtok
              </h3>
              
              <div className="space-y-4 text-xs sm:text-sm text-[#57534E] dark:text-[#D6D3D1] font-light">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C29B38] mt-0.5 shrink-0" />
                  <div>
                    <span className="block font-medium text-[#1C1917] dark:text-[#FAF8F5]">Location:</span>
                    <span>{siteConfig.location.address}, {siteConfig.location.city}, {siteConfig.location.state} {siteConfig.location.pincode}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#C29B38] shrink-0" />
                  <div>
                    <span className="block font-medium text-[#1C1917] dark:text-[#FAF8F5]">Telephone:</span>
                    <a href={`tel:${siteConfig.location.phone}`} className="hover:text-[#C29B38] transition-colors">
                      {siteConfig.location.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#C29B38] shrink-0" />
                  <div>
                    <span className="block font-medium text-[#1C1917] dark:text-[#FAF8F5]">Email:</span>
                    <a href={`mailto:${siteConfig.location.email}`} className="hover:text-[#C29B38] transition-colors">
                      {siteConfig.location.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Instagram className="w-4 h-4 text-[#C29B38] shrink-0" />
                  <div>
                    <span className="block font-medium text-[#1C1917] dark:text-[#FAF8F5]">Instagram:</span>
                    <a
                      href={siteConfig.socials.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#C29B38] transition-colors"
                    >
                      {siteConfig.socials.handle}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-[#1C1917]/10 dark:border-[#FAF8F5]/10">
                  <Clock className="w-4 h-4 text-[#C29B38] mt-0.5 shrink-0" />
                  <div>
                    <span className="block font-medium text-[#1C1917] dark:text-[#FAF8F5]">Service Hours:</span>
                    <p>Monday – Friday: 8:00 AM – 9:00 PM</p>
                    <p>Saturday – Sunday: 7:30 AM – 10:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp & Map Links */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#1C1917]/10 dark:border-[#FAF8F5]/10">
                <a
                  href={siteConfig.location.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase tracking-wider font-medium inline-flex items-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Message On WhatsApp
                </a>
                <a
                  href={siteConfig.location.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 border border-[#1C1917]/25 dark:border-[#FAF8F5]/25 hover:border-current text-xs uppercase tracking-wider font-medium inline-flex items-center gap-2 transition-colors"
                >
                  <Compass className="w-3.5 h-3.5" />
                  Open in Maps
                </a>
              </div>
            </div>

            {/* Note on Reservations */}
            <div className="text-xs text-[#78716C] dark:text-[#A8A29E] leading-relaxed p-4 border-l-2 border-[#C29B38]">
              <strong>Walk-in Policy:</strong> We always preserve walk-in capacity for passing travelers. For larger groups (&gt; 6 guests) or private events, reservations made 24 hours in advance are kindly recommended.
            </div>
          </div>

          {/* Form Column */}
          <div
            id="enquiry-form-section"
            className="lg:col-span-7 bg-[#FAF8F5] dark:bg-[#1A1715] p-8 sm:p-10 border border-[#1C1917]/10 dark:border-[#FAF8F5]/10 shadow-sm scroll-mt-28"
          >
            <div className="mb-6">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#C29B38] block mb-1">
                {hasSelectedItem ? 'Menu Order & Dispatch' : 'Direct Dispatch'}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#1C1917] dark:text-[#FAF8F5]">
                {hasSelectedItem ? 'Order Details & Message' : 'Send an Enquiry'}
              </h3>
              {hasSelectedItem && (
                <p className="text-xs text-[#57534E] dark:text-[#D6D3D1] mt-1 font-light">
                  Your selected menu item has been attached below. Fill in your message and details to submit.
                </p>
              )}
            </div>

            <EnquiryForm />
          </div>
        </div>

        {/* Embedded Map Section */}
        <div className="mt-20">
          <div className="h-[400px] w-full border border-[#1C1917]/10 dark:border-[#FAF8F5]/10 shadow-lg overflow-hidden">
            <iframe
              title="Café Zéro Location Map"
              src={siteConfig.location.embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'contrast(1.05)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

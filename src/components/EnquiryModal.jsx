import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import EnquiryForm from './EnquiryForm.jsx';

export default function EnquiryModal({ isOpen, onClose, initialType = 'Table Reservation' }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] dark:bg-[#1A1715] border border-[#1C1917]/10 dark:border-[#FAF8F5]/15 p-6 sm:p-10 shadow-2xl z-10 overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 p-2 text-[#78716C] hover:text-[#1C1917] dark:hover:text-[#FAF8F5] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-4 h-[1px] bg-[#C29B38]"></span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#78716C] dark:text-[#A8A29E]">
              Ridge View Arcade · Gangtok
            </span>
          </div>
          <h3 id="modal-title" className="font-serif text-2xl sm:text-3xl font-light text-[#1C1917] dark:text-[#FAF8F5]">
            Make an Enquiry / Reservation
          </h3>
          <p className="text-xs text-[#57534E] dark:text-[#D6D3D1] mt-1 font-light">
            We reserve a limited number of window tables for morning pour-overs, private tastings, and small gatherings.
          </p>
        </div>

        <EnquiryForm initialType={initialType} onSuccess={() => {}} />
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { submitEnquiry } from '../lib/api.js';
import Button from './Button.jsx';
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send,
  MessageCircle,
  ShieldCheck,
  Coffee,
  X
} from 'lucide-react';
import { siteConfig } from '../data/site.js';

export default function EnquiryForm({ onSuccess, initialType = 'General Enquiry', initialItem = null }) {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Detect selected item from props, router state, or query param
  const detectedItem = initialItem || location.state?.selectedItem || (() => {
    const itemName = searchParams.get('item');
    if (itemName) {
      return {
        name: itemName,
        price: searchParams.get('price') || '',
        category: searchParams.get('category') || 'Menu Item'
      };
    }
    return null;
  })();

  const [selectedItem, setSelectedItem] = useState(detectedItem);

  // Sync selectedItem if route state or query params change
  useEffect(() => {
    const currentItem = initialItem || location.state?.selectedItem || (() => {
      const itemName = searchParams.get('item');
      if (itemName) {
        return {
          name: itemName,
          price: searchParams.get('price') || '',
          category: searchParams.get('category') || 'Menu Item'
        };
      }
      return null;
    })();

    if (currentItem) {
      setSelectedItem(currentItem);
    }
  }, [location.state, location.search, searchParams, initialItem]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    enquiryType: detectedItem ? 'Menu Order / Pre-order' : initialType,
    message: detectedItem
      ? `Hi Café Zéro! I would like to order: ${detectedItem.name}${detectedItem.price ? ` (₹${detectedItem.price})` : ''}. Notes / quantity / reservation time: `
      : ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '', warning: null });

  // Update form if selectedItem changes
  useEffect(() => {
    if (selectedItem) {
      setFormData((prev) => ({
        ...prev,
        enquiryType: 'Menu Order / Pre-order',
        message: prev.message && prev.message.includes(selectedItem.name)
          ? prev.message
          : `Hi Café Zéro! I would like to order: ${selectedItem.name}${selectedItem.price ? ` (₹${selectedItem.price})` : ''}. Notes / quantity / reservation time: `
      }));
    }
  }, [selectedItem]);

  const enquiryTypes = [
    'Menu Order / Pre-order',
    'Table Reservation',
    'General Enquiry',
    'Private Event',
    'Collaboration',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status.type === 'error') {
      setStatus({ type: null, message: '', warning: null });
    }
  };


  const handleClearItem = () => {
    setSelectedItem(null);
    setFormData((prev) => ({
      ...prev,
      enquiryType: 'General Enquiry',
      message: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '', warning: null });

    // Client-side quick validation
    if (!formData.name.trim()) {
      setStatus({ type: 'error', message: 'Please enter your name.' });
      setLoading(false);
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      setLoading(false);
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      setStatus({ type: 'error', message: 'Please provide order or booking details (minimum 5 characters).' });
      setLoading(false);
      return;
    }

    try {
      const submissionData = {
        ...formData,
        orderedItem: selectedItem ? `${selectedItem.name} (₹${selectedItem.price || ''})` : null
      };

      const res = await submitEnquiry(submissionData);
      setStatus({
        type: 'success',
        message: res.message || 'Thank you! Your order & enquiry has been dispatched directly via Web3Forms.',
        warning: res.warning
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        enquiryType: selectedItem ? 'Menu Order / Pre-order' : 'General Enquiry',
        message: ''
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message || 'Failed to dispatch via Web3Forms. Please retry or message us on WhatsApp.'
      });
    } finally {
      setLoading(false);
    }
  };

  const generateWhatsAppUrl = () => {
    const itemPrefix = selectedItem ? `[ORDER: ${selectedItem.name} (₹${selectedItem.price})] ` : '';
    const text = `Hi Café Zéro! My name is ${formData.name || 'Guest'}. ${itemPrefix}${formData.message || 'I would like to enquire about table reservations.'}`;
    return `https://wa.me/919832000000?text=${encodeURIComponent(text)}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Selected Menu Item Highlight Banner */}
      {selectedItem && (
        <div className="p-4 bg-[#C29B38]/10 border-2 border-[#C29B38]/40 rounded-xs flex items-center justify-between gap-4 animate-fadeIn">
          <div className="flex items-center gap-3.5 min-w-0">
            {selectedItem.image ? (
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-14 h-14 object-cover rounded-xs border border-[#C29B38]/30 shrink-0"
              />
            ) : (
              <div className="w-12 h-12 bg-[#C29B38]/20 flex items-center justify-center shrink-0 rounded-xs">
                <Coffee className="w-6 h-6 text-[#C29B38]" />
              </div>
            )}
            <div className="min-w-0">
              <span className="text-[10px] font-mono tracking-wider uppercase text-[#C29B38] font-bold block truncate">
                SELECTED MENU ITEM FOR ORDER
              </span>
              <h4 className="font-serif text-lg sm:text-xl font-normal text-[#1C1917] dark:text-[#FAF8F5] leading-snug truncate">
                {selectedItem.name}
                {selectedItem.price && (
                  <span className="font-mono text-sm sm:text-base text-[#C29B38] font-bold ml-2">
                    ₹{selectedItem.price}
                  </span>
                )}
              </h4>
              <p className="text-[11px] text-[#78716C] dark:text-[#A8A29E] truncate">
                Ready to message our baristas with your request
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClearItem}
            className="p-1 text-[#78716C] hover:text-rose-500 transition-colors shrink-0 cursor-pointer"
            title="Clear selected item"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Success Notification */}
      {status.type === 'success' && (
        <div className="p-5 border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200 rounded-sm flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-serif text-lg font-normal">{status.message}</p>
            <p className="text-xs text-emerald-700 dark:text-emerald-300/80">
              Delivered directly to our email via Web3Forms. Our team at Gangtok will confirm your order and timing promptly.
            </p>
          </div>
        </div>
      )}

      {/* Error Notification */}
      {status.type === 'error' && (
        <div className="p-4 border border-rose-500/30 bg-rose-50/50 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200 rounded-sm flex items-start gap-3 text-xs">
          <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">{status.message}</p>
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-[#C29B38] underline font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5" /> Send directly via WhatsApp instead
            </a>
          </div>
        </div>
      )}

      {/* Form Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-xs font-medium tracking-[0.15em] uppercase text-[#78716C] dark:text-[#A8A29E] mb-2">
            Your Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Maya Sharma"
            className="w-full bg-transparent border-b border-[#1C1917]/20 dark:border-[#FAF8F5]/20 py-2.5 px-0 text-sm focus:border-[#C29B38] dark:focus:border-[#C29B38] focus:outline-none transition-colors text-[#1C1917] dark:text-[#FAF8F5] placeholder-[#A8A29E]"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-xs font-medium tracking-[0.15em] uppercase text-[#78716C] dark:text-[#A8A29E] mb-2">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="maya@example.com"
            className="w-full bg-transparent border-b border-[#1C1917]/20 dark:border-[#FAF8F5]/20 py-2.5 px-0 text-sm focus:border-[#C29B38] dark:focus:border-[#C29B38] focus:outline-none transition-colors text-[#1C1917] dark:text-[#FAF8F5] placeholder-[#A8A29E]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-xs font-medium tracking-[0.15em] uppercase text-[#78716C] dark:text-[#A8A29E] mb-2">
            Phone / WhatsApp <span className="text-[10px] lowercase text-[#A8A29E]">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98320 00000"
            className="w-full bg-transparent border-b border-[#1C1917]/20 dark:border-[#FAF8F5]/20 py-2.5 px-0 text-sm focus:border-[#C29B38] dark:focus:border-[#C29B38] focus:outline-none transition-colors text-[#1C1917] dark:text-[#FAF8F5] placeholder-[#A8A29E]"
          />
        </div>

        {/* Enquiry Type */}
        <div>
          <label htmlFor="enquiryType" className="block text-xs font-medium tracking-[0.15em] uppercase text-[#78716C] dark:text-[#A8A29E] mb-2">
            Enquiry Type
          </label>
          <select
            id="enquiryType"
            name="enquiryType"
            value={formData.enquiryType}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-[#1C1917]/20 dark:border-[#FAF8F5]/20 py-2.5 px-0 text-sm focus:border-[#C29B38] dark:focus:border-[#C29B38] focus:outline-none transition-colors text-[#1C1917] dark:text-[#FAF8F5] cursor-pointer"
          >
            {enquiryTypes.map((type) => (
              <option key={type} value={type} className="bg-[#FAF8F5] dark:bg-[#1C1917] text-[#1C1917] dark:text-[#FAF8F5]">
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-xs font-medium tracking-[0.15em] uppercase text-[#78716C] dark:text-[#A8A29E] mb-2">
          {selectedItem ? 'Order Details & Notes' : 'Message & Details'} <span className="text-rose-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="For menu orders: specify quantity, milk preference, dine-in or pickup timing. For table bookings: date, time, and number of guests."
          className="w-full bg-transparent border-b border-[#1C1917]/20 dark:border-[#FAF8F5]/20 py-2.5 px-0 text-sm focus:border-[#C29B38] dark:focus:border-[#C29B38] focus:outline-none transition-colors text-[#1C1917] dark:text-[#FAF8F5] placeholder-[#A8A29E] resize-none"
        ></textarea>
      </div>

      {/* Action Row */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-[#78716C] dark:text-[#A8A29E]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C29B38]" />
          <span>Serverless direct dispatch via Web3Forms</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={generateWhatsAppUrl()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-[#1C1917]/15 dark:border-[#FAF8F5]/15 text-xs uppercase tracking-wider hover:border-emerald-500 hover:text-emerald-600 transition-colors"
            title="Chat directly on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
            <span className="hidden xs:inline">Order On WhatsApp</span>
          </a>

          <Button
            type="submit"
            disabled={loading}
            variant="primary"
            icon={loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
          >
            {loading ? 'SENDING...' : selectedItem ? 'SEND ORDER MESSAGE' : 'SEND ENQUIRY'}
          </Button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-2 border-t border-[#1C1917]/10 dark:border-[#FAF8F5]/10 flex items-center justify-between text-[11px] text-[#78716C] dark:text-[#A8A29E]">
        <span>Zero backend database required</span>
        <span>Delivered securely via Web3Forms</span>
      </div>
    </form>
  );
}

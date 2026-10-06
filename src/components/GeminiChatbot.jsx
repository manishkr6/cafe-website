import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  MessageCircle,
  X,
  Send,
  Coffee,
  Compass,
  ArrowRight,
  ChevronRight,
  Clock,
  Calendar,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { menuItems } from '../data/menu.js';
import { siteConfig } from '../data/site.js';

const QUICK_INQUIRIES = [
  {
    icon: Coffee,
    title: 'Match My Coffee',
    desc: 'Smooth floral notes',
    query: 'What coffee do you recommend for someone who loves smooth, floral notes?'
  },
  {
    icon: Clock,
    title: 'Terrace & Sunset',
    desc: 'Golden hour view',
    query: 'What is the best time to visit for the Kanchenjunga mountain view?'
  },
  {
    icon: Calendar,
    title: 'Reserve a Table',
    desc: 'Window or terrace seat',
    query: 'How do I book a quiet morning window table for pour-overs?'
  },
  {
    icon: Compass,
    title: '5,800 Ft Brew Science',
    desc: 'Water boils at 94°C here',
    query: 'How does brewing at 5,800 ft altitude change your extraction process?'
  }
];

const INITIAL_MESSAGES = [
  {
    id: 'init-1',
    role: 'model',
    text: "Tashi Delek! Welcome to Café Zéro. I am your barista companion and mountain host at 5,800 ft elevation. Whether you are curious about our calibrated single-origin pour-overs, planning a slow morning breakfast, or reserving a ridge terrace seat, how may I assist you today?",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    recommendedItem: menuItems.find((m) => m.id === 'c-2')
  },
];

export default function GeminiChatbot() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of thread on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, loading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  // Quick navigation to order an item
  const handleOrderItem = (item) => {
    setIsOpen(false);
    navigate(
      `/contact?item=${encodeURIComponent(item.name)}&price=${encodeURIComponent(item.price)}&category=${encodeURIComponent(item.category || '')}`,
      { state: { selectedItem: item } }
    );
  };

  // Quick navigation to table reservations
  const handleReserveTable = () => {
    setIsOpen(false);
    navigate('/contact');
  };

  // Local Himalayan Knowledge Responder for authentic, instant answers
  const generateHostResponse = (query) => {
    const q = query.toLowerCase();

    if (q.includes('pour') || q.includes('v60') || q.includes('floral') || q.includes('black') || q.includes('single origin')) {
      const item = menuItems.find((m) => m.id === 'c-2') || menuItems[1];
      return {
        text: `For a clean, articulate cup, our **Himalayan Pour-Over (V60)** is unmissable. We extract single-origin Meghalaya washed beans at 94°C—the exact boiling point of mountain spring water at 5,800 ft. You will taste bright elderflower, stone fruit, and a lingering black tea finish.`,
        recommendedItem: item
      };
    }

    if (q.includes('cardamom') || q.includes('spice')) {
      const item = menuItems.find((m) => m.id === 'c-5') || menuItems[4];
      return {
        text: `Our **Cardamom Spiced Cappuccino** features crushed smoky black cardamom pods harvested directly in Dzongu (North Sikkim), folded into velvety espresso microfoam.`,
        recommendedItem: item
      };
    }

    if (q.includes('milk') || q.includes('latte') || q.includes('flat white') || q.includes('cappuccino') || q.includes('cortado')) {
      const item = menuItems.find((m) => m.id === 'c-3') || menuItems[2];
      return {
        text: `Our **Flat White** is crafted with a tight ristretto double shot cut with micro-foamed organic mountain milk (or oat milk upon request). Rich dark chocolate melting into roasted hazelnut.`,
        recommendedItem: item
      };
    }

    if (q.includes('cold') || q.includes('ice') || q.includes('summer') || q.includes('chilled')) {
      const item = menuItems.find((m) => m.id === 'c-6') || menuItems[5];
      return {
        text: `Our signature **Zéro 16-Hour Cold Brew** is steeped slowly in chilled Sikkim spring water for sixteen hours. Naturally sweet with zero bitterness, served over clear artisan rock ice.`,
        recommendedItem: item
      };
    }

    if (q.includes('breakfast') || q.includes('food') || q.includes('eat') || q.includes('toast') || q.includes('brioche') || q.includes('plate') || q.includes('hungry')) {
      const item = menuItems.find((m) => m.id === 'b-1') || menuItems.find((m) => m.category === 'breakfast') || menuItems[8];
      return {
        text: `From our morning oven, we serve the **Sikkim Cloud Brioche** with whipped Himalayan yak butter, cardamom honey, and organic citrus marmalade. It pairs sublimely with any manual pour-over.`,
        recommendedItem: item
      };
    }

    if (q.includes('view') || q.includes('sunset') || q.includes('sunrise') || q.includes('mountain') || q.includes('kanchenjunga') || q.includes('seat') || q.includes('window') || q.includes('terrace')) {
      return {
        text: `The best mountain vistas are during morning clarity (7:30 AM – 9:30 AM) when the snow peaks of Mount Kanchenjunga emerge crisp and untamed. For romantic golden hour hues, arrive between 4:30 PM and 5:45 PM on our ridge terrace. Window tables 03 and 04 offer the most unhurried vantage.`,
        hasReservationAction: true
      };
    }

    if (q.includes('altitude') || q.includes('5,800') || q.includes('science') || q.includes('physics') || q.includes('temp') || q.includes('boil')) {
      return {
        text: `At 5,800 ft (1,768 m) in Gangtok, reduced atmospheric pressure drops water boiling point from 100°C to ~93.8°C. Standard sea-level recipes under-extract here. Our baristas compensate with a finer micro-grind, 9.2 bar extraction pressure, and slightly longer contact time for maximum sweetness.`
      };
    }

    if (q.includes('hour') || q.includes('time') || q.includes('open') || q.includes('close') || q.includes('where') || q.includes('address') || q.includes('locate') || q.includes('parking')) {
      return {
        text: `We are located on the **4th Floor of Ridge View Arcade, above MG Marg in Gangtok, Sikkim**. Open Monday–Friday from 8:00 AM to 9:00 PM, and Saturday–Sunday from 7:30 AM to 10:00 PM. Walk-ins are always welcomed.`
      };
    }

    return {
      text: `At Café Zéro, our goal is to offer a serene sanctuary above the Gangtok valley. You are welcome to browse our Curated Menu, order ahead for table pickup, or reserve an unhurried window seat. If you have custom dietary preferences, our baristas gladly prepare oat milk and decaf Himalayan roasts.`
    };
  };

  const handleSend = async (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text || loading) return;

    const userMessage = {
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInputValue('');
    setLoading(true);

    try {
      // Send conversation history to server-side route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({ role: m.role === 'user' ? 'user' : 'model', text: m.text })),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.text) {
          const matchedItem = menuItems.find((item) =>
            data.text.toLowerCase().includes(item.name.toLowerCase())
          );
          setMessages((prev) => [
            ...prev,
            {
              role: 'model',
              text: data.text,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              recommendedItem: matchedItem
            }
          ]);
          setLoading(false);
          return;
        }
      }

      // If server has no key or returned 503, use local knowledge engine
      const fallback = generateHostResponse(text);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: 'model',
            text: fallback.text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            recommendedItem: fallback.recommendedItem,
            hasReservationAction: fallback.hasReservationAction
          }
        ]);
        setLoading(false);
      }, 400);
    } catch {
      const fallback = generateHostResponse(text);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: 'model',
            text: fallback.text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            recommendedItem: fallback.recommendedItem,
            hasReservationAction: fallback.hasReservationAction
          }
        ]);
        setLoading(false);
      }, 350);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right) - Bespoke Mountain Hospitality Desk */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open Café Zéro Barista & Guest Desk"
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-2.5 bg-[#FAF8F5]/95 dark:bg-[#161311]/95 text-[#1C1917] dark:text-[#FAF8F5] backdrop-blur-md border border-[#1C1917]/15 dark:border-[#FAF8F5]/15 shadow-xl hover:border-[#C29B38] dark:hover:border-[#C29B38] hover:shadow-2xl transition-all duration-300 cursor-pointer group"
        >
          {/* Active status & emblem */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-500 shadow-xs" />
            <Coffee className="w-4 h-4 text-[#C29B38] group-hover:scale-110 transition-transform" />
          </div>

          {/* Typography */}
          <div className="flex flex-col text-left">
            <span className="text-xs font-serif font-light tracking-[0.14em] uppercase text-[#1C1917] dark:text-[#FAF8F5]">
              Ask Our Barista
            </span>
            <span className="text-[9px] tracking-widest uppercase text-[#78716C] dark:text-[#A8A29E] font-mono -mt-0.5">
              5,800 ft · Guest Desk
            </span>
          </div>

          {/* Divider & Arrow */}
          <span className="w-[1px] h-3.5 bg-[#1C1917]/15 dark:border-[#FAF8F5]/15 ml-0.5" />
          <span className="text-[10px] text-[#C29B38] font-mono font-medium tracking-wider uppercase group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
            Desk <ChevronRight className="w-3 h-3" />
          </span>
        </button>
      )}

      {/* Slide-Up Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Café Zéro Barista & Guest Desk"
          className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col bg-[#FAF8F5] dark:bg-[#161311] border border-[#1C1917]/15 dark:border-[#FAF8F5]/15 shadow-2xl transition-all duration-300 overflow-hidden ${
            isExpanded
              ? 'w-[calc(100vw-32px)] sm:w-[680px] h-[85vh] max-w-2xl'
              : 'w-[calc(100vw-32px)] sm:w-[420px] md:w-[450px] h-[580px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#1C1815] text-[#FAF8F5] border-b border-[#FAF8F5]/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xs bg-[#C29B38]/20 border border-[#C29B38]/40 flex items-center justify-center text-[#C29B38] shrink-0">
                <Coffee className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-sm font-light tracking-[0.08em] text-[#FAF8F5]">
                    CAFÉ ZÉRO · GUEST DESK
                  </h3>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-[10px] text-[#FAF8F5]/60 font-mono tracking-wider -mt-0.5">
                  Live from Gangtok Ridge · 5,800 ft
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5">
              <a
                href={siteConfig.location.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                title="Message Barista on WhatsApp"
                className="hidden xs:inline-flex items-center gap-1 text-[10px] tracking-wider uppercase text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 px-2 py-1 transition-colors"
              >
                <MessageCircle className="w-3 h-3" />
                <span>WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Collapse view' : 'Expand view'}
                className="hidden sm:inline-flex p-1.5 text-[#FAF8F5]/70 hover:text-white transition-colors cursor-pointer"
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close Guest Desk"
                className="p-1.5 text-[#FAF8F5]/70 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Inquiries (Shown on fresh desk) */}
          {messages.length <= 2 && (
            <div className="p-3.5 bg-[#F3EFEA] dark:bg-[#1E1916] border-b border-[#1C1917]/10 dark:border-[#FAF8F5]/10 shrink-0">
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#78716C] dark:text-[#A8A29E] block mb-2">
                Quick Inquiries · Tap to Ask
              </span>
              <div className="grid grid-cols-2 gap-2">
                {QUICK_INQUIRIES.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSend(item.query)}
                      className="text-left p-2.5 bg-white/70 dark:bg-[#14110F]/70 border border-[#1C1917]/10 dark:border-[#FAF8F5]/10 hover:border-[#C29B38] transition-all rounded-xs group cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5 text-[#C29B38] mb-0.5">
                        <Icon className="w-3 h-3" />
                        <span className="text-[10px] font-medium tracking-wide text-[#1C1917] dark:text-[#FAF8F5] truncate">
                          {item.title}
                        </span>
                      </div>
                      <p className="text-[9px] text-[#78716C] dark:text-[#A8A29E] line-clamp-1 font-light">
                        {item.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 text-xs font-light">
            {messages.map((msg, idx) => {
              const isGuest = msg.role === 'user';
              return (
                <div
                  key={msg.id || idx}
                  className={`flex flex-col ${isGuest ? 'items-end' : 'items-start'} space-y-1.5 animate-fadeIn`}
                >
                  <div className="flex items-center gap-2 px-1 text-[9px] text-[#78716C] dark:text-[#A8A29E] font-mono uppercase tracking-wider">
                    <span>{isGuest ? 'You' : 'Barista & Mountain Host'}</span>
                    <span>·</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  {/* Message Bubble / Editorial Card */}
                  <div
                    className={`max-w-[90%] sm:max-w-[85%] rounded-xs p-4 leading-relaxed ${
                      isGuest
                        ? 'bg-[#1C1815] text-[#FAF8F5] dark:bg-[#FAF8F5] dark:text-[#1C1815] shadow-xs'
                        : 'bg-white dark:bg-[#1E1916] text-[#1C1917] dark:text-[#FAF8F5] border border-[#1C1917]/10 dark:border-[#FAF8F5]/10 shadow-sm'
                    }`}
                  >
                    <div className="whitespace-pre-line text-xs sm:text-[13px] font-light leading-relaxed">
                      {msg.text}
                    </div>

                    {/* Rich Interactive Action: Embedded Menu Item Card */}
                    {msg.recommendedItem && (
                      <div className="mt-3.5 pt-3 border-t border-[#1C1917]/10 dark:border-[#FAF8F5]/10 flex items-center justify-between gap-3 bg-[#FAF8F5] dark:bg-[#14110F] p-2.5 rounded-xs">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={msg.recommendedItem.image}
                            alt={msg.recommendedItem.name}
                            className="w-10 h-10 object-cover rounded-xs border border-[#C29B38]/30 shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="font-serif text-xs font-normal text-[#1C1917] dark:text-[#FAF8F5] block truncate">
                              {msg.recommendedItem.name}
                            </span>
                            <span className="text-[10px] font-mono text-[#C29B38] font-bold">
                              ₹{msg.recommendedItem.price} · {msg.recommendedItem.altitude}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleOrderItem(msg.recommendedItem)}
                          className="px-2.5 py-1.5 bg-[#C29B38] hover:bg-[#d4af37] text-[#1C1815] text-[10px] tracking-wider uppercase font-medium whitespace-nowrap transition-colors flex items-center gap-1 rounded-xs cursor-pointer shrink-0"
                        >
                          <span>Order &amp; Message</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    )}

                    {/* Table Reservation Action */}
                    {msg.hasReservationAction && (
                      <div className="mt-3 pt-3 border-t border-[#1C1917]/10 dark:border-[#FAF8F5]/10 flex items-center justify-between gap-2">
                        <span className="text-[10px] text-[#78716C] dark:text-[#A8A29E]">
                          Table reservations accepted online
                        </span>
                        <button
                          type="button"
                          onClick={handleReserveTable}
                          className="px-3 py-1 border border-[#C29B38] text-[#C29B38] hover:bg-[#C29B38] hover:text-[#1C1815] text-[10px] uppercase tracking-wider font-medium transition-colors rounded-xs cursor-pointer"
                        >
                          Reserve a Table
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* In-service typing / thought indicator */}
            {loading && (
              <div className="flex items-center gap-2 text-xs text-[#78716C] dark:text-[#A8A29E] py-1 font-light italic">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C29B38] animate-ping" />
                <span>Our barista is checking tasting notes &amp; details...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Bar */}
          <div className="p-3.5 bg-white dark:bg-[#161311] border-t border-[#1C1917]/10 dark:border-[#FAF8F5]/10 shrink-0">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about roasts, sunrise views, table booking..."
                className="flex-1 bg-[#FAF8F5] dark:bg-[#1E1916] border border-[#1C1917]/15 dark:border-[#FAF8F5]/15 px-3 py-2 text-xs focus:outline-none focus:border-[#C29B38] text-[#1C1917] dark:text-[#FAF8F5] rounded-xs"
              />

              <button
                type="button"
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || loading}
                aria-label="Send message"
                className="p-2.5 bg-[#1C1815] dark:bg-[#FAF8F5] text-[#FAF8F5] dark:text-[#1C1815] hover:bg-[#C29B38] dark:hover:bg-[#C29B38] dark:hover:text-[#FAF8F5] disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-xs cursor-pointer shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-between text-[9px] text-[#78716C] dark:text-[#A8A29E] mt-2 px-1 font-mono">
              <span>Press Enter to send</span>
              <span>Ridge View Arcade · Gangtok, Sikkim</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

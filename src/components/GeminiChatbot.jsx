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
  Maximize2,
  Sparkles,
  Bot
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
    text: "Tashi Delek! Welcome to Café Zéro. I am your AI Barista and mountain concierge at 5,800 ft elevation. Whether you are curious about our calibrated single-origin pour-overs, planning a slow morning breakfast, or reserving a ridge terrace seat, how may I assist you today?",
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
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
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
      
      // Simulate network delay
      setTimeout(() => {
        setLoading(false);
        const messageId = 'msg-' + Date.now();
        
        // Add empty message placeholder
        setMessages((prev) => [
          ...prev,
          {
            id: messageId,
            role: 'model',
            text: '',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            recommendedItem: null,
            hasReservationAction: false,
            isTyping: true
          }
        ]);
        
        // Simulate streaming chunks
        const fullText = fallback.text;
        let currentIndex = 0;
        
        const streamInterval = setInterval(() => {
          // Add 2-4 characters per tick to simulate natural typing
          currentIndex += Math.floor(Math.random() * 3) + 2;
          const currentText = fullText.slice(0, currentIndex);
          
          setMessages((prev) => 
            prev.map((m) => 
              m.id === messageId ? { ...m, text: currentText } : m
            )
          );
          
          if (currentIndex >= fullText.length) {
            clearInterval(streamInterval);
            // Append interactive widgets once typing finishes
            setMessages((prev) => 
              prev.map((m) => 
                m.id === messageId ? { 
                  ...m, 
                  text: fullText, 
                  recommendedItem: fallback.recommendedItem,
                  hasReservationAction: fallback.hasReservationAction,
                  isTyping: false
                } : m
              )
            );
          }
        }, 15);
      }, 500);
    } catch {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderFormattedText = (text, isTyping) => {
    if (!text) return isTyping ? <span className="inline-block w-1.5 h-3.5 ml-1 bg-[#C29B38] animate-pulse align-middle" /> : null;
    
    // Split by markdown bold syntax
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return (
      <>
        {parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-semibold text-[#C29B38]">{part.slice(2, -2)}</strong>;
          }
          // Handle unfinished bold tags during streaming
          if (part.startsWith('**') && isTyping && i === parts.length - 1) {
             return <strong key={i} className="font-semibold text-[#C29B38]">{part.slice(2)}</strong>;
          }
          return <span key={i}>{part}</span>;
        })}
        {isTyping && <span className="inline-block w-1.5 h-3.5 ml-1 bg-[#C29B38] animate-pulse align-middle" />}
      </>
    );
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right) - Circular AI Barista Widget */}
      {!isOpen && (
        <div className="fixed bottom-5 right-4 sm:bottom-12 sm:right-10 z-40">
          {/* Main Circular AI Floating Button */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open AI Barista Chat"
            className="relative group w-13 h-13 sm:w-16 sm:h-16 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none"
          >
            {/* Ambient Breathing AI Halo */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#C29B38] via-amber-400 to-[#C29B38] opacity-60 blur-sm group-hover:opacity-100 group-hover:blur-md transition-all duration-500 animate-pulse" />

            {/* Circular Avatar Container with Border Glow */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#C29B38] shadow-2xl bg-[#1C1815] flex items-center justify-center">
              <img
                src="/ai-avatar.jpg"
                alt="Café Zéro AI Barista"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/20" />
            </div>

            {/* Live Green Status Indicator */}
            <span className="absolute top-0.5 left-0.5 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#FAF8F5] dark:border-[#161311]" />
            </span>

            {/* Sparkling AI Badge Pill */}
            <span className="absolute bottom-0 right-0 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-[#C29B38] to-[#8C6B1B] text-white text-[9px] font-bold font-mono tracking-wider flex items-center gap-0.5 shadow-md border border-[#FAF8F5]/40 group-hover:scale-105 transition-transform">
              <Sparkles className="w-2.5 h-2.5 fill-current" />
              <span>AI</span>
            </span>
          </button>
        </div>
      )}

      {/* Slide-Up Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Café Zéro AI Barista & Guest Desk"
          className={`fixed inset-x-3 bottom-3 sm:inset-auto sm:bottom-10 sm:right-10 z-50 flex flex-col bg-[#FAF8F5] dark:bg-[#161311] border border-[#1C1917]/15 dark:border-[#FAF8F5]/15 shadow-2xl transition-all duration-300 overflow-hidden ${
            isExpanded
              ? 'w-auto sm:w-[680px] h-[85dvh] max-w-2xl'
              : 'w-auto sm:w-[420px] md:w-[450px] h-[82dvh] sm:h-[580px] max-h-[88dvh]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[#1C1815] text-[#FAF8F5] border-b border-[#FAF8F5]/10 shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-[#C29B38] shadow-sm shrink-0">
                <img
                  src="/ai-avatar.jpg"
                  alt="AI Barista"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-[#1C1815]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h3 className="font-serif text-xs sm:text-sm font-light tracking-[0.08em] text-[#FAF8F5] truncate">
                    CAFÉ ZÉRO · AI BARISTA
                  </h3>
                  <span className="px-1.5 py-0.2 bg-[#C29B38]/30 border border-[#C29B38]/50 text-[#FAF8F5] text-[9px] font-mono tracking-wider uppercase rounded-full flex items-center gap-1 font-semibold shrink-0">
                    <Sparkles className="w-2.5 h-2.5 text-[#C29B38]" /> AI
                  </span>
                </div>
                <p className="text-[9px] sm:text-[10px] text-[#FAF8F5]/60 font-mono tracking-wider -mt-0.5 truncate">
                  Live from Gangtok Ridge · 5,800 ft
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
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



          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5 space-y-5 text-xs font-light">
            {messages.map((msg, idx) => {
              const isGuest = msg.role === 'user';
              return (
                <React.Fragment key={msg.id || idx}>
                  <div
                    className={`flex flex-col ${isGuest ? 'items-end' : 'items-start'} space-y-1.5 animate-fadeIn`}
                  >
                  <div className="flex items-center gap-2 px-1 text-[9px] text-[#78716C] dark:text-[#A8A29E] font-mono uppercase tracking-wider">
                    {!isGuest ? (
                      <span className="flex items-center gap-1.5">
                        <img
                          src="/ai-avatar.jpg"
                          alt="AI Barista"
                          className="w-4 h-4 rounded-full object-cover border border-[#C29B38]/60 inline-block"
                        />
                        <span className="font-medium text-[#C29B38] dark:text-[#E5C158]">AI Barista</span>
                      </span>
                    ) : (
                      <span>You</span>
                    )}
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
                      {renderFormattedText(msg.text, msg.isTyping)}
                    </div>

                    {/* Rich Interactive Action: Embedded Menu Item Card */}
                    {msg.recommendedItem && (
                      <div className="mt-3.5 pt-3 border-t border-[#1C1917]/10 dark:border-[#FAF8F5]/10 flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-2.5 bg-[#FAF8F5] dark:bg-[#14110F] p-2.5 rounded-xs">
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
                          className="px-2.5 py-1.5 bg-[#C29B38] hover:bg-[#d4af37] text-[#1C1815] text-[10px] tracking-wider uppercase font-medium whitespace-nowrap transition-colors flex items-center justify-center gap-1 rounded-xs cursor-pointer shrink-0"
                        >
                          <span>Order &amp; Message</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    )}

                    {/* Table Reservation Action */}
                    {msg.hasReservationAction && (
                      <div className="mt-3 pt-3 border-t border-[#1C1917]/10 dark:border-[#FAF8F5]/10 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2">
                        <span className="text-[10px] text-[#78716C] dark:text-[#A8A29E]">
                          Table reservations accepted online
                        </span>
                        <button
                          type="button"
                          onClick={handleReserveTable}
                          className="w-full xs:w-auto px-3 py-1 border border-[#C29B38] text-[#C29B38] hover:bg-[#C29B38] hover:text-[#1C1815] text-[10px] uppercase tracking-wider font-medium transition-colors rounded-xs cursor-pointer text-center"
                        >
                          Reserve a Table
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Inline Quick Inquiries (Shown on fresh desk after first AI greeting) */}
                {idx === 0 && messages.length <= 2 && (
                  <div className="pt-2 animate-fadeIn w-full max-w-[95%] sm:max-w-[90%]">
                    <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#78716C] dark:text-[#A8A29E] block mb-2 px-1">
                      Quick Inquiries · Tap to Ask
                    </span>
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                      {QUICK_INQUIRIES.map((item, i) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleSend(item.query)}
                            className="text-left p-2.5 bg-white/50 dark:bg-[#1E1916]/50 border border-[#1C1917]/10 dark:border-[#FAF8F5]/10 hover:border-[#C29B38] transition-all rounded-xs group cursor-pointer"
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
              </React.Fragment>
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

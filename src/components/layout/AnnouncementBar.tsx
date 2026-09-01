import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ShieldCheck, Truck, Copy, Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

const ANNOUNCEMENTS = [
  {
    icon: Truck,
    text: '🇺🇸 & 🇬🇧 FAST PRIORITY DISPATCH: Free express shipping on orders over $50 / £40!',
    badge: 'FREE DELIVERY',
  },
  {
    icon: Sparkles,
    text: 'VIP LAUNCH OFFER: Use code REHMAN20 at checkout for 20% OFF your luxury haul!',
    code: 'REHMAN20',
    badge: 'LIMITED TIME',
  },
  {
    icon: ShieldCheck,
    text: 'AUTHENTIC LUXURY & 30-DAY EASY RETURNS: Delivered with certificate of authenticity.',
    badge: 'GUARANTEED',
  },
];

export const AnnouncementBar: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const { showToast } = useStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    showToast('Code Copied!', `Promo code ${code} copied to clipboard.`, 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const item = ANNOUNCEMENTS[index];
  const Icon = item.icon;

  return (
    <div className="bg-gradient-to-r from-stone-950 via-amber-950/70 to-stone-950 text-stone-200 border-b border-amber-500/20 text-xs py-2 px-4 select-none overflow-hidden relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left perk tag */}
        <div className="hidden md:flex items-center gap-2 text-stone-400 text-[11px]">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-1" />
          <span>New York &amp; London Live Fulfillment</span>
        </div>

        {/* Center Animated Message */}
        <div className="flex-1 flex items-center justify-center min-h-[20px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 text-center"
            >
              <Icon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="font-medium text-stone-200 text-xs tracking-tight">
                {item.text}
              </span>
              {item.code && (
                <button
                  onClick={() => handleCopyCode(item.code!)}
                  className="hidden sm:inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 px-2 py-0.5 rounded text-[11px] font-mono font-bold transition-all border border-amber-500/40"
                  title="Copy code"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {item.code}
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right direct hotline */}
        <div className="hidden lg:flex items-center gap-3 text-[11px] text-stone-400">
          <span>Concierge: <strong>+1 (800) 555-REHMAN</strong></span>
        </div>
      </div>
    </div>
  );
};

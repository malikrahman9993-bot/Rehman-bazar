import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Flame, Clock, ArrowRight, Zap, ShoppingBag } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../shop/ProductCard';

export const FlashSaleSection: React.FC = () => {
  const { products, setCurrentView } = useStore();
  const flashProducts = products.filter((p) => p.isFlashSale || (p.discount && p.discount >= 20)).slice(0, 4);

  // Live Countdown State (8 hours 42 mins 19 secs)
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 border-b border-stone-800/80 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Flash Sale Header Box */}
        <div className="rounded-3xl bg-stone-900/80 border border-stone-800 p-6 sm:p-8 mb-12 shadow-2xl backdrop-blur-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold">
              <Flame size={14} className="animate-bounce" />
              <span>LIMITED QUANTITY VAULT DROP</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-serif-luxury">
              24-Hour Luxury Flash Event
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 max-w-xl">
              Limited allocations on Swiss chronographs, French niche perfumes, &amp; Italian outerwear. Offers expire automatically.
            </p>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex flex-col items-center">
              <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-center text-xl sm:text-2xl font-black text-amber-400 font-mono shadow-inner">
                {formatNumber(timeLeft.hours)}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mt-1">
                Hours
              </span>
            </div>
            <span className="text-xl font-bold text-amber-500">:</span>

            <div className="flex flex-col items-center">
              <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-center text-xl sm:text-2xl font-black text-amber-400 font-mono shadow-inner">
                {formatNumber(timeLeft.minutes)}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mt-1">
                Mins
              </span>
            </div>
            <span className="text-xl font-bold text-amber-500">:</span>

            <div className="flex flex-col items-center">
              <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl bg-stone-950 border border-rose-500/40 flex items-center justify-center text-xl sm:text-2xl font-black text-rose-400 font-mono shadow-inner animate-pulse">
                {formatNumber(timeLeft.seconds)}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mt-1">
                Secs
              </span>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Deals CTA */}
        <div className="mt-12 text-center">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setCurrentView('deals');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 hover:bg-stone-800 border border-stone-700 hover:border-amber-500/60 text-amber-400 font-bold rounded-2xl shadow-xl shadow-amber-500/10 text-xs sm:text-sm cursor-pointer group"
          >
            <Zap size={16} className="text-amber-400 group-hover:rotate-12 transition-transform" />
            <span>Explore All Limited-Time Promotional Drops</span>
            <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Star, ArrowRight, ShieldCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../shop/ProductCard';

export const BestSellersSection: React.FC = () => {
  const { products, setCurrentView } = useStore();
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section className="py-16 sm:py-24 bg-stone-900/60 border-b border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
              <Trophy size={14} />
              <span>TIMELESS ICONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-serif-luxury tracking-tight">
              Best Sellers Collection
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
              Consistently rated 5.0 stars with over 10,000+ verified customer reorders.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, x: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 group cursor-pointer"
          >
            <span>View All Best Sellers</span>
            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

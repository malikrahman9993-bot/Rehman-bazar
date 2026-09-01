import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../shop/ProductCard';

export const TrendingSection: React.FC = () => {
  const { products, setCurrentView, setSelectedCategoryFilter } = useStore();
  const [activeTab, setActiveTab] = useState<string>('all');

  const tabs = [
    { id: 'all', label: 'All Trending' },
    { id: 'watches', label: 'Horology & Jewelry' },
    { id: 'fashion', label: 'Apparel & Leather' },
    { id: 'electronics', label: 'Hi-Fi Audio & Tech' },
    { id: 'beauty', label: 'Fragrance & Skincare' },
    { id: 'home-living', label: 'Decor & Living' },
  ];

  const filteredProducts = products
    .filter((p) => (activeTab === 'all' ? true : p.category === activeTab))
    .slice(0, 8);

  return (
    <section className="py-16 sm:py-24 bg-stone-950 border-b border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <Sparkles size={14} />
            <span>MOST DESIRED IN NYC &amp; LONDON</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-serif-luxury tracking-tight">
            Trending Across Rehman Bazar
          </h2>
          <p className="text-xs sm:text-sm text-stone-400">
            Our most frequently purchased and highly rated items this week, refreshed continuously.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/25'
                    : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800 hover:border-stone-700'
                }`}
              >
                {tab.label}
              </motion.button>
            );
          })}
        </div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (activeTab !== 'all') {
                setSelectedCategoryFilter(activeTab);
              }
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-8 py-3.5 bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/60 text-stone-200 font-bold rounded-2xl text-xs sm:text-sm transition-all inline-flex items-center gap-2 cursor-pointer group shadow-xl"
          >
            <span>Explore All Trending Collection</span>
            <ArrowRight size={14} className="text-amber-400 group-hover:translate-x-1.5 transition-transform" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

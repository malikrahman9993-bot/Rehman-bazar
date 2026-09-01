import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ScrollReveal } from '../common/ScrollReveal';

export const CategoryShowcase: React.FC = () => {
  const { categories, setSelectedCategoryFilter, setCurrentView } = useStore();

  const handleSelectCategory = (slug: string) => {
    setSelectedCategoryFilter(slug);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="categories-section" className="py-16 sm:py-24 bg-stone-950 border-b border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
                <Sparkles size={14} />
                <span>CURATED DEPARTMENTS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white font-serif-luxury tracking-tight">
                Explore Our Signature Collections
              </h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, x: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedCategoryFilter('');
                setCurrentView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 group cursor-pointer"
            >
              <span>View All Departments</span>
              <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
            </motion.button>
          </div>
        </ScrollReveal>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              onClick={() => handleSelectCategory(cat.slug)}
              className="group relative rounded-2xl overflow-hidden bg-stone-900 border border-stone-800/80 hover:border-amber-500/60 shadow-xl hover:shadow-amber-500/10 cursor-pointer aspect-[3/4] flex flex-col justify-end p-5 transition-all duration-300 select-none"
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent" />

              {/* Badge if available */}
              {cat.badge && (
                <div className="absolute top-3 left-3 bg-amber-500 text-stone-950 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg shadow-md">
                  {cat.badge}
                </div>
              )}

              {/* Content */}
              <div className="relative z-10 space-y-1">
                <span className="text-[11px] text-amber-400/90 font-mono font-semibold">
                  {cat.itemCount} Curated Items
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                  {cat.description}
                </p>

                <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span>Browse Department</span>
                  <ArrowRight size={12} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

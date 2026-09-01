import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const SearchModal: React.FC = () => {
  const {
    isSearchModalOpen,
    setIsSearchModalOpen,
    products,
    categories,
    formatPrice,
    viewProductDetail,
    setCurrentView,
    setSelectedCategoryFilter,
    setSearchQuery,
  } = useStore();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchModalOpen]);

  const trendingTerms = ['Swiss Chronograph', 'Cashmere Coat', 'Wireless ANC', 'Oud Parfum', 'Marble Lamp', 'Mechanical Keyboard'];

  const filteredProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelectProduct = (productId: string) => {
    setIsSearchModalOpen(false);
    viewProductDetail(productId);
  };

  const handleSearchAll = (searchTerm: string) => {
    setIsSearchModalOpen(false);
    setSearchQuery(searchTerm);
    setCurrentView('shop');
  };

  const handleSelectCategory = (slug: string) => {
    setIsSearchModalOpen(false);
    setSelectedCategoryFilter(slug);
    setCurrentView('shop');
  };

  if (!isSearchModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-stone-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Search Input Bar */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-stone-800 bg-stone-900/90">
            <Search className="w-5 h-5 text-amber-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && query.trim()) {
                  handleSearchAll(query);
                }
              }}
              placeholder="Search watches, cashmere, 4K cameras, fragrances..."
              className="w-full bg-transparent text-white placeholder:text-stone-500 focus:outline-none text-base"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-full text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsSearchModalOpen(false)}
              className="text-xs bg-stone-800 text-stone-300 hover:text-white px-2.5 py-1.5 rounded-lg border border-stone-700 font-medium"
            >
              ESC
            </button>
          </div>

          {/* Body Content */}
          <div className="max-h-[60vh] overflow-y-auto p-5 space-y-6">
            {query.trim() === '' ? (
              <>
                {/* Trending Queries */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Trending Searches (USA & UK)
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {trendingTerms.map((term) => (
                      <button
                        key={term}
                        onClick={() => {
                          setQuery(term);
                          handleSearchAll(term);
                        }}
                        className="text-xs text-stone-300 bg-stone-800/80 hover:bg-amber-500/10 hover:text-amber-300 hover:border-amber-500/40 px-3 py-1.5 rounded-lg border border-stone-700/60 transition-colors flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular Categories */}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
                    Explore Luxury Departments
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {categories.slice(0, 6).map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleSelectCategory(cat.slug)}
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-stone-800/40 hover:bg-stone-800 border border-stone-800/80 hover:border-amber-500/30 transition-all text-left group"
                      >
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-10 h-10 rounded-lg object-cover group-hover:scale-105 transition-transform"
                        />
                        <div>
                          <p className="text-xs font-medium text-stone-200 group-hover:text-amber-300">
                            {cat.name}
                          </p>
                          <span className="text-[10px] text-stone-500">
                            {cat.itemCount} items
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : filteredProducts.length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span>Found {filteredProducts.length} results</span>
                  <button
                    onClick={() => handleSearchAll(query)}
                    className="text-amber-400 hover:underline flex items-center gap-1 font-medium"
                  >
                    View all in Shop <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="space-y-2">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.id)}
                      className="flex items-center justify-between p-3 rounded-xl bg-stone-800/40 hover:bg-stone-800 border border-stone-800/80 hover:border-amber-500/30 cursor-pointer transition-all group"
                    >
                      <div className="flex items-center gap-3.5">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover bg-stone-950 group-hover:scale-105 transition-transform"
                        />
                        <div>
                          <h4 className="text-sm font-semibold text-stone-100 group-hover:text-amber-300 line-clamp-1">
                            {product.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5 text-xs text-stone-400">
                            <span className="capitalize">{product.category}</span>
                            <span>•</span>
                            <span className="text-emerald-400 font-medium">In Stock</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-amber-400">
                          {formatPrice(product.price)}
                        </div>
                        {product.oldPrice && (
                          <div className="text-[11px] text-stone-500 line-through">
                            {formatPrice(product.oldPrice)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-stone-400 text-sm">No products found matching &ldquo;{query}&rdquo;.</p>
                <button
                  onClick={() => {
                    setQuery('');
                    handleSearchAll('');
                  }}
                  className="mt-3 text-xs text-amber-400 hover:underline font-medium"
                >
                  Browse our full collection
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

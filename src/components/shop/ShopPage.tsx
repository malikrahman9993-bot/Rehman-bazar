import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  SlidersHorizontal,
  Search,
  X,
  ChevronDown,
  Grid3X3,
  LayoutList,
  Sparkles,
  RotateCcw,
  Star,
  Check,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from './ProductCard';
import { Product } from '../../types';

export const ShopPage: React.FC = () => {
  const {
    products,
    categories,
    searchQuery,
    setSearchQuery,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    currencyConfig,
    formatPrice,
  } = useStore();

  // Filters State
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<
    'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'discount'
  >('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>('');

  // Extract all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [products]);

  // Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchCat = product.category.toLowerCase().includes(q);
          const matchDesc = product.description.toLowerCase().includes(q);
          const matchTag = product.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchName && !matchCat && !matchDesc && !matchTag) return false;
        }

        // Category Filter
        if (selectedCategoryFilter && selectedCategoryFilter !== 'all') {
          if (product.category !== selectedCategoryFilter) return false;
        }

        // Price Filter (USD base)
        if (product.price < minPrice || product.price > maxPrice) return false;

        // Rating Filter
        if (minRating > 0 && product.rating < minRating) return false;

        // In Stock Filter
        if (inStockOnly && product.stock <= 0) return false;

        // Tag Filter
        if (selectedTag && !product.tags.includes(selectedTag)) return false;

        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          case 'newest':
            return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
          case 'discount':
            return (b.discount || 0) - (a.discount || 0);
          default:
            return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
        }
      });
  }, [
    products,
    searchQuery,
    selectedCategoryFilter,
    minPrice,
    maxPrice,
    minRating,
    inStockOnly,
    selectedTag,
    sortBy,
  ]);

  const activeFiltersCount =
    (selectedCategoryFilter ? 1 : 0) +
    (searchQuery ? 1 : 0) +
    (minPrice > 0 || maxPrice < 1000 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (selectedTag ? 1 : 0);

  const resetAllFilters = () => {
    setSelectedCategoryFilter('');
    setSearchQuery('');
    setMinPrice(0);
    setMaxPrice(1000);
    setMinRating(0);
    setInStockOnly(false);
    setSelectedTag('');
    setSortBy('featured');
  };

  return (
    <div className="bg-stone-950 min-h-screen pb-24 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs & Header */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <span>Home</span>
            <span>/</span>
            <span className="text-amber-400 font-semibold">Luxury Catalog</span>
            {selectedCategoryFilter && (
              <>
                <span>/</span>
                <span className="capitalize text-stone-200">{selectedCategoryFilter}</span>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-white font-serif-luxury tracking-tight">
                {selectedCategoryFilter
                  ? categories.find((c) => c.slug === selectedCategoryFilter)?.name || 'Curated Catalog'
                  : 'All Luxury Departments'}
              </h1>
              <p className="text-xs sm:text-sm text-stone-400 mt-1">
                Showing {filteredProducts.length} verified products with express delivery to USA &amp; UK
              </p>
            </div>

            {/* View Mode & Filter Trigger for Mobile */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 border border-stone-800 text-xs font-bold text-stone-200"
              >
                <SlidersHorizontal size={14} className="text-amber-400" />
                <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
              </button>

              {/* Sorting Dropdown */}
              <div className="relative flex items-center bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs font-semibold text-stone-200">
                <span className="text-stone-400 mr-2 hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-white focus:outline-none cursor-pointer text-xs font-semibold pr-2"
                >
                  <option value="featured" className="bg-stone-900 text-white">Featured &amp; Recommended</option>
                  <option value="price-asc" className="bg-stone-900 text-white">Price: Low to High</option>
                  <option value="price-desc" className="bg-stone-900 text-white">Price: High to Low</option>
                  <option value="rating" className="bg-stone-900 text-white">Highest Customer Rating</option>
                  <option value="newest" className="bg-stone-900 text-white">Newest Arrivals</option>
                  <option value="discount" className="bg-stone-900 text-white">Biggest Discount %</option>
                </select>
              </div>

              {/* Grid / List Switcher */}
              <div className="hidden sm:flex items-center bg-stone-900 border border-stone-800 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-white'
                  }`}
                  title="Grid view"
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-white'
                  }`}
                  title="List view"
                >
                  <LayoutList size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center flex-wrap gap-2 mb-6 p-3 bg-stone-900/50 border border-stone-800 rounded-2xl">
            <span className="text-xs text-stone-400 font-bold uppercase tracking-wider mr-1">
              Active Filters:
            </span>

            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-lg">
                Search: &ldquo;{searchQuery}&rdquo;
                <X size={12} className="cursor-pointer hover:text-white" onClick={() => setSearchQuery('')} />
              </span>
            )}

            {selectedCategoryFilter && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-lg capitalize">
                Category: {selectedCategoryFilter}
                <X size={12} className="cursor-pointer hover:text-white" onClick={() => setSelectedCategoryFilter('')} />
              </span>
            )}

            {(minPrice > 0 || maxPrice < 1000) && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-stone-800 text-stone-300 border border-stone-700 px-2.5 py-1 rounded-lg">
                Price: {formatPrice(minPrice)} - {formatPrice(maxPrice)}
                <X
                  size={12}
                  className="cursor-pointer hover:text-white"
                  onClick={() => {
                    setMinPrice(0);
                    setMaxPrice(1000);
                  }}
                />
              </span>
            )}

            {minRating > 0 && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-stone-800 text-stone-300 border border-stone-700 px-2.5 py-1 rounded-lg">
                Rating: {minRating}★+
                <X size={12} className="cursor-pointer hover:text-white" onClick={() => setMinRating(0)} />
              </span>
            )}

            {inStockOnly && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-stone-800 text-stone-300 border border-stone-700 px-2.5 py-1 rounded-lg">
                In Stock Only
                <X size={12} className="cursor-pointer hover:text-white" onClick={() => setInStockOnly(false)} />
              </span>
            )}

            {selectedTag && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-lg">
                Tag: {selectedTag}
                <X size={12} className="cursor-pointer hover:text-white" onClick={() => setSelectedTag('')} />
              </span>
            )}

            <button
              onClick={resetAllFilters}
              className="text-xs text-rose-400 hover:text-rose-300 font-bold ml-auto flex items-center gap-1"
            >
              <RotateCcw size={12} /> Clear All
            </button>
          </div>
        )}

        {/* Catalog Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Left Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-3 space-y-6 bg-stone-900/60 border border-stone-800/80 p-5 rounded-3xl sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <span className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                <SlidersHorizontal size={14} className="text-amber-400" />
                Refine Selection
              </span>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetAllFilters}
                  className="text-[11px] text-amber-400 hover:underline font-bold"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Department Categories List */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                Departments
              </label>
              <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedCategoryFilter('')}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                    !selectedCategoryFilter
                      ? 'bg-amber-500/10 text-amber-300 font-bold border border-amber-500/30'
                      : 'text-stone-400 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  <span>All Collections</span>
                  <span className="text-[10px] text-stone-500">{products.length}</span>
                </button>

                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategoryFilter(cat.slug)}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                      selectedCategoryFilter === cat.slug
                        ? 'bg-amber-500/10 text-amber-300 font-bold border border-amber-500/30'
                        : 'text-stone-400 hover:text-white hover:bg-stone-800'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-stone-500">{cat.itemCount}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-3 pt-3 border-t border-stone-800">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                Price Range ({currencyConfig.code} {currencyConfig.symbol})
              </label>
              <div className="flex items-center justify-between text-xs text-amber-400 font-bold font-mono">
                <span>{formatPrice(minPrice)}</span>
                <span>{formatPrice(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                step="25"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-amber-500 bg-stone-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Customer Rating Filter */}
            <div className="space-y-2 pt-3 border-t border-stone-800">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                Minimum Rating
              </label>
              <div className="space-y-1">
                {[0, 4.8, 4.5, 4.0].map((star) => (
                  <button
                    key={star}
                    onClick={() => setMinRating(star)}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-colors ${
                      minRating === star
                        ? 'bg-amber-500/10 text-amber-300 font-bold border border-amber-500/30'
                        : 'text-stone-400 hover:text-white hover:bg-stone-800'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Star size={12} className={star > 0 ? 'fill-amber-400 text-amber-400' : 'text-stone-600'} />
                      <span>{star === 0 ? 'Any Rating' : `${star} Stars & Up`}</span>
                    </div>
                    {minRating === star && <Check size={14} className="text-amber-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* In-Stock Toggle */}
            <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
              <span className="text-xs font-bold text-stone-300">In-Stock Only</span>
              <button
                onClick={() => setInStockOnly(!inStockOnly)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  inStockOnly ? 'bg-amber-500' : 'bg-stone-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-stone-950 transition-transform ${
                    inStockOnly ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Tag Filter Pills */}
            <div className="space-y-2 pt-3 border-t border-stone-800">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                Luxury Badges &amp; Tags
              </label>
              <div className="flex flex-wrap gap-1.5">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                      selectedTag === tag
                        ? 'bg-amber-500 text-stone-950 font-bold border-amber-500 shadow-md'
                        : 'bg-stone-800/80 text-stone-400 border-stone-700 hover:border-stone-500 hover:text-stone-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Product Grid / List */}
          <div className="lg:col-span-9">
            {filteredProducts.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-stone-900/40 border border-stone-800 rounded-3xl p-8 space-y-4">
                <Sparkles className="w-10 h-10 text-amber-400 mx-auto" />
                <h3 className="text-xl font-bold text-white font-serif-luxury">
                  No Matching Products Found
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 max-w-md mx-auto">
                  We could not find any luxury items matching your active filter criteria. Try adjusting the price range or clearing active filters.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="px-6 py-2.5 bg-amber-500 text-stone-950 font-bold text-xs rounded-xl shadow-lg hover:bg-amber-400 transition-all inline-flex items-center gap-2"
                >
                  <RotateCcw size={14} />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex items-end justify-center bg-stone-950/80 backdrop-blur-md">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="w-full bg-stone-900 border-t border-stone-800 rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto space-y-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <SlidersHorizontal size={16} className="text-amber-400" />
                  Filter Catalog
                </h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-full text-stone-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Departments */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Departments
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategoryFilter(c.slug)}
                      className={`p-2 rounded-xl text-xs font-medium text-left truncate ${
                        selectedCategoryFilter === c.slug
                          ? 'bg-amber-500 text-stone-950 font-bold'
                          : 'bg-stone-800 text-stone-300'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Slider */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Max Price: {formatPrice(maxPrice)}
                </span>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="25"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              {/* Apply & Close */}
              <div className="flex gap-3 pt-4 border-t border-stone-800">
                <button
                  onClick={resetAllFilters}
                  className="w-1/3 py-3 rounded-xl bg-stone-800 text-stone-300 text-xs font-bold"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-2/3 py-3 rounded-xl bg-amber-500 text-stone-950 text-xs font-bold shadow-lg"
                >
                  Show ({filteredProducts.length}) Results
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

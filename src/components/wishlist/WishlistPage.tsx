import React from 'react';
import { motion } from 'motion/react';
import { Heart, ShoppingBag, Trash2, ArrowRight, Share2, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../shop/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, addToCart, toggleWishlist, setCurrentView, showToast } = useStore();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleMoveAllToBag = () => {
    wishlistedProducts.forEach((p) => {
      addToCart(p, 1);
    });
    showToast('Wishlist Moved', 'All wishlist items added to your shopping bag.', 'success');
  };

  const handleShareWishlist = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Wishlist Link Copied', 'Shareable link copied to clipboard.', 'info');
  };

  if (wishlistedProducts.length === 0) {
    return (
      <div className="bg-stone-950 min-h-[70vh] flex items-center justify-center p-6">
        <div className="text-center max-w-md space-y-4 bg-stone-900 border border-stone-800 p-8 sm:p-12 rounded-3xl shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto">
            <Heart size={36} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white font-serif-luxury">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs sm:text-sm text-stone-400">
              Save your favorite luxury chronographs, apparel, and gadgets to easily revisit or gift to others.
            </p>
          </div>
          <button
            onClick={() => setCurrentView('shop')}
            className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-2xl text-xs sm:text-sm transition-all shadow-xl shadow-amber-500/20"
          >
            Explore Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-950 min-h-screen pb-24 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Wishlist Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
              <Heart size={14} className="fill-rose-400 text-rose-400" />
              <span>SAVED ACQUISITIONS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white font-serif-luxury tracking-tight">
              My Luxury Wishlist ({wishlistedProducts.length})
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShareWishlist}
              className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <Share2 size={14} />
              <span>Share Wishlist</span>
            </button>

            <button
              onClick={handleMoveAllToBag}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl text-xs font-bold transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
            >
              <ShoppingBag size={14} />
              <span>Move All to Bag</span>
            </button>
          </div>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
};

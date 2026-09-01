import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Heart, Star, Check, ShieldCheck, Truck, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { RatingStars } from '../common/RatingStars';
import { AnimatedAddToCartButton } from '../common/AddToCartButton';

export const ProductQuickView: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    viewProductDetail,
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(quickViewProduct?.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(quickViewProduct?.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!quickViewProduct) return null;

  const isFavorited = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, selectedColor, selectedSize);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setQuickViewProduct(null);
    }, 900);
  };

  const handleFullDetails = () => {
    const prodId = quickViewProduct.id;
    setQuickViewProduct(null);
    viewProductDetail(prodId);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Close Button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-950/80 text-stone-400 hover:text-white border border-stone-800 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="overflow-y-auto p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Left Column: Image Stage */}
              <div className="space-y-4">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-stone-950 border border-stone-800">
                  <img
                    src={quickViewProduct.images[activeImageIndex] || quickViewProduct.images[0]}
                    alt={quickViewProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Thumbnails */}
                {quickViewProduct.images.length > 1 && (
                  <div className="flex items-center gap-3">
                    {quickViewProduct.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                          activeImageIndex === idx
                            ? 'border-amber-400 scale-105 shadow-lg shadow-amber-500/20'
                            : 'border-stone-800 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Details & Add to Cart */}
              <div className="space-y-5">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-400 font-bold mb-1">
                    <span>{quickViewProduct.category}</span>
                    <span>•</span>
                    <span className="text-stone-400">SKU: {quickViewProduct.sku}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-serif-luxury leading-snug">
                    {quickViewProduct.name}
                  </h2>
                </div>

                {/* Rating & Stock */}
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <RatingStars
                    rating={quickViewProduct.rating}
                    reviewsCount={quickViewProduct.reviewsCount}
                    size="md"
                  />
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    In Stock ({quickViewProduct.stock} available)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-black text-amber-400 font-serif-luxury">
                    {formatPrice(quickViewProduct.price)}
                  </span>
                  {quickViewProduct.oldPrice && (
                    <span className="text-sm text-stone-500 line-through">
                      {formatPrice(quickViewProduct.oldPrice)}
                    </span>
                  )}
                  {quickViewProduct.discount && (
                    <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                      Save {quickViewProduct.discount}%
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed line-clamp-3">
                  {quickViewProduct.description}
                </p>

                {/* Colors */}
                {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-400 block">
                      Color: <strong className="text-white">{selectedColor?.name}</strong>
                    </label>
                    <div className="flex items-center gap-2">
                      {quickViewProduct.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color)}
                          className={`w-7 h-7 rounded-full border-2 transition-all ${
                            selectedColor?.name === color.name
                              ? 'border-amber-400 scale-110 shadow-md ring-2 ring-amber-400/30'
                              : 'border-stone-700 opacity-80 hover:opacity-100'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Sizes */}
                {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-400 block">
                      Size: <strong className="text-white">{selectedSize}</strong>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {quickViewProduct.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                            selectedSize === size
                              ? 'bg-amber-500 text-stone-950 border-amber-500'
                              : 'bg-stone-800 text-stone-300 border-stone-700 hover:border-stone-500'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity & Actions */}
                <div className="pt-2 flex items-center gap-3">
                  <div className="flex items-center bg-stone-800 border border-stone-700 rounded-xl">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 text-stone-300 hover:text-white text-sm font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 py-2 text-sm font-bold text-white min-w-[28px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity((q) => Math.min(quickViewProduct.stock, q + 1))
                      }
                      className="px-3 py-2 text-stone-300 hover:text-white text-sm font-bold"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex-1">
                    <AnimatedAddToCartButton
                      size="md"
                      fullWidth
                      label="Add to Bag"
                      addedLabel="Added to Bag!"
                      onAdd={() => {
                        addToCart(quickViewProduct, quantity, selectedColor, selectedSize);
                        setTimeout(() => {
                          setQuickViewProduct(null);
                        }, 1800);
                      }}
                    />
                  </div>

                  <button
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className={`p-3 rounded-xl border transition-all ${
                      isFavorited
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                        : 'bg-stone-800 text-stone-300 hover:text-white border-stone-700'
                    }`}
                    title={isFavorited ? 'In Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart size={18} className={isFavorited ? 'fill-rose-400' : ''} />
                  </button>
                </div>

                {/* View Full Product Page Link */}
                <div className="pt-2">
                  <button
                    onClick={handleFullDetails}
                    className="w-full text-center text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center justify-center gap-1.5 py-1"
                  >
                    <span>View Complete Product Specifications &amp; Reviews</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

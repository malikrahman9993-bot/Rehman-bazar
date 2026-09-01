import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, ShoppingBag, Eye, Star, Flame, Check } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { RatingStars } from '../common/RatingStars';
import { AnimatedAddToCartButton } from '../common/AddToCartButton';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const {
    formatPrice,
    viewProductDetail,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const [isAdding, setIsAdding] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, 1, selectedColor);
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      onClick={() => viewProductDetail(product.id)}
      className="group relative bg-stone-900/70 hover:bg-stone-900 border border-stone-800/80 hover:border-amber-500/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col cursor-pointer select-none"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[4/3] bg-stone-950 overflow-hidden">
        <img
          src={product.images[activeImageIndex] || product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.discount && (
            <span className="bg-rose-500 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-lg shadow-lg">
              -{product.discount}% OFF
            </span>
          )}
          {product.isFlashSale && (
            <span className="bg-amber-500 text-stone-950 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg shadow-lg flex items-center gap-1">
              <Flame size={12} className="fill-stone-950" /> FLASH
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-sky-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg shadow-lg">
              NEW
            </span>
          )}
        </div>

        {/* Top Right Quick Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          {/* Wishlist Heart with Bounce */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={handleWishlist}
            className={`p-2 rounded-xl backdrop-blur-md transition-all shadow-md ${
              isFavorited
                ? 'bg-rose-500 text-white'
                : 'bg-stone-950/70 hover:bg-stone-900 text-stone-300 hover:text-white border border-stone-800'
            }`}
            title={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart size={16} className={isFavorited ? 'fill-white' : ''} />
          </motion.button>

          {/* Quick View Eye Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleQuickView}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-xl bg-stone-950/70 hover:bg-stone-900 text-stone-300 hover:text-amber-400 border border-stone-800 backdrop-blur-md shadow-md cursor-pointer"
            title="Quick preview"
          >
            <Eye size={16} />
          </motion.button>
        </div>

        {/* Low Stock Indicator */}
        {product.stock <= 8 && (
          <div className="absolute bottom-3 left-3 bg-stone-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-amber-400 border border-stone-800 font-semibold">
            Only {product.stock} left in stock
          </div>
        )}

        {/* Hover Multi-Image Thumbnails */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-stone-950/80 p-1 rounded-lg backdrop-blur-md border border-stone-800">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex(idx);
                }}
                className={`w-4 h-4 rounded-sm overflow-hidden border ${
                  activeImageIndex === idx ? 'border-amber-400 scale-110' : 'border-stone-700 opacity-60'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Details Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1">
            <span className="uppercase tracking-wider font-semibold text-amber-400/90">
              {product.category}
            </span>
            <span className="text-stone-500 font-mono text-[10px]">{product.sku}</span>
          </div>

          <h3 className="text-sm font-bold text-stone-100 group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </div>

        {/* Rating and Color Swatches */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <RatingStars rating={product.rating} reviewsCount={product.reviewsCount} size="sm" />

          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1">
              {product.colors.slice(0, 3).map((col) => (
                <button
                  key={col.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(col);
                  }}
                  className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    selectedColor?.name === col.name
                      ? 'border-amber-400 scale-125'
                      : 'border-stone-700 opacity-70'
                  }`}
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                />
              ))}
            </div>
          )}
        </div>

        {/* Price & Add to Cart Button */}
        <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between gap-2">
          <div>
            <div className="text-base font-black text-amber-400 font-serif-luxury">
              {formatPrice(product.price)}
            </div>
            {product.oldPrice && (
              <div className="text-[11px] text-stone-500 line-through">
                {formatPrice(product.oldPrice)}
              </div>
            )}
          </div>

          <AnimatedAddToCartButton
            size="sm"
            label="Add"
            addedLabel="Added!"
            onAdd={() => addToCart(product, 1, selectedColor)}
          />
        </div>
      </div>
    </motion.div>
  );
};

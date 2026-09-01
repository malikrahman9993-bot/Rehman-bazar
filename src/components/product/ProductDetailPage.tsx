import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Share2,
  Lock,
  ChevronRight,
  ThumbsUp,
} from 'lucide-react';
import { useStore, STORE_OWNER_ACCOUNT } from '../../context/StoreContext';
import { RatingStars } from '../common/RatingStars';
import { ProductCard } from '../shop/ProductCard';
import { SAMPLE_REVIEWS } from '../../data/products';
import { Crown, Edit, Film, Video, Play } from 'lucide-react';
import { AnimatedAddToCartButton } from '../common/AddToCartButton';

export const ProductDetailPage: React.FC = () => {
  const {
    products,
    selectedProductId,
    user,
    isStoreOwner,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setCurrentView,
    setSelectedCategoryFilter,
    showToast,
  } = useStore();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [mediaView, setMediaView] = useState<'images' | 'video'>('images');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'shipping' | 'reviews'>('overview');
  const [isAdding, setIsAdding] = useState(false);

  // Review submission state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewsList, setReviewsList] = useState(SAMPLE_REVIEWS);

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity, selectedColor, selectedSize);
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Link Copied', 'Product link copied to clipboard.', 'info');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) {
      showToast('Missing Fields', 'Please enter your name and comments.', 'warning');
      return;
    }

    const newRev = {
      id: 'rev-usr-' + Math.random().toString(36).substring(2, 7),
      productId: product.id,
      author: newReviewAuthor,
      location: 'Verified Online Buyer',
      rating: newReviewRating,
      date: 'Just now',
      comment: newReviewComment,
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      helpfulCount: 0,
    };

    setReviewsList([newRev, ...reviewsList]);
    setNewReviewAuthor('');
    setNewReviewComment('');
    showToast('Review Submitted', 'Thank you for reviewing this product!', 'success');
  };

  // Related products in same category
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .concat(products.filter((p) => p.id !== product.id && p.category !== product.category))
    .slice(0, 4);

  return (
    <div className="bg-stone-950 min-h-screen pb-24 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation & Store Owner Shortcut */}
        <div className="flex items-center justify-between mb-8 pb-2 border-b border-stone-800/80">
          <nav className="flex items-center gap-2 text-xs text-stone-400 overflow-x-auto whitespace-nowrap">
            <button onClick={() => setCurrentView('home')} className="hover:text-white cursor-pointer">
              Home
            </button>
            <span>/</span>
            <button
              onClick={() => {
                setSelectedCategoryFilter(product.category);
                setCurrentView('shop');
              }}
              className="capitalize hover:text-white cursor-pointer"
            >
              {product.category}
            </button>
            <span>/</span>
            <span className="text-amber-400 font-semibold truncate">{product.name}</span>
          </nav>

          {/* Store Owner Edit Shortcut */}
          <button
            onClick={() => setCurrentView('admin')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold transition-all cursor-pointer"
          >
            <Edit size={13} />
            <span>Edit in Seller Studio</span>
          </button>
        </div>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-16">
          
          {/* Left Column: Multi-Angle Gallery & Video Player */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Media Selector Tabs (If video is available) */}
            {product.videoUrl && (
              <div className="flex items-center gap-2 p-1 rounded-2xl bg-stone-900 border border-stone-800 w-fit text-xs font-bold">
                <button
                  onClick={() => setMediaView('images')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all cursor-pointer ${
                    mediaView === 'images'
                      ? 'bg-amber-500 text-stone-950 shadow-md'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  <span>📸 High-Res Photos ({product.images.length})</span>
                </button>
                <button
                  onClick={() => setMediaView('video')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all cursor-pointer ${
                    mediaView === 'video'
                      ? 'bg-amber-500 text-stone-950 shadow-md'
                      : 'text-amber-400 hover:text-amber-300'
                  }`}
                >
                  <Video size={14} />
                  <span>🎥 Watch Product Video Demo</span>
                </button>
              </div>
            )}

            {/* Media Display Window */}
            {mediaView === 'video' && product.videoUrl ? (
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-black border border-stone-800 shadow-2xl flex items-center justify-center">
                {product.videoUrl.includes('youtube.com') || product.videoUrl.includes('youtu.be') ? (
                  <iframe
                    src={product.videoUrl.replace('watch?v=', 'embed/')}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={product.videoUrl}
                    controls
                    autoPlay
                    loop
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            ) : (
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 shadow-2xl group">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.discount && (
                    <span className="bg-rose-500 text-white text-xs font-black px-3 py-1 rounded-xl shadow-lg">
                      SAVE {product.discount}%
                    </span>
                  )}
                  {product.isFlashSale && (
                    <span className="bg-amber-500 text-stone-950 text-xs font-black uppercase px-3 py-1 rounded-xl shadow-lg flex items-center gap-1">
                      <Sparkles size={12} /> FLASH EVENT
                    </span>
                  )}
                  {product.videoUrl && (
                    <button
                      onClick={() => setMediaView('video')}
                      className="bg-stone-950/80 hover:bg-amber-500 hover:text-stone-950 text-amber-400 text-xs font-bold px-3 py-1 rounded-xl shadow-lg border border-amber-500/30 flex items-center gap-1.5 transition-all cursor-pointer backdrop-blur-md"
                    >
                      <Play size={12} className="fill-current" /> Watch Video Demo
                    </button>
                  )}
                </div>

                {/* Share & Wishlist overlay */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="p-2.5 rounded-xl bg-stone-950/70 hover:bg-stone-900 text-stone-300 hover:text-white border border-stone-800 backdrop-blur-md transition-colors cursor-pointer"
                    title="Share product"
                  >
                    <Share2 size={16} />
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-2.5 rounded-xl border backdrop-blur-md transition-colors cursor-pointer ${
                      isFavorited
                        ? 'bg-rose-500 text-white border-rose-500'
                        : 'bg-stone-950/70 hover:bg-stone-900 text-stone-300 hover:text-white border-stone-800'
                    }`}
                    title={isFavorited ? 'In Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart size={16} className={isFavorited ? 'fill-white' : ''} />
                  </button>
                </div>
              </div>
            )}

            {/* Thumbnail selector */}
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveImageIndex(idx);
                    setMediaView('images');
                  }}
                  className={`w-20 sm:w-24 aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    mediaView === 'images' && activeImageIndex === idx
                      ? 'border-amber-400 scale-105 shadow-lg shadow-amber-500/20'
                      : 'border-stone-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}

              {/* Video Thumbnail Button */}
              {product.videoUrl && (
                <button
                  onClick={() => setMediaView('video')}
                  className={`w-20 sm:w-24 aspect-[4/3] rounded-2xl overflow-hidden border-2 flex flex-col items-center justify-center bg-stone-900 transition-all cursor-pointer shrink-0 ${
                    mediaView === 'video'
                      ? 'border-amber-400 bg-amber-500/10 text-amber-400 shadow-lg shadow-amber-500/20'
                      : 'border-stone-800 text-stone-400 hover:text-amber-400'
                  }`}
                >
                  <Play size={20} className="fill-current mb-0.5" />
                  <span className="text-[10px] font-bold">VIDEO</span>
                </button>
              )}
            </div>

            {/* Delivery Guarantee Card */}
            <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 flex items-center justify-between text-xs text-stone-300">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <strong className="text-white block">Fast Tracked Delivery (USA &amp; UK)</strong>
                  <span>Free express dispatch on orders over $50 / £40 with tracking</span>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-stone-400 font-mono">
                <Clock size={14} className="text-amber-400" />
                <span>Leaves hub in 24h</span>
              </div>
            </div>
          </div>

          {/* Right Column: Buying Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-amber-400 font-bold uppercase tracking-wider mb-1">
                <span>{product.category}</span>
                <span className="text-stone-400 font-mono">SKU: {product.sku}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white font-serif-luxury tracking-tight leading-snug">
                {product.name}
              </h1>
            </div>

            {/* Rating and Stock */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <div className="flex items-center gap-3">
                <RatingStars
                  rating={product.rating}
                  reviewsCount={product.reviewsCount}
                  size="md"
                />
              </div>
              <div className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                In Stock ({product.stock} available)
              </div>
            </div>

            {/* Pricing Section */}
            <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800/80 space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-amber-400 font-serif-luxury">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-base text-stone-500 line-through font-mono">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
                {product.discount && (
                  <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                    Save {product.discount}%
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-400">
                Price includes all applicable import duties to USA &amp; UK. Pay in 4 with Klarna available at checkout.
              </p>
            </div>

            {/* Color Swatch Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                  Select Finish: <strong className="text-white">{selectedColor?.name}</strong>
                </label>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor?.name === c.name
                          ? 'border-amber-400 scale-110 shadow-lg ring-2 ring-amber-400/40'
                          : 'border-stone-700 opacity-70 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                  Select Sizing: <strong className="text-white">{selectedSize}</strong>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedSize === s
                          ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-md'
                          : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Action CTAs */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-stone-900 border border-stone-800 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 rounded-lg hover:bg-stone-800 text-stone-200 font-bold flex items-center justify-center transition-colors"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-white font-mono">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="w-9 h-9 rounded-lg hover:bg-stone-800 text-stone-200 font-bold flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Animated Add to Bag Button (TikTok Style) */}
                <div className="flex-1">
                  <AnimatedAddToCartButton
                    size="lg"
                    fullWidth
                    label="Add to Bag"
                    addedLabel="Added to Bag!"
                    onAdd={() => addToCart(product, quantity, selectedColor, selectedSize)}
                  />
                </div>
              </div>

              {/* Buy Now Direct Button */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-100 font-bold rounded-2xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md hover:border-amber-500/50"
              >
                <span>Buy Now — Instant Checkout</span>
                <ArrowRight size={16} className="text-amber-400" />
              </button>

              {/* Verified Owner Quick Management Card (Visible only to Malik Rehman / Admin) */}
              {user?.role === 'admin' && (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-amber-300">
                    <Crown size={16} className="text-amber-400 shrink-0" />
                    <div>
                      <span className="font-bold block">Store Owner Clearance</span>
                      <span className="text-[10px] text-stone-400">Manage SKU pricing &amp; inventory live</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentView('admin')}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl text-xs font-black transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    <Edit size={12} />
                    <span>Edit SKU</span>
                  </button>
                </div>
              )}
            </div>

            {/* Trust Assurance Strip */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-800/80 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-amber-400 shrink-0" />
                <span>100% Genuine Guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw size={16} className="text-amber-400 shrink-0" />
                <span>30-Day Free Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock size={16} className="text-amber-400 shrink-0" />
                <span>Encrypted 256-Bit SSL</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>Full Global Warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Product Details: Overview, Specs, Shipping, Reviews */}
        <div className="bg-stone-900/60 border border-stone-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl mb-16">
          {/* Tab Navigation */}
          <div className="flex items-center gap-2 sm:gap-4 border-b border-stone-800 pb-4 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview & Highlights' },
              { id: 'specs', label: 'Specifications' },
              { id: 'shipping', label: 'USA & UK Delivery' },
              { id: 'reviews', label: `Customer Reviews (${reviewsList.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-stone-950 shadow-md'
                    : 'text-stone-400 hover:text-white hover:bg-stone-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="pt-8">
            {activeTab === 'overview' && (
              <div className="space-y-6 text-sm text-stone-300 leading-relaxed max-w-4xl">
                <p className="text-base text-stone-200 font-medium">
                  {product.description}
                </p>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Product Highlights
                  </h4>
                  <ul className="space-y-2">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-2xl">
                <div className="rounded-2xl border border-stone-800 overflow-hidden divide-y divide-stone-800 text-xs">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-2 p-3 bg-stone-900/40">
                      <span className="font-semibold text-stone-400">{key}</span>
                      <span className="text-white font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-6 text-xs sm:text-sm text-stone-300 max-w-3xl leading-relaxed">
                <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    <Truck size={16} className="text-amber-400" />
                    Priority Courier Network
                  </h4>
                  <p>
                    All Rehman Bazar orders are fulfilled from our temperature-controlled bonded warehouses in New Jersey, USA and London Heathrow, UK.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-stone-400 pt-1">
                    <li><strong>USA Standard Ground:</strong> 3-5 Business Days (Free over $50)</li>
                    <li><strong>USA FedEx 2-Day Air:</strong> 1-2 Business Days ($19.99)</li>
                    <li><strong>UK Royal Mail Tracked 24:</strong> 1-2 Business Days (Free over £40)</li>
                    <li><strong>UK White-Glove Courier:</strong> Next Business Day Guaranteed</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    <RotateCcw size={16} className="text-amber-400" />
                    30-Day Hassle-Free Returns
                  </h4>
                  <p>
                    If you are not thoroughly satisfied with your purchase, you may initiate a return within 30 days of receipt. We provide a prepaid postage label. Items must be unworn and in original presentation box.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8">
                {/* Submit review form */}
                <form onSubmit={handleAddReview} className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 max-w-2xl">
                  <h4 className="text-sm font-bold text-white">Write a Verified Patron Review</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-stone-400 block mb-1">Your Full Name</label>
                      <input
                        type="text"
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        placeholder="e.g. Victoria Sterling"
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs text-stone-400 block mb-1">Rating</label>
                      <select
                        value={newReviewRating}
                        onChange={(e) => setNewReviewRating(Number(e.target.value))}
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value={5}>5 Stars — Exceptional Quality</option>
                        <option value={4}>4 Stars — Very Good</option>
                        <option value={3}>3 Stars — Average</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-stone-400 block mb-1">Your Feedback &amp; Experience</label>
                    <textarea
                      rows={3}
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      placeholder="Share details about the craftsmanship, fit, or delivery speed..."
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl text-xs font-bold transition-all shadow-md"
                  >
                    Submit Review
                  </button>
                </form>

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviewsList.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800/80 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={rev.avatar}
                            alt=""
                            className="w-9 h-9 rounded-full object-cover border border-amber-500/30"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-white">{rev.author}</span>
                              <CheckCircle2 size={12} className="text-emerald-400" />
                              <span className="text-[10px] text-stone-500">Verified Buyer</span>
                            </div>
                            <span className="text-[11px] text-stone-400">{rev.location}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <RatingStars rating={rev.rating} size="sm" showCount={false} />
                          <span className="text-[10px] text-stone-500">{rev.date}</span>
                        </div>
                      </div>
                      <p className="text-xs text-stone-300 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* You May Also Like Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white font-serif-luxury">
              You May Also Appreciate
            </h3>
            <button
              onClick={() => {
                setSelectedCategoryFilter('');
                setCurrentView('shop');
              }}
              className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
            >
              Browse Full Catalog &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

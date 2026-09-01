import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Film,
  Plus,
  Trash2,
  DollarSign,
  Package,
  Sparkles,
  CheckCircle2,
  Percent,
  Layers,
  Palette,
  Check,
  Video,
  Play,
  Eye,
  Info,
  Tag,
  Clock,
  Flame,
  Crown,
} from 'lucide-react';
import { Product, ProductColor } from '../../types';
import { useStore } from '../../context/StoreContext';

interface ProductListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: Product | null;
  onSave: (productData: Omit<Product, 'id'> | Product) => void;
}

export const ProductListingModal: React.FC<ProductListingModalProps> = ({
  isOpen,
  onClose,
  initialProduct,
  onSave,
}) => {
  const { categories, formatPrice } = useStore();

  const isEditing = !!initialProduct;

  // 1. Basic Info
  const [name, setName] = useState(initialProduct?.name || '');
  const [sku, setSku] = useState(
    initialProduct?.sku || 'RB-' + Math.random().toString(36).substring(2, 6).toUpperCase()
  );
  const [category, setCategory] = useState(initialProduct?.category || 'watches');
  const [stock, setStock] = useState<number>(initialProduct?.stock ?? 12);

  // 2. Day-by-Day Pricing & Discount State
  const [price, setPrice] = useState<number>(initialProduct?.price ?? 199);
  const [oldPrice, setOldPrice] = useState<number | undefined>(initialProduct?.oldPrice);
  const [discount, setDiscount] = useState<number | undefined>(initialProduct?.discount);
  const [isFlashSale, setIsFlashSale] = useState<boolean>(initialProduct?.isFlashSale || false);
  const [flashSaleHours, setFlashSaleHours] = useState<number>(24);

  // 3. Images (Multiple gallery images)
  const [images, setImages] = useState<string[]>(
    initialProduct?.images && initialProduct.images.length > 0
      ? initialProduct.images
      : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop']
  );
  const [newImageUrl, setNewImageUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 4. Product Video (File upload or direct URL or YouTube)
  const [videoUrl, setVideoUrl] = useState<string>(initialProduct?.videoUrl || '');
  const videoFileInputRef = useRef<HTMLInputElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // 5. Description & Highlights / Features
  const [description, setDescription] = useState(
    initialProduct?.description ||
      'Engineered with immaculate artisan craftsmanship, hand-finished surfaces, and certified luxury materials. Comes packaged in our signature velvet-lined presentation box with full international authenticity certificate.'
  );
  const [features, setFeatures] = useState<string[]>(
    initialProduct?.features || [
      'Master artisan hand-finished detailing',
      'Accompanied by Certificate of Authenticity',
      'Complimentary Express Courier Shipping to US & UK',
      '2-Year Comprehensive Global Guarantee',
    ]
  );
  const [newFeatureText, setNewFeatureText] = useState('');

  // 6. Specs (Key-Value pairs)
  const [specs, setSpecs] = useState<Array<{ key: string; value: string }>>(() => {
    if (initialProduct?.specs) {
      return Object.entries(initialProduct.specs).map(([key, value]) => ({ key, value }));
    }
    return [
      { key: 'Material', value: '316L Surgical Grade Alloy' },
      { key: 'Origin', value: 'Geneva / London' },
      { key: 'Warranty', value: '2-Year Manufacturer' },
    ];
  });
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecVal, setNewSpecVal] = useState('');

  // 7. Colors & Sizes
  const [colors, setColors] = useState<ProductColor[]>(
    initialProduct?.colors || [
      { name: 'Onyx Black', hex: '#18181b' },
      { name: 'Imperial Gold', hex: '#d97706' },
      { name: 'Sterling Silver', hex: '#94a3b8' },
    ]
  );
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#d97706');

  const [sizes, setSizes] = useState<string[]>(
    initialProduct?.sizes || ['S', 'M', 'L', 'XL']
  );
  const [newSizeText, setNewSizeText] = useState('');

  // 8. Badges
  const [isFeatured, setIsFeatured] = useState<boolean>(initialProduct?.isFeatured || false);
  const [isBestSeller, setIsBestSeller] = useState<boolean>(initialProduct?.isBestSeller || false);
  const [isNewArrival, setIsNewArrival] = useState<boolean>(initialProduct?.isNewArrival ?? true);
  const [isTrending, setIsTrending] = useState<boolean>(initialProduct?.isTrending || false);

  // Tabs within modal
  const [activeFormTab, setActiveFormTab] = useState<'media' | 'pricing' | 'details' | 'specs'>('media');

  // Handle Photo File Upload (Local FileReader base64)
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const filesArray: File[] = Array.from(fileList);
    filesArray.forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (loadEv) => {
        if (loadEv.target?.result) {
          const base64Url = loadEv.target.result as string;
          setImages((prev) => [...prev, base64Url]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Handle Video File Upload (Local FileReader base64)
  const handleVideoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEv) => {
      if (loadEv.target?.result) {
        setVideoUrl(loadEv.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddImageUrl = () => {
    if (!newImageUrl.trim()) return;
    setImages((prev) => [...prev, newImageUrl.trim()]);
    setNewImageUrl('');
  };

  const handleRemoveImage = (index: number) => {
    if (images.length <= 1) return;
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSetPrimaryImage = (index: number) => {
    if (index === 0) return;
    const target = images[index];
    const rest = images.filter((_, i) => i !== index);
    setImages([target, ...rest]);
  };

  const handleAddFeature = () => {
    if (!newFeatureText.trim()) return;
    setFeatures((prev) => [...prev, newFeatureText.trim()]);
    setNewFeatureText('');
  };

  const handleRemoveFeature = (idx: number) => {
    setFeatures((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAddSpec = () => {
    if (!newSpecKey.trim() || !newSpecVal.trim()) return;
    setSpecs((prev) => [...prev, { key: newSpecKey.trim(), value: newSpecVal.trim() }]);
    setNewSpecKey('');
    setNewSpecVal('');
  };

  const handleRemoveSpec = (idx: number) => {
    setSpecs((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAddColor = () => {
    if (!newColorName.trim()) return;
    setColors((prev) => [...prev, { name: newColorName.trim(), hex: newColorHex }]);
    setNewColorName('');
  };

  const handleRemoveColor = (idx: number) => {
    setColors((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAddSize = () => {
    if (!newSizeText.trim()) return;
    setSizes((prev) => [...prev, newSizeText.trim().toUpperCase()]);
    setNewSizeText('');
  };

  const handleRemoveSize = (idx: number) => {
    setSizes((prev) => prev.filter((_, i) => i !== idx));
  };

  // Quick Price Discount Preset
  const applyDiscountPreset = (pct: number) => {
    const original = oldPrice || price;
    const discounted = Math.round(original * (1 - pct / 100));
    setOldPrice(original);
    setPrice(discounted);
    setDiscount(pct);
  };

  const clearDiscount = () => {
    if (oldPrice) {
      setPrice(oldPrice);
    }
    setOldPrice(undefined);
    setDiscount(undefined);
    setIsFlashSale(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const specsRecord: Record<string, string> = {};
    specs.forEach((s) => {
      if (s.key && s.value) {
        specsRecord[s.key] = s.value;
      }
    });

    const productPayload: any = {
      name: name.trim(),
      sku: sku.trim() || 'RB-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
      category,
      price: Number(price),
      oldPrice: oldPrice ? Number(oldPrice) : undefined,
      discount: discount ? Number(discount) : undefined,
      rating: initialProduct?.rating || 5.0,
      reviewsCount: initialProduct?.reviewsCount || 1,
      stock: Number(stock),
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop'],
      videoUrl: videoUrl.trim() || undefined,
      description: description.trim(),
      features: features.length > 0 ? features : ['Artisanal luxury craftsmanship'],
      specs: Object.keys(specsRecord).length > 0 ? specsRecord : { Origin: 'Imported', Quality: 'Masterpiece' },
      colors: colors.length > 0 ? colors : undefined,
      sizes: sizes.length > 0 ? sizes : undefined,
      tags: ['Luxury', category, isFlashSale ? 'Flash Sale' : 'Exclusive'],
      isFeatured,
      isBestSeller,
      isNewArrival,
      isTrending,
      isFlashSale,
      flashSaleEndsInSeconds: isFlashSale ? flashSaleHours * 3600 : undefined,
    };

    if (isEditing && initialProduct) {
      onSave({
        ...productPayload,
        id: initialProduct.id,
      });
    } else {
      onSave(productPayload);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto"
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <Crown size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                  REHMAN BAZAR SELLER STUDIO
                </span>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[9px] font-mono px-2 py-0.5 rounded-full">
                  {isEditing ? 'EDITING PRODUCT' : 'NEW LISTING'}
                </span>
              </div>
              <h2 className="text-lg font-black text-white font-serif-luxury truncate max-w-md">
                {isEditing ? `Edit: ${initialProduct?.name}` : 'Create & Publish New Product'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Nav Tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 pb-2 border-b border-stone-800 bg-stone-950/30 overflow-x-auto text-xs shrink-0">
          <button
            type="button"
            onClick={() => setActiveFormTab('media')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeFormTab === 'media'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <ImageIcon size={15} />
            <span>1. Photos & Video ({images.length} pics{videoUrl ? ' + 1 video' : ''})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFormTab('pricing')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeFormTab === 'pricing'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <DollarSign size={15} />
            <span>2. Daily Pricing & Deals</span>
            {discount && (
              <span className="bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md">
                {discount}% OFF
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveFormTab('details')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeFormTab === 'details'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Info size={15} />
            <span>3. Title, Story & Features</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveFormTab('specs')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeFormTab === 'specs'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <Palette size={15} />
            <span>4. Specs, Colors & Sizes</span>
          </button>
        </div>

        {/* Modal Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          
          {/* TAB 1: MEDIA (PICTURES + VIDEO) */}
          {activeFormTab === 'media' && (
            <div className="space-y-6">
              
              {/* Photo Upload Section */}
              <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <ImageIcon size={16} className="text-amber-400" />
                      Product Picture Gallery
                    </h4>
                    <p className="text-[11px] text-stone-400">
                      Upload high-res photos from your computer or paste image links. First image is the primary thumbnail.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageFileUpload}
                      accept="image/*"
                      multiple
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <Upload size={14} />
                      <span>Upload from Computer</span>
                    </button>
                  </div>
                </div>

                {/* Paste URL Input */}
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="Or paste direct image URL (https://...)"
                    className="flex-1 bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold rounded-xl cursor-pointer"
                  >
                    Add URL
                  </button>
                </div>

                {/* Images Preview Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 pt-2">
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative group rounded-xl overflow-hidden border border-stone-800 bg-stone-900 aspect-square"
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      
                      {idx === 0 && (
                        <span className="absolute top-1.5 left-1.5 bg-amber-500 text-stone-950 text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                          PRIMARY
                        </span>
                      )}

                      <div className="absolute inset-0 bg-stone-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-2">
                        {idx !== 0 && (
                          <button
                            type="button"
                            onClick={() => handleSetPrimaryImage(idx)}
                            className="px-2 py-1 bg-amber-500 text-stone-950 text-[10px] font-bold rounded shadow cursor-pointer"
                          >
                            Set Main
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          disabled={images.length <= 1}
                          className="px-2 py-1 bg-rose-500 text-white text-[10px] font-bold rounded shadow cursor-pointer disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Video Section */}
              <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Film size={16} className="text-amber-400" />
                      Product Demonstration Video
                    </h4>
                    <p className="text-[11px] text-stone-400">
                      Upload an MP4/WebM video or paste a video link (MP4 URL, YouTube, Vimeo, TikTok).
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      ref={videoFileInputRef}
                      onChange={handleVideoFileUpload}
                      accept="video/mp4,video/webm,video/quicktime"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => videoFileInputRef.current?.click()}
                      className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold rounded-xl flex items-center gap-1.5 cursor-pointer border border-stone-700"
                    >
                      <Upload size={14} />
                      <span>Upload Video File</span>
                    </button>
                  </div>
                </div>

                {/* Video URL Input */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="Enter Video Link (e.g. https://assets...mp4 or YouTube URL)"
                    className="flex-1 bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-amber-500"
                  />
                  {videoUrl && (
                    <button
                      type="button"
                      onClick={() => setVideoUrl('')}
                      className="px-3 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold rounded-xl cursor-pointer"
                    >
                      Clear Video
                    </button>
                  )}
                </div>

                {/* Live Video Preview Box */}
                {videoUrl ? (
                  <div className="mt-3 rounded-2xl overflow-hidden bg-stone-900 border border-amber-500/30 p-3 space-y-2">
                    <div className="flex items-center justify-between text-xs text-amber-400 font-bold">
                      <span className="flex items-center gap-1.5">
                        <Video size={14} /> Live Video Player Preview
                      </span>
                      <span className="text-[10px] text-stone-400">Ready to stream on product page</span>
                    </div>

                    <div className="relative rounded-xl overflow-hidden aspect-video bg-black max-h-56 mx-auto">
                      {videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') ? (
                        <iframe
                          src={videoUrl.replace('watch?v=', 'embed/')}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <video
                          src={videoUrl}
                          controls
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 border border-dashed border-stone-800 rounded-xl text-stone-500">
                    <Film size={24} className="mx-auto mb-1 opacity-50" />
                    <span>No video attached yet. Upload or paste a link above to show product video.</span>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: PRICING & DAY-BY-DAY DEALS */}
          {activeFormTab === 'pricing' && (
            <div className="space-y-6">
              
              {/* Daily Pricing Config */}
              <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <DollarSign size={16} className="text-amber-400" />
                    Day-by-Day Pricing & Discounts
                  </h4>
                  <p className="text-[11px] text-stone-400">
                    Easily update current selling price, original MSRP, and special discounts.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-stone-300 font-bold block mb-1">
                      Current Selling Price (USD) <span className="text-amber-400">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-stone-400 font-bold">$</span>
                      <input
                        type="number"
                        min="1"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl pl-7 pr-3.5 py-2.5 text-white font-mono font-bold text-sm focus:outline-none focus:border-amber-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-stone-300 font-bold block mb-1">
                      Original / List Price (USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-stone-400 font-bold">$</span>
                      <input
                        type="number"
                        min="1"
                        step="0.01"
                        value={oldPrice || ''}
                        placeholder="e.g. 350.00"
                        onChange={(e) => {
                          const oldP = Number(e.target.value);
                          const disc = oldP > price ? Math.round(((oldP - price) / oldP) * 100) : undefined;
                          setOldPrice(oldP || undefined);
                          setDiscount(disc);
                        }}
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl pl-7 pr-3.5 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-stone-300 font-bold block mb-1">
                      Discount Percentage
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="1"
                        max="99"
                        value={discount || ''}
                        placeholder="e.g. 20"
                        onChange={(e) => {
                          const disc = Number(e.target.value);
                          if (disc > 0 && price > 0) {
                            const calculatedOld = Math.round(price / (1 - disc / 100));
                            setOldPrice(calculatedOld);
                            setDiscount(disc);
                          } else {
                            setDiscount(undefined);
                          }
                        }}
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-amber-400 font-mono font-bold text-sm focus:outline-none focus:border-amber-500"
                      />
                      <span className="absolute right-3 top-2.5 text-stone-400 font-bold">%</span>
                    </div>
                  </div>
                </div>

                {/* Quick Sale Discount Presets */}
                <div className="pt-2">
                  <label className="text-stone-400 block mb-2 font-semibold">
                    ⚡ Quick 1-Click Discount Presets:
                  </label>
                  <div className="flex items-center gap-2 flex-wrap">
                    {[10, 15, 20, 25, 30, 40, 50, 60].map((pct) => (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => applyDiscountPreset(pct)}
                        className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-amber-500/20 hover:text-amber-300 border border-stone-800 text-stone-300 text-xs font-bold transition-all cursor-pointer"
                      >
                        {pct}% OFF
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={clearDiscount}
                      className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-bold border border-rose-500/30 transition-all cursor-pointer"
                    >
                      Reset to Regular Price
                    </button>
                  </div>
                </div>
              </div>

              {/* Flash Sale & Stock Management */}
              <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Flame size={16} className="text-rose-400" />
                  Flash Deals & Stock Units
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-stone-300 font-bold block mb-1">
                      Available Stock Inventory <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={stock}
                      onChange={(e) => setStock(Number(e.target.value))}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-stone-300 font-bold block mb-1">
                      Flash Sale Timer (Hours)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="168"
                      value={flashSaleHours}
                      onChange={(e) => setFlashSaleHours(Number(e.target.value))}
                      disabled={!isFlashSale}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-amber-500 disabled:opacity-40"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-800">
                  <label className="flex items-center gap-2.5 text-stone-200 font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFlashSale}
                      onChange={(e) => setIsFlashSale(e.target.checked)}
                      className="w-4 h-4 rounded accent-rose-500"
                    />
                    <span className="flex items-center gap-1.5 text-rose-400 font-bold">
                      <Flame size={14} /> Feature in 24-Hour Flash Sale Section
                    </span>
                  </label>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: TITLE, STORY & BULLET FEATURES */}
          {activeFormTab === 'details' && (
            <div className="space-y-6">
              
              <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-stone-300 font-bold block mb-1">
                      Product Title <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Royal Oxford Heritage Chronograph"
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-white font-semibold text-sm focus:outline-none focus:border-amber-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-stone-300 font-bold block mb-1">
                      SKU Code
                    </label>
                    <input
                      type="text"
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-amber-400 font-mono text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-stone-300 font-bold block mb-1">
                      Department / Category <span className="text-amber-400">*</span>
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-white capitalize text-xs focus:outline-none focus:border-amber-500"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-stone-300 font-bold block mb-1">
                      Merchandising Badges
                    </label>
                    <div className="flex items-center gap-3 pt-2 flex-wrap">
                      <label className="flex items-center gap-1.5 text-stone-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isFeatured}
                          onChange={(e) => setIsFeatured(e.target.checked)}
                          className="accent-amber-500"
                        />
                        <span>Featured</span>
                      </label>
                      <label className="flex items-center gap-1.5 text-stone-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isBestSeller}
                          onChange={(e) => setIsBestSeller(e.target.checked)}
                          className="accent-amber-500"
                        />
                        <span>Best Seller</span>
                      </label>
                      <label className="flex items-center gap-1.5 text-stone-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isNewArrival}
                          onChange={(e) => setIsNewArrival(e.target.checked)}
                          className="accent-amber-500"
                        />
                        <span>New Arrival</span>
                      </label>
                      <label className="flex items-center gap-1.5 text-stone-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isTrending}
                          onChange={(e) => setIsTrending(e.target.checked)}
                          className="accent-amber-500"
                        />
                        <span>Trending</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-stone-300 font-bold block mb-1">
                    Product Description / Artisan Story <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Detailed description of materials, heritage, build quality, and specifications..."
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-white text-xs leading-relaxed focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              {/* Bullet Features List */}
              <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-amber-400" />
                  Key Bullet Highlights & Features
                </h4>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newFeatureText}
                    onChange={(e) => setNewFeatureText(e.target.value)}
                    placeholder="e.g. Waterproof sapphire crystal glass up to 100m"
                    className="flex-1 bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2 text-white text-xs focus:outline-none focus:border-amber-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-4 py-2 bg-amber-500 text-stone-950 font-bold rounded-xl flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={14} /> Add Bullet
                  </button>
                </div>

                <div className="space-y-1.5 pt-2">
                  {features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-200"
                    >
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-amber-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="text-stone-500 hover:text-rose-400 p-1 cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: SPECS, COLORS & SIZES */}
          {activeFormTab === 'specs' && (
            <div className="space-y-6">
              
              {/* Technical Specifications */}
              <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers size={16} className="text-amber-400" />
                  Technical Specifications (Key & Value Table)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  <input
                    type="text"
                    value={newSpecKey}
                    onChange={(e) => setNewSpecKey(e.target.value)}
                    placeholder="Spec Name (e.g. Battery Life, Material)"
                    className="sm:col-span-2 bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white text-xs"
                  />
                  <input
                    type="text"
                    value={newSpecVal}
                    onChange={(e) => setNewSpecVal(e.target.value)}
                    placeholder="Value (e.g. 42 Hours ANC, 316L Steel)"
                    className="sm:col-span-2 bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddSpec}
                    className="px-3 py-2 bg-amber-500 text-stone-950 font-bold rounded-xl flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Plus size={14} /> Add Spec
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {specs.map((sp, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs"
                    >
                      <div>
                        <span className="text-stone-400 block text-[10px]">{sp.key}</span>
                        <span className="text-white font-semibold">{sp.value}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveSpec(idx)}
                        className="text-stone-500 hover:text-rose-400 p-1 cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Color Swatches */}
              <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Palette size={16} className="text-amber-400" />
                  Color Variants & Swatches
                </h4>

                <div className="flex items-center gap-2 flex-wrap">
                  <input
                    type="text"
                    value={newColorName}
                    onChange={(e) => setNewColorName(e.target.value)}
                    placeholder="Color Name (e.g. Midnight Navy)"
                    className="bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white text-xs flex-1 min-w-[150px]"
                  />
                  <input
                    type="color"
                    value={newColorHex}
                    onChange={(e) => setNewColorHex(e.target.value)}
                    className="w-10 h-9 bg-transparent border-0 rounded cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={handleAddColor}
                    className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold rounded-xl cursor-pointer"
                  >
                    + Add Color
                  </button>
                </div>

                <div className="flex items-center gap-2 flex-wrap pt-2">
                  {colors.map((col, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs"
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-stone-600 shadow-inner shrink-0"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span className="text-stone-200 font-medium">{col.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveColor(idx)}
                        className="text-stone-500 hover:text-rose-400 ml-1 cursor-pointer"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sizes Available */}
              <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Tag size={16} className="text-amber-400" />
                  Sizes / Dimensions
                </h4>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newSizeText}
                    onChange={(e) => setNewSizeText(e.target.value)}
                    placeholder="e.g. S, M, L, XL or US 10.5"
                    className="bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-white text-xs max-w-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddSize}
                    className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold rounded-xl cursor-pointer"
                  >
                    + Add Size
                  </button>
                </div>

                <div className="flex items-center gap-2 flex-wrap pt-2">
                  {sizes.map((sz, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-stone-900 border border-stone-800 text-xs font-bold text-amber-400"
                    >
                      <span>{sz}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSize(idx)}
                        className="text-stone-500 hover:text-rose-400 ml-1 cursor-pointer"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Modal Footer Controls */}
          <div className="pt-4 border-t border-stone-800 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="px-8 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black shadow-xl shadow-amber-500/25 flex items-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles size={16} />
                <span>{isEditing ? 'Save Product Changes' : 'Publish Product to Live Store'}</span>
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  DollarSign,
  Package,
  ShoppingBag,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  Truck,
  Sparkles,
  Search,
  Filter,
  X,
  Lock,
  Crown,
  ShieldCheck,
  ArrowRight,
  LogIn,
  Copy,
  Film,
  Video,
  Eye,
  Percent,
  Check,
  Flame,
  Layers,
  RotateCcw,
} from 'lucide-react';
import { useStore, STORE_OWNER_ACCOUNT } from '../../context/StoreContext';
import { Product } from '../../types';
import { ProductListingModal } from './ProductListingModal';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    categories,
    orders,
    user,
    isStoreOwner,
    formatPrice,
    updateProduct,
    addProduct,
    deleteProduct,
    duplicateProduct,
    resetProductsToDefault,
    quickLoginAsOwner,
    updateOrderStatus,
    showToast,
    setCurrentView,
    viewProductDetail,
    setIsAuthModalOpen,
    setAuthModalMode,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'products' | 'daily-pricing' | 'orders'>('products');
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  
  // Listing & Edit Modals
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);
  const [selectedVideoPreview, setSelectedVideoPreview] = useState<string | null>(null);

  // Fast Inline Day-by-Day Price Editor State
  const [inlinePrices, setInlinePrices] = useState<Record<string, number>>({});
  const [inlineOldPrices, setInlineOldPrices] = useState<Record<string, number | undefined>>({});
  const [inlineStocks, setInlineStocks] = useState<Record<string, number>>({});
  const [savedRowIds, setSavedRowIds] = useState<Record<string, boolean>>({});

  // KPIs
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 8490);
  const videoProductsCount = products.filter((p) => !!p.videoUrl).length;

  const filteredAdminProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCat =
      selectedCategoryFilter === 'all' || p.category === selectedCategoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleSaveListing = (productData: any) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      setEditingProduct(null);
    } else {
      addProduct(productData);
    }
  };

  const handleInlinePriceChange = (id: string, newPrice: number) => {
    setInlinePrices((prev) => ({ ...prev, [id]: newPrice }));
  };

  const handleInlineOldPriceChange = (id: string, newOldPrice: number) => {
    setInlineOldPrices((prev) => ({ ...prev, [id]: newOldPrice }));
  };

  const handleInlineStockChange = (id: string, newStock: number) => {
    setInlineStocks((prev) => ({ ...prev, [id]: newStock }));
  };

  const handleSaveInlineChanges = (p: Product) => {
    const newPrice = inlinePrices[p.id] !== undefined ? inlinePrices[p.id] : p.price;
    const newOldPrice = inlineOldPrices[p.id] !== undefined ? inlineOldPrices[p.id] : p.oldPrice;
    const newStock = inlineStocks[p.id] !== undefined ? inlineStocks[p.id] : p.stock;

    let newDiscount = p.discount;
    if (newOldPrice && newOldPrice > newPrice) {
      newDiscount = Math.round(((newOldPrice - newPrice) / newOldPrice) * 100);
    } else if (!newOldPrice) {
      newDiscount = undefined;
    }

    const success = updateProduct(p.id, {
      price: Number(newPrice),
      oldPrice: newOldPrice ? Number(newOldPrice) : undefined,
      discount: newDiscount,
      stock: Number(newStock),
    });

    if (success) {
      setSavedRowIds((prev) => ({ ...prev, [p.id]: true }));
      setTimeout(() => {
        setSavedRowIds((prev) => ({ ...prev, [p.id]: false }));
      }, 2000);
    }
  };

  // IF NOT AUTHENTICATED AS STORE OWNER / ADMIN, SHOW EASY OWNER LOGIN SCREEN
  if (!user || user.role !== 'admin') {
    return (
      <div className="bg-stone-950 min-h-screen py-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-stone-900 border border-stone-800 rounded-3xl p-8 text-center shadow-2xl space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
            <Crown size={28} />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full">
              STORE OWNER ACCESS
            </span>
            <h2 className="text-2xl font-black text-white font-serif-luxury pt-2">
              Malik Rehman Seller Studio
            </h2>
            <p className="text-xs text-stone-400 leading-relaxed">
              Sign in as Store Owner to manage catalog listings, upload high-res product photos & videos, and update day-by-day pricing.
            </p>
          </div>

          <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 text-left space-y-2">
            <div className="text-[11px] font-bold text-stone-300 flex items-center gap-1.5">
              <Crown size={14} className="text-amber-400" />
              <span>Store Owner Account</span>
            </div>
            <div className="text-xs text-amber-400 font-mono font-semibold">
              malikrahman9993@gmail.com
            </div>
            <div className="text-[10px] text-stone-500">
              Role: Master Catalog Director & Administrator
            </div>
          </div>

          <div className="space-y-2 pt-2">
            {/* 1-Click Instant Owner Login */}
            <button
              id="quick-owner-login-btn"
              onClick={quickLoginAsOwner}
              className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black rounded-2xl text-xs transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles size={16} />
              <span>1-Click Owner Access (Malik Rehman)</span>
            </button>

            <button
              onClick={() => {
                setAuthModalMode('login');
                setIsAuthModalOpen(true);
              }}
              className="w-full py-3 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded-2xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Enter Password Manually
            </button>

            <button
              onClick={() => setCurrentView('home')}
              className="w-full py-2.5 text-stone-500 hover:text-stone-300 rounded-2xl text-xs font-medium transition-colors cursor-pointer"
            >
              ← Return to Customer Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-950 min-h-screen pb-24 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Admin Top Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-900 to-amber-950/40 border border-stone-800 shadow-xl">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
              <Crown size={15} />
              <span>REHMAN BAZAR DIRECTOR & LISTING STUDIO</span>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[9px] px-2.5 py-0.5 rounded-full font-mono">
                OWNER: MALIK REHMAN
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-serif-luxury">
              Product Listing & Daily Price Studio
            </h1>
            <p className="text-xs text-stone-400">
              Publish new items, upload product photos & video demonstrations, and adjust day-to-day sale prices live.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => setCurrentView('shop')}
              className="px-4 py-2.5 bg-stone-950 hover:bg-stone-800 text-stone-300 rounded-xl text-xs font-semibold border border-stone-800 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Eye size={14} />
              <span>Live Storefront</span>
            </button>

            <button
              id="admin-create-listing-btn"
              onClick={() => {
                setEditingProduct(null);
                setIsListingModalOpen(true);
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black rounded-xl text-xs transition-all shadow-lg shadow-amber-500/25 flex items-center gap-2 cursor-pointer"
            >
              <Plus size={16} />
              <span>+ List New Product</span>
            </button>
          </div>
        </div>

        {/* Store KPIs Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-3xl bg-stone-900 border border-stone-800 shadow-xl space-y-1.5">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span>Catalog SKUs</span>
              <Package size={16} className="text-amber-400" />
            </div>
            <div className="text-2xl font-black text-white font-serif-luxury">
              {products.length} Products
            </div>
            <div className="text-[11px] text-amber-400 font-semibold">
              Live & Editable 24/7
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-stone-900 border border-stone-800 shadow-xl space-y-1.5">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span>Video Demos</span>
              <Film size={16} className="text-amber-400" />
            </div>
            <div className="text-2xl font-black text-white font-serif-luxury">
              {videoProductsCount} Active
            </div>
            <div className="text-[11px] text-emerald-400 font-semibold">
              With Interactive Video Player
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-stone-900 border border-stone-800 shadow-xl space-y-1.5">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span>Total Orders</span>
              <ShoppingBag size={16} className="text-amber-400" />
            </div>
            <div className="text-2xl font-black text-white font-serif-luxury">
              {orders.length + 142}
            </div>
            <div className="text-[11px] text-emerald-400">
              98.6% On-time dispatch
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-stone-900 border border-stone-800 shadow-xl space-y-1.5">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span>Gross Sales (USD)</span>
              <DollarSign size={16} className="text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-400 font-serif-luxury">
              {formatPrice(totalRevenue)}
            </div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1">
              <TrendingUp size={12} /> +18.4% this month
            </div>
          </div>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-3 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-white hover:bg-stone-900'
              }`}
            >
              Product Catalog & Media ({products.length})
            </button>

            <button
              onClick={() => setActiveTab('daily-pricing')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'daily-pricing'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-white hover:bg-stone-900'
              }`}
            >
              <DollarSign size={14} />
              <span>⚡ Fast Daily Price Changer</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-white hover:bg-stone-900'
              }`}
            >
              Customer Orders ({orders.length})
            </button>
          </div>

          <button
            onClick={() => {
              if (confirm('Restore original sample catalog? Any custom products will be reset.')) {
                resetProductsToDefault();
              }
            }}
            className="text-[11px] text-stone-500 hover:text-stone-400 flex items-center gap-1 cursor-pointer"
            title="Reset to default luxury catalog"
          >
            <RotateCcw size={12} /> Reset Catalog
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-stone-900 p-3.5 rounded-2xl border border-stone-800">
          <div className="flex items-center gap-3 bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 w-full sm:max-w-md">
            <Search size={15} className="text-stone-500" />
            <input
              type="text"
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
              placeholder="Search by title, SKU, department, or keywords..."
              className="w-full bg-transparent text-xs text-white focus:outline-none placeholder:text-stone-500"
            />
            {productSearch && (
              <button onClick={() => setProductSearch('')} className="text-stone-500 hover:text-white">
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            <span className="text-[11px] text-stone-400 font-semibold whitespace-nowrap">Filter Dept:</span>
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white capitalize focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Departments ({products.length})</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* TAB 1: PRODUCT CATALOG & MEDIA MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="rounded-3xl bg-stone-900 border border-stone-800 overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-950/90 text-stone-400 uppercase tracking-wider font-semibold border-b border-stone-800">
                    <tr>
                      <th className="p-4">Product & Media</th>
                      <th className="p-4">SKU</th>
                      <th className="p-4">Department</th>
                      <th className="p-4">Price & Deal</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4">Video Demo</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800 text-stone-200">
                    {filteredAdminProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-stone-800/40 transition-colors">
                        {/* Product Title and Thumbnail */}
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-950 shrink-0 border border-stone-800">
                              <img
                                src={p.images[0]}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                              {p.images.length > 1 && (
                                <span className="absolute bottom-0.5 right-0.5 bg-black/80 text-[8px] font-mono px-1 rounded text-stone-300">
                                  +{p.images.length - 1}
                                </span>
                              )}
                            </div>

                            <div className="max-w-[220px]">
                              <button
                                onClick={() => viewProductDetail(p.id)}
                                className="font-bold text-white block truncate text-left hover:text-amber-400 transition-colors cursor-pointer"
                              >
                                {p.name}
                              </button>
                              <div className="flex items-center gap-2 text-[10px] text-stone-400 mt-0.5">
                                <span>{p.rating}★ ({p.reviewsCount} reviews)</span>
                                {p.isFeatured && (
                                  <span className="bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-semibold">
                                    Featured
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* SKU */}
                        <td className="p-4 font-mono text-stone-400">{p.sku}</td>

                        {/* Category */}
                        <td className="p-4 capitalize text-amber-400 font-semibold">{p.category}</td>

                        {/* Price */}
                        <td className="p-4">
                          <div className="font-bold text-white font-mono text-sm">{formatPrice(p.price)}</div>
                          {p.oldPrice && (
                            <div className="text-[10px] text-stone-400 line-through font-mono">
                              {formatPrice(p.oldPrice)}
                            </div>
                          )}
                          {p.discount && (
                            <span className="text-[9px] bg-rose-500/20 text-rose-300 font-bold px-1.5 py-0.2 rounded border border-rose-500/30">
                              {p.discount}% OFF
                            </span>
                          )}
                        </td>

                        {/* Stock */}
                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                              p.stock > 10
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : p.stock > 0
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            }`}
                          >
                            {p.stock} in stock
                          </span>
                        </td>

                        {/* Video Status */}
                        <td className="p-4">
                          {p.videoUrl ? (
                            <button
                              onClick={() => setSelectedVideoPreview(p.videoUrl!)}
                              className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[11px] font-bold flex items-center gap-1.5 cursor-pointer"
                            >
                              <Video size={13} />
                              <span>Play Video</span>
                            </button>
                          ) : (
                            <span className="text-[10px] text-stone-500 italic">No video</span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setEditingProduct(p);
                                setIsListingModalOpen(true);
                              }}
                              className="p-2 rounded-xl bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-300 transition-colors cursor-pointer"
                              title="Edit product details, photos, video & pricing"
                            >
                              <Edit size={14} />
                            </button>

                            <button
                              onClick={() => duplicateProduct(p.id)}
                              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
                              title="Duplicate / Clone product"
                            >
                              <Copy size={14} />
                            </button>

                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete "${p.name}" from the store?`)) {
                                  deleteProduct(p.id);
                                }
                              }}
                              className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                              title="Delete product"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FAST DAY-BY-DAY INLINE PRICE CHANGER */}
        {activeTab === 'daily-pricing' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={16} />
                <span>
                  <strong>Fast Daily Price Changer:</strong> Edit sale prices, list prices, and stock units directly in the table below. Click <strong>"Update"</strong> on any row to publish live immediately.
                </span>
              </div>
            </div>

            <div className="rounded-3xl bg-stone-900 border border-stone-800 overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-950/90 text-stone-400 uppercase tracking-wider font-semibold border-b border-stone-800">
                    <tr>
                      <th className="p-4">Product</th>
                      <th className="p-4">Daily Sale Price ($ USD)</th>
                      <th className="p-4">Compare MSRP ($ USD)</th>
                      <th className="p-4">Stock Units</th>
                      <th className="p-4">Quick Deal Presets</th>
                      <th className="p-4 text-right">Save Update</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800 text-stone-200">
                    {filteredAdminProducts.map((p) => {
                      const currentPrice = inlinePrices[p.id] !== undefined ? inlinePrices[p.id] : p.price;
                      const currentOldPrice = inlineOldPrices[p.id] !== undefined ? inlineOldPrices[p.id] : p.oldPrice;
                      const currentStock = inlineStocks[p.id] !== undefined ? inlineStocks[p.id] : p.stock;
                      const isSaved = savedRowIds[p.id];

                      return (
                        <tr key={p.id} className="hover:bg-stone-800/40 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={p.images[0]}
                                alt=""
                                className="w-10 h-10 rounded-lg object-cover bg-stone-950 shrink-0"
                              />
                              <div className="max-w-[200px] truncate">
                                <span className="font-bold text-white block truncate">{p.name}</span>
                                <span className="text-[10px] text-stone-400 font-mono">{p.sku}</span>
                              </div>
                            </div>
                          </td>

                          {/* Inline Sale Price Input */}
                          <td className="p-4">
                            <div className="relative max-w-[130px]">
                              <span className="absolute left-2.5 top-2 text-stone-400 font-bold">$</span>
                              <input
                                type="number"
                                min="1"
                                step="0.01"
                                value={currentPrice}
                                onChange={(e) => handleInlinePriceChange(p.id, Number(e.target.value))}
                                className="w-full bg-stone-950 border border-stone-700 rounded-xl pl-6 pr-2 py-1.5 text-white font-mono font-bold text-xs focus:outline-none focus:border-amber-500"
                              />
                            </div>
                          </td>

                          {/* Inline Old Price Input */}
                          <td className="p-4">
                            <div className="relative max-w-[130px]">
                              <span className="absolute left-2.5 top-2 text-stone-400 font-bold">$</span>
                              <input
                                type="number"
                                min="1"
                                step="0.01"
                                value={currentOldPrice || ''}
                                placeholder="None"
                                onChange={(e) => handleInlineOldPriceChange(p.id, Number(e.target.value))}
                                className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-6 pr-2 py-1.5 text-stone-300 font-mono text-xs focus:outline-none focus:border-amber-500"
                              />
                            </div>
                          </td>

                          {/* Inline Stock Input */}
                          <td className="p-4">
                            <input
                              type="number"
                              min="0"
                              value={currentStock}
                              onChange={(e) => handleInlineStockChange(p.id, Number(e.target.value))}
                              className="w-20 bg-stone-950 border border-stone-800 rounded-xl px-2.5 py-1.5 text-white font-mono text-xs focus:outline-none focus:border-amber-500"
                            />
                          </td>

                          {/* Quick Discount Presets */}
                          <td className="p-4">
                            <div className="flex items-center gap-1 flex-wrap">
                              {[15, 25, 35, 50].map((pct) => (
                                <button
                                  key={pct}
                                  type="button"
                                  onClick={() => {
                                    const base = currentOldPrice || currentPrice;
                                    const discounted = Math.round(base * (1 - pct / 100));
                                    handleInlineOldPriceChange(p.id, base);
                                    handleInlinePriceChange(p.id, discounted);
                                  }}
                                  className="px-2 py-1 rounded bg-stone-950 hover:bg-amber-500/20 text-stone-300 hover:text-amber-300 text-[10px] font-bold border border-stone-800 cursor-pointer"
                                >
                                  -{pct}%
                                </button>
                              ))}
                            </div>
                          </td>

                          {/* Save Inline Button */}
                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleSaveInlineChanges(p)}
                              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ml-auto cursor-pointer ${
                                isSaved
                                  ? 'bg-emerald-500 text-stone-950 font-black'
                                  : 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md'
                              }`}
                            >
                              {isSaved ? (
                                <>
                                  <Check size={14} />
                                  <span>Saved!</span>
                                </>
                              ) : (
                                <span>Update Price</span>
                              )}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOMER ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="rounded-3xl bg-stone-900 border border-stone-800 overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-950/90 text-stone-400 uppercase tracking-wider font-semibold border-b border-stone-800">
                    <tr>
                      <th className="p-4">Order #</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Items</th>
                      <th className="p-4">Total Amount</th>
                      <th className="p-4">Tracking Number</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Update Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800 text-stone-200">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-stone-800/40 transition-colors">
                        <td className="p-4 font-mono font-bold text-amber-400">{o.orderNumber}</td>
                        <td className="p-4">
                          <div className="font-semibold text-white">
                            {o.shippingAddress.firstName} {o.shippingAddress.lastName}
                          </div>
                          <div className="text-[10px] text-stone-400">
                            {o.shippingAddress.city}, {o.shippingAddress.country}
                          </div>
                        </td>
                        <td className="p-4 text-stone-300">
                          {o.items.reduce((s, i) => s + i.quantity, 0)} units
                        </td>
                        <td className="p-4 font-bold text-white font-mono">{formatPrice(o.total)}</td>
                        <td className="p-4 font-mono text-stone-400">{o.trackingNumber}</td>
                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold capitalize border ${
                              o.status === 'delivered'
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                : o.status === 'shipped'
                                ? 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            }`}
                          >
                            {o.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <select
                            value={o.status}
                            onChange={(e) => updateOrderStatus(o.id, e.target.value as any)}
                            className="bg-stone-950 border border-stone-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-amber-500"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Product Listing / Edit Modal */}
      {isListingModalOpen && (
        <ProductListingModal
          isOpen={isListingModalOpen}
          onClose={() => {
            setIsListingModalOpen(false);
            setEditingProduct(null);
          }}
          initialProduct={editingProduct}
          onSave={handleSaveListing}
        />
      )}

      {/* Video Preview Modal */}
      <AnimatePresence>
        {selectedVideoPreview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-stone-900 border border-stone-800 rounded-3xl p-6 max-w-2xl w-full space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Film size={16} className="text-amber-400" />
                  Product Video Playback Preview
                </h3>
                <button
                  onClick={() => setSelectedVideoPreview(null)}
                  className="text-stone-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="rounded-2xl overflow-hidden aspect-video bg-black max-h-80 mx-auto">
                {selectedVideoPreview.includes('youtube.com') || selectedVideoPreview.includes('youtu.be') ? (
                  <iframe
                    src={selectedVideoPreview.replace('watch?v=', 'embed/')}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={selectedVideoPreview}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

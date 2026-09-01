import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Heart,
  ShoppingBag,
  User as UserIcon,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Flame,
  ShieldCheck,
  Package,
  SlidersHorizontal,
  LogOut,
  LogIn,
  LayoutDashboard,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Logo } from '../common/Logo';
import { ThemeToggle } from '../common/ThemeToggle';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartTotalCount,
    setIsCartOpen,
    wishlist,
    currency,
    currencyConfig,
    setCurrency,
    user,
    logout,
    setIsAuthModalOpen,
    setAuthModalMode,
    setIsSearchModalOpen,
    setSelectedCategoryFilter,
    categories,
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isCategoriesHovered, setIsCategoriesHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', view: 'home' },
    { name: 'Shop', view: 'shop' },
    { name: 'Categories', isDropdown: true },
    { name: 'Deals & Flash Sale', view: 'deals', badge: 'HOT', icon: Flame },
    { name: 'Seller Studio', view: 'admin', badge: 'LIST', icon: LayoutDashboard },
  ];

  const handleNavClick = (viewName?: string) => {
    if (viewName === 'new-arrivals') {
      setSelectedCategoryFilter('');
      setCurrentView('shop');
    } else if (viewName) {
      setCurrentView(viewName);
    }
    setIsMobileMenuOpen(false);
    setIsCategoriesHovered(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategorySelect = (slug: string) => {
    setSelectedCategoryFilter(slug);
    setCurrentView('shop');
    setIsCategoriesHovered(false);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-stone-950/90 backdrop-blur-xl border-b border-stone-800 shadow-xl shadow-stone-950/40'
          : 'bg-stone-950/70 backdrop-blur-md border-b border-stone-800/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* 1. Mobile Menu Button & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-stone-300 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div onClick={() => handleNavClick('home')}>
              <Logo size="md" showTagline={true} />
            </div>
          </div>

          {/* 2. Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              if (link.isDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setIsCategoriesHovered(true)}
                    onMouseLeave={() => setIsCategoriesHovered(false)}
                  >
                    <button
                      onClick={() => handleNavClick('shop')}
                      className="px-3.5 py-2 text-sm font-medium text-stone-300 hover:text-white transition-colors rounded-lg flex items-center gap-1.5 hover:bg-stone-900"
                    >
                      {link.name}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          isCategoriesHovered ? 'rotate-180 text-amber-400' : 'text-stone-400'
                        }`}
                      />
                    </button>

                    {/* Mega Categories Dropdown */}
                    <AnimatePresence>
                      {isCategoriesHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.18 }}
                          className="absolute top-full left-0 w-[580px] bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl p-4 grid grid-cols-2 gap-2 mt-1 z-50 backdrop-blur-2xl"
                        >
                          {categories.map((cat) => (
                            <button
                              key={cat.id}
                              onClick={() => handleCategorySelect(cat.slug)}
                              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-stone-800 transition-colors text-left group"
                            >
                              <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-11 h-11 rounded-lg object-cover group-hover:scale-105 transition-transform"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-xs font-semibold text-stone-100 group-hover:text-amber-400 truncate">
                                    {cat.name}
                                  </h4>
                                  {cat.badge && (
                                    <span className="text-[9px] uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded font-bold">
                                      {cat.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">
                                  {cat.description}
                                </p>
                              </div>
                            </button>
                          ))}
                          <div className="col-span-2 pt-2 border-t border-stone-800/80 flex items-center justify-between px-2">
                            <span className="text-xs text-stone-400">
                              Premium departments curated for US &amp; UK
                            </span>
                            <button
                              onClick={() => handleNavClick('shop')}
                              className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                            >
                              View All Collections &rarr;
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              const isActive = currentView === link.view;
              const LinkIcon = link.icon;

              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.view)}
                  className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'text-amber-400 bg-amber-500/10 font-semibold'
                      : 'text-stone-300 hover:text-white hover:bg-stone-900'
                  }`}
                >
                  {LinkIcon && <LinkIcon size={14} className="text-rose-400 animate-pulse" />}
                  {link.name}
                  {link.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full border ${
                        link.badge === 'HOT'
                          ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-amber-400 rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* 3. Action Controls (Search, Currency Switcher, Wishlist, Cart, User) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search Trigger */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSearchModalOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/40 text-stone-400 hover:text-stone-200 transition-all text-xs font-medium cursor-pointer"
              title="Search products (CMD+K / Click)"
            >
              <Search size={16} className="text-amber-400" />
              <span className="hidden md:inline">Search store...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 bg-stone-950 text-[10px] text-stone-400 rounded border border-stone-800 font-mono">
                ⌘K
              </kbd>
            </motion.button>

            {/* Currency & Region Selector (USA 🇺🇸 / UK 🇬🇧) */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/40 text-xs text-stone-200 font-semibold transition-colors cursor-pointer"
                title="Select country & currency"
              >
                <span className="text-base leading-none">{currencyConfig.flag}</span>
                <span className="hidden sm:inline">{currency}</span>
                <span>({currencyConfig.symbol})</span>
                <ChevronDown size={12} className="text-stone-400" />
              </motion.button>

              <AnimatePresence>
                {isCurrencyDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-52 bg-stone-900 border border-stone-800 rounded-xl shadow-2xl p-2 z-50 backdrop-blur-xl"
                  >
                    <div className="text-[10px] uppercase font-bold tracking-wider text-stone-400 px-2 py-1 mb-1">
                      Select Market Region
                    </div>
                    <button
                      onClick={() => {
                        setCurrency('USD');
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                        currency === 'USD'
                          ? 'bg-amber-500/10 text-amber-300 font-bold border border-amber-500/30'
                          : 'text-stone-300 hover:bg-stone-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">🇺🇸</span>
                        <span>United States (USD $)</span>
                      </div>
                      {currency === 'USD' && <span className="text-amber-400">✓</span>}
                    </button>

                    <button
                      onClick={() => {
                        setCurrency('GBP');
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs mt-1 transition-colors cursor-pointer ${
                        currency === 'GBP'
                          ? 'bg-amber-500/10 text-amber-300 font-bold border border-amber-500/30'
                          : 'text-stone-300 hover:bg-stone-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">🇬🇧</span>
                        <span>United Kingdom (GBP £)</span>
                      </div>
                      {currency === 'GBP' && <span className="text-amber-400">✓</span>}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Celestial Day/Night Theme Toggle Switch */}
            <div className="hidden sm:flex items-center">
              <ThemeToggle />
            </div>

            {/* Wishlist Button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => {
                if (wishlist.length === 0) {
                  setCurrentView('shop');
                } else {
                  setCurrentView('account');
                }
              }}
              className="relative p-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/40 text-stone-300 hover:text-amber-400 transition-colors cursor-pointer"
              title="Saved Wishlist"
            >
              <Heart size={18} className={wishlist.length > 0 ? 'text-rose-400 fill-rose-400/20' : ''} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-lg">
                  {wishlist.length}
                </span>
              )}
            </motion.button>

            {/* Cart Bag Button (with Bounce) */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-stone-950 font-extrabold hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all text-xs cursor-pointer"
              title="View Shopping Cart"
            >
              <ShoppingBag size={18} />
              <span className="hidden sm:inline">Bag</span>
              <span className="bg-stone-950 text-amber-400 px-1.5 py-0.5 rounded-md text-[11px] font-extrabold min-w-[20px] text-center shadow-inner">
                {cartTotalCount}
              </span>
            </motion.button>

            {/* User Account / Real Login Button */}
            {user ? (
              <div className="relative">
                <motion.button
                  id="nav-user-account-btn"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/40 text-stone-200 transition-all text-xs font-semibold cursor-pointer"
                  title="My Account Menu"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-6 h-6 rounded-full object-cover border border-amber-500/50"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 font-black text-xs flex items-center justify-center">
                      {user.name.charAt(0)}
                    </div>
                  )}
                  <span className="hidden md:inline max-w-[100px] truncate text-stone-200">
                    {user.name.split(' ')[0]}
                  </span>
                  {user.role === 'admin' && (
                    <span className="hidden xl:inline text-[9px] uppercase font-black bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.5 rounded">
                      Owner
                    </span>
                  )}
                  <ChevronDown size={12} className="text-stone-400" />
                </motion.button>

                <AnimatePresence>
                  {isUserDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 5 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-64 bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl p-2 z-50 backdrop-blur-xl"
                    >
                      <div className="p-3 border-b border-stone-800/80 mb-1">
                        <div className="flex items-center gap-2.5">
                          {user.avatar ? (
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-9 h-9 rounded-full object-cover border border-amber-500/50"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-amber-500 text-stone-950 font-bold flex items-center justify-center text-sm">
                              {user.name.charAt(0)}
                            </div>
                          )}
                          <div className="overflow-hidden">
                            <p className="text-xs font-bold text-white truncate">{user.name}</p>
                            <p className="text-[11px] text-stone-400 truncate">{user.email}</p>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center gap-1.5">
                          <span
                            className={`text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full border ${
                              user.role === 'admin'
                                ? 'bg-amber-500 text-stone-950 border-amber-400 font-black'
                                : 'bg-stone-800 text-stone-300 border-stone-700'
                            }`}
                          >
                            {user.role === 'admin' ? '⚡ STORE OWNER & ADMIN' : '⭐ VIP PATRON'}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setCurrentView('account');
                          setIsUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-stone-300 hover:text-white hover:bg-stone-800 transition-colors text-left"
                      >
                        <UserIcon size={14} className="text-amber-400" />
                        <span>My Profile &amp; Addresses</span>
                      </button>

                      <button
                        onClick={() => {
                          setCurrentView('account');
                          setIsUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-stone-300 hover:text-white hover:bg-stone-800 transition-colors text-left"
                      >
                        <Package size={14} className="text-sky-400" />
                        <span>Track My Orders</span>
                      </button>

                      {/* Store Owner Management Suite - ONLY visible to verified Owner/Admin */}
                      {user.role === 'admin' && (
                        <button
                          id="nav-owner-dashboard-btn"
                          onClick={() => {
                            setCurrentView('admin');
                            setIsUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-colors text-left font-bold my-1"
                        >
                          <LayoutDashboard size={14} className="text-amber-400" />
                          <span>Store Owner Dashboard &amp; Edit</span>
                        </button>
                      )}

                      <div className="pt-1 mt-1 border-t border-stone-800/80">
                        <button
                          onClick={() => {
                            logout();
                            setIsUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-rose-400 hover:bg-rose-500/10 transition-colors text-left font-medium"
                        >
                          <LogOut size={14} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* REAL PROMINENT LOGIN BUTTON FOR VISITORS */
              <div className="flex items-center gap-1.5">
                <motion.button
                  id="nav-login-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setAuthModalMode('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-stone-900 to-stone-800 hover:from-stone-800 hover:to-stone-700 text-stone-100 font-bold border border-amber-500/40 text-xs transition-all shadow-md hover:border-amber-400 group cursor-pointer"
                  title="Sign In or Register"
                >
                  <LogIn size={15} className="text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>Login</span>
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Slide-Out Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-stone-800 bg-stone-950/98 backdrop-blur-2xl px-4 py-6 space-y-4 max-h-[80vh] overflow-y-auto"
          >
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleNavClick('home')}
                className="p-3 bg-stone-900 rounded-xl text-left font-semibold text-sm text-stone-200 hover:text-amber-400"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('shop')}
                className="p-3 bg-stone-900 rounded-xl text-left font-semibold text-sm text-stone-200 hover:text-amber-400"
              >
                All Products
              </button>
              <button
                onClick={() => handleNavClick('deals')}
                className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-left font-semibold text-sm text-amber-400 flex items-center gap-1.5"
              >
                <Flame size={16} /> Deals &amp; Flash
              </button>
              {user?.role === 'admin' ? (
                <button
                  onClick={() => handleNavClick('admin')}
                  className="p-3 bg-amber-500/20 border border-amber-500/40 rounded-xl text-left font-bold text-sm text-amber-300 flex items-center gap-1.5"
                >
                  <LayoutDashboard size={16} /> Owner Portal
                </button>
              ) : user ? (
                <button
                  onClick={() => handleNavClick('account')}
                  className="p-3 bg-stone-900 rounded-xl text-left font-semibold text-sm text-stone-200 hover:text-amber-400 flex items-center gap-1.5"
                >
                  <UserIcon size={16} /> My Account
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setAuthModalMode('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="p-3 bg-stone-900 rounded-xl text-left font-semibold text-sm text-amber-400 flex items-center gap-1.5 border border-stone-800"
                >
                  <LogIn size={16} /> Sign In
                </button>
              )}
            </div>

            {/* Theme Toggle in Mobile Menu */}
            <div className="flex items-center justify-between p-3 bg-stone-900/80 rounded-xl border border-stone-800">
              <span className="text-xs font-semibold text-stone-200">Store Atmosphere / Theme</span>
              <ThemeToggle showLabel={true} />
            </div>

            {/* Categories Grid Mobile */}
            <div>
              <h4 className="text-xs uppercase font-bold tracking-wider text-stone-400 mb-2">
                Departments
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.slug)}
                    className="flex items-center gap-2 p-2 rounded-lg bg-stone-900/60 hover:bg-stone-800 text-left text-xs text-stone-300"
                  >
                    <img src={cat.image} alt={cat.name} className="w-7 h-7 rounded object-cover" />
                    <span className="truncate">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Fast login prompt if not authenticated */}
            {!user && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="w-full py-3 bg-amber-500 text-stone-950 font-bold rounded-xl text-sm"
              >
                Sign In or Create Account
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

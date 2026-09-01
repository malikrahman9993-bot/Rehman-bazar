import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  CartItem,
  User,
  Order,
  OrderStatus,
  CurrencyCode,
  CurrencyConfig,
  ShippingMethod,
  Coupon,
  ToastMessage,
  ProductColor
} from '../types';
import { SAMPLE_PRODUCTS, AVAILABLE_COUPONS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { CURRENCY_MAP, SHIPPING_METHODS } from '../data/config';

interface StoreContextType {
  // Products & Categories
  products: Product[];
  categories: typeof CATEGORIES;
  addProduct: (product: Omit<Product, 'id'>) => boolean;
  updateProduct: (id: string, updated: Partial<Product>) => boolean;
  deleteProduct: (id: string) => boolean;
  duplicateProduct: (id: string) => boolean;
  resetProductsToDefault: () => void;
  quickLoginAsOwner: () => void;
  
  // Navigation & Views
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedProductId: string | null;
  viewProductDetail: (productId: string) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  
  // Currency & Formatting
  currency: CurrencyCode;
  currencyConfig: CurrencyConfig;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (amountInUSD: number) => string;
  convertPrice: (amountInUSD: number) => number;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: ProductColor, size?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartTotalCount: number;
  cartSubtotalUSD: number;
  cartDiscountUSD: number;
  cartShippingCostUSD: number;
  cartTaxUSD: number;
  cartGrandTotalUSD: number;
  
  // Coupons
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  
  // Shipping Method
  selectedShippingMethod: ShippingMethod;
  setSelectedShippingMethod: (method: ShippingMethod) => void;
  
  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Auth & User
  user: User | null;
  isStoreOwner: boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'signup' | 'forgot';
  setAuthModalMode: (mode: 'login' | 'signup' | 'forgot') => void;
  login: (email: string, pass: string, role?: 'customer' | 'admin') => boolean;
  signup: (name: string, email: string, pass: string) => boolean;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  
  // Search & Filter state
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (categorySlug: string) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  
  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status' | 'trackingNumber'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => boolean;
  lastCompletedOrder: Order | null;
  setLastCompletedOrder: (order: Order | null) => void;
  
  // Theme Mode ('dark' | 'light')
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (title: string, description?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const STORE_OWNER_ACCOUNT: User = {
  id: 'usr-owner-malik',
  name: 'Malik Rehman (Store Owner)',
  email: 'malikrahman9993@gmail.com',
  role: 'admin',
  phone: '+1 (800) 555-REHMAN',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
  savedAddresses: [
    {
      firstName: 'Malik',
      lastName: 'Rehman',
      email: 'malikrahman9993@gmail.com',
      phone: '+1 (800) 555-REHMAN',
      street: '750 5th Avenue',
      apartment: 'Executive Suite 200',
      city: 'New York',
      stateOrCounty: 'NY',
      postalCode: '10019',
      country: 'US',
    }
  ],
  joinedDate: 'August 2026'
};

const DEFAULT_DEMO_PATRON: User = {
  id: 'usr-demo-patron',
  name: 'Alexander Wright',
  email: 'alexander.wright@luxury.com',
  role: 'customer',
  phone: '+1 (555) 234-8901',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
  savedAddresses: [
    {
      firstName: 'Alexander',
      lastName: 'Wright',
      email: 'alexander.wright@luxury.com',
      phone: '+1 (555) 234-8901',
      street: '740 Park Avenue',
      apartment: 'Penthouse 14B',
      city: 'New York',
      stateOrCounty: 'New York',
      postalCode: '10021',
      country: 'US',
    }
  ],
  defaultAddressIndex: 0,
  joinedDate: 'October 2024'
};

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-883921',
    orderNumber: 'RB-883921-US',
    createdAt: '2026-08-28T14:30:00Z',
    items: [
      {
        id: 'item-demo-1',
        product: SAMPLE_PRODUCTS[0],
        quantity: 1,
        selectedColor: SAMPLE_PRODUCTS[0].colors?.[0],
      }
    ],
    shippingAddress: {
      firstName: 'Eleanor',
      lastName: 'Sterling',
      email: 'eleanor.sterling@luxuryboutique.com',
      phone: '+1 (555) 234-8901',
      street: '740 Park Avenue',
      apartment: 'Penthouse 14B',
      city: 'New York',
      stateOrCounty: 'New York',
      postalCode: '10021',
      country: 'US',
    },
    shippingMethod: SHIPPING_METHODS[1],
    paymentDetails: {
      method: 'card',
      cardholderName: 'ELEANOR STERLING',
      cardNumberMasked: '•••• •••• •••• 4242',
      expiry: '09/28',
    },
    subtotal: 489.00,
    discountTotal: 97.80,
    couponCode: 'REHMAN20',
    shippingCost: 0,
    tax: 31.30,
    total: 422.50,
    currency: 'USD',
    currencySymbol: '$',
    status: 'delivered',
    trackingNumber: 'RB-FDX-99482910US',
    estimatedDelivery: 'August 30, 2026',
  },
  {
    id: 'ord-883922',
    orderNumber: 'RB-883922-UK',
    createdAt: '2026-08-30T10:15:00Z',
    items: [
      {
        id: 'item-demo-2',
        product: SAMPLE_PRODUCTS[4],
        quantity: 1,
      },
      {
        id: 'item-demo-3',
        product: SAMPLE_PRODUCTS[10],
        quantity: 1,
        selectedColor: SAMPLE_PRODUCTS[10].colors?.[0],
      }
    ],
    shippingAddress: {
      firstName: 'Harrison',
      lastName: 'Vance',
      email: 'harrison.vance@mayfair.co.uk',
      phone: '+44 20 7946 0888',
      street: '22 Grosvenor Square',
      apartment: 'Flat 4',
      city: 'London',
      stateOrCounty: 'Greater London',
      postalCode: 'W1K 6LF',
      country: 'GB',
    },
    shippingMethod: SHIPPING_METHODS[0],
    paymentDetails: {
      method: 'apple_pay',
    },
    subtotal: 474.00,
    discountTotal: 0,
    shippingCost: 0,
    tax: 37.45,
    total: 511.45,
    currency: 'GBP',
    currencySymbol: '£',
    status: 'shipped',
    trackingNumber: 'RB-RM-49204928GB',
    estimatedDelivery: 'September 2, 2026',
  }
];

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Products state (persisted)
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('rb_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return SAMPLE_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('rb_products', JSON.stringify(products));
  }, [products]);

  // 2. Navigation State
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('');

  // 3. Currency State
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    const saved = localStorage.getItem('rb_currency');
    return (saved === 'GBP' || saved === 'USD') ? saved : 'USD';
  });

  const currencyConfig = CURRENCY_MAP[currency];

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    localStorage.setItem('rb_currency', code);
    showToast(`Currency Switched`, `Displaying all store pricing in ${CURRENCY_MAP[code].countryName} (${code} ${CURRENCY_MAP[code].symbol})`, 'info');
  };

  const convertPrice = (amountInUSD: number): number => {
    return Number((amountInUSD * currencyConfig.rate).toFixed(2));
  };

  const formatPrice = (amountInUSD: number): string => {
    const converted = convertPrice(amountInUSD);
    return `${currencyConfig.symbol}${converted.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // 4. Cart State (persisted)
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('rb_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      {
        id: 'cart-init-1',
        product: SAMPLE_PRODUCTS[1], // Headphones
        quantity: 1,
        selectedColor: SAMPLE_PRODUCTS[1].colors?.[0],
      }
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<ShippingMethod>(SHIPPING_METHODS[0]);

  useEffect(() => {
    localStorage.setItem('rb_cart', JSON.stringify(cart));
  }, [cart]);

  // 5. Wishlist State
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('rb_wishlist');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [SAMPLE_PRODUCTS[0].id, SAMPLE_PRODUCTS[4].id];
  });

  useEffect(() => {
    localStorage.setItem('rb_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // 6. Registered Accounts Registry & User Auth State
  interface StoredAccount {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    role: 'customer' | 'admin';
    savedAddresses: any[];
    joinedDate: string;
    failedAttempts?: number;
    lockedUntil?: number;
  }

  // Pre-seeded verified accounts database in localStorage
  const [registeredAccounts, setRegisteredAccounts] = useState<StoredAccount[]>(() => {
    const saved = localStorage.getItem('rb_registered_accounts');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      {
        id: 'usr-owner-001',
        name: STORE_OWNER_ACCOUNT.name,
        email: STORE_OWNER_ACCOUNT.email.toLowerCase(),
        passwordHash: 'rehman2026', // Store Owner secret passkey
        role: 'admin',
        savedAddresses: STORE_OWNER_ACCOUNT.savedAddresses,
        joinedDate: STORE_OWNER_ACCOUNT.joinedDate,
      },
      {
        id: 'usr-patron-001',
        name: DEFAULT_DEMO_PATRON.name,
        email: DEFAULT_DEMO_PATRON.email.toLowerCase(),
        passwordHash: 'luxury123',
        role: 'customer',
        savedAddresses: DEFAULT_DEMO_PATRON.savedAddresses,
        joinedDate: 'August 2026',
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('rb_registered_accounts', JSON.stringify(registeredAccounts));
  }, [registeredAccounts]);

  // Current Logged-in User (Defaults to null for new visitors)
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('rb_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return null;
  });

  // Theme Mode State ('dark' | 'light')
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('rb_theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    localStorage.setItem('rb_theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    } else {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === 'dark' ? 'light' : 'dark';
      showToast(
        nextTheme === 'light' ? 'Daylight Luxe Theme' : 'Midnight Dark Theme',
        nextTheme === 'light' ? 'Switched to crisp golden daylight ambiance.' : 'Switched to deep midnight atmosphere.',
        'info'
      );
      return nextTheme;
    });
  };

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | 'forgot'>('login');

  const isStoreOwner = user?.role === 'admin';

  useEffect(() => {
    if (user) {
      localStorage.setItem('rb_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('rb_user');
    }
  }, [user]);

  // 7. Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('rb_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_ORDERS;
  });

  const [lastCompletedOrder, setLastCompletedOrder] = useState<Order | null>(null);

  useEffect(() => {
    localStorage.setItem('rb_orders', JSON.stringify(orders));
  }, [orders]);

  // 8. Toasts State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (title: string, description?: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Actions
  const viewProductDetail = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, quantity = 1, color?: ProductColor, size?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor?.name === color?.name &&
          item.selectedSize === size
      );

      if (existingIndex > -1) {
        const next = [...prev];
        const newQty = next[existingIndex].quantity + quantity;
        if (newQty > product.stock) {
          showToast('Stock Limit Reached', `Only ${product.stock} units available in stock.`, 'warning');
          return prev;
        }
        next[existingIndex] = { ...next[existingIndex], quantity: newQty };
        return next;
      }

      const newItem: CartItem = {
        id: 'ci-' + Math.random().toString(36).substring(2, 9),
        product,
        quantity: Math.min(quantity, product.stock),
        selectedColor: color || product.colors?.[0],
        selectedSize: size || product.sizes?.[0],
      };
      return [...prev, newItem];
    });

    showToast('Added to Cart', `${product.name} (x${quantity}) has been placed in your bag.`, 'success');
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Item Removed', 'Product removed from your shopping bag.', 'info');
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          if (quantity > item.product.stock) {
            showToast('Stock Limit', `Maximum available stock is ${item.product.stock}`, 'warning');
            return item;
          }
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist', prod ? `${prod.name} removed from your saved items.` : undefined, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to Wishlist', prod ? `${prod.name} added to your private collection.` : undefined, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Coupon Logic
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = AVAILABLE_COUPONS.find((c) => c.code.toUpperCase() === cleanCode);
    if (!found) {
      return { success: false, message: 'Invalid promo code. Try "REHMAN20" or "FREESHIP".' };
    }

    if (cartSubtotalUSD < found.minSpendUSD) {
      return {
        success: false,
        message: `This coupon requires a minimum subtotal of $${found.minSpendUSD} / £${Math.round(found.minSpendUSD * 0.79)}.`
      };
    }

    setAppliedCoupon(found);
    showToast('Promo Code Applied!', `${found.description}`, 'success');
    return { success: true, message: 'Coupon applied successfully!' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Promo Code Removed', '', 'info');
  };

  // Cart Calculations in USD base
  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotalUSD = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  let cartDiscountUSD = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercentage) {
      cartDiscountUSD = (cartSubtotalUSD * appliedCoupon.discountPercentage) / 100;
    } else if (appliedCoupon.discountFixedUSD) {
      cartDiscountUSD = Math.min(appliedCoupon.discountFixedUSD, cartSubtotalUSD);
    }
  }

  // Shipping calculation
  const qualifiesForFreeShipping =
    appliedCoupon?.freeShipping ||
    cartSubtotalUSD >= (currency === 'USD' ? currencyConfig.freeShippingThreshold : currencyConfig.freeShippingThreshold / currencyConfig.rate);

  let cartShippingCostUSD = 0;
  if (!qualifiesForFreeShipping && cart.length > 0) {
    cartShippingCostUSD = selectedShippingMethod.priceUSD;
  } else if (selectedShippingMethod.id !== 'standard' && cart.length > 0) {
    // If user picks expedited shipping, charge difference or full rate
    cartShippingCostUSD = selectedShippingMethod.priceUSD;
  }

  const taxableAmount = Math.max(0, cartSubtotalUSD - cartDiscountUSD);
  const cartTaxUSD = taxableAmount > 0 ? Number((taxableAmount * 0.0825).toFixed(2)) : 0; // 8.25% average US/UK blended sales tax / VAT
  const cartGrandTotalUSD = Math.max(0, taxableAmount + cartShippingCostUSD + cartTaxUSD);

  // Real Auth operations with strict validation & security protection
  const login = (email: string, pass: string, role: 'customer' | 'admin' = 'customer'): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    // 1. Basic format verification
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      showToast('Invalid Email Format', 'Please provide a valid email address (e.g. name@domain.com).', 'error');
      return false;
    }

    if (!cleanPass) {
      showToast('Missing Password', 'Please enter your account password.', 'error');
      return false;
    }

    // 2. Lookup in registered accounts registry
    const foundAccount = registeredAccounts.find((acc) => acc.email === cleanEmail);

    // 3. Brute force lockout check
    if (foundAccount && foundAccount.lockedUntil && Date.now() < foundAccount.lockedUntil) {
      const remainingSecs = Math.ceil((foundAccount.lockedUntil - Date.now()) / 1000);
      showToast('Account Temporarily Locked', `Too many failed attempts. Try again in ${remainingSecs} seconds for security.`, 'error');
      return false;
    }

    // 4. If account does not exist in registry
    if (!foundAccount) {
      showToast('Account Not Found', 'No registered account found with this email. Please click "Register" first.', 'error');
      return false;
    }

    // 5. Verify Password
    if (foundAccount.passwordHash !== cleanPass) {
      const updatedAttempts = (foundAccount.failedAttempts || 0) + 1;
      let lockUntil: number | undefined = undefined;

      if (updatedAttempts >= 5) {
        lockUntil = Date.now() + 60 * 1000; // 1 minute lockout after 5 fails
        showToast('Security Alert', '5 failed attempts. Account locked for 60 seconds to prevent unauthorized access.', 'error');
      } else {
        showToast('Incorrect Password', `Invalid password entered. Attempt ${updatedAttempts} of 5.`, 'error');
      }

      setRegisteredAccounts((prev) =>
        prev.map((acc) =>
          acc.email === cleanEmail
            ? { ...acc, failedAttempts: updatedAttempts, lockedUntil: lockUntil }
            : acc
        )
      );
      return false;
    }

    // 6. Reset failed attempts upon successful login
    setRegisteredAccounts((prev) =>
      prev.map((acc) =>
        acc.email === cleanEmail ? { ...acc, failedAttempts: 0, lockedUntil: undefined } : acc
      )
    );

    // 7. Establish authenticated session
    const authenticatedUser: User = {
      id: foundAccount.id,
      name: foundAccount.name,
      email: foundAccount.email,
      role: foundAccount.role,
      savedAddresses: foundAccount.savedAddresses || [],
      joinedDate: foundAccount.joinedDate || 'August 2026',
    };

    setUser(authenticatedUser);
    showToast(
      foundAccount.role === 'admin' ? 'Store Owner Verified' : 'Welcome to Rehman Bazar',
      foundAccount.role === 'admin'
        ? 'Welcome back, Malik Rehman. Owner catalog management unlocked.'
        : `Signed in successfully as ${authenticatedUser.name}.`,
      'success'
    );
    return true;
  };

  const signup = (name: string, email: string, pass: string): boolean => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    // Strict input validations
    if (!cleanName || cleanName.length < 2) {
      showToast('Name Required', 'Please enter your full name (at least 2 characters).', 'warning');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      showToast('Invalid Email', 'Please enter a valid email address (e.g. user@domain.com).', 'error');
      return false;
    }

    if (!cleanPass || cleanPass.length < 6) {
      showToast('Weak Password', 'Password must be at least 6 characters for security protection.', 'warning');
      return false;
    }

    // Check if email already registered
    const existing = registeredAccounts.find((acc) => acc.email === cleanEmail);
    if (existing) {
      showToast('Already Registered', 'An account with this email already exists. Please sign in instead.', 'warning');
      return false;
    }

    const isOwner = cleanEmail === 'malikrahman9993@gmail.com' || cleanEmail === 'admin@rehmanbazar.com';

    const newAccount: StoredAccount = {
      id: 'usr-' + Math.random().toString(36).substring(2, 9),
      name: cleanName,
      email: cleanEmail,
      passwordHash: cleanPass,
      role: isOwner ? 'admin' : 'customer',
      savedAddresses: [],
      joinedDate: 'August 2026',
      failedAttempts: 0,
    };

    // Save to registered accounts database
    setRegisteredAccounts((prev) => [...prev, newAccount]);

    // Automatically sign in newly registered user
    const newUser: User = {
      id: newAccount.id,
      name: newAccount.name,
      email: newAccount.email,
      role: newAccount.role,
      savedAddresses: [],
      joinedDate: newAccount.joinedDate,
    };

    setUser(newUser);
    showToast(
      isOwner ? 'Store Owner Registered' : 'VIP Account Created!',
      `Account verified and secured for ${cleanName}. Welcome to Rehman Bazar!`,
      'success'
    );
    return true;
  };

  const logout = () => {
    setUser(null);
    if (currentView === 'admin' || currentView === 'account') {
      setCurrentView('home');
    }
    showToast('Signed Out', 'You have been safely signed out.', 'info');
  };

  const updateUser = (data: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
    showToast('Profile Updated', 'Your profile details have been saved.', 'success');
  };

  // Orders operations
  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status' | 'trackingNumber'>): Order => {
    const countryPrefix = orderData.shippingAddress.country === 'GB' ? 'UK' : 'US';
    const randNum = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `RB-${randNum}-${countryPrefix}`;
    const trackingCarrier = countryPrefix === 'UK' ? 'RB-RM-' : 'RB-FDX-';
    const trackingNumber = `${trackingCarrier}${Math.floor(10000000 + Math.random() * 90000000)}${countryPrefix}`;

    const newOrder: Order = {
      ...orderData,
      id: 'ord-' + Math.random().toString(36).substring(2, 9),
      orderNumber,
      createdAt: new Date().toISOString(),
      status: 'processing',
      trackingNumber,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastCompletedOrder(newOrder);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus): boolean => {
    if (!user || user.role !== 'admin') {
      showToast('Permission Denied', 'Only the Store Owner (Malik Rehman) can change order fulfillment statuses.', 'error');
      return false;
    }

    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showToast('Order Status Updated', `Order ${orderId} marked as ${status.toUpperCase()}.`, 'info');
    return true;
  };

  // Products CRUD - STRICTLY PROTECTED FOR STORE OWNER ONLY
  const addProduct = (newProd: Omit<Product, 'id'>): boolean => {
    if (!user || user.role !== 'admin') {
      showToast('Permission Denied', 'Only the verified Store Owner can publish new catalog products.', 'error');
      return false;
    }

    const product: Product = {
      ...newProd,
      id: 'rb-prod-' + Math.random().toString(36).substring(2, 9),
    };
    setProducts((prev) => [product, ...prev]);
    showToast('Product Published', `${product.name} has been added to the storefront.`, 'success');
    return true;
  };

  const updateProduct = (id: string, updated: Partial<Product>): boolean => {
    if (!user || user.role !== 'admin') {
      showToast('Permission Denied', 'Only the verified Store Owner can edit products after publishing.', 'error');
      return false;
    }

    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
    showToast('Product Changes Saved', 'Catalog item updated and published live.', 'success');
    return true;
  };

  const deleteProduct = (id: string): boolean => {
    if (!user || user.role !== 'admin') {
      showToast('Permission Denied', 'Only the Store Owner can remove products from the catalog.', 'error');
      return false;
    }

    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product Deleted', 'Item removed from storefront catalog.', 'info');
    return true;
  };

  const duplicateProduct = (id: string): boolean => {
    if (!user || user.role !== 'admin') {
      showToast('Permission Denied', 'Only the Store Owner can duplicate products.', 'error');
      return false;
    }

    const target = products.find((p) => p.id === id);
    if (!target) return false;

    const cloned: Product = {
      ...target,
      id: 'rb-prod-' + Math.random().toString(36).substring(2, 9),
      name: `${target.name} (Copy)`,
      sku: 'RB-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
    };

    setProducts((prev) => [cloned, ...prev]);
    showToast('Product Duplicated', `Created a copy of ${target.name}`, 'success');
    return true;
  };

  const resetProductsToDefault = () => {
    setProducts(SAMPLE_PRODUCTS);
    localStorage.setItem('rb_products', JSON.stringify(SAMPLE_PRODUCTS));
    showToast('Catalog Reset', 'Restored default luxury product catalog.', 'info');
  };

  const quickLoginAsOwner = () => {
    setUser(STORE_OWNER_ACCOUNT);
    localStorage.setItem('rb_user', JSON.stringify(STORE_OWNER_ACCOUNT));
    showToast('Owner Authenticated', 'Welcome Malik Rehman. Full listing & editing privileges active.', 'success');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories: CATEGORIES,
        addProduct,
        updateProduct,
        deleteProduct,
        duplicateProduct,
        resetProductsToDefault,
        quickLoginAsOwner,

        currentView,
        setCurrentView,
        selectedProductId,
        viewProductDetail,
        quickViewProduct,
        setQuickViewProduct,

        currency,
        currencyConfig,
        setCurrency,
        formatPrice,
        convertPrice,

        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartTotalCount,
        cartSubtotalUSD,
        cartDiscountUSD,
        cartShippingCostUSD,
        cartTaxUSD,
        cartGrandTotalUSD,

        appliedCoupon,
        applyCoupon,
        removeCoupon,

        selectedShippingMethod,
        setSelectedShippingMethod,

        wishlist,
        toggleWishlist,
        isInWishlist,

        user,
        isStoreOwner,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        login,
        signup,
        logout,
        updateUser,

        searchQuery,
        setSearchQuery,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        isSearchModalOpen,
        setIsSearchModalOpen,

        orders,
        createOrder,
        updateOrderStatus,
        lastCompletedOrder,
        setLastCompletedOrder,

        theme,
        toggleTheme,
        setTheme,

        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

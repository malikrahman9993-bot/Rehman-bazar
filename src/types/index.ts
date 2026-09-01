export type CurrencyCode = 'USD' | 'GBP';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // 1 USD = 0.79 GBP approx
  flag: string;
  countryName: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  expressShippingFee: number;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number; // in USD base
  oldPrice?: number;
  discount?: number; // percentage
  rating: number;
  reviewsCount: number;
  stock: number;
  images: string[];
  videoUrl?: string; // Product demonstration / promo video (mp4, webm, youtube, vimeo, base64)
  description: string;
  features: string[];
  specs: Record<string, string>;
  colors?: ProductColor[];
  sizes?: string[];
  tags: string[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isTrending?: boolean;
  isFlashSale?: boolean;
  flashSaleEndsInSeconds?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
  icon: string;
  badge?: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  avatar?: string;
  helpfulCount: number;
}

export interface CartItem {
  id: string; // unique item instance id
  product: Product;
  quantity: number;
  selectedColor?: ProductColor;
  selectedSize?: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  days: string;
  priceUSD: number;
  priceGBP: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  apartment?: string;
  city: string;
  stateOrCounty: string;
  postalCode: string;
  country: 'US' | 'GB';
}

export interface PaymentDetails {
  method: 'card' | 'apple_pay' | 'google_pay' | 'paypal' | 'klarna';
  cardholderName?: string;
  cardNumberMasked?: string;
  expiry?: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  shippingMethod: ShippingMethod;
  paymentDetails: PaymentDetails;
  subtotal: number;
  discountTotal: number;
  couponCode?: string;
  shippingCost: number;
  tax: number;
  total: number;
  currency: CurrencyCode;
  currencySymbol: string;
  status: OrderStatus;
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  phone?: string;
  avatar?: string;
  savedAddresses: ShippingAddress[];
  defaultAddressIndex?: number;
  joinedDate: string;
}

export interface FilterState {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'discount';
  tags: string[];
}

export interface Coupon {
  code: string;
  discountPercentage?: number;
  discountFixedUSD?: number;
  freeShipping?: boolean;
  minSpendUSD: number;
  description: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  description?: string;
}

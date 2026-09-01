import { CurrencyCode, CurrencyConfig, ShippingMethod } from '../types';

export const CURRENCY_MAP: Record<CurrencyCode, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    rate: 1.0,
    flag: '🇺🇸',
    countryName: 'United States',
    freeShippingThreshold: 50,
    standardShippingFee: 9.99,
    expressShippingFee: 19.99,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    rate: 0.79,
    flag: '🇬🇧',
    countryName: 'United Kingdom',
    freeShippingThreshold: 40,
    standardShippingFee: 7.99,
    expressShippingFee: 15.99,
  },
};

export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Standard Tracked Delivery',
    description: 'FedEx Ground (US) / Royal Mail Tracked 48 (UK)',
    days: '3-5 Business Days',
    priceUSD: 9.99,
    priceGBP: 7.99,
  },
  {
    id: 'express',
    name: 'Express Priority Air',
    description: 'FedEx 2-Day Air (US) / Royal Mail Tracked 24 (UK)',
    days: '1-2 Business Days',
    priceUSD: 19.99,
    priceGBP: 15.99,
  },
  {
    id: 'overnight',
    name: 'White-Glove VIP Next-Day',
    description: 'Signature Required Overnight Courier with live GPS',
    days: 'Guaranteed Next Day',
    priceUSD: 34.99,
    priceGBP: 28.00,
  }
];

export const TRUST_PILLARS = [
  {
    icon: 'ShieldCheck',
    title: '256-Bit SSL Checkout',
    description: 'Bank-grade encrypted payments via Stripe & Apple Pay.',
  },
  {
    icon: 'PlaneTakeoff',
    title: 'Fast USA & UK Delivery',
    description: 'Dispatched directly from New Jersey & London fulfillment hubs.',
  },
  {
    icon: 'RotateCcw',
    title: '30-Day Hassle-Free Returns',
    description: 'Pre-paid return labels with instant refunds upon inspection.',
  },
  {
    icon: 'Headset',
    title: '24/7 VIP Concierge Support',
    description: 'Dedicated client advisors ready via phone, email, and live chat.',
  },
  {
    icon: 'Award',
    title: '100% Authentic Guarantee',
    description: 'Every luxury item is certified and inspected for quality before dispatch.',
  }
];

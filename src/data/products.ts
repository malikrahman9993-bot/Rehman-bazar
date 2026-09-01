import { Product, Review } from '../types';

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'rb-prod-1',
    name: 'Aethelgard Swiss Chronograph Automatic',
    sku: 'RB-WT-001',
    category: 'watches',
    price: 489.00,
    oldPrice: 650.00,
    discount: 25,
    rating: 4.9,
    reviewsCount: 142,
    stock: 8,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1000&auto=format&fit=crop'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-wrist-watch-macro-shot-41710-large.mp4',
    description: 'Engineered with hand-assembled Swiss automatic movement, 316L surgical stainless steel casing, and scratch-resistant sapphire crystal with anti-reflective coating. Water resistant up to 100m.',
    features: [
      'Genuine Swiss Calibre 2824-2 automatic movement',
      'Double-domed Sapphire Crystal Glass',
      'Super-LumiNova luminescence indices',
      'Interchangeable Italian full-grain leather strap',
      '5-Year Global Luxury Manufacturer Warranty'
    ],
    specs: {
      'Movement': 'Swiss Automatic (38-Hour Reserve)',
      'Case Diameter': '41 mm',
      'Case Thickness': '11.8 mm',
      'Glass': 'Sapphire Crystal (Scratch-proof)',
      'Water Resistance': '10 ATM (100m / 330ft)',
      'Origin': 'Geneva, Switzerland'
    },
    colors: [
      { name: 'Onyx Black / Rose Gold', hex: '#1c1917' },
      { name: 'Midnight Navy / Silver', hex: '#0f172a' },
      { name: 'Emerald Sunray / Gold', hex: '#064e3b' }
    ],
    tags: ['Luxury', 'Swiss Made', 'Waterproof', 'Bestseller'],
    isFeatured: true,
    isBestSeller: true,
    isTrending: true,
  },
  {
    id: 'rb-prod-2',
    name: 'AcousticPure Apex Pro Wireless ANC Headphones',
    sku: 'RB-EL-002',
    category: 'electronics',
    price: 329.00,
    oldPrice: 399.00,
    discount: 18,
    rating: 4.8,
    reviewsCount: 289,
    stock: 14,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1000&auto=format&fit=crop'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-with-headphones-listening-to-music-41484-large.mp4',
    description: 'Studio-grade spatial acoustic profiling paired with custom 45mm beryllium drivers and hybrid active noise cancellation capable of dampening 98% of ambient noise. 42 hours of battery life with ultra-fast USB-C charge.',
    features: [
      'Hybrid ANC with Transparency Adaptive Mode',
      '45mm Custom Beryllium Acoustic Transducers',
      'LDAC, aptX HD & Lossless Spatial Audio codec support',
      'Memory foam ear cushions wrapped in breathable protein leather',
      'Multipoint dual Bluetooth 5.4 device pairing'
    ],
    specs: {
      'Battery Life': '42 Hours (ANC On)',
      'Charging Time': '15 min for 6 hours playback',
      'Drivers': '45mm Beryllium Dynamic',
      'Weight': '248 grams',
      'Connectivity': 'Bluetooth 5.4 + 3.5mm Hi-Res Cable',
      'Warranty': '2 Years Replacement'
    },
    colors: [
      { name: 'Matte Obsidian', hex: '#18181b' },
      { name: 'Champagne Silver', hex: '#e2e8f0' },
      { name: 'Midnight Blue', hex: '#1e3a8a' }
    ],
    tags: ['Hi-Res Audio', 'ANC', 'Wireless', 'Fast Charge'],
    isFeatured: true,
    isFlashSale: true,
    flashSaleEndsInSeconds: 32400,
    isTrending: true,
  },
  {
    id: 'rb-prod-3',
    name: 'Milano Bespoke Cashmere-Wool Overcoat',
    sku: 'RB-FS-003',
    category: 'fashion',
    price: 349.00,
    oldPrice: 499.00,
    discount: 30,
    rating: 4.9,
    reviewsCount: 97,
    stock: 5,
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce667823?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Handcrafted in Biella, Italy using 70% virgin wool and 30% Mongolian royal cashmere. Features horn buttons, tailored notch lapels, and an ultra-soft silk-blend thermal interior lining for effortless drape.',
    features: [
      'Virgin Wool & Pure Mongolian Cashmere blend',
      'Double-breasted Italian structured silhouette',
      'Genuine buffalo horn buttons',
      'Satin-lined deep internal passport pocket',
      'Wind & water-repellent eco-nanocoat'
    ],
    specs: {
      'Material': '70% Wool, 30% Cashmere',
      'Lining': '100% Cupro Silk',
      'Fit': 'Tailored European Modern Fit',
      'Care': 'Specialist Dry Clean Only',
      'Origin': 'Milan / Biella, Italy'
    },
    colors: [
      { name: 'Camel Tan', hex: '#c29b6e' },
      { name: 'Charcoal Slate', hex: '#334155' },
      { name: 'Midnight Onyx', hex: '#0f172a' }
    ],
    sizes: ['S (38)', 'M (40)', 'L (42)', 'XL (44)', 'XXL (46)'],
    tags: ['Cashmere', 'Italian Tailored', 'Winter Luxury', 'New Arrival'],
    isNewArrival: true,
    isFeatured: true,
  },
  {
    id: 'rb-prod-4',
    name: 'Nordic Lumina Marble & Brass Ambient Lamp',
    sku: 'RB-HL-004',
    category: 'home-living',
    price: 185.00,
    oldPrice: 240.00,
    discount: 23,
    rating: 4.8,
    reviewsCount: 64,
    stock: 19,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Sculpted from heavy Carrara white marble with brushed satin gold accents and a hand-blown frosted opal glass globe. Stepless brass dimmer rotary knob enables seamless mood transitions.',
    features: [
      'Solid Italian Carrara marble base (each piece has unique natural veining)',
      'Hand-blown matte opal diffusion globe',
      'Stepless smooth brass rotary dimmer control (2000K-3000K warm glow)',
      'Braided 2-meter gold-flecked luxury power cable',
      'Energy-efficient 30,000h warm LED capsule included'
    ],
    specs: {
      'Base Material': 'Natural Carrara Marble & Brushed Brass',
      'Dimensions': 'H: 34cm x W: 18cm',
      'Light Temp': '2200K - 3000K Warm Dim',
      'Voltage': '110V - 240V (US & UK plugs included)',
      'Weight': '3.2 kg'
    },
    colors: [
      { name: 'Carrara White & Gold', hex: '#f8fafc' },
      { name: 'Nero Marquina Black & Gold', hex: '#1c1917' }
    ],
    tags: ['Marble', 'Minimalist', 'Dimmable', 'Bestseller'],
    isBestSeller: true,
  },
  {
    id: 'rb-prod-5',
    name: 'Maison Royale Oud Saffron Parfum Extrait (100ml)',
    sku: 'RB-BT-005',
    category: 'beauty',
    price: 195.00,
    oldPrice: 260.00,
    discount: 25,
    rating: 5.0,
    reviewsCount: 118,
    stock: 11,
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'An intoxicating, ultra-concentrated parfum extrait fusing smoked Cambodian aged oud, Kashmiri saffron blossoms, Bulgarian damask rose, and creamy Bourbon vanilla. Boasts 18+ hours of projection.',
    features: [
      '30% Parfum Extrait concentration for intense longevity',
      'Sustainably sourced Cambodian wild Agarwood (Oud)',
      'Hand-engraved crystal flacon with 24K gold-plated cap',
      'Unisex luxury oriental profile with lingering sillage',
      'Presented in a velvet-lined magnetic gift case'
    ],
    specs: {
      'Volume': '100 ml / 3.4 fl. oz',
      'Concentration': 'Extrait de Parfum (30% Oils)',
      'Top Notes': 'Kashmiri Saffron, Bergamot, Pink Peppercorn',
      'Heart Notes': 'Damask Rose, Amber, Jasmine Sambac',
      'Base Notes': 'Cambodian Oud, Bourbon Vanilla, Cedarwood',
      'Origin': 'Grasse, France'
    },
    tags: ['Oud', 'Niche Perfume', 'Long Lasting', 'Gift Box'],
    isFlashSale: true,
    flashSaleEndsInSeconds: 18400,
    isTrending: true,
  },
  {
    id: 'rb-prod-6',
    name: 'Vortex Phantom 75% CNC Wireless Mechanical Keyboard',
    sku: 'RB-GM-006',
    category: 'gaming',
    price: 219.00,
    oldPrice: 280.00,
    discount: 22,
    rating: 4.9,
    reviewsCount: 182,
    stock: 12,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Anodized CNC 6063 aerospace aluminum case with flex-cut PCB gasket mount, factory pre-lubricated linear magnetic Hall-effect switches, customizable OLED screen, and tri-mode 2.4GHz/BT5.3/Type-C connectivity.',
    features: [
      'Full CNC milled aluminum chassis with brass sound weight',
      'Rapid Trigger Hall Effect linear switches with 0.1mm actuation',
      'Customizable 1.14" TFT LCD screen & media rotary knob',
      '8000mAh dual battery (up to 300h RGB off)',
      'Factory lubed Poron foam + IXPE switch pads for creamy acoustic thock'
    ],
    specs: {
      'Layout': '75% Compact (82 Keys + Knob)',
      'Switch Type': 'Gateron Magnetic Jade Pro Linear',
      'Polling Rate': '8,000 Hz Wired / 1,000 Hz Wireless',
      'Hot-Swap': 'Yes, 5-pin MX & Magnetic compatible',
      'Compatibility': 'macOS, Windows, Linux, iOS, iPadOS'
    },
    colors: [
      { name: 'Space Gray / Anodized Gold', hex: '#4b5563' },
      { name: 'Frost White / Mint', hex: '#f1f5f9' },
      { name: 'Stealth Blackout', hex: '#09090b' }
    ],
    tags: ['Mechanical', 'Hall Effect', 'Hot Swap', 'Wireless'],
    isFeatured: true,
    isTrending: true,
  },
  {
    id: 'rb-prod-7',
    name: 'AeroCarbon Pro Smart Treadmill & Compact Running Deck',
    sku: 'RB-SP-007',
    category: 'sports',
    price: 689.00,
    oldPrice: 899.00,
    discount: 23,
    rating: 4.8,
    reviewsCount: 76,
    stock: 6,
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Ultra-thin foldable carbon-fiber alloy structure with 3.5HP brushless whisper-quiet motor (under 45dB), dynamic 8-point shock absorption deck, Apple Health & Zwift sync, and 180-degree flat stowage.',
    features: [
      'Patented 180-degree double-fold flat design (slides under bed/sofa)',
      '3.5 HP Peak Silent Brushless Eco-Motor',
      'Intelligent Auto-Footstep speed sensing (speeds up as you step forward)',
      'Multi-layer anti-slip orthopedic running belt',
      'Integrated LED hidden HUD display with live wattage & calories'
    ],
    specs: {
      'Speed Range': '0.5 - 12 km/h (7.5 mph)',
      'Max Weight Capacity': '136 kg / 300 lbs',
      'Folded Thickness': '14.5 cm / 5.7 inches',
      'App Sync': 'Zwift, Kinomap, Apple Health, RehmanFit App',
      'Motor Sound': '< 45 Decibels'
    },
    tags: ['Fitness', 'Foldable', 'Smart Home', 'Cardio'],
    isBestSeller: true,
  },
  {
    id: 'rb-prod-8',
    name: 'Autonova 4K Dual Stealth Dash Cam with AI Night Vision',
    sku: 'RB-CA-008',
    category: 'car-accessories',
    price: 159.00,
    oldPrice: 220.00,
    discount: 28,
    rating: 4.7,
    reviewsCount: 153,
    stock: 22,
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Front 4K UHD (3840x2160) + Rear 1080P with Sony STARVIS 2 image sensor, 5GHz Wi-Fi, GPS tracking, 24/7 G-Sensor parking collision surveillance, and heat-resistant supercapacitor.',
    features: [
      'Sony STARVIS 2 HDR Sensor with F1.6 aperture for license plate clarity at night',
      'Built-in 5GHz Wi-Fi for instantaneous phone download via app',
      'Built-in GPS Logger logs exact speed, route, and time stamped footage',
      'Extreme weather Supercapacitor (-20°C to 75°C)',
      'Includes 128GB High-Endurance MicroSD card'
    ],
    specs: {
      'Resolution': 'Front 4K UHD + Rear 1080P FHD',
      'Lens Angle': '170° Wide Angle 7-Glass Element',
      'Storage': 'Supports up to 512GB (128GB Included)',
      'Power': 'Supercapacitor + Hardwire kit compatible',
      'Warranty': '3-Year Hassle Free'
    },
    tags: ['4K Camera', 'Sony Sensor', 'Automotive', 'GPS'],
    isNewArrival: true,
  },
  {
    id: 'rb-prod-9',
    name: 'LittleExplorer Montessori Organic Wooden Play Gym & Tower',
    sku: 'RB-KD-009',
    category: 'kids',
    price: 139.00,
    oldPrice: 185.00,
    discount: 25,
    rating: 4.9,
    reviewsCount: 88,
    stock: 15,
    images: [
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505377059067-e285a7bac49b?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Crafted from 100% sustainably harvested European beechwood with baby-safe beeswax finish. Stimulates sensory motor skills, balance development, and imaginative play for ages 6 months to 5 years.',
    features: [
      '100% solid natural European Beechwood',
      'Zero-VOC certified non-toxic plant wax and food-grade water paints',
      'Smooth hand-sanded curved edges for maximum child safety',
      'Foldable compact mechanism with secure dual locking pins',
      'Exceeds US ASTM F963 & European EN71 safety standards'
    ],
    specs: {
      'Age Range': '6 Months - 5 Years',
      'Weight Capacity': '60 kg / 132 lbs',
      'Dimensions': '80 x 60 x 75 cm',
      'Certifications': 'FSC Beech, CE, ASTM, CPSIA certified',
      'Assembly': 'Tool included, 15 min easy setup'
    },
    tags: ['Montessori', 'Organic Beechwood', 'Non Toxic', 'Toddler'],
    isBestSeller: true,
  },
  {
    id: 'rb-prod-10',
    name: 'Aurelia 18K Solid Gold Herringbone Chain Necklace',
    sku: 'RB-WT-010',
    category: 'watches',
    price: 420.00,
    oldPrice: 560.00,
    discount: 25,
    rating: 5.0,
    reviewsCount: 110,
    stock: 7,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611591475169-2fdf5692ea40?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Authentic 18K solid yellow gold liquid silk herringbone chain. Lies completely flat against the collarbone with high-polish mirror finish and reinforced lobster clasp.',
    features: [
      'Stamped 750 / 18K Solid Yellow Gold',
      'Liquid-smooth 4.5mm silky flat weave',
      'Hypoallergenic, nickel-free & lead-free',
      'Includes Certified Valuation Authenticity Certificate',
      'Delivered in luxury velvet jewelry case with ribbon'
    ],
    specs: {
      'Metal': '18K Yellow Gold (750 Stamped)',
      'Width': '4.5 mm',
      'Length': '18 inches (45 cm) or 20 inches (50 cm)',
      'Weight': '9.4 grams (approx)',
      'Clasp': 'Reinforced Lobster Clasp'
    },
    tags: ['18K Gold', 'Fine Jewelry', 'Gift For Her', 'Trending'],
    isTrending: true,
    isFeatured: true,
  },
  {
    id: 'rb-prod-11',
    name: 'Sovereign Full-Grain Italian Leather Weekender Duffle',
    sku: 'RB-FS-011',
    category: 'fashion',
    price: 279.00,
    oldPrice: 380.00,
    discount: 27,
    rating: 4.9,
    reviewsCount: 145,
    stock: 9,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473188557897-f95e082c568f?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Vegetable-tanned full grain Tuscan leather that develops a rich, personalized patina over years of travel. Features antique brass YKK Excella zippers, separate ventilated shoe compartment, and padded 16" laptop sleeve.',
    features: [
      'Full-Grain Tuscan Vegetable-Tanned Cowhide Leather',
      'TSA-approved carry-on sizing for all US & UK commercial airlines',
      'Dedicated water-resistant shoe & laundry compartment',
      'Heavy-duty Japanese YKK Excella 2-way metal zippers',
      'Detachable padded ergonomic leather shoulder strap'
    ],
    specs: {
      'Dimensions': '52 x 28 x 26 cm (42 Liters Capacity)',
      'Weight': '1.85 kg',
      'Hardware': 'Antique Solid Brass',
      'Laptop Sleeve': 'Fits up to 16-inch MacBook Pro',
      'Origin': 'Florence, Italy'
    },
    colors: [
      { name: 'Cognac Saddle Brown', hex: '#854d0e' },
      { name: 'Vintage Espresso Dark Brown', hex: '#3b2219' },
      { name: 'Midnight Jet Black', hex: '#18181b' }
    ],
    tags: ['Italian Leather', 'Travel Duffle', 'TSA Carry-on', 'Lifetime Warranty'],
    isBestSeller: true,
    isFeatured: true,
  },
  {
    id: 'rb-prod-12',
    name: 'TheraGlow Multi-Wave LED Red Light Therapy Facial Mask',
    sku: 'RB-BT-012',
    category: 'beauty',
    price: 249.00,
    oldPrice: 350.00,
    discount: 29,
    rating: 4.8,
    reviewsCount: 168,
    stock: 13,
    images: [
      'https://images.unsplash.com/photo-1512290900672-1f4a9744654b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Medical-grade flexible food-grade silicone mask containing 162 clinical LEDs with dual-wavelength 633nm (Red) & 830nm (Near-Infrared) light. Proven to stimulate collagen, reduce fine lines, and even out skin complexion.',
    features: [
      'FDA-cleared 633nm Red + 830nm Near-Infrared clinical light therapy',
      'Ultra-pliant medical-grade soft silicone contours seamlessly to all facial shapes',
      'Cordless rechargeable magnetic controller with 10-minute auto shut-off',
      'Eye-protection built-in blackout silicone gaskets',
      'Includes travel storage pouch & US/UK dual voltage adapters'
    ],
    specs: {
      'Wavelengths': '633nm (Red) & 830nm (Near-Infrared)',
      'LED Count': '162 Medical-Grade Diodes',
      'Treatment Time': '10 minutes per day (3-5x weekly)',
      'Certifications': 'FDA Cleared, CE Medical, RoHS',
      'Battery': 'Up to 12 sessions per full charge'
    },
    tags: ['LED Therapy', 'Anti-Aging', 'Dermatologist Approved', 'New Arrival'],
    isNewArrival: true,
    isTrending: true,
  }
];

export const SAMPLE_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'rb-prod-1',
    author: 'Harrison Vance',
    location: 'Mayfair, London, UK',
    rating: 5,
    date: '2 days ago',
    comment: 'Exceptional craftsmanship. The Swiss automatic movement keeps immaculate time, and the sapphire crystal clarity is equal to watches 4x this price point. Arrived in London in just 2 business days via Royal Mail Special Delivery!',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    helpfulCount: 38
  },
  {
    id: 'rev-2',
    productId: 'rb-prod-2',
    author: 'Eleanor Sterling',
    location: 'Manhattan, New York, USA',
    rating: 5,
    date: '1 week ago',
    comment: 'The noise cancellation on these headphones makes NYC subway rides feel like a quiet library. Audio resolution on lossless tracks is stellar. Rehman Bazar’s customer support was also super prompt answering my questions.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    helpfulCount: 52
  },
  {
    id: 'rev-3',
    productId: 'rb-prod-3',
    author: 'Julian Montgomery',
    location: 'Edinburgh, Scotland, UK',
    rating: 5,
    date: '3 weeks ago',
    comment: 'The cashmere blend is incredibly luxurious to touch yet substantial enough to block the Scottish winter chill. The tailored drape is spotless. Rehman Bazar has become my primary luxury boutique.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    helpfulCount: 29
  },
  {
    id: 'rev-4',
    productId: 'rb-prod-5',
    author: 'Sophia Kensington',
    location: 'Beverly Hills, California, USA',
    rating: 5,
    date: '4 days ago',
    comment: 'Maison Royale Oud Saffron is magnificent! Compliments everywhere I go. It has that rich, royal Arabian oud depth with a sensual Parisian warmth. The packaging felt like opening high jewelry.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    helpfulCount: 44
  },
  {
    id: 'rev-5',
    productId: 'rb-prod-6',
    author: 'Marcus Brody',
    location: 'Manchester, UK',
    rating: 5,
    date: '5 days ago',
    comment: 'Best mechanical keyboard I have ever owned. The rapid trigger Hall effect switches shaved milliseconds off my response time in competitive matches. Heavy CNC aluminum block that stays firmly anchored.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop',
    helpfulCount: 31
  }
];

export const AVAILABLE_COUPONS = [
  {
    code: 'REHMAN20',
    discountPercentage: 20,
    minSpendUSD: 100,
    description: '20% off all orders over $100 / £80'
  },
  {
    code: 'FREESHIP',
    freeShipping: true,
    minSpendUSD: 0,
    description: 'Free Express Tracked Delivery (USA & UK)'
  },
  {
    code: 'WELCOME10',
    discountPercentage: 10,
    minSpendUSD: 50,
    description: '10% off your first luxury order'
  },
  {
    code: 'VIP50',
    discountFixedUSD: 50,
    minSpendUSD: 250,
    description: '$50 / £40 off orders over $250 / £200'
  }
];

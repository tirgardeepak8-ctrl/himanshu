import { Category, Product, Coupon, StoreSettings, Review } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-traditional-bows',
    name: 'Traditional Bows',
    slug: 'traditional-bows',
    description: 'Heritage Indian bamboo and monolithic hand-carved bows, steeped in centuries of tribal craft.',
    image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.16_PM__1__50575f74.jpeg',
    badge: 'Heritage Classic'
  },
  {
    id: 'cat-modern-bows',
    name: 'Modern Takedown Bows',
    slug: 'modern-bows',
    description: 'Engineered hardwood risers paired with high-tensile fiberglass & bamboo limbs for precision archery.',
    image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.15_PM__1__216506e2.jpeg',
    badge: 'Best Seller'
  },
  {
    id: 'cat-arrows',
    name: 'Wooden & Bamboo Arrows',
    slug: 'wooden-arrows',
    description: 'Hand-straightened bamboo shafts with authentic hand-forged steel points and natural turkey feathers.',
    image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.18_PM_8303119e.jpeg',
    badge: 'Artisan Forged'
  },
  {
    id: 'cat-handles',
    name: 'Kaman Handles & Risers',
    slug: 'kaman-handles',
    description: 'Ergonomically carved wooden bow handles with reinforced aluminum limb pockets in rich timber grains.',
    image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.44.17_PM_39805559.jpeg',
    badge: 'Hand Carved'
  },
  {
    id: 'cat-accessories',
    name: 'Archery Accessories & Gear',
    slug: 'archery-accessories',
    description: 'Hand-stitched leather quivers, Dacron bowstrings, arm guards, and arrow repair essentials.',
    image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.44.56_PM_80f6bfbd.jpeg',
    badge: 'Essential'
  },
  {
    id: 'cat-custom',
    name: 'Custom Archery Products',
    slug: 'custom-archery',
    description: 'Tailored draw weight, custom riser wood, bespoke tip forging and personalized owner engraving.',
    image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.15_PM_ea7be31c.jpeg',
    badge: 'Made to Order'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'tirgar-deluxe-padauk-bow',
    name: 'TIRGAR Deluxe Padauk Wooden Takedown Bow',
    slug: 'tirgar-deluxe-padauk-wooden-takedown-bow',
    categoryId: 'cat-modern-bows',
    categoryName: 'Modern Takedown Bows',
    shortDescription: 'Master-level handcrafted takedown bow with deep padauk grain, aluminum pocket brackets and precision sight.',
    description: 'Engineered and sculpted in Banswara by master artisan Himanshu Tirgar. Featuring a multi-coat lacquered padauk hardwood riser, reinforced aircraft-grade aluminum limb pockets, and smooth-drawing laminated bamboo/fiberglass limbs. Designed for exceptional arrow speed, target stability, and generational longevity.',
    basePrice: 3500,
    originalPrice: 4200,
    mainImage: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.15_PM__1__216506e2.jpeg',
    images: [
      '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.15_PM__1__216506e2.jpeg',
      '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.15_PM_ea7be31c.jpeg',
      '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.44.17_PM_39805559.jpeg'
    ],
    stock: 14,
    sku: 'TIR-BOW-PAD-3500',
    isFeatured: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 38,
    specifications: {
      material: 'Seasoned Padauk Hardwood & Hand-tempered Bamboo/Composite Limbs',
      length: '58 inches AMO',
      drawWeight: '28 lbs - 38 lbs (Adjustable/Tuned)',
      arrowsIncluded: 'Can be paired with Tirgar Bamboo Arrows',
      origin: 'Chandu ji ka gara, Banswara, Rajasthan',
      finish: 'Mirror Gloss Heritage Lacquer with Brass Inset Accents',
      warranty: '1 Year Artisan Craftsmanship Guarantee',
      packageContents: '1x Carved Padauk Riser, 2x Limbs, 1x High-Strength Dacron Bowstring, 1x Pin Sight'
    },
    variations: [
      {
        id: 'var-padauk-red',
        name: 'Royal Padauk Crimson',
        finishName: 'Deep Crimson Padauk',
        colorCode: '#7E2811',
        sku: 'TIR-BOW-PAD-RED',
        price: 3500,
        originalPrice: 4200,
        stock: 6,
        image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.15_PM__1__216506e2.jpeg',
        specNote: 'Rich crimson natural grain with gold brass accents'
      },
      {
        id: 'var-padauk-honey-teak',
        name: 'Golden Honey Teak',
        finishName: 'Golden Honey Finish',
        colorCode: '#C88031',
        sku: 'TIR-BOW-PAD-TEAK',
        price: 3500,
        originalPrice: 4200,
        stock: 5,
        image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.15_PM_ea7be31c.jpeg',
        specNote: 'Warm golden amber polished teak timber'
      },
      {
        id: 'var-padauk-smoked-walnut',
        name: 'Vintage Smoked Walnut',
        finishName: 'Smoked Walnut Finish',
        colorCode: '#4A3324',
        sku: 'TIR-BOW-PAD-WAL',
        price: 3600,
        originalPrice: 4350,
        stock: 3,
        image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.44.17_PM_39805559.jpeg',
        specNote: 'Dark heritage scorched wood grain with silver fixtures'
      }
    ],
    tags: ['Takedown Bow', 'Padauk Wood', 'Target Archery', 'Best Quality'],
    published: true
  },
  {
    id: 'tirgar-master-combo-arrows',
    name: 'TIRGAR Master Handcrafted Bow + 2 Arrows Combo',
    slug: 'tirgar-master-handcrafted-bow-arrows-combo',
    categoryId: 'cat-modern-bows',
    categoryName: 'Modern Takedown Bows',
    shortDescription: 'Complete traditional starter & tournament set: 1 handcrafted bow with 2 balanced feather-fletched bamboo arrows.',
    description: 'The definitive complete archery kit from Himanshu Tirgar. Contains one full takedown bow fitted with an ergonomic wooden riser and reinforced aluminium limb connectors, strung with high-tensile bowstring, plus two hand-straightened bamboo arrows fitted with forged steel points and authentic black/white banded thread work.',
    basePrice: 3000,
    originalPrice: 3600,
    mainImage: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.15_PM_ea7be31c.jpeg',
    images: [
      '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.15_PM_ea7be31c.jpeg',
      '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.18_PM_8303119e.jpeg',
      '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.37.48_PM_72001a52.jpeg'
    ],
    stock: 18,
    sku: 'TIR-COMBO-3000',
    isFeatured: true,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 42,
    specifications: {
      material: 'Ergonomic Wood Riser + Bamboo/Fiber Limbs + 2x Feather Arrows',
      length: '56 inches AMO',
      drawWeight: '26 - 32 lbs',
      arrowsIncluded: '2x Hand-crafted feather fletched arrows included',
      origin: 'Chandu ji ka gara, Banswara, Rajasthan',
      finish: 'Satin Amber Wood Finish with Aluminum Brackets',
      warranty: '1 Year Warranty against delamination',
      packageContents: '1x Wooden Riser, 2x Limbs, 1x Bowstring, 2x Bamboo Arrows (Spiral or Broadhead tip)'
    },
    variations: [
      {
        id: 'var-combo-broadhead',
        name: 'Set with 2x Leaf Broadhead Arrows',
        finishName: 'Broadhead Arrow Set',
        colorCode: '#D4AF37',
        sku: 'TIR-COMBO-BH',
        price: 3000,
        originalPrice: 3600,
        stock: 10,
        image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.15_PM_ea7be31c.jpeg',
        specNote: 'Includes 2 razor forged broadhead bamboo arrows'
      },
      {
        id: 'var-combo-spiral',
        name: 'Set with 2x Spiral Drill Point Arrows',
        finishName: 'Target Spiral Arrow Set',
        colorCode: '#A0A0A0',
        sku: 'TIR-COMBO-SP',
        price: 3000,
        originalPrice: 3600,
        stock: 8,
        image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.15_PM_ea7be31c.jpeg',
        specNote: 'Includes 2 twisted drill target arrows'
      }
    ],
    tags: ['Combo Set', 'Bow and Arrow', 'Ready to Shoot', 'Bestseller'],
    published: true
  },
  {
    id: 'tirgar-emerald-hunter-bow',
    name: 'TIRGAR Emerald Hunter Lacquered Bow',
    slug: 'tirgar-emerald-hunter-lacquered-bow',
    categoryId: 'cat-modern-bows',
    categoryName: 'Modern Takedown Bows',
    shortDescription: 'Distinguished emerald green lacquered hardwood riser with dual reinforced aluminum limb mounts.',
    description: 'An eye-catching edition crafted with emerald-tinted lacquer that showcases natural wood knots underneath. Built with reinforced metallic end-plates and angled arrow plate for clean shaft clearance and crisp, repeatable release.',
    basePrice: 2500,
    originalPrice: 2999,
    mainImage: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.16_PM_835f739e.jpeg',
    images: [
      '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.16_PM_835f739e.jpeg',
      '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.44.17_PM_39805559.jpeg'
    ],
    stock: 9,
    sku: 'TIR-BOW-EMR-2500',
    isFeatured: true,
    isBestSeller: false,
    rating: 4.7,
    reviewCount: 19,
    specifications: {
      material: 'Hardwood with Emerald Mineral Pigment Lacquer & Aluminum Fittings',
      length: '54 inches AMO',
      drawWeight: '25 lbs - 35 lbs',
      arrowsIncluded: 'Optional Add-on at Checkout',
      origin: 'Chandu ji ka gara, Banswara, Rajasthan',
      finish: 'Deep Emerald Green Satin Lacquer',
      warranty: '1 Year Warranty',
      packageContents: '1x Emerald Riser, 2x Limbs, 1x Braided Bowstring'
    },
    variations: [
      {
        id: 'var-emerald-green',
        name: 'Emerald Forest Green',
        finishName: 'Emerald Green',
        colorCode: '#1A5336',
        sku: 'TIR-BOW-EMR-GRN',
        price: 2500,
        originalPrice: 2999,
        stock: 5,
        image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.16_PM_835f739e.jpeg',
        specNote: 'Vibrant jade & forest green finish'
      },
      {
        id: 'var-emerald-ebony',
        name: 'Midnight Charcoal Ebony',
        finishName: 'Charcoal Black',
        colorCode: '#222222',
        sku: 'TIR-BOW-EMR-BLK',
        price: 2500,
        originalPrice: 2999,
        stock: 4,
        image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.37.48_PM_72001a52.jpeg',
        specNote: 'Deep stealth matte charcoal black'
      }
    ],
    tags: ['Emerald Green', 'Hunter Bow', 'Custom Finish'],
    published: true
  },
  {
    id: 'tirgar-classic-target-bow',
    name: 'TIRGAR Classic Target Bow (Himanshu Edition)',
    slug: 'tirgar-classic-target-bow-himanshu-edition',
    categoryId: 'cat-modern-bows',
    categoryName: 'Modern Takedown Bows',
    shortDescription: 'Balanced club and practice takedown bow featuring sculpted thumb-rest and micro-adjust sight pin.',
    description: 'The signature workhorse bow from Himanshu Tir Kaman Wale. Crafted for aspiring archers, academies, and traditional sport enthusiasts. Easy takedown for effortless transport, reliable limb anchoring, and forgiving release geometry.',
    basePrice: 2200,
    originalPrice: 2700,
    mainImage: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.37.48_PM_72001a52.jpeg',
    images: [
      '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.37.48_PM_72001a52.jpeg',
      '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.15_PM_ea7be31c.jpeg'
    ],
    stock: 22,
    sku: 'TIR-BOW-CLS-2200',
    isFeatured: true,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 56,
    specifications: {
      material: 'Sculpted Indian Sheesham Hardwood Riser & Resilient Limbs',
      length: '54 inches AMO',
      drawWeight: '24 lbs - 30 lbs',
      arrowsIncluded: 'Sold separately or in combo pack',
      origin: 'Chandu ji ka gara, Banswara, Rajasthan',
      finish: 'Natural Grain Polyurethane Sealed',
      warranty: '1 Year Warranty',
      packageContents: '1x Riser, 2x Limbs, 1x Bowstring, 1x Basic Sight Pin'
    },
    variations: [
      {
        id: 'var-classic-dark-sheesham',
        name: 'Dark Indian Sheesham',
        finishName: 'Dark Sheesham',
        colorCode: '#3D251E',
        sku: 'TIR-BOW-CLS-DRK',
        price: 2200,
        originalPrice: 2700,
        stock: 14,
        image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.37.48_PM_72001a52.jpeg',
        specNote: 'Classic dark timber with contrast aluminum brackets'
      },
      {
        id: 'var-classic-light-teak',
        name: 'Light Golden Teak',
        finishName: 'Light Teak',
        colorCode: '#D89849',
        sku: 'TIR-BOW-CLS-LGT',
        price: 2200,
        originalPrice: 2700,
        stock: 8,
        image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.44.17_PM_39805559.jpeg',
        specNote: 'Bright natural golden grain'
      }
    ],
    tags: ['Traditional Sport', 'Entry Bow', 'Club Approved', 'Reliable'],
    published: true
  },
  {
    id: 'tirgar-traditional-bamboo-dhanush',
    name: 'TIRGAR Heritage Hand-Hewn Bamboo Dhanush Bow',
    slug: 'tirgar-heritage-hand-hewn-bamboo-dhanush-bow',
    categoryId: 'cat-traditional-bows',
    categoryName: 'Traditional Bows',
    shortDescription: 'The authentic monolithic Indian Dhanush made from aged fire-tempered bamboo. Lightweight, organic, and powerful.',
    description: 'Direct descendant of ancient Rajasthani and Mewar bowmaking traditions. Hand-selected single-culm bamboo from high-elevation forests, heat-treated over hot coals for spring tension, tapered with draw-knives, and strung with heavy-gauge flax cord. An organic archery masterpiece.',
    basePrice: 700,
    originalPrice: 950,
    mainImage: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.16_PM__1__50575f74.jpeg',
    images: [
      '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.16_PM__1__50575f74.jpeg',
      '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.44.58_PM_b1bb8043.jpeg'
    ],
    stock: 35,
    sku: 'TIR-BOW-TRAD-700',
    isFeatured: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 64,
    specifications: {
      material: '100% Wild Mature Bamboo (Banswara Hand-Seasoned)',
      length: '50 - 52 inches',
      drawWeight: '20 lbs - 28 lbs',
      arrowsIncluded: 'Pairs natively with Tirgar ₹70 & ₹80 Bamboo Arrows',
      origin: 'Chandu ji ka gara, Banswara, Rajasthan',
      finish: 'Pure Natural Bamboo with Raw Beeswax Polish',
      warranty: 'Handcrafted Heritage Guarantee',
      packageContents: '1x Full Bamboo Longbow (Dhanush) + Pre-stretched Bowstring'
    },
    variations: [
      {
        id: 'var-dhanush-standard',
        name: 'Standard Heritage Dhanush (50")',
        finishName: 'Natural Bamboo Straw',
        colorCode: '#D8C386',
        sku: 'TIR-BOW-TRAD-STD',
        price: 700,
        originalPrice: 950,
        stock: 25,
        image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.16_PM__1__50575f74.jpeg',
        specNote: 'Authentic 50-inch natural straw yellow bamboo'
      },
      {
        id: 'var-dhanush-fire-cured',
        name: 'Fire-Cured Heavy Tension (54")',
        finishName: 'Smoked Flame Tempered',
        colorCode: '#6B4226',
        sku: 'TIR-BOW-TRAD-HVY',
        price: 850,
        originalPrice: 1100,
        stock: 10,
        image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.16_PM__1__50575f74.jpeg',
        specNote: 'Deep fire-tempered amber bamboo with 30 lbs draw'
      }
    ],
    tags: ['Dhanush', 'Bamboo Bow', 'Authentic Indian', 'Heritage'],
    published: true
  },
  {
    id: 'tirgar-forged-leaf-broadhead-arrows',
    name: 'TIRGAR Hand-Forged Leaf-Blade Broadhead Bamboo Arrows',
    slug: 'tirgar-hand-forged-leaf-blade-broadhead-bamboo-arrows',
    categoryId: 'cat-arrows',
    categoryName: 'Wooden & Bamboo Arrows',
    shortDescription: 'Hand-hammered iron leaf-blade broadheads mounted on flame-straightened bamboo shafts with feather fletching.',
    description: 'Hand-forged by traditional ironsmiths of Rajasthan. Each steel point is shaped into a symmetric aerodynamic leaf blade, hafted onto hand-straightened bamboo shafts, wrapped with high-tensile white sinew thread, and finished with natural barred turkey feathers for steady arrow flight.',
    basePrice: 80,
    originalPrice: 110,
    mainImage: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.18_PM_8303119e.jpeg',
    images: [
      '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.18_PM_8303119e.jpeg',
      '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.17_PM__1__5c2e36bd.jpeg',
      '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.44.56_PM_80f6bfbd.jpeg'
    ],
    stock: 250,
    sku: 'TIR-ARR-LEAF-80',
    isFeatured: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 78,
    specifications: {
      material: 'Heat-tempered Indian Bamboo Shaft + Hand-hammered Carbon Steel Point',
      length: '29 - 30 inches',
      drawWeight: 'Compatible with 20 - 45 lbs bows',
      arrowsIncluded: 'Select pack quantity (Single, Pack of 6, Pack of 12, or Bundle of 24)',
      origin: 'Chandu ji ka gara, Banswara, Rajasthan',
      finish: 'Black & White Whipping with Barred Feather Fletching',
      warranty: 'Inspection Guarantee against shaft cracks',
      packageContents: 'Handcrafted arrows securely packed in crush-proof wooden sheath'
    },
    variations: [
      {
        id: 'var-arr-leaf-single',
        name: 'Single Arrow (1 Teer)',
        finishName: '1 Teer',
        colorCode: '#A0A0A0',
        sku: 'TIR-ARR-LF-1',
        price: 80,
        originalPrice: 110,
        stock: 100,
        image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.18_PM_8303119e.jpeg',
        specNote: '1 Individual leaf broadhead arrow (₹80 / Ek Teer)'
      },
      {
        id: 'var-arr-leaf-pack6',
        name: 'Pack of 6 Arrows (6 Teer)',
        finishName: '6 Teer Pack',
        colorCode: '#D4AF37',
        sku: 'TIR-ARR-LF-6',
        price: 450,
        originalPrice: 550,
        stock: 50,
        image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.17_PM__1__5c2e36bd.jpeg',
        specNote: 'Pack of 6 broadhead arrows with special savings'
      },
      {
        id: 'var-arr-leaf-pack12',
        name: 'Pack of 12 Arrows (12 Teer Dozen)',
        finishName: '12 Teer Dozen',
        colorCode: '#B89326',
        sku: 'TIR-ARR-LF-12',
        price: 850,
        originalPrice: 1100,
        stock: 30,
        image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.44.56_PM_80f6bfbd.jpeg',
        specNote: 'Full dozen 12-arrow quiver pack'
      }
    ],
    tags: ['Broadhead', 'Teer', 'Hand Forged', 'Banswara Archery'],
    published: true
  },
  {
    id: 'tirgar-forged-spiral-drill-arrows',
    name: 'TIRGAR Hand-Forged Spiral Steel Drill-Tip Arrows',
    slug: 'tirgar-hand-forged-spiral-steel-drill-tip-arrows',
    categoryId: 'cat-arrows',
    categoryName: 'Wooden & Bamboo Arrows',
    shortDescription: 'Twisted spiral steel points engineered for deep target penetration and rotational stabilization.',
    description: 'An exclusive Tirgar innovation: solid iron wire spiraled and hot-forged into a self-centering drill tip. Fast, durable, and resistant to tip bending upon hitting target foam or straw bails. Sealed with black lacquer and white thread winding.',
    basePrice: 70,
    originalPrice: 95,
    mainImage: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.44.07_PM_cb93ff52.jpeg',
    images: [
      '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.44.07_PM_cb93ff52.jpeg',
      '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.44.56_PM_80f6bfbd.jpeg'
    ],
    stock: 300,
    sku: 'TIR-ARR-SPIRAL-70',
    isFeatured: true,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 51,
    specifications: {
      material: 'Spiral Twisted Hot-Forged Steel + Premium Bamboo Shaft',
      length: '29 inches',
      drawWeight: 'Suitable for 20 - 40 lbs',
      arrowsIncluded: 'Single or pack bundles',
      origin: 'Chandu ji ka gara, Banswara, Rajasthan',
      finish: 'Coated Spiral Steel with White Fiber Reinforcement',
      warranty: 'Satisfaction Guarantee',
      packageContents: 'Secure protective tube packaging'
    },
    variations: [
      {
        id: 'var-arr-sp-single',
        name: 'Single Arrow (1 Teer)',
        finishName: '1 Teer',
        colorCode: '#777777',
        sku: 'TIR-ARR-SP-1',
        price: 70,
        originalPrice: 95,
        stock: 120,
        image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.44.07_PM_cb93ff52.jpeg',
        specNote: '₹70 / Ek Teer single unit'
      },
      {
        id: 'var-arr-sp-pack6',
        name: 'Pack of 6 Spiral Arrows',
        finishName: '6 Teer Pack',
        colorCode: '#D4AF37',
        sku: 'TIR-ARR-SP-6',
        price: 399,
        originalPrice: 480,
        stock: 40,
        image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.44.07_PM_cb93ff52.jpeg',
        specNote: 'Pack of 6 target spiral arrows'
      },
      {
        id: 'var-arr-sp-pack12',
        name: 'Pack of 12 Spiral Arrows',
        finishName: '12 Teer Pack',
        colorCode: '#B89326',
        sku: 'TIR-ARR-SP-12',
        price: 750,
        originalPrice: 950,
        stock: 25,
        image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.44.56_PM_80f6bfbd.jpeg',
        specNote: 'Dozen pack with bonus storage ties'
      }
    ],
    tags: ['Spiral Tip', 'Target Arrow', 'Bamboo Shaft', '₹70 per arrow'],
    published: true
  },
  {
    id: 'tirgar-forged-barbed-harpoon-arrows',
    name: 'TIRGAR Hand-Forged Barbed Harpoon Bamboo Arrows',
    slug: 'tirgar-hand-forged-barbed-harpoon-bamboo-arrows',
    categoryId: 'cat-arrows',
    categoryName: 'Wooden & Bamboo Arrows',
    shortDescription: 'Traditional barbed forged arrowheads created following historical Rajasthani tribal patterns.',
    description: 'Forged with single and double recurve barbs behind the needle-sharp point. Finished with hand-wrapped sinew and fletched with wild feathers. Demonstrates the authentic heritage archery of the Vagad region in southern Rajasthan.',
    basePrice: 70,
    originalPrice: 95,
    mainImage: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.17_PM__2__60ea523f.jpeg',
    images: [
      '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.17_PM__2__60ea523f.jpeg',
      '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.17_PM_0e6ab1f1.jpeg',
      '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.44.56_PM_80f6bfbd.jpeg'
    ],
    stock: 180,
    sku: 'TIR-ARR-BARB-70',
    isFeatured: false,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 34,
    specifications: {
      material: 'Barbed Carbon Iron + Seasoned Bamboo Shaft',
      length: '30 inches',
      drawWeight: '20 - 45 lbs',
      arrowsIncluded: 'Individual or packs',
      origin: 'Chandu ji ka gara, Banswara, Rajasthan',
      finish: 'Ancient Tribal Forged Iron with Flax Cord Whipping',
      warranty: 'Inspection Guarantee',
      packageContents: 'Packaged in padded cardboard & bubble wrap'
    },
    variations: [
      {
        id: 'var-arr-barb-single',
        name: 'Single Barbed Arrow (1 Teer)',
        finishName: '1 Teer Barbed',
        colorCode: '#666666',
        sku: 'TIR-ARR-BB-1',
        price: 70,
        originalPrice: 95,
        stock: 90,
        image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.17_PM__2__60ea523f.jpeg',
        specNote: '₹70 / Ek Teer authentic barbed arrow'
      },
      {
        id: 'var-arr-barb-pack6',
        name: 'Pack of 6 Barbed Arrows',
        finishName: '6 Teer Pack',
        colorCode: '#D4AF37',
        sku: 'TIR-ARR-BB-6',
        price: 399,
        originalPrice: 480,
        stock: 30,
        image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.17_PM_0e6ab1f1.jpeg',
        specNote: 'Pack of 6 barbed arrows'
      }
    ],
    tags: ['Barbed Teer', 'Tribal Archery', 'Heritage Arrow', 'Himanshu Tirgar'],
    published: true
  },
  {
    id: 'tirgar-artisan-kaman-wooden-handle',
    name: 'TIRGAR Artisan Handcrafted Kaman Wooden Handle / Riser',
    slug: 'tirgar-artisan-handcrafted-kaman-wooden-handle-riser',
    categoryId: 'cat-handles',
    categoryName: 'Kaman Handles & Risers',
    shortDescription: 'Custom-sculpted wooden handle risers with reinforced aluminum limb sockets. Available in multiple finishes.',
    description: 'Precision-shaped by Himanshu Tirgar to fit naturally in the human palm with positive throat contour and thumb rest. Finished with heavy-duty aluminum end caps secured with solid rivets, ready to receive standard takedown limbs.',
    basePrice: 1200,
    originalPrice: 1500,
    mainImage: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.44.17_PM_39805559.jpeg',
    images: [
      '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.44.17_PM_39805559.jpeg',
      '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.44.57_PM_08015242.jpeg'
    ],
    stock: 25,
    sku: 'TIR-HDL-WOOD-1200',
    isFeatured: true,
    isBestSeller: false,
    rating: 4.9,
    reviewCount: 27,
    specifications: {
      material: 'Choice of Hardwood (Teak, Rosewood, Smoked Oak, Padauk)',
      length: '18 inches',
      drawWeight: 'Supports limbs up to 50 lbs',
      arrowsIncluded: 'Riser only',
      origin: 'Chandu ji ka gara, Banswara, Rajasthan',
      finish: 'Deep Grain Poly Varnish with Aluminum Socket Shoes',
      warranty: '2 Year Riser Craftsmanship Warranty',
      packageContents: '1x Carved Handle Riser with integrated arrow rest'
    },
    variations: [
      {
        id: 'var-hdl-amber-teak',
        name: 'Honey Amber Teak Riser',
        finishName: 'Honey Amber Teak',
        colorCode: '#D97706',
        sku: 'TIR-HDL-AMB',
        price: 1200,
        originalPrice: 1500,
        stock: 8,
        image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.44.17_PM_39805559.jpeg',
        specNote: 'Warm amber natural wood tone with silver brackets'
      },
      {
        id: 'var-hdl-magenta-rosewood',
        name: 'Royal Magenta Rosewood Riser',
        finishName: 'Royal Magenta Padauk',
        colorCode: '#9D174D',
        sku: 'TIR-HDL-MAG',
        price: 1350,
        originalPrice: 1650,
        stock: 5,
        image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.44.17_PM_39805559.jpeg',
        specNote: 'Stunning magenta-stained hardwood with silver pockets'
      },
      {
        id: 'var-hdl-smoked-oak',
        name: 'Smoked Forest Oak Riser',
        finishName: 'Smoked Forest Oak',
        colorCode: '#3F3F46',
        sku: 'TIR-HDL-SMK',
        price: 1300,
        originalPrice: 1600,
        stock: 6,
        image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.44.17_PM_39805559.jpeg',
        specNote: 'Mottled dark olive and smoked oak texture'
      },
      {
        id: 'var-hdl-natural-grain',
        name: 'Natural Blonde Pine & Teak',
        finishName: 'Natural Blonde',
        colorCode: '#FBBF24',
        sku: 'TIR-HDL-NAT',
        price: 1200,
        originalPrice: 1500,
        stock: 6,
        image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.44.17_PM_39805559.jpeg',
        specNote: 'Clear lacquered natural timber grain'
      }
    ],
    tags: ['Kaman Handle', 'Riser', 'Best Quality', 'Himanshu Tirgar'],
    published: true
  },
  {
    id: 'tirgar-full-stock-bamboo-arrow-bundle',
    name: 'TIRGAR Bulk Quiver Stock Bamboo Arrows (Bundle of 20)',
    slug: 'tirgar-bulk-quiver-stock-bamboo-arrows-bundle-20',
    categoryId: 'cat-arrows',
    categoryName: 'Wooden & Bamboo Arrows',
    shortDescription: 'Full archer quiver bundle: 20 match-spined bamboo arrows with mixed target points and feather fletchings.',
    description: 'Bulk bundle for serious practice and archery enthusiasts. 20 matched straight bamboo arrows, weight-sorted within ±2 grams, each equipped with durable hand-wound steel tips and feathered tails.',
    basePrice: 1400,
    originalPrice: 1750,
    mainImage: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.44.56_PM_80f6bfbd.jpeg',
    images: [
      '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.44.56_PM_80f6bfbd.jpeg',
      '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.18_PM_8303119e.jpeg'
    ],
    stock: 20,
    sku: 'TIR-ARR-BDL-20',
    isFeatured: false,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 45,
    specifications: {
      material: 'Grade-A Rajasthan Bamboo + Carbon Steel Tips',
      length: '29.5 inches',
      drawWeight: '20 - 45 lbs',
      arrowsIncluded: '20 Full-Length Bamboo Arrows in Bundle',
      origin: 'Chandu ji ka gara, Banswara, Rajasthan',
      finish: 'Whipped Thread Collars with Natural Feather Tails',
      warranty: 'Inspection Guarantee',
      packageContents: '1x Bundle of 20 Arrows in protective travel carton'
    },
    variations: [
      {
        id: 'var-bundle-spiral',
        name: '20x Spiral Target Tips',
        finishName: 'Spiral Point Bundle',
        colorCode: '#A0A0A0',
        sku: 'TIR-ARR-BDL-SP',
        price: 1400,
        originalPrice: 1750,
        stock: 12,
        image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.44.56_PM_80f6bfbd.jpeg',
        specNote: 'Best for target practice & straw bosses'
      },
      {
        id: 'var-bundle-leaf',
        name: '20x Leaf Broadhead Tips',
        finishName: 'Broadhead Bundle',
        colorCode: '#D4AF37',
        sku: 'TIR-ARR-BDL-LF',
        price: 1550,
        originalPrice: 1950,
        stock: 8,
        image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.44.56_PM_80f6bfbd.jpeg',
        specNote: 'Classic broadhead leaf points'
      }
    ],
    tags: ['Arrow Bundle', 'Teer', 'Bulk Archery', 'Best Value'],
    published: true
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'c1',
    code: 'TIRGAR10',
    discountType: 'percentage',
    value: 10,
    minOrderValue: 999,
    active: true,
    description: '10% off on all orders above ₹999'
  },
  {
    id: 'c2',
    code: 'HERITAGE200',
    discountType: 'fixed',
    value: 200,
    minOrderValue: 1999,
    active: true,
    description: 'Flat ₹200 off on premium bows and combos above ₹1,999'
  },
  {
    id: 'c3',
    code: 'BANSWARA',
    discountType: 'percentage',
    value: 15,
    minOrderValue: 2499,
    active: true,
    description: '15% off artisan celebration discount on orders above ₹2,499'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'tirgar-deluxe-padauk-bow',
    author: 'Vikramaditya Singh Rathore',
    location: 'Udaipur, Rajasthan',
    rating: 5,
    date: '3 days ago',
    comment: 'The woodwork on the Padauk bow is phenomenal. The limb alignment is true, and the arrow release is dead silent. Himanshu ji personally answered my call and gave advice on draw weight.',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    productId: 'tirgar-forged-leaf-broadhead-arrows',
    author: 'Arjun Sen',
    location: 'Bhopal, Madhya Pradesh',
    rating: 5,
    date: '1 week ago',
    comment: 'Ordered 12 broadhead arrows. The iron forging is genuine hand-work, not stamped metal. Beautifully feathered and they fly very straight with my 35 lb bow.',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    productId: 'tirgar-master-combo-arrows',
    author: 'Ramesh Patel',
    location: 'Ahmedabad, Gujarat',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Received via express courier in 3 days. Packed in a sturdy wooden case. The bow shoots with astonishing punch and the handle feels great in the palm.',
    verifiedPurchase: true
  },
  {
    id: 'rev-4',
    productId: 'tirgar-traditional-bamboo-dhanush',
    author: 'Col. Sanjeev Nair (Retd.)',
    location: 'Dehradun, Uttarakhand',
    rating: 5,
    date: '1 month ago',
    comment: 'At ₹700, this traditional bamboo dhanush is a piece of living heritage. Natural bamboo with fire tempering. My grandson and I practice every weekend.',
    verifiedPurchase: true
  }
];

export const INITIAL_STORE_SETTINGS: StoreSettings = {
  storeName: 'TIRGAR',
  brandOwner: 'Himanshu Tirgar',
  tagline: 'ROOTED IN HERITAGE. BUILT FOR GENERATIONS.',
  phone: '+91 95710 30853',
  whatsapp: '+919571030853',
  secondaryPhone: '+91 98285 76885, 88290 25588',
  email: 'himanshutirgar@gmail.com',
  address: {
    village: 'Chandu ji ka gara',
    vpo: 'Chandu ji ka gara',
    tehsil: 'Ganoda',
    district: 'Banswara',
    state: 'Rajasthan',
    pincode: '327001'
  },
  freeShippingThreshold: 1999,
  shippingFee: 150,
  codEnabled: true,
  razorpayEnabled: false,
  announcementBarText: 'ALL INDIA DELIVERY AVAILABLE | GENUINE RAJASTHANI HANDCRAFTED ARCHERY | CALL / WHATSAPP: +91 95710 30853',
  announcementActive: true
};

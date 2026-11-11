export interface ProductVariation {
  id: string;
  name: string;
  finishName: string;
  colorCode?: string;
  sku: string;
  price: number;
  originalPrice?: number;
  stock: number;
  image: string;
  additionalImages?: string[];
  drawWeight?: string;
  specNote?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  description: string;
  shortDescription: string;
  basePrice: number;
  originalPrice?: number;
  images: string[];
  mainImage: string;
  stock: number;
  sku: string;
  isFeatured: boolean;
  isBestSeller: boolean;
  rating: number;
  reviewCount: number;
  specifications: {
    material: string;
    length: string;
    drawWeight?: string;
    arrowsIncluded?: string;
    origin: string;
    finish: string;
    warranty: string;
    packageContents: string;
  };
  variations: ProductVariation[];
  tags: string[];
  published: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  badge?: string;
}

export interface CartItem {
  productId: string;
  variationId?: string;
  productName: string;
  variationName?: string;
  price: number;
  image: string;
  quantity: number;
  maxStock: number;
  sku: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minOrderValue: number;
  active: boolean;
  description: string;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface OrderCustomer {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: OrderCustomer;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shipping: number;
  total: number;
  paymentMethod: 'COD' | 'Razorpay';
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  orderStatus: OrderStatus;
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    note: string;
  }[];
  trackingNumber?: string;
  courierPartner?: string;
  adminNotes?: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface CustomOrderRequest {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  city: string;
  bowType: string;
  preferredWood: string;
  drawWeight: string;
  userHeight: string;
  dominantHand: 'Right' | 'Left';
  arrowQuantity: number;
  arrowTipType: string;
  customEngraving?: string;
  notes?: string;
  date: string;
  status: 'New' | 'In Consultation' | 'In Production' | 'Completed';
}

export interface StoreSettings {
  storeName: string;
  brandOwner: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  secondaryPhone: string;
  email: string;
  address: {
    village: string;
    vpo: string;
    tehsil: string;
    district: string;
    state: string;
    pincode: string;
  };
  freeShippingThreshold: number;
  shippingFee: number;
  codEnabled: boolean;
  razorpayEnabled: boolean;
  announcementBarText: string;
  announcementActive: boolean;
}

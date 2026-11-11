import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  ProductVariation,
  Category,
  CartItem,
  Coupon,
  Order,
  OrderCustomer,
  OrderStatus,
  Review,
  CustomOrderRequest,
  StoreSettings
} from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_COUPONS,
  INITIAL_REVIEWS,
  INITIAL_STORE_SETTINGS
} from '../data/initialData';

interface StoreContextType {
  // Navigation
  activeView: string;
  setActiveView: (view: string) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  cartDrawerOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;
  customModalOpen: boolean;
  setCustomModalOpen: (open: boolean) => void;
  searchModalOpen: boolean;
  setSearchModalOpen: (open: boolean) => void;
  globalSearchQuery: string;
  setGlobalSearchQuery: (q: string) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (catId: string) => void;

  // Products
  products: Product[];
  categories: Category[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;

  // Categories
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, variation?: ProductVariation, quantity?: number) => { success: boolean; message: string };
  removeFromCart: (productId: string, variationId?: string) => void;
  updateCartQuantity: (productId: string, variationId: string | undefined, quantity: number) => { success: boolean; message: string };
  clearCart: () => void;
  cartTotalCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  finalTotal: number;

  // Coupons
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  addCoupon: (coupon: Omit<Coupon, 'id'>) => void;
  deleteCoupon: (id: string) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Orders
  orders: Order[];
  createOrder: (customer: OrderCustomer, paymentMethod: 'COD' | 'Razorpay', adminNotes?: string) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string, trackingNumber?: string) => void;
  getOrderByIdAndPhone: (orderNumber: string, phone: string) => Order | undefined;
  lastPlacedOrder: Order | null;
  setLastPlacedOrder: (order: Order | null) => void;

  // Custom Orders
  customOrders: CustomOrderRequest[];
  submitCustomOrder: (request: Omit<CustomOrderRequest, 'id' | 'date' | 'status'>) => CustomOrderRequest;
  updateCustomOrderStatus: (id: string, status: CustomOrderRequest['status']) => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;

  // Settings
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;

  // Admin Auth
  isAdmin: boolean;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;

  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'tirgar_products_v2',
  CATEGORIES: 'tirgar_categories_v2',
  CART: 'tirgar_cart_v2',
  ORDERS: 'tirgar_orders_v2',
  COUPONS: 'tirgar_coupons_v2',
  WISHLIST: 'tirgar_wishlist_v2',
  REVIEWS: 'tirgar_reviews_v2',
  SETTINGS: 'tirgar_settings_v2',
  CUSTOM_ORDERS: 'tirgar_custom_orders_v2',
  ADMIN_AUTH: 'tirgar_admin_auth_v2'
};

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation State
  const [activeView, setActiveView] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState<boolean>(false);
  const [customModalOpen, setCustomModalOpen] = useState<boolean>(false);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Products State
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Categories State
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Coupons State
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COUPONS);
      return saved ? JSON.parse(saved) : INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  });
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Wishlist State
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (saved) return JSON.parse(saved);
      // Sample Initial Order for demonstration
      const sampleOrder: Order = {
        id: 'ord-initial-1',
        orderNumber: 'TIR-2026-9812',
        date: new Date(Date.now() - 86400000 * 2).toISOString(),
        customer: {
          fullName: 'Rajendra Singh Shekhawat',
          phone: '9829012345',
          email: 'rajendra.archery@gmail.com',
          address: 'Plot 45, Heritage Enclave, Near City Palace',
          city: 'Jaipur',
          state: 'Rajasthan',
          pincode: '302001'
        },
        items: [
          {
            productId: 'tirgar-deluxe-padauk-bow',
            variationId: 'var-padauk-red',
            productName: 'TIRGAR Deluxe Padauk Wooden Takedown Bow',
            variationName: 'Royal Padauk Crimson',
            price: 3500,
            image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.15_PM__1__216506e2.jpeg',
            quantity: 1,
            maxStock: 6,
            sku: 'TIR-BOW-PAD-RED'
          },
          {
            productId: 'tirgar-forged-leaf-broadhead-arrows',
            variationId: 'var-arr-leaf-pack6',
            productName: 'TIRGAR Hand-Forged Leaf-Blade Broadhead Bamboo Arrows',
            variationName: 'Pack of 6 Arrows (6 Teer)',
            price: 450,
            image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.17_PM__1__5c2e36bd.jpeg',
            quantity: 1,
            maxStock: 50,
            sku: 'TIR-ARR-LF-6'
          }
        ],
        subtotal: 3950,
        discount: 200,
        couponCode: 'HERITAGE200',
        shipping: 0,
        total: 3750,
        paymentMethod: 'COD',
        paymentStatus: 'Pending',
        orderStatus: 'Shipped',
        statusHistory: [
          { status: 'Pending', timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), note: 'Order placed by customer (COD)' },
          { status: 'Confirmed', timestamp: new Date(Date.now() - 86400000 * 1.5).toISOString(), note: 'Confirmed by Himanshu Tirgar via phone' },
          { status: 'Processing', timestamp: new Date(Date.now() - 86400000).toISOString(), note: 'Artisan tuned, inspection passed, wood casing packed' },
          { status: 'Shipped', timestamp: new Date(Date.now() - 43200000).toISOString(), note: 'Handed to Express Courier' }
        ],
        trackingNumber: 'DELHIVERY-TIR-892182',
        courierPartner: 'Delhivery Express Pan-India'
      };
      return [sampleOrder];
    } catch {
      return [];
    }
  });

  // Custom Orders State
  const [customOrders, setCustomOrders] = useState<CustomOrderRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Reviews State
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // Settings State
  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : INITIAL_STORE_SETTINGS;
    } catch {
      return INITIAL_STORE_SETTINGS;
    }
  });

  // Admin Auth State
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Persist State to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    } catch (e) {
      console.error(e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(coupons));
    } catch (e) {
      console.error(e);
    }
  }, [coupons]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_ORDERS, JSON.stringify(customOrders));
    } catch (e) {
      console.error(e);
    }
  }, [customOrders]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Cart Calculations
  const cartTotalCount = cart.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let discount = 0;
  if (appliedCoupon) {
    if (subtotal >= appliedCoupon.minOrderValue) {
      if (appliedCoupon.discountType === 'percentage') {
        discount = Math.round((subtotal * appliedCoupon.value) / 100);
      } else {
        discount = appliedCoupon.value;
      }
    }
  }

  const shipping = subtotal === 0 || subtotal >= settings.freeShippingThreshold ? 0 : settings.shippingFee;
  const finalTotal = Math.max(0, subtotal - discount) + shipping;

  // Cart Operations
  const addToCart = (product: Product, variation?: ProductVariation, quantity = 1) => {
    const selectedVar = variation || (product.variations.length > 0 ? product.variations[0] : undefined);
    const price = selectedVar ? selectedVar.price : product.basePrice;
    const maxStock = selectedVar ? selectedVar.stock : product.stock;
    const image = selectedVar ? selectedVar.image : product.mainImage;
    const sku = selectedVar ? selectedVar.sku : product.sku;
    const varName = selectedVar ? selectedVar.name : undefined;
    const varId = selectedVar ? selectedVar.id : undefined;

    if (maxStock <= 0) {
      showToast(`Sorry, ${product.name} is currently out of stock.`);
      return { success: false, message: 'Item is out of stock' };
    }

    const existingIndex = cart.findIndex(
      item => item.productId === product.id && item.variationId === varId
    );

    if (existingIndex > -1) {
      const currentQty = cart[existingIndex].quantity;
      if (currentQty + quantity > maxStock) {
        showToast(`Only ${maxStock} units available in stock.`);
        return { success: false, message: `Stock limit reached (${maxStock} units)` };
      }

      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      setCart(updated);
      showToast(`Added another to bag: ${product.name}`);
      return { success: true, message: 'Cart updated' };
    } else {
      if (quantity > maxStock) {
        showToast(`Only ${maxStock} units available.`);
        return { success: false, message: `Only ${maxStock} available` };
      }

      setCart([
        ...cart,
        {
          productId: product.id,
          variationId: varId,
          productName: product.name,
          variationName: varName,
          price,
          image,
          quantity,
          maxStock,
          sku
        }
      ]);
      showToast(`Added to your bag: ${product.name}`);
      return { success: true, message: 'Added to cart' };
    }
  };

  const removeFromCart = (productId: string, variationId?: string) => {
    setCart(prev => prev.filter(item => !(item.productId === productId && item.variationId === variationId)));
    showToast('Item removed from cart');
  };

  const updateCartQuantity = (productId: string, variationId: string | undefined, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variationId);
      return { success: true, message: 'Removed from cart' };
    }

    const item = cart.find(i => i.productId === productId && i.variationId === variationId);
    if (!item) return { success: false, message: 'Item not found' };

    if (quantity > item.maxStock) {
      showToast(`Cannot exceed stock limit of ${item.maxStock}`);
      return { success: false, message: `Only ${item.maxStock} available` };
    }

    setCart(prev =>
      prev.map(i => {
        if (i.productId === productId && i.variationId === variationId) {
          return { ...i, quantity };
        }
        return i;
      })
    );
    return { success: true, message: 'Quantity updated' };
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    const found = coupons.find(c => c.code.toUpperCase() === clean && c.active);

    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code' };
    }

    if (subtotal < found.minOrderValue) {
      return {
        success: false,
        message: `Coupon requires minimum order of ₹${found.minOrderValue.toLocaleString('en-IN')}`
      };
    }

    setAppliedCoupon(found);
    showToast(`Coupon applied: ${found.code} saved ₹${found.discountType === 'percentage' ? `${found.value}%` : `₹${found.value}`}`);
    return { success: true, message: 'Coupon applied successfully' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed');
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast('Removed from wishlist');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Added to your wishlist');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // Orders
  const createOrder = (customer: OrderCustomer, paymentMethod: 'COD' | 'Razorpay', adminNotes?: string): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `TIR-2026-${randomSuffix}`;
    const orderId = `ord-${Date.now()}`;
    const nowIso = new Date().toISOString();

    const newOrder: Order = {
      id: orderId,
      orderNumber,
      date: nowIso,
      customer,
      items: [...cart],
      subtotal,
      discount,
      couponCode: appliedCoupon?.code,
      shipping,
      total: finalTotal,
      paymentMethod,
      paymentStatus: 'Pending',
      orderStatus: 'Pending',
      statusHistory: [
        {
          status: 'Pending',
          timestamp: nowIso,
          note: paymentMethod === 'COD'
            ? 'Order placed with Cash on Delivery. Awaiting workshop confirmation.'
            : 'Order initiated with online gateway.'
        }
      ],
      adminNotes
    };

    // Deduct stock safely
    setProducts(prevProducts => {
      return prevProducts.map(p => {
        const cartMatches = cart.filter(ci => ci.productId === p.id);
        if (cartMatches.length === 0) return p;

        let newProductStock = p.stock;
        const updatedVariations = p.variations.map(v => {
          const vMatch = cartMatches.find(ci => ci.variationId === v.id);
          if (vMatch) {
            const newVarStock = Math.max(0, v.stock - vMatch.quantity);
            newProductStock = Math.max(0, newProductStock - vMatch.quantity);
            return { ...v, stock: newVarStock };
          }
          return v;
        });

        // Deduct items without variation if any
        const noVarMatch = cartMatches.find(ci => !ci.variationId);
        if (noVarMatch) {
          newProductStock = Math.max(0, newProductStock - noVarMatch.quantity);
        }

        return {
          ...p,
          stock: newProductStock,
          variations: updatedVariations
        };
      });
    });

    setOrders(prev => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, note?: string, trackingNumber?: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          const updatedHistory = [
            ...ord.statusHistory,
            {
              status,
              timestamp: new Date().toISOString(),
              note: note || `Status updated to ${status}`
            }
          ];
          return {
            ...ord,
            orderStatus: status,
            trackingNumber: trackingNumber || ord.trackingNumber,
            statusHistory: updatedHistory
          };
        }
        return ord;
      })
    );
    showToast(`Order status updated to ${status}`);
  };

  const getOrderByIdAndPhone = (orderNumber: string, phone: string): Order | undefined => {
    const cleanNum = orderNumber.trim().toUpperCase();
    const cleanPhone = phone.trim().replace(/\D/g, '').slice(-10);

    return orders.find(ord => {
      const ordNum = ord.orderNumber.trim().toUpperCase();
      const ordPhone = ord.customer.phone.trim().replace(/\D/g, '').slice(-10);
      return ordNum === cleanNum && ordPhone === cleanPhone;
    });
  };

  // Custom Orders
  const submitCustomOrder = (request: Omit<CustomOrderRequest, 'id' | 'date' | 'status'>): CustomOrderRequest => {
    const newRequest: CustomOrderRequest = {
      ...request,
      id: `custom-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'New'
    };
    setCustomOrders(prev => [newRequest, ...prev]);
    showToast('Your custom archery request has been received!');
    return newRequest;
  };

  const updateCustomOrderStatus = (id: string, status: CustomOrderRequest['status']) => {
    setCustomOrders(prev =>
      prev.map(item => (item.id === id ? { ...item, status } : item))
    );
    showToast(`Custom order status updated to ${status}`);
  };

  // Product CRUD
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast('New product added to catalogue');
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updatedFields } : p))
    );
    showToast('Product updated successfully');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product removed');
  };

  const getProductById = (id: string) => {
    return products.find(p => p.id === id || p.slug === id);
  };

  // Category CRUD
  const addCategory = (categoryData: Omit<Category, 'id'>) => {
    const newCat: Category = {
      ...categoryData,
      id: `cat-${Date.now()}`
    };
    setCategories(prev => [...prev, newCat]);
    showToast('Category added');
  };

  const updateCategory = (id: string, updatedFields: Partial<Category>) => {
    setCategories(prev =>
      prev.map(c => (c.id === id ? { ...c, ...updatedFields } : c))
    );
    showToast('Category updated');
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    showToast('Category removed');
  };

  // Coupons CRUD
  const addCoupon = (couponData: Omit<Coupon, 'id'>) => {
    const newCoupon: Coupon = {
      ...couponData,
      id: `c-${Date.now()}`
    };
    setCoupons(prev => [newCoupon, ...prev]);
    showToast('New coupon created');
  };

  const deleteCoupon = (id: string) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
    showToast('Coupon deleted');
  };

  // Reviews
  const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now'
    };
    setReviews(prev => [newRev, ...prev]);
    showToast('Thank you! Your genuine review has been recorded.');
  };

  // Store Settings
  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    showToast('Store settings saved');
  };

  // Admin Auth
  const loginAdmin = (pin: string) => {
    // PIN 1234 or 9571 or password
    if (pin === '1234' || pin === '9571' || pin === 'tirgar2026') {
      setIsAdmin(true);
      try {
        localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      } catch (e) {
        console.error(e);
      }
      showToast('Admin session unlocked');
      return true;
    }
    showToast('Invalid admin access code');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    try {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    } catch (e) {
      console.error(e);
    }
    showToast('Signed out of admin panel');
  };

  return (
    <StoreContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedProductId,
        setSelectedProductId,
        cartDrawerOpen,
        setCartDrawerOpen,
        customModalOpen,
        setCustomModalOpen,
        searchModalOpen,
        setSearchModalOpen,
        globalSearchQuery,
        setGlobalSearchQuery,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        products,
        categories,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        addCategory,
        updateCategory,
        deleteCategory,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotalCount,
        subtotal,
        discount,
        shipping,
        finalTotal,
        coupons,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        addCoupon,
        deleteCoupon,
        wishlist,
        toggleWishlist,
        isWishlisted,
        orders,
        createOrder,
        updateOrderStatus,
        getOrderByIdAndPhone,
        lastPlacedOrder,
        setLastPlacedOrder,
        customOrders,
        submitCustomOrder,
        updateCustomOrderStatus,
        reviews,
        addReview,
        settings,
        updateSettings,
        isAdmin,
        loginAdmin,
        logoutAdmin,
        toastMessage,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

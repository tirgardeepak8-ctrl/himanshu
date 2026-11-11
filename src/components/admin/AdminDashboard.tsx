import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Product,
  ProductVariation,
  OrderStatus,
  Category,
  Coupon
} from '../../types';
import {
  Shield,
  Package,
  ShoppingBag,
  Users,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  Truck,
  X,
  Search,
  Filter,
  Save,
  Lock,
  LogOut,
  AlertTriangle,
  ArrowRight,
  Settings,
  Tag,
  FolderTree,
  Compass,
  Eye,
  EyeOff
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    isAdmin,
    loginAdmin,
    logoutAdmin,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    categories,
    addCategory,
    deleteCategory,
    orders,
    updateOrderStatus,
    coupons,
    addCoupon,
    deleteCoupon,
    customOrders,
    updateCustomOrderStatus,
    settings,
    updateSettings,
    showToast,
    setActiveView
  } = useStore();

  const [pinInput, setPinInput] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'categories' | 'coupons' | 'custom' | 'settings'>('overview');

  // Product Edit / Add Modal state
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form fields for product
  const [pName, setPName] = useState('');
  const [pCategory, setPCategory] = useState(categories[0]?.id || '');
  const [pShortDesc, setPShortDesc] = useState('');
  const [pDesc, setPDesc] = useState('');
  const [pBasePrice, setPBasePrice] = useState<number>(1000);
  const [pOrigPrice, setPOrigPrice] = useState<number | undefined>(1200);
  const [pMainImage, setPMainImage] = useState('');
  const [pStock, setPStock] = useState<number>(10);
  const [pSku, setPSku] = useState('');
  const [pIsFeatured, setPIsFeatured] = useState(false);
  const [pIsBestSeller, setPIsBestSeller] = useState(false);
  const [pPublished, setPPublished] = useState(true);
  const [pVariations, setPVariations] = useState<ProductVariation[]>([]);

  // Variation subform
  const [varName, setVarName] = useState('');
  const [varFinish, setVarFinish] = useState('');
  const [varColor, setVarColor] = useState('#D4AF37');
  const [varPrice, setVarPrice] = useState<number>(1000);
  const [varStock, setVarStock] = useState<number>(5);
  const [varImage, setVarImage] = useState('');

  // Order Details Modal state
  const [selectedOrderForDetail, setSelectedOrderForDetail] = useState<string | null>(null);
  const [orderStatusChange, setOrderStatusChange] = useState<OrderStatus>('Pending');
  const [orderTrackingInput, setOrderTrackingInput] = useState('');
  const [orderNoteInput, setOrderNoteInput] = useState('');

  // Category Add state
  const [catName, setCatName] = useState('');
  const [catDesc, setCatDesc] = useState('');
  const [catImage, setCatImage] = useState('');

  // Coupon Add state
  const [cpCode, setCpCode] = useState('');
  const [cpType, setCpType] = useState<'percentage' | 'fixed'>('percentage');
  const [cpValue, setCpValue] = useState<number>(10);
  const [cpMin, setCpMin] = useState<number>(999);
  const [cpDesc, setCpDesc] = useState('');

  // Store Settings Form
  const [stAnnounce, setStAnnounce] = useState(settings.announcementBarText);
  const [stThreshold, setStThreshold] = useState(settings.freeShippingThreshold);
  const [stShipFee, setStShipFee] = useState(settings.shippingFee);
  const [stCod, setStCod] = useState(settings.codEnabled);

  // Filters for Order Table
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  // Handle Login
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAdmin(pinInput.trim());
    setPinInput('');
  };

  // Open Edit Product Modal
  const openEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setPName(prod.name);
    setPCategory(prod.categoryId);
    setPShortDesc(prod.shortDescription);
    setPDesc(prod.description);
    setPBasePrice(prod.basePrice);
    setPOrigPrice(prod.originalPrice);
    setPMainImage(prod.mainImage);
    setPStock(prod.stock);
    setPSku(prod.sku);
    setPIsFeatured(prod.isFeatured);
    setPIsBestSeller(prod.isBestSeller);
    setPPublished(prod.published);
    setPVariations([...prod.variations]);
    setProductModalOpen(true);
  };

  // Open Add Product Modal
  const openAddProduct = () => {
    setEditingProduct(null);
    setPName('');
    setPCategory(categories[0]?.id || '');
    setPShortDesc('');
    setPDesc('');
    setPBasePrice(2500);
    setPOrigPrice(2999);
    setPMainImage('/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.37.48_PM_72001a52.jpeg');
    setPStock(15);
    setPSku(`TIR-NEW-${Math.floor(100 + Math.random() * 900)}`);
    setPIsFeatured(false);
    setPIsBestSeller(false);
    setPPublished(true);
    setPVariations([]);
    setProductModalOpen(true);
  };

  // Add Variation to Product form
  const handleAddVariation = () => {
    if (!varName.trim()) {
      showToast('Please provide a name for the variation');
      return;
    }
    const newVar: ProductVariation = {
      id: `var-${Date.now()}`,
      name: varName.trim(),
      finishName: varFinish.trim() || varName.trim(),
      colorCode: varColor,
      sku: `${pSku || 'TIR'}-${varName.slice(0, 3).toUpperCase()}`,
      price: varPrice || pBasePrice,
      originalPrice: pOrigPrice,
      stock: varStock || 5,
      image: varImage.trim() || pMainImage
    };
    setPVariations([...pVariations, newVar]);
    setVarName('');
    setVarFinish('');
    showToast('Variation added');
  };

  const handleRemoveVariation = (id: string) => {
    setPVariations(pVariations.filter(v => v.id !== id));
  };

  // Save Product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pName.trim()) {
      showToast('Product name is required');
      return;
    }

    const catObj = categories.find(c => c.id === pCategory);
    const catName = catObj ? catObj.name : 'Archery Equipment';

    const prodPayload = {
      name: pName.trim(),
      slug: pName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      categoryId: pCategory,
      categoryName: catName,
      shortDescription: pShortDesc.trim(),
      description: pDesc.trim(),
      basePrice: Number(pBasePrice),
      originalPrice: pOrigPrice ? Number(pOrigPrice) : undefined,
      mainImage: pMainImage.trim(),
      images: [pMainImage.trim()],
      stock: Number(pStock),
      sku: pSku.trim(),
      isFeatured: pIsFeatured,
      isBestSeller: pIsBestSeller,
      rating: editingProduct?.rating || 4.9,
      reviewCount: editingProduct?.reviewCount || 1,
      specifications: editingProduct?.specifications || {
        material: 'Seasoned Indian Hardwood & Bamboo',
        length: '56 inches',
        drawWeight: '28-35 lbs',
        arrowsIncluded: 'Optional',
        origin: 'Banswara, Rajasthan',
        finish: 'Artisan Lacquer',
        warranty: '1 Year Warranty',
        packageContents: '1x Bow unit with string'
      },
      variations: pVariations,
      tags: ['Tirgar', 'Handmade', 'Archery'],
      published: pPublished
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, prodPayload);
    } else {
      addProduct(prodPayload);
    }
    setProductModalOpen(false);
  };

  // Add Category Handler
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;
    addCategory({
      name: catName.trim(),
      slug: catName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: catDesc.trim(),
      image: catImage.trim() || '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.37.48_PM_72001a52.jpeg'
    });
    setCatName('');
    setCatDesc('');
    setCatImage('');
  };

  // Add Coupon Handler
  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cpCode.trim()) return;
    addCoupon({
      code: cpCode.trim().toUpperCase(),
      discountType: cpType,
      value: Number(cpValue),
      minOrderValue: Number(cpMin),
      active: true,
      description: cpDesc.trim() || `${cpValue}${cpType === 'percentage' ? '%' : '₹'} discount`
    });
    setCpCode('');
    setCpDesc('');
  };

  // Update Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      announcementBarText: stAnnounce,
      freeShippingThreshold: Number(stThreshold),
      shippingFee: Number(stShipFee),
      codEnabled: stCod
    });
  };

  // Filtered Orders
  const filteredOrders = orders.filter(ord => {
    if (orderStatusFilter !== 'all' && ord.orderStatus !== orderStatusFilter) {
      return false;
    }
    if (orderSearchQuery.trim() !== '') {
      const q = orderSearchQuery.toLowerCase();
      const numMatch = ord.orderNumber.toLowerCase().includes(q);
      const nameMatch = ord.customer.fullName.toLowerCase().includes(q);
      const phoneMatch = ord.customer.phone.includes(q);
      if (!numMatch && !nameMatch && !phoneMatch) return false;
    }
    return true;
  });

  // Calculate High-Level Metrics
  const totalSales = orders
    .filter(o => o.orderStatus !== 'Cancelled')
    .reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.orderStatus === 'Pending').length;
  const completedOrders = orders.filter(o => o.orderStatus === 'Delivered').length;
  const lowStockProducts = products.filter(p => p.stock < 5);

  // If not logged in as Admin, show login screen
  if (!isAdmin) {
    return (
      <div className="bg-[#F7F4ED] min-h-screen py-16 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white border border-neutral-300 shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-[#171717] text-[#D4AF37] rounded-full flex items-center justify-center mx-auto border border-[#D4AF37]/40">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="font-display font-bold text-xl uppercase tracking-wider text-neutral-900">
              TIRGAR Artisan Admin Portal
            </h2>
            <p className="text-xs text-neutral-500">
              Enter master access PIN to manage products, customer orders, and workshop settings.
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                Security PIN Code
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={e => setPinInput(e.target.value)}
                placeholder="Enter PIN (Default: 1234)"
                className="w-full bg-[#F7F4ED] border border-neutral-300 p-3 text-center text-lg font-mono tracking-widest focus:outline-none focus:border-[#D4AF37]"
                autoFocus
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#171717] hover:bg-[#D4AF37] hover:text-neutral-950 text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-[#D4AF37]" />
              <span>Unlock Admin Panel</span>
            </button>
          </form>

          <div className="border-t border-neutral-200 pt-4 text-center text-[11px] text-neutral-400 space-y-1">
            <p>Authorized access for Himanshu Tirgar & workshop managers.</p>
            <p className="text-[#937418] font-mono">Workshop PIN hint: 1234 or 9571</p>
          </div>
        </div>
      </div>
    );
  }

  // Active Order Detail Modal
  const activeDetailOrder = selectedOrderForDetail
    ? orders.find(o => o.id === selectedOrderForDetail)
    : null;

  return (
    <div className="bg-[#F7F4ED] min-h-screen">
      {/* Admin Top Navigation */}
      <div className="bg-[#171717] text-white border-b border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-neutral-950 flex items-center justify-center font-bold font-display text-xs">
              T
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-sm tracking-widest uppercase text-white">
                  TIRGAR ARCHERY · WORKSHOP CONTROL
                </span>
                <span className="px-2 py-0.5 bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-mono uppercase">
                  Rajasthan Admin
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Owner: {settings.brandOwner} · {settings.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('shop')}
              className="px-3 py-1.5 border border-neutral-700 text-neutral-300 hover:text-white text-xs uppercase tracking-wider flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>View Storefront</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs uppercase tracking-wider flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock Panel</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Ribbon */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-1 border-t border-neutral-800 text-xs uppercase tracking-wider font-semibold">
          {[
            { id: 'overview', label: 'Overview', icon: DollarSign },
            { id: 'products', label: `Products (${products.length})`, icon: Package },
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'categories', label: `Categories (${categories.length})`, icon: FolderTree },
            { id: 'coupons', label: `Coupons (${coupons.length})`, icon: Tag },
            { id: 'custom', label: `Custom Requests (${customOrders.length})`, icon: Compass },
            { id: 'settings', label: 'Store Settings', icon: Settings }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-[#D4AF37] text-[#D4AF37] bg-white/5'
                    : 'border-transparent text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            {/* KPI Cards Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white p-5 border border-neutral-300 shadow-xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  Total Sales Revenue
                </span>
                <p className="font-mono font-bold text-2xl text-neutral-900">
                  ₹{totalSales.toLocaleString('en-IN')}
                </p>
                <p className="text-[10px] text-emerald-700 font-medium">Verified orders</p>
              </div>

              <div className="bg-white p-5 border border-neutral-300 shadow-xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  Total Orders
                </span>
                <p className="font-mono font-bold text-2xl text-neutral-900">
                  {totalOrders}
                </p>
                <p className="text-[10px] text-neutral-500">{pendingOrders} pending confirmation</p>
              </div>

              <div className="bg-white p-5 border border-neutral-300 shadow-xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  Products in Catalogue
                </span>
                <p className="font-mono font-bold text-2xl text-neutral-900">
                  {products.length}
                </p>
                <p className="text-[10px] text-neutral-500">
                  {products.reduce((acc, p) => acc + p.variations.length, 0)} dynamic finishes
                </p>
              </div>

              <div className="bg-white p-5 border border-neutral-300 shadow-xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  Low Stock Alerts
                </span>
                <p className="font-mono font-bold text-2xl text-amber-600">
                  {lowStockProducts.length}
                </p>
                <p className="text-[10px] text-amber-700">Needs workshop replenishment</p>
              </div>
            </div>

            {/* Quick Actions & Low Stock Watchlist */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Recent Orders (8 cols) */}
              <div className="lg:col-span-8 bg-white p-6 border border-neutral-300 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                  <h3 className="font-display font-bold text-sm uppercase tracking-wider text-neutral-900">
                    Recent Customer Orders
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-[#937418] font-bold uppercase hover:underline"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-neutral-100 text-neutral-600 uppercase font-semibold">
                      <tr>
                        <th className="p-2.5">Order ID</th>
                        <th className="p-2.5">Customer</th>
                        <th className="p-2.5">Items</th>
                        <th className="p-2.5">Amount</th>
                        <th className="p-2.5">Status</th>
                        <th className="p-2.5">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {orders.slice(0, 5).map(ord => (
                        <tr key={ord.id} className="hover:bg-neutral-50">
                          <td className="p-2.5 font-mono font-bold text-[#937418]">
                            {ord.orderNumber}
                          </td>
                          <td className="p-2.5">
                            <span className="font-semibold block">{ord.customer.fullName}</span>
                            <span className="text-neutral-500 text-[10px]">{ord.customer.city}, {ord.customer.state}</span>
                          </td>
                          <td className="p-2.5 text-neutral-600">
                            {ord.items.length} items
                          </td>
                          <td className="p-2.5 font-mono font-bold">
                            ₹{ord.total.toLocaleString('en-IN')}
                          </td>
                          <td className="p-2.5">
                            <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-neutral-100 border border-neutral-300">
                              {ord.orderStatus}
                            </span>
                          </td>
                          <td className="p-2.5">
                            <button
                              onClick={() => {
                                setSelectedOrderForDetail(ord.id);
                                setOrderStatusChange(ord.orderStatus);
                                setOrderTrackingInput(ord.trackingNumber || '');
                              }}
                              className="text-xs text-[#937418] hover:underline font-semibold"
                            >
                              Manage
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Low Stock Watchlist (4 cols) */}
              <div className="lg:col-span-4 bg-white p-6 border border-neutral-300 shadow-xs space-y-4">
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-neutral-900 border-b border-neutral-200 pb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>Workshop Inventory Alerts</span>
                </h3>

                {lowStockProducts.length === 0 ? (
                  <p className="text-xs text-neutral-500 italic">All archery models have healthy stock.</p>
                ) : (
                  <div className="space-y-3">
                    {lowStockProducts.map(p => (
                      <div key={p.id} className="p-2.5 bg-amber-50/70 border border-amber-200 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-semibold text-neutral-900 line-clamp-1">{p.name}</p>
                          <p className="text-[10px] text-amber-800">SKU: {p.sku}</p>
                        </div>
                        <span className="px-2 py-1 bg-amber-200 text-amber-900 font-bold font-mono text-xs">
                          {p.stock} left
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    onClick={openAddProduct}
                    className="w-full py-2.5 bg-[#171717] hover:bg-[#D4AF37] hover:text-neutral-950 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Archery Product</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="bg-white p-6 border border-neutral-300 shadow-xs space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
              <div>
                <h2 className="font-display font-bold text-lg uppercase tracking-wide text-neutral-900">
                  Product Inventory & Variations
                </h2>
                <p className="text-xs text-neutral-500">
                  Manage prices, descriptions, timber variations, SKUs, and stock.
                </p>
              </div>

              <button
                onClick={openAddProduct}
                className="px-4 py-2 bg-[#D4AF37] hover:bg-[#b89326] text-neutral-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#F7F4ED] text-neutral-700 uppercase font-bold border-b border-neutral-300">
                  <tr>
                    <th className="p-3">Product</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Base Price</th>
                    <th className="p-3">Finishes / Vars</th>
                    <th className="p-3">Total Stock</th>
                    <th className="p-3">Featured / Bestseller</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {products.map(prod => (
                    <tr key={prod.id} className="hover:bg-neutral-50">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.mainImage}
                            alt={prod.name}
                            className="w-12 h-14 object-cover bg-neutral-950 shrink-0 border border-neutral-300"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <span className="font-bold text-neutral-900 block max-w-xs">{prod.name}</span>
                            <span className="font-mono text-[10px] text-neutral-400">SKU: {prod.sku}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-neutral-700 font-medium">
                        {prod.categoryName}
                      </td>
                      <td className="p-3 font-mono font-bold text-neutral-900">
                        ₹{prod.basePrice.toLocaleString('en-IN')}
                        {prod.originalPrice && (
                          <span className="block text-[10px] text-neutral-400 line-through">
                            ₹{prod.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 bg-neutral-100 text-neutral-800 font-semibold text-[11px] border border-neutral-300">
                          {prod.variations.length} Finishes
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`font-mono font-bold ${prod.stock < 5 ? 'text-amber-600' : 'text-neutral-900'}`}>
                          {prod.stock} units
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1.5">
                          {prod.isFeatured && (
                            <span className="px-1.5 py-0.5 bg-[#D4AF37]/20 text-[#937418] text-[9px] font-bold uppercase">
                              Featured
                            </span>
                          )}
                          {prod.isBestSeller && (
                            <span className="px-1.5 py-0.5 bg-neutral-900 text-[#D4AF37] text-[9px] font-bold uppercase">
                              Bestseller
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditProduct(prod)}
                            className="p-1.5 text-neutral-600 hover:text-[#937418] transition-colors"
                            title="Edit Product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete product ${prod.name}?`)) {
                                deleteProduct(prod.id);
                              }
                            }}
                            className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="bg-white p-6 border border-neutral-300 shadow-xs space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
              <div>
                <h2 className="font-display font-bold text-lg uppercase tracking-wide text-neutral-900">
                  Customer Orders ({orders.length})
                </h2>
                <p className="text-xs text-neutral-500">
                  Update dispatch status, courier AWB tracking numbers, and view customer addresses.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={orderSearchQuery}
                    onChange={e => setOrderSearchQuery(e.target.value)}
                    placeholder="Search by order ID or customer..."
                    className="pl-8 pr-3 py-1.5 bg-[#F7F4ED] border border-neutral-300 text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <select
                  value={orderStatusFilter}
                  onChange={e => setOrderStatusFilter(e.target.value)}
                  className="bg-[#F7F4ED] border border-neutral-300 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-800 focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#F7F4ED] text-neutral-700 uppercase font-bold border-b border-neutral-300">
                  <tr>
                    <th className="p-3">Order ID & Date</th>
                    <th className="p-3">Customer & Phone</th>
                    <th className="p-3">Address</th>
                    <th className="p-3">Products Ordered</th>
                    <th className="p-3">Total Amount</th>
                    <th className="p-3">Payment</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {filteredOrders.map(ord => (
                    <tr key={ord.id} className="hover:bg-neutral-50">
                      <td className="p-3 font-mono font-bold text-[#937418]">
                        <span>{ord.orderNumber}</span>
                        <span className="block text-[10px] text-neutral-400 font-normal">
                          {new Date(ord.date).toLocaleDateString('en-IN')}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="font-bold text-neutral-900 block">{ord.customer.fullName}</span>
                        <a href={`tel:${ord.customer.phone}`} className="text-neutral-500 font-mono hover:text-neutral-900">
                          +91 {ord.customer.phone}
                        </a>
                      </td>
                      <td className="p-3 text-neutral-600 max-w-xs truncate">
                        {ord.customer.address}, {ord.customer.city}, {ord.customer.state} ({ord.customer.pincode})
                      </td>
                      <td className="p-3 text-neutral-800">
                        {ord.items.map((i, idx) => (
                          <div key={idx} className="line-clamp-1">
                            {i.quantity}x {i.productName} {i.variationName && `(${i.variationName})`}
                          </div>
                        ))}
                      </td>
                      <td className="p-3 font-mono font-bold text-neutral-900">
                        ₹{ord.total.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 bg-neutral-100 text-neutral-800 font-semibold text-[10px] uppercase">
                          {ord.paymentMethod}
                        </span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                            ord.orderStatus === 'Delivered'
                              ? 'bg-emerald-100 text-emerald-800'
                              : ord.orderStatus === 'Shipped'
                              ? 'bg-sky-100 text-sky-800'
                              : ord.orderStatus === 'Cancelled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {ord.orderStatus}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => {
                            setSelectedOrderForDetail(ord.id);
                            setOrderStatusChange(ord.orderStatus);
                            setOrderTrackingInput(ord.trackingNumber || '');
                          }}
                          className="px-3 py-1 bg-[#171717] hover:bg-[#D4AF37] hover:text-neutral-950 text-white font-semibold text-[11px] uppercase tracking-wider transition-colors"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: CATEGORIES MANAGEMENT */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Categories List (8 cols) */}
            <div className="lg:col-span-8 bg-white p-6 border border-neutral-300 shadow-xs space-y-4">
              <h2 className="font-display font-bold text-base uppercase tracking-wide text-neutral-900 border-b border-neutral-200 pb-3">
                Active Store Categories ({categories.length})
              </h2>

              <div className="divide-y divide-neutral-200">
                {categories.map(c => {
                  const count = products.filter(p => p.categoryId === c.id).length;
                  return (
                    <div key={c.id} className="py-3 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={c.image}
                          alt={c.name}
                          className="w-12 h-12 object-cover bg-neutral-900 border border-neutral-200"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="font-bold text-neutral-900 text-xs">{c.name}</h4>
                          <p className="text-[11px] text-neutral-500 line-clamp-1">{c.description}</p>
                          <span className="text-[10px] text-[#937418] font-semibold">{count} products assigned</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (confirm(`Remove category ${c.name}?`)) {
                            deleteCategory(c.id);
                          }
                        }}
                        className="text-neutral-400 hover:text-red-600 p-2"
                        title="Delete Category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Add Category Form (4 cols) */}
            <div className="lg:col-span-4 bg-white p-6 border border-neutral-300 shadow-xs space-y-4">
              <h3 className="font-display font-bold text-sm uppercase tracking-wide text-neutral-900 border-b border-neutral-200 pb-2">
                Add New Category
              </h3>

              <form onSubmit={handleAddCategory} className="space-y-3 text-xs">
                <div>
                  <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    value={catName}
                    onChange={e => setCatName(e.target.value)}
                    placeholder="e.g. Leather Quivers & Holsters"
                    className="w-full bg-[#F7F4ED] border border-neutral-300 p-2 focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                    Short Description
                  </label>
                  <textarea
                    rows={2}
                    value={catDesc}
                    onChange={e => setCatDesc(e.target.value)}
                    placeholder="Description of this category collection..."
                    className="w-full bg-[#F7F4ED] border border-neutral-300 p-2 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                    Image Asset URL
                  </label>
                  <input
                    type="text"
                    value={catImage}
                    onChange={e => setCatImage(e.target.value)}
                    placeholder="/public/assets/aistudio/..."
                    className="w-full bg-[#F7F4ED] border border-neutral-300 p-2 font-mono text-[11px] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#171717] hover:bg-[#D4AF37] hover:text-neutral-950 text-white font-bold uppercase tracking-wider text-xs transition-colors"
                >
                  Create Category
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 5: COUPONS MANAGEMENT */}
        {activeTab === 'coupons' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white p-6 border border-neutral-300 shadow-xs space-y-4">
              <h2 className="font-display font-bold text-base uppercase tracking-wide text-neutral-900 border-b border-neutral-200 pb-3">
                Promo Discount Coupons ({coupons.length})
              </h2>

              <div className="divide-y divide-neutral-200">
                {coupons.map(cp => (
                  <div key={cp.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-neutral-900 text-sm bg-[#F7F4ED] px-2 py-0.5 border border-neutral-300">
                          {cp.code}
                        </span>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                          {cp.discountType === 'percentage' ? `${cp.value}% OFF` : `₹${cp.value} OFF`}
                        </span>
                      </div>
                      <p className="text-neutral-600 mt-1">{cp.description}</p>
                      <p className="text-[10px] text-neutral-400">Min Order: ₹{cp.minOrderValue}</p>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm(`Delete coupon ${cp.code}?`)) {
                          deleteCoupon(cp.id);
                        }
                      }}
                      className="text-neutral-400 hover:text-red-600 p-2"
                      title="Delete Coupon"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 bg-white p-6 border border-neutral-300 shadow-xs space-y-4">
              <h3 className="font-display font-bold text-sm uppercase tracking-wide text-neutral-900 border-b border-neutral-200 pb-2">
                Create New Coupon
              </h3>

              <form onSubmit={handleAddCoupon} className="space-y-3 text-xs">
                <div>
                  <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                    Coupon Code *
                  </label>
                  <input
                    type="text"
                    value={cpCode}
                    onChange={e => setCpCode(e.target.value.toUpperCase())}
                    placeholder="e.g. RAJASTHAN20"
                    className="w-full bg-[#F7F4ED] border border-neutral-300 p-2 font-mono uppercase focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                      Type
                    </label>
                    <select
                      value={cpType}
                      onChange={e => setCpType(e.target.value as any)}
                      className="w-full bg-[#F7F4ED] border border-neutral-300 p-2 focus:outline-none"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (₹)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                      Discount Value
                    </label>
                    <input
                      type="number"
                      value={cpValue}
                      onChange={e => setCpValue(Number(e.target.value))}
                      className="w-full bg-[#F7F4ED] border border-neutral-300 p-2 font-mono focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                    Min Order Value (₹)
                  </label>
                  <input
                    type="number"
                    value={cpMin}
                    onChange={e => setCpMin(Number(e.target.value))}
                    className="w-full bg-[#F7F4ED] border border-neutral-300 p-2 font-mono focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={cpDesc}
                    onChange={e => setCpDesc(e.target.value)}
                    placeholder="e.g. 15% discount for academy archers"
                    className="w-full bg-[#F7F4ED] border border-neutral-300 p-2 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#171717] hover:bg-[#D4AF37] hover:text-neutral-950 text-white font-bold uppercase tracking-wider text-xs transition-colors"
                >
                  Save Coupon
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 6: CUSTOM COMMISSIONS */}
        {activeTab === 'custom' && (
          <div className="bg-white p-6 border border-neutral-300 shadow-xs space-y-6 animate-in fade-in duration-150">
            <h2 className="font-display font-bold text-lg uppercase tracking-wide text-neutral-900 border-b border-neutral-200 pb-3">
              Custom Bow Commission Requests ({customOrders.length})
            </h2>

            {customOrders.length === 0 ? (
              <p className="text-xs text-neutral-500 italic py-8 text-center">
                No custom commission requests yet. Requests submitted from the storefront will appear here.
              </p>
            ) : (
              <div className="divide-y divide-neutral-200">
                {customOrders.map(item => (
                  <div key={item.id} className="py-4 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-neutral-900 text-sm">
                          {item.fullName} · +91 {item.phone} ({item.city})
                        </h4>
                        <span className="text-[10px] text-neutral-400 font-mono">
                          Received on {new Date(item.date).toLocaleDateString('en-IN')}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={item.status}
                          onChange={e => updateCustomOrderStatus(item.id, e.target.value as any)}
                          className="bg-[#F7F4ED] border border-neutral-300 px-2.5 py-1 text-xs font-semibold uppercase"
                        >
                          <option value="New">New</option>
                          <option value="In Consultation">In Consultation</option>
                          <option value="In Production">In Production</option>
                          <option value="Completed">Completed</option>
                        </select>

                        <a
                          href={`https://wa.me/91${item.phone}?text=${encodeURIComponent(`Hello ${item.fullName}, this is Himanshu Tirgar regarding your custom bow request.`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1 bg-[#25D366] text-white text-[11px] font-bold uppercase"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#F7F4ED] p-3 text-[11px]">
                      <div>
                        <span className="text-neutral-500 block">Bow Model:</span>
                        <strong className="text-neutral-900">{item.bowType}</strong>
                      </div>
                      <div>
                        <span className="text-neutral-500 block">Riser Timber:</span>
                        <strong className="text-neutral-900">{item.preferredWood}</strong>
                      </div>
                      <div>
                        <span className="text-neutral-500 block">Draw Weight:</span>
                        <strong className="text-neutral-900">{item.drawWeight} ({item.dominantHand} Hand)</strong>
                      </div>
                      <div>
                        <span className="text-neutral-500 block">Arrows:</span>
                        <strong className="text-neutral-900">{item.arrowQuantity}x {item.arrowTipType}</strong>
                      </div>
                    </div>

                    {item.customEngraving && (
                      <p className="text-neutral-700 text-[11px]">
                        <strong>Riser Inscription:</strong> "{item.customEngraving}"
                      </p>
                    )}
                    {item.notes && (
                      <p className="text-neutral-500 text-[11px] italic">
                        Notes: {item.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 7: STORE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white p-6 sm:p-8 border border-neutral-300 shadow-xs max-w-2xl space-y-6 animate-in fade-in duration-150">
            <h2 className="font-display font-bold text-lg uppercase tracking-wide text-neutral-900 border-b border-neutral-200 pb-3">
              TIRGAR Workshop & Store Settings
            </h2>

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div>
                <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                  Announcement Ribbon Text
                </label>
                <textarea
                  rows={2}
                  value={stAnnounce}
                  onChange={e => setStAnnounce(e.target.value)}
                  className="w-full bg-[#F7F4ED] border border-neutral-300 p-2.5 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                    Free Shipping Threshold (₹)
                  </label>
                  <input
                    type="number"
                    value={stThreshold}
                    onChange={e => setStThreshold(Number(e.target.value))}
                    className="w-full bg-[#F7F4ED] border border-neutral-300 p-2.5 font-mono focus:outline-none"
                  />
                  <span className="text-[10px] text-neutral-400 mt-0.5 block">
                    Orders above this amount get free delivery.
                  </span>
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                    Standard Shipping Fee (₹)
                  </label>
                  <input
                    type="number"
                    value={stShipFee}
                    onChange={e => setStShipFee(Number(e.target.value))}
                    className="w-full bg-[#F7F4ED] border border-neutral-300 p-2.5 font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-200">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={stCod}
                    onChange={e => setStCod(e.target.checked)}
                    className="accent-[#D4AF37] w-4 h-4"
                  />
                  <span className="font-bold text-neutral-900">
                    Enable Cash on Delivery (COD) Checkout
                  </span>
                </label>
              </div>

              {/* Razorpay Gateway Status */}
              <div className="p-4 bg-amber-50 border border-amber-200 space-y-1 text-amber-900">
                <p className="font-bold">Online Payment Gateway (Razorpay)</p>
                <p className="text-[11px]">
                  Disabled by default. In accordance with platform security instructions, online payments remain disabled until live Razorpay Key ID and Key Secret are verified on the backend.
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#171717] hover:bg-[#D4AF37] hover:text-neutral-950 text-white font-bold uppercase tracking-wider text-xs transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4 text-[#D4AF37]" />
                  <span>Save Workshop Settings</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Product Add / Edit Modal */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-neutral-950/70 backdrop-blur-xs"
            onClick={() => setProductModalOpen(false)}
          />
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative bg-white w-full max-w-3xl border border-neutral-300 shadow-2xl p-6 sm:p-8 space-y-6 my-8">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                <h3 className="font-display font-bold text-lg uppercase tracking-wide text-neutral-900">
                  {editingProduct ? 'Edit Archery Product' : 'Add New Archery Equipment'}
                </h3>
                <button
                  onClick={() => setProductModalOpen(false)}
                  className="p-1.5 text-neutral-400 hover:text-neutral-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs max-h-[75vh] overflow-y-auto pr-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                      Product Title *
                    </label>
                    <input
                      type="text"
                      value={pName}
                      onChange={e => setPName(e.target.value)}
                      placeholder="e.g. TIRGAR Deluxe Padauk Bow"
                      className="w-full bg-[#F7F4ED] border border-neutral-300 p-2 focus:outline-none focus:border-[#D4AF37]"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                      Category *
                    </label>
                    <select
                      value={pCategory}
                      onChange={e => setPCategory(e.target.value)}
                      className="w-full bg-[#F7F4ED] border border-neutral-300 p-2 focus:outline-none"
                    >
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                      Base Price (₹) *
                    </label>
                    <input
                      type="number"
                      value={pBasePrice}
                      onChange={e => setPBasePrice(Number(e.target.value))}
                      className="w-full bg-[#F7F4ED] border border-neutral-300 p-2 font-mono focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                      Original Price / MRP (₹)
                    </label>
                    <input
                      type="number"
                      value={pOrigPrice || ''}
                      onChange={e => setPOrigPrice(e.target.value ? Number(e.target.value) : undefined)}
                      placeholder="Strikethrough MRP"
                      className="w-full bg-[#F7F4ED] border border-neutral-300 p-2 font-mono focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                      SKU Code *
                    </label>
                    <input
                      type="text"
                      value={pSku}
                      onChange={e => setPSku(e.target.value)}
                      className="w-full bg-[#F7F4ED] border border-neutral-300 p-2 font-mono uppercase focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                      Workshop Stock *
                    </label>
                    <input
                      type="number"
                      value={pStock}
                      onChange={e => setPStock(Number(e.target.value))}
                      className="w-full bg-[#F7F4ED] border border-neutral-300 p-2 font-mono focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                    Main Product Image URL / Path *
                  </label>
                  <input
                    type="text"
                    value={pMainImage}
                    onChange={e => setPMainImage(e.target.value)}
                    placeholder="/public/assets/aistudio/..."
                    className="w-full bg-[#F7F4ED] border border-neutral-300 p-2 font-mono text-[11px] focus:outline-none"
                    required
                  />
                  <div className="flex gap-2 mt-1 overflow-x-auto text-[10px] text-neutral-500">
                    <span>Quick presets:</span>
                    <button
                      type="button"
                      onClick={() => setPMainImage('/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.15_PM__1__216506e2.jpeg')}
                      className="underline text-[#937418]"
                    >
                      Deluxe Padauk
                    </button>
                    <span>·</span>
                    <button
                      type="button"
                      onClick={() => setPMainImage('/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.37.48_PM_72001a52.jpeg')}
                      className="underline text-[#937418]"
                    >
                      Target Bow
                    </button>
                    <span>·</span>
                    <button
                      type="button"
                      onClick={() => setPMainImage('/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.18_PM_8303119e.jpeg')}
                      className="underline text-[#937418]"
                    >
                      Arrows Set
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                    Short Summary (1-2 sentences)
                  </label>
                  <input
                    type="text"
                    value={pShortDesc}
                    onChange={e => setPShortDesc(e.target.value)}
                    className="w-full bg-[#F7F4ED] border border-neutral-300 p-2 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                    Full Description & Craft Details
                  </label>
                  <textarea
                    rows={3}
                    value={pDesc}
                    onChange={e => setPDesc(e.target.value)}
                    className="w-full bg-[#F7F4ED] border border-neutral-300 p-2 focus:outline-none"
                  />
                </div>

                {/* Dynamic Variations Manager */}
                <div className="p-4 bg-[#F7F4ED] border border-neutral-300 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold uppercase tracking-wider text-neutral-900 text-xs">
                      Color & Finish Variations ({pVariations.length})
                    </span>
                    <span className="text-[10px] text-neutral-500">
                      Each variation can have separate price, stock, and photography.
                    </span>
                  </div>

                  {/* Existing variations list */}
                  {pVariations.length > 0 && (
                    <div className="space-y-1.5">
                      {pVariations.map(v => (
                        <div key={v.id} className="flex items-center justify-between p-2 bg-white border border-neutral-200">
                          <div className="flex items-center gap-2">
                            {v.colorCode && (
                              <span
                                className="w-3 h-3 rounded-full border border-neutral-400"
                                style={{ backgroundColor: v.colorCode }}
                              />
                            )}
                            <strong className="text-neutral-900">{v.name}</strong>
                            <span className="text-neutral-500 font-mono">₹{v.price} ({v.stock} in stock)</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveVariation(v.id)}
                            className="text-red-600 hover:underline text-[11px]"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add variation fields */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-neutral-300">
                    <input
                      type="text"
                      value={varName}
                      onChange={e => setVarName(e.target.value)}
                      placeholder="Variation Name (e.g. Royal Padauk)"
                      className="bg-white border border-neutral-300 p-1.5 text-[11px]"
                    />
                    <input
                      type="text"
                      value={varFinish}
                      onChange={e => setVarFinish(e.target.value)}
                      placeholder="Finish Name"
                      className="bg-white border border-neutral-300 p-1.5 text-[11px]"
                    />
                    <input
                      type="number"
                      value={varPrice}
                      onChange={e => setVarPrice(Number(e.target.value))}
                      placeholder="Price"
                      className="bg-white border border-neutral-300 p-1.5 text-[11px] font-mono"
                    />
                    <input
                      type="number"
                      value={varStock}
                      onChange={e => setVarStock(Number(e.target.value))}
                      placeholder="Stock"
                      className="bg-white border border-neutral-300 p-1.5 text-[11px] font-mono"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleAddVariation}
                    className="px-3 py-1 bg-neutral-900 hover:bg-[#D4AF37] hover:text-neutral-950 text-white text-[11px] font-semibold uppercase"
                  >
                    + Add This Finish Variation
                  </button>
                </div>

                {/* Flags */}
                <div className="flex flex-wrap gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pIsFeatured}
                      onChange={e => setPIsFeatured(e.target.checked)}
                      className="accent-[#D4AF37]"
                    />
                    <span>Mark as Featured Product</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pIsBestSeller}
                      onChange={e => setPIsBestSeller(e.target.checked)}
                      className="accent-[#D4AF37]"
                    />
                    <span>Mark as Bestseller</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pPublished}
                      onChange={e => setPPublished(e.target.checked)}
                      className="accent-[#D4AF37]"
                    />
                    <span>Published in Storefront</span>
                  </label>
                </div>

                <div className="pt-4 border-t border-neutral-200 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setProductModalOpen(false)}
                    className="px-4 py-2 border border-neutral-300 text-neutral-600 text-xs uppercase font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#171717] hover:bg-[#D4AF37] hover:text-neutral-950 text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Order Status & Tracking Modal */}
      {selectedOrderForDetail && activeDetailOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-neutral-950/70 backdrop-blur-xs"
            onClick={() => setSelectedOrderForDetail(null)}
          />
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative bg-white w-full max-w-xl border border-neutral-300 shadow-2xl p-6 sm:p-8 space-y-5 my-8 text-xs">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                <div>
                  <h3 className="font-display font-bold text-base uppercase text-neutral-900">
                    Order {activeDetailOrder.orderNumber}
                  </h3>
                  <p className="text-[11px] text-neutral-500">
                    Placed by {activeDetailOrder.customer.fullName} · {activeDetailOrder.customer.phone}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrderForDetail(null)}
                  className="p-1.5 text-neutral-400 hover:text-neutral-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Updater */}
              <div className="space-y-3 bg-[#F7F4ED] p-4 border border-neutral-300">
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-800 block">
                  Update Order Fulfillment Status
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase block mb-1">Status</span>
                    <select
                      value={orderStatusChange}
                      onChange={e => setOrderStatusChange(e.target.value as OrderStatus)}
                      className="w-full bg-white border border-neutral-300 p-2 text-xs font-bold uppercase"
                    >
                      <option value="Pending">1. Pending Confirmation</option>
                      <option value="Confirmed">2. Confirmed by Workshop</option>
                      <option value="Processing">3. Processing & Tuning</option>
                      <option value="Shipped">4. Shipped with Courier</option>
                      <option value="Delivered">5. Delivered to Archer</option>
                      <option value="Cancelled">6. Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase block mb-1">
                      AWB Tracking Number
                    </span>
                    <input
                      type="text"
                      value={orderTrackingInput}
                      onChange={e => setOrderTrackingInput(e.target.value)}
                      placeholder="e.g. DELHIVERY-89123"
                      className="w-full bg-white border border-neutral-300 p-2 text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block mb-1">
                    Artisan Status Note (Visible to Customer in Tracking)
                  </span>
                  <input
                    type="text"
                    value={orderNoteInput}
                    onChange={e => setOrderNoteInput(e.target.value)}
                    placeholder="e.g. Handed to express courier in wooden casing"
                    className="w-full bg-white border border-neutral-300 p-2 text-xs"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    updateOrderStatus(
                      activeDetailOrder.id,
                      orderStatusChange,
                      orderNoteInput.trim() || undefined,
                      orderTrackingInput.trim() || undefined
                    );
                    setSelectedOrderForDetail(null);
                  }}
                  className="w-full py-2 bg-[#171717] hover:bg-[#D4AF37] hover:text-neutral-950 text-white font-bold uppercase tracking-wider text-xs transition-colors"
                >
                  Save Status & Notify Tracking System
                </button>
              </div>

              {/* Destination Address */}
              <div className="space-y-1">
                <span className="text-neutral-500 font-bold uppercase text-[10px]">
                  Delivery Address:
                </span>
                <p className="font-semibold text-neutral-900">{activeDetailOrder.customer.fullName}</p>
                <p className="text-neutral-700">{activeDetailOrder.customer.address}</p>
                <p className="text-neutral-700">
                  {activeDetailOrder.customer.city}, {activeDetailOrder.customer.state} - {activeDetailOrder.customer.pincode}
                </p>
                <p className="font-mono text-neutral-800">Phone: +91 {activeDetailOrder.customer.phone}</p>
              </div>

              {/* Items */}
              <div className="space-y-1">
                <span className="text-neutral-500 font-bold uppercase text-[10px]">
                  Ordered Equipment:
                </span>
                <div className="border border-neutral-200 divide-y divide-neutral-200">
                  {activeDetailOrder.items.map((it, idx) => (
                    <div key={idx} className="p-2 flex justify-between">
                      <span>{it.quantity}x {it.productName} {it.variationName && `(${it.variationName})`}</span>
                      <span className="font-mono font-bold">₹{(it.price * it.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

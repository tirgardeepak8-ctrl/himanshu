import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import {
  Search,
  SlidersHorizontal,
  Star,
  ShoppingBag,
  Heart,
  ChevronDown,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const ShopCatalog: React.FC = () => {
  const {
    products,
    categories,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    setSelectedProductId,
    setActiveView,
    addToCart,
    isWishlisted,
    toggleWishlist
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<string>('all'); // all | under-1000 | 1000-2500 | above-2500
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured'); // featured | price-asc | price-desc | rating | popular
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (!p.published) return false;

      // Category filter
      if (selectedCategoryFilter !== 'all' && p.categoryId !== selectedCategoryFilter) {
        return false;
      }

      // In stock filter
      if (inStockOnly && p.stock <= 0) {
        return false;
      }

      // Price range
      if (priceRange === 'under-1000' && p.basePrice >= 1000) return false;
      if (priceRange === '1000-2500' && (p.basePrice < 1000 || p.basePrice > 2500)) return false;
      if (priceRange === 'above-2500' && p.basePrice <= 2500) return false;

      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesCat = p.categoryName.toLowerCase().includes(q);
        const matchesTags = p.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesCat && !matchesTags) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
      if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'popular') return b.reviewCount - a.reviewCount;
      // Default: featured first
      if (a.isFeatured === b.isFeatured) return 0;
      return a.isFeatured ? -1 : 1;
    });
  }, [products, selectedCategoryFilter, inStockOnly, priceRange, searchQuery, sortBy]);

  const handleProductSelect = (productId: string) => {
    setSelectedProductId(productId);
    setActiveView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setSelectedCategoryFilter('all');
    setPriceRange('all');
    setInStockOnly(false);
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      {/* Header Banner */}
      <div className="bg-[#171717] text-white py-12 border-b border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#D4AF37]">
            Tirgar Catalogue
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl uppercase tracking-wide">
            Archery Equipment & Bows
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto font-normal">
            Handcrafted in Banswara, Rajasthan. Monolithic bamboo dhanush, precision hardwood takedown bows, and forged arrows.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Controls Bar: Search & Mobile Filter Toggle */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 pb-6 border-b border-neutral-200">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by name, wood, or tip type..."
              className="w-full bg-[#F7F4ED] border border-neutral-300 pl-10 pr-4 py-2 text-xs font-medium placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort & Mobile Trigger */}
          <div className="flex items-center justify-between md:justify-end gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden flex items-center gap-1.5 px-3 py-2 border border-neutral-300 text-xs font-medium bg-[#F7F4ED]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            {/* Sort Select */}
            <div className="flex items-center gap-2 text-xs text-neutral-600">
              <span className="hidden sm:inline font-medium">Sort by:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="appearance-none bg-[#F7F4ED] border border-neutral-300 px-3 py-2 pr-8 text-xs font-semibold uppercase tracking-wider text-neutral-800 focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="popular">Most Popular</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Catalog Body with Sidebar and Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Desktop Filter Sidebar (3 cols) */}
          <aside className={`md:col-span-3 space-y-6 ${mobileFilterOpen ? 'block' : 'hidden md:block'}`}>
            <div className="bg-[#F7F4ED] p-5 border border-neutral-200 space-y-6">
              {/* Category Filter */}
              <div>
                <h3 className="text-xs font-bold font-display uppercase tracking-wider text-neutral-900 mb-3 pb-1 border-b border-neutral-300">
                  Categories
                </h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategoryFilter('all')}
                    className={`w-full text-left px-2.5 py-1.5 text-xs font-medium transition-colors ${
                      selectedCategoryFilter === 'all'
                        ? 'bg-[#171717] text-[#D4AF37] font-semibold'
                        : 'text-neutral-700 hover:bg-neutral-200/60'
                    }`}
                  >
                    All Equipment ({products.length})
                  </button>
                  {categories.map(c => {
                    const count = products.filter(p => p.categoryId === c.id).length;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCategoryFilter(c.id)}
                        className={`w-full text-left px-2.5 py-1.5 text-xs font-medium flex items-center justify-between transition-colors ${
                          selectedCategoryFilter === c.id
                            ? 'bg-[#171717] text-[#D4AF37] font-semibold'
                            : 'text-neutral-700 hover:bg-neutral-200/60'
                        }`}
                      >
                        <span className="truncate">{c.name}</span>
                        <span className="text-[11px] opacity-60">({count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="text-xs font-bold font-display uppercase tracking-wider text-neutral-900 mb-3 pb-1 border-b border-neutral-300">
                  Price Range
                </h3>
                <div className="space-y-1.5 text-xs text-neutral-700">
                  {[
                    { id: 'all', label: 'All Prices' },
                    { id: 'under-1000', label: 'Under ₹1,000' },
                    { id: '1000-2500', label: '₹1,000 – ₹2,500' },
                    { id: 'above-2500', label: 'Above ₹2,500' }
                  ].map(item => (
                    <label key={item.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="price-range"
                        checked={priceRange === item.id}
                        onChange={() => setPriceRange(item.id)}
                        className="accent-[#D4AF37]"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Stock Filter */}
              <div>
                <h3 className="text-xs font-bold font-display uppercase tracking-wider text-neutral-900 mb-3 pb-1 border-b border-neutral-300">
                  Availability
                </h3>
                <label className="flex items-center gap-2 text-xs text-neutral-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={e => setInStockOnly(e.target.checked)}
                    className="accent-[#D4AF37]"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>

              {/* Reset Filters */}
              <button
                onClick={handleResetFilters}
                className="w-full py-2 border border-neutral-400 text-neutral-700 hover:bg-neutral-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            </div>
          </aside>

          {/* Product Grid Area (9 cols) */}
          <main className="md:col-span-9">
            {/* Results Count Banner */}
            <div className="flex items-center justify-between text-xs text-neutral-500 mb-6 pb-2 border-b border-neutral-100">
              <span>
                Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'item' : 'items'}
              </span>
              {selectedCategoryFilter !== 'all' && (
                <button
                  onClick={() => setSelectedCategoryFilter('all')}
                  className="text-xs text-[#D4AF37] hover:underline uppercase tracking-wider font-semibold"
                >
                  View All Categories
                </button>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center bg-[#F7F4ED] border border-neutral-200 p-8 space-y-4">
                <p className="text-neutral-700 font-display text-base font-semibold uppercase">
                  No archery products match your filters
                </p>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  Try clearing your search query or selecting "All Prices" to explore our full workshop inventory.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 bg-[#171717] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#D4AF37] hover:text-neutral-950 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => {
                  const wish = isWishlisted(product.id);
                  return (
                    <div
                      key={product.id}
                      onClick={() => handleProductSelect(product.id)}
                      className="group bg-white border border-neutral-200 overflow-hidden flex flex-col justify-between hover:border-[#D4AF37] hover:shadow-xl transition-all cursor-pointer relative"
                    >
                      {/* Wishlist Button */}
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-colors ${
                          wish
                            ? 'bg-red-50 text-red-600 shadow-sm'
                            : 'bg-white/90 backdrop-blur-xs text-neutral-600 hover:text-red-600'
                        }`}
                        aria-label="Wishlist"
                      >
                        <Heart className={`w-4 h-4 ${wish ? 'fill-current' : ''}`} />
                      </button>

                      {/* Photo Slot */}
                      <div className="relative aspect-4/5 bg-neutral-950 overflow-hidden">
                        <img
                          src={product.mainImage}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        {product.isBestSeller && (
                          <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#171717] text-[#D4AF37] border border-[#D4AF37]/50 text-[10px] font-semibold tracking-wider uppercase">
                            Bestseller
                          </span>
                        )}
                        {product.variations.length > 0 && (
                          <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-xs text-white text-[10px] tracking-wide">
                            {product.variations.length} Finishes
                          </span>
                        )}
                      </div>

                      {/* Details */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-[10px] text-neutral-400 uppercase tracking-widest font-medium mb-1">
                            <span>{product.categoryName}</span>
                            <span className={product.stock > 0 ? 'text-emerald-700 font-semibold' : 'text-red-600'}>
                              {product.stock > 0 ? `${product.stock} in stock` : 'Sold out'}
                            </span>
                          </div>
                          <h3 className="font-medium text-sm text-neutral-900 group-hover:text-[#D4AF37] transition-colors line-clamp-2 leading-snug">
                            {product.name}
                          </h3>
                        </div>

                        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                          <div>
                            <div className="flex items-baseline gap-2">
                              <span className="font-mono font-bold text-sm text-neutral-900">
                                ₹{product.basePrice.toLocaleString('en-IN')}
                              </span>
                              {product.originalPrice && (
                                <span className="font-mono text-xs text-neutral-400 line-through">
                                  ₹{product.originalPrice.toLocaleString('en-IN')}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-[11px] text-neutral-500 mt-0.5">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span className="font-medium">{product.rating}</span>
                              <span className="text-neutral-400">({product.reviewCount})</span>
                            </div>
                          </div>

                          <button
                            onClick={e => {
                              e.stopPropagation();
                              addToCart(product);
                            }}
                            className="w-9 h-9 bg-[#D4AF37] hover:bg-[#b89326] text-neutral-950 flex items-center justify-center transition-colors rounded-none shadow-xs"
                            title="Add to Cart"
                            aria-label="Add to Cart"
                          >
                            <ShoppingBag className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

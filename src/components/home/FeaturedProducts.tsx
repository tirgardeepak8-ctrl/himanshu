import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Star, ShoppingBag, Heart, ArrowRight } from 'lucide-react';
import { Product } from '../../types';

export const FeaturedProducts: React.FC = () => {
  const {
    products,
    setSelectedProductId,
    setActiveView,
    addToCart,
    isWishlisted,
    toggleWishlist
  } = useStore();

  const featured = products.filter(p => p.isFeatured && p.published).slice(0, 4);

  const handleProductClick = (productId: string) => {
    setSelectedProductId(productId);
    setActiveView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <section className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and "View All Products" */}
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="h-px w-8 bg-[#D4AF37]" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#937418]">
                Master Crafts
              </span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 tracking-wide uppercase">
              Featured Products
            </h2>
          </div>

          <button
            onClick={() => {
              setActiveView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-neutral-900 hover:text-[#D4AF37] transition-colors group"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(product => {
            const wish = isWishlisted(product.id);
            return (
              <div
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="group bg-white border border-neutral-200 overflow-hidden flex flex-col justify-between hover:border-[#D4AF37] hover:shadow-lg transition-all cursor-pointer relative"
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
                      : 'bg-white/80 backdrop-blur-xs text-neutral-600 hover:text-red-600'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${wish ? 'fill-current' : ''}`} />
                </button>

                {/* Image Showcase */}
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
                </div>

                {/* Product Info */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-medium block mb-1">
                      {product.categoryName}
                    </span>
                    <h3 className="font-medium text-sm text-neutral-900 group-hover:text-[#D4AF37] transition-colors line-clamp-1">
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

                    {/* Quick Add to Cart Button (styled like reference design) */}
                    <button
                      onClick={e => handleQuickAdd(e, product)}
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
      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductVariation, Product } from '../../types';
import {
  Star,
  ShoppingBag,
  Zap,
  Heart,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Minus,
  Plus,
  ArrowLeft,
  Share2,
  Check,
  MessageSquare
} from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const {
    selectedProductId,
    getProductById,
    products,
    addToCart,
    setActiveView,
    setSelectedProductId,
    isWishlisted,
    toggleWishlist,
    reviews,
    addReview,
    showToast
  } = useStore();

  const product = selectedProductId ? getProductById(selectedProductId) : null;

  // Active variation state
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [reviewFormOpen, setReviewFormOpen] = useState<boolean>(false);

  // Review Form state
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerLocation, setReviewerLocation] = useState('');
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewerComment, setReviewerComment] = useState('');

  // Sync state when product changes
  useEffect(() => {
    if (product) {
      if (product.variations.length > 0) {
        setSelectedVariation(product.variations[0]);
        setActiveImage(product.variations[0].image || product.mainImage);
      } else {
        setSelectedVariation(null);
        setActiveImage(product.mainImage);
      }
      setQuantity(1);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 text-center">
        <h2 className="font-display text-xl uppercase font-bold text-neutral-800">
          Product Not Found
        </h2>
        <p className="text-xs text-neutral-500 mt-2">
          The requested bow or arrow model could not be located.
        </p>
        <button
          onClick={() => setActiveView('shop')}
          className="mt-6 px-6 py-2.5 bg-[#171717] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#D4AF37] hover:text-neutral-950 transition-colors"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  // Current effective price & stock based on selected variation
  const currentPrice = selectedVariation ? selectedVariation.price : product.basePrice;
  const originalPrice = selectedVariation?.originalPrice || product.originalPrice;
  const currentStock = selectedVariation ? selectedVariation.stock : product.stock;
  const currentSku = selectedVariation ? selectedVariation.sku : product.sku;

  // Gallery images: combined from product & active variation
  const galleryImages = Array.from(
    new Set([
      selectedVariation?.image || product.mainImage,
      ...product.images,
      ...(selectedVariation?.additionalImages || [])
    ])
  );

  const handleVariationChange = (variation: ProductVariation) => {
    setSelectedVariation(variation);
    setActiveImage(variation.image);
    // Adjust quantity if exceeds new stock
    if (quantity > variation.stock) {
      setQuantity(Math.max(1, variation.stock));
    }
  };

  const handleAddToCart = () => {
    addToCart(product, selectedVariation || undefined, quantity);
  };

  const handleBuyNow = () => {
    const res = addToCart(product, selectedVariation || undefined, quantity);
    if (res.success) {
      setActiveView('checkout');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard');
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewerComment.trim()) {
      showToast('Please provide your name and review comment');
      return;
    }
    addReview({
      productId: product.id,
      author: reviewerName.trim(),
      location: reviewerLocation.trim() || 'India',
      rating: reviewerRating,
      comment: reviewerComment.trim(),
      verifiedPurchase: true
    });
    setReviewFormOpen(false);
    setReviewerName('');
    setReviewerComment('');
  };

  // Product reviews
  const productReviews = reviews.filter(r => r.productId === product.id);

  // Related products in same category
  const related = products
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 3);

  const wish = isWishlisted(product.id);

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200 text-xs text-neutral-500">
          <button
            onClick={() => {
              setActiveView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 text-neutral-800 hover:text-[#D4AF37] font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Catalogue</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="uppercase">{product.categoryName}</span>
            <span>/</span>
            <span className="text-neutral-900 font-semibold truncate max-w-xs">{product.name}</span>
          </div>
        </div>

        {/* Main Contiguous Purchase Module (PDP Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Main Image Showcase */}
            <div className="relative aspect-4/5 bg-neutral-950 border border-neutral-300 overflow-hidden shadow-sm">
              <img
                src={activeImage || product.mainImage}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
                referrerPolicy="no-referrer"
              />

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-2.5 rounded-full transition-colors ${
                  wish
                    ? 'bg-red-50 text-red-600 shadow-md'
                    : 'bg-white/80 backdrop-blur-xs text-neutral-700 hover:text-red-600'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-5 h-5 ${wish ? 'fill-current' : ''}`} />
              </button>

              {/* Bestseller Badge */}
              {product.isBestSeller && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-[#171717] text-[#D4AF37] border border-[#D4AF37]/60 text-xs font-semibold uppercase tracking-wider">
                  Bestseller
                </span>
              )}

              {/* Variation watermark indicator */}
              {selectedVariation && (
                <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-xs px-3 py-1 text-white text-xs border border-white/20">
                  <span>Finish: <strong>{selectedVariation.finishName}</strong></span>
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {galleryImages.map((imgUrl, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`w-20 h-24 bg-neutral-900 shrink-0 border-2 overflow-hidden transition-all ${
                    activeImage === imgUrl
                      ? 'border-[#D4AF37] shadow-md scale-102'
                      : 'border-neutral-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`Thumbnail ${i + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Contiguous Purchase Module (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Header / Titles */}
            <div className="space-y-2 border-b border-neutral-200 pb-5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#937418]">
                  {product.categoryName}
                </span>
                <button
                  onClick={handleShare}
                  className="p-1.5 text-neutral-400 hover:text-neutral-800 transition-colors"
                  title="Share product"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              <h1 className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 tracking-wide uppercase leading-snug">
                {product.name}
              </h1>

              {/* Rating & SKU */}
              <div className="flex items-center justify-between text-xs text-neutral-500 pt-1">
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <span className="font-semibold text-neutral-800">{product.rating}</span>
                  <span>({product.reviewCount} customer reviews)</span>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider">
                  SKU: {currentSku}
                </span>
              </div>
            </div>

            {/* Price Block */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="font-mono font-bold text-3xl text-neutral-950">
                  ₹{currentPrice.toLocaleString('en-IN')}
                </span>
                {originalPrice && (
                  <span className="font-mono text-base text-neutral-400 line-through">
                    ₹{originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {originalPrice && (
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[11px] font-semibold uppercase">
                    Save ₹{(originalPrice - currentPrice).toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-neutral-500">
                Inclusive of all taxes · Safe Pan-India Wooden Box Delivery
              </p>
            </div>

            {/* Dynamic Product Variations (Crucial Requirement) */}
            {product.variations.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-neutral-200">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    Finish / Option:
                  </label>
                  <span className="text-xs text-[#D4AF37] font-semibold">
                    {selectedVariation?.finishName}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {product.variations.map(variation => {
                    const isSelected = selectedVariation?.id === variation.id;
                    return (
                      <button
                        key={variation.id}
                        type="button"
                        onClick={() => handleVariationChange(variation)}
                        className={`p-2.5 text-left border text-xs transition-all relative flex items-center justify-between ${
                          isSelected
                            ? 'border-[#D4AF37] bg-[#F7F4ED] text-neutral-950 font-semibold shadow-xs ring-1 ring-[#D4AF37]'
                            : 'border-neutral-300 hover:border-neutral-500 text-neutral-700 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {variation.colorCode && (
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-neutral-400 shrink-0"
                              style={{ backgroundColor: variation.colorCode }}
                            />
                          )}
                          <span className="truncate">{variation.finishName}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {selectedVariation?.specNote && (
                  <p className="text-[11px] text-neutral-500 italic">
                    ℹ {selectedVariation.specNote}
                  </p>
                )}
              </div>
            )}

            {/* Stock Availability */}
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-neutral-800">Availability:</span>
              {currentStock > 0 ? (
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>In Stock ({currentStock} available in workshop)</span>
                </span>
              ) : (
                <span className="text-red-600 font-semibold">
                  Currently Sold Out (Inquire for Custom Crafting)
                </span>
              )}
            </div>

            {/* Quantity Selector & Purchase Buttons */}
            {currentStock > 0 ? (
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-neutral-300 bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-neutral-100 text-neutral-600 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-xs font-mono font-bold text-neutral-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                      disabled={quantity >= currentStock}
                      className="p-2 hover:bg-neutral-100 text-neutral-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-[11px] text-neutral-500">
                    Max: {currentStock} units
                  </span>
                </div>

                {/* Primary CTA Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleAddToCart}
                    className="py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="py-3.5 bg-[#D4AF37] hover:bg-[#b89326] text-neutral-950 text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <Zap className="w-4 h-4 fill-current" />
                    <span>Buy Now (COD)</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-amber-50 border border-amber-300 text-xs text-amber-900">
                <p className="font-semibold">Backorder / Custom Request Available</p>
                <p className="mt-1">
                  Himanshu Tirgar can craft this model to order. WhatsApp +91 95710 30853 to reserve from the next workshop batch.
                </p>
              </div>
            )}

            {/* Workshop Trust Strip */}
            <div className="border-t border-neutral-200 pt-5 space-y-2.5 text-xs text-neutral-600">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Pan-India Dispatch within 24–48 hours via insured courier.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Crafted in Banswara, Rajasthan · Genuine Sheesham & Bamboo.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Description & Specifications Section */}
        <div className="mt-16 pt-12 border-t border-neutral-200 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Detailed Prose (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-display font-bold text-xl uppercase tracking-wide text-neutral-900">
              Artisan Craftsmanship & Overview
            </h2>
            <div className="prose prose-sm max-w-none text-neutral-700 leading-relaxed space-y-4 text-xs sm:text-sm">
              <p>{product.description}</p>
              <p>
                Each component is inspected personally by Himanshu Tirgar before packing. The limbs are balanced to ensure uniform curvature and minimal hand shock, allowing archers to achieve tighter grouping whether practicing on target bails or recreational field courses.
              </p>
            </div>

            {/* Customer Reviews Section */}
            <div className="pt-8 border-t border-neutral-200 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-lg uppercase tracking-wide text-neutral-900">
                    Customer Reviews ({productReviews.length})
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 mt-1">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span>4.9 out of 5 based on verified archer feedback</span>
                  </div>
                </div>

                <button
                  onClick={() => setReviewFormOpen(!reviewFormOpen)}
                  className="px-4 py-2 border border-neutral-400 text-xs font-semibold uppercase tracking-wider text-neutral-800 hover:bg-neutral-100 transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Write Review</span>
                </button>
              </div>

              {/* Review Submission Form */}
              {reviewFormOpen && (
                <form
                  onSubmit={handleSubmitReview}
                  className="p-5 bg-[#F7F4ED] border border-neutral-300 space-y-4 animate-in fade-in duration-200"
                >
                  <h4 className="font-display font-bold text-xs uppercase tracking-wider text-neutral-900">
                    Submit Genuine Archer Feedback
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        value={reviewerName}
                        onChange={e => setReviewerName(e.target.value)}
                        placeholder="e.g. Vikramaditya Rathore"
                        className="w-full bg-white border border-neutral-300 px-3 py-1.5 text-xs focus:outline-none focus:border-[#D4AF37]"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                        City & State
                      </label>
                      <input
                        type="text"
                        value={reviewerLocation}
                        onChange={e => setReviewerLocation(e.target.value)}
                        placeholder="e.g. Udaipur, Rajasthan"
                        className="w-full bg-white border border-neutral-300 px-3 py-1.5 text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                      Rating
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewerRating(star)}
                          className="p-1 focus:outline-none"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= reviewerRating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-neutral-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs text-neutral-600 font-medium ml-2">
                        {reviewerRating} Stars
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                      Review Comment *
                    </label>
                    <textarea
                      rows={3}
                      value={reviewerComment}
                      onChange={e => setReviewerComment(e.target.value)}
                      placeholder="Share your experience shooting with this bow/arrow, build quality, and balance..."
                      className="w-full bg-white border border-neutral-300 p-2.5 text-xs focus:outline-none focus:border-[#D4AF37]"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setReviewFormOpen(false)}
                      className="px-4 py-2 border border-neutral-300 text-neutral-600 text-xs font-semibold uppercase"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#171717] text-[#D4AF37] hover:bg-neutral-800 text-xs font-semibold uppercase tracking-wider"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              )}

              {/* Review Cards */}
              <div className="space-y-4">
                {productReviews.length === 0 ? (
                  <p className="text-xs text-neutral-500 italic">
                    Be the first archer to review this handcrafted model!
                  </p>
                ) : (
                  productReviews.map(r => (
                    <div
                      key={r.id}
                      className="p-4 bg-neutral-50 border border-neutral-200 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-neutral-900">{r.author}</span>
                          <span className="text-neutral-400">·</span>
                          <span className="text-neutral-500">{r.location}</span>
                          <span className="text-neutral-400">·</span>
                          <span className="text-[11px] text-neutral-400">{r.date}</span>
                        </div>
                        <div className="flex text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < r.rating ? 'fill-current' : 'text-neutral-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-neutral-700 leading-relaxed">
                        "{r.comment}"
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Specifications Table (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="font-display font-bold text-xl uppercase tracking-wide text-neutral-900">
              Technical Specifications
            </h2>

            <div className="border border-neutral-200 divide-y divide-neutral-200 text-xs">
              <div className="p-3 bg-neutral-50 flex justify-between font-medium">
                <span className="text-neutral-500">Material</span>
                <span className="text-neutral-900 text-right max-w-xs">{product.specifications.material}</span>
              </div>
              <div className="p-3 flex justify-between font-medium">
                <span className="text-neutral-500">Length</span>
                <span className="text-neutral-900 text-right">{product.specifications.length}</span>
              </div>
              {product.specifications.drawWeight && (
                <div className="p-3 bg-neutral-50 flex justify-between font-medium">
                  <span className="text-neutral-500">Draw Weight</span>
                  <span className="text-neutral-900 text-right font-mono font-bold text-[#937418]">
                    {product.specifications.drawWeight}
                  </span>
                </div>
              )}
              <div className="p-3 flex justify-between font-medium">
                <span className="text-neutral-500">Arrows Included</span>
                <span className="text-neutral-900 text-right">{product.specifications.arrowsIncluded}</span>
              </div>
              <div className="p-3 bg-neutral-50 flex justify-between font-medium">
                <span className="text-neutral-500">Finish & Varnish</span>
                <span className="text-neutral-900 text-right">{product.specifications.finish}</span>
              </div>
              <div className="p-3 flex justify-between font-medium">
                <span className="text-neutral-500">Origin</span>
                <span className="text-neutral-900 text-right">{product.specifications.origin}</span>
              </div>
              <div className="p-3 bg-neutral-50 flex justify-between font-medium">
                <span className="text-neutral-500">Guarantee</span>
                <span className="text-neutral-900 text-right">{product.specifications.warranty}</span>
              </div>
              <div className="p-3 flex justify-between font-medium">
                <span className="text-neutral-500">Package Contents</span>
                <span className="text-neutral-900 text-right max-w-xs">{product.specifications.packageContents}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-neutral-200">
            <h2 className="font-display font-bold text-xl uppercase tracking-wide text-neutral-900 mb-8">
              Related Equipment
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map(rel => (
                <div
                  key={rel.id}
                  onClick={() => {
                    setSelectedProductId(rel.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group bg-white border border-neutral-200 p-3 hover:border-[#D4AF37] cursor-pointer transition-all"
                >
                  <div className="aspect-4/5 bg-neutral-950 overflow-hidden mb-3">
                    <img
                      src={rel.mainImage}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h4 className="text-xs font-semibold text-neutral-900 group-hover:text-[#D4AF37] line-clamp-1">
                    {rel.name}
                  </h4>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-100">
                    <span className="font-mono text-xs font-bold text-neutral-900">
                      ₹{rel.basePrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-[#D4AF37] font-semibold uppercase">
                      View Model →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

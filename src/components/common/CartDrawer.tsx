import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, ShieldCheck, ShoppingBag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cartDrawerOpen,
    setCartDrawerOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    subtotal,
    discount,
    shipping,
    finalTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setActiveView,
    settings
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!cartDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const handleCheckout = () => {
    setCartDrawerOpen(false);
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const remainingForFreeShipping = Math.max(0, settings.freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / settings.freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-950/70 backdrop-blur-xs transition-opacity"
        onClick={() => setCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-[#F7F4ED]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="font-display font-bold text-lg text-neutral-900 tracking-wide uppercase">
                Your Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setCartDrawerOpen(false)}
              className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded-full hover:bg-neutral-200 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-5 py-2.5 bg-neutral-900 text-white text-xs">
            {remainingForFreeShipping > 0 ? (
              <div>
                <p className="flex justify-between font-medium text-[11px] uppercase tracking-wider mb-1">
                  <span>Add ₹{remainingForFreeShipping.toLocaleString('en-IN')} for Free Shipping</span>
                  <span className="text-[#D4AF37]">{Math.round(freeShippingProgress)}%</span>
                </p>
                <div className="w-full bg-neutral-800 h-1.5 overflow-hidden rounded-full">
                  <div
                    className="bg-[#D4AF37] h-full transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-center font-medium text-[#D4AF37] text-[11px] uppercase tracking-widest flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>You unlocked Free Pan-India Delivery!</span>
              </p>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F7F4ED] flex items-center justify-center text-[#D4AF37]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-display text-lg text-neutral-900 font-semibold uppercase">
                    Your Bag is Empty
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1 max-w-xs">
                    Discover authentic handcrafted bows, flame-tempered bamboo arrows, and artisan risers.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setCartDrawerOpen(false);
                    setActiveView('shop');
                  }}
                  className="px-6 py-2.5 bg-[#171717] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#D4AF37] hover:text-neutral-950 transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item, index) => (
                <div
                  key={`${item.productId}-${item.variationId || index}`}
                  className="flex gap-4 p-3 bg-neutral-50 border border-neutral-200/80 rounded-none relative group"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-24 bg-neutral-900 shrink-0 overflow-hidden border border-neutral-300">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="font-medium text-xs text-neutral-900 leading-snug line-clamp-2">
                        {item.productName}
                      </h4>
                      {item.variationName && (
                        <p className="text-[11px] text-[#D4AF37] font-semibold tracking-wide uppercase mt-0.5">
                          {item.variationName}
                        </p>
                      )}
                      <p className="text-[10px] text-neutral-400 mt-0.5">
                        SKU: {item.sku}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-200/60">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-neutral-300 bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.variationId, item.quantity - 1)}
                          className="p-1 hover:bg-neutral-100 text-neutral-600 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-mono font-medium text-neutral-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.variationId, item.quantity + 1)}
                          disabled={item.quantity >= item.maxStock}
                          className="p-1 hover:bg-neutral-100 text-neutral-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-neutral-900">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.productId, item.variationId)}
                    className="absolute top-2 right-2 text-neutral-400 hover:text-red-600 transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-neutral-200 bg-[#F7F4ED] space-y-4">
              {/* Coupon Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-300 text-xs text-emerald-800">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span>
                        <strong>{appliedCoupon.code}</strong> applied (-₹{discount.toLocaleString('en-IN')})
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-red-600 font-semibold hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-1">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={e => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="Coupon code (e.g. TIRGAR10)"
                        className="flex-1 bg-white border border-neutral-300 px-3 py-1.5 text-xs uppercase placeholder-neutral-400 focus:outline-none focus:border-[#D4AF37]"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-[#171717] text-[#D4AF37] hover:bg-neutral-800 text-xs font-semibold uppercase tracking-wider transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-[11px] text-red-600 font-medium">{couponError}</p>
                    )}
                    <div className="flex items-center gap-2 pt-1 text-[10px] text-neutral-500">
                      <span>Available:</span>
                      <button
                        type="button"
                        onClick={() => setCouponInput('TIRGAR10')}
                        className="underline hover:text-[#D4AF37]"
                      >
                        TIRGAR10
                      </button>
                      <span>·</span>
                      <button
                        type="button"
                        onClick={() => setCouponInput('HERITAGE200')}
                        className="underline hover:text-[#D4AF37]"
                      >
                        HERITAGE200
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-neutral-600 border-t border-neutral-300 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono font-medium text-neutral-900">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Coupon Discount</span>
                    <span className="font-mono">-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Pan-India Delivery</span>
                  <span className="font-mono font-medium text-neutral-900">
                    {shipping === 0 ? (
                      <span className="text-emerald-700 font-semibold uppercase">Free</span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-neutral-900 border-t border-neutral-300 pt-2">
                  <span>Final Payable</span>
                  <span className="font-mono text-base text-[#171717]">
                    ₹{finalTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-[#171717] hover:bg-[#D4AF37] hover:text-neutral-950 text-white text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
                  <button
                    onClick={clearCart}
                    className="hover:text-red-600 underline"
                  >
                    Clear Bag
                  </button>
                  <button
                    onClick={() => setCartDrawerOpen(false)}
                    className="hover:text-neutral-900 underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

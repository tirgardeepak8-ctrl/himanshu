import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { OrderCustomer } from '../../types';
import {
  ShieldCheck,
  Truck,
  ArrowLeft,
  CheckCircle2,
  Lock,
  AlertCircle
} from 'lucide-react';

const INDIAN_STATES = [
  'Rajasthan',
  'Gujarat',
  'Madhya Pradesh',
  'Maharashtra',
  'Uttar Pradesh',
  'Delhi NCR',
  'Punjab',
  'Haryana',
  'Uttarakhand',
  'Himachal Pradesh',
  'Karnataka',
  'Tamil Nadu',
  'Telangana',
  'Andhra Pradesh',
  'West Bengal',
  'Bihar',
  'Kerala',
  'Assam',
  'Odisha',
  'Jharkhand',
  'Chhattisgarh',
  'Goa'
];

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    subtotal,
    discount,
    appliedCoupon,
    shipping,
    finalTotal,
    createOrder,
    setActiveView,
    showToast,
    settings
  } = useStore();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Rajasthan');
  const [pincode, setPincode] = useState('');
  const [landmark, setLandmark] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'Razorpay'>('COD');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 text-center">
        <h2 className="font-display text-xl uppercase font-bold text-neutral-800">
          Your Cart is Empty
        </h2>
        <p className="text-xs text-neutral-500 mt-2">
          Add authentic Tirgar bows or arrows before proceeding to checkout.
        </p>
        <button
          onClick={() => setActiveView('shop')}
          className="mt-6 px-6 py-2.5 bg-[#171717] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#D4AF37] hover:text-neutral-950 transition-colors"
        >
          Browse Catalogue
        </button>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!fullName.trim() || !phone.trim() || !address.trim() || !city.trim() || !pincode.trim()) {
      showToast('Please fill out all required delivery fields');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      showToast('Please provide a valid 10-digit mobile number for dispatch updates');
      return;
    }

    const cleanPin = pincode.replace(/\D/g, '');
    if (cleanPin.length !== 6) {
      showToast('Please enter a valid 6-digit Indian PIN code');
      return;
    }

    if (paymentMethod === 'Razorpay' && !settings.razorpayEnabled) {
      showToast('Online payment gateway is temporarily disabled. Please select Cash on Delivery.');
      return;
    }

    setIsSubmitting(true);

    const customerDetails: OrderCustomer = {
      fullName: fullName.trim(),
      phone: cleanPhone,
      email: email.trim() || `${cleanPhone}@tirgar-customer.in`,
      address: address.trim(),
      city: city.trim(),
      state,
      pincode: cleanPin,
      landmark: landmark.trim() || undefined
    };

    try {
      createOrder(customerDetails, paymentMethod, orderNotes.trim() || undefined);
      setActiveView('order-success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      showToast('Could not complete order. Please check item stock.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F7F4ED] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation back */}
        <div className="mb-6">
          <button
            onClick={() => setActiveView('shop')}
            className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-[#D4AF37] font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Customer & Delivery Address Form (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handlePlaceOrder} className="bg-white p-6 sm:p-8 border border-neutral-200 space-y-6 shadow-sm">
              <div className="border-b border-neutral-200 pb-4">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#937418]">
                  Step 1 of 2
                </span>
                <h2 className="font-display font-bold text-xl uppercase tracking-wide text-neutral-900 mt-1">
                  Delivery Details
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Your bow will be dispatched in a reinforced wooden casing to this address.
                </p>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="e.g. Vikramaditya Rathore"
                      className="w-full bg-[#F7F4ED] border border-neutral-300 p-2.5 text-xs focus:outline-none focus:border-[#D4AF37]"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="e.g. 9829012345"
                      className="w-full bg-[#F7F4ED] border border-neutral-300 p-2.5 text-xs focus:outline-none focus:border-[#D4AF37]"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="e.g. archer@example.com"
                      className="w-full bg-[#F7F4ED] border border-neutral-300 p-2.5 text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-4 pt-4 border-t border-neutral-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                  Postal Delivery Address
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                      House / Flat No., Street, Village or Colony *
                    </label>
                    <textarea
                      rows={2}
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      placeholder="e.g. Plot No. 12, Rajputana Marg, Near City Fort"
                      className="w-full bg-[#F7F4ED] border border-neutral-300 p-2.5 text-xs focus:outline-none focus:border-[#D4AF37]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                        City / Town *
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        placeholder="e.g. Jaipur"
                        className="w-full bg-[#F7F4ED] border border-neutral-300 p-2.5 text-xs focus:outline-none focus:border-[#D4AF37]"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                        State *
                      </label>
                      <select
                        value={state}
                        onChange={e => setState(e.target.value)}
                        className="w-full bg-[#F7F4ED] border border-neutral-300 p-2.5 text-xs focus:outline-none focus:border-[#D4AF37]"
                      >
                        {INDIAN_STATES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={pincode}
                        onChange={e => setPincode(e.target.value)}
                        placeholder="e.g. 302001"
                        className="w-full bg-[#F7F4ED] border border-neutral-300 p-2.5 text-xs font-mono focus:outline-none focus:border-[#D4AF37]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase text-neutral-700 block mb-1">
                      Landmark / Special Delivery Notes
                    </label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={e => setLandmark(e.target.value)}
                      placeholder="e.g. Opposite State Bank of India"
                      className="w-full bg-[#F7F4ED] border border-neutral-300 p-2.5 text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-4 pt-4 border-t border-neutral-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                  Select Payment Option
                </h3>

                <div className="space-y-3">
                  {/* Cash on Delivery (COD) Option */}
                  <label
                    className={`block p-4 border cursor-pointer transition-all ${
                      paymentMethod === 'COD'
                        ? 'border-[#D4AF37] bg-[#F7F4ED] ring-1 ring-[#D4AF37]'
                        : 'border-neutral-300 bg-white hover:border-neutral-400'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'COD'}
                          onChange={() => setPaymentMethod('COD')}
                          className="mt-1 accent-[#D4AF37]"
                        />
                        <div>
                          <p className="font-bold text-xs text-neutral-900 uppercase">
                            Cash on Delivery (COD) / Advance Verification
                          </p>
                          <p className="text-[11px] text-neutral-600 mt-1 leading-relaxed">
                            Pay in cash or UPI when your parcel arrives. To protect handcrafted wooden bows, our workshop calls to confirm your order details before courier dispatch.
                          </p>
                          <div className="flex items-center gap-1.5 text-[10px] text-emerald-800 font-medium mt-2 bg-emerald-50 px-2 py-1 inline-flex border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Pan-India verified delivery available</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-700 uppercase">Active</span>
                    </div>
                  </label>

                  {/* Online Payment (Razorpay) Option - kept disabled per user instruction */}
                  <div className="p-4 border border-dashed border-neutral-300 bg-neutral-100 opacity-80 cursor-not-allowed">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="payment"
                          disabled
                          className="mt-1"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-xs text-neutral-600 uppercase">
                              Online Payment (UPI, Cards, NetBanking via Razorpay)
                            </p>
                            <span className="text-[10px] bg-neutral-200 text-neutral-700 px-2 py-0.5 font-semibold uppercase">
                              Offline Mode
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span>
                              Razorpay gateway keys pending workshop activation. Please use Cash on Delivery.
                            </span>
                          </p>
                        </div>
                      </div>
                      <Lock className="w-4 h-4 text-neutral-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-neutral-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#171717] hover:bg-[#D4AF37] hover:text-neutral-950 text-white text-xs font-bold uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>
                    {isSubmitting ? 'Confirming Order...' : `Confirm Order (₹${finalTotal.toLocaleString('en-IN')})`}
                  </span>
                </button>
                <p className="text-[10px] text-neutral-500 text-center mt-2">
                  By clicking Confirm Order, you confirm delivery at the specified address.
                </p>
              </div>
            </form>
          </div>

          {/* Right: Order Summary Sidebar (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-6 border border-neutral-200 space-y-4 shadow-sm">
              <h3 className="font-display font-bold text-sm uppercase tracking-wide text-neutral-900 border-b border-neutral-200 pb-3">
                Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
              </h3>

              {/* Itemized List */}
              <div className="max-h-72 overflow-y-auto space-y-3 divide-y divide-neutral-100 pr-1">
                {cart.map((item, idx) => (
                  <div key={idx} className="pt-3 first:pt-0 flex gap-3">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-14 h-16 object-cover bg-neutral-900 shrink-0 border border-neutral-200"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-medium text-neutral-900 line-clamp-1">
                        {item.productName}
                      </h4>
                      {item.variationName && (
                        <p className="text-[11px] text-[#937418] font-semibold uppercase">
                          {item.variationName}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-xs mt-1">
                        <span className="text-neutral-500">Qty: {item.quantity}</span>
                        <span className="font-mono font-bold text-neutral-900">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculations */}
              <div className="border-t border-neutral-200 pt-3 space-y-2 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono font-medium text-neutral-900">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Coupon ({appliedCoupon?.code})</span>
                    <span className="font-mono">-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Pan-India Delivery</span>
                  <span className="font-mono font-medium text-neutral-900">
                    {shipping === 0 ? <span className="text-emerald-700 uppercase font-semibold">Free</span> : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-neutral-900 border-t border-neutral-200 pt-3">
                  <span>Grand Total</span>
                  <span className="font-mono text-base text-[#171717]">
                    ₹{finalTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Packaging Assurance Card */}
            <div className="bg-[#171717] text-white p-5 border border-[#D4AF37]/30 space-y-3">
              <div className="flex items-center gap-2 text-[#D4AF37]">
                <Truck className="w-4 h-4 shrink-0" />
                <span className="font-display text-xs font-bold uppercase tracking-wider">
                  Tirgar Packaging Standard
                </span>
              </div>
              <p className="text-[11px] text-neutral-300 leading-relaxed">
                All bows and bamboo arrows are dispatched from Ganoda, Banswara in moisture-proof bubble packing and sealed solid wooden boxes to prevent transit deflection or tip damage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

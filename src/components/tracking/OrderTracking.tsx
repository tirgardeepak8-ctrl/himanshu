import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Order, OrderStatus } from '../../types';
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Phone,
  AlertCircle,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

const ORDER_STEPS: { status: OrderStatus; label: string; desc: string }[] = [
  { status: 'Pending', label: 'Order Placed', desc: 'Received in Tirgar workshop system' },
  { status: 'Confirmed', label: 'Artisan Verified', desc: 'Phone consultation / COD verification complete' },
  { status: 'Processing', label: 'Tuning & Wood Packing', desc: 'Limb alignment tested and packaged in wooden casing' },
  { status: 'Shipped', label: 'Dispatched via Courier', desc: 'In transit with Pan-India express logistics partner' },
  { status: 'Delivered', label: 'Delivered to Archer', desc: 'Safely arrived at destination' }
];

export const OrderTracking: React.FC = () => {
  const { getOrderByIdAndPhone, showToast } = useStore();

  const [orderIdInput, setOrderIdInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderIdInput.trim() || !phoneInput.trim()) {
      showToast('Please enter both Order ID and registered phone number');
      return;
    }

    const found = getOrderByIdAndPhone(orderIdInput, phoneInput);
    setSearchedOrder(found || null);
    setSearched(true);

    if (!found) {
      showToast('No matching order found for this Order ID and phone number');
    }
  };

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'Pending': return 0;
      case 'Confirmed': return 1;
      case 'Processing': return 2;
      case 'Shipped': return 3;
      case 'Delivered': return 4;
      case 'Cancelled': return -1;
      default: return 0;
    }
  };

  const currentStep = searchedOrder ? getStepIndex(searchedOrder.orderStatus) : 0;

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#D4AF37]" />
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#937418]">
              Live Dispatch Tracking
            </span>
            <span className="h-px w-8 bg-[#D4AF37]" />
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-neutral-900 tracking-wide uppercase">
            Track Customer Order
          </h1>
          <p className="text-xs text-neutral-600">
            Enter your Order ID (from invoice) and 10-digit registered mobile number to check crafting and courier progress.
          </p>
        </div>

        {/* Tracking Lookup Card */}
        <div className="bg-[#F7F4ED] p-6 sm:p-8 border border-neutral-300 shadow-sm mb-8">
          <form onSubmit={handleTrack} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
            <div className="sm:col-span-5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-800 block mb-1">
                Order ID (e.g. TIR-2026-9812) *
              </label>
              <input
                type="text"
                value={orderIdInput}
                onChange={e => setOrderIdInput(e.target.value.toUpperCase())}
                placeholder="TIR-2026-XXXX"
                className="w-full bg-white border border-neutral-300 p-2.5 text-xs font-mono font-medium focus:outline-none focus:border-[#D4AF37]"
                required
              />
            </div>

            <div className="sm:col-span-4">
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-800 block mb-1">
                Registered Phone Number *
              </label>
              <input
                type="tel"
                value={phoneInput}
                onChange={e => setPhoneInput(e.target.value)}
                placeholder="10-digit Mobile"
                className="w-full bg-white border border-neutral-300 p-2.5 text-xs font-mono font-medium focus:outline-none focus:border-[#D4AF37]"
                required
              />
            </div>

            <div className="sm:col-span-3">
              <button
                type="submit"
                className="w-full py-2.5 bg-[#171717] hover:bg-[#D4AF37] hover:text-neutral-950 text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Track Order</span>
              </button>
            </div>
          </form>

          {/* Quick Demo Helper */}
          <div className="mt-4 pt-4 border-t border-neutral-300 flex flex-wrap items-center justify-between text-[11px] text-neutral-500 gap-2">
            <span>Quick test with demo order:</span>
            <button
              type="button"
              onClick={() => {
                setOrderIdInput('TIR-2026-9812');
                setPhoneInput('9829012345');
              }}
              className="text-[#937418] font-semibold underline hover:text-neutral-950"
            >
              Autofill Demo: TIR-2026-9812 (Phone: 9829012345)
            </button>
          </div>
        </div>

        {/* Search Results Area */}
        {searched && (
          <div>
            {searchedOrder ? (
              <div className="bg-white border border-neutral-200 shadow-md p-6 sm:p-8 space-y-8 animate-in fade-in duration-200">
                {/* Order Top Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#937418]">
                      Verified Order
                    </span>
                    <h2 className="font-display font-bold text-xl uppercase tracking-wider text-neutral-900 mt-0.5">
                      {searchedOrder.orderNumber}
                    </h2>
                    <p className="text-xs text-neutral-500">
                      Placed on {new Date(searchedOrder.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })} by {searchedOrder.customer.fullName}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase text-neutral-500">Status:</span>
                    <span
                      className={`px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                        searchedOrder.orderStatus === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : searchedOrder.orderStatus === 'Shipped'
                          ? 'bg-sky-100 text-sky-800'
                          : searchedOrder.orderStatus === 'Cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {searchedOrder.orderStatus}
                    </span>
                  </div>
                </div>

                {/* Progress Stepper Timeline */}
                {searchedOrder.orderStatus === 'Cancelled' ? (
                  <div className="p-4 bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span>This order was cancelled by the workshop or customer.</span>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800 mb-6">
                      Fulfillment & Delivery Progress
                    </h3>

                    <div className="relative">
                      {/* Timeline Line */}
                      <div className="hidden sm:block absolute top-4 left-6 right-6 h-0.5 bg-neutral-200 z-0">
                        <div
                          className="h-full bg-[#D4AF37] transition-all duration-500"
                          style={{
                            width: `${(Math.max(0, currentStep) / (ORDER_STEPS.length - 1)) * 100}%`
                          }}
                        />
                      </div>

                      {/* Timeline Steps */}
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-2 relative z-10">
                        {ORDER_STEPS.map((step, idx) => {
                          const isDone = idx <= currentStep;
                          const isCurrent = idx === currentStep;

                          return (
                            <div key={step.status} className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-2 text-left sm:text-center">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shrink-0 ${
                                  isDone
                                    ? 'bg-[#D4AF37] text-neutral-950 ring-4 ring-[#D4AF37]/20 shadow-xs'
                                    : 'bg-neutral-200 text-neutral-500'
                                }`}
                              >
                                {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                              </div>

                              <div>
                                <p
                                  className={`text-xs font-bold uppercase tracking-wider ${
                                    isCurrent
                                      ? 'text-[#937418]'
                                      : isDone
                                      ? 'text-neutral-900'
                                      : 'text-neutral-400'
                                  }`}
                                >
                                  {step.label}
                                </p>
                                <p className="text-[10px] text-neutral-500 mt-0.5 max-w-[120px] mx-auto hidden sm:block">
                                  {step.desc}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Courier & Tracking Number Card */}
                {searchedOrder.trackingNumber && (
                  <div className="p-4 bg-[#F7F4ED] border border-neutral-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="text-neutral-500 uppercase tracking-wider font-semibold text-[10px]">
                        Courier Partner
                      </span>
                      <p className="font-bold text-neutral-900">
                        {searchedOrder.courierPartner || 'Delhivery Express Pan-India'}
                      </p>
                    </div>

                    <div>
                      <span className="text-neutral-500 uppercase tracking-wider font-semibold text-[10px]">
                        AWB Tracking No.
                      </span>
                      <p className="font-mono font-bold text-[#937418] text-sm">
                        {searchedOrder.trackingNumber}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                      <Truck className="w-4 h-4 text-emerald-600" />
                      <span>Insured Wood Box Transit</span>
                    </div>
                  </div>
                )}

                {/* Status History Log */}
                <div className="border-t border-neutral-200 pt-5 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Workshop Activity Log</span>
                  </h3>
                  <div className="space-y-2">
                    {searchedOrder.statusHistory.map((h, i) => (
                      <div
                        key={i}
                        className="text-xs p-2.5 bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1"
                      >
                        <span className="text-neutral-800 font-medium">
                          <strong>{h.status}:</strong> {h.note}
                        </span>
                        <span className="text-[11px] text-neutral-400 font-mono">
                          {new Date(h.timestamp).toLocaleString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary & Destination */}
                <div className="border-t border-neutral-200 pt-5 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-neutral-800 mb-2">
                      Destination Address
                    </h4>
                    <p className="font-semibold text-neutral-900">{searchedOrder.customer.fullName}</p>
                    <p className="text-neutral-600">{searchedOrder.customer.address}</p>
                    <p className="text-neutral-600">
                      {searchedOrder.customer.city}, {searchedOrder.customer.state} - {searchedOrder.customer.pincode}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-neutral-800 mb-2">
                      Items in Parcel ({searchedOrder.items.reduce((s, i) => s + i.quantity, 0)})
                    </h4>
                    <ul className="space-y-1 text-neutral-700">
                      {searchedOrder.items.map((item, idx) => (
                        <li key={idx} className="flex justify-between">
                          <span>
                            {item.quantity}x {item.productName}
                            {item.variationName && <span className="text-[#937418]"> ({item.variationName})</span>}
                          </span>
                          <span className="font-mono font-medium">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="border-t border-neutral-200 mt-2 pt-2 flex justify-between font-bold text-neutral-900">
                      <span>Total (COD):</span>
                      <span className="font-mono">₹{searchedOrder.total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                {/* Contact Workshop Helper */}
                <div className="border-t border-neutral-200 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-600 gap-3">
                  <span>Questions regarding your dispatch?</span>
                  <a
                    href="tel:+919571030853"
                    className="flex items-center gap-1.5 text-neutral-900 font-bold hover:text-[#D4AF37]"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Call Himanshu Tirgar: +91 95710 30853</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-neutral-50 p-8 border border-neutral-300 text-center space-y-3">
                <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
                <h3 className="font-display font-bold text-base uppercase text-neutral-900">
                  No Matching Order Found
                </h3>
                <p className="text-xs text-neutral-500 max-w-md mx-auto">
                  Please verify that the Order ID (e.g. TIR-2026-9812) and the 10-digit mobile number match the details provided at checkout.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

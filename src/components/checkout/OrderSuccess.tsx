import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  CheckCircle2,
  Package,
  Calendar,
  MapPin,
  Phone,
  MessageCircle,
  ArrowRight,
  Printer
} from 'lucide-react';

export const OrderSuccess: React.FC = () => {
  const { lastPlacedOrder, setActiveView, settings } = useStore();

  if (!lastPlacedOrder) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 text-center">
        <h2 className="font-display text-xl uppercase font-bold text-neutral-800">
          No Recent Order Found
        </h2>
        <p className="text-xs text-neutral-500 mt-2">
          Your order details may have already been viewed or reset.
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

  const order = lastPlacedOrder;

  // Pre-filled WhatsApp notification message to Himanshu Tirgar
  const itemsSummary = order.items
    .map(i => `${i.quantity}x ${i.productName}${i.variationName ? ` (${i.variationName})` : ''}`)
    .join(', ');

  const whatsappMessage = `*New Order Placed on TIRGAR Website*
Order ID: ${order.orderNumber}
Customer: ${order.customer.fullName}
Phone: ${order.customer.phone}
Address: ${order.customer.address}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}
Items: ${itemsSummary}
Total Amount: ₹${order.total.toLocaleString('en-IN')} (COD)
Please confirm workshop dispatch schedule!`;

  const whatsappUrl = `https://wa.me/919571030853?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="bg-[#F7F4ED] min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Success Header Card */}
        <div className="bg-white p-8 border border-neutral-200 shadow-md text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#937418]">
              Order Confirmed
            </span>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-neutral-900 tracking-wide uppercase mt-1">
              Thank You, {order.customer.fullName}
            </h1>
            <p className="text-xs text-neutral-600 mt-2 max-w-md mx-auto">
              Your order has been recorded in the Tirgar workshop database. We will prepare your handcrafted archery equipment with utmost care.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F7F4ED] border border-neutral-300 font-mono text-sm font-bold text-neutral-900">
            <span>Order ID:</span>
            <span className="text-[#937418]">{order.orderNumber}</span>
          </div>

          {/* Direct WhatsApp Confirmation Button */}
          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#1ebc59] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Send Order Confirmation to Himanshu Tirgar (+91 95710 30853)</span>
            </a>
            <p className="text-[11px] text-neutral-500 mt-1.5">
              Clicking above opens WhatsApp with your order details pre-filled for instant verification.
            </p>
          </div>
        </div>

        {/* Order Details Breakdown */}
        <div className="mt-8 bg-white p-6 sm:p-8 border border-neutral-200 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
            <h2 className="font-display font-bold text-base uppercase tracking-wide text-neutral-900">
              Receipt & Specifications
            </h2>
            <button
              onClick={() => window.print()}
              className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-900"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>
          </div>

          {/* Meta Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-neutral-50 border border-neutral-200 space-y-1">
              <span className="text-neutral-500 block flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#D4AF37]" />
                <span>Order Date:</span>
              </span>
              <p className="font-semibold text-neutral-900">
                {new Date(order.date).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </p>
            </div>

            <div className="p-3 bg-neutral-50 border border-neutral-200 space-y-1">
              <span className="text-neutral-500 block flex items-center gap-1">
                <Package className="w-3 h-3 text-[#D4AF37]" />
                <span>Payment Mode:</span>
              </span>
              <p className="font-semibold text-neutral-900">
                {order.paymentMethod} (Pay on Delivery)
              </p>
            </div>

            <div className="p-3 bg-neutral-50 border border-neutral-200 space-y-1">
              <span className="text-neutral-500 block flex items-center gap-1">
                <Phone className="w-3 h-3 text-[#D4AF37]" />
                <span>Contact Phone:</span>
              </span>
              <p className="font-semibold text-neutral-900 font-mono">
                +91 {order.customer.phone}
              </p>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="p-4 bg-[#F7F4ED] border border-neutral-200 text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-[#937418] font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>Delivery Destination</span>
            </div>
            <p className="font-semibold text-neutral-900">{order.customer.fullName}</p>
            <p className="text-neutral-700">{order.customer.address}</p>
            <p className="text-neutral-700">
              {order.customer.city}, {order.customer.state} - {order.customer.pincode}
            </p>
            {order.customer.landmark && (
              <p className="text-neutral-500 italic">Landmark: {order.customer.landmark}</p>
            )}
          </div>

          {/* Itemized Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Ordered Archery Equipment
            </h3>
            <div className="border border-neutral-200 divide-y divide-neutral-200 text-xs">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-12 h-14 object-cover bg-neutral-900 shrink-0 border border-neutral-200"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="font-semibold text-neutral-900">{item.productName}</p>
                      {item.variationName && (
                        <p className="text-[11px] text-[#937418] font-medium uppercase">
                          Finish: {item.variationName}
                        </p>
                      )}
                      <p className="text-[10px] text-neutral-400">SKU: {item.sku}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-neutral-600">Qty: {item.quantity}</p>
                    <p className="font-mono font-bold text-neutral-900">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Totals */}
          <div className="border-t border-neutral-200 pt-4 space-y-2 text-xs text-neutral-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-mono font-medium text-neutral-900">
                ₹{order.subtotal.toLocaleString('en-IN')}
              </span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Discount ({order.couponCode || 'Promo'})</span>
                <span className="font-mono">-₹{order.discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span className="font-mono font-medium text-neutral-900">
                {order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}
              </span>
            </div>
            <div className="flex justify-between text-sm font-bold text-neutral-900 border-t border-neutral-200 pt-3">
              <span>Payable Amount</span>
              <span className="font-mono text-base text-[#171717]">
                ₹{order.total.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Action Navigation */}
          <div className="pt-6 border-t border-neutral-200 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setActiveView('track-order')}
              className="flex-1 py-3 bg-[#171717] hover:bg-[#D4AF37] hover:text-neutral-950 text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
            >
              <span>Track Order Live</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveView('shop')}
              className="flex-1 py-3 border border-neutral-300 hover:bg-neutral-100 text-neutral-800 text-xs font-bold uppercase tracking-widest transition-colors text-center"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

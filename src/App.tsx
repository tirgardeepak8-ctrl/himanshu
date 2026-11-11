import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { SearchModal } from './components/common/SearchModal';
import { CustomOrderModal } from './components/custom/CustomOrderModal';
import { HomePage } from './components/home/HomePage';
import { ShopCatalog } from './components/shop/ShopCatalog';
import { ProductDetail } from './components/product/ProductDetail';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { OrderSuccess } from './components/checkout/OrderSuccess';
import { OrderTracking } from './components/tracking/OrderTracking';
import { HeritagePage } from './components/pages/HeritagePage';
import { ContactPage } from './components/pages/ContactPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CheckCircle2, MessageCircle } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeView, toastMessage, setCustomModalOpen } = useStore();

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopCatalog />;
      case 'product-detail':
        return <ProductDetail />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-success':
        return <OrderSuccess />;
      case 'track-order':
        return <OrderTracking />;
      case 'heritage':
        return <HeritagePage />;
      case 'custom-order':
        return (
          <div className="bg-[#FFFFFF] min-h-screen py-16">
            <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#937418]">
                Bespoke Archery Commissions
              </span>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl uppercase text-neutral-900">
                Craft Your Personal Tirgar Bow
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed">
                Choose your wood, draw weight, orientation, and personalized riser engraving. Each bespoke commission is hand-carved in Banswara by Himanshu Tirgar.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setCustomModalOpen(true)}
                  className="px-8 py-3.5 bg-[#171717] hover:bg-[#D4AF37] hover:text-neutral-950 text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-lg"
                >
                  Open Commission Specification Form
                </button>
              </div>
            </div>
            <HeritagePage />
          </div>
        );
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 selection:bg-[#D4AF37] selection:text-neutral-950 font-sans">
      {/* Navbar (hidden in admin if admin requests full focus, or kept clean) */}
      <Navbar />

      {/* Main View Area */}
      <main className="flex-1">
        {renderView()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Quick Contact Button */}
      <aside aria-label="Support and Quick Contact" className="fixed bottom-6 right-6 z-30">
        <a
          href="https://wa.me/919571030853?text=Hello%20Himanshu%20ji%2C%20I%20am%20interested%20in%20Tirgar%20archery%20bows%20and%20arrows."
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebc59] text-white px-4 py-3 rounded-full shadow-2xl transition-all transform hover:scale-105 group"
          title="Chat with Himanshu Tirgar on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="hidden sm:inline text-xs font-bold tracking-wide uppercase">
            WhatsApp Himanshu Tirgar
          </span>
        </a>
      </aside>

      {/* Global Slide-Over Cart Drawer */}
      <CartDrawer />

      {/* Global Product Search Modal */}
      <SearchModal />

      {/* Global Custom Order Commission Modal */}
      <CustomOrderModal />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#171717] text-white px-4 py-3 shadow-2xl border-l-4 border-[#D4AF37] flex items-center gap-2.5 animate-in slide-in-from-bottom-4 duration-200 text-xs">
          <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}

import React, { useState } from 'react';
import { Logo } from './Logo';
import { useStore } from '../../context/StoreContext';
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  Shield,
  Phone,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    cartTotalCount,
    setCartDrawerOpen,
    wishlist,
    setSearchModalOpen,
    isAdmin,
    settings,
    categories,
    setSelectedCategoryFilter
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);

  const handleNavClick = (view: string, categoryFilter?: string) => {
    if (categoryFilter) {
      setSelectedCategoryFilter(categoryFilter);
    }
    setActiveView(view);
    setMobileMenuOpen(false);
    setShopDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-all">
      {/* Announcement Bar */}
      {settings.announcementActive && (
        <div className="bg-[#171717] text-[#D4AF37] px-4 py-1.5 text-[11px] md:text-xs font-medium tracking-widest text-center uppercase border-b border-[#D4AF37]/30 flex items-center justify-center gap-3">
          <span>{settings.announcementBarText}</span>
          <span className="hidden md:inline-block opacity-40">|</span>
          <a
            href={`tel:${settings.phone}`}
            className="hidden md:flex items-center gap-1 text-white hover:text-[#D4AF37] transition-colors"
          >
            <Phone className="w-3 h-3 text-[#D4AF37]" />
            <span>+91 95710 30853</span>
          </a>
        </div>
      )}

      {/* Main Top Bar (3-Zone Top Bar Contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] shrink-0"
          aria-label="TIRGAR Home"
        >
          <Logo variant="light" size="md" />
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wider text-neutral-700 uppercase">
          <button
            onClick={() => handleNavClick('home')}
            className={`whitespace-nowrap transition-colors hover:text-[#D4AF37] ${
              activeView === 'home' ? 'text-[#D4AF37] font-semibold' : ''
            }`}
          >
            Home
          </button>

          {/* Shop with Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShopDropdownOpen(true)}
            onMouseLeave={() => setShopDropdownOpen(false)}
          >
            <button
              onClick={() => handleNavClick('shop', 'all')}
              className={`flex items-center gap-1 whitespace-nowrap transition-colors hover:text-[#D4AF37] ${
                activeView === 'shop' ? 'text-[#D4AF37] font-semibold' : ''
              }`}
            >
              <span>Shop</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>

            {shopDropdownOpen && (
              <div className="absolute top-full -left-4 w-64 bg-white border border-neutral-200 shadow-xl py-3 rounded-none animate-in fade-in slide-in-from-top-2 duration-150">
                <button
                  onClick={() => handleNavClick('shop', 'all')}
                  className="w-full text-left px-5 py-2 text-xs font-semibold tracking-wider uppercase hover:bg-[#F7F4ED] hover:text-[#D4AF37] transition-colors border-b border-neutral-100"
                >
                  All Archery Equipment
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => handleNavClick('shop', cat.id)}
                    className="w-full text-left px-5 py-2 text-xs tracking-wider uppercase text-neutral-600 hover:bg-[#F7F4ED] hover:text-[#D4AF37] transition-colors"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavClick('heritage')}
            className={`whitespace-nowrap transition-colors hover:text-[#D4AF37] ${
              activeView === 'heritage' ? 'text-[#D4AF37] font-semibold' : ''
            }`}
          >
            Our Heritage
          </button>

          <button
            onClick={() => handleNavClick('custom-order')}
            className={`whitespace-nowrap transition-colors hover:text-[#D4AF37] ${
              activeView === 'custom-order' ? 'text-[#D4AF37] font-semibold' : ''
            }`}
          >
            Custom Order
          </button>

          <button
            onClick={() => handleNavClick('track-order')}
            className={`whitespace-nowrap transition-colors hover:text-[#D4AF37] ${
              activeView === 'track-order' ? 'text-[#D4AF37] font-semibold' : ''
            }`}
          >
            Track Order
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`whitespace-nowrap transition-colors hover:text-[#D4AF37] ${
              activeView === 'contact' ? 'text-[#D4AF37] font-semibold' : ''
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Actions & Affordances */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={() => setSearchModalOpen(true)}
            className="p-2 text-neutral-700 hover:text-[#D4AF37] hover:bg-[#F7F4ED] rounded-full transition-colors"
            title="Search Products"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist Indicator */}
          <button
            onClick={() => handleNavClick('shop')}
            className="relative p-2 text-neutral-700 hover:text-[#D4AF37] hover:bg-[#F7F4ED] rounded-full transition-colors hidden sm:inline-flex"
            title="Wishlist"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#D4AF37] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Bag Drawer Trigger */}
          <button
            onClick={() => setCartDrawerOpen(true)}
            className="relative flex items-center gap-2 px-3 py-2 text-neutral-800 hover:text-[#D4AF37] hover:bg-[#F7F4ED] rounded-lg transition-colors group"
            aria-label="Open Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5 text-neutral-800 group-hover:text-[#D4AF37] transition-colors" />
            <span className="hidden md:inline text-xs font-semibold uppercase tracking-wider">Bag</span>
            {cartTotalCount > 0 ? (
              <span className="w-5 h-5 bg-[#171717] text-[#D4AF37] border border-[#D4AF37] text-[11px] font-bold rounded-full flex items-center justify-center">
                {cartTotalCount}
              </span>
            ) : (
              <span className="text-xs text-neutral-400 font-medium">0</span>
            )}
          </button>

          {/* Admin Panel Button */}
          <button
            onClick={() => handleNavClick('admin')}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold tracking-wider uppercase border transition-all ${
              isAdmin
                ? 'bg-[#171717] text-[#D4AF37] border-[#D4AF37]'
                : 'text-neutral-500 border-neutral-300 hover:border-neutral-800 hover:text-neutral-900'
            }`}
            title="Tirgar Artisan Admin Panel"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-800 hover:text-[#D4AF37] lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3 text-sm font-medium uppercase tracking-wider text-neutral-800">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left py-2 hover:text-[#D4AF37] border-b border-neutral-100"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop', 'all')}
              className="text-left py-2 hover:text-[#D4AF37] border-b border-neutral-100 font-semibold text-[#D4AF37]"
            >
              Shop All Products
            </button>
            <div className="pl-4 space-y-2 py-1">
              {categories.map(c => (
                <button
                  key={c.id}
                  onClick={() => handleNavClick('shop', c.id)}
                  className="block text-left text-xs text-neutral-600 hover:text-[#D4AF37]"
                >
                  • {c.name}
                </button>
              ))}
            </div>
            <button
              onClick={() => handleNavClick('heritage')}
              className="text-left py-2 hover:text-[#D4AF37] border-b border-neutral-100"
            >
              Our Heritage & Craft
            </button>
            <button
              onClick={() => handleNavClick('custom-order')}
              className="text-left py-2 hover:text-[#D4AF37] border-b border-neutral-100"
            >
              Request Custom Bow
            </button>
            <button
              onClick={() => handleNavClick('track-order')}
              className="text-left py-2 hover:text-[#D4AF37] border-b border-neutral-100"
            >
              Track Customer Order
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left py-2 hover:text-[#D4AF37] border-b border-neutral-100"
            >
              Contact & Workshop Location
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className="text-left py-2 text-neutral-500 hover:text-neutral-900 flex items-center gap-2"
            >
              <Shield className="w-4 h-4 text-[#D4AF37]" />
              <span>Artisan Admin Portal</span>
            </button>
          </div>

          <div className="pt-4 border-t border-neutral-200 text-xs text-neutral-500 space-y-1">
            <p className="font-semibold text-neutral-800">Himanshu Tirgar Workshop</p>
            <p>Village Chandu ji ka gara, Ganoda, Banswara, Rajasthan</p>
            <p className="text-[#D4AF37] font-semibold pt-1">Call / WhatsApp: +91 95710 30853</p>
          </div>
        </div>
      )}
    </header>
  );
};

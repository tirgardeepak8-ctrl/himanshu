import React, { useState } from 'react';
import { Logo } from './Logo';
import { useStore } from '../../context/StoreContext';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView, setSelectedCategoryFilter, settings, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address');
      return;
    }
    setSubscribed(true);
    showToast('Thank you for subscribing to Tirgar Archery dispatches!');
    setNewsletterEmail('');
  };

  const navTo = (view: string, cat?: string) => {
    if (cat) setSelectedCategoryFilter(cat);
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#121212] text-neutral-300 border-t border-[#D4AF37]/20">
      {/* Top Value Assurance Ribbon */}
      <div className="border-b border-neutral-800 py-8 bg-[#171717]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <span className="text-[#D4AF37] font-display text-sm tracking-widest uppercase">Pan-India Delivery</span>
            <span className="text-xs text-neutral-400 mt-1">Insured wooden casing packaging</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[#D4AF37] font-display text-sm tracking-widest uppercase">Generational Craft</span>
            <span className="text-xs text-neutral-400 mt-1">Traditional Rajasthani Dhanush-Vidya</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[#D4AF37] font-display text-sm tracking-widest uppercase">Genuine Materials</span>
            <span className="text-xs text-neutral-400 mt-1">Aged Bamboo & Seasoned Hardwood</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[#D4AF37] font-display text-sm tracking-widest uppercase">Direct Artisan Care</span>
            <span className="text-xs text-neutral-400 mt-1">Himanshu Tirgar: +91 95710 30853</span>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand & Newsletter Section (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-left">
              <Logo variant="dark" size="lg" showTagline={true} />
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-md">
              TIRGAR is a revered manufacturer of Indian handcrafted archery equipment based in Banswara, Rajasthan. Founded on centuries-old artisanal metallurgy and bow-carving traditions, we create bows and arrows built with uncompromising balance, accuracy, and longevity.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-white block mb-2">
                Stay in the Loop
              </span>
              <p className="text-xs text-neutral-400 mb-3">
                Receive new product announcements, archery insights, and seasonal craft batches.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-[#D4AF37] bg-[#1a1a1a] p-3 border border-[#D4AF37]/40">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>You are subscribed to the Tirgar archive. Welcome.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={e => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 bg-neutral-900 border border-neutral-700 px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#b89326] text-neutral-950 text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 flex items-center gap-1.5"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-display text-sm tracking-wider uppercase text-white font-semibold">
              Explore
            </h3>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button onClick={() => navTo('home')} className="hover:text-[#D4AF37] transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navTo('shop', 'all')} className="hover:text-[#D4AF37] transition-colors">
                  Shop Collection
                </button>
              </li>
              <li>
                <button onClick={() => navTo('heritage')} className="hover:text-[#D4AF37] transition-colors">
                  Artisan Heritage
                </button>
              </li>
              <li>
                <button onClick={() => navTo('custom-order')} className="hover:text-[#D4AF37] transition-colors">
                  Custom Bows
                </button>
              </li>
              <li>
                <button onClick={() => navTo('contact')} className="hover:text-[#D4AF37] transition-colors">
                  Workshop Visit
                </button>
              </li>
              <li>
                <button onClick={() => navTo('admin')} className="hover:text-[#D4AF37] transition-colors">
                  Artisan Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Categories (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-display text-sm tracking-wider uppercase text-white font-semibold">
              Catalogue
            </h3>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button onClick={() => navTo('shop', 'cat-traditional-bows')} className="hover:text-[#D4AF37] transition-colors">
                  Traditional Bows
                </button>
              </li>
              <li>
                <button onClick={() => navTo('shop', 'cat-modern-bows')} className="hover:text-[#D4AF37] transition-colors">
                  Modern Takedown Bows
                </button>
              </li>
              <li>
                <button onClick={() => navTo('shop', 'cat-arrows')} className="hover:text-[#D4AF37] transition-colors">
                  Forged Bamboo Arrows
                </button>
              </li>
              <li>
                <button onClick={() => navTo('shop', 'cat-handles')} className="hover:text-[#D4AF37] transition-colors">
                  Kaman Handles
                </button>
              </li>
              <li>
                <button onClick={() => navTo('shop', 'cat-accessories')} className="hover:text-[#D4AF37] transition-colors">
                  Quivers & Targets
                </button>
              </li>
              <li>
                <button onClick={() => navTo('track-order')} className="hover:text-[#D4AF37] transition-colors">
                  Track Your Order
                </button>
              </li>
            </ul>
          </div>

          {/* Workshop & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-display text-sm tracking-wider uppercase text-white font-semibold">
              Workshop Contact
            </h3>
            <div className="space-y-3 text-xs text-neutral-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  Village - Chandu ji ka gara,<br />
                  VPO - Chandu ji ka gara,<br />
                  Tahsil - Ganoda, Dist - Banswara,<br />
                  Rajasthan - 327001, India
                </span>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <div>
                  <a href={`tel:${settings.phone}`} className="text-white hover:text-[#D4AF37] block font-medium">
                    {settings.phone} (Himanshu Tirgar)
                  </a>
                  <span className="text-[11px] text-neutral-500">
                    Laxman Tirgar: 9828576885, 8829025588
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`mailto:${settings.email}`} className="text-white hover:text-[#D4AF37]">
                  {settings.email}
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/919571030853?text=${encodeURIComponent('Hello Himanshu ji, I would like to inquire about Tirgar bows and arrows.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366]/20 border border-[#25D366]/60 text-[#25D366] text-xs font-semibold rounded hover:bg-[#25D366]/30 transition-colors"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} TIRGAR. All rights reserved. Crafted by Himanshu Tirgar.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-neutral-400">
              <span>Made in India</span>
              <span className="text-base" role="img" aria-label="India">🇮🇳</span>
            </span>
            <button onClick={() => navTo('track-order')} className="hover:text-neutral-300">
              Order Tracking
            </button>
            <button onClick={() => navTo('contact')} className="hover:text-neutral-300">
              Terms & Delivery
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

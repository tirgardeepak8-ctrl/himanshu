import React from 'react';
import { HeroSection } from './HeroSection';
import { CategoryShowcase } from './CategoryShowcase';
import { FeaturedProducts } from './FeaturedProducts';
import { HeritageStory } from './HeritageStory';
import { CustomOrderBanner } from './CustomOrderBanner';
import { TestimonialsSection } from './TestimonialsSection';
import { useStore } from '../../context/StoreContext';
import { Phone, MessageCircle, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setActiveView } = useStore();

  return (
    <div className="space-y-0">
      {/* 1. Hero Campaign Showcase */}
      <HeroSection />

      {/* 2. Shop by Category (Adhering to user reference design) */}
      <CategoryShowcase />

      {/* 3. Featured Archery Products with Quick-Add */}
      <FeaturedProducts />

      {/* 4. Heritage Story & 4 Core Pillars */}
      <HeritageStory />

      {/* 5. Custom Archery Solutions Banner */}
      <CustomOrderBanner />

      {/* 6. Authentic Rajasthan Workshop Spotlight */}
      <section className="py-16 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F7F4ED] border border-neutral-300 p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#937418]">
                Direct from the Artisan Hearth
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-neutral-900 uppercase">
                Himanshu Tir Kaman Wale · Banswara
              </h2>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                तीर कमान, गोपन और फोल्डिंग कमान के लिए सीधे वर्कशॉप से संपर्क करें। ऑल इंडिया डिलीवरी उपलब्ध है। हमारे सभी तीर-कमान राजस्थान के बांसवाड़ा में पारंपरिक कारीगरी द्वारा तैयार किए जाते हैं।
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                <div className="p-3 bg-white border border-neutral-200 space-y-0.5">
                  <span className="text-neutral-500 font-semibold text-[10px] uppercase">Master Bowmaker</span>
                  <p className="font-bold text-neutral-900">Himanshu Tirgar: 9571030853</p>
                </div>
                <div className="p-3 bg-white border border-neutral-200 space-y-0.5">
                  <span className="text-neutral-500 font-semibold text-[10px] uppercase">Artisan Partner</span>
                  <p className="font-bold text-neutral-900">Laxman Tirgar: 9828576885</p>
                </div>
              </div>
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/919571030853?text=${encodeURIComponent('नमस्ते हिमांशु जी, मुझे तीर कमान के बारे में जानकारी चाहिए.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-[#25D366] hover:bg-[#1ebc59] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp +91 95710 30853</span>
                </a>
                <button
                  onClick={() => {
                    setActiveView('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 bg-[#171717] hover:bg-[#D4AF37] hover:text-neutral-950 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
                >
                  <span>Browse Bows & Arrows</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-neutral-950 border border-neutral-300 p-2 shadow-md">
              <img
                src="/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.44.58_PM_b1bb8043.jpeg"
                alt="Workshop Contact Details"
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Verified Customer Reviews */}
      <TestimonialsSection />
    </div>
  );
};

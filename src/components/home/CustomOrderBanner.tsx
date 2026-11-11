import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Compass } from 'lucide-react';

export const CustomOrderBanner: React.FC = () => {
  const { setCustomModalOpen } = useStore();

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#221c15] via-[#3a2e1d] to-[#1c1813] text-white border-b border-neutral-200">
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg
          viewBox="0 0 1200 400"
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
        >
          <path
            d="M0 320 Q 300 240, 600 300 T 1200 220 L 1200 400 L 0 400 Z"
            fill="#D4AF37"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
            <Compass className="w-4 h-4" />
            <span>Bespoke Archery Commission</span>
          </div>

          <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-wide text-white leading-tight">
            Custom Archery Solutions
          </h2>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Get bows, arrows, and accessories tailored to your exact draw length, draw weight (20 lbs - 60 lbs), wood preference, left/right hand orientation, and personalized name engraving.
          </p>
        </div>

        <div className="shrink-0">
          <button
            onClick={() => setCustomModalOpen(true)}
            className="px-8 py-4 bg-[#D4AF37] hover:bg-[#b89326] text-neutral-950 font-bold text-xs uppercase tracking-widest shadow-xl flex items-center gap-2.5 transition-all transform hover:scale-103"
          >
            <span>Request Custom Order</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

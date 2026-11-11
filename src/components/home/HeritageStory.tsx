import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Target, Shield, Flame, Sparkles, ArrowRight, MapPin, Phone } from 'lucide-react';

export const HeritageStory: React.FC = () => {
  const { setActiveView } = useStore();

  return (
    <section className="bg-[#171717] text-white overflow-hidden">
      {/* Upper Split Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual: Workshop Artisan & Real Handcrafted Heritage */}
          <div className="lg:col-span-6 relative">
            <div className="relative border border-[#D4AF37]/30 shadow-2xl overflow-hidden bg-neutral-900 group">
              <img
                src="/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.44.58_PM_b1bb8043.jpeg"
                alt="Himanshu Tir Kaman Wale Workshop Heritage"
                className="w-full h-auto object-cover group-hover:scale-103 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/70 backdrop-blur-md border border-[#D4AF37]/40 flex items-center justify-between">
                <div>
                  <p className="text-[#D4AF37] font-display text-xs uppercase tracking-wider font-semibold">
                    Himanshu Tir Kaman Wale
                  </p>
                  <p className="text-[11px] text-neutral-300">
                    Banswara, Rajasthan · All-India Delivery
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-white">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>9571030853</span>
                </div>
              </div>
            </div>

            {/* Inset Badge */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-[#D4AF37] text-neutral-950 p-4 shadow-xl border border-white/20 max-w-xs">
              <p className="font-display font-bold text-xs uppercase tracking-wider">
                Ancient Vagad Archery Lineage
              </p>
              <p className="text-[11px] text-neutral-900 mt-1">
                Generations of tribal bowyers preserving India's Vedic archery heritage.
              </p>
            </div>
          </div>

          {/* Right Editorial Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#D4AF37]" />
                <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#D4AF37]">
                  Our Heritage
                </span>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-wide uppercase leading-tight text-balance">
                A Craftsmanship Passed Through Generations
              </h2>
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed">
              At <strong className="text-[#D4AF37]">TIRGAR</strong>, we honor the sacred bond between the archer and their bow. From our ancestral workshop in the village of Chandu ji ka gara in Banswara, Rajasthan, founder <strong className="text-white">Himanshu Tirgar</strong> and master craftsmen hand-hew each riser from seasoned teak, padauk, and rosewood.
            </p>

            <p className="text-sm text-neutral-400 leading-relaxed">
              Every bamboo shaft is flame-straightened by eye, weighed for spine match, and tipped with hand-hammered carbon iron forged directly on anvil hearths. We do not mass-produce stamped plastic — each Tirgar bow is tuned individually for harmonic resonance, quiet release, and enduring power.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-800">
              <div>
                <span className="font-display text-2xl sm:text-3xl font-bold text-[#D4AF37] block">
                  32+
                </span>
                <span className="text-[11px] text-neutral-400 uppercase tracking-wider">
                  Years of Craft
                </span>
              </div>
              <div>
                <span className="font-display text-2xl sm:text-3xl font-bold text-[#D4AF37] block">
                  10,000+
                </span>
                <span className="text-[11px] text-neutral-400 uppercase tracking-wider">
                  Bows Delivered
                </span>
              </div>
              <div>
                <span className="font-display text-2xl sm:text-3xl font-bold text-[#D4AF37] block">
                  100%
                </span>
                <span className="text-[11px] text-neutral-400 uppercase tracking-wider">
                  Handmade in India
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => {
                  setActiveView('heritage');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-[#D4AF37] hover:bg-[#b89326] text-neutral-950 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
              >
                <span>Read Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setActiveView('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-3 border border-neutral-700 hover:border-neutral-400 text-neutral-300 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2"
              >
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Visit Rajasthan Workshop</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Pillars Strip (exact match from reference design) */}
      <div className="border-t border-neutral-800 bg-[#141414] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Pillar 1 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37]/50 flex items-center justify-center shrink-0 text-[#D4AF37]">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                  Precision & Performance
                </h4>
                <p className="text-xs text-neutral-400 mt-1">
                  Engineered for true arrow flight, balanced limb deflection, and grouping consistency.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37]/50 flex items-center justify-center shrink-0 text-[#D4AF37]">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                  Durable & Reliable
                </h4>
                <p className="text-xs text-neutral-400 mt-1">
                  Made to last for generations with moisture-sealed lacquers and heavy aluminum limb pockets.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37]/50 flex items-center justify-center shrink-0 text-[#D4AF37]">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                  Traditional Craftsmanship
                </h4>
                <p className="text-xs text-neutral-400 mt-1">
                  Skills from our roots. Fire-cured bamboo and anvil-forged iron points made in Ganoda.
                </p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37]/50 flex items-center justify-center shrink-0 text-[#D4AF37]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                  Premium Materials
                </h4>
                <p className="text-xs text-neutral-400 mt-1">
                  Finest Indian padauk, teak, high-altitude culm bamboo, and real feathers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Flame, Target, Sparkles, Phone, MapPin } from 'lucide-react';

export const HeritagePage: React.FC = () => {
  const { setActiveView, setCustomModalOpen } = useStore();

  return (
    <div className="bg-white min-h-screen">
      {/* Editorial Hero */}
      <div className="relative bg-[#171717] text-white py-20 lg:py-28 border-b border-[#D4AF37]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chandu Ji Ka Gara · Banswara · Rajasthan</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-wide leading-tight">
            Rooted in Heritage. Built for Generations.
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed font-normal">
            The story of Himanshu Tirgar and the revival of authentic Indian archery craftsmanship in the historic Vagad hills of Rajasthan.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-16">
        {/* Section 1: The Name Tirgar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6 space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#937418] block">
              Chapter 01 · The Lineage
            </span>
            <h2 className="font-display font-bold text-2xl text-neutral-900 uppercase">
              The Meaning of 'Tirgar'
            </h2>
            <p>
              In historic Rajasthan and across Mewar, a <strong className="text-neutral-950">Tirgar</strong> (from <em>Tir</em> meaning arrow, and <em>Gar</em> meaning maker) refers to the master arrow-makers who provided weaponry to local armies, royal huntsmen, and tribal warrior clans for generations.
            </p>
            <p>
              Based in <strong>Village Chandu ji ka gara, Ganoda in District Banswara</strong>, master craftsman <strong className="text-neutral-950">Himanshu Tirgar</strong> continues this hereditary calling. While modern sports bows have become mass-produced in synthetic factories, Tirgar preserves the living relationship between hand, tool, and seasoned timber.
            </p>
          </div>

          <div className="md:col-span-6 bg-neutral-950 border border-neutral-300 p-2 shadow-lg">
            <img
              src="/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.44.58_PM_b1bb8043.jpeg"
              alt="Himanshu Tir Kaman Wale Workshop Banner"
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
            <p className="text-[11px] text-neutral-400 p-2 text-center">
              Original workshop banner of Himanshu Tir Kaman Wale in Ganoda, Rajasthan.
            </p>
          </div>
        </div>

        {/* Section 2: Craftsmanship Process */}
        <div className="border-t border-neutral-200 pt-16 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#937418]">
              Chapter 02 · Sacred Geometry
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 uppercase">
              Four Stages of Artisan Bowmaking
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#F7F4ED] border border-neutral-200 space-y-3">
              <span className="font-mono text-2xl font-bold text-[#D4AF37]">01</span>
              <h3 className="font-display font-bold text-sm uppercase text-neutral-900">
                Timber Selection & Curing
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Padauk, Sheesham, and Teak hardwoods are air-seasoned for over 18 months in Rajasthan's dry climate to ensure zero moisture warping.
              </p>
            </div>

            <div className="p-6 bg-[#F7F4ED] border border-neutral-200 space-y-3">
              <span className="font-mono text-2xl font-bold text-[#D4AF37]">02</span>
              <h3 className="font-display font-bold text-sm uppercase text-neutral-900">
                Fire Tempering Bamboo
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Culm bamboo is rotated slowly over live wood coals. The heat crystallizes natural lignins, transforming flexible reeds into spring-steel resilient limbs.
              </p>
            </div>

            <div className="p-6 bg-[#F7F4ED] border border-neutral-200 space-y-3">
              <span className="font-mono text-2xl font-bold text-[#D4AF37]">03</span>
              <h3 className="font-display font-bold text-sm uppercase text-neutral-900">
                Anvil Forged Arrowheads
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Points are hand-twisted into self-tapping spiral drills or hammered into razor-leaf broadheads, then quenched in mineral oils.
              </p>
            </div>

            <div className="p-6 bg-[#F7F4ED] border border-neutral-200 space-y-3">
              <span className="font-mono text-2xl font-bold text-[#D4AF37]">04</span>
              <h3 className="font-display font-bold text-sm uppercase text-neutral-900">
                Harmonic Tiller & Release
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Each bow is strung and drawn on the tiller board to test limb balance and ensure silent, hand-shock free release.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Authentic Photo Showcase */}
        <div className="border-t border-neutral-200 pt-16 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#937418]">
              Chapter 03 · Workshop Archive
            </span>
            <h2 className="font-display font-bold text-2xl text-neutral-900 uppercase">
              Glimpses from the Banswara Workshop
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="overflow-hidden bg-neutral-900 aspect-3/4 border border-neutral-300">
              <img
                src="/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.44.17_PM_39805559.jpeg"
                alt="Handcrafted Kaman Handles"
                className="w-full h-full object-cover hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="overflow-hidden bg-neutral-900 aspect-3/4 border border-neutral-300">
              <img
                src="/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.18_PM_8303119e.jpeg"
                alt="Forged Bamboo Arrows"
                className="w-full h-full object-cover hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="overflow-hidden bg-neutral-900 aspect-3/4 border border-neutral-300">
              <img
                src="/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.37.48_PM_72001a52.jpeg"
                alt="Classic Target Bow"
                className="w-full h-full object-cover hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="overflow-hidden bg-neutral-900 aspect-3/4 border border-neutral-300">
              <img
                src="/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.44.56_PM_80f6bfbd.jpeg"
                alt="Bamboo Arrow Stock"
                className="w-full h-full object-cover hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="p-8 bg-[#171717] text-white border border-[#D4AF37]/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-display font-bold text-lg uppercase tracking-wide text-white">
              Experience the Living Craft
            </h3>
            <p className="text-xs text-neutral-300">
              Order directly from Himanshu Tirgar or commission a bespoke archery set.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setActiveView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-[#D4AF37] hover:bg-[#b89326] text-neutral-950 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Shop Collection
            </button>
            <button
              onClick={() => setCustomModalOpen(true)}
              className="px-6 py-3 border border-white/40 text-white text-xs font-bold uppercase tracking-wider hover:bg-white/10"
            >
              Custom Commission
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

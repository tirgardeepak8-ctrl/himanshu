import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Truck, ShieldCheck, Sparkles, Feather } from 'lucide-react';

interface HeroSlide {
  kicker: string;
  title: string;
  subtitle: string;
  image: string;
  primaryCtaText: string;
  primaryView: string;
  badge: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    kicker: 'The Tirgar Legacy · Banswara, Rajasthan',
    title: 'THE ART OF ARCHERY. THE LEGACY OF TIRGAR.',
    subtitle: 'Handcrafted bows and arrows rooted in centuries of Indian tribal heritage, built for performance and generations.',
    image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.15_PM_ea7be31c.jpeg',
    primaryCtaText: 'Explore Collection',
    primaryView: 'shop',
    badge: 'Artisan Masterpiece'
  },
  {
    kicker: 'Royal Padauk Series',
    title: 'PRECISION TAKEDOWN BOWS & HAND-HEWN RISERS',
    subtitle: 'Sculpted hardwood handles paired with hand-tempered bamboo limbs for crisp release, pure balance, and effortless accuracy.',
    image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.15_PM__1__216506e2.jpeg',
    primaryCtaText: 'View Deluxe Bows',
    primaryView: 'shop',
    badge: 'Generational Craft'
  },
  {
    kicker: 'Artisan Forged Teer · ₹70 - ₹80',
    title: 'AUTHENTIC HAND-HAMMERED BAMBOO ARROWS',
    subtitle: 'Straightened over open flame, fitted with hand-twisted drill tips or razor broadheads, and feathered with natural turkey plumage.',
    image: '/public/assets/aistudio/WhatsApp_Image_2026-11-11_at_8.45.18_PM_8303119e.jpeg',
    primaryCtaText: 'Shop Bamboo Arrows',
    primaryView: 'shop',
    badge: 'Flame Straightened'
  }
];

export const HeroSection: React.FC = () => {
  const { setActiveView, setCustomModalOpen } = useStore();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex(prev => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlideIndex];

  return (
    <section className="relative bg-[#0d0d0d] text-white overflow-hidden">
      {/* Background Hero Image with Measured Gradient Scrim */}
      <div className="absolute inset-0">
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover object-center scale-105 transition-all duration-1000 ease-out brightness-60"
          referrerPolicy="no-referrer"
        />
        {/* Measured Scrim for WCAG 4.5:1 text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-black/30" />
      </div>

      {/* Hero Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 min-h-[580px] lg:min-h-[640px] flex flex-col justify-between">
        <div className="max-w-2xl space-y-6">
          {/* Subtle Editorial Kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold tracking-[0.2em] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{slide.kicker}</span>
          </div>

          {/* Headline in Luxury Serif */}
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-wide uppercase leading-tight text-white drop-shadow-md text-balance">
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal max-w-xl">
            {slide.subtitle}
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                setActiveView(slide.primaryView);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-7 py-3.5 bg-[#D4AF37] hover:bg-[#b89326] text-neutral-950 text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg hover:shadow-[#D4AF37]/20"
            >
              <span>{slide.primaryCtaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCustomModalOpen(true)}
              className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 text-xs font-semibold uppercase tracking-widest backdrop-blur-xs transition-colors"
            >
              Custom Order Inquiry
            </button>
          </div>
        </div>

        {/* Carousel Slide Indicators */}
        <div className="pt-10 flex items-center gap-3">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`h-1.5 transition-all duration-300 ${
                currentSlideIndex === idx ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
          <span className="text-xs text-neutral-400 font-mono pl-2">
            0{currentSlideIndex + 1} / 0{HERO_SLIDES.length}
          </span>
        </div>
      </div>

      {/* Trust & Guarantee Ribbon (adhering to reference image) */}
      <div className="relative border-t border-white/10 bg-[#141414]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-medium tracking-wide">
            <div className="flex items-center gap-2.5 text-neutral-200">
              <Truck className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Pan India Delivery</span>
            </div>
            <div className="flex items-center gap-2.5 text-neutral-200">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Quality Assured</span>
            </div>
            <div className="flex items-center gap-2.5 text-neutral-200">
              <Feather className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Handcrafted in Rajasthan</span>
            </div>
            <div className="flex items-center gap-2.5 text-neutral-200">
              <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Sustainable Bamboo & Timber</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

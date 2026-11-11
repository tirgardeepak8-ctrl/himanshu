import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight } from 'lucide-react';

export const CategoryShowcase: React.FC = () => {
  const { categories, setSelectedCategoryFilter, setActiveView } = useStore();

  const handleCategoryClick = (catId: string) => {
    setSelectedCategoryFilter(catId);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-[#F7F4ED] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Refined Gold Accents */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-4 mb-2">
            <span className="h-px w-12 bg-[#D4AF37]" />
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#937418]">
              Curated Collections
            </span>
            <span className="h-px w-12 bg-[#D4AF37]" />
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-neutral-900 tracking-wide uppercase">
            Shop by Category
          </h2>
          <p className="text-xs text-neutral-600 mt-2">
            Authentic weapons and archery sport gear crafted by master bowmaker Himanshu Tirgar.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.slice(0, 4).map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="group relative h-80 overflow-hidden bg-neutral-900 border border-neutral-300 shadow-md text-left focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Category Photography */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 brightness-75 group-hover:brightness-65"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between gap-3">
                <div>
                  {cat.badge && (
                    <span className="text-[10px] tracking-widest text-[#D4AF37] uppercase font-semibold block mb-1">
                      {cat.badge}
                    </span>
                  )}
                  <h3 className="font-display font-bold text-lg text-white uppercase tracking-wide group-hover:text-[#D4AF37] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-neutral-300 line-clamp-1 mt-0.5">
                    {cat.description}
                  </p>
                </div>

                {/* Circular Gold Button (styled exactly like reference design) */}
                <div className="w-9 h-9 rounded-full border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37] group-hover:text-neutral-950 transition-colors">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* View All Categories Link */}
        <div className="text-center mt-10">
          <button
            onClick={() => handleCategoryClick('all')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-800 hover:text-[#D4AF37] transition-colors border-b border-neutral-400 pb-1"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};

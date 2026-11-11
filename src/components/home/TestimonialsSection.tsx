import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Star, CheckCircle, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { reviews } = useStore();

  return (
    <section className="py-20 bg-[#F7F4ED] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-4 mb-2">
            <span className="h-px w-10 bg-[#D4AF37]" />
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#937418]">
              Verified Feedback
            </span>
            <span className="h-px w-10 bg-[#D4AF37]" />
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-neutral-900 tracking-wide uppercase">
            From Archers Across India
          </h2>
          <p className="text-xs text-neutral-600 mt-2">
            Genuine experiences from sports academies, traditional toxophilites, and collectors.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.slice(0, 4).map(rev => (
            <div
              key={rev.id}
              className="bg-white p-6 border border-neutral-200/80 shadow-xs flex flex-col justify-between space-y-4 relative"
            >
              <Quote className="w-8 h-8 text-[#D4AF37]/20 absolute top-4 right-4" />

              <div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-neutral-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-neutral-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 font-display">
                    {rev.author}
                  </h4>
                  <p className="text-[11px] text-neutral-500">
                    {rev.location}
                  </p>
                </div>
                {rev.verifiedPurchase && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-medium">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

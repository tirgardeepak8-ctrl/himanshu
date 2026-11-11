import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, X, ArrowRight, ArrowUpRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    searchModalOpen,
    setSearchModalOpen,
    products,
    setSelectedProductId,
    setActiveView
  } = useStore();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [searchModalOpen]);

  if (!searchModalOpen) return null;

  const filteredProducts = query.trim() === ''
    ? []
    : products.filter(p => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q)) ||
          p.sku.toLowerCase().includes(q)
        );
      });

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    setSearchModalOpen(false);
    setActiveView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePopularSearch = (term: string) => {
    setQuery(term);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm transition-opacity"
        onClick={() => setSearchModalOpen(false)}
      />

      <div className="relative min-h-screen flex items-start justify-center p-4 sm:p-6 lg:p-12">
        <div className="relative bg-white w-full max-w-2xl shadow-2xl border border-neutral-300 overflow-hidden mt-12 animate-in fade-in zoom-in-95 duration-150">
          {/* Search Header */}
          <div className="p-4 sm:p-6 border-b border-neutral-200 flex items-center gap-3 bg-[#F7F4ED]">
            <Search className="w-5 h-5 text-[#D4AF37] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search bows, arrows, kaman handles, draw weights..."
              className="w-full bg-transparent text-sm sm:text-base font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs text-neutral-400 hover:text-neutral-700"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setSearchModalOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Suggestions if query is empty */}
          {query.trim() === '' && (
            <div className="p-6 space-y-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                Popular Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Padauk Bow',
                  'Bamboo Arrows',
                  'Kaman Handle',
                  '₹70 Ek Teer',
                  'Dhanush',
                  'Combo Set',
                  'Broadhead',
                  'Emerald Green'
                ].map(term => (
                  <button
                    key={term}
                    onClick={() => handlePopularSearch(term)}
                    className="px-3 py-1.5 bg-neutral-100 hover:bg-[#D4AF37]/20 hover:text-[#937418] text-neutral-700 text-xs font-medium transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {query.trim() !== '' && (
            <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 divide-y divide-neutral-100">
              {filteredProducts.length === 0 ? (
                <div className="py-12 text-center text-neutral-500 text-sm">
                  <p>No archery equipment found matching "{query}".</p>
                  <p className="text-xs text-neutral-400 mt-1">
                    Try searching for "bow", "arrow", "teer", or "handle".
                  </p>
                </div>
              ) : (
                filteredProducts.map(p => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectProduct(p.id)}
                    className="w-full py-3 flex items-center justify-between text-left group hover:bg-[#F7F4ED]/60 px-3 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-14 bg-neutral-900 shrink-0 overflow-hidden border border-neutral-200">
                        <img
                          src={p.mainImage}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-neutral-900 group-hover:text-[#D4AF37] transition-colors">
                          {p.name}
                        </h4>
                        <p className="text-[11px] text-neutral-500 uppercase tracking-wider">
                          {p.categoryName} · {p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-neutral-900">
                        ₹{p.basePrice.toLocaleString('en-IN')}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#D4AF37]" />
                    </div>
                  </button>
                ))
              )}
            </div>
          )}

          {/* Footer note */}
          <div className="p-3 bg-neutral-50 border-t border-neutral-200 text-center text-[11px] text-neutral-500">
            Press ESC or click outside to close
          </div>
        </div>
      </div>
    </div>
  );
};

"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { getFullProducts, FullProduct } from "@/lib/data";

const allProducts = getFullProducts();

const USE_CASES = [
  { id: "mood-attention", label: "Mood & Attention", icon: "🌙" },
  { id: "travel-transition", label: "Transition & Travel", icon: "🚗" },
  { id: "touch-sensory", label: "Touch & Sensory", icon: "✨" },
];

const PRICE_RANGES = [
  { id: "under-15", label: "Under NPR 500", min: 0, max: 500 },
  { id: "15-25", label: "NPR 500 - NPR 3000", min: 500, max: 3000 },
  { id: "over-25", label: "Over NPR 3000", min: 3000, max: 100000 },
];

type SortOption = "latest" | "price-asc" | "price-desc";

interface PageProps {
  params: { id: string };
}

export default function CategoryPage({ params }: PageProps) {
  const { id } = params;
  
  const categoryProducts = useMemo(() => {
    return allProducts.filter(p => p.categoryId === id);
  }, [id]);

  const category = useMemo(() => {
    if (categoryProducts.length === 0) return null;
    return {
      id,
      category: categoryProducts[0].categoryName,
      categoryDescription: categoryProducts[0].categoryDescription,
      products: categoryProducts
    };
  }, [id, categoryProducts]);

  const [selectedUseCases, setSelectedUseCases] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("latest");

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    if (!category) return [];
    
    let result = [...category.products] as FullProduct[];

    // Use Case Filter
    if (selectedUseCases.length > 0) {
      result = result.filter((p) => 
        p.whatItHelpsWith?.some((uc: string) => selectedUseCases.includes(uc))
      );
    }

    // Price Range Filter
    if (selectedPriceRanges.length > 0) {
      result = result.filter((p) => {
        return selectedPriceRanges.some(rangeId => {
          const range = PRICE_RANGES.find(r => r.id === rangeId);
          if (!range) return false;
          return p.priceNumeric >= range.min && p.priceNumeric <= range.max;
        });
      });
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "latest") {
        return new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime();
      }
      if (sortBy === "price-asc") {
        const pA = a.offerPriceNumeric || a.priceNumeric;
        const pB = b.offerPriceNumeric || b.priceNumeric;
        return pA - pB;
      }
      if (sortBy === "price-desc") {
        const pA = a.offerPriceNumeric || a.priceNumeric;
        const pB = b.offerPriceNumeric || b.priceNumeric;
        return pB - pA;
      }
      return 0;
    });

    return result;
  }, [category, selectedUseCases, selectedPriceRanges, sortBy]);

  if (!category) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="font-body text-neutral-500">Category not found.</p>
      </div>
    );
  }

  const toggleUseCase = (id: string) => {
    setSelectedUseCases(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const togglePriceRange = (id: string) => {
    setSelectedPriceRanges(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const clearAllFilters = () => {
    setSelectedUseCases([]);
    setSelectedPriceRanges([]);
    setSortBy("latest");
  };

  return (
    <main className="w-full relative min-h-screen bg-white flex flex-col">

      {/* Hero Header for Category */}
      <div className="pt-[14vh] md:pt-[18vh] px-[10%] pb-12 bg-[#fafafa] border-b border-black/5 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-yellow-100 text-brand-yellow font-body font-bold text-[10px] tracking-widest uppercase mb-6">
            Explore Category
          </div>
          <h1 className="font-heading text-[#171717] text-[clamp(2.5rem,6vw,4.8rem)] leading-[1.1] mb-6">
            {category.category}
          </h1>
          <p className="font-body text-neutral-500 text-lg md:text-xl max-w-2xl leading-relaxed">
            {category.categoryDescription}
          </p>
        </motion.div>
      </div>

      <div className="px-[10%] flex flex-col md:flex-row gap-12 md:gap-16 pb-24">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-72 shrink-0">
          <div className="sticky top-32 space-y-12">
            <div className="flex items-center justify-between pb-6 border-b border-black/5">
              <h2 className="font-heading text-2xl text-[#171717]">Filters</h2>
              {(selectedUseCases.length > 0 || selectedPriceRanges.length > 0) && (
                <button onClick={clearAllFilters} className="font-body text-xs font-bold uppercase tracking-widest text-amber-600 hover:text-amber-700 underline transition-all">
                  Clear All
                </button>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="font-body text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">Use-case</h3>
              <div className="flex flex-col gap-3">
                {USE_CASES.map((uc) => (
                  <label key={uc.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={selectedUseCases.includes(uc.id)} onChange={() => toggleUseCase(uc.id)} className="hidden" />
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${selectedUseCases.includes(uc.id) ? "bg-[#171717] border-[#171717]" : "border-black/10 group-hover:border-black/20"}`}>
                      {selectedUseCases.includes(uc.id) && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" className="w-3 h-3"><polyline points="20 6 9 17 4 12" /></svg>}
                    </div>
                    <span className={`font-body text-base transition-colors ${selectedUseCases.includes(uc.id) ? "text-[#171717] font-semibold" : "text-neutral-500"}`}>{uc.icon} &nbsp;{uc.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-8 border-t border-black/5">
              <h3 className="font-body text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">Price range</h3>
              <div className="flex flex-col gap-3">
                {PRICE_RANGES.map((range) => (
                  <label key={range.id} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={selectedPriceRanges.includes(range.id)} onChange={() => togglePriceRange(range.id)} className="hidden" />
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${selectedPriceRanges.includes(range.id) ? "bg-[#171717] border-[#171717]" : "border-black/10 group-hover:border-black/20"}`}>
                      {selectedPriceRanges.includes(range.id) && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" className="w-3 h-3"><polyline points="20 6 9 17 4 12" /></svg>}
                    </div>
                    <span className={`font-body text-base transition-colors ${selectedPriceRanges.includes(range.id) ? "text-[#171717] font-semibold" : "text-neutral-500"}`}>{range.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Grid Area */}
        <div className="flex-1">
          <div className="mb-10 flex items-center justify-between gap-6 pb-6 border-b border-black/5">
            <p className="font-body text-sm text-neutral-400">{filteredProducts.length} items in this category</p>
            <div className="flex items-center gap-4">
              <span className="font-body text-xs font-bold uppercase tracking-widest text-neutral-300">Sort By:</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)} className="bg-transparent font-body font-bold text-sm text-[#171717] border-none focus:ring-0 cursor-pointer hover:text-amber-600 transition-colors">
                <option value="latest">Latest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-y-12 gap-x-8 md:gap-x-12">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </AnimatePresence>
            {filteredProducts.length === 0 && (
              <div className="col-span-full py-32 text-center">
                <p className="font-body text-neutral-500 italic">No products matched your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>


    </main>
  );
}

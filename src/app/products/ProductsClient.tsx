"use client";

import { useState, useMemo, useEffect, Suspense, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getFullProducts, getCategories, Category } from "@/lib/data";
import { LayoutGrid, Filter, X, Banknote, ChevronDown } from "lucide-react";
import * as Icons from "lucide-react";
import ProductCard from "@/components/ProductCard";

function ProductsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [activeCategory, setActiveCategory] = useState(() => searchParams.get("category") || "all");
  const [activePriceRange, setActivePriceRange] = useState<string | null>(() => searchParams.get("price"));
  const [expandedSections, setExpandedSections] = useState<string[]>(["categories", "price"]);
  
  const allProducts = getFullProducts();
  const allCategories = getCategories();

  // ── URL Synchronization Logic ──
  const updateFilter = useCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, router, pathname]);

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    updateFilter("category", id);
  };

  const handlePriceChange = (id: string) => {
    const newVal = activePriceRange === id ? null : id;
    setActivePriceRange(newVal);
    updateFilter("price", newVal);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  // Sync from URL if it changes (e.g., browser back button)
  useEffect(() => {
    const cat = searchParams.get("category") || "all";
    const price = searchParams.get("price");
    
    if (cat !== activeCategory) setActiveCategory(cat);
    if (price !== activePriceRange) setActivePriceRange(price);
  }, [searchParams, activeCategory, activePriceRange]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      const matchesCategory = activeCategory === "all" || p.categoryId === activeCategory;
      
      let matchesPrice = true;
      if (activePriceRange) {
        const currentPrice = p.offerPriceNumeric || p.priceNumeric;
        
        if (activePriceRange === "0-10") matchesPrice = currentPrice < 500;
        else if (activePriceRange === "10-20") matchesPrice = currentPrice >= 500 && currentPrice <= 3000;
        else if (activePriceRange === "20+") matchesPrice = currentPrice > 3000;
      }
      
      return matchesCategory && matchesPrice;
    });
  }, [activeCategory, activePriceRange, allProducts]);

  const categories = useMemo(() => {
    const mapped = allCategories.map(cat => {
      // Dynamic icon lookup
      const IconComponent = (Icons as any)[cat.icon] || Filter;
      return {
        id: cat.id,
        name: cat.name,
        brand: cat.brandId === "cliky-claky" ? "Cliky Claky" : 
               cat.brandId === "dayday" ? "DayDay" : 
               cat.brandId === "numsum" ? "NumSum" : "Brand",
        icon: <IconComponent className="w-4 h-4" strokeWidth={1.5} />
      };
    });

    return [
      { id: "all", name: "All Products", brand: "Catalogue", icon: <LayoutGrid className="w-4 h-4" strokeWidth={1.5} /> },
      ...mapped
    ];
  }, [allCategories]);

  const priceRanges = [
    { id: "0-10", name: "Under NPR 500" },
    { id: "10-20", name: "NPR 500 — NPR 3000" },
    { id: "20+", name: "Over NPR 3000" }
  ];

  const clearAllFilters = () => {
    setActiveCategory("all");
    setActivePriceRange(null);
    router.push(pathname, { scroll: false });
  };

  const isFiltered = activeCategory !== "all" || activePriceRange !== null;

  return (
    <main className="min-h-screen bg-[#FAF9F6] pt-32 pb-40 md:pt-48 md:pb-64">
      
      <div className="px-8 md:px-[10%] mb-12 md:mb-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-4 mb-6"
          >
             <div className="h-[1px] w-12 bg-brand-yellow" />
             <span className="font-body text-[10px] font-black tracking-[0.6em] uppercase text-black/40">Studio Catalogue</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading text-black text-[clamp(2.5rem,7vw,6rem)] leading-[0.85] tracking-tighter mb-8"
          >
            Explore <br /> our <span className="italic text-brand-yellow">Garden</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-body text-neutral-400 text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            Because play is the new integration. Every item in our catalogue is hand-chosen to support daily living skills, self-regulation, and quiet joy.
          </motion.p>
        </div>
      </div>

      <div className="px-8 md:px-[10%] lg:flex lg:gap-16">
        <aside className="hidden lg:block w-[260px] flex-shrink-0">
          <div className="sticky top-40 space-y-12">
             
             <div className="border-b border-black/5 pb-8">
                <button 
                  onClick={() => toggleSection("categories")}
                  className="flex items-center justify-between w-full mb-6 group text-left"
                >
                   <div className="flex items-center gap-3">
                      <Filter className="w-4 h-4 text-brand-yellow" strokeWidth={1.5} />
                      <span className="font-body text-[10px] font-black uppercase tracking-widest text-black/60">Categories</span>
                   </div>
                   <ChevronDown className={`w-4 h-4 text-neutral-300 transition-transform duration-300 ${expandedSections.includes("categories") ? "rotate-180" : ""}`} />
                </button>
                
                <AnimatePresence>
                  {expandedSections.includes("categories") && (
                    <motion.ul 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-2 overflow-hidden"
                    >
                      {categories.map((cat) => (
                        <li key={cat.id}>
                          <button
                            onClick={() => handleCategoryChange(cat.id)}
                            className={`group w-full flex items-center justify-between py-3 px-4 rounded-xl transition-all duration-300 ${activeCategory === cat.id ? 'bg-white shadow-lg shadow-black/5 ring-1 ring-black/5' : 'hover:bg-black/5 opacity-40 hover:opacity-100'}`}
                          >
                            <div className="flex items-center gap-3">
                               <div className={`transition-colors ${activeCategory === cat.id ? 'text-brand-yellow' : 'text-neutral-400'}`}>
                                  {cat.icon}
                               </div>
                               <div className="flex flex-col text-left">
                                  <span className={`font-body text-[8px] font-black uppercase tracking-[0.3em] mb-0.5 transition-colors ${activeCategory === cat.id ? 'text-brand-yellow' : 'text-neutral-300 group-hover:text-black/40'}`}>
                                     {cat.brand}
                                  </span>
                                  <span className={`font-body text-[10px] font-black uppercase tracking-widest ${activeCategory === cat.id ? 'text-black' : 'text-neutral-500'}`}>
                                     {cat.name}
                                  </span>
                               </div>
                            </div>
                            {activeCategory === cat.id && (
                              <motion.div layoutId="sidebarDot" className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
                            )}
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
             </div>

             <div className="border-b border-black/5 pb-8">
                <button 
                  onClick={() => toggleSection("price")}
                  className="flex items-center justify-between w-full mb-6 group text-left"
                >
                   <div className="flex items-center gap-3">
                      <Banknote className="w-4 h-4 text-brand-yellow" strokeWidth={1.5} />
                      <span className="font-body text-[10px] font-black uppercase tracking-widest text-black/60">Price Range</span>
                   </div>
                   <ChevronDown className={`w-4 h-4 text-neutral-300 transition-transform duration-300 ${expandedSections.includes("price") ? "rotate-180" : ""}`} />
                </button>
                
                <AnimatePresence>
                  {expandedSections.includes("price") && (
                    <motion.ul 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-2 overflow-hidden"
                    >
                      {priceRanges.map((range) => (
                        <li key={range.id}>
                          <button
                            onClick={() => handlePriceChange(range.id)}
                            className={`group w-full flex items-center justify-between py-3 px-4 rounded-xl transition-all duration-300 ${activePriceRange === range.id ? 'bg-white shadow-lg shadow-black/5 ring-1 ring-black/5' : 'hover:bg-black/5 opacity-40 hover:opacity-100'}`}
                          >
                            <span className={`font-body text-[10px] font-black uppercase tracking-widest ${activePriceRange === range.id ? 'text-black' : 'text-neutral-500'}`}>
                               {range.name}
                            </span>
                            <div className={`w-4 h-4 rounded-full border border-black/5 flex items-center justify-center transition-colors ${activePriceRange === range.id ? 'bg-brand-yellow border-brand-yellow' : 'bg-transparent'}`}>
                               {activePriceRange === range.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
             </div>

             <AnimatePresence>
                {isFiltered && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onClick={clearAllFilters}
                    className="w-full py-4 px-6 rounded-2xl bg-black text-white font-body text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-neutral-800 transition-all shadow-xl shadow-black/10"
                  >
                    <X className="w-3 h-3" />
                    Clear All
                  </motion.button>
                )}
             </AnimatePresence>

          </div>
        </aside>

        <div className="lg:hidden mb-12 flex flex-col gap-4 -mx-8 px-8">
           <div className="overflow-x-auto no-scrollbar flex items-center gap-4 pb-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-[1.5rem] border transition-all shrink-0 ${activeCategory === cat.id ? 'bg-black text-white border-black' : 'bg-white text-neutral-400 border-black/5'}`}
                >
                   <div className={activeCategory === cat.id ? 'text-brand-yellow' : ''}>{cat.icon}</div>
                   <div className="flex flex-col items-start gap-1">
                      <span className={`font-body text-[8px] font-black uppercase tracking-[0.2em] ${activeCategory === cat.id ? 'text-brand-yellow' : 'text-neutral-300'}`}>
                         {cat.brand}
                      </span>
                      <span className="font-body text-[10px] font-black uppercase tracking-widest">{cat.name}</span>
                   </div>
                </button>
              ))}
           </div>
           
           <div className="overflow-x-auto no-scrollbar flex items-center gap-3">
              {priceRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => handlePriceChange(range.id)}
                  className={`px-5 py-2 rounded-full border text-[9px] font-black uppercase tracking-widest transition-all shrink-0 ${activePriceRange === range.id ? 'bg-brand-yellow text-black border-brand-yellow' : 'bg-white text-neutral-400 border-black/5'}`}
                >
                   {range.name}
                </button>
              ))}
              {isFiltered && (
                <button onClick={clearAllFilters} className="p-2 rounded-full bg-black text-white shrink-0">
                  <X className="w-3 h-3" />
                </button>
              )}
           </div>
        </div>

        <div className="flex-1">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProducts.length === 0 && (
             <div className="py-40 text-center flex flex-col items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-black/5 flex items-center justify-center">
                   <Filter className="w-8 h-8 text-neutral-300" />
                </div>
                <div>
                   <p className="font-heading text-2xl text-black mb-2">No matches found</p>
                   <p className="font-body text-neutral-400 max-w-xs mx-auto">Try adjusting your filters or price range to find what you&apos;re looking for.</p>
                </div>
                <button 
                  onClick={clearAllFilters}
                  className="font-body text-[10px] font-black uppercase tracking-widest text-brand-yellow border-b border-brand-yellow pb-1 hover:text-black hover:border-black transition-colors"
                >
                   Reset all filters
                </button>
             </div>
          )}
        </div>

      </div>

    </main>
  );
}

export default function ProductsClient() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF9F6] pt-48 flex items-center justify-center font-heading text-2xl opacity-20">Blooming...</div>}>
      <ProductsContent />
    </Suspense>
  );
}

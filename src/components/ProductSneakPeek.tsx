"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { getFullProducts, FullProduct } from "@/lib/data";

const allProducts = getFullProducts();
const PREFERRED_ORDER = ["calendar", "cheese", "numbers", "sunflower"];
const originalProducts = allProducts
  .filter(p => p.isOriginal && PREFERRED_ORDER.includes(p.id))
  .sort((a, b) => PREFERRED_ORDER.indexOf(a.id) - PREFERRED_ORDER.indexOf(b.id));

export default function ProductSneakPeek() {

  useEffect(() => {
    const checkMobile = () => {};
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="relative w-full bg-brand-yellow pt-32 pb-32 md:pb-48 px-[10%] z-30" id="originals">
      
      <div className="max-w-[1400px] mx-auto flex flex-col items-center relative z-10 overflow-visible">
        
        {/* Editorial Section Branding */}
        <div className="flex flex-col items-center mb-16 md:mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 mb-4"
          >
             <div className="h-[2px] w-8 md:w-12 bg-black" />
             <span className="font-body text-[10px] font-black tracking-[0.4em] md:tracking-[0.6em] uppercase text-black">Petals Originals</span>
             <div className="h-[2px] w-8 md:w-12 bg-black" />
          </motion.div>
          <motion.h2
             initial={{ opacity: 0, y: 15 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="font-heading text-[clamp(2.2rem,6vw,4rem)] text-black leading-[1] md:max-w-4xl tracking-tighter px-4"
          >
             Every mind blooms <span className="italic">differently</span>.
          </motion.h2>
        </div>

        {/* ── THE PRODUCT GRID (Desktop) vs CAROUSEL (Mobile) ── */}
        <div className="relative w-full">
          
          {/* Mobile Carousel - Remains snaps for better UX */}
          <div className="md:hidden relative -mx-[10vw]">
            <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 px-[10vw] pb-8 pt-4 relative z-10">
              {originalProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="w-[85vw] sm:w-[50vw] shrink-0 snap-center"
                >
                  <Link href={`/products/${product.id}`} className="block w-full">
                    <div className="relative w-full aspect-[4/5] bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-black/5 flex flex-col group active:scale-[0.98] transition-transform">
                      <div className="relative h-[65%] w-full overflow-hidden">
                        <Image
                          src={product.image || "/clicky-clacky.png"}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 85vw, 50vw"
                          className="object-cover relative z-10"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-end p-6 bg-white relative">
                        {product.brand && (
                          <span className="font-body text-[8px] font-black uppercase tracking-[0.3em] text-brand-yellow mb-1">
                            {product.brand}
                          </span>
                        )}
                        <p className="font-heading text-lg text-black leading-tight truncate pr-8">
                          {product.name}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                           <p className="font-body text-[10px] font-black tracking-widest text-neutral-400 uppercase">{product.price}</p>
                        </div>
                      </div>
                      
                      <div className="absolute bottom-6 right-6 opacity-40 group-active:opacity-100 transition-opacity z-20">
                         <ArrowRight className="w-5 h-5 text-brand-yellow" strokeWidth={1.5} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Desktop Straightened Grid Layout */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 w-full">
            {originalProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10"
              >
                <Link href={`/products/${product.id}`} className="block w-full group">
                  <div className="relative aspect-[4/5] bg-white rounded-[3rem] overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-700 ease-[0.16,1,0.3,1]">
                    <div className="relative h-[68%] w-full overflow-hidden">
                       <div className="relative w-full h-full transform transition-transform duration-1000 group-hover:scale-110">
                        <Image
                          src={product.image || "/clicky-clacky.png"}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover relative z-10"
                          priority={idx < 4}
                        />
                       </div>
                    </div>
                    
                    <div className="absolute inset-x-0 bottom-0 p-8 pb-10 bg-white flex flex-col justify-end z-20">
                       {product.brand && (
                         <span className="font-body text-[10px] font-black uppercase tracking-[0.3em] text-brand-yellow mb-1 block transition-colors group-hover:text-amber-700">
                           {product.brand}
                         </span>
                       )}
                       <h3 className="font-heading text-2xl text-black leading-tight mb-1 transition-colors duration-500">
                          {product.name}
                       </h3>
                       
                       <div className="flex items-center justify-between">
                         <span className="font-body font-bold text-sm text-neutral-400 transition-colors group-hover:text-black">
                           {product.price}
                         </span>
                       </div>
                    </div>

                    {/* Bottom Right Arrow Link */}
                    <div className="absolute bottom-10 right-8 transition-all duration-500 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 z-20">
                       <ArrowRight className="w-6 h-6 text-brand-yellow" strokeWidth={2.5} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* ── Archive Navigation Hub (Optimized CTA) ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 md:mt-32 flex justify-center"
          >
            <div className="w-[320px] h-24">
              <Link href="/products" className="block w-full h-full group/hub">
                <motion.div
                   whileHover={{ scale: 1.02, y: -4 }}
                   whileTap={{ scale: 0.98 }}
                   className="w-full h-full rounded-3xl bg-black flex items-center justify-between px-10 shadow-2xl relative overflow-hidden transition-all duration-500"
                >
                  <div className="flex flex-col items-start text-left relative z-10">
                    <span className="font-body font-black text-[8px] uppercase tracking-[0.4em] text-brand-yellow mb-1 opacity-60">Archive</span>
                    <span className="font-heading text-xl text-white leading-tight">
                      Explore <span className="italic text-brand-yellow">Full Petals</span>
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover/hub:bg-brand-yellow group-hover/hub:border-brand-yellow transition-all duration-500 relative z-10">
                    <ArrowRight className="w-5 h-5 text-brand-yellow group-hover/hub:text-black transition-colors" strokeWidth={2} />
                  </div>
                  
                  {/* Subtle background glow */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-yellow/0 via-brand-yellow/5 to-transparent opacity-0 group-hover/hub:opacity-100 transition-opacity duration-700" />
                </motion.div>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

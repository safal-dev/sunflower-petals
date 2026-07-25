"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getCategories, Category } from "@/lib/data";

const categoryMapping = getCategories();

const CategoryCard = ({ cat, idx }: { cat: Category; idx: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <Link 
        href={`/brands#${cat.brandId}`} 
        className={`block relative aspect-[4/5] overflow-hidden rounded-[3rem] shadow-2xl shadow-black/5 ${cat.color} border border-black/[0.03] transition-all duration-500`}
        aria-label={`View ${cat.name} collection`}
      >
        
        {/* Centered Brand Logo */}
        <motion.div
           whileHover={{ scale: 1.05 }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="relative w-full h-[65%] p-[60px] flex items-center justify-center z-10"
        >
          <div className="relative w-full h-full">
            <Image
              src={cat.image}
              alt=""
              fill
              className="object-contain drop-shadow-sm"
              priority
              aria-hidden="true"
            />
          </div>
        </motion.div>

        {/* Yellow Gradient Overlay Label (Subtle Refinement) */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-yellow/30 via-brand-yellow/5 to-transparent pt-32 pb-8 px-6 md:px-8 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 z-20">
           <div className="flex flex-col items-start translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-100">
              <h3 className="font-heading text-xl md:text-2xl text-black leading-tight mb-2">{cat.name}</h3>
              <p className="font-body text-[10px] md:text-[11px] font-medium leading-relaxed text-black/60 max-w-[90%]">
                {cat.subtitle}
              </p>
              
              <div className="mt-6 h-[1px] w-0 bg-black group-hover:w-full transition-all duration-1000 opacity-20" />
           </div>
        </div>

      </Link>
    </motion.div>
  );
};

export default function CollectionShowcase() {
  return (
    <section className="relative w-full bg-[#FAF9F6] pt-32 pb-24 md:pt-48 md:pb-32 z-20 overflow-hidden" id="collections">
      
      {/* ── Background Branding ── */}
      <div className="absolute top-0 right-[-10%] w-[60vw] h-[60vw] opacity-[0.03] pointer-events-none select-none rotate-12" aria-hidden="true">
          <Image src="/main-logo.png" alt="" fill className="object-contain" />
      </div>

      {/* ── Section Header (Updated Labeling) ── */}
      <div className="px-[10%] mb-20 md:mb-24 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
             <div className="h-[1px] w-12 bg-brand-yellow" />
             <span className="font-body text-[10px] font-black tracking-[0.6em] uppercase text-black/40">Our Products</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-heading text-black text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] md:tracking-tighter mb-4"
          >
            Our range of <span className="italic text-brand-yellow">products</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="font-body text-neutral-400 text-lg md:text-xl max-w-xl"
          >
            Every tool in our product line is hand-designed to support specific sensory, organizational, or developmental milestones.
          </motion.p>
        </div>
      </div>

      {/* ── Editorial Category Grid ── */}
      <div className="px-6 md:px-12 lg:px-16 xl:px-[10%] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {categoryMapping.map((cat, index) => (
            <CategoryCard key={cat.id} cat={cat} idx={index} />
          ))}
        </div>
      </div>

      {/* ── Products Direct Link ── */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-12 text-center"
      >
         <Link href="/products" className="group inline-flex flex-col items-center gap-4" aria-label="View Full Product Gallery">
            <span className="font-body text-[10px] font-black uppercase tracking-[0.5em] text-neutral-300">View Full Product Gallery</span>
            <div className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-500">
               <ArrowUpRight className="w-6 h-6 text-black group-hover:text-white transition-all duration-500" strokeWidth={1.5} aria-hidden="true" />
            </div>
         </Link>
      </motion.div>

    </section>
  );
}

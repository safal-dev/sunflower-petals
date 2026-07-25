"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Zap, Layout, BrainCircuit, ArrowRight, ChevronDown, Star } from "lucide-react";

import { getBrands } from "@/lib/data";

export default function BrandsClient() {
  const brands = getBrands();

  return (
    <main className="relative w-full bg-[#FAF9F6] overflow-hidden">

      {/* ── Hero ── */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-8 md:px-[12%] pt-36 pb-24 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-brand-yellow/15 blur-[160px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-blue-100/40 blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-brand-yellow/15 border border-brand-yellow/30 text-black text-xs uppercase tracking-[0.3em] font-body font-bold px-5 py-2 rounded-full"
          >
            <Star className="w-3.5 h-3.5 text-brand-yellow" strokeWidth={2} />
            The Petals Family
          </motion.div>

          <h1 className="font-heading text-[clamp(3.5rem,10vw,9rem)] leading-[0.85] tracking-tighter text-black">
            Our <span className="italic text-brand-yellow">Brands.</span>
          </h1>

          <p className="font-body text-lg md:text-2xl text-neutral-500 max-w-2xl leading-relaxed">
            Three distinct lines. One shared purpose. Tools that truly work for your child — thoughtfully designed, clinically grounded, made with love.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-3 justify-center mt-2"
          >
            {brands.map((brand) => (
              <a
                key={brand.id}
                href={brand.href}
                className="font-body text-sm px-6 py-3 rounded-full border transition-all duration-300 hover:text-white"
                style={{
                  borderColor: `${brand.color}40`,
                  color: brand.color,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = brand.color;
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = brand.color;
                }}
              >
                {brand.label}
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-neutral-300"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* ── Brand Sections ── */}
      {brands.map((brand, idx) => {
        const isEven = idx % 2 === 0;
        return (
          <div 
            key={brand.id} 
            id={brand.id} 
            className="py-20 md:py-32 px-8 md:px-[10%] scroll-mt-24"
            style={{ backgroundColor: brand.section.bg }}
          >
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              
              {/* Content Panel */}
              <motion.div
                initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col gap-8 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
              >
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                      <span 
                        className="font-body text-sm uppercase tracking-[0.4em] font-bold"
                        style={{ color: brand.color }}
                      >
                        {brand.section.subtitle}
                      </span>
                    </div>
                    <div className="relative w-64 h-24">
                      <Image 
                        src={brand.section.logo} 
                        alt={`${brand.label} Logo`} 
                        fill 
                        className="object-contain object-left"
                      />
                    </div>
                  </div>
                  <p 
                    className="font-body text-lg md:text-xl leading-relaxed max-w-lg"
                    style={{ color: `${brand.section.text}cc` }} // ~80% opacity
                  >
                    {brand.section.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 max-w-lg">
                  {brand.section.features.map((item) => (
                    <div 
                      key={item.label} 
                      className="bg-white/60 backdrop-blur-sm border rounded-[1.5rem] p-5 flex flex-col gap-1.5 transition-all duration-300 hover:bg-white/90"
                      style={{ borderColor: `${brand.color}1a` }}
                    >
                      <span className="font-heading text-base font-semibold" style={{ color: brand.section.text }}>{item.label}</span>
                      <span className="font-body text-sm" style={{ color: `${brand.section.text}99` }}>{item.desc}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Link
                    href={brand.section.exploreHref}
                    className="self-start font-body text-base text-white px-9 py-4.5 rounded-full transition-all duration-500 flex items-center gap-2.5 w-fit shadow-lg shadow-black/5 hover:scale-105 active:scale-95"
                    style={{ backgroundColor: brand.color, padding: '14px 36px' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = brand.section.text;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = brand.color;
                    }}
                  >
                    Explore {brand.label} <ArrowRight className="w-4 h-4" />
                  </Link>

                  {brand.section.nextHref && (
                    <a
                      href={brand.section.nextHref}
                      className="self-start font-body text-base border px-9 py-4.5 rounded-full transition-all duration-500 flex items-center gap-2.5 shadow-lg shadow-black/5 hover:scale-105 active:scale-95"
                      style={{ borderColor: `${brand.color}4d`, color: brand.color, padding: '14px 36px' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = `${brand.color}1a`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      {brand.section.nextLabel}
                    </a>
                  )}
                </div>
              </motion.div>

              {/* Image Panel */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={`relative h-[480px] md:h-[620px] rounded-[3.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] transition-all duration-1000 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
              >
                <Image src={brand.section.image} alt={`${brand.label} showcase`} fill className="object-cover transition-transform duration-700 hover:scale-110" />
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" 
                />
                
                {/* Floating Glassmorphism Quote Card */}
                <div 
                  className="absolute bottom-8 left-8 right-8 backdrop-blur-xl p-6 rounded-3xl text-white border border-white/20 shadow-2xl"
                  style={{ backgroundColor: `${brand.section.text}cc` }} // ~80% opacity
                >
                  <p 
                    className="text-sm uppercase tracking-[0.2em] font-body font-bold mb-2"
                    style={{ color: brand.section.quoteColor }}
                  >
                    {brand.section.quoteSubtitle}
                  </p>
                  <h3 className="font-heading text-xl md:text-2xl leading-tight">{brand.section.quote}</h3>
                </div>
              </motion.div>
            </div>
          </div>
        );
      })}


      {/* ── CTA ── */}
      <section className="px-8 md:px-[10%] py-20 md:py-28 text-center bg-[#FAF9F6]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-black rounded-[3rem] p-12 md:p-20 flex flex-col gap-6 items-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(250,204,21,0.15),transparent_60%)]" />
          <div className="relative z-10 flex flex-col gap-6 items-center">
            <Star className="w-8 h-8 text-brand-yellow" strokeWidth={1.5} />
            <h2 className="font-heading text-4xl md:text-5xl text-white leading-tight">
              One family. <span className="italic text-brand-yellow">Three lines.</span>
            </h2>
            <p className="font-body text-white/60 text-lg max-w-xl leading-relaxed">
              Each brand targets different developmental domains, but together they cover the full spectrum of what a child needs to thrive — sensory, self-care, and learning.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-2">
              <Link
                href="/products"
                className="font-body text-sm bg-brand-yellow text-black px-8 py-4 rounded-full hover:bg-white transition-all duration-300 flex items-center gap-2"
              >
                Shop All Products <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/story"
                className="font-body text-sm border border-white/20 text-white px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Our Story
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

    </main>
  );
}

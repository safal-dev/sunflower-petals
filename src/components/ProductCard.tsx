"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBasket, MessageCircle } from "lucide-react";

import { FullProduct } from "@/lib/data";

interface ProductCardProps {
  product: FullProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col h-full"
    >
      <Link 
        href={`/products/${product.id}`} 
        className="relative block aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#f5f5f5] mb-6 shadow-sm border border-black/5 group"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div 
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110 flex items-center justify-center"
        >
          {product.image ? (
            <Image
              src={product.image}
              alt=""
              fill
              className="object-cover transition-transform duration-700"
            />
          ) : (
            <div className="w-24 h-24 bg-black/5 rounded-full" />
          )}
        </div>

        {/* Petals Original Tag */}
        {product.isOriginal && (
          <div className="absolute top-4 left-4 z-20">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/80 backdrop-blur-md rounded-full border border-white/10 shadow-lg transition-transform duration-500">
              <div className="w-1.5 h-1.5 bg-brand-yellow rounded-full animate-pulse" />
              <span className="font-body text-[9px] font-black uppercase tracking-widest text-white whitespace-nowrap">
                Petals Original
              </span>
            </div>
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="flex flex-col flex-1 pl-1">
        <div className="flex justify-between items-start gap-4 mb-2">
          <div className="flex flex-col">
            {product.brand && (
              <span className="font-body text-[8px] font-black uppercase tracking-[0.3em] text-brand-yellow mb-1">
                {product.brand}
              </span>
            )}
            <h3 className="font-heading text-xl md:text-2xl text-[#171717] leading-tight group-hover:text-brand-yellow transition-colors">
              {product.name}
            </h3>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            {product.offerPrice ? (
              <>
                <span className="font-body text-[10px] text-neutral-400 line-through tracking-widest uppercase">
                  {product.price}
                </span>
                <span className="font-body font-black text-lg text-brand-yellow whitespace-nowrap">
                   {product.offerPrice}
                </span>
              </>
            ) : (
              <span className="font-body font-bold text-lg text-[#171717] whitespace-nowrap">
                {product.price}
              </span>
            )}
          </div>
        </div>
        
        {/* Micro-description */}
        {product.microDescription && (
          <div className="mb-4">
            <span className="font-body text-[10px] font-black uppercase tracking-[0.2em] text-brand-yellow px-2 py-1 bg-brand-yellow/5 rounded-sm border-l-2 border-brand-yellow">
              {product.microDescription}
            </span>
          </div>
        )}
        
        <p className="font-body text-neutral-500 text-sm md:text-base leading-relaxed line-clamp-2 mb-4">
          {product.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between pt-2 border-t border-black/5">
          <Link 
            href={`/products/${product.id}`}
            className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 hover:text-black transition-colors group/link"
            aria-label={`View details for ${product.name}`}
          >
            Details
            <ArrowRight className="w-3 h-3 ml-1.5 transition-transform duration-300 group-hover/link:translate-x-0.5" strokeWidth={2.5} aria-hidden="true" />
          </Link>

          {product.blanxerLink ? (
            <a 
              href={product.blanxerLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-brand-yellow text-black text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-500 shadow-sm flex items-center gap-2 group/buy"
            >
              <ShoppingBasket className="w-3.5 h-3.5 transition-transform group-hover/buy:scale-110" strokeWidth={2.5} />
              Buy
            </a>
          ) : (
            <a 
              href={`mailto:socials@sunflowerpetals.toys?subject=Inquiry for ${product.name}`}
              className="px-5 py-2.5 rounded-full bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-brand-yellow hover:text-black transition-all duration-500 shadow-sm flex items-center gap-2 group/inquire"
            >
              <MessageCircle className="w-3.5 h-3.5 transition-transform group-hover/inquire:scale-110" strokeWidth={2.5} />
              Inquire
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

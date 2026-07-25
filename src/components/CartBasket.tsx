"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, Minus, Plus, ShoppingBasket, Star, Truck, ShieldCheck, ArrowLeft, ArrowRight } from "lucide-react";
import CartDrawer from "./CartDrawer";

export default function CartBasket() {
  const { totalItems, subtotal, toggleCart, isCartOpen } = useCart();

  return (
    <>
      <AnimatePresence>
        {totalItems > 0 && !isCartOpen && (
          <motion.button
            initial={{ y: 200, opacity: 0, x: "-50%" }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            exit={{ y: 200, opacity: 0, x: "-50%" }}
            whileHover={{ y: -5, scale: 1.02, x: "-50%" }}
            whileTap={{ scale: 0.98, x: "-50%" }}
            onClick={toggleCart}
            style={{ 
              position: 'fixed', 
              bottom: '40px', 
              left: '50%', 
              zIndex: 99999,
            }}
            className="group flex items-center bg-black text-white rounded-full px-6 md:px-8 py-3.5 md:py-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 hover:border-brand-yellow/50 transition-all duration-500"
            aria-label="Open Basket"
          >
            {/* Vibrant brand glow */}
            <div className="absolute inset-0 rounded-full bg-brand-yellow/10 group-hover:bg-brand-yellow/20 transition-colors -z-10 blur-xl" />

            <div className="flex items-center gap-3 border-r border-white/10 pr-4 md:pr-6 mr-4">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-brand-yellow/20 flex items-center justify-center">
                  <ShoppingBasket className="w-4 h-4 text-brand-yellow" strokeWidth={1.5} />
                </div>
                <motion.div
                  key={totalItems}
                  initial={{ scale: 1.5 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 bg-brand-yellow text-black text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-lg border-2 border-black"
                >
                  {totalItems}
                </motion.div>
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="font-body text-[8px] font-black uppercase tracking-[0.2em] text-neutral-400">Basket</span>
                <span className="font-heading text-sm md:text-base mt-0.5 tracking-tight">Units</span>
              </div>
            </div>

            <div className="flex items-center gap-3 md:gap-4">
              <div className="flex flex-col items-end leading-none">
                <span className="font-body text-[8px] font-black uppercase tracking-[0.1em] text-brand-yellow/80">Total</span>
                <span className="font-heading text-base md:text-lg">NPR {subtotal}</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-brand-yellow transition-all duration-500">
                <ArrowRight className="w-4 h-4" fill="currentColor" strokeWidth={1.5} />
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <CartDrawer />
    </>
  );
}

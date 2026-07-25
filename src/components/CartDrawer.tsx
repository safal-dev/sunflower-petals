"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBasket, Plus, Minus, Trash2, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import Image from "next/image";

export default function CartDrawer() {
  const { isCartOpen, toggleCart, items, subtotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "info" | "success">("cart");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call to Resend
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          items,
          subtotal
        }),
      });

      if (response.ok) {
        setCheckoutStep("success");
        setTimeout(() => {
           clearCart();
        }, 1500);
      }
    } catch (error) {
      console.error("Checkout failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeAndReset = () => {
    toggleCart();
    setTimeout(() => {
      setCheckoutStep("cart");
      setFormData({ name: "", phone: "" });
    }, 500);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAndReset}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99998]"
            aria-hidden="true"
          />

          {/* Drawer / Modal */}
          <div className="fixed inset-0 z-[99999] flex items-end justify-center p-0 sm:p-8 pointer-events-none">
            <motion.div
              id="cart-drawer"
              role="dialog"
              aria-modal="true"
              aria-labelledby="cart-title"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
              className="pointer-events-auto h-[90vh] sm:h-auto sm:max-h-[85vh] w-full max-w-xl bg-white rounded-t-[3rem] sm:rounded-[3rem] shadow-[0_-20px_60px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden"
            >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBasket className="w-5 h-5 text-brand-yellow" strokeWidth={1.5} aria-hidden="true" />
                <h2 id="cart-title" className="font-heading text-xl text-black">Your Basket</h2>
              </div>
              <button
                onClick={closeAndReset}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close Drawer"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
              {checkoutStep === "cart" && (
                <>
                  {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                      <ShoppingBasket className="w-16 h-16 mb-4" strokeWidth={1.5} aria-hidden="true" />
                      <p className="font-body text-gray-500">Your basket is empty.</p>
                      <button onClick={toggleCart} className="mt-4 text-brand-yellow font-bold underline">Explore tools</button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {items.map((item) => (
                        <motion.div 
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          key={item.id} 
                          className="flex gap-4 group"
                        >
                          <div className="relative w-24 h-24 rounded-2xl bg-gray-50 overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image}
                              alt=""
                              fill
                              className="object-cover"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="flex-1 flex flex-col justify-between py-1">
                            <div>
                               <h3 className="font-heading text-lg text-black">{item.name}</h3>
                               <p className="font-body text-xs text-gray-400 uppercase tracking-widest font-black">NPR {item.price}</p>
                            </div>
                            
                            <div className="flex items-center justify-between mt-2">
                               <div className="flex items-center border border-gray-100 rounded-lg">
                                  <button 
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="p-1.5 hover:text-brand-yellow transition-colors"
                                    aria-label={`Decrease quantity of ${item.name}`}
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="w-8 text-center font-body text-sm font-bold" aria-label={`Quantity: ${item.quantity}`}>{item.quantity}</span>
                                  <button 
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="p-1.5 hover:text-brand-yellow transition-colors"
                                    aria-label={`Increase quantity of ${item.name}`}
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                               </div>
                               <button 
                                 onClick={() => removeFromCart(item.id)}
                                 className="text-gray-300 hover:text-red-500 transition-colors"
                                 aria-label={`Remove ${item.name} from basket`}
                               >
                                 <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                               </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {checkoutStep === "info" && (
                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
                    <button 
                      onClick={() => setCheckoutStep("cart")}
                      className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-widest mb-8 hover:text-black transition-colors"
                    >
                       <X className="w-3 h-3 rotate-90" aria-hidden="true" /> Back to Basket
                    </button>
                    
                    <h3 className="font-heading text-2xl text-black mb-2">Checkout</h3>
                    <p className="font-body text-gray-500 text-sm mb-10">
                       We&apos;ll contact you to finalize the order.
                    </p>

                    <form id="checkout-form" onSubmit={handleCheckout} className="space-y-6">
                       <div className="flex flex-col gap-2">
                          <label htmlFor="customer-name" className="font-body text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 font-bold">Full Name</label>
                          <input 
                            id="customer-name"
                            required
                            aria-required="true"
                            type="text" 
                            placeholder="e.g. John Doe"
                            className="bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-brand-yellow outline-none font-body"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                       </div>
                       <div className="flex flex-col gap-2">
                          <label htmlFor="customer-phone" className="font-body text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 font-bold">Contact Number</label>
                          <input 
                            id="customer-phone"
                            required
                            aria-required="true"
                            type="tel" 
                            placeholder="e.g. 9841234567"
                            className="bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-brand-yellow outline-none font-body"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          />
                       </div>
                    </form>
                    
                    <div className="mt-auto p-4 bg-gray-50 rounded-[2rem]">
                        <p className="font-body text-xs text-gray-400 mb-2">Order Summary</p>
                        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
                           <span className="font-body text-sm font-bold">{items.length} Items</span>
                           <span className="font-heading text-lg">NPR {subtotal}</span>
                        </div>
                    </div>
                 </motion.div>
              )}

              {checkoutStep === "success" && (
                 <div className="h-full flex flex-col items-center justify-center text-center" role="alert" aria-live="polite">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 12 }}
                      className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6"
                    >
                       <CheckCircle2 className="w-10 h-10" strokeWidth={1.5} aria-hidden="true" />
                    </motion.div>
                    <h3 className="font-heading text-2xl text-black mb-3">Order Received!</h3>
                    <p className="font-body text-gray-500 leading-relaxed max-w-xs">
                       Our sales team has been notified. We&apos;ll be in touch very soon.
                    </p>
                    <button 
                      onClick={closeAndReset}
                      className="mt-12 font-body text-xs font-black uppercase tracking-widest text-brand-yellow underline"
                    >
                       Back to shopping
                    </button>
                 </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && checkoutStep !== "success" && (
              <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-body text-gray-400 uppercase tracking-widest text-xs font-black">Subtotal</span>
                  <span className="font-heading text-2xl text-black">NPR {subtotal}</span>
                </div>

                {checkoutStep === "cart" ? (
                  <button
                    onClick={() => setCheckoutStep("info")}
                    className="w-full py-5 bg-black text-white rounded-full font-body font-black text-sm tracking-[0.2em] uppercase hover:bg-neutral-800 transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.98]"
                  >
                    Proceed to Buy <ArrowRight className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
                  </button>
                ) : (
                  <button
                    form="checkout-form"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-brand-yellow text-black rounded-full font-body font-black text-sm tracking-[0.2em] uppercase hover:bg-black hover:text-brand-yellow transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>Send Order Inquiry <CheckCircle2 className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" /></>
                    )}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </>
    )}
  </AnimatePresence>
  );
}

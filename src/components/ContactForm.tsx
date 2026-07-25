"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type Role = "Parent" | "Clinician" | "Educator" | "Other";

export default function ContactForm() {
  const [role, setRole] = useState<Role>("Parent");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          role
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Contact submission failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div 
        role="alert"
        aria-live="polite"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full bg-white rounded-[3rem] p-12 md:p-20 text-center shadow-2xl shadow-black/5"
      >
        <div className="w-20 h-20 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-8">
           <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" aria-hidden="true"><path d="M20 6L9 17L4 12" /></svg>
        </div>
        <h2 className="font-heading text-4xl text-black mb-4">Message Sent.</h2>
        <p className="font-body text-neutral-500 max-w-md mx-auto leading-relaxed">
          Thank you for reaching out. One of our experts (or a fellow clinician) will review your inquiry and get back to you within 24-48 hours.
        </p>
        <button 
          onClick={() => {
            setIsSubmitted(false);
            setFormData({ name: "", email: "", subject: "", message: "" });
          }}
          className="mt-10 font-body text-xs font-black uppercase tracking-[0.2em] text-neutral-400 hover:text-black transition-colors"
        >
          Send Another
        </button>
      </motion.div>
    );
  }

  return (
    <div className="w-full bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-black/5 relative overflow-hidden">
      {/* Soft Glow Pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <form onSubmit={handleSubmit} className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-2">
            <label htmlFor="name" className="font-body text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-4">Your Name</label>
            <input 
              id="name"
              required
              aria-required="true"
              type="text" 
              placeholder="E.g. Dr. Alex Reed"
              className="w-full px-8 py-4 bg-[#f9f9f9] border border-transparent focus:border-brand-yellow focus:bg-white rounded-2xl outline-none transition-all font-body text-black"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="font-body text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-4">Email Address</label>
            <input 
              id="email"
              required
              aria-required="true"
              type="email" 
              placeholder="alex@studio.com"
              className="w-full px-8 py-4 bg-[#f9f9f9] border border-transparent focus:border-brand-yellow focus:bg-white rounded-2xl outline-none transition-all font-body text-black"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
        </div>

        <div className="mb-10">
          <label id="role-label" className="font-body text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-4 block mb-4">I am reaching out as a...</label>
          <div className="flex flex-wrap gap-3" role="radiogroup" aria-labelledby="role-label">
            {(["Parent", "Clinician", "Educator", "Other"] as Role[]).map((r) => (
              <button
                key={r}
                type="button"
                role="radio"
                aria-checked={role === r}
                onClick={() => setRole(r)}
                className={`px-6 py-3 rounded-full font-body text-xs font-bold transition-all border ${
                  role === r 
                  ? "bg-black text-white border-black" 
                  : "bg-white text-neutral-400 border-black/5 hover:border-black/20 hover:text-black"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2 mb-10">
          <label htmlFor="subject" className="font-body text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-4">Subject</label>
          <input 
            id="subject"
            required
            aria-required="true"
            type="text" 
            placeholder="How can we help you bloom?"
            className="w-full px-8 py-4 bg-[#f9f9f9] border border-transparent focus:border-brand-yellow focus:bg-white rounded-2xl outline-none transition-all font-body text-black"
            value={formData.subject}
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
          />
        </div>

        <div className="space-y-2 mb-12">
          <label htmlFor="message" className="font-body text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-4">Message</label>
          <textarea 
            id="message"
            required
            aria-required="true"
            rows={5}
            placeholder="Share your thoughts or sensory goals here..."
            className="w-full px-8 py-6 bg-[#f9f9f9] border border-transparent focus:border-brand-yellow focus:bg-white rounded-[2rem] outline-none transition-all font-body text-black resize-none"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          />
        </div>

        <button 
          disabled={isLoading}
          type="submit"
          className="w-full py-5 bg-black text-white rounded-full font-body font-black text-xs uppercase tracking-[0.3em] hover:bg-neutral-800 transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-4 group disabled:opacity-50"
        >
          {isLoading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Send Inquiry
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

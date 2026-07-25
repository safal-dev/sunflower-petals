"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, Camera, ChevronDown, HelpCircle, MessageCircle, Globe } from "lucide-react";

const SupportItem = ({ icon, title, value, href }: { icon: React.ReactNode, title: string, value: string, href: string }) => (
  <a 
    href={href} 
    className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-black/5 transition-colors"
  >
    <div className="w-10 h-10 rounded-full bg-brand-yellow/10 flex items-center justify-center text-sm group-hover:scale-110 transition-transform">
       {icon}
    </div>
    <div className="flex flex-col">
      <span className="font-body text-[10px] font-black uppercase tracking-widest text-neutral-300">{title}</span>
      <span className="font-heading text-lg text-black group-hover:text-brand-yellow transition-colors">{value}</span>
    </div>
  </a>
);

const ContactAccordion = ({ title, children }: { title: string, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-black/5 last:border-0 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <span className="font-body text-sm font-bold text-neutral-600 group-hover:text-black transition-colors">{title}</span>
        <motion.span 
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-neutral-300 group-hover:text-black transition-colors"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="pb-6 font-body text-sm text-neutral-500 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ContactClient() {
  return (
    <main className="w-full relative min-h-screen bg-[#FAF9F6] overflow-x-hidden">
      
      {/* ── Contact Hero ── */}
      <section className="relative pt-[160px] md:pt-[200px] pb-12 md:pb-20 px-[10%] overflow-hidden">
        {/* Large Decorative Sunflower SVG (Brand Visual) */}
        <div className="absolute top-[160px] right-[-50px] md:right-[5%] w-[300px] md:w-[450px] aspect-square pointer-events-none z-0 opacity-[0.08] select-none">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-slow-spin">
            <path d="M50 10C50 10 55 30 50 50C45 30 50 10 50 10Z" fill="currentColor"/>
            <path d="M50 90C50 90 45 70 50 50C55 70 50 90 50 90Z" fill="currentColor"/>
            <path d="M10 50C10 50 30 45 50 50C30 55 10 50 10 50Z" fill="currentColor"/>
            <path d="M90 50C90 50 70 55 50 50C70 45 90 50 90 50Z" fill="currentColor"/>
            <circle cx="50" cy="50" r="12" fill="currentColor"/>
            {[45, 135, 225, 315].map((rot) => (
              <path key={rot} d="M50 50C55 35 65 35 70 50C65 65 55 65 50 50Z" fill="currentColor" transform={`rotate(${rot} 50 50)`}/>
            ))}
          </svg>
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-6 mb-8"
          >
             <div className="h-[2px] w-12 bg-black" />
             <span className="font-body text-[10px] font-black tracking-[0.6em] uppercase text-black">Contact & Support</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-[clamp(2.5rem,8vw,5.5rem)] text-black leading-[0.9] md:max-w-4xl tracking-tighter mb-8"
          >
            Let&apos;s <span className="italic text-brand-yellow">Grow</span> Together.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-body text-lg md:text-xl text-neutral-500 max-w-2xl leading-relaxed"
          >
            Whether you&apos;re a parent navigating a new diagnosis or a clinician seeking bespoke tools, our team is here to support your sensory journey.
          </motion.p>
        </div>
      </section>

      {/* ── Main Inquiry Form Section ── */}
      <section className="px-[10%] pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 xl:gap-28 lg:items-start">
          
          {/* Sidebar Panel - Unified Alignment */}
          <div className="w-full lg:w-[32%] shrink-0">
            <div className="space-y-16">
               {/* Direct Channels */}
               <div className="space-y-8">
               <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
                  <h2 className="font-heading text-2xl text-black">Direct Channels</h2>
               </div>
               <div className="flex flex-col gap-2 -ml-4">
                  <SupportItem 
                     icon={<Mail className="w-4 h-4 text-brand-yellow" strokeWidth={1.5} />} 
                     title="Email" 
                     value="socials@sunflowerpetals.toys" 
                     href="mailto:socials@sunflowerpetals.toys" 
                  />
                  <SupportItem 
                     icon={<Phone className="w-4 h-4 text-brand-yellow" strokeWidth={1.5} />} 
                     title="Phone" 
                     value="+977 9703606162" 
                     href="tel:+9779703606162" 
                  />
                  <SupportItem 
                     icon={<Camera className="w-4 h-4 text-brand-yellow" strokeWidth={1.5} />} 
                     title="Community" 
                     value="@sunflowerpetals.toys" 
                     href="https://www.instagram.com/sunflowerpetals.toys?igsh=dDI1dTdwejhoZ293" 
                  />
               </div>
               </div>

               {/* Common Inquiries (Accordions) */}
               <div className="space-y-8 pt-10 border-t border-black/5">
               <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
                  <h2 className="font-heading text-2xl text-black">Common Inquiries</h2>
               </div>
               <div className="space-y-1">
                  <ContactAccordion title="Shipping & Delivery">
                     We use eco-conscious packaging for all our petals. Standard shipping takes 3-5 business days. Express options are available for clinical time-slots.
                  </ContactAccordion>
                  <ContactAccordion title="Returns & Exchanges">
                     If a tool doesn&apos;t resonate with your child&apos;s sensory profile, we offer a 30-day return policy for unused items in original packaging.
                  </ContactAccordion>
                  <ContactAccordion title="Institutional Accounts">
                     We provide tailored quotes and bulk pricing for schools, clinics, and therapy centers. Contact us to establish a master account.
                  </ContactAccordion>
                  <ContactAccordion title="Therapy Partnership">
                     Our clinicians are always looking to collaborate. If you are an OT or SLP, we&apos;d love to hear how our tools are blooming in your practice.
                  </ContactAccordion>
               </div>
               </div>
            </div>
          </div>

          {/* Form Panel - Perfectly Aligned Top */}
          <div className="flex-1">
             <ContactForm />
          </div>
        </div>
      </section>

      {/* ── SIA Institutional Partnership Section (Relocated to Bottom) ── */}
      <section className="px-[10%] pb-32">
        <div className="max-w-[1400px] mx-auto">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="relative p-12 md:p-24 bg-brand-yellow rounded-[4rem] overflow-hidden shadow-2xl shadow-brand-yellow/10 group"
           >
              {/* Decorative Background Icon */}
              <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-[0.03] scale-[4] rotate-12 group-hover:rotate-0 transition-transform duration-1000">
                 <Globe className="w-48 h-48" strokeWidth={1} />
              </div>

              <div className="max-w-4xl relative z-10 flex flex-col md:flex-row items-start md:items-center gap-12">
                 <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                       <span className="w-10 h-[2px] bg-black" />
                       <span className="font-body text-[10px] font-black tracking-[0.5em] uppercase text-black">Professional Support</span>
                    </div>
                    <h2 className="font-heading text-4xl md:text-6xl text-black leading-tight">
                       Institutional <span className="italic">Partnerships</span>.
                    </h2>
                    <p className="font-body text-lg text-black/80 leading-relaxed max-w-2xl">
                       Equip your entire clinic, school, or childcare center with our high-fidelity sensory aids. We collaborate with institutions to provide bulk order fulfillment, tailored clinical consults, and customized therapy toolkits.
                    </p>
                    <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-8">
                       <button className="px-10 py-5 bg-black text-white rounded-full font-body font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-xl shadow-black/20">
                          Begin Collaboration
                       </button>
                    </div>
                 </div>
                 
                 <div className="hidden lg:flex w-48 h-48 rounded-[3rem] bg-white/20 items-center justify-center backdrop-blur-sm">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5"><path d="M22 10V15M2 10V15M22 10L12 5L2 10L12 15L22 10Z" /></svg>
                 </div>
              </div>
           </motion.div>
        </div>
      </section>

    </main>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HandHeart, Users, Zap, ShieldCheck, ArrowRight, Heart } from "lucide-react";

const SectionHeader = ({ title, subtitle, id, light = false, centered = false }: { title: string, subtitle: string, id?: string, light?: boolean, centered?: boolean }) => (
  <div className={`mb-12 ${centered ? 'text-center flex flex-col items-center' : ''}`}>
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`font-body text-[10px] md:text-xs font-black tracking-[0.5em] uppercase mb-4 ${light ? 'text-white/60' : 'text-neutral-400'}`}
    >
      {subtitle}
    </motion.p>
    <motion.h2
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={`font-heading text-[clamp(2.5rem,6vw,4.5rem)] leading-[1] ${light ? 'text-white' : 'text-black'} max-w-4xl`}
    >
      {title}
    </motion.h2>
    <motion.div 
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.3 }}
      style={{ originX: centered ? 0.5 : 0 }}
      className={`h-[1px] w-32 mt-8 ${light ? 'bg-white/20' : 'bg-black/10'}`}
    />
  </div>
);

export default function FoundationClient() {
  const pillars = [
    {
      title: "Direct Benefit",
      desc: "Providing financial aid, therapy scholarships, and essential resources directly to neurodiverse individuals and their families.",
      icon: <HandHeart className="w-6 h-6 border-none" aria-hidden="true" />,
      color: "#FACC15"
    },
    {
      title: "Family Advocacy",
      desc: "Empowering caregivers through specialized training, respite care, and a community support network designed to alleviate daily distress.",
      icon: <Users className="w-6 h-6" aria-hidden="true" />,
      color: "#FACC15"
    },
    {
      title: "Ecosystem Growth",
      desc: "Investing in professional training and infrastructure to improve the overall availability and quality of autism services in Nepal.",
      icon: <Zap className="w-6 h-6" aria-hidden="true" />,
      color: "#FACC15"
    }
  ];

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      
      {/* ── Hero Section ── */}
      <section aria-labelledby="foundation-hero" className="relative pt-32 pb-24 md:pt-[max(4rem,15vh)] lg:pt-[max(4rem,18vh)] md:pb-40 px-[8%] md:px-[10%] bg-[#FFCE04] overflow-hidden min-h-[90vh] flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center relative z-10 text-black">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-body text-[10px] md:text-xs font-black tracking-[0.5em] uppercase text-black/60 mb-6 md:mb-8">The Foundation</p>
            <h1 id="foundation-hero" className="font-heading text-black text-[clamp(2.5rem,8vw,6.5rem)] leading-[0.95] tracking-tighter mb-8 md:mb-10">
              Compassion <br className="hidden md:block" />
              In <span className="italic">Action.</span>
            </h1>
            <p className="font-body text-black/80 text-lg md:text-2xl leading-relaxed max-w-2xl">
              Golden Sunflower Foundation is a non-profit dedicated to bridging the gaps in neurodiverse support, expanding resources and compassion for a more inclusive Nepal.
            </p>
            
            <div className="mt-12 flex flex-wrap gap-4">
               <a href="https://goldensunflower.org" target="_blank" rel="noopener noreferrer" aria-label="Explore official Golden Sunflower Foundation site (opens in a new tab)" className="bg-black text-white px-10 py-5 rounded-full font-body font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/20 outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFCE04]">
                 Explore official site
               </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-square w-full max-w-[450px] lg:max-w-none mx-auto lg:mx-0"
          >
            <div className="absolute inset-0 bg-white opacity-20 blur-[120px] rounded-full scale-150" aria-hidden="true" />
            <Image 
              src="/GSF.svg" 
              alt="Golden Sunflower Foundation Logo" 
              fill 
              sizes="450px"
              className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]" 
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* ── Mission Deep Dive ── */}
      <section aria-labelledby="foundation-mission" className="py-24 md:py-48 px-[10%] relative bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl bg-[#FAF9F6]"
          >
             <div className="absolute inset-0 p-12 md:p-20 flex items-center justify-center">
               <Image src="/GSF.svg" alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain p-12 md:p-20 opacity-10" aria-hidden="true" />
               <motion.div 
                 animate={{ y: [0, -10, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="relative z-10 bg-white p-10 md:p-14 rounded-[2.5rem] shadow-xl text-center max-w-sm"
               >
                 <ShieldCheck className="w-12 h-12 text-brand-yellow mx-auto mb-6" aria-hidden="true" />
                 <h3 className="font-heading text-2xl text-black mb-4">A Resilient, Inclusive Future.</h3>
                 <p className="font-body text-neutral-500 text-sm leading-relaxed">
                   We believe every neurodiverse individual deserves optimal support and a clear path toward independence.
                 </p>
               </motion.div>
             </div>
          </motion.div>

          <div>
            <SectionHeader 
              id="foundation-mission"
              subtitle="The Core Mission" 
              title="Alleviating Distress Through Care." 
            />
            <div className="space-y-6 font-body text-neutral-600 text-lg leading-relaxed">
              <p>
                Established to address the rising incidence of neurodiversity and the limited availability of specialized services in Nepal, the Foundation acts as the empathetic heart of our ecosystem.
              </p>
              <p>
                We are building a resilient, inclusive organization that expands resources and compassion to provide optimal support for those affected by developmental delays. Our work is guided by the simple truth: <b>Support shouldn&apos;t be a luxury.</b>
              </p>
            </div>
            
            <div className="mt-12 group inline-block">
               <a href="/institute" className="flex items-center gap-4 text-black font-body font-black uppercase tracking-widest text-xs hover:gap-6 transition-all outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-4 focus-visible:ring-offset-white rounded-md">
                 See our Center of Excellence <ArrowRight className="w-4 h-4 text-brand-yellow" aria-hidden="true" />
               </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Three Pillars ── */}
      <section aria-labelledby="foundation-pillars" className="py-24 md:py-48 px-[10%] bg-neutral-50 relative overflow-hidden">
        <div className="relative z-10">
          <SectionHeader 
            id="foundation-pillars"
            subtitle="The Strategy" 
            title="Three Foundational Priorities." 
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-20 max-w-6xl mx-auto">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-12 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group focus-within:ring-2 focus-within:ring-brand-yellow outline-none"
                tabIndex={0}
              >
                <div className="w-12 h-12 bg-[#FFCE04]/20 rounded-2xl flex items-center justify-center text-[#FFCE04] mb-8 group-hover:scale-110 transition-transform" aria-hidden="true">
                  {pillar.icon}
                </div>
                <h3 className="font-heading text-3xl text-black mb-4 leading-tight">{pillar.title}</h3>
                <p className="font-body text-neutral-500 text-base leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final Ecosystem Synergy ── */}
      <section aria-labelledby="foundation-cta" className="py-24 md:py-48 px-[10%] bg-gradient-to-b from-[#f5f5f5] to-[#FAF9F6] text-black text-center relative overflow-hidden">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/5 rounded-full mb-8 backdrop-blur-md border border-black/5">
             <Heart className="w-4 h-4 text-brand-yellow" aria-hidden="true" />
             <span className="font-body text-[10px] uppercase tracking-[0.2em] font-black">Join the Cycle of Impact</span>
          </div>
          <h2 id="foundation-cta" className="font-heading text-[clamp(2.5rem,7vw,6rem)] leading-tight mb-8">
            Every Purchase <br/>
            Has a <span className="italic text-brand-yellow">Purpose.</span>
          </h2>
          <p className="font-body text-neutral-500 text-xl max-w-2xl mx-auto mb-12">
            5% of every bloom purchased at Sunflower Petals contributes directly to the Foundation, ensuring care remains accessible through the Sunflower Institute.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="/products" className="inline-block bg-black text-white px-12 py-5 rounded-full font-body font-black uppercase tracking-widest text-sm hover:scale-105 transition-all outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2">
              Shop to Support
            </a>
            <a href="/contact" className="inline-block border border-black/10 text-black px-12 py-5 rounded-full font-body font-black uppercase tracking-widest text-sm hover:bg-black hover:text-white transition-all outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2">
              Become a Partner
            </a>
          </div>
        </motion.div>

        {/* Decorative Gradients */}
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-brand-yellow/10 blur-[140px] opacity-30 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-black/5 blur-[140px] opacity-10 pointer-events-none" />
      </section>

    </main>
  );
}

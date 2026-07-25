"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Activity, Home, GraduationCap, Trophy, Globe } from "lucide-react";

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

export default function InstituteClient() {
  const pillars = [
    {
      title: "Therapeutic Excellence",
      desc: "Individualized, intensive therapy programs designed to help every child reach their unique potential through evidence-based practices.",
      icon: <Activity className="w-6 h-6" aria-hidden="true" />,
      color: "#FACC15"
    },
    {
      title: "Sunflower Homes",
      desc: "Providing safe, supportive residential and respite care facilities for families traveling for treatment or requiring specialized support.",
      icon: <Home className="w-6 h-6" aria-hidden="true" />,
      color: "#FACC15"
    },
    {
      title: "Capacity Building",
      desc: "Our training hub empowers a new generation of therapists and educators to bridge the gap in neurodiverse support across the region.",
      icon: <GraduationCap className="w-6 h-6" aria-hidden="true" />,
      color: "#FACC15"
    },
    {
      title: "Inclusive Recreation",
      desc: "Specialized sports and recreational activities designed to foster social connection and physical well-being in a sensory-friendly environment.",
      icon: <Trophy className="w-6 h-6" aria-hidden="true" />,
      color: "#FACC15"
    }
  ];

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      
      {/* ── Hero Section ── */}
      <section aria-labelledby="institute-hero" className="relative pt-32 pb-24 md:pt-[max(4rem,15vh)] lg:pt-[max(4rem,18vh)] md:pb-40 px-[8%] md:px-[10%] bg-[#FAF9F6] overflow-hidden min-h-[90vh] flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 items-center relative z-10">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-body text-[10px] md:text-xs font-black tracking-[0.5em] uppercase text-brand-yellow mb-6 md:mb-8">The Lighthouse</p>
            <h1 id="institute-hero" className="font-heading text-black text-[clamp(2.5rem,8vw,6.5rem)] leading-[0.95] tracking-tighter mb-8 md:mb-10">
              Unifying Care. <br className="hidden md:block" />
              Building <span className="italic">Futures.</span>
            </h1>
            <p className="font-body text-neutral-600 text-lg md:text-2xl leading-relaxed max-w-2xl">
              Sunflower Institute for Autism is Nepal’s premier Center of Excellence, turning fragmented care into a holistic, national ecosystem for neurodiversity.
            </p>
          </motion.div>

          {/* Core Logo Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-square w-full max-w-[400px] lg:max-w-none mx-auto lg:mx-0 group"
          >
            {/* Soft decorative glow */}
            <div className="absolute inset-0 bg-brand-yellow opacity-[0.08] blur-[100px] rounded-full scale-125 group-hover:scale-150 transition-transform duration-1000" aria-hidden="true" />
            
            <Image 
              src="/SIA.svg" 
              alt="Sunflower Institute for Autism Logo" 
              fill 
              className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.06)] group-hover:scale-105 transition-transform duration-700" 
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* ── Mission & Ecosystem ── */}
      <section aria-labelledby="institute-vision" className="py-24 md:py-48 px-[10%] relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <SectionHeader 
              id="institute-vision"
              subtitle="The Vision" 
              title="A Holistic Center of Excellence." 
            />
            <div className="space-y-6 font-body text-neutral-600 text-lg leading-relaxed">
              <p>
                Founded on the belief that support shouldn&apos;t be a luxury, the Institute serves as the root system for everything we do. We are moving beyond isolated services to create a scalable, integrated framework for autism care in Nepal.
              </p>
              <p>
                By combining direct clinical excellence with research and community advocacy, we ensure that no child or family has to navigate their journey in the dark.
              </p>
            </div>
            
            <div className="mt-12 flex flex-wrap gap-4">
               <div className="px-6 py-3 bg-neutral-100 rounded-full flex items-center gap-3">
                 <Heart className="w-5 h-5 text-brand-yellow" aria-hidden="true" />
                 <span className="font-body text-sm font-bold text-black/70">Empathetic Care</span>
               </div>
               <div className="px-6 py-3 bg-neutral-100 rounded-full flex items-center gap-3">
                 <Globe className="w-5 h-5 text-brand-yellow" aria-hidden="true" />
                 <span className="font-body text-sm font-bold text-black/70">National Impact</span>
               </div>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-[#FFD700]/10 mix-blend-multiply z-10" aria-hidden="true" />
            <Image 
              src="/SIA.svg" 
              alt="" 
              fill 
              className="object-contain p-20 bg-[#F5F5F5]" 
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </section>

      {/* ── The Pillars ── */}
      <section aria-labelledby="institute-pillars" className="py-24 md:py-48 px-[10%] bg-black text-white relative overflow-hidden">
        <div className="relative z-10">
          <SectionHeader 
            id="institute-pillars"
            subtitle="The Architecture" 
            title="Our Four Pillars of Support." 
            light 
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mt-20">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all group focus-within:ring-2 focus-within:ring-brand-yellow outline-none"
                tabIndex={0}
              >
                <div className="w-12 h-12 bg-brand-yellow/20 rounded-2xl flex items-center justify-center text-brand-yellow mb-8 group-hover:scale-110 transition-transform" aria-hidden="true">
                  {pillar.icon}
                </div>
                <h3 className="font-heading text-2xl mb-4 leading-tight">{pillar.title}</h3>
                <p className="font-body text-white/50 text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-yellow/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-white/5 blur-[120px] pointer-events-none" />
      </section>

      {/* ── The Foundation ── */}
      <section aria-labelledby="institute-foundation" className="py-24 md:py-48 px-[10%] bg-brand-yellow overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div className="order-2 lg:order-1">
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="bg-white p-12 rounded-[3.5rem] shadow-2xl rotate-[-2deg]"
            >
              <h3 className="font-heading text-4xl text-black mb-6">Golden Sunflower Foundation</h3>
              <p className="font-body text-neutral-600 text-lg leading-relaxed mb-8">
                The direct support arm of our ecosystem. Through the foundation, we provide financial assistance for families, fund ongoing research, and enhance the infrastructure that makes our care possible.
              </p>
              <div className="flex gap-4">
                <a href="https://instituteforautism.org" target="_blank" rel="noopener noreferrer" aria-label="Visit Official Golden Sunflower Foundation Website (opens in a new tab)" className="bg-black text-white px-8 py-4 rounded-full font-body font-bold hover:scale-105 transition-transform outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFCE04]">
                  Visit Official Website
                </a>
              </div>
            </motion.div>
          </div>
          
          <div className="order-1 lg:order-2 text-black">
             <SectionHeader 
               id="institute-foundation"
               subtitle="Direct Impact" 
               title="The Foundation of Support." 
             />
             <p className="font-body text-black/70 text-xl leading-relaxed">
               Every product purchased at Sunflower Petals contributes directly to the Golden Sunflower Foundation, ensuring that care remains accessible to those who need it most.
             </p>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section aria-labelledby="institute-cta" className="py-32 px-[10%] bg-gradient-to-b from-[#f5f5f5] to-[#FAF9F6] text-center relative overflow-hidden">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <h2 id="institute-cta" className="font-heading text-[clamp(2.5rem,7vw,6rem)] text-black leading-tight mb-8">
            Let&apos;s Build the <br/>
            Next <span className="italic text-brand-yellow">Chapter.</span>
          </h2>
          <p className="font-body text-neutral-500 text-xl max-w-2xl mx-auto mb-12">
            Have questions about our initiatives or want to get involved? We&apos;re always looking for fellow dreamers and doers.
          </p>
          <a href="/contact" className="inline-block bg-black text-white px-16 py-6 rounded-full font-body font-black uppercase tracking-widest text-sm hover:scale-110 active:scale-95 transition-all shadow-2xl outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2">
            SAY HELLO
          </a>
        </motion.div>
      </section>

    </main>
  );
}

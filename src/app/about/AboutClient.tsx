"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sprout, Home, Building2 } from "lucide-react";

const SectionHeader = ({ title, subtitle, light = false }: { title: string, subtitle: string, light?: boolean }) => (
  <div className="mb-10 md:mb-2">
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`font-body text-[10px] md:text-xs font-black tracking-[0.5em] uppercase mb-4 ${light ? 'text-white/60' : 'text-neutral-400'}`}
    >
      {subtitle}
    </motion.p>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={`font-heading text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] ${light ? 'text-white' : 'text-black'}`}
    >
      {title}
    </motion.h2>
    <motion.div 
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.3 }}
      style={{ originX: 0 }}
      className={`h-[1px] w-32 mt-8 ${light ? 'bg-white/20' : 'bg-black/10'}`}
    />
  </div>
);

export default function AboutClient() {
  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      
      {/* ── Page Hero ── */}
      <section className="relative pt-32 pb-16 md:pt-56 md:pb-32 px-[10%]">
        <div className="max-w-4xl relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading text-black text-[clamp(3rem,8vw,6rem)] leading-[0.95] tracking-tighter mb-8"
          >
            Unstructured is <br/>
            the <span className="italic text-brand-yellow">New</span> Structure.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-body text-neutral-600 text-lg md:text-2xl leading-relaxed max-w-2xl"
          >
            Not everything meaningful fits into structure. Some of the most important growth happens in the in-between—in moments of curiosity, in small explorations, in quiet joy.
          </motion.p>
        </div>

        {/* Decorative Graphic (Sunflower Character) - Tucked into Section Break */}
        <motion.div 
          initial={{ opacity: 0, y: 100, rotate: 10 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-[-10%] right-0 md:right-[5%] w-[45vw] h-[45vw] md:w-[32vw] md:h-[40vw] pointer-events-none z-0"
        >
          <Image 
            src="/hero-graphic.svg" 
            alt="Sunflower character" 
            fill 
            className="object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]" 
          />
        </motion.div>
      </section>

      {/* ── About Sunflower Petals (The Boutique) ── */}
      <section className="py-16 md:py-40 px-[10%] bg-white relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <SectionHeader title="The Art of Mindful Gifting" subtitle="Sunflower Petals" />
            <div className="space-y-6 font-body text-neutral-600 text-lg leading-relaxed">
              <p>
                What if learning didn’t have to look a certain way? What if it could feel like wonder... like discovery... like play?
              </p>
              <p>
                Play isn&apos;t a break from learning. It <b>is</b> the learning. When we loosen the rules, we make space for confidence to grow naturally, freely. Because nature was never meant to follow straight lines. And neither are we.
              </p>
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl shadow-black/5"
          >
            <Image src="/story.png" alt="Petals Boutique" fill className="object-cover" />
          </motion.div>
        </div>
      </section>

      {/* ── Educational Frameworks (The Science) ── */}
      <section className="py-16 md:py-48 px-[10%] bg-[#FAF9F6]">
        <div className="max-w-4xl mx-auto text-center mb-2">
           <SectionHeader title="The Science of Functional Living" subtitle="Educational Frameworks" />
           <p className="font-body text-neutral-500 text-xl max-w-2xl mx-auto">
             Our methodology is rooted in globally recognized standards that prioritize meaningful independence without sacrificing the magic of play.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              title: "EFL",
              full: "Essential for Living",
              desc: "An overarching framework focusing on functional communication, self-regulation, safety, and core life skills.",
              icon: <Sprout className="w-8 h-8 text-neutral-400 group-hover:text-brand-yellow transition-colors" strokeWidth={1.5} />
            },
            {
              title: "ADL",
              full: "Activities of Daily Living",
              desc: "The basic and necessary skills for personal self-care—like dressing and grooming—that act as the first stepping stones to independence.",
              icon: <Home className="w-8 h-8 text-neutral-400 group-hover:text-brand-yellow transition-colors" strokeWidth={1.5} />
            },
            {
              title: "IADL",
              full: "Instrumental ADL",
              desc: "More complex, life-management skills required to live independently, such as meal preparation, routine management, and using communication tools.",
              icon: <Building2 className="w-8 h-8 text-neutral-400 group-hover:text-brand-yellow transition-colors" strokeWidth={1.5} />
            }
          ].map((item, idx) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-12 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all group"
            >
              <div className="mb-6 group-hover:scale-110 transition-transform inline-block">
                {item.icon}
              </div>
              <h3 className="font-heading text-3xl text-black mb-1">{item.title}</h3>
              <p className="font-body text-[10px] uppercase tracking-widest font-black text-brand-yellow mb-6">{item.full}</p>
              <p className="font-body text-neutral-500 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── About Sunflower Institute (The Foundation) ── */}
      <section className="py-16 md:py-40 px-[10%] bg-[#FFCE04] relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{backgroundColor: "#f5f5f5"}}
            className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl shadow-black/10 order-2 lg:order-1"
          >
            <Image src="/SIA.svg" alt="Sunflower Institute" fill className="object-contain p-20" />
          </motion.div>
          <div className="order-1 lg:order-2">
            <SectionHeader title="Where It All Began" subtitle="The Foundation" light />
            <div className="space-y-6 font-body text-black/80 text-lg leading-relaxed">
              <p>
                <b>Sunflower Petals</b> doesn&apos;t stand alone. It is an initiative proudly rooted under the umbrella of the <b>Sunflower Institute for Autism</b>.
              </p>
              <p>
                The Institute provides the clinical excellence, empathetic care, and profound understanding of the spectrum that informs every product we create. Together, we are holding the lantern high for every sunflower that follows the light—because play is the new integration, and we are guiding a new way to bloom.
              </p>
            </div>
          </div>
        </div>

        {/* Floating Petals */}
        <div className="absolute top-10 right-10 w-32 h-32 opacity-20">
            <svg viewBox="0 0 100 100" fill="white"><path d="M50 0C50 0 100 40 100 70C100 90 80 100 50 100C20 100 0 90 0 70C0 40 50 0 50 0Z"/></svg>
        </div>
      </section>

    </main>
  );
}

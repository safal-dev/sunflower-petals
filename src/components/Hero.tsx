"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const taglines = [
    { highlight: "Unstructured", rest: "is the new structure." },
    { highlight: "Play", rest: "is the new integration." }
  ];

  useEffect(() => {
    const textInterval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 4500);

    return () => clearInterval(textInterval);
  }, [taglines.length]);

  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden flex flex-col justify-between md:block z-[30]">

      {/* ── Content layer ── */}
      <div className="relative z-20 flex flex-col px-6 md:px-12 lg:px-16 xl:px-[10%] md:h-full text-center md:text-left pt-24 md:pt-[max(4rem,12vh)]">
        {/* Navbar spacer */}
        <div className="hidden md:block h-16" />

        {/* Headline ── */}
        <div className="md:max-w-[70vw] pt-10 md:pt-0">
          <AnimatePresence mode="wait">
            <motion.h1
              key={taglineIndex}
              className="font-heading text-black tracking-tight leading-[1] md:leading-[1.1]"
              style={{ fontSize: 'clamp(2.2rem, 10vw, 4.8rem)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="block mb-1 md:mb-0">
                <span className="italic pr-2 inline-block">
                  {taglines[taglineIndex].highlight}
                </span>
                {"\u00A0"}{taglines[taglineIndex].rest.split(' ').slice(0, 2).join(' ')}
              </span>
              <span className="block text-black">
                 {taglines[taglineIndex].rest.split(' ').slice(2).join(' ')}
              </span>
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Subtext ── */}
        <motion.p
          className="font-body text-neutral-600 mt-5 md:mt-6 leading-relaxed md:max-w-[40vw] text-base md:text-xl px-4 md:px-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: "easeOut" }}
        >
          Play isn&apos;t a break from learning. It <span className="italic font-bold">is</span>{"\u00A0"}the learning. <br className="hidden md:block" />
          A space where every mind blooms differently.
        </motion.p>

        {/* CTA buttons ── */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mt-8 md:mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2, ease: "easeOut" }}
        >
          <Link href="/products" className="bg-black text-white px-8 py-3 rounded-full font-body font-bold hover:bg-neutral-800 hover:scale-105 active:scale-95 transition-all text-sm md:text-base w-full sm:w-auto min-w-[200px] text-center">
            Shop Now
          </Link>
          <Link href="/about" className="border-2 border-black text-black px-8 py-3 rounded-full font-body font-bold hover:bg-black hover:text-white hover:scale-105 active:scale-95 transition-all text-sm md:text-base w-full sm:w-auto min-w-[200px] text-center">
            Learn More
          </Link>
        </motion.div>
      </div>

      {/* ── Background Wave ── */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none transition-all duration-300">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-[15vh] md:h-[44vh] block translate-y-[2px]" aria-hidden="true">
          <path fill="#FFCE04" d="M 0,120 C 480,40 960,280 1440,240 L 1440,320 L 0,320 Z" />
        </svg>
      </div>

      {/* ── Sunflower Character ── */}
      <motion.div
        className="relative md:absolute z-10 h-[35vh] w-[28vh] md:h-auto md:w-[clamp(260px,36vw,600px)] aspect-[1080/1350] mt-auto md:mt-0 self-end -mr-4 md:mr-0 md:self-auto md:right-[10%] md:bottom-[4.0%]"
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="w-full h-full relative"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/hero-graphic.svg"
            alt=""
            fill
            className="object-contain object-bottom"
            priority
            aria-hidden="true"
          />
        </motion.div>
      </motion.div>

      {/* ── Scroll Animation ── */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 md:left-[10%] md:translate-x-0 z-40 flex scale-75 md:scale-100"
      >
        <button
          onClick={() => document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })}
          className="group relative flex flex-col items-center outline-none"
          aria-label="Scroll to Categories"
        >
          <div className="relative h-24 w-12 flex flex-col items-center justify-center">
            <svg width="40" height="80" viewBox="0 0 40 80" fill="none" className="text-black/20 group-hover:text-black transition-colors">
              <motion.path
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ 
                  d: "M20 40C20 40 23.5 36.5 27 36.5C30.5 36.5 34 40 34 40C34 40 30.5 43.5 27 43.5C23.5 43.5 20 40 20 40ZM20 40C20 40 16.5 36.5 13 36.5C9.5 36.5 6 40 6 40C6 40 9.5 43.5 13 43.5C16.5 43.5 20 40 20 40ZM20 40C20 40 23.5 33.5 23.5 30C23.5 26.5 20 23 20 23C20 23 16.5 26.5 16.5 30C16.5 33.5 20 40 20 40ZM20 40C20 40 23.5 46.5 23.5 50C23.5 53.5 20 57 20 57C20 57 16.5 53.5 16.5 50C16.5 46.5 20 40 20 40Z",
                  pathLength: 0 
                }}
                animate={{ 
                  d: [
                    "M20 40C20 40 23.5 36.5 27 36.5C30.5 36.5 34 40 34 40C34 40 30.5 43.5 27 43.5C23.5 43.5 20 40 20 40ZM20 40C20 40 16.5 36.5 13 36.5C9.5 36.5 6 40 6 40C6 40 9.5 43.5 13 43.5C16.5 43.5 20 40 20 40ZM20 40C20 40 23.5 33.5 23.5 30C23.5 26.5 20 23 20 23C20 23 16.5 26.5 16.5 30C16.5 33.5 20 40 20 40ZM20 40C20 40 23.5 46.5 23.5 50C23.5 53.5 20 57 20 57C20 57 16.5 53.5 16.5 50C16.5 46.5 20 40 20 40Z",
                    "M20 5C26 15 14 25 20 35C26 45 14 55 20 65"
                  ],
                  pathLength: 1
                }}
                transition={{ 
                  d: { delay: 3, duration: 2, ease: "easeInOut" },
                  pathLength: { duration: 2, ease: "easeInOut" }
                }}
              />
            </svg>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 5 }}
              className="flex flex-col items-center -mt-4"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center"
              >
                <div className="relative w-3 h-3 mb-0.5">
                   <div className="absolute inset-0 bg-brand-yellow rounded-full scale-50" />
                   {[...Array(6)].map((_, i) => (
                     <div 
                       key={i} 
                       className="absolute top-1/2 left-1/2 w-1 h-2 bg-brand-yellow rounded-full -translate-x-1/2 -translate-y-1/2"
                       style={{ rotate: `${i * 60}deg`, transformOrigin: 'center center', marginTop: '-3px' }}
                     />
                   ))}
                </div>
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="text-black/40 group-hover:text-black transition-colors">
                  <path d="M1.5 1.5L6 6L10.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </button>
      </motion.div>
    </section>
  );
}

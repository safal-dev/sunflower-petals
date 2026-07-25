"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    id: 1,
    text: "The Blossom Chew has been a game-changer for my daughter's focus at school. It's so discrete and the texture is perfect. We've tried many others, but the quality here is unmatched.",
    author: "Sarah Jenkins",
    role: "Verified Parent",
    date: "2 days ago",
    avatar: "/avatar-1.png",
    rating: 5,
  },
  {
    id: 2,
    text: "As someone with high sensory needs, finding tools that don't look like 'medical equipment' is so hard. These Petal Stones are beautiful enough to keep on my desk at work. Truly bespoke.",
    author: "Mark Lawrence",
    role: "Focused Professional",
    date: "1 week ago",
    avatar: "/avatar-2.png",
    rating: 5,
  },
  {
    id: 3,
    text: "Everything from Sunflower Petals feels like it was made with so much love. The packaging was adorable, and the sensory blanket is the softest thing I've ever felt. Highly recommend!",
    author: "Elena Rodriguez",
    role: "Happy Customer",
    date: "3 days ago",
    avatar: "/avatar-3.png",
    rating: 5,
  },
  {
    id: 4,
    text: "I bought the collection for my son, and he hasn't let go of the Sunflower Fidget since. It's become his go-to grounding tool. Thank you for making such thoughtful products locally.",
    author: "David Chen",
    role: "Grateful Dad",
    date: "5 days ago",
    avatar: "/avatar-2.png",
    rating: 5,
  },
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 500;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative w-full bg-[#FAF9F6] pt-16 pb-32 md:pt-24 md:pb-48 px-8 md:px-[10%] overflow-hidden z-20">
      
      {/* ── Background Branding (Subtle & Static) ── */}
      <div className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] opacity-[0.025] pointer-events-none select-none z-0">
          <Image src="/main-logo.png" alt="" fill className="object-contain" />
      </div>

      <div className="max-w-[1500px] mx-auto flex flex-col lg:flex-row gap-20 md:gap-32 relative z-10">
        
        {/* Left Column: Branding & Controls (Restored & Refined) */}
        <div className="flex flex-col items-start w-full lg:w-[30%] shrink-0">
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="flex items-center gap-4 mb-10"
          >
             <div className="h-[1px] w-12 bg-brand-yellow" />
             <span className="font-body text-[10px] font-black tracking-[0.6em] uppercase text-black/40">Reviews</span>
          </motion.div>
          
          <h2 className="font-heading text-black text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.9] md:tracking-tighter mb-12">
             Voice of <br /> the <span className="italic text-brand-yellow">Garden</span>
          </h2>

          <p className="font-body text-neutral-400 text-lg leading-relaxed mb-16 max-w-sm">
             Real stories of sensory support and therapeutic growth from our clinical community.
          </p>
          
          {/* Elegant Horizontal Navigation */}
          <div className="flex items-center gap-6 mt-auto">
            <button 
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-14 h-14 rounded-full border border-black/10 flex items-center justify-center transition-all ${canScrollLeft ? 'hover:bg-black hover:text-white cursor-pointer active:scale-90' : 'opacity-20 cursor-not-allowed'}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            </button>
            <div className="h-[1px] w-24 bg-black/10 relative overflow-hidden">
               <motion.div 
                 className="absolute top-0 left-0 h-full bg-brand-yellow"
                 animate={{ scaleX: canScrollRight ? 0.4 : 1 }}
                 style={{ originX: 0 }}
               />
            </div>
            <button 
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-14 h-14 rounded-full border border-black/10 flex items-center justify-center transition-all ${canScrollRight ? 'hover:bg-black hover:text-white cursor-pointer active:scale-90' : 'opacity-20 cursor-not-allowed'}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14m-7-7l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        {/* Right Column: Breathable Spotlight Cards */}
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-10 overflow-x-auto no-scrollbar snap-x snap-mandatory pt-4 pb-12 w-full lg:w-[70%]"
        >
          {TESTIMONIALS.map((t, idx) => (
            <motion.div 
              key={t.id} 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="min-w-[85vw] md:min-w-[500px] snap-center flex flex-col"
            >
              <div className="bg-white rounded-[3rem] p-12 md:p-16 shadow-2xl shadow-black/5 hover:shadow-brand-yellow/10 transition-all duration-700 h-full flex flex-col group">
                
                {/* Simplified Quote Icon */}
                <div className="mb-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg width="32" height="24" viewBox="0 0 32 24" fill="currentColor">
                    <path d="M9.33333 0L12 2.66667C8 6.66667 8 10.6667 8 13.3333H13.3333V25.3333H0V13.3333C0 5.33333 4 1.33333 9.33333 0ZM28 0L30.6667 2.66667C26.6667 6.66667 26.6667 10.6667 26.6667 13.3333H32V25.3333H18.6667V13.3333C18.6667 5.33333 22.6667 1.33333 28 0Z" />
                  </svg>
                </div>

                <p className="font-heading text-2xl md:text-3xl text-black leading-tight italic flex-1 mb-10">
                  &ldquo;{t.text}&rdquo;
                </p>
                
                {/* Author Info */}
                <div className="flex items-center gap-5 mt-auto">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border border-black/5">
                     <Image 
                       src={t.avatar} 
                       alt={t.author} 
                       fill 
                       className="object-cover"
                     />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-body font-black text-xs uppercase tracking-widest text-black mb-1">{t.author}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-body text-[10px] text-brand-yellow font-black uppercase tracking-[0.2em]">{t.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

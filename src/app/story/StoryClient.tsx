"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Heart, Sparkles, Users, Calendar, ShieldCheck, Zap, Layout, BrainCircuit, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const NAV_SECTIONS = [
  { id: "section-beginning", label: "The Beginning" },
  { id: "section-shoebox", label: "Shoe Box Activities" },
  { id: "section-montage", label: "Photo Montage" },
  { id: "section-calendar", label: "Calendar Journey" },
  { id: "section-petals", label: "So, Petals?" },
  { id: "section-values", label: "From the Heart" },
  { id: "section-sincerely", label: "Sincerely" },
];

export default function StoryClient() {
  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, [0, 500], [0, 1]);
  const [activeSection, setActiveSection] = useState<string>(NAV_SECTIONS[0].id);
  const [navVisible, setNavVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Show nav after hero
    const onScroll = () => setNavVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the greatest intersection ratio that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) setActiveSection(visible[0].target.id);
      },
      { threshold: [0.15, 0.4], rootMargin: "-10% 0px -20% 0px" }
    );
    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const SHOEBOX_IMAGES = [
    { src: "/story/shoebox.png", alt: "Handmade shoe box activities", label: "The Legacy", caption: "Handmade shoe box activities for table work" },
    { src: "/story/shoeboxes.jpeg", alt: "Number learning activities", label: "Numbers & Counting", caption: "Collecting and keeping like any available shoeboxes" },
    // { src: "/story/night_checklist.jpeg", alt: "Night checklist activity", label: "Evening Routine", caption: "Structured night checklists to build independence" },
    { src: "/story/number_stamps.jpeg", alt: "Number stamps activity", label: "Number Stamps", caption: "Self ink stamps became the number and alphabet learning toys" },
    { src: "/story/sorting_tray.jpeg", alt: "Sorting tray activity", label: "Sorting & Matching", caption: "The sweets box turned into a sorting tray" },
  ];
  const [activeShoeboxIdx, setActiveShoeboxIdx] = useState(0);

  const MONTAGE_IMAGES = [
    { src: "/story/shoebox.png", alt: "Handmade shoe box activity", label: "The Legacy", caption: "Handmade shoe box activities for table work" },
    { src: "/story/shoeboxes.jpeg", alt: "Collection of shoe boxes", label: "Shoeboxes", caption: "Collecting & keeping like any available shoeboxes" },
    { src: "/story/number_stamps.jpeg", alt: "Number stamp learning toys", label: "Number Stamps", caption: "Self ink stamps became the number and alphabet learning toys" },
    { src: "/story/sorting_tray.jpeg", alt: "Sorting tray activity", label: "Sorting & Matching", caption: "The sweets box turned into a sorting tray" },
    { src: "/story/night_checklist.jpeg", alt: "Night checklist routine", label: "Evening Routine", caption: "Structured night checklists to build independence" },
    { src: "/story/anything_is_usable.jpeg", alt: "Anything is usable as a learning tool", label: "Anything Is Usable", caption: "Everyday objects repurposed as meaningful learning tools" },
    { src: "/story/motor.jpeg", alt: "Motor skills activity", label: "Motor Skills", caption: "Fine motor exercises woven into everyday play" },
    { src: "/story/more_stamps.jpeg", alt: "More stamp activities", label: "More Stamps", caption: "Building on the love of stamps, one impression at a time" },
    { src: "/story/pecs_collection.jpeg", alt: "PECS communication cards collection", label: "PECS Collection", caption: "Picture Exchange Communication System cards, hand-collected" },
    { src: "/story/alphaphet_vehicles.jpeg", alt: "Alphabet vehicles learning activity", label: "Alphabet Vehicles", caption: "Toy vehicles as carriers of the alphabet — learning through obsession" },
    { src: "/story/more_more_stamps.jpeg", alt: "Even more stamp activities", label: "More & More Stamps", caption: "The stamp collection that just kept growing" },
    { src: "/story/alphabet_jars.jpeg", alt: "Alphabet jars learning activity", label: "Alphabet Jars", caption: "Jars filled with letters — a tactile way to learn the alphabet" },
  ];
  const [selectedMontage, setSelectedMontage] = useState<number | null>(null);
  const montageScrollRef = useRef<HTMLDivElement>(null);

  const goMontage = (dir: 1 | -1) => {
    setSelectedMontage((prev) => {
      if (prev === null) return null;
      const next = (prev + dir + MONTAGE_IMAGES.length) % MONTAGE_IMAGES.length;
      return next;
    });
  };


  const cards = [
    {
      title: "Personalized",
      description: "No two children are the same. Our products adapt to your child's unique needs.",
      icon: <Users className="w-6 h-6" strokeWidth={1.5} />,
    },
    {
      title: "Simple & Fun",
      description: "Game-like activities that make learning joyful for every child.",
      icon: <Sparkles className="w-6 h-6" strokeWidth={1.5} />,
    },
    {
      title: "For Every Family",
      description: "Whether hitting milestones typically or working through challenges — we're here.",
      icon: <Heart className="w-6 h-6" strokeWidth={1.5} />,
    },
    {
      title: "From the Heart",
      description: "Created by parents who've walked this path, for parents starting theirs.",
      icon: <ShieldCheck className="w-6 h-6" strokeWidth={1.5} />,
    }
  ];

  const brands = [
    {
      name: "Cliky Claky",
      tagline: "Sensory & Calming",
      description: "Tools and products designed to soothe, regulate, and create a sense of safety — helping your child feel grounded in their world.",
      icon: <Zap className="w-10 h-10 text-brand-yellow" strokeWidth={1.5} />,
      color: "bg-blue-50/50"
    },
    {
      name: "DayDay",
      tagline: "Self-Organizing & Independence",
      description: "Visual schedules, routines, and structured aids that empower your child to build autonomy and confidence in daily life.",
      icon: <Layout className="w-10 h-10 text-brand-yellow" strokeWidth={1.5} />,
      color: "bg-orange-50/50"
    },
    {
      name: "NumSum",
      tagline: "Skills & Learning",
      description: "Playful, game-like activities that target essential life skills — from communication to fine motor — meeting your child where they are.",
      icon: <BrainCircuit className="w-10 h-10 text-brand-yellow" strokeWidth={1.5} />,
      color: "bg-green-50/50"
    }
  ];

  return (
    <main className="relative w-full pb-12 md:pb-24 bg-[#FAF9F6] pt-0 overflow-hidden">

      {/* ── Vertical Breadcrumb Nav ── */}
      <AnimatePresence>
        {navVisible && (
          <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            aria-label="Story page sections"
            className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-0"
          >
            {NAV_SECTIONS.map((sec, idx) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollTo(sec.id)}
                  title={sec.label}
                  className="group flex items-center gap-3 py-[7px] px-2 cursor-pointer bg-transparent border-none outline-none"
                  aria-current={isActive ? "true" : undefined}
                >
                  {/* Label — always visible, highlights when active */}
                  <motion.span
                    animate={{
                      color: isActive ? "#1a1a1a" : "#b5b5b5",
                      backgroundColor: isActive ? "rgba(250,204,21,0.15)" : "transparent",
                      borderColor: isActive ? "rgba(250,204,21,0.5)" : "transparent",
                      fontWeight: isActive ? 600 : 400,
                      paddingLeft: isActive ? "0.75rem" : "0",
                      paddingRight: isActive ? "0.75rem" : "0",
                    }}
                    transition={{ duration: 0.2 }}
                    className="font-body text-[9px] tracking-[0.18em] uppercase border rounded-full py-1 pointer-events-none select-none"
                    style={{ display: "block" }}
                  >
                    {sec.label}
                  </motion.span>

                  {/* Dot + line */}
                  <div className="flex flex-col items-center">
                    {/* Connector line above (skip for first) */}
                    {idx > 0 && (
                      <div
                        className={`w-[1.5px] h-4 transition-colors duration-300 ${isActive ? "bg-brand-yellow" : "bg-neutral-300"
                          }`}
                      />
                    )}

                    {/* Dot */}
                    <div
                      className={`relative rounded-full transition-all duration-300 ${isActive
                        ? "w-3 h-3 bg-brand-yellow shadow-[0_0_0_3px_rgba(250,204,21,0.25)]"
                        : "w-2 h-2 bg-neutral-300 group-hover:bg-neutral-500"
                        }`}
                    />

                    {/* Connector line below (skip for last) */}
                    {idx < NAV_SECTIONS.length - 1 && (
                      <div
                        className={`w-[1.5px] h-4 transition-colors duration-300 ${isActive ? "bg-brand-yellow" : "bg-neutral-300"
                          }`}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ── Editorial Animated Hero ── */}
      <div className="relative h-[110vh] w-full bg-[#FAF9F6] mb-12 md:mb-24">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden [--padding-x:4rem] md:[--padding-x:20%] [--hero-h:60vh] md:[--hero-h:80vh]">
          <motion.div
            style={{
              width: useTransform(progress, p => `calc((100% * (1 - ${p})) + (calc(100% - var(--padding-x)) * ${p}))`),
              maxWidth: useTransform(progress, p => `calc((100vw * (1 - ${p})) + (1400px * ${p}))`),
              height: useTransform(progress, p => `calc((100vh * (1 - ${p})) + (var(--hero-h) * ${p}))`),
              borderRadius: useTransform(progress, p => `calc(3rem * ${p})`),
            }}
            className="relative overflow-hidden group shadow-2xl bg-black"
          >
            <Image
              src="/story.png"
              alt="Wooden workshop"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40 md:bg-black/20" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 md:p-12 text-center mt-12 md:mt-0">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="font-heading text-[clamp(2.5rem,8vw,7rem)] leading-[0.85] tracking-tighter"
              >
                The Story <br /> Behind <span className="italic text-brand-yellow">Petals</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8 font-body max-w-xl text-sm md:text-lg text-white/80 leading-relaxed"
              >
                Personalized, playful tools for parents and caregivers of children with autism — because one size never fits all.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Section 1: The Beginning ── */}
      <section id="section-beginning" className="px-8 md:px-[10%] mb-12 md:mb-20">
        <div className="max-w-[800px] mx-auto flex flex-col gap-12 md:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <h2 className="font-heading text-3xl md:text-5xl text-black leading-tight">
              You begin your journey by noticing something <span className="italic text-brand-yellow">concerningly different</span> about your child.
            </h2>
            <div className="h-[1px] w-24 bg-brand-yellow" />
            <div className="flex flex-col gap-6 text-neutral-600 font-body text-base md:text-xl leading-relaxed">
              <p className="first-letter:text-5xl first-letter:font-heading first-letter:mr-3 first-letter:float-left first-letter:text-black">
                After an assessment, you received the diagnosis of Autism Spectrum &quot;Disorder.&quot; Following a time of careful consideration, you embraced the diagnosis and chose to move forward. You enrolled in a Parent-Child Training Program (PCTP), dedicating two months to learning the theories and practical ways to connect with a child labeled &quot;Autistic.&quot;
              </p>
              <p>
                You discovered that the results are inconsistent&mdash;some strategies work, and others don&apos;t. You were often reminded of the truth of the spectrum: <span className="italic text-black">&quot;If you know one person with autism, then you know one person with autism.&quot;</span>
              </p>
              <p>
                Their needs are specific, as are their understanding or sensory levels and triggers, thus their goals are deeply specific, illuminating the unique and tender parenting path that lies ahead for years.
              </p>
              <p className="text-black font-semibold italic">
                You have navigated the full cycle of acceptance: moving from initial denial, through a period of catharsis, to finally embracing life with autism as a profound, meaningful purpose. Hence, the &quot;PETALS.&quot;
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 2: Table Work & Shoe Box Activities ── */}
      <section id="section-shoebox" className="px-8 md:px-[10%] mb-8 md:mb-16 py-12 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-yellow-50/40 via-transparent to-transparent opacity-60 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {/* ── Product-style image gallery ── */}
            <div className="relative pb-10">
              {/* Main image with crossfade */}
              <div className="relative h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeShoeboxIdx}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={SHOEBOX_IMAGES[activeShoeboxIdx].src}
                      alt={SHOEBOX_IMAGES[activeShoeboxIdx].alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute bottom-8 left-8 right-8 bg-black/60 backdrop-blur-md p-6 rounded-2xl text-white border border-white/10 z-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeShoeboxIdx}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="text-xs uppercase tracking-widest font-body opacity-80 mb-2">
                        {SHOEBOX_IMAGES[activeShoeboxIdx].label}
                      </p>
                      <h4 className="font-heading text-xl">
                        {SHOEBOX_IMAGES[activeShoeboxIdx].caption}
                      </h4>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Circle thumbnail nav overlapping the bottom edge */}
              <div className="absolute -bottom-2 left-8 flex items-center gap-1">
                {SHOEBOX_IMAGES.map((img, idx) => {
                  const isActiveThumbnail = idx === activeShoeboxIdx;
                  return (
                    <motion.button
                      key={idx}
                      onClick={() => setActiveShoeboxIdx(idx)}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08 + 0.3 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        scale: isActiveThumbnail ? 1.15 : 1,
                      }}
                      style={{ marginLeft: idx === 0 ? 0 : "-0.75rem" }}
                      className={`relative w-14 h-14 md:w-[4.5rem] md:h-[4.5rem] rounded-full overflow-hidden shadow-lg flex-shrink-0 transition-all duration-300 ${isActiveThumbnail
                        ? "border-[3px] border-brand-yellow z-20"
                        : "border-[3px] border-white z-10 opacity-80 hover:opacity-100 hover:z-20"
                        }`}
                      title={img.alt}
                      aria-label={`View image: ${img.alt}`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="72px"
                        className="object-cover"
                      />
                      {isActiveThumbnail && (
                        <div className="absolute inset-0 bg-brand-yellow/10 rounded-full" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8 md:gap-12"
          >
            <span className="font-body text-[10px] uppercase tracking-[0.5em] text-brand-yellow font-black">Midnight Inspiration</span>
            <h3 className="font-heading text-4xl md:text-6xl text-black leading-[0.9] tracking-tighter">
              Wrapping Shoe Boxes <br /> at <span className="italic">Midnight.</span>
            </h3>
            <div className="flex flex-col gap-6 text-[#064E3B]/80 font-body text-lg md:text-xl leading-relaxed">
              <p>
                Like many parents, we were taught to create shoe box activities and structures tailored to our child&apos;s specific needs and developmental level.
              </p>
              <p>
                However, and I&apos;ll be honest, not everyone consistently dedicated themselves to finding the perfect toy, staying up late to wrap shoe boxes, or constantly stacking whatever empty boxes they found around the house. Some succeeded with this approach, and others did not.
              </p>
            </div>
            <div className="flex items-center gap-4 group cursor-help">
              <div className="p-3 rounded-full bg-brand-yellow/10 text-brand-yellow group-hover:bg-brand-yellow group-hover:text-black transition-colors duration-300">
                <Heart className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <p className="font-body text-sm text-neutral-500 italic">Created by parents who&apos;ve walked this path.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 2.5: Photo Montage ── */}
      <section id="section-montage" className="mb-8 md:mb-16 relative overflow-hidden bg-[#F2EDE4] pt-16 md:pt-24 pb-16 md:pb-24">

        <AnimatePresence mode="wait">
          {selectedMontage === null ? (
            /* ── Default: header + bento grid ── */
            <motion.div
              key="grid-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-8 md:px-[10%] mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="max-w-[1200px] mx-auto flex flex-col gap-3"
                >
                  <span className="font-body text-[10px] uppercase tracking-[0.5em] text-brand-yellow font-black">Moments Captured</span>
                  <h3 className="font-heading text-4xl md:text-6xl text-black leading-[0.9] tracking-tighter">
                    A Glimpse of <span className="italic">Our Journey.</span>
                  </h3>
                  <p className="font-body text-sm text-neutral-500 mt-2">Click any photo to explore.</p>
                </motion.div>
              </div>

              {/* Bento grid */}
              <div className="px-8 md:px-[10%]">
                <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
            {MONTAGE_IMAGES.map((img, idx) => {
                // Bento span rules: match the original editorial layout
                const spanClass = [
                  "col-span-1 row-span-2", // 0 shoebox — tall
                  "col-span-2 row-span-1", // 1 shoeboxes — wide
                  "col-span-1 row-span-1", // 2 number_stamps — square
                  "col-span-1 row-span-1", // 3 sorting_tray — square
                  "col-span-1 row-span-2", // 4 night_checklist — tall
                  "col-span-2 row-span-1", // 5 anything_is_usable — wide
                  "col-span-1 row-span-1", // 6 motor — square
                  "col-span-1 row-span-2", // 7 more_stamps — tall
                  "col-span-1 row-span-1", // 8 pecs_collection — square
                  "col-span-2 row-span-1", // 9 alphaphet_vehicles — wide
                  "col-span-1 row-span-1", // 10 more_more_stamps — square
                  "col-span-2 row-span-1", // 11 alphabet_jars — wide
                ][idx] ?? "col-span-1 row-span-1";

                return (
                  <motion.div
                    key={idx}
                    onClick={() => setSelectedMontage(idx)}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className={`relative ${spanClass} rounded-[2rem] overflow-hidden shadow-lg group cursor-pointer`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    {/* Hover label */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                      <span className="text-white font-body text-xs uppercase tracking-widest bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                        View
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white font-heading text-sm italic opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {img.label}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
                </div>
              </div>
            </motion.div>
          ) : (
            /* ── Split view: thumbnail strip left + full image right ── */
            <motion.div
              key="split-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="flex h-[100svh] md:h-[90vh] overflow-hidden"
            >
              {/* Left — scrollable thumbnail strip */}
              <motion.div
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                ref={montageScrollRef}
                className="w-[110px] md:w-[160px] flex-shrink-0 overflow-y-auto flex flex-col gap-3 p-3 md:p-4 bg-[#EDE8DF] border-r border-black/10"
                style={{ scrollbarWidth: "none" }}
              >
                {MONTAGE_IMAGES.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedMontage(idx)}
                    className={`relative flex-shrink-0 w-full aspect-square rounded-2xl overflow-hidden transition-all duration-300 outline-none ${
                      idx === selectedMontage
                        ? "ring-[3px] ring-brand-yellow scale-[1.04] shadow-lg"
                        : "opacity-60 hover:opacity-100 hover:scale-[1.02]"
                    }`}
                  >
                    <Image src={img.src} alt={img.alt} fill sizes="160px" className="object-cover" />
                  </button>
                ))}
              </motion.div>

              {/* Right — full-size image + caption */}
              <div className="relative flex-1 flex flex-col bg-black">
                {/* Close button */}
                <button
                  onClick={() => setSelectedMontage(null)}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors duration-200"
                  aria-label="Close viewer"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Prev / Next */}
                <button
                  onClick={() => goMontage(-1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors duration-200"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => goMontage(1)}
                  className="absolute right-[4.5rem] top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors duration-200"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Full image with crossfade */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedMontage}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={MONTAGE_IMAGES[selectedMontage].src}
                      alt={MONTAGE_IMAGES[selectedMontage].alt}
                      fill
                      sizes="100vw"
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Caption bar */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`caption-${selectedMontage}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                  >
                    <p className="font-body text-[10px] uppercase tracking-[0.3em] text-brand-yellow mb-1">
                      {selectedMontage + 1} / {MONTAGE_IMAGES.length}
                    </p>
                    <h4 className="font-heading text-xl md:text-3xl text-white">
                      {MONTAGE_IMAGES[selectedMontage].label}
                    </h4>
                    <p className="font-body text-sm text-white/70 mt-1">
                      {MONTAGE_IMAGES[selectedMontage].caption}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── Section 3: The Calendar Journey ── */}
      <section id="section-calendar" className="px-8 md:px-[10%] mb-8 md:mb-16 py-12 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-blue-50/40 via-transparent to-transparent opacity-60 pointer-events-none" />

        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8 md:gap-12 order-2 lg:order-1"
          >
            <div className="p-3 w-14 h-14 rounded-full bg-brand-yellow/10 text-brand-yellow flex items-center justify-center">
              <Calendar className="w-6 h-6" strokeWidth={1.5} />
            </div>
            <h3 className="font-heading text-4xl md:text-6xl text-black leading-[0.9] tracking-tighter">
              The Calendar <br /><span className="italic">Journey.</span>
            </h3>
            <div className="flex flex-col gap-6 text-[#064E3B]/80 font-body text-lg md:text-xl leading-relaxed">
              <p>
                For us, the process of creating a calendar to help our child grasp the concept of date and time took a <span className="text-black font-bold">full year</span> from the initial idea.
              </p>
              <p>
                We waited until we felt like making it and until our child could understand numbers well enough. It took a few months for him to accept and learn, and today he independently prepares the calendar for each new month.
              </p>
              <p className="text-black font-medium italic">
                Thus, this has today become a significant and enduring utility in our house.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[400px] md:h-[700px] rounded-[3rem] overflow-hidden shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-700 order-1 lg:order-2"
          >
            <Image
              src="/journeycalendar.png"
              alt="The Calendar Journey"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute bottom-8 left-8 right-8 bg-black/60 backdrop-blur-md p-6 rounded-2xl text-white border border-white/10">
              <p className="text-xs uppercase tracking-widest font-body opacity-80 mb-2">Significant Utility</p>
              <h4 className="font-heading text-xl">Handmade colorful calendar for learning dates</h4>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 4: So, PETALS? (The Mission) ── */}
      <section id="section-petals" className="px-8 md:px-[10%] mb-8 md:mb-16 text-center pt-12 md:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto flex flex-col gap-8 items-center"
        >
          <h2 className="font-heading text-5xl md:text-8xl text-black leading-[0.9] tracking-tighter mb-4">
            So, <span className="italic text-brand-yellow">Petals?</span> 🌻
          </h2>
          <div className="space-y-8 font-body text-neutral-600 text-lg md:text-2xl leading-relaxed">
            <p>
              We&apos;re beginning a brand new journey, and it comes from the heart. Our goal is simple: to create products that you, as parents, can easily bring into your home and use to truly connect with your child.
            </p>
            <p className="text-black font-semibold">
              We promise to develop simple, fun, game-like activities that will work for every child, no matter their unique way of learning&mdash;whether they&apos;re hitting milestones typically or working through specific challenges.
            </p>
            <p className="text-brand-yellow italic font-bold">
              We deeply know that one size never fits all.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── Section 5: From the Heart (Values Grid) ── */}
      <section id="section-values" className="px-8 md:px-[10%] mb-12 md:mb-20">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col gap-6 text-left border border-neutral-100 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-neutral-50 flex items-center justify-center text-brand-yellow group-hover:bg-brand-yellow group-hover:text-black transition-all duration-500">
                {card.icon}
              </div>
              <div>
                <h4 className="font-heading text-xl mb-3">{card.title}</h4>
                <p className="font-body text-sm text-neutral-500 leading-relaxed">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      {/* Our Brands section — moved to /brands page */}




      {/* ── Section 8: Sincerely / Outro ── */}
      <section id="section-sincerely" className="px-8 md:px-[10%] text-center pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto flex flex-col gap-16 items-center"
        >
          <div className="flex flex-col gap-4">
            <p className="font-body text-lg text-neutral-500">Sincerely,</p>
            <p className="font-heading text-2xl text-black italic">For all parents and caregivers of children with special needs.</p>
          </div>
          <h2 className="font-heading text-4xl md:text-7xl text-black leading-tight max-w-3xl">
            &quot;Together holding the <span className="text-brand-yellow italic">lantern high,</span> <br className="hidden md:block" /> for every sunflower <br className="hidden md:block" /> follows the <span className="italic underline decoration-brand-yellow/30 underline-offset-[12px]">light</span>&quot;
          </h2>
        </motion.div>
      </section>

    </main>
  );
}

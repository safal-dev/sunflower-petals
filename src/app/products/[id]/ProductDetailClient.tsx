"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  Sun, Leaf, Sparkles, FileText, Star, ChevronDown, 
  Package, RotateCcw, ArrowRight, ShieldCheck, 
  Target, Hand, Waves, Zap, BrainCircuit, Clock, Info,
  BookOpen, Layers, User, MapPin, MessageCircle, PlayCircle,
  Image as ImageIcon, Share2, Heart, Plus, CheckCircle2, ShoppingBasket
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useEffect, useRef, useMemo } from "react";
import { getFullProducts, getBrands, Product, Brand, FullProduct } from "@/lib/data";

const allProducts = getFullProducts();
const brands = getBrands();

const BENEFIT_MAP: Record<string, { icon: React.ElementType; description: string }> = {
  "Self-Regulation": { icon: ShieldCheck, description: "Supports emotional control and sensory balance." },
  "Focus & Attention": { icon: Target, description: "Enhances concentration and reduces distractions." },
  "Fine Motor Skills": { icon: Hand, description: "Develops precision and hand-eye coordination." },
  "Grounding": { icon: Waves, description: "Provides tactile input to help stay present and calm." },
  "Cause-and-Effect Learning": { icon: Zap, description: "Teaches how actions lead to specific outcomes." },
  "Early Math Skills": { icon: BrainCircuit, description: "Introduces foundational numerical concepts." },
  "Routine Building": { icon: Clock, description: "Helps establish predictable daily structures." },
  "Visual Structure": { icon: Layers, description: "Provides clear, step-by-step visual guidance." },
  "Independence": { icon: User, description: "Empowers children to lead their own daily routines." },
  "Reduced Anxiety": { icon: ShieldCheck, description: "Lowers stress by replacing long verbal instructions." },
  "Visual & Tactile Feedback": { icon: Sparkles, description: "Engages multiple senses for better retention." },
  "Problem-Solving": { icon: BrainCircuit, description: "Encourages critical thinking and logic." },
  "Sequencing": { icon: Clock, description: "Develops an understanding of order and timing." },
};

const BenefitTag = ({ benefit }: { benefit: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const info = BENEFIT_MAP[benefit] || { icon: Info, description: "Supports development and sensory integration." };
  const Icon = info.icon;

  return (
    <div className="relative group/benefit flex-shrink-0 w-24">
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex flex-col items-center justify-center gap-3 p-4 bg-white/40 hover:bg-white border border-transparent hover:border-black/5 rounded-[2rem] text-[10px] font-brand-yellow tracking-widest text-[#171717] cursor-help transition-all duration-300"
      >
        <div className="w-10 h-10 rounded-2xl -bg-white -shadow-sm flex items-center justify-center transform group-hover/benefit:scale-110 group-hover/benefit:rotate-3 transition-transform duration-500">
           <Icon className="w-5 h-5 text-[#78BFE0]" strokeWidth={1.5} />
        </div>
        <span className="text-center leading-[1.3] opacity-60 group-hover/benefit:opacity-100 transition-opacity">
           {benefit}
        </span>
      </motion.div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute z-50 bottom-[110%] left-1/2 -translate-x-1/2 w-48 p-4 bg-black text-white text-[11px] leading-relaxed rounded-2xl shadow-2xl pointer-events-none"
          >
            <div className="relative text-center">
              {info.description}
              {/* Tooltip arrow */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Accordion = ({ title, children, defaultOpen = false, icon }: { title: string, children: React.ReactNode, defaultOpen?: boolean, icon?: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-black/5 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-4">
          {icon && <div className="text-neutral-400 group-hover:text-brand-yellow transition-colors group-hover:scale-110 transition-transform">{icon}</div>}
          <span className="font-heading text-xl md:text-2xl text-black">{title}</span>
        </div>
        <motion.span 
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-neutral-400 group-hover:text-black transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 1.5L6 6L10.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="py-6 font-body text-neutral-600 leading-relaxed text-[1rem]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MediaPlaceholder = ({ title, type = "image" }: { title: string, type?: "image" | "video" }) => (
  <div className="relative aspect-video w-full rounded-[2rem] bg-neutral-50 overflow-hidden group/media border border-black/5 mt-8 shadow-inner shadow-black/[0.02]">
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-[#78BFE0]/40 group-hover/media:text-[#78BFE0]/60 transition-colors duration-500">
       {type === "video" ? <PlayCircle className="w-16 h-16" /> : <ImageIcon className="w-16 h-16" />}
       <span className="font-body text-[10px] font-black uppercase tracking-[0.3em]">{title} Placeholder</span>
    </div>
    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
  </div>
);

export default function ProductDetailClient({ product }: { product: FullProduct }) {
  const [activeTab, setActiveTab] = useState("about");
  const [activeSection, setActiveSection] = useState("about");
  const [isScrolled, setIsScrolled] = useState(false);
  const { addToCart, isCartOpen } = useCart();
  const [activeImage, setActiveImage] = useState(product.images?.[0] || product.image || "");
  const [isAdded, setIsAdded] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  
  const [relatedProducts, setRelatedProducts] = useState<FullProduct[]>([]);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHasMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Stable Related Products Randomization (Client-side Only after mount to avoid hydration mismatch)
  useEffect(() => {
    if (!hasMounted) return;
    const related = allProducts
      .filter(p => p.id !== product.id && !p.contains)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const timer = setTimeout(() => setRelatedProducts(related), 0);
    return () => clearTimeout(timer);
  }, [product.id, allProducts, hasMounted]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: "-10% 0px -40% 0px" }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref as Element);
    });

    return () => observer.disconnect();
  }, []);

  const brandInfo = brands.find(b => b.label === product.brand);

  const imagesList = product.images && product.images.length > 0 
    ? product.images 
    : product.image 
      ? [product.image] 
      : [];

  // Bundle Discovery Logic
  const parentBundle = allProducts.find(p => p.contains?.includes(product.id));
  const otherBundleItems = parentBundle?.contains 
    ? allProducts.filter(p => parentBundle.contains!.includes(p.id) && p.id !== product.id)
    : [];

  return (
    <div className="pt-[172px] md:pt-[212px] px-[10%] pb-32">
        {/* Breadcrumb */}
        <div className="mb-12 font-body text-xs font-black tracking-[0.2em] uppercase text-neutral-400 flex items-center gap-3">
          <Link href="/products" className="hover:text-black transition-colors">Products</Link>
          <span className="text-neutral-200">/</span>
          <Link href={`/products?category=${product.categoryId}`} className="hover:text-black transition-colors">{product.categoryName}</Link>
          <span className="text-neutral-200">/</span>
          <span className="text-black">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 xl:gap-24 items-start">
          
          {/* ── Left Column: Vertical Gallery & Main Image ── */}
          <div className="w-full lg:w-[60%] flex gap-6 lg:sticky lg:top-[180px]">
            
            {/* Mobile Premium Swipe Gallery */}
            <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-[10vw] px-[10vw] gap-4 relative z-10 w-[100vw] pb-8">
               {imagesList.map((img, idx) => (
                  <div key={idx} className="w-[85vw] shrink-0 snap-center relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl shadow-black/5" style={{ backgroundColor: product.color }}>
                     {/* Subtle Brand Watermark (Mobile) */}
                       {brandInfo && (
                        <div className="absolute top-4 right-4 z-30 pointer-events-none select-none" style={{ right: "1rem", top: "1rem", left: "auto" }}>
                           <div className="relative w-[4.5rem] h-[4.5rem] opacity-100">
                              <Image src={brandInfo.section.logo} alt="" fill className="object-contain" />
                           </div>
                        </div>
                      )}
                     <Image src={img} alt={product.name} fill className="object-cover relative z-10" />
                  </div>
               ))}
            </div>

            {/* Desktop Gallery */}
            <div className="hidden md:flex gap-6 w-full">
              {/* Vertical Thumbnails */}
              {imagesList.length > 1 && (
                <div className="flex flex-col gap-4 w-20 shrink-0">
                  {imagesList.map((img, idx) => (
                    <button
                      key={`${img}-${idx}`}
                      onClick={() => setActiveImage(img)}
                      className={`relative aspect-square rounded-[1.5rem] overflow-hidden border-[2px] transition-all duration-300 ${
                        activeImage === img ? "border-brand-yellow shadow-md" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                      style={{ backgroundColor: product.color }}
                    >
                      <Image src={img} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
              
              {/* Featured Image */}
              <motion.div 
                layoutId={`product-image-${product.id}`}
                className="flex-1 aspect-square rounded-[3rem] overflow-hidden relative bg-white shadow-2xl shadow-black/5"
                style={{ backgroundColor: product.color }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    {/* Subtle Brand Watermark (Desktop) */}
                    {brandInfo && (
                      <div className="absolute top-6 right-6 z-30 pointer-events-none select-none" style={{ right: "1.5rem", top: "1.5rem", left: "auto" }}>
                         <div className="relative w-24 h-24 opacity-100">
                            <Image src={brandInfo.section.logo} alt="" fill className="object-contain" />
                         </div>
                      </div>
                    )}
                    <Image src={activeImage} alt={product.name} fill className="object-cover relative z-10" />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          {/* ── Right Column: Info & Narrative ── */}
          <div className="w-full lg:w-[40%]">
            <div className="mb-10">
              
              {product.brand && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-body text-xs font-black uppercase tracking-[0.4em] text-brand-yellow mb-2 block"
                >
                  {product.brand}
                </motion.span>
              )}
              <h1 className="font-heading text-4xl md:text-7xl text-black leading-[0.9] tracking-tighter mb-4">
                {product.name}
              </h1>

              {/* ── Petals Original Badge ── */}
              {product.isOriginal && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                  className="inline-flex items-center gap-3 mb-6 pl-1 pr-5 py-1 rounded-full border border-brand-yellow/30 bg-brand-yellow/6 group/badge cursor-default select-none"
                >
                  {/* Icon cluster */}
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-yellow shadow-sm shadow-brand-yellow/30 flex-shrink-0">
                    <Sun className="w-3.5 h-3.5 text-black" strokeWidth={2} />
                  </span>

                  <span className="flex flex-col leading-none">
                    <span className="font-body text-[9px] uppercase tracking-[0.35em] text-brand-yellow font-black">
                      Petals Original
                    </span>
                    <span className="font-body text-[11px] text-black/70 mt-0.5">
                      Originally designed &amp; built at Sunflower Petals
                    </span>
                  </span>
                </motion.div>
              )}

              <div className="flex items-center gap-6 mb-8">
                <div className="flex flex-col">
                  {product.offerPrice ? (
                    <>
                      <span className="font-body text-xs text-neutral-400 line-through tracking-[0.2em] uppercase mb-1">
                        {product.price}
                      </span>
                      <span className="font-heading text-3xl md:text-5xl text-brand-yellow">
                        {product.offerPrice}
                      </span>
                    </>
                  ) : (
                    <span className="font-heading text-3xl md:text-4xl text-black">
                      {product.price}
                    </span>
                  )}
                </div>
                <div className="h-6 w-[1px] bg-black/10" />
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${(product.rating?.stars ?? 5) > i ? "text-brand-yellow" : "text-neutral-200"}`} strokeWidth={1.5} />
                  ))}
                  <span className="font-body text-xs text-neutral-400 ml-2">(1 Review)</span>
                </div>
              </div>

              {/* Micro-description Display (Synchronized with Card) */}
              {(product.microDescription || product._microDescription) && (
                <div className="mb-8">
                  <span className="font-body text-[10px] font-black uppercase tracking-[0.2em] text-brand-yellow px-2 py-1 bg-brand-yellow/5 rounded-sm border-l-2 border-brand-yellow">
                    {product.microDescription || product._microDescription}
                  </span>
                </div>
              )}

              <p className="font-body text-neutral-600 text-lg leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Bundle Discovery CTA */}
              {parentBundle && !isCartOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8 p-6 rounded-[2rem] bg-brand-yellow/5 border border-brand-yellow/10 group/bundle relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-yellow/10 rounded-full blur-3xl -translate-y-12 translate-x-12" />
                  
                  <div className="flex flex-col gap-4 relative z-10">
                    <div className="flex items-center gap-2">
                       <Package className="w-4 h-4 text-brand-yellow" strokeWidth={1.5} />
                       <span className="font-body text-[10px] font-black uppercase tracking-[0.2em] text-brand-yellow">Collective Offer</span>
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <p className="font-body text-sm text-neutral-600 leading-snug">
                        This tool is also available in the <span className="text-black font-bold">{parentBundle.name}</span>
                      </p>
                      
                      <div className="flex items-center gap-3 mt-4 mb-2">
                        <div className="flex -space-x-3">
                          {allProducts
                            .filter(p => parentBundle.contains?.includes(p.id))
                            .map((p, idx) => (
                              <div 
                                key={p.id} 
                                className="w-12 h-12 rounded-2xl bg-white shadow-sm overflow-hidden relative z-0 hover:z-10 transition-all hover:scale-110"
                                style={{ backgroundColor: p.color }}
                              >
                                <Image src={p.image || "/clicky-clacky.png"} alt={p.name} fill className="object-cover" />
                              </div>
                            ))}
                        </div>
                        <div className="flex flex-col">
                           <p className="font-body text-[10px] text-neutral-400 uppercase tracking-widest font-black">Bundle Contents</p>
                           <p className="font-body text-[11px] text-neutral-500">
                             {allProducts.filter(p => parentBundle.contains?.includes(p.id)).map(p => p.name).join(" + ")}
                           </p>
                        </div>
                      </div>
                    </div>

                    <Link 
                      href={`/products/${parentBundle.id}`}
                      className="inline-flex items-center gap-2 font-body text-xs font-black uppercase tracking-widest text-black hover:text-brand-yellow transition-colors mt-2"
                    >
                      Explore the Bundle <ArrowRight className="w-4 h-4 group-hover/bundle:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              )}

              {/* Relocated Impact Section (Vertical Card Design) */}
              {product.whatItHelpsWith && product.whatItHelpsWith.length > 0 && (
                <div className="mb-12 flex flex-wrap gap-4">
                  {product.whatItHelpsWith.map((benefit, i) => (
                    <BenefitTag key={i} benefit={benefit} />
                  ))}
                </div>
              )}

              <div className="flex flex-col gap-4">
                {product.blanxerLink ? (
                  <a
                    href={product.blanxerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-5 rounded-full font-body font-black text-sm tracking-[0.2em] uppercase transition-all bg-brand-yellow text-black hover:bg-brand-yellow/90 shadow-xl active:scale-[0.98] flex items-center justify-center gap-2 group/buy"
                  >
                     <ShoppingBasket className="w-5 h-5 mr-2 transition-transform group-hover/buy:scale-110" strokeWidth={1.5} />
                     Buy Now
                  </a>
                ) : (
                  <a
                    href={`mailto:socials@sunflowerpetals.toys?subject=Inquiry for ${product.name}&body=Hello Sunflower Petals team,%0D%0A%0D%0AI am interested in learning more about the ${product.name} (${product.categoryName}).%0D%0A%0D%0A[Please add your inquiry here]%0D%0A%0D%0ARegards,`}
                    className="w-full py-5 rounded-full font-body font-black text-sm tracking-[0.2em] uppercase transition-all bg-black text-white hover:bg-neutral-800 shadow-xl active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                     <MessageCircle className="w-5 h-5 mr-2" strokeWidth={1.5} />
                     {/* <Heart className="w-4 h-4 ml-2" strokeWidth={1.5} /> */}
                     Inquire Now
                  </a>
                )}
                <div className="flex items-center justify-center gap-8 py-4 px-4 border border-black/5 rounded-3xl bg-white/50">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500">
                    <Package className="w-4 h-4 text-brand-yellow" strokeWidth={1.5} />
                    Fast Delivery
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500">
                    <RotateCcw className="w-4 h-4 text-brand-yellow" strokeWidth={1.5} />
                    Easy Returns
                  </div>
                </div>
              </div>
            </div>

            {/* Accordion Narrative */}
            <div className="mt-16 space-y-2 border-t border-black/5">
              {product.whyWeLoveIt && product.whyWeLoveIt.length > 0 && (
                <Accordion title="Why we Love It" icon={<Heart className="w-6 h-6" strokeWidth={1.5} />} defaultOpen>
                  <ul className="space-y-4">
                    {product.whyWeLoveIt.map((point, i) => (
                      <li key={i} className="flex gap-4 items-start group/point">
                         <span className="w-5 h-5 rounded-full bg-brand-yellow/10 text-brand-yellow flex items-center justify-center font-bold text-[10px] shrink-0 group-hover/point:scale-110 transition-transform mt-0.5">
                            <CheckCircle2 className="w-3 h-3" strokeWidth={1.5} />
                         </span>
                         <p className="font-body text-neutral-600 text-sm leading-relaxed">{point}</p>
                      </li>
                    ))}
                  </ul>
                </Accordion>
              )}
              {product.productInfo && (
                <Accordion title="The Details" icon={<FileText className="w-6 h-6" strokeWidth={1.5} />} defaultOpen={!product.whyWeLoveIt}>
                  <div className="space-y-1">
                    {Object.entries(product.productInfo)
                      .filter(([key]) => key.toLowerCase() !== "disclaimer")
                      .map(([key, value]) => (
                        <div key={key} className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-6 text-sm py-3 border-b border-black/5 last:border-0">
                          <span className="font-bold text-black uppercase tracking-widest text-[10px] sm:w-32 shrink-0 pt-0.5">{key}</span>
                          <span className="text-neutral-600 sm:text-right flex-1 text-sm leading-relaxed">{value}</span>
                        </div>
                      ))}

                    {product.productInfo.Disclaimer && (
                      <div className="mt-6 p-5 rounded-2xl bg-neutral-100/70 text-xs text-neutral-500 leading-relaxed font-body">
                        <span className="font-bold text-black uppercase tracking-widest text-[9px] block mb-1.5">
                          Disclaimer
                        </span>
                        {product.productInfo.Disclaimer}
                      </div>
                    )}
                  </div>
                </Accordion>
              )}
            </div>
          </div>
        </div>

        {/* ── Product Playbook Section ── */}
        <div className="mt-48 pt-32 border-t border-black/5 relative pb-32">
          <div className="flex flex-col lg:flex-row gap-24 relative">
            
            {/* Sidebar Navigation */}
            <aside className="lg:w-[30%] lg:sticky lg:top-[180px] lg:h-fit">
              <div className="bg-neutral-50/50 rounded-[2.5rem] p-10 border border-black/5">
                <span className="font-body text-[10px] font-black uppercase tracking-[0.4em] text-neutral-300 mb-8 block">
                  Inside this Playbook
                </span>
                
                <nav className="flex flex-col gap-2">
                  {[
                    { id: "how-to-use", label: "How to Use", icon: Layers, show: !!(product.howToUse && product.howToUse.length > 0) },
                    { id: "reviews", label: "Reviews", icon: Star, show: !!((product.reviews && product.reviews.length > 0) || (product.testimonials && product.testimonials.length > 0)) },
                  ]
                  .filter(link => link.show)
                  .map((link) => (
                    <button
                      key={link.id}
                      onClick={() => {
                        sectionRefs.current[link.id]?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
                        activeSection === link.id
                          ? "bg-white text-black shadow-sm ring-1 ring-black/5" 
                          : "text-neutral-400 hover:text-black hover:translate-x-1"
                      }`}
                    >
                      <link.icon className={`w-4 h-4 transition-colors ${activeSection === link.id ? "text-brand-yellow" : "text-neutral-300"}`} strokeWidth={1.5} />
                      <span className="font-heading text-sm text-left">{link.label}</span>
                    </button>
                  ))}
                </nav>
                
                <div className="mt-12 p-6 bg-brand-yellow/5 rounded-3xl border border-brand-yellow/10">
                    <p className="font-body text-[10px] leading-relaxed text-neutral-500 italic">
                       &quot;Our playbooks are designed to turn sensory tools into long-term developmental outcomes.&quot;
                    </p>
                </div>
              </div>
            </aside>

            {/* Content Column */}
            <div className="lg:w-[70%] space-y-32">
              
              {/* How to Use Section */}
              {product.howToUse && product.howToUse.length > 0 && (
                <section 
                  id="how-to-use" 
                  ref={el => { sectionRefs.current["how-to-use"] = el; }}
                  className="scroll-mt-48"
                >
                  <header className="mb-12">
                    <span className="font-body text-[11px] font-black uppercase tracking-[0.3em] text-[#78BFE0] mb-4 block">How to Use</span>
                    <h2 className="font-heading text-4xl md:text-5xl text-black leading-tight mb-8">
                       Tactile focus <span className="italic">techniques</span>
                    </h2>
                    <ul className="space-y-6">
                      {product.howToUse.map((step, i) => (
                        <li key={i} className="flex gap-6 items-start group">
                           <span className="w-8 h-8 rounded-full bg-brand-yellow/10 text-brand-yellow flex items-center justify-center font-bold text-xs shrink-0 group-hover:scale-110 transition-transform">
                              {i + 1}
                           </span>
                           <p className="font-body text-neutral-600 leading-relaxed text-[1.05rem] pt-1">{step}</p>
                        </li>
                      ))}
                    </ul>
                    {/* <MediaPlaceholder title="How to Use (Video)" type="video" /> */}
                  </header>
                </section>
              )}

              {/* Reviews Section (Consolidated Testimonials & Ratings) */}
              {((product.testimonials && product.testimonials.length > 0) || (product.reviews && product.reviews.length > 0)) && (
                <section 
                  id="reviews" 
                  ref={el => { sectionRefs.current["reviews"] = el; }}
                  className="scroll-mt-48"
                >
                  <header className="mb-12">
                    <span className="font-body text-[11px] font-black uppercase tracking-[0.3em] text-[#78BFE0] mb-4 block">Reviews</span>
                    <h2 className="font-heading text-4xl md:text-5xl text-black leading-tight mb-12">
                       Real feedback, <span className="italic text-brand-yellow">real impact</span>
                    </h2>

                    <div className="space-y-12">
                      {/* Featured Testimonials (Quotes) */}
                      {product.testimonials && product.testimonials.length > 0 && (
                        <div className="space-y-8">
                          {product.testimonials.map((t, i) => (
                            <div key={i} className="p-10 bg-[#171717] rounded-[3rem] text-white relative overflow-hidden group">
                               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 rounded-full blur-[60px] group-hover:bg-brand-yellow/20 transition-colors" />
                               <p className="font-body text-xl md:text-2xl leading-relaxed mb-6 italic opacity-90 relative z-10">
                                   &quot;{t.text}&quot;
                                </p>
                                <div className="flex items-center gap-4 relative z-10">
                                  <div className="w-12 h-12 rounded-full bg-brand-yellow/20 flex items-center justify-center font-heading text-brand-yellow">
                                    {t.name[0]}
                                  </div>
                                  <div>
                                    <h4 className="font-heading text-sm">{t.name}</h4>
                                    <p className="font-body text-[10px] uppercase tracking-widest text-neutral-500 font-bold">{t.role}</p>
                                  </div>
                                </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Individual Rating Reviews */}
                      {product.reviews && product.reviews.length > 0 && (
                        <div className="grid md:grid-cols-2 gap-6">
                           {product.reviews.map((r, i) => (
                             <div key={i} className="p-8 border border-black/5 rounded-[2.5rem] bg-white shadow-sm hover:shadow-xl transition-all duration-500">
                                <div className="flex gap-1 mb-4">
                                   {[...Array(r.rating)].map((_, i) => (
                                     <Star key={i} className="w-3 h-3 fill-brand-yellow text-brand-yellow" />
                                   ))}
                                </div>
                                <p className="font-body text-sm text-neutral-600 leading-relaxed mb-4 italic">&quot;{r.text}&quot;</p>
                                <span className="font-heading text-xs text-black">{r.user}</span>
                             </div>
                           ))}
                        </div>
                      )}
                    </div>
                  </header>
                </section>
              )}
            </div>
          </div>
        </div>

        {/* ── Related Products Section ── */}
        <div className="mt-32 md:mt-48 pt-24 border-t border-black/5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl text-black leading-tight mb-4">
                You might <span className="italic text-brand-yellow">also</span> love
              </h2>
              <div className="h-[1px] w-32 bg-brand-yellow" />
            </div>
            <Link 
              href="/#collections" 
              className="font-body text-xs font-black uppercase tracking-[0.3em] text-neutral-400 hover:text-black transition-colors flex items-center gap-2 group"
            >
              See All Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
            </Link>
          </div>

          <div className="flex md:grid overflow-x-auto snap-x snap-mandatory no-scrollbar md:grid-cols-3 gap-6 md:gap-10 -mx-[10vw] md:mx-0 px-[10vw] md:px-0 pb-10 md:pb-0">
            {relatedProducts.map((p, idx) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group w-[80vw] sm:w-[50vw] md:w-auto shrink-0 snap-center"
                >
                  <Link href={`/products/${p.id}`} className="block">
                    <div className="relative aspect-[4/5] bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-black/5 mb-6 transition-all duration-500 group-hover:shadow-brand-yellow/10 group-hover:-translate-y-2">
                       <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity" style={{ backgroundColor: p.color }} />
                       <div className="relative w-full h-full">
                          <Image src={p.image || "/clicky-clacky.png"} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3" />
                       </div>
                    </div>
                    <div className="px-2">
                       <span className="font-body text-[10px] font-black uppercase tracking-widest text-neutral-300 mb-2 block">{p.categoryName}</span>
                       <h3 className="font-heading text-xl text-black group-hover:text-brand-yellow transition-colors truncate">{p.name}</h3>
                       <p className="font-body font-bold text-sm text-black mt-1">{p.price}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
  );
}

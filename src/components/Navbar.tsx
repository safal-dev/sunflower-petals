"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { topOffset } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isStoryPage = pathname === '/story';


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);


  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "The Journey", href: "/story" },
    { label: "Our Brands", href: "/brands" },
    { label: "EFL", href: "/efl" },
    { label: "Our Roots", href: "/about" },
    { label: "Say Hello", href: "/contact" },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      <nav 
        aria-label="Main Navigation"
        className={`
          w-full flex items-center justify-between transition-all duration-300 z-[100] fixed left-0
          ${(isScrolled || isStoryPage)
            ? 'py-4 px-6 md:px-8 lg:px-12 xl:px-[10%] bg-white/95 backdrop-blur-md shadow-sm border-b border-black/5' 
            : 'py-8 px-6 md:px-8 lg:px-12 xl:px-[10%] bg-transparent'
          }
        `}
        style={{ top: topOffset }}
      >
        <Link href="/" className="relative w-40 h-10 z-[101]">
          <Image 
            src="/main-logo.png" 
            alt="Sunflower Petals" 
            fill 
            className="object-contain object-left" 
          />
        </Link>
        
        <ul className="hidden lg:flex items-center gap-4 xl:gap-8 text-[0.95rem] xl:text-[1.1rem] font-medium text-black relative">
          {navLinks.map((link, i) => {
            const isLast = i === navLinks.length - 1;
            const isActive = pathname === link.href;
            return (
              <li key={link.label}>
                <Link 
                  href={link.href} 
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  aria-current={isActive ? "page" : undefined}
                  className={`
                    relative py-2 px-4 transition-all duration-300 font-body tracking-tight flex items-center justify-center
                    ${isActive ? 'text-brand-yellow font-bold' : ''}
                    ${isLast ? 'bg-black text-white hover:bg-brand-yellow hover:text-black rounded-full px-8 py-3 ml-4 shadow-lg shadow-black/5 hover:shadow-brand-yellow/20 font-medium' : 'hover:text-brand-yellow'}
                  `}
                >
                  <span className="relative z-10">{link.label}</span>
                  {!isLast && (hoveredIndex === i || isActive) && (
                    <motion.div
                      layoutId="hoverIndicator"
                      className="absolute inset-0 bg-brand-yellow/5 rounded-full -z-0"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {!isLast && (hoveredIndex === i || isActive) && (
                    <motion.div
                      layoutId="petalDot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-yellow"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden z-[101] w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <motion.span 
            animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 7.5 : 0 }}
            className="w-8 h-[2px] bg-black rounded-full block"
          />
          <motion.span 
            animate={{ opacity: isMenuOpen ? 0 : 1 }}
            className="w-8 h-[2px] bg-black rounded-full block"
          />
          <motion.span 
            animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -7.5 : 0 }}
            className="w-8 h-[2px] bg-black rounded-full block"
          />
        </button>
      </nav>

      {/* Full-screen Mobile Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[90] bg-[#FDF6F8] flex flex-col items-center justify-center lg:hidden"
          >
            <ul className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  {(() => {
                    const isLast = i === navLinks.length - 1;
                    const isActive = pathname === link.href;
                    return (
                      <Link 
                        href={link.href} 
                        onClick={() => setIsMenuOpen(false)}
                        aria-current={isActive ? "page" : undefined}
                        className={`
                          font-heading text-4xl sm:text-5xl transition-colors relative group block
                          ${isActive ? 'text-brand-yellow' : ''}
                          ${isLast ? 'bg-black text-white px-10 py-5 rounded-full mt-6 scale-90 active:scale-95 transition-transform' : 'text-black hover:text-brand-yellow'}
                        `}
                      >
                        {link.label}
                        {!isLast && (
                          <motion.div 
                            className={`absolute -bottom-2 left-0 h-1 bg-brand-yellow transition-all duration-500 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                          />
                        )}
                      </Link>
                    )
                  })()}
                </motion.li>
              ))}
            </ul>

            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-48 opacity-[0.03] pointer-events-none">
              <Image src="/hero-graphic.svg" alt="" fill className="object-contain grayscale" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

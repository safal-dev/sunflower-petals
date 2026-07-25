"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const LINK_COLUMNS = [
  {
    heading: "The Framework",
    accent: "#FACC15",  // brand yellow
    links: [
      { label: "EFL — Essentials for Living", href: "/efl" },
      { label: "Early Foundational Learning", href: "/early-foundational-learning" },
      { label: "Activities of Daily Living", href: "/adl" },
      { label: "Instrumental Activities of Daily Living", href: "/iadl" },
    ],
  },
  {
    heading: "Explore",
    accent: "#A3A3A3",
    links: [
      { label: "Products", href: "/products" },
      { label: "The Journey", href: "/story" },
      { label: "Our Brands", href: "/brands" },
      { label: "Our Roots", href: "/about" },
      { label: "FAQ", href: "/#faq" },
      { label: "Say Hello", href: "/contact" },
    ],
  },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/sunflowerpetals.toys?igsh=dDI1dTdwejhoZ293",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/sunflowerpetals/about/?viewAsMember=true",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1YK5HSikPG/?mibextid=wwXIfr",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const pathname = usePathname();
  const isContactPage = pathname === "/contact";

  return (
    <>
      {/* Visual spacer — maintains room for the overlapping CTA card */}
      {!isContactPage && (
        <div className="w-full h-32 md:h-[26rem] bg-[#FAF9F6] pointer-events-none" />
      )}

      <footer className="relative w-full bg-black text-white pt-0 pb-0" id="contact">

        {/* ── CTA card — overlaps from above ── */}
        {!isContactPage && (
          <div className="relative px-8 md:px-[10%] -mt-32 md:-mt-[10rem] z-20 pb-16 md:pb-20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative">

              {/* Yellow card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-[60%] bg-brand-yellow rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 shadow-2xl shadow-black/30 relative z-10 overflow-hidden"
              >
                <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-2xl">
                  <h2 className="font-heading text-black text-[2.2rem] md:text-[clamp(2rem,4vw,3rem)] leading-tight mb-4 md:whitespace-nowrap">
                    Let&apos;s grow together.
                  </h2>
                  <p className="font-body text-black/80 text-base md:text-xl leading-relaxed">
                    We&apos;re here to help you find the perfect sensory tools for your journey.
                  </p>
                </div>
                <Link href="/contact">
                  <button className="bg-black text-white px-12 py-4 rounded-full font-body font-bold text-base md:text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/20 whitespace-nowrap">
                    Let&apos;s Chat
                  </button>
                </Link>
              </motion.div>

              {/* Foot graphic */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="hidden md:block w-[65%] absolute -right-[16.4%] top-1/2 -translate-y-[65%] h-[200%] z-0 pointer-events-none"
              >
                <Image
                  src="/foot-graphic.svg"
                  alt="Character"
                  fill
                  sizes="65vw"
                  className="object-contain object-right drop-shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        )}

        {/* ── Main footer body ── */}
        <div className="px-8 md:px-[10%] pt-16 pb-12 border-t border-white/10">

          {/* Top row: logo block + link columns */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-12 md:gap-16 mb-16">

            {/* Brand column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6 max-w-xs"
            >
              <Link href="/" className="relative inline-block w-40 h-10">
                <Image
                  src="/main-logo.png"
                  alt="Sunflower Petals"
                  fill
                  sizes="160px"
                  className="object-contain object-left brightness-0 invert"
                />
              </Link>
              <p className="font-body text-sm text-white/40 leading-relaxed group -mb-2">
                An initiative under the umbrella of:
              </p>
              <div className="flex items-center gap-6 mt-1">
                <Link href="/institute" className="opacity-70 hover:opacity-100 transition-opacity">
                  <div className="relative w-24 h-12">
                    <Image
                      src="/SIA.svg"
                      alt="Sunflower Institute for Autism"
                      fill
                      sizes="96px"
                      className="object-contain brightness-0 invert"
                    />
                  </div>
                </Link>
                <Link href="/foundation" className="opacity-70 hover:opacity-100 transition-opacity pl-4 border-l border-white/10">
                  <div className="relative w-24 h-12">
                    <Image
                      src="/GSF.svg"
                      alt="Golden Sunflower Foundation"
                      fill
                      sizes="96px"
                      className="object-contain brightness-0 invert"
                    />
                  </div>
                </Link>
              </div>
              <p className="font-body text-sm text-white/30 leading-relaxed max-w-[280px]">
                Empowering neurodiverse children through mindful play and purposeful tools — made by parents, for families.
              </p>

              {/* Socials */}
              <div className="flex gap-3 pt-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-10 h-10 border border-white/15 rounded-full flex items-center justify-center text-white/40 hover:border-brand-yellow hover:text-brand-yellow transition-all duration-200"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Link columns */}
            {LINK_COLUMNS.map((col, colIdx) => (
              <motion.div
                key={col.heading}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + colIdx * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col gap-5 min-w-[180px]"
              >
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: col.accent }} aria-hidden="true" />
                  <h3
                    className="font-body text-[10px] uppercase tracking-[0.4em] font-bold"
                    style={{ color: col.accent }}
                  >
                    {col.heading}
                  </h3>
                </div>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-body text-sm text-white/50 hover:text-white transition-colors duration-200 leading-snug block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* ── Bottom bar ── */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
            <p className="font-body text-white/25 text-xs">
              © {new Date().getFullYear()} Sunflower Petals. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="font-body text-white/25 text-xs hover:text-white/60 transition-colors">Privacy Policy</a>
              <a href="#" className="font-body text-white/25 text-xs hover:text-white/60 transition-colors">Terms of Service</a>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}

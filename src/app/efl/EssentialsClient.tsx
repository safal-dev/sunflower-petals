"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart, Star, ArrowRight, ChevronDown, Sparkles,
  Home, MessageCircle, Utensils, ShowerHead, Clock, Users, CheckCircle2
} from "lucide-react";

// ── The 7 EFL Domains (Essentials for Living framework) ──────────────────────
const DOMAINS = [
  {
    icon: <MessageCircle className="w-7 h-7" strokeWidth={1.5} />,
    number: "01",
    title: "Communication",
    tagline: "Every voice deserves to be heard.",
    color: "bg-sky-50 text-sky-600 border-sky-100",
    accent: "#0284C7",
    bg: "#EFF8FF",
    description:
      "Communication is more than words. EFL recognises all forms — pointing, gesturing, pictures, AAC devices, signs, approximations, and yes, speech too. The goal is a reliable way for your child to express needs, wants, and feelings.",
    examples: ["PECS & picture cards", "AAC device support", "Sign language basics", "Requesting & refusing"],
  },
  {
    icon: <CheckCircle2 className="w-7 h-7" strokeWidth={1.5} />,
    number: "02",
    title: "Self-Care & Hygiene",
    tagline: "Independence starts with the basics.",
    color: "bg-teal-50 text-teal-600 border-teal-100",
    accent: "#0D9488",
    bg: "#F0FDFA",
    description:
      "Toileting, washing hands, brushing teeth, dressing — these daily routines are not just practical, they are confidence-builders. EFL breaks them into manageable, repeatable steps that children can own.",
    examples: ["Visual task sequences", "Toileting independence", "Dressing routines", "Hand-washing protocols"],
  },
  {
    icon: <Utensils className="w-7 h-7" strokeWidth={1.5} />,
    number: "03",
    title: "Eating & Mealtime",
    tagline: "Nourishment without anxiety.",
    color: "bg-orange-50 text-orange-600 border-orange-100",
    accent: "#EA580C",
    bg: "#FFF7ED",
    description:
      "Mealtimes can be a significant stress point for families. EFL addresses food refusal, sensory aversions, utensil use, and mealtime behaviour — building positive associations with food and the table.",
    examples: ["Food chaining strategies", "Utensil grading", "Sensory-safe mealtimes", "Social eating skills"],
  },
  {
    icon: <Home className="w-7 h-7" strokeWidth={1.5} />,
    number: "04",
    title: "Home Living",
    tagline: "Contributing to the family.",
    color: "bg-amber-50 text-amber-600 border-amber-100",
    accent: "#D97706",
    bg: "#FFFBEB",
    description:
      "Tidying up, putting items away, helping to prepare a meal — participation in home life builds belonging and competence. EFL introduces chores and responsibilities in structured, age-appropriate ways.",
    examples: ["Simple chore sequences", "Tidying routines", "Kitchen participation", "Sorting & organising"],
  },
  {
    icon: <Users className="w-7 h-7" strokeWidth={1.5} />,
    number: "05",
    title: "Social Skills",
    tagline: "Connection on your child's terms.",
    color: "bg-violet-50 text-violet-600 border-violet-100",
    accent: "#7C3AED",
    bg: "#F5F3FF",
    description:
      "Greetings, joint attention, turn-taking, play skills — social development in EFL is never forced or scripted. It is a gentle unfolding, at the child's pace, celebrating every genuine moment of connection.",
    examples: ["Greeting routines", "Turn-taking games", "Parallel & cooperative play", "Name response skills"],
  },
  {
    icon: <Clock className="w-7 h-7" strokeWidth={1.5} />,
    number: "06",
    title: "Community & Safety",
    tagline: "Navigating the wider world.",
    color: "bg-rose-50 text-rose-600 border-rose-100",
    accent: "#E11D48",
    bg: "#FFF1F2",
    description:
      "Crossing a road safely, waiting in a queue, understanding strangers — community skills give your child broader independence. EFL prepares them for real-world environments in structured, graduated steps.",
    examples: ["Road safety routines", "Waiting & queuing", "Public behaviour expectations", "Emergency recognition"],
  },
  {
    icon: <Sparkles className="w-7 h-7" strokeWidth={1.5} />,
    number: "07",
    title: "Leisure & Play",
    tagline: "Play is the work of childhood.",
    color: "bg-green-50 text-green-600 border-green-100",
    accent: "#16A34A",
    bg: "#F0FDF4",
    description:
      "Leisure skills are often overlooked, yet play a critical role in quality of life. EFL builds a rich repertoire of appropriate, enjoyable activities — from sensory play to board games to outdoor exploration.",
    examples: ["Independent play skills", "Sensory play routines", "Hobby development", "Leisure scheduling"],
  },
];

const FAQS = [
  {
    q: "What does 'Essentials for Living' actually mean?",
    a: "Essentials for Living (EFL) is an evidence-based behaviour analytic curriculum designed to build the real-life skills that matter most — the skills every person needs to live, work, and connect. It focuses on functional, meaningful learning rather than academic or rote tasks.",
  },
  {
    q: "Is EFL (Essentials for Living) the same as the book by Patrick McGreevy?",
    a: "The EFL framework at Petals is inspired by the principles of the Essentials for Living curriculum developed by Patrick McGreevy, Joyce Fry, and Carol Cornwall. We apply its philosophy of functional skill-building within a family-centred, home-based context.",
  },
  {
    q: "How is EFL different from traditional ABA?",
    a: "While EFL is rooted in applied behaviour analysis, it focuses almost exclusively on functional, life-skills outcomes rather than compliance-based or academic targets. The emphasis is on dignity, choice, and real-world independence.",
  },
  {
    q: "At what age can EFL principles be introduced?",
    a: "EFL principles can begin from toddlerhood. Many families start with communication (requesting) and basic self-care as early as 18–24 months. The framework scales across all ages and ability levels.",
  },
  {
    q: "How do Petals products connect to EFL?",
    a: "Every Petals product is purposely designed around at least one EFL domain. Cliky Claky supports sensory regulation (a prerequisite for all learning). DayDay supports home living and self-care routines. NumSum supports communication, play, and early academic readiness.",
  },
];

export default function EssentialsForLivingClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeDomain, setActiveDomain] = useState<number | null>(null);

  return (
    <main className="relative w-full bg-[#FAF9F6] overflow-hidden">

      {/* ── Hero ── */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-8 md:px-[12%] pt-36 pb-28 overflow-hidden">
        {/* Warm gradient blobs */}
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-brand-yellow/20 blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-green-100/40 blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-brand-yellow/20 border border-brand-yellow/40 text-black text-xs uppercase tracking-[0.3em] font-body font-bold px-5 py-2 rounded-full"
          >
            <Heart className="w-3.5 h-3.5" strokeWidth={2} />
            The Philosophy Behind Petals
          </motion.div>

          <h1 className="font-heading text-[clamp(3rem,9vw,8.5rem)] leading-[0.85] tracking-tighter text-black">
            Essentials<br />
            <span className="italic text-brand-yellow">for Living.</span>
          </h1>

          <p className="font-body text-lg md:text-2xl text-neutral-500 max-w-2xl leading-relaxed">
            The seven domains of real-world independence that every child deserves to develop — at their own pace, in their own way, supported by the people who love them most.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center mt-2"
          >
            <Link
              href="/products"
              className="font-body text-sm bg-black text-white px-8 py-4 rounded-full hover:bg-brand-yellow hover:text-black transition-all duration-300 flex items-center gap-2"
            >
              Explore Products <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/story"
              className="font-body text-sm border border-black/20 text-black px-8 py-4 rounded-full hover:border-brand-yellow hover:bg-brand-yellow/5 transition-all duration-300"
            >
              Our Story
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-neutral-300"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* ── What is EFL? ── */}
      <section className="px-8 md:px-[10%] py-20 md:py-28">
        <div className="max-w-[900px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-10"
          >
            <div className="flex flex-col gap-4">
              <span className="font-body text-[10px] uppercase tracking-[0.5em] text-brand-yellow font-black">The Framework</span>
              <h2 className="font-heading text-4xl md:text-6xl text-black leading-tight">
                What is <span className="italic text-brand-yellow">EFL?</span>
              </h2>
              <div className="h-[3px] w-20 bg-brand-yellow rounded-full" />
            </div>

            <div className="flex flex-col gap-6 font-body text-lg md:text-xl text-neutral-600 leading-relaxed">
              <p className="first-letter:text-6xl first-letter:font-heading first-letter:mr-3 first-letter:float-left first-letter:text-black first-letter:leading-none">
                Essentials for Living is a functional, research-grounded framework for building the skills that matter most in real life. Unlike academic curricula, EFL asks not &ldquo;What can this child recite?&rdquo; but &ldquo;What does this child need to live well, independently, and with dignity?&rdquo;
              </p>
              <p>
                Developed from applied behaviour analytic research and field-tested with thousands of children and adults with complex needs, EFL organises learning into <span className="text-black font-semibold italic">seven essential domains</span> — from communication to community safety — each broken into small, achievable, meaningful steps.
              </p>
              <p>
                At Petals, EFL is not a curriculum we follow. It is a lens through which every product is designed. Every tool we create is grounded in at least one EFL domain, because we believe the goal of childhood intervention is not a test score — it is a life well-lived.
              </p>
              <blockquote className="border-l-4 border-brand-yellow pl-6 text-black font-semibold italic text-xl md:text-2xl">
                &ldquo;The goal is not compliance. The goal is a life worth living.&rdquo;
                <footer className="mt-2 text-sm font-normal text-neutral-500 not-italic">— EFL Philosophy</footer>
              </blockquote>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 7 Domains — interactive cards ── */}
      <section className="py-20 md:py-28 px-8 md:px-[10%] bg-[#F5F2EC]">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 flex flex-col gap-4"
          >
            <span className="font-body text-[10px] uppercase tracking-[0.5em] text-brand-yellow font-black">Seven Domains</span>
            <h2 className="font-heading text-4xl md:text-6xl text-black leading-tight">
              The essentials, <span className="italic">defined.</span>
            </h2>
            <p className="font-body text-lg text-neutral-500 max-w-xl leading-relaxed">
              Click any domain to explore what it means in practice.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DOMAINS.map((domain, idx) => {
              const isOpen = activeDomain === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  viewport={{ once: true }}
                  onClick={() => setActiveDomain(isOpen ? null : idx)}
                  className="bg-white rounded-[2rem] overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer group"
                  style={{ gridColumn: isOpen && idx === 6 ? "1 / -1" : undefined }}
                >
                  {/* Card header — always visible */}
                  <div
                    className="p-7 flex items-start gap-5"
                    style={{ backgroundColor: isOpen ? domain.bg : "white" }}
                  >
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 ${domain.color} ${isOpen ? "scale-110" : "group-hover:scale-105"}`}>
                      {domain.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-1">{domain.number}</p>
                      <h3 className="font-heading text-xl text-black leading-snug">{domain.title}</h3>
                      <p className="font-body text-sm italic mt-1" style={{ color: domain.accent }}>{domain.tagline}</p>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 mt-1"
                    >
                      <ChevronDown className="w-4 h-4 text-neutral-400" />
                    </motion.div>
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                        style={{ backgroundColor: domain.bg }}
                      >
                        <div className="px-7 pb-7 flex flex-col gap-5">
                          <p className="font-body text-base text-neutral-600 leading-relaxed">{domain.description}</p>
                          <div>
                            <p className="font-body text-[10px] uppercase tracking-widest mb-3" style={{ color: domain.accent }}>
                              In practice
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {domain.examples.map((ex) => (
                                <span key={ex} className="font-body text-xs px-3 py-1.5 rounded-full border" style={{ borderColor: `${domain.accent}30`, color: domain.accent, backgroundColor: `${domain.accent}08` }}>
                                  {ex}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why EFL at home ── */}
      <section className="px-8 md:px-[10%] py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[400px] md:h-[560px] rounded-[3rem] overflow-hidden shadow-2xl -rotate-1 hover:rotate-0 transition-transform duration-700"
          >
            <Image src="/story/anything_is_usable.jpeg" alt="Everyday objects used for EFL learning" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 bg-black/60 backdrop-blur-md p-6 rounded-2xl text-white border border-white/10">
              <p className="text-xs uppercase tracking-widest font-body text-brand-yellow mb-2">EFL at Home</p>
              <h4 className="font-heading text-xl">Anything is a learning tool. The home is the classroom.</h4>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div>
              <span className="font-body text-[10px] uppercase tracking-[0.5em] text-brand-yellow font-black">Why Home?</span>
              <h2 className="font-heading text-4xl md:text-5xl text-black leading-tight mt-3">
                Real skills are learned in <span className="italic">real places.</span>
              </h2>
            </div>
            <div className="flex flex-col gap-5 font-body text-lg text-neutral-600 leading-relaxed">
              <p>
                A clinic can teach a child to request a preferred item. But the kitchen table, the bathroom, the backyard — these are where skills become <em>life</em>. EFL is designed to be embedded in the natural routines of everyday living.
              </p>
              <p>
                That is why Petals products are built for the home, not the clinic. We want every parent to feel equipped — not dependent on a professional present before learning can happen.
              </p>
              <p className="text-black font-medium italic">
                You, loving and present and consistent, are the most powerful intervention your child will ever have.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "7", label: "Life domains addressed by EFL" },
                { stat: "Home", label: "Where the most powerful EFL happens" },
                { stat: "All ages", label: "EFL principles scale across the lifespan" },
                { stat: "You", label: "The most important person in EFL" },
              ].map((item) => (
                <div key={item.stat} className="bg-brand-yellow/8 border border-brand-yellow/20 rounded-2xl p-5 flex flex-col gap-1">
                  <span className="font-heading text-2xl text-black">{item.stat}</span>
                  <span className="font-body text-xs text-neutral-500 leading-snug">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Petals + EFL connection ── */}
      <section className="bg-black text-white py-20 md:py-32 px-8 md:px-[10%] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(250,204,21,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(34,197,94,0.07),transparent_60%)]" />

        <div className="max-w-[1100px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 mb-16"
          >
            <span className="font-body text-[10px] uppercase tracking-[0.5em] text-brand-yellow font-black">The Connection</span>
            <h2 className="font-heading text-4xl md:text-6xl leading-tight">
              How Petals <span className="italic text-brand-yellow">lives</span> EFL.
            </h2>
            <p className="font-body text-lg text-white/60 max-w-2xl leading-relaxed">
              Every product in the Petals family maps directly to an EFL domain — not as a checkbox, but as a genuine expression of what we believe matters.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                brand: "Cliky Claky",
                domain: "Sensory Regulation",
                color: "#2563EB",
                text: "Before a child can learn anything, their nervous system needs to feel safe. Cliky Claky tools address the sensory prerequisites that underpin all EFL domains.",
                href: "/products",
              },
              {
                brand: "DayDay",
                domain: "Self-Care & Home Living",
                color: "#EA580C",
                text: "Visual schedules and structured routines that bring EFL's self-care and home living domains into daily practice — empowering children to own their day.",
                href: "/products",
              },
              {
                brand: "NumSum",
                domain: "Communication & Play",
                color: "#16A34A",
                text: "Games, stamps, sorting activities — NumSum targets communication, social, and leisure skills through joyful, child-led play rooted in EFL principles.",
                href: "/products",
              },
            ].map((item) => (
              <motion.div
                key={item.brand}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-[2rem] p-8 flex flex-col gap-5 hover:bg-white/10 transition-colors duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="font-heading text-lg text-white">{item.brand}</span>
                </div>
                <p className="font-body text-xs uppercase tracking-widest" style={{ color: item.color }}>{item.domain}</p>
                <p className="font-body text-sm text-white/60 leading-relaxed flex-1">{item.text}</p>
                <Link
                  href={item.href}
                  className="self-start font-body text-xs uppercase tracking-widest px-5 py-2 rounded-full border transition-all duration-200 hover:text-black hover:border-brand-yellow hover:bg-brand-yellow"
                  style={{ borderColor: `${item.color}50`, color: item.color }}
                >
                  Explore →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 md:py-32 px-8 md:px-[10%]">
        <div className="max-w-[800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4 mb-14"
          >
            <span className="font-body text-[10px] uppercase tracking-[0.5em] text-brand-yellow font-black">Questions</span>
            <h2 className="font-heading text-4xl md:text-5xl text-black leading-tight">
              Common <span className="italic">questions.</span>
            </h2>
          </motion.div>

          <div className="flex flex-col divide-y divide-black/8">
            {FAQS.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <span className="font-heading text-lg md:text-xl text-black pr-8 group-hover:text-brand-yellow transition-colors duration-200">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === idx ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-brand-yellow/10 transition-colors duration-200"
                  >
                    <ChevronDown className="w-4 h-4 text-neutral-500 group-hover:text-brand-yellow transition-colors" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="font-body text-base text-neutral-500 leading-relaxed pb-6 pr-12">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-8 md:px-[10%] py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-brand-yellow/10 border border-brand-yellow/30 rounded-[3rem] p-12 md:p-20 flex flex-col gap-6 items-center"
        >
          <Star className="w-8 h-8 text-brand-yellow" strokeWidth={1.5} />
          <h2 className="font-heading text-4xl md:text-5xl text-black leading-tight">
            Ready to put EFL <span className="italic text-brand-yellow">into practice?</span>
          </h2>
          <p className="font-body text-neutral-500 text-lg max-w-xl leading-relaxed">
            Every Petals product is an EFL tool for the home — designed by parents who have lived this, for parents who are beginning their journey.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <Link
              href="/products"
              className="font-body text-sm bg-black text-white px-8 py-4 rounded-full hover:bg-brand-yellow hover:text-black transition-all duration-300 flex items-center gap-2"
            >
              Shop Petals <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/early-foundational-learning"
              className="font-body text-sm border border-black/20 text-black px-8 py-4 rounded-full hover:border-brand-yellow hover:text-black transition-all duration-300"
            >
              Early Foundational Learning
            </Link>
          </div>
        </motion.div>
      </section>

    </main>
  );
}

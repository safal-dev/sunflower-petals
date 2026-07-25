"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart, ChefHat, Banknote, Phone, Pill, Car, Home, Brush,
  ArrowRight, ChevronDown, Star, Heart
} from "lucide-react";

// ── IADL Skill Areas ─────────────────────────────────────────────────────────
const IADL_SKILLS = [
  {
    icon: <ShoppingCart className="w-7 h-7" strokeWidth={1.5} />,
    number: "01",
    title: "Shopping & Errands",
    tagline: "Navigating the world beyond the front door.",
    accent: "#7C3AED",
    bg: "#F5F3FF",
    border: "#DDD6FE",
    description:
      "Writing a shopping list, navigating a supermarket, selecting items, queuing at the checkout, and managing change. Community shopping is a rich, complex skill that combines safety awareness, communication, sequencing, and social interaction — all simultaneously.",
    examples: ["Shopping list creation", "Supermarket navigation", "Self-checkout skills", "Budget awareness basics", "Carrying & packing purchases"],
    tip: "Start with one-item shopping trips in a familiar, low-stimulation store before expanding to full grocery shops.",
  },
  {
    icon: <ChefHat className="w-7 h-7" strokeWidth={1.5} />,
    number: "02",
    title: "Meal Preparation",
    tagline: "From ingredient to plate.",
    accent: "#EA580C",
    bg: "#FFF7ED",
    border: "#FED7AA",
    description:
      "Planning meals, reading simple recipes, using kitchen appliances safely, measuring ingredients, and preparing basic foods. Cooking skills build confidence, independence, and a positive relationship with food. They also provide rich sensory and fine motor opportunities.",
    examples: ["Safe knife skills grading", "Appliance operation sequences", "Simple recipe following", "Measuring & counting", "Meal planning basics"],
    tip: "Backward chaining works beautifully in cooking — let the child do the final satisfying step (serving their creation) first.",
  },
  {
    icon: <Banknote className="w-7 h-7" strokeWidth={1.5} />,
    number: "03",
    title: "Money & Finances",
    tagline: "The language of the marketplace.",
    accent: "#16A34A",
    bg: "#F0FDF4",
    border: "#A7F3D0",
    description:
      "Recognising coins and notes, understanding value and change, using a debit card, and managing a simple budget. Financial skills underpin community participation and are often neglected in early intervention — yet they are essential for adult independence.",
    examples: ["Coin & note identification", "Next-dollar strategy", "Debit card basics", "Simple budget awareness", "Price comparison skills"],
    tip: "The 'next-dollar' strategy (always pay with the next dollar up) is a highly effective and dignified real-world money skill.",
  },
  {
    icon: <Phone className="w-7 h-7" strokeWidth={1.5} />,
    number: "04",
    title: "Communication Technology",
    tagline: "Connecting, safely and confidently.",
    accent: "#0284C7",
    bg: "#EFF8FF",
    border: "#BAE6FD",
    description:
      "Using a phone or tablet to communicate, make calls, send messages, and access information safely. Digital communication is now an essential daily living skill — and for many children with autism, technology is also a primary AAC and connection tool.",
    examples: ["Making & receiving calls", "Text & messaging basics", "Safe internet use", "Emergency calling (000/911)", "AAC device & app management"],
    tip: "Teach emergency calling early and separately — it is a safety skill that should not depend on the child's broader communication level.",
  },
  {
    icon: <Pill className="w-7 h-7" strokeWidth={1.5} />,
    number: "05",
    title: "Medication & Health Management",
    tagline: "Caring for oneself with knowledge.",
    accent: "#E11D48",
    bg: "#FFF1F2",
    border: "#FECDD3",
    description:
      "Understanding one's own medications, knowing when and how to take them, communicating with medical professionals, and recognising when to seek help. As children grow toward adulthood, health self-advocacy becomes a critical independence skill.",
    examples: ["Medication identification", "Dosing schedules & reminders", "Doctor communication prep", "Health symptom recognition", "Appointment self-advocacy"],
    tip: "Photo-based medication schedules significantly reduce errors and build self-management habits.",
  },
  {
    icon: <Car className="w-7 h-7" strokeWidth={1.5} />,
    number: "06",
    title: "Transportation",
    tagline: "Getting from here to there.",
    accent: "#D97706",
    bg: "#FFFBEB",
    border: "#FDE68A",
    description:
      "Using public transport, crossing roads safely, following routes, and understanding traffic rules. Transportation independence massively expands the social, vocational, and community opportunities available to a young person with autism.",
    examples: ["Bus & train routines", "Road crossing safety", "Route following (maps & apps)", "Timetable reading", "What to do if lost"],
    tip: "Practise transport routes during low-demand times first — quiet buses on weekend mornings before school-morning peak hours.",
  },
  {
    icon: <Home className="w-7 h-7" strokeWidth={1.5} />,
    number: "07",
    title: "Home Maintenance",
    tagline: "Caring for the space where life happens.",
    accent: "#059669",
    bg: "#ECFDF5",
    border: "#A7F3D0",
    description:
      "Cleaning, laundry, basic home repairs, waste management, and caring for plants or pets. Household participation builds responsibility, belonging, and self-efficacy. Starting with simple, achievable chores creates a foundation for a lifetime of home independence.",
    examples: ["Laundry sequences", "Cleaning routines & schedules", "Bin & waste management", "Plant & pet care basics", "Basic home safety awareness"],
    tip: "Visual chore charts with photos of each step are far more effective than written lists for most children with autism.",
  },
  {
    icon: <Brush className="w-7 h-7" strokeWidth={1.5} />,
    number: "08",
    title: "Leisure & Recreation",
    tagline: "A fulfilling life includes joy.",
    accent: "#9333EA",
    bg: "#FAF5FF",
    border: "#E9D5FF",
    description:
      "Planning and initiating leisure activities, managing hobbies, pursuing interests, and organising social events. The ability to entertain oneself — to choose, initiate, and sustain a meaningful activity — is a profound IADL that is often underdeveloped and under-taught.",
    examples: ["Activity initiation skills", "Hobby development & scheduling", "Social event planning basics", "Managing screen time", "Joining community groups"],
    tip: "Leisure scheduling — a visual list of activities the child can choose from — prevents the 'nothing to do' spiral that often leads to meltdowns.",
  },
];

export default function IADLClient() {
  const [openSkill, setOpenSkill] = useState<number | null>(null);

  return (
    <main className="relative w-full bg-[#FAF9F6] overflow-hidden">

      {/* ── Hero ── */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-8 md:px-[12%] pt-36 pb-28 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-violet-100/40 blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-emerald-100/40 blur-[120px] pointer-events-none" />

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
            className="inline-flex items-center gap-2 bg-violet-50 border border-violet-200 text-violet-700 text-xs uppercase tracking-[0.3em] font-body font-bold px-5 py-2 rounded-full"
          >
            <Heart className="w-3.5 h-3.5" strokeWidth={2} />
            Community Independence
          </motion.div>

          <h1 className="font-heading text-[clamp(2.5rem,8vw,7.5rem)] leading-[0.85] tracking-tighter text-black">
            Instrumental<br />Activities of<br />
            <span className="italic text-violet-500">Daily Living.</span>
          </h1>

          <p className="font-body text-lg md:text-2xl text-neutral-500 max-w-2xl leading-relaxed">
            The higher-level life skills that enable independence in the community — shopping, cooking, managing money, using transport, and more.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center mt-2"
          >
            <Link
              href="/products"
              className="font-body text-sm bg-black text-white px-8 py-4 rounded-full hover:bg-violet-600 transition-all duration-300 flex items-center gap-2"
            >
              Explore Products <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/adl"
              className="font-body text-sm border border-black/20 text-black px-8 py-4 rounded-full hover:border-violet-400 hover:text-violet-600 transition-all duration-300"
            >
              Activities of Daily Living
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-neutral-300"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* ── What are IADLs? ── */}
      <section className="px-8 md:px-[10%] py-20 md:py-28">
        <div className="max-w-[900px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-10"
          >
            <div className="flex flex-col gap-4">
              <span className="font-body text-[10px] uppercase tracking-[0.5em] text-violet-500 font-black">The Concept</span>
              <h2 className="font-heading text-4xl md:text-6xl text-black leading-tight">
                What are <span className="italic text-violet-500">IADLs?</span>
              </h2>
              <div className="h-[3px] w-20 bg-violet-200 rounded-full" />
            </div>

            <div className="flex flex-col gap-6 font-body text-lg md:text-xl text-neutral-600 leading-relaxed">
              <p className="first-letter:text-6xl first-letter:font-heading first-letter:mr-3 first-letter:float-left first-letter:text-black first-letter:leading-none">
                Instrumental Activities of Daily Living are the complex, multi-step skills that enable a person to live independently in the community. Where ADLs address the body — bathing, dressing, eating — IADLs address the world: shopping, cooking, managing finances, using transport, and organising a home and social life.
              </p>
              <p>
                IADLs require the integration of multiple abilities simultaneously: planning and sequencing, communication, money management, safety judgement, and social flexibility. For children and young people with autism, these skills represent the frontier of independence — and they need to be explicitly and systematically taught.
              </p>
              <p>
                The earlier IADL foundations are laid, the more opportunity there is to build genuine community independence over time. Petals believes this work belongs in childhood — not as an afterthought, but as a central goal.
              </p>
              <blockquote className="border-l-4 border-violet-300 pl-6 text-black font-semibold italic text-xl md:text-2xl">
                &ldquo;The measure of independence is not what a person can do in a therapy room. It is what they can do on a Tuesday morning, alone in the world.&rdquo;
                <footer className="mt-2 text-sm font-normal text-neutral-500 not-italic">— IADL Philosophy</footer>
              </blockquote>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ADL vs IADL comparison ── */}
      <section className="bg-[#F5F2EC] px-8 md:px-[10%] py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 flex flex-col gap-3"
          >
            <span className="font-body text-[10px] uppercase tracking-[0.5em] text-violet-500 font-black">Understanding the Difference</span>
            <h2 className="font-heading text-3xl md:text-5xl text-black leading-tight">ADL vs IADL</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-sky-50 border border-sky-100 rounded-[2rem] p-8 flex flex-col gap-4"
            >
              <h3 className="font-heading text-2xl text-sky-700">ADL — Activities of Daily Living</h3>
              <p className="font-body text-sm text-neutral-600 leading-relaxed">Personal, body-focused self-care skills performed every day. Necessary for basic physical health and dignity.</p>
              <ul className="flex flex-col gap-2 mt-2">
                {["Bathing & grooming", "Dressing", "Eating & self-feeding", "Toileting", "Sleep routines"].map(item => (
                  <li key={item} className="font-body text-sm text-sky-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/adl" className="self-start font-body text-xs uppercase tracking-widest text-sky-600 border border-sky-200 px-4 py-2 rounded-full hover:bg-sky-600 hover:text-white hover:border-sky-600 transition-all duration-200 mt-2">
                Learn ADLs →
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-violet-50 border border-violet-100 rounded-[2rem] p-8 flex flex-col gap-4"
            >
              <h3 className="font-heading text-2xl text-violet-700">IADL — Instrumental Activities of Daily Living</h3>
              <p className="font-body text-sm text-neutral-600 leading-relaxed">Complex, community-oriented skills for independent living. Require planning, judgement, and multi-step sequencing.</p>
              <ul className="flex flex-col gap-2 mt-2">
                {["Shopping & errands", "Meal preparation", "Managing finances", "Using transport", "Home maintenance"].map(item => (
                  <li key={item} className="font-body text-sm text-violet-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <span className="self-start font-body text-xs uppercase tracking-widest text-violet-600 border border-violet-200 px-4 py-2 rounded-full bg-violet-100 mt-2">
                You are here
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 8 IADL skill areas ── */}
      <section className="py-20 md:py-28 px-8 md:px-[10%]">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 flex flex-col gap-4"
          >
            <span className="font-body text-[10px] uppercase tracking-[0.5em] text-violet-500 font-black">The Skills</span>
            <h2 className="font-heading text-4xl md:text-6xl text-black leading-tight">
              Eight domains of <span className="italic text-violet-500">community living.</span>
            </h2>
            <p className="font-body text-lg text-neutral-500 max-w-xl leading-relaxed">
              Click any domain to explore what it involves and how it is taught.
            </p>
          </motion.div>

          <div className="flex flex-col gap-3">
            {IADL_SKILLS.map((skill, idx) => {
              const isOpen = openSkill === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="rounded-[1.5rem] overflow-hidden border bg-white shadow-sm hover:shadow-md transition-all duration-300"
                  style={{ borderColor: isOpen ? skill.border : "#E5E7EB" }}
                >
                  <button
                    onClick={() => setOpenSkill(isOpen ? null : idx)}
                    className="w-full flex items-center gap-5 p-6 text-left group"
                    style={{ backgroundColor: isOpen ? skill.bg : "white" }}
                  >
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${skill.accent}15`, color: skill.accent }}
                    >
                      {skill.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-3">
                        <span className="font-heading text-[10px] tracking-widest" style={{ color: skill.accent }}>{skill.number}</span>
                        <h3 className="font-heading text-xl text-black">{skill.title}</h3>
                      </div>
                      <p className="font-body text-sm mt-0.5 italic" style={{ color: skill.accent }}>{skill.tagline}</p>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 text-neutral-400" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                        style={{ backgroundColor: skill.bg }}
                      >
                        <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="md:col-span-2 flex flex-col gap-4">
                            <p className="font-body text-base text-neutral-600 leading-relaxed">{skill.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {skill.examples.map((ex) => (
                                <span
                                  key={ex}
                                  className="font-body text-xs px-3 py-1.5 rounded-full border"
                                  style={{ borderColor: `${skill.accent}30`, color: skill.accent, backgroundColor: `${skill.accent}08` }}
                                >
                                  {ex}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div
                            className="rounded-2xl p-5 border"
                            style={{ borderColor: skill.border, backgroundColor: `${skill.accent}08` }}
                          >
                            <p className="font-body text-[10px] uppercase tracking-widest mb-2" style={{ color: skill.accent }}>Practitioner tip</p>
                            <p className="font-body text-sm text-neutral-600 leading-relaxed italic">&ldquo;{skill.tip}&rdquo;</p>
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

      {/* ── Dark section ── */}
      <section className="bg-black text-white py-20 md:py-24 px-8 md:px-[10%] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(124,58,237,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(250,204,21,0.07),transparent_60%)]" />
        <div className="max-w-[1100px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 mb-12"
          >
            <h2 className="font-heading text-4xl md:text-6xl leading-tight">
              IADLs are not &ldquo;advanced.&rdquo; <span className="italic text-violet-400">They are essential.</span>
            </h2>
            <p className="font-body text-lg text-white/60 max-w-2xl leading-relaxed">
              Too often, IADL teaching is deferred until adulthood. By then, years of learning opportunity have passed. The seeds of community independence are planted in childhood.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Start early", text: "IADL foundations — basic cooking, simple errands, money concepts — can begin in the toddler years through play-based activities." },
              { title: "Embed in real life", text: "The supermarket, the kitchen, the bus stop — these are the classrooms for IADLs. Teach there, not in a separate session." },
              { title: "Think longitudinally", text: "Each IADL skill takes years to fully develop. Begin the threads early and let them grow alongside the child." },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-[2rem] p-8 flex flex-col gap-4 hover:bg-white/10 transition-colors duration-300"
              >
                <h3 className="font-heading text-2xl text-white">{item.title}</h3>
                <p className="font-body text-sm text-white/60 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <Link
              href="/adl"
              className="font-body text-sm bg-violet-500 text-white px-8 py-4 rounded-full hover:bg-violet-400 transition-colors duration-300 flex items-center gap-2"
            >
              Also explore ADLs <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/efl"
              className="font-body text-sm border border-white/20 text-white px-8 py-4 rounded-full hover:bg-white/10 transition-colors duration-300"
            >
              The EFL Framework
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Image + stats ── */}
      <section className="px-8 md:px-[10%] py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[400px] md:h-[520px] rounded-[3rem] overflow-hidden shadow-2xl -rotate-1 hover:rotate-0 transition-transform duration-700"
          >
            <Image src="/story/pecs_collection.jpeg" alt="IADL communication and community skills" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-violet-900/70 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 bg-violet-900/70 backdrop-blur-md p-6 rounded-2xl text-white border border-white/10">
              <p className="text-xs uppercase tracking-widest font-body text-violet-300 mb-2">Communication as IADL</p>
              <h4 className="font-heading text-xl">Every card is a bridge to the community.</h4>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div>
              <span className="font-body text-[10px] uppercase tracking-[0.5em] text-violet-500 font-black">How Petals Helps</span>
              <h2 className="font-heading text-4xl md:text-5xl text-black leading-tight mt-3">
                IADL foundations, <span className="italic">built at home.</span>
              </h2>
            </div>
            <p className="font-body text-lg text-neutral-600 leading-relaxed">
              Petals products lay the groundwork for IADL independence long before formal skill instruction begins. Communication tools, sorting activities, and scheduling aids all build the cognitive and behavioural foundations that IADLs depend on.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "8", label: "IADL domains on this page", color: "#7C3AED" },
                { stat: "Community", label: "Where IADLs are ultimately practised", color: "#EA580C" },
                { stat: "Early", label: "When to begin building IADL foundations", color: "#16A34A" },
                { stat: "Life-wide", label: "IADLs matter at every age", color: "#0284C7" },
              ].map((item) => (
                <div key={item.stat} className="rounded-2xl p-5 flex flex-col gap-1 border" style={{ borderColor: `${item.color}20`, backgroundColor: `${item.color}08` }}>
                  <span className="font-heading text-2xl" style={{ color: item.color }}>{item.stat}</span>
                  <span className="font-body text-xs text-neutral-500 leading-snug">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-8 md:px-[10%] py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-violet-50 border border-violet-100 rounded-[3rem] p-12 md:p-20 flex flex-col gap-6 items-center"
        >
          <Star className="w-8 h-8 text-violet-400" strokeWidth={1.5} />
          <h2 className="font-heading text-4xl md:text-5xl text-black leading-tight">
            Ready to build toward <span className="italic text-violet-500">true independence?</span>
          </h2>
          <p className="font-body text-neutral-500 text-lg max-w-xl leading-relaxed">
            Explore Petals products grounded in EFL, ADL, and IADL principles — all designed for the home, by parents who understand the journey.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <Link
              href="/products"
              className="font-body text-sm bg-black text-white px-8 py-4 rounded-full hover:bg-violet-600 transition-all duration-300 flex items-center gap-2"
            >
              Shop Petals <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/adl"
              className="font-body text-sm border border-black/20 text-black px-8 py-4 rounded-full hover:border-violet-400 hover:text-violet-600 transition-all duration-300"
            >
              Activities of Daily Living
            </Link>
          </div>
        </motion.div>
      </section>

    </main>
  );
}

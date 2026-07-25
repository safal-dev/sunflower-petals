"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Brain, Heart, Puzzle, Star, ChevronDown, ArrowRight, Layers, Target, Smile, BookOpen
} from "lucide-react";

const PILLARS = [
  {
    icon: <Brain className="w-7 h-7" strokeWidth={1.5} />,
    title: "Cognitive Development",
    color: "bg-violet-50 text-violet-600 border-violet-100",
    accent: "#7C3AED",
    description:
      "EFL builds the mental scaffolding a child needs — sorting, sequencing, cause and effect, problem-solving. Every activity is a tiny step toward independent thought.",
  },
  {
    icon: <Heart className="w-7 h-7" strokeWidth={1.5} />,
    title: "Emotional Regulation",
    color: "bg-rose-50 text-rose-500 border-rose-100",
    accent: "#F43F5E",
    description:
      "Feelings come before words. EFL prioritises helping children name, understand, and manage their emotional states through predictable, gentle, joyful routines.",
  },
  {
    icon: <Puzzle className="w-7 h-7" strokeWidth={1.5} />,
    title: "Communication & Language",
    color: "bg-sky-50 text-sky-600 border-sky-100",
    accent: "#0284C7",
    description:
      "From a pointing gesture to a first word — EFL nurtures every form of communication. AAC, PECS, sign, verbal — all are celebrated equally.",
  },
  {
    icon: <Layers className="w-7 h-7" strokeWidth={1.5} />,
    title: "Sensory Integration",
    color: "bg-amber-50 text-amber-600 border-amber-100",
    accent: "#D97706",
    description:
      "Children learn best when their sensory system feels regulated. EFL embeds sensory consideration into every learning experience, not as a separate step.",
  },
  {
    icon: <Target className="w-7 h-7" strokeWidth={1.5} />,
    title: "Adaptive Behaviour",
    color: "bg-green-50 text-green-600 border-green-100",
    accent: "#16A34A",
    description:
      "Dressing, eating, transitions, toileting — daily living skills are the quiet heroes of EFL. Mastering these builds true independence and dignity.",
  },
  {
    icon: <Smile className="w-7 h-7" strokeWidth={1.5} />,
    title: "Social Connection",
    color: "bg-orange-50 text-orange-500 border-orange-100",
    accent: "#EA580C",
    description:
      "Joint attention, turn-taking, imitation — EFL grows the social skills that connect your child to the world, at their own pace and in their own way.",
  },
];

const FAQS = [
  {
    q: "What age group is EFL designed for?",
    a: "EFL is most commonly applied with children between 18 months and 10 years, though the principles can support learners of any age who are working on foundational skills. It is especially relevant during the early intervention window (ages 2–6).",
  },
  {
    q: "Is EFL the same as ABA therapy?",
    a: "Not exactly. EFL draws from a broader evidence base that includes elements of ABA, DIR/Floortime, PECS, OT sensory models, and naturalistic developmental approaches. It is approaches-agnostic — the goal is what works for your child.",
  },
  {
    q: "Do I need a therapist to use EFL at home?",
    a: "Many EFL principles can be applied by parents and caregivers at home — that is precisely the ethos behind Petals. Our products are designed so you can bring structured, meaningful learning into everyday routines without needing a clinical setting.",
  },
  {
    q: "What is the difference between EFL and Functional Skills?",
    a: "Functional Skills refers specifically to practical daily-living competencies (cooking, money, safety). EFL is the broader developmental umbrella that functional skills sit within — covering communication, cognition, emotion, and sensory regulation too.",
  },
  {
    q: "How do Petals products relate to EFL?",
    a: "Every Petals product is grounded in an EFL domain. Cliky Claky targets sensory integration. DayDay targets adaptive behaviour and self-organisation. NumSum targets communication, cognition, and fine motor development.",
  },
];


export default function EFLClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="relative w-full bg-[#FAF9F6] overflow-hidden">

      {/* ── Hero ── */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-8 md:px-[12%] pt-32 pb-24 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-violet-100/40 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-amber-100/50 blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 text-violet-600 text-xs uppercase tracking-[0.3em] font-body font-bold px-5 py-2 rounded-full"
          >
            <BookOpen className="w-3.5 h-3.5" />
            A Framework for Growth
          </motion.div>

          <h1 className="font-heading text-[clamp(3rem,9vw,8rem)] leading-[0.85] tracking-tighter text-black">
            Early <span className="italic text-violet-500">Foundational</span>
            <br />Learning
          </h1>

          <p className="font-body text-lg md:text-2xl text-neutral-500 max-w-2xl leading-relaxed">
            The principles, pillars, and practices behind meaningful development for children with autism — explained simply, for the families who need it most.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center mt-4"
          >
            <Link
              href="/story"
              className="font-body text-sm bg-black text-white px-8 py-4 rounded-full hover:bg-brand-yellow hover:text-black transition-all duration-300 flex items-center gap-2"
            >
              Our Story <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/products"
              className="font-body text-sm border border-black/20 text-black px-8 py-4 rounded-full hover:border-brand-yellow hover:bg-brand-yellow/5 transition-all duration-300"
            >
              Explore Petals Products
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
      <section className="px-8 md:px-[10%] py-20 md:py-32">
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
                What exactly is <span className="italic text-violet-500">EFL?</span>
              </h2>
              <div className="h-[2px] w-20 bg-violet-200 rounded-full" />
            </div>

            <div className="flex flex-col gap-6 font-body text-lg md:text-xl text-neutral-600 leading-relaxed">
              <p className="first-letter:text-6xl first-letter:font-heading first-letter:mr-3 first-letter:float-left first-letter:text-black first-letter:leading-none">
                Early Foundational Learning is not a single therapy or curriculum. It is a philosophy — a way of thinking about how young children with developmental differences (including autism) build the core capacities they need to engage with the world.
              </p>
              <p>
                The word <span className="italic text-black font-medium">"foundational"</span> is key. Before a child can read, socialise, or manage a classroom, there are invisible layers of development that must be laid: the ability to regulate one&apos;s sensory experience, to understand that actions produce reactions, to feel safe enough to explore, to communicate even one desire.
              </p>
              <p>
                EFL is the intentional, joyful, and highly individualised work of building those layers — one small, celebrated moment at a time.
              </p>
              <blockquote className="border-l-4 border-violet-300 pl-6 text-black font-semibold italic text-xl md:text-2xl">
                &ldquo;If you know one person with autism, you know one person with autism.&rdquo;
                <footer className="mt-2 text-sm font-normal text-neutral-500 not-italic">— Dr. Stephen Shore</footer>
              </blockquote>
              <p>
                That is why EFL refuses a one-size approach. It begins with the child — their strengths, their interests, their nervous system — and works outward from there.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Why Early? ── */}
      <section className="bg-[#F2EDE4] py-20 md:py-32 px-8 md:px-[10%]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div>
              <span className="font-body text-[10px] uppercase tracking-[0.5em] text-amber-600 font-black">The Window</span>
              <h2 className="font-heading text-4xl md:text-5xl text-black leading-tight mt-3">
                Why does <span className="italic">&ldquo;early&rdquo;</span> matter so much?
              </h2>
            </div>
            <div className="flex flex-col gap-5 font-body text-lg text-neutral-600 leading-relaxed">
              <p>
                The first eight years of a child&apos;s life are a period of extraordinary neuroplasticity — the brain&apos;s ability to form new connections at a remarkable rate. Research consistently shows that structured, responsive, and play-based learning during this window produces lasting developmental gains.
              </p>
              <p>
                This does not mean intervention after eight years old is helpless — far from it. But it does mean that the years <span className="text-black font-medium">before formal schooling begins</span> carry disproportionate developmental weight.
              </p>
              <p>
                For children with autism, early identification and EFL-informed support can significantly improve outcomes in communication, adaptive behaviour, and quality of life — for the child <em>and</em> for the whole family.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {[
                { stat: "2–6", label: "Prime early intervention window (years)" },
                { stat: "84%", label: "Of neural connections formed before age 3" },
                { stat: "3×", label: "Greater developmental gains with early support" },
              ].map((item) => (
                <div key={item.stat} className="bg-white rounded-3xl p-5 flex flex-col gap-1 shadow-sm border border-black/5">
                  <span className="font-heading text-3xl text-amber-600">{item.stat}</span>
                  <span className="font-body text-xs text-neutral-500 leading-snug">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[400px] md:h-[560px] rounded-[3rem] overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-700"
          >
            <Image src="/story/night_checklist.jpeg" alt="Child learning with a checklist" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 bg-black/60 backdrop-blur-md p-5 rounded-2xl text-white border border-white/10">
              <p className="text-xs uppercase tracking-widest font-body opacity-80 mb-1">Real EFL in action</p>
              <h4 className="font-heading text-lg">Structured, joyful routines at home</h4>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Six Pillars ── */}
      <section className="py-20 md:py-32 px-8 md:px-[10%]">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 flex flex-col gap-4"
          >
            <span className="font-body text-[10px] uppercase tracking-[0.5em] text-violet-500 font-black">The Framework</span>
            <h2 className="font-heading text-4xl md:text-6xl text-black leading-tight">
              Six pillars of <span className="italic text-violet-500">growth.</span>
            </h2>
            <p className="font-body text-lg text-neutral-500 max-w-xl leading-relaxed">
              EFL is not a checklist. These six domains are deeply intertwined — progress in one often unlocks growth in all others.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLARS.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2rem] p-8 border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col gap-5 group"
              >
                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${pillar.color} group-hover:scale-110 transition-transform duration-300`}>
                  {pillar.icon}
                </div>
                <div>
                  <h3 className="font-heading text-xl text-black mb-2">{pillar.title}</h3>
                  <p className="font-body text-sm text-neutral-500 leading-relaxed">{pillar.description}</p>
                </div>
                <div className="mt-auto">
                  <div className="h-[3px] w-8 rounded-full" style={{ backgroundColor: pillar.accent }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EFL at Home ── */}
      <section className="bg-black text-white py-20 md:py-32 px-8 md:px-[10%] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(124,58,237,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(250,204,21,0.08),transparent_60%)]" />

        <div className="max-w-[1100px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 mb-16"
          >
            <span className="font-body text-[10px] uppercase tracking-[0.5em] text-brand-yellow font-black">EFL at Home</span>
            <h2 className="font-heading text-4xl md:text-6xl leading-tight">
              You don&apos;t need a clinic. <span className="italic text-brand-yellow">You need a routine.</span>
            </h2>
            <p className="font-body text-lg text-white/60 max-w-2xl leading-relaxed">
              The most powerful EFL happens not in a therapy room but at the kitchen table, during bath time, on the walk to school. Consistent, loving, structured moments are the medium of early learning.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Follow Their Lead",
                text: "Start where your child is — their interests, their pace. Motivation is the fuel of all learning.",
              },
              {
                step: "02",
                title: "Make It Predictable",
                text: "Children with autism often thrive with clear beginnings and endings. Visual cues, consistent routines, and advance notice of transitions reduce anxiety dramatically.",
              },
              {
                step: "03",
                title: "Celebrate Everything",
                text: "A look, a reach, an approximation of a sound — these are milestones. Joy is reinforcement. Celebrate loudly and often.",
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-[2rem] p-8 flex flex-col gap-5 hover:bg-white/10 transition-colors duration-300"
              >
                <span className="font-heading text-5xl text-brand-yellow/30">{item.step}</span>
                <h3 className="font-heading text-2xl text-white">{item.title}</h3>
                <p className="font-body text-sm text-white/60 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="font-body text-white/40 text-sm mb-4">See how Petals products bring these principles to life</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 font-body text-sm bg-brand-yellow text-black px-8 py-4 rounded-full hover:bg-white transition-colors duration-300"
            >
              Explore All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
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
            <span className="font-body text-[10px] uppercase tracking-[0.5em] text-violet-500 font-black">Questions</span>
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
                  <span className="font-heading text-lg md:text-xl text-black pr-8 group-hover:text-violet-600 transition-colors duration-200">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === idx ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-violet-50 transition-colors duration-200"
                  >
                    <ChevronDown className="w-4 h-4 text-neutral-500 group-hover:text-violet-600 transition-colors" />
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
          className="max-w-3xl mx-auto bg-violet-50 border border-violet-100 rounded-[3rem] p-12 md:p-20 flex flex-col gap-6 items-center"
        >
          <Star className="w-8 h-8 text-violet-400" strokeWidth={1.5} />
          <h2 className="font-heading text-4xl md:text-5xl text-black leading-tight">
            Ready to start the <span className="italic text-violet-500">journey?</span>
          </h2>
          <p className="font-body text-neutral-500 text-lg max-w-xl leading-relaxed">
            Every Petals product is designed with EFL principles at its core — created by parents who lived this path, for families beginning theirs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <Link
              href="/products"
              className="font-body text-sm bg-black text-white px-8 py-4 rounded-full hover:bg-brand-yellow hover:text-black transition-all duration-300 flex items-center gap-2"
            >
              Shop Petals <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/story"
              className="font-body text-sm border border-black/20 text-black px-8 py-4 rounded-full hover:border-violet-300 hover:text-violet-600 transition-all duration-300"
            >
              Read Our Story
            </Link>
          </div>
        </motion.div>
      </section>

    </main>
  );
}

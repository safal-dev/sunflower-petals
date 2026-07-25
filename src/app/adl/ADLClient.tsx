"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Shirt, Droplets, UtensilsCrossed, BedDouble, Wind, PersonStanding,
  ArrowRight, ChevronDown, Star, Heart, CheckCircle2
} from "lucide-react";

// ── ADL skill areas ───────────────────────────────────────────────────────────
const ADL_SKILLS = [
  {
    icon: <Droplets className="w-7 h-7" strokeWidth={1.5} />,
    number: "01",
    title: "Bathing & Grooming",
    tagline: "Clean, confident, independent.",
    accent: "#0EA5E9",
    bg: "#F0F9FF",
    border: "#BAE6FD",
    description:
      "Bathing, hair washing, nail care, face washing, and dental hygiene. For many children with autism, sensory sensitivities make these routines genuinely distressing. ADL support breaks each task into predictable, manageable steps — reducing anxiety and building consistency.",
    examples: ["Hair washing sequences", "Toothbrushing routines", "Nail trimming desensitisation", "Face washing steps", "Shower vs. bath tolerance"],
    tip: "Predictability is the greatest comfort. Always same order, same tools, same words.",
  },
  {
    icon: <Shirt className="w-7 h-7" strokeWidth={1.5} />,
    number: "02",
    title: "Dressing & Undressing",
    tagline: "The quiet dignity of choosing your own clothes.",
    accent: "#8B5CF6",
    bg: "#F5F3FF",
    border: "#DDD6FE",
    description:
      "Putting on and taking off clothing, managing fastenings (buttons, zips, laces), selecting weather-appropriate outfits. Dressing skills build enormous confidence and reduce morning-routine conflict. Sensory considerations — fabric textures, tags, tightness — are central to ADL dressing support.",
    examples: ["Backward chaining for dressing", "Button & zip grading", "Shoelace tying sequences", "Sensory-friendly fabric selection", "Seasonal dressing awareness"],
    tip: "Backward chaining — teach the last step first — is often the most effective approach for dressing tasks.",
  },
  {
    icon: <UtensilsCrossed className="w-7 h-7" strokeWidth={1.5} />,
    number: "03",
    title: "Feeding & Eating",
    tagline: "Nourishment without the battleground.",
    accent: "#F59E0B",
    bg: "#FFFBEB",
    border: "#FDE68A",
    description:
      "Self-feeding with appropriate utensils, drinking from cups, managing different food textures, and mealtime social behaviour. Feeding difficulties are among the most common and most stressful challenges for families of children with autism — ADL support addresses the sensory, motor, and behavioural dimensions together.",
    examples: ["Spoon & fork progression", "Open cup drinking", "Food texture tolerance grading", "Mealtime sitting duration", "Self-serving skills"],
    tip: "Food chaining — starting with accepted foods and making tiny changes — is more effective than introducing entirely new foods.",
  },
  {
    icon: <CheckCircle2 className="w-7 h-7" strokeWidth={1.5} />,
    number: "04",
    title: "Toileting",
    tagline: "One of the most liberating milestones.",
    accent: "#10B981",
    bg: "#F0FDF4",
    border: "#A7F3D0",
    description:
      "Recognising the urge, communicating the need, managing clothing, wiping, flushing, hand-washing — toileting is a multi-step chain that requires body awareness, communication, and motor skills. Each component can be taught individually and then linked into a smooth, independent routine.",
    examples: ["Toilet training readiness", "Urge recognition & signalling", "Clothing management sequence", "Wiping technique", "Night-time continence"],
    tip: "Readiness indicators matter more than age. Look for bowel regularity, sustained sitting, and some body awareness before intensive toilet training.",
  },
  {
    icon: <BedDouble className="w-7 h-7" strokeWidth={1.5} />,
    number: "05",
    title: "Sleep & Rest Routines",
    tagline: "Rest is a skill too.",
    accent: "#6366F1",
    bg: "#EEF2FF",
    border: "#C7D2FE",
    description:
      "Establishing and maintaining consistent sleep and rest routines. Sleep difficulties affect the majority of children with autism and have a cascading impact on behaviour, learning, and family wellbeing. ADL sleep support focuses on environmental structure, visual cues, and routine predictability.",
    examples: ["Visual bedtime sequences", "Wind-down routine building", "Sleep environment design", "Night waking response protocols", "Nap transition support"],
    tip: "The hour before bed is as important as bedtime itself. Begin dimming lights and reducing stimulation early.",
  },
  {
    icon: <Wind className="w-7 h-7" strokeWidth={1.5} />,
    number: "06",
    title: "Health Maintenance",
    tagline: "Taking care of the body.",
    accent: "#EC4899",
    bg: "#FDF2F8",
    border: "#FBCFE8",
    description:
      "Managing minor illness (blowing nose, taking medicine), participating in medical appointments, communicating physical discomfort, and maintaining basic health behaviours. Children who cannot clearly communicate pain or illness rely on caregivers who understand their non-verbal cues.",
    examples: ["Nose blowing technique", "Medicine-taking tolerance", "Doctor appointment preparation", "Pain & discomfort communication", "Symptom identification basics"],
    tip: "Social stories and photo sequences are highly effective in preparing children for medical appointments.",
  },
  {
    icon: <PersonStanding className="w-7 h-7" strokeWidth={1.5} />,
    number: "07",
    title: "Mobility & Transfers",
    tagline: "Moving through the world.",
    accent: "#14B8A6",
    bg: "#F0FDFA",
    border: "#99F6E4",
    description:
      "Getting in and out of chairs, beds, vehicles, and bathtubs; navigating stairs, slopes, and uneven surfaces; carrying items safely. While mobility ADLs are more prominent in physical disability contexts, they arise for many children with autism who have hypotonia, dyspraxia, or proprioceptive differences.",
    examples: ["Stair navigation", "Vehicle transfer routines", "Chair positioning awareness", "Carrying objects safely", "Balance & proprioception activities"],
    tip: "OT-guided proprioceptive activities before mobility tasks can significantly improve motor planning and body awareness.",
  },
];

const WHY_CARDS = [
  {
    stat: "7",
    label: "Core ADL domains taught at Petals",
    color: "#F59E0B",
  },
  {
    stat: "Daily",
    label: "These skills are practised every single day",
    color: "#10B981",
  },
  {
    stat: "Home",
    label: "Where ADL learning is most powerful",
    color: "#8B5CF6",
  },
  {
    stat: "You",
    label: "The most important ADL teacher",
    color: "#EC4899",
  },
];

export default function ADLClient() {
  const [openSkill, setOpenSkill] = useState<number | null>(null);

  return (
    <main className="relative w-full bg-[#FAF9F6] overflow-hidden">

      {/* ── Hero ── */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-8 md:px-[12%] pt-36 pb-28 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-sky-100/50 blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-violet-100/40 blur-[120px] pointer-events-none" />

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
            className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200 text-sky-700 text-xs uppercase tracking-[0.3em] font-body font-bold px-5 py-2 rounded-full"
          >
            <Heart className="w-3.5 h-3.5" strokeWidth={2} />
            Foundational Independence
          </motion.div>

          <h1 className="font-heading text-[clamp(3rem,9vw,8.5rem)] leading-[0.85] tracking-tighter text-black">
            Activities of<br />
            <span className="italic text-sky-500">Daily Living.</span>
          </h1>

          <p className="font-body text-lg md:text-2xl text-neutral-500 max-w-2xl leading-relaxed">
            The foundational self-care skills every person needs — bathing, dressing, eating, toileting, and more. Taught with patience, structure, and joy.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center mt-2"
          >
            <Link
              href="/products"
              className="font-body text-sm bg-black text-white px-8 py-4 rounded-full hover:bg-sky-500 transition-all duration-300 flex items-center gap-2"
            >
              Explore Products <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/efl"
              className="font-body text-sm border border-black/20 text-black px-8 py-4 rounded-full hover:border-sky-400 hover:text-sky-600 transition-all duration-300"
            >
              What is EFL?
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

      {/* ── What are ADLs? ── */}
      <section className="px-8 md:px-[10%] py-20 md:py-28">
        <div className="max-w-[900px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-10"
          >
            <div className="flex flex-col gap-4">
              <span className="font-body text-[10px] uppercase tracking-[0.5em] text-sky-500 font-black">The Concept</span>
              <h2 className="font-heading text-4xl md:text-6xl text-black leading-tight">
                What are <span className="italic text-sky-500">ADLs?</span>
              </h2>
              <div className="h-[3px] w-20 bg-sky-200 rounded-full" />
            </div>

            <div className="flex flex-col gap-6 font-body text-lg md:text-xl text-neutral-600 leading-relaxed">
              <p className="first-letter:text-6xl first-letter:font-heading first-letter:mr-3 first-letter:float-left first-letter:text-black first-letter:leading-none">
                Activities of Daily Living — or ADLs — are the basic, personal self-care tasks that a person performs every single day to maintain their body and health. They are the bedrock of human independence, so familiar to most people that they are entirely automatic.
              </p>
              <p>
                For children with autism, these tasks are often far from automatic. Sensory sensitivities, motor differences, communication challenges, and anxiety can make what seems &ldquo;simple&rdquo; feel genuinely overwhelming — for the child and the family.
              </p>
              <p>
                ADL instruction is the structured, compassionate teaching of these skills — broken into small steps, embedded in consistent routines, and celebrated at every milestone.
              </p>
              <blockquote className="border-l-4 border-sky-200 pl-6 text-black font-semibold italic text-xl md:text-2xl">
                &ldquo;Independence in daily living is not a small thing. It is freedom.&rdquo;
                <footer className="mt-2 text-sm font-normal text-neutral-500 not-italic">— ADL Philosophy</footer>
              </blockquote>
              <p>
                At Petals, ADL skills are woven into every product category. Because the goal is not just a child who can perform in a therapy room — it is a child who can navigate their morning, their home, and their world.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 7 ADL skill areas ── */}
      <section className="py-20 md:py-28 px-8 md:px-[10%] bg-[#F0F8FF]">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 flex flex-col gap-4"
          >
            <span className="font-body text-[10px] uppercase tracking-[0.5em] text-sky-500 font-black">The Skills</span>
            <h2 className="font-heading text-4xl md:text-6xl text-black leading-tight">
              Seven areas of <span className="italic text-sky-500">daily living.</span>
            </h2>
            <p className="font-body text-lg text-neutral-500 max-w-xl leading-relaxed">
              Click any skill area to see what it involves and how to teach it.
            </p>
          </motion.div>

          <div className="flex flex-col gap-3">
            {ADL_SKILLS.map((skill, idx) => {
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
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
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

      {/* ── ADL at Home ── */}
      <section className="px-8 md:px-[10%] py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div>
              <span className="font-body text-[10px] uppercase tracking-[0.5em] text-sky-500 font-black">Teaching ADLs</span>
              <h2 className="font-heading text-4xl md:text-5xl text-black leading-tight mt-3">
                Three principles that <span className="italic">change everything.</span>
              </h2>
            </div>
            <div className="flex flex-col gap-6">
              {[
                {
                  title: "Task Analysis",
                  text: "Break every ADL into the smallest possible steps. 'Get dressed' is not one task — it is twenty. Teach each step before chaining them together.",
                  color: "#0EA5E9",
                },
                {
                  title: "Consistent Routine",
                  text: "Same time, same order, same cues, every day. Predictability reduces anxiety and frees cognitive resources for the task itself.",
                  color: "#8B5CF6",
                },
                {
                  title: "The Right Prompting Hierarchy",
                  text: "Start with the least intrusive prompt — a visual cue, a gesture, a verbal reminder. Fade prompts as quickly as the child allows to build genuine independence.",
                  color: "#10B981",
                },
              ].map((p) => (
                <div key={p.title} className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: `${p.color}15` }}>
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg text-black mb-1">{p.title}</h4>
                    <p className="font-body text-sm text-neutral-500 leading-relaxed">{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[400px] md:h-[560px] rounded-[3rem] overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-700"
          >
            <Image src="/story/night_checklist.jpeg" alt="ADL routine checklist" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-sky-900/70 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 bg-sky-900/70 backdrop-blur-md p-6 rounded-2xl text-white border border-white/10">
              <p className="text-xs uppercase tracking-widest font-body text-sky-300 mb-2">Visual Routine</p>
              <h4 className="font-heading text-xl">A checklist makes the invisible, visible.</h4>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats dark section ── */}
      <section className="bg-black text-white py-20 md:py-24 px-8 md:px-[10%] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(14,165,233,0.12),transparent_60%)]" />
        <div className="max-w-[1100px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-heading text-4xl md:text-6xl leading-tight">
              ADLs are not a goal. <span className="italic text-sky-400">They are the foundation.</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {WHY_CARDS.map((card) => (
              <motion.div
                key={card.stat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-[1.5rem] p-6 flex flex-col gap-2"
              >
                <span className="font-heading text-4xl" style={{ color: card.color }}>{card.stat}</span>
                <span className="font-body text-xs text-white/50 leading-snug">{card.label}</span>
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
              href="/iadl"
              className="font-body text-sm bg-sky-500 text-white px-8 py-4 rounded-full hover:bg-sky-400 transition-colors duration-300 flex items-center gap-2"
            >
              Explore IADLs too <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/efl"
              className="font-body text-sm border border-white/20 text-white px-8 py-4 rounded-full hover:bg-white/10 transition-colors duration-300"
            >
              Learn about EFL
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-8 md:px-[10%] py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-sky-50 border border-sky-100 rounded-[3rem] p-12 md:p-20 flex flex-col gap-6 items-center"
        >
          <Star className="w-8 h-8 text-sky-400" strokeWidth={1.5} />
          <h2 className="font-heading text-4xl md:text-5xl text-black leading-tight">
            Start with the <span className="italic text-sky-500">basics.</span>
          </h2>
          <p className="font-body text-neutral-500 text-lg max-w-xl leading-relaxed">
            Every Petals product is a tool for real life. Browse our collection of ADL-informed learning materials designed for the home.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <Link
              href="/products"
              className="font-body text-sm bg-black text-white px-8 py-4 rounded-full hover:bg-sky-500 transition-all duration-300 flex items-center gap-2"
            >
              Shop Petals <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/iadl"
              className="font-body text-sm border border-black/20 text-black px-8 py-4 rounded-full hover:border-sky-400 hover:text-sky-600 transition-all duration-300"
            >
              Instrumental Activities of Daily Living
            </Link>
          </div>
        </motion.div>
      </section>

    </main>
  );
}

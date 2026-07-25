"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQ {
  question: string;
  answer: ReactNode;
}

const FAQS: FAQ[] = [
  {
    question: "What makes Sunflower Petals different from regular toys?",
    answer: (
      <ul className="list-disc pl-5 space-y-2">
        <li>Designed with therapy-informed principles (EFL, ADL, IADL)</li>
        <li>Focus on predictability and low overstimulation</li>
        <li>Encourage independent use and skill-building</li>
        <li>Provide consistent sensory feedback</li>
      </ul>
    ),
  },
  {
    question: "Are the products safe for children?",
    answer: (
      <div className="space-y-4">
        <p>Yes, they are designed to be:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Child-friendly</li>
          <li>Durable</li>
          <li>Non-toxic (PLA-based)</li>
        </ul>
        <p>However, adult supervision is recommended, especially for younger children.</p>
      </div>
    ),
  },
  {
    question: "Do the products contain small parts?",
    answer: (
      <div className="space-y-4">
        <p>Some items (Dayday pieces) include small components, so:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Not recommended for children who mouth objects</li>
          <li>Best used with supervision if under 3 years old</li>
        </ul>
      </div>
    ),
  },
  {
    question: "Are the products chew-safe or chew-friendly?",
    answer: "Yes, our Cliky Claky and NumSum product line is chew friendly made with PLA-based material. However, other products are not designed for chewing.",
  },
];

const FAQItem = ({ faq, index, isOpen, onClick }: { faq: FAQ; index: number; isOpen: boolean; onClick: () => void }) => {
  return (
    <div className="border-b border-gray-200">
      <h3 className="m-0">
        <button
          onClick={onClick}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${index}`}
          id={`faq-question-${index}`}
          className="w-full flex justify-between items-center py-6 md:py-8 text-left focus:outline-none group hover:text-brand-yellow transition-colors"
        >
          <span className="font-heading text-xl md:text-3xl text-black group-hover:text-brand-yellow transition-colors pr-8">
            {faq.question}
          </span>
          <div className="ml-4 flex-shrink-0 relative w-6 h-6 flex items-center justify-center" aria-hidden="true">
            {/* Horizontal line (always visible) */}
            <span className="absolute w-full h-[2px] bg-black group-hover:bg-brand-yellow transition-colors rounded-full" />
            {/* Vertical line (rotates to horizontal when open) */}
            <motion.span 
              animate={{ rotate: isOpen ? 0 : 90 }}
              className="absolute w-full h-[2px] bg-black group-hover:bg-brand-yellow transition-colors rounded-full" 
            />
          </div>
        </button>
      </h3>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-question-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="font-body text-gray-600 text-base md:text-lg pb-8 pr-12 leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  return (
    <section className="relative w-full bg-white pt-24 pb-24 md:pt-32 md:pb-32 px-8 md:px-[10%] z-[10]" id="faq">
      
      <div className="max-w-4xl mx-auto relative z-30">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 flex flex-col items-center text-center"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-yellow-100 text-brand-yellow font-body font-bold text-sm tracking-widest uppercase mb-6">
            Help & Support
          </div>
          <h2 className="font-heading text-black text-[clamp(2.5rem,5vw,4rem)] leading-[1.1]">
            Common Questions
          </h2>
        </motion.div>

        <div className="flex flex-col">
          {FAQS.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <FAQItem 
                faq={faq} 
                index={index}
                isOpen={openIndex === index} 
                onClick={() => setOpenIndex(openIndex === index ? null : index)} 
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

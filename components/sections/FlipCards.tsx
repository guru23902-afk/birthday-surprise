"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { SpecialReason } from "@/types";

interface FlipCardsProps {
  reasons: SpecialReason[];
  name: string;
}

const FlipCard = ({ reason, index }: { reason: SpecialReason; index: number }) => {
  const [flipped, setFlipped] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flip-card h-52 cursor-pointer"
      onClick={() => setFlipped(!flipped)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setFlipped(!flipped); }}
      tabIndex={0}
      role="button"
      aria-pressed={flipped}
      aria-label={`Flip card: ${reason.title}`}
    >
      <div className={`flip-card-inner ${flipped ? "flipped" : ""}`}>
        {/* Front */}
        <div
          className="flip-card-front flex flex-col items-center justify-center p-6 shadow-glass"
          style={{ background: "linear-gradient(135deg, #fff1f2, #fdf2f8)" }}
        >
          <motion.span
            className="text-5xl mb-4"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
          >
            {reason.icon}
          </motion.span>
          <h3 className="font-display text-xl font-bold gradient-text text-center">{reason.title}</h3>
          <p className="text-xs text-gray-400 mt-2 font-body">Tap to reveal ✨</p>
        </div>

        {/* Back */}
        <div
          className="flip-card-back flex flex-col items-center justify-center p-6 shadow-glass"
          style={{ background: "linear-gradient(135deg, #f43f5e, #ec4899, #8b5cf6)" }}
        >
          <span className="text-3xl mb-3">{reason.icon}</span>
          <p className="text-white text-center font-body text-sm leading-relaxed">{reason.message}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function FlipCards({ reasons, name }: FlipCardsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      id="reasons"
      className="py-20 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #f5f3ff 0%, #fff1f2 100%)" }}
    >
      <motion.div ref={ref} className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="font-display text-4xl md:text-5xl gradient-text font-bold mb-4"
        >
          Why {name} is Special ✨
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-gray-500 font-body"
        >
          Tap each card to see why 💕
        </motion.p>
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {reasons.map((reason, i) => (
          <FlipCard key={reason.id} reason={reason} index={i} />
        ))}
      </div>
    </section>
  );
}

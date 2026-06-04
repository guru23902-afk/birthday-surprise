"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { MemoryNote } from "@/types";

interface MemoryWallProps {
  notes: MemoryNote[];
}

export default function MemoryWall({ notes }: MemoryWallProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="memories"
      className="py-20 px-4"
      style={{ background: "linear-gradient(180deg, #0f0a1e 0%, #fdf2f8 100%)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        ref={ref}
        className="text-center mb-12"
      >
        <h2 className="font-display text-4xl md:text-5xl gradient-text font-bold mb-4">
          Memory Wall 📝
        </h2>
        <p className="text-gray-500 font-body">Little moments that made us smile</p>
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {notes.map((note, i) => {
          const rotate = (((i * 7) % 10) - 5);
          return (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 40, rotate: 0 }}
              animate={isInView ? { opacity: 1, y: 0, rotate } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              className="sticky-note p-5 cursor-default"
              style={{ background: note.color, transform: `rotate(${rotate}deg)` }}
              role="article"
              aria-label={`Memory: ${note.note}`}
            >
              {/* Pin */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full shadow-md"
                style={{ background: "linear-gradient(135deg, #f43f5e, #ec4899)" }} />

              <p className="font-hand text-gray-700 text-sm md:text-base leading-relaxed pt-2">
                {note.note}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import type { TimelineItem } from "@/types";

interface TimelineProps {
  items: TimelineItem[];
}

const TimelineCard = ({ item, index }: { item: TimelineItem; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className={`relative flex items-center mb-12 ${isLeft ? "flex-row" : "flex-row-reverse"} md:flex-row`}>
      {/* Connector dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full z-10 flex items-center justify-center shadow-glow"
        style={{ background: "linear-gradient(135deg, #f43f5e, #ec4899)" }}
      >
        <span className="text-xs">{item.emoji}</span>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 * index }}
        className={`w-5/12 ${isLeft ? "mr-auto pr-8" : "ml-auto pl-8"} hidden md:block`}
      >
        <div className="glass rounded-2xl p-5 shadow-glass hover:shadow-glow transition-all duration-300 group">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-rose-400 text-sm font-medium font-body bg-rose-50 px-3 py-1 rounded-full">
              {item.date}
            </span>
          </div>
          <h3 className="font-display text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">{item.title}</h3>
          <p className="font-body text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{item.description}</p>
          {item.photo && (
            <div className="relative mt-3 h-32 rounded-xl overflow-hidden">
              <Image src={item.photo} alt={item.title} fill className="object-cover" sizes="300px" />
            </div>
          )}
        </div>
      </motion.div>

      {/* Mobile card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 * index }}
        className="w-full pl-10 md:hidden"
      >
        <div className="glass rounded-2xl p-4 shadow-glass">
          <span className="text-rose-400 text-xs font-medium bg-rose-50 px-2 py-1 rounded-full">{item.date}</span>
          <h3 className="font-display text-base font-bold text-gray-800 mt-2 mb-1">{item.title}</h3>
          <p className="font-body text-gray-600 text-sm">{item.description}</p>
        </div>
      </motion.div>

      {/* Empty side for desktop alternating layout */}
      <div className={`w-5/12 hidden md:block ${isLeft ? "ml-auto" : "mr-auto"}`} />
    </div>
  );
};

export default function Timeline({ items }: TimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      id="timeline"
      className="py-20 px-4 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #fdf2f8 0%, #f5f3ff 100%)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        ref={ref}
        className="text-center mb-16"
      >
        <h2 className="font-display text-4xl md:text-5xl gradient-text font-bold mb-4">Our Journey 🗺️</h2>
        <p className="text-gray-500 font-body">Every step that led us here</p>
      </motion.div>

      <div className="max-w-4xl mx-auto relative timeline-line">
        {items.map((item, i) => (
          <TimelineCard key={item.id} item={item} index={i} />
        ))}

        {/* End marker */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.5, type: "spring" }}
          className="flex justify-center mt-4"
        >
          <div className="text-4xl animate-bounce">🎊</div>
        </motion.div>
      </div>
    </section>
  );
}

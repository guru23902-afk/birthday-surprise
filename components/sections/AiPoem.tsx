"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AiPoemProps {
  name: string;
}

// Pre-generated poem to avoid runtime API calls
const generatePoem = (name: string) => `
On this beautiful day born just for you,
${name}, the world shines in a different hue.
Your laughter is music, your smile is the sun,
A story of joy that has only begun.

With every heartbeat, with every new year,
May all of your dreams slowly start to appear.
The stars in the sky know the truth that I feel—
That someone like you is incredibly real.

So here's to the magic you carry inside,
The warmth and the grace you show with such pride.
Happy Birthday dear ${name}, today and always—
May love fill your heart through the rest of your days.

— Written with love ❤️
`.trim();

export default function AiPoem({ name }: AiPoemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const poem = generatePoem(name);
  const lines = poem.split("\n");

  return (
    <section
      id="poem"
      ref={ref}
      className="py-20 px-4"
      style={{ background: "linear-gradient(180deg, #fdf2f8 0%, #f5f3ff 100%)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="text-center mb-10"
      >
        <h2 className="font-display text-4xl md:text-5xl gradient-text font-bold mb-4">
          A Poem For You ✍️
        </h2>
        <p className="text-gray-500 font-body">Written with love, just for {name}</p>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl p-8 md:p-12 shadow-glass relative overflow-hidden"
        >
          {/* Decorative */}
          <div className="absolute top-4 right-4 text-4xl opacity-10 font-display text-7xl">❝</div>
          <div className="absolute bottom-4 left-4 text-4xl opacity-10 font-display text-7xl rotate-180">❝</div>

          <div className="relative z-10">
            {lines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.06 }}
                className={`font-hand text-gray-700 dark:text-gray-300 text-lg leading-relaxed
                  ${line === "" ? "mb-4" : "mb-1"}
                  ${line.startsWith("—") ? "text-rose-500 text-right mt-4 font-semibold" : ""}
                `}
              >
                {line || "\u00A0"}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

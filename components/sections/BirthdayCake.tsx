"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Confetti from "@/components/ui/Confetti";

interface BirthdayCakeProps {
  candleCount: number;
  wish: string;
  name: string;
}

const Firework = ({ x, y }: { x: number; y: number }) => {
  const colors = ["#f43f5e", "#fbbf24", "#8b5cf6", "#34d399", "#60a5fa", "#ec4899"];
  return (
    <motion.div className="absolute pointer-events-none" style={{ left: x, top: y }}>
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * 360;
        const distance = 60 + Math.random() * 40;
        const color = colors[i % colors.length];
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{ background: color, left: 0, top: 0 }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos((angle * Math.PI) / 180) * distance,
              y: Math.sin((angle * Math.PI) / 180) * distance,
              opacity: 0,
              scale: 0,
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        );
      })}
    </motion.div>
  );
};

export default function BirthdayCake({ candleCount, wish, name }: BirthdayCakeProps) {
  const [extinguished, setExtinguished] = useState<Set<number>>(new Set());
  const [showWish, setShowWish] = useState(false);
  const [fireworks, setFireworks] = useState<{ id: number; x: number; y: number }[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const blowCandle = (index: number) => {
    if (extinguished.has(index)) return;
    const newSet = new Set(extinguished);
    newSet.add(index);
    setExtinguished(newSet);

    if (newSet.size === candleCount) {
      setTimeout(() => {
        setShowWish(true);
        setShowConfetti(true);
        // Spawn fireworks
        const fws = Array.from({ length: 8 }).map((_, i) => ({
          id: Date.now() + i,
          x: 15 + Math.random() * 70,
          y: 10 + Math.random() * 60,
        }));
        setFireworks(fws);
        setTimeout(() => {
          setFireworks([]);
          setShowConfetti(false);
        }, 3000);
      }, 500);
    }
  };

  const reset = () => {
    setExtinguished(new Set());
    setShowWish(false);
    setFireworks([]);
  };

  return (
    <section
      id="cake"
      ref={ref}
      className="py-20 px-4 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1a0a0e 0%, #0f0a1e 100%)" }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="text-center mb-10"
      >
        <h2 className="font-display text-4xl md:text-5xl gradient-text font-bold mb-4">
          Make a Wish! 🕯️
        </h2>
        <p className="text-gray-400 font-body">Tap each candle to blow it out</p>
      </motion.div>

      <div className="max-w-lg mx-auto relative">
        {/* Fireworks */}
        {fireworks.map((fw) => (
          <Firework key={fw.id} x={fw.x * 4} y={fw.y * 4} />
        ))}

        {/* Cake visual */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.3, type: "spring", bounce: 0.3 }}
          className="flex flex-col items-center"
        >
          {/* Candles row */}
          <div className="flex gap-4 mb-2 z-10">
            {Array.from({ length: candleCount }).map((_, i) => (
              <motion.button
                key={i}
                onClick={() => blowCandle(i)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center cursor-pointer focus:outline-none"
                aria-label={extinguished.has(i) ? `Candle ${i + 1} blown out` : `Blow out candle ${i + 1}`}
                aria-pressed={extinguished.has(i)}
              >
                {/* Flame */}
                <AnimatePresence>
                  {!extinguished.has(i) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0, y: -10, opacity: 0 }}
                      className="relative mb-0.5"
                    >
                      <motion.div
                        className="flame w-4 h-6"
                        animate={{
                          scaleY: [1, 0.85, 1.1, 0.9, 1],
                          scaleX: [1, 1.1, 0.9, 1.05, 1],
                        }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
                      />
                      {/* Glow */}
                      <div className="absolute inset-0 blur-md bg-yellow-400/50 rounded-full" />
                    </motion.div>
                  )}
                  {extinguished.has(i) && (
                    <motion.div
                      initial={{ opacity: 1, y: 0 }}
                      animate={{ opacity: 0, y: -20 }}
                      className="text-gray-400 text-xs mb-1"
                    >
                      💨
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* Candle body */}
                <div
                  className="w-3 h-10 rounded-t-sm relative overflow-hidden"
                  style={{
                    background: `linear-gradient(to right, hsl(${i * 60}, 80%, 60%), hsl(${i * 60 + 20}, 80%, 75%), hsl(${i * 60}, 80%, 60%))`,
                  }}
                >
                  {/* Wax drip */}
                  <div className="absolute top-0 left-1/2 w-1.5 h-3 bg-white/30 rounded-b-full -translate-x-1/2" />
                </div>
              </motion.button>
            ))}
          </div>

          {/* Cake body */}
          <div className="w-full max-w-xs">
            {/* Top tier */}
            <div className="mx-8 h-12 rounded-t-xl relative"
              style={{ background: "linear-gradient(to bottom, #f9a8d4, #ec4899)" }}>
              <div className="absolute top-0 w-full h-3 bg-pink-200 rounded-t-xl" />
              <div className="flex justify-center gap-3 pt-4">
                {"💕🌸💕".split("").map((c, i) => <span key={i} className="text-sm">{c}</span>)}
              </div>
            </div>
            {/* Middle tier */}
            <div className="mx-4 h-14 relative"
              style={{ background: "linear-gradient(to bottom, #fda4af, #f43f5e)" }}>
              <div className="absolute top-0 w-full h-3 bg-rose-200" />
              <div className="flex justify-around pt-4 px-3">
                {"🌷✨🌷✨🌷".split("").map((c, i) => <span key={i} className="text-sm">{c}</span>)}
              </div>
            </div>
            {/* Bottom tier */}
            <div className="h-16 rounded-b-2xl relative"
              style={{ background: "linear-gradient(to bottom, #fecdd3, #fb7185)" }}>
              <div className="absolute top-0 w-full h-4 bg-rose-100" />
              <div className="flex justify-around items-center h-full px-4">
                <span className="font-hand text-white text-sm drop-shadow">Happy Birthday!</span>
              </div>
            </div>
          </div>

          {/* Plate */}
          <div className="w-72 h-6 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full -mt-2 shadow-lg" />
        </motion.div>

        {/* Progress */}
        <div className="text-center mt-6">
          <p className="text-gray-400 font-body text-sm">
            {extinguished.size}/{candleCount} candles blown out
            {extinguished.size > 0 && extinguished.size < candleCount && " 💨"}
          </p>
        </div>

        {/* Wish popup */}
        <AnimatePresence>
          {showWish && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center z-20"
            >
              <div className="glass rounded-3xl p-8 text-center max-w-sm mx-4 shadow-glow-lg">
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-5xl mb-4"
                >
                  ✨
                </motion.div>
                <h3 className="font-display text-2xl gradient-text font-bold mb-3">Make a Wish!</h3>
                <p className="font-hand text-gray-300 text-lg mb-4">{wish}</p>
                <p className="font-hand text-rose-400 text-lg">Happy Birthday, {name}! 🎂</p>
                <button
                  onClick={reset}
                  className="mt-4 px-6 py-2 rounded-full text-white text-sm font-body"
                  style={{ background: "linear-gradient(135deg, #f43f5e, #ec4899)" }}
                  aria-label="Relight candles"
                >
                  Relight candles 🕯️
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Confetti active={showConfetti} duration={3000} />
    </section>
  );
}

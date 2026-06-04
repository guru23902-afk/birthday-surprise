"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

interface GiftBoxProps {
  gift: {
    title: string;
    message: string;
    revealEmoji: string;
  };
}

export default function GiftBox({ gift }: GiftBoxProps) {
  const [opened, setOpened] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="gift"
      ref={ref}
      className="py-20 px-4"
      style={{ background: "linear-gradient(180deg, #1a0a0e 0%, #0f0a1e 100%)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="text-center mb-12"
      >
        <h2 className="font-display text-4xl md:text-5xl gradient-text font-bold mb-4">
          A Special Surprise 🎁
        </h2>
        <p className="text-gray-400 font-body">Something special is waiting for you</p>
      </motion.div>

      <div className="max-w-md mx-auto flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div
              key="closed"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setOpened(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setOpened(true)}
              aria-label="Open gift box"
            >
              {/* Gift box */}
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [-2, 2, -2] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="relative w-48 h-48"
              >
                {/* Lid */}
                <motion.div
                  className="absolute -top-4 left-0 right-0 h-14 rounded-t-xl z-10"
                  style={{ background: "linear-gradient(135deg, #f43f5e, #ec4899)" }}
                >
                  {/* Ribbon on lid */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-8"
                    style={{ background: "rgba(255,255,255,0.3)" }} />
                  {/* Bow */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex gap-1">
                    <div className="w-8 h-6 rounded-full" style={{ background: "#fbbf24", transform: "rotate(-30deg)" }} />
                    <div className="w-8 h-6 rounded-full" style={{ background: "#fbbf24", transform: "rotate(30deg)" }} />
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full" style={{ background: "#f59e0b" }} />
                  </div>
                </motion.div>

                {/* Box body */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-36 rounded-b-xl"
                  style={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)" }}
                >
                  {/* Ribbon vertical */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-8"
                    style={{ background: "rgba(255,255,255,0.3)" }} />
                  {/* Stars decoration */}
                  <div className="flex justify-around pt-8 px-4">
                    {["⭐", "✨", "⭐"].map((s, i) => <span key={i} className="text-xl">{s}</span>)}
                  </div>
                </div>
              </motion.div>

              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-6 text-gray-400 font-body text-sm"
              >
                Tap to open your surprise! 🎁
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="opened"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.4 }}
              className="w-full"
            >
              {/* Particles burst */}
              <div className="relative flex justify-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-8xl"
                >
                  {gift.revealEmoji}
                </motion.div>
                {["🌸", "✨", "💕", "🌟", "🎊", "💖", "🎀", "💫"].map((emoji, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-2xl"
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                    animate={{
                      x: Math.cos((i / 8) * Math.PI * 2) * 80,
                      y: Math.sin((i / 8) * Math.PI * 2) * 60,
                      opacity: [1, 1, 0],
                      scale: [0, 1.5, 1],
                    }}
                    transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                  >
                    {emoji}
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass rounded-3xl p-8 shadow-glow text-center"
              >
                <h3 className="font-display text-2xl gradient-text font-bold mb-4">{gift.title}</h3>
                <p className="font-hand text-gray-300 text-lg leading-relaxed whitespace-pre-line">{gift.message}</p>
              </motion.div>

              <button
                onClick={() => setOpened(false)}
                className="mt-6 mx-auto block text-gray-500 text-sm font-body hover:text-gray-300 transition-colors"
                aria-label="Close gift"
              >
                Close ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

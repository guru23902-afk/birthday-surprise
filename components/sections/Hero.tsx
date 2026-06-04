"use client";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import Confetti from "@/components/ui/Confetti";

interface HeroProps {
  name: string;
  heroMessage: string;
  heroSubheading: string;
}

const FloatingBalloon = ({ x, delay, color }: { x: string; delay: number; color: string }) => (
  <motion.div
    className="absolute bottom-0 flex flex-col items-center"
    style={{ left: x }}
    animate={{ y: [0, -30, 0], rotate: [-5, 5, -5] }}
    transition={{ duration: 4 + delay, repeat: Infinity, delay }}
  >
    <div
      className="w-12 h-14 rounded-full relative"
      style={{ background: `radial-gradient(circle at 35% 35%, ${color}aa, ${color})` }}
    >
      <div className="absolute top-2 left-3 w-3 h-3 bg-white/40 rounded-full" />
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0"
        style={{ borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: `8px solid ${color}` }} />
    </div>
    <div className="w-px h-16 bg-gray-400/50" />
  </motion.div>
);

const AnimatedCake = () => {
  const candles = 5;
  return (
    <motion.div
      className="relative mx-auto w-48 h-48"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      {/* Candles */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-3 -translate-y-12">
        {Array.from({ length: candles }).map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <motion.div
              className="flame w-4 h-6"
              animate={{ scaleY: [1, 0.8, 1.1, 0.9, 1], scaleX: [1, 1.1, 0.9, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            />
            <div className="w-2 h-8 rounded-sm" style={{ background: `hsl(${i * 60}, 80%, 65%)` }} />
          </div>
        ))}
      </div>
      {/* Cake layers */}
      <div className="absolute bottom-0 w-full">
        {/* Bottom layer */}
        <div className="w-48 h-16 rounded-b-xl bg-gradient-to-b from-pink-300 to-pink-400 relative">
          <div className="absolute top-0 w-full h-3 bg-pink-200 rounded-full" />
          <div className="absolute top-2 left-4 flex gap-3">
            {["🌸", "💝", "🌸"].map((e, i) => (
              <span key={i} className="text-lg">{e}</span>
            ))}
          </div>
        </div>
        {/* Middle layer */}
        <div className="absolute -top-12 left-4 right-4 h-12 rounded-t-lg bg-gradient-to-b from-rose-200 to-rose-300">
          <div className="absolute top-0 w-full h-3 bg-rose-100 rounded-full" />
        </div>
        {/* Top layer */}
        <div className="absolute -top-20 left-8 right-8 h-10 rounded-t-lg bg-gradient-to-b from-purple-200 to-purple-300">
          <div className="absolute top-0 w-full h-2 bg-purple-100 rounded-full" />
        </div>
      </div>
      <div className="text-5xl absolute bottom-16 left-1/2 -translate-x-1/2">🎂</div>
    </motion.div>
  );
};

export default function Hero({ name, heroMessage, heroSubheading }: HeroProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleStart = () => {
    setShowConfetti(true);
    setTimeout(() => {
      document.getElementById("letter")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const balloons = [
    { x: "5%", delay: 0, color: "#f43f5e" },
    { x: "15%", delay: 0.5, color: "#ec4899" },
    { x: "75%", delay: 1, color: "#8b5cf6" },
    { x: "85%", delay: 0.3, color: "#fbbf24" },
    { x: "25%", delay: 1.5, color: "#34d399" },
    { x: "65%", delay: 0.8, color: "#60a5fa" },
  ];

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #fff1f2 0%, #fdf2f8 50%, #f5f3ff 100%)" }}
    >
      {/* Balloons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {balloons.map((b, i) => <FloatingBalloon key={i} {...b} />)}
      </div>

      {/* Sparkles */}
      {["top-10 left-10", "top-20 right-20", "top-1/3 left-5", "top-1/4 right-10"].map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} pointer-events-none`}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8], rotate: [0, 180, 360] }}
          transition={{ duration: 2 + i, repeat: Infinity, delay: i * 0.5 }}
        >
          <Sparkles size={24 + i * 4} className="text-rose-400" />
        </motion.div>
      ))}

      {/* Floating hearts */}
      {["20%", "40%", "60%", "80%"].map((left, i) => (
        <motion.div
          key={i}
          className="absolute text-rose-300 pointer-events-none text-2xl"
          style={{ left, top: `${20 + i * 15}%` }}
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.7 }}
        >
          ❤️
        </motion.div>
      ))}

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        {/* Animated cake */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="mb-8"
        >
          <AnimatedCake />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold gradient-text mb-4 leading-tight"
        >
          {heroMessage}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-body text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed dark:text-gray-300"
        >
          {heroSubheading}
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          onClick={handleStart}
          whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(244, 63, 94, 0.6)" }}
          whileTap={{ scale: 0.95 }}
          className="relative px-10 py-4 rounded-full text-white font-semibold text-lg shadow-glow transition-all duration-300 overflow-hidden group"
          style={{ background: "linear-gradient(135deg, #f43f5e, #ec4899, #8b5cf6)" }}
          aria-label="Start the birthday journey"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Sparkles size={20} />
            Start the Journey
            <Sparkles size={20} />
          </span>
          <motion.div
            className="absolute inset-0 bg-white/20"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.5 }}
          />
        </motion.button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ChevronDown size={28} className="text-rose-400" />
      </motion.div>

      <Confetti active={showConfetti} />
    </section>
  );
}

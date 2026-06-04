"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Confetti from "@/components/ui/Confetti";

interface FinalProps {
  name: string;
  closingMessage: string;
  stats: {
    daysKnown: number;
    memoriesMade: number;
    laughter: string;
    love: string;
  };
}

const FireworkCanvas = ({ active }: { active: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: { x: number; y: number; vx: number; vy: number; alpha: number; color: string; size: number }[] = [];
    const colors = ["#f43f5e", "#ec4899", "#8b5cf6", "#fbbf24", "#34d399", "#60a5fa"];

    const spawn = () => {
      const cx = Math.random() * canvas.width;
      const cy = Math.random() * canvas.height * 0.6;
      for (let i = 0; i < 50; i++) {
        const angle = (Math.random() * Math.PI * 2);
        const speed = 2 + Math.random() * 4;
        particles.push({
          x: cx, y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 2 + Math.random() * 3,
        });
      }
    };

    const interval = setInterval(spawn, 600);
    let raf: number;

    const animate = () => {
      ctx.fillStyle = "rgba(15, 10, 30, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.alpha -= 0.015;

        if (p.alpha <= 0) { particles.splice(i, 1); continue; }

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(animate);
    };

    animate();
    return () => { clearInterval(interval); cancelAnimationFrame(raf); };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default function FinalCelebration({ name, closingMessage, stats }: FinalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    if (isInView) {
      setConfetti(true);
      setTimeout(() => setConfetti(false), 6000);
    }
  }, [isInView]);

  const statItems = [
    { label: "Days of Friendship", value: stats.daysKnown, emoji: "📅" },
    { label: "Memories Made", value: stats.memoriesMade, emoji: "📸" },
    { label: "Laughter Shared", value: stats.laughter, emoji: "😂" },
    { label: "Love Given", value: stats.love, emoji: "❤️" },
  ];

  return (
    <section
      id="final"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #fdf2f8 0%, #0f0a1e 50%, #0f0a1e 100%)" }}
    >
      <FireworkCanvas active={isInView} />

      {/* Floating hearts */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-rose-400 pointer-events-none"
          style={{
            left: `${5 + (i * 8) % 90}%`,
            bottom: `${10 + (i * 13) % 80}%`,
            fontSize: `${14 + (i % 3) * 8}px`,
          }}
          animate={{
            y: [0, -100 - Math.random() * 100],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0.5],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        >
          ❤️
        </motion.div>
      ))}

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Balloons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="flex justify-center gap-4 mb-8"
        >
          {["🎈", "🎊", "🎉", "🎊", "🎈"].map((e, i) => (
            <motion.span
              key={i}
              className="text-4xl md:text-5xl"
              animate={{ y: [0, -15, 0], rotate: [-5, 5, -5] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
            >
              {e}
            </motion.span>
          ))}
        </motion.div>

        {/* Closing message */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="font-hand text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto"
        >
          "{closingMessage}"
        </motion.p>

        {/* Main birthday message */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.7 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5, type: "spring", bounce: 0.4 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
          style={{
            background: "linear-gradient(135deg, #f43f5e, #ec4899, #8b5cf6, #fbbf24)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 20px rgba(244,63,94,0.5))",
          }}
        >
          Happy Birthday {name}! ❤️
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="font-hand text-3xl text-rose-400 mb-12 heart-beat inline-block"
        >
          Made with all my love 💕
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {statItems.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(244,63,94,0.4)" }}
              className="glass rounded-2xl p-4 text-center"
            >
              <div className="text-3xl mb-2">{stat.emoji}</div>
              <div className="font-display text-2xl font-bold gradient-text">{stat.value.toLocaleString()}</div>
              <div className="font-body text-gray-400 text-xs mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Confetti active={confetti} duration={6000} />
    </section>
  );
}

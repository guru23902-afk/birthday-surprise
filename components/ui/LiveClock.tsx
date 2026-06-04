"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString("en-US", {
        hour: "2-digit", minute: "2-digit", second: "2-digit"
      }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-4 z-40 glass rounded-full px-4 py-2 text-sm font-mono text-rose-500 shadow-glass hidden md:block"
      aria-live="polite"
      aria-label="Current time"
    >
      ⏰ {time}
    </motion.div>
  );
}

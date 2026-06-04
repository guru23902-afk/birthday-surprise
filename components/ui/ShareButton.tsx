"use client";
import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: document.title, url });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.button
      onClick={share}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed top-4 right-16 z-50 w-10 h-10 rounded-full glass flex items-center justify-center shadow-glow"
      aria-label="Share this page"
    >
      {copied ? <Check size={18} className="text-green-400" /> : <Share2 size={18} className="text-rose-500" />}
    </motion.button>
  );
}

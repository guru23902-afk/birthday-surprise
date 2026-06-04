"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

interface LetterProps {
  letter: {
    greeting: string;
    body: string;
    signature: string;
    signatureName: string;
  };
}

export default function Letter({ letter }: LetterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const fullText = letter.body;

  useEffect(() => {
    if (isInView && !started) {
      setStarted(true);
      let i = 0;
      const speed = 18;
      const type = () => {
        if (i <= fullText.length) {
          setDisplayedText(fullText.slice(0, i));
          i++;
          setTimeout(type, speed);
        }
      };
      setTimeout(type, 600);
    }
  }, [isInView, started, fullText]);

  const hearts = ["10%", "30%", "50%", "70%", "90%"];

  return (
    <section
      id="letter"
      className="relative py-20 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #fdf2f8 0%, #fff1f2 100%)" }}
    >
      {/* Floating hearts */}
      {hearts.map((left, i) => (
        <motion.div
          key={i}
          className="absolute text-rose-200 pointer-events-none"
          style={{ left, top: `${10 + i * 15}%`, fontSize: `${16 + i * 4}px` }}
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.6 }}
        >
          ❤️
        </motion.div>
      ))}

      <div ref={ref} className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center font-display text-4xl md:text-5xl gradient-text font-bold mb-12"
        >
          A Letter From The Heart 💌
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Paper card */}
          <div
            className="relative bg-white/80 rounded-3xl p-8 md:p-12 shadow-glass"
            style={{
              backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, rgba(244,63,94,0.08) 27px, rgba(244,63,94,0.08) 28px)",
              backgroundPosition: "0 32px",
            }}
          >
            {/* Decorative corner */}
            <div className="absolute top-6 right-6 text-4xl opacity-20">💕</div>
            <div className="absolute bottom-6 left-6 text-3xl opacity-20">🌸</div>

            {/* Red line on left */}
            <div className="absolute left-16 top-0 bottom-0 w-px bg-rose-200 hidden md:block" />

            <div className="md:pl-12">
              {/* Greeting */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
                className="font-hand text-2xl text-rose-500 mb-6"
              >
                {letter.greeting}
              </motion.p>

              {/* Body with typewriter */}
              <div className="font-hand text-gray-700 text-lg leading-relaxed mb-8 min-h-[200px] whitespace-pre-line dark:text-gray-600">
                {displayedText}
                {displayedText.length < fullText.length && (
                  <span className="typewriter-cursor" />
                )}
              </div>

              {/* Signature */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={displayedText.length >= fullText.length ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-right"
              >
                <p className="font-hand text-xl text-rose-500 mb-1">{letter.signature}</p>
                <p className="font-hand text-2xl font-bold gradient-text">{letter.signatureName}</p>
              </motion.div>
            </div>
          </div>

          {/* Hearts around the card */}
          {["-top-4 -left-4", "-top-4 -right-4", "-bottom-4 -left-4", "-bottom-4 -right-4"].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute ${pos} text-2xl`}
              animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            >
              💗
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

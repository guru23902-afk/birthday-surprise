"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CountdownProps {
  birthday: string;
  name: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isBirthday: boolean;
}

export default function BirthdayCountdown({ birthday, name }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const bday = new Date(birthday);
      const next = new Date(now.getFullYear(), bday.getMonth(), bday.getDate());

      // If birthday already passed this year, use next year
      if (next < now) {
        const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const bdayDate = new Date(now.getFullYear(), bday.getMonth(), bday.getDate());
        if (bdayDate < nowDate) next.setFullYear(now.getFullYear() + 1);
      }

      const diff = next.getTime() - now.getTime();
      const isToday = diff < 86400000 && diff >= 0 &&
        now.getDate() === bday.getDate() && now.getMonth() === bday.getMonth();

      if (isToday) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isBirthday: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds, isBirthday: false });
    };

    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [birthday]);

  if (!timeLeft) return null;

  if (timeLeft.isBirthday) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass rounded-2xl p-6 text-center shadow-glow max-w-sm mx-auto"
      >
        <p className="font-display text-2xl gradient-text font-bold">🎂 Today is {name}'s Birthday! 🎂</p>
        <p className="text-gray-400 font-body text-sm mt-2">Celebrate this amazing day! 🎉</p>
      </motion.div>
    );
  }

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <p className="font-hand text-gray-400 mb-4 text-lg">Next birthday countdown 🎂</p>
      <div className="flex justify-center gap-3">
        {units.map((u) => (
          <div key={u.label} className="glass rounded-xl p-3 min-w-[60px] text-center">
            <motion.div
              key={u.value}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="font-display text-2xl font-bold gradient-text"
            >
              {String(u.value).padStart(2, "0")}
            </motion.div>
            <div className="font-body text-gray-400 text-xs">{u.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

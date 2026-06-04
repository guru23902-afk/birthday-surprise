"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react";

interface MusicPlayerProps {
  music: {
    title: string;
    artist: string;
    src: string;
    autoplay: boolean;
  };
}

export default function MusicPlayer({ music }: MusicPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [visible, setVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(music.src);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    audio.addEventListener("timeupdate", () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    });

    if (music.autoplay) {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }

    return () => {
      audio.pause();
      audio.src = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [music.src]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => {});
      setPlaying(true);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !muted;
    setMuted(!muted);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * audio.duration;
  };

  // Visualizer bars (fake animation)
  const bars = Array.from({ length: 16 });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 right-4 z-40 w-64 rounded-2xl shadow-glow overflow-hidden"
          style={{ background: "rgba(26, 10, 14, 0.9)", backdropFilter: "blur(16px)", border: "1px solid rgba(244,63,94,0.3)" }}
          role="region"
          aria-label="Music player"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-3 pt-3 pb-1">
            <div className="flex items-center gap-2">
              <motion.div
                animate={playing ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #f43f5e, #ec4899)" }}
              >
                <Music size={12} className="text-white" />
              </motion.div>
              <div>
                <p className="text-white text-xs font-semibold truncate max-w-[120px]">{music.title}</p>
                <p className="text-gray-400 text-[10px]">{music.artist}</p>
              </div>
            </div>
            <button
              onClick={() => setVisible(false)}
              className="text-gray-500 hover:text-white text-xs"
              aria-label="Close music player"
            >
              ✕
            </button>
          </div>

          {/* Visualizer */}
          <div className="flex items-end justify-center gap-0.5 h-6 px-3 my-1">
            {bars.map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 rounded-full"
                style={{ background: `linear-gradient(to top, #f43f5e, #ec4899)` }}
                animate={playing ? {
                  height: [`${20 + Math.sin(i) * 15}%`, `${60 + Math.cos(i) * 30}%`, `${20 + Math.sin(i) * 15}%`]
                } : { height: "20%" }}
                transition={{ duration: 0.6 + i * 0.05, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div
            className="mx-3 h-1 bg-white/10 rounded-full cursor-pointer my-2"
            onClick={handleSeek}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ width: `${progress}%`, background: "linear-gradient(90deg, #f43f5e, #ec4899)" }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between px-3 pb-3">
            <button
              onClick={toggleMute}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>

            <motion.button
              onClick={togglePlay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-full flex items-center justify-center shadow-glow"
              style={{ background: "linear-gradient(135deg, #f43f5e, #ec4899)" }}
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <Pause size={16} className="text-white" /> : <Play size={16} className="text-white" fill="white" />}
            </motion.button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolume}
              className="w-14 h-1 accent-rose-500"
              aria-label="Volume"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

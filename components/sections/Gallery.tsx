"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import type { Photo } from "@/types";

interface GalleryProps {
  photos: Photo[];
}

type GalleryMode = "polaroid" | "heart" | "scrapbook";

const LightboxModal = ({ photo, onClose }: { photo: Photo; onClose: () => void }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          aria-label="Close lightbox"
        >
          <X size={16} />
        </button>
        <div className="relative aspect-[4/3] w-full">
          <Image src={photo.src} alt={photo.caption} fill className="object-cover" sizes="(max-width: 768px) 100vw, 672px" />
        </div>
        <div className="p-4 text-center">
          <p className="font-hand text-lg text-gray-700">{photo.caption}</p>
          <p className="text-sm text-gray-400 mt-1">{photo.date}</p>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

const PolaroidCard = ({ photo, index, onClick }: { photo: Photo; index: number; onClick: () => void }) => {
  const rotate = index % 2 === 0 ? -3 + (index % 3) : 2 - (index % 3);
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 10, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
      className="polaroid cursor-pointer group relative"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={`View photo: ${photo.caption}`}
    >
      <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
        <Image src={photo.src} alt={photo.caption} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 25vw" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
      <p className="font-hand text-sm text-gray-600 text-center mt-3 px-1 leading-tight">{photo.caption}</p>
      <p className="font-body text-xs text-gray-400 text-center">{photo.date}</p>
    </motion.div>
  );
};

const ScrapbookCard = ({ photo, index, onClick }: { photo: Photo; index: number; onClick: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
    whileHover={{ scale: 1.03, zIndex: 10 }}
    className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-glass"
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => e.key === "Enter" && onClick()}
    aria-label={`View photo: ${photo.caption}`}
  >
    <div className="relative aspect-[4/3]">
      <Image src={photo.src} alt={photo.caption} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
        <p className="font-hand text-sm leading-tight">{photo.caption}</p>
        <p className="text-xs text-white/70">{photo.date}</p>
      </div>
    </div>
    {/* Decorative tape */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-5 bg-yellow-200/60 rounded-sm" />
  </motion.div>
);

export default function Gallery({ photos }: GalleryProps) {
  const [mode, setMode] = useState<GalleryMode>("polaroid");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const modes: { key: GalleryMode; label: string; icon: string }[] = [
    { key: "polaroid", label: "Polaroid Wall", icon: "📸" },
    { key: "heart", label: "Heart Album", icon: "💕" },
    { key: "scrapbook", label: "Scrapbook", icon: "📖" },
  ];

  return (
    <section
      id="gallery"
      ref={ref}
      className="py-20 px-4"
      style={{ background: "linear-gradient(180deg, #fff1f2 0%, #fdf2f8 100%)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="text-center mb-12"
      >
        <h2 className="font-display text-4xl md:text-5xl gradient-text font-bold mb-4">
          Memory Gallery 📸
        </h2>
        <p className="text-gray-500 font-body">Every picture tells a story of us</p>

        {/* Mode switcher */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {modes.map((m) => (
            <motion.button
              key={m.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMode(m.key)}
              className={`px-5 py-2 rounded-full font-body text-sm font-medium transition-all duration-300 ${
                mode === m.key
                  ? "text-white shadow-glow"
                  : "glass text-gray-600 hover:shadow-md"
              }`}
              style={mode === m.key ? { background: "linear-gradient(135deg, #f43f5e, #ec4899)" } : {}}
              aria-pressed={mode === m.key}
            >
              {m.icon} {m.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          {mode === "polaroid" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {photos.map((photo, i) => (
                <PolaroidCard key={photo.id} photo={photo} index={i} onClick={() => setSelectedPhoto(photo)} />
              ))}
            </div>
          )}

          {mode === "heart" && (
            <div className="relative">
              {/* Heart arrangement */}
              <div className="flex flex-wrap justify-center gap-4">
                {photos.map((photo, i) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1, type: "spring", bounce: 0.4 }}
                    className="relative"
                    style={{
                      transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (i % 3) * 5}deg)`,
                    }}
                  >
                    {/* Heart-shaped clip with border */}
                    <div
                      className="relative w-32 h-32 md:w-40 md:h-40 cursor-pointer group overflow-hidden"
                      style={{
                        clipPath: "path('M 50,30 A 20,20 0 0 1 90,30 A 20,20 0 0 1 130,30 Q 130,60 100,90 L 50,90 Q 20,60 10,30 Q 10,30 30,30 Z')",
                      }}
                      onClick={() => setSelectedPhoto(photo)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && setSelectedPhoto(photo)}
                      aria-label={photo.caption}
                    >
                      <div className="relative w-full h-full">
                        <Image src={photo.src} alt={photo.caption} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="160px" />
                      </div>
                    </div>
                    <p className="text-center font-hand text-xs text-gray-500 mt-1 max-w-[120px]">{photo.caption}</p>
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-6 text-6xl animate-pulse">💕</div>
            </div>
          )}

          {mode === "scrapbook" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-amber-50/50 p-8 rounded-3xl"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(244,114,182,0.05) 20px, rgba(244,114,182,0.05) 21px)"
              }}
            >
              {photos.map((photo, i) => (
                <ScrapbookCard key={photo.id} photo={photo} index={i} onClick={() => setSelectedPhoto(photo)} />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {selectedPhoto && <LightboxModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />}
    </section>
  );
}

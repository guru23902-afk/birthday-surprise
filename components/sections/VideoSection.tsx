"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Play } from "lucide-react";
import type { Video } from "@/types";

interface VideoSectionProps {
  videos: Video[];
}

export default function VideoSection({ videos }: VideoSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  if (!videos || videos.length === 0) return null;

  return (
    <section
      id="videos"
      ref={ref}
      className="py-20 px-4"
      style={{ background: "linear-gradient(180deg, #0f0a1e 0%, #1a0a0e 100%)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="text-center mb-12"
      >
        <h2 className="font-display text-4xl md:text-5xl gradient-text font-bold mb-4">
          Video Messages 🎬
        </h2>
        <p className="text-gray-400 font-body">Special messages just for you</p>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-8">
        {videos.map((video, i) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.2 }}
            className="glass rounded-3xl overflow-hidden shadow-glow"
          >
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #f43f5e, #ec4899)" }}>
                  <Play size={14} className="text-white" fill="white" />
                </div>
                <h3 className="font-display text-white text-lg">{video.title}</h3>
              </div>
            </div>

            {video.type === "youtube" ? (
              <div className="relative aspect-video">
                <iframe
                  src={`${video.src}?rel=0&modestbranding=1`}
                  title={video.title}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="relative aspect-video bg-black">
                <video
                  src={video.src}
                  className="w-full h-full object-contain"
                  controls
                  preload="metadata"
                  aria-label={video.title}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

import type { BirthdayConfig } from "@/types";
import data from "@/config/data.json";
import Hero from "@/components/sections/Hero";
import Letter from "@/components/sections/Letter";
import Gallery from "@/components/sections/Gallery";
import Timeline from "@/components/sections/Timeline";
import FlipCards from "@/components/sections/FlipCards";
import Slideshow from "@/components/sections/Slideshow";
import BirthdayCake from "@/components/sections/BirthdayCake";
import VideoSection from "@/components/sections/VideoSection";
import GiftBox from "@/components/sections/GiftBox";
import MemoryWall from "@/components/sections/MemoryWall";
import FinalCelebration from "@/components/sections/FinalCelebration";
import AiPoem from "@/components/sections/AiPoem";
import QRShare from "@/components/sections/QRShare";
import BirthdayCountdown from "@/components/sections/BirthdayCountdown";
import DarkModeToggle from "@/components/ui/DarkModeToggle";
import ShareButton from "@/components/ui/ShareButton";
import LiveClock from "@/components/ui/LiveClock";
import MusicPlayer from "@/components/sections/MusicPlayer";
import CustomCursor from "@/components/ui/CustomCursor";
import FloatingParticles from "@/components/ui/FloatingParticles";

const config = data as BirthdayConfig;

export default function Home() {
  return (
    <main className="relative overflow-x-hidden dark:bg-gray-950">
      {/* Global UI */}
      <CustomCursor />
      <FloatingParticles />
      <DarkModeToggle />
      <ShareButton />
      <LiveClock />
      <MusicPlayer music={config.music} />

      {/* Sections */}
      <Hero
        name={config.name}
        heroMessage={config.heroMessage}
        heroSubheading={config.heroSubheading}
      />

      <Letter letter={config.letter} />

      <Gallery photos={config.photos} />

      <Timeline items={config.timeline} />

      <FlipCards reasons={config.specialReasons} name={config.name} />

      <Slideshow slides={config.slideshow} />

      <BirthdayCake
        candleCount={config.candles}
        wish={config.birthdayWish}
        name={config.name}
      />

      <VideoSection videos={config.videos} />

      <GiftBox gift={config.giftBox} />

      <MemoryWall notes={config.memoryWall} />

      <AiPoem name={config.name} />

      {/* Countdown */}
      <section className="py-16 px-4" style={{ background: "linear-gradient(180deg, #f5f3ff 0%, #fdf2f8 100%)" }}>
        <BirthdayCountdown birthday={config.birthday} name={config.name} />
      </section>

      <QRShare />

      <FinalCelebration
        name={config.name}
        closingMessage={config.closingMessage}
        stats={config.stats}
      />

      {/* Navigation dots */}
      <nav
        className="fixed right-3 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2"
        aria-label="Page sections"
      >
        {[
          { id: "hero", emoji: "🎂" },
          { id: "letter", emoji: "💌" },
          { id: "gallery", emoji: "📸" },
          { id: "timeline", emoji: "🗺️" },
          { id: "reasons", emoji: "✨" },
          { id: "slideshow", emoji: "🎞️" },
          { id: "cake", emoji: "🕯️" },
          { id: "gift", emoji: "🎁" },
          { id: "memories", emoji: "📝" },
          { id: "final", emoji: "🎊" },
        ].map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="w-8 h-8 glass rounded-full flex items-center justify-center text-xs hover:shadow-glow transition-all duration-200 hover:scale-125"
            aria-label={`Navigate to ${section.id} section`}
            title={section.id}
          >
            {section.emoji}
          </a>
        ))}
      </nav>
    </main>
  );
}

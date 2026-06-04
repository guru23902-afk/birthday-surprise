export interface Photo {
  id: string;
  src: string;
  caption: string;
  date: string;
}

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  emoji: string;
  photo?: string | null;
}

export interface SpecialReason {
  id: string;
  icon: string;
  title: string;
  message: string;
}

export interface SlideshowItem {
  id: string;
  src: string;
  caption: string;
}

export interface Video {
  id: string;
  type: "youtube" | "mp4";
  src: string;
  title: string;
}

export interface MemoryNote {
  id: string;
  note: string;
  color: string;
}

export interface BirthdayConfig {
  name: string;
  heroMessage: string;
  heroSubheading: string;
  letter: {
    greeting: string;
    body: string;
    signature: string;
    signatureName: string;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    bgFrom: string;
    bgTo: string;
    darkBgFrom: string;
    darkBgTo: string;
  };
  photos: Photo[];
  timeline: TimelineItem[];
  specialReasons: SpecialReason[];
  slideshow: SlideshowItem[];
  candles: number;
  birthdayWish: string;
  videos: Video[];
  music: {
    title: string;
    artist: string;
    src: string;
    autoplay: boolean;
  };
  giftBox: {
    title: string;
    message: string;
    revealEmoji: string;
  };
  memoryWall: MemoryNote[];
  closingMessage: string;
  stats: {
    daysKnown: number;
    memoriesMade: number;
    laughter: string;
    love: string;
  };
  birthday: string;
  seo: {
    title: string;
    description: string;
    ogImage: string;
  };
}

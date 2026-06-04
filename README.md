# 🎂 Birthday Surprise Website

A premium, fully responsive birthday surprise website built with Next.js 15, Framer Motion, and Tailwind CSS.

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
cd birthday-surprise
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Admin Panel
Visit [http://localhost:3000/admin](http://localhost:3000/admin) to customize content without editing code.

---

## Customization

All content lives in `config/data.json`. Edit this file to change:

| Field | Description |
|-------|-------------|
| `name` | Birthday person's name |
| `heroMessage` | Main heading |
| `letter` | The heartfelt letter content |
| `photos` | Gallery photos (URLs + captions) |
| `timeline` | Memory timeline events |
| `specialReasons` | Flip card content |
| `slideshow` | Slideshow images |
| `videos` | YouTube/MP4 videos |
| `music` | Background music |
| `giftBox` | Surprise gift message |
| `memoryWall` | Sticky note memories |
| `birthday` | Birthday date (YYYY-MM-DD) |
| `theme` | Color overrides |

### Adding Photos
Option 1 — URL: Use any public image URL (Unsplash, Cloudinary, etc.)
Option 2 — Local: Place images in `/public/images/` and use `/images/photo.jpg`

### Adding Music
1. Place your `.mp3` in `/public/music/`
2. Update `config/data.json`: `"music": { "src": "/music/yourfile.mp3" }`

---

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) for automatic deploys.

---

## Sections

1. **Hero** — Full-screen animated cake, balloons, confetti
2. **Letter** — Typewriter animated heartfelt message
3. **Gallery** — 3 modes: Polaroid, Heart, Scrapbook
4. **Timeline** — Scrolling memory timeline
5. **Flip Cards** — 3D flip cards with special reasons
6. **Slideshow** — Auto-playing photo slideshow
7. **Interactive Cake** — Blow out candles with fireworks
8. **Video Messages** — YouTube or MP4 embeds
9. **Music Player** — Floating player with visualizer
10. **Gift Box** — Animated surprise box
11. **Memory Wall** — Rotating sticky notes
12. **Birthday Poem** — Auto-generated poem
13. **Countdown** — Live countdown to next birthday
14. **QR Share** — QR code for sharing
15. **Final Celebration** — Fireworks finale with stats

## Tech Stack

- **Next.js 15** — Framework
- **Framer Motion** — Animations
- **Tailwind CSS** — Styling
- **TypeScript** — Type safety
- **Lucide React** — Icons

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'Lato'", "sans-serif"],
        hand: ["'Dancing Script'", "cursive"],
      },
      colors: {
        rose: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c",
          800: "#9f1239",
          900: "#881337",
        },
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        sparkle: "sparkle 1.5s ease-in-out infinite",
        "bounce-slow": "bounce 3s infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        flicker: "flicker 1.5s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        "fade-in": "fadeIn 1s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.2)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1", transform: "scaleY(1) scaleX(1)" },
          "25%": { opacity: "0.8", transform: "scaleY(0.95) scaleX(1.05)" },
          "50%": { opacity: "0.9", transform: "scaleY(1.05) scaleX(0.95)" },
          "75%": { opacity: "0.7", transform: "scaleY(0.98) scaleX(1.02)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backdropBlur: { xs: "2px" },
      boxShadow: {
        glow: "0 0 20px rgba(244, 63, 94, 0.4)",
        "glow-lg": "0 0 40px rgba(244, 63, 94, 0.6)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
export default config;

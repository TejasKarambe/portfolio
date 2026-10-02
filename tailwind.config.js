/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        ink: "#F8FAFC",
        muted: "#94A3B8",
        cyan: {
          glow: "#22D3EE",
        },
        violet: {
          glow: "#A855F7",
        },
        emerald: {
          glow: "#10B981",
        },
        amber: {
          glow: "#F59E0B",
        }
      },
      backgroundImage: {
        "space-gradient":
          "radial-gradient(circle at 15% 10%, rgba(168,85,247,0.22), transparent 45%), radial-gradient(circle at 85% 20%, rgba(34,211,238,0.18), transparent 40%), radial-gradient(circle at 50% 90%, rgba(16,185,129,0.12), transparent 45%), linear-gradient(180deg, #070913 0%, #0F1226 50%, #13172E 100%)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.45)",
        "glass-glow": "0 0 25px -5px rgba(34, 211, 238, 0.35)",
        "neon-purple": "0 0 25px -5px rgba(168, 85, 247, 0.35)",
        "glass-inset": "inset 0 1px 0 rgba(255, 255, 255, 0.12)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
    },
  },
  plugins: [],
};

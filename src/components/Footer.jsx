import React from "react";
import { ArrowUp, Cookie, Heart, Sparkles, Terminal } from "lucide-react";
import { profile } from "../data/profileData";
import { playClickSound } from "../lib/sound";

export function Footer({ onOpenCookies, onOpenTerminal }) {
  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 bg-[#060814] py-12 px-4 text-xs text-muted">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 font-display font-bold text-white text-sm mb-1">
            <span className="h-2 w-2 rounded-full bg-cyan-glow" />
            {profile.name} • {profile.title}
          </div>
          <p className="text-[11px] text-muted">
            Engineered with React, TailwindCSS, Web Audio API & In-Device Cookies.
            Optimized for GitHub Pages static hosting.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
          <button
            onClick={onOpenCookies}
            className="flex items-center gap-1.5 hover:text-cyan-glow transition-colors"
          >
            <Cookie className="h-3.5 w-3.5" /> Cookie Memory
          </button>
          <span>•</span>
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-1.5 hover:text-cyan-glow transition-colors"
          >
            <Terminal className="h-3.5 w-3.5" /> Terminal
          </button>
          <span>•</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-slate-200 hover:bg-white/10 transition-colors"
          >
            <ArrowUp className="h-3 w-3" /> Back to Top
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-6 pt-6 border-t border-white/[0.05] text-center text-[10px] text-muted/60">
        © {new Date().getFullYear()} {profile.name}. All project sandboxes and high-scores run client-side.
      </div>
    </footer>
  );
}

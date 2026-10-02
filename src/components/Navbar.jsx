import React, { useState, useEffect } from "react";
import {
  Cookie,
  Volume2,
  VolumeX,
  Palette,
  Terminal,
  Gamepad2,
  FolderGit2,
  Sparkles,
  Menu,
  X,
  Clock,
} from "lucide-react";
import { getCookie, setCookie } from "../lib/cookies";
import { playClickSound } from "../lib/sound";

export function Navbar({
  currentTheme,
  onThemeChange,
  soundEnabled,
  onSoundToggle,
  onOpenCookies,
  onOpenTerminal,
  visitorName,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [secondsSpent, setSecondsSpent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsSpent((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDwellTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const themes = [
    { key: "cyber", label: "Cyber Neon", dot: "bg-cyan-400" },
    { key: "matrix", label: "Matrix Green", dot: "bg-emerald-400" },
    { key: "sunset", label: "Sunset Ember", dot: "bg-amber-400" },
    { key: "sapphire", label: "Sapphire Blue", dot: "bg-blue-400" },
  ];

  const cycleTheme = () => {
    playClickSound();
    const idx = themes.findIndex((t) => t.key === currentTheme);
    const nextTheme = themes[(idx + 1) % themes.length].key;
    onThemeChange(nextTheme);
  };

  return (
    <header className="sticky top-3 z-40 mx-auto w-full max-w-6xl px-4">
      <nav className="glass rounded-2xl px-4 py-2.5 flex items-center justify-between shadow-2xl border border-white/10">
        {/* Brand & Status */}
        <a
          href="#"
          onClick={() => playClickSound()}
          className="flex items-center gap-2.5 group"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 font-display font-bold text-white shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            TK
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-[#0B0F1E] animate-pulse" />
          </div>
          <div className="hidden sm:block text-left">
            <div className="font-display font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
              Tejas Karambe
              {visitorName && (
                <span className="text-[11px] font-normal text-cyan-300">
                  • Hi, {visitorName}!
                </span>
              )}
            </div>
            <div className="text-[10px] text-muted font-mono">
              Full-Stack & ERP Architect
            </div>
          </div>
        </a>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-1 text-xs">
          {[
            // { href: "#projects", label: "Projects (15)" },
            { href: "#games", label: "Arcade Games" },
            { href: "#tools", label: "Dev Tools" },
            { href: "#skills", label: "Skills Radar" },
            { href: "#experience", label: "Experience" },
            { href: "#contact", label: "Contact" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => playClickSound()}
              className="rounded-full px-3 py-1.5 text-muted hover:text-white hover:bg-white/[0.08] transition-all font-medium"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right Tools & Badges */}
        <div className="flex items-center gap-1.5">
          {/* Visitor Dwell Time Badge */}
          <div
            className="hidden lg:flex items-center gap-1.5 rounded-full bg-white/[0.04] border border-white/10 px-2.5 py-1 text-[11px] font-mono text-muted"
            title="Time spent exploring Tejas's portfolio"
          >
            <Clock className="h-3 w-3 text-cyan-glow" />
            <span>{formatDwellTime(secondsSpent)}</span>
          </div>

          {/* Theme Cycler */}
          <button
            onClick={cycleTheme}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs text-muted hover:text-white hover:bg-white/10 transition-colors"
            title={`Current theme: ${currentTheme}. Click to cycle`}
          >
            <Palette className="h-3.5 w-3.5 text-cyan-glow" />
            <span className="hidden sm:inline capitalize font-mono text-[11px]">
              {currentTheme}
            </span>
          </button>

          {/* Audio FX Toggle */}
          <button
            onClick={onSoundToggle}
            className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-muted hover:text-white hover:bg-white/10 transition-colors"
            title={soundEnabled ? "Mute audio sound FX" : "Unmute audio sound FX"}
          >
            {soundEnabled ? (
              <Volume2 className="h-3.5 w-3.5 text-cyan-glow" />
            ) : (
              <VolumeX className="h-3.5 w-3.5" />
            )}
          </button>

          {/* Cookie Memory Vault Button */}
          <button
            onClick={onOpenCookies}
            className="flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition-all hover:scale-105 active:scale-95"
            title="Inspect in-device cookie storage & high scores"
          >
            <Cookie className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Cookie Vault</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-xl border border-white/10 bg-white/[0.04] p-2 text-white"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 glass rounded-2xl p-4 border border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-2 text-sm font-medium">
            {[
              // { href: "#projects", label: "Projects (15 Production & Prototypes)" },
              { href: "#games", label: "Arcade Games (Snake, Typer, Memory)" },
              { href: "#tools", label: "Dev Tools (Calculator & Converter)" },
              { href: "#skills", label: "Skills Radar & Tech Matrix" },
              { href: "#experience", label: "Experience & SDC ERP Roles" },
              { href: "#contact", label: "Get in Touch" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => {
                  playClickSound();
                  setMobileMenuOpen(false);
                }}
                className="rounded-xl px-3 py-2 text-slate-200 hover:bg-white/10 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

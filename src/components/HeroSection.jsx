import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  Terminal,
  Gamepad2,
  Sparkles,
  MapPin,
  CheckCircle2,
  Cpu,
  Layers,
  Code2,
} from "lucide-react";
import { profile } from "../data/profileData";
import { playClickSound } from "../lib/sound";

const ROLES = [
  "Full-Stack Software Developer",
  "React.js & TypeScript Architect",
  "Java 21 & Spring Boot Engineer",
  "Enterprise ERP Systems Specialist",
  "Relational & SQL Optimization Expert",
];

export function HeroSection({ visitorName, onOpenTerminal, onOpenCookies }) {
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIdx((prev) => (prev + 1) % ROLES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-16 pb-14 text-center sm:pt-24 sm:pb-20 px-4">
      {/* Glow Orb Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-gradient-to-tr from-violet-600/20 via-cyan-500/15 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

      {/* Status Pill */}
      <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs text-cyan-200 mb-6 backdrop-blur-md shadow-lg shadow-cyan-500/10">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
        </span>
        <span className="font-semibold">{profile.status}</span>
        <span className="text-muted">• {profile.availability}</span>
      </div>

      {/* Main Name Heading */}
      <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white">
        {profile.name}
      </h1>

      {/* Dynamic Animated Role */}
      <div className="mt-3.5 h-8 sm:h-10 flex items-center justify-center">
        <p className="font-mono text-lg sm:text-2xl font-bold bg-gradient-to-r from-cyan-300 via-violet-300 to-amber-300 bg-clip-text text-transparent animate-in fade-in duration-300">
          {ROLES[roleIdx]}
        </p>
      </div>

      {/* Tagline & Impact Description */}
      <p className="mx-auto mt-4 max-w-2xl text-balance text-sm sm:text-base text-slate-300 leading-relaxed">
        {profile.tagline}
      </p>

      <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm text-muted">
        Currently delivering frontend architecture for 4 mission-critical university ERP modules
        at SDC, Dr. D. Y. Patil Unitech Society, serving 10,000+ daily academic users.
      </p>

      {/* Personalization Greeting */}
      {visitorName && (
        <div className="mt-4 inline-block rounded-xl bg-violet-500/10 border border-violet-500/20 px-3.5 py-1 text-xs text-violet-300 font-mono">
          👋 Welcome to my digital portfolio, <strong>{visitorName}</strong>! Enjoy the live sandboxes and games below.
        </div>
      )}

      {/* Primary Action Buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a
          href="#projects"
          onClick={() => playClickSound()}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-glow to-cyan-glow px-6 py-3 text-sm font-bold text-slate-950 shadow-xl shadow-cyan-glow/20 transition-all hover:scale-105 active:scale-95"
        >
          Explore 15 Projects <ArrowRight className="h-4 w-4" />
        </a>

        <a
          href="#games"
          onClick={() => playClickSound()}
          className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-cyan-glow/40 active:scale-95"
        >
          <Gamepad2 className="h-4 w-4 text-cyan-glow" /> Play Arcade Games
        </a>

        <button
          onClick={() => {
            playClickSound();
            onOpenTerminal?.();
          }}
          className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-violet-glow/40 active:scale-95"
        >
          <Terminal className="h-4 w-4 text-violet-glow" /> Terminal CLI
        </button>
      </div>

      {/* Social and Location Links */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted">
        <span className="flex items-center gap-1.5 text-slate-300">
          <MapPin className="h-3.5 w-3.5 text-cyan-glow" /> {profile.location}
        </span>
        <span className="text-white/20">•</span>
        <a
          href={`mailto:${profile.email}`}
          onClick={() => playClickSound()}
          className="flex items-center gap-1.5 hover:text-cyan-glow transition-colors"
        >
          <Mail className="h-3.5 w-3.5" /> {profile.email}
        </a>
        <span className="text-white/20">•</span>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          onClick={() => playClickSound()}
          className="flex items-center gap-1.5 hover:text-white transition-colors"
        >
          <Github className="h-3.5 w-3.5" /> GitHub
        </a>
        <span className="text-white/20">•</span>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          onClick={() => playClickSound()}
          className="flex items-center gap-1.5 hover:text-cyan-glow transition-colors"
        >
          <Linkedin className="h-3.5 w-3.5" /> LinkedIn
        </a>
      </div>

      {/* Key Stats Counter Grid */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
        {profile.stats.map((s, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left backdrop-blur-md hover:border-cyan-glow/30 transition-colors"
          >
            <div className="font-mono text-2xl sm:text-3xl font-bold text-white">
              {s.value}
            </div>
            <div className="font-semibold text-xs text-cyan-300 mt-0.5">
              {s.label}
            </div>
            <div className="text-[11px] text-muted mt-1 leading-snug">
              {s.note}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

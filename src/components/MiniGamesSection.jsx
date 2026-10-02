import React, { useState } from "react";
import { Gamepad2, Flame, Zap, Brain, Trophy, Sparkles } from "lucide-react";
import { CyberSnake } from "./games/CyberSnake";
import { CodeSpeedTyper } from "./games/CodeSpeedTyper";
import { MemoryMatrix } from "./games/MemoryMatrix";
import { getCookie } from "../lib/cookies";
import { playClickSound } from "../lib/sound";

export function MiniGamesSection() {
  const [activeGame, setActiveGame] = useState("snake"); // 'snake' | 'typer' | 'memory'

  const snakeBest = getCookie("snake_best", 0);
  const typerBest = getCookie("typer_best", 0);
  const memoryBest = getCookie("memory_best", 0);

  const games = [
    {
      id: "snake",
      name: "Cyber Snake 3000",
      icon: Flame,
      color: "text-cyan-glow",
      best: snakeBest > 0 ? `${snakeBest} pts` : "Not played",
      desc: "Retro arcade snake with speed upgrades and bonus orbs.",
    },
    {
      id: "typer",
      name: "Code Speed Typer",
      icon: Zap,
      color: "text-amber-glow",
      best: typerBest > 0 ? `${typerBest} WPM` : "Not played",
      desc: "Test your typing speed on real Java, React, and SQL snippets.",
    },
    {
      id: "memory",
      name: "Tech Memory Matrix",
      icon: Brain,
      color: "text-violet-glow",
      best: memoryBest > 0 ? `${memoryBest} moves` : "Not played",
      desc: "Decrypt and pair matching dev tools in fewest moves.",
    },
  ];

  return (
    <section id="games" className="py-16 px-4 max-w-6xl mx-auto scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-violet-glow font-mono text-xs font-semibold uppercase tracking-wider mb-2">
            <Gamepad2 className="h-4 w-4" /> Interactive Visitor Arcade
          </div>
          <h2 className="section-title">
            Mini Games & High-Score Vault
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-muted max-w-xl">
            Take a breather and test your reflexes! All high-scores are automatically saved
            into your device's <strong>browser cookies</strong> so you can beat your records whenever you return.
          </p>
        </div>

        {/* Global Trophy Pill */}
        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-2.5 px-4 backdrop-blur-md">
          <Trophy className="h-4 w-4 text-amber-glow" />
          <div className="text-xs">
            <span className="text-muted">In-Device Memory: </span>
            <span className="font-mono text-white font-bold">
              {snakeBest > 0 || typerBest > 0 || memoryBest > 0 ? "3 Records Synced" : "Ready to play"}
            </span>
          </div>
        </div>
      </div>

      {/* Game Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {games.map((g) => {
          const Icon = g.icon;
          const isCurrent = activeGame === g.id;
          return (
            <button
              key={g.id}
              onClick={() => {
                playClickSound();
                setActiveGame(g.id);
              }}
              className={`rounded-2xl border p-4 text-left transition-all duration-200 ${
                isCurrent
                  ? "border-cyan-glow bg-cyan-glow/10 shadow-lg shadow-cyan-glow/10 -translate-y-0.5"
                  : "border-white/10 bg-[#0B0F22]/70 hover:border-white/20 hover:bg-[#0B0F22]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${g.color}`} />
                  <span className="font-display font-bold text-sm text-white">
                    {g.name}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-cyan-300 bg-white/5 px-2 py-0.5 rounded-full">
                  Best: {g.best}
                </span>
              </div>
              <p className="text-xs text-muted leading-relaxed">{g.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Active Game Arena */}
      <div className="glass rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {activeGame === "snake" && <CyberSnake />}
        {activeGame === "typer" && <CodeSpeedTyper />}
        {activeGame === "memory" && <MemoryMatrix />}
      </div>
    </section>
  );
}

import React, { useState } from "react";
import { Wrench, Calculator, ArrowLeftRight, Terminal, Sparkles, Layers } from "lucide-react";
import { DevCalculator } from "./apps/DevCalculator";
import { UnitConverter } from "./apps/UnitConverter";
import { CyberTerminal } from "./apps/CyberTerminal";
import { playClickSound } from "../lib/sound";

export function MiniAppsSection({ onSelectProject, onSelectTheme }) {
  const [activeTool, setActiveTool] = useState("calc"); // 'calc' | 'converter' | 'terminal'

  const tools = [
    {
      id: "calc",
      name: "Calculator & History Tape",
      icon: Calculator,
      desc: "Standard and scientific calculator with cookie-persisted calculation tape and instant copy.",
    },
    {
      id: "converter",
      name: "Universal Unit Converter",
      icon: ArrowLeftRight,
      desc: "Convert digital storage (Bytes, MB, GB), length, weight, speed, temperature, and crypto.",
    },
    {
      id: "terminal",
      name: "Cyber Terminal CLI",
      icon: Terminal,
      desc: "Interactive developer command shell. Type 'help', 'skills', or 'sudo hire'.",
    },
  ];

  return (
    <section id="tools" className="py-16 px-4 max-w-6xl mx-auto scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-cyan-glow font-mono text-xs font-semibold uppercase tracking-wider mb-2">
            <Wrench className="h-4 w-4" /> Integrated Developer Utilities
          </div>
          <h2 className="section-title">
            Interactive Mini-Apps Deck
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-muted max-w-xl">
            Productivity tools built directly into the client-side experience.
            Calculations, conversions, and commands are computed with zero latency and saved in local cookies.
          </p>
        </div>
      </div>

      {/* Tool Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {tools.map((t) => {
          const Icon = t.icon;
          const isCurrent = activeTool === t.id;
          return (
            <button
              key={t.id}
              onClick={() => {
                playClickSound();
                setActiveTool(t.id);
              }}
              className={`rounded-2xl border p-4 text-left transition-all duration-200 ${
                isCurrent
                  ? "border-cyan-glow bg-cyan-glow/10 shadow-lg shadow-cyan-glow/10 -translate-y-0.5"
                  : "border-white/10 bg-[#0B0F22]/70 hover:border-white/20 hover:bg-[#0B0F22]"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="h-4 w-4 text-cyan-glow" />
                <span className="font-display font-bold text-sm text-white">
                  {t.name}
                </span>
              </div>
              <p className="text-xs text-muted leading-relaxed">{t.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Active Tool Body */}
      <div className="glass rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
        {activeTool === "calc" && <DevCalculator />}
        {activeTool === "converter" && <UnitConverter />}
        {activeTool === "terminal" && (
          <CyberTerminal
            onSelectProject={onSelectProject}
            onSelectTheme={onSelectTheme}
          />
        )}
      </div>
    </section>
  );
}

import React, { useState } from "react";
import {
  Cpu,
  Server,
  Layout,
  Database,
  Terminal,
  CheckCircle2,
  Sparkles,
  Code2,
} from "lucide-react";
import { skillsData } from "../data/profileData";
import { playClickSound } from "../lib/sound";

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(0);

  const icons = [Layout, Server, Database, Cpu];

  return (
    <section id="skills" className="py-16 px-4 max-w-6xl mx-auto scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-cyan-glow font-mono text-xs font-semibold uppercase tracking-wider mb-2">
            <Cpu className="h-4 w-4" /> Technical Competencies & Architecture
          </div>
          <h2 className="section-title">
            Skills Radar & Proficiency Matrix
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-muted max-w-xl">
            Clean component architecture on the frontend, data integrity and strict transactional
            contracts on the backend.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {skillsData.map((cat, idx) => {
          const Icon = icons[idx] || Cpu;
          const isCurrent = activeCategory === idx;
          return (
            <button
              key={cat.category}
              onClick={() => {
                playClickSound();
                setActiveCategory(idx);
              }}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${
                isCurrent
                  ? "bg-cyan-glow/20 border border-cyan-glow text-cyan-300 shadow-md shadow-cyan-glow/10"
                  : "bg-white/[0.04] border border-white/10 text-muted hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{cat.category}</span>
            </button>
          );
        })}
      </div>

      {/* Grid of Active Category Skills */}
      <div className="grid gap-4 sm:grid-cols-2">
        {skillsData[activeCategory].skills.map((skill) => (
          <div
            key={skill.name}
            className="rounded-2xl border border-white/10 bg-[#0B0F22]/80 p-4 backdrop-blur-xl hover:border-cyan-glow/30 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-display font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                {skill.name}
              </span>
              <span className="font-mono text-xs font-bold text-cyan-glow">
                {skill.level}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden mb-3">
              <div
                style={{ width: `${skill.level}%` }}
                className="h-full rounded-full bg-gradient-to-r from-violet-glow to-cyan-glow transition-all duration-700"
              />
            </div>

            {/* Skill Tags */}
            <div className="flex flex-wrap gap-1">
              {skill.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-white/[0.05] border border-white/5 px-2 py-0.5 text-[10px] font-mono text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Full-Stack Architectural Blueprint Callout */}
      <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-r from-violet-950/30 via-[#0B0F22] to-cyan-950/30 p-5 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300 border border-violet-500/30">
              <Code2 className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display font-bold text-sm text-white">
                Enterprise Full-Stack Pipeline Pattern
              </div>
              <p className="text-xs text-muted">
                React Query Cache ⇄ REST API Contracts ⇄ Spring Boot Service ⇄ Spring Data JPA ⇄ MySQL Transactions
              </p>
            </div>
          </div>
          <span className="shrink-0 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-mono font-semibold text-emerald-300">
            ✓ 99.9% ERP Uptime
          </span>
        </div>
      </div>
    </section>
  );
}

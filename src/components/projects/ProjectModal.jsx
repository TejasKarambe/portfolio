import React, { useState, useEffect } from "react";
import { X, ExternalLink, Github, Bookmark, Check, Layers, Cpu, Sparkles, Terminal } from "lucide-react";
import { getCookie, setCookie } from "../../lib/cookies";
import { playClickSound, playSuccessSound } from "../../lib/sound";
import {
  FinanceSandbox,
  JobTrackerSandbox,
  SplitterSandbox,
  KanbanSandbox,
  SqlSandbox,
  InterviewSandbox,
  ProductivitySandbox,
} from "./LiveSandboxes";

export function ProjectModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState("sandbox"); // 'sandbox' | 'architecture'
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (!project) return;
    const favorites = getCookie("favorite_projects", []);
    setIsBookmarked(favorites.includes(project.id));
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const toggleBookmark = () => {
    playClickSound();
    const favorites = getCookie("favorite_projects", []);
    let updated;
    if (favorites.includes(project.id)) {
      updated = favorites.filter((id) => id !== project.id);
      setIsBookmarked(false);
    } else {
      updated = [...favorites, project.id];
      setIsBookmarked(true);
      playSuccessSound();
    }
    setCookie("favorite_projects", updated, 60);
  };

  const renderSandbox = () => {
    switch (project.demoType) {
      case "finance":
        return <FinanceSandbox />;
      case "jobs":
        return <JobTrackerSandbox />;
      case "splitter":
        return <SplitterSandbox />;
      case "kanban":
        return <KanbanSandbox />;
      case "sql":
        return <SqlSandbox />;
      case "interview":
        return <InterviewSandbox />;
      case "productivity":
        return <ProductivitySandbox />;
      default:
        return (
          <div className="rounded-xl border border-white/10 bg-[#070B18] p-5 text-center">
            <div className="text-cyan-glow mb-2 text-2xl font-mono">⚡ Interactive Simulator Ready</div>
            <p className="text-xs text-muted max-w-md mx-auto leading-relaxed">
              This client-side application is engineered with {project.techStack.join(", ")}.
              Designed for zero-latency execution directly in modern web browsers and fully compatible with static GitHub Pages hosting.
            </p>
            <div className="mt-4 flex justify-center gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
                >
                  <Github className="h-4 w-4" /> View Source on GitHub
                </a>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative flex flex-col max-h-[92vh] w-full max-w-2xl rounded-2xl border border-white/15 bg-[#0B0F22] text-ink shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-white/10 p-5 bg-[#070914]">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase font-mono tracking-wider ${
                project.difficulty === "Easy"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
              }`}>
                {project.difficulty} Level
              </span>
              <span className="text-xs text-muted font-mono">{project.category}</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
              {project.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleBookmark}
              className={`rounded-full p-2 border transition-all ${
                isBookmarked
                  ? "border-amber-500/50 bg-amber-500/20 text-amber-300 shadow-md shadow-amber-500/20"
                  : "border-white/10 bg-white/5 text-muted hover:text-white"
              }`}
              title={isBookmarked ? "Saved in Cookie Vault" : "Bookmark to Cookies"}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-amber-300" : ""}`} />
            </button>
            <button
              onClick={onClose}
              className="rounded-full p-2 border border-white/10 bg-white/5 text-muted hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-white/10 bg-white/[0.02] px-5 text-xs font-medium">
          <button
            onClick={() => {
              playClickSound();
              setActiveTab("sandbox");
            }}
            className={`flex items-center gap-2 py-3 border-b-2 font-mono transition-colors ${
              activeTab === "sandbox"
                ? "border-cyan-glow text-cyan-300 font-semibold"
                : "border-transparent text-muted hover:text-white"
            }`}
          >
            <Terminal className="h-3.5 w-3.5" /> Interactive Sandbox
          </button>
          <button
            onClick={() => {
              playClickSound();
              setActiveTab("architecture");
            }}
            className={`flex items-center gap-2 py-3 px-4 border-b-2 font-mono transition-colors ${
              activeTab === "architecture"
                ? "border-violet-glow text-violet-300 font-semibold"
                : "border-transparent text-muted hover:text-white"
            }`}
          >
            <Layers className="h-3.5 w-3.5" /> Architecture & Concepts
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {activeTab === "sandbox" ? (
            <div>
              <div className="mb-3 flex items-center justify-between text-xs text-muted">
                <span className="flex items-center gap-1.5 font-mono">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-glow" /> Live Prototype (Zero-Backend Sandbox)
                </span>
                <span className="text-[11px] font-mono">Memory: Synced with Cookies</span>
              </div>
              {renderSandbox()}
            </div>
          ) : (
            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-mono text-muted uppercase text-[11px] mb-1">Overview</h4>
                <p className="text-slate-300 leading-relaxed text-sm">
                  {project.description}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-muted uppercase text-[11px] mb-2">Key Technical Implementations</h4>
                <div className="grid gap-2 sm:grid-cols-2">
                  {project.highlights.map((h, i) => (
                    <div key={i} className="flex gap-2 rounded-lg bg-white/[0.03] p-2.5 border border-white/5">
                      <span className="text-cyan-glow font-mono font-bold">•</span>
                      <span className="text-slate-200">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-mono text-muted uppercase text-[11px] mb-2">Core Concepts Mastered</h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.concepts.map((c) => (
                    <span key={c} className="rounded-lg bg-violet-500/15 border border-violet-500/30 px-2.5 py-1 text-violet-300 font-mono text-[11px]">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-mono text-muted uppercase text-[11px] mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="rounded-lg bg-white/10 px-2.5 py-1 text-slate-200 font-mono text-[11px]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-white/10 bg-[#070914] p-4 text-xs">
          <div className="text-muted text-[11px]">
            {isBookmarked ? "⭐ Saved in your in-device Cookie Vault" : "Click bookmark icon to save project"}
          </div>
          <div className="flex gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3.5 py-1.5 font-semibold text-white hover:bg-white/20 transition-colors"
              >
                <Github className="h-3.5 w-3.5" /> GitHub
              </a>
            )}
            <button
              onClick={onClose}
              className="rounded-lg bg-cyan-glow px-4 py-1.5 font-semibold text-slate-950 hover:bg-cyan-300"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

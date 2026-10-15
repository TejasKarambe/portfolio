import React, { useState, useMemo } from "react";
import {
  Search,
  Bookmark,
  ArrowUpRight,
  Github,
  ExternalLink,
  FolderGit2,
} from "lucide-react";
import { projectsList } from "../data/projectsData";
import { getCookie, setCookie } from "../lib/cookies";
import { playClickSound, playSuccessSound } from "../lib/sound";

export function ProjectsSection({ onOpenProject }) {
  const [search, setSearch] = useState("");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [favorites, setFavorites] = useState(() => getCookie("favorite_projects", []));

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    playClickSound();
    let updated;
    if (favorites.includes(id)) {
      updated = favorites.filter((favId) => favId !== id);
    } else {
      updated = [...favorites, id];
      playSuccessSound();
    }
    setFavorites(updated);
    setCookie("favorite_projects", updated, 60);
  };

  const filteredProjects = useMemo(() => {
    return projectsList.filter((project) => {
      // Search
      const q = search.toLowerCase();
      const matchSearch =
        !search ||
        project.title.toLowerCase().includes(q) ||
        project.summary.toLowerCase().includes(q) ||
        project.concepts.some((c) => c.toLowerCase().includes(q)) ||
        project.techStack.some((t) => t.toLowerCase().includes(q));

      // Favorites
      const matchFav = !showOnlyFavorites || favorites.includes(project.id);

      return matchSearch && matchFav;
    });
  }, [search, showOnlyFavorites, favorites]);

  return (
    <section id="projects" className="py-16 px-4 max-w-6xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-cyan-glow font-mono text-xs font-semibold uppercase tracking-wider mb-2">
            <FolderGit2 className="h-4 w-4" /> Selected Work
          </div>
          <h2 className="section-title">
            Featured Projects
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-muted max-w-xl">
            A few projects I have built, with links to their source code and live demos.
          </p>
        </div>

        {/* Favorite count pill */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playClickSound();
              setShowOnlyFavorites(!showOnlyFavorites);
            }}
            className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all ${
              showOnlyFavorites
                ? "border-amber-400/50 bg-amber-400/15 text-amber-300"
                : "border-white/10 bg-white/[0.04] text-muted hover:text-white"
            }`}
          >
            <Bookmark className={`h-3.5 w-3.5 ${showOnlyFavorites ? "fill-amber-300" : ""}`} />
            <span>Saved in Cookies ({favorites.length})</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass rounded-2xl p-3 sm:p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-3 border border-white/10">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="text"
            placeholder="Search projects, concepts, tech stack..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl bg-white/[0.06] border border-white/10 pl-9 pr-3 py-2 text-xs text-white placeholder-muted focus:outline-none focus:border-cyan-glow"
          />
        </div>

      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-white/10 bg-white/[0.02]">
          <p className="text-sm text-muted">No projects found matching your filter criteria.</p>
          <button
            onClick={() => {
              setSearch("");
              setShowOnlyFavorites(false);
            }}
            className="mt-3 text-xs text-cyan-glow font-mono underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => {
            const isFav = favorites.includes(project.id);
            return (
              <div
                key={project.id}
                onClick={() => {
                  playClickSound();
                  onOpenProject(project);
                }}
                className="group relative cursor-pointer rounded-2xl border border-white/10 bg-[#0B0F22]/90 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-glow/40 hover:shadow-2xl hover:shadow-cyan-glow/10 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Difficulty & Bookmark */}
                  <div className="flex items-center justify-end gap-2 mb-3">
                    

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => toggleFavorite(project.id, e)}
                        className={`rounded-full p-1.5 transition-colors ${
                          isFav
                            ? "text-amber-300 bg-amber-400/20"
                            : "text-muted hover:text-white hover:bg-white/10"
                        }`}
                        title={isFav ? "Remove bookmark" : "Save to cookies"}
                      >
                        <Bookmark className={`h-3.5 w-3.5 ${isFav ? "fill-amber-300" : ""}`} />
                      </button>
                    </div>
                  </div>

                  {/* Title & Category */}
                  <div className="text-[11px] font-mono text-muted mb-1">{project.category}</div>
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                    <span>{project.title}</span>
                    <ArrowUpRight className="h-4 w-4 text-muted group-hover:text-cyan-glow group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>

                  {/* Summary */}
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.08]">
                  {/* Main Concepts Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.concepts.map((concept) => (
                      <span
                        key={concept}
                        className="rounded-md bg-white/[0.05] border border-white/5 px-2 py-0.5 text-[10px] font-mono text-slate-300"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 text-xs pt-1">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-cyan-glow font-semibold text-[11px] hover:text-cyan-300"
                    >
                      <Github className="h-3.5 w-3.5" /> GitHub
                    </a>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-cyan-glow font-semibold text-[11px] hover:text-cyan-300"
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

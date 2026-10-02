import React from "react";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  Building,
  CheckCircle2,
  Award,
} from "lucide-react";
import { experienceData, educationData } from "../data/profileData";

export function ExperienceEducation() {
  return (
    <section id="experience" className="py-16 px-4 max-w-6xl mx-auto scroll-mt-20">
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Experience Column */}
        <div>
          <div className="flex items-center gap-2 text-cyan-glow font-mono text-xs font-semibold uppercase tracking-wider mb-2">
            <Briefcase className="h-4 w-4" /> Career Journey
          </div>
          <h2 className="section-title mb-6">Work Experience</h2>

          <div className="relative border-l border-white/15 pl-6 space-y-8">
            {experienceData.map((exp, idx) => (
              <div key={idx} className="relative group">
                {/* Glowing Node on Timeline */}
                <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-cyan-glow shadow-[0_0_12px_rgba(34,211,238,0.8)]" />

                <div className="rounded-2xl border border-white/10 bg-[#0B0F22]/80 p-5 backdrop-blur-xl group-hover:border-cyan-glow/40 transition-colors">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                    <h3 className="font-display font-bold text-base text-white">
                      {exp.role}
                    </h3>
                    <span className="text-[11px] font-mono text-cyan-300 bg-white/5 px-2 py-0.5 rounded-full">
                      {exp.period}
                    </span>
                  </div>

                  <div className="text-xs text-muted mb-3 flex items-center gap-1.5">
                    <Building className="h-3.5 w-3.5 text-violet-glow" />
                    <span>{exp.org}</span>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {exp.achievements.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1 pt-2 border-t border-white/[0.06]">
                    {exp.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded bg-white/[0.05] px-2 py-0.5 text-[10px] font-mono text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Column */}
        <div>
          <div className="flex items-center gap-2 text-violet-glow font-mono text-xs font-semibold uppercase tracking-wider mb-2">
            <GraduationCap className="h-4 w-4" /> Academic Credentials
          </div>
          <h2 className="section-title mb-6">Education</h2>

          <div className="space-y-6">
            {educationData.map((edu, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-[#0B0F22]/80 p-5 backdrop-blur-xl hover:border-violet-glow/40 transition-colors"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                  <h3 className="font-display font-bold text-base text-white">
                    {edu.degree}
                  </h3>
                  <span className="text-[11px] font-mono text-violet-300 bg-white/5 px-2 py-0.5 rounded-full">
                    {edu.period}
                  </span>
                </div>

                <div className="text-xs text-muted mb-3">
                  {edu.school}
                </div>

                <div className="inline-block rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-xs font-mono font-bold text-emerald-300 mb-3">
                  {edu.score}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.06]">
                  {edu.highlights.map((h) => (
                    <span
                      key={h}
                      className="rounded bg-white/[0.05] px-2 py-0.5 text-[10px] font-mono text-slate-300"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Engineering Discipline Callout */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-bold text-white mb-2">
                <Award className="h-4 w-4 text-amber-glow" /> Production Highlights
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Extensive practical expertise in database normalization, concurrency handling,
                API versioning, and client-side optimization across university-scale software deployments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

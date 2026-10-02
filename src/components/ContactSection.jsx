import React, { useState } from "react";
import {
  Mail,
  Copy,
  Check,
  Send,
  Github,
  Linkedin,
  MapPin,
  Sparkles,
  Phone,
} from "lucide-react";
import { profile } from "../data/profileData";
import { setCookie, getCookie } from "../lib/cookies";
import { playClickSound, playSuccessSound } from "../lib/sound";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [senderName, setSenderName] = useState(() => getCookie("visitorName", ""));
  const [dispatched, setDispatched] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    playSuccessSound();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    playClickSound();
    if (!message) return;

    // Formulate mailto url
    const fullBody = encodeURIComponent(
      `Hi Tejas,\n\n${message}\n\nBest regards,\n${senderName || "Portfolio Visitor"}`
    );
    const fullSubject = encodeURIComponent(subject || "Full-Stack Role / Project Inquiry");
    window.open(`mailto:${profile.email}?subject=${fullSubject}&body=${fullBody}`, "_blank");

    setDispatched(true);
    playSuccessSound();
  };

  return (
    <section id="contact" className="py-20 px-4 max-w-4xl mx-auto scroll-mt-20">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#0F142D] to-[#070914] p-6 sm:p-10 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
        {/* Glow behind */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-xl mx-auto mb-8 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs text-cyan-200 mb-3 font-mono">
            <Sparkles className="h-3.5 w-3.5" /> Let's Connect
          </div>
          <h2 className="section-title text-center">
            Ready to Build Something Remarkable?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-muted">
            Open to full-stack engineering roles, technical consultations, and high-impact ERP collaborations.
            Feel free to reach out via email or direct LinkedIn message.
          </p>
        </div>

        {/* Quick Email Copy Pill */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8 relative z-10">
          <div className="flex items-center gap-2 rounded-2xl bg-white/[0.05] border border-white/10 px-4 py-2 text-xs">
            <Mail className="h-4 w-4 text-cyan-glow" />
            <span className="font-mono text-white select-all">{profile.email}</span>
            <button
              onClick={handleCopyEmail}
              className="ml-2 rounded-lg bg-white/10 p-1.5 hover:bg-cyan-glow hover:text-slate-950 transition-colors"
              title="Copy email to clipboard"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            onClick={() => playClickSound()}
            className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-2 text-xs text-white hover:bg-white/10 transition-colors"
          >
            <Linkedin className="h-4 w-4 text-blue-400" /> LinkedIn Profile
          </a>

          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            onClick={() => playClickSound()}
            className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-2 text-xs text-white hover:bg-white/10 transition-colors"
          >
            <Github className="h-4 w-4 text-slate-200" /> GitHub Repos
          </a>
        </div>

        {/* Interactive Direct Dispatch Form */}
        <form onSubmit={handleSendMessage} className="max-w-lg mx-auto space-y-3 relative z-10 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Your Name (stored in cookies)"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="rounded-xl bg-white/[0.04] border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-muted focus:outline-none focus:border-cyan-glow"
            />
            <input
              type="text"
              placeholder="Subject / Role Title"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="rounded-xl bg-white/[0.04] border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-muted focus:outline-none focus:border-cyan-glow"
            />
          </div>

          <textarea
            rows={4}
            placeholder="Type your message, opportunity details, or questions..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full rounded-xl bg-white/[0.04] border border-white/10 p-3.5 text-xs text-white placeholder-muted focus:outline-none focus:border-cyan-glow resize-none"
          />

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-glow to-cyan-glow py-3 font-bold text-slate-950 shadow-xl shadow-cyan-glow/20 transition-all hover:opacity-95 active:scale-95"
          >
            <Send className="h-4 w-4" /> Send Direct Email to Tejas
          </button>

          {dispatched && (
            <div className="text-center text-[11px] text-emerald-400 font-mono pt-1">
              ✓ Email client initiated. Looking forward to our conversation!
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

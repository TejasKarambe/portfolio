import React, { useState, useRef, useEffect } from "react";
import { Terminal, Send, CornerDownLeft, Sparkles } from "lucide-react";
import { profile, skillsData } from "../../data/profileData";
import { projectsList } from "../../data/projectsData";
import { getCookieInventory } from "../../lib/cookies";
import { playClickSound, playSuccessSound, playBeepSound } from "../../lib/sound";

export function CyberTerminal({ onSelectProject, onSelectTheme }) {
  const [history, setHistory] = useState([
    { type: "system", text: "⚡ TejasOS Interactive Kernel v2.4 (x86_64-pc-none)" },
    { type: "system", text: "Type 'help' to inspect commands or 'sudo hire' for root credentials." },
  ]);
  const [input, setInput] = useState("");
  const [cmdIndex, setCmdIndex] = useState(-1);
  const [pastCommands, setPastCommands] = useState([]);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmdText) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    playClickSound();
    setPastCommands((prev) => [trimmed, ...prev]);
    setCmdIndex(-1);

    const newHistory = [...history, { type: "user", text: trimmed }];
    const parts = trimmed.split(" ");
    const command = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ").trim();

    switch (command) {
      case "help":
        newHistory.push({
          type: "output",
          text: `Available commands:
  • help           - List available shell commands
  • whoami         - Full developer profile & role
  • skills         - Inspect frontend, backend & database skills
  • projects       - List all 15 production & client-side projects
  • project <num>  - Open project details modal (e.g. 'project 1')
  • cookies        - Display active browser cookie inventory
  • calc <expr>    - Evaluate mathematical expression (e.g. 'calc 42 * 12')
  • theme <name>   - Change theme: cyber, matrix, sunset, sapphire
  • contact        - Display developer email and socials
  • clear          - Clear terminal console
  • sudo hire      - Request developer root authorization`,
        });
        break;

      case "whoami":
        newHistory.push({
          type: "output",
          text: `Name: ${profile.name}
Title: ${profile.title}
Location: ${profile.location}
Tagline: "${profile.tagline}"
Availability: ${profile.availability}
ERP Systems Built: Examination, Library, Student/Staff, Recruitment ERP`,
        });
        break;

      case "skills":
        newHistory.push({
          type: "output",
          text: skillsData
            .map(
              (g) =>
                `[${g.category}]\n  ` +
                g.skills.map((s) => `${s.name} (${s.level}%)`).join(", ")
            )
            .join("\n\n"),
        });
        break;

      case "projects":
        newHistory.push({
          type: "output",
          text: projectsList
            .map(
              (p, idx) =>
                `${idx + 1}. [${p.difficulty}] ${p.title} (${p.concepts.join(", ")})`
            )
            .join("\n"),
        });
        break;

      case "project": {
        const num = parseInt(arg);
        if (!isNaN(num) && num >= 1 && num <= projectsList.length) {
          const selected = projectsList[num - 1];
          newHistory.push({
            type: "success",
            text: `Launching ${selected.title}...`,
          });
          onSelectProject?.(selected);
        } else {
          newHistory.push({
            type: "error",
            text: `Usage: project <1-${projectsList.length}>. Type 'projects' to see list.`,
          });
        }
        break;
      }

      case "cookies": {
        const cookies = getCookieInventory();
        if (cookies.length === 0) {
          newHistory.push({
            type: "output",
            text: "No cookies or local state recorded yet. Play a game or bookmark a project to store in-device memory!",
          });
        } else {
          newHistory.push({
            type: "output",
            text:
              "Active in-device stored cookies:\n" +
              cookies.map((c) => `  • ${c.key}: ${c.value} (${c.size})`).join("\n"),
          });
        }
        break;
      }

      case "calc": {
        try {
          if (!arg) throw new Error("No expression provided");
          const sanitized = arg.replace(/[^0-9+\-*/().]/g, "");
          // eslint-disable-next-line no-new-func
          const ans = Function(`"use strict"; return (${sanitized})`)();
          newHistory.push({ type: "success", text: `${sanitized} = ${ans}` });
        } catch {
          newHistory.push({ type: "error", text: "Invalid mathematical expression" });
        }
        break;
      }

      case "theme": {
        const valid = ["cyber", "matrix", "sunset", "sapphire"];
        if (valid.includes(arg.toLowerCase())) {
          onSelectTheme?.(arg.toLowerCase());
          newHistory.push({
            type: "success",
            text: `Theme updated to '${arg.toLowerCase()}'.`,
          });
          playSuccessSound();
        } else {
          newHistory.push({
            type: "error",
            text: `Valid themes: ${valid.join(", ")}`,
          });
        }
        break;
      }

      case "contact":
        newHistory.push({
          type: "output",
          text: `Email: ${profile.email}\nGitHub: ${profile.github}\nLinkedIn: ${profile.linkedin}`,
        });
        break;

      case "sudo":
        if (arg.toLowerCase() === "hire") {
          playSuccessSound();
          newHistory.push({
            type: "success",
            text: `[ROOT AUTHORIZED] 🚀\nWelcome aboard! Tejas Karambe has been added to your high-performance engineering team.\nDispatching offer letter packet to ${profile.email}...`,
          });
        } else {
          newHistory.push({
            type: "error",
            text: `sudo: ${arg}: command not recognized. Try 'sudo hire'`,
          });
        }
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        playBeepSound(260, 0.05);
        newHistory.push({
          type: "error",
          text: `Command not found: '${trimmed}'. Type 'help' for available commands.`,
        });
        break;
    }

    setHistory(newHistory);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (pastCommands.length > 0 && cmdIndex + 1 < pastCommands.length) {
        const nextIdx = cmdIndex + 1;
        setCmdIndex(nextIdx);
        setInput(pastCommands[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdIndex > 0) {
        const nextIdx = cmdIndex - 1;
        setCmdIndex(nextIdx);
        setInput(pastCommands[nextIdx]);
      } else if (cmdIndex === 0) {
        setCmdIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div className="w-full max-w-[650px] mx-auto rounded-2xl border border-white/10 bg-[#060814] shadow-2xl backdrop-blur-xl overflow-hidden font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#0B0F22] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-rose-500/80" />
          <div className="h-3 w-3 rounded-full bg-amber-500/80" />
          <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-slate-300 font-semibold flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-cyan-glow" /> tejas@terminal:~ (zsh)
          </span>
        </div>
        <span className="text-[11px] text-muted">UTF-8</span>
      </div>

      {/* Console output stream */}
      <div
        onClick={() => inputRef.current?.focus()}
        className="h-[300px] overflow-y-auto p-4 space-y-2 cursor-text"
      >
        {history.map((line, idx) => {
          let color = "text-slate-300";
          if (line.type === "system") color = "text-muted";
          if (line.type === "user") color = "text-cyan-glow font-bold";
          if (line.type === "success") color = "text-emerald-400";
          if (line.type === "error") color = "text-rose-400";

          return (
            <div key={idx} className="whitespace-pre-wrap leading-relaxed">
              {line.type === "user" ? (
                <span className="text-violet-400 font-bold">tejas:~$ </span>
              ) : null}
              <span className={color}>{line.text}</span>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Suggested Quick Commands */}
      <div className="flex items-center gap-1.5 px-4 py-2 bg-white/[0.02] border-t border-white/[0.05] overflow-x-auto text-[11px]">
        <span className="text-muted shrink-0">Quick:</span>
        {["help", "whoami", "skills", "projects", "cookies", "sudo hire"].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleCommand(cmd)}
            className="rounded px-2 py-0.5 bg-white/[0.05] hover:bg-cyan-glow/20 hover:text-cyan-300 text-slate-300 transition-colors shrink-0"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Input row */}
      <div className="flex items-center border-t border-white/10 bg-[#0B0F22] px-4 py-2.5">
        <span className="text-violet-400 font-bold mr-2">tejas:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-white focus:outline-none placeholder-muted/50"
          placeholder="type a command ('help')..."
          autoFocus
          spellCheck={false}
        />
        <button
          onClick={() => handleCommand(input)}
          className="text-muted hover:text-cyan-glow transition-colors p-1"
        >
          <CornerDownLeft className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

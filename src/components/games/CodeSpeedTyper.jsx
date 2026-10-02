import React, { useState, useEffect, useRef } from "react";
import { Terminal, Trophy, RotateCcw, Zap, CheckCircle2 } from "lucide-react";
import { getCookie, setCookie } from "../../lib/cookies";
import { playClickSound, playSuccessSound, playBeepSound } from "../../lib/sound";

const SNIPPETS = [
  {
    language: "Java / Spring Boot",
    code: "@GetMapping(\"/api/v1/students\")\npublic ResponseEntity<List<StudentDTO>> getAllStudents() {\n    return ResponseEntity.ok(studentService.findAllActive());\n}",
  },
  {
    language: "React.js / Custom Hook",
    code: "const useLocalStorage = (key, initialValue) => {\n  const [value, setValue] = useState(() => getCookie(key) ?? initialValue);\n  return [value, setValue];\n};",
  },
  {
    language: "SQL Query",
    code: "SELECT d.name, COUNT(e.id) AS total_devs\nFROM departments d\nJOIN employees e ON d.id = e.dept_id\nGROUP BY d.name HAVING total_devs > 5;",
  },
];

export function CodeSpeedTyper() {
  const [selectedSnippetIdx, setSelectedSnippetIdx] = useState(0);
  const targetCode = SNIPPETS[selectedSnippetIdx].code;

  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);
  const [bestWpm, setBestWpm] = useState(() => getCookie("typer_best", 0));
  const inputRef = useRef(null);

  const resetTest = (idx = selectedSnippetIdx) => {
    setSelectedSnippetIdx(idx);
    setInput("");
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsFinished(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleInputChange = (e) => {
    if (isFinished) return;
    const val = e.target.value;
    playClickSound();

    if (!startTime && val.length === 1) {
      setStartTime(Date.now());
    }

    setInput(val);

    // Calculate accuracy
    let correct = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] === targetCode[i]) correct++;
    }
    const acc = val.length > 0 ? Math.round((correct / val.length) * 100) : 100;
    setAccuracy(acc);

    // Calculate live WPM
    if (startTime && val.length > 3) {
      const minutes = (Date.now() - startTime) / 60000;
      if (minutes > 0.01) {
        const words = correct / 5;
        const currentWpm = Math.round(words / minutes);
        setWpm(currentWpm);
      }
    }

    // Check completion
    if (val === targetCode) {
      setIsFinished(true);
      playSuccessSound();
      const minutes = Math.max((Date.now() - (startTime || Date.now())) / 60000, 0.05);
      const finalWpm = Math.round(targetCode.length / 5 / minutes);
      setWpm(finalWpm);

      if (finalWpm > bestWpm) {
        setBestWpm(finalWpm);
        setCookie("typer_best", finalWpm, 60);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Top Stats */}
      <div className="flex w-full max-w-[550px] items-center justify-between pb-3 text-xs sm:text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-cyan-glow" />
            <span className="font-mono text-muted">WPM:</span>
            <span className="font-mono text-xl font-bold text-white">{wpm}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-muted">ACC:</span>
            <span className={`font-mono text-base font-bold ${accuracy >= 95 ? "text-emerald-400" : "text-amber-400"}`}>
              {accuracy}%
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-violet-500/10 px-3 py-1 border border-violet-500/30">
          <Trophy className="h-3.5 w-3.5 text-amber-glow" />
          <span className="text-[11px] font-semibold text-violet-300">
            BEST: <span className="font-mono text-white">{bestWpm} WPM</span>
          </span>
        </div>
      </div>

      {/* Snippet Picker Tabs */}
      <div className="mb-3 flex flex-wrap gap-2">
        {SNIPPETS.map((snip, idx) => (
          <button
            key={snip.language}
            onClick={() => resetTest(idx)}
            className={`rounded-lg px-3 py-1 text-xs font-mono transition-all ${
              selectedSnippetIdx === idx
                ? "bg-cyan-glow/20 border border-cyan-glow text-cyan-300 font-semibold"
                : "bg-white/[0.04] border border-white/10 text-muted hover:text-white"
            }`}
          >
            {snip.language}
          </button>
        ))}
      </div>

      {/* Code Display Area */}
      <div
        onClick={() => inputRef.current?.focus()}
        className="relative w-full max-w-[550px] cursor-text rounded-xl border border-white/10 bg-[#070B18] p-4 font-mono text-xs sm:text-sm leading-relaxed shadow-xl select-none"
      >
        <div className="mb-2 flex items-center justify-between border-b border-white/[0.08] pb-2 text-[11px] text-muted">
          <span className="flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-cyan-glow" /> Code Editor Stream
          </span>
          <span>{input.length} / {targetCode.length} chars</span>
        </div>

        <div className="whitespace-pre font-mono">
          {targetCode.split("").map((char, i) => {
            let color = "text-muted/60";
            let bg = "";
            const isCurrent = i === input.length;

            if (i < input.length) {
              if (input[i] === char) {
                color = "text-cyan-300";
              } else {
                color = "text-rose-400 bg-rose-950/60";
              }
            }

            return (
              <span
                key={i}
                className={`${color} ${bg} ${isCurrent ? "border-b-2 border-cyan-glow animate-pulse text-white" : ""}`}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* Hidden textarea to capture keystrokes */}
        <textarea
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          className="absolute inset-0 h-full w-full opacity-0 cursor-default resize-none"
          autoFocus
          spellCheck={false}
        />
      </div>

      {/* Completion Banner */}
      {isFinished && (
        <div className="mt-4 flex w-full max-w-[550px] items-center justify-between rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-emerald-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <div>
              <div className="font-semibold text-white">Code Compiled!</div>
              <div className="text-xs">
                Score: {wpm} WPM with {accuracy}% accuracy.
              </div>
            </div>
          </div>
          <button
            onClick={() => resetTest()}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-400 px-3 py-1.5 text-xs font-bold text-slate-950 hover:bg-emerald-300"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Next Snippet
          </button>
        </div>
      )}

      {/* Control Buttons */}
      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={() => resetTest()}
          className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-1.5 text-xs text-white hover:bg-white/10 active:scale-95"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Restart
        </button>
        <span className="text-[11px] text-muted">Click the code box & start typing!</span>
      </div>
    </div>
  );
}

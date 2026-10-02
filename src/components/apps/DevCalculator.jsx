import React, { useState, useEffect } from "react";
import { Calculator, History, Trash2, Copy, Check, CornerDownLeft, Sparkles } from "lucide-react";
import { getCookie, setCookie } from "../../lib/cookies";
import { playClickSound, playSuccessSound } from "../../lib/sound";

export function DevCalculator() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [history, setHistory] = useState(() => getCookie("calc_history", []));
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isScientific, setIsScientific] = useState(false);

  // Save history to cookies
  const addToHistory = (expr, res) => {
    const item = {
      id: Date.now(),
      expr,
      res,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };
    const updated = [item, ...history.slice(0, 19)]; // Keep latest 20
    setHistory(updated);
    setCookie("calc_history", updated, 30);
  };

  const clearHistory = () => {
    setHistory([]);
    setCookie("calc_history", [], 30);
  };

  const handleNumber = (n) => {
    playClickSound();
    setDisplay((prev) => (prev === "0" ? String(n) : prev + n));
  };

  const handleDecimal = () => {
    playClickSound();
    if (!display.includes(".")) {
      setDisplay((prev) => prev + ".");
    }
  };

  const handleOperator = (op) => {
    playClickSound();
    setEquation(`${display} ${op} `);
    setDisplay("0");
  };

  const handleClear = () => {
    playClickSound();
    setDisplay("0");
    setEquation("");
  };

  const handleBackspace = () => {
    playClickSound();
    setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
  };

  const handleToggleSign = () => {
    playClickSound();
    setDisplay((prev) => String(parseFloat(prev) * -1));
  };

  const handleScientific = (type) => {
    playClickSound();
    const val = parseFloat(display);
    let res = 0;
    let label = "";

    if (type === "sqrt") {
      res = Math.sqrt(val);
      label = `√(${val})`;
    } else if (type === "sqr") {
      res = val * val;
      label = `sqr(${val})`;
    } else if (type === "recip") {
      res = 1 / val;
      label = `1/(${val})`;
    } else if (type === "sin") {
      res = Math.sin((val * Math.PI) / 180);
      label = `sin(${val}°)`;
    } else if (type === "cos") {
      res = Math.cos((val * Math.PI) / 180);
      label = `cos(${val}°)`;
    } else if (type === "pi") {
      res = Math.PI;
      label = "π";
    }

    const rounded = Number(res.toFixed(8)).toString();
    addToHistory(label, rounded);
    setDisplay(rounded);
    playSuccessSound();
  };

  const handleCalculate = () => {
    if (!equation) return;
    try {
      const fullExpr = equation + display;
      // Sanitize equation safely
      const sanitized = fullExpr.replace(/×/g, "*").replace(/÷/g, "/");
      // evaluate using Function without direct eval
      // eslint-disable-next-line no-new-func
      const result = Function(`"use strict"; return (${sanitized})`)();
      const rounded = Number(result.toFixed(8)).toString();

      addToHistory(fullExpr, rounded);
      setDisplay(rounded);
      setEquation("");
      playSuccessSound();
    } catch {
      setDisplay("Error");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(display);
    setCopied(true);
    playSuccessSound();
    setTimeout(() => setCopied(false), 2000);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key >= "0" && e.key <= "9") handleNumber(e.key);
      if (e.key === ".") handleDecimal();
      if (e.key === "+") handleOperator("+");
      if (e.key === "-") handleOperator("-");
      if (e.key === "*") handleOperator("×");
      if (e.key === "/") handleOperator("÷");
      if (e.key === "Enter" || e.key === "=") handleCalculate();
      if (e.key === "Backspace") handleBackspace();
      if (e.key === "Escape") handleClear();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  return (
    <div className="flex flex-col lg:flex-row gap-4 items-start justify-center max-w-[650px] mx-auto w-full">
      {/* Calculator Body */}
      <div className="w-full max-w-[340px] mx-auto rounded-2xl border border-white/10 bg-[#0B0F22]/90 p-4 shadow-2xl backdrop-blur-xl">
        {/* Header with Mode Toggles */}
        <div className="flex items-center justify-between pb-3 text-xs text-muted border-b border-white/[0.08]">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Calculator className="h-4 w-4 text-cyan-glow" /> Dev Calculator
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsScientific(!isScientific)}
              className={`rounded px-2 py-0.5 text-[11px] transition-colors ${
                isScientific ? "bg-cyan-glow/20 text-cyan-300 font-semibold" : "hover:text-white"
              }`}
            >
              Sci
            </button>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`flex items-center gap-1 rounded px-2 py-0.5 text-[11px] transition-colors ${
                showHistory ? "bg-violet-glow/20 text-violet-300 font-semibold" : "hover:text-white"
              }`}
            >
              <History className="h-3 w-3" /> Tape ({history.length})
            </button>
          </div>
        </div>

        {/* Display Screen */}
        <div className="my-3 rounded-xl bg-[#060813] p-3 text-right border border-white/[0.06]">
          <div className="h-4 text-xs font-mono text-muted/70 overflow-hidden text-ellipsis">
            {equation || " "}
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <button
              onClick={handleCopy}
              className="text-muted hover:text-cyan-glow transition-colors p-1"
              title="Copy to clipboard"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
            <div className="font-mono text-2xl font-bold tracking-tight text-white overflow-hidden text-ellipsis">
              {display}
            </div>
          </div>
        </div>

        {/* Scientific Panel (Collapsible) */}
        {isScientific && (
          <div className="grid grid-cols-4 gap-1.5 mb-2 pb-2 border-b border-white/[0.08]">
            <button
              onClick={() => handleScientific("sqrt")}
              className="rounded-lg bg-white/[0.04] p-2 text-xs font-mono text-cyan-300 hover:bg-white/10"
            >
              √x
            </button>
            <button
              onClick={() => handleScientific("sqr")}
              className="rounded-lg bg-white/[0.04] p-2 text-xs font-mono text-cyan-300 hover:bg-white/10"
            >
              x²
            </button>
            <button
              onClick={() => handleScientific("sin")}
              className="rounded-lg bg-white/[0.04] p-2 text-xs font-mono text-cyan-300 hover:bg-white/10"
            >
              sin
            </button>
            <button
              onClick={() => handleScientific("cos")}
              className="rounded-lg bg-white/[0.04] p-2 text-xs font-mono text-cyan-300 hover:bg-white/10"
            >
              cos
            </button>
          </div>
        )}

        {/* Standard Keypad */}
        <div className="grid grid-cols-4 gap-1.5 text-sm font-semibold font-mono">
          <button
            onClick={handleClear}
            className="rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 p-2.5 active:scale-95"
          >
            C
          </button>
          <button
            onClick={handleBackspace}
            className="rounded-xl bg-white/[0.06] text-muted hover:text-white hover:bg-white/10 p-2.5 active:scale-95"
          >
            ⌫
          </button>
          <button
            onClick={handleToggleSign}
            className="rounded-xl bg-white/[0.06] text-muted hover:text-white hover:bg-white/10 p-2.5 active:scale-95"
          >
            ±
          </button>
          <button
            onClick={() => handleOperator("÷")}
            className="rounded-xl bg-violet-600/30 text-violet-300 hover:bg-violet-600/40 p-2.5 active:scale-95"
          >
            ÷
          </button>

          <button onClick={() => handleNumber(7)} className="rounded-xl bg-white/[0.05] text-slate-100 hover:bg-white/10 p-2.5 active:scale-95">7</button>
          <button onClick={() => handleNumber(8)} className="rounded-xl bg-white/[0.05] text-slate-100 hover:bg-white/10 p-2.5 active:scale-95">8</button>
          <button onClick={() => handleNumber(9)} className="rounded-xl bg-white/[0.05] text-slate-100 hover:bg-white/10 p-2.5 active:scale-95">9</button>
          <button
            onClick={() => handleOperator("×")}
            className="rounded-xl bg-violet-600/30 text-violet-300 hover:bg-violet-600/40 p-2.5 active:scale-95"
          >
            ×
          </button>

          <button onClick={() => handleNumber(4)} className="rounded-xl bg-white/[0.05] text-slate-100 hover:bg-white/10 p-2.5 active:scale-95">4</button>
          <button onClick={() => handleNumber(5)} className="rounded-xl bg-white/[0.05] text-slate-100 hover:bg-white/10 p-2.5 active:scale-95">5</button>
          <button onClick={() => handleNumber(6)} className="rounded-xl bg-white/[0.05] text-slate-100 hover:bg-white/10 p-2.5 active:scale-95">6</button>
          <button
            onClick={() => handleOperator("-")}
            className="rounded-xl bg-violet-600/30 text-violet-300 hover:bg-violet-600/40 p-2.5 active:scale-95"
          >
            -
          </button>

          <button onClick={() => handleNumber(1)} className="rounded-xl bg-white/[0.05] text-slate-100 hover:bg-white/10 p-2.5 active:scale-95">1</button>
          <button onClick={() => handleNumber(2)} className="rounded-xl bg-white/[0.05] text-slate-100 hover:bg-white/10 p-2.5 active:scale-95">2</button>
          <button onClick={() => handleNumber(3)} className="rounded-xl bg-white/[0.05] text-slate-100 hover:bg-white/10 p-2.5 active:scale-95">3</button>
          <button
            onClick={() => handleOperator("+")}
            className="rounded-xl bg-violet-600/30 text-violet-300 hover:bg-violet-600/40 p-2.5 active:scale-95"
          >
            +
          </button>

          <button
            onClick={() => handleScientific("pi")}
            className="rounded-xl bg-white/[0.05] text-cyan-300 hover:bg-white/10 p-2.5 active:scale-95 text-xs"
          >
            π
          </button>
          <button onClick={() => handleNumber(0)} className="rounded-xl bg-white/[0.05] text-slate-100 hover:bg-white/10 p-2.5 active:scale-95">0</button>
          <button onClick={handleDecimal} className="rounded-xl bg-white/[0.05] text-slate-100 hover:bg-white/10 p-2.5 active:scale-95">.</button>
          <button
            onClick={handleCalculate}
            className="rounded-xl bg-gradient-to-r from-violet-glow to-cyan-glow text-slate-950 font-bold hover:opacity-90 p-2.5 active:scale-95 shadow-lg shadow-cyan-glow/20"
          >
            =
          </button>
        </div>
      </div>

      {/* History Tape Drawer */}
      {showHistory && (
        <div className="w-full max-w-[280px] mx-auto rounded-2xl border border-white/10 bg-[#0B0F22]/90 p-4 shadow-xl backdrop-blur-xl animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.08] text-xs">
            <span className="font-semibold text-slate-200 flex items-center gap-1.5">
              <History className="h-3.5 w-3.5 text-violet-glow" /> Calculation Tape
            </span>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-muted hover:text-rose-400 transition-colors p-1"
                title="Clear Tape"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="mt-2 max-h-[300px] overflow-y-auto space-y-2 pr-1">
            {history.length === 0 ? (
              <p className="py-6 text-center text-xs text-muted">
                No past calculations.<br />Stored securely in cookies!
              </p>
            ) : (
              history.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setDisplay(item.res);
                    playClickSound();
                  }}
                  className="group cursor-pointer rounded-lg bg-white/[0.03] p-2 hover:bg-white/[0.08] transition-colors border border-transparent hover:border-cyan-glow/30"
                >
                  <div className="flex justify-between text-[10px] text-muted font-mono">
                    <span>{item.expr}</span>
                    <span>{item.time}</span>
                  </div>
                  <div className="mt-0.5 text-right font-mono font-bold text-cyan-300 text-sm flex items-center justify-end gap-1">
                    <span>= {item.res}</span>
                    <CornerDownLeft className="h-3 w-3 opacity-0 group-hover:opacity-100 text-muted" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

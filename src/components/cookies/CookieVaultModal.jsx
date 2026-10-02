import React, { useState, useEffect } from "react";
import { X, Cookie, ShieldCheck, Trash2, RotateCcw, User, Volume2, VolumeX, Sparkles, Check, Download } from "lucide-react";
import { getCookie, setCookie, getCookieInventory, clearAllPortfolioMemory } from "../../lib/cookies";
import { playClickSound, playSuccessSound } from "../../lib/sound";

export function CookieVaultModal({ isOpen, onClose, onNameChange }) {
  const [visitorName, setVisitorName] = useState(() => getCookie("visitorName", ""));
  const [inventory, setInventory] = useState([]);
  const [savedToast, setSavedToast] = useState(false);

  const refreshInventory = () => {
    setInventory(getCookieInventory());
  };

  useEffect(() => {
    if (isOpen) {
      refreshInventory();
      setVisitorName(getCookie("visitorName", ""));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveName = (e) => {
    e.preventDefault();
    playClickSound();
    setCookie("visitorName", visitorName.trim(), 90);
    onNameChange?.(visitorName.trim());
    setSavedToast(true);
    playSuccessSound();
    refreshInventory();
    setTimeout(() => setSavedToast(false), 2000);
  };

  const handleClearAll = () => {
    playClickSound();
    if (window.confirm("Clear all portfolio cookies & local high-score memory?")) {
      clearAllPortfolioMemory();
      setVisitorName("");
      onNameChange?.("");
      refreshInventory();
      playSuccessSound();
    }
  };

  const handleExportData = () => {
    playClickSound();
    const data = getCookieInventory();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tejas-portfolio-cookies.json";
    a.click();
    URL.revokeObjectURL(url);
    playSuccessSound();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative flex flex-col max-h-[90vh] w-full max-w-xl rounded-2xl border border-white/15 bg-[#0B0F22] text-ink shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-5 bg-[#070914]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-glow/20 border border-cyan-glow/40 text-cyan-300">
              <Cookie className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                In-Device Cookie Memory Vault
              </h3>
              <p className="text-xs text-muted">
                100% Client-Side • Stored Directly on Your Device
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 border border-white/10 bg-white/5 text-muted hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
          {/* Concept Explanation Box */}
          <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-3.5 leading-relaxed text-slate-300">
            <div className="flex items-center gap-1.5 font-bold text-cyan-300 mb-1">
              <ShieldCheck className="h-4 w-4" /> Why Cookies for Static Portfolios?
            </div>
            Because this portfolio is hosted directly on GitHub Pages with zero backend servers,
            it uses <strong>HTTP Document Cookies & LocalStorage</strong> to persist your preferences,
            arcade high-scores, calculation history tape, and bookmarked projects in your local browser sandbox.
            No personal data ever leaves your device.
          </div>

          {/* Visitor Name Personalization */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <label className="block font-semibold text-white mb-1.5 flex items-center gap-1.5">
              <User className="h-4 w-4 text-violet-glow" /> Personalize Your Visit
            </label>
            <p className="text-muted text-[11px] mb-3">
              Set your name to see personalized greetings in the terminal, hero, and status bar.
            </p>
            <form onSubmit={handleSaveName} className="flex gap-2">
              <input
                type="text"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                placeholder="Enter your name (e.g. Sarah, David)"
                className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-glow"
              />
              <button
                type="submit"
                className="rounded-lg bg-cyan-glow px-4 py-1.5 font-semibold text-slate-950 hover:bg-cyan-300 flex items-center gap-1"
              >
                {savedToast ? <Check className="h-3.5 w-3.5" /> : "Save"}
              </button>
            </form>
          </div>

          {/* Active Memory Inventory Table */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-muted text-[11px] uppercase">
                Active Memory Records ({inventory.length})
              </span>
              <button
                onClick={handleExportData}
                className="text-[11px] text-cyan-300 hover:text-cyan-200 flex items-center gap-1"
              >
                <Download className="h-3 w-3" /> Export JSON
              </button>
            </div>

            <div className="rounded-xl border border-white/10 overflow-hidden bg-[#060814]">
              {inventory.length === 0 ? (
                <div className="p-4 text-center text-muted text-xs">
                  No records stored yet. Play Snake, calculate, or bookmark a project!
                </div>
              ) : (
                <div className="max-h-48 overflow-y-auto">
                  <table className="w-full text-left font-mono">
                    <thead className="bg-[#0B0F22] text-[10px] text-muted border-b border-white/5">
                      <tr>
                        <th className="p-2">Key</th>
                        <th className="p-2">Value</th>
                        <th className="p-2 text-right">Size</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-[11px]">
                      {inventory.map((item, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.02]">
                          <td className="p-2 text-cyan-300 font-semibold">{item.key}</td>
                          <td className="p-2 text-slate-300 max-w-[200px] truncate" title={item.value}>
                            {item.value}
                          </td>
                          <td className="p-2 text-muted text-right">{item.size}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/10 bg-[#070914] p-4 text-xs">
          <button
            onClick={handleClearAll}
            className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" /> Wipe In-Device Memory
          </button>
          <button
            onClick={onClose}
            className="rounded-lg bg-white/10 px-4 py-1.5 font-semibold text-white hover:bg-white/20"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

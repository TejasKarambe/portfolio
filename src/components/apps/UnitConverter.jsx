import React, { useState, useEffect } from "react";
import { ArrowLeftRight, Copy, Check, Sparkles, HardDrive, Ruler, Scale, Thermometer, Gauge, Coins } from "lucide-react";
import { getCookie, setCookie } from "../../lib/cookies";
import { playClickSound, playSuccessSound } from "../../lib/sound";

const CONVERSION_CATEGORIES = {
  data: {
    label: "Digital Storage",
    icon: HardDrive,
    units: ["Bytes", "KB", "MB", "GB", "TB", "PB"],
    toBase: {
      Bytes: 1,
      KB: 1024,
      MB: 1024 ** 2,
      GB: 1024 ** 3,
      TB: 1024 ** 4,
      PB: 1024 ** 5,
    },
  },
  length: {
    label: "Length",
    icon: Ruler,
    units: ["Meters", "Kilometers", "Centimeters", "Millimeters", "Miles", "Feet", "Inches"],
    toBase: {
      Meters: 1,
      Kilometers: 1000,
      Centimeters: 0.01,
      Millimeters: 0.001,
      Miles: 1609.344,
      Feet: 0.3048,
      Inches: 0.0254,
    },
  },
  weight: {
    label: "Weight",
    icon: Scale,
    units: ["Kilograms", "Grams", "Milligrams", "Pounds (lbs)", "Ounces (oz)"],
    toBase: {
      Kilograms: 1,
      Grams: 0.001,
      Milligrams: 0.000001,
      "Pounds (lbs)": 0.453592,
      "Ounces (oz)": 0.0283495,
    },
  },
  temperature: {
    label: "Temperature",
    icon: Thermometer,
    units: ["Celsius (°C)", "Fahrenheit (°F)", "Kelvin (K)"],
  },
  speed: {
    label: "Speed",
    icon: Gauge,
    units: ["km/h", "mph", "m/s", "Knots"],
    toBase: {
      "m/s": 1,
      "km/h": 0.277778,
      mph: 0.44704,
      Knots: 0.514444,
    },
  },
  currency: {
    label: "Currency & Crypto",
    icon: Coins,
    units: ["USD ($)", "INR (₹)", "EUR (€)", "GBP (£)", "BTC (₿)", "ETH (Ξ)"],
    toBase: {
      "USD ($)": 1,
      "INR (₹)": 1 / 85.5,
      "EUR (€)": 1.09,
      "GBP (£)": 1.3,
      "BTC (₿)": 64500,
      "ETH (Ξ)": 3450,
    },
  },
};

export function UnitConverter() {
  const [activeCategory, setActiveCategory] = useState("data");
  const [amount, setAmount] = useState("1024");
  const [fromUnit, setFromUnit] = useState("MB");
  const [toUnit, setToUnit] = useState("GB");
  const [copied, setCopied] = useState(false);

  // Switch units when category changes
  const handleCategoryChange = (catKey) => {
    playClickSound();
    setActiveCategory(catKey);
    const cat = CONVERSION_CATEGORIES[catKey];
    setFromUnit(cat.units[0]);
    setToUnit(cat.units[1] || cat.units[0]);
    setAmount("100");
  };

  const handleSwap = () => {
    playClickSound();
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  // Convert calculation
  const calculateResult = () => {
    const val = parseFloat(amount);
    if (isNaN(val)) return "0";

    if (activeCategory === "temperature") {
      let celsius = val;
      if (fromUnit === "Fahrenheit (°F)") {
        celsius = ((val - 32) * 5) / 9;
      } else if (fromUnit === "Kelvin (K)") {
        celsius = val - 273.15;
      }

      let res = celsius;
      if (toUnit === "Fahrenheit (°F)") {
        res = (celsius * 9) / 5 + 32;
      } else if (toUnit === "Kelvin (K)") {
        res = celsius + 273.15;
      }
      return Number(res.toFixed(4)).toString();
    }

    const cat = CONVERSION_CATEGORIES[activeCategory];
    const fromBaseFactor = cat.toBase[fromUnit] || 1;
    const toBaseFactor = cat.toBase[toUnit] || 1;

    const baseVal = val * fromBaseFactor;
    const finalVal = baseVal / toBaseFactor;

    if (finalVal < 0.00001 && finalVal > 0) {
      return finalVal.toExponential(4);
    }
    return Number(finalVal.toFixed(6)).toString();
  };

  const result = calculateResult();

  const handleCopy = () => {
    navigator.clipboard.writeText(`${result} ${toUnit}`);
    setCopied(true);
    playSuccessSound();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-[550px] mx-auto rounded-2xl border border-white/10 bg-[#0B0F22]/90 p-5 shadow-2xl backdrop-blur-xl">
      {/* Category Pills */}
      <div className="flex flex-wrap gap-1.5 pb-4 border-b border-white/[0.08]">
        {Object.entries(CONVERSION_CATEGORIES).map(([key, data]) => {
          const Icon = data.icon;
          return (
            <button
              key={key}
              onClick={() => handleCategoryChange(key)}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                activeCategory === key
                  ? "bg-cyan-glow/20 border border-cyan-glow text-cyan-300 font-semibold"
                  : "bg-white/[0.03] border border-white/5 text-muted hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{data.label}</span>
            </button>
          );
        })}
      </div>

      {/* Input / Output Converter Card */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {/* From Section */}
        <div className="rounded-xl border border-white/10 bg-[#070B18] p-3.5">
          <label className="block text-[11px] font-mono text-muted mb-1.5">FROM</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg bg-white/[0.05] border border-white/10 px-3 py-2 font-mono text-lg font-bold text-white focus:border-cyan-glow focus:outline-none"
            placeholder="0"
          />
          <select
            value={fromUnit}
            onChange={(e) => {
              playClickSound();
              setFromUnit(e.target.value);
            }}
            className="mt-2.5 w-full rounded-lg bg-[#0F142A] border border-white/10 px-3 py-1.5 text-xs font-mono text-cyan-300 focus:outline-none"
          >
            {CONVERSION_CATEGORIES[activeCategory].units.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>

        {/* To Section */}
        <div className="rounded-xl border border-white/10 bg-[#070B18] p-3.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-mono text-muted">TO RESULT</span>
            <button
              onClick={handleCopy}
              className="text-xs text-muted hover:text-cyan-glow flex items-center gap-1"
              title="Copy result"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
          <div className="flex h-[46px] items-center rounded-lg bg-white/[0.05] border border-white/10 px-3 font-mono text-lg font-bold text-cyan-300 overflow-x-auto">
            {result}
          </div>
          <select
            value={toUnit}
            onChange={(e) => {
              playClickSound();
              setToUnit(e.target.value);
            }}
            className="mt-2.5 w-full rounded-lg bg-[#0F142A] border border-white/10 px-3 py-1.5 text-xs font-mono text-cyan-300 focus:outline-none"
          >
            {CONVERSION_CATEGORIES[activeCategory].units.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Swap Button & Quick Info */}
      <div className="mt-4 flex items-center justify-between pt-2 border-t border-white/[0.08]">
        <div className="text-xs text-muted font-mono">
          1 {fromUnit} = {calculateResult() !== "0" ? calculateResult() : "..."} {toUnit}
        </div>
        <button
          onClick={handleSwap}
          className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-white/10 active:scale-95"
        >
          <ArrowLeftRight className="h-3.5 w-3.5 text-cyan-glow" /> Swap
        </button>
      </div>
    </div>
  );
}

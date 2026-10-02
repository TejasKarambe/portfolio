import React, { useState, useEffect, useRef, useCallback } from "react";
import { Play, RotateCcw, Volume2, VolumeX, Trophy, Sparkles, Flame } from "lucide-react";
import { getCookie, setCookie } from "../../lib/cookies";
import { playBeepSound, playGameOverSound, playSuccessSound } from "../../lib/sound";

const GRID_SIZE = 20;
const CELL_COUNT = 20; // 20x20 grid

export function CyberSnake() {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 },
  ]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [bonusFood, setBonusFood] = useState(null);
  const [dir, setDir] = useState({ x: 0, y: -1 });
  const [isRunning, setIsRunning] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => getCookie("snake_best", 0));
  const [speed, setSpeed] = useState(110);
  const [scanline, setScanline] = useState(true);

  const dirRef = useRef(dir);
  dirRef.current = dir;

  const generateFood = useCallback((currentSnake) => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * CELL_COUNT),
        y: Math.floor(Math.random() * CELL_COUNT),
      };
      const onSnake = currentSnake.some((s) => s.x === newFood.x && s.y === newFood.y);
      if (!onSnake) break;
    }
    return newFood;
  }, []);

  const resetGame = () => {
    const initialSnake = [
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 },
    ];
    setSnake(initialSnake);
    setDir({ x: 0, y: -1 });
    setScore(0);
    setIsGameOver(false);
    setFood(generateFood(initialSnake));
    setBonusFood(null);
    setIsRunning(true);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) {
        e.preventDefault();
      }
      const cur = dirRef.current;
      if ((e.key === "ArrowUp" || e.key === "w" || e.key === "W") && cur.y === 0) {
        setDir({ x: 0, y: -1 });
      } else if ((e.key === "ArrowDown" || e.key === "s" || e.key === "S") && cur.y === 0) {
        setDir({ x: 0, y: 1 });
      } else if ((e.key === "ArrowLeft" || e.key === "a" || e.key === "A") && cur.x === 0) {
        setDir({ x: -1, y: 0 });
      } else if ((e.key === "ArrowRight" || e.key === "d" || e.key === "D") && cur.x === 0) {
        setDir({ x: 1, y: 0 });
      } else if (e.code === "Space") {
        setIsRunning((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Game Loop
  useEffect(() => {
    if (!isRunning || isGameOver) return;

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const head = {
          x: prevSnake[0].x + dirRef.current.x,
          y: prevSnake[0].y + dirRef.current.y,
        };

        // Wall collision
        if (head.x < 0 || head.x >= CELL_COUNT || head.y < 0 || head.y >= CELL_COUNT) {
          setIsGameOver(true);
          setIsRunning(false);
          playGameOverSound();
          return prevSnake;
        }

        // Self collision
        if (prevSnake.some((seg) => seg.x === head.x && seg.y === head.y)) {
          setIsGameOver(true);
          setIsRunning(false);
          playGameOverSound();
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Normal Food eaten
        if (head.x === food.x && head.y === food.y) {
          playBeepSound(680, 0.08);
          setScore((s) => {
            const nextScore = s + 10;
            if (nextScore > highScore) {
              setHighScore(nextScore);
              setCookie("snake_best", nextScore, 60);
              playSuccessSound();
            }
            return nextScore;
          });
          setFood(generateFood(newSnake));

          // Occasional bonus food
          if (Math.random() > 0.65 && !bonusFood) {
            setBonusFood({
              x: Math.floor(Math.random() * CELL_COUNT),
              y: Math.floor(Math.random() * CELL_COUNT),
              expires: Date.now() + 6000,
            });
          }
        } else if (bonusFood && head.x === bonusFood.x && head.y === bonusFood.y) {
          playSuccessSound();
          setScore((s) => {
            const nextScore = s + 50;
            if (nextScore > highScore) {
              setHighScore(nextScore);
              setCookie("snake_best", nextScore, 60);
            }
            return nextScore;
          });
          setBonusFood(null);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [isRunning, isGameOver, food, bonusFood, speed, highScore, generateFood]);

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const cellSize = width / CELL_COUNT;

    // Background
    ctx.fillStyle = "#070B18";
    ctx.fillRect(0, 0, width, height);

    // Subtle grid
    ctx.strokeStyle = "rgba(34, 211, 238, 0.06)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= CELL_COUNT; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(width, i * cellSize);
      ctx.stroke();
    }

    // Normal Food (Glowing Cyan/Emerald)
    ctx.shadowBlur = 12;
    ctx.shadowColor = "#22D3EE";
    ctx.fillStyle = "#22D3EE";
    ctx.beginPath();
    ctx.arc(
      food.x * cellSize + cellSize / 2,
      food.y * cellSize + cellSize / 2,
      cellSize / 2.5,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Bonus Food (Golden/Violet Star)
    if (bonusFood) {
      ctx.shadowBlur = 16;
      ctx.shadowColor = "#F59E0B";
      ctx.fillStyle = "#F59E0B";
      ctx.beginPath();
      ctx.arc(
        bonusFood.x * cellSize + cellSize / 2,
        bonusFood.y * cellSize + cellSize / 2,
        cellSize / 2.2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // Snake
    snake.forEach((seg, index) => {
      const isHead = index === 0;
      ctx.shadowBlur = isHead ? 15 : 6;
      ctx.shadowColor = isHead ? "#A855F7" : "rgba(168, 85, 247, 0.4)";
      ctx.fillStyle = isHead ? "#C084FC" : "#7E22CE";

      const pad = isHead ? 1.5 : 2.5;
      ctx.beginPath();
      ctx.roundRect(
        seg.x * cellSize + pad,
        seg.y * cellSize + pad,
        cellSize - pad * 2,
        cellSize - pad * 2,
        isHead ? 6 : 4
      );
      ctx.fill();

      // Eye lights on head
      if (isHead) {
        ctx.fillStyle = "#FFFFFF";
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(
          seg.x * cellSize + cellSize * 0.35,
          seg.y * cellSize + cellSize * 0.35,
          2,
          0,
          Math.PI * 2
        );
        ctx.arc(
          seg.x * cellSize + cellSize * 0.65,
          seg.y * cellSize + cellSize * 0.35,
          2,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    });

    ctx.shadowBlur = 0;
  }, [snake, food, bonusFood]);

  return (
    <div className="flex flex-col items-center">
      {/* Top Bar Stats */}
      <div className="flex w-full max-w-[400px] items-center justify-between pb-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <span className="font-mono text-muted">SCORE:</span>
          <span className="font-mono text-lg font-bold text-cyan-glow">{score}</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-violet-500/10 px-3 py-1 border border-violet-500/30">
          <Trophy className="h-3.5 w-3.5 text-amber-glow" />
          <span className="text-[11px] font-semibold text-violet-300">
            RECORD: <span className="font-mono text-white">{highScore}</span>
          </span>
        </div>
      </div>

      {/* Screen Box */}
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#070B18] shadow-2xl">
        <canvas
          ref={canvasRef}
          width={380}
          height={380}
          className="max-w-full touch-none block"
        />

        {scanline && <div className="scanline absolute inset-0 pointer-events-none opacity-40" />}

        {/* Start / Pause / Game Over Overlay */}
        {(!isRunning || isGameOver) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 backdrop-blur-sm p-4 text-center">
            {isGameOver ? (
              <>
                <div className="mb-2 text-2xl font-bold text-rose-400">MISSION TERMINATED</div>
                <p className="mb-4 text-xs text-muted">
                  Final Score: <span className="font-mono font-bold text-white">{score}</span>
                </p>
                <button
                  onClick={resetGame}
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-glow to-cyan-glow px-6 py-2.5 text-sm font-semibold text-slate-950 transition-all hover:scale-105 active:scale-95"
                >
                  <RotateCcw className="h-4 w-4" /> Try Again
                </button>
              </>
            ) : score === 0 ? (
              <>
                <div className="mb-1 text-xl font-bold text-white flex items-center gap-2">
                  <Flame className="h-5 w-5 text-cyan-glow" /> CYBER SNAKE 3000
                </div>
                <p className="mb-5 max-w-[260px] text-xs text-muted">
                  Eat cyan orbs for +10. Catch golden bonuses for +50. High score stored in your cookies!
                </p>
                <button
                  onClick={resetGame}
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-glow to-cyan-glow px-7 py-2.5 text-sm font-semibold text-slate-950 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-cyan-glow/20"
                >
                  <Play className="h-4 w-4 fill-slate-950" /> Launch Snake
                </button>
              </>
            ) : (
              <>
                <div className="mb-3 text-lg font-bold text-amber-glow">GAME PAUSED</div>
                <button
                  onClick={() => setIsRunning(true)}
                  className="flex items-center gap-2 rounded-full bg-cyan-glow px-6 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
                >
                  <Play className="h-4 w-4 fill-slate-950" /> Resume
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* D-Pad Controls for touch/mobile */}
      <div className="mt-4 flex flex-col items-center gap-1.5 sm:hidden">
        <button
          onClick={() => dirRef.current.y === 0 && setDir({ x: 0, y: -1 })}
          className="flex h-11 w-12 items-center justify-center rounded-lg bg-white/10 text-white active:bg-cyan-500/30 font-bold"
        >
          ▲
        </button>
        <div className="flex gap-4">
          <button
            onClick={() => dirRef.current.x === 0 && setDir({ x: -1, y: 0 })}
            className="flex h-11 w-12 items-center justify-center rounded-lg bg-white/10 text-white active:bg-cyan-500/30 font-bold"
          >
            ◀
          </button>
          <button
            onClick={() => dirRef.current.y === 0 && setDir({ x: 0, y: 1 })}
            className="flex h-11 w-12 items-center justify-center rounded-lg bg-white/10 text-white active:bg-cyan-500/30 font-bold"
          >
            ▼
          </button>
          <button
            onClick={() => dirRef.current.x === 0 && setDir({ x: 1, y: 0 })}
            className="flex h-11 w-12 items-center justify-center rounded-lg bg-white/10 text-white active:bg-cyan-500/30 font-bold"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Speed & Option Controls */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
        <div className="flex rounded-lg bg-white/[0.04] p-1 border border-white/10">
          <button
            onClick={() => setSpeed(130)}
            className={`rounded px-2.5 py-1 ${speed === 130 ? "bg-white/10 text-cyan-glow font-medium" : "text-muted"}`}
          >
            Normal
          </button>
          <button
            onClick={() => setSpeed(95)}
            className={`rounded px-2.5 py-1 ${speed === 95 ? "bg-white/10 text-cyan-glow font-medium" : "text-muted"}`}
          >
            Fast
          </button>
          <button
            onClick={() => setSpeed(65)}
            className={`rounded px-2.5 py-1 ${speed === 65 ? "bg-white/10 text-cyan-glow font-medium" : "text-muted"}`}
          >
            Insane 🔥
          </button>
        </div>
        <button
          onClick={() => setScanline(!scanline)}
          className={`rounded-lg border px-3 py-1.5 transition-colors ${
            scanline ? "border-cyan-glow/40 text-cyan-glow bg-cyan-glow/10" : "border-white/10 text-muted"
          }`}
        >
          Scanline: {scanline ? "ON" : "OFF"}
        </button>
      </div>
      <p className="mt-2 text-[11px] text-muted">Use [W A S D] or Arrow Keys • Space to Pause</p>
    </div>
  );
}

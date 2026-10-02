import React, { useState, useEffect } from "react";
import { Brain, Trophy, RotateCcw, Check, Sparkles } from "lucide-react";
import { getCookie, setCookie } from "../../lib/cookies";
import { playClickSound, playSuccessSound, playBeepSound } from "../../lib/sound";

const CARDS_DATA = [
  { id: "react", label: "React", icon: "⚛️", color: "from-cyan-500/20 to-blue-500/20" },
  { id: "java", label: "Java 21", icon: "☕", color: "from-red-500/20 to-amber-500/20" },
  { id: "spring", label: "Spring", icon: "🍃", color: "from-emerald-500/20 to-green-500/20" },
  { id: "mysql", label: "MySQL", icon: "🐬", color: "from-sky-500/20 to-blue-500/20" },
  { id: "redux", label: "Redux", icon: "🔮", color: "from-purple-500/20 to-violet-500/20" },
  { id: "tailwind", label: "Tailwind", icon: "🎨", color: "from-teal-500/20 to-cyan-500/20" },
  { id: "git", label: "Git", icon: "🐙", color: "from-orange-500/20 to-red-500/20" },
  { id: "docker", label: "Docker", icon: "🐳", color: "from-blue-500/20 to-cyan-500/20" },
];

function shuffleDeck() {
  const deck = [...CARDS_DATA, ...CARDS_DATA].map((card, index) => ({
    ...card,
    uniqueId: `${card.id}-${index}`,
    isFlipped: false,
    isMatched: false,
  }));
  return deck.sort(() => Math.random() - 0.5);
}

export function MemoryMatrix() {
  const [cards, setCards] = useState(shuffleDeck);
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [bestMoves, setBestMoves] = useState(() => getCookie("memory_best", 0));
  const [isWon, setIsWon] = useState(false);

  const resetGame = () => {
    setCards(shuffleDeck());
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setIsWon(false);
  };

  const handleCardClick = (clickedCard) => {
    if (
      clickedCard.isFlipped ||
      clickedCard.isMatched ||
      flippedCards.length >= 2 ||
      isWon
    ) {
      return;
    }

    playClickSound();

    const newCards = cards.map((c) =>
      c.uniqueId === clickedCard.uniqueId ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlipped = [...flippedCards, clickedCard];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);

      if (newFlipped[0].id === newFlipped[1].id) {
        // Matched!
        playSuccessSound();
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === newFlipped[0].id ? { ...c, isMatched: true } : c
            )
          );
          setMatches((m) => {
            const nextMatches = m + 1;
            if (nextMatches === CARDS_DATA.length) {
              setIsWon(true);
              const finalMoves = moves + 1;
              if (bestMoves === 0 || finalMoves < bestMoves) {
                setBestMoves(finalMoves);
                setCookie("memory_best", finalMoves, 60);
              }
            }
            return nextMatches;
          });
          setFlippedCards([]);
        }, 400);
      } else {
        // Not a match
        setTimeout(() => {
          playBeepSound(280, 0.05);
          setCards((prev) =>
            prev.map((c) =>
              newFlipped.some((f) => f.uniqueId === c.uniqueId)
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedCards([]);
        }, 900);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Top Stats */}
      <div className="flex w-full max-w-[420px] items-center justify-between pb-3 text-xs sm:text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Brain className="h-4 w-4 text-violet-glow" />
            <span className="font-mono text-muted">MOVES:</span>
            <span className="font-mono text-base font-bold text-white">{moves}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-muted">MATCHES:</span>
            <span className="font-mono text-base font-bold text-cyan-glow">
              {matches} / {CARDS_DATA.length}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-violet-500/10 px-3 py-1 border border-violet-500/30">
          <Trophy className="h-3.5 w-3.5 text-amber-glow" />
          <span className="text-[11px] font-semibold text-violet-300">
            RECORD: <span className="font-mono text-white">{bestMoves > 0 ? `${bestMoves} moves` : "None"}</span>
          </span>
        </div>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-3 max-w-[420px] w-full">
        {cards.map((card) => {
          const showFace = card.isFlipped || card.isMatched;
          return (
            <button
              key={card.uniqueId}
              onClick={() => handleCardClick(card)}
              className={`relative aspect-square rounded-xl border p-2 transition-all duration-300 flex flex-col items-center justify-center ${
                card.isMatched
                  ? "border-emerald-500/40 bg-emerald-500/15 scale-95"
                  : showFace
                  ? "border-cyan-glow/50 bg-gradient-to-br " + card.color + " shadow-lg shadow-cyan-glow/10"
                  : "border-white/10 bg-[#0B0F22] hover:border-white/25 hover:bg-[#111736]"
              }`}
            >
              {showFace ? (
                <div className="flex flex-col items-center justify-center animate-in zoom-in-50 duration-200">
                  <span className="text-2xl sm:text-3xl">{card.icon}</span>
                  <span className="mt-1 text-[10px] font-semibold text-slate-200 font-mono">
                    {card.label}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center opacity-40">
                  <div className="h-6 w-6 rounded-md border border-white/20 bg-white/5 flex items-center justify-center text-[10px] font-mono text-cyan-glow">
                    TK
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Win Banner */}
      {isWon && (
        <div className="mt-4 flex w-full max-w-[420px] items-center justify-between rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-emerald-300">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-400" />
            <div>
              <div className="font-semibold text-white">Memory Grid Decrypted!</div>
              <div className="text-xs">
                Cleared in {moves} moves. Best score updated in cookies!
              </div>
            </div>
          </div>
          <button
            onClick={resetGame}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-400 px-3 py-1.5 text-xs font-bold text-slate-950 hover:bg-emerald-300"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Play Again
          </button>
        </div>
      )}

      {/* Control Footer */}
      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={resetGame}
          className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-1.5 text-xs text-white hover:bg-white/10 active:scale-95"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Shuffle & Restart
        </button>
      </div>
    </div>
  );
}

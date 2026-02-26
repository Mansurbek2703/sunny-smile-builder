import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Shuffle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VocabularyMatchTaskProps {
  words: { word: string; definition: string }[];
}

const VocabularyMatchTask = ({ words }: VocabularyMatchTaskProps) => {
  const [shuffledDefs] = useState(() => {
    const defs = words.map((w) => w.definition);
    return defs.sort(() => Math.random() - 0.5);
  });
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [activeWord, setActiveWord] = useState<number | null>(null);
  const [verified, setVerified] = useState(false);
  const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number; correct?: boolean; wordIdx: number }[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const defRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const updateLines = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newLines: typeof lines = [];

    Object.entries(selected).forEach(([wordIdxStr, defIdx]) => {
      const wordIdx = Number(wordIdxStr);
      const wordEl = wordRefs.current[wordIdx];
      const defEl = defRefs.current[defIdx];
      if (!wordEl || !defEl) return;

      const wordRect = wordEl.getBoundingClientRect();
      const defRect = defEl.getBoundingClientRect();

      newLines.push({
        x1: wordRect.right - containerRect.left,
        y1: wordRect.top + wordRect.height / 2 - containerRect.top,
        x2: defRect.left - containerRect.left,
        y2: defRect.top + defRect.height / 2 - containerRect.top,
        correct: verified ? shuffledDefs[defIdx] === words[wordIdx].definition : undefined,
        wordIdx,
      });
    });

    setLines(newLines);
  }, [selected, verified, shuffledDefs, words]);

  useEffect(() => {
    updateLines();
    window.addEventListener("resize", updateLines);
    return () => window.removeEventListener("resize", updateLines);
  }, [updateLines]);

  const handleWordClick = (i: number) => {
    if (verified) return;
    setActiveWord(i);
  };

  const handleDefClick = (di: number) => {
    if (verified || activeWord === null) return;
    setSelected((prev) => ({ ...prev, [activeWord]: di }));
    setActiveWord(null);
  };

  const isCorrect = (wordIdx: number) => {
    const defIdx = selected[wordIdx];
    if (defIdx === undefined) return undefined;
    return shuffledDefs[defIdx] === words[wordIdx].definition;
  };

  const resetAll = () => {
    setSelected({});
    setVerified(false);
    setActiveWord(null);
  };

  return (
    <div className="space-y-4">
      <div ref={containerRef} className="relative grid grid-cols-2 gap-3 md:gap-8">
        {/* SVG lines overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {lines.map((line, i) => (
            <g key={i}>
              <line
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={
                  line.correct === undefined
                    ? "hsl(175, 60%, 42%)"
                    : line.correct
                    ? "hsl(160, 65%, 40%)"
                    : "hsl(0, 80%, 58%)"
                }
                strokeWidth={2.5}
                strokeDasharray={line.correct === undefined ? "6 3" : "none"}
                opacity={0.7}
              />
              {/* Arrow head */}
              <circle
                cx={line.x2}
                cy={line.y2}
                r={4}
                fill={
                  line.correct === undefined
                    ? "hsl(175, 60%, 42%)"
                    : line.correct
                    ? "hsl(160, 65%, 40%)"
                    : "hsl(0, 80%, 58%)"
                }
                opacity={0.8}
              />
            </g>
          ))}
        </svg>

        <div className="space-y-2">
          <h5 className="font-body text-xs font-semibold uppercase tracking-wider text-accent mb-2">Words</h5>
          {words.map((w, i) => (
            <motion.button
              key={i}
              ref={(el) => { wordRefs.current[i] = el; }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleWordClick(i)}
              className={`w-full text-left p-2 sm:p-3 rounded-xl border-2 font-body text-xs sm:text-sm transition-all ${
                activeWord === i
                  ? "border-accent bg-accent/15 ring-2 ring-accent/30 shadow-md"
                  : selected[i] !== undefined
                  ? verified
                    ? isCorrect(i)
                      ? "border-primary/50 bg-primary/10"
                      : "border-destructive/50 bg-destructive/10"
                    : "border-accent/40 bg-accent/5"
                  : "border-border bg-card hover:border-accent/30 hover:shadow-sm"
              }`}
            >
              <span className="font-semibold">{w.word}</span>
              
            </motion.button>
          ))}
        </div>
        <div className="space-y-2">
          <h5 className="font-body text-xs font-semibold uppercase tracking-wider text-accent mb-2">Definitions</h5>
          {shuffledDefs.map((def, di) => {
            const isUsed = Object.values(selected).includes(di);
            return (
              <motion.button
                key={di}
                ref={(el) => { defRefs.current[di] = el; }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDefClick(di)}
                disabled={isUsed || activeWord === null}
                className={`w-full text-left p-2 sm:p-3 rounded-xl border-2 font-body text-xs sm:text-sm transition-all ${
                  isUsed ? "opacity-40 cursor-not-allowed border-muted" : activeWord !== null ? "border-accent/30 hover:bg-accent/10 cursor-pointer hover:shadow-sm" : "border-border bg-card"
                }`}
              >
                {def}
              </motion.button>
            );
          })}
        </div>
      </div>
      <div className="flex gap-3">
        <Button onClick={() => setVerified(true)} disabled={verified || Object.keys(selected).length < words.length} size="sm" className="font-body">
          <CheckCircle2 className="w-4 h-4 mr-1" /> Verify
        </Button>
        <Button onClick={resetAll} variant="outline" size="sm" className="font-body">
          <Shuffle className="w-4 h-4 mr-1" /> Reset
        </Button>
      </div>
      {verified && (
        <p className="font-body text-sm text-primary font-medium">
          {Object.keys(selected).filter((k) => isCorrect(Number(k))).length} / {words.length} correct!
        </p>
      )}
    </div>
  );
};

export default VocabularyMatchTask;

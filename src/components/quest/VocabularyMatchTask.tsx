import { useState } from "react";
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

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h5 className="font-body text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Words</h5>
          {words.map((w, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleWordClick(i)}
              className={`w-full text-left p-3 rounded-lg border font-body text-sm transition-all ${
                activeWord === i
                  ? "border-primary bg-primary/10 ring-2 ring-primary/30"
                  : selected[i] !== undefined
                  ? verified
                    ? isCorrect(i)
                      ? "border-primary/50 bg-primary/5"
                      : "border-destructive/50 bg-destructive/5"
                    : "border-accent bg-accent/5"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              <span className="font-semibold">{w.word}</span>
              {selected[i] !== undefined && (
                <span className="block text-xs text-muted-foreground mt-1">
                  → {shuffledDefs[selected[i]]}
                </span>
              )}
            </motion.button>
          ))}
        </div>
        <div className="space-y-2">
          <h5 className="font-body text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Definitions</h5>
          {shuffledDefs.map((def, di) => {
            const isUsed = Object.values(selected).includes(di);
            return (
              <motion.button
                key={di}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDefClick(di)}
                disabled={isUsed || activeWord === null}
                className={`w-full text-left p-3 rounded-lg border font-body text-sm transition-all ${
                  isUsed ? "opacity-40 cursor-not-allowed" : activeWord !== null ? "border-primary/30 hover:bg-primary/5 cursor-pointer" : "border-border bg-card"
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
        <Button onClick={() => { setSelected({}); setVerified(false); setActiveWord(null); }} variant="outline" size="sm" className="font-body">
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

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FillBlanksTaskProps {
  wordBank: string[];
  sentences: { text: string; blank: string }[]; // text has ___ where blank goes
}

const FillBlanksTask = ({ wordBank, sentences }: FillBlanksTaskProps) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const reset = () => { setAnswers({}); setShowResults(false); };

  const correctCount = Object.entries(answers).filter(
    ([k]) => answers[Number(k)]?.toLowerCase().trim() === sentences[Number(k)].blank.toLowerCase().trim()
  ).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 p-3 rounded-xl bg-muted/40 border-2 border-dashed border-border">
        {wordBank.map((w, i) => (
          <span key={i} className="px-3 py-1 rounded-full bg-primary/10 text-primary font-body text-sm font-medium border border-primary/20">
            {w}
          </span>
        ))}
      </div>
      {sentences.map((s, i) => {
        const parts = s.text.split("___");
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className={`flex flex-wrap items-center gap-1 p-3 rounded-xl border-2 font-body text-sm ${
              showResults
                ? answers[i]?.toLowerCase().trim() === s.blank.toLowerCase().trim()
                  ? "bg-primary/10 border-primary/40"
                  : "bg-destructive/10 border-destructive/40"
                : "bg-card border-border"
            }`}
          >
            <span className="font-semibold text-primary mr-1">{i + 1}.</span>
            <span>{parts[0]}</span>
            <select
              value={answers[i] || ""}
              onChange={(e) => setAnswers((prev) => ({ ...prev, [i]: e.target.value }))}
              disabled={showResults}
              className="px-2 py-1 rounded-lg border-2 bg-background font-body text-sm min-w-[140px] focus:ring-2 focus:ring-accent focus:outline-none"
            >
              <option value="">— select —</option>
              {wordBank.map((w, wi) => (
                <option key={wi} value={w}>{w}</option>
              ))}
            </select>
            {parts[1] && <span>{parts[1]}</span>}
            {showResults && (
              answers[i]?.toLowerCase().trim() === s.blank.toLowerCase().trim()
                ? <CheckCircle2 className="w-4 h-4 text-primary ml-1" />
                : <span className="text-xs text-primary font-medium ml-1">({s.blank})</span>
            )}
          </motion.div>
        );
      })}
      <div className="flex gap-3 pt-3">
        <Button onClick={() => setShowResults(true)} disabled={showResults} size="sm" className="font-body">
          <CheckCircle2 className="w-4 h-4 mr-1" /> Check Answers
        </Button>
        {showResults && (
          <Button onClick={reset} variant="outline" size="sm" className="font-body">
            <RotateCcw className="w-4 h-4 mr-1" /> Try Again
          </Button>
        )}
      </div>
      {showResults && (
        <p className="font-body text-sm font-medium text-primary">
          {correctCount} / {sentences.length} correct!
        </p>
      )}
    </div>
  );
};

export default FillBlanksTask;

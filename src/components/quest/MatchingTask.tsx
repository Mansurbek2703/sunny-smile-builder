import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MatchingTaskProps {
  pairs: { left: string; right: string }[];
  correctAnswers: Record<number, string>;
}

const MatchingTask = ({ pairs, correctAnswers }: MatchingTaskProps) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const letters = "ABCDEFGHIJ".split("");

  const handleChange = (index: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [index]: value.toUpperCase() }));
  };

  const checkAnswers = () => setShowResults(true);
  const reset = () => { setAnswers({}); setShowResults(false); };

  return (
    <div className="space-y-3">
      {pairs.map((pair, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 rounded-lg border transition-colors ${
            showResults
              ? answers[i] === correctAnswers[i]
                ? "bg-primary/5 border-primary/30"
                : "bg-destructive/5 border-destructive/30"
              : "bg-card border-border"
          }`}
        >
          <span className="font-body font-medium text-sm min-w-[120px]">{pair.left}</span>
          <input
            type="text"
            maxLength={1}
            value={answers[i] || ""}
            onChange={(e) => handleChange(i, e.target.value)}
            disabled={showResults}
            placeholder="?"
            className="w-10 h-10 text-center rounded-lg border bg-background font-display font-bold text-lg focus:ring-2 focus:ring-primary focus:outline-none disabled:opacity-60"
          />
          <span className="font-body text-xs text-muted-foreground flex-1">{pair.right}</span>
          {showResults && (
            answers[i] === correctAnswers[i]
              ? <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
              : <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
          )}
        </motion.div>
      ))}
      <div className="flex gap-3 pt-4">
        <Button onClick={checkAnswers} disabled={showResults} size="sm" className="font-body">
          <CheckCircle2 className="w-4 h-4 mr-1" /> Check Answers
        </Button>
        {showResults && (
          <Button onClick={reset} variant="outline" size="sm" className="font-body">
            <RotateCcw className="w-4 h-4 mr-1" /> Try Again
          </Button>
        )}
      </div>
    </div>
  );
};

export default MatchingTask;

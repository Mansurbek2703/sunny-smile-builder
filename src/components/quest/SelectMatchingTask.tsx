import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SelectMatchingTaskProps {
  pairs: { left: string; right: string }[];
  options: string[];
  correctAnswers: Record<number, string>;
}

const SelectMatchingTask = ({ pairs, options, correctAnswers }: SelectMatchingTaskProps) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleChange = (index: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const reset = () => { setAnswers({}); setShowResults(false); };

  return (
    <div className="space-y-3">
      {pairs.map((pair, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 rounded-xl border-2 transition-all ${
            showResults
              ? answers[i] === correctAnswers[i]
                ? "bg-primary/10 border-primary/40"
                : "bg-destructive/10 border-destructive/40"
              : "bg-card border-border hover:border-accent/30"
          }`}
        >
          <span className="font-body font-semibold text-sm min-w-[200px] sm:min-w-[240px]">{pair.left}</span>
          
          <select
            value={answers[i] || ""}
            onChange={(e) => handleChange(i, e.target.value)}
            disabled={showResults}
            className="w-full sm:w-auto min-w-[220px] p-2.5 rounded-lg border-2 bg-background font-body text-sm focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none disabled:opacity-60 appearance-none cursor-pointer"
          >
            <option value="">— Select meaning —</option>
            {options.map((opt, oi) => (
              <option key={oi} value={opt}>{opt}</option>
            ))}
          </select>

          {showResults && (
            answers[i] === correctAnswers[i]
              ? <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
              : <div className="flex items-center gap-1 flex-shrink-0">
                  <XCircle className="w-5 h-5 text-destructive" />
                  <span className="text-xs text-primary font-body font-medium">{correctAnswers[i]}</span>
                </div>
          )}
        </motion.div>
      ))}
      <div className="flex gap-3 pt-4">
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
          {Object.entries(answers).filter(([k]) => answers[Number(k)] === correctAnswers[Number(k)]).length} / {pairs.length} correct!
        </p>
      )}
    </div>
  );
};

export default SelectMatchingTask;

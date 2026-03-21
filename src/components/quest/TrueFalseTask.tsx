import { useState } from "react";
import { trackAnswer } from "@/lib/trackAnswer";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrueFalseTaskProps {
  statements: { text: string; answer: boolean }[];
}

const TrueFalseTask = ({ statements }: TrueFalseTaskProps) => {
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (index: number, value: boolean) => {
    if (showResults) return;
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const reset = () => { setAnswers({}); setShowResults(false); };

  const correctCount = Object.entries(answers).filter(
    ([k]) => answers[Number(k)] === statements[Number(k)].answer
  ).length;

  return (
    <div className="space-y-3">
      {statements.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.04 }}
          className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 rounded-xl border-2 transition-all ${
            showResults
              ? answers[i] === s.answer
                ? "bg-primary/10 border-primary/40"
                : "bg-destructive/10 border-destructive/40"
              : "bg-card border-border hover:border-accent/30"
          }`}
        >
          <span className="font-body text-lg flex-1">
            <span className="font-semibold text-primary mr-2">{i + 1}.</span>
            {s.text}
          </span>
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={() => handleSelect(i, true)}
              disabled={showResults}
              className={`px-4 py-1.5 rounded-lg font-body text-lg font-medium transition-all border-2 ${
                answers[i] === true
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-border hover:border-primary/40"
              }`}
            >
              True
            </button>
            <button
              onClick={() => handleSelect(i, false)}
              disabled={showResults}
              className={`px-4 py-1.5 rounded-lg font-body text-lg font-medium transition-all border-2 ${
                answers[i] === false
                  ? "bg-destructive text-destructive-foreground border-destructive"
                  : "bg-background border-border hover:border-destructive/40"
              }`}
            >
              False
            </button>
          </div>
          {showResults && (
            answers[i] === s.answer
              ? <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
              : <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
          )}
        </motion.div>
      ))}
      <div className="flex gap-3 pt-3">
        <Button onClick={() => setShowResults(true)} disabled={showResults || Object.keys(answers).length < statements.length} size="sm" className="font-body">
          <CheckCircle2 className="w-4 h-4 mr-1" /> Check Answers
        </Button>
        {showResults && (
          <Button onClick={reset} variant="outline" size="sm" className="font-body">
            <RotateCcw className="w-4 h-4 mr-1" /> Try Again
          </Button>
        )}
      </div>
      {showResults && (
        <p className="font-body text-lg font-medium text-primary">
          {correctCount} / {statements.length} correct!
        </p>
      )}
    </div>
  );
};

export default TrueFalseTask;

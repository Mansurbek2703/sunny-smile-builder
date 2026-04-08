import { useState } from "react";
import { trackAnswer } from "@/lib/trackAnswer";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, RotateCcw, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SelectMatchingTaskProps {
  pairs: { left: string; right: string; leftImage?: string }[];
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
      {pairs.map((pair, i) => {
        const isCorrect = showResults && answers[i] === correctAnswers[i];
        const isWrong = showResults && answers[i] !== correctAnswers[i];
        const hasAnswer = !!answers[i];

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl border-2 transition-all ${
              isCorrect
                ? "bg-primary/10 border-primary/40"
                : isWrong
                ? "bg-destructive/10 border-destructive/40"
                : "bg-card border-border hover:border-accent/30"
            }`}
          >
            <span className="font-body font-semibold text-lg min-w-0 sm:min-w-[200px] flex-shrink-0 flex items-center gap-2">
              {pair.leftImage && <img src={pair.leftImage} alt="" className={`object-cover rounded inline-block ${pair.leftImage.includes('/dishes/') ? 'w-16 h-12 sm:w-20 sm:h-14 rounded-lg shadow-sm' : 'w-8 h-6 rounded-sm'}`} />}
              {pair.left}
            </span>
            
            {hasAnswer && (
              <ArrowRight className={`w-4 h-4 flex-shrink-0 hidden sm:block ${
                isCorrect ? "text-primary" : isWrong ? "text-destructive" : "text-accent"
              }`} />
            )}
            
            <select
              value={answers[i] || ""}
              onChange={(e) => handleChange(i, e.target.value)}
              disabled={showResults}
              className="w-full sm:w-auto sm:min-w-[200px] sm:flex-1 p-2 sm:p-2.5 rounded-lg border-2 bg-background font-body text-lg focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none disabled:opacity-60 appearance-none cursor-pointer"
            >
              <option value="">— Select —</option>
              {options.map((opt, oi) => (
                <option key={oi} value={opt}>{opt}</option>
              ))}
            </select>

            {showResults && (
              isCorrect
                ? <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                : <div className="flex items-center gap-1 flex-shrink-0 max-w-full overflow-hidden">
                    <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <span className="text-lg text-primary font-body font-medium truncate">{correctAnswers[i]}</span>
                  </div>
            )}
          </motion.div>
        );
      })}
      <div className="flex gap-3 pt-4">
        <Button onClick={() => { setShowResults(true); const cc = Object.entries(answers).filter(([k]) => answers[Number(k)] === correctAnswers[Number(k)]).length; trackAnswer("select_matching", `sm_${pairs.length}`, answers, cc === pairs.length); }} disabled={showResults} size="sm" className="font-body">
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
          {Object.entries(answers).filter(([k]) => answers[Number(k)] === correctAnswers[Number(k)]).length} / {pairs.length} correct!
        </p>
      )}
    </div>
  );
};

export default SelectMatchingTask;

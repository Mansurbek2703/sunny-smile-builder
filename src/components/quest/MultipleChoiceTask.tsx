import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

interface MultipleChoiceTaskProps {
  questions: Question[];
}

const MultipleChoiceTask = ({ questions }: MultipleChoiceTaskProps) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (qIndex: number, oIndex: number) => {
    if (showResults) return;
    setAnswers((prev) => ({ ...prev, [qIndex]: oIndex }));
  };

  const reset = () => { setAnswers({}); setShowResults(false); };

  const correctCount = Object.entries(answers).filter(
    ([k]) => answers[Number(k)] === questions[Number(k)].correctIndex
  ).length;

  return (
    <div className="space-y-5">
      {questions.map((q, qi) => (
        <motion.div
          key={qi}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: qi * 0.05 }}
          className="space-y-2"
        >
          <p className="font-body text-base font-semibold">
            <span className="text-primary mr-2">{qi + 1}.</span>
            {q.question}
          </p>
          <div className="grid sm:grid-cols-2 gap-2">
            {q.options.map((opt, oi) => {
              const isSelected = answers[qi] === oi;
              const isCorrect = showResults && oi === q.correctIndex;
              const isWrong = showResults && isSelected && oi !== q.correctIndex;
              return (
                <button
                  key={oi}
                  onClick={() => handleSelect(qi, oi)}
                  disabled={showResults}
                  className={`text-left p-3 rounded-lg font-body text-base border-2 transition-all ${
                    isCorrect
                      ? "bg-primary/10 border-primary/50 font-medium"
                      : isWrong
                      ? "bg-destructive/10 border-destructive/50"
                      : isSelected
                      ? "bg-accent/10 border-accent"
                      : "bg-card border-border hover:border-accent/30"
                  }`}
                >
                  <span className="font-semibold mr-2 text-muted-foreground">
                    {String.fromCharCode(97 + oi)})
                  </span>
                  {opt}
                  {isCorrect && <CheckCircle2 className="w-4 h-4 text-primary inline ml-2" />}
                  {isWrong && <XCircle className="w-4 h-4 text-destructive inline ml-2" />}
                </button>
              );
            })}
          </div>
        </motion.div>
      ))}
      <div className="flex gap-3 pt-3">
        <Button onClick={() => setShowResults(true)} disabled={showResults || Object.keys(answers).length < questions.length} size="sm" className="font-body">
          <CheckCircle2 className="w-4 h-4 mr-1" /> Check Answers
        </Button>
        {showResults && (
          <Button onClick={reset} variant="outline" size="sm" className="font-body">
            <RotateCcw className="w-4 h-4 mr-1" /> Try Again
          </Button>
        )}
      </div>
      {showResults && (
        <p className="font-body text-base font-medium text-primary">
          {correctCount} / {questions.length} correct!
        </p>
      )}
    </div>
  );
};

export default MultipleChoiceTask;

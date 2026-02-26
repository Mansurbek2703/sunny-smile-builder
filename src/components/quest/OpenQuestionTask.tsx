import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OpenQuestionTaskProps {
  title: string;
  questions: string[];
}

const OpenQuestionTask = ({ title, questions }: OpenQuestionTaskProps) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  return (
    <div className="space-y-2">
      <h4 className="font-display text-lg font-semibold">{title}</h4>
      {questions.map((q, i) => (
        <div key={i} className="space-y-2">
          <p className="font-body text-sm font-medium">
            <span className="text-primary mr-2">{i + 1}.</span>
            {q}
          </p>
          <textarea
            value={answers[i] || ""}
            onChange={(e) => setAnswers((prev) => ({ ...prev, [i]: e.target.value }))}
            placeholder="Write your answer here..."
            className="w-full p-2 rounded-lg border bg-background font-body text-sm resize-none min-h-[50px] focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
      ))}
    </div>
  );
};

export default OpenQuestionTask;

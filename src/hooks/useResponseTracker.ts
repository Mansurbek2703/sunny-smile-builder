import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

const RESPONDENT_KEY = "respondent_id";

export function useResponseTracker(questNumber: number, steps: { id: string }[], currentStep: number) {
  const respondentId = typeof window !== "undefined" ? localStorage.getItem(RESPONDENT_KEY) : null;
  const stepEnteredAt = useRef<number>(Date.now());
  const prevStep = useRef<number>(-1);
  const questLogged = useRef(false);

  // Log quest_started once
  useEffect(() => {
    if (!respondentId || questLogged.current) return;
    questLogged.current = true;
    supabase.from("activity_log").insert({
      respondent_id: respondentId,
      quest_number: questNumber,
      step_id: steps[0]?.id || "intro",
      action: "quest_started",
    }).then(() => {});
  }, [respondentId, questNumber]);

  // Track step changes
  useEffect(() => {
    if (!respondentId) return;
    const stepId = steps[currentStep]?.id || `step_${currentStep}`;

    // Log duration for previous step
    if (prevStep.current >= 0 && prevStep.current !== currentStep) {
      const duration = Math.round((Date.now() - stepEnteredAt.current) / 1000);
      const prevStepId = steps[prevStep.current]?.id || `step_${prevStep.current}`;
      supabase.from("activity_log").insert({
        respondent_id: respondentId,
        quest_number: questNumber,
        step_id: prevStepId,
        action: "step_completed",
        duration_seconds: duration,
      }).then(() => {});
    }

    // Log step entered
    supabase.from("activity_log").insert({
      respondent_id: respondentId,
      quest_number: questNumber,
      step_id: stepId,
      action: "step_entered",
    }).then(() => {});

    stepEnteredAt.current = Date.now();
    prevStep.current = currentStep;
  }, [currentStep, respondentId, questNumber]);

  // Listen for answer events from task components
  useEffect(() => {
    if (!respondentId) return;

    const handler = (e: Event) => {
      const d = (e as CustomEvent).detail;
      supabase.from("responses").insert({
        respondent_id: respondentId,
        quest_number: questNumber,
        step_id: steps[currentStep]?.id || `step_${currentStep}`,
        task_id: d.taskId || "unknown",
        task_type: d.taskType || "unknown",
        answer_data: d.answerData || {},
        is_correct: d.isCorrect ?? null,
      }).then(() => {});
    };

    window.addEventListener("quest-answer", handler);
    return () => window.removeEventListener("quest-answer", handler);
  }, [currentStep, respondentId, questNumber]);
}

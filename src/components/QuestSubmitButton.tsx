import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Send } from "lucide-react";

export function QuestSubmitButton({ questNumber }: { questNumber: number }) {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const respondentId = localStorage.getItem("respondent_id");
    if (respondentId) {
      await supabase.from("activity_log").insert({
        respondent_id: respondentId,
        quest_number: questNumber,
        action: "quest_completed",
      });
    }
    navigate(`/quest/${questNumber}/complete`);
  };

  return (
    <div className="mt-6 text-center">
      <Button onClick={handleSubmit} size="lg" className="gap-2 text-lg px-8 py-6">
        <Send className="w-5 h-5" /> Submit & Finish
      </Button>
    </div>
  );
}

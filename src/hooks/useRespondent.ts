import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "respondent_id";

export interface RespondentData {
  email: string;
  first_name: string;
  last_name: string;
  father_name?: string;
  course_direction: string;
  university: string;
}

export function useRespondent() {
  const [respondentId, setRespondentId] = useState<string | null>(
    () => localStorage.getItem(STORAGE_KEY)
  );
  const [isRegistered, setIsRegistered] = useState(!!localStorage.getItem(STORAGE_KEY));

  useEffect(() => {
    setIsRegistered(!!respondentId);
  }, [respondentId]);

  const register = useCallback(async (data: RespondentData) => {
    // Check if email already exists
    const { data: existing } = await supabase
      .from("respondents")
      .select("id")
      .eq("email", data.email)
      .maybeSingle();

    if (existing) {
      localStorage.setItem(STORAGE_KEY, existing.id);
      setRespondentId(existing.id);
      return existing.id;
    }

    const { data: inserted, error } = await supabase
      .from("respondents")
      .insert(data)
      .select("id")
      .single();

    if (error) throw error;

    localStorage.setItem(STORAGE_KEY, inserted.id);
    setRespondentId(inserted.id);
    return inserted.id;
  }, []);

  return { respondentId, isRegistered, register };
}

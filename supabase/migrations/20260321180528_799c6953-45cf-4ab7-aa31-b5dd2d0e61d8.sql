
-- 1. Respondents table
CREATE TABLE public.respondents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  father_name text,
  course_direction text NOT NULL,
  university text NOT NULL,
  registered_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.respondents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert respondents"
  ON public.respondents FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can select respondents"
  ON public.respondents FOR SELECT
  TO public
  USING (true);

-- 2. Responses table
CREATE TABLE public.responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  respondent_id uuid NOT NULL REFERENCES public.respondents(id) ON DELETE CASCADE,
  quest_number integer NOT NULL,
  step_id text NOT NULL,
  task_id text NOT NULL,
  task_type text NOT NULL DEFAULT 'open',
  answer_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_correct boolean,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert responses"
  ON public.responses FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can select responses"
  ON public.responses FOR SELECT
  TO public
  USING (true);

-- 3. Activity log table
CREATE TABLE public.activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  respondent_id uuid NOT NULL REFERENCES public.respondents(id) ON DELETE CASCADE,
  quest_number integer NOT NULL,
  step_id text,
  action text NOT NULL,
  duration_seconds integer,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert activity_log"
  ON public.activity_log FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can select activity_log"
  ON public.activity_log FOR SELECT
  TO public
  USING (true);

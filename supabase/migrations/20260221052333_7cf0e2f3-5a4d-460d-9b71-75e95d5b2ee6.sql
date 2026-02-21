
-- WebQuests table
CREATE TABLE public.webquests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quest_number INTEGER NOT NULL UNIQUE,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  module_title TEXT,
  cover_image TEXT,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Quest steps (Introduction, Task, Process, etc.)
CREATE TABLE public.quest_steps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  webquest_id UUID NOT NULL REFERENCES public.webquests(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  step_type TEXT NOT NULL DEFAULT 'content', -- content, task, video, research, reflection
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Quest tasks (matching, vocabulary, fill-in, etc.)
CREATE TABLE public.quest_tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  step_id UUID NOT NULL REFERENCES public.quest_steps(id) ON DELETE CASCADE,
  task_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  instruction TEXT,
  task_type TEXT NOT NULL DEFAULT 'matching', -- matching, open_question, vocabulary, fill_table, role_play, venn_diagram
  task_data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Quest images
CREATE TABLE public.quest_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  webquest_id UUID NOT NULL REFERENCES public.webquests(id) ON DELETE CASCADE,
  step_id UUID REFERENCES public.quest_steps(id) ON DELETE SET NULL,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.webquests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quest_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quest_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quest_images ENABLE ROW LEVEL SECURITY;

-- Public read access (educational content)
CREATE POLICY "Anyone can view published webquests" ON public.webquests FOR SELECT USING (is_published = true);
CREATE POLICY "Anyone can view quest steps" ON public.quest_steps FOR SELECT USING (true);
CREATE POLICY "Anyone can view quest tasks" ON public.quest_tasks FOR SELECT USING (true);
CREATE POLICY "Anyone can view quest images" ON public.quest_images FOR SELECT USING (true);

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_webquests_updated_at
  BEFORE UPDATE ON public.webquests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

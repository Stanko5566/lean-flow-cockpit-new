-- Create sidebar preferences table
CREATE TABLE IF NOT EXISTS public.sidebar_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  menu_item TEXT NOT NULL,
  is_hidden BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, menu_item)
);

-- Create RLS policies
ALTER TABLE public.sidebar_preferences ENABLE ROW LEVEL SECURITY;

-- Users can read/update/delete their own preferences
CREATE POLICY "Users can read their own preferences" ON public.sidebar_preferences
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences" ON public.sidebar_preferences
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences" ON public.sidebar_preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own preferences" ON public.sidebar_preferences
  FOR DELETE USING (auth.uid() = user_id);

-- Create function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at on update
CREATE TRIGGER update_sidebar_preferences_updated_at
BEFORE UPDATE ON public.sidebar_preferences
FOR EACH ROW
EXECUTE FUNCTION update_timestamp(); 
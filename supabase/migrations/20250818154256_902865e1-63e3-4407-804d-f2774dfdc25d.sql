-- Create songs table for music management
CREATE TABLE public.songs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT,
  duration INTEGER NOT NULL DEFAULT 0, -- duration in seconds
  image_url TEXT,
  audio_url TEXT,
  is_live BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.songs ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to songs
CREATE POLICY "Songs are publicly readable" 
ON public.songs 
FOR SELECT 
USING (true);

-- Create policy to allow authenticated users to manage songs
CREATE POLICY "Authenticated users can manage songs" 
ON public.songs 
FOR ALL 
USING (auth.uid() IS NOT NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_songs_updated_at
BEFORE UPDATE ON public.songs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample live radio data
INSERT INTO public.songs (title, artist, is_live, duration) VALUES 
('Transmissão Ao Vivo', 'Rádio Vivendo Na Fé', true, 0);

-- 1) Tabela de estado atual da reprodução (apenas 1 linha)
CREATE TABLE IF NOT EXISTS public.current_playback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  song_title text NOT NULL,
  artist text,
  duration_sec integer, -- duração total da música em segundos (pode ser NULL se for ao vivo)
  started_at timestamp with time zone NOT NULL DEFAULT now(), -- quando a faixa começou
  is_live boolean NOT NULL DEFAULT true,
  artwork_url text,
  source text, -- ex.: 'zeno.fm' ou 'icecast'
  -- truque para garantir uma única linha
  singleton boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Garante que só exista 1 linha (singleton = true)
CREATE UNIQUE INDEX IF NOT EXISTS current_playback_singleton_idx
ON public.current_playback (singleton);

-- RLS
ALTER TABLE public.current_playback ENABLE ROW LEVEL SECURITY;

-- Políticas
DROP POLICY IF EXISTS "Playback é publicamente legível" ON public.current_playback;
CREATE POLICY "Playback é publicamente legível"
ON public.current_playback
FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Usuários autenticados podem gerenciar playback" ON public.current_playback;
CREATE POLICY "Usuários autenticados podem gerenciar playback"
ON public.current_playback
FOR ALL
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

-- Trigger de updated_at
DROP TRIGGER IF EXISTS update_current_playback_updated_at ON public.current_playback;
CREATE TRIGGER update_current_playback_updated_at
BEFORE UPDATE ON public.current_playback
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insere a linha singleton inicial (caso não exista)
INSERT INTO public.current_playback (song_title, is_live, singleton)
VALUES ('Rádio Vivendo Na Fé', true, true)
ON CONFLICT (singleton) DO NOTHING;


-- 2) Histórico de execuções (play events)
CREATE TABLE IF NOT EXISTS public.play_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  song_title text NOT NULL,
  artist text,
  duration_sec integer,
  started_at timestamp with time zone NOT NULL DEFAULT now(),
  ended_at timestamp with time zone,
  is_live boolean NOT NULL DEFAULT false,
  artwork_url text,
  source text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Índices úteis
CREATE INDEX IF NOT EXISTS play_events_started_at_idx
ON public.play_events (started_at DESC);

-- RLS
ALTER TABLE public.play_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Play events são publicamente legíveis" ON public.play_events;
CREATE POLICY "Play events são publicamente legíveis"
ON public.play_events
FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Usuários autenticados podem gerenciar play events" ON public.play_events;
CREATE POLICY "Usuários autenticados podem gerenciar play events"
ON public.play_events
FOR ALL
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

-- Trigger de updated_at
DROP TRIGGER IF EXISTS update_play_events_updated_at ON public.play_events;
CREATE TRIGGER update_play_events_updated_at
BEFORE UPDATE ON public.play_events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

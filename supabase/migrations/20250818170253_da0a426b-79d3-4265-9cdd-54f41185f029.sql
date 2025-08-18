-- This migration regenerates types by creating a dummy view
-- This will trigger Supabase to update the generated types.ts file to include app_branding table

-- Create a simple view to trigger type regeneration
CREATE OR REPLACE VIEW public.branding_view AS 
SELECT id, name, logo_url, cover_url, active 
FROM public.app_branding 
WHERE active = true;

-- Grant access to the view
GRANT SELECT ON public.branding_view TO anon, authenticated;
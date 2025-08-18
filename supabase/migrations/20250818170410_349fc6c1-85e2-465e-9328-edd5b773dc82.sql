-- Table to store app branding (logo/cover images)
create table if not exists public.app_branding (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  cover_url text,
  active boolean not null default true,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Enable RLS
alter table public.app_branding enable row level security;

-- Public read
create policy if not exists "Branding is publicly readable"
on public.app_branding
for select
using (true);

-- Authenticated manage
create policy if not exists "Authenticated users can manage branding"
on public.app_branding
for all
using (auth.uid() is not null);

-- Trigger to keep updated_at fresh
drop trigger if exists update_app_branding_updated_at on public.app_branding;
create trigger update_app_branding_updated_at
before update on public.app_branding
for each row
execute function public.update_updated_at_column();

-- Optional: seed a default inactive row so we can fill later via UI
insert into public.app_branding (name, active)
values ('default', false)
on conflict do nothing;
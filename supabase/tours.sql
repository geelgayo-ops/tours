create table if not exists public.tour_reviews(
 id uuid primary key default gen_random_uuid(), user_id uuid references auth.users on delete set null, email text,
 tour text check (length(tour)<=50), stars smallint not null check (stars between 1 and 5), review text check (length(review)<=3000),
 visited smallint, total smallint, adults smallint, kids smallint, duration smallint, lang text check (length(lang)<=10),
 app_version text check (length(app_version)<=50), user_agent text check (length(user_agent)<=500), created_at timestamptz default now());
create table if not exists public.tour_feedback(
 id uuid primary key default gen_random_uuid(), user_id uuid references auth.users on delete set null, email text,
 tour text check (length(tour)<=50), station smallint, stars smallint check (stars between 1 and 5), free_text text check (length(free_text)<=4000),
 req_area text check (length(req_area)<=300), app_version text check (length(app_version)<=50), user_agent text check (length(user_agent)<=500), created_at timestamptz default now());
do $$ declare t text; begin foreach t in array array['tour_reviews','tour_feedback'] loop
 execute format('alter table public.%I enable row level security',t);
 execute format('revoke all on public.%I from anon, authenticated',t);
 execute format('grant insert on public.%I to anon, authenticated',t);
 execute format('drop policy if exists "%s insert auth" on public.%I',t,t);
 execute format('drop policy if exists "%s insert anon" on public.%I',t,t);
 execute format('create policy "%s insert auth" on public.%I for insert to authenticated with check (user_id=auth.uid() and email is not distinct from (auth.jwt()->>''email''))',t,t);
 execute format('create policy "%s insert anon" on public.%I for insert to anon with check (user_id is null and email is null)',t,t);
end loop; end $$;

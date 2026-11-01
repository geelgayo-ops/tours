create table if not exists public.tours_generated(
 id uuid primary key default gen_random_uuid(), user_id uuid references auth.users on delete set null,
 place text check (length(place)<=200), lat double precision not null, lng double precision not null,
 lang text check (length(lang)<=10), duration smallint, title text check (length(title)<=200),
 stations jsonb not null, route jsonb, model text, rating_sum int default 0, rating_count int default 0, created_at timestamptz default now());
create index if not exists tours_generated_ll on public.tours_generated(lat,lng);
alter table public.tours_generated enable row level security;
revoke all on public.tours_generated from anon, authenticated;
grant select on public.tours_generated to anon, authenticated;
drop policy if exists "tg read" on public.tours_generated;
create policy "tg read" on public.tours_generated for select to anon, authenticated using (true);
create table if not exists public.tour_ai_usage(k text, day date default current_date, calls int default 0, primary key(k,day));
alter table public.tour_ai_usage enable row level security;
revoke all on public.tour_ai_usage from anon, authenticated;
create or replace function public.bump_tour_ai(key text, lim int) returns int language plpgsql security definer set search_path=public as $$
declare c int; begin insert into tour_ai_usage(k,day,calls) values(key,current_date,1) on conflict(k,day) do update set calls=tour_ai_usage.calls+1 returning calls into c;
 if c>lim then raise exception 'rate_limit'; end if; return c; end $$;
revoke all on function public.bump_tour_ai(text,int) from public, anon, authenticated;
-- ratings: aggregate trigger from tour_reviews (tour = 'gen:<uuid>')
create or replace function public.tg_rate() returns trigger language plpgsql security definer set search_path=public as $$
begin if new.tour like 'gen:%' then update tours_generated set rating_sum=rating_sum+new.stars, rating_count=rating_count+1 where id::text=substr(new.tour,5); end if; return new; end $$;
drop trigger if exists tg_rate on public.tour_reviews;
create trigger tg_rate after insert on public.tour_reviews for each row execute function public.tg_rate();

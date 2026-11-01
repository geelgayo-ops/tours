-- public, anonymised read access to reviews (no user_id/email)
create or replace view public.tour_reviews_public as select tour, stars, nullif(review,'') review, created_at from public.tour_reviews where stars is not null;
create or replace view public.tour_stats as select tour, round(avg(stars)::numeric,1) avg, count(*) n from public.tour_reviews group by tour;
revoke all on public.tour_reviews_public, public.tour_stats from anon, authenticated;
grant select on public.tour_reviews_public, public.tour_stats to anon, authenticated;

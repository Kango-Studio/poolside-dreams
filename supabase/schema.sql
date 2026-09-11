-- Blog schema for SJ Pools & Landscaping.
-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  category text not null,
  cover_url text,
  content_json jsonb not null,
  content_html text not null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_status_published_at_idx
  on public.posts (status, published_at desc);

-- Keep updated_at current on every edit.
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

-- Row Level Security: public visitors can only read published posts.
-- The single logged-in admin (any authenticated user) can do everything.
alter table public.posts enable row level security;

drop policy if exists "Public can read published posts" on public.posts;
create policy "Public can read published posts"
  on public.posts for select
  to anon
  using (status = 'published');

drop policy if exists "Authenticated can manage posts" on public.posts;
create policy "Authenticated can manage posts"
  on public.posts for all
  to authenticated
  using (true)
  with check (true);

-- Storage bucket for post cover images, publicly readable.
insert into storage.buckets (id, name, public)
values ('post-covers', 'post-covers', true)
on conflict (id) do nothing;

drop policy if exists "Public can view post covers" on storage.objects;
create policy "Public can view post covers"
  on storage.objects for select
  to anon
  using (bucket_id = 'post-covers');

drop policy if exists "Authenticated can manage post covers" on storage.objects;
create policy "Authenticated can manage post covers"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'post-covers')
  with check (bucket_id = 'post-covers');

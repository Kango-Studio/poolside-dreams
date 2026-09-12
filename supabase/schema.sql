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

-- Defense-in-depth field validation at the database level, independent of
-- whatever the admin UI happens to validate client-side.
alter table public.posts drop constraint if exists posts_slug_format_check;
alter table public.posts add constraint posts_slug_format_check
  check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$');

alter table public.posts drop constraint if exists posts_title_not_blank_check;
alter table public.posts add constraint posts_title_not_blank_check
  check (length(trim(title)) > 0);

alter table public.posts drop constraint if exists posts_excerpt_not_blank_check;
alter table public.posts add constraint posts_excerpt_not_blank_check
  check (length(trim(excerpt)) > 0);

alter table public.posts drop constraint if exists posts_category_not_blank_check;
alter table public.posts add constraint posts_category_not_blank_check
  check (length(trim(category)) > 0);

-- Categories: a lightweight, admin-managed list so post categories stay
-- consistent (no "Design" vs "design" vs "Designs" typos). Posts still store
-- the category as plain text (see `posts.category` above) — renaming a
-- category here cascades into every post's `category` column, see the
-- rename step the app performs alongside `categories` updates.
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

alter table public.categories enable row level security;

drop policy if exists "Authenticated can manage categories" on public.categories;
create policy "Authenticated can manage categories"
  on public.categories for all
  to authenticated
  using (true)
  with check (true);

alter table public.categories drop constraint if exists categories_name_not_blank_check;
alter table public.categories add constraint categories_name_not_blank_check
  check (length(trim(name)) > 0);

-- Storage bucket for post cover images, publicly readable. Restricted to
-- real image formats (no SVG — it can carry inline <script>) and capped at
-- 5MB server-side, matching the client-side check in lib/posts.ts so the
-- limit holds even if a request bypasses the app's own validation.
insert into storage.buckets (id, name, public, allowed_mime_types, file_size_limit)
values (
  'post-covers',
  'post-covers',
  true,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  5242880
)
on conflict (id) do update set
  allowed_mime_types = excluded.allowed_mime_types,
  file_size_limit = excluded.file_size_limit;

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

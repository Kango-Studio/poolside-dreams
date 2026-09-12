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

-- Once the admin enrolls two-factor authentication, a session that only
-- completed the password step (aal1) should no longer be able to read or
-- write anything here — otherwise MFA would just be a UI speed bump, not a
-- real barrier (a stolen aal1 token would still work against the API
-- directly). Before enrollment this always returns true, so nothing changes
-- until MFA is actually turned on.
create or replace function public.has_verified_mfa()
returns boolean
language sql
security definer
set search_path = auth, public
stable
as $$
  select exists (
    select 1 from auth.mfa_factors
    where user_id = auth.uid() and status = 'verified'
  );
$$;

grant execute on function public.has_verified_mfa() to authenticated;

-- Allowlist of admin accounts. The anon key is public by design (it's meant
-- to sit in client-side code), which means anyone can call
-- supabase.auth.signUp() straight from a browser console and mint their own
-- "authenticated" session. Without this table, a policy that just checks
-- `to authenticated` would hand that brand-new stranger the exact same
-- write access as the real admin. RLS is intentionally left off this table
-- entirely below (no policies at all) so it's only ever readable/writable
-- from the Supabase SQL editor, never through the API.
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade
);

alter table public.admin_users enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  -- Bootstrap mode: if no admin has been added yet, don't lock everyone out
  -- of the empty table before the one-time setup step at the bottom of this
  -- file has run. Add your own row there as soon as you can.
  select
    not exists (select 1 from public.admin_users)
    or exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

grant execute on function public.is_admin() to authenticated;

-- Row Level Security: public visitors can only read published posts.
-- Only the allowlisted admin (see admin_users above) can do everything else,
-- and only once they've completed MFA if it's enabled (has_verified_mfa).
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
  using (
    public.is_admin()
    and ((select auth.jwt() ->> 'aal') = 'aal2' or not public.has_verified_mfa())
  )
  with check (
    public.is_admin()
    and ((select auth.jwt() ->> 'aal') = 'aal2' or not public.has_verified_mfa())
  );

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
  using (
    public.is_admin()
    and ((select auth.jwt() ->> 'aal') = 'aal2' or not public.has_verified_mfa())
  )
  with check (
    public.is_admin()
    and ((select auth.jwt() ->> 'aal') = 'aal2' or not public.has_verified_mfa())
  );

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
  using (
    bucket_id = 'post-covers'
    and public.is_admin()
    and ((select auth.jwt() ->> 'aal') = 'aal2' or not public.has_verified_mfa())
  )
  with check (
    bucket_id = 'post-covers'
    and public.is_admin()
    and ((select auth.jwt() ->> 'aal') = 'aal2' or not public.has_verified_mfa())
  );

-- ─────────────────────────────────────────────────────────────────────────
-- ONE-TIME SETUP — run this once, separately, after everything above.
-- 1. Find your user id:
--      select id, email from auth.users;
-- 2. Copy your id and run (replacing the placeholder):
--      insert into public.admin_users (user_id)
--      values ('paste-your-user-id-here')
--      on conflict (user_id) do nothing;
-- Until you do this, is_admin() runs in "bootstrap mode" (allows any
-- authenticated user) — so also disable public sign-ups in the dashboard
-- (Authentication -> Settings -> Allow new users to sign up) before or
-- immediately after running the block above.
-- ─────────────────────────────────────────────────────────────────────────

-- Quote builder schema for SJ Pools & Landscaping.
-- Run once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- Requires supabase/schema.sql to have been run first (it defines
-- set_updated_at(), is_admin() and has_verified_mfa()).
--
-- Data model:
--   quote_settings  one row with the estimate range spread, currency and the
--                   disclaimer shown under the estimate.
--   quote_steps     the questions of the configurator, in order. Each step has
--                   an input type: cards (image cards, pick one), select
--                   (dropdown, pick one), multi (checkbox cards, pick many)
--                   or toggle (a single yes/no item).
--   quote_options   the choices inside a step. Each carries a price (added to
--                   the estimate) and a percent (raises or lowers the whole
--                   estimate). estimate = sum(price) * (1 + sum(percent)/100).

create table if not exists public.quote_settings (
  id smallint primary key default 1 check (id = 1),
  spread_percent numeric(5, 2) not null default 12
    check (spread_percent >= 0 and spread_percent <= 50),
  currency text not null default 'USD' check (currency ~ '^[A-Z]{3}$'),
  disclaimer text not null default 'A non-binding estimate. Your final proposal follows a free technical site visit.',
  updated_at timestamptz not null default now()
);

insert into public.quote_settings (id) values (1) on conflict (id) do nothing;

create table if not exists public.quote_steps (
  id uuid primary key default gen_random_uuid(),
  title text not null check (length(trim(title)) > 0),
  short_label text not null default '',
  description text not null default '',
  input_type text not null default 'cards'
    check (input_type in ('cards', 'select', 'multi', 'toggle')),
  required boolean not null default true,
  position integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.quote_options (
  id uuid primary key default gen_random_uuid(),
  step_id uuid not null references public.quote_steps (id) on delete cascade,
  label text not null check (length(trim(label)) > 0),
  description text not null default '',
  image_url text,
  price numeric(12, 2) not null default 0,
  percent numeric(6, 2) not null default 0,
  position integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists quote_steps_position_idx on public.quote_steps (position);
create index if not exists quote_options_step_position_idx
  on public.quote_options (step_id, position);

drop trigger if exists quote_settings_set_updated_at on public.quote_settings;
create trigger quote_settings_set_updated_at
  before update on public.quote_settings
  for each row execute function public.set_updated_at();

drop trigger if exists quote_steps_set_updated_at on public.quote_steps;
create trigger quote_steps_set_updated_at
  before update on public.quote_steps
  for each row execute function public.set_updated_at();

drop trigger if exists quote_options_set_updated_at on public.quote_options;
create trigger quote_options_set_updated_at
  before update on public.quote_options
  for each row execute function public.set_updated_at();

-- Row Level Security -------------------------------------------------------
-- Visitors (and any signed-in non-admin) can only read what is active.
-- The allowlisted admin, once through MFA if enabled, can do everything.

alter table public.quote_settings enable row level security;
alter table public.quote_steps enable row level security;
alter table public.quote_options enable row level security;

drop policy if exists "Public can read quote settings" on public.quote_settings;
create policy "Public can read quote settings"
  on public.quote_settings for select
  to anon, authenticated
  using (true);

drop policy if exists "Public can read active quote steps" on public.quote_steps;
create policy "Public can read active quote steps"
  on public.quote_steps for select
  to anon, authenticated
  using (active);

drop policy if exists "Public can read active quote options" on public.quote_options;
create policy "Public can read active quote options"
  on public.quote_options for select
  to anon, authenticated
  using (active);

drop policy if exists "Admin can manage quote settings" on public.quote_settings;
create policy "Admin can manage quote settings"
  on public.quote_settings for all
  to authenticated
  using (
    public.is_admin()
    and ((select auth.jwt() ->> 'aal') = 'aal2' or not public.has_verified_mfa())
  )
  with check (
    public.is_admin()
    and ((select auth.jwt() ->> 'aal') = 'aal2' or not public.has_verified_mfa())
  );

drop policy if exists "Admin can manage quote steps" on public.quote_steps;
create policy "Admin can manage quote steps"
  on public.quote_steps for all
  to authenticated
  using (
    public.is_admin()
    and ((select auth.jwt() ->> 'aal') = 'aal2' or not public.has_verified_mfa())
  )
  with check (
    public.is_admin()
    and ((select auth.jwt() ->> 'aal') = 'aal2' or not public.has_verified_mfa())
  );

drop policy if exists "Admin can manage quote options" on public.quote_options;
create policy "Admin can manage quote options"
  on public.quote_options for all
  to authenticated
  using (
    public.is_admin()
    and ((select auth.jwt() ->> 'aal') = 'aal2' or not public.has_verified_mfa())
  )
  with check (
    public.is_admin()
    and ((select auth.jwt() ->> 'aal') = 'aal2' or not public.has_verified_mfa())
  );

-- Storage for option images --------------------------------------------------
-- Publicly readable, admin-writable. The admin UI converts uploads to WebP
-- before sending, so 5MB is generous.

insert into storage.buckets (id, name, public, allowed_mime_types, file_size_limit)
values (
  'quote-images',
  'quote-images',
  true,
  array['image/jpeg', 'image/png', 'image/webp'],
  5242880
)
on conflict (id) do update set
  allowed_mime_types = excluded.allowed_mime_types,
  file_size_limit = excluded.file_size_limit;

drop policy if exists "Public can view quote images" on storage.objects;
create policy "Public can view quote images"
  on storage.objects for select
  to anon
  using (bucket_id = 'quote-images');

drop policy if exists "Admin can manage quote images" on storage.objects;
create policy "Admin can manage quote images"
  on storage.objects for all
  to authenticated
  using (
    bucket_id = 'quote-images'
    and public.is_admin()
    and ((select auth.jwt() ->> 'aal') = 'aal2' or not public.has_verified_mfa())
  )
  with check (
    bucket_id = 'quote-images'
    and public.is_admin()
    and ((select auth.jwt() ->> 'aal') = 'aal2' or not public.has_verified_mfa())
  );

-- Starter catalog ------------------------------------------------------------
-- PLACEHOLDER content and prices so the configurator works on day one. Edit
-- everything from the admin panel (Quote builder). Only runs when there are
-- no steps yet, so re-running this file never overwrites real data.

do $$
declare
  s_yard uuid := gen_random_uuid();
  s_pool uuid := gen_random_uuid();
  s_spa uuid := gen_random_uuid();
  s_raised uuid := gen_random_uuid();
  s_features uuid := gen_random_uuid();
begin
  if exists (select 1 from public.quote_steps) then
    return;
  end if;

  insert into public.quote_steps
    (id, title, short_label, description, input_type, required, position)
  values
    (s_yard, 'How big is your yard?', 'Yard size',
     'Pick the option closest to your property. We''ll confirm exact dimensions during the site visit.',
     'cards', true, 0),
    (s_pool, 'Choose your pool size.', 'Pool size',
     'Start with a size that fits how you''ll use it. Everything can be customized later in design.',
     'select', true, 1),
    (s_spa, 'Would you like a spa?', 'Spa',
     'Add an attached hot tub for year-round relaxation.',
     'toggle', false, 2),
    (s_raised, 'Raise the pool?', 'Raised pool',
     'An elevated pool wall adds a dramatic feature face.',
     'toggle', false, 3),
    (s_features, 'Pick your features.', 'Features',
     'Choose the extras that turn a pool into a destination.',
     'multi', false, 4);

  insert into public.quote_options
    (step_id, label, description, image_url, price, percent, position)
  values
    (s_yard, 'Compact yard', 'Up to ~5,000 sq ft. Intimate, tightly planned outdoor space.', '/quote/yard-compact.webp', 0, -8, 0),
    (s_yard, 'Standard yard', '~5,000 to 10,000 sq ft. Room for a pool, patio and planting.', '/quote/yard-standard.webp', 0, 0, 1),
    (s_yard, 'Estate yard', '10,000+ sq ft. Space for full outdoor-living environments.', '/quote/yard-estate.webp', 0, 15, 2),

    (s_pool, 'Compact — 12 × 24 ft', 'A refined plunge-style pool, ideal for smaller footprints.', null, 55000, 0, 0),
    (s_pool, 'Standard — 16 × 32 ft', 'The most popular size: room for lounging, swimming and play.', null, 78000, 0, 1),
    (s_pool, 'Large — 20 × 40 ft', 'Generous proportions for entertaining and lap swimming.', null, 105000, 0, 2),

    (s_spa, 'Spa', 'An attached hot tub with its own jets and heating.', null, 18000, 0, 0),
    (s_raised, 'Raised pool', 'An elevated pool wall with a feature face, seating ledge or spillway.', null, 14000, 0, 0),

    (s_features, 'Fountain', 'Sculptural water features that add movement and sound.', null, 4500, 0, 0),
    (s_features, 'Automatic cover', 'A motorized safety cover that opens and closes at the push of a button.', null, 12000, 0, 1),
    (s_features, 'LED lighting', 'Color-changing underwater and perimeter lighting.', null, 3500, 0, 2),
    (s_features, 'Pool heating', 'Extend your swim season with a high-efficiency heater.', null, 6500, 0, 3);
end $$;

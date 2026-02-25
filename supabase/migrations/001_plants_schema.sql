-- Enable pgvector extension
create extension if not exists vector;

-- Plants table — the core of Spirio
create table public.plants (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,

  -- Names (multi-language for Scandinavian expansion)
  name_no text not null,          -- Norwegian
  name_se text,                   -- Swedish
  name_dk text,                   -- Danish
  name_latin text not null,       -- Scientific name

  -- Content
  description text not null,
  embedding_text text,            -- Full text that was embedded (for auditing/regen)
  embedding vector(1536),         -- OpenAI text-embedding-3-small output

  -- Appearance
  colors text[] not null default '{}',
  image_url text,
  height_min_cm int,
  height_max_cm int,
  bloom_months int[] default '{}',   -- 1=jan, 12=dec

  -- Growing conditions
  sunlight text check (sunlight in ('sol', 'halvskygge', 'skygge', 'sol-halvskygge')),
  soil_moisture text check (soil_moisture in ('tørr', 'normal', 'fuktig')),
  drought_tolerant boolean default false,

  -- Norwegian hardiness zones H1–H8 (THE moat)
  -- H1=coldest (Finnmark), H8=warmest (SW coast)
  hardiness_zones int[] not null default '{}',

  -- Use cases
  use_cases text[] default '{}',
  cut_flower boolean default false,
  scent text check (scent in ('ingen', 'svak', 'sterk')) default 'ingen',
  attracts_pollinators boolean default false,

  -- Propagation & growing
  available_as text[] default '{}',     -- ['frø', 'plante', 'løk', 'knolle']
  difficulty text check (difficulty in ('lett', 'middels', 'krevende')) default 'lett',
  sow_months_indoor int[] default '{}',
  sow_months_outdoor int[] default '{}',
  plant_out_months int[] default '{}',

  -- Taxonomy
  plant_type text,    -- 'stauder', 'ettårig', 'toårig', 'busk', 'tre', etc.
  categories text[] default '{}',

  -- Meta
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Retailers table
create table public.retailers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  url text not null,
  country text not null default 'no',
  affiliate_program text,         -- e.g. 'Adtraction', 'direct'
  logo_url text
);

-- Plant ↔ Retailer links (affiliate buy links)
create table public.plant_retailer_links (
  id uuid primary key default gen_random_uuid(),
  plant_id uuid references public.plants(id) on delete cascade,
  retailer_id uuid references public.retailers(id) on delete cascade,
  product_url text not null,
  affiliate_url text,             -- tracked affiliate link
  price_approx_nok numeric(8,2),
  available_as text,              -- 'frø', 'plante', 'løk'
  in_stock boolean default true,
  created_at timestamptz default now()
);

-- User gardens (Min hage)
create table public.gardens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  name text not null default 'Min hage',
  hardiness_zone int check (hardiness_zone between 1 and 8),
  notes text,
  created_at timestamptz default now()
);

-- Plants in a garden
create table public.garden_plants (
  id uuid primary key default gen_random_uuid(),
  garden_id uuid references public.gardens(id) on delete cascade,
  plant_id uuid references public.plants(id) on delete cascade,
  quantity int default 1,
  notes text,
  added_at timestamptz default now(),
  unique(garden_id, plant_id)
);

-- Search analytics (to improve results over time)
create table public.search_logs (
  id uuid primary key default gen_random_uuid(),
  query text not null,
  zone_filter int,
  result_count int,
  clicked_plant_id uuid references public.plants(id),
  created_at timestamptz default now()
);

-- ── Indexes ────────────────────────────────────────────────

-- Vector similarity index (IVFFlat for <100k rows; use HNSW for larger datasets)
create index plants_embedding_idx on public.plants
  using ivfflat (embedding vector_cosine_ops) with (lists = 100);

-- GIN indexes for array searches (zones, colors, use_cases)
create index plants_zones_idx on public.plants using gin (hardiness_zones);
create index plants_colors_idx on public.plants using gin (colors);
create index plants_use_cases_idx on public.plants using gin (use_cases);

-- ── Semantic search RPC ─────────────────────────────────────

-- Call this with the embedding of the user's query
create or replace function search_plants(
  query_embedding vector(1536),
  zone_filter int default null,
  match_count int default 12
)
returns table (
  id uuid,
  slug text,
  name_no text,
  name_latin text,
  description text,
  colors text[],
  hardiness_zones int[],
  cut_flower boolean,
  attracts_pollinators boolean,
  drought_tolerant boolean,
  scent text,
  categories text[],
  sunlight text,
  similarity float
)
language sql stable
as $$
  select
    p.id, p.slug, p.name_no, p.name_latin, p.description,
    p.colors, p.hardiness_zones, p.cut_flower,
    p.attracts_pollinators, p.drought_tolerant, p.scent,
    p.categories, p.sunlight,
    1 - (p.embedding <=> query_embedding) as similarity
  from public.plants p
  where
    p.embedding is not null
    and (zone_filter is null or zone_filter = any(p.hardiness_zones))
  order by p.embedding <=> query_embedding
  limit match_count;
$$;

-- ── Row Level Security ───────────────────────────────────────

alter table public.plants enable row level security;
alter table public.retailers enable row level security;
alter table public.plant_retailer_links enable row level security;
alter table public.gardens enable row level security;
alter table public.garden_plants enable row level security;
alter table public.search_logs enable row level security;

-- Plants and retailers: public read
create policy "plants_public_read" on public.plants for select using (true);
create policy "retailers_public_read" on public.retailers for select using (true);
create policy "links_public_read" on public.plant_retailer_links for select using (true);

-- Gardens: user-owned
create policy "gardens_own" on public.gardens
  for all using (auth.uid() = user_id);
create policy "garden_plants_own" on public.garden_plants
  for all using (
    garden_id in (select id from public.gardens where user_id = auth.uid())
  );

-- Search logs: anon insert only
create policy "search_logs_insert" on public.search_logs
  for insert with check (true);

-- ── Seed data: initial retailers ─────────────────────────────

insert into public.retailers (name, url, country) values
  ('Solhatt', 'https://solhatt.no', 'no'),
  ('Botanisk Verden', 'https://botaniskverd.no', 'no'),
  ('Nelson Garden', 'https://nelsongardenb2c.no', 'no'),
  ('Hageland', 'https://hageland.no', 'no'),
  ('Frøbutikken', 'https://frobutikken.no', 'no');

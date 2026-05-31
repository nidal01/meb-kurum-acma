-- Supabase SQL Editor'da çalıştırın (blog_v2_migration.sql sonrası)

-- Hedef SEO anahtar kelimeleri
create table if not exists public.blog_seo_keywords (
  id uuid primary key default gen_random_uuid(),
  keyword text not null unique,
  priority int not null default 5 check (priority between 1 and 10),
  source text not null default 'manual' check (source in ('manual', 'site', 'ai')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Haftalık AI/manuel konu havuzu
create table if not exists public.blog_topic_pool (
  id uuid primary key default gen_random_uuid(),
  week_key text not null,
  topic text not null,
  target_keyword text not null default '',
  slot_order int not null check (slot_order between 0 and 13),
  status text not null default 'pending' check (status in ('pending', 'used', 'skipped')),
  source text not null default 'ai' check (source in ('ai', 'manual')),
  seo_rationale text not null default '',
  used_at timestamptz,
  post_id uuid references public.blog_posts (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (week_key, slot_order)
);

create index if not exists blog_topic_pool_week_idx on public.blog_topic_pool (week_key, status);
create index if not exists blog_seo_keywords_active_idx on public.blog_seo_keywords (active, priority desc);

alter table public.blog_seo_keywords enable row level security;
alter table public.blog_topic_pool enable row level security;

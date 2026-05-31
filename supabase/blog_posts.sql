-- Supabase SQL Editor'da çalıştırın

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  content text not null default '',
  status text not null default 'draft' check (status in ('draft', 'published')),
  keywords text[] default '{}',
  created_at timestamptz not null default now(),
  published_at timestamptz
);

create index if not exists blog_posts_status_idx on public.blog_posts (status);
create index if not exists blog_posts_slug_idx on public.blog_posts (slug);

alter table public.blog_posts enable row level security;

-- Site service role ile yazar; anonim okuma yayında olanlar için (isteğe bağlı)
create policy "Public read published posts"
  on public.blog_posts for select
  using (status = 'published');

-- Mevcut kurulumda Supabase SQL Editor'da çalıştırın

-- Admin kullanıcıları
create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  name text not null default '',
  role text not null default 'author' check (role in ('super_admin', 'editor', 'author')),
  created_at timestamptz not null default now()
);

-- Blog yazılarına yeni alanlar
alter table public.blog_posts
  add column if not exists cover_image text,
  add column if not exists author_id uuid references public.admin_users (id) on delete set null,
  add column if not exists updated_at timestamptz default now();

create index if not exists blog_posts_author_idx on public.blog_posts (author_id);

-- İlk süper admin: uygulama ilk girişte ADMIN_EMAIL + ADMIN_PASSWORD ile oluşturulur
-- veya aşağıdaki insert ile manuel ekleyin (şifreyi API login bootstrap ile oluşturun)

alter table public.admin_users enable row level security;

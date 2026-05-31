# MEB Kurum Açma Danışmanlığı

Özel öğretim kurumu açılış süreçleri için Next.js (App Router) ile geliştirilmiş kurumsal danışmanlık sitesi.

## Geliştirme

```bash
npm install
npm run dev
```

Aynı ağdaki cihazlardan erişim için terminalde görünen **Network** adresini kullanın (ör. `http://192.168.x.x:3000`).

```bash
npm run dev:clean   # önbellek temizleyerek başlat
npm run build
npm start
```

## Ortam değişkeni

```bash
cp .env.example .env.local
# NEXT_PUBLIC_SITE_URL=https://alan-adiniz.com
```

## Blog (Gemini + Supabase)

- **Liste / detay:** `/blog`, `/blog/[slug]`
- **Yönetim:** `/admin/blog` — `ADMIN_PASSWORD` ile API çağrıları
- **Ücretsiz AI:** [Google AI Studio](https://aistudio.google.com/apikey) → `GEMINI_API_KEY`
- **Depolama:** Supabase’de `supabase/blog_posts.sql` dosyasını SQL Editor’da çalıştırın
- **Örnek statik yazı:** `content/blog/*.mdx` (Supabase olmadan da görünür)
- **Haftalık taslak:** Vercel Cron `vercel.json` → `CRON_SECRET` + env’ler

```bash
# Yerel test: .env.local içine anahtarları ekleyin
npm run dev
# Admin panel → konu gir → Gemini ile üret → taslağa kaydet → Yayınla
```

## Teknoloji

- Next.js 15, React 19, TypeScript
- Tailwind CSS
- Google Generative AI (`@google/generative-ai`), Supabase, react-markdown

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

- **Liste / detay:** `/blog`, `/blog/[slug]` — sidebar CTA, kapak görseli, iç linkler
- **Admin panel:** `/admin/login` → oturum tabanlı giriş, rol yönetimi (süper admin / editör / yazar)
- **CRUD:** yazı oluştur, düzenle, slug güncelle, yayınla, sil
- **Ücretsiz AI:** [Google AI Studio](https://aistudio.google.com/apikey) → `GEMINI_API_KEY`
- **Depolama:** Supabase'de `supabase/blog_posts.sql` + `supabase/blog_v2_migration.sql`
- **Cron:** günde 2 taslak (06:00 ve 14:00 UTC) — `vercel.json`

```bash
# Yerel: .env.local içine anahtarları ekleyin
npm run dev
# /admin/login → ADMIN_EMAIL + ADMIN_PASSWORD ile giriş
```

## Teknoloji

- Next.js 15, React 19, TypeScript
- Tailwind CSS
- Google Generative AI (`@google/generative-ai`), Supabase, react-markdown

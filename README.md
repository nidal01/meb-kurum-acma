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

## Teknoloji

- Next.js 15, React 19, TypeScript
- Tailwind CSS

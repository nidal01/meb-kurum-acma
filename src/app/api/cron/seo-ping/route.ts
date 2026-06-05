import { NextRequest, NextResponse } from "next/server";
import { getPublishedBlogPosts } from "@/lib/blog";
import { assertCronAuthorized } from "@/lib/cron/cron-route";
import { notifySearchEngines } from "@/lib/seo/notify";
import { SERVICES } from "@/lib/services";

export const dynamic = "force-dynamic";

/**
 * Günlük SEO ping cron'u:
 *  - Son 48 saatte yayınlanan/güncellenen blog yazılarını
 *  - Sabit kurumsal sayfaları (haftalık güvenlik için)
 *  IndexNow + Google Indexing API'ye bildirir.
 */
export async function GET(req: NextRequest) {
  const unauth = assertCronAuthorized(req);
  if (unauth) return unauth;

  const posts = await getPublishedBlogPosts();
  const now = Date.now();
  const cutoff = now - 1000 * 60 * 60 * 48;

  const recentPosts = posts.filter((post) => {
    const ts = new Date(post.publishedAt ?? post.updatedAt ?? post.createdAt).getTime();
    return Number.isFinite(ts) && ts >= cutoff;
  });

  // Haftada bir gün (Pazartesi) tüm önemli URL'leri tazele.
  const isWeeklyRefresh = new Date().getUTCDay() === 1;

  const paths = new Set<string>();
  for (const post of recentPosts) paths.add(`/blog/${post.slug}`);

  if (isWeeklyRefresh) {
    paths.add("/");
    paths.add("/blog");
    paths.add("/hizmetler");
    paths.add("/hakkimizda");
    paths.add("/iletisim");
    for (const service of SERVICES) paths.add(`/hizmetler/${service.slug}`);
  }

  paths.add("/sitemap.xml");

  if (paths.size === 0) {
    return NextResponse.json({ ok: true, sent: 0, note: "Bildirilecek yeni URL yok." });
  }

  const result = await notifySearchEngines(Array.from(paths));
  return NextResponse.json({
    ok: true,
    sent: result.urls.length,
    weeklyRefresh: isWeeklyRefresh,
    indexnow: result.indexnow,
    google: result.google
  });
}

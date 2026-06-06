import type { MetadataRoute } from "next";
import { getPublishedBlogPosts } from "@/lib/blog";
import { SERVICES } from "@/lib/services";
import { SITE_URL } from "@/lib/site";

/**
 * Sitemap için kullanılan kanonik (non-www) ana URL.
 * Tüm yardımcılar buradan türetilir; böylece www / non-www varyantları
 * tek bir kaynaktan üretilebilir.
 */
export const CANONICAL_SITE_URL = SITE_URL;

/**
 * SITE_URL'in www öneki taşıyan karşılığını döner.
 * Zaten www ile başlıyorsa olduğu gibi bırakır.
 */
export function getWwwSiteUrl(baseUrl: string = SITE_URL): string {
  try {
    const url = new URL(baseUrl);
    if (!url.hostname.startsWith("www.")) {
      url.hostname = `www.${url.hostname}`;
    }
    return url.toString().replace(/\/$/, "");
  } catch {
    return baseUrl;
  }
}

/**
 * Verilen base URL için tüm sitemap girdilerini üretir.
 * Hem `app/sitemap.ts` (non-www) hem de `/sitemap-www.xml`
 * rotası tarafından paylaşılır.
 */
export async function buildSitemapEntries(
  baseUrl: string
): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const staticRoutes = ["", "/hizmetler", "/blog", "/hakkimizda", "/iletisim"];
  const posts = await getPublishedBlogPosts();
  const trimmedBase = baseUrl.replace(/\/$/, "");

  return [
    ...staticRoutes.map((path) => ({
      url: `${trimmedBase}${path}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8
    })),
    ...SERVICES.map((service) => ({
      url: `${trimmedBase}/hizmetler/${service.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7
    })),
    ...posts.map((post) => ({
      url: `${trimmedBase}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt ?? post.createdAt),
      changeFrequency: "monthly" as const,
      priority: 0.6
    })),
    {
      url: `${trimmedBase}/llms.txt`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.5
    }
  ];
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toIsoDate(value: Date | string | number | undefined): string {
  if (!value) return new Date().toISOString();
  return new Date(value).toISOString();
}

/**
 * Next.js'in `MetadataRoute.Sitemap` formatını standart sitemap XML'ine
 * dönüştürür. `/sitemap-www.xml` gibi özel rotalar tarafından kullanılır.
 */
export function renderSitemapXml(entries: MetadataRoute.Sitemap): string {
  const urls = entries
    .map((entry) => {
      const lines = [`    <loc>${escapeXml(entry.url)}</loc>`];
      if (entry.lastModified) {
        lines.push(
          `    <lastmod>${toIsoDate(entry.lastModified as Date | string | number)}</lastmod>`
        );
      }
      if (entry.changeFrequency) {
        lines.push(`    <changefreq>${entry.changeFrequency}</changefreq>`);
      }
      if (typeof entry.priority === "number") {
        lines.push(`    <priority>${entry.priority.toFixed(1)}</priority>`);
      }
      return `  <url>\n${lines.join("\n")}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

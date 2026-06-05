import { notifyGoogleIndexing } from "@/lib/seo/google-indexing";
import { notifyIndexNow } from "@/lib/seo/indexnow";
import { SITE_URL } from "@/lib/site";

export type NotifyResult = {
  urls: string[];
  indexnow: Awaited<ReturnType<typeof notifyIndexNow>>;
  google: Awaited<ReturnType<typeof notifyGoogleIndexing>>;
};

/**
 * Yayın/güncelleme sonrası IndexNow + Google Indexing API'ye paralel bildirim atar.
 * Hata yakalanır; çağıran akış (yayınlama vs.) asla kırılmaz.
 */
export async function notifySearchEngines(
  paths: string[],
  type: "URL_UPDATED" | "URL_DELETED" = "URL_UPDATED"
): Promise<NotifyResult> {
  const urls = paths
    .map((p) => (p.startsWith("http") ? p : `${SITE_URL}${p.startsWith("/") ? p : `/${p}`}`))
    .filter(Boolean);

  const [indexnow, google] = await Promise.all([
    notifyIndexNow(urls).catch((err) => {
      console.error("[notify] indexnow hatası:", err);
      return { ok: false, count: urls.length } as Awaited<ReturnType<typeof notifyIndexNow>>;
    }),
    notifyGoogleIndexing(urls, type).catch((err) => {
      console.error("[notify] google hatası:", err);
      return { ok: false, sent: 0, failed: urls.length } as Awaited<
        ReturnType<typeof notifyGoogleIndexing>
      >;
    })
  ]);

  console.log("[notify] sonuç:", {
    count: urls.length,
    indexnow,
    google
  });

  return { urls, indexnow, google };
}

/** Bir blog yazısı yayınlandığında ilgili URL'leri haberleştirir. */
export async function notifyBlogPostPublished(slug: string): Promise<NotifyResult> {
  return notifySearchEngines([`/blog/${slug}`, `/blog`, `/sitemap.xml`]);
}

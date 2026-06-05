import { SITE_URL } from "@/lib/site";

/**
 * IndexNow protokolü ile arama motorlarına yeni/güncellenen URL bildirir.
 * Bing, Yandex, Naver, Seznam ve Yep IndexNow'ı doğrudan destekler.
 * Google IndexNow'a katılmasa da aynı sinyaller crawl bütçesini olumlu etkiler.
 *
 * Spec: https://www.indexnow.org/documentation
 */

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/IndexNow";

function getKey(): string | null {
  return process.env.INDEXNOW_KEY?.trim() || null;
}

function getHost(): string {
  return new URL(SITE_URL).host;
}

/** IndexNow doğrulama dosyasının URL'si (key ile aynı içeriği döner). */
export function getIndexNowKeyLocation(): string {
  return `${SITE_URL}/api/indexnow/key`;
}

/**
 * IndexNow'a bir veya daha fazla URL bildirir.
 * Hata fırlatmaz; sadece sonucu döner ki yayın akışını kırmasın.
 */
export async function notifyIndexNow(urls: string[]): Promise<{
  ok: boolean;
  status?: number;
  skipped?: string;
  count: number;
}> {
  const key = getKey();
  if (!key) {
    return { ok: false, skipped: "INDEXNOW_KEY tanımlı değil", count: 0 };
  }

  const unique = Array.from(new Set(urls.filter((u) => u && u.startsWith("http"))));
  if (unique.length === 0) {
    return { ok: false, skipped: "URL listesi boş", count: 0 };
  }

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Accept: "application/json"
      },
      body: JSON.stringify({
        host: getHost(),
        key,
        keyLocation: getIndexNowKeyLocation(),
        urlList: unique
      })
    });
    return { ok: res.ok, status: res.status, count: unique.length };
  } catch (err) {
    console.error("[indexnow] istek başarısız:", err);
    return { ok: false, count: unique.length };
  }
}

/** IndexNow doğrulaması için key'in düz metin olarak servis edileceği handler. */
export function getIndexNowKey(): string | null {
  return getKey();
}

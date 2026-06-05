import { createSign } from "node:crypto";

/**
 * Google Indexing API istemcisi.
 * Resmi destek yalnızca JobPosting ve BroadcastEvent şemaları için belirtilmiştir;
 * blog URL'leri için de pratikte yaygın kullanılır ve tarama tetiklemede etkilidir.
 *
 * Kurulum:
 *  1) GCP Console → yeni proje → "Indexing API" etkinleştir.
 *  2) IAM → Service Account oluştur, JSON key indir.
 *  3) Search Console → property → "Settings → Users and permissions" → service
 *     account e-postasını "Owner" olarak ekle.
 *  4) ENV:
 *       GOOGLE_INDEXING_CLIENT_EMAIL=...@...iam.gserviceaccount.com
 *       GOOGLE_INDEXING_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
 *     (Vercel UI'a yapıştırırken \n karakterleri olduğu gibi kalmalı.)
 */

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const PUBLISH_URL = "https://indexing.googleapis.com/v3/urlNotifications:publish";
const SCOPE = "https://www.googleapis.com/auth/indexing";

type Notification = "URL_UPDATED" | "URL_DELETED";

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function isConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_INDEXING_CLIENT_EMAIL && process.env.GOOGLE_INDEXING_PRIVATE_KEY
  );
}

function getPrivateKey(): string {
  const raw = process.env.GOOGLE_INDEXING_PRIVATE_KEY ?? "";
  // Vercel ortam değişkenleri \n'leri literal saklayabilir; PEM için satır sonuna çevir.
  return raw.replace(/\\n/g, "\n");
}

let cachedToken: { token: string; expiresAt: number } | null = null;

async function fetchAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt - 60_000 > Date.now()) {
    return cachedToken.token;
  }

  const iss = process.env.GOOGLE_INDEXING_CLIENT_EMAIL!;
  const now = Math.floor(Date.now() / 1000);

  const header = { alg: "RS256", typ: "JWT" };
  const claims = {
    iss,
    scope: SCOPE,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600
  };

  const signingInput = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(claims))}`;
  const signer = createSign("RSA-SHA256");
  signer.update(signingInput);
  signer.end();
  const signature = base64url(signer.sign(getPrivateKey()));
  const assertion = `${signingInput}.${signature}`;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion
    }).toString()
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Google token alınamadı (${res.status}): ${text}`);
  }

  const data = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000
  };
  return data.access_token;
}

async function publishOne(url: string, type: Notification, token: string): Promise<boolean> {
  const res = await fetch(PUBLISH_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ url, type })
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error(`[google-indexing] ${url} bildirilemedi (${res.status}): ${text}`);
    return false;
  }
  return true;
}

/**
 * Birden fazla URL için Google Indexing API'ye bildirim gönderir.
 * Hata fırlatmaz; özet sonuç döner.
 *
 * Kota: ücretsiz katmanda günde 200 bildirim. Sorun olursa env'i temizleyip pasifleştirin.
 */
export async function notifyGoogleIndexing(
  urls: string[],
  type: Notification = "URL_UPDATED"
): Promise<{ ok: boolean; sent: number; failed: number; skipped?: string }> {
  if (!isConfigured()) {
    return { ok: false, sent: 0, failed: 0, skipped: "Google Indexing API yapılandırılmamış" };
  }

  const unique = Array.from(new Set(urls.filter((u) => u && u.startsWith("http"))));
  if (unique.length === 0) {
    return { ok: false, sent: 0, failed: 0, skipped: "URL listesi boş" };
  }

  let token: string;
  try {
    token = await fetchAccessToken();
  } catch (err) {
    console.error("[google-indexing] token hatası:", err);
    return { ok: false, sent: 0, failed: unique.length };
  }

  const results = await Promise.all(unique.map((url) => publishOne(url, type, token)));
  const sent = results.filter(Boolean).length;
  const failed = results.length - sent;
  return { ok: failed === 0, sent, failed };
}

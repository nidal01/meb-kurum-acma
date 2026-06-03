import { SITE_URL } from "@/lib/site";

/**
 * Otomatik iç linkleme kuralları — blog markdown içeriği içinde geçen
 * stratejik anchor text'leri ana sayfa ve hizmet sayfalarına bağlar.
 *
 * Amaç: Otorite transferi (PageRank flow) + AI Overview için entity sinyali.
 *
 * Kurallar:
 *  - Her cümlede her anchor en fazla 1 kez (over-optimization önlemek için).
 *  - Aynı sayfaya en fazla 2 link (spam değil, doğal).
 *  - Sıra önemli: en spesifik anchor'lar önce eşleşmeli ki "MEB" tek başına
 *    "MEB Oyun Evi" eşleşmesini bozmasın.
 *  - Headings (h1-h6), kod blokları ve mevcut link içeren parçalar es geçilir.
 */
export type AutoLinkRule = {
  /** Eşleşecek terim (kelime sınırı ile aranır, case-insensitive). */
  match: string;
  href: string;
  /** Aynı sayfada bu kuraldan en fazla kaç adet link bırakılacak. */
  maxOccurrences?: number;
  /** title attribute — sayfa üstü tooltip + AEO bonus. */
  title?: string;
};

export const DEFAULT_AUTO_LINK_RULES: AutoLinkRule[] = [
  {
    match: "MEB Oyun Evi",
    href: "/",
    maxOccurrences: 2,
    title: "MEB Oyun Evi — Kurum Açma ve Başvuru Danışmanlığı"
  },
  {
    match: "MEB kurum açma danışmanlığı",
    href: "/",
    maxOccurrences: 1,
    title: "MEB kurum açma danışmanlığı süreci"
  },
  {
    match: "kurum açma danışmanlığı",
    href: "/hizmetler",
    maxOccurrences: 1,
    title: "Tüm kurum açma danışmanlık hizmetleri"
  },
  {
    match: "meb kurum açma",
    href: "/",
    maxOccurrences: 1,
    title: "MEB kurum açma süreci"
  },
  {
    match: "çocuk oyun evi açılışı",
    href: "/hizmetler/cocuk-oyun-evi-acilis-danismanligi",
    maxOccurrences: 1
  },
  {
    match: "özel eğitim rehabilitasyon merkezi",
    href: "/hizmetler/ozel-egitim-rehabilitasyon-merkezi-acilisi",
    maxOccurrences: 1
  },
  {
    match: "psikolojik danışmanlık merkezi",
    href: "/hizmetler/psikolojik-danismanlik-merkezi-kurulumu",
    maxOccurrences: 1
  },
  {
    match: "kurum devir",
    href: "/hizmetler/kurum-devir-islemleri",
    maxOccurrences: 1
  },
  {
    match: "denetim hazırlığı",
    href: "/hizmetler",
    maxOccurrences: 1
  }
];

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Düz metin parçasını React node listesine çevirir.
 * Eşleşen terimleri <a> elemanına dönüştürür, gerisini string bırakır.
 *
 * Önemli: Bu fonksiyon SADECE string node'lar üzerinde çalışır.
 * Headings, kod blokları, mevcut link içeren node'lar çağrılmadan önce filtrelenir.
 */
export function autoLinkText(
  text: string,
  remaining: Map<string, number>,
  rules: AutoLinkRule[] = DEFAULT_AUTO_LINK_RULES
): Array<string | { href: string; text: string; title?: string }> {
  if (!text || !text.trim()) return [text];

  // Tek geçişli regex: tüm kuralları alternation ile birleştir,
  // ancak önceliği koruyup uzun ifadelerin önce eşleşmesi için
  // kuralları uzunluğa göre sıralarız.
  const sortedRules = [...rules].sort((a, b) => b.match.length - a.match.length);
  const pattern = sortedRules
    .map((r) => `(${escapeRegex(r.match)})`)
    .join("|");
  if (!pattern) return [text];

  const re = new RegExp(`\\b(?:${pattern})\\b`, "gi");

  const out: Array<string | { href: string; text: string; title?: string }> = [];
  let lastIndex = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(text)) !== null) {
    const matched = m[0];
    const rule = sortedRules.find(
      (r) => r.match.toLowerCase() === matched.toLowerCase()
    );
    if (!rule) continue;

    const key = rule.match.toLowerCase();
    const left = remaining.get(key) ?? rule.maxOccurrences ?? 1;
    if (left <= 0) continue;

    if (m.index > lastIndex) out.push(text.slice(lastIndex, m.index));
    out.push({
      href: rule.href,
      text: matched,
      title: rule.title
    });
    remaining.set(key, left - 1);
    lastIndex = m.index + matched.length;
  }
  if (lastIndex < text.length) out.push(text.slice(lastIndex));

  return out.length > 0 ? out : [text];
}

/** Yeni bir sayfa render edildiğinde anchor sayaç haritası üret. */
export function createAutoLinkBudget(
  rules: AutoLinkRule[] = DEFAULT_AUTO_LINK_RULES
): Map<string, number> {
  const map = new Map<string, number>();
  for (const r of rules) {
    map.set(r.match.toLowerCase(), r.maxOccurrences ?? 1);
  }
  return map;
}

/** Mutlak URL üretici — JSON-LD/external referans için. */
export function absoluteHref(href: string): string {
  return href.startsWith("http") ? href : `${SITE_URL}${href}`;
}

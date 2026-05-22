import { MEVZUAT_ARTICLES } from "@/lib/mevzuat";
import { SERVICES } from "@/lib/services";

export type SearchResult = {
  title: string;
  href: string;
  excerpt: string;
  category: string;
};

type SearchEntry = {
  title: string;
  href: string;
  category: string;
  text: string;
};

const STATIC_PAGES: SearchEntry[] = [
  {
    title: "Ana Sayfa",
    href: "/",
    category: "Sayfa",
    text: "MEB kurum açma danışmanlığı ön değerlendirme evrak denetim hazırlığı"
  },
  {
    title: "Hizmetlerimiz",
    href: "/hizmetler",
    category: "Sayfa",
    text: "Kurum açma danışmanlığı hizmetleri mevzuat yönetmelik"
  },
  {
    title: "Hakkımızda",
    href: "/hakkimizda",
    category: "Sayfa",
    text: "Kurumsal danışmanlık yaklaşımı MEB süreç yönetimi"
  },
  {
    title: "İletişim",
    href: "/iletisim",
    category: "Sayfa",
    text: "Ön görüşme iletişim formu telefon e-posta başvuru"
  }
];

function buildIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [...STATIC_PAGES];

  for (const service of SERVICES) {
    const chunks = [
      service.title,
      service.summary,
      service.details.kapsam,
      ...service.details.surec,
      ...service.details.belgeler,
      service.guide.lead,
      ...service.guide.sections.flatMap((s) => [s.title, ...s.paragraphs]),
      ...service.faq.flatMap((f) => [f.q, f.a]),
      ...service.seo.keywords
    ];

    entries.push({
      title: service.title,
      href: `/hizmetler/${service.slug}`,
      category: "Hizmet",
      text: chunks.join(" ")
    });
  }

  for (const article of MEVZUAT_ARTICLES) {
    const slug = article.appliesTo[0] ?? "meb-kurum-acma-danismanligi";
    entries.push({
      title: `${article.madde} — ${article.title}`,
      href: `/hizmetler/${slug}#mevzuat`,
      category: "Mevzuat",
      text: [article.madde, article.title, article.excerpt].join(" ")
    });
  }

  return entries;
}

const INDEX = buildIndex();

export function normalizeForSearch(value: string): string {
  return value
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i");
}

function excerptAroundMatch(text: string, query: string, maxLen = 160): string {
  const normalizedText = normalizeForSearch(text);
  const normalizedQuery = normalizeForSearch(query);
  const idx = normalizedText.indexOf(normalizedQuery);
  if (idx < 0) {
    return text.slice(0, maxLen) + (text.length > maxLen ? "…" : "");
  }
  const start = Math.max(0, idx - 40);
  const slice = text.slice(start, start + maxLen).trim();
  const prefix = start > 0 ? "…" : "";
  const suffix = start + maxLen < text.length ? "…" : "";
  return prefix + slice + suffix;
}

export function searchSite(query: string, limit = 20): SearchResult[] {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];

  const terms = normalizeForSearch(trimmed)
    .split(/\s+/)
    .filter((t) => t.length >= 2);
  if (terms.length === 0) return [];

  const results: SearchResult[] = [];

  for (const entry of INDEX) {
    const haystack = normalizeForSearch(`${entry.title} ${entry.text}`);
    const allMatch = terms.every((term) => haystack.includes(term));
    if (!allMatch) continue;

    results.push({
      title: entry.title,
      href: entry.href,
      category: entry.category,
      excerpt: excerptAroundMatch(entry.text, trimmed)
    });
    if (results.length >= limit) break;
  }

  return results;
}

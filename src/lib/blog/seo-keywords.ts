import { SITE_KEYWORDS } from "@/lib/site";
import { SERVICES } from "@/lib/services";

export function getDefaultSeoKeywords(): string[] {
  const fromServices = SERVICES.flatMap((s) => s.seo.keywords.slice(0, 3));
  return Array.from(new Set([...SITE_KEYWORDS, ...fromServices]));
}

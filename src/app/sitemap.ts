import type { MetadataRoute } from "next";
import { buildSitemapEntries, CANONICAL_SITE_URL } from "@/lib/sitemap";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return buildSitemapEntries(CANONICAL_SITE_URL);
}

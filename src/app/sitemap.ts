import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/services";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticRoutes = ["", "/hizmetler", "/hakkimizda", "/iletisim"];

  return [
    ...staticRoutes.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8
    })),
    ...SERVICES.map((service) => ({
      url: `${SITE_URL}/hizmetler/${service.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7
    }))
  ];
}

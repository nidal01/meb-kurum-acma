import type { MetadataRoute } from "next";
import { getPublishedBlogPosts } from "@/lib/blog";
import { SERVICES } from "@/lib/services";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const staticRoutes = ["", "/hizmetler", "/blog", "/hakkimizda", "/iletisim"];
  const posts = await getPublishedBlogPosts();

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
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt ?? post.createdAt),
      changeFrequency: "monthly" as const,
      priority: 0.6
    })),
    {
      url: `${SITE_URL}/llms.txt`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.5
    }
  ];
}

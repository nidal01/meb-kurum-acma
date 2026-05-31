import { SERVICES } from "@/lib/services";
import type { BlogPost } from "@/lib/blog/types";

export type InternalLinkTarget = {
  title: string;
  href: string;
  type: "service" | "page" | "blog";
};

export function getServiceLinkTargets(): InternalLinkTarget[] {
  return SERVICES.map((s) => ({
    title: s.title,
    href: `/hizmetler/${s.slug}`,
    type: "service" as const
  }));
}

export function getStaticPageLinkTargets(): InternalLinkTarget[] {
  return [
    { title: "İletişim", href: "/iletisim", type: "page" },
    { title: "Hizmetler", href: "/hizmetler", type: "page" },
    { title: "Hakkımızda", href: "/hakkimizda", type: "page" },
    { title: "Blog", href: "/blog", type: "page" }
  ];
}

export function getBlogLinkTargets(posts: BlogPost[], excludeSlug?: string): InternalLinkTarget[] {
  return posts
    .filter((p) => p.status === "published" && p.slug !== excludeSlug)
    .slice(0, 8)
    .map((p) => ({
      title: p.title,
      href: `/blog/${p.slug}`,
      type: "blog" as const
    }));
}

export function buildInternalLinkContext(posts: BlogPost[] = []): string {
  const links = [...getServiceLinkTargets(), ...getStaticPageLinkTargets(), ...getBlogLinkTargets(posts)];
  return links.map((l) => `- ${l.title}: ${l.href}`).join("\n");
}

export function getRelatedPosts(posts: BlogPost[], currentSlug: string, limit = 3): BlogPost[] {
  return posts
    .filter((p) => p.status === "published" && p.slug !== currentSlug)
    .slice(0, limit);
}

export function getRelatedServices(currentSlug: string, limit = 3) {
  const hash = currentSlug.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const rotated = [...SERVICES];
  rotated.sort((a, b) => {
    const scoreA = (hash + a.slug.length) % 100;
    const scoreB = (hash + b.slug.length) % 100;
    return scoreA - scoreB;
  });
  return rotated.slice(0, limit);
}

import { pickCoverImage } from "@/lib/blog/images";

export type BlogImageSet = {
  coverImage: string;
  inline1: string;
  inline2: string;
  source: "pexels" | "ai" | "local";
};

type ImageQueries = {
  cover: string;
  inline1: string;
  inline2: string;
};

function hashSeed(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash % 999_999;
}

function buildAiImageUrl(prompt: string, seed: number): string {
  const fullPrompt = [
    "Professional corporate photograph",
    prompt,
    "modern education and consulting environment",
    "clean natural lighting",
    "photorealistic",
    "high quality",
    "no text",
    "no watermark",
    "no logo"
  ].join(", ");

  const params = new URLSearchParams({
    width: "1200",
    height: "675",
    seed: String(seed),
    nologo: "true",
    enhance: "true",
    model: "flux"
  });

  return `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?${params.toString()}`;
}

async function searchPexelsPhoto(query: string, pageSeed: number): Promise<string | null> {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) return null;

  const page = (pageSeed % 5) + 1;
  const url = new URL("https://api.pexels.com/v1/search");
  url.searchParams.set("query", query);
  url.searchParams.set("orientation", "landscape");
  url.searchParams.set("size", "large");
  url.searchParams.set("per_page", "15");
  url.searchParams.set("page", String(page));
  url.searchParams.set("locale", "tr-TR");

  try {
    const res = await fetch(url.toString(), {
      headers: { Authorization: apiKey },
      next: { revalidate: 86400 }
    });
    if (!res.ok) return null;

    const data = (await res.json()) as {
      photos?: Array<{ src?: { large2x?: string; large?: string } }>;
    };

    const photos = data.photos ?? [];
    if (photos.length === 0) return null;

    const index = pageSeed % photos.length;
    const photo = photos[index]?.src;
    return photo?.large2x ?? photo?.large ?? null;
  } catch {
    return null;
  }
}

function deriveQueries(title: string, topic: string, keywords: string[]): ImageQueries {
  const primary = keywords[0] ?? title;
  const secondary = keywords[1] ?? "education documents office";
  const tertiary = keywords[2] ?? "professional consultation meeting";

  return {
    cover: `${primary} education Turkey`.slice(0, 100),
    inline1: `${secondary} paperwork`.slice(0, 100),
    inline2: `${tertiary} classroom`.slice(0, 100)
  };
}

function getProvider(): "pexels" | "ai" | "local" | "auto" {
  const value = process.env.BLOG_IMAGE_PROVIDER?.toLowerCase();
  if (value === "pexels" || value === "ai" || value === "local") return value;
  return "auto";
}

async function resolveOne(
  query: string,
  slug: string,
  variant: number,
  provider: "pexels" | "ai" | "local" | "auto"
): Promise<{ url: string; source: BlogImageSet["source"] }> {
  const seed = hashSeed(`${slug}-${variant}-${query}`);

  if (provider === "local") {
    return { url: pickCoverImage(`${slug}-${variant}`), source: "local" };
  }

  if (provider === "pexels" || provider === "auto") {
    const pexelsUrl = await searchPexelsPhoto(query, seed);
    if (pexelsUrl) return { url: pexelsUrl, source: "pexels" };
    if (provider === "pexels") {
      return { url: buildAiImageUrl(query, seed), source: "ai" };
    }
  }

  return { url: buildAiImageUrl(query, seed), source: "ai" };
}

export async function resolveBlogImages(input: {
  slug: string;
  title: string;
  topic: string;
  keywords: string[];
  imageQueries?: Partial<ImageQueries>;
}): Promise<BlogImageSet> {
  const queries: ImageQueries = {
    ...deriveQueries(input.title, input.topic, input.keywords),
    ...input.imageQueries
  };

  const provider = getProvider();

  const [cover, inline1, inline2] = await Promise.all([
    resolveOne(queries.cover, input.slug, 0, provider),
    resolveOne(queries.inline1, input.slug, 1, provider),
    resolveOne(queries.inline2, input.slug, 2, provider)
  ]);

  const source =
    cover.source === inline1.source && cover.source === inline2.source
      ? cover.source
      : cover.source;

  return {
    coverImage: cover.url,
    inline1: inline1.url,
    inline2: inline2.url,
    source
  };
}

export function injectBlogImages(
  content: string,
  images: Pick<BlogImageSet, "coverImage" | "inline1" | "inline2">
): string {
  return content
    .replace(/!\[([^\]]*)\]\(COVER\)/g, `![$1](${images.coverImage})`)
    .replace(/!\[([^\]]*)\]\(IMAGE_INLINE_1\)/g, `![$1](${images.inline1})`)
    .replace(/!\[([^\]]*)\]\(IMAGE_INLINE_2\)/g, `![$1](${images.inline2})`);
}

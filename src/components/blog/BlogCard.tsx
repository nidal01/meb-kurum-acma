import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/blog/types";

export function BlogCard({ post }: { post: BlogPost }) {
  const date = post.publishedAt ?? post.createdAt;
  const cover = post.coverImage ?? "/images/hero-stripe.svg";

  return (
    <article className="overflow-hidden rounded-sm border border-border bg-white shadow-card transition-colors hover:border-primary/30">
      <div className="relative aspect-[16/9] bg-surface">
        <Image
          src={cover}
          alt=""
          fill
          className="object-cover"
          unoptimized={cover.endsWith(".svg")}
        />
      </div>
      <div className="p-5">
        <time className="text-xs text-gray-500">
          {new Date(date).toLocaleDateString("tr-TR", {
            day: "numeric",
            month: "long",
            year: "numeric"
          })}
        </time>
        <h2 className="mt-2 text-base font-semibold text-gray-900">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary">
            {post.title}
          </Link>
        </h2>
        <p className="mt-2 text-sm leading-7 text-gray-700">{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`} className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">
          Devamını oku
        </Link>
      </div>
    </article>
  );
}

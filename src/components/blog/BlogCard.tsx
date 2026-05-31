import Link from "next/link";
import type { BlogPost } from "@/lib/blog/types";

export function BlogCard({ post }: { post: BlogPost }) {
  const date = post.publishedAt ?? post.createdAt;
  return (
    <article className="rounded-sm border border-border bg-white p-5 shadow-card transition-colors hover:border-primary/30">
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
    </article>
  );
}

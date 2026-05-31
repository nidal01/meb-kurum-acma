import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/blog/types";

export function BlogCard({ post }: { post: BlogPost }) {
  const date = post.publishedAt ?? post.createdAt;
  const cover = post.coverImage ?? "/images/hero-stripe.svg";
  const href = `/blog/${post.slug}`;

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-sm border border-border bg-white shadow-card transition-colors hover:border-primary/30 hover:bg-gray-50/50"
    >
      <article>
        <div className="relative aspect-[16/9] bg-surface">
          <Image
            src={cover}
            alt=""
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
            unoptimized={cover.startsWith("http") || cover.endsWith(".svg")}
          />
        </div>
        <div className="p-5">
          <time className="text-xs text-gray-500" dateTime={date}>
            {new Date(date).toLocaleDateString("tr-TR", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })}
          </time>
          <h2 className="mt-2 text-base font-semibold text-gray-900 transition-colors group-hover:text-primary">
            {post.title}
          </h2>
          <p className="mt-2 line-clamp-3 text-sm leading-7 text-gray-700">{post.excerpt}</p>
        </div>
      </article>
    </Link>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { BlogCard } from "@/components/blog/BlogCard";
import { getPublishedBlogPosts } from "@/lib/blog";
import { buildPageMetadata } from "@/lib/seo";

export const revalidate = 60;

export const metadata: Metadata = buildPageMetadata({
  title: "Blog",
  description:
    "MEB kurum açma, özel öğretim kurumları ve danışmanlık süreçleri hakkında güncel bilgilendirme yazıları.",
  path: "/blog",
  keywords: ["MEB blog", "kurum açma rehberi", "özel öğretim kurumu yazıları"]
});

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <Container className="py-10 sm:py-12">
      <PageHeader
        title="Blog"
        subtitle="Kurum açma süreçleri, mevzuat ve danışmanlık konularında bilgilendirme yazıları."
      />

      <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-600">
        Yazılar bilgilendirme amaçlıdır; güncel mevzuat ve il uygulamaları için ön değerlendirme önerilir.
      </p>

      {posts.length === 0 ? (
        <div className="mt-8 rounded-sm border border-border bg-surface p-6 text-sm text-gray-700">
          Henüz yayınlanmış yazı yok. Yönetim panelinden Gemini ile taslak oluşturup yayınlayabilirsiniz.
        </div>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <p className="mt-8 text-center text-sm text-gray-600">
        <Link href="/iletisim" className="font-semibold text-primary hover:underline">
          Ön görüşme için iletişime geçin
        </Link>
      </p>
    </Container>
  );
}

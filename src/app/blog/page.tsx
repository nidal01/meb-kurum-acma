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

      <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-700">
        <Link
          href="/"
          title="MEB Oyun Evi — Kurum Açma ve Başvuru Danışmanlığı"
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          MEB Oyun Evi
        </Link>{" "}
        blogunda; meb kurum açma, özel öğretim kurumu açılışı, denetim hazırlığı ve
        kurum devir süreçleri hakkında uygulamaya yönelik içerikler bulabilirsiniz.
        İçerikler bilgilendirme amaçlıdır; güncel mevzuat ve il uygulamaları için{" "}
        <Link
          href="/hizmetler"
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          kurum açma danışmanlığı hizmetlerimizi
        </Link>{" "}
        inceleyin.
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

      <aside
        aria-label="MEB Oyun Evi iletişim çağrısı"
        className="mt-10 rounded-sm border border-primary/20 bg-primary/5 p-5 text-sm leading-7 text-gray-700 shadow-card"
      >
        Kurumunuza özel süreç planı için{" "}
        <Link
          href="/"
          title="MEB Oyun Evi ana sayfa"
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          MEB Oyun Evi
        </Link>{" "}
        ekibinden{" "}
        <Link
          href="/iletisim"
          className="font-semibold text-primary underline-offset-4 hover:underline"
        >
          ön görüşme talep edebilirsiniz
        </Link>
        .
      </aside>
    </Container>
  );
}

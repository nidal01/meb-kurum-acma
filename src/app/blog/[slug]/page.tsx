import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { MarkdownContent } from "@/components/blog/MarkdownContent";
import { BlogConsultantSidebar } from "@/components/blog/BlogConsultantSidebar";
import { BlogRelatedLinks } from "@/components/blog/BlogRelatedLinks";
import { getBlogPostBySlug, getPublishedBlogPosts } from "@/lib/blog";
import { getRelatedPosts } from "@/lib/blog/internal-links";
import { makeArticleJsonLd } from "@/lib/aeo/schema";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  return buildPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
    ogDescription: post.excerpt
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const allPublished = await getPublishedBlogPosts();
  const relatedPosts = getRelatedPosts(allPublished, slug, 3);
  const date = post.publishedAt ?? post.createdAt;
  const cover = post.coverImage ?? "/images/hero-stripe.svg";

  return (
    <>
      <Container className="py-10 sm:py-12">
      <nav className="mb-4 text-xs text-gray-600">
        <Link href="/" className="hover:text-primary">
          Ana Sayfa
        </Link>
        <span className="px-1">/</span>
        <Link href="/blog" className="hover:text-primary">
          Blog
        </Link>
        <span className="px-1">/</span>
        <span className="text-gray-800">{post.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-12">
        <article className="lg:col-span-8">
          <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-sm border border-border bg-surface">
            <Image
              src={cover}
              alt={post.title}
              fill
              className="object-cover"
              priority
              unoptimized={cover.startsWith("http") || cover.endsWith(".svg")}
            />
          </div>

          <time className="text-xs text-gray-500">
            {new Date(date).toLocaleDateString("tr-TR", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })}
          </time>
          <h1 className="mt-2 text-2xl font-semibold text-gray-900 sm:text-3xl">{post.title}</h1>
          <p className="mt-3 text-sm leading-7 text-gray-700">{post.excerpt}</p>

          <div className="mt-8 rounded-sm border border-border bg-white p-6 shadow-card">
            <MarkdownContent content={post.content} />
          </div>

          <BlogRelatedLinks currentSlug={slug} relatedPosts={relatedPosts} />

          {/*
            Brand CTA — blog detayından ana sayfa ve hizmetler sayfasına
            güçlü anchor text'lerle otorite transferi (PageRank flow).
          */}
          <aside
            aria-label="MEB Oyun Evi danışmanlık çağrısı"
            className="mt-8 rounded-sm border border-primary/20 bg-primary/5 p-5 shadow-card"
          >
            <h2 className="text-base font-semibold text-gray-900">
              Süreci profesyonel yönetmek ister misiniz?
            </h2>
            <p className="mt-2 text-sm leading-7 text-gray-700">
              Bu içerik bilgilendirme amaçlıdır. Kurumunuza özel başvuru sürecinde{" "}
              <Link
                href="/"
                title="MEB Oyun Evi — Kurum Açma ve Başvuru Danışmanlığı"
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                MEB Oyun Evi
              </Link>{" "}
              ekibi; evrak hazırlığı, fiziki şart kontrolü ve denetim simülasyonunu uçtan
              uca yönetir.
            </p>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-gray-700 sm:grid-cols-2">
              <li>
                <Link
                  href="/"
                  title="MEB kurum açma danışmanlığı"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  → MEB kurum açma danışmanlığı
                </Link>
              </li>
              <li>
                <Link
                  href="/hizmetler"
                  title="Tüm kurum açma danışmanlık hizmetleri"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  → Kurum açma danışmanlığı hizmetleri
                </Link>
              </li>
              <li>
                <Link
                  href="/iletisim"
                  title="MEB Oyun Evi ile ön görüşme"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  → Ön görüşme talebi
                </Link>
              </li>
              <li>
                <Link
                  href="/hakkimizda"
                  title="MEB Oyun Evi danışmanlık yaklaşımı"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  → Danışmanlık yaklaşımımız
                </Link>
              </li>
            </ul>
          </aside>
        </article>

        <div className="lg:col-span-4">
          <BlogConsultantSidebar />
        </div>
      </div>
      </Container>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(makeArticleJsonLd(post)) }}
      />
    </>
  );
}

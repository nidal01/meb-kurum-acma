import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { searchSite } from "@/lib/search";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export const metadata: Metadata = buildPageMetadata({
  title: "Site İçi Arama",
  description:
    "MEB kurum açma danışmanlığı sitesinde hizmet, mevzuat özeti ve sayfa içeriklerinde arama yapın.",
  path: "/arama",
  noIndex: true
});

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const results = query.length >= 2 ? searchSite(query) : [];
  const hasQuery = query.length > 0;
  const tooShort = hasQuery && query.length < 2;

  return (
    <Container className="py-10 sm:py-12">
      <PageHeader
        title="Site İçi Arama"
        subtitle="Hizmetler, sayfalar ve mevzuat özetlerinde arama yapabilirsiniz."
      />

      <form action="/arama" method="get" className="relative mt-8 max-w-2xl">
        <input
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Örn: özel eğitim, kurum açma, evrak, denetim…"
          autoFocus={!hasQuery}
          className="h-11 w-full rounded-full border border-border bg-[#F8F8F8] px-4 pr-12 text-sm text-gray-900 shadow-card outline-none transition-colors placeholder:text-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/15"
        />
        <button
          type="submit"
          aria-label="Ara"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-gray-800 hover:text-primary"
        >
          <Search className="h-5 w-5" />
        </button>
      </form>

      <div className="mt-8 max-w-3xl">
        {!hasQuery && (
          <p className="text-sm leading-7 text-gray-700">
            Aramak istediğiniz kelimeyi yazıp Enter’a basın veya ara düğmesine tıklayın. En az 2 karakter
            girmeniz gerekir.
          </p>
        )}

        {tooShort && (
          <p className="rounded-sm border border-border bg-surface px-4 py-3 text-sm text-gray-700">
            Lütfen en az 2 karakter girin.
          </p>
        )}

        {hasQuery && !tooShort && results.length === 0 && (
          <p className="rounded-sm border border-border bg-surface px-4 py-3 text-sm text-gray-700">
            <span className="font-semibold text-gray-900">&quot;{query}&quot;</span> için sonuç bulunamadı.
            Farklı anahtar kelimeler deneyebilir veya{" "}
            <Link href="/hizmetler" className="font-semibold text-primary hover:underline">
              hizmetlerimizi
            </Link>{" "}
            inceleyebilirsiniz.
          </p>
        )}

        {results.length > 0 && (
          <>
            <p className="mb-4 text-sm text-gray-600">
              <span className="font-semibold text-gray-900">{results.length}</span> sonuç —{" "}
              <span className="font-medium">&quot;{query}&quot;</span>
            </p>
            <ul className="divide-y divide-border rounded-sm border border-border bg-white shadow-card">
              {results.map((item) => (
                <li key={`${item.href}-${item.title}`}>
                  <Link
                    href={item.href}
                    className="block px-5 py-4 transition-colors hover:bg-surface"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-sm bg-surface px-2 py-0.5 text-xs font-semibold text-primary">
                        {item.category}
                      </span>
                      <span className="text-sm font-semibold text-gray-900">{item.title}</span>
                    </div>
                    <p className="mt-1 text-sm leading-7 text-gray-700">{item.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </Container>
  );
}

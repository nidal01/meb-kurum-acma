import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Sayfa Bulunamadı",
  description: "Aradığınız sayfa bulunamadı. MEB kurum açma danışmanlığı ana sayfasına dönebilirsiniz.",
  noIndex: true
});

export default function NotFound() {
  return (
    <Container className="py-12">
      <div className="rounded-sm border border-border bg-white p-6 shadow-card">
        <h1 className="text-xl font-semibold text-gray-900">Sayfa bulunamadı</h1>
        <p className="mt-2 text-sm leading-7 text-gray-700">
          Aradığınız sayfa taşınmış veya kaldırılmış olabilir. Ana sayfaya dönerek devam edebilirsiniz.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex rounded-sm bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-card transition-colors hover:bg-[#c90510]"
        >
          Ana Sayfa
        </Link>
      </div>
    </Container>
  );
}


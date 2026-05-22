import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { SiteLogo } from "@/components/layout/SiteLogo";

const NAV = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hizmetler", label: "Hizmetlerimiz" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" }
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50">
      <TopBar />
      <div className="border-b border-border bg-white">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-4 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <SiteLogo priority />
          </div>

          <div className="lg:col-span-5">
            <form action="/arama" method="get" className="relative" role="search">
              <label htmlFor="header-search" className="sr-only">
                Site içi arama
              </label>
              <input
                id="header-search"
                type="search"
                name="q"
                placeholder="Site içi arama…"
                className="h-10 w-full rounded-full border border-border bg-[#F8F8F8] px-4 pr-12 text-sm text-gray-900 shadow-card outline-none transition-colors placeholder:text-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
              <button
                type="submit"
                aria-label="Ara"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-gray-800 hover:text-primary"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>

          <div className="hidden lg:col-span-3 lg:flex lg:items-center lg:justify-end">
            <Image
              src="https://www.meb.gov.tr/assets/img/turkiye.svg"
              alt="Türkiye haritası"
              width={140}
              height={56}
              className="h-10 w-auto object-contain"
            />
          </div>
        </div>
      </div>

      <div className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3">
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-gray-800 transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/iletisim"
            className="hidden rounded-sm bg-primary px-3 py-2 text-sm font-semibold text-white shadow-card transition-colors hover:bg-[#c90510] sm:inline-flex"
          >
            Hemen Başvurun
          </Link>

          <div className="sm:hidden">
            <Link
              href="/iletisim"
              className="rounded-sm border border-border bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-card transition-colors hover:bg-gray-50"
            >
              Başvur
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}


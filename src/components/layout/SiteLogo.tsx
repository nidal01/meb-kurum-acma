import Image from "next/image";
import Link from "next/link";
import { SITE_ASSETS } from "@/lib/site";

type Props = {
  className?: string;
  priority?: boolean;
};

/**
 * Marka logosu: dairesel logo + "MEB Oyun Evi" başlığı + tagline.
 * SEO/AEO entity tutarlılığı için metadata ve JSON-LD ile aynı isim kullanılır.
 */
export function SiteLogo({ className = "", priority = false }: Props) {
  return (
    <Link
      href="/"
      aria-label="MEB Oyun Evi — Ana Sayfa"
      className={`inline-flex min-w-0 items-center gap-2.5 sm:gap-3 ${className}`}
    >
      <span className="relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white shadow-card sm:h-14 sm:w-14">
        <Image
          src={SITE_ASSETS.logo}
          alt={SITE_ASSETS.logoAlt}
          width={96}
          height={96}
          priority={priority}
          className="h-full w-full object-cover"
        />
      </span>
      <span className="min-w-0 leading-tight text-gray-900">
        <span className="block text-base font-bold text-primary sm:text-lg md:text-xl">
          {SITE_ASSETS.brandTitle}
        </span>
        <span className="block text-[11px] font-medium tracking-wide text-gray-600 sm:text-xs">
          {SITE_ASSETS.brandTagline}
        </span>
      </span>
    </Link>
  );
}

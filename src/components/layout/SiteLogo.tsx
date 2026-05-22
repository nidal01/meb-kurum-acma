import Image from "next/image";
import Link from "next/link";
import { SITE_ASSETS } from "@/lib/site";

type Props = {
  className?: string;
  priority?: boolean;
};

/** MEB.gov.tr benzeri: dairesel logo + bakanlık unvanı */
export function SiteLogo({ className = "", priority = false }: Props) {
  return (
    <Link
      href="/"
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
        <span className="block text-[10px] font-medium tracking-wide text-gray-600 sm:text-[11px]">
          T.C.
        </span>
        <span className="block text-sm font-bold text-primary sm:text-base md:text-lg">
          Millî Eğitim Bakanlığı
        </span>
      </span>
    </Link>
  );
}

import Link from "next/link";
import { Facebook, Instagram, Mail, Phone, Youtube } from "lucide-react";
import { SITE_CONTACT } from "@/lib/site";

export function TopBar() {
  return (
    <div className="border-b border-border bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 text-xs text-gray-700">
        <ul className="flex flex-wrap items-center gap-2">
          <li>
            <Link className="hover:text-primary" href="/">
              Anasayfa
            </Link>{" "}
            <span className="px-1 text-gray-400">/</span>
          </li>
          <li>
            <a className="hover:text-primary" href={SITE_CONTACT.emailMailto}>
              e-Posta
            </a>{" "}
            <span className="px-1 text-gray-400">/</span>
          </li>
          <li>
            <Link className="hover:text-primary" href="/hizmetler">
              S.S.S
            </Link>{" "}
            <span className="px-1 text-gray-400">/</span>
          </li>
          <li>
            <Link className="hover:text-primary" href="/">
              English
            </Link>
          </li>
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={`tel:${SITE_CONTACT.phoneTel}`}
            className="inline-flex items-center gap-2 hover:text-primary"
          >
            <Phone className="h-3.5 w-3.5 text-primary" />
            {SITE_CONTACT.phoneDisplay}
          </a>
          <a
            href={SITE_CONTACT.emailMailto}
            className="inline-flex items-center gap-2 hover:text-primary"
          >
            <Mail className="h-3.5 w-3.5 text-primary" />
            {SITE_CONTACT.email}
          </a>
        </div>

        <ul className="flex items-center gap-3">
          <li>
            <a className="inline-flex hover:text-primary" href="#" aria-label="Facebook">
              <Facebook className="h-4 w-4" />
            </a>
          </li>
          <li>
            <a className="inline-flex hover:text-primary" href="#" aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </a>
          </li>
          <li>
            <a className="inline-flex hover:text-primary" href="#" aria-label="YouTube">
              <Youtube className="h-4 w-4" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

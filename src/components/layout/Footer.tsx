import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { WhatsAppLink } from "@/components/contact/WhatsAppLink";
import { SITE_CONTACT, SITE_NAME } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-10 border-t border-border bg-white">
      <Container className="py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm font-semibold text-gray-900">
              <Link href="/" title="MEB Oyun Evi — Kurum Açma Danışmanlığı" className="hover:text-primary">
                {SITE_NAME}
              </Link>
            </p>
            <p className="mt-3 text-sm leading-7 text-gray-700">
              <strong>MEB Oyun Evi</strong>; meb kurum açma, özel öğretim kurumu açılışı ve
              kurum devir süreçlerinde mevzuata uygun, sistemli ve şeffaf{" "}
              <Link href="/" className="font-medium text-primary hover:underline">
                kurum açma danışmanlığı
              </Link>{" "}
              sunar.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900">Hızlı Linkler</p>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li>
                <Link className="hover:text-primary" href="/hizmetler">
                  Hizmetlerimiz
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" href="/hakkimizda">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" href="/iletisim">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900">İletişim</p>
            <dl className="mt-3 space-y-2 text-sm text-gray-700">
              <div>
                <dt className="font-medium text-gray-900">Telefon</dt>
                <dd>
                  <a href={`tel:${SITE_CONTACT.phoneTel}`} className="hover:text-primary">
                    {SITE_CONTACT.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">E-posta</dt>
                <dd>
                  <a href={SITE_CONTACT.emailMailto} className="hover:text-primary">
                    {SITE_CONTACT.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">WhatsApp</dt>
                <dd>
                  <WhatsAppLink className="text-gray-700" />
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900">Adres</p>
            <p className="mt-3 text-sm leading-7 text-gray-700">{SITE_CONTACT.address}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE_NAME}. Tüm hakları saklıdır.</p>
          <p>
            Kurumsal web sitesi —{" "}
            <Link className="font-medium text-gray-800 hover:text-primary" href="/iletisim">
              İletişim
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}

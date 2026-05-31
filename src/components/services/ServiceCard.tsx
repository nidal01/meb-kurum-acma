import Link from "next/link";
import type { Service } from "@/lib/services";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  const coverSrc = `/images/services/${service.slug}.svg`;
  const href = `/hizmetler/${service.slug}`;

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-sm border border-border bg-white shadow-card transition-colors hover:border-primary/30 hover:bg-gray-50"
    >
      <article>
        <img
          src={coverSrc}
          alt=""
          className="h-28 w-full border-b border-border bg-surface object-cover"
          loading="lazy"
        />
        <div className="p-5">
          <div className="grid h-10 w-10 place-items-center rounded-sm bg-surface text-primary transition-colors group-hover:bg-primary/10">
            <Icon className="h-5 w-5" aria-hidden />
          </div>
          <h3 className="mt-3 text-sm font-semibold text-gray-900 transition-colors group-hover:text-primary">
            {service.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-7 text-gray-700">{service.summary}</p>
        </div>
      </article>
    </Link>
  );
}

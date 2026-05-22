import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/services";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  const coverSrc = `/images/services/${service.slug}.svg`;
  return (
    <div className="overflow-hidden rounded-sm border border-border bg-white shadow-card transition-colors hover:bg-gray-50">
      <img
        src={coverSrc}
        alt={`${service.title} için kapak görseli`}
        className="h-28 w-full border-b border-border bg-surface object-cover"
        loading="lazy"
      />
      <div className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-sm bg-surface text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <Link
          href={`/hizmetler/${service.slug}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-gray-900 hover:text-primary"
        >
          Detay
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <h3 className="mt-3 text-sm font-semibold text-gray-900">{service.title}</h3>
      <p className="mt-2 text-sm leading-7 text-gray-700">{service.summary}</p>
      </div>
    </div>
  );
}


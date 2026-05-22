import Link from "next/link";

export function SectionTitle({
  title,
  subtitle,
  action
}: {
  title: string;
  subtitle?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">{title}</h2>
        {subtitle ? <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-700">{subtitle}</p> : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className="inline-flex w-fit rounded-sm border border-border bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-card transition-colors hover:bg-gray-50"
        >
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}


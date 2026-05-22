export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="rounded-sm border border-border bg-surface p-6 shadow-card">
      <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">{title}</h1>
      {subtitle ? <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-700 sm:text-base">{subtitle}</p> : null}
    </div>
  );
}


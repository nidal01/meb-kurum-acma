import { RichText } from "@/components/content/RichText";
import { ChevronDown } from "lucide-react";

export type AccordionRichItem = {
  id: string;
  title: string;
  paragraphs: string[];
};

export function DetailsAccordionRich({ items }: { items: AccordionRichItem[] }) {
  return (
    <div className="divide-y divide-border rounded-sm border border-border bg-white shadow-card">
      {items.map((item) => (
        <details key={item.id} id={item.id} className="group scroll-mt-28 open:bg-white [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-left text-sm font-semibold text-gray-900 transition-colors hover:bg-surface">
            <span className="pr-2">{item.title}</span>
            <ChevronDown
              aria-hidden
              className="h-4 w-4 shrink-0 text-gray-500 transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <div className="border-t border-border px-5 pb-5 pt-1">
            <RichText paragraphs={item.paragraphs} />
          </div>
        </details>
      ))}
    </div>
  );
}

export type AccordionQaItem = {
  id: string;
  q: string;
  a: string;
};

export function DetailsAccordionFaq({ items }: { items: AccordionQaItem[] }) {
  return (
    <div className="divide-y divide-border rounded-sm border border-border bg-white shadow-card">
      {items.map((item) => (
        <details key={item.id} id={item.id} className="group scroll-mt-28 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-left text-sm font-semibold text-gray-900 transition-colors hover:bg-surface">
            <span className="pr-2">{item.q}</span>
            <ChevronDown
              aria-hidden
              className="h-4 w-4 shrink-0 text-gray-500 transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <div className="border-t border-border px-5 pb-5 pt-1">
            <p className="text-sm leading-7 text-gray-700">{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

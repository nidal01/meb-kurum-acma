import { Fragment, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  autoLinkText,
  createAutoLinkBudget,
  DEFAULT_AUTO_LINK_RULES,
  type AutoLinkRule
} from "@/lib/blog/auto-link";

/**
 * Blog Markdown render edici.
 * - `<p>` ve `<li>` text node'larında stratejik anchor text'leri otomatik linkler.
 * - Headings, code, mevcut <a> içerikleri linklenmez (over-optimization önlenir).
 * - Link bütçesi tek bir render boyunca paylaşılır (her sayfa için global sayım).
 */
export function MarkdownContent({
  content,
  autoLinkRules = DEFAULT_AUTO_LINK_RULES,
  disableAutoLink = false
}: {
  content: string;
  autoLinkRules?: AutoLinkRule[];
  disableAutoLink?: boolean;
}) {
  const budget = createAutoLinkBudget(autoLinkRules);

  function linkifyChildren(children: ReactNode): ReactNode {
    if (disableAutoLink) return children;
    return mapStringNodes(children, (str) => {
      const parts = autoLinkText(str, budget, autoLinkRules);
      if (parts.length === 1 && typeof parts[0] === "string") return str;
      return (
        <>
          {parts.map((p, i) =>
            typeof p === "string" ? (
              <Fragment key={i}>{p}</Fragment>
            ) : (
              <Link
                key={i}
                href={p.href}
                title={p.title}
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                {p.text}
              </Link>
            )
          )}
        </>
      );
    });
  }

  return (
    <div className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-a:text-primary prose-img:rounded-sm prose-img:border prose-img:border-border">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Sadece paragraf ve list-item içerisinde otomatik linkleme uygula.
          p: ({ children }) => <p>{linkifyChildren(children)}</p>,
          li: ({ children }) => <li>{linkifyChildren(children)}</li>,
          img: ({ src, alt }) => {
            if (!src || typeof src !== "string") return null;
            const isExternal = src.startsWith("http");
            return (
              <span className="my-6 block overflow-hidden rounded-sm border border-border bg-surface">
                <Image
                  src={src}
                  alt={alt ?? "Blog görseli"}
                  width={800}
                  height={450}
                  className="h-auto w-full object-cover"
                  unoptimized={isExternal || src.endsWith(".svg")}
                />
              </span>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

/**
 * React children içindeki string yapraklarını transform eder; mevcut React elementlerine
 * (örn. <a>, <strong>) dokunmaz. Böylece zaten linklenmiş içerik yeniden linklenmez.
 */
function mapStringNodes(
  children: ReactNode,
  fn: (s: string) => ReactNode
): ReactNode {
  if (children == null || children === false) return children;
  if (typeof children === "string") return fn(children);
  if (Array.isArray(children)) {
    return children.map((c, i) => (
      <Fragment key={i}>{mapStringNodes(c, fn)}</Fragment>
    ));
  }
  // ReactElement vb. — değiştirmeden geri ver.
  return children;
}

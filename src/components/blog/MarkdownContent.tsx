import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-a:text-primary prose-img:rounded-sm prose-img:border prose-img:border-border">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
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

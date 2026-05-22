export function RichText({
  paragraphs,
  className
}: {
  paragraphs: string[];
  className?: string;
}) {
  return (
    <div className={["prose prose-sm max-w-none prose-p:leading-7 prose-p:text-gray-700", className].filter(Boolean).join(" ")}>
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}


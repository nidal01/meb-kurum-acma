import { makeSiteAeoGraphJsonLd } from "@/lib/aeo/schema";
import { SITE_URL } from "@/lib/site";

export function SiteAeo() {
  const graph = makeSiteAeoGraphJsonLd();

  return (
    <>
      <link rel="alternate" type="text/markdown" href={`${SITE_URL}/llms.txt`} title="LLMs.txt — AI site rehberi" />
      <link rel="alternate" type="text/markdown" href={`${SITE_URL}/llms-full.txt`} title="LLMs-full.txt — AI tam içerik" />
      <meta name="ai-content-declaration" content="public, indexable, citable" />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
    </>
  );
}

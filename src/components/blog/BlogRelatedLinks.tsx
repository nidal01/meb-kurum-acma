import Link from "next/link";
import type { BlogPost } from "@/lib/blog/types";
import { getRelatedServices } from "@/lib/blog/internal-links";

export function BlogRelatedLinks({
  currentSlug,
  relatedPosts
}: {
  currentSlug: string;
  relatedPosts: BlogPost[];
}) {
  const services = getRelatedServices(currentSlug, 3);

  return (
    <div className="mt-10 space-y-6 border-t border-border pt-8">
      {relatedPosts.length > 0 && (
        <section>
          <h2 className="text-base font-semibold text-gray-900">İlgili yazılar</h2>
          <ul className="mt-3 space-y-2">
            {relatedPosts.map((post) => (
              <li key={post.id}>
                <Link href={`/blog/${post.slug}`} className="text-sm text-primary hover:underline">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="text-base font-semibold text-gray-900">İlgili hizmetler</h2>
        <ul className="mt-3 space-y-2">
          {services.map((service) => (
            <li key={service.slug}>
              <Link href={`/hizmetler/${service.slug}`} className="text-sm text-primary hover:underline">
                {service.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

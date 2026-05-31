import { SITE_CONTACT, SITE_DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import type { BlogPost } from "@/lib/blog/types";

export function makeOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo-kurum-acma.png`,
    description: SITE_DEFAULT_DESCRIPTION,
    email: SITE_CONTACT.email,
    telephone: SITE_CONTACT.phoneTel,
    areaServed: {
      "@type": "Country",
      name: "Türkiye"
    },
    knowsAbout: [
      "MEB kurum açma danışmanlığı",
      "Özel öğretim kurumu açılışı",
      "Özel eğitim rehabilitasyon merkezi",
      "Çocuk oyun evi açılışı",
      "Psikolojik danışmanlık merkezi kurulumu",
      "Kurum devir işlemleri",
      "Denetim hazırlığı"
    ],
    sameAs: [SITE_URL]
  };
}

export function makeWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DEFAULT_DESCRIPTION,
    inLanguage: "tr-TR",
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/arama?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function makeProfessionalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#service`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DEFAULT_DESCRIPTION,
    serviceType: "MEB Kurum Açma Danışmanlığı",
    areaServed: "TR",
    provider: { "@id": `${SITE_URL}/#organization` },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Kurum Açma Danışmanlık Hizmetleri",
      itemListElement: SERVICES.map((s, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.summary,
          url: `${SITE_URL}/hizmetler/${s.slug}`
        }
      }))
    }
  };
}

export function makeSiteAeoGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [makeOrganizationJsonLd(), makeWebSiteJsonLd(), makeProfessionalServiceJsonLd()]
  };
}

export function makeArticleJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? (post.coverImage.startsWith("http") ? post.coverImage : `${SITE_URL}${post.coverImage}`) : `${SITE_URL}/images/logo-kurum-acma.png`,
    datePublished: post.publishedAt ?? post.createdAt,
    dateModified: post.updatedAt ?? post.publishedAt ?? post.createdAt,
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    keywords: post.keywords.join(", "),
    inLanguage: "tr-TR",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["article h1", "article p"]
    }
  };
}

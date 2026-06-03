import { SITE_CONTACT, SITE_DEFAULT_DESCRIPTION, SITE_LEGAL_NAME, SITE_NAME, SITE_URL } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import type { BlogPost } from "@/lib/blog/types";

/** Ortak PostalAddress objesi — tüm şemalarda aynı adres entity'si referans alınır. */
function postalAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: SITE_CONTACT.addressParts.streetAddress,
    addressLocality: SITE_CONTACT.addressParts.addressLocality,
    addressRegion: SITE_CONTACT.addressParts.addressRegion,
    postalCode: SITE_CONTACT.addressParts.postalCode,
    addressCountry: SITE_CONTACT.addressParts.addressCountry
  } as const;
}

/** Ortak ContactPoint — Google AI Overview için "varlık iletişim bilgisi" kanonik kaynağı. */
function contactPoint() {
  return {
    "@type": "ContactPoint",
    telephone: SITE_CONTACT.phoneTel,
    email: SITE_CONTACT.email,
    contactType: "customer support",
    areaServed: "TR",
    availableLanguage: ["Turkish", "tr"]
  } as const;
}

export function makeOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: SITE_LEGAL_NAME,
    alternateName: ["MEB Oyun Evi Danışmanlık", "MEB Kurum Açma Danışmanlığı"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/logo-kurum-acma.png`,
      width: 512,
      height: 512
    },
    image: `${SITE_URL}/images/logo-kurum-acma.png`,
    description: SITE_DEFAULT_DESCRIPTION,
    email: SITE_CONTACT.email,
    telephone: SITE_CONTACT.phoneTel,
    address: postalAddress(),
    contactPoint: [contactPoint()],
    areaServed: {
      "@type": "Country",
      name: "Türkiye"
    },
    knowsAbout: [
      "MEB Oyun Evi",
      "MEB kurum açma",
      "Kurum açma danışmanlığı",
      "Özel öğretim kurumu açılışı",
      "Çocuk oyun evi açılışı",
      "Özel eğitim rehabilitasyon merkezi",
      "Psikolojik danışmanlık merkezi kurulumu",
      "Kurum devir işlemleri",
      "Denetim hazırlığı"
    ],
    knowsLanguage: ["tr"],
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
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": `${SITE_URL}/#service`,
    name: SITE_NAME,
    legalName: SITE_LEGAL_NAME,
    url: SITE_URL,
    description: SITE_DEFAULT_DESCRIPTION,
    image: `${SITE_URL}/images/logo-kurum-acma.png`,
    logo: `${SITE_URL}/images/logo-kurum-acma.png`,
    priceRange: "₺₺",
    telephone: SITE_CONTACT.phoneTel,
    email: SITE_CONTACT.email,
    address: postalAddress(),
    contactPoint: [contactPoint()],
    serviceType: [
      "MEB Oyun Evi Danışmanlığı",
      "MEB Kurum Açma Danışmanlığı",
      "Kurum Açma ve Başvuru Danışmanlığı",
      "Özel Öğretim Kurumu Açılış Danışmanlığı"
    ],
    areaServed: {
      "@type": "Country",
      name: "Türkiye"
    },
    provider: { "@id": `${SITE_URL}/#organization` },
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00"
      }
    ],
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
          url: `${SITE_URL}/hizmetler/${s.slug}`,
          provider: { "@id": `${SITE_URL}/#organization` },
          areaServed: "TR"
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

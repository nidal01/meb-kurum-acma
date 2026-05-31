import type { Metadata } from "next";
import {
  SITE_ASSETS,
  SITE_CONTACT,
  SITE_DEFAULT_DESCRIPTION,
  SITE_KEYWORDS,
  META_TITLE_PREFIX,
  SITE_NAME,
  SITE_URL
} from "@/lib/site";

export type PageSeoInput = {
  /** Sayfa adı; tam başlık: T.C. Millî Eğitim Bakanlığı | {title} */
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
  /** OG/Twitter için alternatif segment (uzun SEO başlığı vb.) */
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
};

/** Tüm meta ve OG başlıkları bu önek ile başlar */
export function formatMetaTitle(segment: string): string {
  const trimmed = segment.trim();
  if (trimmed.startsWith(META_TITLE_PREFIX)) return trimmed;
  return `${META_TITLE_PREFIX} | ${trimmed}`;
}

function absoluteUrl(path = ""): string {
  const normalized = path.startsWith("/") ? path : path ? `/${path}` : "";
  return `${SITE_URL}${normalized}`;
}

function sharedOpenGraph(
  canonical: string,
  title: string,
  description: string,
  image: string
): Metadata["openGraph"] {
  return {
    type: "website",
    locale: SITE_ASSETS.locale,
    url: canonical,
    siteName: META_TITLE_PREFIX,
    title,
    description,
    images: [
      {
        url: image,
        width: SITE_ASSETS.ogImage.startsWith("http") ? SITE_ASSETS.ogImageWidth : 512,
        height: SITE_ASSETS.ogImage.startsWith("http") ? SITE_ASSETS.ogImageHeight : 512,
        alt: META_TITLE_PREFIX
      }
    ]
  };
}

function sharedTwitter(title: string, description: string, image: string): Metadata["twitter"] {
  return {
    card: "summary_large_image",
    title,
    description,
    images: [image]
  };
}

export function buildPageMetadata(input: PageSeoInput): Metadata {
  const canonical = input.path ? absoluteUrl(input.path) : SITE_URL;
  const metaTitle = formatMetaTitle(input.title);
  const ogTitle = formatMetaTitle(input.ogTitle ?? input.title);
  const ogDescription = input.ogDescription ?? input.description;
  const ogImage = input.ogImage ?? SITE_ASSETS.ogImage;

  return {
    title: metaTitle,
    description: input.description,
    keywords: input.keywords ?? [...SITE_KEYWORDS],
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: META_TITLE_PREFIX,
    alternates: { canonical },
    robots: input.noIndex
      ? { index: false, follow: true, googleBot: { index: false, follow: true } }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large" }
        },
    openGraph: sharedOpenGraph(canonical, ogTitle, ogDescription, ogImage),
    twitter: sharedTwitter(ogTitle, ogDescription, ogImage)
  };
}

/** Kök layout — favicon, varsayılan OG */
export function buildRootMetadata(): Metadata {
  const canonical = SITE_URL;
  const ogImage = SITE_ASSETS.ogImage;
  const defaultTitle = formatMetaTitle("Kurum Açma Danışmanlığı");

  const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;

  return {
    metadataBase: new URL(SITE_URL),
    ...(googleVerification
      ? { verification: { google: googleVerification } }
      : {}),
    title: {
      default: defaultTitle,
      template: `${META_TITLE_PREFIX} | %s`
    },
    description: SITE_DEFAULT_DESCRIPTION,
    keywords: [...SITE_KEYWORDS],
    applicationName: SITE_NAME,
    category: "education",
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: META_TITLE_PREFIX,
    alternates: { canonical },
    icons: {
      icon: [{ url: SITE_ASSETS.favicon, sizes: "any" }],
      shortcut: SITE_ASSETS.favicon
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" }
    },
    openGraph: sharedOpenGraph(canonical, defaultTitle, SITE_DEFAULT_DESCRIPTION, ogImage),
    twitter: sharedTwitter(defaultTitle, SITE_DEFAULT_DESCRIPTION, ogImage),
    formatDetection: {
      email: false,
      address: false,
      telephone: false
    },
    other: {
      "contact:email": SITE_CONTACT.email,
      "contact:phone_number": SITE_CONTACT.phoneDisplay
    }
  };
}

import type { Metadata } from "next";
import { SITE_URL, business, pages, type SitePath } from "./site";

const shareImage = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: `${business.name}: maquillaje profesional en Armenia, Quindío`,
};

type PageSeo = {
  path: SitePath;
  /** Becomes "<title> | Anyi Trujillo Beauty Studio" through the root template. */
  title: string;
  description: string;
};

/**
 * Per-page metadata. Next merges metadata shallowly, so `openGraph` must be
 * complete here: a page that only set `title` would lose the site name and locale.
 * For the same reason the shared image from `app/opengraph-image.jpg` is listed
 * explicitly: a page-level `openGraph` replaces the one inherited from the file.
 */
export function pageMetadata({ path, title, description }: PageSeo): Metadata {
  const fullTitle = `${title} | ${business.name}`;
  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "es_CO",
      siteName: business.name,
      url: path,
      title: path === "/" ? title : fullTitle,
      description,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: path === "/" ? title : fullTitle,
      description,
      images: [shareImage],
    },
  };
}

export const absoluteUrl = (path: string) => `${SITE_URL}${path === "/" ? "/" : path}`;

export function breadcrumbJsonLd(path: SitePath) {
  const page = pages.find((item) => item.path === path);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
      ...(page && path !== "/" ? [{ "@type": "ListItem", position: 2, name: page.label, item: absoluteUrl(path) }] : []),
    ],
  };
}

export function faqJsonLd(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** Reference to the business node declared once in the root layout. */
export const businessRef = { "@id": `${SITE_URL}/#business` };

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { OfflineNotice } from "@/components/ui/offline-notice";
import { ServiceWorkerRegister } from "@/components/ui/service-worker-register";
import { SITE_URL, business } from "@/lib/site";
import "./globals.css";

// Self-hosted fonts: no request to Google Fonts at build time or in the browser.
const cormorant = localFont({
  variable: "--font-cormorant",
  display: "swap",
  src: [
    { path: "../assets/fonts/cormorant-garamond-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "../assets/fonts/cormorant-garamond-latin-300-italic.woff2", weight: "300", style: "italic" },
    { path: "../assets/fonts/cormorant-garamond-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/cormorant-garamond-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../assets/fonts/cormorant-garamond-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../assets/fonts/cormorant-garamond-latin-500-italic.woff2", weight: "500", style: "italic" },
  ],
});

const manrope = localFont({
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
  src: "../assets/fonts/manrope-latin-wght-normal.woff2",
});

const title = "Anyi Trujillo | Maquilladora profesional en Armenia, Quindío";
const description =
  "Maquillaje y peinado profesional en Armenia, Quindío. Especialista en novias y maquillaje con aerógrafo, quinceañeras, grados y eventos. 9 años de experiencia, en estudio o a domicilio. Agenda por WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: "%s | Anyi Trujillo Beauty Studio" },
  description,
  applicationName: business.name,
  keywords: [
    "maquilladora Armenia",
    "maquillaje de novia Armenia Quindío",
    "maquillaje con aerógrafo Armenia",
    "maquillaje quinceañera Armenia",
    "peinados Armenia Quindío",
    "cursos de maquillaje Armenia",
    "Anyi Trujillo",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "/",
    siteName: business.name,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "@id": `${SITE_URL}/#business`,
  name: business.name,
  description,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image.jpg`,
  telephone: `+${business.whatsapp}`,
  email: business.email,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.street,
    addressLocality: business.address.city,
    addressRegion: business.address.region,
    addressCountry: business.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lng },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "19:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: business.google.rating,
    reviewCount: business.google.reviews,
  },
  sameAs: [business.instagram],
  founder: { "@type": "Person", name: business.artist, jobTitle: business.role },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CO" className={`${cormorant.variable} ${manrope.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-dvh overflow-x-clip">
        {/* Marks JS as available so reveal animations may hide content until it scrolls in. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <OfflineNotice />
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}

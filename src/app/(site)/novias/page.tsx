import { PageTransition } from "@/components/layout/page-transition";
import { BridalQuote } from "@/components/bridal/bridal-quote";
import { PageHero } from "@/components/layout/page-hero";
import { Faq } from "@/components/ui/faq";
import { JsonLd } from "@/components/ui/json-ld";
import { images } from "@/lib/images";
import { breadcrumbJsonLd, businessRef, faqJsonLd, pageMetadata } from "@/lib/seo";
import { bridalPackages, faqsFor, formatCOP } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/novias",
  title: "Maquillaje de novia en Armenia, Quindío",
  description: `Paquetes de novia desde ${formatCOP(800_000)} con prueba en el estudio, maquillaje con aerógrafo y peinado. Cotiza en línea con tus acompañantes y agenda por WhatsApp.`,
});

const faqs = faqsFor("novias");

const bridalService = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Maquillaje y peinado de novia",
  serviceType: "Maquillaje de novia",
  provider: businessRef,
  areaServed: "Armenia, Quindío",
  offers: bridalPackages.map((item) => ({
    "@type": "Offer",
    name: `${item.name} · ${item.subtitle}`,
    price: item.price,
    priceCurrency: "COP",
  })),
};

export default function BridalPage() {
  return (
    <PageTransition>
      <JsonLd data={[breadcrumbJsonLd("/novias"), bridalService, faqJsonLd(faqs)]} />
      <PageHero
        monument="Novias"
        title="Maquillaje de novia en Armenia"
        intro={<p>Tu prueba en el estudio, tu look el gran día y, si quieres, te acompaño durante las fotos.</p>}
        image={images.brideTerrace}
        imageAlt="Novia con recogido romántico y tiara en una terraza con vista al paisaje cafetero"
      />
      <BridalQuote />
      <Faq title="Lo que me preguntan las novias" items={faqs} />
    </PageTransition>
  );
}

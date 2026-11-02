import { BridalPlanner } from "@/components/bridal/bridal-planner";
import { Process } from "@/components/bridal/process";
import { PageHero } from "@/components/layout/page-hero";
import { PageTransition } from "@/components/layout/page-transition";
import { CtaBanner } from "@/components/shared/cta-banner";
import { IncludedGrid } from "@/components/shared/included-grid";
import { ServiceGallery } from "@/components/shared/service-gallery";
import { ButtonLink } from "@/components/ui/button-link";
import { Faq } from "@/components/ui/faq";
import { JsonLd } from "@/components/ui/json-ld";
import { images } from "@/lib/images";
import { breadcrumbJsonLd, businessRef, faqJsonLd, pageMetadata } from "@/lib/seo";
import { bridalPackages, faqsFor, formatCOP, pageWhatsappMessage } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/novias",
  title: "Maquillaje de novia en Armenia, Quindío",
  description: `Paquetes de novia desde ${formatCOP(800_000)} con prueba en el estudio, maquillaje con aerógrafo y peinado. Cotiza en línea con tus acompañantes y agenda por WhatsApp.`,
});

const faqs = faqsFor("novias");

const included = [
  { title: "Prueba en el estudio", text: "Definimos juntas tu maquillaje y peinado antes de la boda." },
  { title: "Maquillaje con aerógrafo", text: "Ligero, natural y resistente al calor y las lágrimas." },
  { title: "Peinado", text: "Recogido, semirecogido u ondas, según tu vestido." },
  { title: "Lista a tiempo", text: "Te entrego completamente lista para la ceremonia." },
];

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
        crumbs={[
          { href: "/servicios", label: "Servicios" },
          { href: "/novias", label: "Novias" },
        ]}
        eyebrow={`Maquillaje de novia en Armenia · desde ${formatCOP(800_000)}`}
        title={
          <>
            Tu boda, <em className="text-nude-deep">como siempre la soñaste</em>
          </>
        }
        intro={<p>Prueba en el estudio, maquillaje con aerógrafo y peinado, y si quieres, te acompaño durante tus fotos.</p>}
        image={images.brideDressWindow}
        imageAlt="Novia con bata de encaje contemplando su vestido antes de la ceremonia"
        actions={
          <>
            <ButtonLink href="#cotizador">Cotizar mi boda</ButtonLink>
            <ButtonLink href="#paquetes" variant="ink" className="bg-white">
              Ver paquetes
            </ButtonLink>
          </>
        }
      />
      <IncludedGrid items={included} title="Todo para tu día" />
      <BridalPlanner />
      <Process />
      <ServiceGallery category="novias" title="Novias que he maquillado" />
      <Faq title="Lo que me preguntan las novias" items={faqs} />
      <CtaBanner message={pageWhatsappMessage["/novias"]} />
    </PageTransition>
  );
}

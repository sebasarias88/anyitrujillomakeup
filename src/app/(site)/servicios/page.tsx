import { LookQuiz } from "@/components/home/look-quiz";
import { PageHero } from "@/components/layout/page-hero";
import { PageTransition } from "@/components/layout/page-transition";
import { AirbrushScene } from "@/components/services/airbrush-scene";
import { Companions } from "@/components/services/companions";
import { HomeVisitMap } from "@/components/services/home-visit-map";
import { CtaBanner } from "@/components/shared/cta-banner";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceCards } from "@/components/shared/service-cards";
import { ButtonLink } from "@/components/ui/button-link";
import { JsonLd } from "@/components/ui/json-ld";
import { images } from "@/lib/images";
import { breadcrumbJsonLd, businessRef, pageMetadata } from "@/lib/seo";
import { pageWhatsappMessage, services } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/servicios",
  title: "Servicios de maquillaje y peinado en Armenia",
  description:
    "Novias, quinceañeras, maquillaje social y cursos en Armenia, Quindío. Aerógrafo, equipo para grupos y servicio a domicilio.",
});

const serviceList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: services.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: { "@type": "Service", name: service.title, description: service.summary, provider: businessRef, areaServed: "Quindío" },
  })),
};

export default function ServicesPage() {
  return (
    <PageTransition>
      <JsonLd data={[breadcrumbJsonLd("/servicios"), serviceList]} />
      <PageHero
        crumbs={[{ href: "/servicios", label: "Servicios" }]}
        eyebrow="Servicios"
        title={
          <>
            Un look perfecto <em className="text-nude-deep">para cada ocasión</em>
          </>
        }
        intro={<p>Novias, quinceañeras, eventos y cursos, en mi estudio o donde te arregles en el Quindío.</p>}
        image={images.studioVanity}
        imageAlt="Tocador del estudio con espejo de luces, brochas y paletas profesionales"
        actions={
          <>
            <ButtonLink href="#servicios">Ver servicios</ButtonLink>
            <ButtonLink href="#domicilio" variant="ink" className="bg-white">
              Zonas a domicilio
            </ButtonLink>
          </>
        }
      />
      <section id="servicios" aria-labelledby="services-title" className="scroll-mt-28 bg-marble py-24 md:py-28">
        <div className="container-page">
          <SectionHeading
            id="services-title"
            align="center"
            eyebrow="Elige tu servicio"
            title={
              <>
                Tú eliges el momento, <em className="text-nude-deep">yo creo tu look</em>
              </>
            }
          />
          <div className="mt-12">
            <ServiceCards />
          </div>
        </div>
      </section>
      <Companions />
      <AirbrushScene />
      <HomeVisitMap />
      <div className="bg-white pt-24 md:pt-28">
        <LookQuiz />
      </div>
      <CtaBanner message={pageWhatsappMessage["/servicios"]} />
    </PageTransition>
  );
}

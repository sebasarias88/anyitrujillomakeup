import { PageHero } from "@/components/layout/page-hero";
import { PageTransition } from "@/components/layout/page-transition";
import { AirbrushScene } from "@/components/services/airbrush-scene";
import { Companions } from "@/components/services/companions";
import { HomeVisitMap } from "@/components/services/home-visit-map";
import { ServiceMenu } from "@/components/services/service-menu";
import { ButtonLink } from "@/components/ui/button-link";
import { JsonLd } from "@/components/ui/json-ld";
import { images } from "@/lib/images";
import { breadcrumbJsonLd, businessRef, pageMetadata } from "@/lib/seo";
import { occasionServices } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/servicios",
  title: "Maquillaje social, XV años y a domicilio en Armenia",
  description:
    "Maquillaje y peinado para quinceañeras, grados, eventos y sesiones de fotos en Armenia, Quindío. Aerógrafo, equipo para grupos y servicio a domicilio.",
});

const serviceList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: occasionServices.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: { "@type": "Service", name: service.title, description: service.text, provider: businessRef, areaServed: "Quindío" },
  })),
};

export default function ServicesPage() {
  return (
    <PageTransition>
      <JsonLd data={[breadcrumbJsonLd("/servicios"), serviceList]} />
      <PageHero
        monument="Servicios"
        transitionName="cover-servicios"
        title="Maquillaje y peinado para cada evento"
        intro={<p>Quinceañeras, grados, fiestas y sesiones de fotos, en mi estudio o donde te arregles.</p>}
        image={images.studioVanity}
        imageAlt="Tocador del estudio con espejo de luces, brochas y paletas profesionales"
        actions={
          <>
            <ButtonLink href="#domicilio">Ver zonas a domicilio</ButtonLink>
            <ButtonLink href="#aerografo" variant="text">
              ¿Qué es el aerógrafo?
            </ButtonLink>
          </>
        }
      />
      <ServiceMenu />
      <Companions />
      <AirbrushScene />
      <HomeVisitMap />
    </PageTransition>
  );
}

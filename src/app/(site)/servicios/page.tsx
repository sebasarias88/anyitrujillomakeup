import { PageTransition } from "@/components/layout/page-transition";
import { PageHero } from "@/components/layout/page-hero";
import { Airbrush } from "@/components/services/airbrush";
import { Services } from "@/components/services/services";
import { JsonLd } from "@/components/ui/json-ld";
import { images } from "@/lib/images";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/servicios",
  title: "Maquillaje social, XV años y a domicilio en Armenia",
  description:
    "Maquillaje y peinado para quinceañeras, grados, eventos y sesiones de fotos en Armenia, Quindío. Aerógrafo, equipo para grupos y servicio a domicilio.",
});

export default function ServicesPage() {
  return (
    <PageTransition>
      <JsonLd data={breadcrumbJsonLd("/servicios")} />
      <PageHero
        monument="Servicios"
        title="Maquillaje y peinado para cada evento"
        intro={<p>Quinceañeras, grados, fiestas y sesiones de fotos, en mi estudio o donde te arregles.</p>}
        image={images.studioVanity}
        imageAlt="Tocador del estudio con espejo de luces, brochas y paletas profesionales"
      />
      <Services />
      <Airbrush />
    </PageTransition>
  );
}

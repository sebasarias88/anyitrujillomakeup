import { PageHero } from "@/components/layout/page-hero";
import { PageTransition } from "@/components/layout/page-transition";
import { BeforeAfter } from "@/components/portfolio/before-after";
import { Gallery } from "@/components/portfolio/gallery";
import { JsonLd } from "@/components/ui/json-ld";
import { images } from "@/lib/images";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/portafolio",
  title: "Portafolio de maquillaje en Armenia, Quindío",
  description:
    "Fotos reales de novias, quinceañeras y maquillaje glam hechos por Anyi Trujillo en Armenia, Quindío. Conoce su estudio y su trabajo.",
});

export default function PortfolioPage() {
  return (
    <PageTransition>
      <JsonLd data={breadcrumbJsonLd("/portafolio")} />
      <PageHero
        eyebrow="Mi trabajo"
        transitionName="cover-portafolio"
        title={<>Portafolio de novias, XV y <em className="text-nude-deep">glam</em></>}
        intro={<p>Mi trabajo con clientas reales, sin filtros, y el estudio donde las recibo.</p>}
        image={images.glamProfile}
        imageAlt="Perfil de maquillaje con sombras rosadas, delineado suave y piel glow"
      />
      <Gallery />
      <BeforeAfter />
    </PageTransition>
  );
}

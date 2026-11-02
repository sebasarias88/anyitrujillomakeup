import { PageHero } from "@/components/layout/page-hero";
import { PageTransition } from "@/components/layout/page-transition";
import { BeforeAfter } from "@/components/portfolio/before-after";
import { Gallery } from "@/components/portfolio/gallery";
import { CtaBanner } from "@/components/shared/cta-banner";
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
        crumbs={[{ href: "/portafolio", label: "Portafolio" }]}
        eyebrow="Mi trabajo"
        transitionName="cover-portafolio"
        title={<>Looks que <em className="text-nude-deep">hablan solos</em></>}
        intro={<p>Mi trabajo con clientas reales, sin filtros, y el estudio donde las recibo.</p>}
        image={images.brideTerrace}
        imageAlt="Novia con recogido romántico en una terraza con vista al paisaje cafetero"
      />
      <Gallery />
      <BeforeAfter />
      <div className="bg-white pt-24 md:pt-28">
        <CtaBanner />
      </div>
    </PageTransition>
  );
}

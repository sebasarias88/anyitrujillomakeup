import type { ReactNode } from "react";
import { PageHero } from "@/components/layout/page-hero";
import { PageTransition } from "@/components/layout/page-transition";
import { ButtonLink } from "@/components/ui/button-link";
import { JsonLd } from "@/components/ui/json-ld";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { pageCovers, type GalleryCategory } from "@/lib/images";
import { breadcrumbJsonLd, businessRef } from "@/lib/seo";
import { formatCOP, pageWhatsappMessage, serviceFor, type ServicePath } from "@/lib/site";
import { CtaBanner } from "./cta-banner";
import { IncludedGrid } from "./included-grid";
import { PriceCards } from "./price-cards";
import { ServiceGallery } from "./service-gallery";

/** Detail page shared by Quinceañeras, Social and Cursos: hero, included, prices, photos, closing. */
export function ServicePage({ path, category, galleryTitle, children }: { path: ServicePath; category: GalleryCategory; galleryTitle: string; children?: ReactNode }) {
  const service = serviceFor(path);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.intro,
    provider: businessRef,
    areaServed: "Quindío",
  };
  return (
    <PageTransition>
      <JsonLd data={[breadcrumbJsonLd(path), jsonLd]} />
      <PageHero
        crumbs={[
          { href: "/servicios", label: "Servicios" },
          { href: path, label: service.title },
        ]}
        eyebrow={`${service.title} · desde ${formatCOP(service.fromPrice)}`}
        title={
          <>
            {service.heroTitle} <em className="text-nude-deep">{service.heroAccent}</em>
          </>
        }
        intro={<p>{service.intro}</p>}
        image={pageCovers[path]}
        imageAlt={service.summary}
        actions={
          <>
            <WhatsAppButton message={pageWhatsappMessage[path]}>Reservar por WhatsApp</WhatsAppButton>
            <ButtonLink href="#precios" variant="ink" className="bg-white">
              Ver precios
            </ButtonLink>
          </>
        }
      />
      <IncludedGrid items={service.includes} />
      <div id="precios" className="scroll-mt-28">
        <PriceCards service={service.title.toLowerCase()} options={service.options} sample={service.samplePrice} />
      </div>
      {children}
      <ServiceGallery category={category} title={galleryTitle} />
      <CtaBanner message={pageWhatsappMessage[path]} />
    </PageTransition>
  );
}

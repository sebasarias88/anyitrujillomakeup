import { Booking } from "@/components/contact/booking";
import { About } from "@/components/home/about";
import { Hero } from "@/components/home/hero";
import { PortfolioCarousel } from "@/components/home/portfolio-carousel";
import { TestimonialsCarousel } from "@/components/home/testimonials-carousel";
import { TrustBar } from "@/components/home/trust-bar";
import { PageTransition } from "@/components/layout/page-transition";
import { CtaBanner } from "@/components/shared/cta-banner";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceCards } from "@/components/shared/service-cards";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/",
  title: "Anyi Trujillo | Maquilladora profesional en Armenia, Quindío",
  description:
    "Maquillaje y peinado profesional en Armenia, Quindío. Especialista en novias y maquillaje con aerógrafo, con 9 años de experiencia. En estudio o a domicilio. Agenda en línea por WhatsApp.",
});

export default function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <TrustBar />
      <About />
      <section aria-labelledby="services-title" className="bg-marble py-24 md:py-28">
        <div className="container-page">
          <SectionHeading
            id="services-title"
            align="center"
            eyebrow="Servicios"
            title={
              <>
                Tú eliges el momento, <em className="text-nude-deep">yo creo tu look</em>
              </>
            }
            intro="Cada servicio incluye asesoría personalizada y productos profesionales de larga duración."
          />
          <div className="mt-12">
            <ServiceCards />
          </div>
        </div>
      </section>
      <Booking />
      <PortfolioCarousel />
      <TestimonialsCarousel />
      <CtaBanner />
    </PageTransition>
  );
}

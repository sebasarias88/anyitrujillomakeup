import { Booking } from "@/components/contact/booking";
import { PhoneDisplay } from "@/components/contact/phone-display";
import { PageHero } from "@/components/layout/page-hero";
import { PageTransition } from "@/components/layout/page-transition";
import { ButtonLink } from "@/components/ui/button-link";
import { Faq } from "@/components/ui/faq";
import { JsonLd } from "@/components/ui/json-ld";
import { images } from "@/lib/images";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { business, faqsFor } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/contacto",
  title: "Agenda tu cita de maquillaje en Armenia",
  description: `Agenda tu maquillaje en Armenia, Quindío: elige servicio, fecha y hora y envía tu solicitud por WhatsApp al ${business.phoneDisplay}. Estudio en la Calle 23 #37-25.`,
});

const faqs = faqsFor("contacto");

export default function ContactPage() {
  return (
    <PageTransition>
      <JsonLd data={[breadcrumbJsonLd("/contacto"), faqJsonLd(faqs)]} />
      <PageHero
        monument="Agenda"
        title="Agenda tu cita"
        intro={<p>Elige el servicio, el día y la hora. Te llevo a WhatsApp con tu solicitud lista.</p>}
        image={images.studioSign}
        imageAlt="Fachada de Anyi Trujillo Beauty Studio con su letrero dorado"
        actions={<ButtonLink href="#agenda">Reservar ahora</ButtonLink>}
      />
      <Booking />
      <PhoneDisplay />
      <Faq title="Antes de reservar" items={faqs} />
    </PageTransition>
  );
}

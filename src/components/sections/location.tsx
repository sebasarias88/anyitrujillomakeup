import { ButtonLink } from "@/components/ui/button-link";
import { ClockIcon, PinIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { business, whatsappUrl } from "@/lib/site";

const mapEmbed = `https://www.google.com/maps?q=${business.geo.lat},${business.geo.lng}&z=17&output=embed`;

export function Location() {
  return (
    <section id="ubicacion" aria-labelledby="location-title" className="container-page py-24 md:py-36">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            id="location-title"
            eyebrow="Visítame"
            title={
              <>
                Un espacio pensado para <em className="text-gradient-gold">consentirte</em>
              </>
            }
            description="Te espero en el estudio, o llevo todo lo necesario a tu casa, hotel o lugar del evento en Armenia y el Quindío."
          />

          <Reveal delay={100} className="mt-10 space-y-6">
            <div className="flex gap-4">
              <PinIcon className="mt-1 size-5 shrink-0 text-nude" />
              <address className="text-sand not-italic">
                <span className="block font-semibold text-ivory">{business.address.street}</span>
                {business.address.city}, {business.address.region}
              </address>
            </div>
            <div className="flex gap-4">
              <ClockIcon className="mt-1 size-5 shrink-0 text-nude" />
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-sand">
                {business.hours.map((item) => (
                  <div key={item.days} className="contents">
                    <dt className="font-semibold text-ivory">{item.days}</dt>
                    <dd>{item.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={180} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={business.mapsUrl} external>
              <PinIcon className="size-4" />
              Cómo llegar
            </ButtonLink>
            <ButtonLink href={whatsappUrl("Hola Anyi ✨ Quiero cotizar un servicio a domicilio.")} external variant="outline">
              <WhatsAppIcon className="size-4" />
              Cotizar domicilio
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={120} className="relative min-h-[24rem] overflow-hidden rounded-[2rem] border border-line bg-ink-2">
          <iframe
            src={mapEmbed}
            title="Ubicación de Anyi Trujillo Beauty Studio en Google Maps"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 size-full grayscale-[0.6] invert-[0.9] hue-rotate-180 contrast-[0.9]"
          />
        </Reveal>
      </div>
    </section>
  );
}

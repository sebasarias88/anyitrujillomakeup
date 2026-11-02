import Image, { type StaticImageData } from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { images } from "@/lib/images";
import { occasionServices, type OccasionServiceId } from "@/lib/site";

const photos: Record<OccasionServiceId, { src: StaticImageData; alt: string }> = {
  quince: { src: images.quinceEmerald, alt: "Quinceañera con vestido esmeralda, ondas definidas y maquillaje luminoso" },
  social: { src: images.glamFront, alt: "Maquillaje social en tonos rosa con piel luminosa" },
  photos: { src: images.glamProfile, alt: "Perfil de maquillaje con sombras rosadas y piel glow para fotografía" },
  hair: { src: images.quinceRubyPortrait, alt: "Ondas largas definidas con corona roja" },
};

/**
 * The studio's menu of services: large name and description on one side,
 * a real photograph on the other, alternating. Prices are not confirmed yet.
 */
export function ServiceMenu() {
  return (
    <section aria-labelledby="menu-title" className="container-page py-28 md:py-40">
      <Reveal>
        <h2 id="menu-title" className="font-display text-[2.2rem] leading-[1.02] tracking-[-0.01em] md:text-[2.2rem] lg:text-[2.75rem]">
          Para cada ocasión
        </h2>
      </Reveal>
      <ul className="mt-14 space-y-20 md:mt-20 md:space-y-28">
        {occasionServices.map((service, index) => {
          const flip = index % 2 === 1;
          return (
            <li key={service.id} id={service.id} className="grid scroll-mt-28 items-center gap-8 md:grid-cols-12 md:gap-6">
              <Reveal variant="photo" className={`relative aspect-[4/5] md:col-span-5 ${flip ? "md:col-start-8 md:row-start-1" : ""}`}>
                <Image
                  src={photos[service.id].src}
                  alt={photos[service.id].alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="rounded-3xl object-cover"
                />
              </Reveal>
              <Reveal className={`md:col-span-5 ${flip ? "md:col-start-2 md:row-start-1" : "md:col-start-7"}`}>
                <h3 className="font-display text-[2.4rem] leading-[1.05] md:text-[3rem]">{service.title}</h3>
                <p className="mt-5 max-w-[40ch] text-[1.05rem] leading-relaxed">{service.text}</p>
                <p className="mt-4 text-[0.95rem] text-ink-soft">Precio de ejemplo · por confirmar</p>
                <WhatsAppButton message={service.whatsapp} variant="text" className="mt-4">
                  Preguntar por WhatsApp
                </WhatsAppButton>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

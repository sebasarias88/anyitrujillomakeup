import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { images } from "@/lib/images";
import { business } from "@/lib/site";

const photos = [
  { src: images.studioVanity, alt: "Tocador del estudio con espejo de luces, brochas y paletas profesionales", caption: "El tocador" },
  { src: images.brideMirror, alt: "Clienta mirándose al espejo del estudio con su peinado terminado", caption: "Tu prueba de look" },
  { src: images.anyiAgenda, alt: "Anyi Trujillo sosteniendo la agenda de citas de su Beauty Studio", caption: "Te recibo yo" },
] as const;

/** What the visitor will find when she arrives: the studio, in three real photographs. */
export function StudioStrip() {
  return (
    <section aria-labelledby="studio-strip-title" className="bg-marble py-24 md:py-28">
      <div className="container-page">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">El estudio</p>
            <h2 id="studio-strip-title" className="mt-4 font-display text-[2.2rem] leading-[1.1] md:text-[3rem]">
              Te espero en <em className="text-nude-deep">el estudio</em>
            </h2>
            <p className="mt-4 max-w-[46ch] text-[1.05rem] leading-relaxed font-light text-ink-soft">
              {business.address.street}, {business.address.city}. Un espacio tranquilo, con buena luz y todo listo para ti.
            </p>
          </div>
          <a
            href={business.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pressable inline-flex min-h-12 shrink-0 items-center self-start rounded-full border border-ink bg-white px-7 text-[0.82rem] font-medium tracking-[0.1em] uppercase hover:bg-ink hover:text-paper md:self-auto"
          >
            Ver en Google Maps
          </a>
        </Reveal>
        <ul className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 sm:mx-0 sm:mt-12 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0">
          {photos.map((photo, index) => (
            <Reveal as="li" key={photo.alt} variant="photo" delay={index * 80} className="shrink-0 basis-[72%] snap-start sm:basis-auto">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] shadow-soft">
                <Image src={photo.src} alt={photo.alt} fill placeholder="blur" sizes="(min-width: 640px) 30vw, 100vw" className="object-cover" />
              </div>
              <p className="mt-3 font-display text-[1.2rem]">{photo.caption}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

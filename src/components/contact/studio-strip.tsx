import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { images } from "@/lib/images";

const photos = [
  { src: images.studioVanity, alt: "Tocador del estudio con espejo de luces, brochas y paletas profesionales", className: "md:col-span-5" },
  { src: images.brideMirror, alt: "Clienta mirándose al espejo del estudio con su peinado terminado", className: "md:col-span-4 md:mt-24" },
  { src: images.anyiAgenda, alt: "Anyi Trujillo sosteniendo la agenda de citas de su Beauty Studio", className: "md:col-span-3" },
] as const;

/** What the visitor will find when she arrives: the studio, in three real photographs. */
export function StudioStrip() {
  return (
    <section aria-labelledby="studio-strip-title" className="container-page py-28 md:py-40">
      <Reveal>
        <h2 id="studio-strip-title" className="font-display text-[2.2rem] leading-[1.02] tracking-[-0.01em] md:text-[2.2rem] lg:text-[2.75rem]">
          Te espero en el estudio
        </h2>
      </Reveal>
      <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-6">
        {photos.map((photo, index) => (
          <Reveal key={photo.alt} variant="photo" delay={index * 80} className={`relative aspect-[3/4] ${index === 0 ? "max-md:col-span-2" : ""} ${photo.className}`}>
            <Image src={photo.src} alt={photo.alt} fill placeholder="blur" sizes="(min-width: 768px) 40vw, 50vw" className="object-cover" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

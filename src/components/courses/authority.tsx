import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { images } from "@/lib/images";
import { business } from "@/lib/site";

/** Who teaches: the two certifications by name, set large beside a real photograph. */
export function Authority() {
  return (
    <section id="cursos" aria-labelledby="authority-title" className="container-page scroll-mt-24 border-t border-line py-28 md:py-36">
      <div className="grid gap-12 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-6">
          <Reveal>
            <h2 id="authority-title" className="font-display text-[2.2rem] leading-[1.02] tracking-[-0.01em] md:text-[2.2rem] lg:text-[2.75rem]">
              Aprende con una maquilladora certificada
            </h2>
          </Reveal>
          <ul className="mt-10 space-y-6">
            {business.certifications.map((certification, index) => {
              const [name, place] = certification.split(" · ");
              return (
                <Reveal as="li" key={certification} delay={80 + index * 80}>
                  <span className="block font-display text-[2.4rem] leading-none tracking-[-0.02em] md:text-[2.6rem] lg:text-[3.6rem]">{name}</span>
                  <span className="mt-2 block text-[1.05rem]">{place}</span>
                </Reveal>
              );
            })}
          </ul>
          <Reveal as="p" delay={240} className="mt-10 max-w-[44ch] text-[1.05rem] leading-relaxed">
            Te enseño las técnicas que uso con mis novias, después de {business.yearsOfExperience} años de trabajo.
          </Reveal>
        </div>
        <Reveal variant="photo" className="relative aspect-[2/3] md:col-span-4 md:col-start-9">
          <Image
            src={images.anyiAgenda}
            alt="Anyi Trujillo sosteniendo la agenda de citas de su Beauty Studio"
            fill
            placeholder="blur"
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}

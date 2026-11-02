import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { images } from "@/lib/images";
import { business } from "@/lib/site";

// Only confirmed facts (site.ts, CLAUDE.md, PRODUCT.md), in Anyi's own voice.
const chapters = [
  {
    lead: `${business.yearsOfExperience} años`,
    text: "dedicada al maquillaje y al peinado profesional. Me especializo en novias y en maquillaje con aerógrafo.",
  },
  {
    lead: "Me certifiqué",
    text: "con el Instituto Cristina Cuéllar en México y con Tempto en Nueva York.",
  },
  {
    lead: "Con aerógrafo",
    text: "el producto se aplica como una bruma finísima: ligero, uniforme y hecho para durar todo el evento y verse impecable en cámara.",
  },
  {
    lead: "Mi equipo",
    text: "lo formé yo, para atender grupos con puntualidad y la misma calidad: damas, mamás y familias de quinceañeras.",
  },
  {
    lead: "También enseño:",
    text: "doy cursos presenciales y personalizados en mi estudio.",
  },
] as const;

/**
 * Her story beside a pinned photograph (desktop): the image holds its place
 * while the chapters scroll past. On phones it is a plain stack.
 */
export function Story() {
  return (
    <section aria-labelledby="story-title" className="container-page py-28 md:py-40">
      <div className="grid gap-12 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <Reveal variant="photo" className="relative aspect-[3/4]">
              <Image
                src={images.workshop}
                alt="Anyi Trujillo ajustando el tocado de una novia en el Workshop Internacional de Novias de Cristina Cuéllar"
                fill
                placeholder="blur"
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover object-[60%_50%]"
              />
            </Reveal>
            <p className="mt-3 text-[0.95rem]">Workshop Internacional de Novias · Cristina Cuéllar</p>
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <Reveal>
            <h2 id="story-title" className="font-display text-[2.2rem] leading-[1.02] tracking-[-0.01em] md:text-[2.2rem] lg:text-[2.75rem]">
              Mi historia, en corto
            </h2>
          </Reveal>
          <ul className="mt-10 space-y-14 md:mt-14 md:space-y-[22vh] md:pb-[12vh]">
            {chapters.map((chapter, index) => (
              <Reveal as="li" key={chapter.lead} delay={index === 0 ? 80 : 0}>
                <p className="max-w-[30ch] font-display text-[1.4rem] leading-[1.2] md:text-[1.75rem] lg:text-[2.1rem]">
                  <strong className="font-normal underline decoration-gold decoration-2 underline-offset-[6px]">{chapter.lead}</strong>{" "}
                  {chapter.text}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

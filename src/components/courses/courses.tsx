import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { CheckIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { images } from "@/lib/images";
import { whatsappUrl } from "@/lib/site";

const formats = [
  {
    title: "Cursos presenciales",
    text: "Clases prácticas en el estudio, con modelo y acompañamiento paso a paso.",
  },
  {
    title: "Cursos personalizados",
    text: "Uno a uno, a tu ritmo y enfocados en lo que tú quieres dominar: automaquillaje o nivel profesional.",
  },
];

const topics = [
  "Preparación y cuidado de la piel",
  "Técnicas de ojos, delineado y pestañas",
  "Maquillaje social y de novia",
  "Ondas y peinados",
  "Elección de productos y kit profesional",
  "Cómo empezar a trabajar como maquilladora",
];

export function Courses() {
  return (
    <section id="cursos" aria-labelledby="courses-title" className="container-page py-24 md:py-36">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading
            id="courses-title"
            eyebrow="Academia"
            title={
              <>
                Convierte tu pasión en <em className="text-gradient-gold">tu profesión</em>
              </>
            }
            description="¿Amas el maquillaje y sueñas con dominar cada brocha? Aprende con las mismas técnicas que uso con mis novias."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {formats.map((format, index) => (
              <Reveal key={format.title} delay={index * 100} className="rounded-3xl border border-line bg-ink-2 p-6">
                <h3 className="font-display text-2xl text-ivory">{format.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-sand">{format.text}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={150}>
            <h3 className="mt-10 text-xs font-semibold tracking-[0.2em] text-nude uppercase">Lo que aprenderás</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {topics.map((topic) => (
                <li key={topic} className="flex gap-2.5 text-sand">
                  <CheckIcon className="mt-1 size-4 shrink-0 text-nude" />
                  {topic}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200} className="mt-10">
            <ButtonLink href={whatsappUrl("Hola Anyi ✨ Quiero información sobre tus cursos de maquillaje: fechas, valores y modalidades.")}>
              <WhatsAppIcon className="size-4" />
              Quiero información del curso
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={100} className="relative min-h-[28rem] overflow-hidden rounded-[2.5rem] border border-line">
          <Image
            src={images.studioVanity}
            alt="Tocador profesional del estudio con espejo de luces, brochas y paletas"
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
          <blockquote className="absolute inset-x-0 bottom-0 p-8 md:p-10">
            <p className="font-display text-3xl leading-snug text-ivory italic md:text-4xl">
              “A todas las que sueñan con dedicarse al maquillaje: créanlo, lúchenlo y vivan de su pasión.”
            </p>
            <footer className="mt-4 text-sm text-nude">— Anyi Trujillo</footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}

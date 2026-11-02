import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { images } from "@/lib/images";

const services = [
  {
    href: "/servicios#quince",
    title: "Quinceañeras",
    detail: "Precio por confirmar",
    text: "Maquillaje y peinado para la protagonista y su familia.",
    image: images.quinceRuby,
    alt: "Quinceañera con bata roja junto a su vestido de gala",
  },
  {
    href: "/servicios#social",
    title: "Social y grados",
    detail: "Precio por confirmar",
    text: "Fiestas, grados y sesiones de fotos, en el estudio o a domicilio.",
    image: images.glamProfile,
    alt: "Maquillaje social con sombras rosadas y piel glow",
  },
  {
    href: "/servicios#cursos",
    title: "Cursos",
    detail: "Presencial y personalizado",
    text: "Aprende automaquillaje o maquillaje profesional conmigo.",
    image: images.workshop,
    alt: "Anyi Trujillo peinando a una novia en un taller de maquillaje",
  },
];

export function MoreServices() {
  return (
    <section aria-labelledby="more-services-title" className="border-t border-line py-24 md:py-32">
      <div className="container-page max-w-[78rem]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow">Más servicios</p>
            <h2 id="more-services-title" className="mt-3 font-display text-[2.2rem] leading-[1.1] md:text-[3.1rem]">
              Para cada momento <em className="text-nude-deep">importante</em>
            </h2>
          </Reveal>
          <ButtonLink href="/servicios" variant="ink">
            Ver todos los servicios
          </ButtonLink>
        </div>
        <ul className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
          {services.map((service, index) => (
            <Reveal as="li" key={service.title} delay={index * 80} className="w-[78%] shrink-0 snap-start md:w-auto">
              <Link href={service.href} className="group block">
                <span className="relative block aspect-[4/5] overflow-hidden rounded-3xl">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 768px) 30vw, 78vw"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04]"
                  />
                </span>
                <span className="mt-5 flex items-baseline justify-between gap-3">
                  <span className="font-display text-[1.6rem] leading-tight">{service.title}</span>
                  <span className="text-[0.85rem] text-ink-soft">{service.detail}</span>
                </span>
                <span className="mt-1 block text-[0.95rem] text-ink-soft">{service.text}</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

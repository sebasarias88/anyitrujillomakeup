import Image from "next/image";
import Link from "next/link";
import { ViewTransition, type CSSProperties } from "react";
import { Reveal } from "@/components/ui/reveal";
import { pageCovers } from "@/lib/images";
import { formatCOP } from "@/lib/site";

const doors = [
  { path: "/novias", title: "Novias", detail: `Desde ${formatCOP(800_000)}`, grow: 5, phone: "max-md:w-[64%]", alt: "Novia con bata de encaje contemplando su vestido" },
  { path: "/servicios", title: "Servicios", detail: "Social, XV y domicilio", grow: 2, phone: "max-md:w-[36%]", alt: "Tocador del estudio con espejo de luces" },
  { path: "/portafolio", title: "Portafolio", detail: "Novias, XV y glam", grow: 3, phone: "max-md:w-[36%]", alt: "Perfil de maquillaje con sombras rosadas y piel luminosa" },
  { path: "/cursos", title: "Cursos", detail: "Presenciales y personalizados", grow: 2, phone: "max-md:w-[64%]", alt: "Anyi Trujillo peinando a una novia en un taller" },
] as const;

/**
 * Four photographs standing edge to edge at unequal widths: the way into
 * each page. Each photo is named for a view transition, so it morphs into
 * the hero of the page it opens.
 */
export function Doors() {
  return (
    <section aria-labelledby="doors-title" className="pb-28 md:pb-44">
      <Reveal className="container-page md:grid md:grid-cols-12">
        <h2 id="doors-title" className="font-display text-[2.2rem] leading-[1.02] tracking-[-0.01em] md:col-span-6 md:col-start-3 md:text-[2.2rem] lg:text-[2.75rem]">
          Todo lo que hago
        </h2>
      </Reveal>
      <Reveal variant="photo" className="mt-10 md:mt-16">
        <ul className="flex h-[84svh] flex-wrap md:h-[68svh] md:flex-nowrap">
          {doors.map((door) => (
            <li
              key={door.path}
              style={{ "--grow": door.grow } as CSSProperties}
              className={`door relative min-w-0 max-md:h-1/2 md:basis-0 ${door.phone}`}
            >
              <Link href={door.path} className="group absolute inset-0 block overflow-hidden">
                <ViewTransition name={`cover-${door.path.slice(1)}`} share="morph" default="none">
                  <Image
                    src={pageCovers[door.path]}
                    alt={door.alt}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 768px) 40vw, 64vw"
                    className="object-cover"
                  />
                </ViewTransition>
                {/* Neutral scrim only behind the title corner, for legibility (the one allowed gradient). taste-skill-ignore */}
                <span aria-hidden className="absolute inset-x-0 top-0 h-44 bg-ink/60" style={{ maskImage: "linear-gradient(to bottom, black, transparent)" }} /> {/* taste-skill-ignore: scrim */}
                <span className="absolute top-5 left-5 right-5 text-paper md:top-6 md:left-6">
                  <span className="block font-display text-[1.75rem] leading-none md:text-[2rem]">{door.title}</span>
                  <span className="mt-1.5 block text-[0.95rem] font-semibold md:max-lg:hidden">{door.detail}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

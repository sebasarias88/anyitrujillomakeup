"use client";

import Image from "next/image";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { gallery, type GalleryCategory } from "@/lib/images";

const filters: { id: GalleryCategory | "todas"; label: string }[] = [
  { id: "todas", label: "Todo" },
  { id: "novias", label: "Novias" },
  { id: "quinceaneras", label: "XV años" },
  { id: "glam", label: "Glam & social" },
];

// Tile shapes for the mosaic, in order (desktop: 12 columns, 120px rows).
const tiles = [
  "md:col-span-4 md:row-span-5",
  "md:col-span-3 md:row-span-3",
  "md:col-span-5 md:row-span-3",
  "md:col-span-5 md:row-span-2",
  "md:col-span-3 md:row-span-2",
];

/** The work comes first: a mosaic of real photographs with quick filters. */
export function WorkMosaic() {
  const [filter, setFilter] = useState<GalleryCategory | "todas">("todas");
  const items = gallery
    .filter((item) => item.category !== "estudio" && (filter === "todas" || item.category === filter))
    .slice(0, tiles.length);

  return (
    <section aria-labelledby="work-title" className="container-page max-w-[82rem] py-24 md:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <p className="eyebrow">Mi trabajo</p>
          <h2 id="work-title" className="mt-3 font-display text-[2.2rem] leading-[1.1] md:text-[3.1rem]">
            Que hablen <em className="text-nude-deep">los resultados</em>
          </h2>
        </Reveal>
        <div role="group" aria-label="Filtrar fotos" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0">
          {filters.map((item) => {
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(item.id)}
                className={`pressable min-h-11 shrink-0 rounded-full border px-5 text-[0.75rem] tracking-[0.12em] uppercase transition-colors ${
                  active ? "border-ink bg-ink text-paper" : "border-marble-deep text-ink hover:border-ink"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <ul className="mt-10 grid auto-rows-[9rem] grid-cols-2 gap-3 md:auto-rows-[7.5rem] md:grid-cols-12 md:gap-4" aria-live="polite">
        {items.map((item, index) => (
          <li
            key={item.id}
            className={`group relative overflow-hidden rounded-2xl ${tiles[index]} ${index === 0 ? "row-span-3" : "row-span-2"}`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 768px) 40vw, 50vw"
              className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04]"
            />
            <span className="absolute bottom-3 left-3 rounded-full bg-paper/90 px-3 py-1 text-[0.72rem] tracking-[0.08em] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {item.caption}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex justify-center">
        <ButtonLink href="/portafolio" variant="ink">
          Ver el portafolio completo
        </ButtonLink>
      </div>
    </section>
  );
}

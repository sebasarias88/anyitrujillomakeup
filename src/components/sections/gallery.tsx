"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { ChevronIcon, CloseIcon, InstagramIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { gallery, galleryCategories, type GalleryCategory } from "@/lib/images";
import { business } from "@/lib/site";

export function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory | "todas">("todas");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const items = filter === "todas" ? gallery : gallery.filter((item) => item.category === filter);
  const current = openIndex === null ? null : items[openIndex];

  const go = useCallback(
    (direction: 1 | -1) =>
      setOpenIndex((index) => (index === null ? index : (index + direction + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (openIndex !== null && !dialog.open) dialog.showModal();
    if (openIndex === null && dialog.open) dialog.close();
  }, [openIndex]);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, go]);

  return (
    <section id="portafolio" aria-labelledby="gallery-title" className="bg-ink-2 py-24 md:py-36">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            id="gallery-title"
            eyebrow="Portafolio"
            title={
              <>
                Resultados reales, <em className="text-gradient-gold">sin filtros</em>
              </>
            }
          />
          <div role="tablist" aria-label="Filtrar portafolio" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
            {galleryCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={filter === category.id}
                onClick={() => setFilter(category.id)}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition ${
                  filter === category.id ? "border-nude bg-nude text-ink" : "border-line text-sand hover:border-nude/50 hover:text-ivory"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-14 columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
          {items.map((item, index) => (
            <li key={item.alt} className="mb-3 break-inside-avoid md:mb-4">
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-label={`Ampliar foto: ${item.alt}`}
                className="group relative block w-full overflow-hidden rounded-2xl border border-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nude"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  placeholder="blur"
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="h-auto w-full transition duration-700 group-hover:scale-105"
                />
                <span aria-hidden className="absolute inset-0 bg-ink/0 transition group-hover:bg-ink/20" />
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <ButtonLink href={business.instagram} external variant="outline">
            <InstagramIcon className="size-4" />
            Ver más en {business.instagramHandle}
          </ButtonLink>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setOpenIndex(null)}
        onClick={(event) => event.target === dialogRef.current && setOpenIndex(null)}
        aria-label="Foto ampliada"
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-ink/95 backdrop:backdrop-blur-sm"
      >
        {current ? (
          <div className="relative flex h-dvh w-screen items-center justify-center p-4 md:p-16">
            <Image
              src={current.src}
              alt={current.alt}
              placeholder="blur"
              sizes="100vw"
              className="max-h-full w-auto rounded-2xl object-contain"
            />
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              aria-label="Cerrar"
              className="absolute top-4 right-4 flex size-12 items-center justify-center rounded-full bg-ink/80 text-ivory"
            >
              <CloseIcon className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Foto anterior"
              className="absolute left-3 flex size-12 items-center justify-center rounded-full bg-ink/80 text-ivory md:left-6"
            >
              <ChevronIcon className="size-5 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Foto siguiente"
              className="absolute right-3 flex size-12 items-center justify-center rounded-full bg-ink/80 text-ivory md:right-6"
            >
              <ChevronIcon className="size-5" />
            </button>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}

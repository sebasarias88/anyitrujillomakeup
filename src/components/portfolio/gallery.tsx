"use client";

import Image from "next/image";
import { startTransition, useCallback, useLayoutEffect, useRef, useState, ViewTransition } from "react";
import { ChevronIcon } from "@/components/ui/icons";
import { gallery, galleryCategories, type GalleryCategory } from "@/lib/images";
import { business } from "@/lib/site";

// Uneven placement on the 12-column grid, repeated every six photographs.
const layout = [
  "md:col-span-5 md:col-start-1",
  "md:col-span-4 md:col-start-7 md:mt-28",
  "md:col-span-3 md:col-start-2",
  "md:col-span-6 md:col-start-6 md:mt-16",
  "md:col-span-4 md:col-start-1 md:mt-12",
  "md:col-span-5 md:col-start-7",
];

const SWIPE_DISTANCE = 80;
const SWIPE_VELOCITY = 0.11; // px per ms: a quick flick is enough

/**
 * Portfolio: words as filters, photographs at uneven sizes, and a lightbox
 * the thumbnail morphs into (shared view transition). The lightbox is a
 * modal dialog (focus trap, Escape), with arrow keys and swipe.
 */
export function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory | "todas">("todas");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const swipe = useRef<{ x: number; time: number; id: number } | null>(null);

  const items = filter === "todas" ? gallery : gallery.filter((item) => item.category === filter);
  const current = openIndex === null ? null : items[openIndex];

  const open = (index: number) => startTransition(() => setOpenIndex(index));
  const close = useCallback(() => startTransition(() => setOpenIndex(null)), []);
  const go = useCallback(
    (direction: 1 | -1) =>
      setOpenIndex((index) => (index === null ? index : (index + direction + items.length) % items.length)),
    [items.length],
  );

  // Layout effect: the dialog must be open before the view transition captures the new state.
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (openIndex !== null && !dialog.open) dialog.showModal();
    if (openIndex === null && dialog.open) dialog.close();
  }, [openIndex]);

  return (
    <section aria-labelledby="gallery-title" className="container-page py-28 md:py-40">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 id="gallery-title" className="font-display text-[2.2rem] leading-[1.02] tracking-[-0.01em] md:text-[2.75rem]">
          Mi trabajo
        </h2>
        <p className="text-[0.95rem]">
          {items.length} fotos ·{" "}
          <a href={business.instagram} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
            más en {business.instagramHandle}
          </a>
        </p>
      </div>

      <div role="group" aria-label="Filtrar el portafolio" className="no-scrollbar -mx-4 mt-8 flex gap-6 overflow-x-auto px-4 md:mx-0 md:gap-10 md:px-0">
        {galleryCategories.map((category) => {
          const active = filter === category.id;
          return (
            <button
              key={category.id}
              type="button"
              aria-pressed={active}
              onClick={() => startTransition(() => setFilter(category.id))}
              className={`pressable min-h-11 shrink-0 font-display text-[1.6rem] leading-none whitespace-nowrap md:text-[2.2rem] ${
                active ? "underline decoration-gold decoration-[3px] underline-offset-8" : "text-ink-soft hover:text-ink"
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      <ul className="mt-12 grid grid-cols-2 gap-x-3 gap-y-8 md:mt-16 md:grid-cols-12 md:gap-x-6 md:gap-y-14">
        {items.map((item, index) => (
          <ViewTransition key={item.id} enter="gallery-in" exit="gallery-out" default="none">
            <li className={`${index % 3 === 0 ? "max-md:col-span-2" : ""} ${layout[index % layout.length]}`}>
              <button
                type="button"
                onClick={() => open(index)}
                aria-label={`Ampliar: ${item.alt}`}
                className="pressable group block w-full text-left"
              >
                <ViewTransition name={openIndex === index ? undefined : `photo-${item.id}`} share="morph" default="none">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    placeholder="blur"
                    // Real rendered widths: up to 6 of 12 columns on desktop; full or half width on phones.
                    sizes={index % 3 === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 42vw, 50vw"}
                    className="h-auto w-full"
                  />
                </ViewTransition>
                <span className="mt-2.5 block text-[0.95rem] group-hover:underline group-hover:underline-offset-4">{item.caption}</span>
              </button>
            </li>
          </ViewTransition>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setOpenIndex(null)}
        onClick={(event) => event.target === event.currentTarget && close()}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") go(1);
          if (event.key === "ArrowLeft") go(-1);
        }}
        aria-label={current ? `Foto ampliada: ${current.caption}` : "Foto ampliada"}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-paper p-0 text-ink backdrop:bg-paper"
      >
        {current ? (
          <div className="flex h-full flex-col">
            <div className="container-page flex h-[4.5rem] shrink-0 items-center justify-between">
              <p className="text-[0.95rem]">
                {current.caption} · {(openIndex ?? 0) + 1} de {items.length}
              </p>
              <button type="button" onClick={close} className="pressable min-h-11 px-1 font-semibold underline decoration-gold decoration-2 underline-offset-[6px]">
                Cerrar
              </button>
            </div>
            <div
              className="relative flex min-h-0 flex-1 touch-pan-y items-center justify-center px-4 pb-4 md:px-20"
              onPointerDown={(event) => {
                if (swipe.current) return; // ignore a second finger
                swipe.current = { x: event.clientX, time: performance.now(), id: event.pointerId };
              }}
              onPointerUp={(event) => {
                const start = swipe.current;
                swipe.current = null;
                if (!start || start.id !== event.pointerId) return;
                const distance = event.clientX - start.x;
                const velocity = Math.abs(distance) / Math.max(1, performance.now() - start.time);
                if (Math.abs(distance) > SWIPE_DISTANCE || (Math.abs(distance) > 20 && velocity > SWIPE_VELOCITY)) {
                  go(distance < 0 ? 1 : -1);
                }
              }}
              onPointerCancel={() => (swipe.current = null)}
            >
              <ViewTransition key={current.id} name={`photo-${current.id}`} share="morph" default="none">
                <Image
                  src={current.src}
                  alt={current.alt}
                  placeholder="blur"
                  sizes="100vw"
                  className="h-auto max-h-full w-auto max-w-full object-contain select-none"
                  draggable={false}
                />
              </ViewTransition>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Foto anterior"
                className="pressable absolute left-4 hidden size-12 items-center justify-center bg-paper md:flex"
              >
                <ChevronIcon className="size-5 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Foto siguiente"
                className="pressable absolute right-4 hidden size-12 items-center justify-center bg-paper md:flex"
              >
                <ChevronIcon className="size-5" />
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}

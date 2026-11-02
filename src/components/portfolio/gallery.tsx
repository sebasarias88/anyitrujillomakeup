"use client";

import Image from "next/image";
import { startTransition, useCallback, useLayoutEffect, useRef, useState, ViewTransition } from "react";
import { ChevronIcon } from "@/components/ui/icons";
import { gallery, galleryCategories, type GalleryCategory } from "@/lib/images";
import { business } from "@/lib/site";

const categoryLabel = Object.fromEntries(galleryCategories.map((category) => [category.id, category.label]));

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
    <section aria-labelledby="gallery-title" className="bg-white py-24 md:py-28">
      <div className="container-page">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Galería</p>
        <h2 id="gallery-title" className="mt-4 font-display text-[2.2rem] leading-[1.1] md:text-[3rem]">
          Clientas reales, <em className="text-nude-deep">looks reales</em>
        </h2>
        <p className="mx-auto mt-4 max-w-[46ch] text-[1.05rem] leading-relaxed font-light text-ink-soft">Toca una foto para verla en grande.</p>
      </div>

      <div role="group" aria-label="Filtrar el portafolio" className="no-scrollbar -mx-4 mt-10 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
        {galleryCategories.map((category) => {
          const active = filter === category.id;
          const count = category.id === "todas" ? gallery.length : gallery.filter((item) => item.category === category.id).length;
          return (
            <button
              key={category.id}
              type="button"
              aria-pressed={active}
              onClick={() => startTransition(() => setFilter(category.id))}
              className={`pressable inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-5 text-[0.85rem] tracking-[0.04em] whitespace-nowrap transition-colors ${
                active ? "bg-ink text-paper" : "border border-line-strong bg-white text-ink hover:border-ink"
              }`}
            >
              {category.label}
              <span className={`text-[0.75rem] tabular-nums ${active ? "text-paper/60" : "text-ink-soft"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
        {items.map((item, index) => (
          <ViewTransition key={item.id} enter="gallery-in" exit="gallery-out" default="none">
            <li>
              <button
                type="button"
                onClick={() => open(index)}
                aria-label={`Ampliar: ${item.alt}`}
                className="pressable group relative block aspect-[4/5] w-full overflow-hidden rounded-[1rem] bg-marble text-left shadow-soft sm:rounded-[1.25rem]"
              >
                <ViewTransition name={openIndex === index ? undefined : `photo-${item.id}`} share="morph" default="none">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 24rem, 50vw"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04]"
                  />
                </ViewTransition>
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/55 to-transparent" />
                <span className="absolute inset-x-3 bottom-3 text-paper sm:inset-x-4 sm:bottom-4">
                  <span className="block text-[0.65rem] tracking-[0.16em] uppercase opacity-80 sm:text-[0.7rem]">{categoryLabel[item.category]}</span>
                  <span className="block font-display text-[1.05rem] leading-tight sm:text-[1.3rem]">{item.caption}</span>
                </span>
              </button>
            </li>
          </ViewTransition>
        ))}
      </ul>

      <div className="mt-12 flex flex-col items-center gap-4 rounded-[1.5rem] bg-marble px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left md:px-10">
        <p className="text-[1.05rem]">
          <span className="block font-display text-[1.4rem]">Hay mucho más en Instagram</span>
          <span className="text-ink-soft">Trabajos nuevos cada semana en {business.instagramHandle}</span>
        </p>
        <a
          href={business.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="pressable inline-flex min-h-12 shrink-0 items-center rounded-full bg-ink px-7 text-[0.82rem] font-medium tracking-[0.1em] text-paper uppercase hover:bg-ink-soft"
        >
          Ver Instagram
        </a>
      </div>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setOpenIndex(null)}
        onClick={(event) => event.target === event.currentTarget && close()}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") go(1);
          if (event.key === "ArrowLeft") go(-1);
        }}
        aria-label={current ? `Foto ampliada: ${current.caption}` : "Foto ampliada"}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-blush p-0 text-ink backdrop:bg-paper"
      >
        {current ? (
          <div className="flex h-full flex-col">
            <div className="container-page flex h-[4.5rem] shrink-0 items-center justify-between">
              <p className="text-[0.95rem]">
                {current.caption} · {(openIndex ?? 0) + 1} de {items.length}
              </p>
              <button type="button" onClick={close} className="pressable min-h-11 rounded-full border border-ink px-5 text-[0.82rem] tracking-[0.1em] uppercase">
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
                  className="h-auto max-h-full w-auto max-w-full rounded-[1.25rem] object-contain shadow-lift select-none"
                  draggable={false}
                />
              </ViewTransition>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Foto anterior"
                className="pressable absolute left-4 hidden size-12 items-center justify-center rounded-full bg-white shadow-lift md:flex"
              >
                <ChevronIcon className="size-5 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Foto siguiente"
                className="pressable absolute right-4 hidden size-12 items-center justify-center rounded-full bg-white shadow-lift md:flex"
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

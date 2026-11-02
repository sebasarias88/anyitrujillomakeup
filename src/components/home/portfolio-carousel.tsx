"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowIcon } from "@/components/ui/icons";
import { gallery } from "@/lib/images";

const photos = gallery.filter((item) => item.category !== "estudio" && item.id !== "glam-front");

/**
 * Swipeable photo carousel: native scroll-snap (touch and trackpad work for
 * free), arrow buttons that move one card, and dots that follow the scroll.
 */
export function PortfolioCarousel() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [pages, setPages] = useState(photos.length);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    if (!card) return;
    const step = card.offsetWidth + 20;
    const visible = Math.max(1, Math.round(track.clientWidth / step));
    setPages(Math.max(1, photos.length - visible + 1));
    setIndex(Math.round(track.scrollLeft / step));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    measure();
    track.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      track.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const goTo = (next: number) => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;
    const target = next >= pages ? 0 : Math.max(0, next);
    track.scrollTo({ left: target * (card.offsetWidth + 20), behavior: "smooth" });
  };

  return (
    <section aria-labelledby="portfolio-title" className="bg-marble py-24 md:py-28">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Portafolio</p>
            <h2 id="portfolio-title" className="mt-4 font-display text-[2.2rem] leading-[1.1] md:text-[3rem]">
              Looks que <em className="text-nude-deep">hablan solos</em>
            </h2>
          </div>
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              aria-label="Fotos anteriores"
              className="pressable flex size-13 items-center justify-center rounded-full border border-ink bg-white disabled:opacity-30"
            >
              <ArrowIcon className="size-5 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Fotos siguientes"
              className="pressable flex size-13 items-center justify-center rounded-full bg-ink text-paper"
            >
              <ArrowIcon className="size-5" />
            </button>
          </div>
        </div>
      </div>

      <ul
        ref={trackRef}
        aria-label="Fotos de mi trabajo"
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-[max(1rem,calc((100vw-77rem)/2+2rem))] scroll-px-[max(1rem,calc((100vw-77rem)/2+2rem))]"
      >
        {photos.map((photo) => (
          <li key={photo.id} className="relative aspect-[4/5] w-[78vw] shrink-0 snap-start overflow-hidden rounded-[1.25rem] sm:w-[20rem] lg:w-[21.5rem]">
            <Image src={photo.src} alt={photo.alt} fill placeholder="blur" sizes="(min-width: 640px) 22rem, 78vw" className="object-cover" />
            <span className="absolute bottom-3.5 left-3.5 rounded-full bg-white/95 px-3.5 py-1.5 text-[0.82rem]">{photo.caption}</span>
          </li>
        ))}
      </ul>

      <div className="container-page mt-8 flex flex-wrap items-center justify-between gap-6">
        <div className="flex gap-2">
          {Array.from({ length: pages }, (_, dot) => (
            <button
              key={dot}
              type="button"
              onClick={() => goTo(dot)}
              aria-label={`Ir al grupo de fotos ${dot + 1}`}
              aria-current={dot === index}
              className={`h-2 rounded-full transition-[width,background-color] duration-300 ${dot === index ? "w-8 bg-ink" : "w-2 bg-line-strong"}`}
            />
          ))}
        </div>
        <ButtonLink href="/portafolio" variant="text">
          Ver todo el portafolio →
        </ButtonLink>
      </div>
    </section>
  );
}

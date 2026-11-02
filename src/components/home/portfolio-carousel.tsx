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

  const arrow =
    "pressable absolute top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-ink shadow-lift backdrop-blur-sm hover:bg-white disabled:pointer-events-none disabled:opacity-0";

  return (
    <section aria-labelledby="portfolio-title" className="bg-marble py-24 md:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Portafolio</p>
          <h2 id="portfolio-title" className="mt-4 font-display text-[2.2rem] leading-[1.1] md:text-[3rem]">
            Looks que <em className="text-nude-deep">hablan solos</em>
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-[1.05rem] leading-relaxed font-light text-ink-soft">
            Novias, quinceañeras y eventos reales, sin filtros.
          </p>
        </div>

        <div className="relative mt-12">
          <ul
            ref={trackRef}
            aria-label="Fotos de mi trabajo"
            className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth rounded-[1.25rem]"
          >
            {photos.map((photo) => (
              <li
                key={photo.id}
                className="relative aspect-[4/5] shrink-0 basis-[85%] snap-start overflow-hidden rounded-[1.25rem] sm:basis-[calc((100%-1.25rem)/2)] lg:basis-[calc((100%-2.5rem)/3)]"
              >
                <Image src={photo.src} alt={photo.alt} fill placeholder="blur" sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 85vw" className="object-cover" />
                <span className="absolute bottom-3.5 left-3.5 rounded-full bg-white/95 px-3.5 py-1.5 text-[0.82rem]">{photo.caption}</span>
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => goTo(index - 1)} disabled={index === 0} aria-label="Fotos anteriores" className={`${arrow} left-3 md:left-4`}>
            <ArrowIcon className="size-5 rotate-180" />
          </button>
          <button type="button" onClick={() => goTo(index + 1)} aria-label="Fotos siguientes" className={`${arrow} right-3 md:right-4`}>
            <ArrowIcon className="size-5" />
          </button>
        </div>

        <div className="mt-8 flex flex-col items-center gap-6">
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
          <ButtonLink href="/portafolio" variant="ink">
            Ver todo el portafolio
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

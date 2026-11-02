import Image, { type StaticImageData } from "next/image";
import { ViewTransition, type ReactNode } from "react";
import { monumentStyle } from "@/lib/monument";

type PageHeroProps = {
  /** The page name set as a monument across the full width (decorative). */
  monument: string;
  /** The real, descriptive title of the page: its only h1. */
  title: string;
  intro: ReactNode;
  image: StaticImageData;
  imageAlt: string;
  actions?: ReactNode;
  /** CSS object-position for the photograph crop, e.g. "50% 15%" to keep a face in frame. */
  imagePosition?: string;
  /** Matches a home "door" so its photograph morphs into this hero. */
  transitionName?: string;
  children?: ReactNode;
};

/**
 * Shared opening of every inner page: the h1 and one sentence on the left,
 * a large photograph on the right, and the page name as a monument along the
 * bottom edge. The photograph is the page's LCP image, so it is preloaded.
 */
export function PageHero({ monument, title, intro, image, imageAlt, actions, imagePosition, transitionName, children }: PageHeroProps) {
  return (
    <section aria-labelledby="page-title" className="overflow-hidden pt-24 md:pt-28">
      <div className="container-page grid items-end gap-8 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-5 md:pb-10">
          <h1 id="page-title" className="font-display text-[2.6rem] leading-[0.98] font-normal tracking-[-0.02em] text-balance md:text-[3.4rem]">
            {title}
          </h1>
          <div className="mt-6 max-w-[34ch] text-lg leading-relaxed">{intro}</div>
          {actions ? <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">{actions}</div> : null}
          {children}
        </div>
        <div className="relative aspect-[4/5] md:col-span-6 md:col-start-7 md:aspect-auto md:h-[min(68svh,44rem)]">
          <ViewTransition name={transitionName} share={transitionName ? "morph" : undefined} default="none">
            <Image
              src={image}
              alt={imageAlt}
              fill
              preload
              placeholder="blur"
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              style={imagePosition ? { objectPosition: imagePosition } : undefined}
            />
          </ViewTransition>
        </div>
      </div>
      <p aria-hidden style={monumentStyle(monument)} className="text-monument container-page mt-3 whitespace-nowrap select-none md:mt-4">
        {monument}
      </p>
    </section>
  );
}

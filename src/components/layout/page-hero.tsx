import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

type PageHeroProps = {
  /** The page name set as a monument across the full width (decorative). */
  monument: string;
  /** The real, descriptive title of the page: its only h1. */
  title: string;
  intro: ReactNode;
  image: StaticImageData;
  imageAlt: string;
  actions?: ReactNode;
  children?: ReactNode;
};

/**
 * Shared opening of every inner page: the h1 and one sentence on the left,
 * a large photograph on the right, and the page name as a monument along the
 * bottom edge. The photograph is the page's LCP image, so it is preloaded.
 */
export function PageHero({ monument, title, intro, image, imageAlt, actions, children }: PageHeroProps) {
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
        <div className="relative aspect-[4/5] md:col-span-6 md:col-start-7 md:aspect-[5/6]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            preload
            placeholder="blur"
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
      <p aria-hidden className="text-monument container-page -mt-[0.18em] whitespace-nowrap select-none">
        {monument}
      </p>
    </section>
  );
}

import Image, { type StaticImageData } from "next/image";
import { ViewTransition, type ReactNode } from "react";

type PageHeroProps = {
  /** Small uppercase label above the title. */
  eyebrow: string;
  /** The real, descriptive title of the page: its only h1. */
  title: ReactNode;
  intro: ReactNode;
  image: StaticImageData;
  imageAlt: string;
  actions?: ReactNode;
  /** CSS object-position for the photograph crop, e.g. "50% 15%" to keep a face in frame. */
  imagePosition?: string;
  /** Shared view-transition name so a photograph from the home page morphs into this hero. */
  transitionName?: string;
  children?: ReactNode;
};

/**
 * Shared opening of every inner page, in the same language as the home hero:
 * eyebrow, h1, one sentence and the actions on the left; the photograph in an
 * arched frame (like a vanity mirror) with a soft nude circle behind it on the
 * right. The photograph is the page's LCP image, so it is preloaded.
 */
export function PageHero({ eyebrow, title, intro, image, imageAlt, actions, imagePosition, transitionName, children }: PageHeroProps) {
  return (
    <section aria-labelledby="page-title" className="border-b border-line bg-gradient-to-b from-paper to-blush pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="container-page grid max-w-[78rem] items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden className="h-px w-9 bg-nude" />
            {eyebrow}
          </p>
          <h1 id="page-title" className="mt-5 font-display text-[2.5rem] leading-[1.08] text-balance md:text-[3.5rem] lg:text-[3.9rem]">
            {title}
          </h1>
          <div className="mt-6 max-w-[42ch] text-[1.08rem] leading-relaxed font-light text-ink-soft">{intro}</div>
          {actions ? <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div> : null}
          {children}
        </div>
        <div className="relative mx-auto w-full max-w-[26rem] lg:col-span-5 lg:col-start-8">
          <span aria-hidden className="absolute -top-6 -right-6 size-56 rounded-full bg-nude/25 md:size-64" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-3xl">
            <ViewTransition name={transitionName} share={transitionName ? "morph" : undefined} default="none">
              <Image
                src={image}
                alt={imageAlt}
                fill
                preload
                placeholder="blur"
                sizes="(min-width: 1024px) 26rem, 90vw"
                className="object-cover"
                style={imagePosition ? { objectPosition: imagePosition } : undefined}
              />
            </ViewTransition>
          </div>
        </div>
      </div>
    </section>
  );
}

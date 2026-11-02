import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ViewTransition, type ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  /** The page's only h1. */
  title: ReactNode;
  intro: ReactNode;
  image: StaticImageData;
  imageAlt: string;
  actions?: ReactNode;
  imagePosition?: string;
  transitionName?: string;
  /** Label of the current page for the breadcrumb (omitted on top-level pages). */
  crumbs?: { href: string; label: string }[];
  children?: ReactNode;
};

/**
 * Shared opening of every inner page: breadcrumb, label, title, sentence and
 * actions on the left; a large rounded photograph with a soft shadow on the right.
 */
export function PageHero({ eyebrow, title, intro, image, imageAlt, actions, imagePosition, transitionName, crumbs, children }: PageHeroProps) {
  return (
    <section aria-labelledby="page-title" className="bg-gradient-to-b from-blush to-nude-field">
      <div className="container-page pt-28 pb-16 md:pt-36 md:pb-24">
        {crumbs ? (
          <nav aria-label="Ruta" className="mb-8 text-[0.85rem] text-ink-soft">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/" className="hover:text-ink">
                  Inicio
                </Link>
              </li>
              {crumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex gap-2">
                  <span aria-hidden>/</span>
                  {index === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-ink">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link href={crumb.href} className="hover:text-ink">
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow flex items-center gap-3">
              <span aria-hidden className="h-px w-9 bg-nude-deep" />
              {eyebrow}
            </p>
            <h1 id="page-title" className="mt-5 font-display text-[2.5rem] leading-[1.08] text-balance md:text-[3.4rem]">
              {title}
            </h1>
            <div className="mt-6 max-w-[46ch] text-[1.08rem] leading-relaxed font-light text-ink-soft">{intro}</div>
            {actions ? <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div> : null}
            {children}
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-lift sm:aspect-[5/4] lg:aspect-[4/5] lg:max-h-[34rem]">
            <ViewTransition name={transitionName} share={transitionName ? "morph" : undefined} default="none">
              <Image
                src={image}
                alt={imageAlt}
                fill
                preload
                placeholder="blur"
                sizes="(min-width: 1024px) 36rem, 92vw"
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

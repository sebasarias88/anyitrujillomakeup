"use client";

import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { images } from "@/lib/images";
import { business, formatCOP } from "@/lib/site";

// Each portrait brings its own pale ground, sampled from the photograph.
const portraits = [
  {
    src: images.brideTerrace,
    alt: "Novia con recogido romántico y tiara en una terraza con vista al paisaje cafetero",
    ground: "bg-tint-sky",
    mobile: true,
  },
  {
    src: images.quinceEmerald,
    alt: "Quinceañera con vestido esmeralda, ondas definidas y maquillaje luminoso",
    ground: "bg-tint-sage",
    mobile: true,
  },
  {
    src: images.glamFront,
    alt: "Maquillaje glam suave en tonos rosa con piel luminosa",
    ground: "bg-tint-rose",
    mobile: true,
  },
  {
    src: images.quinceRubyPortrait,
    alt: "Quinceañera con corona roja y ondas largas definidas",
    ground: "bg-tint-wine",
    mobile: false,
  },
] as const;

/**
 * Home hero, "the name as a monument": ANYI TRUJILLO stays pinned while her
 * portraits change beneath it, each one sharpening out of a mist and tinting
 * the ground. Desktop holds 4 portraits over 3 screens; phones hold 3 over
 * 2 screens, so visitors arriving from Instagram reach the content quickly.
 * With reduced motion it is a single, unpinned screen.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const count = window.matchMedia("(min-width: 768px)").matches
      ? portraits.length
      : portraits.filter((item) => item.mobile).length;
    const next = Math.min(count - 1, Math.floor(progress * count));
    setActive((current) => (current === next ? current : next));
  });

  const current = reduceMotion ? 0 : active;

  return (
    <section
      ref={ref}
      aria-labelledby="home-title"
      className={reduceMotion ? "relative" : "relative h-[200svh] md:h-[300svh]"}
    >
      <div
        className={`sticky top-0 flex h-svh flex-col overflow-hidden pt-[4.5rem] transition-colors duration-700 ease-[var(--ease-out)] ${portraits[current].ground}`}
      >
        <p
          aria-hidden
          className="relative z-10 container-page mt-4 font-display leading-[0.8] font-light tracking-[-0.03em] whitespace-nowrap uppercase select-none md:mt-6 md:text-center"
        >
          <span className="block text-[18vw] md:inline md:text-[10.2vw]">Anyi </span>
          <span className="block text-[18vw] md:inline md:text-[10.2vw]">Trujillo</span>
        </p>

        <div className="container-page relative flex min-h-0 flex-1 flex-col md:grid md:grid-cols-12 md:gap-6">
          {/* Portrait stack: tucked under the name, centred on desktop. */}
          <div className="relative -mt-[6vw] min-h-0 flex-1 md:col-span-4 md:col-start-5 md:-mt-[4.2vw]">
            {portraits.map((portrait, index) => (
              <Image
                key={portrait.alt}
                src={portrait.src}
                alt={portrait.alt}
                fill
                // Only the first portrait is the LCP; the others wait their turn.
                preload={index === 0}
                fetchPriority={index === 0 ? undefined : "low"}
                placeholder="blur"
                sizes="(min-width: 768px) 34vw, 100vw"
                aria-hidden={index !== current}
                data-active={index === current}
                className={`hero-portrait object-cover ${portrait.mobile ? "" : "max-md:hidden"}`}
              />
            ))}
          </div>

          <div className="relative z-10 pt-5 pb-6 md:col-span-4 md:col-start-1 md:row-start-1 md:self-end md:pb-10">
            <h1 id="home-title" className="max-w-[16ch] font-display text-[1.9rem] leading-[1.02] tracking-[-0.01em] md:text-[2.4rem]">
              Maquilladora profesional en Armenia, Quindío
            </h1>
            <p className="mt-3 max-w-[30ch] text-[1.05rem] leading-relaxed md:mt-4">
              Novias, quinceañeras y eventos, con aerógrafo. {business.yearsOfExperience} años de experiencia y 5.0 en Google.
            </p>
            <ButtonLink href="/novias#cotizador" className="mt-4 md:hidden">
              Cotizar mi boda
            </ButtonLink>
          </div>

          <div className="relative z-10 hidden md:col-span-3 md:col-start-10 md:row-start-1 md:flex md:flex-col md:items-end md:justify-end md:gap-3 md:pb-10">
            <ButtonLink href="/novias#cotizador">Cotizar mi boda</ButtonLink>
            <p className="text-right text-[0.95rem]">Paquetes de novia desde {formatCOP(800_000)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

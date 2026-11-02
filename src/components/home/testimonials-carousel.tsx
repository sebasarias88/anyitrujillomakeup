"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { ArrowIcon } from "@/components/ui/icons";
import { images } from "@/lib/images";
import { reviews } from "@/lib/site";

const photos = [
  { src: images.brideDressWindow, alt: "Novia antes de la ceremonia" },
  { src: images.quinceRuby, alt: "Quinceañera con bata roja" },
  { src: images.glamProfile, alt: "Maquillaje social con piel glow" },
];

/** Real reviews, one at a time, with a matching photograph. */
export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const reduceMotion = useReducedMotion();
  const review = reviews[current];
  const move = (delta: number) => setCurrent((value) => (value + delta + reviews.length) % reviews.length);
  const fade = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.15 } }
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] as const },
      };

  return (
    <section aria-labelledby="reviews-title" className="bg-white py-24 md:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <div className="relative aspect-[4/5] max-h-[32rem] w-full">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={current} {...fade} className="absolute inset-0 overflow-hidden rounded-[1.5rem]">
              <Image src={photos[current].src} alt={photos[current].alt} fill placeholder="blur" sizes="(min-width: 1024px) 28rem, 90vw" className="object-cover object-[50%_25%]" />
            </motion.div>
          </AnimatePresence>
          <span aria-hidden className="absolute -right-3 bottom-8 flex size-20 items-center justify-center rounded-full bg-ink pt-5 font-display text-[3.5rem] leading-none text-paper md:-right-6 md:size-24">
            “
          </span>
        </div>

        <div>
          <p className="eyebrow">Testimonios</p>
          <h2 id="reviews-title" className="mt-4 font-display text-[2.2rem] leading-[1.1] md:text-[2.8rem]">
            Clientas felices, <em className="text-nude-deep">momentos inolvidables</em>
          </h2>
          <div aria-live="polite" className="mt-8 min-h-56 md:min-h-48">
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure key={current} {...fade}>
                <blockquote className="font-display text-[1.35rem] leading-relaxed italic md:text-[1.6rem]">“{review.text}”</blockquote>
                <figcaption className="mt-6">
                  <span className="block font-display text-[1.2rem]">{review.author}</span>
                  <span className="block text-[0.78rem] tracking-[0.14em] text-ink-soft uppercase">{review.context}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          <div className="mt-8 flex items-center gap-3 border-t border-line pt-6">
            <span className="mr-auto text-[0.9rem] text-ink-soft tabular-nums">
              {current + 1} / {reviews.length}
            </span>
            <button type="button" onClick={() => move(-1)} aria-label="Testimonio anterior" className="pressable flex size-12 items-center justify-center rounded-full border border-line-strong bg-white hover:border-ink">
              <ArrowIcon className="size-4 rotate-180" />
            </button>
            <button type="button" onClick={() => move(1)} aria-label="Testimonio siguiente" className="pressable flex size-12 items-center justify-center rounded-full bg-ink text-paper">
              <ArrowIcon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

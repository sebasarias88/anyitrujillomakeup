"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { images } from "@/lib/images";

const statements = [
  { title: "Dura toda la celebración", text: "Resiste el calor, las lágrimas de emoción y las horas de baile sin perder el acabado." },
  { title: "Ligero como una segunda piel", text: "El producto se aplica en una bruma finísima: cubre sin sentirse pesado ni verse cargado." },
  { title: "Impecable en foto y video", text: "Un acabado uniforme y luminoso que se ve perfecto en cámaras de alta definición." },
] as const;

const photo = { src: images.glamProfile, alt: "Piel luminosa y uniforme lograda con maquillaje de aerógrafo" };

/**
 * The airbrush, shown rather than explained: the photograph is pinned and
 * goes from mist to sharp as the visitor scrolls, while three statements take
 * turns beside it. Only opacity moves (a pre-blurred copy fades out), which
 * keeps the scroll smooth. With reduced motion: no pin, sharp photo, all text.
 */
export function AirbrushScene() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const mistOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next = Math.min(statements.length - 1, Math.floor(progress * statements.length));
    setActive((current) => (current === next ? current : next));
  });

  if (reduceMotion) {
    return (
      <section id="aerografo" aria-labelledby="airbrush-title" className="container-page scroll-mt-24 py-28 md:py-40">
        <div className="grid gap-10 md:grid-cols-12 md:gap-6">
          <div className="relative aspect-[4/5] md:col-span-5">
            <Image src={photo.src} alt={photo.alt} fill placeholder="blur" sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <h2 id="airbrush-title" className="font-display text-[2.6rem] leading-[1] tracking-[-0.02em] md:text-[4rem]">
              Maquillaje con aerógrafo
            </h2>
            <ul className="mt-8 space-y-6">
              {statements.map((item) => (
                <li key={item.title}>
                  <h3 className="text-[1.25rem] font-semibold">{item.title}</h3>
                  <p className="mt-1 text-[1.05rem] leading-relaxed">{item.text}</p>
                </li>
              ))}
            </ul>
            <WhatsAppButton message="Hola Anyi ✨ Quiero saber más sobre el maquillaje con aerógrafo." className="mt-8">
              Quiero probar el aerógrafo
            </WhatsAppButton>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="aerografo" ref={ref} aria-labelledby="airbrush-title" className="relative h-[180svh] scroll-mt-24 md:h-[250svh]">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div className="container-page grid w-full items-center gap-6 md:grid-cols-12">
          <div className="relative h-[46svh] overflow-hidden md:col-span-5 md:h-[78svh]">
            <Image src={photo.src} alt={photo.alt} fill placeholder="blur" sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
            {/* The mist: a blurred, veiled copy that fades away with the scroll. */}
            <motion.div aria-hidden style={{ opacity: mistOpacity }} className="absolute inset-0">
              <Image src={photo.src} alt="" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover blur-xl" />
              <div className="absolute inset-0 bg-paper/45" />
            </motion.div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <h2 id="airbrush-title" className="font-display text-[2.4rem] leading-[1] tracking-[-0.02em] md:text-[4.2rem]">
              Maquillaje con aerógrafo
            </h2>
            <div className="relative mt-6 min-h-[8.5rem] md:mt-10" aria-live="polite">
              {statements.map((item, index) => (
                <div
                  key={item.title}
                  aria-hidden={index !== active}
                  className={`absolute inset-x-0 top-0 transition-[opacity,transform,filter] duration-500 ease-[var(--ease-out)] ${
                    index === active ? "opacity-100 blur-0" : "pointer-events-none translate-y-3 opacity-0 blur-[3px]"
                  }`}
                >
                  <h3 className="text-[1.3rem] font-semibold md:text-[1.5rem]">{item.title}</h3>
                  <p className="mt-2 max-w-[40ch] text-[1.05rem] leading-relaxed md:text-[1.15rem]">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-1.5" aria-hidden>
              {statements.map((item, index) => (
                <span key={item.title} className={`h-1 w-10 transition-colors duration-300 ${index <= active ? "bg-gold" : "bg-marble-deep"}`} />
              ))}
            </div>
            <WhatsAppButton message="Hola Anyi ✨ Quiero saber más sobre el maquillaje con aerógrafo." className="mt-8">
              Quiero probar el aerógrafo
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}

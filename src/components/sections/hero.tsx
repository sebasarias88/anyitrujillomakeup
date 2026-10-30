"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowIcon, StarIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";
import { images } from "@/lib/images";
import { business, whatsappUrl } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

const stats = [
  { value: `${business.yearsOfExperience}`, label: "años creando looks" },
  { value: business.google.rating.toFixed(1), label: `en Google · ${business.google.reviews} reseñas`, star: true },
  { value: business.instagramFollowers, label: "comunidad en Instagram" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "18%"]);
  const logoY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "-30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, reduceMotion ? 1 : 0]);

  const intro = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.1, ease, delay },
        };

  return (
    <section ref={ref} id="inicio" className="relative isolate min-h-dvh overflow-hidden pt-24 md:pt-28">
      {/* Ambient glow + oversized logo watermark */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 right-[-10%] size-[42rem] rounded-full bg-nude/15 blur-[140px]" />
        <div className="absolute bottom-[-20%] left-[-15%] size-[36rem] rounded-full bg-[#5a3424]/30 blur-[140px]" />
        <motion.div style={{ y: logoY }} className="absolute top-[12%] -left-[8%] w-[75rem] max-w-none opacity-[0.045]">
          <Logo className="w-full text-champagne" />
        </motion.div>
      </div>

      <div className="container-page grid items-center gap-12 pb-16 lg:grid-cols-12 lg:gap-8 lg:pb-24">
        <motion.div style={{ opacity: fade }} className="lg:col-span-7">
          <motion.p
            {...intro(0.1)}
            className="flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-nude uppercase"
          >
            <span className="h-px w-10 bg-nude/60" aria-hidden />
            Maquilladora profesional · Armenia, Quindío
          </motion.p>

          <h1 className="mt-7 font-display text-[3.4rem] leading-[0.95] font-light tracking-tight text-ivory sm:text-7xl xl:text-[6.4rem]">
            <motion.span {...intro(0.2)} className="block">
              Que ese día solo
            </motion.span>
            <motion.span {...intro(0.32)} className="block">
              tengas que
            </motion.span>
            <motion.span {...intro(0.44)} className="text-gradient-gold block pb-2 italic">
              relajarte y disfrutar.
            </motion.span>
          </h1>

          <motion.p {...intro(0.6)} className="mt-7 max-w-xl text-lg leading-relaxed text-pretty text-sand">
            Especialista en <strong className="font-semibold text-ivory">novias</strong> y{" "}
            <strong className="font-semibold text-ivory">maquillaje con aerógrafo</strong>. Looks únicos que resaltan
            tu belleza natural y duran toda la celebración, en estudio o donde tú estés.
          </motion.p>

          <motion.div {...intro(0.72)} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="#agenda">
              Agenda tu cita
              <ArrowIcon className="size-4 transition group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink href="#cotizador" variant="outline">
              Cotiza tu boda
            </ButtonLink>
          </motion.div>

          <motion.dl {...intro(0.85)} className="mt-14 grid max-w-xl grid-cols-3 gap-4 border-t border-line pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="flex items-center gap-1.5 font-display text-4xl text-ivory md:text-5xl">
                  {stat.value}
                  {stat.star ? <StarIcon className="size-5 text-gold" /> : null}
                </dd>
                <dd className="mt-1 text-xs leading-snug text-mute md:text-sm">{stat.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <div className="relative lg:col-span-5">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94, clipPath: "inset(12% 12% 12% 12% round 999px 999px 24px 24px)" }}
            animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0% round 999px 999px 24px 24px)" }}
            transition={{ duration: 1.5, ease, delay: 0.2 }}
            className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-t-full rounded-b-3xl border border-nude/30 bg-ink-2"
          >
            <motion.div style={{ y: imageY }} className="absolute inset-[-8%_0]">
              <Image
                src={images.anyiPortrait}
                alt="Anyi Trujillo, maquilladora profesional en Armenia"
                fill
                priority
                placeholder="blur"
                sizes="(min-width: 1024px) 28rem, 90vw"
                className="object-cover object-[50%_20%]"
              />
            </motion.div>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          </motion.div>

          {/* Floating credential card */}
          <motion.a
            href={whatsappUrl("Hola Anyi ✨ Vi tu página y quiero información sobre maquillaje de novia.")}
            target="_blank"
            rel="noopener noreferrer"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 1.1 }}
            className="absolute bottom-8 -left-2 flex max-w-60 items-center gap-3 rounded-2xl border border-line bg-ink/80 p-3 pr-4 backdrop-blur-xl sm:left-4 lg:-left-10"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-nude text-ink">
              <WhatsAppIcon className="size-5" />
            </span>
            <span className="text-xs leading-snug text-sand">
              <span className="block text-sm font-semibold text-ivory">Agenda abierta</span>
              Respuesta directa con Anyi
            </span>
          </motion.a>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="absolute top-10 -right-1 rounded-full border border-line bg-ink/70 px-4 py-2 text-[0.7rem] font-semibold tracking-[0.2em] text-champagne uppercase backdrop-blur-xl sm:right-4 lg:-right-4"
          >
            Certificada MX · NY
          </motion.p>
        </div>
      </div>

      <a
        href="#servicios"
        aria-label="Ver servicios"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] tracking-[0.3em] text-mute uppercase md:flex"
      >
        Desliza
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <span className="absolute inset-x-0 top-0 h-1/2 bg-nude motion-safe:animate-[scroll-cue_2s_ease-in-out_infinite]" />
        </span>
      </a>
    </section>
  );
}

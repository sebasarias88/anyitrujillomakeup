"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { images } from "@/lib/images";
import { courses, whatsappGreeting } from "@/lib/site";

type FormatId = (typeof courses.formats)[number]["id"];
type LevelId = (typeof courses.levels)[number]["id"];

/**
 * Courses page live piece, "arma tu curso": format, level and topics become a
 * WhatsApp message. No dates or prices are invented; Anyi answers those.
 */
export function CourseBuilder() {
  const [format, setFormat] = useState<FormatId | null>(null);
  const [level, setLevel] = useState<LevelId | null>(null);
  const [topics, setTopics] = useState<string[]>([]);

  const toggleTopic = (topic: string) =>
    setTopics((current) => (current.includes(topic) ? current.filter((item) => item !== topic) : [...current, topic]));

  const formatLabel = courses.formats.find((item) => item.id === format)?.title;
  const levelLabel = courses.levels.find((item) => item.id === level)?.label;
  const ready = Boolean(format && level);

  const message = [
    `${whatsappGreeting} Quiero información sobre tus cursos de maquillaje:`,
    "",
    `• Modalidad: ${formatLabel}`,
    `• Nivel: ${levelLabel}`,
    ...(topics.length ? [`• Me interesa: ${topics.join(", ")}`] : []),
    "",
    "¿Me cuentas fechas y valores?",
  ].join("\n");

  return (
    <section id="arma-tu-curso" aria-labelledby="builder-title" className="scroll-mt-24 bg-marble py-28 md:py-40">
      <div className="container-page grid gap-14 md:grid-cols-12 md:gap-6">
        <Reveal className="md:col-span-5">
          <h2 id="builder-title" className="font-display text-[2.2rem] leading-[1.02] tracking-[-0.01em] md:text-[2.2rem] lg:text-[2.75rem]">
            Arma tu curso
          </h2>
          <p className="mt-5 max-w-[40ch] text-[1.05rem] leading-relaxed">
            Elige cómo quieres aprender y qué te interesa. Te llevo a WhatsApp con tu solicitud lista y te cuento fechas y
            valores.
          </p>
          <p className="mt-3 text-[0.95rem] text-ink-soft">Formatos y temario de ejemplo, por confirmar.</p>
          {/* Where the classes happen: the studio's own vanity and a finished look. */}
          <div className="mt-10 grid grid-cols-[3fr_2fr] items-end gap-3">
            <div className="relative aspect-[3/4]">
              <Image src={images.studioVanity} alt="Tocador del estudio con espejo de luces, donde se dan las clases" fill placeholder="blur" sizes="(min-width: 768px) 25vw, 60vw" className="object-cover" />
            </div>
            <div className="relative aspect-[3/4]">
              <Image src={images.glamFront} alt="Maquillaje glam suave en tonos rosa con piel luminosa" fill placeholder="blur" sizes="(min-width: 768px) 16vw, 40vw" className="object-cover" />
            </div>
          </div>
        </Reveal>

        <div className="space-y-10 md:col-span-7 md:col-start-6">
          <fieldset>
            <legend className="font-semibold">Modalidad</legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {courses.formats.map((item) => {
                const active = format === item.id;
                return (
                  <label
                    key={item.id}
                    className={`pressable block cursor-pointer px-5 py-5 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ink ${
                      active ? "bg-ink text-paper" : "bg-paper hover:bg-marble-deep"
                    }`}
                  >
                    <input type="radio" name="course-format" checked={active} onChange={() => setFormat(item.id)} className="sr-only" />
                    <span className="block font-display text-[1.6rem] leading-none">{item.title}</span>
                    <span className={`mt-2 block text-[0.95rem] ${active ? "text-paper/80" : "text-ink-soft"}`}>{item.text}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-semibold">Nivel</legend>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {courses.levels.map((item) => {
                const active = level === item.id;
                return (
                  <label
                    key={item.id}
                    className={`pressable block cursor-pointer px-5 py-4 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ink ${
                      active ? "bg-ink text-paper" : "bg-paper hover:bg-marble-deep"
                    }`}
                  >
                    <input type="radio" name="course-level" checked={active} onChange={() => setLevel(item.id)} className="sr-only" />
                    <span className="block font-semibold">{item.label}</span>
                    <span className={`block text-[0.95rem] ${active ? "text-paper/80" : "text-ink-soft"}`}>{item.hint}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-semibold">
              Lo que quieres aprender <span className="font-normal text-ink-soft">(opcional)</span>
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {courses.topics.map((topic) => {
                const active = topics.includes(topic);
                return (
                  <label
                    key={topic}
                    className={`pressable cursor-pointer px-4 py-3 text-[0.95rem] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ink ${
                      active ? "bg-ink text-paper" : "bg-paper hover:bg-marble-deep"
                    }`}
                  >
                    <input type="checkbox" checked={active} onChange={() => toggleTopic(topic)} className="sr-only" />
                    {topic}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <WhatsAppButton
            message={message}
            disabled={!ready}
            disabledLabel={!format ? "Elige la modalidad" : "Elige el nivel"}
            className="max-sm:w-full"
          >
            Pedir información del curso
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}

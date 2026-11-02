"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image, { type StaticImageData } from "next/image";
import { useRef, useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { images } from "@/lib/images";
import { whatsappGreeting } from "@/lib/site";

type Occasion = "boda" | "quince" | "social" | "fotos";
type Style = "natural" | "soft" | "glam";
type Priority = "duration" | "photos" | "myself";
type Place = "studio" | "home";

type Answers = { occasion?: Occasion; style?: Style; priority?: Priority; place?: Place };

type Option = { value: string; label: string; hint: string; image?: StaticImageData; alt?: string };
type Question = { key: keyof Answers; title: string; options: readonly Option[] };

const questions: readonly Question[] = [
  {
    key: "occasion",
    title: "¿Para qué ocasión es tu look?",
    options: [
      { value: "boda", label: "Mi boda", hint: "El día más importante" },
      { value: "quince", label: "Mis XV años", hint: "Una noche para brillar" },
      { value: "social", label: "Grado o evento", hint: "Cumpleaños, fiesta, grado" },
      { value: "fotos", label: "Sesión de fotos", hint: "Maternidad, retrato, marca" },
    ],
  },
  {
    key: "style",
    title: "¿Cómo te imaginas?",
    options: [
      { value: "natural", label: "Natural luminosa", hint: "Piel fresca, tonos suaves", image: images.brideTerrace, alt: "Novia con maquillaje natural luminoso" },
      { value: "soft", label: "Glam suave", hint: "Rosados y nude, romántico", image: images.glamFront, alt: "Maquillaje glam suave en tonos rosa" },
      { value: "glam", label: "Glam total", hint: "Mirada intensa, alto impacto", image: images.quinceRubyPortrait, alt: "Maquillaje glam de alto impacto con corona" },
    ],
  },
  {
    key: "priority",
    title: "¿Qué es lo más importante para ti?",
    options: [
      { value: "duration", label: "Que dure todo el día", hint: "Calor, lágrimas y baile" },
      { value: "photos", label: "Verme perfecta en fotos", hint: "Cámara y video en alta definición" },
      { value: "myself", label: "Sentirme yo misma", hint: "Resaltar, no cambiar" },
    ],
  },
  {
    key: "place",
    title: "¿Dónde te gustaría arreglarte?",
    options: [
      { value: "studio", label: "En el estudio", hint: "Calle 23, edificio Tesalónica" },
      { value: "home", label: "A domicilio", hint: "En tu casa, hotel o lugar del evento" },
    ],
  },
];

const looks: Record<Style, { name: string; description: string; image: StaticImageData; alt: string }> = {
  natural: {
    name: "Glow natural",
    description: "Piel luminosa y jugosa, tonos durazno y labios hidratados. Te ves como tú en tu mejor día.",
    image: images.brideTerrace,
    alt: "Novia con maquillaje natural luminoso",
  },
  soft: {
    name: "Soft glam rosé",
    description: "Sombras rosadas difuminadas, delineado suave y gloss. Romántico, elegante y muy fotogénico.",
    image: images.glamFront,
    alt: "Maquillaje soft glam en tonos rosa",
  },
  glam: {
    name: "Glam de gala",
    description: "Mirada intensa, pestañas protagonistas y piel impecable. Para brillar toda la noche.",
    image: images.quinceRubyPortrait,
    alt: "Maquillaje glam de alto impacto con corona",
  },
};

const services: Record<Occasion, string> = {
  boda: "un paquete de novia con prueba previa en el estudio",
  quince: "el servicio de XV años con maquillaje y peinado",
  social: "un maquillaje social con peinado",
  fotos: "un maquillaje para sesión de fotos",
};

function buildResult({ occasion, style, priority, place }: Required<Answers>) {
  const technique =
    priority === "myself"
      ? "maquillaje tradicional con piel ligera"
      : "maquillaje con aerógrafo, que dura más y se ve impecable en cámara";
  const recommendation = `Te recomiendo ${services[occasion]} y ${technique}.`;
  const where = place === "studio" ? "en el estudio" : "a domicilio";
  const look = looks[style];
  return {
    ...look,
    recommendation,
    message: `${whatsappGreeting} Hice el test en tu página y mi look ideal es "${look.name}". ${recommendation} Me gustaría arreglarme ${where}. ¿Me ayudas a agendar?`,
  };
}

/**
 * The home page's live thing: four quick questions that end in a
 * recommendation and a WhatsApp message already written with the answers.
 * Each step arrives out of a light mist; with reduced motion it only fades.
 */
export function LookQuiz() {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  // Set when the visitor answers; the next heading takes focus as soon as it mounts
  // (AnimatePresence mounts it only after the previous step has left).
  const focusNext = useRef(false);
  const headingRef = (node: HTMLHeadingElement | null) => {
    if (node && focusNext.current) {
      node.focus();
      focusNext.current = false;
    }
  };

  const finished = step >= questions.length;
  const result = finished ? buildResult(answers as Required<Answers>) : null;

  const goTo = (next: number) => {
    // Move focus to the new question so keyboard and screen reader users follow along.
    focusNext.current = true;
    setStep(next);
  };

  const choose = (key: keyof Answers, value: string) => {
    setAnswers((current) => ({ ...current, [key]: value }));
    goTo(step + 1);
  };

  const motionProps = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.15 } }
    : {
        initial: { opacity: 0, filter: "blur(6px)", transform: "translateY(12px)" },
        animate: { opacity: 1, filter: "blur(0px)", transform: "translateY(0px)" },
        exit: { opacity: 0, filter: "blur(4px)", transform: "translateY(-8px)" },
        transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] as const },
      };

  return (
    <section aria-labelledby="quiz-title" className="container-page max-w-[78rem] pb-24 md:pb-32">
      <div className="grid gap-12 rounded-[2rem] bg-marble p-6 sm:p-10 md:grid-cols-12 md:gap-6 lg:p-14">
        <Reveal className="md:col-span-4">
          <p className="eyebrow">En 30 segundos</p>
          <h2 id="quiz-title" className="mt-3 font-display text-[2rem] leading-[1.1] lg:text-[2.6rem]">
            ¿No sabes qué look elegir? <em className="text-nude-deep">Te ayudo.</em>
          </h2>
          <p className="mt-5 max-w-[34ch] leading-relaxed text-ink-soft">
            Responde cuatro preguntas y te digo qué estilo y técnica te recomiendo. Me lo envías por WhatsApp y lo
            personalizamos juntas.
          </p>
          <div
            role="progressbar"
            aria-label="Avance del test"
            aria-valuemin={0}
            aria-valuemax={questions.length}
            aria-valuenow={Math.min(step, questions.length)}
            className="mt-8 flex max-w-xs gap-1.5"
          >
            {questions.map((question, index) => (
              <span
                key={question.key}
                className={`h-1 flex-1 transition-colors duration-300 ${index < step ? "bg-nude" : "bg-marble-deep"}`}
              />
            ))}
          </div>
        </Reveal>
        <Reveal variant="photo" delay={120} className="relative hidden aspect-[4/5] overflow-hidden rounded-3xl md:col-span-3 md:row-start-2 md:block">
          <Image
            src={images.quinceRuby}
            alt="Quinceañera con bata roja junto a su vestido de gala"
            fill
            placeholder="blur"
            sizes="25vw"
            className="object-cover"
          />
        </Reveal>

        <div className="md:col-span-7 md:col-start-6 md:row-span-2 md:row-start-1" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            {!finished ? (
              <motion.fieldset key={step} {...motionProps}>
                <legend className="contents">
                  <h3 ref={headingRef} tabIndex={-1} className="font-display text-[1.9rem] leading-tight outline-none">
                    {questions[step].title}
                  </h3>
                </legend>
                <div
                  className={`mt-6 grid gap-3 ${questions[step].options.some((option) => option.image) ? "grid-cols-3" : "sm:grid-cols-2"}`}
                >
                  {questions[step].options.map((option) =>
                    option.image ? (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => choose(questions[step].key, option.value)}
                        className="pressable group text-left"
                      >
                        <span className="relative block aspect-[3/4] overflow-hidden rounded-2xl">
                          <Image
                            src={option.image}
                            alt={option.alt ?? ""}
                            fill
                            placeholder="blur"
                            sizes="(min-width: 768px) 18vw, 30vw"
                            className="object-cover transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.03]"
                          />
                        </span>
                        <span className="mt-2 block font-semibold">{option.label}</span>
                        <span className="block text-[0.95rem] text-ink-soft max-sm:hidden">{option.hint}</span>
                      </button>
                    ) : (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => choose(questions[step].key, option.value)}
                        className="pressable rounded-2xl border border-line bg-white px-6 py-6 text-left transition-colors hover:border-nude md:min-h-28"
                      >
                        <span className="block font-display text-[1.3rem]">{option.label}</span>
                        <span className="mt-0.5 block text-[0.95rem] text-ink-soft">{option.hint}</span>
                      </button>
                    ),
                  )}
                </div>
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={() => goTo(step - 1)}
                    className="mt-6 min-h-11 underline underline-offset-4"
                  >
                    Volver a la pregunta anterior
                  </button>
                ) : null}
              </motion.fieldset>
            ) : result ? (
              <motion.div key="result" {...motionProps} className="grid gap-6 sm:grid-cols-[13rem_1fr] sm:gap-8">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl max-sm:w-2/3">
                  <Image src={result.image} alt={result.alt} fill placeholder="blur" sizes="13rem" className="object-cover" />
                </div>
                <div>
                  <h3 ref={headingRef} tabIndex={-1} className="font-display text-[2.2rem] leading-tight outline-none">
                    Tu look: {result.name}
                  </h3>
                  <p className="mt-3 leading-relaxed">{result.description}</p>
                  <p className="mt-3 leading-relaxed font-semibold">{result.recommendation}</p>
                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
                    <WhatsAppButton message={result.message}>Quiero este look</WhatsAppButton>
                    <button
                      type="button"
                      onClick={() => {
                        setAnswers({});
                        goTo(0);
                      }}
                      className="min-h-11 underline underline-offset-4"
                    >
                      Repetir el test
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

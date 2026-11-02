"use client";

import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { ArrowIcon, SparkleIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { images } from "@/lib/images";
import { whatsappUrl } from "@/lib/site";

type Occasion = "boda" | "quince" | "social" | "fotos";
type Style = "natural" | "soft" | "glam";
type Priority = "duration" | "photos" | "myself";

type Answers = { occasion?: Occasion; style?: Style; priority?: Priority };

const questions = [
  {
    key: "occasion",
    title: "¿Para qué ocasión es tu look?",
    options: [
      { value: "boda", label: "Mi boda", hint: "El día más importante" },
      { value: "quince", label: "Mis XV años", hint: "Una noche de princesa" },
      { value: "social", label: "Grado o evento", hint: "Cumpleaños, fiesta, grado" },
      { value: "fotos", label: "Sesión de fotos", hint: "Maternidad, retrato, marca" },
    ],
  },
  {
    key: "style",
    title: "¿Cómo te imaginas?",
    options: [
      { value: "natural", label: "Natural luminosa", hint: "Piel fresca, tonos suaves" },
      { value: "soft", label: "Glam suave", hint: "Elegante, rosados y nude" },
      { value: "glam", label: "Glam total", hint: "Ojos intensos, alto impacto" },
    ],
  },
  {
    key: "priority",
    title: "¿Qué es lo más importante para ti?",
    options: [
      { value: "duration", label: "Que dure todo el día", hint: "Calor, lágrimas, baile" },
      { value: "photos", label: "Verme perfecta en fotos", hint: "Cámara y video HD" },
      { value: "myself", label: "Sentirme yo misma", hint: "Resaltar, no cambiar" },
    ],
  },
] as const;

type Result = { name: string; description: string; recommendation: string; image: StaticImageData; alt: string };

const looks: Record<Style, Omit<Result, "recommendation">> = {
  natural: {
    name: "Glow natural",
    description: "Piel luminosa y jugosa, tonos durazno y labios hidratados. Se ve como tú en tu mejor día.",
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

function buildResult({ occasion, style, priority }: Required<Answers>): Result {
  const look = looks[style];
  const technique =
    priority === "myself"
      ? "maquillaje tradicional con piel ligera"
      : "maquillaje con aerógrafo, que dura más y se ve impecable en cámara";
  const service = {
    boda: "un paquete de novia con prueba previa en el estudio",
    quince: "el servicio de XV años con maquillaje y peinado",
    social: "un maquillaje social con peinado",
    fotos: "un maquillaje para sesión de fotos",
  }[occasion];
  return { ...look, recommendation: `Te recomiendo ${service} y ${technique}.` };
}

export function LookQuiz() {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const finished = step >= questions.length;
  const result = finished ? buildResult(answers as Required<Answers>) : null;

  const choose = (key: keyof Answers, value: string) => {
    setAnswers((current) => ({ ...current, [key]: value }));
    setStep((current) => current + 1);
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
  };

  const slide = reduceMotion
    ? {}
    : { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -40 }, transition: { duration: 0.45 } };

  return (
    <section aria-labelledby="quiz-title" className="container-page pb-24 md:pb-36">
      <Reveal className="relative overflow-hidden rounded-[2.5rem] border border-nude/25 bg-gradient-to-br from-[#2a1c16] via-ink-2 to-ink p-6 md:p-14">
        <div aria-hidden className="absolute -top-24 -right-24 size-80 rounded-full bg-nude/20 blur-[100px]" />
        <div className="relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.3em] text-nude uppercase">
              <SparkleIcon className="size-3.5" /> Test de 30 segundos
            </p>
            <h2 id="quiz-title" className="mt-5 font-display text-4xl leading-tight font-light text-ivory md:text-5xl">
              Descubre tu look <em className="text-gradient-gold">ideal</em>
            </h2>
            <p className="mt-4 text-sand">
              Responde tres preguntas y te digo qué estilo y técnica van mejor contigo. Luego me lo envías y lo
              personalizamos juntas.
            </p>
            {!finished ? (
              <div className="mt-8 flex gap-2" aria-hidden>
                {questions.map((question, index) => (
                  <span
                    key={question.key}
                    className={`h-1 flex-1 rounded-full transition-colors duration-500 ${index <= step ? "bg-nude" : "bg-line"}`}
                  />
                ))}
              </div>
            ) : null}
          </div>

          <div className="lg:min-h-[22rem]" aria-live="polite">
            <AnimatePresence mode="wait">
              {!finished ? (
                <motion.div key={step} {...slide}>
                  <p className="text-sm text-mute">
                    Pregunta {step + 1} de {questions.length}
                  </p>
                  <h3 className="mt-2 font-display text-3xl text-ivory">{questions[step].title}</h3>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {questions[step].options.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => choose(questions[step].key, option.value)}
                        className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-ink/50 p-5 text-left transition hover:border-nude hover:bg-nude/10 focus-visible:outline-2 focus-visible:outline-nude"
                      >
                        <span>
                          <span className="block font-semibold text-ivory">{option.label}</span>
                          <span className="mt-0.5 block text-xs text-mute">{option.hint}</span>
                        </span>
                        <ArrowIcon className="size-4 shrink-0 text-nude opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
                      </button>
                    ))}
                  </div>
                  {step > 0 ? (
                    <button type="button" onClick={() => setStep((current) => current - 1)} className="mt-6 text-sm text-sand underline-offset-4 hover:text-ivory hover:underline">
                      ← Volver
                    </button>
                  ) : null}
                </motion.div>
              ) : result ? (
                <motion.div key="result" {...slide} className="grid gap-6 sm:grid-cols-[11rem_1fr]">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-line">
                    <Image src={result.image} alt={result.alt} fill placeholder="blur" sizes="11rem" className="object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.2em] text-nude uppercase">Tu look ideal</p>
                    <h3 className="mt-2 font-display text-4xl text-ivory">{result.name}</h3>
                    <p className="mt-3 leading-relaxed text-sand">{result.description}</p>
                    <p className="mt-3 leading-relaxed text-ivory">{result.recommendation}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      <a
                        href={whatsappUrl(
                          `Hola Anyi ✨ Hice el test en tu página y mi look ideal es "${result.name}". ${result.recommendation} ¿Me ayudas a agendar?`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-12 items-center gap-2 rounded-full bg-nude px-6 text-sm font-semibold text-ink transition hover:bg-champagne"
                      >
                        <WhatsAppIcon className="size-4" />
                        Quiero este look
                      </a>
                      <button type="button" onClick={restart} className="text-sm text-sand underline-offset-4 hover:text-ivory hover:underline">
                        Repetir test
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { CheckIcon, MinusIcon, PlusIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  bridalPackages,
  companionServices,
  extraHourPrice,
  formatCOP,
  whatsappUrl,
  type CompanionServiceId,
} from "@/lib/site";

type Location = "studio" | "home";

const emptyCompanions = Object.fromEntries(companionServices.map((service) => [service.id, 0])) as Record<
  CompanionServiceId,
  number
>;

function Stepper({
  label,
  hint,
  value,
  onChange,
  max = 20,
}: {
  label: string;
  hint: string;
  value: number;
  onChange: (value: number) => void;
  max?: number;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="text-sm font-medium text-ivory">{label}</p>
        <p className="text-xs text-mute">{hint}</p>
      </div>
      <div className="flex items-center gap-1 rounded-full border border-line p-1">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          disabled={value === 0}
          aria-label={`Quitar uno: ${label}`}
          className="flex size-8 items-center justify-center rounded-full text-ivory transition hover:bg-nude/15 disabled:opacity-30"
        >
          <MinusIcon className="size-3.5" />
        </button>
        <output aria-live="polite" aria-label={`${label}: ${value}`} className="w-7 text-center text-sm font-semibold tabular-nums">
          {value}
        </output>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value === max}
          aria-label={`Agregar uno: ${label}`}
          className="flex size-8 items-center justify-center rounded-full text-ivory transition hover:bg-nude/15 disabled:opacity-30"
        >
          <PlusIcon className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

export function BridalQuote() {
  const reduceMotion = useReducedMotion();
  const [packageId, setPackageId] = useState(bridalPackages[2].id);
  const [companions, setCompanions] = useState(emptyCompanions);
  const [extraHours, setExtraHours] = useState(0);
  const [location, setLocation] = useState<Location>("studio");

  const selected = bridalPackages.find((item) => item.id === packageId) ?? bridalPackages[0];
  const allowsExtraHours = selected.id === "rubi";

  const lines = useMemo(() => {
    const result = [{ label: `${selected.name} · ${selected.subtitle}`, amount: selected.price }];
    if (allowsExtraHours && extraHours > 0) {
      result.push({ label: `${extraHours} h adicional${extraHours > 1 ? "es" : ""} de acompañamiento`, amount: extraHours * extraHourPrice });
    }
    for (const service of companionServices) {
      const quantity = companions[service.id];
      if (quantity > 0) result.push({ label: `${quantity} × ${service.label}`, amount: quantity * service.price });
    }
    return result;
  }, [selected, allowsExtraHours, extraHours, companions]);

  const total = lines.reduce((sum, line) => sum + line.amount, 0);

  const message = [
    "Hola Anyi ✨ Armé mi cotización de novia en tu página:",
    "",
    ...lines.map((line) => `• ${line.label}: ${formatCOP(line.amount)}`),
    `• Lugar: ${location === "studio" ? "En el estudio" : "A domicilio (por cotizar según ubicación)"}`,
    "",
    `Total estimado: ${formatCOP(total)}${location === "home" ? " + domicilio" : ""}`,
    "",
    "¿Tienes disponibilidad para mi fecha?",
  ].join("\n");

  return (
    <section id="novias" aria-labelledby="bridal-title" className="container-page py-24 md:py-36">
      <SectionHeading
        id="bridal-title"
        eyebrow="Novias"
        align="center"
        title={
          <>
            Elige tu experiencia y <em className="text-gradient-gold">cotiza al instante</em>
          </>
        }
        description="Selecciona tu paquete, suma a tus damas, mamá o invitadas, y envíame tu cotización armada por WhatsApp. Todos los paquetes usan productos de alta gama."
      />

      <div id="cotizador" className="mt-16 grid scroll-mt-28 gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-10">
        {/* Packages */}
        <fieldset className="space-y-4">
          <legend className="sr-only">Paquete de novia</legend>
          {bridalPackages.map((item, index) => {
            const active = item.id === packageId;
            return (
              <Reveal key={item.id} delay={index * 80}>
                <label
                  className={`relative block cursor-pointer rounded-3xl border p-6 transition duration-300 md:p-8 ${
                    active
                      ? "border-nude bg-gradient-to-br from-nude/15 via-ink-2 to-ink-2 shadow-[0_30px_80px_-40px_rgb(208_154_115/0.6)]"
                      : "border-line bg-ink-2 hover:border-nude/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="bridal-package"
                    value={item.id}
                    checked={active}
                    onChange={() => setPackageId(item.id)}
                    className="peer sr-only"
                  />
                  <span aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-nude" />
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <span
                        aria-hidden
                        className={`mt-1.5 flex size-6 shrink-0 items-center justify-center rounded-full border transition ${
                          active ? "border-nude bg-nude text-ink" : "border-sand/40"
                        }`}
                      >
                        {active ? <CheckIcon className="size-3.5" /> : null}
                      </span>
                      <div>
                        <p className="flex flex-wrap items-center gap-3">
                          <span className="font-display text-3xl text-ivory md:text-4xl">{item.name}</span>
                          {item.highlight ? (
                            <span className="rounded-full bg-nude px-3 py-1 text-[0.65rem] font-bold tracking-wider text-ink uppercase">
                              La más completa
                            </span>
                          ) : null}
                        </p>
                        <p className="mt-1 text-sm tracking-wide text-nude">{item.subtitle}</p>
                      </div>
                    </div>
                    <p className="font-display text-3xl text-champagne md:text-4xl">{formatCOP(item.price)}</p>
                  </div>
                  <ul className="mt-6 grid gap-2.5 pl-10 sm:grid-cols-2">
                    {item.includes.map((feature) => (
                      <li key={feature} className="flex gap-2.5 text-sm leading-snug text-sand">
                        <CheckIcon className="mt-0.5 size-4 shrink-0 text-nude" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {item.note ? <p className="mt-5 pl-10 text-xs text-mute">{item.note} No incluye accesorios.</p> : null}
                </label>
              </Reveal>
            );
          })}
        </fieldset>

        {/* Summary */}
        <Reveal delay={120}>
          <div className="rounded-3xl border border-line bg-ink-3/80 p-6 backdrop-blur md:p-8 lg:sticky lg:top-28">
            <h3 className="font-display text-3xl text-ivory">Tu cotización</h3>

            <div className="mt-6 border-t border-line pt-4">
              <p className="text-xs font-semibold tracking-[0.2em] text-nude uppercase">Lugar del servicio</p>
              <div role="radiogroup" aria-label="Lugar del servicio" className="mt-3 grid grid-cols-2 gap-2 rounded-full border border-line p-1">
                {(
                  [
                    ["studio", "En el estudio"],
                    ["home", "A domicilio"],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={location === value}
                    onClick={() => setLocation(value)}
                    className={`min-h-10 rounded-full text-sm font-semibold transition ${
                      location === value ? "bg-nude text-ink" : "text-sand hover:text-ivory"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {location === "home" ? (
                <p className="mt-2 text-xs text-mute">El domicilio se cotiza según la ubicación del evento.</p>
              ) : null}
            </div>

            <AnimatePresence initial={false}>
              {allowsExtraHours ? (
                <motion.div
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 border-t border-line pt-2">
                    <Stepper
                      label="Horas adicionales"
                      hint={`${formatCOP(extraHourPrice)} por hora`}
                      value={extraHours}
                      onChange={setExtraHours}
                      max={6}
                    />
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className="mt-4 border-t border-line pt-4">
              <p className="text-xs font-semibold tracking-[0.2em] text-nude uppercase">Acompañantes</p>
              <div className="mt-1 divide-y divide-line">
                {companionServices.map((service) => (
                  <Stepper
                    key={service.id}
                    label={service.label}
                    hint={`${formatCOP(service.price)} c/u`}
                    value={companions[service.id]}
                    onChange={(value) => setCompanions((current) => ({ ...current, [service.id]: value }))}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-ink p-5">
              <ul className="space-y-1.5 text-xs text-sand">
                {lines.map((line) => (
                  <li key={line.label} className="flex justify-between gap-4">
                    <span>{line.label}</span>
                    <span className="tabular-nums">{formatCOP(line.amount)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-end justify-between border-t border-line pt-4">
                <span className="text-sm text-sand">Total estimado</span>
                <motion.span
                  key={total}
                  initial={reduceMotion ? false : { opacity: 0.4, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-display text-4xl text-ivory tabular-nums"
                >
                  {formatCOP(total)}
                </motion.span>
              </div>
              {location === "home" ? <p className="mt-1 text-right text-xs text-mute">+ domicilio</p> : null}
            </div>

            <a
              href={whatsappUrl(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex min-h-13 w-full items-center justify-center gap-2.5 rounded-full bg-nude px-6 font-semibold text-ink transition hover:bg-champagne focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nude"
            >
              <WhatsAppIcon className="size-5" />
              Enviar cotización por WhatsApp
            </a>
            <p className="mt-3 text-center text-xs text-mute">Valores de referencia. Tu fecha se confirma por WhatsApp.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

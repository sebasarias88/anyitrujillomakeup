"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useMemo, useState } from "react";
import { MinusIcon, PlusIcon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";
import { Reveal } from "@/components/ui/reveal";
import { RollingNumber } from "@/components/ui/rolling-number";
import { DatePicker } from "@/components/ui/date-picker";
import { Select } from "@/components/ui/select";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { bridalPackages, companionServices, extraHourPrice, formatCOP, homeVisitZones, type CompanionServiceId, whatsappGreeting } from "@/lib/site";
import { PackagesTable } from "./packages-table";

type Place = "studio" | "home";

const emptyCompanions = Object.fromEntries(companionServices.map((service) => [service.id, 0])) as Record<
  CompanionServiceId,
  number
>;

const longDate = new Intl.DateTimeFormat("es-CO", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

/** "2027-03-14" → local date (avoids the UTC shift of new Date(string)). */
function parseDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function toInputValue(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function Stepper({ label, hint, value, onChange, max = 20 }: { label: string; hint: string; value: number; onChange: (value: number) => void; max?: number }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-[0.95rem] text-ink-soft">{hint}</p>
      </div>
      <div className="flex items-center rounded-full border border-line">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          disabled={value === 0}
          aria-label={`Quitar uno: ${label}`}
          className="pressable flex size-11 items-center justify-center rounded-full hover:bg-marble disabled:opacity-30"
        >
          <MinusIcon className="size-4" />
        </button>
        <output aria-live="polite" aria-label={`${label}: ${value}`} className="w-8 text-center font-medium tabular-nums">
          {value}
        </output>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value === max}
          aria-label={`Agregar uno: ${label}`}
          className="pressable flex size-11 items-center justify-center rounded-full hover:bg-marble disabled:opacity-30"
        >
          <PlusIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}

/**
 * Packages comparison plus the quote calculator. The quote is printed as a
 * wedding invitation that updates live; the same lines become the WhatsApp
 * message, so Anyi receives the package, companions, date and place at once.
 */
export function BridalPlanner() {
  const reduceMotion = useReducedMotion();
  const nameId = useId();
  const [packageId, setPackageId] = useState(bridalPackages[2].id);
  const [companions, setCompanions] = useState(emptyCompanions);
  const [extraHours, setExtraHours] = useState(0);
  const [place, setPlace] = useState<Place>("studio");
  const [municipality, setMunicipality] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [minDate, setMinDate] = useState<string | undefined>(undefined);

  // Today only exists in the browser: resolve it after mount to keep the page static.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only value
    setMinDate(toInputValue(new Date()));
  }, []);

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
  const placeText = place === "studio" ? "En el estudio" : `A domicilio${municipality ? ` en ${municipality}` : ""}`;
  const dateText = date ? longDate.format(parseDate(date)) : null;
  const ready = Boolean(date) && (place === "studio" || Boolean(municipality));

  const message = [
    `${whatsappGreeting} Armé mi cotización de novia en tu página:`,
    "",
    ...lines.map((line) => `• ${line.label}: ${formatCOP(line.amount)}`),
    `• Fecha de la boda: ${dateText}`,
    `• Lugar: ${placeText}${place === "home" ? " (domicilio por cotizar)" : ""}`,
    ...(name.trim() ? [`• Nombre: ${name.trim()}`] : []),
    "",
    `Total estimado: ${formatCOP(total)}${place === "home" ? " + domicilio" : ""}`,
    "",
    "¿Tienes disponibilidad para mi fecha?",
  ].join("\n");

  const missing = !date ? "Elige la fecha de tu boda" : "Elige el municipio";

  return (
    <>
      <PackagesTable selectedId={packageId} onSelect={setPackageId} />

      <section id="cotizador" aria-labelledby="quote-title" className="scroll-mt-28 bg-white py-24 md:py-28">
        <div className="container-page grid gap-14 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-6 lg:col-span-5">
            <Reveal>
              <p className="eyebrow">Cotizador</p>
              <h2 id="quote-title" className="mt-4 font-display text-[2.2rem] leading-[1.1] md:text-[2.8rem]">
                Cotiza tu boda <em className="text-nude-deep">en segundos</em>
              </h2>
              <p className="mt-4 max-w-[40ch] text-[1.05rem] leading-relaxed">
                Elige tu paquete, suma a tus acompañantes y envíame la cotización armada por WhatsApp.
              </p>
            </Reveal>

            <fieldset className="mt-10">
              <legend className="font-medium">Paquete</legend>
              <div className="mt-3 space-y-2">
                {bridalPackages.map((pkg) => {
                  const active = pkg.id === packageId;
                  return (
                    <label
                      key={pkg.id}
                      className={`pressable flex cursor-pointer items-center justify-between gap-4 rounded-xl border px-5 py-4 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ink ${
                        active ? "border-ink bg-white" : "border-line bg-blush hover:border-ink"
                      }`}
                    >
                      <input
                        type="radio"
                        name="bridal-package"
                        value={pkg.id}
                        checked={active}
                        onChange={() => setPackageId(pkg.id)}
                        className="sr-only"
                      />
                      <span className="flex items-center gap-3">
                        <span aria-hidden className={`size-3 shrink-0 rounded-full border border-ink ${active ? "bg-ink" : "bg-paper"}`} />
                        <span>
                          <span className="block font-medium">{pkg.name}</span>
                          <span className="block text-[0.95rem] text-ink-soft">{pkg.subtitle}</span>
                        </span>
                      </span>
                      <span className="tabular-nums">{formatCOP(pkg.price)}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <AnimatePresence initial={false}>
              {allowsExtraHours ? (
                <motion.div
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                  animate={reduceMotion ? { opacity: 1 } : { opacity: 1, height: "auto" }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                  transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-6">
                    <Stepper
                      label="Horas adicionales"
                      hint={`Rubí incluye hasta 3 h. ${formatCOP(extraHourPrice)} por hora`}
                      value={extraHours}
                      onChange={setExtraHours}
                      max={6}
                    />
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <fieldset className="mt-8">
              <legend className="font-medium">Acompañantes</legend>
              <p className="text-[0.95rem] text-ink-soft">Mamá, damas o invitadas, atendidas por mi equipo.</p>
              <div className="mt-2">
                {companionServices.map((service) => (
                  <Stepper
                    key={service.id}
                    label={service.label}
                    hint={`${formatCOP(service.price)} por persona`}
                    value={companions[service.id]}
                    onChange={(value) => setCompanions((current) => ({ ...current, [service.id]: value }))}
                  />
                ))}
              </div>
            </fieldset>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <DatePicker label="Fecha de la boda" value={date} min={minDate} onChange={setDate} placeholder="Elige la fecha de tu boda" />
              <div>
                <label htmlFor={nameId} className="mb-2 block font-medium">
                  Tu nombre <span className="font-normal text-ink-soft">(opcional)</span>
                </label>
                <input
                  id={nameId}
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="given-name"
                  maxLength={60}
                  className="min-h-12 w-full rounded-xl border border-line-strong bg-blush px-4 text-base"
                />
              </div>
            </div>

            <fieldset className="mt-8">
              <legend className="mb-3 font-medium">¿Dónde te arreglas?</legend>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    ["studio", "En el estudio"],
                    ["home", "A domicilio"],
                  ] as const
                ).map(([value, label]) => (
                  <label
                    key={value}
                    className={`pressable flex min-h-12 cursor-pointer items-center justify-center rounded-full border text-[0.92rem] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ink ${
                      place === value ? "border-ink bg-ink text-paper" : "border-line bg-white hover:border-ink"
                    }`}
                  >
                    <input
                      type="radio"
                      name="bridal-place"
                      value={value}
                      checked={place === value}
                      onChange={() => setPlace(value)}
                      className="sr-only"
                    />
                    {label}
                  </label>
                ))}
              </div>
              {place === "home" ? (
                <div className="mt-4">
                  <Select
                    label="Municipio"
                    options={homeVisitZones.municipalities.map((item) => ({ value: item.name, label: item.name }))}
                    value={municipality}
                    onChange={setMunicipality}
                    placeholder="Elige el municipio…"
                  />
                  <p className="mt-2 text-[0.95rem] text-ink-soft">
                    El domicilio se cotiza según el lugar. Zonas de ejemplo, por confirmar.
                  </p>
                </div>
              ) : null}
            </fieldset>
          </div>

          {/* The invitation: the quote printed on paper, sticky beside the controls. */}
          <div className="md:col-span-6 md:col-start-7 lg:col-span-6 lg:col-start-7">
            <div data-hide-whatsapp-bar className="md:sticky md:top-24">
              <article aria-labelledby="invitation-title" className="rounded-[1.5rem] border border-line bg-blush px-6 py-10 text-center shadow-lift md:px-12 md:py-14">
                <Logo className="mx-auto h-16 text-ink" />
                <h3 id="invitation-title" className="mt-6 font-display text-[1.9rem] leading-tight">
                  {name.trim() ? `La boda de ${name.trim()}` : "Tu cotización de novia"}
                </h3>
                <p className="mt-2 min-h-6 text-[1.05rem] first-letter:uppercase">{dateText ?? "Elige la fecha de tu boda"}</p>
                <p className="text-[0.95rem] text-ink-soft">{placeText}</p>

                <p className="mt-20 font-display text-[3rem] leading-none md:mt-10" aria-live="polite">
                  <RollingNumber value={formatCOP(total)} />
                </p>
                <p className="mt-2 text-[0.95rem]">es tu total estimado</p>
                {place === "home" ? <p className="mt-2 text-[0.95rem] text-ink-soft">+ domicilio según el lugar</p> : null}
                <ul className="mx-auto mt-8 max-w-sm space-y-2 text-left text-[0.95rem]">
                  {lines.map((line) => (
                    <li key={line.label} className="flex justify-between gap-4">
                      <span>{line.label}</span>
                      <span className="tabular-nums">{formatCOP(line.amount)}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <WhatsAppButton message={message} disabled={!ready} disabledLabel={missing} className="w-full max-w-sm">
                    Enviar por WhatsApp
                  </WhatsAppButton>
                </div>
                <p className="mt-3 text-[0.95rem] text-ink-soft">Valores de referencia. Tu fecha se confirma por WhatsApp.</p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

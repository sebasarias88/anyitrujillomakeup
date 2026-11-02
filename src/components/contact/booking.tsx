"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { ChevronIcon, MinusIcon, PlusIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { Select } from "@/components/ui/select";
import { Skeleton, SkeletonRegion } from "@/components/ui/skeleton";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { bookingServices, homeVisitZones, whatsappGreeting } from "@/lib/site";

const weekDays = ["L", "M", "M", "J", "V", "S", "D"];
const timeSlots = ["8:00 a. m.", "9:00 a. m.", "10:00 a. m.", "11:00 a. m.", "12:00 m.", "1:00 p. m.", "2:00 p. m.", "3:00 p. m.", "4:00 p. m.", "5:00 p. m."];

const monthFormat = new Intl.DateTimeFormat("es-CO", { month: "long", year: "numeric" });
const longDateFormat = new Intl.DateTimeFormat("es-CO", { weekday: "long", day: "numeric", month: "long" });

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

function buildMonth(year: number, month: number) {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7; // Monday first
  const days = new Date(year, month + 1, 0).getDate();
  return [...Array.from({ length: offset }, () => null), ...Array.from({ length: days }, (_, index) => new Date(year, month, index + 1))];
}

function CalendarSkeleton() {
  return (
    <SkeletonRegion label="Cargando calendario…" className="mt-4">
      <Skeleton className="mb-4 h-7 w-44" />
      <div className="grid grid-cols-7 gap-1.5">
        {Array.from({ length: 35 }, (_, index) => (
          <Skeleton key={index} className="aspect-square" />
        ))}
      </div>
    </SkeletonRegion>
  );
}

const steps = [
  { title: "Elige tu servicio", text: "Novia, quinceañera, social o curso." },
  { title: "Escoge fecha y hora", text: "En el estudio o a domicilio." },
  { title: "Confirma por WhatsApp", text: "Te respondo con la disponibilidad." },
];

/**
 * Booking: service, day, time, place and name become a complete WhatsApp
 * message (never "[fecha]"). Today only exists in the browser, so the
 * calendar resolves it after mount and shows a skeleton meanwhile.
 * `tone` sets the section ground so it alternates with its neighbours.
 */
export function Booking({ tone = "white" }: { tone?: "white" | "cream" }) {
  const nameId = useId();
  const [today, setToday] = useState<Date | null>(null);
  const [visibleMonth, setVisibleMonth] = useState<{ year: number; month: number } | null>(null);
  const [service, setService] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [place, setPlace] = useState<"studio" | "home">("studio");
  const [municipality, setMunicipality] = useState<string | null>(null);
  const [companions, setCompanions] = useState(0);

  useEffect(() => {
    const now = startOfDay(new Date());
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only value
    setToday(now);
    setVisibleMonth({ year: now.getFullYear(), month: now.getMonth() });
  }, []);

  const days = useMemo(() => (visibleMonth ? buildMonth(visibleMonth.year, visibleMonth.month) : []), [visibleMonth]);
  const canGoBack = today && visibleMonth && (visibleMonth.year > today.getFullYear() || visibleMonth.month > today.getMonth());

  const moveMonth = (delta: number) =>
    setVisibleMonth((current) => {
      if (!current) return current;
      const next = new Date(current.year, current.month + delta, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });

  const placeText = place === "studio" ? "En el estudio" : `A domicilio en ${municipality}`;
  const missing = !service
    ? "Elige el servicio"
    : !date
      ? "Elige el día"
      : !time
        ? "Elige la hora"
        : place === "home" && !municipality
          ? "Elige el municipio"
          : !name.trim()
            ? "Escribe tu nombre"
            : null;

  const message = missing
    ? ""
    : [
        `${whatsappGreeting} Quiero agendar una cita:`,
        "",
        `• Servicio: ${service}`,
        `• Fecha: ${longDateFormat.format(date!)}`,
        `• Hora: ${time}`,
        `• Lugar: ${placeText}${place === "home" ? " (domicilio por cotizar)" : ""}`,
        ...(companions > 0 ? [`• Acompañantes: ${companions}`] : []),
        `• Nombre: ${name.trim()}`,
        "",
        "¿Me confirmas la disponibilidad?",
      ].join("\n");

  const summary = [service, date ? capitalize(longDateFormat.format(date)) : null, time, place === "studio" ? "En el estudio" : municipality ? `Domicilio · ${municipality}` : "A domicilio"]
    .filter(Boolean)
    .join(" · ");

  const chip = (active: boolean) =>
    `pressable flex min-h-11 items-center justify-center rounded-full border text-[0.92rem] tabular-nums transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ink ${
      active ? "border-ink bg-ink text-paper" : "border-line bg-white hover:border-ink"
    }`;

  return (
    <section id="agenda" aria-labelledby="booking-title" className={`scroll-mt-28 py-24 md:py-28 ${tone === "cream" ? "bg-marble" : "bg-white"}`}>
      <div className="container-page grid items-center gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">Agenda en línea</p>
          <h2 id="booking-title" className="mt-4 font-display text-[2.3rem] leading-[1.1] md:text-[3rem]">
            Tu cita, lista en <em className="text-nude-deep">menos de un minuto</em>
          </h2>
          <p className="mt-5 max-w-[42ch] text-[1.05rem] leading-relaxed font-light text-ink-soft">
            Sin llamadas ni esperas: eliges y me llega tu solicitud completa por WhatsApp.
          </p>
          <ol className="mt-8 ml-5 border-l border-line-strong">
            {steps.map((step, index) => (
              <li key={step.title} className="relative -ml-[21px] flex gap-4 pb-6 last:pb-0">
                <span
                  className={`flex size-[42px] shrink-0 items-center justify-center rounded-full font-display text-[1.05rem] ${
                    index === 0 ? "bg-ink text-paper" : "border border-line-strong bg-white text-nude-deep"
                  }`}
                >
                  {index + 1}
                </span>
                <span className="pt-1.5">
                  <span className="block font-display text-[1.25rem] leading-snug">{step.title}</span>
                  <span className="block text-[0.95rem] text-ink-soft">{step.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={100} className="rounded-[1.5rem] border border-line bg-white p-5 shadow-lift sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <Select
              label="Servicio"
              options={bookingServices.map((item) => ({ value: item, label: item }))}
              value={service}
              onChange={setService}
              placeholder="Elige el servicio…"
            />
            <div>
              <label htmlFor={nameId} className="mb-2 block text-[0.75rem] tracking-[0.16em] text-ink-soft uppercase">
                Tu nombre
              </label>
              <input
                id={nameId}
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="given-name"
                maxLength={60}
                placeholder="¿Cómo te llamas?"
                className="min-h-12 w-full rounded-xl border border-line-strong bg-blush px-4 text-base"
              />
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-[1.25fr_1fr]">
            <div>
              <p className="text-[0.75rem] tracking-[0.16em] text-ink-soft uppercase">Día</p>
              {!today || !visibleMonth ? (
                <CalendarSkeleton />
              ) : (
                <div className="mt-2">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="font-display text-[1.25rem]" aria-live="polite">
                      {capitalize(monthFormat.format(new Date(visibleMonth.year, visibleMonth.month, 1)))}
                    </p>
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => moveMonth(-1)}
                        disabled={!canGoBack}
                        aria-label="Mes anterior"
                        className="pressable flex size-10 items-center justify-center rounded-full border border-line hover:border-ink disabled:opacity-30"
                      >
                        <ChevronIcon className="size-4 rotate-180" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveMonth(1)}
                        aria-label="Mes siguiente"
                        className="pressable flex size-10 items-center justify-center rounded-full border border-line hover:border-ink"
                      >
                        <ChevronIcon className="size-4" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {weekDays.map((day, index) => (
                      <span key={index} aria-hidden className="pb-1 text-[0.8rem] text-ink-soft">
                        {day}
                      </span>
                    ))}
                    {days.map((day, index) => {
                      if (!day) return <span key={`empty-${index}`} />;
                      const isSunday = day.getDay() === 0;
                      const disabled = day < today || isSunday;
                      const selected = date?.getTime() === day.getTime();
                      const isToday = day.getTime() === today.getTime();
                      return (
                        <button
                          key={day.toISOString()}
                          type="button"
                          disabled={disabled}
                          onClick={() => {
                            setDate(day);
                            setTime(null);
                          }}
                          aria-pressed={selected}
                          aria-label={`${longDateFormat.format(day)}${isSunday ? ", cerrado" : ""}${isToday ? ", hoy" : ""}`}
                          className={`pressable aspect-square rounded-full text-[0.9rem] tabular-nums ${
                            selected ? "bg-ink text-paper" : disabled ? "text-ink-soft/40" : "bg-marble hover:bg-marble-deep"
                          } ${isToday && !selected ? "ring-1 ring-nude-deep" : ""}`}
                        >
                          {day.getDate()}
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-[0.85rem] text-ink-soft">Domingos cerrado. Si tu boda es en domingo, escríbeme.</p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-5">
              <fieldset>
                <legend className="mb-2 text-[0.75rem] tracking-[0.16em] text-ink-soft uppercase">Hora</legend>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <label key={slot} className={`${chip(time === slot)} ${!date ? "cursor-not-allowed opacity-40" : "cursor-pointer"}`}>
                      <input
                        type="radio"
                        name="booking-time"
                        checked={time === slot}
                        disabled={!date}
                        onChange={() => setTime(slot)}
                        className="sr-only"
                      />
                      {slot}
                    </label>
                  ))}
                </div>
                {!date ? <p className="mt-2 text-[0.85rem] text-ink-soft">Primero elige un día.</p> : null}
              </fieldset>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <fieldset>
              <legend className="mb-2 text-[0.75rem] tracking-[0.16em] text-ink-soft uppercase">Lugar</legend>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    ["studio", "En el estudio"],
                    ["home", "A domicilio"],
                  ] as const
                ).map(([value, label]) => (
                  <label key={value} className={`${chip(place === value)} cursor-pointer`}>
                    <input type="radio" name="booking-place" checked={place === value} onChange={() => setPlace(value)} className="sr-only" />
                    {label}
                  </label>
                ))}
              </div>
              {place === "home" ? (
                <Select
                  label="Municipio"
                  options={homeVisitZones.municipalities.map((item) => ({ value: item.name, label: item.name }))}
                  value={municipality}
                  onChange={setMunicipality}
                  placeholder="Elige el municipio…"
                  className="mt-4"
                />
              ) : null}
            </fieldset>

            <div>
              <p className="mb-2 text-[0.75rem] tracking-[0.16em] text-ink-soft uppercase">Acompañantes (opcional)</p>
              <div className="flex w-fit items-center rounded-full border border-line">
                <button
                  type="button"
                  onClick={() => setCompanions((value) => Math.max(0, value - 1))}
                  disabled={companions === 0}
                  aria-label="Quitar un acompañante"
                  className="pressable flex size-11 items-center justify-center rounded-full hover:bg-marble disabled:opacity-30"
                >
                  <MinusIcon className="size-4" />
                </button>
                <output aria-live="polite" aria-label={`Acompañantes: ${companions}`} className="w-8 text-center tabular-nums">
                  {companions}
                </output>
                <button
                  type="button"
                  onClick={() => setCompanions((value) => Math.min(20, value + 1))}
                  aria-label="Agregar un acompañante"
                  className="pressable flex size-11 items-center justify-center rounded-full hover:bg-marble"
                >
                  <PlusIcon className="size-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-marble px-5 py-4" aria-live="polite">
            <p className="text-[0.72rem] tracking-[0.16em] text-ink-soft uppercase">Tu cita</p>
            <p className="font-display text-[1.1rem] leading-snug">{summary || "Elige servicio, día y hora"}</p>
          </div>

          <WhatsAppButton message={message} disabled={Boolean(missing)} disabledLabel={missing ?? undefined} className="mt-5 w-full">
            Confirmar por WhatsApp
          </WhatsAppButton>
        </Reveal>
      </div>
    </section>
  );
}

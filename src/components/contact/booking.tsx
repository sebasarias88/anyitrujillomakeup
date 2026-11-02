"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { ChevronIcon, MinusIcon, PlusIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { Select } from "@/components/ui/select";
import { Skeleton, SkeletonRegion } from "@/components/ui/skeleton";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { bookingServices, homeVisitZones } from "@/lib/site";

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

/**
 * Booking: service, day, time, place and name become a complete WhatsApp
 * message (never "[fecha]"). Today only exists in the browser, so the
 * calendar resolves it after mount and shows a skeleton meanwhile.
 */
export function Booking() {
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
        "Hola Anyi ✨ Quiero agendar una cita:",
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

  return (
    <section id="agenda" aria-labelledby="booking-title" className="scroll-mt-24 bg-marble py-28 md:py-40">
      <div className="container-page">
        <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
          <h2 id="booking-title" className="font-display text-[2.2rem] leading-[1.02] tracking-[-0.01em] md:col-span-6 md:text-[2.75rem]">
            Reserva tu cita
          </h2>
          <p className="max-w-[44ch] text-[1.05rem] leading-relaxed md:col-span-5 md:col-start-8">
            Elige el servicio, el día y la hora. Te llevo a WhatsApp con tu solicitud lista y te confirmo la disponibilidad.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-12 md:gap-6">
          <div className="space-y-8 md:col-span-4">
            <Select
              label="Servicio"
              options={bookingServices.map((item) => ({ value: item, label: item }))}
              value={service}
              onChange={setService}
              placeholder="Elige el servicio…"
            />

            <fieldset>
              <legend className="mb-2 font-semibold">Lugar</legend>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    ["studio", "Estudio"],
                    ["home", "Domicilio"],
                  ] as const
                ).map(([value, label]) => (
                  <label
                    key={value}
                    className={`pressable flex min-h-12 cursor-pointer items-center justify-center font-semibold has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ink ${
                      place === value ? "bg-ink text-paper" : "bg-paper hover:bg-marble-deep"
                    }`}
                  >
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
              <label htmlFor={nameId} className="mb-2 block font-semibold">
                Tu nombre
              </label>
              <input
                id={nameId}
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="given-name"
                maxLength={60}
                className="min-h-13 w-full bg-paper px-4 text-base"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold">Acompañantes</p>
                <p className="text-[0.95rem] text-ink-soft">Opcional</p>
              </div>
              <div className="flex items-center bg-paper">
                <button
                  type="button"
                  onClick={() => setCompanions((value) => Math.max(0, value - 1))}
                  disabled={companions === 0}
                  aria-label="Quitar un acompañante"
                  className="pressable flex size-11 items-center justify-center hover:bg-marble-deep disabled:opacity-30"
                >
                  <MinusIcon className="size-4" />
                </button>
                <output aria-live="polite" aria-label={`Acompañantes: ${companions}`} className="w-8 text-center font-semibold tabular-nums">
                  {companions}
                </output>
                <button
                  type="button"
                  onClick={() => setCompanions((value) => Math.min(20, value + 1))}
                  aria-label="Agregar un acompañante"
                  className="pressable flex size-11 items-center justify-center hover:bg-marble-deep"
                >
                  <PlusIcon className="size-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-4">
            <p className="font-semibold">Día</p>
            {!today || !visibleMonth ? (
              <CalendarSkeleton />
            ) : (
              <div className="mt-2">
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-display text-[1.6rem]" aria-live="polite">
                    {capitalize(monthFormat.format(new Date(visibleMonth.year, visibleMonth.month, 1)))}
                  </p>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => moveMonth(-1)}
                      disabled={!canGoBack}
                      aria-label="Mes anterior"
                      className="pressable flex size-11 items-center justify-center bg-paper hover:bg-marble-deep disabled:opacity-30"
                    >
                      <ChevronIcon className="size-4 rotate-180" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveMonth(1)}
                      aria-label="Mes siguiente"
                      className="pressable flex size-11 items-center justify-center bg-paper hover:bg-marble-deep"
                    >
                      <ChevronIcon className="size-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1.5 text-center">
                  {weekDays.map((day, index) => (
                    <span key={index} aria-hidden className="pb-1 text-[0.95rem] text-ink-soft">
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
                        className={`pressable aspect-square text-[0.95rem] tabular-nums ${
                          selected
                            ? "bg-gold font-semibold"
                            : disabled
                              ? "text-ink-soft/50 line-through"
                              : "bg-paper hover:bg-marble-deep"
                        } ${isToday && !selected ? "font-semibold underline underline-offset-4" : ""}`}
                      >
                        {day.getDate()}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-3 text-[0.95rem] text-ink-soft">Domingos cerrado. Si tu boda es en domingo, escríbeme.</p>
              </div>
            )}
          </div>

          <div className="flex flex-col md:col-span-4">
            <fieldset>
              <legend className="mb-2 font-semibold">Hora</legend>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot) => (
                  <label
                    key={slot}
                    className={`pressable flex min-h-11 items-center justify-center text-[0.95rem] tabular-nums has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ink ${
                      !date ? "cursor-not-allowed opacity-40" : "cursor-pointer"
                    } ${time === slot ? "bg-gold font-semibold" : "bg-paper hover:bg-marble-deep"}`}
                  >
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
              {!date ? <p className="mt-2 text-[0.95rem] text-ink-soft">Primero elige un día.</p> : null}
            </fieldset>

            <div className="mt-auto pt-10">
              <WhatsAppButton message={message} disabled={Boolean(missing)} disabledLabel={missing ?? undefined} className="w-full">
                Solicitar cita por WhatsApp
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

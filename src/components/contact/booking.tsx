"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckIcon, ChevronIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { bookingServices, whatsappUrl } from "@/lib/site";

const weekDays = ["L", "M", "M", "J", "V", "S", "D"];
const timeSlots = ["8:00 a. m.", "9:00 a. m.", "10:00 a. m.", "11:00 a. m.", "12:00 m.", "1:00 p. m.", "2:00 p. m.", "3:00 p. m.", "4:00 p. m.", "5:00 p. m."];

const monthFormat = new Intl.DateTimeFormat("es-CO", { month: "long", year: "numeric" });
const longDateFormat = new Intl.DateTimeFormat("es-CO", { weekday: "long", day: "numeric", month: "long" });

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function buildMonth(year: number, month: number) {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7; // Monday first
  const days = new Date(year, month + 1, 0).getDate();
  return [...Array.from({ length: offset }, () => null), ...Array.from({ length: days }, (_, index) => new Date(year, month, index + 1))];
}

function StepTitle({ number, title, done }: { number: number; title: string; done: boolean }) {
  return (
    <h3 className="flex items-center gap-3 text-sm font-semibold tracking-wide text-ivory">
      <span
        className={`flex size-7 items-center justify-center rounded-full text-xs transition ${
          done ? "bg-nude text-ink" : "border border-line text-sand"
        }`}
      >
        {done ? <CheckIcon className="size-3.5" /> : number}
      </span>
      {title}
    </h3>
  );
}

function CalendarSkeleton() {
  return (
    <div aria-busy="true" className="mt-5">
      <span role="status" className="sr-only">
        Cargando calendario…
      </span>
      <div className="mb-4 h-6 w-40 rounded-full bg-ink-3 motion-safe:animate-pulse" />
      <div className="grid grid-cols-7 gap-1.5">
        {Array.from({ length: 35 }, (_, index) => (
          <div key={index} className="aspect-square rounded-xl bg-ink-3 motion-safe:animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export function Booking() {
  const [today, setToday] = useState<Date | null>(null);
  const [visibleMonth, setVisibleMonth] = useState<{ year: number; month: number } | null>(null);
  const [service, setService] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [place, setPlace] = useState<"Estudio" | "Domicilio">("Estudio");

  // The current date only exists in the browser; resolve it after mount to keep the page static.
  useEffect(() => {
    const now = startOfDay(new Date());
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only value
    setToday(now);
    setVisibleMonth({ year: now.getFullYear(), month: now.getMonth() });
  }, []);

  const days = useMemo(() => (visibleMonth ? buildMonth(visibleMonth.year, visibleMonth.month) : []), [visibleMonth]);

  const canGoBack =
    today && visibleMonth && (visibleMonth.year > today.getFullYear() || visibleMonth.month > today.getMonth());

  const moveMonth = (delta: number) =>
    setVisibleMonth((current) => {
      if (!current) return current;
      const next = new Date(current.year, current.month + delta, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });

  const ready = Boolean(service && date && time && name.trim());

  const message = ready
    ? [
        "Hola Anyi ✨ Quiero agendar una cita:",
        "",
        `• Servicio: ${service}`,
        `• Fecha: ${longDateFormat.format(date!)}`,
        `• Hora: ${time}`,
        `• Lugar: ${place}`,
        `• Nombre: ${name.trim()}`,
        "",
        "¿Me confirmas la disponibilidad?",
      ].join("\n")
    : "";

  return (
    <section id="agenda" aria-labelledby="booking-title" className="bg-ink-2 py-24 md:py-36">
      <div className="container-page">
        <SectionHeading
          id="booking-title"
          eyebrow="Agenda"
          align="center"
          title={
            <>
              Reserva tu cita en <em className="text-gradient-gold">cuatro pasos</em>
            </>
          }
          description="Elige el servicio, el día y la hora que prefieres. Te llevo a WhatsApp con tu solicitud lista y te confirmo la disponibilidad."
        />

        <Reveal className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-line bg-line lg:grid-cols-[1fr_1.1fr_1fr]">
          {/* Step 1: service */}
          <div className="bg-ink p-6 md:p-8">
            <StepTitle number={1} title="¿Qué servicio necesitas?" done={Boolean(service)} />
            <div role="radiogroup" aria-label="Servicio" className="mt-5 flex flex-wrap gap-2">
              {bookingServices.map((item) => (
                <button
                  key={item}
                  type="button"
                  role="radio"
                  aria-checked={service === item}
                  onClick={() => setService(item)}
                  className={`rounded-full border px-4 py-2.5 text-sm transition ${
                    service === item ? "border-nude bg-nude font-semibold text-ink" : "border-line text-sand hover:border-nude/50 hover:text-ivory"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: date */}
          <div className="bg-ink p-6 md:p-8">
            <StepTitle number={2} title="Elige el día" done={Boolean(date)} />
            {!today || !visibleMonth ? (
              <CalendarSkeleton />
            ) : (
              <div className="mt-5">
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-display text-2xl text-ivory">
                    {capitalize(monthFormat.format(new Date(visibleMonth.year, visibleMonth.month, 1)))}
                  </p>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => moveMonth(-1)}
                      disabled={!canGoBack}
                      aria-label="Mes anterior"
                      className="flex size-9 items-center justify-center rounded-full border border-line text-ivory transition hover:border-nude disabled:opacity-30"
                    >
                      <ChevronIcon className="size-4 rotate-180" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveMonth(1)}
                      aria-label="Mes siguiente"
                      className="flex size-9 items-center justify-center rounded-full border border-line text-ivory transition hover:border-nude"
                    >
                      <ChevronIcon className="size-4" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1.5 text-center" role="grid" aria-label="Calendario">
                  {weekDays.map((day, index) => (
                    <span key={index} className="pb-1 text-xs font-semibold text-mute" aria-hidden>
                      {day}
                    </span>
                  ))}
                  {days.map((day, index) => {
                    if (!day) return <span key={`empty-${index}`} />;
                    const isPast = day < today;
                    const isSunday = day.getDay() === 0;
                    const disabled = isPast || isSunday;
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
                        aria-label={`${longDateFormat.format(day)}${isSunday ? ", cerrado" : ""}`}
                        className={`aspect-square rounded-xl text-sm tabular-nums transition ${
                          selected
                            ? "bg-nude font-semibold text-ink"
                            : disabled
                              ? "text-mute/40 line-through decoration-mute/30"
                              : "text-ivory hover:bg-nude/15"
                        } ${isToday && !selected ? "ring-1 ring-nude/60" : ""}`}
                      >
                        {day.getDate()}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-3 text-xs text-mute">Domingos cerrado. Novias con fecha especial: escríbeme.</p>
              </div>
            )}
          </div>

          {/* Steps 3 & 4: time and details */}
          <div className="flex flex-col bg-ink p-6 md:p-8">
            <StepTitle number={3} title="Elige la hora" done={Boolean(time)} />
            <div role="radiogroup" aria-label="Hora" className="mt-5 grid grid-cols-2 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  role="radio"
                  aria-checked={time === slot}
                  disabled={!date}
                  onClick={() => setTime(slot)}
                  className={`rounded-xl border px-3 py-2.5 text-sm tabular-nums transition disabled:cursor-not-allowed disabled:opacity-30 ${
                    time === slot ? "border-nude bg-nude font-semibold text-ink" : "border-line text-sand hover:border-nude/50 hover:text-ivory"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
            {!date ? <p className="mt-2 text-xs text-mute">Primero elige un día.</p> : null}

            <div className="mt-8">
              <StepTitle number={4} title="Tus datos" done={Boolean(name.trim())} />
              <label className="mt-4 block">
                <span className="sr-only">Tu nombre</span>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Tu nombre"
                  autoComplete="given-name"
                  maxLength={60}
                  className="min-h-12 w-full rounded-xl border border-line bg-ink-2 px-4 text-ivory placeholder:text-mute focus:border-nude focus:outline-none"
                />
              </label>
              <div role="radiogroup" aria-label="Lugar" className="mt-3 grid grid-cols-2 gap-2 rounded-full border border-line p-1">
                {(["Estudio", "Domicilio"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    role="radio"
                    aria-checked={place === option}
                    onClick={() => setPlace(option)}
                    className={`min-h-10 rounded-full text-sm font-semibold transition ${
                      place === option ? "bg-nude text-ink" : "text-sand hover:text-ivory"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-8">
              {ready ? (
                <a
                  href={whatsappUrl(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-13 w-full items-center justify-center gap-2.5 rounded-full bg-nude px-6 font-semibold text-ink transition hover:bg-champagne focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nude"
                >
                  <WhatsAppIcon className="size-5" />
                  Solicitar cita por WhatsApp
                </a>
              ) : (
                <p className="flex min-h-13 w-full items-center justify-center rounded-full border border-dashed border-line px-6 text-center text-sm text-mute">
                  Completa los 4 pasos para enviar tu solicitud
                </p>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronIcon } from "./icons";

const weekDays = ["L", "M", "M", "J", "V", "S", "D"];
const monthFormat = new Intl.DateTimeFormat("es-CO", { month: "long", year: "numeric" });
const valueFormat = new Intl.DateTimeFormat("es-CO", { weekday: "short", day: "numeric", month: "long", year: "numeric" });
const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

const toISO = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
const fromISO = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

type DatePickerProps = {
  label: string;
  /** ISO date (YYYY-MM-DD) or "" when empty. */
  value: string;
  onChange: (value: string) => void;
  /** Earliest selectable ISO date. */
  min?: string;
  placeholder?: string;
};

/**
 * Custom date field (never the native picker, which looks different on every
 * phone and shows mm/dd/yyyy): a button that opens a month calendar below it.
 */
export function DatePicker({ label, value, onChange, min, placeholder = "Elige la fecha" }: DatePickerProps) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const base = value ? fromISO(value) : min ? fromISO(min) : null;
  const [month, setMonth] = useState<{ year: number; month: number } | null>(null);
  const view = month ?? (base ? { year: base.getFullYear(), month: base.getMonth() } : null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const minDate = min ? fromISO(min) : null;
  const first = view ? new Date(view.year, view.month, 1) : null;
  const offset = first ? (first.getDay() + 6) % 7 : 0;
  const total = view ? new Date(view.year, view.month + 1, 0).getDate() : 0;
  const canGoBack = view && minDate ? view.year > minDate.getFullYear() || view.month > minDate.getMonth() : true;
  const move = (delta: number) => {
    if (!view) return;
    const next = new Date(view.year, view.month + delta, 1);
    setMonth({ year: next.getFullYear(), month: next.getMonth() });
  };

  return (
    <div ref={root} className="relative">
      <span id={`${id}-label`} className="mb-2 block font-medium">
        {label}
      </span>
      <button
        type="button"
        aria-labelledby={`${id}-label`}
        aria-expanded={open}
        disabled={!view}
        onClick={() => setOpen(!open)}
        className="flex min-h-12 w-full items-center justify-between rounded-xl border border-line-strong bg-blush px-4 text-left text-base disabled:opacity-60"
      >
        <span className={value ? "text-ink" : "text-ink-soft"}>{value ? capitalize(valueFormat.format(fromISO(value))) : placeholder}</span>
        <ChevronIcon className={`size-4 transition-transform duration-200 ${open ? "-rotate-90" : "rotate-90"}`} />
      </button>
      {open && view ? (
        <div className="absolute inset-x-0 top-full z-30 mt-2 rounded-2xl border border-line bg-white p-4 shadow-lift sm:right-auto sm:w-80">
          <div className="mb-2 flex items-center justify-between">
            <p aria-live="polite">{capitalize(monthFormat.format(first!))}</p>
            <div className="flex gap-1.5">
              <button type="button" onClick={() => move(-1)} disabled={!canGoBack} aria-label="Mes anterior" className="pressable flex size-9 items-center justify-center rounded-full border border-line disabled:opacity-30">
                <ChevronIcon className="size-4 rotate-180" />
              </button>
              <button type="button" onClick={() => move(1)} aria-label="Mes siguiente" className="pressable flex size-9 items-center justify-center rounded-full border border-line">
                <ChevronIcon className="size-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {weekDays.map((day, index) => (
              <span key={index} aria-hidden className="pb-1 text-[0.78rem] text-ink-soft">
                {day}
              </span>
            ))}
            {Array.from({ length: offset }, (_, index) => (
              <span key={`empty-${index}`} />
            ))}
            {Array.from({ length: total }, (_, index) => {
              const day = new Date(view.year, view.month, index + 1);
              const iso = toISO(day);
              const disabled = Boolean(minDate && day < minDate);
              const selected = iso === value;
              return (
                <button
                  key={iso}
                  type="button"
                  disabled={disabled}
                  aria-pressed={selected}
                  onClick={() => {
                    onChange(iso);
                    setOpen(false);
                  }}
                  className={`pressable aspect-square rounded-full text-[0.85rem] tabular-nums ${selected ? "bg-ink text-paper" : disabled ? "text-ink-soft/40" : "hover:bg-marble"}`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

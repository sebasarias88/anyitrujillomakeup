"use client";

import { useState } from "react";
import { allSlots, formatDay, shiftISO, useData } from "../store";
import { ActionButton, Card, CardTitle, PageTitle, Toggle, useToast } from "../ui";

const weekdays = [
  { day: 1, label: "Lunes" },
  { day: 2, label: "Martes" },
  { day: 3, label: "Miércoles" },
  { day: 4, label: "Jueves" },
  { day: 5, label: "Viernes" },
  { day: 6, label: "Sábado" },
  { day: 0, label: "Domingo" },
];

export function ScheduleView() {
  const { data, todayISO, mutate } = useData();
  const [draft, setDraft] = useState<Record<number, string[]> | null>(null);
  const [blocked, setBlocked] = useState<string[] | null>(null);
  const { toast, show } = useToast();
  const hours = draft ?? data.availability;
  const blockedDates = blocked ?? data.blockedDates;
  const dirty = draft !== null || blocked !== null;
  const nextDays = Array.from({ length: 28 }, (_, index) => shiftISO(todayISO, index));

  const toggleSlot = (day: number, slot: string) => {
    const current = hours[day] ?? [];
    const next = current.includes(slot) ? current.filter((item) => item !== slot) : allSlots.filter((item) => item === slot || current.includes(item));
    setDraft({ ...hours, [day]: next });
  };

  return (
    <>
      <PageTitle
        eyebrow="Horarios"
        title={
          <>
            Tú decides <em className="text-nude-deep">cuándo</em> trabajar
          </>
        }
        intro="Las clientas solo pueden reservar en las horas que dejes abiertas. Bloquea días de descanso, viajes o bodas completas."
        action={
          <>
            {dirty ? (
              <ActionButton
                variant="ghost"
                onClick={() => {
                  setDraft(null);
                  setBlocked(null);
                }}
              >
                Descartar
              </ActionButton>
            ) : null}
            <ActionButton
              disabled={!dirty}
              loadingText="Guardando"
              onClick={async () => {
                await mutate((current) => ({ ...current, availability: hours, blockedDates }));
                setDraft(null);
                setBlocked(null);
                show("Horarios actualizados en la web");
              }}
            >
              Guardar cambios
            </ActionButton>
          </>
        }
      />
      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <Card>
          <CardTitle title="Horario semanal" hint="Toca una hora para abrirla o cerrarla" />
          <ul className="divide-y divide-line">
            {weekdays.map(({ day, label }) => {
              const open = (hours[day] ?? []).length > 0;
              return (
                <li key={day} className="py-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-display text-[1.1rem] text-ink">{label}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-[0.8rem] text-ink-soft">{open ? `${hours[day].length} horas` : "Cerrado"}</span>
                      <Toggle checked={open} label={`Abrir ${label}`} onChange={(value) => setDraft({ ...hours, [day]: value ? allSlots.slice(0, 10) : [] })} />
                    </div>
                  </div>
                  {open ? (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {allSlots.map((slot) => {
                        const active = hours[day].includes(slot);
                        return (
                          <button
                            key={slot}
                            type="button"
                            aria-pressed={active}
                            onClick={() => toggleSlot(day, slot)}
                            className={`pressable min-h-8 rounded-full px-3 text-[0.75rem] ${active ? "bg-nude-field text-nude-deep" : "border border-dashed border-line-strong text-ink-soft/70"}`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </Card>
        <Card>
          <CardTitle title="Bloquear días" hint="Próximas 4 semanas. Los días bloqueados no aparecen para reservar." />
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {nextDays.map((day) => {
              const isBlocked = blockedDates.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  aria-pressed={isBlocked}
                  onClick={() => setBlocked(isBlocked ? blockedDates.filter((item) => item !== day) : [...blockedDates, day])}
                  className={`pressable min-h-12 rounded-xl px-2 text-[0.75rem] ${
                    isBlocked ? "bg-ink text-paper line-through decoration-paper/50" : "border border-line text-ink hover:border-ink"
                  }`}
                >
                  {formatDay(day)}
                </button>
              );
            })}
          </div>
          <p className="mt-4 text-[0.8rem] text-ink-soft">{blockedDates.length ? `${blockedDates.length} día(s) bloqueado(s).` : "No tienes días bloqueados."}</p>
        </Card>
      </div>
      {toast}
    </>
  );
}

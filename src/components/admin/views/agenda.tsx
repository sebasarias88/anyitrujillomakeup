"use client";

import { useState } from "react";
import { ChevronIcon } from "@/components/ui/icons";
import { PlusIcon } from "../icons";
import { byDateTime, clientName, fromISO, shiftISO, staffOf, useData } from "../store";
import { ActionButton, Card, PageTitle, useToast } from "../ui";
import { AppointmentDetail, NewAppointmentModal } from "./shared";

const weekdayFormat = new Intl.DateTimeFormat("es-CO", { weekday: "short" });
const rangeFormat = new Intl.DateTimeFormat("es-CO", { day: "numeric", month: "long" });

export function AgendaView() {
  const { data, todayISO } = useData();
  const [offset, setOffset] = useState(0);
  const [detail, setDetail] = useState<string | null>(null);
  const [creating, setCreating] = useState<string | null>(null);
  const [staffFilter, setStaffFilter] = useState<string>("todas");
  const { toast, show } = useToast();

  // Week starts on Monday.
  const todayDate = fromISO(todayISO);
  const monday = shiftISO(todayISO, -((todayDate.getDay() + 6) % 7) + offset * 7);
  const days = Array.from({ length: 7 }, (_, index) => shiftISO(monday, index));
  const visible = data.appointments.filter((item) => item.status !== "cancelada" && (staffFilter === "todas" || item.staffId === staffFilter));
  const blocked = new Set(data.blockedDates);

  return (
    <>
      <PageTitle
        eyebrow="Agenda"
        title={
          <>
            Tu <em className="text-nude-deep">semana</em>
          </>
        }
        intro={`${rangeFormat.format(fromISO(days[0]))} – ${rangeFormat.format(fromISO(days[6]))}`}
        action={
          <>
            <div className="flex items-center rounded-full border border-line bg-paper">
              <button type="button" aria-label="Semana anterior" onClick={() => setOffset(offset - 1)} className="grid size-11 place-items-center rounded-full hover:bg-marble">
                <ChevronIcon className="size-4 rotate-180" />
              </button>
              <button type="button" onClick={() => setOffset(0)} className="min-h-11 px-3 text-[0.8rem] text-ink">
                Hoy
              </button>
              <button type="button" aria-label="Semana siguiente" onClick={() => setOffset(offset + 1)} className="grid size-11 place-items-center rounded-full hover:bg-marble">
                <ChevronIcon className="size-4" />
              </button>
            </div>
            <ActionButton onClick={() => setCreating(todayISO)}>
              <PlusIcon className="size-4" />
              Nueva cita
            </ActionButton>
          </>
        }
      />

      <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto">
        {[{ id: "todas", name: "Todo el equipo", color: "#1e1a18" }, ...data.staff].map((member) => (
          <button
            key={member.id}
            type="button"
            onClick={() => setStaffFilter(member.id)}
            className={`pressable inline-flex min-h-9 shrink-0 items-center gap-2 rounded-full px-3.5 text-[0.8rem] ${
              staffFilter === member.id ? "bg-ink text-paper" : "border border-line bg-paper text-ink-soft hover:border-ink"
            }`}
          >
            <span aria-hidden className="size-2 rounded-full" style={{ backgroundColor: member.color }} />
            {member.name}
          </button>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-7">
        {days.map((day) => {
          const list = visible.filter((item) => item.date === day).sort(byDateTime);
          const isToday = day === todayISO;
          const closed = blocked.has(day) || data.availability[fromISO(day).getDay()]?.length === 0;
          return (
            <Card key={day} className={`!p-3 md:min-h-[22rem] ${isToday ? "!border-nude ring-1 ring-nude" : ""} ${day < todayISO ? "opacity-70" : ""}`}>
              <div className="mb-3 flex items-center justify-between md:flex-col md:items-start">
                <p className="eyebrow text-ink-soft">{weekdayFormat.format(fromISO(day)).replace(".", "")}</p>
                <p className={`font-display text-[1.4rem] leading-none ${isToday ? "text-nude-deep" : "text-ink"}`}>
                  {fromISO(day).getDate()}
                  {isToday ? <span className="ml-2 align-middle font-sans text-[0.68rem] tracking-[0.08em] uppercase">hoy</span> : null}
                </p>
              </div>
              {closed ? <p className="mb-2 rounded-lg bg-marble px-2 py-1 text-center text-[0.72rem] text-ink-soft">Cerrado</p> : null}
              <ul className="space-y-2">
                {list.map((item) => {
                  const member = staffOf(data, item.staffId);
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => setDetail(item.id)}
                        className="pressable w-full rounded-lg border-l-[3px] bg-blush px-2.5 py-2 text-left hover:bg-nude-field"
                        style={{ borderLeftColor: member?.color }}
                      >
                        <p className="text-[0.72rem] text-ink-soft tabular-nums">
                          {item.time}
                          {item.status === "pendiente" ? <span className="ml-1 text-[#7a5a00]">· por confirmar</span> : null}
                        </p>
                        <p className="truncate text-[0.82rem] text-ink">{clientName(data, item.clientId)}</p>
                        <p className="truncate text-[0.72rem] text-ink-soft">{item.service}</p>
                      </button>
                    </li>
                  );
                })}
              </ul>
              {!closed && day >= todayISO ? (
                <button
                  type="button"
                  onClick={() => setCreating(day)}
                  className="mt-2 flex min-h-9 w-full items-center justify-center gap-1 rounded-lg border border-dashed border-line-strong text-[0.75rem] text-ink-soft hover:border-ink hover:text-ink"
                >
                  <PlusIcon className="size-3.5" /> Agregar
                </button>
              ) : null}
            </Card>
          );
        })}
      </div>

      <AppointmentDetail id={detail} onClose={() => setDetail(null)} onToast={show} />
      {creating ? <NewAppointmentModal key={creating} open defaultDate={creating} onClose={() => setCreating(null)} onToast={show} /> : null}
      {toast}
    </>
  );
}

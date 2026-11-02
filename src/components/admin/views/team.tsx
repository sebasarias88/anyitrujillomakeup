"use client";

import { useState } from "react";
import { formatCOP } from "@/lib/site";
import { byDateTime, clientName, formatDay, shiftISO, useData } from "../store";
import { Avatar, Card, PageTitle, Tag, useToast } from "../ui";
import { AppointmentDetail } from "./shared";

export function TeamView() {
  const { data, todayISO } = useData();
  const [detail, setDetail] = useState<string | null>(null);
  const { toast, show } = useToast();
  const weekEnd = shiftISO(todayISO, 7);

  return (
    <>
      <PageTitle
        eyebrow="Equipo"
        title={
          <>
            Tu <em className="text-nude-deep">equipo</em>
          </>
        }
        intro="Cada maquilladora ve solo sus citas. Tú ves todo: quién atiende a quién y cuánto genera cada una."
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {data.staff.map((member) => {
          const mine = data.appointments.filter((item) => item.staffId === member.id && item.status !== "cancelada");
          const week = mine.filter((item) => item.date >= todayISO && item.date <= weekEnd).sort(byDateTime);
          const generated = mine.filter((item) => item.status === "completada").reduce((sum, item) => sum + item.price, 0);
          return (
            <Card key={member.id} className="flex flex-col">
              <div className="flex items-center gap-3">
                <Avatar name={member.name} color={member.color} />
                <div>
                  <p className="text-ink">{member.name}</p>
                  <p className="text-[0.8rem] text-ink-soft">{member.role}</p>
                </div>
                {member.id === "anyi" ? <span className="ml-auto"><Tag>Dueña</Tag></span> : null}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-blush px-3 py-3">
                  <p className="eyebrow text-ink-soft">Esta semana</p>
                  <p className="mt-1 font-display text-[1.4rem] text-ink">{week.length} citas</p>
                </div>
                <div className="rounded-xl bg-blush px-3 py-3">
                  <p className="eyebrow text-ink-soft">Ha generado</p>
                  <p className="mt-1 font-display text-[1.1rem] text-ink tabular-nums">{formatCOP(generated)}</p>
                </div>
              </div>
              <p className="eyebrow mt-5 text-ink-soft">Próximas citas</p>
              <ul className="mt-2 flex-1 space-y-1.5">
                {week.slice(0, 4).map((item) => (
                  <li key={item.id}>
                    <button type="button" onClick={() => setDetail(item.id)} className="flex w-full justify-between gap-3 rounded-lg px-2 py-1.5 text-left text-[0.85rem] hover:bg-blush">
                      <span className="truncate text-ink">{clientName(data, item.clientId)}</span>
                      <span className="shrink-0 text-ink-soft">{formatDay(item.date)} · {item.time}</span>
                    </button>
                  </li>
                ))}
                {!week.length ? <li className="text-[0.85rem] text-ink-soft">Sin citas esta semana.</li> : null}
              </ul>
            </Card>
          );
        })}
      </div>
      <AppointmentDetail id={detail} onClose={() => setDetail(null)} onToast={show} />
      {toast}
    </>
  );
}

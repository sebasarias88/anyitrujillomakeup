"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatCOP } from "@/lib/site";
import { PlusIcon } from "../icons";
import { balance, byDateTime, clientName, formatDay, fromISO, shiftISO, useData } from "../store";
import { ActionButton, Card, CardTitle, EmptyState, PageTitle, Stat, useToast } from "../ui";
import { AppointmentDetail, AppointmentRow, NewAppointmentModal } from "./shared";

const monthFormat = new Intl.DateTimeFormat("es-CO", { month: "short" });
/** Earlier months for the demo chart; the current month is computed from the agenda. */
const previousMonths = [5_400_000, 6_150_000, 5_900_000, 7_300_000, 8_050_000];

const compactCOP = (value: number) => (value >= 1_000_000 ? `$${(value / 1_000_000).toLocaleString("es-CO", { maximumFractionDigits: 1 })} M` : formatCOP(value));

export function DashboardView() {
  const { data, today, todayISO } = useData();
  const [detail, setDetail] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const { toast, show } = useToast();

  const stats = useMemo(() => {
    const monthKey = todayISO.slice(0, 7);
    const active = data.appointments.filter((item) => item.status !== "cancelada");
    const thisMonth = active.filter((item) => item.date.startsWith(monthKey));
    const collected = thisMonth.reduce((sum, item) => sum + item.paid, 0);
    const pendingBalance = active.filter((item) => item.date >= todayISO).reduce((sum, item) => sum + balance(item), 0);
    const todayList = active.filter((item) => item.date === todayISO).sort(byDateTime);
    const toConfirm = data.appointments.filter((item) => item.status === "pendiente");
    const weekEnd = shiftISO(todayISO, 7);
    const upcoming = active.filter((item) => item.date > todayISO && item.date <= weekEnd).sort(byDateTime);
    const brides = active.filter((item) => item.date >= todayISO && item.service.startsWith("Novia")).sort(byDateTime);
    const byService = new Map<string, number>();
    for (const item of active) byService.set(item.service, (byService.get(item.service) ?? 0) + item.price);
    const top = [...byService.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
    return { collected, pendingBalance, todayList, toConfirm, upcoming, brides, top };
  }, [data, todayISO]);

  const months = useMemo(
    () =>
      [...previousMonths, stats.collected].map((total, index) => {
        const date = new Date(today.getFullYear(), today.getMonth() - (5 - index), 1);
        return { label: ((m) => m.charAt(0).toUpperCase() + m.slice(1))(monthFormat.format(date).replace(".", "")), total, current: index === 5 };
      }),
    [stats.collected, today],
  );

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Buenos días" : hour < 19 ? "Buenas tardes" : "Buenas noches";
  const topMax = stats.top[0]?.[1] ?? 1;

  return (
    <>
      <PageTitle
        eyebrow="Resumen"
        title={
          <>
            {greeting}, <em className="text-nude-deep">Anyi</em>
          </>
        }
        intro={
          stats.todayList.length
            ? `Hoy tienes ${stats.todayList.length} cita${stats.todayList.length > 1 ? "s" : ""} y ${stats.toConfirm.length} solicitud${stats.toConfirm.length === 1 ? "" : "es"} por confirmar.`
            : "Hoy no tienes citas. Buen día para crear contenido ✨"
        }
        action={
          <ActionButton onClick={() => setCreating(true)}>
            <PlusIcon className="size-4" />
            Nueva cita
          </ActionButton>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <Stat label="Citas hoy" value={stats.todayList.length} note={`${stats.upcoming.length} más esta semana`} />
        <Stat label="Cobrado este mes" value={compactCOP(stats.collected)} note={stats.collected >= previousMonths[4] ? "Por encima del mes pasado" : "Vas camino a tu meta"} trend={stats.collected >= previousMonths[4] ? "up" : undefined} />
        <Stat label="Saldos por cobrar" value={compactCOP(stats.pendingBalance)} note="De citas próximas" />
        <Stat label="Por confirmar" value={stats.toConfirm.length} note={stats.toConfirm.length ? "Responde pronto 💬" : "Todo al día"} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.55fr_1fr]">
        <Card>
          <CardTitle title="Agenda de hoy" action={<Link href="/admin/agenda" className="text-[0.82rem] text-nude-deep underline underline-offset-4">Ver semana</Link>} />
          {stats.todayList.length ? (
            <ul className="-my-4 divide-y divide-line @container">
              {stats.todayList.map((item) => (
                <AppointmentRow key={item.id} appointment={item} onOpen={() => setDetail(item.id)} onToast={show} />
              ))}
            </ul>
          ) : (
            <EmptyState title="Día libre" text="No hay citas para hoy. Las nuevas reservas aparecerán aquí." />
          )}
        </Card>

        <Card>
          <CardTitle title="Ingresos" hint="Cobrado por mes, últimos 6 meses" />
          <IncomeChart months={months} />
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card>
          <CardTitle title="Próximas novias" hint="Para preparar con tiempo" />
          {stats.brides.length ? (
            <ul className="space-y-3">
              {stats.brides.slice(0, 4).map((item) => (
                <li key={item.id}>
                  <button type="button" onClick={() => setDetail(item.id)} className="flex w-full items-center gap-3 rounded-xl border border-line px-3 py-2.5 text-left hover:border-ink">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-nude-field text-center leading-none text-nude-deep">
                      <span>
                        <span className="block font-display text-[1.1rem]">{fromISO(item.date).getDate()}</span>
                        <span className="text-[0.62rem] uppercase">{formatDay(item.date).split(" ").pop()}</span>
                      </span>
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[0.92rem] text-ink">{clientName(data, item.clientId)}</span>
                      <span className="block truncate text-[0.78rem] text-ink-soft">
                        {item.service.split(" · ")[0]} · {item.companions} acomp. · saldo {formatCOP(balance(item))}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState title="Sin novias próximas" text="Cuando una novia reserve aparecerá aquí." />
          )}
        </Card>

        <Card>
          <CardTitle title="Servicios que más venden" hint="Por valor total" />
          <ul className="space-y-3.5">
            {stats.top.map(([name, total]) => (
              <li key={name}>
                <div className="flex justify-between gap-3 text-[0.85rem]">
                  <span className="truncate text-ink">{name}</span>
                  <span className="shrink-0 text-ink-soft tabular-nums">{compactCOP(total)}</span>
                </div>
                <div className="mt-1.5 h-1.5 rounded-full bg-marble">
                  <div className="h-full rounded-full bg-nude-deep" style={{ width: `${Math.max((total / topMax) * 100, 6)}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardTitle title="Por confirmar" action={<Link href="/admin/citas" className="text-[0.82rem] text-nude-deep underline underline-offset-4">Ver todas</Link>} />
          {stats.toConfirm.length ? (
            <ul className="-my-4 divide-y divide-line @container">
              {stats.toConfirm.slice(0, 3).map((item) => (
                <AppointmentRow key={item.id} appointment={item} showDate onOpen={() => setDetail(item.id)} onToast={show} />
              ))}
            </ul>
          ) : (
            <EmptyState title="¡Todo al día!" text="No tienes solicitudes pendientes." />
          )}
        </Card>
      </div>

      <AppointmentDetail id={detail} onClose={() => setDetail(null)} onToast={show} />
      <NewAppointmentModal open={creating} onClose={() => setCreating(false)} onToast={show} />
      {toast}
    </>
  );
}

function IncomeChart({ months }: { months: { label: string; total: number; current: boolean }[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(...months.map((month) => month.total), 1);
  const ceiling = Math.ceil(max / 2_000_000) * 2_000_000;
  const shown = hover ?? months.length - 1;

  return (
    <figure>
      <div className="mb-4">
        <p className="text-[0.8rem] text-ink-soft">{months[shown].label}{months[shown].current ? " (en curso)" : ""}</p>
        <p className="font-display text-[1.7rem] leading-tight text-ink tabular-nums">{formatCOP(months[shown].total)}</p>
      </div>
      <div className="relative h-48">
        {[0, 0.5, 1].map((line) => (
          <div key={line} className="absolute inset-x-0 border-t border-line" style={{ bottom: `${line * 100}%` }}>
            <span className="absolute -top-2.5 right-0 bg-paper pl-1 text-[0.68rem] text-ink-soft tabular-nums">{line ? compactCOP(ceiling * line) : ""}</span>
          </div>
        ))}
        <div className="absolute inset-0 flex items-end gap-[2px] pr-12">
          {months.map((month, index) => (
            <button
              key={month.label + index}
              type="button"
              aria-label={`${month.label}: ${formatCOP(month.total)}`}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(index)}
              onBlur={() => setHover(null)}
              className="group flex h-full flex-1 items-end justify-center"
            >
              <span
                className={`block w-full max-w-9 rounded-t-[4px] transition-colors ${
                  index === shown ? "bg-nude-deep" : month.current ? "bg-nude" : "bg-[#e2cbb8] group-hover:bg-nude"
                }`}
                style={{ height: `${(month.total / ceiling) * 100}%` }}
              />
            </button>
          ))}
        </div>
      </div>
      <div className="mt-2 flex gap-[2px] pr-12">
        {months.map((month, index) => (
          <span key={month.label + index} className={`flex-1 text-center text-[0.72rem] ${index === shown ? "text-ink" : "text-ink-soft"}`}>
            {month.label}
          </span>
        ))}
      </div>
      <figcaption className="sr-only">Ingresos por mes: {months.map((month) => `${month.label} ${formatCOP(month.total)}`).join(", ")}</figcaption>
    </figure>
  );
}

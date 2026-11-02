"use client";

import { useMemo, useState } from "react";
import { PlusIcon, SearchIcon } from "../icons";
import { byDateTime, clientName, useData, type AppointmentStatus } from "../store";
import { ActionButton, Card, EmptyState, PageTitle, Segmented, useToast } from "../ui";
import { AppointmentDetail, AppointmentRow, NewAppointmentModal } from "./shared";

type Filter = "proximas" | AppointmentStatus | "todas";

export function AppointmentsView() {
  const { data, todayISO } = useData();
  // The bell links here with ?estado=pendiente. This view only renders in the browser (after the data loads).
  const [filter, setFilter] = useState<Filter>(() =>
    typeof window !== "undefined" && new URLSearchParams(window.location.search).get("estado") === "pendiente" ? "pendiente" : "proximas",
  );
  const [query, setQuery] = useState("");
  const [detail, setDetail] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const { toast, show } = useToast();

  const counts = useMemo(() => {
    const result: Record<Filter, number> = { proximas: 0, pendiente: 0, confirmada: 0, completada: 0, cancelada: 0, todas: data.appointments.length };
    for (const item of data.appointments) {
      result[item.status] += 1;
      if (item.date >= todayISO && item.status !== "cancelada") result.proximas += 1;
    }
    return result;
  }, [data.appointments, todayISO]);

  const list = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return data.appointments
      .filter((item) => (filter === "todas" ? true : filter === "proximas" ? item.date >= todayISO && item.status !== "cancelada" : item.status === filter))
      .filter((item) => !needle || clientName(data, item.clientId).toLowerCase().includes(needle) || item.service.toLowerCase().includes(needle))
      .sort((a, b) => (filter === "completada" || filter === "todas" ? byDateTime(b, a) : byDateTime(a, b)));
  }, [data, filter, query, todayISO]);

  return (
    <>
      <PageTitle
        eyebrow="Citas"
        title={
          <>
            Todas tus <em className="text-nude-deep">reservas</em>
          </>
        }
        intro="Las reservas de la web llegan aquí como “por confirmar”. Confírmalas con un toque."
        action={
          <ActionButton onClick={() => setCreating(true)}>
            <PlusIcon className="size-4" />
            Nueva cita
          </ActionButton>
        }
      />
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <Segmented
          label="Filtrar citas"
          value={filter}
          onChange={setFilter}
          options={[
            { value: "proximas", label: "Próximas", count: counts.proximas },
            { value: "pendiente", label: "Por confirmar", count: counts.pendiente },
            { value: "confirmada", label: "Confirmadas", count: counts.confirmada },
            { value: "completada", label: "Completadas", count: counts.completada },
            { value: "cancelada", label: "Canceladas", count: counts.cancelada },
          ]}
        />
        <label className="relative block lg:w-72">
          <span className="sr-only">Buscar</span>
          <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-soft" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar clienta o servicio"
            className="min-h-11 w-full rounded-full border border-line bg-paper pr-4 pl-11 text-[0.9rem] outline-none focus:border-ink"
          />
        </label>
      </div>
      <Card className="!py-2">
        {list.length ? (
          <ul className="divide-y divide-line @container">
            {list.map((item) => (
              <AppointmentRow key={item.id} appointment={item} showDate onOpen={() => setDetail(item.id)} onToast={show} />
            ))}
          </ul>
        ) : (
          <div className="py-4">
            <EmptyState title="No hay citas aquí" text={query ? "Prueba con otro nombre o servicio." : "Cuando haya citas en este estado las verás aquí."} />
          </div>
        )}
      </Card>
      <AppointmentDetail id={detail} onClose={() => setDetail(null)} onToast={show} />
      <NewAppointmentModal open={creating} onClose={() => setCreating(false)} onToast={show} />
      {toast}
    </>
  );
}

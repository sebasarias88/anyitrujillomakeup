"use client";

import { useMemo, useState } from "react";
import { formatCOP } from "@/lib/site";
import { balance, byDateTime, clientName, formatDay, useData } from "../store";
import { ActionButton, Card, CardTitle, EmptyState, PageTitle, Segmented, Stat, useToast } from "../ui";
import { AppointmentDetail } from "./shared";

type Tab = "saldos" | "pagos";

export function SalesView() {
  const { data, todayISO } = useData();
  const [tab, setTab] = useState<Tab>("saldos");
  const [detail, setDetail] = useState<string | null>(null);
  const { toast, show } = useToast();

  const summary = useMemo(() => {
    const month = todayISO.slice(0, 7);
    const active = data.appointments.filter((item) => item.status !== "cancelada");
    const monthItems = active.filter((item) => item.date.startsWith(month));
    const collected = monthItems.reduce((sum, item) => sum + item.paid, 0);
    const sold = monthItems.reduce((sum, item) => sum + item.price, 0);
    const owed = active.filter((item) => balance(item) > 0).sort(byDateTime);
    const owedTotal = owed.reduce((sum, item) => sum + balance(item), 0);
    const paid = active.filter((item) => item.paid > 0).sort((a, b) => byDateTime(b, a));
    const done = active.filter((item) => item.status === "completada");
    const average = done.length ? Math.round(done.reduce((sum, item) => sum + item.price, 0) / done.length) : 0;
    return { collected, sold, owed, owedTotal, paid, average };
  }, [data.appointments, todayISO]);

  const exportCSV = () => {
    const rows = [["Fecha", "Clienta", "Servicio", "Total", "Abonado", "Saldo", "Estado"]];
    for (const item of data.appointments) {
      rows.push([item.date, clientName(data, item.clientId), item.service, String(item.price), String(item.paid), String(balance(item)), item.status]);
    }
    const csv = rows.map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([`﻿${csv}`], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `ventas-anyi-${todayISO}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    show("Reporte descargado");
  };

  const list = tab === "saldos" ? summary.owed : summary.paid;

  return (
    <>
      <PageTitle
        eyebrow="Ventas y abonos"
        title={
          <>
            Tus <em className="text-nude-deep">números</em>, claros
          </>
        }
        intro="Lleva el control de abonos y saldos sin cuadernos ni capturas de pantalla."
        action={
          <ActionButton variant="outline" onClick={exportCSV}>
            Descargar reporte (Excel)
          </ActionButton>
        }
      />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <Stat label="Cobrado este mes" value={formatCOP(summary.collected)} />
        <Stat label="Vendido este mes" value={formatCOP(summary.sold)} note="Incluye saldos por cobrar" />
        <Stat label="Saldos pendientes" value={formatCOP(summary.owedTotal)} note={`${summary.owed.length} citas con saldo`} />
        <Stat label="Ticket promedio" value={formatCOP(summary.average)} note="Por cita completada" />
      </div>
      <Card className="mt-4">
        <CardTitle title={tab === "saldos" ? "Saldos por cobrar" : "Pagos recibidos"} action={<Segmented label="Vista" value={tab} onChange={setTab} options={[{ value: "saldos", label: "Saldos" }, { value: "pagos", label: "Pagos" }]} />} />
        {list.length ? (
          <div className="-mx-5 overflow-x-auto sm:-mx-6">
            <table className="w-full min-w-[40rem] text-left text-[0.88rem]">
              <thead>
                <tr className="border-y border-line bg-blush text-ink-soft">
                  {["Fecha", "Clienta", "Servicio", "Total", "Abonado", "Saldo", ""].map((head) => (
                    <th key={head} className="px-5 py-2.5 font-normal first:pl-5 sm:first:pl-6">
                      <span className="eyebrow">{head}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {list.map((item) => (
                  <tr key={item.id} className="hover:bg-blush">
                    <td className="px-5 py-3 whitespace-nowrap text-ink-soft sm:pl-6">{formatDay(item.date)}</td>
                    <td className="px-5 py-3 whitespace-nowrap text-ink">{clientName(data, item.clientId)}</td>
                    <td className="max-w-[14rem] truncate px-5 py-3 text-ink-soft">{item.service}</td>
                    <td className="px-5 py-3 tabular-nums">{formatCOP(item.price)}</td>
                    <td className="px-5 py-3 text-[#2f6b45] tabular-nums">{formatCOP(item.paid)}</td>
                    <td className={`px-5 py-3 tabular-nums ${balance(item) ? "text-nude-deep" : "text-ink-soft"}`}>{formatCOP(balance(item))}</td>
                    <td className="px-5 py-3 text-right sm:pr-6">
                      <ActionButton size="sm" variant="outline" onClick={() => setDetail(item.id)}>
                        {tab === "saldos" ? "Abonar" : "Ver"}
                      </ActionButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState title="Sin saldos pendientes" text="Todas tus clientas están al día 🎉" />
        )}
      </Card>
      <AppointmentDetail id={detail} onClose={() => setDetail(null)} onToast={show} />
      {toast}
    </>
  );
}

"use client";

import { useMemo, useState } from "react";
import { Select } from "@/components/ui/select";
import { WhatsAppIcon } from "@/components/ui/icons";
import { formatCOP } from "@/lib/site";
import {
  allSlots, balance, clientName, formatDay, formatLongDay, shiftISO, staffOf, useData,
  type Appointment, type AdminData, type AppointmentStatus, type Place,
} from "../store";
import { ActionButton, Avatar, Field, Modal, StatusBadge, inputClass } from "../ui";

export const clientWhatsapp = (phone: string, text: string) => `https://wa.me/57${phone}?text=${encodeURIComponent(text)}`;

export function reminderText(data: AdminData, appointment: Appointment) {
  const first = clientName(data, appointment.clientId).split(" ")[0];
  return `Hola ${first} 💕 Te recuerdo tu cita de ${appointment.service} el ${formatLongDay(appointment.date).toLowerCase()} a las ${appointment.time}${
    appointment.place === "estudio" ? " en el estudio (Calle 23 #37-25, local 5)" : ` a domicilio en ${appointment.municipality}`
  }. ¡Te espero! Anyi Trujillo Beauty Studio`;
}

const setStatus = (id: string, status: AppointmentStatus) => (data: AdminData): AdminData => ({
  ...data,
  appointments: data.appointments.map((item) =>
    item.id === id ? { ...item, status, paid: status === "completada" ? item.price : item.paid } : item,
  ),
});

/** One appointment in a list: time, client, service, status and quick actions. */
export function AppointmentRow({ appointment, onOpen, showDate = false, onToast }: { appointment: Appointment; onOpen: () => void; showDate?: boolean; onToast?: (message: string) => void }) {
  const { data, mutate } = useData();
  const member = staffOf(data, appointment.staffId);
  const client = data.clients.find((item) => item.id === appointment.clientId);
  return (
    <li className="flex flex-col gap-3 py-4 @xl:flex-row @xl:items-center">
      <button type="button" onClick={onOpen} className="flex min-w-0 flex-1 items-center gap-4 text-left">
        <div className="w-[5.6rem] shrink-0">
          {showDate ? <p className="text-[0.75rem] text-ink-soft">{formatDay(appointment.date)}</p> : null}
          <p className="font-display text-[1.05rem] whitespace-nowrap text-ink tabular-nums">{appointment.time}</p>
        </div>
        <span aria-hidden className="h-10 w-[3px] shrink-0 rounded-full" style={{ backgroundColor: member?.color }} />
        <div className="min-w-0">
          <p className="truncate font-medium text-ink">{client?.name}</p>
          <p className="truncate text-[0.85rem] text-ink-soft">
            {appointment.service}
            {appointment.companions ? ` · +${appointment.companions} acompañante${appointment.companions > 1 ? "s" : ""}` : ""}
            {appointment.place === "domicilio" ? ` · ${appointment.municipality}` : ""}
          </p>
        </div>
      </button>
      <div className="flex flex-wrap items-center gap-2 @md:pl-[6.6rem] @xl:pl-0">
        <StatusBadge status={appointment.status} />
        {appointment.status === "pendiente" ? (
          <ActionButton
            size="sm"
            loadingText="Confirmando"
            onClick={async () => {
              await mutate(setStatus(appointment.id, "confirmada"));
              onToast?.("Cita confirmada");
            }}
          >
            Confirmar
          </ActionButton>
        ) : null}
        {client && (appointment.status === "pendiente" || appointment.status === "confirmada") ? (
          <a
            href={clientWhatsapp(client.phone, reminderText(data, appointment))}
            target="_blank"
            rel="noreferrer"
            aria-label={`Enviar recordatorio a ${client.name}`}
            className="pressable grid size-9 place-items-center rounded-full border border-line text-[#1f8f55] hover:border-[#1f8f55]"
          >
            <WhatsAppIcon className="size-4" />
          </a>
        ) : null}
      </div>
    </li>
  );
}

/** Detail sheet of one appointment with every action Anyi needs. */
export function AppointmentDetail({ id, onClose, onToast }: { id: string | null; onClose: () => void; onToast: (message: string) => void }) {
  const { data, mutate } = useData();
  const appointment = data.appointments.find((item) => item.id === id);
  const [deposit, setDeposit] = useState("");
  if (!appointment) return <Modal open={false} onClose={onClose} title="">{null}</Modal>;
  const client = data.clients.find((item) => item.id === appointment.clientId);
  const member = staffOf(data, appointment.staffId);
  const due = balance(appointment);

  const rows: [string, string][] = [
    ["Fecha", formatLongDay(appointment.date)],
    ["Hora", appointment.time],
    ["Lugar", appointment.place === "estudio" ? "En el estudio" : `A domicilio · ${appointment.municipality}`],
    ["Atiende", member?.name ?? "—"],
    ["Acompañantes", appointment.companions ? String(appointment.companions) : "Ninguna"],
  ];

  return (
    <Modal
      open
      onClose={() => {
        setDeposit("");
        onClose();
      }}
      title="Detalle de la cita"
      footer={
        <>
          {appointment.status !== "cancelada" && appointment.status !== "completada" ? (
            <ActionButton
              variant="danger"
              loadingText="Cancelando"
              onClick={async () => {
                await mutate(setStatus(appointment.id, "cancelada"));
                onToast("Cita cancelada");
              }}
            >
              Cancelar cita
            </ActionButton>
          ) : null}
          {appointment.status === "pendiente" ? (
            <ActionButton
              loadingText="Confirmando"
              onClick={async () => {
                await mutate(setStatus(appointment.id, "confirmada"));
                onToast("Cita confirmada");
              }}
            >
              Confirmar
            </ActionButton>
          ) : null}
          {appointment.status === "confirmada" ? (
            <ActionButton
              loadingText="Guardando"
              onClick={async () => {
                await mutate(setStatus(appointment.id, "completada"));
                onToast("Cita completada y pagada");
              }}
            >
              Marcar como hecha
            </ActionButton>
          ) : null}
        </>
      }
    >
      <div className="flex items-center gap-3">
        <Avatar name={client?.name ?? "C"} color={member?.color} />
        <div className="min-w-0 flex-1">
          <p className="font-medium text-ink">{client?.name}</p>
          <p className="text-[0.85rem] text-ink-soft">{appointment.service}</p>
        </div>
        <StatusBadge status={appointment.status} />
      </div>
      <dl className="mt-5 divide-y divide-line rounded-xl border border-line">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 px-4 py-2.5 text-[0.9rem]">
            <dt className="text-ink-soft">{label}</dt>
            <dd className="text-right text-ink">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        {[
          ["Total", appointment.price],
          ["Abonado", appointment.paid],
          ["Saldo", due],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl bg-blush px-2 py-3">
            <p className="eyebrow text-ink-soft">{label}</p>
            <p className={`mt-1 font-display text-[1.05rem] tabular-nums ${label === "Saldo" && due ? "text-nude-deep" : "text-ink"}`}>{formatCOP(value as number)}</p>
          </div>
        ))}
      </div>
      {due > 0 && appointment.status !== "cancelada" ? (
        <div className="mt-4 flex items-end gap-2">
          <div className="flex-1">
            <Field label="Registrar abono">
              <input
                inputMode="numeric"
                placeholder={`Ej. ${formatCOP(Math.round(due / 2))}`}
                value={deposit}
                onChange={(event) => setDeposit(event.target.value.replace(/\D/g, ""))}
                className={inputClass}
              />
            </Field>
          </div>
          <ActionButton
            variant="outline"
            disabled={!Number(deposit)}
            loadingText="Guardando"
            onClick={async () => {
              const amount = Math.min(Number(deposit), due);
              await mutate((current) => ({
                ...current,
                appointments: current.appointments.map((item) => (item.id === appointment.id ? { ...item, paid: item.paid + amount } : item)),
              }));
              setDeposit("");
              onToast(`Abono de ${formatCOP(amount)} registrado`);
            }}
          >
            Guardar
          </ActionButton>
        </div>
      ) : null}
      {client ? (
        <a
          href={clientWhatsapp(client.phone, reminderText(data, appointment))}
          target="_blank"
          rel="noreferrer"
          className="pressable mt-4 flex min-h-11 items-center justify-center gap-2 rounded-full border border-line text-[0.85rem] text-ink hover:border-ink"
        >
          <WhatsAppIcon className="size-4 text-[#1f8f55]" />
          Enviar recordatorio por WhatsApp
        </a>
      ) : null}
    </Modal>
  );
}

/** Form to book an appointment by hand (for clients that write by Instagram or call). */
export function NewAppointmentModal({ open, onClose, onToast, defaultDate }: { open: boolean; onClose: () => void; onToast: (message: string) => void; defaultDate?: string }) {
  const { data, todayISO, mutate } = useData();
  const [clientId, setClientId] = useState<string | null>(null);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [date, setDate] = useState<string>(defaultDate ?? todayISO);
  const [time, setTime] = useState<string | null>(null);
  const [place, setPlace] = useState<Place>("estudio");
  const [staffId, setStaffId] = useState("anyi");

  const days = useMemo(() => Array.from({ length: 21 }, (_, index) => shiftISO(todayISO, index)), [todayISO]);
  const taken = new Set(data.appointments.filter((item) => item.date === date && item.status !== "cancelada" && item.staffId === staffId).map((item) => item.time));
  const service = data.catalog.find((item) => item.id === serviceId);
  const reset = () => {
    setClientId(null);
    setServiceId(null);
    setTime(null);
    setPlace("estudio");
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        reset();
        onClose();
      }}
      title="Nueva cita"
      footer={
        <ActionButton
          disabled={!clientId || !service || !time}
          loadingText="Agendando"
          onClick={async () => {
            if (!clientId || !service || !time) return;
            await mutate((current) => ({
              ...current,
              appointments: [
                ...current.appointments,
                {
                  id: `a${Date.now()}`,
                  clientId,
                  service: service.name,
                  price: service.price,
                  date,
                  time,
                  place,
                  municipality: place === "domicilio" ? "Armenia" : undefined,
                  status: "confirmada",
                  staffId,
                  companions: 0,
                  paid: 0,
                },
              ],
            }));
            reset();
            onClose();
            onToast("Cita agendada");
          }}
        >
          Agendar cita
        </ActionButton>
      }
    >
      <div className="space-y-5">
        <Select label="Clienta" placeholder="Busca o elige una clienta" value={clientId} onChange={setClientId} options={data.clients.map((client) => ({ value: client.id, label: client.name, hint: client.phone }))} />
        <Select
          label="Servicio"
          placeholder="Elige el servicio"
          value={serviceId}
          onChange={setServiceId}
          options={data.catalog.filter((item) => item.active).map((item) => ({ value: item.id, label: item.name, hint: `${item.group} · ${formatCOP(item.price)}` }))}
        />
        <Select label="Atiende" value={staffId} onChange={setStaffId} options={data.staff.map((member) => ({ value: member.id, label: member.name, hint: member.role }))} />
        <div>
          <p className="eyebrow text-ink-soft">Día</p>
          <div className="no-scrollbar -mx-1 mt-2 flex gap-2 overflow-x-auto px-1 pb-1">
            {days.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => {
                  setDate(day);
                  setTime(null);
                }}
                className={`pressable min-h-11 shrink-0 rounded-xl px-3 text-[0.8rem] ${day === date ? "bg-ink text-paper" : "border border-line text-ink-soft hover:border-ink"}`}
              >
                {formatDay(day)}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow text-ink-soft">Hora</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {allSlots.map((slot) => {
              const busy = taken.has(slot);
              return (
                <button
                  key={slot}
                  type="button"
                  disabled={busy}
                  onClick={() => setTime(slot)}
                  className={`pressable min-h-9 rounded-full px-3.5 text-[0.8rem] disabled:cursor-not-allowed disabled:line-through disabled:opacity-40 ${
                    slot === time ? "bg-ink text-paper" : "border border-line text-ink-soft hover:border-ink"
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <p className="eyebrow text-ink-soft">Lugar</p>
          <div className="mt-2 flex gap-2">
            {(["estudio", "domicilio"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setPlace(option)}
                className={`pressable min-h-10 rounded-full px-4 text-[0.82rem] ${option === place ? "bg-ink text-paper" : "border border-line text-ink-soft hover:border-ink"}`}
              >
                {option === "estudio" ? "En el estudio" : "A domicilio"}
              </button>
            ))}
          </div>
        </div>
        {service && time ? (
          <p className="rounded-xl bg-nude-field px-4 py-3 text-[0.88rem] text-nude-deep">
            {service.name} · {formatLongDay(date)} · {time} · {formatCOP(service.price)}
          </p>
        ) : null}
      </div>
    </Modal>
  );
}

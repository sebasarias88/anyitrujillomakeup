"use client";

import { useMemo, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { formatCOP } from "@/lib/site";
import { PlusIcon, SearchIcon } from "../icons";
import { byDateTime, formatDay, formatLongDay, fromISO, useData } from "../store";
import { ActionButton, Avatar, Card, EmptyState, Field, Modal, PageTitle, StatusBadge, Tag, inputClass, useToast } from "../ui";
import { clientWhatsapp } from "./shared";

const sinceFormat = new Intl.DateTimeFormat("es-CO", { month: "long", year: "numeric" });

export function ClientsView() {
  const { data, mutate } = useData();
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const { toast, show } = useToast();

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return data.clients
      .filter((client) => !needle || client.name.toLowerCase().includes(needle) || client.phone.includes(needle))
      .map((client) => {
        const visits = data.appointments.filter((item) => item.clientId === client.id && item.status !== "cancelada");
        return { client, visits: visits.length, spent: visits.reduce((sum, item) => sum + item.paid, 0), last: visits.sort(byDateTime).at(-1)?.date };
      })
      .sort((a, b) => b.spent - a.spent);
  }, [data, query]);

  return (
    <>
      <PageTitle
        eyebrow="Clientas"
        title={
          <>
            Tus <em className="text-nude-deep">clientas</em>
          </>
        }
        intro="Historial, notas de piel y preferencias de cada una. Así cada cita se siente personal."
        action={
          <ActionButton onClick={() => setAdding(true)}>
            <PlusIcon className="size-4" /> Nueva clienta
          </ActionButton>
        }
      />
      <label className="relative mb-4 block sm:w-80">
        <span className="sr-only">Buscar clienta</span>
        <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-soft" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nombre o celular" className="min-h-11 w-full rounded-full border border-line bg-paper pr-4 pl-11 text-[0.9rem] outline-none focus:border-ink" />
      </label>
      {rows.length ? (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {rows.map(({ client, visits, spent, last }) => (
            <button key={client.id} type="button" onClick={() => setOpenId(client.id)} className="pressable text-left">
              <Card className="!p-4 transition-colors hover:border-ink">
                <div className="flex items-center gap-3">
                  <Avatar name={client.name} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-ink">{client.name}</p>
                    <p className="text-[0.8rem] text-ink-soft">{last ? `Última cita: ${formatDay(last)}` : "Sin citas aún"}</p>
                  </div>
                  {client.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
                <div className="mt-4 flex gap-6 border-t border-line pt-3 text-[0.82rem]">
                  <p>
                    <span className="block text-ink-soft">Citas</span>
                    <span className="font-display text-[1.1rem] text-ink">{visits}</span>
                  </p>
                  <p>
                    <span className="block text-ink-soft">Ha invertido</span>
                    <span className="font-display text-[1.1rem] text-ink tabular-nums">{formatCOP(spent)}</span>
                  </p>
                </div>
              </Card>
            </button>
          ))}
        </div>
      ) : (
        <EmptyState title="No encontramos a nadie" text="Revisa el nombre o agrégala como nueva clienta." />
      )}
      <ClientSheet id={openId} onClose={() => setOpenId(null)} onToast={show} />
      <NewClientModal
        open={adding}
        onClose={() => setAdding(false)}
        onSave={async (name, phone) => {
          await mutate((current) => ({
            ...current,
            clients: [...current.clients, { id: `c${Date.now()}`, name, phone, since: current.appointments[0]?.date ?? "", notes: "", tags: [] }],
          }));
          setAdding(false);
          show(`${name} agregada`);
        }}
      />
      {toast}
    </>
  );
}

function ClientSheet({ id, onClose, onToast }: { id: string | null; onClose: () => void; onToast: (message: string) => void }) {
  const { data, mutate } = useData();
  const client = data.clients.find((item) => item.id === id);
  const [notes, setNotes] = useState<string | null>(null);
  if (!client) return null;
  const history = data.appointments.filter((item) => item.clientId === client.id).sort((a, b) => byDateTime(b, a));
  const value = notes ?? client.notes;

  return (
    <Modal
      open
      onClose={() => {
        setNotes(null);
        onClose();
      }}
      title={client.name}
      footer={
        <>
          <a
            href={clientWhatsapp(client.phone, `Hola ${client.name.split(" ")[0]} 💕`)}
            target="_blank"
            rel="noreferrer"
            className="pressable inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-5 text-[0.82rem] text-ink hover:border-ink"
          >
            <WhatsAppIcon className="size-4 text-[#1f8f55]" /> Escribirle
          </a>
          <ActionButton
            disabled={value === client.notes}
            loadingText="Guardando"
            onClick={async () => {
              await mutate((current) => ({ ...current, clients: current.clients.map((item) => (item.id === client.id ? { ...item, notes: value } : item)) }));
              setNotes(null);
              onToast("Notas guardadas");
            }}
          >
            Guardar notas
          </ActionButton>
        </>
      }
    >
      <p className="text-[0.88rem] text-ink-soft">
        {client.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3")}
        {client.since ? ` · clienta desde ${sinceFormat.format(fromISO(client.since))}` : ""}
      </p>
      <div className="mt-4">
        <Field label="Notas (piel, alergias, gustos)">
          <textarea value={value} onChange={(event) => setNotes(event.target.value)} rows={3} placeholder="Ej. piel grasa, le encantan los labios nude…" className={`${inputClass} py-3`} />
        </Field>
      </div>
      <p className="eyebrow mt-6 text-ink-soft">Historial</p>
      {history.length ? (
        <ul className="mt-2 divide-y divide-line rounded-xl border border-line">
          {history.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-[0.9rem] text-ink">{item.service}</p>
                <p className="text-[0.78rem] text-ink-soft">{formatLongDay(item.date)} · {formatCOP(item.price)}</p>
              </div>
              <StatusBadge status={item.status} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-[0.88rem] text-ink-soft">Todavía no tiene citas.</p>
      )}
    </Modal>
  );
}

function NewClientModal({ open, onClose, onSave }: { open: boolean; onClose: () => void; onSave: (name: string, phone: string) => Promise<void> }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const valid = name.trim().length > 2 && phone.length === 10;
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Nueva clienta"
      footer={
        <ActionButton
          disabled={!valid}
          loadingText="Guardando"
          onClick={async () => {
            await onSave(name.trim(), phone);
            setName("");
            setPhone("");
          }}
        >
          Guardar clienta
        </ActionButton>
      }
    >
      <div className="space-y-4">
        <Field label="Nombre">
          <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Nombre y apellido" className={inputClass} />
        </Field>
        <Field label="Celular (WhatsApp)" hint="10 dígitos, sin +57">
          <input inputMode="numeric" value={phone} onChange={(event) => setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="3001234567" className={inputClass} />
        </Field>
      </div>
    </Modal>
  );
}

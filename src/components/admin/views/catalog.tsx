"use client";

import { useMemo, useState } from "react";
import { formatCOP } from "@/lib/site";
import { useData, type CatalogItem } from "../store";
import { ActionButton, Card, CardTitle, PageTitle, Toggle, useToast } from "../ui";

export function CatalogView() {
  const { data } = useData();
  const { toast, show } = useToast();
  const groups = useMemo(() => {
    const map = new Map<string, CatalogItem[]>();
    for (const item of data.catalog) map.set(item.group, [...(map.get(item.group) ?? []), item]);
    return [...map.entries()];
  }, [data.catalog]);

  return (
    <>
      <PageTitle
        eyebrow="Servicios y precios"
        title={
          <>
            Tus precios, <em className="text-nude-deep">siempre al día</em>
          </>
        }
        intro="Cambia un precio aquí y se actualiza en tu página web y en el cotizador de novias. Pausa un servicio cuando no tengas cupo."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {groups.map(([group, items]) => (
          <Card key={group}>
            <CardTitle title={group} hint={`${items.filter((item) => item.active).length} de ${items.length} visibles en la web`} />
            <ul className="divide-y divide-line">
              {items.map((item) => (
                <PriceRow key={item.id} item={item} onToast={show} />
              ))}
            </ul>
          </Card>
        ))}
      </div>
      {toast}
    </>
  );
}

function PriceRow({ item, onToast }: { item: CatalogItem; onToast: (message: string) => void }) {
  const { mutate } = useData();
  const [draft, setDraft] = useState<string | null>(null);
  const value = draft ?? String(item.price);
  const changed = draft !== null && Number(draft) !== item.price && Number(draft) > 0;

  const update = (patch: Partial<CatalogItem>) => (current: Parameters<Parameters<typeof mutate>[0]>[0]) => ({
    ...current,
    catalog: current.catalog.map((entry) => (entry.id === item.id ? { ...entry, ...patch } : entry)),
  });

  return (
    <li className={`flex flex-wrap items-center gap-3 py-3.5 ${item.active ? "" : "opacity-60"}`}>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[0.92rem] text-ink">{item.name}</p>
        <p className="text-[0.76rem] text-ink-soft">
          {[Math.floor(item.duration / 60) ? `${Math.floor(item.duration / 60)} h` : "", item.duration % 60 ? `${item.duration % 60} min` : ""].filter(Boolean).join(" ")}
          {item.active ? "" : " · pausado"}
        </p>
      </div>
      <label className="relative">
        <span className="sr-only">Precio de {item.name}</span>
        <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[0.85rem] text-ink-soft">$</span>
        <input
          inputMode="numeric"
          value={Number(value).toLocaleString("es-CO")}
          onChange={(event) => setDraft(event.target.value.replace(/\D/g, ""))}
          className="min-h-10 w-32 rounded-full border border-line-strong bg-paper pr-3 pl-6 text-right text-[0.88rem] text-ink tabular-nums outline-none focus:border-ink"
        />
      </label>
      {changed ? (
        <ActionButton
          size="sm"
          loadingText="Guardando"
          onClick={async () => {
            await mutate(update({ price: Number(draft) }));
            setDraft(null);
            onToast(`${item.name}: ahora ${formatCOP(Number(draft))}`);
          }}
        >
          Guardar
        </ActionButton>
      ) : null}
      <Toggle
        checked={item.active}
        label={item.active ? `Pausar ${item.name}` : `Activar ${item.name}`}
        onChange={(active) => {
          void mutate(update({ active })).then(() => onToast(active ? "Servicio visible en la web" : "Servicio pausado"));
        }}
      />
    </li>
  );
}

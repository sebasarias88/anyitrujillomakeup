"use client";

import { useRef, useState } from "react";
import { galleryCategories } from "@/lib/images";
import { ArrowDownIcon, ArrowUpIcon, StarSmallIcon, TrashIcon, UploadIcon } from "../icons";
import { useData, type PortfolioPhoto } from "../store";
import { ActionButton, EmptyState, PageTitle, Segmented, useToast } from "../ui";

export function PortfolioView() {
  const { data, mutate } = useData();
  const [category, setCategory] = useState<string>("todas");
  const [uploading, setUploading] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const { toast, show } = useToast();
  const photos = data.photos.filter((photo) => category === "todas" || photo.category === category);

  const change = (update: (photos: PortfolioPhoto[]) => PortfolioPhoto[], message: string) =>
    mutate((current) => ({ ...current, photos: update(current.photos) })).then(() => show(message));

  const move = (id: string, step: number) =>
    change((list) => {
      const index = list.findIndex((photo) => photo.id === id);
      const target = index + step;
      if (target < 0 || target >= list.length) return list;
      const next = [...list];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    }, "Orden actualizado");

  return (
    <>
      <PageTitle
        eyebrow="Portafolio"
        title={
          <>
            Tu trabajo, <em className="text-nude-deep">tu vitrina</em>
          </>
        }
        intro="Sube fotos desde el celular, elige las destacadas del inicio y ordénalas. Se ven al instante en tu web."
        action={
          <>
            <input
              ref={input}
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={async (event) => {
                const files = [...(event.target.files ?? [])];
                if (!files.length) return;
                setUploading(true);
                // Demo only: the photos stay in this browser tab (object URLs). The real panel uploads to storage.
                await mutate((current) => ({
                  ...current,
                  photos: [
                    ...files.map((file, index) => ({
                      id: `up-${Date.now()}-${index}`,
                      src: URL.createObjectURL(file),
                      caption: file.name.replace(/\.[^.]+$/, ""),
                      category: category === "todas" ? "glam" : category,
                      featured: false,
                    })),
                    ...current.photos,
                  ],
                }));
                setUploading(false);
                event.target.value = "";
                show(`${files.length} foto${files.length > 1 ? "s" : ""} subida${files.length > 1 ? "s" : ""}`);
              }}
            />
            <ActionButton disabled={uploading} onClick={() => input.current?.click()}>
              <UploadIcon className="size-4" />
              {uploading ? "Subiendo…" : "Subir fotos"}
            </ActionButton>
          </>
        }
      />
      <div className="mb-4">
        <Segmented label="Categoría" value={category} onChange={setCategory} options={galleryCategories.map((item) => ({ value: item.id, label: item.label, count: item.id === "todas" ? data.photos.length : data.photos.filter((photo) => photo.category === item.id).length }))} />
      </div>
      {photos.length ? (
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
          {photos.map((photo) => (
            <li key={photo.id} className="group relative overflow-hidden rounded-[1.25rem] border border-line bg-paper shadow-soft">
              {/* eslint-disable-next-line @next/next/no-img-element -- demo uploads are blob: URLs */}
              <img src={photo.src} alt={photo.caption} className="aspect-[4/5] w-full object-cover" loading="lazy" />
              {photo.featured ? (
                <span className="absolute top-2.5 left-2.5 rounded-full bg-paper/95 px-2.5 py-1 text-[0.7rem] tracking-[0.06em] text-nude-deep uppercase shadow-soft">Destacada</span>
              ) : null}
              <div className="flex items-center gap-1 p-2">
                <p className="min-w-0 flex-1 truncate px-1 text-[0.82rem] text-ink">{photo.caption}</p>
                <IconAction label={photo.featured ? "Quitar de destacadas" : "Destacar en el inicio"} active={photo.featured} onClick={() => change((list) => list.map((item) => (item.id === photo.id ? { ...item, featured: !item.featured } : item)), photo.featured ? "Ya no es destacada" : "Destacada en el inicio")}>
                  <StarSmallIcon className="size-4" />
                </IconAction>
                <IconAction label="Mover antes" onClick={() => move(photo.id, -1)}>
                  <ArrowUpIcon className="size-4" />
                </IconAction>
                <IconAction label="Mover después" onClick={() => move(photo.id, 1)}>
                  <ArrowDownIcon className="size-4" />
                </IconAction>
                <IconAction label="Eliminar" onClick={() => change((list) => list.filter((item) => item.id !== photo.id), "Foto eliminada")}>
                  <TrashIcon className="size-4" />
                </IconAction>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState title="Sin fotos en esta categoría" text="Sube tus mejores trabajos para que las clientas se enamoren." />
      )}
      {toast}
    </>
  );
}

function IconAction({ label, onClick, active, children }: { label: string; onClick: () => Promise<void> | void; active?: boolean; children: React.ReactNode }) {
  const [busy, setBusy] = useState(false);
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        await onClick();
        setBusy(false);
      }}
      className={`pressable grid size-8 shrink-0 place-items-center rounded-full disabled:opacity-40 ${active ? "bg-nude-field text-nude-deep" : "text-ink-soft hover:bg-marble hover:text-ink"}`}
    >
      {children}
    </button>
  );
}

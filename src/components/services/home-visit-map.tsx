"use client";

import { useState } from "react";
import { PinIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { business, homeVisitZones, whatsappGreeting } from "@/lib/site";

const studio = homeVisitZones.municipalities.find((town) => town.name === business.address.city) ?? homeVisitZones.municipalities[0];

/** Straight-line distance in km between two coordinates (haversine). */
function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad;
  const dLng = (b.lng - a.lng) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

const towns = homeVisitZones.municipalities
  .map((town) => ({ name: town.name, km: Math.round(distanceKm(studio, town)), isStudio: town.name === studio.name }))
  .sort((a, b) => a.km - b.km);

const points = [
  { title: "En tu casa, hotel o salón", text: "Llego con todo el equipo y la iluminación." },
  { title: "Puntual, siempre", text: "Calculo el viaje para llegar con tiempo de sobra." },
  { title: "Domicilio según el lugar", text: "Elige tu municipio y te lo cotizo por WhatsApp." },
];

/**
 * Home visits: every town of Quindío as a chip with its approximate distance
 * from the studio. Choosing one writes the WhatsApp message with it.
 */
export function HomeVisitMap() {
  const [selected, setSelected] = useState<string | null>(null);
  const town = towns.find((item) => item.name === selected);

  return (
    <section id="domicilio" aria-labelledby="home-visit-title" className="scroll-mt-24 bg-white py-24 md:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">A domicilio</p>
          <h2 id="home-visit-title" className="mt-4 font-display text-[2.3rem] leading-[1.1] md:text-[3rem]">
            Voy hasta <em className="text-nude-deep">donde te arregles</em>
          </h2>
          <p className="mt-5 max-w-[42ch] text-[1.05rem] leading-relaxed font-light text-ink-soft">
            Te atiendo en Armenia y en todo el Quindío, para que no tengas que moverte el día de tu evento.
          </p>
          <ul className="mt-8 space-y-5">
            {points.map((point) => (
              <li key={point.title} className="flex gap-4">
                <span aria-hidden className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full bg-nude-field text-nude-deep">
                  <PinIcon className="size-[1.1rem]" />
                </span>
                <span>
                  <span className="block font-display text-[1.2rem] leading-snug">{point.title}</span>
                  <span className="block text-[0.95rem] text-ink-soft">{point.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100} className="rounded-[1.75rem] border border-line bg-white p-5 shadow-lift sm:p-8">
          <p className="font-display text-[1.4rem]">¿Dónde es tu evento?</p>
          <p className="mt-1 text-[0.9rem] text-ink-soft">Distancias aproximadas desde el estudio en Armenia.</p>
          <ul aria-label="Municipios del Quindío" className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {towns.map((item) => {
              const active = selected === item.name;
              return (
                <li key={item.name}>
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelected(item.name)}
                    className={`pressable flex min-h-14 w-full flex-col items-start justify-center rounded-xl border px-4 py-2 text-left transition-colors ${
                      active ? "border-ink bg-ink text-paper" : "border-line bg-blush hover:border-ink"
                    }`}
                  >
                    <span className="text-[0.95rem] leading-tight">{item.name}</span>
                    <span className={`text-[0.75rem] ${active ? "text-paper/70" : "text-ink-soft"}`}>{item.isStudio ? "Aquí está el estudio" : `a ~${item.km} km`}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div aria-live="polite" className="mt-6 flex flex-col gap-4 rounded-2xl bg-marble px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="leading-snug">
              <span className="block text-[0.72rem] tracking-[0.16em] text-ink-soft uppercase">Tu domicilio</span>
              <span className="font-display text-[1.1rem]">
                {town ? (town.isStudio ? "Armenia · también voy a tu casa" : `${town.name} · a ~${town.km} km`) : "Elige tu municipio"}
              </span>
            </p>
            <WhatsAppButton
              message={town ? `${whatsappGreeting} Quiero maquillaje a domicilio en ${town.name}. ¿Cuánto cuesta el domicilio hasta allá?` : ""}
              disabled={!town}
              disabledLabel="Elige un municipio"
              className="shrink-0"
            >
              Cotizar domicilio
            </WhatsAppButton>
          </div>
          <p className="mt-3 text-[0.8rem] text-ink-soft">Valores de domicilio por confirmar con Anyi.</p>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { business, homeVisitZones } from "@/lib/site";

const towns = homeVisitZones.municipalities;
const lats = towns.map((town) => town.lat);
const lngs = towns.map((town) => town.lng);
const bounds = { north: Math.max(...lats), south: Math.min(...lats), west: Math.min(...lngs), east: Math.max(...lngs) };

// Towns whose label would run into a neighbour sit on the left of their dot.
const labelLeft = new Set(["Armenia", "Quimbaya", "La Tebaida", "Génova", "Buenavista", "Montenegro"]);

/** Position in % inside the map box, with a margin so labels never touch the edge. */
function place(lat: number, lng: number) {
  const x = 24 + ((lng - bounds.west) / (bounds.east - bounds.west)) * 50;
  const y = 6 + ((bounds.north - lat) / (bounds.north - bounds.south)) * 88;
  return { left: `${x}%`, top: `${y}%` };
}

/**
 * Home visits as a map that can be touched: every town of Quindío placed by
 * its real coordinates, the studio marked in Armenia. Choosing a town writes
 * the WhatsApp message with it. The towns are buttons, so the map is also a
 * keyboard- and screen-reader-friendly list.
 */
export function HomeVisitMap() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="domicilio" aria-labelledby="home-visit-title" className="container-page scroll-mt-24 py-28 md:py-40">
      <div className="grid gap-12 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-5">
          <Reveal>
            <h2 id="home-visit-title" className="font-display text-[2.2rem] leading-[1.02] tracking-[-0.01em] md:text-[2.75rem]">
              Voy hasta donde te arregles
            </h2>
            <p className="mt-5 max-w-[40ch] text-[1.05rem] leading-relaxed">
              Te atiendo en tu casa, hotel o lugar del evento en Armenia y el Quindío. El valor del domicilio depende del
              lugar: elige tu municipio y te lo cotizo por WhatsApp.
            </p>
            <p className="mt-3 text-[0.95rem] text-ink-soft">Zonas de ejemplo, por confirmar.</p>
          </Reveal>

          <div aria-live="polite" className="mt-10 min-h-40 bg-marble px-6 py-6">
            {selected ? (
              <>
                <p className="font-display text-[2rem] leading-none">{selected}</p>
                <p className="mt-2 text-[1.05rem]">
                  {selected === "Armenia" ? "Aquí está el estudio; también voy a domicilio." : "Costo del domicilio según el lugar."}
                </p>
                <WhatsAppButton
                  message={`Hola Anyi ✨ Quiero maquillaje a domicilio en ${selected}. ¿Cuánto cuesta el domicilio hasta allá?`}
                  className="mt-5"
                >
                  Cotizar domicilio en {selected}
                </WhatsAppButton>
              </>
            ) : (
              <p className="text-[1.05rem]">Elige un municipio en el mapa.</p>
            )}
          </div>
        </div>

        <Reveal className="md:col-span-6 md:col-start-7">
          <div className="bg-marble relative mx-auto aspect-[1/1.6] w-full max-w-[26rem]">
            <ul aria-label="Municipios del Quindío">
              {towns.map((town) => {
                const isStudio = town.name === business.address.city;
                const isSelected = selected === town.name;
                return (
                  <li key={town.name} className="absolute" style={place(town.lat, town.lng)}>
                    <button
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelected(town.name)}
                      className={`pressable group absolute top-0 left-0 flex min-h-11 -translate-y-1/2 items-center gap-2 whitespace-nowrap ${
                        labelLeft.has(town.name) ? "-translate-x-[calc(100%-0.5rem)] flex-row-reverse" : "-translate-x-2"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`block shrink-0 transition-transform duration-200 ${
                          isStudio ? "size-4 bg-gold" : "size-3 bg-ink"
                        } ${isSelected ? "scale-150" : "group-hover:scale-125"}`}
                      />
                      <span
                        className={`text-[0.95rem] ${isSelected ? "font-semibold underline decoration-gold decoration-2 underline-offset-4" : ""}`}
                      >
                        {town.name}
                        {isStudio ? <span className="text-ink-soft"> · estudio</span> : null}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

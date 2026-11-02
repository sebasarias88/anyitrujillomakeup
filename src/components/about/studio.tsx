import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { images } from "@/lib/images";
import { business, photographers, venues } from "@/lib/site";

/** The real place: sign and vanity in large panels, the address, hours and her local partners. */
export function Studio() {
  return (
    <>
      <section aria-labelledby="studio-title" className="bg-marble py-28 md:py-40">
        <div className="container-page">
          <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
            <h2 id="studio-title" className="font-display text-[2.2rem] leading-[1.02] tracking-[-0.01em] md:col-span-6 md:text-[2.75rem]">
              El estudio
            </h2>
            <div className="text-[1.05rem] leading-relaxed md:col-span-5 md:col-start-8">
              <p>
                {business.address.street}, {business.address.city}, {business.address.region}.
              </p>
              <p>
                {business.hours.map((item) => `${item.days}: ${item.time}`).join(" · ")}
              </p>
              <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block min-h-11 py-2 font-semibold underline decoration-gold decoration-2 underline-offset-[6px]">
                Cómo llegar
              </a>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-3 md:grid-cols-12 md:gap-6">
            <Reveal variant="photo" className="relative aspect-[4/5] md:col-span-7">
              <Image
                src={images.studioSign}
                alt="Fachada de Anyi Trujillo Beauty Studio con su letrero dorado"
                fill
                placeholder="blur"
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal variant="photo" delay={90} className="relative aspect-[4/5] md:col-span-5 md:mt-32">
              <Image
                src={images.studioVanity}
                alt="Tocador del estudio con espejo de luces, brochas y paletas profesionales"
                fill
                placeholder="blur"
                sizes="(min-width: 768px) 42vw, 100vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="partners-title" className="container-page py-28 md:py-40">
        <div className="grid gap-12 md:grid-cols-12 md:gap-6">
          <Reveal className="md:col-span-4">
            <h2 id="partners-title" className="font-display text-[2.2rem] leading-[1.02] tracking-[-0.01em] md:text-[2.75rem]">
              Con quién trabajo
            </h2>
            <p className="mt-5 max-w-[34ch] text-[1.05rem] leading-relaxed">
              Fotógrafos y lugares de boda del Quindío con los que comparto el día de mis novias.
            </p>
            <p className="mt-6 text-[1.05rem]">
              <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-gold decoration-2 underline-offset-[6px]">
                {business.google.rating.toFixed(1)} en Google, {business.google.reviews} reseñas
              </a>
            </p>
          </Reveal>
          <div className="grid gap-10 sm:grid-cols-2 md:col-span-7 md:col-start-6">
            <Reveal>
              <h3 className="font-semibold">Fotógrafos</h3>
              <ul className="mt-3 space-y-2">
                {photographers.map((name) => (
                  <li key={name} className="font-display text-[1.75rem] leading-tight">
                    {name}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={80}>
              <h3 className="font-semibold">Lugares</h3>
              <ul className="mt-3 space-y-2">
                {venues.map((name) => (
                  <li key={name} className="font-display text-[1.75rem] leading-tight">
                    {name}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

import { StarIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { business, photographers, reviews, venues } from "@/lib/site";

function Stars({ className = "size-4" }: { className?: string }) {
  return (
    <span className="flex gap-0.5 text-gold" aria-hidden>
      {Array.from({ length: 5 }, (_, index) => (
        <StarIcon key={index} className={className} />
      ))}
    </span>
  );
}

export function Reviews() {
  return (
    <section aria-labelledby="reviews-title" className="relative overflow-hidden py-24 md:py-36">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            id="reviews-title"
            eyebrow="Clientas felices"
            title={
              <>
                Lo que dicen quienes ya <em className="text-gradient-gold">vivieron la experiencia</em>
              </>
            }
          />
          <Reveal delay={120}>
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 rounded-3xl border border-line bg-ink-2 px-6 py-5 transition hover:border-nude/50"
              aria-label={`Calificación ${business.google.rating} de 5 en Google con ${business.google.reviews} reseñas. Ver en Google Maps`}
            >
              <span className="font-display text-6xl text-ivory">{business.google.rating.toFixed(1)}</span>
              <span>
                <Stars className="size-5" />
                <span className="mt-1 block text-sm text-sand">{business.google.reviews} reseñas en Google</span>
              </span>
            </a>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {reviews.map((review, index) => (
            <Reveal as="li" key={review.author} delay={index * 100} className="flex flex-col rounded-3xl border border-line bg-ink-2 p-7">
              <Stars />
              <blockquote className="mt-5 flex-1 font-display text-2xl leading-snug text-ivory">“{review.text}”</blockquote>
              <p className="mt-6 border-t border-line pt-4 text-sm">
                <span className="block font-semibold text-ivory">{review.author}</span>
                <span className="text-mute">{review.context} · Reseña de Google</span>
              </p>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-16 flex flex-col items-center gap-5 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-mute uppercase">Fotógrafos y lugares que confían en su trabajo</p>
          <p className="max-w-4xl font-display text-2xl leading-relaxed text-sand md:text-3xl">
            {[...photographers, ...venues].map((name, index, all) => (
              <span key={name}>
                <span className="text-ivory">{name}</span>
                {index < all.length - 1 ? <span className="mx-3 text-nude">✦</span> : null}
              </span>
            ))}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

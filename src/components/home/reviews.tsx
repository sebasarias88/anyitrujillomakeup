import { Reveal } from "@/components/ui/reveal";
import { business, reviews } from "@/lib/site";

/**
 * One large voice and two small ones on a blush field. The three reviews are
 * real Google reviews, quoted word for word; the heading carries the real rating.
 */
export function Reviews() {
  const [lead, ...corners] = reviews;

  return (
    <section aria-labelledby="reviews-title" className="bg-blush">
      <div className="container-page grid min-h-svh grid-rows-[auto_1fr_auto] gap-y-16 py-24 md:py-28">
        <Reveal className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <h2 id="reviews-title" className="font-display text-[2.2rem] leading-[1.02] tracking-[-0.01em] md:text-[2.2rem] lg:text-[2.75rem]">
            {business.google.rating.toFixed(1)} en Google, {business.google.reviews} reseñas
          </h2>
          <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="min-h-11 py-2 underline underline-offset-4">
            Leer todas en Google
          </a>
        </Reveal>

        <Reveal as="figure" delay={80} className="self-center md:mx-auto md:max-w-[62%] md:text-center">
          <blockquote className="font-display text-[1.6rem] leading-[1.22] md:text-[1.75rem] lg:text-[2.1rem]">“{lead.text}”</blockquote>
          <figcaption className="mt-6 text-[0.95rem]">
            <span className="font-semibold">{lead.author}</span> · {lead.context} · Reseña de Google
          </figcaption>
        </Reveal>

        <div className="grid gap-10 md:grid-cols-12">
          {corners.map((review, index) => (
            <Reveal
              as="figure"
              key={review.author}
              delay={160 + index * 80}
              className={index === 0 ? "md:col-span-4" : "max-md:ml-[25%] md:col-span-4 md:col-start-9"}
            >
              <blockquote className="text-[1.05rem] leading-relaxed">“{review.text}”</blockquote>
              <figcaption className="mt-3 text-[0.95rem]">
                <span className="block font-semibold">{review.author}</span>
                <span className="text-ink-soft">{review.context} · Reseña de Google</span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

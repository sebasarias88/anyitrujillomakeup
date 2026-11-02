import { Reveal } from "@/components/ui/reveal";
import { reviews } from "@/lib/site";

/** Real client reviews, quoted word for word: one large voice and two smaller ones. */
export function Reviews() {
  const [lead, ...rest] = reviews;
  return (
    <section aria-labelledby="reviews-title" className="container-page max-w-[78rem] py-24 md:py-32">
      <h2 id="reviews-title" className="sr-only">
        Lo que dicen mis clientas
      </h2>
      <div className="grid gap-6 lg:grid-cols-12">
        <Reveal as="figure" className="flex flex-col justify-center lg:col-span-7 lg:pr-10">
          <span aria-hidden className="font-display text-[6rem] leading-[0.6] text-nude">
            “
          </span>
          <blockquote className="mt-4 font-display text-[1.6rem] leading-[1.4] italic md:text-[2.1rem]">{lead.text}</blockquote>
          <figcaption className="mt-6 text-[0.95rem]">
            <span className="font-medium">{lead.author}</span> <span className="text-ink-soft">· {lead.context}</span>
          </figcaption>
        </Reveal>
        <div className="grid gap-5 lg:col-span-5">
          {rest.map((review, index) => (
            <Reveal as="figure" key={review.author} delay={(index + 1) * 90} className="flex flex-col justify-between gap-5 rounded-3xl bg-marble p-7">
              <blockquote className="font-display text-[1.12rem] leading-relaxed italic">“{review.text}”</blockquote>
              <figcaption className="text-[0.88rem]">
                <span className="font-medium">{review.author}</span> <span className="text-ink-soft">· {review.context}</span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

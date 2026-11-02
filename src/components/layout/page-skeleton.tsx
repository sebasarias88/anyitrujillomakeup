import { ViewTransition } from "react";
import { Skeleton, SkeletonRegion } from "@/components/ui/skeleton";

type Block = "rows" | "split" | "gallery" | "form";

function SectionTitle() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-3">
      <Skeleton className="h-3 w-24 rounded-full" />
      <Skeleton className="h-10 w-4/5 rounded-xl" />
      <Skeleton className="h-4 w-3/5 rounded-full" />
    </div>
  );
}

/**
 * Route-level loading state shaped like the page that is coming: the shared
 * hero (breadcrumb, title, sentence, buttons, rounded photo) plus the page's
 * main block. On reveal it sinks away while the content rises in.
 */
export function PageSkeleton({ block, label }: { block: Block; label: string }) {
  return (
    <ViewTransition exit="skeleton-out" default="none">
      <SkeletonRegion label={`Cargando ${label}…`}>
        <div className="bg-gradient-to-b from-blush to-nude-field">
          <div className="container-page pt-28 pb-16 md:pt-36 md:pb-24">
            <Skeleton className="mb-8 h-4 w-40 rounded-full" />
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <Skeleton className="h-3 w-44 rounded-full" />
                <Skeleton className="mt-6 h-12 w-11/12 rounded-xl" />
                <Skeleton className="mt-3 h-12 w-3/4 rounded-xl" />
                <Skeleton className="mt-7 h-4 w-full max-w-md rounded-full" />
                <Skeleton className="mt-3 h-4 w-2/3 max-w-sm rounded-full" />
                <div className="mt-9 flex gap-3">
                  <Skeleton className="h-12 w-40 rounded-full" />
                  <Skeleton className="h-12 w-36 rounded-full" />
                </div>
              </div>
              <Skeleton className="aspect-[4/5] w-full rounded-[1.75rem] sm:aspect-[5/4] lg:aspect-[4/5] lg:max-h-[34rem]" />
            </div>
          </div>
        </div>
        <div className="container-page py-24">
          <SectionTitle />
          {block === "rows" ? (
            <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
              {[0, 1, 2, 3].map((item) => (
                <div key={item}>
                  <Skeleton className="aspect-[4/5] rounded-[1.25rem]" />
                  <Skeleton className="mt-5 h-3 w-24 rounded-full" />
                  <Skeleton className="mt-3 h-7 w-2/3 rounded-lg" />
                  <Skeleton className="mt-3 h-4 w-full rounded-full" />
                </div>
              ))}
            </div>
          ) : null}
          {block === "split" ? (
            <div className="mt-12 grid items-center gap-12 lg:grid-cols-[5fr_6fr] lg:gap-20">
              <Skeleton className="aspect-[4/5] rounded-[1.5rem]" />
              <div>
                <Skeleton className="h-10 w-3/4 rounded-xl" />
                <Skeleton className="mt-6 h-4 w-full rounded-full" />
                <Skeleton className="mt-3 h-4 w-11/12 rounded-full" />
                <Skeleton className="mt-3 h-4 w-4/5 rounded-full" />
                <Skeleton className="mt-8 h-12 w-48 rounded-full" />
              </div>
            </div>
          ) : null}
          {block === "gallery" ? (
            <>
              <div className="mt-10 flex justify-center gap-2">
                {[0, 1, 2, 3].map((item) => (
                  <Skeleton key={item} className="h-11 w-24 rounded-full" />
                ))}
              </div>
              <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
                {[0, 1, 2, 3, 4, 5].map((item) => (
                  <Skeleton key={item} className="aspect-[4/5] rounded-[1.25rem]" />
                ))}
              </div>
            </>
          ) : null}
          {block === "form" ? (
            <div className="mt-12 grid gap-8 rounded-[1.75rem] border border-line bg-white p-6 shadow-lift sm:p-10 lg:grid-cols-3">
              {[0, 1, 2].map((item) => (
                <div key={item} className="space-y-4">
                  <Skeleton className="h-7 w-1/2 rounded-lg" />
                  <Skeleton className="h-12 w-full rounded-xl" />
                  <Skeleton className="h-12 w-full rounded-xl" />
                  <Skeleton className="h-32 w-full rounded-xl" />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </SkeletonRegion>
    </ViewTransition>
  );
}

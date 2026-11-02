import { ViewTransition } from "react";
import { Skeleton, SkeletonRegion } from "@/components/ui/skeleton";

type Block = "rows" | "split" | "gallery" | "form";

/**
 * Route-level loading state shaped like the page that is coming: the shared
 * hero (title, sentence, photograph) plus the page's main block.
 * On reveal it sinks away while the content rises in (Suspense + ViewTransition).
 */
export function PageSkeleton({ block, label }: { block: Block; label: string }) {
  return (
    <ViewTransition exit="skeleton-out" default="none">
      <SkeletonRegion label={`Cargando ${label}…`} className="pt-24 md:pt-28">
        <div className="container-page grid items-end gap-8 lg:grid-cols-12 lg:gap-6">
          <div className="space-y-4 lg:col-span-5 lg:pb-10">
            <Skeleton className="h-12 w-4/5" />
            <Skeleton className="h-12 w-3/5" />
            <Skeleton className="mt-6 h-5 w-full max-w-sm" />
            <Skeleton className="h-5 w-2/3 max-w-xs" />
          </div>
          <Skeleton className="mx-auto aspect-[4/5] w-full max-w-[26rem] rounded-t-full rounded-b-3xl lg:col-span-5 lg:col-start-8" />
        </div>
        <div className="container-page py-24">
          {block === "rows" ? (
            <div className="grid gap-6 md:grid-cols-3">
              {[0, 1, 2].map((item) => (
                <div key={item} className="space-y-3">
                  <Skeleton className="h-8 w-2/3" />
                  <Skeleton className="h-10 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ))}
            </div>
          ) : null}
          {block === "split" ? (
            <div className="grid gap-10 md:grid-cols-2">
              <Skeleton className="aspect-[4/3]" />
              <div className="space-y-4">
                <Skeleton className="h-10 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          ) : null}
          {block === "gallery" ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => (
                <Skeleton key={item} className={item % 3 === 0 ? "aspect-[3/4]" : "aspect-square"} />
              ))}
            </div>
          ) : null}
          {block === "form" ? (
            <div className="grid gap-6 md:grid-cols-3">
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
            </div>
          ) : null}
        </div>
      </SkeletonRegion>
    </ViewTransition>
  );
}

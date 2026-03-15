import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCollections } from "@/features/collections/services/collection-service";
import { ResourceGrid } from "@/features/resources/components/resource-grid";
import { getResources } from "@/features/resources/services/resource-service";
import { CollectionCardGrid } from "@/features/collections/components/collection-card-grid";

export default async function CollectionsPage() {
  const [collectionsResult, resourcesResult] = await Promise.allSettled([
    getCollections(),
    getResources(),
  ]);
  const collections =
    collectionsResult.status === "fulfilled" ? collectionsResult.value : [];
  const resources =
    resourcesResult.status === "fulfilled" ? resourcesResult.value : [];
  const resourcesUnavailable = resourcesResult.status === "rejected";

  return (
    <main className="px-0 pt-8 pb-20">
      <section className="relative mx-auto w-[min(var(--max-width),calc(100%-2rem))] overflow-hidden rounded-[32px] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_28%),linear-gradient(135deg,rgba(16,52,67,0.88),rgba(31,111,120,0.82))] px-[clamp(2rem,4vw,3.5rem)] py-[clamp(2rem,4vw,3.5rem)] text-white before:absolute before:right-[-15%] before:bottom-[-35%] before:aspect-square before:w-[280px] before:rounded-full before:bg-white/10 before:content-[''] max-[720px]:w-[min(var(--max-width),calc(100%-1.25rem))]">
        <div className="relative z-[1] grid max-w-[620px] gap-4">
          <span className="inline-flex w-fit rounded-full bg-white/15 px-3 py-1 text-[0.88rem] font-bold tracking-[0.05em] uppercase">
            Starter Collections
          </span>
          <h1 className="m-0 font-[family-name:var(--font-display)] text-[clamp(2.3rem,5vw,4.4rem)] leading-[0.98]">
            Use these sample modules as a base for your own product structure.
          </h1>
          <p className="m-0 leading-[1.7] text-white/80">
            Collections represent one reusable top-level pattern. Resources and
            entries show how list and detail flows can work.
          </p>
          <div>
            <Button asChild>
              <Link href="/create-resource">Create resource</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 grid w-[min(var(--max-width),calc(100%-2rem))] gap-6 max-[720px]:w-[min(var(--max-width),calc(100%-1.25rem))]">
        {resourcesUnavailable ? (
          <div className="rounded-[24px] border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
            Public resources are temporarily unavailable because the API could
            not be reached.
          </div>
        ) : null}
        <div className="section-heading">
          <span className="section-heading__eyebrow">Resources</span>
          <h2>Reusable detail pages backed by the API.</h2>
        </div>
        <ResourceGrid resources={resources} />

        <div className="section-heading">
          <span className="section-heading__eyebrow">Collections</span>
          <h2>Top-level sample groupings for your product.</h2>
        </div>
        <CollectionCardGrid collections={collections} />
      </section>
    </main>
  );
}

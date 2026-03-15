import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Resource } from "@/types/resource";
import { ResourceCard } from "@/features/resources/components/resource-card";

type ResourceGridProps = {
  resources: Resource[];
};

export function ResourceGrid({ resources }: ResourceGridProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
      {resources.length > 0 ? (
        resources.map((resource) => <ResourceCard key={resource.id} resource={resource} />)
      ) : (
        <Card className="rounded-[24px] border border-white/60 bg-white/80 p-4 shadow-[var(--shadow)]">
          <CardContent className="flex min-h-40 flex-col items-center justify-center gap-3 text-center">
            <p className="text-[var(--muted-text)]">No public resources are available yet.</p>
            <Button asChild>
              <Link href="/create-resource">Create resource</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

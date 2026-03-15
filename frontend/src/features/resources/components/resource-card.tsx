import Link from "next/link";
import { PlaceholderArt } from "@/components/ui/placeholder-art";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Resource } from "@/types/resource";

type ResourceCardProps = {
  resource: Resource;
};

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Card className="rounded-[24px] border border-white/60 bg-white/80 p-4 shadow-[var(--shadow)]">
      <div className="mb-4 aspect-[4/3] overflow-hidden rounded-[16px]">
        <PlaceholderArt
          title={resource.title}
          label={`${resource.entry_count} entries`}
          tone="neutral"
        />
      </div>
      <CardContent className="p-0">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="bg-[var(--brand-soft)] text-[var(--brand-deep)]"
          >
            {resource.visibility}
          </Badge>
          <Badge variant="outline">{resource.entry_count} entries</Badge>
        </div>
        <h3 className="mb-1 text-[1.15rem]">{resource.title}</h3>
        <p className="mb-4 text-[var(--muted-text)]">
          {resource.description ||
            "This sample resource is ready to be adapted to your project."}
        </p>
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-[var(--muted-text)]">
            {resource.estimated_minutes} min
          </span>
          <Button asChild variant="secondary">
            <Link href={`/resources/${resource.slug}`}>Open</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

import Link from "next/link";
import { PlaceholderArt } from "@/components/ui/placeholder-art";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Collection } from "@/types/collection";

type CollectionCardGridProps = {
  collections: Collection[];
};

export function CollectionCardGrid({ collections }: CollectionCardGridProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
      {collections.map((collection) => (
        <Card
          key={collection.id}
          className="rounded-[24px] border border-white/60 bg-white/80 p-4 shadow-[var(--shadow)]"
        >
          <div className="mb-4 aspect-[4/3] overflow-hidden rounded-[16px]">
            <PlaceholderArt
              title={collection.title}
              label={collection.category}
              tone="soft"
            />
          </div>
          <CardContent className="p-0">
            <h3 className="mb-1 text-[1.15rem]">{collection.title}</h3>
            <p className="mb-4 text-[var(--muted-text)]">
              {collection.description}
            </p>
            <div className="flex items-center justify-between gap-4">
              <Badge
                variant="outline"
                className="bg-[var(--brand-soft)] text-[var(--brand-deep)]"
              >
                {collection.category}
              </Badge>
              <Button asChild variant="secondary">
                <Link href="/create-resource">Open builder</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

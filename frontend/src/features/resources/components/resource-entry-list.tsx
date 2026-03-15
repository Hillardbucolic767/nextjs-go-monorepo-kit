import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Entry } from "@/types/resource";

type ResourceEntryListProps = {
  entries: Entry[];
};

export function ResourceEntryList({ entries }: ResourceEntryListProps) {
  return (
    <section className="mx-auto mt-12 grid w-[min(var(--max-width),calc(100%-2rem))] gap-5 max-[720px]:w-[min(var(--max-width),calc(100%-1.25rem))]">
      {entries.length > 0 ? (
        entries.map((entry) => (
          <Card
            key={entry.id}
            className="rounded-[24px] border border-white/60 bg-white/80 p-4 shadow-[var(--shadow)]"
          >
            <CardContent className="p-0">
              <div className="mb-3 flex items-center justify-between gap-4">
                <Badge variant="outline">Entry {entry.position}</Badge>
              </div>
              <h2 className="mb-3 font-[family-name:var(--font-display)] text-2xl">
                Title
              </h2>
              <p className="mb-6 leading-[1.75] text-[var(--text)]">
                {entry.title}
              </p>
              <h3 className="mb-3 text-lg font-semibold">Content</h3>
              <p className="leading-[1.75] text-[var(--muted-text)]">
                {entry.content}
              </p>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card className="rounded-[24px] border border-white/60 bg-white/80 p-4 shadow-[var(--shadow)]">
          <CardContent className="flex min-h-40 items-center justify-center text-[var(--muted-text)]">
            This resource does not have any entries yet.
          </CardContent>
        </Card>
      )}
    </section>
  );
}

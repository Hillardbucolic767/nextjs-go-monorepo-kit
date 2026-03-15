import { notFound } from "next/navigation";
import { ResourceHero } from "@/features/resources/components/resource-hero";
import { ResourceEntryList } from "@/features/resources/components/resource-entry-list";
import { getEntriesByResource, getResource } from "@/features/resources/services/resource-service";

type ResourcePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { slug } = await params;

  try {
    const [resource, entries] = await Promise.all([getResource(slug), getEntriesByResource(slug)]);

    return (
      <main className="px-0 pb-20 pt-8">
        <ResourceHero resource={resource} />
        <ResourceEntryList entries={entries} />
      </main>
    );
  } catch {
    notFound();
  }
}

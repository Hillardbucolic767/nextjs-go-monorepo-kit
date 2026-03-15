import { fetchJson } from "@/lib/api";
import { sampleCollections } from "@/lib/site-data";
import type { Collection } from "@/types/collection";

type CollectionListResponse = {
  data: Collection[];
};

export async function getCollections(): Promise<Collection[]> {
  try {
    const response = await fetchJson<CollectionListResponse>("/collections");
    return response.data;
  } catch {
    return sampleCollections;
  }
}

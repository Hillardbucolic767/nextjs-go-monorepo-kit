export type Resource = {
  id: string;
  owner_id: string;
  collection_id?: string;
  slug: string;
  title: string;
  description: string;
  visibility: string;
  status: string;
  locale: string;
  entry_count: number;
  estimated_minutes: number;
  created_at: string;
  updated_at: string;
};

export type Entry = {
  id: string;
  resource_id: string;
  position: number;
  title: string;
  content: string;
  details?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
};

export type CreateResourceInput = {
  title: string;
  description: string;
  visibility?: "private" | "unlisted" | "public";
  status?: "draft" | "published" | "archived";
  locale?: string;
  estimated_minutes?: number;
  collection_id?: string;
};

export type CreateEntryInput = {
  position: number;
  title: string;
  content: string;
  details?: string;
  notes?: string;
};

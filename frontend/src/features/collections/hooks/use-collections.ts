"use client";

import { useQuery } from "@tanstack/react-query";
import { getCollections } from "@/features/collections/services/collection-service";

export function useCollections() {
  return useQuery({
    queryKey: ["collections"],
    queryFn: getCollections,
  });
}

import type { Collection } from "@/entities/collection";
import type { QuickFilter } from "@/widgets/catalog-filters";
import type { BlogPreviewContent, ProductShelfContent } from "../model/types";
import quickFilters from "./mock/quick-filters.json";
import shelves from "./mock/shelves.json";
import collections from "./mock/collections.json";
import articles from "./mock/articles.json";

export function getQuickFilters(): QuickFilter[] {
  return quickFilters;
}

// JSON imports widen string literals, so the metal union is restored here —
// the single place where mock data crosses into typed application code.
export function getProductShelves(): ProductShelfContent[] {
  return shelves as ProductShelfContent[];
}

export function getBudgetCollections(): Collection[] {
  return collections;
}

export function getBlogPreview(): BlogPreviewContent {
  return articles;
}

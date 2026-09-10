// The getters are asynchronous although the mocks are local: this is the seam
// where a real request will live, and the page already treats them as one.
import type { Collection } from "@/entities/collection";
import type { QuickFilter } from "@/widgets/catalog-filters";
import type { BlogPreviewContent, ProductShelfContent } from "../model/types";
import quickFilters from "./mock/quick-filters.json";
import shelves from "./mock/shelves.json";
import collections from "./mock/collections.json";
import articles from "./mock/articles.json";

export async function getQuickFilters(): Promise<QuickFilter[]> {
  return quickFilters;
}

// JSON imports widen string literals, so the metal union is restored here —
// the single place where mock data crosses into typed application code.
export async function getProductShelves(): Promise<ProductShelfContent[]> {
  return shelves as ProductShelfContent[];
}

export async function getBudgetCollections(): Promise<Collection[]> {
  return collections;
}

export async function getBlogPreview(): Promise<BlogPreviewContent> {
  return articles;
}

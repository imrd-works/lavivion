import type { QuickFilter } from "@/widgets/catalog-filters";
import type { ProductShelfContent } from "../model/types";
import quickFilters from "./mock/quick-filters.json";
import shelves from "./mock/shelves.json";

export function getQuickFilters(): QuickFilter[] {
  return quickFilters;
}

// JSON imports widen string literals, so the metal union is restored here —
// the single place where mock data crosses into typed application code.
export function getProductShelves(): ProductShelfContent[] {
  return shelves as ProductShelfContent[];
}

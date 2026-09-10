import type { QuickFilter } from "@/widgets/catalog-filters";
import quickFilters from "./mock/quick-filters.json";

export function getQuickFilters(): QuickFilter[] {
  return quickFilters;
}

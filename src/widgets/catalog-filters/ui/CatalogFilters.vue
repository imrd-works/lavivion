<script setup lang="ts">
import type { QuickFilter } from "../model/types";
import QuickFilterTiles from "./QuickFilterTiles.vue";
import FiltersBar from "./FiltersBar.vue";

defineProps<{
  quickFilters: QuickFilter[];
}>();
</script>

<template>
  <section class="catalog-filters">
    <QuickFilterTiles :items="quickFilters" />
    <FiltersBar />
  </section>
</template>

<style lang="scss" scoped>
/** @define catalog-filters */

.catalog-filters {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xl);
}
</style>

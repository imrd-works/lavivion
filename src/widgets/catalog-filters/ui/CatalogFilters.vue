<script setup lang="ts">
import { Motion } from "@/shared/ui";
import { revealSection } from "@/shared/config/motion";
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
    <Motion v-bind="revealSection">
      <FiltersBar />
    </Motion>
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

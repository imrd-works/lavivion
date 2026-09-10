<script setup lang="ts">
import { computed } from "vue";
import { Motion } from "@/shared/ui";
import { REVEAL_DURATION, REVEAL_STEP } from "@/shared/config/motion";
import type { QuickFilter } from "../model/types";
import QuickFilterTiles from "./QuickFilterTiles.vue";
import FiltersBar from "./FiltersBar.vue";

const props = defineProps<{
  quickFilters: QuickFilter[];
}>();

// The bar joins the sequence right after the last tile has started.
const barDelay = computed(() => props.quickFilters.length * REVEAL_STEP);
</script>

<template>
  <section class="catalog-filters">
    <QuickFilterTiles :items="quickFilters" />
    <Motion
      preset="fade-up"
      trigger="visible"
      :duration="REVEAL_DURATION"
      :delay="barDelay"
    >
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

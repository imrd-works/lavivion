<script setup lang="ts">
import { Skeleton } from "@/shared/ui";
</script>

<template>
  <section class="budget-collections-skeleton">
    <Skeleton height="32px" />

    <div class="budget-collections-skeleton__grid">
      <Skeleton v-for="card in 4" :key="card" ratio="1" />
      <Skeleton class="budget-collections-skeleton__featured" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
/** @define budget-collections-skeleton */
@use "shared/assets/styles/mixins" as *;

.budget-collections-skeleton {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xl);

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-2xl);

    @include bp-down("lg") {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__featured {
    grid-area: 1 / 3 / 3 / 5;

    @include bp-down("lg") {
      grid-area: auto / span 2;
      aspect-ratio: 4 / 3;
    }
  }
}
</style>

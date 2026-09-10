<script setup lang="ts">
import { Skeleton } from "@/shared/ui";
</script>

<template>
  <div class="catalog-filters-skeleton">
    <ul class="catalog-filters-skeleton__tiles">
      <li v-for="tile in 6" :key="tile" class="catalog-filters-skeleton__tile">
        <Skeleton ratio="1" />
        <Skeleton height="16px" />
      </li>
    </ul>
    <Skeleton height="64px" />
  </div>
</template>

<style lang="scss" scoped>
/** @define catalog-filters-skeleton */
@use "shared/assets/styles/mixins" as *;

.catalog-filters-skeleton {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xl);

  &__tiles {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: var(--spacing-2xl);
    padding: 0;
    margin: 0;
    list-style: none;

    @include bp-down("xl") {
      grid-template-columns: repeat(4, 1fr);
    }

    @include bp-down("md") {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__tile {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-s);
    align-items: center;
  }
}
</style>

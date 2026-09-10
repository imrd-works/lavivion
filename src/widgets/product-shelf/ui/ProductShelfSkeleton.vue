<script setup lang="ts">
import { Skeleton } from "@/shared/ui";
</script>

<template>
  <section class="product-shelf-skeleton">
    <div class="product-shelf-skeleton__header">
      <Skeleton height="26px" />
      <Skeleton height="60px" />
    </div>

    <div class="product-shelf-skeleton__grid">
      <Skeleton class="product-shelf-skeleton__featured" />
      <Skeleton v-for="card in 4" :key="card" ratio="1 / 1.4" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
/** @define product-shelf-skeleton */
@use "shared/assets/styles/mixins" as *;

.product-shelf-skeleton {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xl);

  &__header {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-s);
    max-width: 683px;
  }

  &__grid {
    display: grid;
    grid-template-columns: 692fr 342fr 342fr;
    grid-auto-rows: 1fr;
    gap: var(--spacing-s);

    @include bp-down("lg") {
      grid-template-columns: repeat(2, 1fr);
    }

    @include bp-down("sm") {
      grid-template-columns: 1fr;
    }
  }

  &__featured {
    grid-row: span 2;

    @include bp-down("lg") {
      grid-column: span 2;
      grid-row: auto;
      aspect-ratio: 16 / 10;
    }

    @include bp-down("sm") {
      grid-column: auto;
    }
  }
}
</style>

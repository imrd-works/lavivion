<script setup lang="ts">
import { Skeleton } from "@/shared/ui";
</script>

<template>
  <section class="blog-preview-skeleton">
    <div class="blog-preview-skeleton__heading">
      <Skeleton height="32px" />
    </div>

    <div class="blog-preview-skeleton__track">
      <Skeleton v-for="card in 3" :key="card" ratio="330 / 440" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
/** @define blog-preview-skeleton */
@use "shared/assets/styles/mixins" as *;

.blog-preview-skeleton {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-2xl);

  @include bp-down("lg") {
    grid-template-columns: 1fr;
  }

  &__heading {
    display: flex;
    align-items: flex-start;
  }

  &__track {
    display: grid;
    grid-column: span 3;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-2xl);

    @include bp-down("lg") {
      grid-column: auto;
      grid-template-columns: repeat(2, 1fr);
    }

    @include bp-down("sm") {
      grid-template-columns: 1fr;
    }
  }
}
</style>

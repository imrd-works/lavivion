<script setup lang="ts">
import type { Collection } from "../model/types";

defineProps<{
  collection: Collection;
}>();
</script>

<template>
  <NuxtLink
    :to="collection.to"
    class="collection-card"
    :class="{ 'collection-card--featured': collection.featured }"
  >
    <img class="collection-card__image" :src="collection.image" alt="" />
    <span v-if="collection.title" class="collection-card__title">
      {{ collection.title }}
    </span>
    <span class="collection-card__label">{{ collection.label }}</span>
  </NuxtLink>
</template>

<style lang="scss" scoped>
/** @define collection-card */
@use "shared/assets/styles/mixins" as *;

.collection-card {
  position: relative;
  display: block;
  overflow: hidden;
  background: var(--color-bg-surface-muted);

  &:not(&--featured) {
    aspect-ratio: 1;
  }

  // The mockup crops the photo 5% tighter than its frame on every side.
  &__image {
    position: absolute;
    inset: -5%;
    width: 110%;
    height: 110%;
    object-fit: cover;
  }

  &__title {
    @include text("heading-m");

    position: absolute;
    inset: 0 0 auto;
    padding: var(--spacing-2xl);
    color: var(--color-text-primary);
  }

  &__label {
    @include text("heading-xs");

    position: absolute;
    inset: auto 0 0;
    padding: var(--spacing-2xl);
    color: var(--color-text-brand);
  }
}
</style>

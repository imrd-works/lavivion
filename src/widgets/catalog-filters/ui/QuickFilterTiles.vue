<script setup lang="ts">
import type { QuickFilter } from "../model/types";

defineProps<{
  items: QuickFilter[];
}>();
</script>

<template>
  <ul class="quick-filter-tiles">
    <li v-for="item in items" :key="item.id" class="quick-filter-tiles__item">
      <NuxtLink :to="item.to" class="quick-filter-tiles__link">
        <span class="quick-filter-tiles__media">
          <span class="quick-filter-tiles__overlay" />
          <img class="quick-filter-tiles__image" :src="item.image" alt="" />
        </span>
        <span class="quick-filter-tiles__label">{{ item.title }}</span>
      </NuxtLink>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
/** @define quick-filter-tiles */
@use "shared/assets/styles/mixins" as *;

.quick-filter-tiles {
  display: flex;
  gap: var(--spacing-2xl);
  align-items: flex-start;
  padding: 0;
  margin: 0;
  list-style: none;

  &__item {
    flex: 1 1 0;
    min-width: 0;
  }

  &__link {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-m);
    align-items: center;
    color: var(--color-text-primary);
  }

  &__media {
    position: relative;
    display: block;
    width: 100%;
    aspect-ratio: 1;
    padding: var(--spacing-s);
    overflow: hidden;
    background: var(--color-bg-surface-muted);
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      var(--color-overlay-light) 0%,
      var(--color-overlay-light-strong) 90%
    );
    mix-blend-mode: lighten;
  }

  &__image {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__label {
    @include text("heading-xs");

    text-align: center;
  }
}
</style>

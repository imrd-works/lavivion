<script setup lang="ts">
import type { ProductCategory } from "../model/types";

defineProps<{
  category: ProductCategory;
}>();
</script>

<template>
  <header class="category-header">
    <div class="category-header__heading">
      <h2 class="category-header__title">{{ category.title }}</h2>
      <span class="category-header__count">{{ category.count }}</span>
    </div>
    <p class="category-header__description">{{ category.description }}</p>
  </header>
</template>

<style lang="scss" scoped>
/** @define category-header */
@use "shared/assets/styles/mixins" as *;

.category-header {
  @include grid-span(2);

  display: flex;
  flex-direction: column;
  gap: var(--spacing-l);
  align-items: flex-start;

  &__heading {
    display: flex;
    gap: var(--spacing-s);
    align-items: flex-start;
  }

  &__title {
    @include text("heading-l");

    margin: 0;
    color: var(--color-text-primary);
    white-space: nowrap;
  }

  &__count {
    @include text("body-xs-light");

    padding-block: 1px;
    color: var(--color-text-brand);
  }

  &__description {
    @include text("body-m");

    margin: 0;
    color: var(--color-text-secondary);
  }

  @include bp-down("lg") {
    // Two columns and narrower: the heading takes the whole row.
    max-width: none;

    &__title {
      white-space: normal;
    }
  }
}
</style>

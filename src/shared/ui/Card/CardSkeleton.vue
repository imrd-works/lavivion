<script setup lang="ts">
withDefaults(
  defineProps<{
    tag?: string;
    padding?: "none" | "s" | "m" | "l";
    lines?: number;
  }>(),
  {
    tag: "div",
    padding: "m",
    lines: 3,
  },
);
</script>

<template>
  <component
    :is="tag"
    class="card-skeleton"
    :class="[padding !== 'none' && `card-skeleton--padding-${padding}`]"
  >
    <span
      v-for="i in lines"
      :key="i"
      class="card-skeleton__line"
      :class="{ 'card-skeleton__line--short': i === lines && lines > 1 }"
    />
  </component>
</template>

<style lang="scss" scoped>
/** @define card-skeleton */
@use "assets/styles/mixins" as *;

.card-skeleton {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-l);
  box-shadow: var(--shadow-xs);

  &__line {
    display: block;
    height: 1em;
    margin-bottom: var(--spacing-s);
    background: var(--color-border-subtle);
    border-radius: var(--radius-s);
    animation: skeleton-shimmer 1.5s ease-in-out infinite;

    &:last-child {
      margin-bottom: 0;
    }

    &--short {
      width: 60%;
    }
  }

  &--padding-s {
    padding: var(--spacing-s) var(--spacing-m);
  }

  &--padding-m {
    padding: var(--spacing-m) var(--spacing-l);
  }

  &--padding-l {
    padding: var(--spacing-l) var(--spacing-xl);
  }
}
</style>

<script setup lang="ts">
defineOptions({
  name: "LayoutGrid",
});

withDefaults(
  defineProps<{
    tag?: string;
    columns?: number | string;
    gap?: "xs" | "s" | "m" | "l" | "xl";
    align?: "start" | "center" | "end" | "stretch";
  }>(),
  {
    tag: "div",
    columns: 1,
    gap: "m",
    align: "stretch",
  },
);
</script>

<template>
  <component
    :is="tag"
    class="grid"
    :class="[`grid--gap-${gap}`, `grid--align-${align}`]"
    :style="{
      '--grid-columns':
        typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns,
    }"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
/** @define grid */
@use "assets/styles/mixins" as *;

.grid {
  display: grid;
  grid-template-columns: var(--grid-columns);

  &--gap-xs {
    gap: var(--spacing-xs);
  }

  &--gap-s {
    gap: var(--spacing-s);
  }

  &--gap-m {
    gap: var(--spacing-m);
  }

  &--gap-l {
    gap: var(--spacing-l);
  }

  &--gap-xl {
    gap: var(--spacing-xl);
  }

  &--align-start {
    align-items: start;
  }

  &--align-center {
    align-items: center;
  }

  &--align-end {
    align-items: end;
  }

  &--align-stretch {
    align-items: stretch;
  }
}
</style>

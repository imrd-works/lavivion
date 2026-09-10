<script setup lang="ts">
withDefaults(
  defineProps<{
    tag?: string;
    padding?: "none" | "s" | "m" | "l";
  }>(),
  {
    tag: "div",
    padding: "m",
  },
);
</script>

<template>
  <component
    :is="tag"
    class="card"
    :class="[padding !== 'none' && `card--padding-${padding}`]"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
/** @define card */
@use "assets/styles/mixins" as *;

.card {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-l);
  box-shadow: var(--shadow-xs);

  &--padding-s {
    @include fluid-between(
      padding,
      var(--spacing-s),
      var(--spacing-m),
      "md",
      "xl"
    );
  }

  &--padding-m {
    @include fluid-between(
      padding,
      var(--spacing-m),
      var(--spacing-l),
      "md",
      "xl"
    );
  }

  &--padding-l {
    @include fluid-between(
      padding,
      var(--spacing-l),
      var(--spacing-xl),
      "md",
      "xl"
    );
  }
}
</style>

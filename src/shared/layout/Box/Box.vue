<script setup lang="ts">
defineOptions({
  name: "LayoutBox",
});

withDefaults(
  defineProps<{
    tag?: string;
    padding?: "none" | "xs" | "s" | "m" | "l" | "xl";
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
    class="box"
    :class="[padding !== 'none' && `box--padding-${padding}`]"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
/** @define box */
@use "assets/styles/mixins" as *;

.box {
  &--padding-xs {
    @include fluid-between(
      padding,
      var(--spacing-xs),
      var(--spacing-s),
      "md",
      "xl"
    );
  }

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

  &--padding-xl {
    @include fluid-between(
      padding,
      var(--spacing-xl),
      var(--spacing-2xl),
      "md",
      "xl"
    );
  }
}
</style>

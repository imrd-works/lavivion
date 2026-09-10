<script setup lang="ts">
defineOptions({
  name: "LayoutSection",
});

withDefaults(
  defineProps<{
    tag?: string;
    padding?: "none" | "s" | "m" | "l";
  }>(),
  {
    tag: "section",
    padding: "m",
  },
);
</script>

<template>
  <component
    :is="tag"
    class="section"
    :class="[padding !== 'none' && `section--padding-${padding}`]"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
/** @define section */
@use "assets/styles/mixins" as *;

.section {
  &--padding-s {
    @include fluid-between(
      padding-block,
      var(--spacing-xs),
      var(--spacing-m),
      "md",
      "xl"
    );
  }

  &--padding-m {
    @include fluid-between(
      padding-block,
      var(--spacing-s),
      var(--spacing-l),
      "md",
      "xl"
    );
  }

  &--padding-l {
    @include fluid-between(
      padding-block,
      var(--spacing-m),
      var(--spacing-xl),
      "md",
      "xl"
    );
  }
}
</style>

<script setup lang="ts">
withDefaults(
  defineProps<{
    tag?: string;
  }>(),
  {
    tag: "div",
  },
);
</script>

<template>
  <component :is="tag" class="container">
    <slot />
  </component>
</template>

<style lang="scss" scoped>
/** @define container */
@use "shared/assets/styles/mixins" as *;

.container {
  @include fluid-between(
    padding-inline,
    var(--spacing-l),
    var(--spacing-2xl),
    "sm",
    "lg"
  );

  width: 100%;
  max-width: 1920px;
  margin-inline: auto;
}
</style>

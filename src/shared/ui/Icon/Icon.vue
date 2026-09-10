<script setup lang="ts">
import type { Component } from "vue";
import { computed } from "vue";

const icons = import.meta.glob<Component>("@/shared/assets/icons/*.svg", {
  query: "?component",
  import: "default",
  eager: true,
});

const props = withDefaults(
  defineProps<{
    name: string;
    size?: number | string;
  }>(),
  {
    size: 24,
  },
);

const icon = computed(() => {
  const entry = Object.entries(icons).find(([path]) =>
    path.endsWith(`/${props.name}.svg`),
  );
  return entry?.[1];
});
</script>

<template>
  <component
    :is="icon"
    v-if="icon"
    class="icon"
    :width="size"
    :height="size"
    aria-hidden="true"
    focusable="false"
  />
</template>

<style lang="scss" scoped>
/** @define icon */

.icon {
  display: block;
  flex-shrink: 0;
  color: inherit;
}
</style>

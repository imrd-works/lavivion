<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    name: string;
    size?: number | string;
    width?: number | string;
    height?: number | string;
    title?: string;
  }>(),
  {
    size: 24,
    width: undefined,
    height: undefined,
    title: undefined,
  },
);

const sizeVal = computed(() => {
  if (props.width !== undefined && props.height !== undefined)
    return { width: props.width, height: props.height };
  const s = props.size ?? 24;
  return { width: s, height: s };
});
</script>

<template>
  <svg
    class="icon"
    :class="$attrs.class"
    :width="sizeVal.width"
    :height="sizeVal.height"
    aria-hidden="true"
    role="img"
  >
    <title v-if="title">{{ title }}</title>
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<style scoped>
.icon {
  display: inline-block;
  vertical-align: middle;
  fill: currentColor;
}
</style>

<script setup lang="ts">
withDefaults(
  defineProps<{
    ratio?: string;
    height?: string;
  }>(),
  {
    ratio: undefined,
    height: undefined,
  },
);
</script>

<template>
  <span
    class="skeleton"
    aria-hidden="true"
    :style="{ aspectRatio: ratio, height }"
  />
</template>

<style lang="scss" scoped>
/** @define skeleton */

.skeleton {
  position: relative;
  display: block;
  width: 100%;
  overflow: hidden;
  background: var(--color-bg-surface-muted);

  &::after {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent,
      var(--color-bg-surface),
      transparent
    );
    opacity: 0.6;
    animation: skeleton-sheen 1400ms var(--ease-standard) infinite;
    content: "";
    transform: translateX(-100%);
  }
}

@keyframes skeleton-sheen {
  to {
    transform: translateX(100%);
  }
}
</style>

<script setup lang="ts">
import type { Component } from "vue";
import Icon from "@/shared/ui/Icon/Icon.vue";

withDefaults(
  defineProps<{
    icon: string;
    label: string;
    size?: 24 | 40;
    tag?: string | Component;
    pressed?: boolean;
  }>(),
  {
    size: 24,
    tag: "button",
    pressed: undefined,
  },
);
</script>

<template>
  <component
    :is="tag"
    class="icon-button"
    :type="tag === 'button' ? 'button' : undefined"
    :aria-label="label"
    :aria-pressed="pressed"
    :style="{ '--icon-button-size': `${size}px` }"
  >
    <Icon :name="icon" :size="size" />
  </component>
</template>

<style lang="scss" scoped>
/** @define icon-button */
@use "shared/assets/styles/mixins" as *;

.icon-button {
  @include reset-button;
  @include flex-center;

  width: var(--icon-button-size);
  height: var(--icon-button-size);
  color: var(--color-text-brand);
  transition: opacity var(--duration-fast) var(--ease-standard);

  @include hover-supported {
    opacity: 0.7;
  }

  &:focus-visible {
    outline: 2px solid var(--color-border-focus);
    outline-offset: 2px;
  }
}
</style>

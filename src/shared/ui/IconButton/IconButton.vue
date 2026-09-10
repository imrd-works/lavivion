<script setup lang="ts">
import type { Component } from "vue";
import { computed } from "vue";
import { NuxtLink } from "#components";
import Icon from "@/shared/ui/Icon/Icon.vue";

const props = withDefaults(
  defineProps<{
    icon: string;
    label: string;
    size?: 24 | 40;
    tag?: string | Component;
    to?: string;
    pressed?: boolean;
  }>(),
  {
    size: 24,
    tag: "button",
    to: undefined,
    pressed: undefined,
  },
);

const component = computed(() => (props.to ? NuxtLink : props.tag));
const isButton = computed(() => component.value === "button");
</script>

<template>
  <component
    :is="component"
    class="icon-button"
    :to="to"
    :type="isButton ? 'button' : undefined"
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
}
</style>

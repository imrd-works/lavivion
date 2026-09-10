<script setup lang="ts">
import type { Component } from "vue";
import { computed } from "vue";
import { NuxtLink } from "#components";
import Icon from "@/shared/ui/Icon/Icon.vue";

const props = withDefaults(
  defineProps<{
    variant?: "primary" | "outline" | "text" | "link";
    size?: "s" | "l";
    tag?: string | Component;
    to?: string;
    disabled?: boolean;
    icon?: string;
  }>(),
  {
    variant: "primary",
    size: "s",
    tag: "button",
    to: undefined,
    disabled: false,
    icon: undefined,
  },
);

const component = computed(() => (props.to ? NuxtLink : props.tag));
const isButton = computed(() => component.value === "button");
</script>

<template>
  <component
    :is="component"
    class="btn"
    :class="[`btn--${variant}`, `btn--${size}`]"
    :to="to"
    :type="isButton ? 'button' : undefined"
    :disabled="isButton ? disabled : undefined"
    :aria-disabled="!isButton && disabled ? 'true' : undefined"
  >
    <span class="btn__label">
      <slot />
    </span>
    <span v-if="$slots.suffix" class="btn__suffix">
      <slot name="suffix" />
    </span>
    <Icon v-if="icon" :name="icon" :size="16" class="btn__icon" />
  </component>
</template>

<style lang="scss" scoped>
/** @define btn */
@use "shared/assets/styles/mixins" as *;

.btn {
  @include text("heading-xs");

  display: inline-flex;
  gap: var(--spacing-2xs);
  align-items: center;
  justify-content: center;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  border-radius: var(--radius-none);
  transition:
    color var(--duration-fast) var(--ease-standard),
    background-color var(--duration-fast) var(--ease-standard),
    border-color var(--duration-fast) var(--ease-standard),
    opacity var(--duration-fast) var(--ease-standard);

  &:focus-visible {
    outline: 2px solid var(--color-border-focus);
    outline-offset: 2px;
  }

  &--s {
    min-height: 36px;
    padding: var(--spacing-s) var(--spacing-l);
  }

  &--l {
    min-height: 52px;
    padding: var(--spacing-m) var(--spacing-3xl);
  }

  &--primary {
    color: var(--color-action-primary-fg);
    background: var(--color-action-primary-bg);
    border-color: var(--color-action-primary-bg);

    @include hover-supported {
      opacity: 0.9;
    }
  }

  &--outline {
    color: var(--color-action-secondary-fg);
    background: transparent;
    border-color: var(--color-action-secondary-border);

    @include hover-supported {
      border-color: var(--color-border-brand);
    }
  }

  &--text,
  &--link {
    min-height: 0;
    color: var(--color-text-brand);
    background: transparent;
    border: 0;
  }

  &--text {
    padding: 0;
  }

  &--link {
    @include hairline(bottom, var(--color-border-brand));

    padding: var(--spacing-xs) var(--spacing-2xs);
  }

  &__suffix {
    @include text("body-xs-light");

    align-self: flex-start;
    padding-block: 1px;
  }

  &:disabled,
  &[aria-disabled="true"] {
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.5;
  }
}
</style>

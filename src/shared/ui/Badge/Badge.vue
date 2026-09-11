<script setup lang="ts">
import Icon from "@/shared/ui/Icon/Icon.vue";

withDefaults(
  defineProps<{
    trademark?: boolean;
  }>(),
  {
    trademark: false,
  },
);
</script>

<template>
  <span class="badge" :class="{ 'badge--trademark': trademark }">
    <span class="badge__label">
      <slot />
    </span>
    <Icon v-if="trademark" name="tm" :size="8" class="badge__mark" />
  </span>
</template>

<style lang="scss" scoped>
/** @define badge */
@use "shared/assets/styles/mixins" as *;

.badge {
  @include text("badge");

  display: inline-flex;
  gap: var(--spacing-3xs);
  align-items: flex-start;
  padding: var(--spacing-3xs) var(--spacing-xs);
  color: var(--color-text-primary);
  white-space: nowrap;
  background: var(--color-bg-badge);

  &--trademark {
    padding-right: var(--spacing-2xs);
  }

  &__mark {
    color: var(--color-text-primary);
  }
}
</style>

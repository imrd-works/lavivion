<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <section class="footer-nav-group">
    <h2 class="footer-nav-group__title">{{ title }}</h2>
    <slot />
  </section>
</template>

<style lang="scss" scoped>
/** @define footer-nav-group */
@use "shared/assets/styles/mixins" as *;

.footer-nav-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-m);
  align-items: flex-start;

  &__title {
    @include text("heading-s");

    display: flex;
    align-items: center;
    height: 20px;
    margin: 0;
    color: var(--color-text-primary);
  }
}
</style>

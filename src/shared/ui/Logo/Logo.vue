<script setup lang="ts">
import LogoDefault from "@/shared/assets/logo/lavivion.svg?component";
import LogoWordmark from "@/shared/assets/logo/lavivion-wordmark.svg?component";

withDefaults(
  defineProps<{
    variant?: "default" | "wordmark";
    title?: string;
  }>(),
  {
    variant: "default",
    title: "LA VIVION",
  },
);
</script>

<template>
  <component
    :is="variant === 'wordmark' ? LogoWordmark : LogoDefault"
    class="logo"
    :class="`logo--${variant}`"
    role="img"
    :aria-label="title"
  />
</template>

<style lang="scss" scoped>
/** @define logo */

.logo {
  display: block;
  width: 100%;
  height: auto;
  color: inherit;
}
</style>

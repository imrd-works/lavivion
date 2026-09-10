<script setup lang="ts">
import { usePageSeo } from "../lib/usePageSeo";

usePageSeo();
</script>

<template>
  <div class="engagement-rings-page" />
</template>

<style lang="scss" scoped>
/** @define engagement-rings-page */

.engagement-rings-page {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4xl);
  padding-bottom: var(--spacing-5xl);
}
</style>

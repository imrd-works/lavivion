<script setup lang="ts">
import { Section } from "@/shared/layout";
</script>

<template>
  <Section padding="m" class="showcase-block">
    <p>Section with padding. Semantic wrapper.</p>
  </Section>
</template>

<style lang="scss" scoped>
/** @define showcase-block */
.showcase-block {
  background: var(--color-bg-surface-sunken);
  border-radius: var(--radius-s);
}
</style>

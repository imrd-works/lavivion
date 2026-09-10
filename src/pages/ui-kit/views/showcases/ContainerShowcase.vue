<script setup lang="ts">
import { Container } from "@/shared/layout";
</script>

<template>
  <Container padding="m" class="showcase-block">
    <p>Centered container with max-width.</p>
  </Container>
</template>

<style lang="scss" scoped>
/** @define showcase-block */
.showcase-block {
  background: var(--color-bg-surface-sunken);
  border-radius: var(--radius-s);
}
</style>
